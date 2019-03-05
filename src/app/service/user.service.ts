import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  user: any = { 'userName': '', 'userType': '' }
  constructor() {
    if (localStorage.getItem("urscegrlNcawmzey") && localStorage.getItem("urscegrlTcywpzey")) {
      this.add({
        stuName: localStorage.getItem('srtcugNlacme'),
        userName: localStorage.getItem("urscegrlNcawmzey"),
        userType: localStorage.getItem("urscegrlTcywpzey")
      })
    }
  }

  public add(user: any) {
    this.user = user;
  }

  public clear() {
    this.user = null;
  }
}