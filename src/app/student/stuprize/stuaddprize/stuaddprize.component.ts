import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {ActivatedRoute, Router} from '@angular/router';
import {Prize, prizeTypeList, prizeLevelList, dateToString, dateTrans, prizeLevel2List} from '../../../data.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../../service/user.service';
import {domain} from '../../../config';

@Component({
  selector: 'app-stuaddprize',
  templateUrl: './stuaddprize.component.html',
  styleUrls: ['./stuaddprize.component.css']
})

export class StuaddprizeComponent implements OnInit {
  isConfirmLoading = false;
  typeList = prizeTypeList;
  levelList = prizeLevelList;
  level2List = prizeLevel2List;
  prize: Prize;
  prizeForm: FormGroup;
  fileList = [];
  previewImage: string;
  previewVisible = false;
  file: File;
  isUpdate = false;
  prizeId: any;
  targetPrize: Prize;
  introLimit = 500; //文本最长限制
  introLengthRemain = this.introLimit; //文本还剩多少能输入

  constructor(private fb: FormBuilder, private router: Router, private msg: NzMessageService,
              private userService: UserService, private route: ActivatedRoute) {
    this.prizeId = this.route.snapshot.paramMap.get('id');
    this.createForm();
  }

  ngOnInit() {
    if (this.prizeId != null) {
      this.isUpdate = true;
      this.getPrize(this.prizeId);
      this.checkIntro();
    }
  }

  createForm() {
    this.prize = new Prize('', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '');
    this.prizeForm = this.fb.group(this.prize);
  }

  _submitForm() {
    /*let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let formdata = new FormData();
          formdata.append('prizeId', JSON.parse(xhr.responseText).extend.prizeId);
          formdata.append('file', this.file);
          var request = new XMLHttpRequest();
          request.open('POST', `${domain}/file`);
          request.send(formdata);
          request.onreadystatechange = () => {
            if (request.readyState === 4) {
              if (request.status === 200) {
                alert('提交成功');
                this.router.navigateByUrl('/student/viewprize');
              } else {
                this.msg.error(JSON.parse(xhr.responseText).extend.msg);
              }
            }
          };
          this.isConfirmLoading = false;
        } else {
          // 失败，根据响应码判断失败原因
          this.isConfirmLoading = false;
        }
      }
    };*/
    this.isConfirmLoading = true;
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (JSON.parse(xhr.responseText).code === 100) {
            this.msg.create('success', '提交成功！请等待审核。')
            this.router.navigateByUrl('/student/review');
          } else {
            this.msg.create('error', JSON.parse(xhr.responseText).extend.msg);
            this.isConfirmLoading = false;
          }
        } else {
          // 失败，根据响应码判断失败原因
          this.msg.create('error', '提交失败,服务器未响应');
          this.isConfirmLoading = false;
        }
      }
    }
    let stuClass;
    if (this.prizeForm.controls.prizeClass.value[1] == null) {
      stuClass = this.prizeForm.controls.prizeClass.value[0];
    } else {
      stuClass = this.prizeForm.controls.prizeClass.value[0] + '/' + this.prizeForm.controls.prizeClass.value[1];
    }
    const studentsprize = {
      'prizeId': this.prizeId,
      'stuId': this.userService.user.userName,
      'prizeName': this.prizeForm.controls.prizeName.value,
      'prizeClass': stuClass,
      'stuName': this.userService.user.stuName,
      'prizeLevel': this.prizeForm.controls.prizeLevel.value,
      'prizeLevel2': this.prizeForm.controls.prizeLevel2.value,
      'prizeIntro': this.prizeForm.controls.prizeIntro.value,
      'prizeDate': this.prizeForm.controls.prizeDate.value
    };
    this.prizeForm.disable();
    const formDate = new FormData();
    formDate.append('prize', JSON.stringify(studentsprize));
    formDate.append('file', this.file);

    if (this.isUpdate) {
      xhr.open('POST', `${domain}/Studentsprize/update`);
      xhr.send(formDate);
    } else {
      xhr.open('POST', `${domain}/Studentsprize`);
      xhr.send(formDate);
    }
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

    if (isPDF && isLT4M) {
      this.file = file;
      this.fileList.push(file);
      this.msg.success('添加成功');
    }
    return false;
  }

  getPrize(id) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (JSON.parse(xhr.responseText).code == 100) {
            this.targetPrize = JSON.parse(xhr.responseText).extend.prize;
            let s: string = this.targetPrize.prizeClass;
            const prizeClass = s.split('/');
            this.prizeForm.get('prizeId').setValue(this.targetPrize.prizeId);
            this.prizeForm.get('prizeName').setValue(this.targetPrize.prizeName);
            this.prizeForm.get('prizeClass').setValue(prizeClass);
            this.prizeForm.get('prizeLevel').setValue(this.targetPrize.prizeLevel);
            this.prizeForm.get('prizeLevel2').setValue(this.targetPrize.prizeLevel2);
            this.prizeForm.get('prizeDate').setValue(dateTrans(this.targetPrize.prizeDate));
            this.prizeForm.get('prizeIntro').setValue(this.targetPrize.prizeIntro);
          } else {
            this.msg.error(JSON.parse(xhr.responseText).extend.msg);
          }
        } else {
          this.msg.error('服务器无响应');
        }
      }
    };
    xhr.open('GET', `${domain}/Studentsprize/${id}`);
    xhr.send();
  }

  reset() {
    if (this.isUpdate) {
      this.getPrize(this.prizeId);
      this.msg.success('已撤回修改');
    } else {
      this.file = null;
      this.fileList = [];
      this.createForm();
    }
  }

  checkIntro() {
    let s: string = this.prizeForm.controls['prizeIntro'].value;
    const currentLength = s.length;
    if (currentLength > this.introLimit) {
      this.prizeForm.controls['prizeIntro'].setValue(s.substr(0, this.introLimit));
    }
    this.introLengthRemain = this.introLimit - currentLength;
  }
}
