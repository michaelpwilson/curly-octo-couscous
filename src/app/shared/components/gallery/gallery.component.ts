import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  @Input() public favouriteDogsSubject: Subject<string[]> | undefined;
  public favouriteDogs$: Observable<string[]> | undefined; 

  public ngOnInit() {
    this.favouriteDogs$ = this.favouriteDogsSubject?.asObservable();
  }
}
