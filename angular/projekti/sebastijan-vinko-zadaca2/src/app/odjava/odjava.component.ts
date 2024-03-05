import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { PrijavaService } from '../servisi/prijava.service';

@Component({
  selector: 'app-odjava',
  templateUrl: './odjava.component.html',
  styleUrl: './odjava.component.scss'
})

export class OdjavaComponent {
  constructor (private router: Router, private prijavaServis: PrijavaService) {
    localStorage.removeItem('korisnik')
    this.prijavaServis.odjaviGithuba();
    setTimeout(() => {
      this.router.navigate(['/pocetna'])
    }, 1000);
  }
}
