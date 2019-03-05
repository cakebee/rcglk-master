import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stuviewstatus',
  templateUrl: './stuviewstatus.component.html',
  styleUrls: ['./stuviewstatus.component.css']
})
export class StuviewstatusComponent implements OnInit {

  dataSet = [

  ];

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.dataSet=[    {
        key    : '1',
        name   : 'John Brown',
        age    : 32,
        address: 'New York No. 1 Lake Park'
      },
      {
        key    : '2',
        name   : 'Jim Green',
        age    : 42,
        address: 'London No. 1 Lake Park'
      },
      {
        key    : '3',
        name   : 'Joe Black',
        age    : 32,
        address: 'Sidney No. 1 Lake Park'
      }]
    }, 2000);
  }

}
