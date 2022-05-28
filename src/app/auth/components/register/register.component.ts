import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import {ShowToastrService} from "../../../services/showtoast.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: any;
  isLoading = false;
  valueSpiner = 50;
  bufferValue = 75;
  passwordType = 'password';

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService,
    private showToastr: ShowToastrService,
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      username: [{ value: null, disabled: false }, [Validators.required]],
      password: [
        { value: null, disabled: false },
        [Validators.required, Validators.minLength(8)],
      ],
      confirm_password: [
        { value: null, disabled: false },
        [Validators.required],
      ],
      email: [
        { value: null, disabled: false },
        [Validators.required, Validators.email],
      ],
    });
  }

  register(data:any) {
    this.isLoading = true;
    localStorage.removeItem('token');
    localStorage.removeItem('access-token');
    this.authService.singUp(data).subscribe(
      (result: any) => {

        this.authService.updateUserToken(result);
        this.isLoading = false;
        this.showToastr.showSucces('Usted se ha registrado en nuestro sistema.', 'Felicidades!', 5500);
        this.router.navigate(['access/login']);
      },
      (error: any) => {
        let errors = error.error.username ? error.error.username[0] : '';
        errors += error.error.email ? '\n' + error.error?.email[0] : '';
        errors += error.error.password ? '\n' + error.error?.password[0] : '';
        this.showToastr.showError(errors, 'Error!!');
      }
    );

    return false;
  }

  get usernameControl() {
    return this.registerForm.get('username') as FormControl;
  }

  get passwordControl() {
    return this.registerForm.get('password') as FormControl;
  }

  get confirm_passwordControl() {
    return this.registerForm.get('confirm_password') as FormControl;
  }

  get emailControl() {
    return this.registerForm.get('email') as FormControl;
  }
}
