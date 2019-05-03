import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EnfantService} from '../../Services/enfant.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ParentService} from '../../Services/parent.service';
import {ControlValueAccessor} from '@angular/forms';

import {noop} from 'rxjs';
import {Historique} from '../../Models/historique.model';
import {Enfant} from '../../Models/enfant.model';
import * as Chartist from 'chartist';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-acceuil-parent',
  templateUrl: './acceuil-parent.component.html',
  styleUrls: ['./acceuil-parent.component.css']
})
export class AcceuilParentComponent implements OnInit, ControlValueAccessor {
  URLphoto = 'http://79.137.75.40/kidspay/';
  constructor(private service: EnfantService, private route: ActivatedRoute, private router: Router, private service1: ParentService) {
   this.URLphoto = environment.apiURL1;
   this.route.queryParams.subscribe(params => {
      console.log(params); // {order: "popular"}
      console.log('id from session', localStorage.getItem('idparent'));
     // localStorage.setItem('idparent', params.idp);
      this.parentnumber = Number(localStorage.getItem('idparent'));
      console.log('id:' + this.parentnumber); // popular
    });
   this.service.getJ(this.parentnumber);
   this.service.getF(this.parentnumber);
   this.service.getM(this.parentnumber);
   this.service.getAv(this.parentnumber);
   this.service.getMai(this.parentnumber);
   this.service.getJuin(this.parentnumber);
   this.service.getJuillet(this.parentnumber);
   this.service.getOut(this.parentnumber);
   this.service.getSeptembre(this.parentnumber);
   this.service.getOctobre(this.parentnumber);
   this.service.getNovembre(this.parentnumber);
   this.service.getDcembre(this.parentnumber);
   this.service.gettop3forall(this.parentnumber);
   this.service.getallproduit();

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
if ( localStorage.getItem('session') === 'false') {

  this.router.navigate(['KidsPay/Erreur']);


}
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
        [this.service.janvier, this.service.février, this.service.Mars, this.service.avril,
          this.service.mai, this.service.juin, this.service.juillet, this.service.aout, this.service.septembre,
          this.service.octobre, this.service.novembre, this.service.decembre]

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
