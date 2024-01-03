module.exports = class Cliente { 
  constructor() {
    this.cpf = "";
    this.nome = "";
    this.endereco = "";
    this.telefone = "";
  }
    
  inserir(conexao) {
    var sql = "INSERT INTO clientes (cpf,nome,telefone,endereco) VALUES(?, ?, ?, ?)";

    conexao.query(sql, 
                  [this.cpf, this.nome, this.telefone, this.endereco], 
                  function (err, result) {
                    if (err) throw err;
                  }
    );
    
  }
  
  listar(conexao, callback) {
    var sql = "SELECT * FROM clientes";

    conexao.query(sql, 
                  function (err, result) {
		                if (err) throw err;
		                return callback(result);
                  }
    );    
  }

  pegarCliente(conexao, callback) {
    var sql = "SELECT * FROM clientes WHERE cpf = ?";

    conexao.query(sql, [this.cpf],
                  function (err, result) {
		                if (err) throw err;
                    return callback(result);
                  }
    );    
  }

}