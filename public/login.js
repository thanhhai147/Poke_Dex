

var login_form = document.getElementById('login_form');
login_form.addEventListener('submit',e=>{
    console.log('ok')
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    postData(username,password)
    .then(res=>{
        return res.json();
    }).then(res=>{
        switch(res.message){
            case 'unique':
                alert('Your Username or Password is wrong!');
                break;
            case 'not_unique':
                alert('Login Success!');
                localStorage.setItem('username', username);
                window.location.assign('http://127.0.0.1:8080/home')
                break;
        }
    });
});

function postData(username,password){
    let url = `/login_account?username=${username}&&password=${password}`;
    return fetch(url);
};