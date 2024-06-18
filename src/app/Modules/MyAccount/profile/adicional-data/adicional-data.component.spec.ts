import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionalDataComponent } from './adicional-data.component';

describe('AdicionalDataComponent', () => {
  let component: AdicionalDataComponent;
  let fixture: ComponentFixture<AdicionalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionalDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
