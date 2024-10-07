import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

import { AuthService } from "./auth.service";
import { HdpHttp } from "./hdp-http";

@Injectable()
export class PasswdService {
  constructor(
    private http: HdpHttp,
    // tslint:disable-next-line:no-shadowed-variable
    private auth: AuthService,
    private jwtHelper: JwtHelperService
  ) {}
  usuario: any;

  alterarUrl = "https://app.divinaprovidencia.org.br/hdp-api/usuarios/";
  // alterarUrl = 'https://200.180.131.54:8443/hdp-api/usuarios/';
  // alterarUrl = 'http://localhost:8080/usuarios/';

  alterar(senha: string): Promise<any> {
    const teste = this.auth.jwtPayload.cod;

    this.usuario = { codigo: teste, senha: btoa(senha) };
    return this.http.put(this.alterarUrl + teste, this.usuario).toPromise();
  }
}
