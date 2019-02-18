import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/Services/store.service';
import { NgForm } from '@angular/forms';
import { CommercantService } from 'src/app/Services/commercant.service';
import { Commercant } from 'src/app/Models/commercant.model';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  commercantList : Commercant[]
  isValid:boolean= true;

  constructor(private service: StoreService,
    private commercantService: CommercantService,
    private router : Router,
    private currentRoute:ActivatedRoute ) { 
      
  }

  ngOnInit() {
    this.commercantService.getCommercantList().then(res=> this.commercantList = res as Commercant[])
    let storeID = this.currentRoute.snapshot.paramMap.get('id')
    if(storeID==null)
    this.resetForm();
    else
this.service.getStoreByID(parseInt(storeID)).then(res=>{
this.service.formData = res
});
    
  }

  resetForm(form? :NgForm){
    if (form=null)
    form.reset();
    this.service.formData={
      StoreID:null,
      nom:'',
      adresse:'',
      Commercant:0
    }
  }


  validateForm(){
   
  }

  onSubmit(form:NgForm){
    $('#spinner2').show();
    this.service.saveOrUpdateStore().subscribe(res=>{
      this.resetForm();
      //this.toastr.success('Submitted successfuly','KidsPay');
      this.router.navigate(['/KidsPay/AceuilAdmin/stores']);
    });
  }
}
