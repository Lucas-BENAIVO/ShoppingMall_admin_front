
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-top-produits',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-produits.component.html',
  styleUrls: ['./top-produits.component.scss']
})
export class TopProduitsComponent implements AfterViewInit {
  @ViewChild('barChartCanvas') barChartCanvas!: ElementRef<HTMLCanvasElement>;
  selectedMonth = 'Février';
  viewType: 'graph' | 'table' = 'graph';
  produits = [
    { nom: 'Produit A', ventes: 120 },
    { nom: 'Produit B', ventes: 90 },
    { nom: 'Produit C', ventes: 70 },
    { nom: 'Produit D', ventes: 50 },
    { nom: 'Produit E', ventes: 30 }
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
      this.chart = new Chart(this.barChartCanvas.nativeElement, {
        type: 'bar',
        data: {
          labels: this.produits.map(p => p.nom),
          datasets: [
            { label: 'Ventes', data: this.produits.map(p => p.ventes), backgroundColor: '#5d87ff' }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: true, text: 'Top produits' }
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
    // this.produits = ...
    this.renderChart();
  }
}
