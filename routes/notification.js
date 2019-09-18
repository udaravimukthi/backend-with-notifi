const express = require('express');
const router = express.Router();
const passport = require('passport');
const Message = require('../models/message');

var admin = require("firebase-admin");

var serviceAccount = require("../notification-fde31-firebase-adminsdk-b58f3-728fed4b9b.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://notification-fde31.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("Server");

var notiRef = ref.child("notifications");


router.post('/addNotification', (req, res, next) => {
    console.log('add notification called')
    let response = { success: true };
    notiRef.child(req.body.userId).push({
        content: req.body.content,
        title: req.body.title,
        clickLink: req.body.link,
        time: Date.now(),
        isSeen: false
    }).setPriority(0 - Date.now(),ret=>{}).then((val) => {
        res.json({ message: 'notification added' }).status(200)
    }).catch((err) => {
        res.json({ message: 'notification not added : ' + err }).status(500)
    });
});

module.exports = router;