import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/userAuth/user-auth.service';
import { inject } from '@angular/core';
import { NotificationService } from '../../services/notificatin-services.service';

export const hostGuard: CanActivateFn = (route, state) => {
  const authServ = inject(AuthService);
  const notificationServ = inject(NotificationService);

  if (authServ.isUserLogedIn) {
    const userRole = authServ.getUserRole();
    if (userRole === 'Host') {
      return true;
    } else {
      notificationServ.showMessage("Your Role Must Be HOST");
      return false;
    }
  } else {
    notificationServ.showMessage("Please Login First As Host");
    return false;
  }
};
