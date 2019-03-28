import { Injectable } from '@angular/core';
import {User} from '../Models/user.model';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  formData: User;
  Data: [any];
  readonly rootURL = 'http://192.168.43.223:8000/kidspay/';
  constructor(private http: HttpClient) { }

  toconnect(email: string , password: string) {
    return this.http.get(environment.apiURL + '/login/?email=' + email + '&password=' + password);


  }
}
