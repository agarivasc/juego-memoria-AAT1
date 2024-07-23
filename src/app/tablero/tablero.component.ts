import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ImagenesPerrosService } from '../imagenes-perros.service';
import { CartasComponent } from '../cartas/cartas.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tablero',
  standalone: true,
  imports: [CommonModule, HttpClientModule, CartasComponent],
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css'],
  providers: [ImagenesPerrosService]
})
export class TableroComponent implements OnInit {
  dogImages: string[] = [];
  cards: any[] = [];
  selectedCards: any[] = [];
  matchedPairs: number = 0;
  failedAttempts: number = 0;

  constructor(private dogApiService: ImagenesPerrosService) {}

  ngOnInit(): void {
    this.initializeGame();
  }

  initializeGame(): void {
    this.matchedPairs = 0;
    this.failedAttempts = 0;
    this.selectedCards = [];
    this.dogApiService.getRandomDogs(8).subscribe(response => {
      this.dogImages = response.message;
      this.setupCards();
      this.showAllCardsTemporarily();
    });
  }

  setupCards(): void {
    this.cards = [];
    this.dogImages.forEach(image => {
      this.cards.push({ image, revealed: true });
      this.cards.push({ image, revealed: true });
    });
    this.shuffleCards();
  }

  shuffleCards(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  showAllCardsTemporarily(): void {
    // Show all cards for 2 seconds
    setTimeout(() => {
      this.cards.forEach(card => card.revealed = false);
    }, 3000);
  }

  onCardClicked(card: any): void {
    if (this.selectedCards.length < 2 && !card.revealed) {
      card.revealed = true;
      this.selectedCards.push(card);

      if (this.selectedCards.length === 2) {
        this.checkForMatch();
      }
    }
  }

  checkForMatch(): void {
    setTimeout(() => {
      const [firstCard, secondCard] = this.selectedCards;
      if (firstCard.image === secondCard.image) {
        this.matchedPairs++;
        if (this.matchedPairs === this.dogImages.length) {
          Swal.fire({
            title: '¡Felicidades!',
            text: '¡Has encontrado todos los pares!',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.resetGame();
          });
        }
      } else {
        firstCard.revealed = false;
        secondCard.revealed = false;
        this.failedAttempts++;
        if (this.failedAttempts >= 4) {
          Swal.fire({
            title: 'Game Over',
            text: '¡Has fallado 4 veces!',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.resetGame();
          });
        }
      }
      this.selectedCards = [];
    }, 1000);
  }

  resetGame(): void {
    this.matchedPairs = 0;
    this.failedAttempts = 0;
    this.selectedCards = [];
    this.initializeGame();
  }
}
