var express = require('express');
var fortune = require('./lib/fortune.js');
var app = express();

// Установка механизма представления handlebars
var handlebars
 = require('express-handlebars')
.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//добавление промежуточного ПО static
app.use(express.static(__dirname + '/public'));

//добавление промежуточного ПО для распознания ?test1
app.use(function(req,res,next) {
	res.locals.showTests = app.get('env') !== 'production' &&
		req.query.test === '1';
	next();	
});

//Открытие порта nvm
app.set('port', process.env.PORT || 3000);

// домашняя страница
app.get('/', function(req, res) {
    res.render('home');
});
//страница "о нас"
app.get('/about', function(req, res){
    res.render('about', { 
		fortune: fortune.getFortune(),
		pageTestScript: '/qa/tests-about.js'
		});
});

//Маршрут для страницы туров hood river
app.get('/tours/hood-river', function(req, res){
    res.render('tours/hood-river');
});
//Маршрут для запроса группового тура
app.get('/tours/request-group-rate', function(req, res){
    res.render('tours/request-group-rate');
});

// Обобщенный обработчик 404 (промежуточное ПО)
app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});
// Обработчик ошибки 500 (промежуточное ПО)
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

//app listen
app.listen(app.get('port'), function(){
    console.log( 'Express запущен на http://localhost:' +
      app.get('port') + '; нажмите Ctrl+C для завершения.' );
});
