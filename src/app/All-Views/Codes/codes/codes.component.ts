import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas'; 
import { HttpClient } from '@angular/common/http';
import { CommercantService } from 'src/app/Services/commercant.service';

@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.css']
})
export class CodesComponent implements OnInit {


  codes=[]
  montants=[]
  carte={id:null,code:'',montant:0}
  cartes1=[]
  constructor(private http:HttpClient,private service: CommercantService) { }

  ngOnInit() {

for (var i = 0; i <27; i++) {
  var code=this.getRandomInt(100000000000,1000000000000)
  if (i<8){
    var montant=10
  }
  else if (8>=i && i<17){
    var montant=50
  }
  else if (i>=17){
    var montant=100
  }
  this.codes.push(code)
  this.montants.push(montant)
  var carte1={code:code,montant:montant}
  this.cartes1.push(carte1)
}

  }

   getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

  public captureScreen()  
  {  
    
    for (var i = 0; i <27; i++) {
      console.log(i)
      this.carte.code=this.codes[i]+""
      this.carte.montant=this.montants[i]
      var body={
        ...this.carte
      }
      this.service.addcarte(body).subscribe(res =>{
        
      })
    }


    var data = document.getElementById('contentToConvert');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('codes.pdf'); // Generated PDF   
    }); 
    
   
  }  

}
