import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import path from 'path';

const moduleURL = new URL(import.meta.url);
const __dirname = path.dirname(moduleURL.pathname);

var express = require('express');
var bodyParser = require('body-parser');
var fs = require("fs")

var allAccounts = JSON.parse(fs.readFileSync(__dirname + "/accounts.json"));
var allEmails = JSON.parse(fs.readFileSync(__dirname + "/accounts_email.json"));

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(express.static('public'))
app.use(express.static('files'))

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/display", function(req, res) {
    console.log("display time")
    res.sendFile(__dirname + "/public/display.html");
});

app.get("/editor", function(req, res) {
    console.log("editor time")
    res.sendFile(__dirname + "/public/editor.html");
});

app.get("/home", function(req, res) {
    console.log("home time")
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/api/Upload", function(req, res) {
    console.log("yahoo!")
    var base64Data = req.body.img.toString().replace(/^data:image\/png;base64,/, "");
    console.log(req.body.em, req.body.usr)
    var buf = new Buffer(base64Data, 'base64');
    var d = new Date();
    var n = d.getTime().toString();
    var fname = "out_" + n + '_' + req.body.usr + ".png";
    allAccounts[req.body.usr].pictures.push(fname);
    allAccounts[req.body.usr].pictures_times.push(n);
    let data = JSON.stringify(allAccounts);
    fs.writeFileSync(__dirname + '/accounts.json', data);
    fs.writeFile(__dirname + "/images/" + fname, buf, 'base64', function(err) {
        console.log("yahoo!");
        res.send("Image received!")
    });
});

function base64_encode(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}

app.post("/api/Display", function(req, res) {
    var pics = [];
    var a = [];
    for (const [key, value] of Object.entries(allAccounts)) {
        pics.push([key, allAccounts[key].pictures, allAccounts[key].pictures_times])
    }
    console.log(pics)
    for (var i = 0; i < pics.length; i++){
        try {
            for (var j = 0; j < pics[i][1].length; j++){
                a.push([pics[i][0], base64_encode(__dirname + "/images/" + pics[i][1][j]), pics[i][2][j]])
            }
        } catch(err) {
            console.log("error parsing file", pics[i][1])
            console.log(err)
        }
    }
    console.log(a);
    res.send(a)
});

app.post("/api/goToDisplay", function(req, res){
    console.log("yahoo3");
    res.redirect('/display')
});

app.post("/api/goToEditor", function(req, res){
    console.log("yahoo3");
    res.redirect('/editor')
});

app.post("/api/goHome", function(req, res){
    console.log("yahoo4");
    res.redirect('/home')
});

app.post("/api/Login", function(req, res) {

    var usrname = req.body.username;
    var psword = req.body.password;
    var mail = req.body.email;

    console.log(mail)

    var newAccount = {
        username: usrname,
        password: psword,
        email: mail,
        pictures: [],
        pictures_times: []
    }

    var code = 0;

    if (mail == ""){
        if (allAccounts[usrname] != null){
            if (allAccounts[usrname].password == psword){
                code = 2;
            } else {
                code = 1;
            }
        } else {
            code = 1;
        }
    } else {
        if (allAccounts[usrname] != null){
            if (allAccounts[usrname].email != mail){
                code = 3
            } else {
                if (allAccounts[usrname].password == psword){
                    code = 2;
                } else {
                    code = 1;
                }
            }
        } else {
            code = 0;
        }
    }

    if (code == 0){
        allAccounts[usrname] = newAccount;
        allEmails[mail] = usrname;
        let data = JSON.stringify(allAccounts);
        let data2 = JSON.stringify(allEmails);
        fs.writeFileSync(__dirname + '/accounts.json', data);
        fs.writeFileSync(__dirname + '/accounts_email.json', data2);
        res.send("0")
    } else if (code == 1) {
        res.send("1")
    } else if (code == 2) {
        res.send("2")
    } else if (code == 3){
        res.send("3")
    }
});

app.listen(8000, function() {
    console.log('server up and running');
});



