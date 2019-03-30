import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EnfantService} from '../../Services/enfant.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '../../Models/store.model';
import {noop} from 'rxjs';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {
  // get accessor
  get value(): any {
    return this.isChecked;
  }

  // set accessor including call the onchange callback
  set value(value: any) {
    this.isChecked = value;
  }
  storeList: Store[] = [];
  enfantnumber: number;
  constructor(private service: EnfantService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      console.log(params); // {order: "popular"}

      this.enfantnumber = params.idp;
      console.log('id:' + this.enfantnumber); // popular
    });
  }
  @Input() label: string;
  @Input() isChecked = false;
  @Input() disabled = false;
  @Output() getChange = new EventEmitter();
  @Input() className: string;

  private  onTouchedCallback: () => void = noop;
  private  onChangeCallback: (_: any) => void = noop;
  ngOnInit() {
    this.service.gethistoriquebyenfant(this.enfantnumber);
    this.service.getStoresList();
    console.log('nvlist:' + this.storeList);
  }
  onChange(isChecked) {
    this.value = isChecked;
    console.log(this.isChecked);
    this.getChange.emit(this.isChecked);
    this.onChangeCallback(this.value);
    if (this.isChecked === true) {
      console.log('hello its true');
      console.log(this.enfantnumber);
      this.service.activercompteenfant(this.enfantnumber);
    } else {
      console.log('hello its false');
      this.service.Desactivercompteenfant(this.enfantnumber);
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
