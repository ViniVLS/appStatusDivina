import { AuthService } from "./auth.service";
import { HdpHttp } from "./hdp-http";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuard } from "./auth.guard";
import { PasswdComponent } from "./passwd/passwd.component";

import { PanelModule } from "primeng/panel";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import {} from "@angular/common/http";
import { config } from "rxjs";
import { environment } from "../../environments/environment";

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  imports: [
    CommonModule,
    PanelModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        //    whitelistedDomains:  [ 'app.divinaprovidencia.org.br' ],
        // whitelistedDomains: ['localhost:8080'],   //    //environment.tokenWhitLlistedDomains ,
        //   blacklistedRoutes: ['/\/oauth\/token/']    //environment.tokenBlackListedRoutes
      },
    }),
    FormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
  ],
  declarations: [PasswdComponent],
  providers: [AuthService, AuthGuard],
})
export class SegurancaModule {}
