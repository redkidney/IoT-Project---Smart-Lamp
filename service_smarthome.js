const express = require('express');
const axios = require('axios');
const mqtt = require('mqtt');
const path = require('path');
const mysql = require('mysql');
// for parsing the body in POST request
var bodyParser = require('body-parser');
var schedule = require('node-schedule');


const mqttServer = "103.102.146.147";
const mqttPort = 1883;
var mqttTopic = "1";

const client = mqtt.connect(`mqtt://${mqttServer}:${mqttPort}`, {
  
});

const app = express();
app.use(express.json());
app.use(express.static('smarthome'));

app.get('/smarthome', (req, res) => {
  const indexPath = path.join(__dirname, 'smarthome', 'index.html');
  res.sendFile(indexPath);
});

var con = mysql.createConnection({
  host: "localhost",
  user: "user1",
  password: "sm@rth0me#",
  database: "db_smarthome"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});

// set body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/relay', (req, res) => {
  const { action } = req.body;
  var  idsaklar  = req.body.ID_Saklar;
  var  status  = req.body.Status;

  
    con.query("UPDATE t_lampu set status = '"+status+"' WHERE id_saklar = "+idsaklar+" ", function (err, result, fields) {
      con.query("UPDATE t_saklar set status = '"+status+"' WHERE id_saklar = "+idsaklar+" ", function (err, result, fields){

      });

        con.query("SELECT * FROM t_saklar WHERE Id_saklar = "+idsaklar+" ", function (err, resultdata, fields) {
          if (err) throw err;
          console.log('hasil query:', resultdata);

          Object.keys(resultdata).forEach(function(key) {
            var row = resultdata[key];
            // console.log(row.kode_saklar);
            mqttTopic = row.kode_saklar

            con.query("SELECT * FROM t_lampu WHERE Id_saklar = "+idsaklar+" ", function (err, resultdata, fields) {
              Object.keys(resultdata).forEach(function(id) {
              var report = resultdata[id];
              console.log('hasil query lampu:', resultdata);
              
              var insert = "INSERT INTO t_report (id_gedung, id_lantai, id_ruang, id_pengguna, id_saklar, id_lampu, id_alat, statuslampu) VALUES ("+report.id_gedung+","+report.id_lantai+","+report.id_ruang+","+report.id_pengguna+","+report.id_saklar+","+report.id+","+report.id_alat+",'"+report.status+"')";
              con.query(insert, function (err, resultdata, fields){
                console.log("Hasil insert:", resultdata);
                if (err) throw err;
              });
            });

          });

          if (action === 'on1') {
            mqttTopic = 'R1';
            publishMessage("ON1");
            res.json({ message: 'Relay 1 turned ON' });

          } else if (action === 'off1') {
            mqttTopic = 'R1';
            publishMessage("OFF1");
            res.json({ message: 'Relay 1 turned OFF' });

          }
          else if (action === 'on2') {
            mqttTopic = 'R2';
            publishMessage("ON2");
            res.json({ message: 'Relay 2 turned ON' });
          }
          else if (action === 'off2') {
            mqttTopic = 'R2';
            publishMessage("OFF2");
            res.json({ message: 'Relay 2 turned OFF' });
          
          }
          else if (action === 'on3') {
            mqttTopic = 'R3';
            publishMessage("ON3");
            res.json({ message: 'Relay 3 turned ON' });
          }
          else if (action === 'off3') {
            mqttTopic = 'R3';
            publishMessage("OFF3");
            res.json({ message: 'Relay 3 turned OFF' });
          
          }
          else if (action === 'on4') {
            mqttTopic = 'R4';
            publishMessage("ON4");
            res.json({ message: 'Relay 4 turned ON' });
          }
          else if (action === 'off4') {
            mqttTopic = 'R4';
            publishMessage("OFF4");
            res.json({ message: 'Relay 4 turned OFF' });
          
          }

          else if (action === 'on5') {
            mqttTopic = 'R5';
            publishMessage("ON5");
            res.json({ message: 'Relay 5 turned ON' });

          } else if (action === 'off5') {
            mqttTopic = 'R5';
            publishMessage("OFF5");
            res.json({ message: 'Relay 5 turned OFF' });

          }
          else if (action === 'on6') {
            mqttTopic = 'R6';
            publishMessage("ON6");
            res.json({ message: 'Relay 6 turned ON' });
          }
          else if (action === 'off6') {
            mqttTopic = 'R6';
            publishMessage("OFF6");
            res.json({ message: 'Relay 6 turned OFF' });
          
          }
          else if (action === 'on7') {
            mqttTopic = 'R7';
            publishMessage("ON7");
            res.json({ message: 'Relay 7 turned ON' });
          }
          else if (action === 'off7') {
            mqttTopic = 'R7';
            publishMessage("OFF7");
            res.json({ message: 'Relay 7 turned OFF' });
          
          }
          else if (action === 'on8') {
            mqttTopic = 'R8';
            publishMessage("ON8");
            res.json({ message: 'Relay 8 turned ON' });
          }
          else if (action === 'off8') {
            mqttTopic = 'R8';
            publishMessage("OFF8");
            res.json({ message: 'Relay 8 turned OFF' });
          
          }

          else if (action === 'on9') {
            mqttTopic = 'R9';
            publishMessage("ON9");
            res.json({ message: 'Relay 9 turned ON' });

          } else if (action === 'off9') {
            mqttTopic = 'R9';
            publishMessage("OFF9");
            res.json({ message: 'Relay 9 turned OFF' });

          }
          else if (action === 'on10') {
            mqttTopic = 'R10';
            publishMessage("ON10");
            res.json({ message: 'Relay 10 turned ON' });
          }
          else if (action === 'off10') {
            mqttTopic = 'R10';
            publishMessage("OFF10");
            res.json({ message: 'Relay 10 turned OFF' });
          
          }
          else if (action === 'on11') {
            mqttTopic = 'R11';
            publishMessage("ON11");
            res.json({ message: 'Relay 11 turned ON' });
          }
          else if (action === 'off11') {
            mqttTopic = 'R11';
            publishMessage("OFF11");
            res.json({ message: 'Relay 11 turned OFF' });
          
          }
          else if (action === 'on12') {
            mqttTopic = 'R12';
            publishMessage("ON12");
            res.json({ message: 'Relay 12 turned ON' });
          }
          else if (action === 'off12') {
            mqttTopic = 'R12';
            publishMessage("OFF12");
            res.json({ message: 'Relay 12 turned OFF' });
          
          }

          else if (action === 'on13') {
            mqttTopic = 'R13';
            publishMessage("ON13");
            res.json({ message: 'Relay 13 turned ON' });

          } else if (action === 'off13') {
            mqttTopic = 'R13';
            publishMessage("OFF13");
            res.json({ message: 'Relay 13 turned OFF' });

          }
          else if (action === 'on14') {
            mqttTopic = 'R14';
            publishMessage("ON14");
            res.json({ message: 'Relay 14 turned ON' });
          }
          else if (action === 'off14') {
            mqttTopic = 'R14';
            publishMessage("OFF14");
            res.json({ message: 'Relay 14 turned OFF' });
          
          }
          else if (action === 'on15') {
            mqttTopic = 'R15';
            publishMessage("ON15");
            res.json({ message: 'Relay 15 turned ON' });
          }
          else if (action === 'off15') {
            mqttTopic = 'R15';
            publishMessage("OFF15");
            res.json({ message: 'Relay 15 turned OFF' });
          
          }
          else if (action === 'on16') {
            mqttTopic = 'R16';
            publishMessage("ON16");
            res.json({ message: 'Relay 16 turned ON' });
          }
          else if (action === 'off16') {
            mqttTopic = 'R16';
            publishMessage("OFF16");
            res.json({ message: 'Relay 16 turned OFF' });
          
          }
          else {
            res.status(400).json({ message: 'Invalid action' });
          }
      });
    });
  });
});

app.post('/dynamic', (req, res) => {
  var  idsaklar  = req.body.ID_Saklar;
  var  status  = req.body.Status;
  var  status_relay = req.body.Status_relay;
  console.log('cek data',req.body)

  con.query("UPDATE t_lampu set status = '"+status+"' WHERE id_saklar = "+idsaklar+" ", function (err, result, fields) {
    con.query("UPDATE t_saklar set status = '"+status+"' WHERE id_saklar = "+idsaklar+" ", function (err, result, fields){

    });

    if (err) throw err;
    // console.log(result);
    if (!err) {
      // console.log('success');
      con.query("SELECT * FROM t_saklar WHERE Id_saklar = "+idsaklar+" ", function (err, resultdata, fields) {
        if (err) throw err;
        console.log('hasil query:', resultdata);

        Object.keys(resultdata).forEach(function(key) {
          var row = resultdata[key];
          // console.log(row.kode_saklar);
          mqttTopic = row.kode_saklar

          con.query("SELECT * FROM t_lampu WHERE Id_saklar = "+idsaklar+" ", function (err, resultdata, fields) {
            Object.keys(resultdata).forEach(function(id) {
            var report = resultdata[id];
            console.log('hasil query lampu:', resultdata);
            
            var insert = "INSERT INTO t_report (id_gedung, id_lantai, id_ruang, id_pengguna, id_saklar, id_lampu, id_alat, statuslampu) VALUES ("+report.id_gedung+","+report.id_lantai+","+report.id_ruang+","+report.id_pengguna+","+report.id_saklar+","+report.id+","+report.id_alat+",'"+report.status+"')";
            con.query(insert, function (err, resultdata, fields){
              console.log("Hasil insert:", resultdata);
              if (err) throw err;
            });
          });

        });

          if (mqttTopic.length === 2) {
            var relay = row.kode_saklar.split('R')[1] 
            publishMessage(status_relay+relay);
            res.json({ message: 'Relay '+relay+' turned ' + status_relay+relay });
            console.log('Relay '+relay+'' + status_relay+relay)
          }
          else if (mqttTopic.length === 3) {
            var relay = row.kode_saklar.split('R')[1]
            publishMessage(status_relay+relay);
            res.json({ message: 'Relay '+relay+' turned ' + status_relay+relay });
            console.log('Relay '+relay+'' + status_relay+relay)
          }
        });
      });
    }
    else{
      console.log('failed');
    }


    
  });
});


function scheduleJadwal() {
  // Mengambil jadwal dari database
  con.query('SELECT * FROM t_schedule WHERE status = "true"', (error, results) => {
    if (error) throw error;
    // Loop melalui hasil query dan membuat jadwal dengan node-schedule
    results.forEach((jadwal) => {
      const { id_schedule, id_saklar, start_time, end_time,  status } = jadwal;

      // Membuat aturan jadwal menggunakan node-schedule
      const start = new schedule.RecurrenceRule();
      const startTimeParts = start_time.split(':');
      start.hour = parseInt(startTimeParts[0], 10);
      start.minute = parseInt(startTimeParts[1], 10);

      const end = new schedule.RecurrenceRule();
      const endTimeParts = end_time.split(':');
      end.hour = parseInt(endTimeParts[0], 10);
      end.minute = parseInt(endTimeParts[1], 10)

      // Menjalankan aksi saklar sesuai jadwal
      const on = schedule.scheduleJob(start, function() {
        const idsaklar = id_saklar;
        const status = 'on';

        const postData = {
          ID_Saklar: idsaklar,
          Status: status,
          Status_relay: status.toUpperCase()
        };

        axios.post('http://localhost:3000/dynamic', postData, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
      });

      const off = schedule.scheduleJob(end, function(){
        const idsaklar = id_saklar;
        const status = 'off';

        const postData = {
          ID_Saklar: idsaklar,
          Status: status,
          Status_relay: status.toUpperCase()
        };

        axios.post('http://localhost:3000/dynamic', postData, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
      })
    });
  });
}

client.on('connect', () => {
  console.log('Connected to MQTT broker');
  client.subscribe(mqttTopic);
});

client.on('message', (topic, message) => {
  console.log('Received message:', message.toString());
  // Lakukan aksi yang sesuai berdasarkan pesan yang diterima
  // Misalnya, jika pesan adalah "ON", hidupkan relay
  // Jika pesan adalah "OFF", matikan relay
});

function publishMessage(message) {
  client.publish(mqttTopic, message);
}

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

setInterval(scheduleJadwal, 10000);

