import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Notiflix from 'notiflix';
import { SeriesInfo } from '../../../model/chart';
import { StateService } from '../../../state.service';
import { BillAnalysisDto } from '../../model/bill';
import { BillAnalysisParamEnum, BillAnalysisTypeEnum } from '../../model/billEnum';
import { BillAnalysisService } from '../../service/bill-analysis.service';

declare var $: any;
@Component({
  selector: 'app-cost-consumption-analysis',
  templateUrl: './cost-consumption-analysis.component.html',
  styleUrls: ['./cost-consumption-analysis.component.scss']
})
export class CostConsumptionAnalysisComponent implements OnInit {
  billAnalysisTypeEnum=BillAnalysisTypeEnum;
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
      
      this.form = this.formBuilder.group({
        billAnalysisType: [],
        billAnalysisParam: [],
      });
      
    }
  ngOnInit(): void {
  }

  updateChart(){
    switch (this.billAnalysisDto.billAnalysisType) {
      case BillAnalysisTypeEnum[BillAnalysisTypeEnum.POWER.toString()]:
        this.billService.getRawBillAmountAnalysis(this.regionId)
        .subscribe((res: any) => {
          if (res) {
            this.series=res.data;
            Notiflix.Notify.Success('اطلاعات ظرفیت کنتور های گاز دریافت شد.');
            setTimeout(() => {
              $('#pills-building-tab').click();
            }, 200);
            // this.router.navigate(['/index/user/configuration/powerList']);
          }
        });

        break;
    }    
  }

}