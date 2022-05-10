const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {//Ruta base de la pagina
    res.status(200).render('index.html', { titulo: "Plataforma" });
});

module.exports = router;