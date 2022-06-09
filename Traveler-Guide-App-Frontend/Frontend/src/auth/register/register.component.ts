import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from '../Helpers/must-match.validator';
import { CreateNewUser } from '../../app/services/user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  private formSubmitAttempt!: boolean;
  constructor(private formBuilder: FormBuilder,
    private router: Router, private userService: CreateNewUser) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.registerForm.get(field)?.valid && this.registerForm.get(field)?.touched) ||
      (this.registerForm.get(field)?.untouched && this.formSubmitAttempt)
    )

  }

  onSubmit() {
    if (this.registerForm.valid) {

      this.userService.createUser({
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        userType: 'User'
      }).subscribe((data) => {
      })
      this.router.navigate(['../login']);
    }
    this.formSubmitAttempt = true;
  }
  goToLogin() {

    this.router.navigate(['../login']);
  }
}
