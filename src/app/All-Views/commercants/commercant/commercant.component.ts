import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {CommercantService} from "../../../Services/commercant.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-commercant',
  templateUrl: './commercant.component.html',
  styleUrls: ['./commercant.component.css']
})
export class CommercantComponent implements OnInit {

  constructor(private service: CommercantService,

              private router: Router,
              private currentRoute: ActivatedRoute) { }

  ngOnInit() {
    const commercantId = this.currentRoute.snapshot.paramMap.get('id');
    if (commercantId == null) {
      this.resetForm();
    } else {
      this.service.getCommercantById(parseInt(commercantId)).then(res => {
        this.service.formData = res;
      });
    }
  }

  resetForm(form?: NgForm) {
    if (form = null) {
      form.resetForm();
    }
    this.service.formData = {
      CommercantID: null,
      nom: '',
      prenom: '',
      numTel: '',
      role: 'commercant',
      cin: '',
      email: '',
      password: ''
    };
  }

  onSubmit(form: NgForm) {
    this.service.saveOrUpdateCommercant().subscribe(res => {
      this.resetForm();
      alert('Submittedsuccessfully')
      this.router.navigate(['KidsPay/AceuilAdmin/commercants']);
    });
  }

}