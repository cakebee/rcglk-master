import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { dateTrans, statusTrans } from '../../../data.model';
import { domain } from '../../../config';

@Component({
  selector: 'app-stuviewprize',
  templateUrl: './stuviewprize.component.html',
  styleUrls: ['./stuviewprize.component.css']
})

export class StuviewprizeComponent implements OnInit {

  prizesList: Array<any> = [];
  prizes: Array<any> = [];
  _loading = true;
  _current = 1;
  _pageSize = 8;

  getprizes() {
    let ajaxMonitor = {num: 0};
    let numValue;
    Object.defineProperty(ajaxMonitor, "num", {
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
    ajaxMonitor.num = 0;

    let xhr1 = new XMLHttpRequest();
    xhr1.onreadystatechange = () => {
      if (xhr1.readyState === 4) {
        if (xhr1.status === 200) {
          let resPrizes = JSON.parse(xhr1.responseText).extend.studentsprizeList;
          for (var i in resPrizes) {
            resPrizes[i].prizeDate = dateTrans(resPrizes[i].prizeDate);
            resPrizes[i].status = statusTrans(resPrizes[i].status);
            this.prizesList.push(resPrizes[i]);
          }
          ajaxMonitor.num += 1;
        } else {
          console.log(xhr1.status);
        }
      }
    }
    let xhr2 = new XMLHttpRequest();
    xhr2.onreadystatechange = () => {
      if (xhr2.readyState === 4) {
        if (xhr2.status === 200) {
          let resPrizes = JSON.parse(xhr2.responseText).extend.studentsprizeList;
          for (var i in resPrizes) {
            resPrizes[i].prizeDate = dateTrans(resPrizes[i].prizeDate);
            resPrizes[i].status = statusTrans(resPrizes[i].status);
            this.prizesList.push(resPrizes[i]);
          }
          ajaxMonitor.num += 1;
        } else {
          console.log(xhr2.status);
        }
      }
    }
    let xhr3 = new XMLHttpRequest();
    xhr3.onreadystatechange = () => {
      if (xhr3.readyState === 4) {
        if (xhr3.status === 200) {
          let resPrizes = JSON.parse(xhr3.responseText).extend.studentsprizeList;
          for (var i in resPrizes) {
            resPrizes[i].prizeDate = dateTrans(resPrizes[i].prizeDate);
            resPrizes[i].status = statusTrans(resPrizes[i].status);
            this.prizesList.push(resPrizes[i]);
          }
          ajaxMonitor.num += 1;
        } else {
          console.log(xhr3.status);
        }
      }
    }
    xhr1.open('get', `${domain}/Studentsprize/${this.userService.user.userName}/0`);
    xhr1.send();
    xhr2.open('get', `${domain}/Studentsprize/${this.userService.user.userName}/1`);
    xhr2.send();
    xhr3.open('get', `${domain}/Studentsprize/${this.userService.user.userName}/2`);
    xhr3.send();

  }

  constructor(private userService: UserService) {}
  ngOnInit() {
    this.getprizes();
  }
}
