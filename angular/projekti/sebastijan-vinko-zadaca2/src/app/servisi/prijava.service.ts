import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PrijavaService {
  restServis = environment.restServis;

  async prijaviKorisnika(korime:String, lozinka:String, token: any, tajniKljuc: String){
    let zaglavlje = new Headers();
		zaglavlje.set("Content-Type", "application/json");
    let tijelo = {
			lozinka: lozinka,
      token: token,
      tajniKljuc: tajniKljuc
		};
    console.log(tijelo)
		let parametri = {
			method: "POST",
			body: JSON.stringify(tijelo),
			headers: zaglavlje,
		};
    let o = (await fetch(this.restServis + "baza/korisnici/" + korime + "/prijava", parametri)) as Response;
    if(o.status == 201){
      return o.text();
    }else{
      return false;
    }
  }

  prijavljenUpitnik(): Boolean{
    if(localStorage.getItem('korisnik')){
      return true;
    }else{
      return false;
    }
  }

  dajPrijavljenog(){
    if(localStorage.getItem('korisnik')){
      return JSON.parse(localStorage.getItem('korisnik')!);
    }else{
      return false;
    }
  }

  async dajPrijavljenogGithub(){
    let o = (await fetch(this.restServis + "getGithub")) as Response
    let podaci = await o.text();
    localStorage.setItem('github', podaci)
  }

  async odjaviGithuba(){
    let o = await fetch(this.restServis + "logout/github")
    let o2 = (await fetch(this.restServis + "getGithub")) as Response
    let podaci2 = await o2.text();
    localStorage.setItem('github', podaci2)
  }
}
