import { PacienteService } from '../../paciente.service';
import { AuthService } from './../../seguranca/auth.service';
import { Router } from '@angular/router';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { LogoutService } from '../../seguranca/logout.service';
import { isNull } from 'util';
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  exibindoMenu = false;
  risco = false;
  grupo = true;


  constructor(private elementRef: ElementRef ,
    private router: Router,
    public auth: AuthService,
    private pacienteService: PacienteService,
    private logoutService: LogoutService,
    private messageService: MessageService,
   ) { }

  ngOnInit() {
    this.temGrupo();

     }

 criarTK() {
   this.auth.obterNovoAccessToken();
 }


  @HostListener('document:click', ['$event'])
  public aoClicar(event) {
    const elementoClicado = event.target;
    const estaDentro = this.elementoClicadoEstaDentroDoMenu(elementoClicado, this.elementRef);
           if (!estaDentro) {
          this.exibindoMenu = false;
        }
  }

  private elementoClicadoEstaDentroDoMenu(elementoClicado: any, elementRef: ElementRef) {
    while (elementoClicado) {
      if (elementoClicado === elementRef.nativeElement) {
        return true;
      }

      elementoClicado = elementoClicado.parentNode;
    }

  }

  teste() {

    this.router.navigate(['/agenda']);
  }
  teste2() {

    this.router.navigate(['/paciente']);
  }
  teste3() {

    this.router.navigate(['/grupopaciente']);
  }
  teste4() {

    this.router.navigate(['/repasse']);
  }
  teste5() {

    this.router.navigate(['/faleconosco']);
  }
  teste6() {

    this.router.navigate(['/crm']);
  }

  teste7() {

    this.router.navigate(['/coremanejo']);
  }

  teste8() {

    this.router.navigate(['/aval']);
  }

  prot() {

    this.router.navigate(['/pacprot']);
  }
  ocupacao() {

    this.router.navigate(['/ocupacao']);
  }
  ocpa() {

    this.router.navigate(['/ocpa']);
  }
  ocpahe() {

    this.router.navigate(['/pahe']);
  }
  agendac(){
    this.router.navigate(['/agendac']);
  }
  flash() {

    this.router.navigate(['/flash']);
  }
  cclinico() {

    this.router.navigate(['/cclinico']);
  }
  cdi() {

    this.router.navigate(['/cdi']);
  }
  cdiex() {

    this.router.navigate(['/cdi']);
  }

  trisco() {
        return this.risco;
  }
  temPermissao(permissao: string){
    return this.auth.temPermissao(permissao);
   }
   temGrupo(){

    if(typeof this.auth.jwtPayload.grupo === 'undefined'){
      console.log(typeof this.auth.jwtPayload.grupo);
      this.grupo = false;

    } else {
     // this.temRisco();
    }

   }

   temRisco(){
     this.pacienteService.consultarGrupoRisco()
     .then(resultado => {
       if( resultado.ds_risco !== '0'){
         this.risco = true;
       }
     });
 }
 sair() {
  this.logoutService.logout().subscribe(
    () => {
      this.auth.limparAccessToken();   
      this.messageService.add({
        severity: 'info',
        summary: 'Logout',
        detail: 'Saiu com sucesso!',
      });
      this.router.navigate(['/login']);
    },
    (erro) => {
      // Tratamento de erro caso o logout falhe
      console.error('Erro no logout:', erro);
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Falha ao sair.',
      });
      this.router.navigate(['/login']);
    }
  );
}



}
