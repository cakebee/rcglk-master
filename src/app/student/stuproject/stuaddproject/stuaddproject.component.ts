import { Component, OnInit } from '@angular/core';
import {Project, roleDetlList} from '../../../data.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../service/user.service';
import {NzMessageService} from 'ng-zorro-antd';
import {domain} from '../../../config';

@Component({
  selector: 'app-stuaddproject',
  templateUrl: './stuaddproject.component.html',
  styleUrls: ['./stuaddproject.component.css']
})
export class StuaddprojectComponent implements OnInit {
  isConfirmLoading = false;
  saveProject: Project;
  project: Project;
  projectForm: FormGroup;
  file: File;
  fileList = [];
  projectId: string;
  targetProject: Project; /*当前修改的project*/
  isUpdate = false; /*是否为修改模式*/
  roleDetlOptions = roleDetlList;
  /*字数限制*/
  introLimit = 500;
  suppLimit = 500;
  dutyLimit = 1000;
  introLengthRemain = this.introLimit;
  suppLengthRemain = this.suppLimit;
  dutyLengthRemain = this.dutyLimit;


  constructor(private fb: FormBuilder, private router: Router, private userService: UserService,
              private msg: NzMessageService, private route: ActivatedRoute) {
    /*this.projectId = this.route.snapshot.paramMap.get('id');*/
    this.createForm();
  }

  ngOnInit() {
    /*if (this.projectId != null) {
      this.getProject(this.projectId);
      this.isUpdate = true;
    }*/
  }


  private createForm() {
    this.project = new Project();
    this.projectForm = this.fb.group(this.project);
  }
  _submitForm() {
    this.isConfirmLoading = true;
    this.projectForm.enable();
    let roleDetl;
    if (this.projectForm.controls.roleDetl.value) {
      if (this.projectForm.controls.roleDetl.value[1] == null) {
        roleDetl = this.projectForm.controls.roleDetl.value[0];
      } else {
        roleDetl = this.projectForm.controls.roleDetl.value[0] + '/' + this.projectForm.controls.roleDetl.value[1];
      }
    }
    this.saveProject = new Project(
      this.projectForm.controls.id.value,
      this.projectForm.controls.name.value,
      this.projectForm.controls.startDate.value,
      this.projectForm.controls.endDate.value,
      this.projectForm.controls.intro.value,
      this.projectForm.controls.env.value,
      this.projectForm.controls.frame.value,
      this.projectForm.controls.role.value,
      roleDetl,
      this.projectForm.controls.duty.value,
      this.userService.user.userName,
      this.userService.user.stuName,
      this.projectForm.controls.supp.value,
      this.projectForm.controls.projLink.value,
      this.projectForm.controls.srcLink.value,
      this.projectForm.controls.prizeId.value,
    );
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (JSON.parse(xhr.responseText).code === 100) {
            this.msg.success('提交成功，请等待审核');
            this.router.navigateByUrl('/student/review');
          } else {
            this.msg.error(JSON.parse(xhr.responseText).extend.msg);
          }
        } else {
          this.msg.error('服务器无响应');
        }
      }
    };
    const formData = new FormData();
    formData.append('project', JSON.stringify(this.saveProject));
    formData.append('file', this.file);
    xhr.open('POST', `${domain}/project`);
    xhr.send(formData);
    this.isConfirmLoading = false;
    this.projectForm.enable();
  }

  private getProject(projectId: string) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (JSON.parse(xhr.responseText).code === 100) {
            this.targetProject = JSON.parse(xhr.responseText).extend.project;
            this.projectForm.get('id').setValue(this.targetProject.id);
            this.projectForm.get('name').setValue(this.targetProject.name);
          } else {
            this.msg.error(JSON.parse(xhr.responseText).extend.msg);
          }
        } else {
          this.msg.error('服务器无响应');
        }
      }
    };
    xhr.open('GET', `${domain}/project/${projectId}`);
    xhr.send();
  }

  reset() {
    if (this.isUpdate) {
      this.getProject(this.projectId);
      this.msg.success('已撤回修改');
    } else {
      this.createForm();
      this.fileList = [];
      this.file = null;
    }
  }

  /*文件类型、大小检查*/
  private beforeUpload = (file: File) => {
    const isPDF = file.type.split('/')[1] == 'pdf';
    if (this.fileList.length > 0) {
      this.msg.error('只能添加一个证明文件');
      return false;
    }
    if (!isPDF) {
      this.msg.error('只能上传PDF文件');
      return false;
    }

    const isLT4M = file.size / 1024 / 1024 < 4;
    if (!isLT4M) {
      this.msg.error('文件大小不能超过4MB');
      return false;
    }

    if (isPDF && isLT4M) {
      this.file = file;
      this.fileList.push(file);
      this.msg.success('添加成功');
    }
    return false;
  }
  private delFile = (file: File) => {
    this.fileList = [];
    this.file = null;
  }
  /*检查Intro字数*/
  private checkIntro() {
    const s: string = this.projectForm.controls['intro'].value;
    if (s) {
      const currentLength = s.length;
      this.introLengthRemain = this.introLimit - currentLength;
    } else {
      this.introLengthRemain = this.introLimit;
    }
  }
  /*检查Duty字数*/
  private checkDuty() {
    const s: string = this.projectForm.controls['duty'].value;
    if (s) {
      const currentLength = s.length;
      this.dutyLengthRemain = this.dutyLimit - currentLength;
    } else {
      this.dutyLengthRemain = this.dutyLimit;
    }
  }
  /*检查Supp字数*/
  private checkSupp() {
    const s: string = this.projectForm.controls['supp'].value;
    if (s) {
      const currentLength = s.length;
      this.suppLengthRemain = this.suppLimit - currentLength;
    } else {
      this.suppLengthRemain = this.suppLimit;
    }
  }
}
