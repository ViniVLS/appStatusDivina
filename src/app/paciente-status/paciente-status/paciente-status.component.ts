
import { PacienteDados } from "./../../model/paciente";
import { Component, OnInit, Renderer2, ElementRef } from "@angular/core";
import { PacienteStatusService } from "../paciente-status.service";
import { ActivatedRoute, Router } from "@angular/router";
import { LogoutService } from "../../seguranca/logout.service";
import { CommonModule } from "@angular/common";
import { Location } from "@angular/common";
import { MessageService } from "primeng/api";
import { AuthService } from "./../../seguranca/auth.service";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Injectable } from "@angular/core";
import { Paciente } from "./../../model/paciente";

//import { LoginService } from "src/app/login/login.service";

@Component({
  selector: "app-paciente-status",
  templateUrl: "./paciente-status.component.html",
  styleUrls: ["./paciente-status.component.css"],
})
@Injectable({
  providedIn: "root",
})

 export class PacienteStatusComponent implements OnInit {
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

  codigoLancamento: any;
  label = [];
  tipo = "1";
  exames = [];
  pac = new Paciente();
  groupedExames = [] as any[]; // Inicializar como array vazio para evitar erros
  filteredExames = [];//Para o filtro global em 'Filtrar'

  nodes!: any[];
  formGroup!: FormGroup;

  url = "";
  host = "pacs.divinaprovidencia.org.br";
  endpoint = "/portal/?user_name=vuemotion_divinap&password=NCCKIDHINNCMDHFMCHJENCIFKFFCALGP&password_encrypted=true&accession_number";
  secret = "2ed9a03e117e7c00289b8f4985b33da01fe28419";
  playload: string;

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
  ) {
    this.label = [
      { label: "Exames de imagens", value: "1" },
      { label: "Exames laboratoriais  ", value: "2" },
    ];

   // this.pacienteStatusService.getFiles().then((files) => (this.nodes = files));
   }

  ngOnInit() {
    this.consultaStatus();
    this.dadosInterval = setInterval(() => {
      this.consultaStatus();
    }, 60000);

    this.codigo = this.route.snapshot.params["codigo"];
    console.log('URL: ', this.codigo);

    if (this.codigo) {
      console.log('URL2: ', this.codigo);
    }


    this.codigoLancamento = this.codigo.slice(0, -6);
    console.log(this.codigoLancamento);
    this.consultaExamesim(this.codigoLancamento); 

    this.formGroup = new FormGroup({
      selectedNodes: new FormControl()
  });



  }

  consultaStatus(): void {
    //console.log('Dados antes dos metodos: ',this.dados);
    this.pacienteStatusService.consultaStatus().then((dados) => {
      if (dados) {
        if(dados.setor){
          this.setor = dados.setor;
        } 
        this.dados = dados;
       // console.log("Dados da ConsultaStatus: ",dados)
        this.classificacao = dados.classificacao; //Não retirar porque é das cores de classificação
        this.pacienteNome = this.dados.paciente; // Não retirar porque é para API Whatsapp
        this.pacienteStatusService.consultaLinha(dados.atendimento).then((linha) => {
          if (linha) {
            this.linha = linha;
            //console.log('Timeline: ',linha);
            for (const item of linha) {
              //Apartir daqui formata data mas só aparece se ativar no ngfor do html que está comentado
              //console.log(item.dt_atualizacao)
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
    const urlCompleta = `https://app.divinaprovidencia.org.br/apppacxx/#/pacienteshared/${codigo}`;
    const textoCompartilhamento = `Confira as informações do(a) paciente ${paciente} em: ${urlCompleta}`;
    const linkWhatsApp = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      textoCompartilhamento
    )}`;
    window.open(linkWhatsApp); // Abre o link no navegador
  }


  consultaExamesim(codigoLancamento: string) {
    this.pacienteStatusService
      .consultarExamesIm(codigoLancamento)
      .then((dados) => {
        if (dados.length === 0) {
          this.messageService.add({ severity: "warn", detail: "Não há exames de imagem" });
          this.consultaExameslb(codigoLancamento); // Carrega diretamente os exames laboratoriais
        } else {
          this.exames = dados;
          this.pac = dados[0].paciente;
          this.filteredExames = [...this.exames]; // Inicializa a tabela filtrada com todos os dados
          this.groupExames();
         console.log("Dados Filtrados: ",this.filteredExames );
        }
      })
      .catch((erro) => {
        console.log(erro);
    });
  }

  consultaExameslb(codigoLancamento: string) {
    this.pacienteStatusService
      .consultarExamesLb(codigoLancamento)
      .then((dados) => {
        this.exames = dados;
        this.pac = dados[0].paciente;
        this.groupExames();
        console.log(this.exames );
      })
      .catch((erro) => {
        console.log(erro);
        this.messageService.add({ severity: "warn", detail: "Não há exames laboratoriais" });
      });
  }


  consultaLaudo(laudo: string) {
    if (this.tipo === "1") {
      this.pacienteStatusService.consultarLaudo(laudo).subscribe((laudo) => {
        const url = window.URL.createObjectURL(laudo);
        window.open(url);
        console.log(this.url );
      });
    } else {
      this.pacienteStatusService.consultarLaudoLB(laudo).subscribe((laudo) => {
        const url = window.URL.createObjectURL(laudo);
        window.open(url);
      });
    }
  }

  groupExames() {
    const map = new Map();
    for (const exame of this.exames) {
      const key = `${exame.dtExecucao}|${exame.nrPrescricao}|${exame.exame}`;
      if (!map.has(key)) {
        map.set(key, { ...exame, count: 1 });
      } else {
        map.get(key).count++;
      }
    }
    this.groupedExames = Array.from(map.values());
  }

  alteraFlash() {
    if (this.tipo === "1") {
      this.consultaExamesim(this.codigoLancamento);
    } else {
      this.consultaExameslb(this.codigoLancamento);
    }
  }

/*
  play(payloadx) {
    this.playload = "";
    this.playload += payloadx;
    payloadx = this.playload;

    this.url = this.host + this.endpoint;
    this.url += "=" + payloadx;

    const date = new Date();
    date.setDate(date.getDate() + 3);
    var timestamp = date.getTime();
    timestamp = Math.round(timestamp / 1000) + 86400;

    payloadx += timestamp;
    this.url += "&t=" + timestamp;
    const hash = CryptoJS.HmacSHA1(payloadx, this.secret);
    const hmac = hash.toString(CryptoJS.enc.Hex);
    this.url += "&h=" + hmac;
    this.url += "&r=1";

    const link = document.createElement("a");
    link.href = "http://" + this.url;
    const url = "http://" + this.url;
    window.open(url);
  }
  */
  

}
