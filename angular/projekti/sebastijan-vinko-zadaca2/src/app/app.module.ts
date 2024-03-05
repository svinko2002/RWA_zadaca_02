import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PretrazivanjeSerijaComponent } from './pretrazivanje-serija/pretrazivanje-serija.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DokumentacijaComponent } from './dokumentacija/dokumentacija.component';

import { DokumentacijaService } from './servisi/dokumentacija.service';
import { HttpClientModule } from '@angular/common/http';
import { DetaljiSerijeComponent } from './detalji-serije/detalji-serije.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { ProfilComponent } from './profil/profil.component';
import { PretrazivanjeFavoritaComponent } from './pretrazivanje-favorita/pretrazivanje-favorita.component';
import { KorisniciComponent } from './korisnici/korisnici.component';
import { OdjavaComponent } from './odjava/odjava.component';
import { DetaljiFavoritaComponent } from './detalji-favorita/detalji-favorita.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { QRCodeModule } from 'angularx-qrcode';
import { environment } from '../environments/environment';

const routes: Routes = [
  { path: '', redirectTo: '/pocetna', pathMatch: 'full' },
  { path: 'pocetna', component: PretrazivanjeSerijaComponent },
  { path: 'prijava', component: PrijavaComponent },
  { path: 'odjava', component: OdjavaComponent },
  { path: 'registracija', component: RegistracijaComponent },
  { path: 'dokumentacija', component: DokumentacijaComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'favoriti', component: PretrazivanjeFavoritaComponent },
  { path: 'korisnici', component: KorisniciComponent },
  { path: 'dnevik', component: PretrazivanjeSerijaComponent },
  { path: 'detalji/:id', component: DetaljiSerijeComponent },
  { path: 'detaljiFavorita/:id', component: DetaljiFavoritaComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    PretrazivanjeSerijaComponent,
    DokumentacijaComponent,
    DetaljiSerijeComponent,
    PrijavaComponent,
    ProfilComponent,
    PretrazivanjeFavoritaComponent,
    KorisniciComponent,
    OdjavaComponent,
    DetaljiFavoritaComponent,
    RegistracijaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    RecaptchaV3Module,
    QRCodeModule
  ],
  providers: [
    DokumentacijaService,
      { 
        provide: RECAPTCHA_V3_SITE_KEY, 
        useValue: environment.recaptchaSITEKEY
      },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
