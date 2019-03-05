import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-essaymanager',
  templateUrl: './essaymanager.component.html',
  styleUrls: ['./essaymanager.component.css']
})
export class EssaymanagerComponent implements OnInit {

  essays: Array<any> = [];
  essaysList: Array<any> = [];
  _loading: boolean = true;
  _current = 1;
  _pageSize = 8;

  essayName: string;
  stuName: string;
  periodical: string;
  filterLevel = [
  //   { text: '国际级', value: '国际级' },
  //   { text: '国家级', value:'国家级'},
  //   { text: '省级', value:'省级'},
  //   { text: '市级', value: '市级'},
  //   { text: '校级', value: '校级' }
  ];
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

  getessays() {
    
  }

  search() {
    this._loading = true;
    this.essays = this.essaysList.filter((element)=>{
      if(this.essayName && element.essayTitle.indexOf(this.essayName)==-1){
        return false;
      }

      if(this.stuName){
        let num = 0;
        element.essayAuthor.forEach(author => {
          if(author.name.indexOf(this.stuName)!=-1){
            num = num + 1;
          }
        });
        return num != 0;
      }

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
    const allChecked = this.essays.every(value => value.checked === true);
    const allUnChecked = this.essays.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.disabledButton = !this.essays.some(value => value.checked);
    this.checkedNumber = this.essays.filter(value => value.checked).length;
    console.log(this.checkedNumber)
  }

  checkAll(value: boolean): void {
    this.essays.forEach(data => data.checked = value);
    this.refreshStatus();
  }

  operateData(): void {
    this.operating = true;
    const opUser = this.essays.filter( (element) => element.checked == true);
    console.log(opUser);
    setTimeout(_ => {
      this.essays.forEach(value => value.checked = false);
      this.refreshStatus();
      this.operating = false;
    }, 1000);
    
  }

  constructor() { }

  ngOnInit() {
    // this.getessays();
    this.essaysList = [{ 
      "stuId": "2016220202004", 
      "essayTitle": "浅谈web安全", 
      "essayDate": "2018-11-23", 
      "essayLevel": "E5", 
      "periodical": "《当代计算机》", 
      "essayAuthor": [
        { "order": "第一作者", "name": "zhang" }, 
        { "order": "第二作者", "name": "tiger" },
        { "order": "第三作者", "name": "rain" }
      ]
    }];
    this.essays = this.essaysList;
    this._loading = false;
  }

}
