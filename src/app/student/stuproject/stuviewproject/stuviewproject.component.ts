import { Component, OnInit } from '@angular/core';
import {domain} from '../../../config';
import {UserService} from '../../../service/user.service';
import {dateTrans} from '../../../data.model';

@Component({
  selector: 'app-stuviewproject',
  templateUrl: './stuviewproject.component.html',
  styleUrls: ['./stuviewproject.component.css']
})
export class StuviewprojectComponent implements OnInit {
  stuId = this.userService.user.userName;
  projectList = [];
  _loading = false;
  _current = 1;
  _pageSize = 10;
  _total = 0;
  _pages = 0;
  private isFuzzy = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getProject();
  }

  getProject() {
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
    xhr.open('GET', `${domain}/Project/${this.stuId}/1?isPage=true&pageNum=${this._current}&pageSize=${this._pageSize}`);
    xhr.send();
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
