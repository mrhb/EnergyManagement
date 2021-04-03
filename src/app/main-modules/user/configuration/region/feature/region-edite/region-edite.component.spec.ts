import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionEditeComponent } from './region-edite.component';

describe('RegionEditeComponent', () => {
  let component: RegionEditeComponent;
  let fixture: ComponentFixture<RegionEditeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionEditeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionEditeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
