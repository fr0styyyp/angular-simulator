import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';
import { IAuthUser } from '../interfaces/IAuthUser';

export const authGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.authUser$.pipe(
    take(1),
    map((user: IAuthUser | null) => {
      if (user) {
        return true;
      } else {
        return router.createUrlTree(['/login']);
      }
    }),
  );
};
