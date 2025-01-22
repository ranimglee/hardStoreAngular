import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackComponent } from './Dashboard/back/back.component';
import { FooterComponent } from './Dashboard/footer/footer.component';
import { NavbarComponent } from './Dashboard/navbar/navbar.component';
import { SidebarComponent } from './Dashboard/sidebar/sidebar.component';
import { AddProductComponent } from './Components/Product/add-product/add-product.component';
import { UpdateProductComponent } from './Components/Product/update-product/update-product.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GetProductComponent } from './Components/Product/get-product/get-product.component';
import { GetSupplierComponent } from './Components/Supplier/get-supplier/get-supplier.component';
import { UpdateSupplierComponent } from './Components/Supplier/update-supplier/update-supplier.component';
import { AddSupplierComponent } from './Components/Supplier/add-supplier/add-supplier.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarComponent } from './Components/calendar/calendar.component';

// Import the necessary FullCalendar plugins
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@NgModule({
  declarations: [
    AppComponent,
    BackComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    GetProductComponent,
    AddProductComponent,
    UpdateProductComponent,
    GetSupplierComponent,
    UpdateSupplierComponent,
    AddSupplierComponent,
    CalendarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // Add HttpClientModule here
    ReactiveFormsModule, // Add ReactiveFormsModule here
    NgbPaginationModule,
    FullCalendarModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
