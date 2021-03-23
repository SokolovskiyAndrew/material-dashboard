import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkersMainComponent } from './workers-main.component';

describe('WorkersMainComponent', () => {
  let component: WorkersMainComponent;
  let fixture: ComponentFixture<WorkersMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkersMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkersMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
