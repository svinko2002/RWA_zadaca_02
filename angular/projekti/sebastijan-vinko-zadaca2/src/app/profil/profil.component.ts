import { Component, ElementRef, ViewChild } from '@angular/core';
import { PrijavaService } from '../servisi/prijava.service';
import { NgForm } from '@angular/forms';
import { ProfilService } from '../servisi/profil.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})

export class ProfilComponent{
  @ViewChild('ime') ime!: ElementRef;
  @ViewChild('prezime') prezime!: ElementRef;
  @ViewChild('email') email!: ElementRef;
  @ViewChild('godina_rodjenja') godinaRodjenja!: ElementRef;
  @ViewChild('drzava') drzava!: ElementRef;
  @ViewChild('zupanija') zupanija!: ElementRef;
  @ViewChild('korime') korime!: ElementRef;
  @ViewChild('lozinka') lozinka!: ElementRef;
  isHidden = true;
  tajniKljucHidden = true;
  imeValue!: String;
  prezimeValue!: String;
  emailValue!: String;
  godina_rodjenjaValue!: String;
  drzavaValue!: String;
  zupanijaValue!: String;
  korimeValue!: String;
  lozinkaValue!: String;
  idValue!: number;
  tipovi_korisnika_idValue!: number;

  tajniKljucValue!: String;
  tajniKljucValueGenerated!: string;
  tajniKljucQrCode!: string;
  tajniKljucValueAlreadyGenerated: boolean = false;
  citajTajniKljuc: boolean = false;
  prikazi:boolean = false;

  constructor(
    private prijavaServis: PrijavaService, 
    private profilService: ProfilService, 
    private recaptchaV3Service: ReCaptchaV3Service, 
  ) {}
  
  siteKey = '6LfrJUApAAAAAF7b7xTdOPJkhjxwBJmyz5bY3_sn';
  action = 'uredjivanje_profila';

  ngAfterViewInit(){
    if(this.prijavaServis.prijavljenUpitnik()){
      let korisnik = this.prijavaServis.dajPrijavljenog();
      this.imeValue = korisnik.ime;
      this.prezimeValue = korisnik.prezime;
      this.emailValue = korisnik.email;
      this.godina_rodjenjaValue = korisnik.godina_rodjenja;
      this.drzavaValue = korisnik.drzava;
      this.zupanijaValue = korisnik.zupanija;
      this.korimeValue = korisnik.korime;
      this.lozinkaValue = korisnik.lozinka;
      this.tajniKljucValue = korisnik.tajniKljuc;
      this.citajTajniKljuc = korisnik.citajTajniKljuc;
      this.idValue = korisnik.id;
      this.tipovi_korisnika_idValue = korisnik.tipovi_korisnika_id;
    }
    if(this.tajniKljucValue){
      this.tajniKljucValueAlreadyGenerated = true;
    }
  }

  onCitajTajniKljucChange(){
    if(!this.tajniKljucValueAlreadyGenerated){
      this.prikazi = !this.prikazi;
      if(this.tajniKljucValue == null){
        if(this.tajniKljucValue == null && !this.tajniKljucValueAlreadyGenerated){
          let k1 = this.korimeValue[0].toUpperCase();
          let e1 = this.emailValue[0].toUpperCase();
          let b1 = this.generateRandomNumber();
          let b2 = this.generateRandomNumber();
          let b3 = this.generateRandomNumber();
          let b4 = this.generateRandomNumber();
          this.tajniKljucValueGenerated = k1 + e1 + b1 + b2 + b3 + b4;
          this.tajniKljucValue = this.tajniKljucValueGenerated;
          this.tajniKljucQrCode = this.tajniKljucValueGenerated;
        }
      }
    }
  }
  
  generateRandomNumber(): number {
    return Math.floor(Math.random() * (9));
  }

  onSubmit(formaZaProfil: NgForm){
    this.recaptchaV3Service.execute(this.action)
      .subscribe(async (token) => {
        console.log('reCAPTCHA Token:', token);
        let podaci = {
          ime: formaZaProfil.value.ime == "" ? this.imeValue : formaZaProfil.value.ime,
          prezime: formaZaProfil.value.prezime == "" ? this.prezimeValue : formaZaProfil.value.prezime,
          godina_rodjenja: formaZaProfil.value.godina_rodjenja == "" ? this.godina_rodjenjaValue : formaZaProfil.value.godina_rodjenja,
          drzava: formaZaProfil.value.drzava == "" ? this.drzavaValue : formaZaProfil.value.drzava,
          zupanija: formaZaProfil.value.zupanija == "" ? this.zupanijaValue : formaZaProfil.value.zupanija,
          lozinka: this.lozinkaValue,
          email: this.emailValue,
          korime: this.korimeValue,
          citajTajniKljuc: this.citajTajniKljuc,
          tajniKljuc: this.tajniKljucValueGenerated == "" ? this.tajniKljucValueGenerated : this.tajniKljucValue,
          id: this.idValue,
          tipovi_korisnika_id: this.tipovi_korisnika_idValue
        };
        this.profilService.spremiPodatke(JSON.stringify(podaci), token);
        localStorage.setItem('korisnik', JSON.stringify(podaci));
      }
    );
  }
}
