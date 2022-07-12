const sql = require("./db.js");

// constructor
const Gift = function(gift) {
  this.title = gift.name;
  this.description = gift.category;
};

Gift.create = (newGift, result) => {
  sql.query("INSERT INTO gifts SET ?", newGift, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created gift: ", { id: res.insertId, ...newGift });
    result(null, { id: res.insertId, ...newGift });
  });
};

Gift.findById = (id, result) => {
  sql.query(`SELECT * FROM gifts WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found gift: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Gift with the id
    result({ kind: "not_found" }, null);
  });
};

Gift.getAll = (title, result) => {
  let query = "SELECT * FROM gifts";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("gifts: ", res);
    result(null, res);
  });
};

Gift.getAllPublished = result => {
  sql.query("SELECT * FROM gifts WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("gifts: ", res);
    result(null, res);
  });
};

Gift.updateById = (id, gift, result) => {
  sql.query(
    "UPDATE gifts SET name = ?, category = ? WHERE id = ?",
    [gift.name, gift.category, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Gift with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated gift: ", { id: id, ...gift });
      result(null, { id: id, ...gift });
    }
  );
};

Gift.remove = (id, result) => {
  sql.query("DELETE FROM gifts WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Gift with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted gifts with id: ", id);
    result(null, res);
  });
};

Gift.removeAll = result => {
  sql.query("DELETE FROM gifts", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} gifts`);
    result(null, res);
  });
};

module.exports = Gift;
