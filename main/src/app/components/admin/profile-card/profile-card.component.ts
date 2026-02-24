import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-card">
      <div class="profile-avatar-section">
        <div class="profile-avatar">
          <span class="iconify" data-icon="solar:user-bold" style="font-size: 4em; color: #888;"></span>
          <button class="profile-avatar-edit">
            <span class="iconify" data-icon="solar:camera-bold" style="font-size: 1.2em;"></span>
          </button>
        </div>
        <div class="profile-upload-group">
          <button class="profile-upload-btn">Logo</button>
        </div>
      </div>
      <div class="profile-info-section">
        <div class="profile-info-row">
          <strong>Nom :</strong>
          <input class="profile-input" type="text" value="User name" />
        </div>
        <div class="profile-info-row">
          <strong>Email :</strong>
          <input class="profile-input" type="email" value="mi@xpaytech.co" />
        </div>
        <div class="profile-info-row">
          <strong>Téléphone :</strong>
          <input class="profile-input" type="text" value="+20-01274318900" />
        </div>
        <div class="profile-info-row">
          <strong>Adresse :</strong>
          <input class="profile-input" type="text" value="385 N Broad St, Elizabeth, NJ 07208, USA" />
        </div>
        <button class="profile-edit-btn">
          <span class="iconify" data-icon="solar:pen-bold" style="font-size: 1em;"></span> Modifier le profil
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent {}
