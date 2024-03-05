import { Component } from '@angular/core';
import { DokumentacijaService } from '../servisi/dokumentacija.service';

@Component({
  selector: 'app-dokumentacija',
  templateUrl: './dokumentacija.component.html',
  styleUrl: './dokumentacija.component.scss'
})

export class DokumentacijaComponent {
  rawHtml: String | undefined;

  constructor(private dokumentacija: DokumentacijaService) {}

  async ngOnInit() {
    this.rawHtml = await this.dokumentacija.dajDokumentaciju();
  }
}
