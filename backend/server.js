require('dotenv').config();
const {connectDB} = require('./db/database')
const express = require('express');
const cors = require('cors')
const tournamentRoute = require("./routes/tournamentRoute");

//on instancie express pour l'utiliser
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


//utilisation des routes
app.use('/tournament', tournamentRoute);

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
