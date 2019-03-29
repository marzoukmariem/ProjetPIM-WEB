import {Store} from './store.model';
import {Enfant} from './enfant.model';
import * as moment from 'moment';
import _date = moment.unitOfTime._date;

export class Histo {
  public  enfant: Enfant;
  public  store: Store;
  public dateachat: _date;
  public prixcommande: number;

}
