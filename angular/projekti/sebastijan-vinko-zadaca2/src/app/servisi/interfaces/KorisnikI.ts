export interface KorisnikI {
    id: number;
    tipovi_korisnika_id: number;
    korime: string;
    lozinka: string;
    email: string;
    ime: string;
    prezime: string;
    godina_rodjenja: string;
    drzava: string;
    zupanija: string;
    citajTajniKljuc: boolean;
    tajniKljuc: string;
}
