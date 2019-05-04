import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/Services/store.service';
import { NgForm } from '@angular/forms';
import { CommercantService } from 'src/app/Services/commercant.service';
import { Commercant } from 'src/app/Models/commercant.model';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import * as mapboxgl from 'mapbox-gl'
import { environment } from 'src/environments/environment';
import { Services } from '@angular/core/src/view';

declare var $: any;

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  commercantList : Commercant[]
  isValid:boolean= true;
  
  file: File = null;
  fileToUpload: File = null;
  imageUrl = '/assets/img/newpicture.png';
  
  map:mapboxgl.Map;
  style = 'mapbox://styles/mapbox/outdoors-v9'
  lng = 35.248709
  lat =  9.143212;
  message = 'here'
  marker = new mapboxgl.Marker({
    draggable: true
    })
  _codeNom_: number;

  constructor(private service: StoreService,
    private commercantService: CommercantService,
    private router : Router,
    private currentRoute:ActivatedRoute,
    private http: HttpClient ) { 
      mapboxgl.accessToken=environment.mapbox.accessToken
  }

  ngOnInit() {
    this.initializeMap();
    this.commercantService.getCommercantList().then(res=> this.commercantList = res as Commercant[])
    let storeID = this.currentRoute.snapshot.paramMap.get('id')
    if(storeID==null)
    this.resetForm();
    else
this.service.getStoreByID(parseInt(storeID)).then(res=>{
this.service.formData = res
});
    
  }

  featuredPhotoSelected(event: any) {


    this.file = event.target.files[0];
    console.log('selected file name: =', this.file.name);

    this.fileToUpload = event.target.files.item(0);
    const reader = new FileReader();
    reader.onload = (event1: any) => {
     this.imageUrl = event1.target.result;
   };
    reader.readAsDataURL(this.fileToUpload);


 }

  initializeMap() {

    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position=>{
        this.lat= position.coords.latitude
        this.lng= position.coords.longitude
        this.map.flyTo({
          center:[position.coords.longitude,position.coords.latitude]
        })
        this.marker
      .setLngLat([position.coords.longitude, position.coords.latitude])
      .addTo(this.map);
      })
    }

    this.buildMap()

    
  }
  buildMap(){
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 10,
      center:[this.lat,this.lng]
    })

    this.map.addControl(new mapboxgl.NavigationControl())

    this.marker
      .setLngLat([this.lat, this.lng])
      .addTo(this.map);
 
      this.marker.on('dragend', (event)=>{
        var lngLat = this.marker.getLngLat();
    //console.log(lngLat.lng+"-"+lngLat.lat )
    this.service.formData.longitude=lngLat.lng
    this.service.formData.latitude=lngLat.lat
    console.log(this.service.formData)
      });

  }
  
  onDragEnd() {
    
    }
   

  resetForm(form? :NgForm){
    if (form=null)
    form.reset();
    // @ts-ignore
    this.service.formData={
      StoreID:null,
      nom:'',
      adresse:'',
      Commercant:null,
      latitude:0,
      longitude:0,
      photo:''
    }
  }


  validateForm(){
   
  }

  

  onSubmit(form?: NgForm) {
    this.hasDigitNomFind(this.service.formData.nom)
    if ( this._codeNom_ == -1 || this._codeNom_ == 10 || String(this.service.formData.adresse).length==0) {
      alert('veuillez valider tous les champs')
    } else {

    {try {
      const formData = new FormData();
      formData.append('file', this.file);
      this.http.post(environment.apiURL2+'/up.php', formData)
        .subscribe((data) => {
          console.log('Got some data from backend ', data);
          // @ts-ignore
          console.log('Got some data from backend ', data.url);
         
        // @ts-ignore
        this.service.formData.photo= data.url
      
        console.log(this.service.formData,'aaaaaaaaaaaaaaaaaaaaaaaaaa')

      // console.log(author,"author")
          this.service.saveOrUpdateStore()
        .subscribe(resp => {
            console.log(resp, 'res');
            alert('ajouté avec succès');
            this.router.navigate(['KidsPay/AceuilAdmin/stores']);
          
          },
          error => {
            console.log(error, 'error');
          });


        }, (error) => {
          console.log('Error! ', error);
          alert('veuillez choisir une photo');
        });


    } catch (e) {
      console.log(e);
    }

    }
  }
  }

  hasDigitNomFind(_str_) {
    this._codeNom_ = 10;  /*When empty string found*/
    var _strArray = [];
  
    if (_str_ !== '' || _str_ !== undefined || _str_ !== null) {
      _strArray = _str_.split('');
      for (var i = 0; i < _strArray.length; i++) {
        if (!isNaN(parseInt(_strArray[i]))) {
          this._codeNom_ = -1;
          break;
        } else {
          this._codeNom_ = 1;
        }
      }
  
    }
    return this._codeNom_;
  }


  }
