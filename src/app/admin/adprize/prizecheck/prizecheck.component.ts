import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { dateTrans, statusTrans } from '../../../data.model';
import { domain } from '../../../config';

@Component({
  selector: 'app-prizecheck',
  templateUrl: './prizecheck.component.html',
  styleUrls: ['./prizecheck.component.css']
})
export class PrizecheckComponent implements OnInit {
  prize = { "prizeName": "", "prizeClass": "", "prizeLevel": "", "prizeFile": "", "prizeIntro": "", "status": "", "prizeDate": "" }
  prizeId: string;
  reason: string;
  isVisible: boolean = false;
  isConfirmLoading: boolean = false;

  constructor(private route: ActivatedRoute) {
    this.prizeId = this.route.snapshot.paramMap.get('id');
  }

  getPrizeDetail() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.prize = JSON.parse(xhr.responseText).extend.studentsprize;
          this.prize.prizeDate = dateTrans(this.prize.prizeDate);
          this.prize.status = statusTrans(this.prize.status);
          if(this.prize.prizeFile){
            this.prize.prizeFile = domain + this.prize.prizeFile.split('/rcglk')[1];
          }
        } else {
          console.log(xhr.status);
        }
      }
    }
    xhr.open('get', `${domain}/Studentsprize/${this.prizeId}`);
    xhr.send();
  }

  pass() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.getPrizeDetail();
          alert("操作成功");
        } else {
          alert("操作失败");
        }
      }
    }
    xhr.open('POST',`${domain}/Studentsprize/check`);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
    xhr.send(`isPassed=pass&prizeId=${this.prizeId}`);
  }

  unpass() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.getPrizeDetail();
          this.isVisible = false;
          alert("操作成功");
        } else {
          alert("操作失败");
        }
      }
    }
    xhr.open('POST', `${domain}/Studentsprize/check`);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
    xhr.send(`isPassed=unpass&prizeId=${this.prizeId}&reason=${this.reason}`);
  }

  ngOnInit() {
    this.getPrizeDetail();
  }
}
