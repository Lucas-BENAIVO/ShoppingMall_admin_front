import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../components/boutique/sidebar/sidebar.component';
import { FooterComponent } from '../../../components/boutique/footer/footer.component';
import { StatCardComponent } from '../../../components/boutique/stat-card/stat-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, FooterComponent, StatCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  stats = [
    {
      icon: 'people',
      iconColor: '#5d87ff',
      label: 'Total Employees',
      value: '1,248',
      change: '+ 5.4%',
      changeType: 'positive' as const,
      changeIcon: 'trending_up'
    },
    {
      icon: 'schedule',
      iconColor: '#13deb9',
      label: 'Active Shifts',
      value: '84',
      change: 'Live Now',
      changeType: 'neutral' as const,
      changeIcon: 'schedule'
    },
    {
      icon: 'access_time',
      iconColor: '#fa896b',
      label: 'Pending Timecards',
      value: '12',
      actionLabel: 'Action Required',
      actionColor: '#ffc107',
      changeType: 'neutral' as const
    },
    {
      icon: 'account_balance_wallet',
      iconColor: '#8754ec',
      label: 'Payroll Progress',
      value: '75%',
      changeType: 'neutral' as const
    }
  ];
}
