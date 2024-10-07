import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class CepService {
  constructor(private http: HttpClient) {}

  consultar(): Promise<any> {
    return this.http.get("https://viacep.com.br/ws/91215089/json").toPromise();
  }
}
