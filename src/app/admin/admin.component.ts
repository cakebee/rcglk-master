import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  logout(){
    this.userService.user = { 'userName': '', 'userType': ''};
    this.router.navigateByUrl("/login");
    localStorage.removeItem("urscegrlNcawmzey");
    localStorage.removeItem("urscegrlTcywpzey");
  }
  
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

}
