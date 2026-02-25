const express = require('express');
const { getHostname } = require('../utils');
const { getColor } = require('../db/color');

const apiRouter = express.Router();

apiRouter.get('/', async (req, res) => {
    const { format, colorKey } = req.query; //localhost/api?formt=text
    
    console.log(`Color key: ${colorKey}`); 
    const color = await getColor({ key: colorKey });
    const hostname = getHostname();

    if (format === 'json') {
        res.json({
        color,
        hostname  
        });
    } else {
        return res.send(`COLOR : ${color}, HOSTNAME : ${hostname}`);
    }
});

module.exports = {
    apiRouter,
};