import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import {InputTextModule} from 'primeng/inputtext';


import { SidebarModule } from 'primeng/sidebar';


import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { HdpHttp } from './../seguranca/hdp-http';

import { JwtHelperService } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
   CommonModule,
    RouterModule,
    InputTextModule,
    SidebarModule,
    OverlayPanelModule,
    DialogModule,
    FormsModule,
    ProgressSpinnerModule

  ],
   exports: [
     ProgressSpinnerModule
  ],
  providers: [
    JwtHelperService,
    HdpHttp
  ]
})
export class CoreModule { }
