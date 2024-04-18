import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessStatusTagComponent } from './process-status-tag.component';

describe('ProcessStatusTagComponent', () => {
  let component: ProcessStatusTagComponent;
  let fixture: ComponentFixture<ProcessStatusTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessStatusTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessStatusTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
