const express = require('express');
const { send } = require('express/lib/response');
const app = express();
const db = require('./db')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { expressjwt: jwtValidate } = require("express-jwt");

app.use(express.json());
var cors = require('cors');

const secretKey = 'My_Secret_Key_for_dev_environnement';

app.use(cors());


//Test if Email is valid
function isValidEmail(email) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
}

//select and return all tutorials
app.get('/tuto', (req, res) => {
  db.query("SELECT * FROM tuto", (err, rows) => {
    if (err) {
      console.log(err)
      res.send(err)
      return
    }
    console.log(rows)
    res.send(rows)
  })
});

//select and return just one tutorial (depending on the id)
app.get('/tuto/:tutoId', (req, res) => {
  db.query("SELECT * FROM tuto WHERE tuto.id=" + req.params.tutoId, (err, rows) => {
    if (err) {
      console.log(err)
      res.send(err)
      return
    }
    res.send(rows)
  })
});

//function to create a new tutorial in SQL
function createInsertTuto(titre, lien, personne_id, description) {
  return (
    "INSERT INTO tuto (titre, lien, personne_id, description) VALUES ('" +
    titre + "','" +
    lien + "'," +
    personne_id + " ,'" +
    description + "')"
  )
}

//function to modify the values ​​of a tutorial in SQL according to the id
function modifyInsertTuto(titre, lien, personne_id, description, id) {
  return (
    "UPDATE tuto set titre = '" + titre +
    "', lien = '" + lien +
    "', personne_id = " + personne_id +
    ", description = '" + description +
    "' WHERE tuto.id = " + id
  )
}

//function to create a new user in SQL
function newUser(nom, prenom, email, mot_de_passe) {
  return (
    "INSERT INTO personne (nom, prenom, email, mot_de_passe) VALUES ('" +
    nom + "','" +
    prenom + "','" +
    email + "','" +
    mot_de_passe + "')"
  )
}

//Create a new tutorial
app.post('/tuto/new', jwtValidate({ secret: secretKey, algorithms: ['HS256'] }), (req, res) => {
  newTuto = req.body;
  payload = req.auth;

  if (newTuto && newTuto.titre && newTuto.lien && newTuto.description) {
    db.query(
      createInsertTuto(newTuto.titre, newTuto.lien, payload.id, newTuto.description),
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
          return;
        }
        objResponse = {
          newId: result.insertId
        }
        res.send(objResponse);
      }
    );
  } else {
    res.status(400).send('Invalid request body.');
  }
});

//delete a tutorial based on id
app.delete('/tuto/del', jwtValidate({ secret: secretKey, algorithms: ['HS256'] }), (req, res) => {
  user_id = req.auth.id;
  db.query("Select * FROM tuto WHERE tuto.id=" + req.query.id, (err_verif, rows_verif) => {
    //check if the tutorial exists
    if(rows_verif.length == 0){
      res.status(500).send("Tuto does not exists");
      return;
    }
    //checks that the user who created the tutorial is the same as the one wanting to delete the tutorial
    var tuto_personne_id = rows_verif[0].personne_id;
    if(tuto_personne_id != user_id){
      res.status(401).send("You are not authorized to delite this ressource")
      return;
    }
    //removal of the tutorial
    db.query("DELETE FROM tuto WHERE tuto.id=" + req.query.id, (err, rows) => {
    if (err) {
      console.log(err)
      res.send(err)
      return
    }
    res.send("deleted")
  })
  })
  
});

//modify a tutorial according to the id
app.put('/tuto/put', jwtValidate({ secret: secretKey, algorithms: ['HS256'] }), (req, res) => {
  newTutoValues = req.body;
  user_id = req.auth.id;
  //check if the tutorial exists
  db.query("Select * FROM tuto WHERE tuto.id=" + req.query.id, (err_verif, rows_verif) => {
    if (rows_verif.length == 0) {
      res.status(500).send("Tuto does not exists");
      return;
    }
    //checks that the user who created the tutorial is the same as the one wanting to modify the tutorial
    var tuto_personne_id = rows_verif[0].personne_id;
    if (tuto_personne_id != user_id) {
      res.status(401).send("You are not authorized to modify this ressource")
      return;
    }
    //modification of the tutorial if the values ​​received exist
    if (newTutoValues && newTutoValues.titre && newTutoValues.lien && newTutoValues.description) {
      db.query(
        modifyInsertTuto(newTutoValues.titre, newTutoValues.lien, user_id, newTutoValues.description, req.query.id),
        (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).send(err);
            return;
          }
          res.send(req.query.id);
        }
      );
    } else {
      res.status(400).send('Invalid request body.');
    }
  })
});

//connection to a user account according to the email address
app.post('/connection', (req, res) => {
  const authentification = req.body;
  //check if the email address exists
  db.query(
    "SELECT * FROM personne WHERE email = ?",
    [authentification.email],
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).send("err");
        return;
      }

      if (rows.length === 0) {
        //No matching user found
        res.status(401).send("Invalid email or password");
        return;
      }
      //If a user is found, it compares the two encrypted passwords
      const storedHashedPassword = rows[0].mot_de_passe;
      bcrypt.compare(authentification.mot_de_passe, storedHashedPassword, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
          return;
        }

        if (result) {
          //Passwords match, user is authenticated
          payload = {
            id: rows[0].id
          }
          //creation of a token
          const token = jwt.sign(payload, secretKey, { expiresIn: '23h' });

          const utilisateur = {
            prenom: rows[0].prenom,
            nom: rows[0].nom,
            id: rows[0].id,
            token: token
          };
          res.status(200).send(utilisateur);
        } else {
          //Passwords don't match
          res.status(401).send("Invalid email or password");
        }
      });
    }
  );
});

//Create a new user account
app.post('/connection/register', (req, res) => {
  authentification = req.body;
  console.log(authentification)
  //check if the values ​​received exist and are correct
  if (authentification && authentification.nom && authentification.prenom && isValidEmail(authentification.email) && authentification.mot_de_passe) {
    //check if the email address exists
    db.query(
      'SELECT COUNT(*) AS count FROM personne WHERE email = ?',
      [authentification.email],
      (err, rows) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
          return;
        }

        const count = rows[0].count;
        //if the email address exists, it returns code 409
        if (count > 0) {
          res.status(409).send('Email already exists.');
          return;
        }
        //creation of a new user
        db.query(
          newUser(authentification.nom, authentification.prenom, authentification.email, bcrypt.hashSync(authentification.mot_de_passe, 10)),
          (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).send(err);
              return;
            }

            const objResponse = {
              newId: result.insertId
            };
            res.send(objResponse);
          }
        );
      }
    );
  } else {
    res.status(400).send('Invalid request body.');
  }
});

app.listen(3000, () => {
  console.log('Le serveur est en écoute sur le port : http://localhost:3000');
});
