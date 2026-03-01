import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminStatsService } from '../../../services/admin-stats.service';

@Component({
  selector: 'app-recent-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recent-users.component.html',
  styleUrls: ['./recent-users.component.scss']
})
export class RecentUsersComponent implements OnInit {
  users: any[] = [];
  loading = true;

  constructor(private adminStatsService: AdminStatsService) {}

  ngOnInit() {
    this.loadRecentUsers();
  }

  loadRecentUsers() {
    this.adminStatsService.getRecentUsers().subscribe({
      next: (data: any) => {
        this.users = data.data.map((user: any) => ({
          initials: this.getInitials(user.fullName),
          name: user.fullName || user.email.split('@')[0],
          email: user.email,
          role: this.getRoleLabel(user.role),
          joined: this.formatDate(user.createdAt),
          status: user.isActive ? 'Actif' : 'En attente'
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement utilisateurs récents:', err);
        this.loading = false;
      }
    });
  }

  getInitials(fullName: string): string {
    if (!fullName) return 'U';
    const parts = fullName.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  }

  getRoleLabel(role: string): string {
    const roles: { [key: string]: string } = {
      'USER': 'Acheteur',
      'MANAGER': 'Propriétaire',
      'ADMIN_CENTRE': 'Admin Centre',
      'ADMIN_GROUP': 'Admin Groupe'
    };
    return roles[role] || role;
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (hours < 1) return "il y a moins d'1 heure";
    if (hours < 24) return `il y a ${hours} heure${hours > 1 ? 's' : ''}`;
    if (days === 1) return 'il y a 1 jour';
    return `il y a ${days} jours`;
  }
}
