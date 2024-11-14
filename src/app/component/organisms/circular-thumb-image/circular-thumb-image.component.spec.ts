import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircularThumbImageComponent } from './circular-thumb-image.component';

describe('CircularThumbImageComponent', () => {
  let component: CircularThumbImageComponent;
  let fixture: ComponentFixture<CircularThumbImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircularThumbImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircularThumbImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
