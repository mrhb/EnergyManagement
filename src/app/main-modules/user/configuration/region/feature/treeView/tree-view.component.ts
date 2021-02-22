/**
 * create By reza mollaei
 * Email: reza_yki@yahoo.com
 * telegram: reza_yki
 */

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Region, RegionOutput} from '../../model/region';
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
  regOutput = new RegionOutput();
  @Input() regionInput;
  @Output() regionOutput = new EventEmitter<any>();

  constructor(private regionService: RegionService) {
    if (this.regionInput) {
      // const regionOutput = {
      //   rootTitle: root.title,
      //   rootId: root.id,
      //   parentTitle: parent.title,
      //   parentId: parent.id,
      //   regId : subSubRegion.id,
      //   regTitle : subSubRegion.title,
      // };
      // this.regOutput = regionOutput;
      // this.regionOutput.emit(regionOutput);
    }
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
            this.getListRegion(res.data[0].id, 0);
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


  getRegionId(subSubRegion, root, regionId , regionTitle , parent?): void {
    if (parent) {
      this.regOutput = {
        rootTitle: root.title,
        rootId: root.id,
        parentTitle: parent.title,
        parentId: parent.id,
        regId: subSubRegion.id,
        regTitle: subSubRegion.title,
      };
    } else {
      this.regOutput.rootTitle = regionTitle;
      this.regOutput.rootId = regionId;
    }

    console.log('regionId', regionId);
    console.log('regionTitle', regionTitle);
    const regionOutput = {
      regionTitle,
      regionId,
    };

    this.regionOutput.emit(regionOutput);
  }
}
