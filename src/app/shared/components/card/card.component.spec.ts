import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs/internal/Subject';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent]
    });
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the component correctly', () => {
    const title = fixture.debugElement.query(By.css('.card__title')).nativeElement;
    expect(title.textContent).toContain('Random Dog');
  });

  it('should display a new dog image after 3 seconds', fakeAsync(() => {
    component.dogImageUrl = 'https://images.dog.ceo/breeds/sharpei/noel.jpg';

    const img = fixture.debugElement.query(By.css('.card__image')).nativeElement;
    const initialSrc = img.style.backgroundImage;
    
    tick(3000);
    fixture.detectChanges();
    const newSrc = img.style.backgroundImage;
    
    expect(initialSrc).not.toBe(newSrc);
  }));

  it('should save a favourite dog image', () => {
    const dogImageUrl = 'https://images.dog.ceo/breeds/sharpei/noel.jpg';
    const likeBtn = fixture.debugElement.query(By.css('.js-button-like')).nativeElement;

    component.favouriteDogsSubject = new Subject<string[]>();
    component.dogImageUrl = dogImageUrl;

    component.favouriteDogsSubject.subscribe((dogs) => {
      expect(dogs.length).toBe(1);
      expect(dogs[0]).toBe(dogImageUrl);
    });

    likeBtn.click();
  });

  it('should start and stop the image cycle', fakeAsync(() => {
    const startBtn = fixture.debugElement.query(By.css('.js-button-start')).nativeElement;
    const stopBtn = fixture.debugElement.query(By.css('.js-button-stop')).nativeElement;

    spyOn(component, 'startImageCycle').and.callThrough();
    spyOn(component, 'stopImageCycle').and.callThrough();

    startBtn.disabled = false;
    startBtn.click();
    tick(10);
    expect(component.startImageCycle).toHaveBeenCalled();
    stopBtn.click();
    expect(component.stopImageCycle).toHaveBeenCalled();
  }));
});