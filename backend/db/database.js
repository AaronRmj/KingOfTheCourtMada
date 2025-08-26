//Classe principale du driver pour gerer les connexions
const { MongoClient } = require('mongodb');

//variables pour la connexion
let client = null;
let db = null;


const connectDB = async () =>{
    try{
        //on evite de creer multiples connexions, si client existe deja on le retourne simplement
        if (client){
            return  db;
        }

        //creation du client mongodb
        client = new MongoClient(process.env.MONGODB_URI)//mongodb://localhost:27017/kingofthecourt
        
        //etablie une connection avec le serveur mongodb
        await client.connect();

        //selection de la DB
        db = client.db();
        console.log("Connexion a mongoDB reussit");
        return db;
        
    }
    catch(error){
        console.error("MongoDB connection error", error);
        process.exit(1);
    }

}


//misy ve ilay connection avant de l'utiliser
const getDB = () =>{
    if(!db)
        throw new Error ("Database not initialized, Call connectDB() first  ");
    return db;
}

module.exports = {connectDB,getDB}