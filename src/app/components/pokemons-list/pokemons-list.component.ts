import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';


@Component({
  selector: 'app-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.scss'],
})
export class PokemonsListComponent  implements OnInit {

  pokemonsList: any[] = [];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.getPokemons()
  }
  getPokemons() {
    this.pokemonService.getAllPokemon().subscribe((data) => {
      this.pokemonsList = data.results;
      this.loadPokemonDetails();
      console.log(this.pokemonsList)
    });
  }

  loadPokemonDetails() {
    this.pokemonsList.forEach((pokemon, index) => {
      const id = index + 1;
      this.pokemonService.getPokemonDetails(id).subscribe((details) => {
        pokemon.details = details;
      });
    });
    console.log("pokemons", this.pokemonsList)
  }

  
  
  

}
