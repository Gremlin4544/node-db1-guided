const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
    db.select("*")
    .from("posts")
    .then(rows => {
        res.status(200).json({ data: rows })
    })
    .catch(err => {
        res.status(500).json({ error: "sorry there is an error"});
    })
});

router.get('/:id', (req, res) => {
    db("posts")
    // .where('id', "=", req.params.id)
    .where({ id: req.params.id })
    .first()
    .then(post => {
        if (post) {
            res.status(200).json({ data: post })
        } else {
            res.status(404).json({ message: "Post not found" })
        }
    })
    .catch(error => {
        res.status(500).json({ message: "sorry ran into an error"});
    })
});

router.post('/', (req, res) => {
    db('posts')
    .insert(req.body, "id")
    .then(ids => {
        res.status(201).json({ result: ids });
    })
    .catch(err => {
        res.status(500).json({ error: "sorry there is an error"});
    })        
});

router.put('/:id', (req, res) => {
    const changes = req.body;

    db("posts")
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: "record deleted successfully" });
        } else {
            res.status(404).json({ message: "post not found" });
        }
    })
    .catch(error => {
        res.status(500).json({ error: "sorry there is an error"});
    });  
});

router.delete('/:id', (req, res) => {
    db("posts")
    .where({ id: req.params.id })
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: "record deleted successfully" });
        } else {
            res.status(404).json({ message: "post not found" });
        }
    })
    .catch(error => {
        res.status(500).json({ error: "sorry there is an error"});
    });  
});

module.exports = router;