import { Component, OnInit } from '@angular/core';
import { UserService, UserData, UserResponse } from '../../services/user.service';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {

  users: UserData[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (response: UserResponse) => {
        if (response.success && Array.isArray(response.data)) {
          this.users = response.data;
        }
      },
      error: (err: Error) => {
        console.error('Erreur API:', err);
      }
    });
  }
}
