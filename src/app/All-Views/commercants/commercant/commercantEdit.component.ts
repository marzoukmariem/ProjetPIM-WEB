import { Component, OnInit } from '@angular/core';
import { CommercantService } from 'src/app/Services/commercant.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-commercant',
  templateUrl: './commercant.component.html',
  styleUrls: ["./commercant.component.css"]
})
export class CommercantEditComponent implements OnInit {

  constructor(private service: CommercantService,
    private router: Router,
    private currentRoute:ActivatedRoute) { }
  
  ngOnInit() {
    let commercantId= this.currentRoute.snapshot.paramMap.get('id')
    if(commercantId==null)
    this.resetForm();
    else {
      this.service.getCommercantById(parseInt(commercantId)).then(res=>{
        
        this.service.formData = res;
        this.service.formData.photo='aa'
      }); 
    }
  }

  resetForm(form?:NgForm){
    if(form=null)
    form.resetForm();
      // @ts-ignore
    this.service.formData = {
      id:null,
      nom:'',
      prenom:'',
      numTel:'',
      role:'commercant',
      cin:'',
      email:'',
      password:'',
      photo:'',
    }
  }

  onSubmit(form:NgForm){
    $('#spinner2').show();
    this.service.UpdateCommercant().subscribe(res =>{
      this.resetForm();
      alert('Submittedsuccessfully')
      this.router.navigate(['KidsPay/AceuilAdmin/commercants'])
    })
  }

}


