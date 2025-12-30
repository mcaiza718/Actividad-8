🧰 Tecnologías utilizadas
Backend

-Node.js
-Express
-MySQL
-Cors

Frontend
-HTML
-CSS
-JavaScript (Fetch API)

Herramientas
-Visual Studio Code
-MySQL Workbench

La base de datos utilizada es MySQL, con las siguientes tablas principales:

Tabla productos
-id
-nombre
-categoria
-precio
-stock

Tabla movimientos
-id
-producto_id
-tipo (entrada / salida)
-cantidad
-fecha

La tabla de movimientos permite llevar el historial y actualizar automáticamente el stock del producto.
Ejecución del proyecto
1. Instalar dependencias
Desde la carpeta backend:
-npm install
Ejecutar el servidor:
-node server.js
El servidor se ejecuta en:
http://localhost:3000
