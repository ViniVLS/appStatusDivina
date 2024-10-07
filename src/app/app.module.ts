import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule, SwPush, SwUpdate } from '@angular/service-worker';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { CaptchaModule } from 'primeng/Captcha';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/Table';
import { DialogModule } from 'primeng/Dialog';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputText';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/ProgressSpinner';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TooltipModule } from 'primeng/tooltip';
import { DataViewModule } from 'primeng/dataview';
import { ToastModule } from 'primeng/toast';
import { MultiSelectModule } from 'primeng/multiselect';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CepService } from './core/cep.service';
import { CoreModule } from './core/core.module';
import { NavbarComponent } from './core/navbar/navbar.component';
import { LoginComponent } from './login/login/login.component';
import { PacienteStatusComponent } from './paciente-status/paciente-status/paciente-status.component';
import { AuthService } from './seguranca/auth.service';
import { JwtHttpInterceptor } from './seguranca/jwt-http-interceptor';
import { LogoutService } from './seguranca/logout.service';
import { PasswdService } from './seguranca/passwd.service';
import { SegurancaModule } from './seguranca/seguranca.module';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    PacienteStatusComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CoreModule,
    SegurancaModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MultiSelectModule,
    ToastModule,
    DataViewModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    AppRoutingModule,
    PanelModule,
    DialogModule,
    CurrencyMaskModule,
    CaptchaModule,
    EditorModule,
    SelectButtonModule,
    TooltipModule,
    CheckboxModule,
    DataViewModule,
    SelectButtonModule,
    FormsModule,
    ProgressSpinnerModule,
    TableModule,
    TooltipModule,
    CommonModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        
      },
    }),
  ],
  // tslint:disable-next-line:max-line-length

  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: JwtHttpInterceptor, multi: true },
    CepService,
    AuthService,
    JwtHelperService,
    PasswdService,
    LogoutService,
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  VAPID_PUBLIC_KEY =
    "BNmSUbe4i_ac86Z8BpXsgZbCIBPODKrAxaEFF4NzHVOg2yFbSzYZAsWibf9ckBXT_69VkOi2BvWNcQnjz7VzRzU";

  constructor(private pushSw: SwPush, private update: SwUpdate) {
    update.available.subscribe((update) => {
      console.log("Nova versão disponível");
    });

    this.SubscribeToPush();
    pushSw.messages.subscribe((msg) => {
      console.log(JSON.stringify(msg));
    });
  }

  SubscribeToPush() {
    this.pushSw
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })
      .then((pushSubscription) => {
        console.log(JSON.stringify(pushSubscription));
      })

      .catch(err=> console.log("Ocorreu um erro:" + err)
      );
  }
}
