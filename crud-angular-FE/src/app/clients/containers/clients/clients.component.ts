import { Observable, catchError, of } from 'rxjs';
import { Clients } from '../../model/clients';
import { ClientsService } from '../../service/clients.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../shared/component/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../../shared/component/error-dialog/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit{

  clients$:Observable<Clients[]> |null = null;

 // clientsService : ClientsService;

 constructor(private clientsService: ClientsService,
  public dialog: MatDialog,
  private router: Router,
  private route:ActivatedRoute,
  private snackBar: MatSnackBar,
 ) {
  this.refresh();

}

 onError(errorMsg:string) {
  this.dialog.open(ErrorDialogComponent, {
    data: errorMsg
  });
}

ngOnInit(): void {
  }

  onAdd(){
    this.router.navigate(['new'], {relativeTo:this.route})
  }

  onEdit(client : Clients){
    this.router.navigate(['edit',client.id], {relativeTo:this.route})
  }

  refresh(){
  this.clients$ = this.clientsService.list().pipe(
    catchError(error => {
    this.onError("Erro ao Exibir Clientes Cadastrados")
      return of ([])
    })
  )

  }

  onDelete(client: Clients){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem Certeza que deseja remover esse Cliente?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result){
        this.clientsService.delete(client.id).subscribe(
          ()=>{
          this.refresh();
          this.snackBar.open('Cliente Removido com sucesso', 'Fechar', {duration:5000,
            verticalPosition:'top',
            horizontalPosition:'center'
          });
        },
        () => this.onError('Erro ao tentar remover cliente')
      );
      }
    });
}

}

export function getEstados(): string[] {
  return [
    'Acre',
    'Alagoas',
    'Amapá',
    'Amazonas',
    'Bahia',
    'Ceará',
    'Distrito Federal',
    'Espírito Santo',
    'Goiás',
    'Maranhão',
    'Mato Grosso',
    'Mato Grosso do Sul',
    'Minas Gerais',
    'Pará',
    'Paraíba',
    'Paraná',
    'Pernambuco',
    'Piauí',
    'Rio de Janeiro',
    'Rio Grande do Norte',
    'Rio Grande do Sul',
    'Rondônia',
    'Roraima',
    'Santa Catarina',
    'São Paulo',
    'Sergipe',
    'Tocantins',
  ];
}


