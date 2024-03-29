import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginComponent } from '../views/login/login/login.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user1: User
  balance:number=0
  readonly rootURL = environment.apiURL+"/"
  constructor(private http: HttpClient,
    private router: Router) { 
  }

  ngOnInit() {
    if ( localStorage.getItem('session') === 'false') {

      this.router.navigate(['KidsPay/Erreur']);
    
    
    }
     // @ts-ignore
    this.user1 = {
      nom: '',
      prenom:'',
      email:'',
      numTel:'null',
    }
    
    this.http.get(this.rootURL + 'userInfo/?iduser='+localStorage.getItem("token")).subscribe(resp2 => {
      console.log(localStorage.getItem("token"), "token dans profile");
      
      this.user1.nom = resp2[0]["fields"]["nom"];
      this.user1.prenom = resp2[0]["fields"]["prenom"];
      this.user1.email = resp2[0]["fields"]["email"];
      this.user1.numTel = resp2[0]["fields"]["numTel"];
      this.balance= resp2[0]["fields"]["balance"];
      console.log( this.user1.nom,'nom')


    })
    }

    goToEdit(){
      this.router.navigate(['KidsPay/AceuilComerçant/user-profileEdit'])
    }

}
