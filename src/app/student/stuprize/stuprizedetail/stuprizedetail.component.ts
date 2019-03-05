import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { dateTrans,statusTrans,Prize, prizeLevelList, prizeTypeList } from '../../../data.model';
import { domain } from '../../../config';

@Component({
  selector: 'app-stuprizedetail',
  templateUrl: './stuprizedetail.component.html',
  styleUrls: ['./stuprizedetail.component.css']
})
export class StuprizedetailComponent implements OnInit {
  prize: Prize;
  prizeId: string;
  prizeForm: FormGroup;
  typeList = prizeTypeList;
  levelList = prizeLevelList;
  isEdit: boolean = false;
  isConfirmLoading: boolean = false;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {
    this.prizeId = this.route.snapshot.paramMap.get('id');
    this.createForm();
  }

  createForm() {
    this.prize = new Prize({ value: '', disabled: true }, { value: '', disabled: true }, { value: '', disabled: true }, { value: '', disabled: true }, { value: '', disabled: true }, { value: '', disabled: true }, { value: '', disabled: true }, { value: '', disabled: true });
    this.prizeForm = this.fb.group(this.prize);
  }

  getPrizeDetail(){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let resprize = JSON.parse(xhr.responseText).extend.studentsprize;
          resprize.prizeDate = dateTrans(resprize.prizeDate);
          resprize.status = statusTrans(resprize.status);
          if(resprize.prizeFile){
            resprize.prizeFile = domain + resprize.prizeFile.split('/rcglk')[1];
          }
          this.prizeForm.setValue({
            prizeName: resprize.prizeName,
            prizeClass: resprize.prizeClass,
            prizeLevel: resprize.prizeLevel,
            prizeDate: resprize.prizeDate,
            prizeFile: resprize.prizeFile,
            prizeIntro: resprize.prizeIntro,
            status: resprize.status,
            reason: resprize.reason
          });
        } else {
          console.log(xhr.status);
        }
      }
    }
    xhr.open('get',`${domain}/Studentsprize/${this.prizeId}`);
    xhr.send();
  }

  edit(){
    this.isEdit = true;
    this.prizeForm.controls.prizeClass.enable();
    this.prizeForm.controls.prizeLevel.enable();
    this.prizeForm.controls.prizeName.enable();
    this.prizeForm.controls.prizeIntro.enable();
    this.prizeForm.controls.prizeDate.enable();
  }
  _submitForm() {
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
        this.getPrizeDetail();
        this.prizeForm.controls.prizeClass.disable();
        this.prizeForm.controls.prizeLevel.disable();
        this.prizeForm.controls.prizeName.disable();
        this.prizeForm.controls.prizeIntro.disable();
        this.prizeForm.controls.prizeDate.disable();
        this.isEdit=false;
      }
    }
    let editbody = {
      'prizeClass': this.prizeForm.controls.prizeClass.value,
      'prizeLevel': this.prizeForm.controls.prizeLevel.value,
      'prizeName': this.prizeForm.controls.prizeName.value,
      'prizeIntro': this.prizeForm.controls.prizeIntro.value,
      'prizeDate': this.prizeForm.controls.prizeDate.value,
      'prizeId': this.prizeId
    }
    xhr.open('PUT', `${domain}/Studentsprize/${this.prizeId}`);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.send(JSON.stringify(editbody));
  }
  delete(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4) {
        if (xhr.status === 200){
          alert('删除成功');
          this.router.navigateByUrl("/student/viewprize");
        }
        else {
          alert("服务器错误，请联系管理员...")
        }
      }
    }
    xhr.open('DELETE', `${domain}/Studentsprize/${this.prizeId}`);
    xhr.send();
  }

  ngOnInit() {
    this.getPrizeDetail();
  }
}
