import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../features/auth/services/auth.service';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';
import { IAuthUser } from '../features/auth/interfaces/IAuthUser';
import { UserRole } from '../../enums/UserRole';

export const adminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  
  return authService.authUser$.pipe(
    take(1),
    map((user: IAuthUser | null) => {
      if (user?.role === UserRole.ADMIN) {
        return true;
      } else {
        return router.createUrlTree(['/']);
      }
    })
  );
};
