import { Component } from '@angular/core';
import { SerijeTMDBI } from './servisi/interfaces/SerijeTMDBI';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PrijavaService } from './servisi/prijava.service';
import { KorisnikI } from './servisi/interfaces/KorisnikI';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  title = 'SebastijanVinkoZadaca2';
  serija: SerijeTMDBI | null = null;
  putanja = 'pocetna';
  obican = true;
  admin = true;
  profil = true;
  prijavljen = this.prijavaServis.dajPrijavljenog();

  constructor(
    private lokacija: Location,
    private aktivnaPutanja: ActivatedRoute,
    private prijavaServis: PrijavaService
  ) {
    lokacija.onUrlChange(async (putanja) => {
      this.prijavljen = this.prijavaServis.dajPrijavljenog() as KorisnikI;
      if(this.prijavljen){
        this.obican = false;
        this.profil = false;
        if(this.prijavljen.tipovi_korisnika_id == 2){
          this.admin = false;
        }
        return;
      }else{
        this.obican = true;
        this.admin = true;
        this.profil = true;
      }

      let o = await this.prijavaServis.dajPrijavljenogGithub();
      if(!JSON.parse(localStorage.getItem('github')!!).opis){
        this.obican = false;
      }else{
        this.obican = true;
      }
    });
  }
}
