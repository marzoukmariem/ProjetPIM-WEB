import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/Services/store.service';
import * as Chartist from 'chartist';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Store } from '../Models/store.model';
import { Historique } from '../Models/historique.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  store0: Store
  listeStore0: Store[] = [];
  historique3: Historique;
  listhist3: Historique[] = [];

  commercantnumber: number
  nbrClientParJour0: number
  revenuCeJour: number = 0
  nbrClientParJour1: number
  nbrClientParJour2: number
  nbrClientParJour3: number
  nbrClientParJour4: number
  nbrClientParJour5: number
  nbrClientParJour6: number
  listeNbrTransaction: number[] = [];
  listeSommeParJour: number[] = [];
  max: number = 0
  min: number = 0
  maxS: number = 0
  minS: number = 0
  readonly rootURL = "http://79.137.75.40:8000/kidspay/"

  constructor(private service: StoreService, private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      this.commercantnumber = params.idc;
      console.log('id:' + this.commercantnumber); // popular
      this.commercantnumber =+localStorage.getItem("token");


    })
  }


  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
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
  };
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
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
  };
  ngOnInit() {

    this.service.getallStoresbyid(this.commercantnumber);
    this.service.getSolde(this.commercantnumber);
    this.service.getNumberOfStores(this.commercantnumber)
    this.service.getNumberOfTransactions(this.commercantnumber)
    this.service.getLastTransactions(this.commercantnumber)

    this.http.get(this.rootURL + 'commandes0/').subscribe(resp2 => {
      this.http.get(this.rootURL + 'stores/').subscribe(resp3 => {
        this.listhist3 = [];
        this.listeStore0 = [];
        for (var i = 0; i < Number(resp3['length']); i++) {
          // @ts-ignore
          this.store0 = {
            StoreID: null,
            nom: ''
          }

          this.store0.StoreID = resp3[i]["id"];
          this.store0.nom = resp3[i]["nom"];
          this.store0.Commercant = resp3[i]["Commercant"];
          this.listeStore0.push(this.store0);

        }

        this.revenuCeJour = 0
        for (var i = 0; i < Number(resp2['length']); i++) {

          // @ts-ignore
          this.historique3 = {
            enfant: null,
            store: null,
            prixcommande: 0,
            dateachat: null

          }

          this.historique3.dateachat = (resp2[i]["dateCommande"]).substring(0, 10);
          this.historique3.prixcommande = (resp2[i]["prixTotal"]);
          this.revenuCeJour = this.revenuCeJour + this.historique3.prixcommande;

          for (var j = 0; j < this.listeStore0.length; j++) {

            if (resp2[i]["Store"] == this.listeStore0[j].StoreID) {

              this.historique3.store = this.listeStore0[j]
            }


          }

          if (this.historique3.store != null && this.historique3.store.Commercant == this.commercantnumber) {
            this.listhist3.push(this.historique3);
          }




        }
        //console.log(this.listhist3, "thiiiiiiiisss");

        this.nbrClientParJour0 = 0;
        this.nbrClientParJour0 = this.listhist3.length;
        this.listeNbrTransaction.push(this.nbrClientParJour0)
        this.listeSommeParJour.push(this.revenuCeJour)

        //////////////////////////////////////////////////////////////////////////////////////////////
        this.http.get(this.rootURL + 'commandes1/').subscribe(resp2 => {
          this.http.get(this.rootURL + 'stores/').subscribe(resp3 => {
            this.listhist3 = [];
            this.listeStore0 = [];
            for (var i = 0; i < Number(resp3['length']); i++) {
              // @ts-ignore
              this.store0 = {
                StoreID: null,
                nom: ''
              }

              this.store0.StoreID = resp3[i]["id"];
              this.store0.nom = resp3[i]["nom"];
              this.store0.Commercant = resp3[i]["Commercant"];
              this.listeStore0.push(this.store0);

            }

            this.revenuCeJour = 0
            for (var i = 0; i < Number(resp2['length']); i++) {
              // @ts-ignore
              this.historique3 = {
                enfant: null,
                store: null,
                prixcommande: 0,
                dateachat: null

              }

              this.historique3.dateachat = (resp2[i]["dateCommande"]).substring(0, 10);
              this.historique3.prixcommande = (resp2[i]["prixTotal"]);
              this.revenuCeJour = this.revenuCeJour + this.historique3.prixcommande;

              for (var j = 0; j < this.listeStore0.length; j++) {

                if (resp2[i]["Store"] == this.listeStore0[j].StoreID) {

                  this.historique3.store = this.listeStore0[j]
                }


              }

              if (this.historique3.store != null && this.historique3.store.Commercant == this.commercantnumber) {
                this.listhist3.push(this.historique3);
              }




            }
            console.log(this.listhist3, "thiiiiiiiisss");

            this.nbrClientParJour1 = 0;
            this.nbrClientParJour1 = this.listhist3.length;
            this.listeNbrTransaction.push(this.nbrClientParJour1)
            this.listeSommeParJour.push(this.revenuCeJour)
            //////////////////////////////////////////////////////////////////////////////////////////////
            this.http.get(this.rootURL + 'commandes2/').subscribe(resp2 => {
              this.http.get(this.rootURL + 'stores/').subscribe(resp3 => {
                this.listhist3 = [];
                this.listeStore0 = [];
                for (var i = 0; i < Number(resp3['length']); i++) {
                  // @ts-ignore
                  this.store0 = {
                    StoreID: null,
                    nom: ''
                  }

                  this.store0.StoreID = resp3[i]["id"];
                  this.store0.nom = resp3[i]["nom"];
                  this.store0.Commercant = resp3[i]["Commercant"];
                  this.listeStore0.push(this.store0);

                }

                this.revenuCeJour = 0
                for (var i = 0; i < Number(resp2['length']); i++) {
                  // @ts-ignore
                  this.historique3 = {
                    enfant: null,
                    store: null,
                    prixcommande: 0,
                    dateachat: null

                  }

                  this.historique3.dateachat = (resp2[i]["dateCommande"]).substring(0, 10);
                  this.historique3.prixcommande = (resp2[i]["prixTotal"]);
                  this.revenuCeJour = this.revenuCeJour + this.historique3.prixcommande;

                  for (var j = 0; j < this.listeStore0.length; j++) {

                    if (resp2[i]["Store"] == this.listeStore0[j].StoreID) {

                      this.historique3.store = this.listeStore0[j]
                    }


                  }

                  if (this.historique3.store != null && this.historique3.store.Commercant == this.commercantnumber) {
                    this.listhist3.push(this.historique3);
                  }




                }
                console.log(this.listhist3, "thiiiiiiiisss");

                this.nbrClientParJour2 = 0;
                this.nbrClientParJour2 = this.listhist3.length;
                this.listeNbrTransaction.push(this.nbrClientParJour2)
                this.listeSommeParJour.push(this.revenuCeJour)
                //////////////////////////////////////////////////////////////////////////////////////////////
                this.http.get(this.rootURL + 'commandes3/').subscribe(resp2 => {
                  this.http.get(this.rootURL + 'stores/').subscribe(resp3 => {
                    this.listhist3 = [];
                    this.listeStore0 = [];
                    for (var i = 0; i < Number(resp3['length']); i++) {
                      // @ts-ignore
                      this.store0 = {
                        StoreID: null,
                        nom: ''
                      }

                      this.store0.StoreID = resp3[i]["id"];
                      this.store0.nom = resp3[i]["nom"];
                      this.store0.Commercant = resp3[i]["Commercant"];
                      this.listeStore0.push(this.store0);

                    }

                    this.revenuCeJour = 0
                    for (var i = 0; i < Number(resp2['length']); i++) {
                      // @ts-ignore
                      this.historique3 = {
                        enfant: null,
                        store: null,
                        prixcommande: 0,
                        dateachat: null

                      }

                      this.historique3.dateachat = (resp2[i]["dateCommande"]).substring(0, 10);
                      this.historique3.prixcommande = (resp2[i]["prixTotal"]);
                      this.revenuCeJour = this.revenuCeJour + this.historique3.prixcommande;

                      for (var j = 0; j < this.listeStore0.length; j++) {

                        if (resp2[i]["Store"] == this.listeStore0[j].StoreID) {

                          this.historique3.store = this.listeStore0[j]
                        }


                      }

                      if (this.historique3.store != null && this.historique3.store.Commercant == this.commercantnumber) {
                        this.listhist3.push(this.historique3);
                      }




                    }
                    console.log(this.listhist3, "thiiiiiiiisss");

                    this.nbrClientParJour3 = 0;
                    this.nbrClientParJour3 = this.listhist3.length;
                    this.listeNbrTransaction.push(this.nbrClientParJour3)
                    this.listeSommeParJour.push(this.revenuCeJour)
                    //////////////////////////////////////////////////////////////////////////////////////////////
                    this.http.get(this.rootURL + 'commandes4/').subscribe(resp2 => {
                      this.http.get(this.rootURL + 'stores/').subscribe(resp3 => {
                        this.listhist3 = [];
                        this.listeStore0 = [];
                        for (var i = 0; i < Number(resp3['length']); i++) {
                          // @ts-ignore
                          this.store0 = {
                            StoreID: null,
                            nom: ''
                          }

                          this.store0.StoreID = resp3[i]["id"];
                          this.store0.nom = resp3[i]["nom"];
                          this.store0.Commercant = resp3[i]["Commercant"];
                          this.listeStore0.push(this.store0);

                        }

                        this.revenuCeJour = 0
                        for (var i = 0; i < Number(resp2['length']); i++) {
                          // @ts-ignore
                          this.historique3 = {
                            enfant: null,
                            store: null,
                            prixcommande: 0,
                            dateachat: null

                          }

                          this.historique3.dateachat = (resp2[i]["dateCommande"]).substring(0, 10);
                          this.historique3.prixcommande = (resp2[i]["prixTotal"]);
                          this.revenuCeJour = this.revenuCeJour + this.historique3.prixcommande;

                          for (var j = 0; j < this.listeStore0.length; j++) {

                            if (resp2[i]["Store"] == this.listeStore0[j].StoreID) {

                              this.historique3.store = this.listeStore0[j]
                            }


                          }

                          if (this.historique3.store != null && this.historique3.store.Commercant == this.commercantnumber) {
                            this.listhist3.push(this.historique3);
                          }




                        }
                        console.log(this.listhist3, "thiiiiiiiisss");

                        this.nbrClientParJour4 = 0;
                        this.nbrClientParJour4 = this.listhist3.length;
                        this.listeNbrTransaction.push(this.nbrClientParJour4)
                        this.listeSommeParJour.push(this.revenuCeJour)
                        //////////////////////////////////////////////////////////////////////////////////////////////
                        this.http.get(this.rootURL + 'commandes5/').subscribe(resp2 => {
                          this.http.get(this.rootURL + 'stores/').subscribe(resp3 => {
                            this.listhist3 = [];
                            this.listeStore0 = [];
                            for (var i = 0; i < Number(resp3['length']); i++) {
                              // @ts-ignore
                              this.store0 = {
                                StoreID: null,
                                nom: ''
                              }

                              this.store0.StoreID = resp3[i]["id"];
                              this.store0.nom = resp3[i]["nom"];
                              this.store0.Commercant = resp3[i]["Commercant"];
                              this.listeStore0.push(this.store0);

                            }

                            this.revenuCeJour = 0
                            for (var i = 0; i < Number(resp2['length']); i++) {
                              // @ts-ignore
                              this.historique3 = {
                                enfant: null,
                                store: null,
                                prixcommande: 0,
                                dateachat: null

                              }

                              this.historique3.dateachat = (resp2[i]["dateCommande"]).substring(0, 10);
                              this.historique3.prixcommande = (resp2[i]["prixTotal"]);
                              this.revenuCeJour = this.revenuCeJour + this.historique3.prixcommande;

                              for (var j = 0; j < this.listeStore0.length; j++) {

                                if (resp2[i]["Store"] == this.listeStore0[j].StoreID) {

                                  this.historique3.store = this.listeStore0[j]
                                }


                              }

                              if (this.historique3.store != null && this.historique3.store.Commercant == this.commercantnumber) {
                                this.listhist3.push(this.historique3);
                              }




                            }
                            console.log(this.listhist3, "thiiiiiiiisss");

                            this.nbrClientParJour5 = 0;
                            this.nbrClientParJour5 = this.listhist3.length;
                            this.listeNbrTransaction.push(this.nbrClientParJour5)
                            this.listeSommeParJour.push(this.revenuCeJour)
                            //////////////////////////////////////////////////////////////////////////////////////////////
                            this.http.get(this.rootURL + 'commandes6/').subscribe(resp2 => {
                              this.http.get(this.rootURL + 'stores/').subscribe(resp3 => {
                                this.listhist3 = [];
                                this.listeStore0 = [];
                                for (var i = 0; i < Number(resp3['length']); i++) {
                                  // @ts-ignore
                                  this.store0 = {
                                    StoreID: null,
                                    nom: ''
                                  }

                                  this.store0.StoreID = resp3[i]["id"];
                                  this.store0.nom = resp3[i]["nom"];
                                  this.store0.Commercant = resp3[i]["Commercant"];
                                  this.listeStore0.push(this.store0);

                                }

                                this.revenuCeJour = 0
                                for (var i = 0; i < Number(resp2['length']); i++) {
                                  // @ts-ignore
                                  this.historique3 = {
                                    enfant: null,
                                    store: null,
                                    prixcommande: 0,
                                    dateachat: null

                                  }

                                  this.historique3.dateachat = (resp2[i]["dateCommande"]).substring(0, 10);
                                  this.historique3.prixcommande = (resp2[i]["prixTotal"]);
                                  this.revenuCeJour = this.revenuCeJour + this.historique3.prixcommande;

                                  for (var j = 0; j < this.listeStore0.length; j++) {

                                    if (resp2[i]["Store"] == this.listeStore0[j].StoreID) {

                                      this.historique3.store = this.listeStore0[j]
                                    }


                                  }

                                  if (this.historique3.store != null && this.historique3.store.Commercant == this.commercantnumber) {
                                    this.listhist3.push(this.historique3);
                                  }




                                }
                                console.log(this.listhist3, "thiiiiiiiisss");

                                this.nbrClientParJour6 = 0;
                                this.nbrClientParJour6 = this.listhist3.length;
                                this.listeNbrTransaction.push(this.nbrClientParJour6)
                                this.listeSommeParJour.push(this.revenuCeJour)

                                this.max = this.listeNbrTransaction[0]
                                this.min = this.listeNbrTransaction[0]
                                for (var k = 0; k < this.listeNbrTransaction.length; k++) {

                                  if (this.listeNbrTransaction[k] > this.max) {
                                    this.max = this.listeNbrTransaction[k]
                                  }
                                  if (this.listeNbrTransaction[k] < this.min) {
                                    this.min = this.listeNbrTransaction[k]
                                  }
                                }

                                this.maxS = this.listeSommeParJour[0]
                                this.minS = this.listeSommeParJour[0]
                                for (var k = 0; k < this.listeSommeParJour.length; k++) {

                                  if (this.listeSommeParJour[k] > this.maxS) {
                                    this.maxS = this.listeSommeParJour[k]
                                  }
                                  if (this.listeSommeParJour[k] < this.minS) {
                                    this.minS = this.listeSommeParJour[k]
                                  }
                                }

                                console.log(this.maxS, "listeSommeParJour")
                                console.log(this.listeSommeParJour, "listeSommeParJour")
                                /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

                                const dataDailySalesChart: any = {
                                  labels: ['', '', '', '', '', "aujourd'hui",'' ],
                                  series: [
                                    [this.nbrClientParJour6, this.nbrClientParJour5, this.nbrClientParJour4, this.nbrClientParJour3, this.nbrClientParJour2, this.nbrClientParJour1, this.nbrClientParJour0]
                                  ]
                                };


                                const optionsDailySalesChart: any = {
                                  lineSmooth: Chartist.Interpolation.cardinal({
                                    tension: 0
                                  }),
                                  low: 0,
                                  high: this.max + 2, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                                  chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
                                }

                                var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

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
                                  chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
                                }

                                var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

                                // start animation for the Completed Tasks Chart - Line Chart
                                this.startAnimationForLineChart(completedTasksChart);



                                /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

                                var datawebsiteViewsChart = {
                                  labels: ['', '', '', '', '', "", "aujourd'hui"],
                                  series: [
                                    [this.listeSommeParJour[6], this.listeSommeParJour[5], this.listeSommeParJour[4], this.listeSommeParJour[3], this.listeSommeParJour[2], this.listeSommeParJour[1], this.listeSommeParJour[0]]

                                  ]
                                };
                                var optionswebsiteViewsChart = {
                                  axisX: {
                                    showGrid: false
                                  },
                                  low: 0,
                                  high: this.maxS+5,
                                  chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
                                };
                                var responsiveOptions: any[] = [
                                  ['screen and (max-width: 640px)', {
                                    seriesBarDistance: 5,
                                    axisX: {
                                      labelInterpolationFnc: function (value) {
                                        return value[0];
                                      }
                                    }
                                  }]
                                ];
                                var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

                                //start animation for the Emails Subscription Chart
                                this.startAnimationForBarChart(websiteViewsChart);
                              })
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }

  histo(id: number) {
    this.router.navigate(['KidsPay/Aceuilcommercant/Historique/dashboard1'], { queryParams: { idm: id } });
    localStorage.setItem("selectedStore", id+""); 
  }

}
