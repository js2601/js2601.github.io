const url = `https://js2601githubio-production.up.railway.app/`
function registerUser() {
    const user = localStorage.getItem('user');
    if (user == null) {
        let username = prompt("Enter a username: ");
        let password = prompt("Enter a password: ");
        fetch(`${url}register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: username,
              password: password
            })
        }).then(res => res.json());
        localStorage.setItem('user',username);
        localStorage.setItem('password',password);
    }
    fetch(`${url}login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: localStorage.getItem('user'),
          password: localStorage.getItem('password')
        })
    })
    fetch(`${url}setbal/1000`);
    let userData = fetch(url).then(res => res.json());
    console.log(userData);
}