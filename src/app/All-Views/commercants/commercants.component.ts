import { Component, OnInit } from '@angular/core';
import { CommercantService } from '../../Services/commercant.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-commercants',
  templateUrl: './commercants.component.html',
  styleUrls: ['./commercants.component.css']
})
export class CommercantsComponent implements OnInit {
commercantList;
  commercant: any;
  searchInput: any;

  constructor(private service: CommercantService,
              private router: Router,
   ) { }

  ngOnInit() {
    $('#spinner').show();
    $('#spinner2').hide();
    this.service.getCommercantList().then(res => {this.commercantList = res;
                                                  $('#spinner').hide();
    });

  }

  refreshList() {
    this.service.getCommercantList().then(res => this.commercantList = res);
  }

  openForEdit(id: number) {
    this.router.navigate(['/KidsPay/AceuilAdmin/commercant/edit/' + id]);
  }

  onOrderDelete(id: number) {
    if (confirm('Are you sure to delete this ?')) {
      this.service.deleteCommercant(id).then(res => {
        this.refreshList();

      });
    }
  }

  update() {
    console.log(this.searchInput);
    this.service.getCommencantListSearch(this.searchInput).then(res => {

      this.commercantList = [];
      for (let i = 0; i < Number(res.length); i++) {

        // @ts-ignore
        this.commercant = {

        };
        this.commercant.id = res[i].pk;
        this.commercant.nom = res[i].fields.nom;
        this.commercant.prenom = res[i].fields.prenom;
        this.commercant.email = res[i].fields.email;
        this.commercant.numTel = res[i].fields.numTel;
        this.commercant.cin = res[i].fields.cin;
        this.commercant.role = res[i].fields.role;
        this.commercantList.push(this.commercant);
        console.log(this.commercantList);
     } })
  ;


  }


}
