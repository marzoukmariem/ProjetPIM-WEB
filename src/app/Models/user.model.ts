export class User {
  public id: number;
  public nom: string;
  public prenom: string;
  public numTel: string;
  public role: string;
  public cin: string;
  public email: string;
  public password: string;
  public photo: string;
  public balance: number;

  get _balance(): number {
    return this.balance;
  }

  set _balance(value: number) {
    this.balance = value;
  }

  set _photo(value: string) {
    this.photo = value;
  }

  get _photo(): string {
    return this._photo;
  }
  get _id(): number {
    return this.id;
  }

  get _nom(): string {
    return this.nom;
  }

  get _prenom(): string {
    return this.prenom;
  }

  get _numTel(): string {
    return this.numTel;
  }

  get _role(): string {
    return this.role;
  }

  get _cin(): string {
    return this.cin;
  }

  get _email(): string {
    return this.email;
  }

  get _password(): string {
    return this.password;
  }

  set _id(value: number) {
    this.id = value;
  }

  set _nom(value: string) {
    this.nom = value;
  }

  set _prenom(value: string) {
    this.prenom = value;
  }

  set _numTel(value: string) {
    this.numTel = value;
  }

  set _role(value: string) {
    this.role = value;
  }

  set _cin(value: string) {
    this.cin = value;
  }

  set _email(value: string) {
    this.email = value;
  }

  set _password(value: string) {
    this.password = value;
  }
}

