import { Component, inject, OnInit, Input } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MoreDataComponent } from '../more-data/more-data.component';

@Component({
  selector: 'app-data-display',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MoreDataComponent],
  templateUrl: './data-display.component.html',
})
export class DataDisplayComponent {
  httpClient = inject(HttpClient)

  show = true;
  pokemon: any;
  @Input() datapokemon: any; //propiedad de entrada que le pasamos al componente

  showMore(pokemon: any) {
    this.show = !this.show;
    this.pokemon = pokemon;
    console.log(this.pokemon);
  }

  closeMore() {
    this.show = !this.show;
  }
  
}
