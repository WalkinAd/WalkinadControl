import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const expectedRole = route.data['expectedRole']; // Accediendo a expectedRole usando notación de corchetes
    const hasRole = await this.authService.hasRole(expectedRole);
    
    if (!hasRole) {
      this.router.navigate(['login']); // Redirigir al login si no tiene el rol
      return false;
    }
    return true;
  }
}
