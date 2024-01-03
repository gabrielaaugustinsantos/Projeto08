module.exports = class Servico { 
	constructor() {
		this.id = 0;
		this.descricao = "";
		this.tipoServico = 0;
		this.tempoRealizacao = 0;
		this.dataRealizacao = "";
		this.valorHora = 0.0;
	}
  
	inserir(conexao) {
		var sql = "INSERT INTO servicos (descricao,tipo_servico,tempo_realizacao,data_realizacao,valor_hora) VALUES(?, ?, ?, ?, ?)";

		conexao.query(sql, 
					  [this.descricao, this.tipoServico, this.tempoRealizacao, this.dataRealizacao, this.valorHora], 
					  function (err, result) {
						if (err) throw err;
					  }
		);
	}
  
	listar(conexao, callback) {
		var sql = "SELECT * FROM servicos";

		conexao.query(sql, 
					  function (err, result) {
						if (err) throw err;
						return callback(result);
					}
		);    
	}

	pegarServico(conexao, callback) {
		var sql = "SELECT descricao, tipo_servico, tempo_realizacao, "+
				  "       date_format(data_realizacao, '%d/%m/%Y') as data_realizacao, "+
				  "       valor_hora "+
				  "  FROM servicos "+
				  "WHERE id = ?";
	
		conexao.query(sql, [this.id],
					  function (err, result) {
						if (err) throw err;
						return callback(result);
					  }
		);    
	  }
}