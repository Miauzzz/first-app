// Conectar mongoDB server en local (mongoDB Compass)

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

// Configuración del servidor Express
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri); // Sin opciones obsoletas
const dbName = 'tecnoconce';
const collectionName = 'clientes';

app.get('/clientes', async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const clientes = await collection.find({}).toArray(); // Obtener todos los documentos de la colección
        res.json(clientes); // Enviar los documentos como respuesta JSON
        
    } catch (error) {
        console.error('Error al obtener los clientes:', error);
        res.status(500).send('Error al obtener los clientes');
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Servidor Express corriendo en http://localhost:${port}`);
});
