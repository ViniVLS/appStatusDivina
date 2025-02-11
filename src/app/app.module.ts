import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule, SwPush, SwUpdate } from '@angular/service-worker';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
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
import { ReactiveFormsModule } from '@angular/forms';




export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({ declarations: [
        AppComponent,
        LoginComponent,
        NavbarComponent,
        PacienteStatusComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        FormsModule,
        CoreModule,
        SegurancaModule,
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
        EditorModule,
        SelectButtonModule,
        TooltipModule,
        CheckboxModule,
        ProgressSpinnerModule,
        CommonModule,
        ReactiveFormsModule,
    
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
        }),
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
            },
        }),
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: !isDevMode(),
          // Register the ServiceWorker as soon as the application is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        })], providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: JwtHttpInterceptor, multi: true },
        CepService,
        AuthService,
        JwtHelperService,
        PasswdService,
        LogoutService,
        MessageService,
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule {
  VAPID_PUBLIC_KEY = 'BNmSUbe4i_ac86Z8BpXsgZbCIBPODKrAxaEFF4NzHVOg2yFbSzYZAsWibf9ckBXT_69VkOi2BvWNcQnjz7VzRzU';

  constructor(private pushSw: SwPush, private update: SwUpdate) {
    this.checkForUpdates();
  }

  checkForUpdates() {
    if (this.update.isEnabled) {
      this.update.checkForUpdate().then(isUpdateAvailable => {
        if (isUpdateAvailable) {
          console.log("Service Worker: Nova versão disponível");
       
          this.update.activateUpdate().then(() => document.location.reload());
        }
      }).catch(err => {
        console.error("Erro ao verificar atualizações: ", err);
      });
    }
  }

  SubscribeToPush() {
    this.pushSw
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })
      .then((pushSubscription) => {
        console.log(JSON.stringify(pushSubscription));
      })
      .catch((err) => console.log('Ocorreu um erro:' + err));
  }
}
