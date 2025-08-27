const { connectDB } = require("../db/database");


//ajout tournoi
const createTournament = async (req,res) =>{
    
    //on teste si tous les champs sont remplis
    try{
        if (!req.body.nom || !req.body.lieu || !req.body.date){
            return res.status(403).json({
                message: "Les champs nom, lieu et date sont obligatoires"
            });
        }

    //connection a la base
    const db = await connectDB();
    
    //ajout du nouveau tournoi 
    const tournament = {
        nom: req.body.nom,
        lieu: req.body.lieu,
        date: new Date(req.body.date),
        description: req.body.description || "",
        status: req.body.status || "en attente"
    }
    
    //inserer dans la collection
    const result = await db.collection("tournament").insertOne(tournament);
    res.status(201).json({
        message: "Ajout tournoi reussit", id: result.insertedId
    })
}
    catch(error){
        console.error("Erreur lors de la creation du tournoi", error);
        res.status(500).json({
            message: "Erreur interne du serveur"
        })
    }
    
}


//lire tournoi

const getTournaments = async (req,res) =>{
    try{
        const db = await connectDB();
        const liste = await db.collection('tournament').find().toArray();
        res.json({
            success: true, 
            message: "Liste des tournois", 
            count: liste.length,
            liste:liste
        });

    }
    catch(error){
        console.error({message: "Erreur lors de la recuperation de la liste", error});
    }
}

module.exports = {createTournament, getTournaments};