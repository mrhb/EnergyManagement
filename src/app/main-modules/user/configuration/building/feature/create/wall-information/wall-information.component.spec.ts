import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WallInformationComponent } from './wall-information.component';

describe('WallInformationComponent', () => {
  let component: WallInformationComponent;
  let fixture: ComponentFixture<WallInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WallInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WallInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
