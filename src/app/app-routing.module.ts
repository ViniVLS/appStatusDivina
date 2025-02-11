import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { LoginComponent } from "./login/login/login.component";
import { PacienteStatusComponent } from "./paciente-status/paciente-status/paciente-status.component";

import { AuthGuard } from "./seguranca/auth.guard";
import { PasswdComponent } from "./seguranca/passwd/passwd.component";
import { PacienteSharedComponent } from "./paciente-shared/paciente-shared.component";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },

  {
    path: "login", 
    component: LoginComponent,
    canActivate: [AuthGuard],
 },

  {
    path: "login/:codigoUrl", 
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ROLE_GERAL"] },   
    
  }, 

  {
    path: "passwd",
    component: PasswdComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ROLE_GERAL"] },
  },

  {
    path: "statuspaciente/:codigo",
    component: PacienteStatusComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ROLE_PACIENTE"] },
  },

  { path: "pacienteshared",
    component: PacienteSharedComponent,
    canActivate: [AuthGuard],    
  },

  { path: "pacienteshared/:codigo",
    component: PacienteSharedComponent,
    canActivate: [AuthGuard], 
    data: { roles: ["ROLE_PACIENTE"] },   
  },

  { path: "**", redirectTo: "login" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
