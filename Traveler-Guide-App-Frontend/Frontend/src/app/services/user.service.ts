import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class CreateNewUser {
  userId: number = 0;
  constructor(private httpClient: HttpClient) { }
  createUser(user: any) {
    return this.httpClient.post('https://localhost:7075/api/User/Register', user);
  }
  loginUser(credentials: any) {
    return this.httpClient.post('https://localhost:7075/api/User/Login', credentials);
  }
  setUserId(id: number) {
    this.userId = id;
  }

  getUserId() {

    return this.userId;
  }
}
