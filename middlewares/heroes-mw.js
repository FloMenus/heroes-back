const heroesList = require('../heroes.json');
const express = require('express');
const app = express();

// middleware to verify if hero exists

const verifyHero=(req, res, next)=> {
    const hero = heroesList.find(hero => hero.slug === req.params.slug);
    if (!hero) {
        res.status(404).json({ message: 'Hero not found' });
    } else {
        next();
    }
}

module.exports = {
    verifyHero: verifyHero
  }