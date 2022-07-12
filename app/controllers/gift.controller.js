const Gift = require("../models/gift.model.js");

// Create and Save a new Gift
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Gift
  const gift = new Gift({
    name: req.body.name,
    category: req.body.category || false
  });

  // Save Gift in the database
  Gift.create(gift, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Gift."
      });
    else res.send(data);
  });
};

// Retrieve all Gifts from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Gift.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving gifts."
      });
    else res.send(data);
  });
};

// Find a single Gift by Id
exports.findOne = (req, res) => {
  Gift.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Gift with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Gift with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Gifts
exports.findAllPublished = (req, res) => {
  Gift.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving gifts."
      });
    else res.send(data);
  });
};

// Update a Gift identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Gift.updateById(
    req.params.id,
    new Gift(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Gift with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Gift with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Gift with the specified id in the request
exports.delete = (req, res) => {
  Gift.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Gift with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Gift with id " + req.params.id
        });
      }
    } else res.send({ message: `Gift was deleted successfully!` });
  });
};

// Delete all Gifts from the database.
exports.deleteAll = (req, res) => {
  Gift.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all gifts."
      });
    else res.send({ message: `All Gifts were deleted successfully!` });
  });
};
