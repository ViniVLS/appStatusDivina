import { Component, OnInit, Renderer2, ElementRef } from "@angular/core";
import { PacienteStatusService } from "../paciente-status/paciente-status.service";
import { ActivatedRoute, Router } from "@angular/router";
import { LogoutService } from "../seguranca/logout.service";
import { CommonModule } from "@angular/common";
import { Location } from "@angular/common";
import { MessageService } from "primeng/api";
import { AuthService } from "../seguranca/auth.service";
import { PacienteDados } from "../model/paciente";

@Component({
  selector: 'app-paciente-shared',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paciente-shared.component.html',
  styleUrl: './paciente-shared.component.css'
})
export class PacienteSharedComponent implements OnInit {
  setor: string= "";

  dados: PacienteDados;
  linha: string[] = [];

  dadosInterval: ReturnType<typeof setInterval>;
  classificacao: string;
  exibirDadosPaciente: boolean = false; // Adicione essa variável
  codigo: string;

  status: string;
  pacienteNome: string;
  itensStatus: string[] = [];

  constructor(
    private pacienteStatusService: PacienteStatusService,
    private router: Router,
    private logoutService: LogoutService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private commonModule: CommonModule,
    private route: ActivatedRoute,
    private location: Location,
    private messageService: MessageService,
    public auth: AuthService,
  ) { }

  ngOnInit() {
    this.consultaStatus();
    this.dadosInterval = setInterval(() => {
      this.consultaStatus();
    }, 60000);

    this.codigo = this.route.snapshot.params["codigo"];
    //console.log('URL: ', this.codigo);

    if (this.codigo) {
      //console.log('URL2: ', this.codigo);
    }
  }

  consultaStatus(): void {
    console.log('Dados antes dos metodos: ',this.dados);
    this.pacienteStatusService.consultaStatus().then((dados) => {
      if (dados) {
        if(dados.setor){
          this.setor = dados.setor;
        } 
        this.dados = dados;
       console.log("Dados da ConsultaStatus: ",dados)
        this.classificacao = dados.classificacao; //Não retirar porque é das cores de classificação
        this.pacienteNome = this.dados.paciente; // Não retirar porque é para API Whatsapp
        this.pacienteStatusService.consultaLinha(dados.atendimento).then((linha) => {
          console.log(dados.atendimento);
          if (linha) {
            this.linha = linha;
            console.log('Timeline: ',linha);
            for (const item of linha) {
              //Apartir daqui formata data mas só aparece se ativar no ngfor do html que está comentado
              item.dt_atualizacao = this.formatarData(item.dt_atualizacao);
              //console.log(item.dt_atualizacao)
            }
          } else {
            console.error("Dados não encontrados");
          }
        });
      } else {
        console.error("Dados não encontrados");
      }
    });
  }

  formatarData(data: string): string {
    //Formata a data do item dt_atualizacao do objeto LINHA
    const dataAtualizacao = new Date(data);
    const dia = dataAtualizacao.getDate().toString().padStart(2, "0");
    const mes = (dataAtualizacao.getMonth() + 1).toString().padStart(2, "0");
    const ano = dataAtualizacao.getFullYear();
    const horas = dataAtualizacao.getHours().toString().padStart(2, "0");
    const minutos = dataAtualizacao.getMinutes().toString().padStart(2, "0");
    const segundos = dataAtualizacao.getSeconds().toString().padStart(2, "0");
    return `${horas}:${minutos}:${segundos} do dia ${dia}/${mes}/${ano}`;
  }

  sair() {
    this.logoutService.logout().subscribe(
      () => {
        this.auth.limparAccessToken();   
        this.messageService.add({
          severity: 'info',
          summary: '',
          detail: 'Saiu com sucesso!',
        });
        this.router.navigate(['/login']);
      },
      (erro) => {
        // Tratamento de erro caso o logout falhe
        //console.error('Erro no logout mas retorna ao login:', erro);
        this.messageService.add({
          severity: 'info',
          summary: '',
          detail: 'Saiu com sucesso!',
        });
        this.router.navigate(['/login']);
      }
    );
  }
    

  compartilharViaWhatsApp() {
    const codigo = this.codigo;
    const paciente = this.pacienteNome; //"Paciente Teste"
    const urlCompleta = `https://app.divinaprovidencia.org.br/apppac/#/login/${codigo}`;
    const textoCompartilhamento = `Confira as informações do(a) paciente ${paciente} em: ${urlCompleta}`;
    const linkWhatsApp = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      textoCompartilhamento
    )}`;
    window.open(linkWhatsApp); // Abre o link no navegador
  }
  
}
