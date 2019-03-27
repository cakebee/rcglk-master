import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { dateTrans, Org, orgTypeList } from '../../../data.model';
import { domain } from '../../../config';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-stuorgdetail',
  templateUrl: './stuorgdetail.component.html',
  styleUrls: ['./stuorgdetail.component.css']
})
export class StuorgdetailComponent implements OnInit {
  
  org: Org;
  orgId: string;
  orgForm: FormGroup;
  typeList = orgTypeList;
  isEdit: boolean = false;
  isConfirmLoading: boolean = false;

  constructor(private route: ActivatedRoute,private fb: FormBuilder, private router: Router) {
    this.orgId = this.route.snapshot.paramMap.get('id');
    this.createForm();
  }
  
  createForm(){
    this.org = new Org({ value: '', disabled: true }, { value: '', disabled: true }, { value: '', disabled: true },
      { value: '', disabled: true }, { value: '', disabled: true }, { value: '', disabled: true }, { value: '', disabled: true });
    this.orgForm = this.fb.group(this.org);
  }

  getOrgDetail() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let resOrg = JSON.parse(xhr.responseText).extend.studentsorg;
          resOrg.orgBegin = dateTrans(resOrg.orgBegin);
          resOrg.orgEnd = dateTrans(resOrg.orgEnd);
          this.orgForm.setValue({
            orgName: resOrg.orgName,
            orgClass: resOrg.orgClass,
            orgBegin: resOrg.orgBegin,
            orgEnd: resOrg.orgEnd,
            orgIntro: resOrg.orgIntro,
            orgDuty: resOrg.orgDuty
          });
        } else {
          console.log(xhr.status);
        }
      }
    }
    xhr.open('get', `${domain}/Studentsorg/getorg/${this.orgId}`);
    xhr.send();
  }

  edit(){
    this.isEdit = true;
    this.orgForm.enable();
  }
  _submitForm(){
    this.isConfirmLoading = true;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          alert("修改成功");
        }
        else {
          alert("服务器错误，请联系管理员...")
        }
        this.isConfirmLoading = false;
        this.getOrgDetail();
        this.orgForm.disable();
        this.isEdit=false;
      }
    }
    let editbody = {
      'orgClass': this.orgForm.controls.orgClass.value,
      'orgIntro': this.orgForm.controls.orgIntro.value,
      'orgName': this.orgForm.controls.orgName.value,
      'orgBegin': this.orgForm.controls.orgBegin.value,
      'orgEnd': this.orgForm.controls.orgEnd.value,
      'orgId': this.orgId
    }
    xhr.open('PUT', `${domain}/Studentsorg/${this.orgId}`);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.send(JSON.stringify(editbody));
  }
  delete(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4) {
        if (xhr.status === 200){
          alert('删除成功');
          this.router.navigateByUrl("/student/vieworg");
        }
        else {
          alert("服务器错误，请联系管理员...")
        }
      }
    }
    xhr.open('DELETE', `${domain}/Studentsorg/${this.orgId}`);
    xhr.send();
  }

  ngOnInit() {
    this.getOrgDetail();
  }


}
