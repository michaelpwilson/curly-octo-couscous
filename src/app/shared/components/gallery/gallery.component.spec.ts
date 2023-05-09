import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of, Subject } from 'rxjs';
import { GalleryComponent } from './gallery.component';

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GalleryComponent]
    });
    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a message if there are no images in the Favourite Dogs section', () => {
    const noDogsMsg = fixture.debugElement.query(By.css('.no-dogs-msg')).nativeElement;
    expect(noDogsMsg.textContent).toContain('Like a Dog and this section will populate with your favourite ones.');
  });

  it('should display an image if there is a favorite dog', fakeAsync(() => {
    const dogImageUrl = 'https://images.dog.ceo/breeds/sharpei/noel.jpg';

    component.favouriteDogs$ = of([dogImageUrl]);

    fixture.detectChanges();

    const galleryItem = fixture.debugElement.queryAll(By.css('.gallery__body-item'))[0].nativeElement;
    const url = galleryItem.style.backgroundImage.match(/\((.*?)\)/)[1].replace(/('|")/g,'');

    expect(url).toBe(dogImageUrl);
  }));
});
