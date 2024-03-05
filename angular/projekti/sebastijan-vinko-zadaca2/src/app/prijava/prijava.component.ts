import { Component } from '@angular/core';
import { PrijavaService } from '../servisi/prijava.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrl: './prijava.component.scss'
})

export class PrijavaComponent {
  constructor(private recaptchaV3Service: ReCaptchaV3Service, private router: Router) { }
  siteKey = '6LfrJUApAAAAAF7b7xTdOPJkhjxwBJmyz5bY3_sn';
  action = 'prijava';

  async onSubmit(formaZaPrijavu: NgForm) {
    this.recaptchaV3Service.execute(this.action)
      .subscribe(async (token) => {
        console.log('reCAPTCHA Token:', token);
        let prijavaServis = new PrijavaService;
        let korime = formaZaPrijavu.value.korime;
        let lozinka = formaZaPrijavu.value.lozinka;
        let tajniKljuc = formaZaPrijavu.value.tajniKljuc;
        let korisnik = await prijavaServis.prijaviKorisnika(korime, lozinka, token, tajniKljuc)
        if(korisnik){
          console.log("Uspješna prijava")
          localStorage.setItem('korisnik', korisnik);
          this.router.navigate(['/pocetna'])
        }else{
          console.log("Neuspješna prijava")
        }
      }
    );
  } 

  async loginWithGitHub(){    
    window.location.href = 'http://localhost:12000/login/github';
  }
}
