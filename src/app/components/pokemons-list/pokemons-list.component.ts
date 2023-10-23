import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Router } from '@angular/router';
import { FavoritePokemonService } from '../../services/favorite-pokemons/favorite-pokemon.service';

@Component({
  selector: 'app-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.scss'],
})
export class PokemonsListComponent implements OnInit {
  pokemonsList: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(
    private pokemonService: PokemonService,
    private favoriteService: FavoritePokemonService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getPokemons();
  }

  getPokemons() {
    const offset = (this.currentPage - 1) * this.itemsPerPage;
    this.pokemonService.getAllPokemon(this.itemsPerPage, offset).subscribe((data) => {
      this.pokemonsList = data.results;
      this.loadPokemonDetails();
    });
  }

  loadPokemonDetails() {
    this.pokemonsList.forEach((pokemon, index) => {
      const id = index + 1 + (this.currentPage - 1) * this.itemsPerPage;
      this.pokemonService.getPokemonDetails(id).subscribe((details) => {
        pokemon.details = details;
      });
    });
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

  toggleFavorite(pokemon: any) {
    const id = pokemon.details?.id;
    console.log("caiu", pokemon)
    if (this.favoriteService.isFavorite(id)) {
      this.favoriteService.removeFromFavorites(id);
      // this.goToFavoritesPage();
    } else {
      this.goToFavoritesPage();
      this.favoriteService.addToFavorites(id);
    }
  }

  goToFavoritesPage() {
    this.router.navigate(['/favorite-pokemon-list']); 
  }

  isFavorite(pokemon: any): boolean {
    const id = pokemon.details?.id;
    return this.favoriteService.isFavorite(id);
  }

  goToPokemonDetails(pokemonId: number) {
    this.router.navigate(['/pokemon-details', pokemonId]);
  }

  getGifOrImage(pokemon: any) {
    return pokemon.details?.sprites?.versions['generation-v']['black-white']?.animated?.front_default
      ? pokemon.details?.sprites?.versions['generation-v']['black-white']?.animated?.front_default
      : pokemon.details?.sprites?.front_default;
  }
}