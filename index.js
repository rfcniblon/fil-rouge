const express = require("express");
const bodyParser = require("body-parser");
const connection = require('./conf');
const app = express();


connection.connect();


app.use(bodyParser.urlencoded({
  extended: true
}));

//*******GET******//
app.get("/films", (req, res) => {
  const sql = "SELECT * FROM films";
  connection.query(sql, (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get films");
    } else {
      res.json(results);
    }
  });
});

app.get("/films/order", (req, res) => {
  const sql = "SELECT * FROM films ORDER BY year DESC";
  connection.query(sql, (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get films");
    } else {
      res.json(results);
    }
  });
});

app.get("/films/:id", (req, res) => {
  const idPresentationOne = parseInt(req.params.id);
  const sql = "SELECT * FROM films WHERE id = ? ";
  connection.query(sql, [idPresentationOne], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get film");
    } else {
      res.json(results);
    }
  });
});

app.get("/films/title/order", (req, res) => {
   const sql = " SELECT * FROM films ORDER BY title ASC";
  connection.query(sql, (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get film title");
    } else {
      res.json(results);
    }
  });
});

app.get("/films/title/b/", (req, res) => {
  const idPresentationOne = parseInt(req.params.title);
  const sql = "SELECT * FROM films WHERE title LIKE 'B%' ";
  connection.query(sql, [idPresentationOne], (error, results, fields) => {
    if (error) {
      res.status(501).send("couldn't get film");
    } else {
      res.json(results);
    }
  });
});




//******POST******/

app.post('/films', (req, res) => {
  const formData = [req.body.title, req.body.year, req.body.type, req.body.notation];
  console.log("formData : ", formData);


  connection.query('INSERT INTO films (title,year,type,notation) VALUES(?,?,?,?)',
    formData, (err, results) => {

      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la sauvegarde d'un film");
      } else {
        res.sendStatus(200);
      }
    });
});



//******PUT******//

app.put('/films/notation/:id', (req, res) => {

  let films_notation = req.params.notation;
  
  

  connection.query('UPDATE films SET notation = !notation WHERE id = ?',
     [ films_notation],
     (err, results) => {

    if (err) {

      res.status(500).send("Erreur lors de la modification d'un film");
    } else {

      res.sendStatus(200);
    }
  });

});

app.put('/films/type/:id', (req, res) => {
  const film_id = req.params.id;

  connection.query('UPDATE films SET type = !type  WHERE id =?;',
    [film_id],
    (err, results) => {
      if (err) {
        //res.status(500).send("erreur lors de la modification");
        res.status(500).send(err.sqlMessage);
      } else {
        res.sendStatus(200);
      }
    }
  )
});
app.put('/films/year/:id', (req, res) => {
  const film_id = req.params.id;

  connection.query('UPDATE films SET year = !year  WHERE id =?;',
    [film_id],
    (err, results) => {
      if (err) {
        //res.status(500).send("erreur lors de la modification");
        res.status(500).send(err.sqlMessage);
      } else {
        res.sendStatus(200);
      }
    }
  )
});


//******DELETE********//

app.delete(
  "/films/type",    
  (req, res) => {  
        
    connection.query('DELETE FROM films WHERE type = 0 ',
     
     (err, results) => {
        
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la suppression d'un film");
      } else {

        res.json(results);
      }
    });

  });

app.delete(
  '/films/:id',
  (req, res) => {

    let films_id = parseInt(req.params.id);
    console.log("films_id : ", films_id);

    connection.query('DELETE FROM films WHERE id = ?',
      [films_id],
      (err, results) => {

      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la modification d'un film");
      } else {

        res.sendStatus(200);
      }
    });

  });

  





app.listen(
  3000,
  () => {
    console.log("server is listening on port 3000");
  }
);