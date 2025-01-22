import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackComponent } from './Dashboard/back/back.component';
import { GetProductComponent } from './Components/Product/get-product/get-product.component';
import { GetSupplierComponent } from './Components/Supplier/get-supplier/get-supplier.component';
import { CalendarComponent } from './Components/calendar/calendar.component';

const routes: Routes = [
  {
    path: "admin",
    component: BackComponent,
    children: [
      {
        path: 'products',
        component: GetProductComponent
      },
      {
        path: 'suppliers',
        component: GetSupplierComponent
      },
      {
        path: 'calendar',
        component: CalendarComponent
      }
    ]
  
  },
 

 
  // Default route
  { path: '', redirectTo: '/admin', pathMatch: 'full' }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
