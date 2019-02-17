import { Component, OnInit } from '@angular/core';
import {ParentService} from "../../Services/parent.service";
import {EnfantService} from "../../Services/enfant.service";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-enfant',
  templateUrl: './enfant.component.html',
  styleUrls: ['./enfant.component.css']
})
export class EnfantComponent implements OnInit {
parentnumber:number

  constructor(private service: EnfantService,private route: ActivatedRoute,private router: Router) {
    this.route.queryParams.subscribe(params => {
      console.log(params); // {order: "popular"}

      this.parentnumber = params.idp;
      console.log(this.parentnumber); // popular
    });
  }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    // @ts-ignore
    this.service.formData = {
      id: null,
      nom: '',
      prenom: '',
      solde: null,
      idtag:'',
      etatCompte:'',
      parent: null,
    }

  }

  onSubmit(form?: NgForm) {
    {
      try {


        let user = {
          nom: this.service.formData.nom,
          prenom: this.service.formData.prenom,
          solde: this.service.formData.solde,
          idtag: this.service.formData.idtag,
          etatCompte:"Actif",
          parent:this.parentnumber

        }


        // console.log(author,"author")
        this.service.postenfant(user)
          .subscribe(resp => {
              console.log(resp, "res");
              alert('enfant a été ajouté avec succès')
              this.router.navigate(['KidsPay/AceuilAdmin/parents'])

            },
            error => {
              console.log(error, "error");
            })

      } catch (e) {
        console.log(e);
      }

    }

  }
}
