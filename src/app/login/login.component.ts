import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { domain } from '../config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isConfirmLoading: boolean = false;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.createForm();
  }

  submitForm() {
    this.isConfirmLoading = true;
    let xhr = new XMLHttpRequest();
    // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (JSON.parse(xhr.responseText).code == "200") {
            // this.userService.add(JSON.parse(xhr.responseText));
            let resUser = JSON.parse(xhr.responseText);
            let userinfo = { 'stuName': resUser.extend.stuName, "userName": this.loginForm.controls.username.value, "userType": resUser.extend.user };
            this.userService.add(userinfo);
            localStorage.setItem('urscegrlNcawmzey', this.loginForm.controls.username.value);
            localStorage.setItem('urscegrlTcywpzey', resUser.extend.user);
            localStorage.setItem('srtcugNlacme', resUser.extend.stuName);
            if (this.userService.user.userType == "student") {
              this.router.navigateByUrl("/student/info");
            }
            else if (this.userService.user.userType == "manager") {
              this.router.navigateByUrl("/admin/user");
            }
          }
          else {
            alert("账号或密码错误")
          }
        }
        else {
          alert("服务器无响应，请稍后再试...")
          this.isConfirmLoading = false;
          // 失败，根据响应码判断失败原因:
        }
      }
    };
    xhr.open('post', `${domain}/login`);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
    xhr.send(`username=${this.loginForm.controls.username.value}&password=${this.loginForm.controls.password.value}`);
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    // window.location.href='https://ostec.uestc.edu.cn/authcas/login?service=http://localhost:4200/doLogin';
  }

}
