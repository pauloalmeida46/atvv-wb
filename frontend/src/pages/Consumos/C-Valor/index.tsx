import { Button, Table } from 'react-bootstrap';
import NavBar_ from '../../../component/NavBar';
import { service } from '../../../service/serve';
import ICliente from '../../../interface/';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Consumos() {
    const navigate = useNavigate()
    const [clientes, setCliente] = useState<ICliente[]>([])
    useEffect(() => {
        getMany()
    })
    async function getMany() {
        const response = await service.get<ICliente[]>(`cliente/achar-cliente`)
        setCliente(response.data)
    }

    let valorConsumidoProduto: any = []
    let valorConsumidoServico: any = []
    clientes.forEach((item) => {
        let id = item.cliente_id
        let name = item.cliente_nome;
        let mapValoresProdutos = item.produtos.map(i => Number(i.produto_valor))
        let valorFinalProduto = mapValoresProdutos.reduce(function (anterior, atual) {
            return (Number(anterior) + Number(atual))
        }, 0)
        valorConsumidoProduto.push({
            id: id,
            nome: name,
            precoProduto: valorFinalProduto,
        })
    })
    clientes.forEach((item) => {
        let id = item.cliente_id
        let name = item.cliente_nome;
        let mapValoresServico = item.servicos.map(i => Number(i.servico_valor))
        let valorFinalServico = mapValoresServico.reduce(function (anterior, atual) {
            return (Number(anterior) + Number(atual))
        }, 0)
        valorConsumidoServico.push({
            id: id,
            nome: name,
            precoServico: valorFinalServico,
        })
    })
    const ordenacaoProduto = valorConsumidoProduto?.sort((
        a: { precoProduto: number; },
        b: { precoProduto: number; }) => {
        return (b.precoProduto - a.precoProduto)
    })
    const ordenacaoServico = valorConsumidoServico?.sort((
        a: { precoServico: number; },
        b: { precoServico: number; }) => {
        return (b.precoServico - a.precoServico)
    })
    const restricaoProdutos = ordenacaoProduto.slice(0, 5)
    const restricaoServico = ordenacaoServico.slice(0, 5)

    return (
        <section>
            <header>
                <NavBar_ />
            </header>
            <main>
                <div className="tables">
                    <h1>Clientes que mais consumiram em valor</h1>
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Total Produtos</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {restricaoProdutos && restricaoProdutos?.map((consumo: { id: number, nome: string, precoProduto: number }) => {
                                return (
                                    <>
                                        <tr>
                                            <td>{consumo.id}</td>
                                            <td>{consumo.nome}</td>
                                            <td>R${consumo.precoProduto}</td>
                                            <td><Button variant="outline-info" onClick={() => navigate(`clientes/${consumo.id}`)}>Visualizar</Button>{' '}</td>
                                        </tr>
                                    </>
                                )
                            })}
                        </tbody>
                    </Table>
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Total Serviços</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {restricaoServico && restricaoServico?.map((consumo: { id: number, nome: string, precoServico: number }) => {
                                return (
                                    <>
                                        <tr>
                                            <td>{consumo.id}</td>
                                            <td>{consumo.nome}</td>
                                            <td>R${consumo.precoServico}</td>
                                            <td> <Button variant="outline-info" href={`clientes/${consumo.id}`}>Visualizar</Button>{' '}</td>
                                        </tr>
                                    </>
                                )
                            })}
                        </tbody>
                    </Table>
                    <Button variant="outline-info" onClick={() => navigate(-1)}>Voltar</Button>
                </div>
            </main>
        </section >
    );
}

export default Consumos;