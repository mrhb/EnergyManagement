import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseLineComponent } from './base-line.component';

describe('BaseLineComponent', () => {
  let component: BaseLineComponent;
  let fixture: ComponentFixture<BaseLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
