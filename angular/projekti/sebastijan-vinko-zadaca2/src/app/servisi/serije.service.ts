import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { SerijeTMDBI } from './interfaces/SerijeTMDBI';
import { SerijaI } from './interfaces/SerijaI';
import { SerijaTMDBI } from './interfaces/SerijaTMDBI';
import { DetaljiSerijeI } from './interfaces/DetaljiSerijeI';

@Injectable({
  providedIn: 'root'
})

export class SerijeService {
  restServis = environment.restServis;
  serijeTMDB?: SerijeTMDBI;
  serije = new Array<SerijaI>();
  zadnjaStranica = 1;

  async osvjeziSerije(stranica:number,trazi:string){
    let parametri = "?stranica=" + stranica + "&trazi=" + trazi;
    let o = (await fetch(this.restServis + "api/tmdb/serije" + parametri)) as Response;
    console.log(this.restServis + "api/tmdb/serije" + parametri)
    if(o.status == 200){
      let r = JSON.parse(await o.text()) as SerijeTMDBI;
      this.zadnjaStranica = r.total_pages;
      this.serijeTMDB = r;
    }
  }

  dajSerije(): SerijaI[] {
    this.serije = new Array<SerijaI>();
    for (let serijaTMDB of this.serijeTMDB!.results) {
      let serija: SerijaI = {
        id: serijaTMDB.id,
        originalan_naziv: serijaTMDB.original_name,
        naziv: serijaTMDB.name,
        opis: serijaTMDB.overview,
        originalan_jezik: serijaTMDB.original_language,
        slika: serijaTMDB.poster_path,
        popularnost: serijaTMDB.popularity,
        ocjena_serije: serijaTMDB.vote_average,
        broj_glasova: serijaTMDB.vote_count,
      };
      this.serije.push(serija);
    }
    return this.serije;
  }
  
  async dajSeriju(idSerije: String): Promise<DetaljiSerijeI | null>{
    let parametri = "?id=" + idSerije;
    let o = (await fetch(this.restServis + "api/tmdb/serija" + parametri)) as Response;
    console.log(this.restServis + "api/tmdb/serija" + parametri)
    if(o.status == 200){
      let r = JSON.parse(await o.text()) as SerijaTMDBI;
      let serija: DetaljiSerijeI = {
        id: r.id,
        originalan_naziv: r.original_name,
        naziv: r.name,
        opis: r.overview,
        broj_sezona: r.number_of_seasons,
        broj_epizoda: r.number_of_episodes,
        originalan_jezik: r.original_language,
        slika: r.poster_path,
        popularnost: r.popularity,
        ocjena_serije: r.vote_average,
        broj_glasova: r.vote_count,
        stranica: r.homepage
      };
      return serija;
    }
    return null;
  }

  async dajSerijuRaw(idSerije: number){
    let parametri = "?id=" + idSerije;
    let o = (await fetch(this.restServis + "api/tmdb/serija" + parametri)) as Response;
    console.log(this.restServis + "api/tmdb/serija" + parametri)
    if(o.status == 200){
      let r = JSON.parse(await o.text());
      return r;
    }
    return null;
  }

  dajBrojStranica(){
    return this.zadnjaStranica;
  }
}
