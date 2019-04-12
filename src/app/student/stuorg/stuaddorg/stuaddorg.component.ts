import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Route, Router} from '@angular/router';
import {Org, orgTypeList, dateToString, dateTrans} from '../../../data.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { domain } from '../../../config';
import {NzMessageService} from 'ng-zorro-antd';

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
  fileList = [];
  file: File;
  orgId: any;
  isUpdate = false;
  introLimit = 500; //文本最长限制
  introLengthRemain = this.introLimit; //文本还剩多少能输入

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService,
              private msg: NzMessageService, private route: ActivatedRoute) {
    this.orgId = this.route.snapshot.paramMap.get('id');
    this.createForm();
  }

  createForm() {
    this.org = new Org('', '', '', '', '', '',  '', '');
    this.orgForm = this.fb.group(this.org);
  }

  _submitForm() {
    this.isConfirmLoading = true;
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (JSON.parse(xhr.responseText).code == 100) {
            this.msg.success('提交成功，请等待审核');
            this.router.navigateByUrl('/student/review');
          } else {
            this.msg.error(JSON.parse(xhr.responseText).extend.msg);
          }
        } else {
          this.msg.error('服务器无响应');
          // 失败，根据响应码判断失败原因:
          this.isConfirmLoading = false;
        }
      }
    }

    this.studentsorg = {
      'orgId': this.orgId,
      'orgClass': this.orgForm.controls.orgClass.value,
      'orgName': this.orgForm.controls.orgName.value,
      'orgDuty': this.orgForm.controls.orgDuty.value,
      'orgBegin': this.orgForm.controls.orgBegin.value,
      'orgEnd': this.orgForm.controls.orgEnd.value,
      'orgIntro': this.orgForm.controls.orgIntro.value,
      'stuId': this.userService.user.userName,
      'stuName': this.userService.user.stuName,
      'orgHonor': this.orgForm.controls.orgHonor.value
    }
    const formData = new FormData();
    formData.append('org', JSON.stringify(this.studentsorg));
    formData.append('file', this.file);

    this.orgForm.disable();
    // 发送请求:
    if (this.isUpdate) {
      /*这里本来应该用PUT的，但是我没法实现后台接收PUT过来的参数*/
      xhr.open('POST', `${domain}/Studentsorg/update`);
      xhr.send(formData);
    } else {
      xhr.open('POST', `${domain}/Studentsorg`);
      xhr.send(formData);
    }
  }

  _disabledStartDate(current: Date): boolean {
    return current && current.getTime() > Date.now();
  }
  _disabledEndDate(current: Date): boolean {
    return current && current.getTime() > Date.now();
  }

  beforeUpload = (file: File) =>{
    const isPDF = file.type.split('/')[1] == 'pdf';
    if (!isPDF) {
      this.msg.error('只能上传PDF文件');
    }

    const isLT4M = file.size / 1024 / 1024 < 4;
    if (!isLT4M) {
      this.msg.error('文件大小不能超过4MB');
    }
    if (isLT4M && isPDF) {
      this.file = file;
      this.fileList.push(file);
      this.msg.success('添加成功');
    }
    return false;
  }

  getOrg(id) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let resOrg = JSON.parse(xhr.responseText).extend.studentsorg;
          resOrg.orgBegin = dateTrans(resOrg.orgBegin);
          resOrg.orgEnd = dateTrans(resOrg.orgEnd);
          this.orgForm.get('orgClass').setValue(resOrg.orgClass);
          this.orgForm.get('orgName').setValue(resOrg.orgName);
          this.orgForm.get('orgDuty').setValue(resOrg.orgDuty);
          this.orgForm.get('orgBegin').setValue(resOrg.orgBegin);
          this.orgForm.get('orgEnd').setValue(resOrg.orgEnd);
          this.orgForm.get('orgHonor').setValue(resOrg.orgHonor);
          this.orgForm.get('orgIntro').setValue(resOrg.orgIntro);
          this.checkIntro();
        } else {
          console.log(xhr.status);
        }
      }
    }
    xhr.open('get', `${domain}/Studentsorg/getorg/${id}`);
    xhr.send();
  }

  reset() {
    if (this.isUpdate) {
      this.getOrg(this.orgId);
      this.msg.success('已撤回修改');
    } else {
      this.createForm();
      this.fileList = [];
      this.file = null;
    }
  }

  checkIntro() {
    let s: string = this.orgForm.controls['orgIntro'].value;
    const currentLength = s.length;
    if (currentLength > this.introLimit) {
      this.orgForm.controls['orgIntro'].setValue(s.substr(0, this.introLimit));
    }
    this.introLengthRemain = this.introLimit - currentLength;
  }

  ngOnInit() {
    if (this.orgId != null) {
      this.isUpdate = true;
      this.getOrg(this.orgId);
    }
  }
}
