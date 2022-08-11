const heroesList = require("../heroes.json");
const express = require("express");
const app = express();

// middleware to verify if hero exists
const verifyExistingHero = (req, res, next) => {
  const hero = heroesList.find((hero) => hero.slug === req.params.slug);
  if (!hero) {
    res.status(404).json({ message: "Hero not found" });
  } else {
    next();
  }
};

// Middleware to verify if hero doesn't exist
const verifyNonExistingHero = (req, res, next) => {
  const hero = heroesList.find((hero) => hero.slug === req.params.slug);
  if (hero) {
    res.status(404).json({ message: "Hero already existing" });
  } else {
    next();
  }
};

// Middlewar to verify hero format
const validateHero = (req, res, next) => {
  const hero = heroesList.find((hero) => hero.slug === req.params.slug);
  if (
    !req.body.slug ||
    !req.body.name ||
    !req.body.power ||
    !req.body.age ||
    !req.body.color ||
    !req.body.image ||
    !req.body.isAlive
  ) {
    res.status(400).json({ message: "Format not valide" });
  } else {
    next();
  }
};

module.exports = {
  verifyExistingHero: verifyExistingHero,
  verifyNonExistingHero: verifyNonExistingHero,
  validateHero: validateHero,
};
