
const express = require('express');
const bodyParser = require('body-parser');
const vCard = require('vcf'); 
const fs = require('fs');
const basicAuth = require('basic-auth'); 

const app = express();
app.use(bodyParser.json());

const auth = (req, res, next) => {
    const user = basicAuth(req);
    if (user && user.name === 'admin' && user.pass === 'password123') {
        next();
    } else {
        res.set('WWW-Authenticate', 'Basic realm="Restricted Area"');
        return res.status(401).send('Unauthorized');
    }
};

app.post('/submit-contact', (req, res) => {
    const { name, countryCode, phone } = req.body;

    let vcf = new vCard();
    vcf.set('fn', name);
    vcf.set('tel', `${countryCode}${phone}`);

    fs.appendFile('contacts.vcf', vcf.toString(), (err) => {
        if (err) {
            return res.status(500).json({ error: 'Could not save contact' });
        }
        res.status(200).json({ message: 'Contact saved successfully' });
    });
});

app.get('/admin/download-contacts', auth, (req, res) => {
    const file = `${__dirname}/contacts.vcf`;
    res.download(file); 
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
