import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';
import { IAuthUser } from '../interfaces/IAuthUser';
import { LocalStorageService } from '../../../local-storage.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const localStorageService: LocalStorageService = inject(LocalStorageService);
  
  return authService.authUser$.pipe(
    take(1),
    map((user: IAuthUser | null) => {
      if (user) {
        return true;
      } else {
        return router.createUrlTree(['/login']);
      }
    })
  )
};
