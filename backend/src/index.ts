import { AppDataSource } from "database/database";
import express from "express";
import cors from 'cors'
import clienteRoute from 'routes/cliente'
import produtoRoute from 'routes/produto'
import ServicoRoute from 'routes/servico'
import { produtos } from "models/produto";
import { servicos } from "models/servico";
import { cliente } from "models/cliente";
import { CPF } from "models/cpf";

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccesStatus: 200
};

const app = express();
try {
    AppDataSource.initialize().then(async () => {
        const find = await AppDataSource.createQueryBuilder()
            .select(["c"])
            .from(cliente, "c")
            .where("c.cliente_nome = :cliente_nome", { cliente_nome: "Gabriel Souza Bicho Nunes" })
            .getOne()
        console.log('Banco conectado com sucesso');
        if (!(find)) {
            await AppDataSource.createQueryBuilder()
                .insert()
                .into(produtos)
                .values([
                    { produto_nome: "Sabonete", produto_valor: 10.00 },
                    { produto_nome: "Creme de Cabelo", produto_valor: 20.00 },
                    { produto_nome: "Cortador de unhas", produto_valor: 5.00 },
                    { produto_nome: "Creme Dental", produto_valor: 7.50 },
                    { produto_nome: "Creme Bucal", produto_valor: 7.50 },
                    { produto_nome: "Esmalte purpuro", produto_valor: 7.50 },
                    { produto_nome: "Pente fino", produto_valor: 7.50 },
                    { produto_nome: "Escova de cabelo", produto_valor: 7.50 },
                    { produto_nome: "Pinça", produto_valor: 7.50 },
                    { produto_nome: "Removedor de cuticula", produto_valor: 7.50 },
                    { produto_nome: "Tinta para cabelo", produto_valor: 7.50 },
                    { produto_nome: "Lenço umidecidos", produto_valor: 7.50 },
                ])
                .execute()
            await AppDataSource.createQueryBuilder()
                .insert()
                .into(servicos)
                .values([
                    { servico_nome: "Cortar Cabelo", servico_valor: 25.55 },
                    { servico_nome: "Manicure", servico_valor: 15.75 },
                    { servico_nome: "Pedicure", servico_valor: 15.75 },
                    { servico_nome: "Cabelo na régua", servico_valor: 150.00 },
                    { servico_nome: "Coloração de cabelo", servico_valor: 65.75 },
                    { servico_nome: "Tratamento de barba", servico_valor: 35.00 },
                    { servico_nome: "Tratamento de pele", servico_valor: 250.75 },
                    { servico_nome: "Remoção de pelos com cera", servico_valor: 15.00 },
                    { servico_nome: "Arrumação de barba", servico_valor: 500.99 },
                    { servico_nome: "Tratamento de cabelo", servico_valor: 20.95 },
                    { servico_nome: "Aplicação de chapinha", servico_valor: 50.75 },
                ])
                .execute()
            await AppDataSource.createQueryBuilder()
                .insert()
                .into(cliente)
                .values([
                    { cliente_nome: "Gabriel Souza Bicho Nunes", cliente_genero: "Masculino", cliente_nomeSocial: "Viking" },
                    { cliente_nome: "Vinicius Andrade", cliente_genero: "Masculino", cliente_nomeSocial: "Pardo" },
                    { cliente_nome: "Lucas Costa", cliente_genero: "Masculino", cliente_nomeSocial: "Lucas Costa" },
                    { cliente_nome: "Lucas Braz", cliente_genero: "Masculino", cliente_nomeSocial: "Banco de dados" },
                    { cliente_nome: "Prescilia", cliente_genero: "Feminino", cliente_nomeSocial: "Presidiaria" },
                    { cliente_nome: "Thais salomão", cliente_genero: "Feminino", cliente_nomeSocial: "Salmão" },
                    { cliente_nome: "Maria Clara", cliente_genero: "Feminino", cliente_nomeSocial: "Juliet" },
                    { cliente_nome: "Matheus", cliente_genero: "Masculino", cliente_nomeSocial: "Matias" },
                    { cliente_nome: "Mariana", cliente_genero: "Feminino", cliente_nomeSocial: "Miranda" },
                    { cliente_nome: "Rikio", cliente_genero: "Masculino", cliente_nomeSocial: "Rikio" },
                    { cliente_nome: "Rafael Lopes", cliente_genero: "Masculino", cliente_nomeSocial: "Lopez" },
                    { cliente_nome: "Masanori", cliente_genero: "Masculino", cliente_nomeSocial: "Python" },
                    { cliente_nome: "Arakaki", cliente_genero: "Masculino", cliente_nomeSocial: "C#" },
                    { cliente_nome: "Gerson", cliente_genero: "Masculino", cliente_nomeSocial: "Java" },
                    { cliente_nome: "Juliana", cliente_genero: "Feminino", cliente_nomeSocial: "Oracle" },
                    { cliente_nome: "Claudio", cliente_genero: "Masculino", cliente_nomeSocial: "JavaScript" },
                ])
                .execute()
            await AppDataSource.createQueryBuilder()
                .insert()
                .into(`produto_cliente`)
                .values([
                    { clienteClienteId: 1, produtosProdutoId: 1 }, { clienteClienteId: 1, produtosProdutoId: 2 },
                    { clienteClienteId: 1, produtosProdutoId: 3 }, { clienteClienteId: 1, produtosProdutoId: 4 },
                    { clienteClienteId: 1, produtosProdutoId: 5 }, { clienteClienteId: 1, produtosProdutoId: 6 },
                    { clienteClienteId: 1, produtosProdutoId: 7 }, { clienteClienteId: 1, produtosProdutoId: 8 },
                    { clienteClienteId: 1, produtosProdutoId: 10 }, { clienteClienteId: 1, produtosProdutoId: 11 },
                    { clienteClienteId: 1, produtosProdutoId: 12 }, { clienteClienteId: 2, produtosProdutoId: 1 },
                    { clienteClienteId: 2, produtosProdutoId: 2 }, { clienteClienteId: 2, produtosProdutoId: 3 },
                    { clienteClienteId: 2, produtosProdutoId: 4 }, { clienteClienteId: 2, produtosProdutoId: 5 },
                    { clienteClienteId: 3, produtosProdutoId: 1 }, { clienteClienteId: 3, produtosProdutoId: 2 },
                    { clienteClienteId: 3, produtosProdutoId: 3 }, { clienteClienteId: 3, produtosProdutoId: 4 },
                    { clienteClienteId: 4, produtosProdutoId: 1 }, { clienteClienteId: 4, produtosProdutoId: 2 },
                    { clienteClienteId: 4, produtosProdutoId: 3 }, { clienteClienteId: 4, produtosProdutoId: 4 },
                    { clienteClienteId: 5, produtosProdutoId: 1 }, { clienteClienteId: 5, produtosProdutoId: 2 },
                    { clienteClienteId: 6, produtosProdutoId: 1 }, { clienteClienteId: 7, produtosProdutoId: 1 },
                    { clienteClienteId: 8, produtosProdutoId: 1 }, { clienteClienteId: 8, produtosProdutoId: 2 },
                    { clienteClienteId: 8, produtosProdutoId: 3 }, { clienteClienteId: 8, produtosProdutoId: 4 },
                    { clienteClienteId: 9, produtosProdutoId: 1 }, { clienteClienteId: 10, produtosProdutoId: 1 },
                    { clienteClienteId: 10, produtosProdutoId: 2 }, { clienteClienteId: 10, produtosProdutoId: 3 },
                    { clienteClienteId: 10, produtosProdutoId: 4 }, { clienteClienteId: 11, produtosProdutoId: 1 },
                    { clienteClienteId: 11, produtosProdutoId: 2 }, { clienteClienteId: 12, produtosProdutoId: 1 },
                    { clienteClienteId: 12, produtosProdutoId: 2 }, { clienteClienteId: 13, produtosProdutoId: 1 },
                    { clienteClienteId: 13, produtosProdutoId: 2 }, { clienteClienteId: 13, produtosProdutoId: 3 },
                    { clienteClienteId: 14, produtosProdutoId: 1 }, { clienteClienteId: 15, produtosProdutoId: 1 },
                    { clienteClienteId: 16, produtosProdutoId: 1 }, { clienteClienteId: 16, produtosProdutoId: 2 },
                    { clienteClienteId: 16, produtosProdutoId: 3 }, { clienteClienteId: 16, produtosProdutoId: 4 },
                    { clienteClienteId: 16, produtosProdutoId: 5 }, { clienteClienteId: 16, produtosProdutoId: 6 },
                    { clienteClienteId: 16, produtosProdutoId: 7 }, { clienteClienteId: 16, produtosProdutoId: 8 },
                    { clienteClienteId: 16, produtosProdutoId: 9 }, { clienteClienteId: 16, produtosProdutoId: 10 },
                ])
                .execute()
                await AppDataSource.createQueryBuilder()
                .insert()
                .into(`servico_cliente`)
                .values([
                    {clienteClienteId:1 , servicosServicoId: 1},
                    {clienteClienteId:1 , servicosServicoId: 3},
                    {clienteClienteId:1 , servicosServicoId: 5},
                    {clienteClienteId:1 , servicosServicoId: 9},
                    {clienteClienteId:2 , servicosServicoId: 11},
                    {clienteClienteId:2 , servicosServicoId: 7},
                    {clienteClienteId:2 , servicosServicoId: 5},
                    {clienteClienteId:2 , servicosServicoId: 4},
                    {clienteClienteId:3 , servicosServicoId: 4},
                    {clienteClienteId:3 , servicosServicoId: 3},
                    {clienteClienteId:3 , servicosServicoId: 2},
                    {clienteClienteId:4 , servicosServicoId: 1},
                    {clienteClienteId:5 , servicosServicoId: 3},
                    {clienteClienteId:5 , servicosServicoId: 4},
                    {clienteClienteId:5 , servicosServicoId: 7},
                    {clienteClienteId:6 , servicosServicoId: 7},
                    {clienteClienteId:6 , servicosServicoId: 8},
                    {clienteClienteId:6 , servicosServicoId: 10},
                    {clienteClienteId:6 , servicosServicoId: 11},
                    {clienteClienteId:7 , servicosServicoId: 10},
                    {clienteClienteId:7 , servicosServicoId: 9},
                    {clienteClienteId:7 , servicosServicoId: 2},
                    {clienteClienteId:8 , servicosServicoId: 2},
                    {clienteClienteId:9 , servicosServicoId: 2},
                    {clienteClienteId:10 , servicosServicoId: 2},
                    {clienteClienteId:10 , servicosServicoId: 3},
                    {clienteClienteId:10 , servicosServicoId: 5},
                    {clienteClienteId:10 , servicosServicoId: 8},
                    {clienteClienteId:11 , servicosServicoId: 8},
                    {clienteClienteId:11 , servicosServicoId: 11},
                    {clienteClienteId:12 , servicosServicoId: 8},
                    {clienteClienteId:12 , servicosServicoId: 7},
                    {clienteClienteId:12 , servicosServicoId: 2},
                    {clienteClienteId:13 , servicosServicoId: 1},
                    {clienteClienteId:13 , servicosServicoId: 2},
                    {clienteClienteId:13 , servicosServicoId: 3},
                    {clienteClienteId:13 , servicosServicoId: 4},
                    {clienteClienteId:13 , servicosServicoId: 5},
                    {clienteClienteId:14 , servicosServicoId: 5},
                    {clienteClienteId:14 , servicosServicoId: 6},
                    {clienteClienteId:14 , servicosServicoId: 7},
                    {clienteClienteId:15 , servicosServicoId: 1},
                    {clienteClienteId:15 , servicosServicoId: 2},
                    {clienteClienteId:16 , servicosServicoId: 1},
                    {clienteClienteId:16 , servicosServicoId: 2},
                    {clienteClienteId:16 , servicosServicoId: 3},
                    {clienteClienteId:16 , servicosServicoId: 4},
                ])
                .execute()
        }
    })
} catch (error) {
    console.log(`Connection error ${error}`);
}

app.use(cors());
app.use(express.json());
app.use('/cliente', clienteRoute)
app.use('/produto', produtoRoute)
app.use('/servico', ServicoRoute)
app.listen(5000, () => console.log('Serve conectado'))