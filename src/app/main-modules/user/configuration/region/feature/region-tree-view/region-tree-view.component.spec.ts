import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionTreeViewComponent } from './region-tree-view.component';

describe('RegionTreeViewComponent', () => {
  let component: RegionTreeViewComponent;
  let fixture: ComponentFixture<RegionTreeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionTreeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
