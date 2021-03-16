import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionComponent } from './feature/index/region.component';
import { TreeViewComponent } from './feature/treeView/tree-view.component';
import { RegionService } from './service/region.service';



@NgModule({
  declarations: [
    RegionComponent,
    TreeViewComponent
  ],
  imports: [
    CommonModule
    ],
  exports: [
    RegionComponent,
    TreeViewComponent
  ],
  providers:[RegionService ]
})
export class RegionModule { }
