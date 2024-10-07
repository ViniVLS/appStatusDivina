import { AuthService } from "./../../seguranca/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Component, OnInit, HostListener } from "@angular/core";
import { MessageService } from "primeng/api";


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  codigo: string;
  codigoUrl: string;


  constructor(
    private router: Router,
    private auth: AuthService,
    private messageService: MessageService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {

    this.codigoUrl = this.route.snapshot.params["codigoUrl"];
    //console.log('URL: ', this.codigoUrl);


    if (this.codigoUrl) {
      this.loginUrl()
    }
  }

  
    login(form?: NgForm) {
      this.codigo = form.value.codigo; 
      let codigo = this.codigo;  
      if (this.codigoUrl){
        codigo = this.codigoUrl
      }  
      //console.log(codigo);  
      this.auth
        .login(codigo, codigo)
        .then(() => {
          this.router.navigate(["/statuspaciente", codigo]);
        })
        .catch((erro) => {
          this.messageService.add({ severity: "error", detail: erro });
        });
    }


    loginUrl() {    
      let codigoUrl = this.codigoUrl;    
      //console.log(codigoUrl);  
      this.auth
        .login(codigoUrl, codigoUrl)
        .then(() => {
          this.router.navigate(["/statuspaciente", codigoUrl]);
        })
        .catch((erro) => {
          this.messageService.add({ severity: "error", detail: erro });
        });
    }
  

  

}

