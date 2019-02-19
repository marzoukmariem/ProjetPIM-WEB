import { Component, OnInit } from '@angular/core';
import {ParentService} from "../../../Services/parent.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-alimentation',
  templateUrl: './alimentation.component.html',
  styleUrls: ['./alimentation.component.css']
})
export class AlimentationComponent implements OnInit {
  parentnumber:number
  enfantnumber:number
  constructor(private service:ParentService,private route: ActivatedRoute,private router: Router) {
    this.route.queryParams.subscribe(params => {
      console.log(params); // {order: "popular"}

      this.parentnumber = params.idp;
      this.enfantnumber= params.ide;
      console.log(this.parentnumber);
      console.log(this.enfantnumber);
      // popular
    });
  }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    // @ts-ignore
    this.service.formData3 = {
      id: null,
      nom: '',
      prenom: '',
      cin: '',
      email:'',
      numTel:'',
      password:'',
      role:'',
      Montant:null,
    }

  }

  onSubmit(form?: NgForm){


this.service.updateparent2(this.parentnumber,this.enfantnumber,this.service.formData3.Montant,this.service.formData3.password)



  }
}
