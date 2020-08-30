var profile = document.getElementById('profile');
var likeItem = document.getElementById('like_items');

profile.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'col-4');
likeItem.classList.add('row', 'col-12', 'p-0', 'd-flex', 'justify-content-center');

var username = localStorage.getItem('username');

window.onload = loadProfile(profile, username);
window.onload = loadPoke(likeItem, username);

function loadProfile(profile, username) {
    let avatar = document.createElement('img');
    avatar.classList.add('avatar');
    avatar.src = './img/small_logo.png';
    profile.appendChild(avatar);

    let name_item = document.createElement('div');
    name_item.classList.add('username');
    name_item.innerHTML = username;
    profile.appendChild(name_item);
};

async function loadPoke(parent, username) {
    await getLikePoke(username)
        .then(res => {
            return res.json();
        })
        .then(data => {
            data.forEach(ele => {
                var box = document.createElement('div');
                box.classList.add('box', 'col-3', 'mr-2', 'p-0', 'pointer');
                box.setAttribute('onclick', `getDetail(${ele.id})`);

                var box_img = document.createElement('div');
                box_img.classList.add('box_img', 'd-flex', 'justify-content-center', 'align-items-center');

                var box_content = document.createElement('div');
                box_content.classList.add('box_content');

                var img = document.createElement('img');
                img.classList.add('smallImg');
                img.setAttribute('style', 'height:50%;width:50%');
                img.src = ele.img;
                box_img.appendChild(img);

                // likePoke(box_img,ele.id);

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
                parent.appendChild(box);
            });
        });
    loginAccount();
};

function getLikePoke(username) {
    let url = `/LikePoke?username=${username}`;
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

async function loginAccount() {
    let username = localStorage.getItem('username');
    let id = [];
    if (username !== null) {
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
    //     await getLikePoke(username)
    //         .then(res => {
    //             return res.json();
    //         })
    //         .then(data => {
    //             for (var i = 0; i < data.length; i++) {
    //                 id.push(data[i].id);
    //             };
    //         });
    //     console.log(id);
    //     id.forEach(ele => {
    //         changeIcon(ele);
    // })
};

function changeIcon(id) {
    let icon = document.getElementById(`icon_1`);
    console.log(id)
    console.log(icon.src);
    // icon.setAttribute('src','http://127.0.0.1:8080/img/small_heart_fill.png');
    if (icon.src == 'http://127.0.0.1:8080/img/small_heart.png') {
        icon.setAttribute('src', 'http://127.0.0.1:8080/img/small_heart_fill.png');
        postLikePoke(id);
    } else {
        icon.src = 'http://127.0.0.1:8080/img/small_heart.png';
        deleteLikePoke(id);
    }
};

function postLikePoke(id) {
    let username = localStorage.getItem('username');
    let url = `/postLikePoke?id=${id}&&username=${username}`;
    fetch(url)
        .then(res => {
            return res.json();
        })
        .then(message => {
        })
};

function deleteLikePoke(id) {
    let username = localStorage.getItem('username');
    let url = `/deleteLikePoke?username=${username}&&id=${id}`
    fetch(url)
        .then(res => {
            return res.json();
        })
        .then(response => {
        });
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

