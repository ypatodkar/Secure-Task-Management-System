import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RoleName } from '@secure-task-manager/data';
import { map, take } from 'rxjs/operators';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser$.pipe(
    take(1),
    map(user => {
      const isAdmin = user?.roles.some(role => role.name === RoleName.ADMIN) ?? false;
      if (isAdmin) {
        return true;
      }
      return router.parseUrl('/tasks'); // Redirect non-admins
    })
  );
};
