import { Injectable } from '@angular/core';
import { DetaljiSerijeI } from './interfaces/DetaljiSerijeI';
import { SerijaTMDBI } from './interfaces/SerijaTMDBI';
import { environment } from '../../environments/environment';
import { PrijavaService } from './prijava.service';
import { SezonaI } from './interfaces/SezonaI';
import { SerijeService } from './serije.service';

@Injectable({
  providedIn: 'root'
})

export class FavoritiService {
  restServis = environment.restServis;
  favoriti = new Array<DetaljiSerijeI>();
  sezone = new Array<SezonaI>();
  serijeTMDB?: SerijaTMDBI;
  constructor(private prijavaServis: PrijavaService, private serijeServis: SerijeService) { }

  async dajFavorite(): Promise<DetaljiSerijeI[] | null>{
    const zaglavlje = new Headers({
      'Content-Type': 'application/json',
      'korisnik_id': this.prijavaServis.dajPrijavljenog().id,
    });

    let parametri = {
			headers: zaglavlje,
		};

    let o = (await fetch(this.restServis + "baza/favoriti", parametri)) as Response;
    console.log(this.restServis + "baza/favoriti")
    
    if(o.status == 200){
      this.favoriti = [];
      let r = JSON.parse(await o.text());
      for (let i = 0; i < r.length; i++) {
        let serija: DetaljiSerijeI = {
          id: r[i].tmdb_id,
          originalan_naziv: "",
          naziv: r[i].naziv,
          opis: r[i].opis,
          broj_sezona: r[i].broj_sezona,
          broj_epizoda: r[i].broj_epizoda,
          originalan_jezik: "",
          slika: r[i].slika,
          popularnost: r[i].popularnost,
          ocjena_serije: r[i].ocjena_serije,
          broj_glasova: r[i].broj_glasova,
          stranica: r[i].stranica
        };
        this.favoriti.push(serija);
      }
      return this.favoriti;
    }
    return null;
  }

  dajFavoriteIzStoragea(): DetaljiSerijeI[] | null{
    this.favoriti = [];
    for (let i = 0; i < localStorage.length; i++){
      if(localStorage.key(i)?.toString().includes("serija:")){
        let s = JSON.parse(localStorage.getItem(localStorage.key(i)!!)!!);
        let serija: DetaljiSerijeI = {
          id: s.id,
          originalan_naziv: "",
          naziv: s.name,
          opis: s.overview,
          broj_sezona: s.number_of_seasons,
          broj_epizoda: s.number_of_episodes,
          originalan_jezik: "",
          slika: s.poster_path,
          popularnost: s.popularity,
          ocjena_serije: s.vote_average,
          broj_glasova: s.vote_count,
          stranica: s.homepage
        };
        this.favoriti.push(serija);
      }
    }
    if(this.favoriti.length > 0){
      return this.favoriti;
    }else{
      return null;
    }
  }

  async dajSezoneOd(idSerije: string): Promise<SezonaI[] | null>{
    const zaglavlje = new Headers({
      'Content-Type': 'application/json',
      'korisnik_id': this.prijavaServis.dajPrijavljenog().id,
    });

    let parametri = {
			headers: zaglavlje,
		};

    let o = (await fetch(this.restServis + "baza/favoriti/" + idSerije, parametri)) as Response;
    
    if(o.status == 200){
      this.sezone = [];
      let r = JSON.parse(await o.text());
      for (let i = 0; i < r.length; i++) {
        let sezona: SezonaI = {
          serija_tmdb_id: r[i].serija_tmdb_id,
          sezona_id: r[i].sezona_id,
          naziv: r[i].naziv,
          broj_sezone: r[i].broj_sezone,
          broj_epizoda_u_sezoni: r[i].broj_epizoda_u_sezoni,
          opis: r[i].opis,
          slika: r[i].slika,
          ocjena_sezone: r[i].ocjena_sezone,
        };
        this.sezone.push(sezona);
      }
      return this.sezone;
    }
    return null;
  }

  
  dajSezoneOdIzLocalStoragea(idSerije: string): SezonaI[] | null{
    if(localStorage.getItem('serija:'+idSerije)){
      this.sezone = [];
      let r = JSON.parse(localStorage.getItem('serija:'+idSerije)!!).seasons;
      for (let i = 0; i < r.length; i++) {
        let sezona: SezonaI = {
          serija_tmdb_id: Number(idSerije),
          sezona_id: r[i].id,
          naziv: r[i].name,
          broj_sezone: r[i].season_number,
          broj_epizoda_u_sezoni: r[i].episode_count,
          opis: r[i].overview,
          slika: r[i].poster_path,
          ocjena_sezone: r[i].vote_average,
        };
        this.sezone.push(sezona);
      }
      return this.sezone;
    }
    return null;
  }
  async makniIzFavorita(idSerije: number){
    const zaglavlje = new Headers({
      'Content-Type': 'application/json',
      'korisnik_id': this.prijavaServis.dajPrijavljenog().id,
    });

    let parametri = {
      method: "DELETE",
			headers: zaglavlje,
		};

    let o = (await fetch(this.restServis + "baza/favoriti/" + idSerije, parametri)) as Response;
  }

  async makniIzLocalStoragea(idSerije: number){
    localStorage.removeItem('serija:'+idSerije);
  }

  async dodajUFavorite(idSerije: number){
    const zaglavlje = new Headers({
      'Content-Type': 'application/json',
      'korisnik_id': this.prijavaServis.dajPrijavljenog().id,
    });
    let tijelo = {
      serija: await this.serijeServis.dajSerijuRaw(idSerije)
    };
    let parametri = {
      method: "POST",
			headers: zaglavlje,
      body: JSON.stringify(tijelo)
		};
    let o = (await fetch(this.restServis + "baza/favoriti", parametri)) as Response;
  }

  async dodajULocalStorage(idSerije: number){
    let serija = await this.serijeServis.dajSerijuRaw(idSerije)
    localStorage.setItem('serija:'+idSerije, JSON.stringify(serija));
  }
}
