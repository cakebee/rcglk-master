import { Component, OnInit } from '@angular/core';
import {domain} from '../../config';
import {dateTrans} from '../../data.model';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  prizeList: any;
  orgList: any;
  paperList: any;
  data: any;
  _loading: boolean = true;
  operatingType: string;
  operatingId: string;
  reason: string;
  isVisible: boolean = false;
  allButtonDisable: boolean = false;
  submitButtonDisable: boolean = true;

  getUnreviewed() {
    this._loading = true;
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (JSON.parse(xhr.responseText).code == "100") {
            this.prizeList = JSON.parse(xhr.responseText).extend.list.prizeList;
            this.orgList = JSON.parse(xhr.responseText).extend.list.orgList;
            this.paperList = JSON.parse(xhr.responseText).extend.list.paperList;

            for (var i in this.prizeList){
              this.prizeList[i].prizeDate = dateTrans(this.prizeList[i].prizeDate);
            }
            for (var i in this.paperList){
              this.paperList[i].date = dateTrans(this.paperList[i].date);
            }
            for (var i in this.orgList){
              this.orgList[i].orgBegin = dateTrans(this.orgList[i].orgBegin);
              this.orgList[i].orgEnd = dateTrans(this.orgList[i].orgEnd);
            }

            this._loading = false;
          }
          else {
            alert("请求失败，稍后再试...")
            this._loading = false;
          }
        }
        else {
          alert("服务器无响应，请稍后再试...")
          this._loading = false;
        }
      }
    };
    xhr.open('GET', `${domain}/reviewList`);
    xhr.send();
  }

  rmPrize(prizeId: string){
    this._loading = true;
    for (var i in this.prizeList){
      if(this.prizeList[i].prizeId == prizeId) {
        this.prizeList.splice(i, 1);
      }
    }
    this._loading = false;
  }
  rmPaper(paperId: string) {
    this._loading = true;
    for (var i in this.paperList) {
      if (this.paperList[i].id == paperId) {
        this.paperList.splice(i, 1);
      }
    }
    this._loading = false;
  }
  rmOrg(orgId: string) {
    this._loading = true;
    for (var i in this.orgList) {
      if (this.orgList[i].id == orgId) {
        this.orgList.splice(i, 1);
      }
    }
    this._loading = false;
  }

  submitPassPrize(prizeId: string) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.success();
        } else {
          this.error();
        }
      }
    }
    xhr.open('POST', `${domain}/Studentsprize/check`);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
    xhr.send(`isPassed=pass&prizeId=${prizeId}`);
  }

  submitPassPaper(paperId: string) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.success();
        } else {
          this.error();
        }
      }
    }
    xhr.open('POST', `${domain}/Paper/review`);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
    xhr.send(`isPassed=pass&paperId=${paperId}`);
  }

  submitPassOrg(orgId: string) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.success();
        } else {
          this.error();
        }
      }
    }
    xhr.open('POST', `${domain}/Studentsorg/review`);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
    xhr.send(`isPassed=pass&orgId=${orgId}`);
  }

  submitNotPassPrize(prizeId: string) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.success();
        } else {
          this.error();
        }
      }
    }
    xhr.open('POST', `${domain}/Studentsprize/check`);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
    xhr.send(`isPassed=unpass&prizeId=${prizeId}&reason=${this.reason}`);
  }

  submitNotPassPaper(paperId: string) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.success();
        } else {
          this.error();
        }
      }
    }
    xhr.open('POST', `${domain}/Paper/review`);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
    xhr.send(`isPassed=unpass&paperId=${paperId}&reason=${this.reason}`);
  }

  submitNotPassOrg(orgId: string) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.success();
        } else {
          this.error();
        }
      }
    }
    xhr.open('POST', `${domain}/Studentsorg/review`);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
    xhr.send(`isPassed=unpass&orgId=${orgId}&reason=${this.reason}`);
  }

  showReasonModal() {
    this.isVisible = true;
  }

  cancelReasonModal() {
    this.operatingType = '';
    this.operatingId = '';
    this.reason = '';
    this.isVisible = false;
  }

  notPass(type: string, id: string) {
    this.operatingType = type;
    this.operatingId = id;
    this.showReasonModal();
  }

  pass(type: string, id: string) {
    this.operatingType = type;
    this.operatingId = id;
    this.confirmPass();
  }

  confirmNotPass() {
    this._loading = true
    if (this.operatingType == 'prize') {
      this.rmPrize(this.operatingId);
      this.submitNotPassPrize(this.operatingId);
    }
    else if (this.operatingType == 'org') {
      this.rmOrg(this.operatingId);
      this.submitNotPassOrg(this.operatingId);
    }
    else if (this.operatingType == 'paper') {
      this.rmPaper(this.operatingId);
      this.submitNotPassPaper(this.operatingId);
    }
    this._loading = false;
    this.cancelReasonModal();
  }

  confirmPass() {
    if (this.operatingType == 'prize') {
      this.rmPrize(this.operatingId);
      this.submitPassPrize(this.operatingId);
    }
    else if (this.operatingType == 'org') {
      this.rmOrg(this.operatingId);
      this.submitPassOrg(this.operatingId);
    }
    else if (this.operatingType == 'paper') {
      this.rmPaper(this.operatingId);
      this.submitPassPaper(this.operatingId);
    }
    this.cancelReasonModal();
  }

  success() {
    this.message.create('success', '操作成功');
    this.getUnreviewed();
  }

  error() {
    this.message.create('error', '操作失败');
    this.getUnreviewed();
  }

  constructor(private message: NzMessageService) { }

  ngOnInit() {
    this.getUnreviewed();
  }

}
