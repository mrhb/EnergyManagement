import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Moment } from 'src/app/shared/tools/moment';

import Notiflix from 'notiflix';
import { SeriesInfo } from '../../../model/chart';
import { StateService } from '../../../state.service';
import { BillAnalysisDto } from '../../model/bill';
import { BillAnalysisParamEnum, BillTypeEnum } from '../../model/billEnum';
import { BillAnalysisService } from '../../service/bill-analysis.service';

declare var $: any;
@Component({
  selector: 'app-cost-consumption-analysis',
  templateUrl: './cost-consumption-analysis.component.html',
  styleUrls: ['./cost-consumption-analysis.component.scss']
})
export class CostConsumptionAnalysisComponent implements OnInit, AfterViewInit{
  moment = Moment;
  billTypeEnum=BillTypeEnum;
  billAnalysisParamEnum=BillAnalysisParamEnum;
  billAnalysisDto= new BillAnalysisDto();

  region="";
  series: SeriesInfo= {
    series:[
      { data: [85, 12, 78, 75], name: 'ظرفیت 100' },
      { data: [67, 23, 96, 13], name: 'ظرفیت 200' }
    ],
    labels:["مشهد", "کاشمر","بردسکن","جاجرم"]
  }
  form: FormGroup;
  regionId: { regionId: string; };
  constructor(private formBuilder: FormBuilder,
    public stateService:StateService,
    private billService:BillAnalysisService
    ) {
      stateService.region.subscribe(reg=>{
        this.region=reg;
      });

      stateService.regionId.subscribe(regId=>{
        this.billAnalysisDto.regionId=regId;
      });
    }
    ngAfterViewInit(): void {
      this.jQueryDate();

       //initializeform
       $('#fromDate').val(this.billAnalysisDto.fromDate);
       $('#toDate').val( this.billAnalysisDto.toDate);
       this.updateChart();

    }
  jQueryDate(): void {
    setTimeout(e1 => {
      $('#fromDate').MdPersianDateTimePicker({
        Placement: 'bottom', // default is 'bottom'
        Trigger: 'focus', // default is 'focus',
        targetTextSelector: '#fromDate',
        disableAfterToday: false,
        disableBeforeToday: false,
      }).on('change', (e) => {
        this.billAnalysisDto.fromDate = this.moment.convertJaliliToIsoDate($(e.currentTarget).val());
        if (this.billAnalysisDto.fromDate > this.billAnalysisDto.toDate) {
          setTimeout(() => {
            Notiflix.Notify.Failure('تاریخ شروع باید قبل از تاریخ پایان انتخاب شود');
            this.billAnalysisDto.toDate = null;
            $('#toDate').val(this.moment.getJaliliDateFromIso(this.billAnalysisDto.toDate));
          }, 200);
        }
      });
      $('#toDate').MdPersianDateTimePicker({
        Placement: 'bottom', // default is 'bottom'
        Trigger: 'focus', // default is 'focus',
        targetTextSelector: '#toDate',
        disableAfterToday: false,
        disableBeforeToday: false,
      }).on('change', (e) => {
        this.billAnalysisDto.toDate = this.moment.convertJaliliToIsoDate($(e.currentTarget).val());
        console.log('this.billAnalysisDto.toDate', this.billAnalysisDto.toDate);
        if (this.billAnalysisDto.fromDate > this.billAnalysisDto.toDate) {
          setTimeout(() => {
            Notiflix.Notify.Failure('تاریخ وارده باید قبل از تاریخ شروع انتخاب شود');
            this.billAnalysisDto.toDate = null;
            $('#toDate').val(this.moment.getJaliliDateFromIso(this.billAnalysisDto.fromDate));
          }, 200);
        }
      });
    }, 100);
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      billType: [],
      billAnalysisParam: [],
      fromDate:[], // تاریخ شروع 
      toDate:[], // تاریخ اتمام
    });

//initializeform
       this.billAnalysisDto.billAnalysisParam=BillAnalysisParamEnum[BillAnalysisParamEnum.CONSUMPTION.toString()] ;
       this.billAnalysisDto.billType=BillTypeEnum[BillTypeEnum.POWER.toString()] ;
       this.billAnalysisDto.fromDate=this.moment.add(new Date(),-1).toString();
       this.billAnalysisDto.toDate=this.moment.convertIsoToJDateFa(new Date().toISOString());
 
  }

  updateChart(){
    this.billService.getRawBillCostAnalysis('',this.billAnalysisDto)
    .subscribe((res: any) => {
      if (res) {
        this.series=res.data;
        Notiflix.Notify.Success('اطلاعات قبوض دریافت شد.');
        setTimeout(() => {
          $('#pills-building-tab').click();
        }, 200);
        // this.router.navigate(['/index/user/configuration/powerList']);
      }
    });
    switch (this.billAnalysisDto.billType) {
      case BillTypeEnum[BillTypeEnum.POWER.toString()]:

        break;
    }    
  }

}