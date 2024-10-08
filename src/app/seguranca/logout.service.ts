import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { HdpHttp } from "./hdp-http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { HttpHeaders } from "@angular/common/http";

@Injectable()
export class LogoutService {
  constructor(private http: HdpHttp, private auth: AuthService) { }

  logout(): Observable<void> {
    // Obtém o token de autenticação armazenado no localStorage
    const token = localStorage.getItem("token");

    // Verifica se o token existe antes de enviar a requisição
    if (!token) {
      console.error('Token de acesso não encontrado.');
      return throwError('Token não encontrado');
    }

    return this.http
      .delete<void>(
        "https://app.divinaprovidencia.org.br/hdp-api/tokens/revoke",
        {
          headers: new HttpHeaders({
            Authorization: `Bearer ${token}`, // Envia o token JWT no cabeçalho de autorização
          }),
          withCredentials: true, // Se você estiver lidando com cookies ou sessões
        }
      )
      .pipe(
        tap(() => {
          // Limpa o token de acesso e outros dados armazenados localmente
          this.auth.limparAccessToken();
          localStorage.removeItem("token");
          this.limparCache();
          console.log("Logout realizado com sucesso e token revogado.");
        }),
        catchError((error) => {
          // Exibe o erro no console para fins de depuração
          console.error("Erro ao realizar logout:", error);
          return throwError(error); // Propaga o erro para ser tratado em outro local, se necessário
        })
      );
  }

  limparCache() {
    if ("caches" in window) {
      caches.keys().then((cacheNames) => {
        cacheNames.forEach((cacheName) => {
          caches.delete(cacheName);
        });
      });
    }
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    
    // Certifique-se de que o reload é realmente necessário
    location.reload();
  }
}
