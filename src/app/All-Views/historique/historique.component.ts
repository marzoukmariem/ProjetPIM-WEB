import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EnfantService} from '../../Services/enfant.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '../../Models/store.model';
import {noop} from 'rxjs';
import * as Chartist from 'chartist';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {

  // get accessor
  get value(): any {
    return this.isChecked;
  }

  // set accessor including call the onchange callback
  set value(value: any) {
    this.isChecked = value;
  }







  constructor(private service: EnfantService, private route: ActivatedRoute, private router: Router, private http: HttpClient) {

    this.Listmoisenfant = [];
    this.URLphoto = environment.apiURL1;
    this.photouser = localStorage.getItem('photouser');
    this.Listsemaines = [];
    this.nomuser = localStorage.getItem('nom');

    this.prenomuser = localStorage.getItem('prenom');

    this.numuser = localStorage.getItem('numuser');
    this.email = localStorage.getItem('emailuser');
    this.balanceuser = localStorage.getItem('balanceuser');

    this.route.queryParams.subscribe(params => {
      console.log(params); // {order: "popular"}

      this.enfantnumber = params.idp;
      console.log('id:' + this.enfantnumber); // popular
    });
    this.service.gettop3(this.enfantnumber);
    this.service.getallproduit();
  }
  URLphoto = '';
photouser = '';
  nomuser = '';
  prenomuser = '';
  numuser = '';
  email = '';
  balanceuser = null;
  storeList: Store[] = [];
  Listsemaines: number[] = [];
  Listmoisenfant: number[] = [];
  enfantnumber: number;
  @Input() label: string;
  @Input() isChecked = false;
  @Input() disabled = false;
  @Output() getChange = new EventEmitter();
  @Input() className: string;

  private  onTouchedCallback: () => void = noop;
  private  onChangeCallback: (_: any) => void = noop;



  logout() {

    localStorage.clear();
    this.router.navigate(['KidsPay/login']);
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


  detail(id) {
    this.router.navigate(['KidsPay/Aceuilparent/Historique/Commandedetail'], { queryParams: { idc: id} });
  }







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
  }  ngOnInit() {
    if ( localStorage.getItem('session') === 'false') {

      this.router.navigate(['KidsPay/Erreur']);


    }
    this.Listsemaines = [];
    this.Listmoisenfant = [];
    this.service.getlistjourscommandes(this.enfantnumber);


    this.service.getsumachatparmois(this.enfantnumber, 4);
    // const a = this.service.getsumachatparmois(this.enfantnumber, 4);
   // console.log('stat a   ' + this.service.getsumachatparmois(this.enfantnumber, 4));

    this.service.gettopproduitparenfant(this.enfantnumber);
    this.service.gethistoriquebyenfant(this.enfantnumber);
    this.service.getStoresList();
    console.log('nvlist:' + this.storeList);





    for (let i = 1; i < 8; i++) {
    this.http.get(environment.apiURL + '/getcommandejours' + i + '/?idenfant=' + this.enfantnumber).subscribe(resp1 => {
      // @ts-ignore
      if ( resp1.Sum_dep.Sum_dep === null) {
        this.Listsemaines.push(0);

      } else {
        // @ts-ignore
        this.Listsemaines.push( resp1.Sum_dep.Sum_dep);

      }


      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

      const dataDailySalesChart: any = {
        labels: ['J1', 'J2', 'J3', 'J4', 'J5', 'J6', 'Today'],
        series: [
          [this.Listsemaines[0], this.Listsemaines[1], this.Listsemaines[2], this.Listsemaines[3], this.Listsemaines[4], this.Listsemaines[5], this.Listsemaines[6]]
        ]
      };

      const optionsDailySalesChart: any = {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
        }),
        low: 0,
        high:  500, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      };

      const dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

      this.startAnimationForLineChart(dailySalesChart);









    }); }
























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
      high:  1500, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
    };

    const completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

    // start animation for the Completed Tasks Chart - Line Chart
    this.startAnimationForLineChart(completedTasksChart);

    for (let i = 1; i < 13; i++) {
    this.http.get(environment.apiURL + '/getdepenseparmoisenfant/?mois=' + i + '&idenfant=' + this.enfantnumber).subscribe(resp1 => {
      // @ts-ignore
      if (resp1.janvier === null) {
        this.Listmoisenfant.push(0);

      } else {
        // @ts-ignore
        this.Listmoisenfant.push(resp1.janvier);

      }




      /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

      const datawebsiteViewsChart = {
        labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
        series: [
          [this.Listmoisenfant[0], this.Listmoisenfant[1], this.Listmoisenfant[2], this.Listmoisenfant[3], this.Listmoisenfant[4], this.Listmoisenfant[5], this.Listmoisenfant[6], this.Listmoisenfant[7], this.Listmoisenfant[8], this.Listmoisenfant[9], this.Listmoisenfant[10], this.Listmoisenfant[11]]

        ]
      };
      const optionswebsiteViewsChart = {
        axisX: {
          showGrid: false
        },
        low: 0,
        high:  1500,
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





    }); }











  }



  onChange(isChecked) {
    this.value = isChecked;
    console.log(this.isChecked);
    this.getChange.emit(this.isChecked);
    this.onChangeCallback(this.value);
    if (this.isChecked === true) {
      console.log('hello its true');
      console.log(this.enfantnumber);
      this.service.activercompteenfant(this.enfantnumber);
    } else {
      console.log('hello its false');
      this.service.Desactivercompteenfant(this.enfantnumber);
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
