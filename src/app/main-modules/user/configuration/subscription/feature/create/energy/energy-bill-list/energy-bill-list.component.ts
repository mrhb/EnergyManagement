import { Component, OnInit } from '@angular/core';
import { EnergyBillList } from '../../../../model/energy';
import {ActivatedRoute, Router} from '@angular/router';
import { EnergyReceiptService } from '../../../../service/energy-receipt.service';
// @ts-ignore
import Notiflix from 'notiflix';
// import {EnergyService} from '../../../../service/energy.service';

@Component({
  selector: 'app-energy-bill-list',
  templateUrl: './energy-bill-list.component.html',
  styleUrls: ['./energy-bill-list.component.scss']
})
export class EnergyBillListComponent implements OnInit {
  pageSize = 5;
  pageIndex = 0;
  length = -1;
  totalPages = 1;

  energyBillList: EnergyBillList[] = [];

  constructor(public router: Router,
    private energyReceiptService: EnergyReceiptService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getEnergyBillList();
  }

  getEnergyBillList(): void {
    this.energyReceiptService.getReceiptList(
      {
        page: this.pageIndex,
        size: this.pageSize,
      }, ''
    ).subscribe((res: any) => {
      if (res) {
        this.energyBillList = res.content;
        this.length = res.totalElements;
      }
    });

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
    this.getEnergyBillList();
  }

  changePage(event: any): void {
    this.length = event.length;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.navigate();
  }

  deleteEnergy(i, pId): void {
    Notiflix.Confirm.Show(
      'قبض',
      'آیا اطمینان دارید که این قبض حذف گردد؟',
      'بله',
      'خیر',
      () => {
        this.energyReceiptService.deleteReceipt({id: pId})
          .subscribe((res: any) => {
            if (res) {
              Notiflix.Notify.Success('حذف قبض با موفقیت انجام گردید');
              this.energyBillList.splice(i, 1);
            }
          });
      });
  }

}
