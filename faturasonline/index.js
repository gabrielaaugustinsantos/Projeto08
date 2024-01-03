const express = require('express');
const app = express();                 /* npm i --s ejs */

app.use(express.static(__dirname + '/views'));

app.listen(3000, function(){
  console.log("Servidor no ar - Porta: 3000!")
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

const Fatura = require('./model/Fatura');
const Cliente = require('./model/Cliente');
const Servico = require('./model/Servico');

var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tabajara"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Banco de dados conectado!");
});


app.get('/', function(req, res){
	res.sendFile(__dirname + '/views/index.html');
});


/* Funções de Clientes */

app.get('/clientes', function(req, res){
	
	var c = new Cliente();  
    c.listar(con, function(result){
		res.render('cliente/lista.ejs', {clientes: result});
	});
	  
});

app.get('/formCliente', function(req, res){
	res.sendFile(__dirname + '/views/cliente/formulario.html');
});

app.post('/salvarCliente', function(req, res){
	var c = new Cliente();
		
	c.cpf = req.body.cpf;
	c.nome = req.body.nome;
	c.telefone = req.body.telefone;
	c.endereco = req.body.endereco;
	
	c.inserir(con);
	
	res.render('cliente/resultado.ejs', {param: c});
});



/* Funções de Serviços */

app.get('/servicos', function(req, res){
	
	var s = new Servico();  
    s.listar(con, function(result){
		res.render('servico/lista.ejs', {servicos: result});
	});
	  
});

app.get('/formServico', function(req, res){
	res.sendFile(__dirname + '/views/servico/formulario.html');
});

app.post('/salvarServico', function(req, res){
	var s = new Servico();
	
	s.descricao = req.body.descricao_servico;
	s.dataRealizacao = req.body.data_realizacao;
	s.tipoServico = req.body.tipo;
	s.tempoRealizacao = req.body.tempo;
	s.valorHora = req.body.valor_unitario;
	
	s.inserir(con);

	res.render('servico/resultado.ejs', {param: s});
});




/* Funções de Faturas */

app.get('/faturas', function(req, res){
	
	var f = new Fatura();  
    f.listar(con, function(result){
		res.render('fatura/lista.ejs', {faturas: result});
	});
	  
});


app.get('/formFartura', function(req, res){
	var cli = new Cliente();
	var serv = new Servico();

	cli.listar(con, function(result1) {
		serv.listar(con, function(result2) {
			res.render('fatura/formulario.ejs', {clientes: result1, servicos: result2});
		});
	});
	  
});

app.post('/salvarFatura', function(req, res){
	var fat = new Fatura();
	
	fat.cli.cpf = req.body.cpf;
	fat.serv.id = req.body.id_servico;
	fat.dataEmissao = req.body.data_emissao;
	fat.dataVencimento = req.body.data_vencimento;

	fat.inserir(con, function(result) {
		fat.cli.pegarCliente(con, function(result1) {
			fat.cli.nome = result1[0].nome;
			fat.cli.telefone = result1[0].telefone;
			fat.cli.endereco = result1[0].endereco;

			fat.serv.pegarServico(con, function(result2) {
				fat.serv.descricao = result2[0].descricao;
				fat.serv.tipoServico = result2[0].tipo_servico;
				fat.serv.tempoRealizacao = result2[0].tempo_realizacao;
				fat.serv.dataRealizacao = result2[0].data_realizacao;
				fat.serv.valorHora = result2[0].valor_hora;

				fat.valorTotal = fat.serv.tempoRealizacao * fat.serv.valorHora;
				fat.valorIcms = fat.valorTotal * 0.2;

				res.render('fatura/resultado.ejs', {param: fat});
			});
		});
	});
});
