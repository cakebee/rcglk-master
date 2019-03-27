import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Org, orgTypeList, dateToString} from '../../../data.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { domain } from '../../../config';

@Component({
  selector: 'app-stuaddorg',
  templateUrl: './stuaddorg.component.html',
  styleUrls: ['./stuaddorg.component.css']
})

export class StuaddorgComponent implements OnInit {
  isConfirmLoading = false;
  typeList = orgTypeList;
  org: Org;
  orgForm: FormGroup;
  studentsorg: any;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.createForm();
  }

  createForm() {
    this.org = new Org('','','','','','', '');
    this.orgForm = this.fb.group(this.org);
  }

  _submitForm() {
    this.isConfirmLoading = true;
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          alert('提交成功');
          this.isConfirmLoading = false;
          this.router.navigateByUrl("/student/vieworg");
        } else {
          alert('提交失败，请稍后再试...')
          // 失败，根据响应码判断失败原因:
          this.isConfirmLoading = false;
        }
      }
      else{
        this.isConfirmLoading = false;
      }
    }

    let startdate = dateToString(this.orgForm.controls.orgBegin.value);
    let enddate = dateToString(this.orgForm.controls.orgEnd.value);

    this.studentsorg = {
      "orgClass": this.orgForm.controls.orgClass.value,
      "orgName": this.orgForm.controls.orgName.value,
      "orgDuty": this.orgForm.controls.orgDuty.value,
      "orgBegin": startdate,
      "orgEnd": enddate,
      "orgIntro": this.orgForm.controls.orgIntro.value,
      "stuId": this.userService.user.userName,
      "stuName": this.userService.user.stuName
    }
    // 发送请求:
    xhr.open('POST', `${domain}/Studentsorg`);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8"); 
    xhr.send(JSON.stringify(this.studentsorg));
  }

  _disabledStartDate(current: Date): boolean {
    return current && current.getTime() > Date.now();
  }
  _disabledEndDate(current: Date): boolean {
    return current && current.getTime() > Date.now();
  }
  
  ngOnInit() {
  }

}
