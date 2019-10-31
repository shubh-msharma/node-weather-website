const path  = require('path');
const express = require('express');
const hbs = require('hbs');
findLocation = require('./utils/loc');
findWeather  =require('./utils/weather');


const app = express();


// cofiguring paths
const publicDir = path.join(__dirname,'../public') ;
const viewPath = path.join(__dirname,'../templetes/views');
const partialPath = path.join(__dirname,'../templetes/partials');

// setting up view engine and patha
app.use(express.static(publicDir));
app.set('view engine','hbs');
app.set("views",viewPath);
hbs.registerPartials(partialPath);


app.get('',(req,res)=>{
    res.render('index',{
        title:"welcome to Weather app"
    });
})

app.get('/contact',(req,res)=>{
    res.render('contact',{
        title:"contact us",
        mailid:"shubhamsharma@gmail.com",
        add:"101 janki nagar dhar"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name:"shubham sharma",
        title:"about me",
        bio:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam iusto architecto quos necessitatibus aliquid rem eos officia voluptates minus doloribus?'
    })
})

app.get('/about/*',(req,res)=>{
    res.render('notFound',{
        message:"please.... search for another person"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"please provide a location"
        })
    }
    findLocation(req.query.address, (err, data) => {
        if(err){
            return res.send(err);
        }else{
        findWeather(data,(err,data)=>{
            if(err){
                return res.send({
                    error:{...err}
                })
            }else{
                res.send({
                    ...data
                })
            }
        });}
    })
})


app.get('*',(req,res)=>{
    res.render('notFound',{
        message:"please visit another page\n the page you are looking for does'nt exist"
    })
})









app.listen(3000,()=>{
    console.log("server running at port no. 3000");
})