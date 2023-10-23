import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritePokemonService {
  private favorites: number[] = [];

 // subject para notificar as mudanças e para atualizar a lista de favoritos (se inscrever para receber as mudanças)
  private favoritesChangedSubject = new Subject<void>();
  favoritesChanged$ = this.favoritesChangedSubject.asObservable();

  addToFavorites(pokemonId: number): void {
    if (!this.favorites.includes(pokemonId)) {
      this.favorites.push(pokemonId);
      this.saveFavorites();
      this.favoritesChangedSubject.next();
    }
  }

  removeFromFavorites(pokemonId: number): void {
    const index = this.favorites.indexOf(pokemonId);
    if (index !== -1) {
      this.favorites.splice(index, 1);
      this.saveFavorites();
      this.favoritesChangedSubject.next();
    }
  }

  isFavorite(pokemonId: number): boolean {
    return this.favorites.includes(pokemonId);
  }

  getFavorites(): number[] {
    this.loadFavorites();
    return this.favorites;
  }

  private saveFavorites(): void {
    localStorage.setItem('favoritePokemon', JSON.stringify(this.favorites));
  }

  private loadFavorites(): void {
    const storedFavorites = localStorage.getItem('favoritePokemon');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  }
}