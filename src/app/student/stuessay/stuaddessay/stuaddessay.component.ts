import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Essay, dateToString, Paper} from '../../../data.model';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { domain } from '../../../config';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-stuaddessay',
  templateUrl: './stuaddessay.component.html',
  styleUrls: ['./stuaddessay.component.css']
})
export class StuaddessayComponent implements OnInit {
  isConfirmLoading = false;
  savePaper: any;
  paper: Paper;
  paperForm: FormGroup;
  file: File;
  fileList = [];

  authorLevelList = [
    { text: '通讯作者', value: '0' },
    { text: '第一作者', value: '1' },
    { text: '第二作者', value: '2' },
    { text: '第三作者', value: '3' },
    { text: '第四作者', value: '4' },
    { text: '第五作者', value: '5' },
    { text: '第六作者', value: '6' },
    { text: '第七作者', value: '7' },
  ]

  levelList = [
    { text: 'SCI', value: 'SCI'},
    { text: 'EI/CSSI/SSCI/一级期刊', value: 'EI/CSSI/SSCI/一级期刊'},
    { text: '核心期刊', value: '核心期刊'},
    { text: '公开发表', value: '公开发表'},
  ]

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private msg: NzMessageService ) {
    this.createForm();
  }

  createForm() {
    this.paper = new Paper( '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
    this.paperForm = this.fb.group(this.paper);
  }

  _submitForm() {
    this.isConfirmLoading = true;
    /*this.savePaper = new Paper('', this.paperForm.controls.name.value, this.userService.user.stuName,
      this.paperForm.controls.periodical, this.paperForm.controls.level,
      '', '', '', '', '',
      '', this.userService.user.userName, '',
      this.paperForm.controls.authorLevel, '', '');*/

    this.savePaper = {
      'id': '',
      'name' : this.paperForm.controls.name.value,
      'author': this.userService.user.stuName,
      'periodical': this.paperForm.controls.periodical.value,
      'level': this.paperForm.controls.level.value,
      'stuId': this.userService.user.userName,
      'authorLevel': this.paperForm.controls.authorLevel.value,
      'date': '',
      'status': '',
      'reviewDate': '',
      'reviewer': '',
      'submitDate': '',
      'reason': '',
      'accessNumber': '',
      'paperId': '',
      'url': '',
      'file': ''
    }
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.msg.create('success', '提交成功！请等待审核。')
          //this.router.navigateByUrl("/student/viewessay");
          this.isConfirmLoading = false;
        } else {
          // 失败，根据响应码判断失败原因
          this.msg.create('error', JSON.parse(xhr.responseText).extend.msg);
          this.isConfirmLoading = false;
        }
      }
    }
    let formData = new FormData();
    formData.append('paper', JSON.stringify(this.savePaper));
    formData.append('file', this.file);

    this.isConfirmLoading = false;

    xhr.open('POST', `${domain}/Paper`);
    xhr.send(formData);
  }

  beforeUpload = (file: File) => {
    const isPDF = file.type.split('/')[1] == 'pdf';
    if (!isPDF) {
      this.msg.error('只能上传PDF文件');
    }

    const isLT4M = file.size / 1024 / 1024 < 4;
    if (!isLT4M) {
      this.msg.error('文件大小不能超过4MB');
    }
    this.file = file;
    this.fileList.push(file);
    return isPDF && isLT4M && false;
  }

  reset() {
    this.createForm();
    this.fileList = [];
  }
  ngOnInit() {
  }

}
