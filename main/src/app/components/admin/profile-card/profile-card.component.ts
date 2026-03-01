import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {
  user: User | null = null;
  loading = true;
  isEditing = false;
  saving = false;
  successMessage = '';
  errorMessage = '';

  formData = {
    fullName: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.loading = true;
    const currentUser = this.authService.getCurrentUser();
    
    if (currentUser) {
      const userId = currentUser._id || currentUser.id;
      if (userId) {
        this.userService.getUserById(userId).subscribe({
          next: (response) => {
            if (response.success && response.data) {
              const userData = response.data as any;
              this.user = {
                _id: userData._id,
                fullName: userData.fullName,
                email: userData.email,
                role: userData.role
              };
              this.formData.fullName = userData.fullName || '';
              this.formData.email = userData.email || '';
              this.formData.phone = userData.phone || '';
            }
            this.loading = false;
          },
          error: (err) => {
            console.error('Erreur chargement profil:', err);
            this.user = currentUser;
            this.formData.fullName = currentUser.fullName || '';
            this.formData.email = currentUser.email || '';
            this.loading = false;
          }
        });
      } else {
        this.user = currentUser;
        this.loading = false;
      }
    } else {
      this.loading = false;
    }
  }

  enableEditing(): void {
    this.isEditing = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  cancelEditing(): void {
    this.isEditing = false;
    if (this.user) {
      this.formData.fullName = this.user.fullName || '';
      this.formData.email = this.user.email || '';
    }
    this.formData.currentPassword = '';
    this.formData.newPassword = '';
    this.formData.confirmPassword = '';
    this.errorMessage = '';
  }

  saveProfile(): void {
    if (!this.user?._id) return;

    // Validation
    if (!this.formData.fullName.trim()) {
      this.errorMessage = 'Le nom est requis';
      return;
    }
    if (!this.formData.email.trim()) {
      this.errorMessage = 'L\'email est requis';
      return;
    }

    // Password validation
    if (this.formData.newPassword) {
      if (this.formData.newPassword.length < 6) {
        this.errorMessage = 'Le nouveau mot de passe doit contenir au moins 6 caractères';
        return;
      }
      if (this.formData.newPassword !== this.formData.confirmPassword) {
        this.errorMessage = 'Les mots de passe ne correspondent pas';
        return;
      }
    }

    this.saving = true;
    this.errorMessage = '';

    const updateData: any = {
      fullName: this.formData.fullName.trim(),
      email: this.formData.email.trim(),
      phone: this.formData.phone.trim()
    };

    if (this.formData.newPassword) {
      updateData.password = this.formData.newPassword;
    }

    this.userService.updateUser(this.user._id, updateData).subscribe({
      next: (response) => {
        if (response.success) {
          // Update local storage and AuthService
          const updatedUser: User = {
            _id: this.user!._id,
            fullName: this.formData.fullName,
            email: this.formData.email,
            role: this.user!.role
          };
          this.authService.updateCurrentUser(updatedUser);
          this.user = updatedUser;
          
          this.successMessage = 'Profil mis à jour avec succès';
          this.isEditing = false;
          this.formData.currentPassword = '';
          this.formData.newPassword = '';
          this.formData.confirmPassword = '';
        }
        this.saving = false;
      },
      error: (err) => {
        console.error('Erreur mise à jour:', err);
        this.errorMessage = err.error?.message || 'Erreur lors de la mise à jour';
        this.saving = false;
      }
    });
  }

  getRoleLabel(role: string): string {
    const roles: { [key: string]: string } = {
      'ADMIN_CENTRE': 'Administrateur Centre',
      'MANAGER_BOUTIQUE': 'Gérant Boutique',
      'USER': 'Utilisateur'
    };
    return roles[role] || role;
  }
}
