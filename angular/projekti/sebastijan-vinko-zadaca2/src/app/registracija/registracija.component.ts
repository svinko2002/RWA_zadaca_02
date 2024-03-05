import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from '../../environments/environment';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrl: './registracija.component.scss'
})

export class RegistracijaComponent {
  restServis = environment.restServis;
  
  constructor (private recaptchaV3Service: ReCaptchaV3Service) {}

  siteKey = '6LfrJUApAAAAAF7b7xTdOPJkhjxwBJmyz5bY3_sn';
  action = 'registracija';

  async onSubmit(formaZaRegistraciju: NgForm){
	this.recaptchaV3Service.execute(this.action)
      .subscribe(async (token) => {
		console.log(formaZaRegistraciju.value)

		let tijelo = {
			korime: formaZaRegistraciju.value.korime,
			pocetna_lozinka: formaZaRegistraciju.value.lozinka,
			lozinka: formaZaRegistraciju.value.lozinka,
			email: formaZaRegistraciju.value.email,
			ime: formaZaRegistraciju.value.ime,
			prezime : formaZaRegistraciju.value.prezime,
			godina_rodjenja : formaZaRegistraciju.value.godina_rodjenja,
			drzava : formaZaRegistraciju.value.drzava,
			zupanija : formaZaRegistraciju.value.zupanija,
			token : token
		};
		let zaglavlje = new Headers();
		zaglavlje.set("Content-Type", "application/json");

		let parametri = {
			method: "POST",
			body: JSON.stringify(tijelo),
			headers: zaglavlje,
		};
		let odgovor = await fetch(this.restServis + "baza/korisnici", parametri);

		if (odgovor.status == 201) {
			console.log("Korisnik ubačen u bazu podataka");
			return true;
		} else if(odgovor.status == 417){
			console.log("Neispravni podaci");
			return false;
		}
		return true;
	});
  }
}
