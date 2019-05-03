import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {ParentService} from '../../Services/parent.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-alimentationuser',
  templateUrl: './alimentationuser.component.html',
  styleUrls: ['./alimentationuser.component.css']
})
export class AlimentationuserComponent implements OnInit {
  URLphoto = '';
  photouser = '';
  prenomuser = '';
  nomuser = '';
  parentnumber: number;

  constructor(private service: ParentService, private route: ActivatedRoute, private router: Router, private http: HttpClient) {


    this.URLphoto = environment.apiURL1;

    this.photouser = localStorage.getItem('photouser');
    console.log(this.photouser);
    this.nomuser = localStorage.getItem('nom');

    this.prenomuser = localStorage.getItem('prenom');

    this.parentnumber = Number(localStorage.getItem('idparent'));
    console.log('idfrom update', this.parentnumber);


  }

  ngOnInit() {
    if (localStorage.getItem('session') === 'false') {

      this.router.navigate(['KidsPay/Erreur']);


    }


  }


  alimenter(form: NgForm) {

    this.http.get(environment.apiURL + '/getdetailcarte/?code=' + this.service.formData5.code).subscribe(response => {
      console.log(response.toString());
      // @ts-ignore
      if (response.length !== 0) {
        this.service.informationscarte(this.service.formData5.code);
      } else {
        alert('Code érroné ' );
      }
    });

  }
}
