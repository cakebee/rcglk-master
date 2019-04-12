import { Component, OnInit } from '@angular/core';
import {domain, filePath} from '../../../config';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {dateTrans, Paper} from '../../../data.model';
import {PdfViewerComponent} from 'ng2-pdf-viewer';

@Component({
  selector: 'app-essaymanager',
  templateUrl: './essaymanager.component.html',
  styleUrls: ['./essaymanager.component.css']
})
export class EssaymanagerComponent implements OnInit {

  papers: Array<any> = [];
  paperList: Array<any> = [];
  _loading: boolean = true;
  _current = 1;
  _pageSize = 10;
  _total = 0;
  _pages = 0;
  paper: any;
  isFuzzy: boolean = false;
  filePath = filePath;

  paperName: string;
  stuName: string;
  periodical: string;
  filterAuthorLevel = [
    { text: '通讯作者', value: '0'},
    { text: '第一作者', value: '1'},
    { text: '第二作者', value: '2'},
    { text: '第三作者', value: '3'},
    { text: '第四作者', value: '4'},
    { text: '第五作者', value: '5'},
    { text: '第六作者', value: '6'},
    { text: '第七作者', value: '7'},
  ]
  filterLevel = [
    { text: 'SCI', value: 'SCI'},
    { text: 'EI/CSSI/SSCI/一级期刊', value: 'EI/CSSI/SSCI/一级期刊'},
    { text: '核心期刊', value: '核心期刊'},
    { text: '公开发表', value: '公开发表'},
  ]

  /*filterLevel = [
  //   { text: '国际级', value: '国际级' },
  //   { text: '国家级', value:'国家级'},
  //   { text: '省级', value:'省级'},
  //   { text: '市级', value: '市级'},
  //   { text: '校级', value: '校级' }
  ];*/
  searchLevelList: Array<string> = [];
  // filterStatus = [
  //   { text: '审核通过', value: '审核通过' },
  //   { text: '审核未通过', value: '审核未通过' },
  //   { text: '未审核', value: '未审核' }
  // ]
  searchStatusList: Array<string> = [];
  allChecked = false;
  disabledButton = true;
  checkedNumber = 0;
  operating = false;
  indeterminate = false;

  getPage() {
    if(this.isFuzzy) {
      this.fuzzySearch();
    }else {
      this.getPaper();
    }
  }

  fuzzySearch() {
    this.isFuzzy = true;
    this._loading = true;
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          if (JSON.parse(xhr.responseText).code == '100') {
            this.papers = JSON.parse(xhr.responseText).extend.pageBean.list;
            this._total = JSON.parse(xhr.responseText).extend.pageBean.total;
            this.trans();
            this._loading = false;
          } else {
            alert('获取数据失败');
            this._loading = false;
          }
        } else {
          alert('服务器无响应');
          this._loading = false;
        }
      }
    }

    xhr.open('post', `${domain}/Paper/_search?pageNum=${this._current}&pageSize=${this._pageSize}`);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.send(JSON.stringify(this.paper));
  }

  getPaper() {
    this._loading = true;
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          if (JSON.parse(xhr.responseText).code == '100') {
            this.papers = JSON.parse(xhr.responseText).extend.pageBean.list;
            this._current = JSON.parse(xhr.responseText).extend.pageBean.pageNum;
            this._pageSize = JSON.parse(xhr.responseText).extend.pageBean.pageSize;
            this._total = JSON.parse(xhr.responseText).extend.pageBean.total;
            this._pages = JSON.parse(xhr.responseText).extend.pageBean.pages;
            this.trans();
            this._loading = false;
          }else {
            alert('获取数据失败');
            this._loading = false;
          }
        }else {
          alert('服务器无响应');
          this._loading = false;
        }
      }
    }
    xhr.open('GET', `${domain}/Paper/-1/-1?pageNum=${this._current}&pageSize=${this._pageSize}`);
    xhr.send();
  }

  resetInput() {
    this.isFuzzy = false;
    this.createForm();
    this.getPaper();
  }


  search() {
    this._loading = true;
    this.papers = this.paperList.filter((element)=>{
      if(this.paperName && element.paperName.indexOf(this.paperName)==-1){
        return false;
      }

      /*if(this.stuName){
        let num = 0;
        element.author.forEach(author => {
          if(author.name.indexOf(this.stuName)!=-1){
            num = num + 1;
          }
        });
        return num != 0;
      }*/

      if(this.periodical && element.periodical.indexOf(this.periodical)==-1){
        return false;
      }
      // if(this.searchLevelList.length){
      //   let result = this.searchLevelList.length;
      //   this.searchLevelList.forEach((searchEl)=>{
      //     result = result + element.essayLevel.indexOf(searchEl)
      //   })
      //   if(result==0){
      //     return false;
      //   }
      // }
      return true;
    })
    this._current = 1;
    this._loading = false;
  }

  // exportExcel() {
  //   let sheet = [['奖项名称', '获奖人学号', '获奖人姓名', '类别', '级别', '获奖时间', '审核状态', '说明']];
  //   for (let i in this.prizes) {
  //     sheet.push([`${this.prizes[i].prizeName}`, `${this.prizes[i].stuId}`, `${this.prizes[i].stuName}`, `${this.prizes[i].prizeClass}`, `${this.prizes[i].prizeLevel}`, `${this.prizes[i].prizeDate}`, `${this.prizes[i].status}`, `${this.prizes[i].prizeIntro}`])
  //   }
  //   /* generate worksheet */
  //   const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(sheet);

  //   /* generate workbook and add the worksheet */
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  //   let filename = Math.floor(Math.random() * 468255113);
  //   /* save to file */
  //   XLSX.writeFile(wb, `${filename}.xlsx`);
  // }

  // downloadTemplate() {
  //   let sheet = [['学号', '姓名', '奖项名称', '奖项类别', '级别', '获奖日期', '说明']];
  //   const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(sheet);
  //   /* generate workbook and add the worksheet */
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  //   let filename = '获奖信息导入模板';
  //   /* save to file */
  //   XLSX.writeFile(wb, `${filename}.xlsx`);
  // }

  refreshStatus(): void {
    const allChecked = this.papers.every(value => value.checked === true);
    const allUnChecked = this.papers.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.disabledButton = !this.papers.some(value => value.checked);
    this.checkedNumber = this.papers.filter(value => value.checked).length;
    console.log(this.checkedNumber)
  }

  checkAll(value: boolean): void {
    this.papers.forEach(data => data.checked = value);
    this.refreshStatus();
  }

  operateData(): void {
    this.operating = true;
    const opUser = this.papers.filter( (element) => element.checked == true);
    console.log(opUser);
    setTimeout(_ => {
      this.papers.forEach(value => value.checked = false);
      this.refreshStatus();
      this.operating = false;
    }, 1000);
    
  }

  exportExcel() {

  }

  trans() {
    for (var i in this.papers) {
      this.papers[i].date = dateTrans(this.papers[i].date);
      this.papers[i].submitDate = dateTrans(this.papers[i].submitDate);
      this.papers[i].reviewDate = dateTrans(this.papers[i].reviewDate);
    }
  }

  downloadTemplate() {}

  fileChange() {}

  createForm() {
    this.paper = new Paper('', '', '', '', '', '', '',
      '', '', '', '', '', '', '',
      '', '', '');
    this.paper.dateBegin = '';
    this.paper.dateEnd = '';
    this.paper.submitDateBegin = '';
    this.paper.submitDateEnd = '';
    this.paper.reviewDateBegin = '';
    this.paper.reviewDateEnd = '';
  }

  constructor() { }

  ngOnInit() {
    this.getPaper();
    this.createForm();
  }
}
