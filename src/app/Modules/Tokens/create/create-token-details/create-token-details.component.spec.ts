import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTokenDetailsComponent } from './create-token-details.component';

describe('CreateTokenDetailsComponent', () => {
  let component: CreateTokenDetailsComponent;
  let fixture: ComponentFixture<CreateTokenDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTokenDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTokenDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
