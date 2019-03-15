import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UploadFile } from 'ng-zorro-antd';
// import { Student } from '../../data.model';
import * as XLSX from 'xlsx';
import { domain } from '../../config';
import {Student} from '../../data.model';
import {create} from 'domain';

@Component({
  selector: 'app-usermanager',
  templateUrl: './usermanager.component.html',
  styleUrls: ['./usermanager.component.css']
})
export class UsermanagerComponent implements OnInit {
  users = [];
  usersList = [];
  _loading = true;
  _current = 1;
  _pageSize = 10;
  _total = 0;
  isFuzzySearch: boolean = false;
  isConfirmLoading: boolean = false;
  isVisible: boolean = false;
  stuForm: FormGroup;
  student: Student;
  fileList: UploadFile[] = [];
  uploading = false;
  stuId = '';
  stuName = '';
  stuClass = '';
  mapOfExpandData = {};
  sheet = ['学号', '姓名', '性别', '身份证号', '专业',/* '年级', */ '班级', '宿舍', '政治面貌', '密码'];
  filterGender = [
    { text: '男', value: '男' },
    { text: '女', value: '女' }
  ];
  searchGenderList: string[] = [];
  filterMajor = [
    { text: '信息工程', value: '信息工程' },
    { text: '软件技术', value: '软件技术' },
    { text: '嵌入式系统', value: '嵌入式系统' },
    { text: '大型主机', value: '大型主机' },
    { text: '网络安全', value: '网络安全' },
    { text: '信息获取与控制', value: '信息获取与控制' },
    { text: '工业产品计算机辅助设计与工程', value: '工业产品计算机辅助设计与工程' },
    { text: '数字动漫', value: '数字动漫' },
    { text: '国际班', value: '国际班' },
    { text: '数字动漫', value: '数字动漫' },
    { text: '数字信息处理', value: '数字信息处理' },
    { text: '系统与技术', value: '系统与技术' },
    { text: '互联网+', value: '互联网+' },
    { text: '互联网安全', value: '互联网安全' }
  ];
  searchMajorList: string[] = [];
  filterGrade = [
    { text: '2014', value: '2014' },
    { text: '2015', value: '2015' },
    { text: '2016', value: '2016' },
    { text: '2017', value: '2017' }
  ]
  searchGradeList: string[] = []; 
  allChecked = false;
  disabledButton = true;
  checkedNumber = 0;
  operating = false;
  indeterminate = false;

  constructor(private fb: FormBuilder) {
    // this.createForm();
  }

  // createForm() {
  //   this.student = new Student('','','','','','','','','','');
  //   this.stuForm = this.fb.group(this.student);
  // }

  _submitForm() {
    this.isConfirmLoading = true;
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          alert("提交成功")
          this.isConfirmLoading = false;
          this.isVisible = false;
        } else {
          // 失败，根据响应码判断失败原因
          alert("添加失败")
          this.isConfirmLoading = false;
        }
      }
    }
    xhr.open('POST', `${domain}/Studentsinfos/${this.stuForm.controls.stuId.value}`);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.send();
  }

  beforeUpload = (file: UploadFile): boolean => {
    return true;
  }

  handleUpload() {
    const formData = new FormData();
    this.fileList.forEach((file: any) => {
      formData.append('files[]', file);
    });
    // this.uploading = true;
  }

  getUsers() {
    this._loading = true;
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (JSON.parse(xhr.responseText).code == "100") {
            let resUsers = JSON.parse(xhr.responseText).extend.pageBean.list;
            //this._pageSize = JSON.parse(xhr.responseText).extend.pageBean.pageSize;
            this._total = JSON.parse(xhr.responseText).extend.pageBean.total;
            this.usersList = [];
            resUsers.forEach(element => {
              element.stuGrade = element.stuClass.slice(0, 4);
              element.isExpanded = false;
              this.usersList.push(element);
            });
            this.users = this.usersList;
            this._loading = false;
          }
          else {
            alert("请求失败，稍后再试...")
          }
        }
        else {
          alert("服务器无响应，请稍后再试...")
          this._loading = false;
        }
      }
    };
    xhr.open('GET', `${domain}/Studentsinfos?pageNum=${this._current}&pageSize=${this._pageSize}`);
    xhr.send();
  }

  fileChange(info) {
    if (info.file.status == 'error') {
      alert('上传文件失败，请联系管理员...')
    } else if (info.file.status == 'done') {
      alert('导入成功')
      this.getUsers()
    }
  }

  search() {
    this._loading = true;
    this.users = this.usersList.filter((element) => {
      if (this.stuId && element.stuId.indexOf(this.stuId)==-1) {
        return false;
      }
      if (this.stuName && element.stuName.indexOf(this.stuName)==-1) {
        return false;
      }
      if (this.stuClass && element.stuClass.indexOf(this.stuClass)==-1){
        return false;
      }
      if(this.searchGenderList.length){
        let result = this.searchGenderList.length;
        this.searchGenderList.forEach((searchEl)=>{
          result = result + element.stuGender.indexOf(searchEl)
        })
        if(result==0){
          return false;
        }
      }
      if(this.searchGradeList.length){
        let result = this.searchGradeList.length;
        this.searchGradeList.forEach((searchEl)=>{
          result = result + element.stuGrade.indexOf(searchEl)
        })
        if(result==0){
          return false;
        }
      }
      if(this.searchMajorList.length){
        let result = this.searchMajorList.length;
        this.searchMajorList.forEach((searchEl)=>{
          result = result + element.stuMajor.indexOf(searchEl)
        })
        if(result==0){
          return false;
        }
      }
      return true;
    })
    this._current = 1;
    this._loading = false;
  }

  downloadTemplate() {
    let sheet = [['学号', '姓名', '性别', '身份证号', '专业',/* '年级', */ '班级', '宿舍', '政治面貌', '密码']];
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(sheet);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    let filename = '学生信息导入模板';
    /* save to file */
    XLSX.writeFile(wb, `${filename}.xlsx`);
  }

  refreshStatus(): void {
    const allChecked = this.users.every(value => value.checked === true);
    const allUnChecked = this.users.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.disabledButton = !this.users.some(value => value.checked);
    this.checkedNumber = this.users.filter(value => value.checked).length;
    console.log(this.checkedNumber)
  }

  checkAll(value: boolean): void {
    this.users.forEach(data => data.checked = value);
    this.refreshStatus();
  }

  operateData(): void {
    this.operating = true;
    const opUser = this.users.filter( (element) => element.checked == true);
    console.log(opUser);
    setTimeout(_ => {
      this.users.forEach(value => value.checked = false);
      this.refreshStatus();
      this.operating = false;
    }, 1000);
  }

  createForm(): void {
    this.student = new Student('', '', '', '', '',
      '', '', '', '', '',
      '', '', '', '', '');
  }

  resetInput(): void {
    this.isFuzzySearch = false;
    this.student.stuId = '';
    this.student.stuName = '';
    this.student.stuGender = '';
    this.student.stuMajor = '';
    this.student.stuClass = '';
    this.student.stuStatus = '';
    this.student.stuDorm = '';
    this.student.stuTel = '';
    this.student.stuQq = '';
    this.student.stuIntro = '';
    this.student.stuGrade = '';
    this.student.identity = '';
    this.getPage();
  }

  //模糊搜索
  fuzzySearch(): void {
    this._loading = true;
    this.isFuzzySearch = true;
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (JSON.parse(xhr.responseText).code == "100") {
            let resUsers = JSON.parse(xhr.responseText).extend.pageBean.list;
            //this._pageSize = JSON.parse(xhr.responseText).extend.pageBean.pageSize;
            this._total = JSON.parse(xhr.responseText).extend.pageBean.total;
            this.usersList = [];
            resUsers.forEach(element => {
              element.stuGrade = element.stuClass.slice(0, 4);
              this.usersList.push(element);
            });
            this.users = this.usersList;
            this._loading = false;
          }
          else {
            alert("请求失败，稍后再试...")
          }
        }
        else {
          alert("服务器无响应，请稍后再试...")
          this._loading = false;
        }
      }
    };
    xhr.open('post', `${domain}/Studentsinfos/_search?pageNum=${this._current}&pageSize=${this._pageSize}`);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.send(JSON.stringify(this.student));
  }

  getPage() {
    if (this.isFuzzySearch) {
      this.fuzzySearch();
    }
    else {
      this.getUsers();
    }
  }

  ngOnInit() {
    this.getUsers();
    this.createForm();
  }
}
