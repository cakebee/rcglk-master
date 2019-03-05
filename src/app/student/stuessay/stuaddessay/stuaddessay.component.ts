import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Essay, dateToString } from '../../../data.model';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { domain } from '../../../config';

@Component({
  selector: 'app-stuaddessay',
  templateUrl: './stuaddessay.component.html',
  styleUrls: ['./stuaddessay.component.css']
})
export class StuaddessayComponent implements OnInit {
  isConfirmLoading = false;
  essay: Essay;
  essayForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.createForm();
  }

  createForm() {
    this.essay = new Essay(this.fb.array([this.fb.group({order: '', name: ''})]), '', '', '', '', '');
    this.essayForm = this.fb.group(this.essay);
  }

  addAuthor() {
    this.essay.essayAuthor.push(this.fb.group({order: '', name: ''}));
  }

  _submitForm() {
    this.isConfirmLoading = true;
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          alert('提交成功');
          this.router.navigateByUrl("/student/viewessay");
          this.isConfirmLoading = false;
        } else {
          // 失败，根据响应码判断失败原因
          this.isConfirmLoading = false;
        }
      }
    }

    let studentsessay = {
      "stuId": this.userService.user.userName,
      "essayTitle": this.essayForm.controls.essayTitle.value,
      "essayDate": dateToString(this.essayForm.controls.essayDate.value),
      "essayLevel": this.essayForm.controls.essayLevel.value,
      "periodical": this.essayForm.controls.periodical.value,
      "essayAuthor": (this.essayForm.get('essayAuthor') as FormArray).value
    }
    console.log(studentsessay)
    this.isConfirmLoading = false;

    xhr.open('POST', `${domain}/Studentsessay`);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.send(JSON.stringify(studentsessay));
  }


  ngOnInit() {
  }

}
