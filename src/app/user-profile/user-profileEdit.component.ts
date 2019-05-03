import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginComponent } from '../views/login/login/login.component';
import { NgForm } from '@angular/forms';
import { CommercantService } from '../Services/commercant.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profileEdit.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileEditComponent implements OnInit {
  user1: User
  balance:number=0
  readonly rootURL = environment.apiURL+"/"
  constructor(private http: HttpClient,
    private service: CommercantService,
    private router: Router,) { 
  }

  ngOnInit() {
     // @ts-ignore
    this.user1 = {
      id:null,
      nom: '',
      prenom:'',
      email:'',
      numTel:'null',
      password :'',
      role:'',
    }
    
    this.http.get(this.rootURL + 'userInfo/?iduser='+localStorage.getItem("token")).subscribe(resp2 => {
      console.log(localStorage.getItem("token"), "token dans profile");
      this.user1.id = resp2[0]["pk"];
      this.user1.nom = resp2[0]["fields"]["nom"];
      this.user1.prenom = resp2[0]["fields"]["prenom"];
      this.user1.email = resp2[0]["fields"]["email"];
      this.user1.numTel = resp2[0]["fields"]["numTel"];
      this.user1.password = resp2[0]["fields"]["password"];
      this.user1.role = resp2[0]["fields"]["role"];
      this.user1.cin = resp2[0]["fields"]["cin"];
      this.balance= resp2[0]["fields"]["balance"];
      console.log( this.user1.nom,'nom')


    })
    }

    onSubmit(form:NgForm){
      // @ts-ignore
     this.service.formData=this.user1
      this.service.UpdateCommercantProfile().subscribe(res =>{
        
        alert('Updated Successfully')
        this.router.navigate(['KidsPay/AceuilComerçant/user-profile'])
      })
    }

    

    




}
