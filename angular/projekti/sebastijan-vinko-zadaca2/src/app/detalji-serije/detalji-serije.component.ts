import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { SerijeService } from '../servisi/serije.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DetaljiSerijeI } from '../servisi/interfaces/DetaljiSerijeI';
import { FavoritiService } from '../servisi/favoriti.service';

@Component({
  selector: 'app-detalji-serije',
  templateUrl: './detalji-serije.component.html',
  styleUrl: './detalji-serije.component.scss'
})

export class DetaljiSerijeComponent {
  s!: DetaljiSerijeI;
  korisnikPrijavljen = localStorage.getItem('korisnik');
  githubKorisnikPrijavljen = false;
  constructor(
    private lokacija: Location,
    private aktivnaPutanja: ActivatedRoute,
    private serijeServis: SerijeService,
    private favoritiServis: FavoritiService
  ) {
    lokacija.onUrlChange((putanja) => {
      console.log(putanja);
    });
    aktivnaPutanja.paramMap.subscribe((parametri) => {
      let idSerije = parametri.get('id');
      if (idSerije != null) {
        serijeServis.dajSeriju(idSerije).then((s: DetaljiSerijeI | null) => {
          if (s) {
            this.s = s;
          }
        })
      }
    });
  }

  ngOnInit(){
    if(!JSON.parse(localStorage.getItem('github')!!).opis){
      this.githubKorisnikPrijavljen = true;
    }else{
      this.githubKorisnikPrijavljen = false;
    }
  }

  dohvatiPosterPutanju(): string{
    return environment.posteriPutanja;
  }

  dodajUFavorite(idSerije: number){
    this.favoritiServis.dodajUFavorite(idSerije);
  }

  dodajULocalStorage(idSerije: number){
    this.favoritiServis.dodajULocalStorage(idSerije);
  }
}
