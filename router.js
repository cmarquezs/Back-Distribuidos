const express = require('express');
const router = express.Router();

const conexion = require('./database/db');

// Middleware para habilitar CORS
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Esto permite todas las solicitudes, puedes ajustarlo a tus necesidades.
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


// ------> ENDPOINTS CLIENTES <-------- 

// Listar Clientes
router.get('/listclients', (req, res) => {
    conexion.query('SELECT * FROM cliente', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al obtener la lista de clientes.' });
        } else {
            res.status(200).json(results);
        }
    });
});

// Datos de un cliente por ID
router.get('/cliente/:id', (req, res) => {
    const clienteId = req.params.id;
    conexion.query('SELECT * FROM cliente WHERE Id_cliente = ?', [clienteId], (err, rows) => {
        if (err) return res.send(err)

        if (rows.length > 0) {
            res.json(rows[0]); // Solo envía el primer resultado (debería ser único)
        } else {
            res.send('Cliente no encontrado');
        }
    });
});


// Contar Clientes
router.get('/contar/clientes', (req, res) => {
    conexion.query('SELECT COUNT(*) AS contador FROM cliente', (err, rows) => {
        if (err) return res.send(err);

        if (rows.length > 0) {
            // Enviar solo el valor del contador
            res.json({ valor: rows[0].contador });
        } else {
            res.send('No hay elementos en la base de datos');
        }
    });
});


// Agregar Cliente
router.post('/cliente/add', (req, res) => {
    const { Id_cliente, Nombre, Apellido, ConcesionarioID } = req.body;

    const clienteData = {
        Id_cliente,
        Nombre,
        Apellido,
        ConcesionarioID: ConcesionarioID || null,
        // Agrega otras propiedades según tu modelo de datos
    };

    conexion.query('INSERT INTO cliente SET ?', clienteData, (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Error al agregar el cliente.' });
        }

        //res.status(201).json({ message: 'Cliente agregado exitosamente.' });
        return res.redirect(301, 'http://127.0.0.1:5500/view-admin-panel.html');

    });
});

// Actualizar Cliente
router.put('/cliente/update/:id', (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const sql = `UPDATE cliente SET ? WHERE Id_cliente = ?`;

    conexion.query(sql, [data, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar el cliente' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        return res.json({
            message: 'Cliente actualizado exitosamente'
        });
    });
});

// Eliminar Cliente
router.delete('/cliente/delete/:id', (req, res) => {
    const clienteId = req.params.id;

    conexion.query('DELETE FROM cliente WHERE Id_cliente = ?', [clienteId], (error, result) => {
        if (error) {
            res.status(500).json({ error: 'Error al eliminar el cliente.' });
        } else {
            res.status(200).json({ message: 'Cliente eliminado exitosamente.' });
        }
    });
});


// ------> ENDPOINTS MOTOS <-------- 

// Listar Motos
router.get('/motos', (req, res) => {
    // Consultar la lista de motos en la base de datos
    conexion.query('SELECT * FROM moto', (error, results) => {
        if (error) {
            // Si hay un error, responder con un código de estado 500 y un mensaje de error
            console.error('Error al obtener la lista de motos:', error);
            res.status(500).json({ error: 'Error al obtener la lista de motos.' });
        } else {
            // Si la consulta se realiza correctamente y hay resultados, responder con un código de estado 200 y los resultados
            if (results.length > 0) {
                res.status(200).json(results);
            } else {
                // Si no hay elementos, responder con un código de estado 404 y un mensaje indicando la ausencia de elementos
                res.status(404).json({ message: 'No hay elementos en la lista de motos.' });
            }
        }
    });
});


// Datos de una moto por ID
router.get('/motos/:id', (req, res) => {
    const motoId = req.params.id;
    conexion.query('SELECT * FROM moto WHERE Id_moto = ?', [motoId], (err, rows) => {
        if (err) return res.send(err)

        if (rows.length > 0) {
            res.json(rows[0]); // Solo envía el primer resultado (debería ser único)
        } else {
            res.send('Moto no encontrada');
        }
    });
});


// Contar Motos
router.get('/contar/motos', (req, res) => {
    conexion.query('SELECT COUNT(*) AS contador FROM moto', (err, rows) => {
        if (err) return res.send(err);

        if (rows.length > 0) {
            // Enviar solo el valor del contador
            res.json({ valor: rows[0].contador });
        } else {
            res.send('No hay elementos en la base de datos');
        }
    });
});


// Agregar Moto
router.post('/motos/add', (req, res) => {
    const { Id_moto, Modelo, Marca, Precio } = req.body;

    const motoData = {
        Id_moto,
        Modelo,
        Marca,
        Precio,
        // Agrega otras propiedades según tu modelo de datos
    };

    conexion.query('INSERT INTO moto SET ?', motoData, (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Error al agregar la Moto.' });
        }

        //res.status(201).json({ message: 'Cliente agregado exitosamente.' });
        return res.redirect(301, 'http://127.0.0.1:5500/view-admin-panel.html');

    });
});

// Actualizar Moto
router.put('/moto/update/:id', (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const sql = `UPDATE moto SET ? WHERE Id_moto = ?`;

    conexion.query(sql, [data, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar la Moto' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Moto no encontrado' });
        }
        return res.json({
            message: 'Moto actualizada exitosamente'
        });
    });
});

// Eliminar Moto
router.delete('/motos/delete/:id', (req, res) => {
    const motoId = req.params.id;

    conexion.query('DELETE FROM moto WHERE Id_moto = ?', [motoId], (error, result) => {
        if (error) {
            res.status(500).json({ error: 'Error al eliminar la moto.' });
        } else {
            res.status(200).json({ message: 'Moto eliminada exitosamente.' });
        }
    });
});


module.exports = router;
