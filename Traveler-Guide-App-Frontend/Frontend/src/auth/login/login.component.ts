import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateNewUser } from '../../app/services/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  private formSubmitAttempt!: boolean;
  constructor(private formBuilder: FormBuilder,
    private router: Router, private userService: CreateNewUser) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  isFieldInvalid(field: string) {
    return (
      (!this.loginForm.get(field)?.valid && this.loginForm.get(field)?.touched) ||
      (this.loginForm.get(field)?.untouched && this.formSubmitAttempt)
    )

  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.userService.loginUser({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      }).subscribe((data: any) => {
        this.userService.setUserId(data.id)
      })
      this.router.navigate(['../my-travels']);
    }
    this.formSubmitAttempt = true;
  }
  goToRegister() {
    this.router.navigate(['../register']);
  }
}
