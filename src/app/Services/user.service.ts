import { Injectable } from '@angular/core';
import {User} from '../Models/user.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  formData: User;
  Data: [any];
  readonly rootURL = environment.apiURL+'/';
  constructor(private http: HttpClient) { }

  toconnect(email: string , password: string) {
    return this.http.get(environment.apiURL + '/login/?email=' + email + '&password=' + password);


  }
}
