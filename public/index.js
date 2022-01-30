const btn = document.getElementById('btn');
const form = document.getElementById('login-form');

console.log(form);
console.log(btn);



form.addEventListener('submit', async function (e) {
    e.preventDefault();

    btn.disabled = true;
    setTimeout(() => {
        btn.disabled = false;
    }, 2000);
    var user = document.getElementsByName('username');
    var pass = document.getElementsByName('password');
    var json = 'username=' + user[0].value + '&password=' + pass[0].value;
    const res = await fetch("http://localhost:3000/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: json
    });
    let result = await res.json();
    alert(result.msg);
    console.log(res);
    console.log(result);
})