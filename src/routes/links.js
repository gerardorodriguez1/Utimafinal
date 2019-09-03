//RELACIONES CON BASES DE DATOS
const express  =  require ('express');
const router = express.Router();

const pool = require ('../database');
const { isLoggedIn } = require ('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
    const { material, descripcion } = req.body;
    const newLink = {
        material,
        descripcion,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO materiales set ?', [newLink]);
    req.flash('success', 'Material agregado');
    res.redirect('/links');
});

router.get('/', isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM materiales WHERE user_id = ?', [req.user.id]);
    console.log(links);
    res.render('links/list', { links });
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM materiales WHERE ID = ?', [id]);
    req.flash('success', 'Material eliminado');
    res.redirect('/links');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params;
    const links = await pool.query('SELECT * FROM materiales WHERE id = ?', [id]);
    res.render('links/edit', {link: links[0]});
});


router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const {material, descripcion} = req.body;
    const newLink = {
        material,
        descripcion
    };
    req.flash('success', 'Datos actualizados');
    await pool.query('UPDATE materiales set ? WHERE id = ?', [newLink, id]);
    res.redirect('/links');
});


module.exports = router;