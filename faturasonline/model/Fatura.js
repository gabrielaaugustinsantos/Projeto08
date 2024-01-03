const Cliente = require('./Cliente');
const Servico = require('./Servico');

module.exports = class Fatura { 
	constructor() {
		this.id = 0;
		this.dataVencimento = "";
		this.dataEmissao = "";
		this.valorTotal = 0.0;
		this.valorIcms = 0.0;
		this.cli = new Cliente();
		this.serv = new Servico();
	}

	listar(conexao, callback) {
		var sql = "SELECT faturas.id, faturas.cpf_cliente, faturas.id_servico, "+
				  "       date_format(faturas.data_emissao, '%d/%m/%Y') as data_emissao, "+
				  "       date_format(faturas.data_vencimento, '%d/%m/%Y') as data_vencimento, "+
				  "       faturas.valor_total, faturas.valor_icms, "+
				  "       clientes.nome, servicos.descricao "+
				  "  FROM faturas, clientes, servicos "+
				  " WHERE faturas.cpf_cliente = clientes.cpf "+
				  "   AND faturas.id_servico = servicos.id";

		conexao.query(sql, 
					function (err, result) {
						if (err) throw err;
						return callback(result);
					}
		);    
	}

	inserir(conexao, callback) {
		var sql = "INSERT INTO faturas (cpf_cliente, id_servico, data_emissao, data_vencimento, valor_total, valor_icms) VALUES(?, ?, ?, ?, ?, ?)";

		conexao.query(sql, 
					  [this.cli.cpf, this.serv.id, this.dataEmissao, this.dataVencimento, this.valorTotal, this.valorIcms], 
					  function (err, result) {
						if (err) throw err;
						return callback(result);
					  }
		);
	}
}