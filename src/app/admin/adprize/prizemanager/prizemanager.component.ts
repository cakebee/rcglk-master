import {Component, OnInit} from '@angular/core';
import {dateTrans, statusTrans, prizeLevelList, Prize} from '../../../data.model';
import * as XLSX from 'xlsx';
import {domain} from '../../../config';

@Component({
  selector: 'app-prizemanager',
  templateUrl: './prizemanager.component.html',
  styleUrls: ['./prizemanager.component.css']
})
export class PrizemanagerComponent implements OnInit {
  prizes: Array<any> = [];
  prizesList: Array<any> = [];
  _loading: boolean = true;
  _current = 1;
  _pageSize = 10;
  _total;
  prize: any;
  prizeName: string;
  stuId: string;
  stuName: string;
  isFuzzy: boolean = false;//是否模糊搜索
  filterLevel = [
    {text: '国际级', value: '国际级'},
    {text: '国家级', value: '国家级'},
    {text: '省级', value: '省级'},
    {text: '市级', value: '市级'},
    {text: '校级', value: '校级'}
  ];
  filterLevel2 = [
    {text : '一等奖', value: '一等奖'},
    {text : '二等奖', value: '二等奖'},
    {text : '三等奖', value: '三等奖'},
    {text : '其他', value: '其他'},
  ]
  searchLevelList: Array<string> = [];
  filterStatus = [
    {text: '审核通过', value: '审核通过'},
    {text: '审核未通过', value: '审核未通过'},
    {text: '未审核', value: '未审核'}
  ];
  searchStatusList: Array<string> = [];
  allChecked = false;
  disabledButton = true;
  checkedNumber = 0;
  operating = false;
  indeterminate = false;

  getprizes() {
    /*let ajaxMonitor = {num: 0};
    let numValue;
    Object.defineProperty(ajaxMonitor, 'num', {
      get: () => {
        return numValue;
      },
      set: (newValue) => {
        numValue = newValue;
        if (newValue == 3) {
          this.prizes = this.prizesList;
          this._loading = false;
        }
      },
      enumerable: true,
      configurable: true
    });
    ajaxMonitor.num = 0;*/
    this._loading = true;
    this.prizesList = [];
    let xhr1 = new XMLHttpRequest();
    xhr1.onreadystatechange = () => {
      if (xhr1.readyState === 4) {
        if (xhr1.status === 200) {
          let resPrizes = JSON.parse(xhr1.responseText).extend.pageBean.list;
          this._total = JSON.parse(xhr1.responseText).extend.pageBean.total;
          for (var i in resPrizes) {
            resPrizes[i].prizeDate = dateTrans(resPrizes[i].prizeDate);
            resPrizes[i].submitDate = dateTrans(resPrizes[i].submitDate);
            resPrizes[i].reviewDate = dateTrans(resPrizes[i].reviewDate);
            resPrizes[i].status = statusTrans(resPrizes[i].status);
            this.prizesList.push(resPrizes[i]);
          }
        } else {
          alert('获取数据失败，请稍后再试...');
        }
        this.prizes = this.prizesList;
        this._loading = false;
      }
    };
    xhr1.open('get', `${domain}/Studentsprize/0/-1?pageNum=${this._current}&pageSize=${this._pageSize}`);
    xhr1.send();
  }

  search() {
    this._loading = true;
    this.prizes = this.prizesList.filter((element) => {
      if (this.prizeName && element.prizeName.indexOf(this.prizeName) == -1) {
        return false;
      }
      if (this.stuId && element.stuId.indexOf(this.stuId) == -1) {
        return false;
      }
      if (this.stuName && element.stuName.indexOf(this.stuName) == -1) {
        return false;
      }
      if (this.searchLevelList.length) {
        let result = this.searchLevelList.length;
        this.searchLevelList.forEach((searchEl) => {
          result = result + element.prizeLevel.indexOf(searchEl);
        });
        if (result == 0) {
          return false;
        }
      }
      if (this.searchStatusList.length) {
        let result = this.searchStatusList.length;
        this.searchStatusList.forEach((searchEl) => {
          result = result + element.status.indexOf(searchEl);
        });
        if (result == 0) {
          return false;
        }
      }
      return true;
    });
    this._current = 1;
    this._loading = false;
  }

  fileChange(info) {
    if (info.file.status == 'error') {
      alert('上传文件失败，请联系管理员...');
    } else if (info.file.status == 'done') {
      alert('导入成功');
      this.getprizes();
    }
  }

  exportExcel() {
    let sheet = [['奖项名称', '获奖人学号', '获奖人姓名', '类别', '级别', '获奖时间', '审核状态', '说明']];
    for (let i in this.prizes) {
      sheet.push([`${this.prizes[i].prizeName}`, `${this.prizes[i].stuId}`, `${this.prizes[i].stuName}`, `${this.prizes[i].prizeClass}`, `${this.prizes[i].prizeLevel}`, `${this.prizes[i].prizeDate}`, `${this.prizes[i].status}`, `${this.prizes[i].prizeIntro}`]);
    }
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(sheet);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    let filename = Math.floor(Math.random() * 468255113);
    /* save to file */
    XLSX.writeFile(wb, `${filename}.xlsx`);
  }

  downloadTemplate() {
    let sheet = [['学号', '姓名', '奖项名称', '奖项类别', '级别', '获奖日期', '说明']];
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(sheet);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    let filename = '获奖信息导入模板';
    /* save to file */
    XLSX.writeFile(wb, `${filename}.xlsx`);
  }

  refreshStatus(): void {
    const allChecked = this.prizes.every(value => value.checked === true);
    const allUnChecked = this.prizes.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.disabledButton = !this.prizes.some(value => value.checked);
    this.checkedNumber = this.prizes.filter(value => value.checked).length;
    console.log(this.checkedNumber);
  }

  checkAll(value: boolean): void {
    this.prizes.forEach(data => data.checked = value);
    this.refreshStatus();
  }

  operateData(): void {
    this.operating = true;
    const opUser = this.prizes.filter((element) => element.checked == true);
    console.log(opUser);
    setTimeout(_ => {
      this.prizes.forEach(value => value.checked = false);
      this.refreshStatus();
      this.operating = false;
    }, 1000);

  }

  createPrize(): void {
    this.prize = new Prize('', '', '', '', '', '' ,
      '',  '', '', '', '', '', '', '');
    this.prize.prizeDateBegin = '';
    this.prize.prizeDateEnd = '';
    this.prize.submitDateBegin = '';
    this.prize.submitDateEnd = '';
    this.prize.reviewDateBegin = '';
    this.prize.reviewDateEnd = '';
  }

  fuzzySearch(): void {
    this._loading = true;
    let list = [];
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let resPrizes = JSON.parse(xhr.responseText).extend.pageBean.list;
          this._total = JSON.parse(xhr.responseText).extend.pageBean.total;
          for (var i in resPrizes) {
            resPrizes[i].prizeDate = dateTrans(resPrizes[i].prizeDate);
            resPrizes[i].submitDate = dateTrans(resPrizes[i].submitDate);
            resPrizes[i].reviewDate = dateTrans(resPrizes[i].reviewDate);
            resPrizes[i].status = statusTrans(resPrizes[i].status);
            list.push(resPrizes[i]);
          }
        } else {
          alert('获取数据失败，请稍后再试...');
        }
      }
      this.prizes = list;
      this._loading = false;
    };

    xhr.open('post', `${domain}/Studentsprize/_search?pageNum=${this._current}&pageSize=${this._pageSize}`);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.send(JSON.stringify(this.prize));
  }

  getPage(): void {
    if (this.isFuzzy){
      this.fuzzySearch();
    } else {
      this.getprizes();
    }
  }

  resetInput(): void {
    this.createPrize();
    this.isFuzzy = false;
    this.getprizes();
  }
  constructor() {
  }

  ngOnInit() {
    this.getprizes();
    this.createPrize();
  }

}
