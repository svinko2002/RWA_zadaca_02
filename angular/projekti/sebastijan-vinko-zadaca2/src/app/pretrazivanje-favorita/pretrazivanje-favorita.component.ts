import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { FavoritiService } from '../servisi/favoriti.service';
import { DetaljiSerijeI } from '../servisi/interfaces/DetaljiSerijeI';

@Component({
  selector: 'app-pretrazivanje-favorita',
  templateUrl: './pretrazivanje-favorita.component.html',
  styleUrl: './pretrazivanje-favorita.component.scss'
})

export class PretrazivanjeFavoritaComponent {
  serije = new Array<DetaljiSerijeI>();
  isHidden = true;
  constructor(private favoritiServis: FavoritiService) {}
  

  async ngOnInit() {
    this.serije = []
    if(localStorage.getItem('korisnik')){
      this.isHidden = false;
      this.dohvatiSerije();
    }
    if(!JSON.parse(localStorage.getItem('github')!!).opis){
      this.dohvatiSerijeIzStoragea();
    }
  }

  async dohvatiSerije() {
    const rezultat = await this.favoritiServis.dajFavorite();
    if(rezultat != null){
      this.serije = rezultat;
    }
  }

  async dohvatiSerijeIzStoragea() {
    let podaci = this.favoritiServis.dajFavoriteIzStoragea()
    if(podaci){
      this.isHidden = false;
      this.serije = podaci;
    }else{
      this.serije = []
    }
  }

  dohvatiPosterPutanju(): string{
    return environment.posteriPutanja;
  }

  async makniIzFavorita(idSerije: number){
    if(!JSON.parse(localStorage.getItem('github')!!).opis){
      await this.favoritiServis.makniIzLocalStoragea(idSerije);
      this.dohvatiSerijeIzStoragea();
    }else{
      await this.favoritiServis.makniIzFavorita(idSerije);
      this.dohvatiSerije();
    }
  }
}
