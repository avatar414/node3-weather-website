import path from 'path';
import express from 'express';
import hbs from 'hbs';
//const express= require('express');
//const hbs= require('hbs');
import {geocode} from './utils/geocode.js';
import {getWeather} from './utils/getWeather.js'
//const geocode= require('./utils/geocode.js');
//const getWeather= require('./utils/getWeather.js');
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const app= express();
// set paths for express config
const viewsPath= path.join(__dirname,'../templates/views');
const partialsPath= path.join(__dirname,'../templates/partials');
const publicDirectoryPath= path.join(__dirname,'../public')

app.set('view engine','hbs');
// Set handlebars engine and views location
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);
// Set static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req,res) => {
    res.render('index',{
        title : 'Weather Getter ',
        name : 'Dave D',
    });
})

app.get('/about',(req,res) => {

    res.render('about',{
        title : 'About this site',
        name : 'Dave D',
    });
})
app.get('/help',(req,res) => {

    res.render('help',{
        title : 'Help',
        message : 'Here\'s yer help',
        name : 'Dave D',
    });
})

// app.get('/weather',(req,res) => {
//     res.send('Yer Weather');
// })

app.get('/weather',(req,res) => {
    let reply= '';
    if(!req.query.address){
        return(
            res.send({
                error : 'Must provide address'
            })
        );
    }   
    geocode(req.query.address,(err,{latitude,longitude,location} = {}) =>{
        if(err){
            return(res.send(err)) 
        }
        else{
            getWeather(latitude,longitude,(error,{temperature,feelslike,wind_speed,wind_dir,humidity} = {}) =>{
                if(error){
                    return(res.send(error))
                }
                else{
                    res.send({
                        "latitude" : latitude,
                        "longitude" : longitude,
                        "location" : location,
                        "temperature" : temperature,
                        "windchill" : feelslike,
                        "windspeed" : wind_speed,
                        "wind_dir" : wind_dir,
                        "humidity" : humidity

                    })         
                }
            })
         }
    })
})

app.get('/help/*',(req,res) => {

    res.render('page_nf',{
        title : 'Help Not Found',
        message : 'We tried. Nothing found',
        name : 'Dave D',
    })

})
app.get('*',(req,res) => {

    res.render('page_nf',{
        title : 'Page Not Found',
        message : '404 sorry',
        name : 'Dave D',
    })
})
// app.get('',(req,res) => {
//     res.send('hello express');
// })
// app.get('/help',(req,res) => {
//     res.send('You need help');
// })
// app.get('/about',(req,res) => {
//     res.send('About this...');
// })

app.listen(3001,() => {
    ('Up on 3001');

})
