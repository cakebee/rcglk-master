import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import {domain} from '../config';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  prizeBadge = 0;
  essayBadeg = 0;

  getBadge() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () =>{
      if (xhr.readyState === 4){
        if (xhr.status === 200){
          if (JSON.parse(xhr.responseText).code === 100) {
            this.prizeBadge = JSON.parse(xhr.responseText).extend.map.prizeBadge;
          }
        }
      }
    }
    xhr.open('get', `${domain}/Badge`);
    xhr.send();
  }

  logout() {
    this.userService.user = { 'userName': '', 'userType': ''};
    this.router.navigateByUrl("/login");
    localStorage.removeItem("urscegrlNcawmzey");
    localStorage.removeItem("urscegrlTcywpzey");
  }
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.getBadge();
  }

}
