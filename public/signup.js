var host = '/checkaccount';

var sign_up = document.getElementById('signup_form');
sign_up.addEventListener('submit',(e)=>{
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    postData(host,username,password)
    .then(res=>{
        return res.json();
    })
    .then(res=>{
        if(res.message=='unique'){
            alert('Sign up success!');
            window.location.assign('http://127.0.0.1:8080/login');
        }else{
            alert('Your Username or Password has already been used! Try again.');
        };
    });
});

function postData(host,username,password){
    var url = `${host}?username=${username}&&password=${password}`;
    return fetch(url);
};