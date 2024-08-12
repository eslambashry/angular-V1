import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/userAuth/user-auth.service';
import { inject } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';

export const authGuard: CanActivateFn = (route, state) => {

  const authServ = inject(AuthService)
  // const snackBar = inject(MatSnackBar);

  if (authServ.isUserLogedIn) {
    return true;
  }
  else {
    alert("plz Login First")
    // snackBar.open('Please log in first', 'Close', {
    //   duration: 3000,
    // });
    return false;
  }
};
