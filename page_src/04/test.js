window.onload = run();

function run() {
    // arrayTest();
    initDom();
}

function arrayTest() {
    var a = [];
    for (var i = 0; i < 10; i++) {
        a.push(i);
        console.log(a);
    }
    console.log('The array a is ' + a);
    for (var i = a.length; i > 0; i--) {
        console.log('The array length is ' + a.length)
        a.pop();
        console.log(i);
        console.log(a);
    }
}

function initDom() {
    var div1 = document.createElement('div');
    document.body.appendChild(div1);

    var labelUserName = document.createElement('label');
    labelUserName.setAttribute('for', 'username');
    labelUserName.innerHTML = "用户名: ";
    labelUserName.style.display = 'inline-block';
    labelUserName.style.width = '70px';
    labelUserName.style.margin = '5 0';
    div1.appendChild(labelUserName);

    var userNameInput = document.createElement('input');
    userNameInput.setAttribute('type', 'text');
    userNameInput.id = 'username';
    div1.appendChild(userNameInput);

    var div2 = document.createElement('div');
    document.body.appendChild(div2);

    var labelPassWord = document.createElement('label');
    labelPassWord.setAttribute('for', 'password');
    labelPassWord.innerHTML = "密   码: ";
    labelPassWord.style.display = 'inline-block';
    labelPassWord.style.width = '70px';
    div2.appendChild(labelPassWord);

    var inputPassWord = document.createElement('input');
    inputPassWord.setAttribute('type', 'password')
    inputPassWord.id = 'password';
    div2.appendChild(inputPassWord);


    var loginButton = document.createElement('button');
    loginButton.id = 'submit';
    loginButton.innerHTML = "登 录";
    loginButton.style.margin = '5 0 10 70';
    document.body.appendChild(loginButton);


    loginButton.addEventListener('click', function() {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value
        if (username == ""){
            alert("请输入用户名");
        }
        if (password == ""){
            alert("请输入密码");
        }
        login(username, password)


    });
}


function login(username, password) {
    var xmlhttp, loginUrl;
    loginUrl = "/api/login";
    user_id="username+"&password="+password";
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("POST", loginUrl, true);
    xmlhttp.send();
    console.log(xmlhttp.responseText);
}
