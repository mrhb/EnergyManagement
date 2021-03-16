import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionComponent } from 'src/app/main-modules/user/configuration/region/feature/index/region.component';
import { TreeViewComponent } from 'src/app/main-modules/user/configuration/region/feature/treeView/tree-view.component';
import { RegionService } from 'src/app/main-modules/user/configuration/region/service/region.service';



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
