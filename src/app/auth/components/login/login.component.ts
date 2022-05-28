import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import {ToastrService} from "ngx-toastr";
import {ShowToastrService} from "../../../services/showtoast.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  message: string;
  loginForm: any;
  inLoading = false;
  passwordType = 'password';
  valueSpiner = 50;
  bufferValue = 75;
  @ViewChild('username', {static: true}) username: any;
  @ViewChild('pass', {static: true}) pass: any;

  constructor(
    public authService: AuthenticationService,
    private toastr: ToastrService,
    private showToastr: ShowToastrService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.message = '';
  }

  @HostListener('keypress', ['$event']) onKeyPress(event:any) {
    if (event.code === 'Enter') {
      this.passwordType = 'password';
      if (this.loginForm.controls['username'].valid) {
        this.pass.nativeElement.focus();
      }
    }
  }

  ngOnInit() {
    this.createForm();
    this.username.nativeElement.focus();
  }

  ngAfterViewInit() {
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: [{value: null, disabled: false}, [Validators.required]],
      password: [{value: null, disabled: false}, [Validators.required]],
    });
  }

  login(username: string, password: string): boolean {
    this.inLoading = true;
    localStorage.removeItem('token');
    localStorage.removeItem('access-token');
    this.authService.login(username, password).subscribe(
      (result: any) => {
        this.authService.updateUserToken(result);
        this.showToastr.showSucces('Usted se ha autenticado en nuestro sistema.', 'Felicidades!', 5500);
        this.inLoading = false;
        this.router.navigate(['/']);
      },
      () => {
        this.inLoading = false;
        this.showToastr.showError('Su usuario y contraseña son incorrectos.', 'Error!!');
      },
    );

    return false;
  }
}
