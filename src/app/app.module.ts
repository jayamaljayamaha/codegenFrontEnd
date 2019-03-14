import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatSidenavModule, MatListModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatCardModule,
  MatDatepickerModule, MatIconModule, MatNativeDateModule, MatTableModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideNavBarComponent } from './side-nav-bar/side-nav-bar.component';
import { NewContractComponent } from './new-contract/new-contract.component';
import { NewBookingComponent } from './new-booking/new-booking.component';
import {Route, RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import {  RequestService } from './request.service'

const appRoutes: Routes = [
  {path: 'newContract', component: NewContractComponent},
  {path: 'newBooking', component: NewBookingComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SideNavBarComponent,
    NewContractComponent,
    NewBookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [RequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
