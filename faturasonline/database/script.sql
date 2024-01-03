create database tabajara;
use tabajara;
create table clientes (
   cpf varchar(11) not null,
   nome varchar(100),
   telefone varchar(13),
   endereco text,
   primary key(cpf)
);
create table servicos (
    id int not null auto_increment,
    descricao varchar(200),
    tipo_servico int,
	tempo_realizacao int,
	data_realizacao date,
	valor_hora float,
    primary key (id)
);
create table faturas (
    id int not null auto_increment,
    cpf_cliente varchar(11) not null,
	id_servico int not null,
    data_emissao date,
    data_vencimento date,
	valor_total float,
	valor_icms float,
	primary key(id),
    foreign key(cpf_cliente) references clientes(cpf),
    foreign key(id_servico) references servicos(id)
);