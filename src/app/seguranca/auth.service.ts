import { JwtHelperService } from "@auth0/angular-jwt";
import { Injectable, ɵConsole } from "@angular/core";

import { Router, ActivatedRoute } from "@angular/router";

import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class AuthService {
  user: { cpf: string; senha: string; email: string };
  //oauthTokenUrl = "http://192.168.18.96:8080/oauth/token";
  oauthTokenUrl =
    "https://app.divinaprovidencia.org.br/hdp-api-pacpa/oauth/token";

  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {
    this.carregarToken();
  }

  login(usuario: string, senha: string): Promise<void> {
    //console.log('Login - Usuário:', usuario, 'Senha:', senha);
    const headers = new HttpHeaders()
      .append("Content-Type", "application/x-www-form-urlencoded")
      .append("Authorization", "Basic cGFjcGE6QG5ndWxAcjBwYUMuMzA=");
     // console.log("Headers: ", headers);

    const body = `username=${usuario}&password=${senha}&grant_type=password`;
   // console.log('Body: ',body);

    return this.http
      .post<any>(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then((response) => {
        this.armazenarToken(response.access_token);
       // console.log("OauthTokenUrl: ", this.oauthTokenUrl);
      })
      .catch((response) => {
        if (response.status === 400) {
          if (response.error.error === "invalid_grant") {
            return Promise.reject("Código inválido!");            
          }
        }
        console.log("", response);
        return Promise.reject(response);
        
      });
  }


  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem("token", token);
  }

  private carregarToken() {
    const token = localStorage.getItem("token");
    if (token) {
      this.armazenarToken(token);
    }
  }

  temPermissao(permissao: string) {
    //console.log('Tem permissão no jwtPayLoad: ', this.jwtPayload)
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  acesso(roles) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        console.log('Têm permissão de acesso roles')
        return true;
      }
    }

    return false;
  }

  obterNovoAccessToken(): Promise<void> {
    const headers = new HttpHeaders()
      .append("Content-Type", "application/x-www-form-urlencoded")
      .append("Authorization", "Basic YW5ndWxhcjpAbmd1bEByMA==");

    const body = "grant_type=refresh_token";

    return this.http
      .post<any>(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then((response) => {
        this.armazenarToken(response.access_token);
        return Promise.resolve(null);
      })
      .catch((response) => {
        if (this.router.url.indexOf("/appaplic") < 0) {
          this.router.navigate(["/login"]);
        }

        return Promise.resolve(null);
      });
  }


  
  isAcessTokenInvalido() {
    const token = localStorage.getItem("token");
    if (this.router.url.indexOf("/appaplic") < 0) {
      return !token || this.jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }
  }
  

  solicitacaoSenha(cpf: string, email: string): Promise<any> {
    this.user = { cpf: cpf, senha: "10", email: email };

    return this.http
      .put("https://app.divinaprovidencia.org.br/hdp-api/senha/1515", this.user)
      .toPromise();
    //  return this.http.put('http://localhost:8080/senha/1515', this.user)
    // .toPromise();
  }
  consultaNotificacao(seq: string): Promise<any> {
    return this.http
      .get("https://app.divinaprovidencia.org.br/hdp-api/appaplic/" + seq)
      .toPromise();
  }

  limparAccessToken(): any {
    localStorage.removeItem("token");
    this.jwtPayload = null;
  }
}
