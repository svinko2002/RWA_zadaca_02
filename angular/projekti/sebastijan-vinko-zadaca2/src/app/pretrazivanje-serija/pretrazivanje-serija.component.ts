import { Component, EventEmitter, Output } from '@angular/core';
import { SerijeService } from '../servisi/serije.service';
import { SerijaI } from '../servisi/interfaces/SerijaI';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-pretrazivanje-serija',
  templateUrl: './pretrazivanje-serija.component.html',
  styleUrl: './pretrazivanje-serija.component.scss'
})

export class PretrazivanjeSerijaComponent {
  serije = new Array<SerijaI>();
  filter: string = '';
  brojac!: number;
  stranica = 1;
  zadnjaStranica = 1;

  constructor(private serijeServis: SerijeService) {}

  dohvatiPosterPutanju(): string{
    return environment.posteriPutanja;
  }

  filtriraj() {
    if(this.filter.length < 3){
      this.serije = [];
      return;
    }
    this.serije = [];
    console.log(this.serije)
    this.pretraziSerije();
  }

  async pretraziSerije(){
    await this.serijeServis.osvjeziSerije(this.stranica, this.filter);
    this.serije = this.serijeServis.dajSerije();
    let brojStranica = this.serijeServis.dajBrojStranica();
    if(this.zadnjaStranica != brojStranica){
      this.stranica = 1;
    }
    this.zadnjaStranica = brojStranica;
  }

  prva(){
    this.stranica = 1;
    this.pretraziSerije();
  }

  prethodna(){
    if(this.stranica > 1){
      this.stranica--;
      this.pretraziSerije();
    }
  }

  sljedeca(){
    if(this.stranica < this.zadnjaStranica){
      this.stranica++;
      this.pretraziSerije();
    }
  }

  zadnja(){
    this.stranica = this.zadnjaStranica;
    this.pretraziSerije();
  }
}
