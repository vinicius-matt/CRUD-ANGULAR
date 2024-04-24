import {ResolveFn } from '@angular/router';
import { Clients } from '../model/clients';
import { ClientsService } from '../service/clients.service';
import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';

export const clientsResolver: ResolveFn<Observable<Clients>> = (route, state, service:ClientsService = inject(ClientsService)) => {
  if(route.params?.['id']){
    return service.loadById(route.params['id']);
  };
  return of(
    {id:0,
     nome:'',
     email:'',
     data:new Date,
     cpf:'',
     estado:''
    });
};
