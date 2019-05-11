import { Component, OnInit } from '@angular/core';
import {dateTrans, Project, roleDetlList, statusTrans} from '../../../data.model';
import {domain, filePath} from '../../../config';

@Component({
  selector: 'app-projectmanager',
  templateUrl: './projectmanager.component.html',
  styleUrls: ['./projectmanager.component.css']
})
export class ProjectmanagerComponent implements OnInit {
  _loading = false;
  _current = 1;
  _pageSize = 10;
  _total = 0;
  _pages = 0;
  isFuzzy = false;
  projectList = [];
  searchProject: any;
  filePath = filePath;
  allChecked: any;
  indeterminate: any;
  roleDetlOptions = roleDetlList;


  constructor() { }

  ngOnInit() {
    this.initSearchProject();
    this.getPage();
  }

  private initSearchProject() {
    this.searchProject = new Project();
  }

  private getPage() {
    if (this.isFuzzy) {
      this.fuzzySearch();
    } else {
      this.getProject();
    }
  }
  private getProject() {
    this._loading = true;
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (JSON.parse(xhr.responseText).code === 100) {
            this.projectList = JSON.parse(xhr.responseText).extend.pageBean.list;
            this._current = JSON.parse(xhr.responseText).extend.pageBean.pageNum;
            this._pageSize = JSON.parse(xhr.responseText).extend.pageBean.pageSize;
            this._total = JSON.parse(xhr.responseText).extend.pageBean.total;
            this._pages = JSON.parse(xhr.responseText).extend.pageBean.pages;
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
    };
    xhr.open('GET', `${domain}/Project?status=1&isPage=true&pageNum=${this._current}&pageSize=${this._pageSize}`);
    xhr.send();
  }

  private fuzzySearch() {
    this._loading = true;
    let roleDetl;
    let roleDetlBak;
    /*将数组形式的roleDetl转换成“/”分割的字符串*/
    if (this.searchProject.roleDetl) {
      /*备份roleDetl*/
      roleDetlBak = this.searchProject.roleDetl;
      if (this.searchProject.roleDetl[1] == null) {
        roleDetl = this.searchProject.roleDetl[0];
      } else {
        roleDetl = this.searchProject.roleDetl[0] + '/' + this.searchProject.roleDetl[1];
      }
    }
    this.searchProject.roleDetl = roleDetl;
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (JSON.parse(xhr.responseText).code == 100) {
            let resProjectsList = JSON.parse(xhr.responseText).extend.pageBean.list;
            this._total = JSON.parse(xhr.responseText).extend.pageBean.total;
            for (var i in resProjectsList) {
              resProjectsList[i].prizeDate = dateTrans(resProjectsList[i].prizeDate);
              resProjectsList[i].submitDate = dateTrans(resProjectsList[i].submitDate);
              resProjectsList[i].reviewDate = dateTrans(resProjectsList[i].reviewDate);
              resProjectsList[i].status = statusTrans(resProjectsList[i].status);
            }
            this.projectList = resProjectsList;
            this.trans();
            this._loading = false;
          } else {
            alert('获取数据失败，请稍后再试...');
          }
        } else {
          alert('服务器无响应');
        }
      }
    };

    xhr.open('post', `${domain}/Project/_search?pageNum=${this._current}&pageSize=${this._pageSize}`);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.send(JSON.stringify(this.searchProject));
    this.searchProject.roleDetl = roleDetlBak;
  }

  private resetInput() {
    this.initSearchProject();
  }

  checkAll($event: boolean) {

  }

  refreshStatus() {

  }

  private trans() {
    if (this.projectList) {
      for (const i in this.projectList) {
        this.projectList[i].startDate = dateTrans(this.projectList[i].startDate);
        this.projectList[i].endDate = dateTrans(this.projectList[i].endDate);
      }
    }
  }
}
