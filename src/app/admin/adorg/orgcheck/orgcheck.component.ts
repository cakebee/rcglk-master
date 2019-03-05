import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { dateTrans } from '../../../data.model';
import { domain } from '../../../config';


@Component({
  selector: 'app-orgcheck',
  templateUrl: './orgcheck.component.html',
  styleUrls: ['./orgcheck.component.css']
})
export class OrgcheckComponent implements OnInit {
  
  org = { "orgName": "", "orgClass": "", "orgBegin": "", "orgEnd": "", "orgIntro": "", "orgDuty": "" }
  orgId: string;

  getOrgDetail() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.org = JSON.parse(xhr.responseText).extend.studentsorg;
          this.org.orgBegin = dateTrans(this.org.orgBegin);
          this.org.orgEnd = dateTrans(this.org.orgEnd);
        } else {
          alert("服务器响应失败，请稍候再试...")
        }
      }
    }
    xhr.open('get', `${domain}/Studentsorg/getorg/${this.orgId}`);
    xhr.send();
  }

  constructor(private route: ActivatedRoute) {
    this.orgId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getOrgDetail();
  }

}
