import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessage } from 'angular-flash-message'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessage,
  ) { }

  ngOnInit() {
  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessage.warning('You are now logged out, goodbye.', {
      timeout: 5000
    });
    this.router.navigate(['/']);
    return false;
  }
}
