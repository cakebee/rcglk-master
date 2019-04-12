import { Component, OnInit } from '@angular/core';
import {domain, filePath} from '../../config';
import {UserService} from '../../service/user.service';
import {dateTrans} from '../../data.model';
import {NzMessageService} from 'ng-zorro-antd';
import {Router} from '@angular/router';

@Component({
  selector: 'app-stureiview',
  templateUrl: './stureiview.component.html',
  styleUrls: ['./stureiview.component.css']
})
export class StureiviewComponent implements OnInit {
  filePath = filePath;
  unReviewedPaperList = [];
  unReviewedPrizeList = [];
  unReviewedOrgList = [];
  noPassPaperList = [];
  noPassPrizeList = [];
  noPassOrgList = [];

  getPaper() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (JSON.parse(xhr.responseText).code === 100) {
            this.unReviewedPaperList = JSON.parse(xhr.responseText).extend.pageBean.list;
            for (const i in this.unReviewedPaperList) {
              this.unReviewedPaperList[i].date = dateTrans(this.unReviewedPaperList[i].date);
              this.unReviewedPaperList[i].submitDate = dateTrans(this.unReviewedPaperList[i].submitDate);
              this.unReviewedPaperList[i].reviewDate = dateTrans(this.unReviewedPaperList[i].reviewDate);
            }
          } else {
            alert('获取数据失败');
          }
        } else {
          alert('服务器无响应');
        }
      }
    };
    xhr.open('GET', `${domain}/Paper/${this.userService.user.userName}/0?pageNum=1&pageSize=1000`);
    xhr.send();

    const xhr1 = new XMLHttpRequest();
    xhr1.onreadystatechange = () => {
      if (xhr1.readyState === 4) {
        if (xhr1.status === 200) {
          if (JSON.parse(xhr1.responseText).code === 100) {
            this.noPassPaperList = JSON.parse(xhr1.responseText).extend.pageBean.list;
            for (const i in this.noPassPaperList) {
              this.noPassPaperList[i].date = dateTrans(this.noPassPaperList[i].date);
              this.noPassPaperList[i].submitDate = dateTrans(this.noPassPaperList[i].submitDate);
              this.noPassPaperList[i].reviewDate = dateTrans(this.noPassPaperList[i].reviewDate);
            }
          } else {
            alert('获取数据失败');
          }
        } else {
          alert('服务器无响应');
        }
      }
    };
    xhr1.open('GET', `${domain}/Paper/${this.userService.user.userName}/2?pageNum=1&pageSize=1000`);
    xhr1.send();
  }

  getPrize() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (JSON.parse(xhr.responseText).code === 100) {
            this.unReviewedPrizeList = JSON.parse(xhr.responseText).extend.pageBean.list;
            for (const i in this.unReviewedPrizeList) {
              this.unReviewedPrizeList[i].prizeDate = dateTrans(this.unReviewedPrizeList[i].prizeDate);
              this.unReviewedPrizeList[i].submitDate = dateTrans(this.unReviewedPrizeList[i].submitDate);
              this.unReviewedPrizeList[i].reviewDate = dateTrans(this.unReviewedPrizeList[i].reviewDate);
            }
          } else {
            alert('获取数据失败');
          }
        } else {
          alert('服务器无响应');
        }
      }
    };
    xhr.open('GET', `${domain}/Studentsprize/${this.userService.user.userName}/0?pageNum=1&pageSize=1000`);
    xhr.send();

    const xhr1 = new XMLHttpRequest();
    xhr1.onreadystatechange = () => {
      if (xhr1.readyState === 4) {
        if (xhr1.status === 200) {
          if (JSON.parse(xhr1.responseText).code === 100) {
            this.noPassPrizeList = JSON.parse(xhr1.responseText).extend.pageBean.list;
            for (const i in this.noPassPrizeList) {
              this.noPassPrizeList[i].prizeDate = dateTrans(this.noPassPrizeList[i].prizeDate);
              this.noPassPrizeList[i].submitDate = dateTrans(this.noPassPrizeList[i].submitDate);
              this.noPassPrizeList[i].reviewDate = dateTrans(this.noPassPrizeList[i].reviewDate);
            }
          } else {
            alert('获取数据失败');
          }
        } else {
          alert('服务器无响应');
        }
      }
    };
    xhr1.open('GET', `${domain}/Studentsprize/${this.userService.user.userName}/2?pageNum=1&pageSize=1000`);
    xhr1.send();
  }

  getOrg() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (JSON.parse(xhr.responseText).code === 100) {
            this.unReviewedOrgList = JSON.parse(xhr.responseText).extend.pageBean.list;
            for (const i in this.unReviewedOrgList) {
              this.unReviewedOrgList[i].orgBegin = dateTrans(this.unReviewedOrgList[i].orgBegin);
              this.unReviewedOrgList[i].orgEnd = dateTrans(this.unReviewedOrgList[i].orgEnd);
              this.unReviewedOrgList[i].submitDate = dateTrans(this.unReviewedOrgList[i].submitDate);
              this.unReviewedOrgList[i].reviewDate = dateTrans(this.unReviewedOrgList[i].reviewDate);
            }
          } else {
            alert('获取数据失败');
          }
        } else {
          alert('服务器无响应');
        }
      }
    };
    xhr.open('GET', `${domain}/Studentsorg/${this.userService.user.userName}/0?pageNum=1&pageSize=1000`);
    xhr.send();

    const xhr1 = new XMLHttpRequest();
    xhr1.onreadystatechange = () => {
      if (xhr1.readyState === 4) {
        if (xhr1.status === 200) {
          if (JSON.parse(xhr.responseText).code === 100) {
            this.noPassOrgList = JSON.parse(xhr1.responseText).extend.pageBean.list;
            for (const i in this.noPassOrgList) {
              this.noPassOrgList[i].orgBegin = dateTrans(this.noPassOrgList[i].orgBegin);
              this.noPassOrgList[i].orgEnd = dateTrans(this.noPassOrgList[i].orgEnd);
              this.noPassOrgList[i].submitDate = dateTrans(this.noPassOrgList[i].submitDate);
              this.noPassOrgList[i].reviewDate = dateTrans(this.noPassOrgList[i].reviewDate);
            }
          } else {
            alert('获取数据失败');
          }
        } else {
          alert('服务器无响应');
        }
      }
    };
    xhr1.open('GET', `${domain}/Studentsorg/${this.userService.user.userName}/2?pageNum=1&pageSize=1000`);
    xhr1.send();
  }

  delPaper(id) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (JSON.parse(xhr.responseText).code === 100) {
            this.message.success('删除成功');
            this.getPaper();
          } else {
            this.message.error(JSON.parse(xhr.responseText).extend.msg);
          }
        } else {
          alert(xhr.responseText);
        }
      }
    };
    xhr.open('DELETE', `${domain}/Paper/${id}`);
    xhr.send();
  }

  delPrize(id) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (JSON.parse(xhr.responseText).code === 100) {
            this.message.success('删除成功');
            this.getPrize();
          } else {
            this.message.error(JSON.parse(xhr.responseText).extend.msg);
          }
        } else {
          alert(xhr.responseText);
        }
      }
    };
    xhr.open('DELETE', `${domain}/Studentsprize/${id}`);
    xhr.send();
  }

  delOrg(id) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (JSON.parse(xhr.responseText).code === 100) {
            this.message.success('删除成功');
            this.getOrg();
          } else {
            this.message.error(JSON.parse(xhr.responseText).extend.msg);
          }
        } else {
          alert(xhr.responseText);
        }
      }
    };
    xhr.open('DELETE', `${domain}/Studentsorg/${id}`);
    xhr.send();
  }

  reeditPrize(id) {
    this.router.navigateByUrl(`/student/addprize/${id}`);
  }

  reeditPaper(id) {
    this.router.navigateByUrl(`/student/addessay/${id}`);
  }

  reeditOrg(id) {
    this.router.navigateByUrl(`/student/addorg/${id}`);
  }

  constructor(private userService: UserService, private message: NzMessageService, private router: Router) { }

  ngOnInit() {
    this.getPaper();
    this.getPrize();
    this.getOrg();
  }

}
