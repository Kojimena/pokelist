import { Component,OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataDisplayComponent } from './data-display/data-display.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DataDisplayComponent, HttpClientModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  httpClient = inject(HttpClient);
  searchTerm: string = '';
  data: any[] = [];
  tempData: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.fetchPokemon();
  }


  onSearchChange() {
    if (this.searchTerm.trim() === '') {
      this.fetchPokemon(); // todos los pokemones
    } else {
      // nombres que comiencen con el término de búsqueda
      this.data = this.tempData.filter((pokemon) => pokemon.name.startsWith(this.searchTerm.toLowerCase()));
    }
  }

  fetchPokemon() { //obtención de datos de la API
    this.httpClient.get<any>('https://pokeapi.co/api/v2/pokemon?limit=200&offset=0').subscribe((response) => {
      //mapeamos los resultados de la API
      const pokemonDetailsRequests = response.results.map((pokemon: { name: string; url: string }) =>
        //a traves del url obtenemos los detalles de cada pokemon
        //con pipe creamos un observable que mapea los detalles de cada pokemon
        this.httpClient.get(pokemon.url).pipe(
          map((details: any) => ({
            name: pokemon.name,
            sprite: details.sprites.front_default,
            type: details.types.map((type: { type: { name: string } }) => type.type.name).join(', '),
            abilities: details.abilities.map((ability: { ability: { name: string } }) => ability.ability.name).join(', '),
          }))
        )
      );
      
      //usamos forkJoin para esperar a que todos los observables se completen y luego los combinamos en un solo observable con subscribe
      forkJoin(pokemonDetailsRequests).subscribe((pokemonDetails: any) => {
        this.data = pokemonDetails;
        this.tempData = this.data;
        console.log(this.data);
        console.log("Data: ", this.tempData);
      });
    });
  }
}
