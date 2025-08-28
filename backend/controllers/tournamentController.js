const { ObjectId } = require("mongodb");
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
            liste: liste
        });

    }
    catch(error){
        console.error({message: "Erreur lors de la recuperation de la liste", error});
    }
}

//modifier tournoi

const updateTournament = async (req,res) =>{
    try{
        //connection tsy adino
        const db = await connectDB();
        const id = req.params.id;
        
        //validation de l id
        if(!ObjectId.isValid(id)){
            return res.status(400).json({
                success: false,
                message: "ID Invalide"
            })
        }

        //on update ici
        const result = await db.collection('tournament').updateOne(
            {_id: new ObjectId(id)},
            {$set: req.body});
        
        //aucune id ne correspond
        if (result.matchedCount === 0){
            return res.status(404).json({
                succes: false,
                message: "Aucun tournoi trouvé avec cet Id"
            })
        } 

        res.status(201).json({
            succes: true,
            message: "Modification tournoi reussit",
        })
    }

    catch(error){
        console.error("Erreur lors de la modification");
        res.status(400).json({
            success: false,
            message: "Erreur serveur",
            message: error.message
        })
    }
}


//effacer un tournoi

const deleteTournament = async (req,res) =>{
    try{
        //connexion a la base
        const db = await connectDB();

        //alaina ny id an ilay ho fafana
        const id = req.params.id;

        //raha tsy valide ilay id
        if(!ObjectId.isValid(id)){
            return res.status(400).json({
                success:false,
                message: "ID invalide"
            })
        }

        const result = await db.collection('tournament').deleteOne(
            {_id: new ObjectId(id)})
            if (result.matchedCount === 0){
                return res.status(404).json({
                    succes:false,
                    message: "ID introvable",
                })
            }
        res.status(200).json({
            succes:true,
            message: "Suppression tournoi réussit",
        })
    }
    catch(error){
        console.error("Erreur lors de la suppression");
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}


module.exports = {createTournament, getTournaments, updateTournament, deleteTournament};