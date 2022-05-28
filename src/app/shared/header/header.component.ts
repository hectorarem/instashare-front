import { AuthenticationService } from './../../auth/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userLogged: any;
  scrolled: boolean = false;
  isFront: boolean = false;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    if (this.router.url === '/') {
      this.isFront = true;
    } else {
      this.isFront = false;
    }

    this.userLogged = this.authenticationService.getUser();
  }

  Logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('id');
    this.userLogged = null;
    this.router.navigateByUrl('access/login');
  }

  isLogin() {
    return this.authenticationService.isLoggedIn();
  }

}
