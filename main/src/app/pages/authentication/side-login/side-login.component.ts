import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-login',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './side-login.component.html',
  styleUrls: ['./side-login.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppSideLoginComponent {
  isLoading = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const email = this.form.value.email || '';
    const password = this.form.value.password || '';

    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.user.role === 'ADMIN_CENTRE') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.errorMessage = 'Accès non autorisé. Seuls les administrateurs peuvent se connecter.';
          this.authService.logout();
        }
      },
      error: (error) => {
        this.isLoading = false;
        if (error.status === 401) {
          this.errorMessage = 'Email ou mot de passe incorrect.';
        } else if (error.status === 403) {
          this.errorMessage = 'Accès non autorisé.';
        } else {
          this.errorMessage = error.error?.message || 'Erreur de connexion. Veuillez réessayer.';
        }
      }
    });
  }
}
