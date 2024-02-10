import { Component, inject, OnInit, Input } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-display',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './data-display.component.html',
})
export class DataDisplayComponent {
  httpClient = inject(HttpClient)


  @Input() datapokemon: any; //propiedad de entrada que le pasamos al componente

}
