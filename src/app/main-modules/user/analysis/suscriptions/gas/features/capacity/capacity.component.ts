import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeriesInfo } from '../../../../model/chart';
import { StateService } from '../../../../state.service';
import Notiflix from 'notiflix';

import { GasAnalysisDto } from '../../../model/gas';
import { GasAnalysisTypeEnum } from '../../../model/gasEnum';
import { GasService } from '../../../service/gas.service';

declare var $: any;

@Component({
  selector: 'app-capacity',
  templateUrl: './capacity.component.html',
  styleUrls: ['./capacity.component.scss']
})
export class CapacityComponent implements OnInit {
  gasAnalysisDto= new GasAnalysisDto();
  
  gasAnalysisTypeEnum=GasAnalysisTypeEnum;
  
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
    private gasService:GasService
    ) {
      stateService.region.subscribe(reg=>{
        this.region=reg;
      });
      
      this.form = this.formBuilder.group({
        gasAnalysisType: [],
      });
      
    }
    
    ngOnInit(): void {
    this.gasAnalysisDto.gasAnalysisType=GasAnalysisTypeEnum[GasAnalysisTypeEnum.CAPACITY.toString()] ;
  }

  updateChart(){
    switch (this.gasAnalysisDto.gasAnalysisType) {
      case GasAnalysisTypeEnum[GasAnalysisTypeEnum.CAPACITY.toString()]:
        this.gasService.getCapacityAnalysis(this.regionId)
        .subscribe((res: any) => {
          if (res) {
            this.series=res.data;
            Notiflix.Notify.Success('ایجاد اشتراک برق با موفقیت انجام شد.');
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
function regionId(regionId: any) {
  throw new Error('Function not implemented.');
}

