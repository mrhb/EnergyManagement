import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeriesInfo } from '../../../../model/chart';
import { StateService } from '../../../../state.service';
import { GasAnalysisDto } from '../../../model/gas';
import { GasAnalysisTypeEnum } from '../../../model/gasEnum';
import { GasService } from '../../../service/gas.service';

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
  
  
  constructor(private formBuilder: FormBuilder,
    public stateService:StateService,
    gasService:GasService
    ) {
      stateService.region.subscribe(reg=>{
        this.region=reg;
      });
      
      this.form = this.formBuilder.group({
        gasAnalysisType: [],
      });
      
    }
    
    ngOnInit(): void {
    this.gasAnalysisDto.gasAnalysisType=GasAnalysisTypeEnum.CAPACITY ;
  }

  updateChart(){

    
  }

}
