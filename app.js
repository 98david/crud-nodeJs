const express = require('express')
const mysql = require('mysql')
const handlebars = require('express-handlebars')
'use strict'


const app = express()
const port = 1111

const sql = mysql.createConnection({
	host:'localhost' ,
	user: 'root',
	password: '',
	port: '3306'
})

sql.query('use crud_node_js')

//Templates engine
app.engine(".handlebars", handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')


		//Statics Files
// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static('public')); 
app.use('/css', express.static(__dirname +'public/css'));
app.use('/js',express.static(__dirname +'public/js'));
app.use('/img',express.static(__dirname +'public/img'));

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.text({type: 'text/html'}))


//Routes And Templates
app.get('/', (req, res) => {
	// res.send("Welcome espress + node js!")
	// res.sendFile(__dirname + "/index.html")
	// console.log(req.params.id) //pegar os dados atraves da url
	// res.render("index", {id:req.params.id}) //passar dados na interface
	res.render("index")
})

app.get('/insert', (req,res) => {
	res.render('inserir')
})

app.get('/select/:id?', (req,res) => {
	if(!req.params.id){
		sql.query('select * from users order by id asc', (err,results,fields) => {
			res.render('select', {data:results})
		})
	} else {
		sql.query('select * from users where id=? order by id asc',[req.params.id], (err,results,fields) => {
			res.render('select', {data:results})
		})
	}
})

app.post('/controllerUser', (req,res) => {
	// console.log(req.body.name) //Buscando os dados do urlencodeParser
	sql.query('insert into users values(?,?,?)', [
		req.body.id,
		req.body.name,
		req.body.age
	])
	res.render('controllerUser', {name: req.body.name})
})

app.get('/delete/:id', (req,res) => {
	sql.query('delete from users where id=? ',[req.params.id])
	res.render('delete')
} )

app.get('/update/:id', (req,res) => {
	sql.query('select * from users where id=?', [req.params.id],function(err, results, fields){
		res.render('update',{id:results[0].id, name:results[0].name, age:results[0].age})
	} )
} )

app.post('/controllerUpdate', (req,res) => {
	console.log(req.body)
	sql.query('update users set name=? , age=?  where id=?', [req.body.name, req.body.age,req.body.id])
	res.render('controllerUpdate')
} )

app.listen(port, () =>{
	console.log(`Server  app on http://localhost:${port}`)
})
