import {Component, ElementRef, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  // @Input() public data: { eGaz: number, eAct: number, date: string }[];
  //
  // private width = 700;
  // private height = 700;
  // private margin = 50;
  //
  // public svg;
  // public svgInner;
  // public yScale;
  // public xScale;
  // public xAxis;
  // public yAxis;
  // public lineGroup;

  constructor(public chartElem: ElementRef) {
  }

  ngOnInit(): void {

  }

  // ngOnChanges(changes): void {
  //   if (changes.hasOwnProperty('data') && this.data) {
  //     console.log(this.data);
  //     this.initializeChart();
  //     this.drawChart();
  //
  //     window.addEventListener('resize', () => this.drawChart());
  //   }
  // }
  //
  // private initializeChart(): void {
  //   // const data = [
  //   //   {date : '2020-01-01', eGaz : 20, eAct : 90},
  //   //   {date : '2020-01-02', eGaz : 25, eAct : 10},
  //   //   {date : '2020-01-03', eGaz : 40, eAct : 50},
  //   //   {date : '2020-01-04', eGaz : 26, eAct : 0},
  //   //   {date : '2020-01-05', eGaz : 80, eAct : 15},
  //   //   {date : '2020-01-06', eGaz : 90, eAct : 75},
  //   // ];
  //
  //   this.svg = d3
  //     .select(this.chartElem.nativeElement)
  //     .select('.linechart')
  //     .append('svg')
  //     .attr('height', this.height);
  //   this.svgInner = this.svg
  //     .append('g')
  //     .style('transform', 'translate(' + this.margin + 'px, ' + this.margin + 'px)');
  //
  //   this.yScale = d3
  //     .scaleLinear()
  //     .domain([d3.max(this.data, d => d.eAct) + 1, d3.min(this.data, d => d.eAct) - 1])
  //     .range([0, this.height - 2 * this.margin]);
  //
  //   this.yAxis = this.svgInner
  //     .append('g')
  //     .attr('id', 'y-axis')
  //     .style('transform', 'translate(' + this.margin + 'px,  0)');
  //
  //   this.xScale = d3.scaleTime().domain(d3.extent(this.data, d => new Date(d.date)));
  //
  //   this.xAxis = this.svgInner
  //     .append('g')
  //     .attr('id', 'x-axis')
  //     .style('transform', 'translate(0, ' + (this.height - 2 * this.margin) + 'px)');
  //
  //   this.lineGroup = this.svgInner
  //     .append('g')
  //     .append('path')
  //     .attr('id', 'line')
  //     .style('fill', 'none')
  //     .style('stroke', 'red')
  //     .style('stroke-width', '2px');
  //
  //   const tooltip = this.svg.append('g');
  //
  //   // this.svg.on('touchmove mousemove', function(event) {
  //   //   const {date, value} = bisect(d3.pointer(event, this)[0]);
  //   //
  //   //   tooltip
  //   //     .attr('transform', `translate(${x(date)},${y(value)})`)
  //   //     .call(callout, `${formatValue(value)}
  //   //   ${formatDate(date)}`);
  //   // });
  // }
  //
  // private drawChart(): void {
  //   this.width = this.chartElem.nativeElement.getBoundingClientRect().width;
  //   this.svg.attr('width', this.width);
  //
  //   this.xScale.range([this.margin, this.width - 2 * this.margin]);
  //
  //   const xAxis = d3
  //     .axisBottom(this.xScale)
  //     .ticks(10)
  //     .tickFormat(d3.timeFormat('%m / %Y'));
  //
  //   this.xAxis.call(xAxis);
  //
  //   const yAxis = d3
  //     .axisLeft(this.yScale);
  //
  //   this.yAxis.call(yAxis);
  //
  //   const line = d3
  //     .line()
  //     .x(d => d[0])
  //     .y(d => d[1])
  //     .curve(d3.curveMonotoneX);
  //
  //   const points: [number, number][] = this.data.map(d => [
  //     this.xScale(new Date(d.date)),
  //     this.yScale(d.eAct),
  //   ]);
  //
  //
  //
  //
  //   this.lineGroup.attr('d', line(points));
  // }

}
