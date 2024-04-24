import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clients } from '../model/clients';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private readonly API = 'http://localhost:8080/clients/list';
  private API1 = 'http://localhost:8080/clients/cadastrar';
  private API2 = 'http://localhost:8080/clients/atualizar';
  private API3 = 'http://localhost:8080/clients/delete';


  constructor(private httpClient : HttpClient) { }

 list(){
 return this.httpClient.get<Clients[]>(this.API)
 .pipe(
  first(),
  tap(clients => console.log(clients))
 );

 }

 loadById(id:Number){
  return this.httpClient.get<Clients>(`${this.API}/${id}`);
 }

 save(record:Partial<Clients>){
  if(record.id){
    return this.update(record);
  }
  return this.create(record);
}

 private create(record:Partial<Clients>){
  return this.httpClient.post<Clients>(this.API1, record).pipe(first());
 }

 private update(record:Partial<Clients>){
  return this.httpClient.put<Clients>(`${this.API2}/${record.id}`, record).pipe(first());
 }

  delete(id:Number){
  return this.httpClient.delete(`${this.API3}/${id}`).pipe(first());
 }

}

