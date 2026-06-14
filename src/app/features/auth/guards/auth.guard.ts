import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  
  return authService.auth$.pipe(
    take(1),
    map((user) => {
      if (user && localStorage.getItem('accessToken')) {
        return true;
      } else {
        return router.createUrlTree(['/login']);
      }
    })
  )
};
