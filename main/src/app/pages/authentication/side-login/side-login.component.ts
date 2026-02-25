import { Component, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './side-login.component.html',
  styleUrls: ['./side-login.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppSideLoginComponent {

  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private cdr: ChangeDetectorRef
  ) {}

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    const email = this.form.value.uname!;
    const password = this.form.value.password!;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/admin/boutique']);
      },
      error: () => {
        this.errorMessage = 'Email ou mot de passe incorrect';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}