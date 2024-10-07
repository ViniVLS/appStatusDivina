import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HdpHttp } from './hdp-http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LogoutService {

  constructor(
    private http: HdpHttp,
    private auth: AuthService
  ) {}

  logout(): Observable<void> {
    return this.http.delete<void>('https://app.divinaprovidencia.org.br/hdp-api/tokens/revoke', { withCredentials: true })
      .pipe(
        tap(() => {
          this.auth.limparAccessToken();
          localStorage.removeItem("token");
          this.limparCache();
          console.log("Logout service Limpou");
        }),
        catchError((error) => {
          console.error('Erro ao realizar logout:', error);
          return throwError(error); // Propaga o erro para o consumidor
        })
      );
  }

  limparCache() {
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => {
          caches.delete(cacheName);
        });
      });
    }
    document.cookie.split(";").forEach((c) => {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    location.reload();
  }
}
