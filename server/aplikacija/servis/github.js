let client_id = 'a0acc3bd37316e68afa7';
let client_secret = '219efd99848438f290fa0eaf0bbcf9e919903a93'

exports.githubPrijava = async function (zahtjev, odgovor) {
    odgovor.redirect(`https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=http://localhost:12000/githubPovratno`);
};
exports.githubOdjava = async function (zahtjev, odgovor) {
    zahtjev.session.github = null
    odgovor.redirect("/")
};

exports.getGithub = async function (zahtjev, odgovor) {
    console.log(zahtjev.session)
    if(zahtjev.session.github){
        odgovor.status(200);
        odgovor.send({github: zahtjev.session.github})
    }else{
        odgovor.status(417);
        odgovor.send({opis: "niste prijavljeni preko githuba"});
    }
};

exports.githubPovratno = async function (zahtjev, odgovor) {
    let parametri = {
        method: "POST",
        headers: {Accept: "application/json"}
    }
    let urlParametri = "?client_id=" + client_id + "&client_secret=" + client_secret + "&code=" + zahtjev.query.code;
    let o = await fetch("https://github.com/login/oauth/access_token" + urlParametri, parametri);
    let podaci = await o.text();
    let access_token = JSON.parse(podaci).access_token;
    let parametri2 = {
        method: "GET",
        headers: {Authorization: "Bearer " + access_token}
    }
    let o2 = await fetch("https://api.github.com/user",parametri2);
    let podaci2 = await o2.text();
    zahtjev.session.github = podaci2
    console.log(zahtjev.session)
    odgovor.redirect('/');
};
