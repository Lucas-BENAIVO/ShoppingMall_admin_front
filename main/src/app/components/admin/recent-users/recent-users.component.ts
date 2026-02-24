import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recent-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recent-users.component.html',
  styleUrls: ['./recent-users.component.scss']
})
export class RecentUsersComponent {
  users = [
    { initials: 'DK', name: 'David Kim', email: 'david.kim@email.com', role: 'Acheteur', joined: 'il y a 2 heures', status: 'Actif' },
    { initials: 'SM', name: 'Sarah Martinez', email: 'sarah.m@businessmall.com', role: 'Propriétaire', joined: 'il y a 5 heures', status: 'Actif' },
    { initials: 'JL', name: 'James Lee', email: 'james.lee@gmail.com', role: 'Acheteur', joined: 'il y a 1 jour', status: 'Actif' },
    { initials: 'ER', name: 'Emily Roberts', email: 'emily.roberts@shop.com', role: 'Propriétaire', joined: 'il y a 1 jour', status: 'En attente' },
    { initials: 'TW', name: 'Thomas Wang', email: 'thomas.w@email.com', role: 'Acheteur', joined: 'il y a 2 jours', status: 'Actif' }
  ];
}
