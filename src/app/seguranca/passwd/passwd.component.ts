import { PasswdService } from './../passwd.service';

import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-passwd',
  templateUrl: './passwd.component.html',
  styleUrls: ['./passwd.component.css']
})
export class PasswdComponent implements OnInit {


  constructor(    private messageService: MessageService,
  private passwd: PasswdService) { }

  ngOnInit() {
  }

  alteraSenha(senha: string, conf: string){
    console.log(senha);
    console.log(btoa(senha));
    if (senha !== conf) {
      this.messageService.add({ severity: 'info', detail: 'As senhas são diferentes' });
     
   }


      this.passwd.alterar(senha)
        .then(resultado => {
          this.messageService.add({ severity: 'success', detail: 'Senha alterada com sucesso!' });
               

      }).catch(erro => this.messageService.add({ severity: 'error', detail: 'Ocorreu algum erro no servidor!' }))
      
      }

    }




