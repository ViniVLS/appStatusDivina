import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';


import { Observable , from as  observableFromPromise } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class HdpHttp extends HttpClient {

  constructor(
    private auth: AuthService,
    private httpHandler: HttpHandler

  ) {
    super(httpHandler);
  }

  public delete<T>(url: string, options?: any): Observable<T> {
    return this.fazerRequisicao(() => super.delete<T>(url, options));
  }

  public patch<T>(url: string, body: any, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.patch<T>(url, options));
  }

  public head<T>(url: string, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.head<T>(url, options));
  }

  public options<T>(url: string, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.options<T>(url, options));
  }

  public get<T>(url: string, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.get<T>(url, options));
  }

  public post<T>(url: string, body: any, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.post<T>(url, body, options));
  }

  public put<T>(url: string, body: any, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.put<T>(url, body, options));
  }

  private fazerRequisicao<T>(fn: Function): Observable<T> {
    if (this.auth.isAcessTokenInvalido()) {
      console.log('Requisição HTTP com  token inválido. Obtendo novo token...');

      const chamadaNovoAccessToken = this.auth.obterNovoAccessToken()
        .then(() => {
          return fn().toPromise();
        });
      return observableFromPromise(chamadaNovoAccessToken);
    } else {
      return fn();
    }
  }

}
