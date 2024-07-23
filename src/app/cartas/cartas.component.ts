import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cartas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cartas.component.html',
  styleUrls: ['./cartas.component.css']
})
export class CartasComponent {
  @Input() card: any;

  onClick(): void {
    if (!this.card.revealed) {
      this.card.onClick(this.card);
    }
  }
}