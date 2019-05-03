import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../Services/store.service';
import {CommercantService} from '../../Services/commercant.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import {EnfantService} from '../../Services/enfant.service';
@Component({
  selector: 'app-detail-commande',
  templateUrl: './detail-commande.component.html',
  styleUrls: ['./detail-commande.component.css']
})
export class DetailCommandeComponent implements OnInit {
  URLphoto = '';
  photouser = '';
  nomuser = '';
  prenomuser = '';
  numuser = '';
  email = '';
  balanceuser = null;
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/outdoors-v9';
  lng = 35.248709;
  lat =  9.143212;
  message = 'here';
  marker = new mapboxgl.Marker({
    draggable: true
  });
  numbercommande: number;
  constructor(private service: StoreService, private  service1: EnfantService, private route: ActivatedRoute,
              private commercantService: CommercantService,
              private router: Router,
              private currentRoute: ActivatedRoute,
              private http: HttpClient ) {

    this.URLphoto = environment.apiURL1;
    this.photouser = localStorage.getItem('photouser');



    this.nomuser = localStorage.getItem('nom');

    this.prenomuser = localStorage.getItem('prenom');
    this.numuser = localStorage.getItem('numuser');
    this.email = localStorage.getItem('emailuser');
    this.balanceuser = localStorage.getItem('balanceuser');
    mapboxgl.accessToken = environment.mapbox.accessToken;

    this.route.queryParams.subscribe(params => {
      console.log(params); // {order: "popular"}

      this.numbercommande = params.idc;
      console.log('id:' + this.numbercommande); // popular
    });

    this.service1.detailstore(this.numbercommande);

  }

  ngOnInit() {
    if ( localStorage.getItem('session') === 'false') {

      this.router.navigate(['KidsPay/Erreur']);


    }
    this.service1.detailstore(this.numbercommande);
    this.service1.detailcommande(this.numbercommande);
    console.log(this.service1.lignecommande.logitude, 'log');
    console.log(this.service1.lignecommande.latitude, 'lat');
    this.initializeMap();
  }

  initializeMap() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

        this.http.get(environment.apiURL + '/detailcommande/?idcommande=' + this.numbercommande).subscribe(resp => {

          console.log(resp, 'respfromservice');

          this.http.get(environment.apiURL + '/detailcommande1/?idcommende=' + this.numbercommande).subscribe(resp1 => {


            this.http.get(environment.apiURL + '/getstorebyid/?idstore=' +  resp1[0].fields.Store).subscribe(resp2 => {

              this.lat =  resp2[0].fields.latitude;
              this.lng = resp2[0].fields.longitude;

              this.map.flyTo({
                center: [this.lng,  this.lat]
              });
              this.marker
                .setLngLat([this.lng,  this.lat])
                .addTo(this.map);

            });
          });
        });




      });
    }

    this.buildMap();


  }
  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 10,
      center: [this.lng, this.lat]
    });




  }

  onDragEnd() {

  }

}
