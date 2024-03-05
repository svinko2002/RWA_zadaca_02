import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  restServis = environment.restServis;

  async spremiPodatke(podaci: string, token: any){
    let zaglavlje = new Headers();
    let tijelo = {
      korisnik: JSON.parse(podaci),
      token: token
    };
    zaglavlje.set("Content-Type", "application/json");

    let parametri = {
        method: "PUT",
        body: JSON.stringify(tijelo),
        headers: zaglavlje,
    };
    await fetch(this.restServis + "baza/korisnici/" + JSON.parse(podaci).korime, parametri)
  }
}
