import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritePokemonService {
  private favorites: number[] = [];

  addToFavorites(pokemonId: number) {
    if (!this.favorites.includes(pokemonId)) {
      this.favorites.push(pokemonId);
      this.saveFavorites();
    }
  }

  removeFromFavorites(pokemonId: number) {
    const index = this.favorites.indexOf(pokemonId);
    if (index !== -1) {
      this.favorites.splice(index, 1);
      this.saveFavorites();
    }
  }

  isFavorite(pokemonId: number): boolean {
    return this.favorites.includes(pokemonId);
  }

  getFavorites(): number[] {
    this.loadFavorites();
    return this.favorites;
  }

  private saveFavorites() {
    localStorage.setItem('favoritePokemon', JSON.stringify(this.favorites));
  }

  private loadFavorites() {
    const storedFavorites = localStorage.getItem('favoritePokemon');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  }
}