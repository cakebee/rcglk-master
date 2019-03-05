import { Component, OnInit } from '@angular/core';
import { dateTrans } from '../../../data.model';
import { UserService } from '../../../service/user.service';
import { domain } from '../../../config';

@Component({
  selector: 'app-stuvieworg',
  templateUrl: './stuvieworg.component.html',
  styleUrls: ['./stuvieworg.component.css']
})

export class StuvieworgComponent implements OnInit {
  orgLists: Array<any> = [];
  orgs: Array<any> = [];
  _current = 1;
  _pageSize = 8;
  _loading = true;

  getorgs() {
    let xhr = new XMLHttpRequest();
    // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let resOrgs = JSON.parse(xhr.responseText).extend.list;
          resOrgs.forEach( (item) => {
            item.orgBegin = dateTrans(item.orgBegin);
            item.orgEnd = dateTrans(item.orgEnd);
          });
          this.orgLists = [];
          resOrgs.forEach(element => {
            this.orgLists.push(element)
          });
          this._loading = false;
        } else {
          console.log(xhr.status);
        }
      }
    }
    xhr.open('get', `${domain}/Studentsorg/${this.userService.user.userName}`);
    xhr.send();
  }
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getorgs();
  }

}
