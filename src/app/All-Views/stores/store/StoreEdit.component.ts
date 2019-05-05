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
export class StoreEditComponent implements OnInit {
  commercantList : Commercant[]
  isValid:boolean= true;
  
  file: File = null;
  fileToUpload: File = null;
  imageUrl = '/assets/img/newpicture.png';
  
  map:mapboxgl.Map;
  style = 'mapbox://styles/mapbox/outdoors-v9'
  lng = 37.00121803133517
  lat =  10.986769595762837;
  message = 'here'
  marker = new mapboxgl.Marker({
    draggable: true
    })

  constructor(private service: StoreService,
    private commercantService: CommercantService,
    private router : Router,
    private currentRoute:ActivatedRoute,
    private http: HttpClient ) { 
      mapboxgl.accessToken=environment.mapbox.accessToken
  }

  ngOnInit() {
    if ( localStorage.getItem('session') === 'false') {

      this.router.navigate(['KidsPay/Erreur']);
    
    
    }
    this.commercantService.getCommercantList().then(res=> this.commercantList = res as Commercant[])
    let storeID = this.currentRoute.snapshot.paramMap.get('id')
    if(storeID==null)
    this.resetForm();
    else
this.service.getStoreByID(parseInt(storeID)).then(res=>{
  this.initializeMap();
this.service.formData = res
this.imageUrl=environment.apiURL2+'/'+this.service.formData.photo
this.lat=this.service.formData.latitude
this.lng=this.service.formData.longitude
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
        this.lat= this.service.formData.latitude
        this.lng= this.service.formData.longitude
        this.map.flyTo({
          center:[this.lng,this.lat]
        })
        this.marker
      .setLngLat([this.lng, this.lat])
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
      center:[this.lng,this.lat]
    })

    this.map.addControl(new mapboxgl.NavigationControl())

    this.marker
      .setLngLat([this.lng, this.lat])
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
      id:null,
      nom:'',
      adresse:'',
      Commercant:0,
      latitude:0,
      longitude:0,
      photo:''
    }
  }


  validateForm(){
   
  }

  

  onSubmit(form?: NgForm) {
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
          this.service.UpdateStore()
        .subscribe(resp => {
            console.log(resp, 'res');
            alert('edit avec succès');
            this.router.navigate(['KidsPay/AceuilAdmin/stores']);
          
          },
          error => {
            console.log(error, 'error');
          });


        }, (error) => {
          console.log('Error! ', error);

          this.service.UpdateStore()
        .subscribe(resp => {
            console.log(resp, 'res');
            alert('edit avec succès');
            this.router.navigate(['KidsPay/AceuilAdmin/stores']);
          
          })
          
        });


    } catch (e) {
      console.log(e);
    }

    }}

  }
