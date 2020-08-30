
var href = window.location.href;
var id = href.replace('http://127.0.0.1:8080/pokemon?id=', '');


var url = `/detail?id=${id}`;
var chain = [];

window.onload = showData(url);

async function showData(url) {
    var data = await fetch(url)
        .then(res => {
            return res.json();
        })
        .then(data => {
            var dataObj = {};

            chain = data.chain;
            var IDchain = getID(chain);
            dataObj.IDchain = IDchain;
            dataObj.id = data.id;
            dataObj.name = data.name;
            dataObj.img = data.img;
            dataObj.types = data.types;
            dataObj.stats = data.stats;
            return dataObj;
        });

    var contain = document.getElementById('container');
    contain.classList.add('d-flex','flex-column','align-items-center');

    var title_box = document.createElement('div');
    title_box.classList.add('title_box', 'col-5', 'd-flex', 'flex-column', 'align-items-center');

    var main_box = document.createElement('div');
    main_box.classList.add('main_box', 'row', 'd-flex', 'align-items-center');

    var content_box = document.createElement('div');
    content_box.classList.add('content_box', 'col-7');

    var img_box = document.createElement('div');
    img_box.classList.add('img_box', 'col-5', 'd-flex', 'justify-content-center', 'align-items-center');

    var id = document.createElement('div');
    var strID = '';
    id.classList.add('id');
    if (data.id < 10) {
        strID += `00${data.id}`;
    }
    if (data.id >= 10 && data.id <= 99) {
        strID += `0${data.id}`;
    }
    if (data.id > 99 && data.id <= 999) {
        strID += data.id;
    };
    id.innerHTML = strID;
    title_box.appendChild(id);

    var name = document.createElement('div');
    name.classList.add('name');
    name.innerHTML = data.name;
    title_box.appendChild(name);
    contain.appendChild(title_box);

    var img = document.createElement('img');
    img.classList.add('bigImg');
    img.src = data.img;
    img_box.appendChild(img);

    var types = document.createElement('div');
    types.classList.add('types', 'd-flex', 'align-items-center', 'justify-content-around');
    for (var i = 0; i < data.types.length; i++) {
        var type = document.createElement('div');
        type.classList.add("type", data.types[i].type.name);
        type.id = `slot_${i + 1}`;
        type.innerHTML = data.types[i].type.name;
        types.appendChild(type);
    };
    content_box.appendChild(types);

    var stats = document.createElement('div');
    stats.classList.add('stats', 'd-flex', 'flex-column', 'justify-content-center');
    for (var i = 0; i < data.stats.length; i++) {
        var stat = document.createElement('div');
        stat.classList.add('stat');

        var stat_title = document.createElement('div');
        stat_title.classList.add('stat_title');
        stat_title.innerHTML = data.stats[i].stat.name;
        stat.appendChild(stat_title);

        var progressbar = document.createElement('div');
        progressbar.classList.add('stat_bar', 'progress');
        progressbar.setAttribute('style', 'height:24px')

        var stat_point = document.createElement('div');
        var pointStr = parseInt(data.stats[i].base_stat);
        var point = pointStr / 22.5 * 10;
        stat_point.classList.add('stat_point', 'progress-bar');
        stat_point.setAttribute('role', 'progressbar');
        stat_point.setAttribute('style', `width:${point}%`);
        stat_point.setAttribute('aria-valuenow', point);
        stat_point.setAttribute('aria-valuemin', '0');
        stat_point.setAttribute('aria-valuemax', '100');
        progressbar.appendChild(stat_point);

        stat.appendChild(progressbar)

        stats.appendChild(stat);
    };
    content_box.appendChild(stats);

    main_box.appendChild(img_box);
    main_box.appendChild(content_box);
    contain.appendChild(main_box);

    likePoke(img_box,data.id);
    loginAccount(data.id);

    var chain = document.createElement('div');
    chain.classList.add('chain', 'row','d-flex','justify-content-center');
    contain.appendChild(chain);

    getChain(data.IDchain, chain);
};

function getID(chain) {
    for (var i = 0; i < chain.length; i++) {
        for (j = 0; j < chain[i].length; j++) {
            var url = chain[i][j];
            var id = url.replace('https://pokeapi.co/api/v2/pokemon-species/', '');
            chain[i][j] = id;
        };
    };
    return chain;
};

async function getChain(chain, parent) {
    for (var i = 0; i < chain.length; i++) {
        if(chain[i].length>1){
            var level = document.createElement('div');
            level.classList.add('level','col-8','d-flex','flex-row');
        }else{
            var level = document.createElement('div');
            level.classList.add('level','col-3');
        };

        for (var j = 0; j < chain[i].length; j++) {
            var length=chain[i].length;
            await getEle(chain[i][j])
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    var ele = document.createElement('div');
                    ele.classList.add('ele', 'd-flex', 'flex-column', 'align-items-center');
                    ele.setAttribute('onclick',`moveto(${data.id})`);
                    if(length>1){
                        ele.classList.add('col-3')
                    };

                    var img = document.createElement('img');
                    img.classList.add('smallImg');
                    img.src = data.img;
                    ele.appendChild(img);

                    var id = document.createElement('div');
                    var strID = '';
                    id.classList.add('smallId');
                    if (data.id < 10) {
                        strID += `00${data.id}`;
                    }
                    if (data.id >= 10 && data.id <= 99) {
                        strID += `0${data.id}`;
                    }
                    if (data.id > 99 && data.id <= 999) {
                        strID += data.id;
                    };
                    id.innerHTML = strID;
                    ele.appendChild(id);

                    var name = document.createElement('div');
                    name.classList.add('smallName');
                    name.innerHTML = data.name;
                    ele.appendChild(name);

                    var types = document.createElement('div');
                    types.classList.add('d-flex', 'flex-column', 'align-items-center')
                    for (var i = 0; i < data.types.length; i++) {
                        var type = document.createElement('div');
                        type.classList.add('smallType', data.types[i].type.name)
                        type.id = `slot_${i + 1}`;
                        type.innerHTML = data.types[i].type.name;
                        types.appendChild(type);
                    };
                    ele.appendChild(types);

                    level.appendChild(ele);
                });
        };

        parent.appendChild(level);

        if (i < chain.length - 1) {
            var arrow_box = document.createElement('div');
            arrow_box.classList.add('arrow_box', 'col-1', 'd-flex', 'justify-content-center', 'align-items-center');
            var arrow = document.createElement('img');
            arrow.classList.add('arrow')
            arrow.src = './img/next.png';
            arrow_box.appendChild(arrow);
            parent.appendChild(arrow_box);
        };
    };

};

function getEle(id) {
    var url = `/detail?id=${id}`;
    return fetch(url);
};

function moveto(id) {
    window.location.assign(`/pokemon?id=${id}`);
};

function likePoke(container, id) {
    let like_icon = document.createElement('img');
    like_icon.classList.add('like_icon');
    let id_icon = `icon_${id}`;
    like_icon.id = id_icon;
    like_icon.src = './img/small_heart.png';
    like_icon.setAttribute('onclick', `changeIcon(${id})`);
    container.appendChild(like_icon);
    console.log('1');
};

async function loginAccount(id) {
    let username = localStorage.getItem('username');
    let id_chain = [];
    if (username !== null) {
        await getLikePoke(username)
            .then(res => {
                return res.json();
            })
            .then(data => {
                for (var i = 0; i < data.length; i++) {
                    if(data[i].id==id){
                        id_chain.push(data[i].id);
                    }
                };
            });
        id_chain.forEach(ele => {
            console.log('2')
            changeIcon(ele);
        })
        let title_box = document.getElementById('title_box');
        title_box.remove();

        let bar = document.getElementById('meditate');

        let profile_box = document.createElement('div');
        profile_box.classList.add('profile_box');
        bar.appendChild(profile_box);

        let avatar = document.createElement('img');
        avatar.classList.add('avatar');
        avatar.src = '';
        profile_box.appendChild(avatar);

        let profile = document.createElement('a');
        profile.classList.add('profile');
        profile.href = 'http://127.0.0.1:8080/dashboard';
        profile.innerHTML = username;
        profile_box.appendChild(profile);
    };
};

function postLikePoke(id) {
    let username = localStorage.getItem('username');
    let url = `/postLikePoke?id=${id}&&username=${username}`;
    fetch(url)
        .then(res => {
            return res.json();
        })
        .then(message => {
            console.log(message)
        })
};

function getLikePoke(username) {
    let url = `/LikePoke?username=${username}`;
    return fetch(url);
};

function changeIcon(id) {
    console.log(id)
    let icon = document.getElementById(`icon_${id}`);
    if(icon.src == 'http://127.0.0.1:8080/img/small_heart.png'){
        console.log('not')
        icon.setAttribute('src','http://127.0.0.1:8080/img/small_heart_fill.png');
        postLikePoke(id);
    }else{
        console.log('yes')
        icon.src = 'http://127.0.0.1:8080/img/small_heart.png';
        deleteLikePoke(id);
    }
};

function deleteLikePoke(id) {
    let username = localStorage.getItem('username');
    let url = `/deleteLikePoke?username=${username}&&id=${id}`
    fetch(url)
        .then(res => {
            return res.json();
        })
        .then(response => {
            console.log(response);
        });
};
