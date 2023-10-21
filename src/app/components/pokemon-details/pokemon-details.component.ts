import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent  implements OnInit {

  pokemonId: number = 0;
  pokemonDetails: any;
  typeClass: string = '';
  gifOrPicture: string = '';

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pokemonId = + params['id']; 
      this.loadPokemonDetails();
    });
  }

  loadPokemonDetails() {
    this.pokemonService.getPokemonDetails(this.pokemonId).subscribe(details => {
      this.pokemonDetails = details;
      this.setTypeClass();
      console.log("detalhes do pokemon", this.pokemonDetails)
      this.getGifOrImage();
    });
  }
  setTypeClass() {
    this.typeClass = this.pokemonDetails?.types[0]?.type?.name || 'type-default';
    console.log("tipo do pokemon", this.typeClass)
  }

  getGifOrImage() {
  this.gifOrPicture = this.pokemonDetails?.sprites?.versions['generation-v']['black-white']?.animated?.front_default ? this.pokemonDetails?.sprites?.versions['generation-v']['black-white']?.animated?.front_default : this.pokemonDetails?.sprites?.front_default;
  console.log("gif ou imagem", this.gifOrPicture)
  return this.gifOrPicture;
  }



}
