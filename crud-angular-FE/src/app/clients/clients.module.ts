import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './containers/clients/clients.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { ClientFormComponent } from './containers/clients/client-form/client-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientsListComponent } from './components/clients-list/clients-list.component';



@NgModule({
  declarations: [
    ClientsComponent,
    ClientFormComponent,
    ClientsListComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ClientsModule { }
