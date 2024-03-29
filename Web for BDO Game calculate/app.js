var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var crypto = require("crypto");
var jwt = require('jsonwebtoken');
const secret = 'Fullstack-login'

app.use(cors())
const mysql = require('mysql2');

app.use(bodyParser.json()); // สำหรับ JSON data
app.use(bodyParser.urlencoded({ extended: true })); // สำหรับ x-www-form-urlencoded data

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'myprojectcsc'
  });
app.post('/register', jsonParser ,function (req, res, next) {
  
    var Email = req.body.Email
    
    passwd = req.body.Password
    hash_parts = create_password(passwd)
    hashed = hash_parts.method + "$" + hash_parts.salt + "$" + hash_parts.hash

    connection.execute(
    'INSERT INTO user (Name , Password , Email) VALUES (?,?,?)',
    [req.body.Name , hashed , req.body.Email],

    function(err, results, fields) {

          if(err){
              console.log("Error !@ !@!#!@ " , err)
              res.json({status: 'error', message: "User not already"})
              return
          }else{
              res.json({status: 'OK', message: "Complete"})
          }
    }
  )
});    //ยะหู้วๆ ~~

app.post('/his' , (req, res) => {
  console.log(req.body)
  const { User, Class, Itemdrop, TotalMoney, Time, Ap, Dp, Location } = req.body;

  if (!User || !Class || !TotalMoney || !Time || !Ap || !Dp || !Location) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  connection.query(
    'INSERT INTO his (User, Class, Itemdrop, TotalMoney, Time, Ap, Dp, Location) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [req.body.User, req.body.Class, req.body.Itemdrop, req.body.TotalMoney, req.body.Time, req.body.Ap, req.body.Dp, req.body.Location],
    (err, result) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      console.log('Data inserted into MySQL:', result);
      res.status(201).json({ message: 'Data inserted successfully' });
    }
  );
});   

app.post('/hisid', jsonParser , function(req, res) {
  const hisid = req.body.hisid;
  console.log(req.body.hisid)
  connection.query(
    'SELECT * FROM itemdrop WHERE hisid = ?',
    [hisid],
    (err, results) => {
      if (err) {
        console.error('Error retrieving data from MySQL:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      res.status(200).json(results);
    }
  );
  
});



app.get('/locations', function (req, res) {
  connection.query('SELECT * FROM area', function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

app.get('/class', function (req, res) {
  connection.query('SELECT * FROM class', function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

app.get('/gethis', function (req, res) {
  connection.query('SELECT * FROM his', function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

app.post('/getItem', jsonParser, function (req, res) {  
  connection.query(`SELECT * FROM area WHERE Area = "${req.body.data}"`, function (error, results, fields) {
    if (error) throw error;
    res.json(results)
  });
});


app.listen(3333 ,function () {
  console.log('CORS-enabled web server listening on port 3333')
})

app.put('/UpdateItem', jsonParser, function (req, res) {  
    console.log(req.body)
    connection.query(`UPDATE itemdrop SET Price = ? , QTY = ? , Totalprice = ? WHERE Id = ? `, [req.body.Price , req.body.QTY , req.body.Totalprice , req.body.Id ] , function (error, results, fields) {
    if (error) throw error;
    res.json(results)
})
}
);

app.delete('/DeleteItem', jsonParser, function (req, res) {  
  connection.query(`DELETE FROM his WHERE Itemdrop = ? `,[req.body.e] , function (error, results, fields) {
    if (error) throw error;
    res.json(results)
  });
});

app.delete('/DeleteItem2', jsonParser, function (req, res) {  
  connection.query(`DELETE FROM itemdrop WHERE hisid = ? `,[req.body.e] , function (error, results, fields) {
    if (error) throw error;
    res.json(results)
  });
});




app.put('/Updatehis', jsonParser, function (req, res) {  
  console.log(req.body)
  connection.query(`UPDATE his SET TotalMoney = ? WHERE Itemdrop = ? `, [req.body.TotalMoney , req.body.hisid ] , function (error, results, fields) {
  if (error) throw error;
  res.json(results)
})
}
);





app.post('/login' , jsonParser , function (req , res , next){
  console.log(req.body);
  connection.execute(
    'SELECT * FROM user WHERE Name=?',
    [req.body.Name],
    function(err, results, fields) {

        if(err){res.json({status: 'error', message: 'Eoorrr'});return}

        if(results.length == 0){return res.json({status: 'error' , message: 'Password or user incorrent'});return}       
        console.log(results)
        const user = results[0]; 
        console.log(req.body.Password , user.Password)    

        if(check_password(user.Password, req.body.Password)){
          var token = jwt.sign({ Name : results[0].Name } , secret , {expiresIn : '1h'})
            console.log('ok' , req.body.Password)
            res.status(200).json({status: 'ok' , message: 'found' , token});
            

        }else{
          res.status(404).json({status: 'Error' , message: 'Password or User incorrent'});
        }
    }
  );
})

app.post('/his', (req, res) => {
  console.log(req.body)
  const { User, Area, ItemName, QTY , Price , hisid} = req.body;

  if (!User || !Class || !TotalMoney || !Time || !Ap || !Dp || !Location) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  connection.query(
    'INSERT INTO itemdrop (User, Area, ItemName, QTY , Price , hisid) VALUES (?, ?, ?, ?, ?, ?)',
    [req.body.User, req.body.Area, req.body.ItemName, req.body.QTY, req.body.Price, req.body.hisid],
    (err, result) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      console.log('Data inserted into MySQL:', result);
      res.status(201).json({ message: 'Data inserted successfully' });
    }
  );
});   

app.post('/Itemdrop', (req, res) => {
  console.log(req.body)
  const { User, Area, ItemName, QTY , Price , hisid , Totalprice} = req.body;
      console.log("User:", User);
      console.log("Location:", Area);
      console.log("ItemName:", ItemName);
      console.log("AP:", QTY);
      console.log("DP:", Price);
      console.log("Time:", hisid);
      console.log("Totalprice:", Totalprice);
      
      connection.query(
        'INSERT INTO itemdrop (User, Area , ItemName, QTY , Price , hisid , Totalprice) VALUES (?, ?, ?, ?, ?, ? , ?)',
        [req.body.User, req.body.Area, req.body.ItemName, req.body.QTY, req.body.Price, req.body.hisid, req.body.Totalprice],
        (err, result) => {
          if (err) {
            console.error('Error inserting data into MySQL:', err);
            return res.status(500).json({ message: 'Internal server error' });
          }
          console.log('Data inserted into MySQL:', result);
          res.status(201).json({ message: 'Data inserted successfully' });
        }
      );
});  


app.post('/authen', jsonParser, function (req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1]
    var decoded = jwt.verify(token, secret);
    res.json({status: 'success', decoded})
    return;
  } catch (error) {
    res.json({status: 'error', message: error.message})
  }
})

create_password = function(passwd, method, salt) {
  var hmac;
  method || (method = "sha1");
  salt || (salt = crypto.randomBytes(6).toString('base64'));
  hmac = crypto.createHmac(method, salt);
  hmac.end(passwd);
  return {
    hash: hmac.read().toString('hex'),
    salt: salt,
    method: method
  };
};

check_password = function(hashed, passwd) {
  var hash, hashp, method, salt, _ref;
  _ref = hashed.split("$"), method = _ref[0], salt = _ref[1], hashp = _ref[2];
  hash = create_password(passwd, method, salt).hash;
  return hash === hashp;
};

