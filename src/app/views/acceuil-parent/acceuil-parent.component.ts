import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EnfantService} from '../../Services/enfant.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ParentService} from '../../Services/parent.service';
import {ControlValueAccessor} from '@angular/forms';

import {noop} from 'rxjs';

@Component({
  selector: 'app-acceuil-parent',
  templateUrl: './acceuil-parent.component.html',
  styleUrls: ['./acceuil-parent.component.css']
})
export class AcceuilParentComponent implements OnInit, ControlValueAccessor {

  constructor(private service: EnfantService, private route: ActivatedRoute, private router: Router) {

    this.route.queryParams.subscribe(params => {
      console.log(params); // {order: "popular"}

      this.parentnumber = params.idp;
      console.log('id:' + this.parentnumber); // popular
    });
  }

  // get accessor
  get value(): any {
    return this.isChecked;
  }

  // set accessor including call the onchange callback
  set value(value: any) {
    this.isChecked = value;
  }
  parentnumber: number;
s: number;

  @Input() label: string;
  @Input() isChecked = false;
  @Input() disabled = false;
  @Output() getChange = new EventEmitter();
  @Input() className: string;

   private  onTouchedCallback: () => void = noop;
   private  onChangeCallback: (_: any) => void = noop;

  ngOnInit() {
    this.service.getallenfantbyid(this.parentnumber);
    this.s = this.service.enfant.id;
    this.service.getsommebyid(this.s);

  }


  histo(id: number) {

    this.router.navigate(['KidsPay/Aceuilparent/Historique'], { queryParams: { idp: id } });

  }

  alimenter(id: number) {

    this.router.navigate(['KidsPay/Aceuilparent/AlimentationCompte'], { queryParams: { ide: id , idp: this.parentnumber} });

  }

  writeValue(value: any): void {
    if (value !== this.isChecked) {
      this.isChecked = value;

    }
  }

  onChange(isChecked) {
    this.value = isChecked;
    console.log(this.isChecked);
    this.getChange.emit(this.isChecked);
    this.onChangeCallback(this.value);
    if (this.isChecked === true) {
      console.log('hello its true');
      this.service.activercompteenfant(this.service.enfant.id);
    } else {
      console.log('hello its false');
      this.service.Desactivercompteenfant(this.service.enfant.id);
    }

  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  setDisabledState?(isDisabled: boolean): void {

  }



}
