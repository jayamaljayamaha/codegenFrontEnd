import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RequestService} from '../request.service';


export interface PeriodicElement {
  roomType: string;
  price: number;
  noOfRooms: number;
  maxAdults: number;

}


let ELEMENT_DATA: PeriodicElement[] = [];


@Component({
  selector: 'app-new-contract',
  templateUrl: './new-contract.component.html',
  styleUrls: ['./new-contract.component.css']
})
export class NewContractComponent implements OnInit {

  displayedColumns: string[] = ['Room Type', 'Price', 'No Of Rooms', 'No Of addults'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  noRooms: number;
  noAdults: number;
  roomType: string;
  price: number;
  hotelName: string;
  contractStartDate: Date;
  contractEndDate: Date;

  constructor(private service: RequestService) { }


  ngOnInit() {
  }

  onClick() {

    const object = {
      roomType: this.roomType,
      price: this.price,
      noOfRooms: this.noRooms,
      maxAdults: this.noAdults
    };
    ELEMENT_DATA.push(object);
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.roomType = null;
    this.price = null;
    this.noRooms = null;
    this.noAdults = null;
  }
  makeNewContract() {

    if (this.hotelName == null || this.contractStartDate == null || this.contractEndDate == null || ELEMENT_DATA.length === 0) {
      confirm('Please enter all the details');
    } else {

      const startDatemonth =  this.contractStartDate.getMonth() + 1;
      const startDatedate =  this.contractStartDate.getDate();
      const startDateYear =  this.contractStartDate.getFullYear();

      const startDate = startDatedate + '/' + startDatemonth + '/' + startDateYear;

      const endDatemonth =  this.contractEndDate.getMonth() + 1;
      const endDatedate =  this.contractEndDate.getDate();
      const endDateYear =  this.contractEndDate.getFullYear();

      const endDate = endDatedate + '/' + endDatemonth + '/' + endDateYear;

      const roomTypeObjects: Array<PeriodicElement> = [];
      for (const entry of ELEMENT_DATA) {
        roomTypeObjects.push(entry);

      }



      const payLoad = {
        contractStartDate: startDate,
        contractEndDate: endDate,
        roomTypes: roomTypeObjects,
        hotel: {
          name: this.hotelName
        },
      };
      console.log(payLoad);

      this.service.putNewContract(payLoad).subscribe( d => {
          alert('New Contract entered succesfully');
        },
        error => {
          console.log('Error happened: ', error);
        });
    }

    ELEMENT_DATA = [];
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.hotelName = null;
    this.contractStartDate = null;
    this.contractEndDate = null;
  }
}
