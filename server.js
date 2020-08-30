const fs = require('fs');
const http = require('http');
const fetch = require('node-fetch');

var accounts = [{ username: 'thanhhai', password: '123456' }];
var likePoke = [{username:'thanhhai', id:[1,2,3]}];


http.createServer((req, res) => {
    var url = req.url;
    if (url.search('/get') == 0) {
        var query = new URL(url, `http://${req.headers.host}`).searchParams;
        url = '/get';
    };
    if (url.includes('/pokemon') && url.includes('id')) {
        url = '/pokemon';
    };
    if (url.includes('/home') && url.includes('id')) {
        url = '/pokemon';
    };
    if (url.search('/detail') == 0) {
        var queryID = new URL(url, `http://${req.headers.host}`).searchParams;
        url = '/detail';
    };
    if (url.search('/img') == 0) {
        var path = url;
        url = '/img';
    };
    if (url.search('/checkaccount') == 0) {
        var querySignUp = new URL(url, `http://${req.headers.host}`).searchParams;
        url = '/checkaccount';
    };
    if (url.search('/login_account') == 0) {
        var queryLogin = new URL(url, `http://${req.headers.host}`).searchParams;
        url = 'login_account';
    };
    if (url.search('/postLikePoke') == 0) {
        var queryPostLikePoke = new URL(url, `http://${req.headers.host}`).searchParams;
        url = '/postLikePoke';
    };
    if (url.search('/LikePoke') == 0) {
        var queryGetLikePoke = new URL(url, `http://${req.headers.host}`).searchParams;
        url = '/getLikePoke';
    };
    if(url.search('/deleteLikePoke')==0){
        var queryDeleteLikePoke = new URL(url, `http://${req.headers.host}`).searchParams;
        url = '/deleteLikePoke';
    };
    console.log(url);
    switch (url) {
        case '/home':
            fs.readFile('./public/home.html', (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end('404');
                    throw err;
                } else {
                    res.writeHead(200, { 'Content-type': 'text/html' });
                    res.write(data.toString());
                    res.end();
                };
            });
            break;
        case '/home.css':
            fs.readFile('./public/home.css', (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-type': 'text/css' });
                    res.end('404');
                    throw err;
                } else {
                    res.writeHead(200, { 'Content-type': 'text/css' });
                    res.write(data.toString());
                    res.end();
                };
            });
            break;
        case '/home.js':
            fs.readFile('./public/home.js', (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-type': 'text/js' });
                    res.end('404');
                    throw err;
                } else {
                    res.writeHead(200, { 'Content-type': 'text/js' });
                    res.write(data.toString());
                    res.end();
                };
            });
            break;
        case '/get':
            var limit = query.get('limit');
            var offset = query.get('offset');
            var apiURL = 'https://pokeapi.co/api/v2/pokemon';
            getPokemonID(apiURL, parseInt(limit), parseInt(offset))
                .then(data => {
                    res.writeHead(200, { 'Content-type': 'text/plain' });
                    res.end(JSON.stringify(data));
                })
                .catch(err => {
                    if (err) { throw err };
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end(JSON.stringify('404'));
                });
            break;
        case '/pokemon':
            fs.readFile('./public/pokemon.html', (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-type': 'text/html' });
                    res.end('404');
                    throw err;
                } else {
                    res.writeHead(200, { 'Content-type': 'text/html' });
                    res.write(data.toString());
                    res.end();
                };
            });
            break;
        case '/pokemon.css':
            fs.readFile('./public/pokemon.css', (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-type': 'text/css' });
                    res.end('404');
                    throw err;
                } else {
                    res.writeHead(200, { 'Content-type': 'text/css' });
                    res.write(data.toString());
                    res.end();
                };
            });
            break;
        case '/pokemon.js':
            fs.readFile('./public/pokemon.js', (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-type': 'text/js' });
                    res.end('404');
                    throw err;
                } else {
                    res.writeHead(200, { 'Content-type': 'text/js' });
                    res.write(data.toString());
                    res.end();
                };
            });
            break;
        case '/detail':
            var id = queryID.get('id');
            var apiURL = `https://pokeapi.co/api/v2/pokemon`;
            console.log(id)
            getDetail(apiURL, id)
                .then(data => {
                    res.writeHead(200, { 'Content-type': 'text/plain' });
                    res.end(JSON.stringify(data));
                })
                .catch(err => {
                    console.log(err);
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end('404');
                });
            break;
        case '/img':
            fs.readFile(`public${path}`, (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end('404');
                    throw err;
                } else {
                    res.writeHead(200, { 'Content-type': 'image/png' });
                    res.write(data);
                    res.end();
                };
            });
            break;
        case '/checkaccount':
            var username = querySignUp.get('username');
            var password = querySignUp.get('password');
            var response = checkUnique(username, password);
            if (response == 'unique') {
                let account = {};
                account.username = username;
                account.password = password;
                accounts.push(account);
            };
            res.end(JSON.stringify({ message: response }));
            break;
        case 'login_account':
            var username = queryLogin.get('username');
            var password = queryLogin.get('password');
            var response = checkUnique(username, password);
            res.end(JSON.stringify({ message: response }));
            break;
        case '/login':
            fs.readFile('./public/login.html', (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end('404');
                    throw err;
                } else {
                    res.writeHead(200, { 'Content-type': 'text/html' });
                    res.write(data.toString());
                    res.end();
                };
            });
            break;
        case '/login.css':
            fs.readFile('./public/login.css', (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end('404');
                    throw err;
                } else {
                    res.writeHead(200, { 'Content-type': 'text/css' });
                    res.write(data.toString());
                    res.end();
                };
            });
            break;
        case '/login.js':
            fs.readFile('./public/login.js', (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end('404');
                    throw err;
                } else {
                    res.writeHead(200, { 'Content-type': 'text/js' });
                    res.write(data.toString());
                    res.end();
                };
            });
            break;
        case '/sign_up':
            fs.readFile('./public/signup.html', (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end('404');
                    throw err;
                } else {
                    res.writeHead(200, { 'Content-type': 'text/html' });
                    res.write(data.toString());
                    res.end();
                };
            });
            break;
        case '/signup.css':
            fs.readFile('./public/signup.css', (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end('404');
                    throw err;
                } else {
                    res.writeHead(200, { 'Content-type': 'text/css' });
                    res.write(data.toString());
                    res.end();
                };
            });
            break;
        case '/signup.js':
            fs.readFile('./public/signup.js', (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end('404');
                    throw err;
                } else {
                    res.writeHead(200, { 'Content-type': 'text/js' });
                    res.write(data.toString());
                    res.end();
                };
            });
            break;
        case '/dashboard':
            fs.readFile('./public/dashboard.html', (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end('404');
                    throw err;
                } else {
                    res.writeHead(200, { 'Content-type': 'text/html' });
                    res.write(data.toString());
                    res.end();
                };
            });
            break;
        case '/dashboard.css':
            fs.readFile('./public/dashboard.css', (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end('404');
                    throw err;
                } else {
                    res.writeHead(200, { 'Content-type': 'text/css' });
                    res.write(data.toString());
                    res.end();
                };
            });
            break;
        case '/dashboard.js':
            fs.readFile('./public/dashboard.js', (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end('404');
                    throw err;
                } else {
                    res.writeHead(200, { 'Content-type': 'text/js' });
                    res.write(data.toString());
                    res.end();
                };
            });
            break;
        case '/postLikePoke':
            var id = queryPostLikePoke.get('id');
            var username = queryPostLikePoke.get('username');
            var response = postLikePoke(id, username);
            res.writeHead(200, { 'Content-type': 'text/plain' });
            res.end(JSON.stringify(response));
            break;
        case '/getLikePoke':
            var username = queryGetLikePoke.get('username');
            var id = likePoke.map(value => {
                if (value.username == username) {
                    return value.id;
                };
            });
            var apiURL = 'https://pokeapi.co/api/v2/pokemon';
            getPokemonIDs(id[0], apiURL)
                .then(data => {
                    res.writeHead(200, { 'Content-type': 'text/plain' });
                    res.end(JSON.stringify(data));
                });
            break;
        case '/deleteLikePoke':
            var username = queryDeleteLikePoke.get('username');
            var id = queryDeleteLikePoke.get('id');
            var response = deleteLikePoke(id,username);
            res.writeHead(200,{'Content-type': 'text/plain'});
            console.log(response);
            res.end(JSON.stringify(response));
            break;
    };

}).listen(8080,()=>{
    console.log(`Running at http://localhost:${8080}`)
});

function deleteLikePoke(id,username){
    for(var i=0;i<likePoke.length;i++){
        if(likePoke[i].username == username){
            let index = likePoke[i].id.indexOf(id);
            likePoke[i].id.splice(index,1);
            return 'done';
        };
    };
};

function getPokemonIDs(id, url) {
    return Promise.all(id.map(value => {
        let promise = new Promise((resolve, rejects) => {
            fetch(`${url}/${value}`)
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    var dataPoke = {
                        id: data.id,
                        name: data.name,
                        types: data.types,
                        stats: data.stats,
                        img: data.sprites.other['official-artwork'].front_default,
                        species: data.species.url,
                    };
                    resolve(dataPoke);
                });
        });     
        return promise;
    }));     
};

function getPokemonID(url, limit, offset) {
    var dataArray = [];
    limit += offset - 1;
    for (var i = offset; i <= limit; i++) {
        dataArray.push(i);
    };
    return Promise.all(dataArray.map(value => {
        let promise = new Promise((resolve, rejects) => {
            fetch(`${url}/${value}`)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    var dataPoke = {
                        id: data.id,
                        name: data.name,
                        types: data.types,
                        stats: data.stats,
                        img: data.sprites.other['official-artwork'].front_default,
                        species: data.species.url,
                    };
                    resolve(dataPoke);
                });
        });
        return promise;
    }));
};

async function getPokemonName(url, name) {
    var dataArray = [];
    await fetch(`${url}/${name}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            var dataPoke = {
                id: data.id,
                name: data.name,
                types: data.types,
                stats: data.stats,
                img: data.sprites.other['official-artwork'].front_default,
                species: data.species.url,
            };
            dataArray.push(dataPoke);
        });
    return dataArray;
};

async function getDetail(url, id) {
    var dataObj = {};
    var speciesURL = '';

    var arrCheck = '1234567890'.split('');
    if (arrCheck.includes(id[0])) {
        var data = await getPokemonID(url, 1, parseInt(id));
    } else {
        var data = await getPokemonName(url, id);
    };

    var dataPoke = {
        id: data[0].id,
        name: data[0].name,
        types: data[0].types,
        stats: data[0].stats,
        img: data[0].img,
    };
    dataObj = dataPoke;
    speciesURL = data[0].species;
    var chainURL = await fetch(speciesURL)
        .then(res => {
            return res.json();
        })
        .then(data => {
            return data.evolution_chain.url;
        });

    await fetch(chainURL)
        .then(response => {
            return response.json();
        })
        .then(data => {
            var arrChain = [];
            checkInvolve([data.chain], arrChain);
            dataObj.chain = arrChain;
        });
    return dataObj;
};

function checkInvolve(data, arrChain) {
    var arr = [];
    data.forEach(ele => {
        arr.push(ele.species.url);
        if (ele.evolves_to.length > 0) {
            checkInvolve(ele.evolves_to, arrChain);
        };
    });
    arrChain.unshift(arr);
};

function checkUnique(username, password) {
    console.log(accounts)
    let response = '';
    for (var i = 0; i < accounts.length; i++) {
        if (accounts[i].username == username || accounts[i].password == password) {
            response = 'not_unique';
            return response;
        };
    };

    response = 'unique';
    return response;
};

function postLikePoke(id, username) {
    for (var i = 0; i < likePoke.length; i++) {
        if (likePoke[i].username == username) {
            for (var j = 0; j < likePoke[i].id.length; j++) {
                if (likePoke[i].id[j] == id) {
                    return 'done';
                };
            };
            likePoke[i].id.push(id);
            return 'done';
        };
    };

    let pokeObj = {};
    pokeObj.username = username;
    pokeObj.id = [id];
    likePoke.push(pokeObj);
    return 'done';
};

