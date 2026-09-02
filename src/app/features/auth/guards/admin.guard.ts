import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';
import { IAuthUser } from '../interfaces/IAuthUser';
import { UserRole } from '../../../core/enums/UserRole';

export const adminGuard: CanActivateFn = () => {
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
    }),
  );
};
