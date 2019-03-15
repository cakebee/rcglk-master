import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { Prize, prizeTypeList, prizeLevelList, dateToString } from '../../../data.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService} from '../../../service/user.service';
import { domain } from '../../../config';

@Component({
  selector: 'app-stuaddprize',
  templateUrl: './stuaddprize.component.html',
  styleUrls: ['./stuaddprize.component.css']
})

export class StuaddprizeComponent implements OnInit {
  isConfirmLoading = false;
  typeList = prizeTypeList;
  levelList = prizeLevelList;
  prize: Prize;
  prizeForm: FormGroup;
  fileList = [];
  previewImage: string;
  previewVisible = false;
  file: File;
  
  constructor(private fb: FormBuilder, private router: Router, private msg: NzMessageService, private userService: UserService) {
    this.createForm();
  }
  createForm() {
    this.prize = new Prize('', '', '', '', '',
      '', '', '', '', '', '', '', '', '');
    this.prizeForm = this.fb.group(this.prize);
  }
  
  _submitForm() {
    this.isConfirmLoading = true;
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let formdata = new FormData();
          formdata.append('prizeId',JSON.parse(xhr.responseText).extend.prizeId);
          formdata.append('file', this.file);
          var request = new XMLHttpRequest();
          request.open("POST", `${domain}/file`);
          request.send(formdata);
          request.onreadystatechange = () => {
            if(request.readyState === 4) {
              if(request.status === 200) {
                alert('提交成功');
                this.router.navigateByUrl("/student/viewprize");
              }
              else {
                alert('提交失败，请稍后再试...')
              }
            }
          }
          this.isConfirmLoading = false;
        } else {
          // 失败，根据响应码判断失败原因
          this.isConfirmLoading = false;
        }
      }
    }

    let stuClass;
    if (this.prizeForm.controls.prizeClass.value[1] == undefined){
      stuClass = this.prizeForm.controls.prizeClass.value[0];
    } else {
      stuClass = this.prizeForm.controls.prizeClass.value[0] + '/' + this.prizeForm.controls.prizeClass.value[1];
    }

    let studentsprize = {
      "stuId": this.userService.user.userName,
      "prizeName": this.prizeForm.controls.prizeName.value,
      "prizeClass": stuClass,
      "stuName": this.userService.user.stuName,
      "prizeLevel": this.prizeForm.controls.prizeLevel.value,
      "prizeIntro": this.prizeForm.controls.prizeIntro.value,
      "prizeDate": dateToString(this.prizeForm.controls.prizeDate.value)
    }
    
    xhr.open('POST', `${domain}/Studentsprize`);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8"); 
    xhr.send(JSON.stringify(studentsprize));
  }

  beforeUpload = (file: File) => {
    const isJPG = file.type.split('/')[0] == 'image';
    if (!isJPG) {
      this.msg.error('只能上传图像类型的文件');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.msg.error('图片大小不得超过 2MB!');
    }
    this.fileList.push(file);
    this.file = file;
    return isJPG && isLt2M && false;
  }
  
  ngOnInit() {
  }

}
