import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Essay, dateToString, Paper, dateTrans, authorTypeList, authorTypeMap} from '../../../data.model';
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
  isVisible = false;
  samePaperList: any;
  radioValue = 0;
  paperId: any;
  targetPaper: Paper; //当前修改的paper
  isUpdate = false;
  introLimit = 500; //文本最长限制
  introLengthRemain = this.introLimit; //文本还剩多少能输入

  style = {
    display: 'block',
    height: '30px',
    lineHeight: '30px'
  };

  authorLevelList = authorTypeList;
  authorLevelMap = authorTypeMap;

  levelList = [
    { text: 'SCI', value: 'SCI'},
    { text: 'EI/CSSI/SSCI/一级期刊', value: 'EI/CSSI/SSCI/一级期刊'},
    { text: '核心期刊', value: '核心期刊'},
    { text: '公开发表', value: '公开发表'},
  ]

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService,
              private msg: NzMessageService, private route: ActivatedRoute) {
    this.paperId = this.route.snapshot.paramMap.get('id');
    this.createForm();
  }
  ngOnInit() {
    if (this.paperId != null) {
      this.getPaper(this.paperId);
      this.isUpdate = true;
    }
  }
  createForm() {
    this.paper = new Paper( '', '', '', '', '',
      '', '', '', '', '', '',
      '', '', '', '', '', '');
    this.paperForm = this.fb.group(this.paper);
  }

  _submitForm() {
    this.isConfirmLoading = true;
    this.handleCancel();
    /*this.savePaper = new Paper('', this.paperForm.controls.name.value, this.userService.user.stuName,
      this.paperForm.controls.periodical, this.paperForm.controls.level,
      '', '', '', '', '',
      '', this.userService.user.userName, '',
      this.paperForm.controls.authorLevel, '', '');*/

    this.savePaper = {
      'id': this.paperForm.get('id').value,
      'name' : this.paperForm.controls.name.value,
      'author': this.userService.user.stuName,
      'periodical': this.paperForm.controls.periodical.value,
      'level': this.paperForm.controls.level.value,
      'stuId': this.userService.user.userName,
      'authorLevel': this.authorLevelList.findIndex((value, index) => value == this.paperForm.controls.authorLevel.value),
      'paperId': this.radioValue,
      'date': this.paperForm.controls.date.value,
      'intro': this.paperForm.controls.intro.value
    }
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (JSON.parse(xhr.responseText).code === 100) {
            this.msg.create('success', '提交成功！请等待审核。')
            this.router.navigateByUrl('/student/review');
            this.isConfirmLoading = false;
          } else {
            this.msg.create('error', JSON.parse(xhr.responseText).extend.msg);
          }
        } else {
          this.msg.create('error', '提交失败');
          this.isConfirmLoading = false;
        }
      }
    }
    this.paperForm.disable();
    const formData = new FormData();
    formData.append('paper', JSON.stringify(this.savePaper));
    formData.append('file', this.file);
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

    if (isPDF && isLT4M) {
      this.file = file;
      this.fileList.push(file);
      this.msg.success('添加成功');
    }

    return isPDF && isLT4M && false;
  }

  reset() {
    if (this.isUpdate) {
      this.getPaper(this.paperId);
      this.msg.success('已撤回修改');
    } else {
      this.createForm();
      this.fileList = [];
      this.file = null;
    }
  }

  showModal() {
    this.isVisible = true;
  }
  handleCancel() {
    this.isVisible = false;
  }

  getSamePaper() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (JSON.parse(xhr.responseText).code == '100') {
            this.samePaperList = JSON.parse(xhr.responseText).extend.list;
            for (const i of Object.keys(this.samePaperList)) {
              this.samePaperList[i].date = dateTrans(this.samePaperList[i].date);
            }
          }
          this.showModal();
        } else {
          this.msg.error('服务器无响应');
        }
      }
    };
    xhr.open('GET', `${domain}/Paper/same?name=${this.paperForm.controls.name.value}`);
    xhr.send();
  }

  getPaper(id) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (JSON.parse(xhr.responseText).code == 100) {
            this.targetPaper = JSON.parse(xhr.responseText).extend.paper;
            this.paperForm.get('id').setValue(this.targetPaper.id);
            this.paperForm.get('name').setValue(this.targetPaper.name);
            this.paperForm.get('authorLevel').setValue(this.authorLevelList[this.targetPaper.authorLevel]);
            this.paperForm.get('level').setValue(this.targetPaper.level);
            this.paperForm.get('periodical').setValue(this.targetPaper.periodical);
            this.paperForm.get('date').setValue(dateTrans(this.targetPaper.date));
            this.paperForm.get('intro').setValue(this.targetPaper.intro);
            this.checkIntro();
          }
        } else {
          this.msg.error('服务器无响应');
        }
      }
    };
    xhr.open('GET', `${domain}/Paper/${id}`);
    xhr.send();
  }

  checkIntro() {
    let s: string = this.paperForm.controls['intro'].value;
    const currentLength = s.length;
    if (currentLength > this.introLimit) {
      this.paperForm.controls['intro'].setValue(s.substr(0, this.introLimit));
    }
    this.introLengthRemain = this.introLimit - currentLength;
  }

}
