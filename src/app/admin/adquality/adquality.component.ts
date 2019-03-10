import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import {FormGroup} from '@angular/forms';
import {UploadFile} from 'ng-zorro-antd';
import {element} from 'protractor';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import { domain } from '../../config';

@Component({
  selector: 'app-adquality',
  templateUrl: './adquality.component.html',
  styleUrls: ['./adquality.component.css']
})
export class AdqualityComponent implements OnInit {
  qualities: any;
  qualityList: any;
  _loading = true;
  _current = 1;
  _pageSize = 10;
  _total = 0;
  tableTitle = "学生综合素质";
  isConfirmLoading: boolean = false;
  isVisible: boolean = false;
  stuId = '';
  stuName = '';
  qScientific = '';
  qGrade = '';
  qOrg = '';
  quality = '';
  filterQuality = [
    { text: '无', value: '无' },
    { text: '较差', value: '较差' },
    { text: '一般', value: '一般' },
    { text: '良好', value: '良好' },
    { text: '优秀', value: '优秀' }
  ];
  searchGradeList: string[] = [];
  searchScientificList: string[] = [];
  searchOrgList: string[] = [];
  searchQualityList: string[] = [];
  allChecked = false;
  disabledButton = true;
  checkedNumber = 0;
  operating = false;
  indeterminate = false;

  constructor() { }

  getQuality(): void{
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (JSON.parse(xhr.responseText).code == '100') {
            this.qualityList = JSON.parse(xhr.responseText).extend.pageBean.list;
            this.qualities = this.qualityList;
            this._total = JSON.parse(xhr.responseText).extend.pageBean.total;
            this._loading = false;
          }
          else {
            alert("请求失败，稍后再试...")
          }
        }
        else {
          alert("服务器无相应，请稍后再试...")
          this._loading = false;
        }
      }
    };
    xhr.open('GET', `${domain}/StudentQuality?pageNum=${this._current}&pageSize=${this._pageSize}`);
    xhr.send();
  }

  refreshQuality(): void {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (JSON.parse(xhr.responseText).code == '100') {
            this.qualityList = JSON.parse(xhr.responseText).extend.pageBean.list;
            this.qualities = this.qualityList;
            this._total = JSON.parse(xhr.responseText).extend.pageBean.total;
            this._loading = false;
          }
          else {
            alert("请求失败，稍后再试...")
          }
        }
        else {
          alert("服务器无相应，请稍后再试...")
          this._loading = false;
        }
      }
    };
    xhr.open('GET', `${domain}/RefreshStudentQuality?pageNum=${this._current}&pageSize=${this._pageSize}`);
    xhr.send();
  }

  search() {
    this._loading = true;
    this.qualities = this.qualityList.filter( (e) => {
      if (this.stuId && e.stuId.indexOf(this.stuId) === -1) {
        return false;
      }
      if (this.stuName && e.stuName.indexOf(this.stuName) === -1) {
        return false;
      }
      if (this.searchScientificList.length) {
        let result = this.searchScientificList.length;
        this.searchScientificList.forEach( (searchE) => {
          result = result + e.q_scientific.indexOf(searchE);
        });
        if (result === 0) {
          return false;
        }
      }
      if (this.searchGradeList.length) {
        let result = this.searchGradeList.length;
        this.searchGradeList.forEach( (searchE) => {
          result = result + e.q_grade.indexOf(searchE);
        });
        if (result === 0) {
          return false;
        }
      }
      if (this.searchOrgList.length) {
        let result = this.searchOrgList.length;
        this.searchOrgList.forEach( (searchE) => {
          result = result + e.q_org.indexOf(searchE);
        });
        if (result === 0) {
          return false;
        }
      }
      if (this.searchQualityList.length) {
        let result = this.searchQualityList.length;
        this.searchQualityList.forEach( (searchE) => {
          result = result + e.quality.indexOf(searchE);
        });
        if (result === 0){
          return false;
        }
      }
      return true;
    });
    this._current = 1;
    this._loading = false;
  }
  ngOnInit() {
    this.getQuality();
  }

}
