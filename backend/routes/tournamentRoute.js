const express = require("express");
const router = express.Router();
const { createTournament,getTournaments, updateTournament,deleteTournament } = require("../controllers/tournamentController");
const { requireAdmin } = require('../middleware/authMiddleware');

//creer un route pour tournoi
router.post('/', createTournament);
router.get('/', getTournaments);
router.put('/:id',updateTournament);
router.delete('/:id', deleteTournament)
//aza adino foana miexporter
module.exports = router;