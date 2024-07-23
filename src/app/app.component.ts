import { Component } from '@angular/core';
import { TableroComponent } from './tablero/tablero.component';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [TableroComponent]
})
export class AppComponent {
  title = 'memoria-perros-aat1';
}

