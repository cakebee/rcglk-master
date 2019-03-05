import { Component, OnInit } from '@angular/core';
import { dateTrans } from '../../../data.model';
import { UserService } from '../../../service/user.service';
import { domain } from '../../../config';

@Component({
  selector: 'app-stuviewessay',
  templateUrl: './stuviewessay.component.html',
  styleUrls: ['./stuviewessay.component.css']
})
export class StuviewessayComponent implements OnInit {

  essayLists: Array<any> = [];
  essays: Array<any> = [];
  _current = 1;
  _pageSize = 8;
  _loading = true;

  getessays() {
    let xhr = new XMLHttpRequest();
    // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let resEssays = JSON.parse(xhr.responseText).extend.list;
          resEssays.forEach( (item) => {
            item.orgBegin = dateTrans(item.orgBegin);
            item.orgEnd = dateTrans(item.orgEnd);
          });
          this.essayLists = [];
          resEssays.forEach(element => {
            this.essayLists.push(element)
          });
          this._loading = false;
        } else {
          console.log(xhr.status);
        }
      }
    }
    xhr.open('get', `${domain}/Studentsessay/${this.userService.user.userName}`);
    xhr.send();
  }
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getessays();
    this.essayLists = [{ 
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
    }]
  }

}
