import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/userAuth/user-auth.service';
import { inject } from '@angular/core';

export const hostGuard: CanActivateFn = (route, state) => {
  const authServ = inject(AuthService);

  if (authServ.isUserLogedIn) {
    const userRole = authServ.getUserRole();
    if (userRole === 'Host') {
      return true;
    } else {
      alert("Your Role Must Be HOST");
      return false;
    }
  } else {
    alert("Please Login First As Host");
    return false;
  }
};
