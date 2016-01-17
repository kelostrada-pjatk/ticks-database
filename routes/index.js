var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express2' });
});

var id = 1;
var ticks = [{
    id: 1,
    symbol: 'EURUSD',
    timestamp: 1453027629,
    bid: 1.08,
    ask: 1.081,
    volume: 100
}];

var findTick = function(id) {
    var tick = false;
    ticks.forEach(function(t) {
        if (t.id == id) {
            tick = t;
        }
    });
    return tick;
};

var removeTick = function(id) {
    ticks.forEach(function(tick, pos) {
        if (tick.id == id) {
            ticks.splice(pos, 1);
            return;
        }
    });
};

router.get('/ticks', function(req, res, next) {
    res.render('ticks/index', { title: 'Ticks list', ticks: ticks });
});

router.get('/ticks/create', function(req, res, next) {
    res.render('ticks/create', { title: 'Create Tick' });
});

router.post('/ticks/create', function(req, res, next) {
    req.body.id = ++id;
    ticks.push(req.body);
    res.redirect('/ticks/' + id);
});

router.get('/ticks/:id', function(req, res, next) {
    var tick = findTick(req.params.id);
    console.log(tick);
    res.render('ticks/view', { title: 'Tick details', tick: tick });
});

router.get('/ticks/edit/:id', function(req, res, next) {
    var tick = findTick(req.params.id);
    res.render('ticks/edit', { title: 'Edit Tick', tick: tick });
});

router.post('/ticks/edit/:id', function(req, res, next) {
    var tick = findTick(req.params.id);
    tick.symbol = req.body.symbol;
    tick.timestamp = req.body.timestamp;
    tick.ask = req.body.ask;
    tick.bid = req.body.bid;
    tick.volume = req.body.volume;
    res.redirect('/ticks/' + tick.id);
});

router.get('/ticks/delete/:id', function(req, res, next) {
    var tick = findTick(req.params.id);
    res.render('ticks/delete', { title: 'Delete Tick', tick: tick });
});

router.post('/ticks/delete/:id', function(req, res, next) {
    removeTick(req.params.id,1);
    res.redirect('/ticks/');
});

module.exports = router;
