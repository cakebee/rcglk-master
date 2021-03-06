import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PdfViewerComponent} from 'ng2-pdf-viewer';

import { LoginComponent } from './login/login.component';
import { DoLoginComponent } from './login/do-login/do-login.component';
import { StudentComponent } from './student/student.component';
import { StuinfoComponent } from './student/stuinfo/stuinfo.component';
import { StuaddprizeComponent } from './student/stuprize/stuaddprize/stuaddprize.component';
import { StuviewprizeComponent } from './student/stuprize/stuviewprize/stuviewprize.component';
import { StuviewstatusComponent } from './student/stuprize/stuviewstatus/stuviewstatus.component';
import { StuprizedetailComponent } from './student/stuprize/stuprizedetail/stuprizedetail.component';
import { StuaddorgComponent } from './student/stuorg/stuaddorg/stuaddorg.component';
import { StuvieworgComponent } from './student/stuorg/stuvieworg/stuvieworg.component';
import { StuorgdetailComponent } from './student/stuorg/stuorgdetail/stuorgdetail.component';
import { AdminComponent } from './admin/admin.component';
import { UsermanagerComponent } from './admin/usermanager/usermanager.component';
import { PrizemanagerComponent } from './admin/adprize/prizemanager/prizemanager.component';
import { PrizecheckComponent } from './admin/adprize/prizecheck/prizecheck.component';
import { OrgmanagerComponent } from './admin/adorg/orgmanager/orgmanager.component';
import { OrgcheckComponent } from './admin/adorg/orgcheck/orgcheck.component';
import { StuaddessayComponent } from './student/stuessay/stuaddessay/stuaddessay.component';
import { StuviewessayComponent } from './student/stuessay/stuviewessay/stuviewessay.component';
import { EssaymanagerComponent } from './admin/adessay/essaymanager/essaymanager.component';
import {AdqualityComponent} from './admin/adquality/adquality.component';
import {QualitydetailComponent} from './admin/adquality/qualitydetail/qualitydetail.component';
import {ReviewComponent} from './admin/review/review.component';
import {StureiviewComponent} from './student/stureiview/stureiview.component';
import {StuaddprojectComponent} from './student/stuproject/stuaddproject/stuaddproject.component';
import {StuviewprojectComponent} from './student/stuproject/stuviewproject/stuviewproject.component';
import {ProjectmanagerComponent} from './admin/adproject/projectmanager/projectmanager.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'doLogin', component: DoLoginComponent},
  {
    path: 'student',
    component: StudentComponent,
    // canActivate: [StudentGuard],
    children: [
      {
        path: 'info',
        component: StuinfoComponent
      },
      {
        path: 'addprize',
        component: StuaddprizeComponent
      },
      {
        path: 'addprize/:id',
        component: StuaddprizeComponent
      },
      {
        path: 'viewprize',
        component: StuviewprizeComponent
      },
      {
        path: 'viewstatus',
        component: StuviewstatusComponent
      },
      {
        path: 'addorg',
        component: StuaddorgComponent
      },
      {
        path: 'addorg/:id',
        component: StuaddorgComponent
      },
      {
        path: 'vieworg',
        component: StuvieworgComponent
      },
      {
        path: 'prizedetails/:id',
        component: StuprizedetailComponent
      },
      {
        path: 'orgdetails/:id',
        component: StuorgdetailComponent
      },
      {
        path: 'addessay',
        component: StuaddessayComponent,
      },
      {
        path: 'addessay/:id',
        component: StuaddessayComponent,
      },
      {
        path: 'viewessay',
        component: StuviewessayComponent
      },
      {
        path: 'addproject',
        component: StuaddprojectComponent
      },
      {
        path: 'addproject/:id',
        component: StuaddprojectComponent
      },
      {
        path: 'viewproject',
        component: StuviewprojectComponent
      },
      {
        path: 'review',
        component: StureiviewComponent
      }
    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    // canActivate: [ManagerLoginGuard],
    children: [
      {
        path: 'user',
        component: UsermanagerComponent
      },
      {
        path: 'prize',
        component: PrizemanagerComponent
      },
      {
        path: 'org',
        component: OrgmanagerComponent
      },
      {
        path: 'prizecheck/:id',
        component: PrizecheckComponent
      },
      {
        path: 'orgcheck/:id',
        component: OrgcheckComponent
      },
      {
        path: 'essay',
        component: EssaymanagerComponent
      },
      {
        path: 'quality',
        component: AdqualityComponent
      },
      {
        path: 'qualitydetail/:id',
        component: QualitydetailComponent
      },
      {
        path: 'review',
        component: ReviewComponent
      },
      {
        path: 'project',
        component: ProjectmanagerComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  // {
  //   path: '**',
  //   component: PagenotfoundComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
