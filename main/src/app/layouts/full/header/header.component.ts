import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NgScrollbarModule } from 'ngx-scrollbar';
import { AppSettings } from 'src/app/config';
import { AuthService, User } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    NgScrollbarModule,
    TablerIconsModule,
    MaterialModule,
    CommonModule
  ],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;
  currentUser: User | null = null;

  @Output() optionsChange = new EventEmitter<AppSettings>();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/authentication/login']);
  }


}