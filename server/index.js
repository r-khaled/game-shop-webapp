const express = require('express');
const server = express();
const mysql = require('mysql2');
const cors = require('cors');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "nailton123",
    database: "crudgames",
});
db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("✅ Database connected!");
    connection.release();
  }
});


server.use(express.json());
server.use(cors());

server.post("/register", (req, res) => {
    //const { id } = req.params;
    const { name , cost ,category } = req.body;

    let sql = "INSERT INTO games (name, cost, category) VALUES (?,?,?)"
    db.query(sql, [name, cost, category], (err,result) =>{
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }else{
            console.log(result);
            res.send(newgame = { id: result.insertId, name, cost, category });
        }
    })
});

server.get("/games", (req, res) => {

    let sql = "SELECT * FROM games";
    db.query(sql, (err,result) =>{
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }

    })
});

server.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, cost, category } = req.body;

  db.query(
    "UPDATE games SET name = ?, cost = ?, category = ? WHERE id = ?",
    [name, cost, category, id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating game");
      } else {
        res.send("Game updated successfully");
      }
    }
  );
});

server.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM games WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Game deleted", result });
  });
});

server.listen(3001, () =>
    console.log("Running in the port 3001")

);