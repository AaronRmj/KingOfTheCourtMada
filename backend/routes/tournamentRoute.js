const express = require("express");
const router = express.Router();
const { createTournament,getTournaments } = require("../controllers/tournamentController");
const { requireAdmin } = require('../middleware/authMiddleware');

//creer un route pour tournoi
router.post('/', createTournament);
router.get('/', getTournaments);
//aza adino miexporté an'ito
module.exports = router;