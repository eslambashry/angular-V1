import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/userAuth/user-auth.service';
import { CommonModule, NgClass } from '@angular/common';
import { SharedAlertComponent } from '../shared-alert/shared-alert.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule here
import { FavoriteService } from '../../services/favorite.service';



@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive,ReactiveFormsModule,CommonModule,NgClass,SharedAlertComponent,FormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  // showSuccessAlert = false;
  isLogged!: boolean

  showRegisterSuccessAlert: boolean = false;
  showErrorAlert: boolean = false;
  registerAlertMessage: string = '';
  alertMessage: string = '';


  showLoginSuccessAlert: boolean = false;
  showLoginErrorAlert: boolean = false;
  loginAlertMessage: string = '';
  showRegisterErrorAlert: any;

  favoriteCount: number = 0;



  constructor(private fb: FormBuilder,private authService: AuthService,private favoriteService: FavoriteService) { }


  ngOnInit(): void {
    this.favoriteService.favoriteCount$.subscribe(count => {
      this.favoriteCount = count;})

    this.loginForm = this.fb.group({
      email: ['', 
        [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5),
        Validators.email,
        Validators.pattern(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`)
      ]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(15),Validators.minLength(5)]],
      email: ['', 
    [ Validators.required, 
      Validators.email,
      Validators.maxLength(50),
      Validators.minLength(5),
      Validators.pattern(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`)]],
      password: ['', [Validators.required,Validators.minLength(8)]],
      phone: ['',[Validators.required]], 
      role: ['Guest',[Validators.required]]
    });

    this.authService.getUserState().subscribe((state)=>{
      this.isLogged = state
    })

  }
  Logout(){
    this.authService.removeToken();
  }
  onRegister(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      console.log(formData)
    
      this.authService.register(formData).subscribe({
        next: (response) => {
          this.registerAlertMessage = 'Registration successful!';
          this.showRegisterSuccessAlert = true;
          this.showRegisterErrorAlert = false;

          // this.showSuccessAlert = true;
          console.log('Registration successful', response);
          this.registerForm.reset();
          setTimeout(() => {
            this.showRegisterSuccessAlert = false;
          }, 3000);
  
        },
        error: (error) => {
          this.registerAlertMessage = 'Error during registration. Please try again.';
          this.showRegisterErrorAlert = true;
          this.showRegisterSuccessAlert = false;
          console.error('Error during registration', error);
          setTimeout(() => {
            this.showRegisterErrorAlert = false;
          }, 3000);
        }
      });
    } else {
      this.registerAlertMessage = 'Please Enter Your Data';
          this.showRegisterErrorAlert = true;
      console.error('Form is invalid');
      console.log(this.registerForm); // Log the form status and controls
    }
  }
  
  onLogin(): void {
    if (this.loginForm.valid) {
      // console.log(this.loginForm.valid);  
      this.authService.login(this.loginForm.value).subscribe(response => {
        this.authService.saveToken(response.token);
        this.loginAlertMessage = 'Login successful!';
        this.showLoginSuccessAlert = true;
        this.showLoginErrorAlert = false;
        this.loginForm.reset();
    
        setTimeout(() => {
          this.showLoginSuccessAlert = false;
        }, 3000);
        console.log('Login successful', response);
      }, error => {
        this.loginAlertMessage = 'Email or password is not correct';
          this.showLoginErrorAlert = true;
        console.error('Error during login', error);
        setTimeout(() => {
          this.showLoginErrorAlert = false;
        }, 3000);

      });
    }
    else{this.loginAlertMessage = 'Please Enter Your Data';
          this.showLoginErrorAlert = true;}
  }
  onLogout(): void {
    this.authService.removeToken();
    // Optionally, you might want to navigate to a login or home page after logout
    // this.router.navigate(['/login']); // or wherever you want to redirect
    alert("Loged out")
  }

  

}
