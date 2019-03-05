import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-do-login',
  providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }],
  templateUrl: './do-login.component.html',
  styleUrls: ['./do-login.component.css']
})
export class DoLoginComponent implements OnInit {

  location: Location;

  constructor(location: Location) { this.location = location; }

  ngOnInit() {
    const url = this.location.path()
    const ticket = url.split('?')[1]
    var doLogin = function () {

      // console.log(xmlDoc.getElementsByTagName("cas:name")[0].childNodes[0].nodeValue);

      var xhr = new XMLHttpRequest();
      xhr.open('GET', `https://ostec.uestc.edu.cn/authcas/serviceValidate?${ticket}&service=http://localhost:4200/doLogin`, true);
      xhr.onreadystatechange = () => {
        console.log(xhr)
      }
      // xhr.responseType = 'document';
      // xhr.overrideMimeType('text/xml');
      xhr.send();
      
    }
    doLogin();
  }
}
