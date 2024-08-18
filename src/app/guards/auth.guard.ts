import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/userAuth/user-auth.service';
import { inject } from '@angular/core';
import { NotificationService } from '../services/notificatin-services.service';


export const authGuard: CanActivateFn = (route, state) => {

  const authServ = inject(AuthService)
  const notificationServ = inject(NotificationService);


  if (authServ.isUserLogedIn) {
    return true;
  }
  else {
    notificationServ.showMessage("plz Login First");
    return false;
  }
};
