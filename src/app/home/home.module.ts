import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { PokemonsListComponent } from '../components/pokemons-list/pokemons-list.component';
import { PokemonDetailsComponent } from '../components/pokemon-details/pokemon-details.component';
import { FavoritePokemonListComponent } from '../components/favorite-pokemon-list/favorite-pokemon-list.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, PokemonsListComponent, PokemonDetailsComponent, FavoritePokemonListComponent ]
})
export class HomePageModule {}
