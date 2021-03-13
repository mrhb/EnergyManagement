import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimateListComponent } from './climate-list.component';

describe('ClimateListComponent', () => {
  let component: ClimateListComponent;
  let fixture: ComponentFixture<ClimateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClimateListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClimateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
