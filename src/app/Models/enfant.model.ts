export class Enfant {
 public id:number;
  public nom :string;
  public prenom :string;
  public solde :number;
  public idtag:string;
  public etatCompte:string;
  public parent:number;

  get _idtag(): string {
    return this.idtag;
  }


  get _etatCompte(): string {
    return this._etatCompte;
  }


  set _etatCompte(value: string) {
    this._etatCompte = value;
  }

  set _idtag(value: string) {
    this._idtag = value;
  }

  set _id(value: number) {
    this._id = value;
  }

  set _nom(value: string) {
    this._nom = value;
  }

  set _prenom(value: string) {
    this._prenom = value;
  }



  set _solde(value: number) {
    this._solde = value;
  }

  set _parent(value: number) {
    this._parent = value;
  }

  get _id(): number {
    return this._id;
  }

  get _nom(): string {
    return this.nom;
  }

  get _prenom(): string {
    return this.prenom;
  }



  get _solde(): number {
    return this.solde;
  }

  get _parent(): number {
    return this.parent;
  }
}
