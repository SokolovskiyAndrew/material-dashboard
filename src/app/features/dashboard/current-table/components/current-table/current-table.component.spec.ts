import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentTableComponent } from './current-table.component';

describe('CurrentTableComponent', () => {
  let component: CurrentTableComponent;
  let fixture: ComponentFixture<CurrentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
