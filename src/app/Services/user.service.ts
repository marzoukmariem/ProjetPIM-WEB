import { Injectable } from '@angular/core';
import {User} from '../Models/user.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  formData: User;
  Data: [any];
  readonly rootURL = 'http://localhost:8000/kidspay/';
  constructor(private http: HttpClient) { }

  toconnect(email: string , password: string) {
    return this.http.get(this.rootURL + 'login/?email=' + email + '&password=' + password);


  }
}
