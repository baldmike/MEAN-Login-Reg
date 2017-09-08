import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';
import { FlashMessage } from 'angular-flash-message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  email: String;
  password: String;

  constructor( 
    private validateService: ValidateService,
    private authService: AuthService, 
    private flashMessage: FlashMessage,
    private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password
    }

    // FILL IN FIELDS
    if(!this.validateService.validateRegister(user)) {
      this.flashMessage.danger('Please fill in all fields', {timeout: 4000 });
      return false;
    }

    if(!this.validateService.validateEmail(user.email)) {
      this.flashMessage.danger('Please enter a valid email', {timeout: 4000 });
      return false;
    }

    // REGISTER USER
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.success('REGISTRATION: SUCCESSFUL.', {timeout: 4000 });
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.danger('Something went horribly wrong', {timeout: 4000 });
        this.router.navigate(['/register']);
      }
    })
  }

}
