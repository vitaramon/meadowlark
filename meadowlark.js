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

//Открытие порта nvm
app.set('port', process.env.PORT || 3000);

// домашняя страница
app.get('/', function(req, res) {
    res.render('home');
});
//страница "о нас"
app.get('/about', function(req, res){
    res.render('about', { fortune: fortune.getFortune() });
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
app.listen(app.get('port'), function(){
    console.log( 'Express запущен на http://localhost:' +
      app.get('port') + '; нажмите Ctrl+C для завершения.' );
});
