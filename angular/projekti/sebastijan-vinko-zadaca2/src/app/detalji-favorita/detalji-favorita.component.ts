import { Component } from '@angular/core';
import { SezonaI } from '../servisi/interfaces/SezonaI';
import { FavoritiService } from '../servisi/favoriti.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-detalji-favorita',
  templateUrl: './detalji-favorita.component.html',
  styleUrl: './detalji-favorita.component.scss'
})

export class DetaljiFavoritaComponent {
  sezone = new Array<SezonaI>

  constructor(
    private lokacija: Location,
    private aktivnaPutanja: ActivatedRoute,
    private favoritiServis: FavoritiService
  ) {
    lokacija.onUrlChange((putanja) => {
      console.log(putanja);
    });
    aktivnaPutanja.paramMap.subscribe((parametri) => {
      let idSerije = parametri.get('id');
      if (idSerije != null) {
        if(!JSON.parse(localStorage.getItem('github')!!).opis){
          let s = favoritiServis.dajSezoneOdIzLocalStoragea(idSerije);
          if(s){
            this.sezone = s;
          }
        }else{
          favoritiServis.dajSezoneOd(idSerije).then((s: SezonaI[] | null) => {
            if (s) {
              this.sezone = s;
            }
          })
        }
      }
    });
  }

  dohvatiPosterPutanju(): string{
    return environment.posteriPutanja;
  }
}
