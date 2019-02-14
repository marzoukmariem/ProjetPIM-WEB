import { Component, OnInit } from '@angular/core';
import { CommercantService } from '../../Services/commercant.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-commercants',
  templateUrl: './commercants.component.html',
  styles: []
})
export class CommercantsComponent implements OnInit {
commercantList;

  constructor(private service:CommercantService,
    private router:Router,
   ) { }

  ngOnInit() {
    $('#spinner').show();
    $('#spinner2').hide();
    this.service.getCommercantList().then(res=> {this.commercantList = res
      $('#spinner').hide();
    });
    
  }

  refreshList(){
    this.service.getCommercantList().then(res=> this.commercantList = res);
  }

  openForEdit(id:number){
    this.router.navigate(['/KidsPay/AceuilAdmin/commercant/edit/'+id])
  }

  onOrderDelete(id:number){
    if(confirm('Are you sure to delete this ?')){
      this.service.deleteCommercant(id).then(res=>{
        this.refreshList();
        
      }); 
    }
  }

}
