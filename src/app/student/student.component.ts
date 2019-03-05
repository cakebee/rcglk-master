import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  logout(){
    window.location.href = 'https://ostec.uestc.edu.cn/authcas/logout?service=https://ostec.uestc.edu.cn/authcas/login?service=http://localhost:4200/doLogin'
    this.userService.user = { 'userName': '', 'userType': ''};
    this.router.navigateByUrl("/login");
    localStorage.removeItem("urscegrlNcawmzey");
    localStorage.removeItem("urscegrlTcywpzey");
  }

  ngOnInit() {
  }

}
