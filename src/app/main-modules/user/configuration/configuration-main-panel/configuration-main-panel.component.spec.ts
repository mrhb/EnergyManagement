import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationMainPanelComponent } from './configuration-main-panel.component';

describe('ConfigurationMainPanelComponent', () => {
  let component: ConfigurationMainPanelComponent;
  let fixture: ComponentFixture<ConfigurationMainPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurationMainPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationMainPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
