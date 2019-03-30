import * as moment from "../../assets/bower_components/moment/moment";
import _date = moment.unitOfTime._date;
import { Enfant } from './enfant.model';
import { Store } from './store.model';

export class Historique {
  public  idstore:number;
  public  nommagasin:string;
  public dateachat:_date;
  public prixcommande:number;
  public adresse:String;

  public enfant:Enfant;
  public store:Store
}
