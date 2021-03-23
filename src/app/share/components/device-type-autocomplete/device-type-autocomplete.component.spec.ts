import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceTypeAutocompleteComponent } from './device-type-autocomplete.component';

describe('DeviceTypeAutocompleteComponent', () => {
  let component: DeviceTypeAutocompleteComponent;
  let fixture: ComponentFixture<DeviceTypeAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceTypeAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceTypeAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
