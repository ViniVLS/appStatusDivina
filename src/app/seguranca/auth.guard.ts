import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard  {
  
  
  /*
  isAuthenticated:boolean = false;
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean { 
    if (next.data.roles && !this.auth.acesso(next.data.roles)) {
      // Navegar para uma página específica quando não houver autorização
      this.router.navigate(["/cccc"]);
      return false;
    } 
    return true;
  }*/
  
  isAuthenticated:boolean = false;
  constructor(private auth: AuthService, private router: Router) {}
  //ORIGINAL
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let isAuthenticated = true;
    if (next.data.roles && !this.auth.acesso(next.data.roles) && !isAuthenticated) {
      // navegar para sem autorização this.router.navigate(['/cccc'])
      isAuthenticated = this.isAuthenticated;
      this.router.navigate(["/cccc"]);
      return false;
        }
    return true;
  }
}
