import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { PokemonsListComponent } from '../components/pokemons-list/pokemons-list.component';
import { PokemonDetailsComponent } from '../components/pokemon-details/pokemon-details.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, PokemonsListComponent, PokemonDetailsComponent]
})
export class HomePageModule {}
