  
import { Injectable, EventEmitter } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Customer } from './customer';
import { Observable } from 'rxjs';

const httpOptions ={ headers : new HttpHeaders({ 'Content-Type':'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customerId: string;
  name: string;
  addr: string;
  age: string;
  tel: string;
  customers: Customer[];

  private headers =new HttpHeaders().append('Conten-Type','application/json');
  
constructor(private http:HttpClient) { }
  //private userUrl ='http://localhost:8081/customer/findAll';
  private userUrl ='http://localhost:8080/customer/';
  //private userUrl = '/api';

  public getUsers() {
  //  return this.http.get<Customer[]>(this.userUrl);
  return this.http.get<Customer[]>('http://localhost:8080/customer/findAll');
  }

  public getCustomerByName(name : String){
    return this.http.get<Customer[]>('http://localhost:8080/customer/findByName');
    //return this.http.post<Customer[]>('http://localhost:8080/customer/findByName',JSON.stringify(),);
  }


  customerEventer: EventEmitter<Customer[]> = new EventEmitter();


}
