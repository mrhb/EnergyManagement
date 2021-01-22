import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Region} from '../../model/region';
import {RegionService} from '../../service/region.service';
import {Tools} from '../../../../../../shared/tools/tools';
// @ts-ignore
import Notiflix from 'notiflix';
@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements OnInit {
  regionList: Region[] = [];
  region = new Region();
  @Output() private regionOutput = new EventEmitter<any>();

  constructor(private regionService: RegionService) {
  }

  ngOnInit(): void {
    this.getOne();
  }

  getOne(): void {
    Notiflix.Block.Arrows('#tree');
    this.regionService.getOne('ROOT', '#tree')
      .subscribe((res: any) => {
        if (res) {
          Notiflix.Block.Remove('#tree');
          if (res.flag) {
            this.regionList = res.data;
            console.log('this.regionList', this.regionList);
          }
        }
      });
  }

  getListRegion(id: string, index: number, subIndex?: number): void {
    if (!Tools.isNullOrUndefined(this.regionList[index].subRegion)) {
      if (this.regionList[index].subRegion && (!Tools.isNullOrUndefined(this.regionList[index].subRegion[subIndex - 1].subRegion))) {
        return;
      }
    }



    this.regionService.getOne(id)
      .subscribe((res: any) => {
        if (res) {
          if (res.flag) {
            if (subIndex) {
              this.regionList[index].subRegion[subIndex - 1].subRegion = res.data;
            } else {
              this.regionList[index].subRegion = res.data;
            }
          }
        }
      });
  }


  getRegionId(id: string, regionTitle, root, parent): void {
    const regionOutput = {
      rootTitle: root,
      parentTitle: parent,
      regId : id,
      regTitle : regionTitle,
    };
    this.regionOutput.emit(regionOutput);
  }
}
