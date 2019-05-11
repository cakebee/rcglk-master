import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';

import zh from '@angular/common/locales/zh';
import { LoginComponent } from './login/login.component';
import { StudentComponent } from './student/student.component';
import { StuinfoComponent } from './student/stuinfo/stuinfo.component';
import { StuprizeComponent } from './student/stuprize/stuprize.component';
import { StuorgComponent } from './student/stuorg/stuorg.component';
import { StuaddprizeComponent } from './student/stuprize/stuaddprize/stuaddprize.component';
import { StuviewprizeComponent } from './student/stuprize/stuviewprize/stuviewprize.component';
import { StuviewstatusComponent } from './student/stuprize/stuviewstatus/stuviewstatus.component';
import { StuaddorgComponent } from './student/stuorg/stuaddorg/stuaddorg.component';
import { StuvieworgComponent } from './student/stuorg/stuvieworg/stuvieworg.component';
import { StuorgdetailComponent } from './student/stuorg/stuorgdetail/stuorgdetail.component';
import { StuprizedetailComponent } from './student/stuprize/stuprizedetail/stuprizedetail.component';
import { AdminComponent } from './admin/admin.component';
import { UsermanagerComponent } from './admin/usermanager/usermanager.component';
import { AdprizeComponent } from './admin/adprize/adprize.component';
import { AdorgComponent } from './admin/adorg/adorg.component';
import { PrizemanagerComponent } from './admin/adprize/prizemanager/prizemanager.component';
import { OrgmanagerComponent } from './admin/adorg/orgmanager/orgmanager.component';
import { PrizecheckComponent } from './admin/adprize/prizecheck/prizecheck.component';
import { OrgcheckComponent } from './admin/adorg/orgcheck/orgcheck.component';
import { StuessayComponent } from './student/stuessay/stuessay.component';
import { StuaddessayComponent } from './student/stuessay/stuaddessay/stuaddessay.component';
import { StuviewessayComponent } from './student/stuessay/stuviewessay/stuviewessay.component';
import { AdessayComponent } from './admin/adessay/adessay.component';
import { EssaymanagerComponent } from './admin/adessay/essaymanager/essaymanager.component';
import { DoLoginComponent } from './login/do-login/do-login.component';
import { AdqualityComponent } from './admin/adquality/adquality.component';
import { QualitydetailComponent } from './admin/adquality/qualitydetail/qualitydetail.component';
import { ReviewComponent } from './admin/review/review.component';
import { PaperDetailComponent } from './admin/adessay/paper-detail/paper-detail.component';
import { StureiviewComponent } from './student/stureiview/stureiview.component';
import { StuprojectComponent } from './student/stuproject/stuproject.component';
import { StuaddprojectComponent } from './student/stuproject/stuaddproject/stuaddproject.component';
import { StuviewprojectComponent } from './student/stuproject/stuviewproject/stuviewproject.component';
import { AdprojectComponent } from './admin/adproject/adproject.component';
import { ProjectmanagerComponent } from './admin/adproject/projectmanager/projectmanager.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentComponent,
    StuinfoComponent,
    StuprizeComponent,
    StuorgComponent,
    StuaddprizeComponent,
    StuviewprizeComponent,
    StuviewstatusComponent,
    StuaddorgComponent,
    StuvieworgComponent,
    StuorgdetailComponent,
    StuprizedetailComponent,
    AdminComponent,
    UsermanagerComponent,
    AdprizeComponent,
    AdorgComponent,
    PrizemanagerComponent,
    OrgmanagerComponent,
    PrizecheckComponent,
    OrgcheckComponent,
    StuessayComponent,
    StuaddessayComponent,
    StuviewessayComponent,
    AdessayComponent,
    EssaymanagerComponent,
    DoLoginComponent,
    AdqualityComponent,
    QualitydetailComponent,
    ReviewComponent,
    PaperDetailComponent,
    StureiviewComponent,
    StuprojectComponent,
    StuaddprojectComponent,
    StuviewprojectComponent,
    AdprojectComponent,
    ProjectmanagerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgZorroAntdModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
