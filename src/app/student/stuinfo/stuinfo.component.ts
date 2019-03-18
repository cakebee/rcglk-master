import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Student } from '../../data.model';
import { domain } from '../../config';

@Component({
  selector: 'app-stuinfo',
  templateUrl: './stuinfo.component.html',
  styleUrls: ['./stuinfo.component.css']
})
export class StuinfoComponent implements OnInit {
  isModify = false;
  isConfirmLoading = false;
  stu: Student;
  stuForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.createForm();
  }

  createForm() {
    this.stu = new Student({ value: '', disabled: true }, { value: '', disabled: true }, { value: '', disabled: true }, { value: '', disabled: true }, { value: '', disabled: true },
      { value: '', disabled: true }, { value: '', disabled: true }, { value: '', disabled: true }, { value: '', disabled: true },
      { value: '', disabled: true }, { value: '', disabled: true}, { value: '', disabled: true }, { value: '', disabled: true },
      { value: '', disabled: true }, { value: '', disabled: true });
    this.stuForm = this.fb.group(this.stu);
  }

  getStu() {
    var xhr = new XMLHttpRequest(); // 新建XMLHttpRequest对象
    xhr.onreadystatechange = () => { // 状态发生变化时，函数被回调
      if (xhr.readyState === 4) { // 成功完成
        // 判断响应结果:
        if (xhr.status === 200) {
          // 成功，通过responseText拿到响应的文本:
          let text = (JSON.parse(xhr.responseText).extend.list[0]);
          this.stuForm.setValue({
            stuId: text.stuId,
            stuName: text.stuName,
            stuGender: text.stuGender,
            stuClass: text.stuClass,
            stuStatus: text.stuStatus,
            stuIntro: text.stuIntro,
            stuMajor: text.stuMajor,
            stuTel: text.stuTel,
            stuQq: text.stuQq,
            stuDorm: text.stuDorm,
            identity: text.identity,
            stuGrade: text.stuGrade,
            stuGpa: text.stuGpa,
            stuAge: text.stuAge,
            stuHome: text.stuHome
          });
        } else {
          // 失败，根据响应码判断失败原因:
          alert('获取数据失败');
        }
      }
    }

    // 发送请求:
    xhr.open('GET', `${domain}/Studentsinfo/${this.userService.user.userName}`);
    xhr.send();
  }

  modify() {
    this.stuForm.controls['stuQq'].enable();
    this.stuForm.controls['stuTel'].enable();
    this.stuForm.controls['stuIntro'].enable();
    this.isModify = true;
  }

  _submitForm() {
    this.isConfirmLoading = true;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          alert("修改成功");
          this.isModify = false;
          this.getStu();
        }
        else {
          alert("error")
        }
        this.isConfirmLoading = false;
        this.stuForm.controls['stuQq'].disable();
        this.stuForm.controls['stuTel'].disable();
        this.stuForm.controls['stuIntro'].disable();
        this.isModify = false;
      }
    }
    let editbody = {
      'stuTel': this.stuForm.controls.stuTel.value,
      'stuQq': this.stuForm.controls.stuQq.value,
      'stuIntro': this.stuForm.controls.stuIntro.value,
      'stuId': this.stuForm.controls.stuId.value
    }
    xhr.open('PUT', `${domain}/Studentsinfos`);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.send(JSON.stringify(editbody));
  }

  ngOnInit() {
    this.getStu();
  }

}
