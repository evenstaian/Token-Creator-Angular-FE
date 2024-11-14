import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseBoxComponent } from './response-box.component';

describe('ResponseBoxComponent', () => {
  let component: ResponseBoxComponent;
  let fixture: ComponentFixture<ResponseBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
