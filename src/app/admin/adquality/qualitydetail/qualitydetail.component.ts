import { Component, OnInit } from '@angular/core';
import {domain} from '../../../config';
import {ActivatedRoute} from '@angular/router';
import {dateTrans} from '../../../data.model';

@Component({
  selector: 'app-qualitydetail',
  templateUrl: './qualitydetail.component.html',
  styleUrls: ['./qualitydetail.component.css']
})
export class QualitydetailComponent implements OnInit {
  stuId: string;
  stuName: string;
  prizeList = [];
  orgList = [];
  paperList = [];
  grade: any;

  _loading = false;
  getQualityDetail() {
    this._loading = true;
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (JSON.parse(xhr.responseText).code == '100') {
            this.prizeList = JSON.parse(xhr.responseText).extend.detail.prizeList;
            this.orgList = JSON.parse(xhr.responseText).extend.detail.orgList;
            this.paperList = JSON.parse(xhr.responseText).extend.detail.paperList;
            this.grade = JSON.parse(xhr.responseText).extend.detail.grade;
            this.stuId = this.grade.stuId;
            this.stuName = this.grade.stuName;
            for (var i in this.prizeList) {
              this.prizeList[i].prizeDate = dateTrans(this.prizeList[i].prizeDate);
            }
            for (var i in this.orgList) {
              this.orgList[i].orgBegin = dateTrans(this.orgList[i].orgBegin);
              this.orgList[i].orgEnd = dateTrans(this.orgList[i].orgEnd);
            }
            for (var i in this.paperList){
              this.paperList[i].date = dateTrans(this.paperList[i].date);
            }
            this._loading = false;
          }
          else {
            alert("请求失败，稍后再试...");
            this._loading = false;
          }
        }
        else {
          alert("服务器无响应，请稍后再试...");
          this._loading = false;
        }
      }
    };
    xhr.open('GET', `${domain}/StudentQuality/detail/${this.stuId}`);
    xhr.send();
  }

  constructor(private route: ActivatedRoute) {
    this.stuId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getQualityDetail();
  }

}
