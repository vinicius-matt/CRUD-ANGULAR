import { Clients } from './../../../model/clients';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getEstados } from '../clients.component';
import { ClientsService } from '../../../service/clients.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { __values } from 'tslib';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  form: FormGroup;
  estados: string[];

  constructor(private formBuilder: FormBuilder,
    private service: ClientsService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute) {

      this.form = this.formBuilder.group({
        id: [0],
        nome: ['', Validators.required],
        email: ['', [Validators.required, Validators.email,
          Validators.minLength(5),
          Validators.maxLength(100)]],

        data: ['', Validators.required],
        cpf: ['', Validators.required],
        estado: ['', Validators.required]
    });

    this.estados = getEstados();
  }

  ngOnInit(): void {
    const client: Clients = this.route.snapshot.data['client'];
   this.form.setValue({
    id:client.id,
    nome:client.nome,
    email:client.email,
    data:client.data,
    cpf:client.cpf,
    estado:client.estado

   })
  }

  onSubmit() {
    if(this.form.valid){
      const formtData = this.form.value
      formtData.data = this.formatDate(formtData.data)
      console.log(formtData)
      this.service.save(formtData).subscribe
      (result => this.onSuccess(), () => this.onError());
    }

  }

  onCancel() {
    this.location.back();
  }

  private onSuccess(){
    this.snackBar.open('Cliente Cadastrado com sucesso', '', {duration:5000});
    this.onCancel();
  }

  private onError(){
    this.snackBar.open('Erro ao Cadastar Cliente', '', {duration:5000});
  }

  geterrorMessage(fieldName:string){
    const field = this.form.get(fieldName);

    if(field?.hasError('required')){
      return 'Campo Obrigatório';
    }
    if(field?.hasError('minlength')){
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho minimo precisa ser de ${requiredLength} caracteres.`;
    }
    if(field?.hasError('maxlength')){
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 100;
      return `Tamanho maximo excedido ${requiredLength} caracteres.`;
    }
    return 'Campo Invalido';
  }

  formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;   }
}
