import { Component, OnInit , ElementRef, ViewChild  } from '@angular/core';

import { Customer } from '../customer';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-find-all',
  templateUrl: './find-all.component.html',
  styleUrls: ['./find-all.component.css']
})
export class FindAllComponent implements OnInit {


  
  [x: string]: any;

  @ViewChild('nameInput') nameId: ElementRef;
  @ViewChild('addrInput') addrId: ElementRef;
  @ViewChild('ageInput') ageId: ElementRef;
  @ViewChild('telInput') telId: ElementRef;

  private _headers = {headers: new HttpHeaders().set('Content-Type', 'application/json')};
  customerId: string;
  name: string;
  addr: string;
  age: string;
  tel: string;
  customers: Customer[];

  constructor(private router:Router, private customerService: CustomerService,private http:HttpClient) { }

  ngOnInit() {
     this.customerService.getUsers().subscribe( data =>{
       this.customers =data;
       console.log(data);
       const returnText = data['body'].returnCode;
       if('0000'=== returnText){
        console.log("Hello");
        const body = data['body'];
        this.customerId =body.customerId;
        this.name =body.name;
        this.addr =body.addr;
        this.age =body.age;
        this.tel =body.tel;
        this.customers = body.dataList;

       }
     })
      console.log("1111111");
  }


  updateCustomer(customerId:String){
    console.log(customerId);
    this.findone(customerId);
  }
  findone(customerId){
    let customerIdStr = customerId;
    let userJSON = {
     'header': {
       'msgId': '1',
       'txnSeq': '2',
       'branchId': '3',
       'clientIp': '4'
     },
     'body': {
      'customerId':customerId
     }
   };

      // 透過 JSON.parse() 解析 JSON 字串
      let user = JSON.stringify(userJSON);
      var newstr = user
      console.log(
       "newstr"+newstr
      );
      var objJsonArray =JSON.parse(newstr);
      this.http.post('http://localhost:8080/customer/findSQL',objJsonArray
      ,this._headers).subscribe(
                   res => {
                    console.log(res);
                     const returnText = res['body'].returnCode;
                     if('0000'=== returnText){
                      console.log("成功拿回資料");
                      //this.param =res['body'];
                      const body = res['body'];
                      this.customers = body.dataList;

                      this.customerService.customerEventer.emit(this.customers);

                      //this.router.navigate(['updata'],this.param); // <-- 導向UpataComponent
                     }
                   },errRes =>{
                     console.log(errRes);
                   }
                 );

  }



}
