import { AuthService } from "./seguranca/auth.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

// import { HdpHttp } from '../seguranca/hdp-http';
import { HdpHttp } from "./seguranca/hdp-http";

@Injectable()
export class PacienteService {
  constructor(private http: HdpHttp, private auth: AuthService) {}

  consultar(): Promise<any> {
    const teste = this.auth.jwtPayload.cod;

    return (
      this.http
        .get("https://app.divinaprovidencia.org.br/hdp-api/paciente/" + teste)
        // return this.http.get('http://localhost:8080/paciente/' + teste)
        .toPromise()
    );
  }

  consultarGrupo(): Promise<any> {
    const teste = this.auth.jwtPayload.grupo;

    return (
      this.http
        .get(
          "https://app.divinaprovidencia.org.br/hdp-api/paciente/grupo/" + teste
        )

        // return this.http.get('http://localhost:8080/paciente/grupo/' + teste)
        .toPromise()
    );
  }

  consultaResumo(atend): Promise<any> {
    const teste = this.auth.jwtPayload.cod;
    return (
      this.http
        .get(
          `https://app.divinaprovidencia.org.br/hdp-api/rpaciente/?x=${teste}&atend=${atend}`
        )
        // return this.http.get(`http://localhost:8080/rpaciente/?x=${teste}&atend=${atend}`)

        .toPromise()
    );
  }

  consultarGrupoRisco(): Promise<any> {
    const teste = this.auth.jwtPayload.grupo;
    return (
      this.http
        .get(
          "https://app.divinaprovidencia.org.br/hdp-api/paciente/grupo/risco/" +
            teste
        )

        // return this.http.get('http://localhost:8080/paciente/grupo/risco/' + teste)
        .toPromise()
    );
  }

  consultarSetor(setor: string): Promise<any> {
    return (
      this.http
        .get(
          "https://app.divinaprovidencia.org.br/hdp-api/paciente/setor/" + setor
        )

        //    return this.http.get('http://localhost:8080/paciente/setor/' + setor)
        .toPromise()
    );
  }

  consultarCoremanejo(): Promise<any> {
    const teste = this.auth.jwtPayload.cod;

    return (
      this.http
        .get(
          "https://app.divinaprovidencia.org.br/hdp-api/paciente/coremanejo/" +
            teste
        )
        // return this.http.get('http://localhost:8080/paciente/coremanejo/' + teste)
        .toPromise()
    );
  }

  consultarSolicitacoes(): Promise<any> {
    const teste = this.auth.jwtPayload.cod;

    return (
      this.http
        .get("https://app.divinaprovidencia.org.br/hdp-api/aval/" + teste)
        // return this.http.get('http://localhost:8080/aval/' + teste)
        .toPromise()
    );
  }
  consultaTxtAval(x: string): Promise<any> {
    return (
      this.http
        .get("https://app.divinaprovidencia.org.br/hdp-api/aval/sol/" + x)
        // return this.http.get('http://localhost:8080/aval/sol/'+x)
        .toPromise()
    );
  }

  consultarPacProt(): Promise<any> {
    const teste = this.auth.jwtPayload.cod;

    return (
      this.http
        .get("https://app.divinaprovidencia.org.br/hdp-api/pacprot")
        //return this.http.get('http://localhost:8080/pacprot/')
        .toPromise()
    );
  }
}
