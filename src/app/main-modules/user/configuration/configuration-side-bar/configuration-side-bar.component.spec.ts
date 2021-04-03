import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationSideBarComponent } from './configuration-side-bar.component';

describe('ConfigurationSideBarComponent', () => {
  let component: ConfigurationSideBarComponent;
  let fixture: ComponentFixture<ConfigurationSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurationSideBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
