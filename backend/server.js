require('dotenv').config();
const {connectDB, getDB} = require('./db/database')
const express = require('express');
const cors = require('cors')

//on instancie express pour l'utiliser
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//connecter d'abord mongodb
connectDB().then(()=>{
    // ensuite demarrer le serveur
    app.listen(PORT, ()=>{ 
        console.log("Connexion reussit, port "+PORT);
    })
}).catch(error => {
    console.error('Echec demarrage serveur', error);
    process.exit(1);
})