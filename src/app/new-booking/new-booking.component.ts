import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { HttpClientModule} from '@angular/common/http';
import {RequestService} from '../request.service';
import {PeriodicElement} from '../new-contract/new-contract.component';


export interface PeriodicElement {
  noOfRooms: number;
  noOfAdults: number;
}

let ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.css']
})

export class NewBookingComponent implements OnInit {

  displayedColumns: string[] = ['No Of Rooms', 'No Of addults'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  noRooms: number;
  noAdults: number;
  noOfNights: number;
  checkInDate: Date;

  hotelName;
  roomTypes;
  price;
  Availability;
  show = false;

  constructor(private reqService: RequestService) { }

  ngOnInit() {
  }

  Submit() {
    if (this.checkInDate == null || this.noOfNights == null || ELEMENT_DATA.length === 0) {
     confirm('Please enter all the details');
    } else {
      const checkDatemonth =  this.checkInDate.getMonth() + 1;
      const checkDatedate =  this.checkInDate.getDate();
      const checkDateYear =  this.checkInDate.getFullYear();

      const checkDate = checkDatedate + '/' + checkDatemonth + '/' + checkDateYear;

      const reqRoomsObjects: PeriodicElement[] = [];
      for (const entry of ELEMENT_DATA) {
        reqRoomsObjects.push(entry);

      }
      const payLoad = {
        checkInDate: checkDate,
        reqRoomTypes: reqRoomsObjects,
        numberOfNights: this.noOfNights
      };

      console.log(payLoad);
      this.hotelName = '';
      this.roomTypes = '';
      this.price = '';
      this.Availability = '';

      this.reqService.getBookingRoomData(payLoad).subscribe(d => {
        console.log(d);
        if (d.hotelName != null) {
          this.hotelName = d.hotelName;
        } else {
          this.hotelName = 'N/A';
        }

        if (d.roomTypes != null) {
          for ( let i of d.roomTypes) {
            this.roomTypes = this.roomTypes  + i + ', ';
          }
        } else {
          this.roomTypes = 'N/A';
        }

        if (d.price != null) {
          this.price = d.price;
        } else {
          this.price = 'N/A';
        }

        this.Availability = d.availability;
        this.show = true;

      });

      ELEMENT_DATA = [];
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      this.noOfNights = null;
      this.checkInDate = null;
    }
  }

  onClick() {
    const object = {
      noOfRooms: this.noRooms,
      noOfAdults: this.noAdults
    };

    ELEMENT_DATA.push(object);
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.noRooms = null;
    this.noAdults = null;
  }


}
