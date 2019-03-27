import {Component, OnInit} from '@angular/core';
import {dateTrans} from '../../../data.model';
import {UserService} from '../../../service/user.service';
import {domain} from '../../../config';

@Component({
  selector: 'app-stuviewessay',
  templateUrl: './stuviewessay.component.html',
  styleUrls: ['./stuviewessay.component.css']
})
export class StuviewessayComponent implements OnInit {

  paperList: any;
  papers: any;
  _current = 1;
  _pageSize = 10;
  _loading = true;

  getPapers() {
    let xhr = new XMLHttpRequest();
    // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.paperList = JSON.parse(xhr.responseText).extend.pageBean.list;
          for (const i in this.paperList) {
            this.paperList[i].date = dateTrans(this.paperList[i].date);
            this.paperList[i].submitDate = dateTrans(this.paperList[i].submitDate);
            this.paperList[i].reviewDate = dateTrans(this.paperList[i].reviewDate);
          }
          this._loading = false;
        } else {
          console.log(xhr.status);
        }
      }
    };
    xhr.open('get', `${domain}/Paper/${this.userService.user.userName}/0?pageNum=${this._current}&pageSize=${this._pageSize}`);
    xhr.send();
  }

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getPapers();
  }
}
