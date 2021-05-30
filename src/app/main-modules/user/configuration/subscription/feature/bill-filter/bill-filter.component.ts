import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BillFilterDto } from '../../model/billFilter';
import Notiflix from 'notiflix';
import { Moment } from 'src/app/shared/tools/moment';
import { RegionService } from '../../../region/service/region.service';

declare var $: any;
@Component({
  selector: 'app-bill-filter',
  templateUrl: './bill-filter.component.html',
  styleUrls: ['./bill-filter.component.scss']
})
export class BillFilterComponent implements OnInit , AfterViewInit{
  @Input() filterName: string='شناسه قبض';
  @Output() billFilterChange: EventEmitter<BillFilterDto> = new EventEmitter<BillFilterDto>();
  regionId ="111111111111111111111111";
  moment = Moment;
  form: FormGroup;
  
  billFilterDto= new BillFilterDto();
  
  constructor(    private stateService:RegionService,
    private formBuilder: FormBuilder)
  {}
  ngAfterViewInit(): void {
    this.jQueryDate();

    //initializeform
    $('#fromDate').val(this.moment.getJaliliDateFromIso(this.billFilterDto.fromDate));
    $('#toDate').val(this.moment.getJaliliDateFromIso(this.billFilterDto.toDate));
    // this.updateChart();
    }

    EmitChanges()
    {
      this.billFilterChange.emit(this.billFilterDto);
    }
   
  ngOnInit(): void {

    var date = new Date();
    date.setDate( date.getDate() - 0 );
    this.billFilterDto.toDate=date.toISOString();
    date.setDate( date.getDate() - 365 );
    this.billFilterDto.fromDate=date.toISOString();

    
    this.stateService.regionId.subscribe(reg=>{
      this.billFilterDto.regionId=reg;
      this.EmitChanges();
    })
    this.form = this.formBuilder.group({
      billingId: [],
      fromDate:[], // تاریخ شروع 
      toDate:[], // تاریخ اتمام
    });
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
        this.billFilterDto.fromDate = this.moment.convertJaliliToIsoDate($(e.currentTarget).val());
        if (this.billFilterDto.fromDate > this.billFilterDto.toDate) {
          setTimeout(() => {
            Notiflix.Notify.Failure('تاریخ شروع باید قبل از تاریخ پایان انتخاب شود');
            this.billFilterDto.toDate = null;
            $('#toDate').val(this.moment.getJaliliDateFromIso(this.billFilterDto.toDate));
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
        this.billFilterDto.toDate = this.moment.convertJaliliToIsoDate($(e.currentTarget).val());
        console.log('this.billFilterDto.toDate', this.billFilterDto.toDate);
        if (this.billFilterDto.fromDate > this.billFilterDto.toDate) {
          setTimeout(() => {
            Notiflix.Notify.Failure('تاریخ وارده باید قبل از تاریخ شروع انتخاب شود');
            this.billFilterDto.toDate = null;
            $('#toDate').val(this.moment.getJaliliDateFromIso(this.billFilterDto.fromDate));
          }, 200);
        }
      });
   }, 100);
  }
}
