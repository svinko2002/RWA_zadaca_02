const KorisnikDAO = require("./korisnikDAO.js");
const FavoritDAO = require("./favoritDAO.js");
const kodovi = require("../aplikacija/moduli/kodovi.js");
const { parse } = require("base32-encoding");

exports.getKorisnici = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let kdao = new KorisnikDAO();
	kdao.dajSve().then((korisnici) => {
		odgovor.status(200)
		odgovor.send(JSON.stringify(korisnici));
	});
};

exports.postKorisnici = async function (zahtjev, odgovor) {
	const token = zahtjev.body.token;
	let recaptchaStatus = await provjeriCaptchu(token);
	if(recaptchaStatus.success && recaptchaStatus.score > 0.5){
		odgovor.type("application/json");
		let podaci = zahtjev.body;
		let kdao = new KorisnikDAO();
		if(podaci.email == null || podaci.email == undefined || podaci.email == ""){
			odgovor.status(417)
			return odgovor;
		}
		if(podaci.korime == null || podaci.korime == undefined || podaci.korime == ""){
			odgovor.status(417)
			return odgovor;
		}
		if(podaci.pocetna_lozinka == null || podaci.pocetna_lozinka == undefined || podaci.pocetna_lozinka == ""){
			odgovor.status(417)
			return odgovor;
		}
		let provjeriEmail = await kdao.provjeriEmail(podaci.email).then((podaci) => podaci)
		let provjeriKorime = await kdao.provjeriKorime(podaci.korime).then((podaci) => podaci)

		if(!provjeriEmail && !provjeriKorime){
			podaci.lozinka = kodovi.kreirajSHA256(podaci.pocetna_lozinka, "Sebastijan Vinko"),
			kdao.dodaj(podaci).then((poruka) => {
				odgovor.status(201)
				odgovor.send(JSON.stringify(poruka));
			});
		}
	} else {
		odgovor.status(400).json({ success: false, message: 'Verification failed' });
	}
};

exports.putKorisnici = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(501);
	let poruka = { opis: "metoda nije implementirana" };
	odgovor.send(JSON.stringify(poruka));
};

exports.deleteKorisnici = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(501);
	let poruka = { opis: "metoda nije implementirana" };
	odgovor.send(JSON.stringify(poruka));
};

exports.getKorisnik = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let kdao = new KorisnikDAO();
	let korime = zahtjev.params.korime;
	kdao.daj(korime).then((korisnik) => {
		if(korisnik == null){
			odgovor.status(400)
			odgovor.send({opis:"krivi podaci"})
		}else{
			odgovor.status(200)
			odgovor.send(JSON.stringify(korisnik));
		}
	});
};

exports.postKorisnik = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(405);
	let poruka = { opis: "zabranjeno" };
	odgovor.send(JSON.stringify(poruka));
};

exports.putKorisnik = async function (zahtjev, odgovor) {
	const token = zahtjev.body.token;
	let recaptchaStatus = await provjeriCaptchu(token);
	if(recaptchaStatus.success && recaptchaStatus.score > 0.5){
		odgovor.type("application/json");
		let korime = zahtjev.params.korime;
		let podaci = zahtjev.body.korisnik;
		let kdao = new KorisnikDAO();
		kdao.azuriraj(korime, podaci).then((poruka) => {
			odgovor.status(201)
			odgovor.send(JSON.stringify(poruka));
		});
	} else {
		odgovor.status(400).json({ success: false, message: 'Verification failed' });
	}
};

exports.deleteKorisnik = async function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let kdao = new KorisnikDAO();
	let fdao = new FavoritDAO();
	let korime = zahtjev.params.korime;
	let korisnik = await kdao.daj(korime)
	await fdao.obrisiSveFavoriteOd(korisnik.id)
	await kdao.obrisi(korime).then((korisnik) => {
		odgovor.status(201)
		odgovor.send(JSON.stringify(korisnik));
	});
};


exports.getKorisnikPrijava = async function (zahtjev, odgovor) {
	if(zahtjev.method == "POST"){
		const token = zahtjev.body.token;
		let recaptchaStatus = await provjeriCaptchu(token);
		if(recaptchaStatus.success && recaptchaStatus.score > 0.5){
			odgovor.type("application/json");
			let kdao = new KorisnikDAO();
			let korime = zahtjev.params.korime;
			kdao.daj(korime).then((korisnik) => {
				lozinka = kodovi.kreirajSHA256(zahtjev.body.lozinka, "Sebastijan Vinko");
				if (korisnik != null && korisnik.lozinka == lozinka){
					if(korisnik.citajTajniKljuc){
						if(korisnik.tajniKljuc == zahtjev.body.tajniKljuc){
							odgovor.status(201)
							odgovor.send(JSON.stringify(korisnik));
						}else{
							odgovor.status(400);
							odgovor.send(JSON.stringify({ opis: "krivi podaci tajnog kljuca" }));
						}
					}else{
						odgovor.status(201)
						odgovor.send(JSON.stringify(korisnik));
					}
				}
				else {
					odgovor.status(400);
					odgovor.send(JSON.stringify({ opis: "krivi podaci" }));
				}
			});
		} else {
			odgovor.status(400).json({ success: false, message: 'Verification failed' });
		}
	}

	if(zahtjev.method == "PUT" || zahtjev.method == "DELETE"){
		odgovor.type("application/json");
		odgovor.status(501);
		let poruka = { opis: "metoda nije implementirana" };
		odgovor.send(JSON.stringify(poruka));
	}
};

provjeriCaptchu = async function(token){
	parametri = {method: "POST"};
	let o = await fetch("https://www.google.com/recaptcha/api/siteverify?secret=6LcUA0gpAAAAAORnc1ZxsiNsUFJHtyIcqwPnGh7L&response=" + token, parametri);
	let recaptchaStatus = JSON.parse(await o.text());
	console.log(recaptchaStatus);
	return recaptchaStatus;
}