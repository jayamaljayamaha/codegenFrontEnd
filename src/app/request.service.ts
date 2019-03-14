import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable( {
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) {

  }
  returnData: object;

  putNewContract(payLoad: object): any {
    const ROOT_URL = 'http://localhost:8080/contracts';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'});
    const options = {headers: headers};

    return this.http.post(ROOT_URL, payLoad, options);
  }

  public getBookingRoomData(payLoad: object): any {

    const ROOT_URL = 'http://localhost:8080/customerRequest';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'});
    const options = {headers: headers};

    return this.http.post(ROOT_URL, payLoad, options);
  }
}
