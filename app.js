const express =require('express');
const exphbs=require('express-handlebars');
const mailer=require('express-mailer');
const path=require('path');
const app =express();

const port=5001;


app.engine('handlebars', exphbs({defaultLayout: 'index'}));
app.set('view engine', 'handlebars');


app.use(express.static(path.join(__dirname,'public')));

///app.use(express.static(path.join(__dirname,'public')));


const keys=require('./config/keys');

mailer.extend(app, {
    from: 'My address',
    host: 'smtp.gmail.com', 
    secureConnection: true, 
    port: 465, 
    transportMethod: 'SMTP', 
    auth: {
    user: keys.email, 
    pass: keys.pass 
    }
  });

  const mailOptions=require('./helpers/mailer');
  app.get('/', function (req, res) {
   
    console.log(mailOptions);

    app.mailer.send('email', mailOptions, function (err, message) {
        if (err) {
          console.log(err);
          res.send('There was an error sending the email'+err);
          return;
        }
        return res.send('Email has been sent!');
      });

     

    });
     

// app.get('/',(req,res)=>{

// res.send('you are in index page');

// })


app.get('/email',(req,res)=>{

    res.render('email');


})

app.listen( port,()=>{

    console.log('App running successfully on port'+port);
} )