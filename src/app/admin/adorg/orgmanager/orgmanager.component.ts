import { Component, OnInit } from '@angular/core';
import {dateTrans, Org} from '../../../data.model';
import * as XLSX from 'xlsx';
import {domain, filePath} from '../../../config';


@Component({
  selector: 'app-orgmanager',
  templateUrl: './orgmanager.component.html',
  styleUrls: ['./orgmanager.component.css']
})
export class OrgmanagerComponent implements OnInit {

  orgLists: Array<any> = [];
  orgs: Array<any> = [];
  _current = 1;
  _pageSize = 10;
  _total = 0;
  _loading: boolean = true;
  isFuzzy: boolean = false;
  orgSearch: any;
  orgName: string;
  stuId: string;
  stuName: string;
  filePath = filePath;
  allChecked = false;
  disabledButton = true;
  checkedNumber = 0;
  operating = false;
  indeterminate = false;

  getorgs() {
    this._loading = true;
    this.orgLists = [];
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let resOrgs = JSON.parse(xhr.responseText).extend.pageBean.list;
          this._total = JSON.parse(xhr.responseText).extend.pageBean.total;
          for (var i in resOrgs) {
            resOrgs[i].orgBegin = dateTrans(resOrgs[i].orgBegin);
            resOrgs[i].orgEnd = dateTrans(resOrgs[i].orgEnd);
            this.orgLists.push(resOrgs[i]);
          }
          this.orgs = this.orgLists;
          this._loading = false;
        } else {
          alert("获取数据失败，请稍后再试...");
        }
      }
    }
    xhr.open('get', `${domain}/Studentsorg?pageNum=${this._current}&pageSize=${this._pageSize}`);
    xhr.send();
  }

  search() {
    this._loading = true;
    this.orgs = this.orgLists.filter((element)=>{
      if(this.orgName && element.orgName.indexOf(this.orgName)==-1){
        return false;
      }
      if(this.stuId && element.stuId.indexOf(this.stuId)==-1){
        return false;
      }
      if(this.stuName && element.stuName.indexOf(this.stuName)==-1){
        return false;
      }
      return true;
    })
    this._current = 1;
    this._loading = false;
  }

  exportExcel() {
    let sheet = [['组织(活动)名称', '学号','姓名', '类别', '职责', '开始日期', '结束日期', '说明']];
    for(let i in this.orgs){
      sheet.push([`${this.orgs[i].orgName}`,`${this.orgs[i].stuId}`,`${this.orgs[i].stuName}`,`${this.orgs[i].orgClass}`,`${this.orgs[i].orgDuty}`,`${this.orgs[i].orgBegin}`,`${this.orgs[i].orgEnd}`,`${this.orgs[i].orgIntro}`])
    }
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(sheet);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    let filename =Math.floor(Math.random()*6724195305);
    /* save to file */
    XLSX.writeFile(wb, `${filename}.xlsx`);
  }
  
  fileChange(info) {
    if(info.file.status == 'error'){
      alert('上传文件失败，请联系管理员...')
    } else if(info.file.status == 'done'){
      alert('导入成功')
      this.getorgs()
    }
  }

  downloadTemplate() {
    let sheet = [['学号','姓名','组织活动名称','组织类别','职责','起始日期','结束日期','说明']];
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(sheet);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();    
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    let filename ='组织活动信息导入模板';
    /* save to file */
    XLSX.writeFile(wb, `${filename}.xlsx`);
  }

  refreshStatus(): void {
    const allChecked = this.orgs.every(value => value.checked === true);
    const allUnChecked = this.orgs.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.disabledButton = !this.orgs.some(value => value.checked);
    this.checkedNumber = this.orgs.filter(value => value.checked).length;
    console.log(this.checkedNumber)
  }

  checkAll(value: boolean): void {
    this.orgs.forEach(data => data.checked = value);
    this.refreshStatus();
  }

  operateData(): void {
    this.operating = true;
    const opUser = this.orgs.filter( (element) => element.checked == true);
    console.log(opUser);
    setTimeout(_ => {
      this.orgs.forEach(value => value.checked = false);
      this.refreshStatus();
      this.operating = false;
    }, 1000);
    
  }

  createOrgSearch(): void {
    this.orgSearch = new Org('', '', '', '', '', '', '', '');
    this.orgSearch.stuId = '';
    this.orgSearch.stuName = '';
    this.orgSearch.orgClass = '';
    this.orgSearch.orgType = '';
    this.orgSearch.orgBegin = '';
    this.orgSearch.orgEnd = '';
    this.orgSearch.honor = '';
    this.orgSearch.submitDateBegin = '';
    this.orgSearch.submitDateEnd = '';
    this.orgSearch.reviewDateBegin = '';
    this.orgSearch.reviewDateEnd = '';
  }

  fuzzySearch(): void {
    this._loading = true;
    const list = [];
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let resOrgs = JSON.parse(xhr.responseText).extend.pageBean.list;
          this._total = JSON.parse(xhr.responseText).extend.pageBean.total;
          for (var i in resOrgs) {
            resOrgs[i].orgBegin = dateTrans(resOrgs[i].orgBegin);
            resOrgs[i].orgEnd = dateTrans(resOrgs[i].orgEnd);
            list.push(resOrgs[i]);
          }
          this.orgs = list;
          this._loading = false;
        } else {
          alert("获取数据失败，请稍后再试...");
        }
      }
    }
    xhr.open('post', `${domain}/Studentsorg/_search?pageNum=${this._current}&pageSize=${this._pageSize}`);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.send(JSON.stringify(this.orgSearch));
  }

  resetInput(): void {
    this.createOrgSearch();
  }

  getPage(): void {
    if (this.isFuzzy){
      this.fuzzySearch();
    } else {
      this.getorgs();
    }
  }

  constructor() { }

  ngOnInit() {
    this.getorgs();
    this.createOrgSearch();
  }
}
