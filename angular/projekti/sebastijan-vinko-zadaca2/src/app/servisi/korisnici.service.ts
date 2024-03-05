import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { KorisnikI } from './interfaces/KorisnikI';

@Injectable({
  providedIn: 'root'
})

export class KorisniciService {
  restServis = environment.restServis;
  constructor() { }

  async dajSveKorisnike(): Promise<KorisnikI[] | null>{
    let o = (await fetch(this.restServis + "baza/korisnici")) as Response;
    if(o.status == 200){
      let r = JSON.parse(await o.text()) as KorisnikI[];
      console.log(r);
      return r;
    }else{
      return null;
    }
  }

  async obrisiKorisnika(korime: string){
    let parametri = {
      method: "DELETE"
    }
    let o = (await fetch(this.restServis + "baza/korisnici/" + korime, parametri)) as Response;
    if(o.status == 200){
      let r = JSON.parse(await o.text()) as KorisnikI[];
      console.log(r);
      return r;
    }else{
      return null;
    }
  }
}
