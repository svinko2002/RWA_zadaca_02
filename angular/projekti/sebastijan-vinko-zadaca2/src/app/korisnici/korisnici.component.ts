import { Component } from '@angular/core';
import { KorisnikI } from '../servisi/interfaces/KorisnikI';
import { KorisniciService } from '../servisi/korisnici.service';
import { PrijavaService } from '../servisi/prijava.service';

@Component({
  selector: 'app-korisnici',
  templateUrl: './korisnici.component.html',
  styleUrl: './korisnici.component.scss'
})

export class KorisniciComponent {
  korisnici = new Array<KorisnikI>();
  isHidden = true;
  constructor(private korisniciServis: KorisniciService, private prijavaServis: PrijavaService) {}

  async ngOnInit() {
    if(this.prijavaServis.dajPrijavljenog().tipovi_korisnika_id == 2){
      this.isHidden = false;
      this.ucitajKorisnike();
    }else{
      this.isHidden = true;
    }
  }

  async obrisiKorisnika(korime: string){
    console.log(korime)
    await this.korisniciServis.obrisiKorisnika(korime);
    this.ucitajKorisnike();
  }

  async ucitajKorisnike() {
    let rezultat = await this.korisniciServis.dajSveKorisnike();
    if(rezultat != null){
      this.korisnici = rezultat;
    }
  }
}
