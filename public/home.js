var limit = 12;
var offset = 1;
var host = '/get';

window.onload = showData();

async function showData() {
    var table = document.getElementById('table');
    table.classList.add('row', 'd-flex', 'justify-content-center')
    await getData(host, limit, offset)
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data)
            data.forEach(ele => {
                var box = document.createElement('div');
                box.classList.add('box', 'col-3', 'mr-2', 'pointer');

                var box_img = document.createElement('div');
                box_img.classList.add('box_img', 'd-flex', 'justify-content-center', 'align-items-center');

                var box_content = document.createElement('div');
                box_content.classList.add('box_content');
                box_content.setAttribute('onclick', `getDetail(${ele.id})`);

                var img = document.createElement('img');
                img.classList.add('smallImg');
                img.setAttribute('style', 'height:50%;width:50%');
                img.src = ele.img;
                box_img.appendChild(img);

                likePoke(box_img, ele.id);

                var background = document.createElement('div');
                background.classList.add('transition');

                var id = document.createElement('div');
                var strID = '';
                id.classList.add('id');
                if (ele.id > 0 && ele.id < 10) {
                    strID += `00${ele.id}`;
                }
                if (ele.id >= 10 && ele.id <= 99) {
                    strID += `0${ele.id}`;
                }
                if (ele.id > 99 && ele.id < 1000) {
                    strID += `${ele.id}`;
                }
                id.innerHTML = strID;
                box_content.appendChild(id);

                var name = document.createElement('div');
                name.classList.add('name');
                name.innerHTML = ele.name;
                box_content.appendChild(name);

                var types = document.createElement('div');
                types.classList.add('types', 'd-flex', 'justify-content-around', 'align-items-center')
                for (var i = 0; i < ele.types.length; i++) {
                    if (i == 0) {
                        background.classList.add(`${ele.types[i].type.name}_tag`)
                    }
                    var type = document.createElement('div');
                    type.classList.add('type', ele.types[i].type.name);
                    type.id = `slot_${i + 1}`;
                    type.innerHTML = ele.types[i].type.name;
                    types.appendChild(type);
                };
                box_content.appendChild(types);

                box_img.appendChild(background);
                box.appendChild(box_img);
                box.appendChild(box_content);
                table.appendChild(box);
            });
        });
    loginAccount();
};

function getData(host, limit, offset) {
    var url = `${host}?limit=${limit}&offset=${offset}`;
    return fetch(url);
};

function getDetail(id) {
    window.location.assign(`/pokemon?id=${id}`);
};

function redirect() {
    var id = document.getElementById('search').value;
    var search = document.getElementById('search_form');
    search.setAttribute('action', `/pokemon?id=${id}`);
    getDetail(id);
};

function loadmore() {
    offset += 12;
    showData();
};

function likePoke(container, id) {
    let like_icon = document.createElement('img');
    like_icon.classList.add('like_icon');
    let id_icon = `icon_${id}`;
    like_icon.id = id_icon;
    like_icon.src = './img/small_heart.png';
    like_icon.setAttribute('onclick', `changeIcon(${id})`);
    container.appendChild(like_icon);
};

async function loginAccount() {
    let username = localStorage.getItem('username');
    let id = [];
    if (username !== null) {
        await getLikePoke(username)
            .then(res => {
                return res.json();
            })
            .then(data => {
                for (var i = 0; i < data.length; i++) {
                    id.push(data[i].id);
                };
            });
        id.forEach(ele => {
            changeIcon(ele,username);
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

function changeIcon(id, username) {
    let icon = document.getElementById(`icon_${id}`);
    console.log(icon.src,id);
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