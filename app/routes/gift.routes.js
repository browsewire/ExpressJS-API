module.exports = app => {
  const gifts = require("../controllers/gift.controller.js");

  var router = require("express").Router();

  // Create a new Gift
  router.post("/", gifts.create);

  // Retrieve all Gifts
  router.get("/", gifts.findAll);

  // Retrieve all published Gifts
  router.get("/published", gifts.findAllPublished);

  // Retrieve a single Gift with id
  router.get("/:id", gifts.findOne);

  // Update a Gift with id
  router.put("/:id", gifts.update);

  // Delete a Gift with id
  router.delete("/:id", gifts.delete);

  // Delete all Gifts
  router.delete("/", gifts.deleteAll);

  app.use('/api/gifts', router);
};
