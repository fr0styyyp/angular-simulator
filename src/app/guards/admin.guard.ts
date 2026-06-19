import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../features/auth/services/auth.service';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';
import { IAuthUser } from '../features/auth/interfaces/IAuthUser';

export const adminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  
  return authService.authUser$.pipe(
    take(1),
    map((user: IAuthUser | null) => {
      if (user?.role === 'admin') {
        return true;
      } else {
        return router.createUrlTree(['/']);
      }
    })
  );
};
