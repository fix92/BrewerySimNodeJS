var express = require('express');
var app = express();
var fs = require("fs");
var sqlite3 = require('sqlite3').verbose();
var file = "data.db"
var db = new sqlite3.Database(file);
var exists = fs.existsSync(file);

// dummy init values
var lastRow = [20, 20, 30, 20, 25, 30, 20, 15, 30, 20, 20, 30, 20, 25, 30, 20, 15, 30];

// brewing stages
var stages = ['Brewing', 'Phase 2', 'Fermenting', 'Aging', 'Testing', 'Bottling'];

// create SQLite database with table factoryUnits
db.serialize(function() {

    if (!exists) {
        db.run('CREATE TABLE factoryUnits (\
		Unit1Name TEXT, Unit1Temp INTEGER, Unit1Visco INTEGER, Unit1Level INTEGER, Unit1Stage TEXT, \
		Unit2Name TEXT, Unit2Temp INTEGER, Unit2Visco INTEGER, Unit2Level INTEGER, Unit2Stage TEXT, \
		Unit3Name TEXT, Unit3Temp INTEGER, Unit3Visco INTEGER, Unit3Level INTEGER, Unit3Stage TEXT, \
		Unit4Name TEXT, Unit4Temp INTEGER, Unit4Visco INTEGER, Unit4Level INTEGER, Unit4Stage TEXT, \
		Unit5Name TEXT, Unit5Temp INTEGER, Unit5Visco INTEGER, Unit5Level INTEGER, Unit5Stage TEXT, \
		Unit6Name TEXT, Unit6Temp INTEGER, Unit6Visco INTEGER, Unit6Level INTEGER, Unit6Stage TEXT)');
        var stmt = db.prepare('INSERT INTO factoryUnits VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
        stmt.run('dummy', 0, 0, 0, 'dummy', 'dummy', 0, 0, 0, 'dummy', 'dummy', 0, 0, 0, 'dummy', 'dummy', 0, 0, 0, 'dummy', 'dummy', 0, 0, 0, 'dummy', 'dummy', 0, 0, 0, 'dummy');

        stmt.finalize();
    }
});

// GET for complete database
app.get('/all', function(req, res) {

    db.all('SELECT rowid AS id,\
		Unit1Name, Unit1Temp, Unit1Visco, Unit1Level, Unit1Stage, \
		Unit2Name, Unit2Temp, Unit2Visco, Unit2Level, Unit2Stage, \
		Unit3Name, Unit3Temp, Unit3Visco, Unit3Level, Unit3Stage, \
		Unit4Name, Unit4Temp, Unit4Visco, Unit4Level, Unit4Stage, \
		Unit5Name, Unit5Temp, Unit5Visco, Unit5Level, Unit5Stage, \
		Unit6Name, Unit6Temp, Unit6Visco, Unit6Level, Unit6Stage FROM factoryUnits', function(err, rows) {
        var result = []
        rows.forEach(function(row) {
            var innerResult = {
                id: row.id,
                Unit1: {
                    Name: row.Unit1Name,
                    Temp: row.Unit1Temp,
                    Visco: row.Unit1Visco,
                    Level: row.Unit1Level,
                    Stage: row.Unit1Stage
                },
                Unit2: {
                    Name: row.Unit2Name,
                    Temp: row.Unit2Temp,
                    Visco: row.Unit2Visco,
                    Level: row.Unit2Level,
                    Stage: row.Unit2Stage
                },
                Unit3: {
                    Name: row.Unit3Name,
                    Temp: row.Unit3Temp,
                    Visco: row.Unit3Visco,
                    Level: row.Unit3Level,
                    Stage: row.Unit3Stage
                },
                Unit4: {
                    Name: row.Unit4Name,
                    Temp: row.Unit4Temp,
                    Visco: row.Unit4Visco,
                    Level: row.Unit4Level,
                    Stage: row.Unit4Stage
                },
                Unit5: {
                    Name: row.Unit5Name,
                    Temp: row.Unit5Temp,
                    Visco: row.Unit5Visco,
                    Level: row.Unit5Level,
                    Stage: row.Unit5Stage
                },
                Unit6: {
                    Name: row.Unit6Name,
                    Temp: row.Unit6Temp,
                    Visco: row.Unit6Visco,
                    Level: row.Unit6Level,
                    Stage: row.Unit6Stage
                }
            };
            result.push(innerResult);
        })
        res.send(JSON.stringify(result));
    });

});

// GET for latest 5 entries
app.get('/latest', function(req, res) {

    db.all('SELECT rowid AS id,\
		Unit1Name, Unit1Temp, Unit1Visco, Unit1Level, Unit1Stage, \
		Unit2Name, Unit2Temp, Unit2Visco, Unit2Level, Unit2Stage, \
		Unit3Name, Unit3Temp, Unit3Visco, Unit3Level, Unit3Stage, \
		Unit4Name, Unit4Temp, Unit4Visco, Unit4Level, Unit4Stage, \
		Unit5Name, Unit5Temp, Unit5Visco, Unit5Level, Unit5Stage, \
		Unit6Name, Unit6Temp, Unit6Visco, Unit6Level, Unit6Stage FROM factoryUnits ORDER BY rowid DESC LIMIT 5', function(err, rows) {
        var result = []
        rows.forEach(function(row) {
            var innerResult = {
                id: row.id,
                Unit1: {
                    Name: row.Unit1Name,
                    Temp: row.Unit1Temp,
                    Visco: row.Unit1Visco,
                    Level: row.Unit1Level,
                    Stage: row.Unit1Stage
                },
                Unit2: {
                    Name: row.Unit2Name,
                    Temp: row.Unit2Temp,
                    Visco: row.Unit2Visco,
                    Level: row.Unit2Level,
                    Stage: row.Unit2Stage
                },
                Unit3: {
                    Name: row.Unit3Name,
                    Temp: row.Unit3Temp,
                    Visco: row.Unit3Visco,
                    Level: row.Unit3Level,
                    Stage: row.Unit3Stage
                },
                Unit4: {
                    Name: row.Unit4Name,
                    Temp: row.Unit4Temp,
                    Visco: row.Unit4Visco,
                    Level: row.Unit4Level,
                    Stage: row.Unit4Stage
                },
                Unit5: {
                    Name: row.Unit5Name,
                    Temp: row.Unit5Temp,
                    Visco: row.Unit5Visco,
                    Level: row.Unit5Level,
                    Stage: row.Unit5Stage
                },
                Unit6: {
                    Name: row.Unit6Name,
                    Temp: row.Unit6Temp,
                    Visco: row.Unit6Visco,
                    Level: row.Unit6Level,
                    Stage: row.Unit6Stage
                }
            };
            result.push(innerResult);
        })
        res.send(JSON.stringify(result));
    });

});

// GET for latest entry
app.get('/latestRow', function(req, res) {

    db.all('SELECT rowid AS id,\
		Unit1Name, Unit1Temp, Unit1Visco, Unit1Level, Unit1Stage, \
		Unit2Name, Unit2Temp, Unit2Visco, Unit2Level, Unit2Stage, \
		Unit3Name, Unit3Temp, Unit3Visco, Unit3Level, Unit3Stage, \
		Unit4Name, Unit4Temp, Unit4Visco, Unit4Level, Unit4Stage, \
		Unit5Name, Unit5Temp, Unit5Visco, Unit5Level, Unit5Stage, \
		Unit6Name, Unit6Temp, Unit6Visco, Unit6Level, Unit6Stage FROM factoryUnits ORDER BY rowid DESC LIMIT 1', function(err, rows) {
        var result = []
        rows.forEach(function(row) {
            var innerResult = {
                id: row.id,
                Unit1: {
                    Name: row.Unit1Name,
                    Temp: row.Unit1Temp,
                    Visco: row.Unit1Visco,
                    Level: row.Unit1Level,
                    Stage: row.Unit1Stage
                },
                Unit2: {
                    Name: row.Unit2Name,
                    Temp: row.Unit2Temp,
                    Visco: row.Unit2Visco,
                    Level: row.Unit2Level,
                    Stage: row.Unit2Stage
                },
                Unit3: {
                    Name: row.Unit3Name,
                    Temp: row.Unit3Temp,
                    Visco: row.Unit3Visco,
                    Level: row.Unit3Level,
                    Stage: row.Unit3Stage
                },
                Unit4: {
                    Name: row.Unit4Name,
                    Temp: row.Unit4Temp,
                    Visco: row.Unit4Visco,
                    Level: row.Unit4Level,
                    Stage: row.Unit4Stage
                },
                Unit5: {
                    Name: row.Unit5Name,
                    Temp: row.Unit5Temp,
                    Visco: row.Unit5Visco,
                    Level: row.Unit5Level,
                    Stage: row.Unit5Stage
                },
                Unit6: {
                    Name: row.Unit6Name,
                    Temp: row.Unit6Temp,
                    Visco: row.Unit6Visco,
                    Level: row.Unit6Level,
                    Stage: row.Unit6Stage
                }
            };
            result.push(innerResult);
        })
        res.send(JSON.stringify(result));
    });

});


app.listen(80, function() {
    console.log('Machine Database listening on port 80!');
});

// add new Record every 5 seconds
setInterval(function() {
    addARecord();
}, 1000 * 1);

// update Brewing cycle every 15 seconds
setInterval(function() {
    temp = stages.pop();
    stages.unshift(temp);
}, 1000 * 15);

// reset database to prevent huge file dumps
setInterval(function() {
    db.run('DELETE FROM factoryUnits');
    console.log('Reset Table');
}, 1000 * 60 * 60 * 24);

// adds one row to the database
function addARecord() {
    var stmt = db.prepare('INSERT INTO factoryUnits VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
    lastRowTmp = lastRow
    lastRow = [decVal(lastRowTmp[0], 2, 5, 60),
        incVal(lastRowTmp[1], 2, 20, 30),
        incVal(lastRowTmp[2], 4, 2, 100),

        incVal(lastRowTmp[3], 3, 30, 100),
        incVal(lastRowTmp[4], 2, 25, 35),
        decVal(lastRowTmp[5], 3, 50, 80),

        incVal(lastRowTmp[6], 2, 35, 85),
        incVal(lastRowTmp[7], 2, 15, 25),
        incVal(lastRowTmp[8], 2, 60, 90),

        incVal(lastRowTmp[9], 2, 5, 60),
        incVal(lastRowTmp[10], 2, 20, 30),
        decVal(lastRowTmp[11], 4, 1, 100),

        decVal(lastRowTmp[12], 3, 30, 100),
        incVal(lastRowTmp[13], 2, 25, 35),
        decVal(lastRowTmp[14], 2, 50, 80),

        incVal(lastRowTmp[15], 3, 35, 85),
        decVal(lastRowTmp[16], 2, 15, 25),
        decVal(lastRowTmp[17], 3, 60, 90)
    ];
    stmt.run('Aging Vessel', lastRow[0], lastRow[1], lastRow[2], stages[0],
        'Brew Kettle', lastRow[3], lastRow[4], lastRow[5], stages[1],
        'Bright Beer Vessel', lastRow[6], lastRow[7], lastRow[8], stages[2],
        'Strong Beer', lastRow[9], lastRow[10], lastRow[11], stages[3],
        'Oktoberfest Beer', lastRow[12], lastRow[13], lastRow[14], stages[4],
        'Duff Beer', lastRow[15], lastRow[16], lastRow[17], stages[5]);
    stmt.finalize();
    console.log('Record added with the Timer!');
}

// increasing value generator, jumps back to top when max exceeded
function incVal(base, step, min, max) {
    tempResult = base + Math.floor(Math.random() * step);
    if (tempResult >= max) {
        return min;
    } else return tempResult;
}

// dexreasing value generator, jumps back to top when max exceeded
function decVal(base, step, min, max) {
    tempResult = base - Math.floor(Math.random() * step);
    if (tempResult <= min) {
        return max;
    } else return tempResult;
}