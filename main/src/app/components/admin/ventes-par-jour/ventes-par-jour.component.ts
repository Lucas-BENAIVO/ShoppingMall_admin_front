
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-ventes-par-jour',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ventes-par-jour.component.html',
  styleUrls: ['./ventes-par-jour.component.scss']
})
export class VentesParJourComponent implements AfterViewInit {
  @ViewChild('lineChartCanvas') lineChartCanvas!: ElementRef<HTMLCanvasElement>;
  selectedMonth = 'Février';
  viewType: 'graph' | 'table' = 'graph';
  jours = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  ventes = [30, 50, 40, 60, 80, 70, 90];
  chart: Chart | null = null;

  ngAfterViewInit() {
    this.renderChart();
  }

  renderChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    if (this.viewType === 'graph') {
      this.chart = new Chart(this.lineChartCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: this.jours,
          datasets: [
            { label: 'Ventes', data: this.ventes, borderColor: '#13deb9', backgroundColor: 'rgba(19,222,185,0.2)', fill: true }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: true, text: 'Ventes par jour' }
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
    // this.ventes = ...
    this.renderChart();
  }
}
