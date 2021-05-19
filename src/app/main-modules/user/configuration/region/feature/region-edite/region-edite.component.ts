import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegionDto } from '../../model/region';
import { RegionService } from '../../service/region.service';
import Notiflix from 'notiflix';


@Component({
  selector: 'app-region-edite',
  templateUrl: './region-edite.component.html',
  styleUrls: ['./region-edite.component.scss']
})
export class RegionEditeComponent implements OnInit {
  pageSize = 5;
  pageIndex = 0;
  length = -1;
  totalPages = 1;
  regionId ="111111111111111111111111";
  regionDto=new RegionDto();
  editedSubRegion = false;

  subRegions: RegionDto[] = [{title:"dvcrgv",id:"vewrgvergt5",parentId:"scvergethgt"}];
  constructor(
    private regionService: RegionService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getSubRegions();
  }
  navigate(): void {
    console.log(this.activatedRoute.snapshot.url[0].path);
    // @ts-ignore
    this.router.navigate([window.location.hash.split('#/')[1].split('?')[0]], {
      queryParams: {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      },
    });
    this.getSubRegions();
  }

  getSubRegions()
  {
    this.regionService.regionId.subscribe(reg=>{
      this.regionId=reg;
      this.regionService.getSubRegions(this.regionId).subscribe(res=>{

        if (res) {
          if (res.flag) {
            this.regionDto.parentId=this.regionId;
            this.subRegions=res.data;
            console.log(res.data);
          }
        }
      });
    });
  }
  changePage(event: any): void {
    this.length = event.length;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.navigate();
  }

  addSubRegion(): void {
    if (!this.editedSubRegion) {
      this.regionService.addSubRegion({id: this.regionId}, this.regionDto)
        .subscribe((res: any) => {
          if (res) {
            this.regionDto = new RegionDto();
            this.regionDto.parentId=this.regionId;
            Notiflix.Notify.Success('افزودن زیر مجموعه با موفقیت انجام شد.');
            this.subRegions.push(res.data);

          }
        });
    } else {
      this.regionService.updateSubRegion({id: this.regionId}, this.regionDto)
        .subscribe((res: any) => {
          if (res) {
            this.editedSubRegion = false;
            const index = this.subRegions.findIndex(e => e.id === this.regionDto.id);
            if (index !== -1 ) {
              Notiflix.Notify.Success('ویرایش نام زیر مجموعه با موفقیت انجام شد.');
              this.subRegions[index] = this.regionDto;
              this.regionDto = new RegionDto();
              this.regionDto.parentId=this.regionId;
            }
          }
        });
    }
  }

  deleteSubRegion(item: RegionDto, i): void {
    Notiflix.Confirm.Show(
      'حذف منطقه ',
      'با حذف منطقه، تمامی زیر مجموعه (ساختمانها، کنتورها، قبوض و ...) حذف می شود.آیا منطقه حذف گردد؟',
      'بله',
      'خیر',
      () => {
        this.regionService.deleteSubRegion({ id: item.id})
          .subscribe((res: any) => {
            if (res) {
              Notiflix.Notify.Success('حذف با موفقیت انجام گردید');
              this.subRegions.splice(i, 1);
            }
          });
      });
  }

  editSubRegionName(item: RegionDto): void {
    this.editedSubRegion = true;
    this.regionDto = JSON.parse(JSON.stringify(item));
  }

}
