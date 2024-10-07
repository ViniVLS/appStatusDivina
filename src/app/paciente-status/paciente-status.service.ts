import { Injectable } from "@angular/core";
import { AuthService } from "./../seguranca/auth.service";
import { HdpHttp } from "./../seguranca/hdp-http";

@Injectable({
  providedIn: "root",
})
export class PacienteStatusService {

  constructor(private http: HdpHttp, private auth: AuthService) { }


  //ORIGINAL HDP EMERGÊNCIA
    consultaStatus(): Promise<any> {
        const teste = this.auth.jwtPayload.cod;
      //console.log("Retorno consulta de status para a constante => teste: ", teste);
     return this.http
           .get(`https://app.divinaprovidencia.org.br/hdp-api-pacpa/pacpa/${teste}`)
         //.get(`http//:192.168.0.9:8080/pacpa/${teste}`)
         //.get(`http://localhost:8080/rpaciente/?x=${teste}&atend=${atend}`)
         //.get(`http://192.168.18.96:8080/pacpa/${teste}`)
        .toPromise()
        .then((dados) => {
          //console.log("Dados: ", dados);
          return dados;
        })
        .catch((error) => {
          console.error("Erro ao recuperar dados da API:", error); 
          throw error;
        });
    };



    consultaLinha(atendimento: string): Promise<any> {
      //console.log("Retorno consulta de dados.atendimento para a constante => atendimento: ", atendimento);
      return this.http
        .get(`https://app.divinaprovidencia.org.br/hdp-api-pacpa/pacpa/linha/${atendimento}`)
        .toPromise()
        .then((linha) => {
          //console.log("Timeline Service: ", linha);
          return linha;
        })
        .catch((error) => {
          console.error("Erro ao recuperar dados da API:", error); 
          throw error;
        });
    }
    

    //SETOR CO
    consultaStatusCo(): Promise<any> {
      const teste = this.auth.jwtPayload.cod;
    //console.log("Retorno consulta de status para a constante => teste: ", teste);
   return this.http
         .get(`https://app.divinaprovidencia.org.br/hdp-api-pacpa/pacco/${teste}`)
       //.get(`http//:192.168.0.9:8080/pacpa/${teste}`)
       //.get(`http://localhost:8080/rpaciente/?x=${teste}&atend=${atend}`)
       //.get(`http://192.168.18.96:8080/pacpa/${teste}`)
      .toPromise()
      .then((dados) => {
        //console.log("Dados: ", dados);
        return dados;
      })
      .catch((error) => {
        console.error("Erro ao recuperar dados da API:", error); 
        throw error;
      });
  };

  

}





