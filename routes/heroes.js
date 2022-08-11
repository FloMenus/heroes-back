const express = require("express");
const app = express();
const heroesList = require("../heroes.json");
const { verifyExistingHero, verifyNonExistingHero, validateHero } = require("../middlewares/heroes-mw");

// HEROES ///////////////////////////

// get all heroes
app.get("/", (req, res) => {
  res.json(heroesList);
});

// get one hero with slug
app.get("/:slug", verifyExistingHero, (req, res) => {
  const hero = heroesList.find((hero) => hero.slug === req.params.slug);

  res.json(hero);
});

// create new hero
app.post("/", verifyNonExistingHero, validateHero, (req, res) => {
    const newHero = {
      name: req.body.name,
      slug: req.body.slug,
      power: req.body.power,
      age: req.body.age,
      color: req.body.color,
      isAlive: req.body.isAlive,
      image: req.body.image,
    };
  
    heroesList.push(newHero);
    res.json(heroesList);
  });

// delete one hero with slug
app.delete("/:slug", verifyExistingHero, (req, res) => {
    const hero = heroesList.find((hero) => hero.slug === req.params.slug);
    const index = heroesList.indexOf(hero);
    heroesList.splice(index, 1);
    res.json(`${hero.name} has been deleted`);
});

// modify one hero with slug
app.put("/:slug", verifyExistingHero, validateHero, (req, res) => {
    let hero = heroesList.findIndex((hero) => hero.slug === req.params.slug);
    const heroeEdit = req.body;
    heroesList[hero] = heroeEdit;
    res.json(heroeEdit)
});

// POWERS ///////////////////////////

// get powers of one hero with slug
app.get("/:slug/powers", verifyExistingHero, (req, res) => {
  const hero = heroesList.find((hero) => hero.slug === req.params.slug);

  res.json(hero.power);
});

// add new power to hero with slug
app.post("/:slug/powers", verifyExistingHero, (req, res) => {
  const newPower = `${req.body.name}`;
  hero.power.push(newPower);
  res.json(hero);
});

// delete one power of hero with slug
app.delete("/:slug/powers/:power", verifyExistingHero, (req, res) => {
    const hero = heroesList.find((hero) => hero.slug === req.params.slug);
    const index = hero.power.indexOf(req.params.power);
    hero.power.splice(index, 1);
    res.json(`Power ${req.params.power} of ${hero.name} has been deleted`);
});


module.exports = app;
