import { Component, Input } from '@angular/core';
import { DogWorker } from '../../workers/dog/dog-worker';
import { interval, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() public favouriteDogsSubject: Subject<string[]> | undefined;
  public errorMsg: string | undefined;
  public dogImageUrl: string | undefined;
  public formattedDate: string | undefined;
  public formattedTime: string | undefined;
  public favouriteDogs: string[] = [];
  public isImageCycleActive = true;
  public isDogLiked = false;
  public isDogLoading = false;
  
  private readonly dogWorker = new DogWorker();
  private cycle: Subscription | undefined;
  private favouriteDogsSubscription: Subscription | undefined;

  public async ngOnInit(): Promise<void> {
    await this.getRandomDogImage();
    this.startCycle();

    if(this.favouriteDogsSubject) {
      this.favouriteDogsSubscription = this.favouriteDogsSubject.subscribe((favouriteDogs) => {
        this.favouriteDogs = favouriteDogs;
      });
    }
  }

  public ngOnDestroy(): void {
    this.stopImageCycle();
    if(this.favouriteDogsSubscription) {
      this.favouriteDogsSubscription.unsubscribe();

    }
  }

  public startImageCycle(): void {
    if(this.cycle) {
      this.cycle.unsubscribe();
      this.startCycle();
      this.isImageCycleActive = true;
    }
  }

  public stopImageCycle(): void {
    if(this.cycle) {
      this.cycle.unsubscribe();
      this.isImageCycleActive = false;
    }
  }
    
  public likeDog(): void {
    if (this.dogImageUrl && !this.favouriteDogs.includes(this.dogImageUrl)) {
      if(this.favouriteDogsSubject) {
        this.favouriteDogsSubject.next([
          ...this.favouriteDogs,
          this.dogImageUrl
        ]);
        this.isDogLiked = true;
      }
    }
  }

  private async getRandomDogImage(): Promise<void> {
    this.isDogLoading = true;
    try {
      this.dogImageUrl = await this.dogWorker.getRandomDogImage();
      this.isDogLiked = this.favouriteDogs.includes(this.dogImageUrl);
      this.setCurrentDate();
    } catch (error) {
      this.errorMsg = 'Error occurred while loading dog images.';
    }
    this.isDogLoading = false;
    this.setCurrentDate();
  }

  private startCycle(): void {
    this.isImageCycleActive = true;

    this.cycle = interval(3000)
    .subscribe(async () => await this.getRandomDogImage());
  }

  private setCurrentDate(): void {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    const hour = currentDate.getHours() % 12 || 12; 
    const minute = currentDate.getMinutes().toString().padStart(2, '0');
    const ampm = currentDate.getHours() >= 12 ? 'pm' : 'am';
    
    this.formattedDate = `${month}.${day}.${year}`;
    this.formattedTime = `${hour}:${minute}${ampm}`;
  }
}
