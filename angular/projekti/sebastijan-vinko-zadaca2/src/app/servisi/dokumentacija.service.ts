import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DokumentacijaService {

  constructor(private http: HttpClient) {}

  async dajDokumentaciju(): Promise<String>{
    let o = await fetch("http://localhost:12000/dokumentacija");
    let podaci = await o.text();
    return podaci;
  }
}
