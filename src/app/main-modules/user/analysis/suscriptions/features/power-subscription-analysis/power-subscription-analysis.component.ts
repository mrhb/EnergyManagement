import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Notiflix from 'notiflix';
import { SeriesInfo } from '../../../model/chart';
import { StateService } from '../../../state.service';
import { PowerAnalysisDto } from '../../model/power';
import { PowerAnalysisTypeEnum } from '../../model/powerEnum';
import { PowerAnalysisService } from '../../service/power-analysis.service';


declare var $: any;
@Component({
  selector: 'app-power-subscription-analysis',
  templateUrl: './power-subscription-analysis.component.html',
  styleUrls: ['./power-subscription-analysis.component.scss']
})
export class PowerSubscriptionAnalysisComponent implements OnInit {
  powerAnalysisDto= new PowerAnalysisDto();
  
  powerAnalysisTypeEnum=PowerAnalysisTypeEnum;
  
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
    private powerService:PowerAnalysisService
    ) {
      stateService.region.subscribe(reg=>{
        this.region=reg;
      });
      
      this.form = this.formBuilder.group({
        powerAnalysisType: [],
      });
      
    }
    
    ngOnInit(): void {
    this.powerAnalysisDto.powerAnalysisType=PowerAnalysisTypeEnum[PowerAnalysisTypeEnum.DEMAND.toString()] ;
  }

  updateChart(){
    switch (this.powerAnalysisDto.powerAnalysisType) {
      case PowerAnalysisTypeEnum[PowerAnalysisTypeEnum.DEMAND.toString()]:
        this.powerService.getDemandAnalysis(this.regionId)
        .subscribe((res: any) => {
          if (res) {
            this.series=res.data;
            Notiflix.Notify.Success('اطلاعات دیماند کنتور های برق دریافت شد.');
            setTimeout(() => {
              $('#pills-building-tab').click();
            }, 200);
            // this.router.navigate(['/index/user/configuration/powerList']);
          }
        });

        break;
        case PowerAnalysisTypeEnum[PowerAnalysisTypeEnum.DEMAND_PENALTY.toString()]:
          this.powerService.getDemandPenaltyAnalysis(this.regionId)
          .subscribe((res: any) => {
            if (res) {
              this.series=res.data;
              Notiflix.Notify.Success('اطلاعات جریمه دیماند کنتور های برق دریافت شد.');
              setTimeout(() => {
                $('#pills-building-tab').click();
              }, 200);
              // this.router.navigate(['/index/user/configuration/powerList']);
            }
          });
  
          break;
          case PowerAnalysisTypeEnum[PowerAnalysisTypeEnum.DEMAND_SUM.toString()]:
            this.powerService.getDemandSumAnalysis(this.regionId)
            .subscribe((res: any) => {
              if (res) {
                this.series=res.data;
                Notiflix.Notify.Success('اطلاعات مجموع دیماند کنتور های برق دریافت شد.');
                setTimeout(() => {
                  $('#pills-building-tab').click();
                }, 200);
                // this.router.navigate(['/index/user/configuration/powerList']);
              }
            });
    
            break;
            case PowerAnalysisTypeEnum[PowerAnalysisTypeEnum.REACTIVE.toString()]:
              this.powerService.getReactiveAnalysis(this.regionId)
              .subscribe((res: any) => {
                if (res) {
                  this.series=res.data;
                  Notiflix.Notify.Success('اطلاعات توان راکتیو کنتور های برق دریافت شد.');
                  setTimeout(() => {
                    $('#pills-building-tab').click();
                  }, 200);
                  // this.router.navigate(['/index/user/configuration/powerList']);
                }
              });
      
            break;
            case PowerAnalysisTypeEnum[PowerAnalysisTypeEnum.TARIFF.toString()]:
              this.powerService.getTariffAnalysis(this.regionId)
              .subscribe((res: any) => {
                if (res) {
                  this.series=res.data;
                  Notiflix.Notify.Success('اطلاعات تعرفه کنتور های برق دریافت شد.');
                  setTimeout(() => {
                    $('#pills-building-tab').click();
                  }, 200);
                  // this.router.navigate(['/index/user/configuration/powerList']);
                }
              });
      
              break;
              case PowerAnalysisTypeEnum[PowerAnalysisTypeEnum.VOLTAGE.toString()]:
                this.powerService.getVoltageAnalysis(this.regionId)
                .subscribe((res: any) => {
                  if (res) {
                    this.series=res.data;
                    Notiflix.Notify.Success('اطلاعات ولتاژ کنتور های برق دریافت شد.');
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

