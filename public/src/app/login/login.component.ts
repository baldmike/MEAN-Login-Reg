import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessage } from 'angular-flash-message'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: String;
  password: String;

  constructor( 
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessage,
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      email: this.email,
      password: this.password,
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.success('You are now logged in', {timeout: 5000});
        this.router.navigate(['dashboard'])
      } else {
        this.flashMessage.warning(data.msg, {timeout: 5000});
        this.router.navigate(['login'])
      }
    });
  }

}
