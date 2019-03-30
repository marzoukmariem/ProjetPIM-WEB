import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EnfantService} from '../../Services/enfant.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ParentService} from '../../Services/parent.service';
import {ControlValueAccessor} from '@angular/forms';

import {noop} from 'rxjs';
import {Historique} from '../../Models/historique.model';
import {Enfant} from '../../Models/enfant.model';
import * as Chartist from 'chartist';


@Component({
  selector: 'app-acceuil-parent',
  templateUrl: './acceuil-parent.component.html',
  styleUrls: ['./acceuil-parent.component.css']
})
export class AcceuilParentComponent implements OnInit, ControlValueAccessor {

  constructor(private service: EnfantService, private route: ActivatedRoute, private router: Router, private service1: ParentService) {

    this.route.queryParams.subscribe(params => {
      console.log(params); // {order: "popular"}

      this.parentnumber = params.idp;
      console.log('id:' + this.parentnumber); // popular
    });
  }

  // get accessor
  get value(): any {
    return this.isChecked;
  }

  // set accessor including call the onchange callback
  set value(value: any) {
    this.isChecked = value;
  }
  historique: Historique;
  parentnumber: number;
  s: number;
  listenf: Enfant[] = [];
  listsum: Historique[] = [];
  @Input() label: string;
  @Input() isChecked = false;
  @Input() disabled = false;
  @Output() getChange = new EventEmitter();
  @Input() className: string;

   private  onTouchedCallback: () => void = noop;
   private  onChangeCallback: (_: any) => void = noop;
  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function(data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  }
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function(data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  }
























  ngOnInit() {

   this.service1.getparent(this.parentnumber);
   localStorage.setItem('idparent', (this.parentnumber).toString());
   console.log(localStorage.getItem('idparent'));
   this.service.getallenfantbyid(this.parentnumber);
   console.log('listenfantfromacceuil ', this.service.list );

   this.listenf = this.service.list;
   console.log('this.service.list ', this.service.list );
   this.service.remplirlistsum(this.parentnumber);
   console.log('listfromacceuil ', this.service.listsum );





    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

   const dataDailySalesChart: any = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      series: [
        [12, 17, 7, 17, 23, 18, 38]
      ]
    };

   const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
    };

   const dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

   this.startAnimationForLineChart(dailySalesChart);


    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

   const dataCompletedTasksChart: any = {
      labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
      series: [
        [230, 750, 450, 300, 280, 240, 200, 190]
      ]
    };

   const optionsCompletedTasksChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
    };

   const completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

    // start animation for the Completed Tasks Chart - Line Chart
   this.startAnimationForLineChart(completedTasksChart);



    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

   const datawebsiteViewsChart = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

      ]
    };
   const optionswebsiteViewsChart = {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 1000,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
    };
   const responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc(value) {
            return value[0];
          }
        }
      }]
    ];
   const websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

    // start animation for the Emails Subscription Chart
   this.startAnimationForBarChart(websiteViewsChart);

  }


  histo(id: number) {

    this.router.navigate(['KidsPay/Aceuilparent/Historique'], { queryParams: { idp: id } });

  }
  Detail(id: number) {

    this.router.navigate(['KidsPay/Aceuilparent/Historique'], { queryParams: { idp: id } });

  }
  alimenter(id: number) {

    this.router.navigate(['KidsPay/Aceuilparent/AlimentationCompte'], { queryParams: { ide: id , idp: this.parentnumber} });

  }
  update(id: number) {

    this.router.navigate(['KidsPay/Aceuilparent/updateenfant'], { queryParams: { ide: id , idp: this.parentnumber} });

  }
 writeValue(value: any): void {
    if (value !== this.isChecked) {
      this.isChecked = value;

    }
  }

  onChange(isChecked) {
    this.value = isChecked;
    console.log(this.isChecked);
    this.getChange.emit(this.isChecked);
    this.onChangeCallback(this.value);
    if (this.isChecked === true) {
      console.log('hello its true');
      this.service.activercompteenfant(this.service.enfant.id);
    } else {
      console.log('hello its false');
      this.service.Desactivercompteenfant(this.service.enfant.id);
    }

  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  setDisabledState?(isDisabled: boolean): void {

  }



}
