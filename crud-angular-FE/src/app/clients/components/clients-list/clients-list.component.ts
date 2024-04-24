import { Clients } from '../../model/clients';
import { Component, EventEmitter, Input, OnInit, Output, input } from '@angular/core';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.css'
})
export class ClientsListComponent implements OnInit{

  readonly displayedColumns = ['nome','email','data','cpf','estado','teste'];

   @Input() clients : Clients[] = [];
   @Output() add = new EventEmitter( false);
   @Output() edit = new EventEmitter( false)
   @Output() delete = new EventEmitter( false)

  constructor(){}


  ngOnInit(): void {

  }
  onAdd(){
    this.add.emit(true)
  }
  onEdit(client : Clients){
    this.edit.emit(client);
  }

  onDelete(client: Clients){
    this.delete.emit(client);
  }
}
