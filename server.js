const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

app.get("/productos", (req, res) => {
  db.query("SELECT * FROM productos", (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

app.post("/productos", (req, res) => {
  const { nombre, categoria, precio, stock } = req.body;

  db.query(
    "INSERT INTO productos (nombre, categoria, precio, stock) VALUES (?, ?, ?, ?)",
    [nombre, categoria, precio, stock],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ mensaje: "Producto agregado" });
    }
  );
});

app.delete("/productos/:id", (req, res) => {
  db.query(
    "DELETE FROM productos WHERE id = ?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ mensaje: "Producto eliminado" });
    }
  );
});

app.post("/movimientos", (req, res) => {
  const { producto_id, tipo, cantidad } = req.body;

  const sqlMovimiento = `
    INSERT INTO movimientos (producto_id, tipo, cantidad)
    VALUES (?, ?, ?)
  `;

  db.query(sqlMovimiento, [producto_id, tipo, cantidad], (err) => {
    if (err) return res.status(500).json(err);

    let actualizarStock = "";

    if (tipo === "entrada") {
      actualizarStock = `
        UPDATE productos
        SET stock = stock + ?
        WHERE id = ?
      `;
    } else {
      actualizarStock = `
        UPDATE productos
        SET stock = stock - ?
        WHERE id = ?
      `;
    }

    db.query(actualizarStock, [cantidad, producto_id], (err2) => {
      if (err2) return res.status(500).json(err2);

      res.json({ mensaje: "Movimiento registrado correctamente" });
    });
  });
});

app.get("/movimientos", (req, res) => {
  const sql = `
    SELECT m.id, p.nombre, m.tipo, m.cantidad, m.fecha
    FROM movimientos m
    JOIN productos p ON m.producto_id = p.id
    ORDER BY m.fecha DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
