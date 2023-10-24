import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { FavoritePokemonListComponent } from './components/favorite-pokemon-list/favorite-pokemon-list.component';
import { PokemonsListComponent } from './components/pokemons-list/pokemons-list.component';

const routes: Routes = [
  {
    path: '',
    component: PokemonsListComponent,
  },
  {
    path: 'pokemon-details/:id',
    component: PokemonDetailsComponent,
  },
  {
    path: 'favorite-pokemon-list',
    component: FavoritePokemonListComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
