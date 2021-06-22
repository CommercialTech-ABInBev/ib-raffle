const express = require('express');
const app = express();
const path = require('path');
const proxy = require('http-proxy-middleware');
var httpProxy = require('./proxy.config.json');

if(process.env.CLUSTER){
    const envConfigFile = `./proxy.config-${process.env.CLUSTER}.json`
    httpProxy = require(envConfigFile);
}    

Object.keys(httpProxy).forEach((key)=>{
  app.use(key , proxy(
    { 
      target: httpProxy[key].target, 
      secure: httpProxy[key].secure,
      changeOrigin: httpProxy[key].changeOrigin
    })
  );
})

//  DIST output folder
app.use(express.static(path.join(__dirname, './')));

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

//Set Port
const port = process.env.PORT || '3030';
app.listen(port, ()=>{
    console.log('connected to port: '+port);
});

