import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Boutique {
  nom: string;
  categorie: string;
  image: string;
  note: number;
  avis: number;
  etage: string;
  statut: 'Ouvert' | 'Fermé';
  badges?: string[];
}

@Component({
  selector: 'app-boutique-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boutique-list.component.html',
  styleUrls: ['./boutique-list.component.scss']
})
export class BoutiqueListComponent {
  boutiques: Boutique[] = [
    {
      nom: 'Fils Urbains', categorie: 'Mode & Vêtements', image: 'assets/images/shops/urban-threads.jpg', note: 4.8, avis: 342, etage: 'Niveau 2, Zone A', statut: 'Ouvert', badges: ['EN VEDETTE', 'VÉRIFIÉ']
    },
    {
      nom: 'TechHub Électronique', categorie: 'Électronique', image: 'assets/images/shops/techhub.jpg', note: 4.9, avis: 589, etage: 'Niveau 1, Zone C', statut: 'Ouvert', badges: ['VÉRIFIÉ']
    },
    {
      nom: 'Fleur & Pétale', categorie: 'Maison & Décoration', image: 'assets/images/shops/bloom-petal.jpg', note: 4.7, avis: 218, etage: 'Niveau 3, Zone B', statut: 'Ouvert'
    },
    {
      nom: 'Station Saveur', categorie: 'Alimentation & Boissons', image: 'assets/images/shops/flavor-station.jpg', note: 5.0, avis: 476, etage: 'Rez-de-chaussée, Zone A', statut: 'Ouvert', badges: ['EN VEDETTE', 'VÉRIFIÉ']
    },
    {
      nom: 'Beauté Éclat', categorie: 'Beauté & Cosmétiques', image: 'assets/images/shops/glow-beauty.jpg', note: 4.5, avis: 194, etage: 'Niveau 2, Zone D', statut: 'Ouvert'
    },
    {
      nom: 'Zone Sneakers', categorie: 'Mode & Vêtements', image: 'assets/images/shops/sneaker-zone.jpg', note: 4.6, avis: 412, etage: 'Niveau 1, Zone B', statut: 'Fermé', badges: ['VÉRIFIÉ']
    },
    {
      nom: 'Havre de Livres', categorie: 'Maison & Décoration', image: 'assets/images/shops/book-haven.jpg', note: 4.9, avis: 287, etage: 'Niveau 2, Zone C', statut: 'Ouvert', badges: ['VÉRIFIÉ']
    },
    {
      nom: 'Coin Café', categorie: 'Alimentation & Boissons', image: 'assets/images/shops/coffee-corner.jpg', note: 4.4, avis: 523, etage: 'Rez-de-chaussée, Zone B', statut: 'Ouvert', badges: ['EN VEDETTE']
    },
    {
      nom: 'Bijouterie', categorie: 'Mode & Vêtements', image: 'assets/images/shops/jewelry-boutique.jpg', note: 4.8, avis: 156, etage: 'Niveau 3, Zone A', statut: 'Ouvert', badges: ['VÉRIFIÉ']
    },
    {
      nom: 'Galaxie Sport', categorie: 'Mode & Vêtements', image: 'assets/images/shops/sports-galaxy.jpg', note: 4.7, avis: 398, etage: 'Niveau 2, Zone D', statut: 'Ouvert'
    },
    {
      nom: 'Paradis des Animaux', categorie: 'Maison & Décoration', image: 'assets/images/shops/pet-paradise.jpg', note: 4.3, avis: 167, etage: 'Niveau 3, Zone C', statut: 'Ouvert'
    },
    {
      nom: 'Studio Audio', categorie: 'Électronique', image: 'assets/images/shops/audio-studio.jpg', note: 4.6, avis: 301, etage: 'Niveau 2, Zone B', statut: 'Fermé'
    }
  ];
}
