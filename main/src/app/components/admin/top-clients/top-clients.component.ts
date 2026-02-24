
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-top-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-clients.component.html',
  styleUrls: ['./top-clients.component.scss']
})
export class TopClientsComponent implements AfterViewInit {
  @ViewChild('pieChartCanvas') pieChartCanvas!: ElementRef<HTMLCanvasElement>;
  selectedMonth = 'Février';
  viewType: 'graph' | 'table' = 'graph';
  clients = [
    { nom: 'Client A', total: 300 },
    { nom: 'Client B', total: 200 },
    { nom: 'Client C', total: 150 },
    { nom: 'Client D', total: 100 }
  ];
  chart: Chart | null = null;

  ngAfterViewInit() {
    this.renderChart();
  }

  renderChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    if (this.viewType === 'graph') {
      this.chart = new Chart(this.pieChartCanvas.nativeElement, {
        type: 'pie',
        data: {
          labels: this.clients.map(c => c.nom),
          datasets: [
            { data: this.clients.map(c => c.total), backgroundColor: ['#5d87ff', '#ffc107', '#13deb9', '#fa896b'] }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Top clients' }
          }
        }
      });
    }
  }

  switchView(type: 'graph' | 'table') {
    this.viewType = type;
    this.renderChart();
  }

  onMonthChange(event: any) {
    this.selectedMonth = event.target.value;
    // Ici, tu pourrais filtrer les données selon le mois
    // this.clients = ...
    this.renderChart();
  }
}
