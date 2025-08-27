const express = require('express')
const requireAdmin = (req,res,next) =>{
    if (!req.user || req.user.role !== 'admin'){
        res.status(403).json({message: "Acces refusé"});
    }
    next();
}

module.exports = {requireAdmin};