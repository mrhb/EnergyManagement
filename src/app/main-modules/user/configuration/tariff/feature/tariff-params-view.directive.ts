import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[TariffParamsView]'
})
export class TariffParamsViewDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
