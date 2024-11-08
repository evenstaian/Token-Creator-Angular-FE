import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsBoxComponent } from './rewards-box.component';

describe('RewardsBoxComponent', () => {
  let component: RewardsBoxComponent;
  let fixture: ComponentFixture<RewardsBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardsBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RewardsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
