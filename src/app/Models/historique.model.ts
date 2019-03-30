import * as moment from "../../assets/bower_components/moment/moment";
import _date = moment.unitOfTime._date;

export class Historique {
  public  idstore:number;
  public  nommagasin:string;
  public dateachat:_date;
  public prixcommande:number;
  public adresse:String;
}
