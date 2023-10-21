import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.scss'],
})
export class PokemonsListComponent implements OnInit {
  pokemonsList: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit() {
    this.getPokemons();
  }

  getPokemons() {
    const offset = (this.currentPage - 1) * this.itemsPerPage;
    this.pokemonService.getAllPokemon(this.itemsPerPage, offset).subscribe((data) => {
      this.pokemonsList = data.results;
      this.loadPokemonDetails();
      console.log(this.pokemonsList);
    });
  }

  loadPokemonDetails() {
    this.pokemonsList.forEach((pokemon, index) => {
      const id = index + 1 + (this.currentPage - 1) * this.itemsPerPage;
      this.pokemonService.getPokemonDetails(id).subscribe((details) => {
        pokemon.details = details;
      });
    });
    console.log("pokemons", this.pokemonsList);
  }

  nextPage() {
    this.currentPage++;
    this.getPokemons();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getPokemons();
    }
  }

  getPokemonType(pokemon: any): string {
    return pokemon.details?.types[0]?.type?.name.toLowerCase() || 'default';
  }

  goToPokemonDetails(pokemonId: number) {
    this.router.navigate(['/pokemon-details', pokemonId]);
  }

  getGifOrImage(pokemon: any) {
    return pokemon.details?.sprites?.versions['generation-v']['black-white']?.animated?.front_default ? pokemon.details?.sprites?.versions['generation-v']['black-white']?.animated?.front_default : pokemon.details?.sprites?.front_default;
  }
}