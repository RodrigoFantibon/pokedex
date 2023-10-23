import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { FavoritePokemonService } from '../../services/favorite-pokemons/favorite-pokemon.service';
import { PokemonService } from '../../services/pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite-pokemon-list',
  templateUrl: './favorite-pokemon-list.component.html',
  styleUrls: ['./favorite-pokemon-list.component.scss'],
})
export class FavoritePokemonListComponent implements OnInit {
  favoritePokemons: any[] = [];
  itemsPerPage: number = 6;
  currentPage: number = 1; 

  constructor(
    private favoriteService: FavoritePokemonService,
    private pokemonService: PokemonService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getFavoritePokemons();
  }

  getFavoritePokemons() {
    const favoriteIds = this.favoriteService.getFavorites();

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    forkJoin(
      favoriteIds
        .slice(startIndex, endIndex)
        .map(id => this.pokemonService.getPokemonDetails(id))
    ).subscribe(
      (pokemonDetails: any[]) => {
        this.favoritePokemons = pokemonDetails.map(detail => ({
          id: detail.id,
          name: detail.name || 'Unknown',
          details: detail,
        }));
      },
      (error) => {
        console.error('Erro ao obter detalhes dos Pokémon favoritos:', error);
      }
    );
  }

  getPokemonType(pokemon: any): string {
    return pokemon.details?.types[0]?.type?.name.toLowerCase() || 'default';
  }

  toggleFavorite(pokemon: any) {
    const id = pokemon.details?.id;
    if (this.favoriteService.isFavorite(id)) {
      this.favoriteService.removeFromFavorites(id);
    } else {
      this.favoriteService.addToFavorites(id);
    }
  }

  goToPokemonDetails(pokemonId: number) {
    this.router.navigate(['/pokemon-details', pokemonId]);
  }

  getGifOrImage(pokemon: any) {
    return pokemon.details?.sprites?.versions['generation-v']['black-white']?.animated?.front_default
      ? pokemon.details?.sprites?.versions['generation-v']['black-white']?.animated?.front_default
      : pokemon.details?.sprites?.front_default;
  }

  destructSession() {
    localStorage.removeItem('session');
    console.log('Sessão destruída')
  }

  nextPage() {
    this.currentPage++;
    this.getFavoritePokemons();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getFavoritePokemons();
    }
  }

  backToMenu() {
    this.router.navigate(['/']);
  }

  
}