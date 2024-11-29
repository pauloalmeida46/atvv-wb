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
    let consumidor: any = []
    clientes.forEach(qnt => {
        let id = qnt.cliente_id
        let nome = qnt.cliente_nome
        let qntidadeProduto = qnt.produtos.length
        let qntidadeServico = qnt.servicos.length
        let qntidadeConsumo = qnt.produtos.length + qnt.servicos.length
        consumidor.push({
            id: id,
            nome: nome,
            quantidadeTotal: qntidadeConsumo,
            produtos: qntidadeProduto,
            servicos: qntidadeServico
        })
    })
    let ordenacao = consumidor.sort((a: { quantidadeTotal: number; }, b: { quantidadeTotal: number; }) => {
        return b.quantidadeTotal - a.quantidadeTotal;
    });
    let restricao = ordenacao.slice(0, 9)

    return (
        <section>
            <header>
                <NavBar_ />
            </header>
            <main>
                <div className="tables">
                    <h1>Clietes que mais consumiram</h1>
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Produtos</th>
                                <th>Servicos</th>
                                <th>Total</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {restricao && restricao.map((consumo: { id: number, produtos: number, servicos: number, nome: string, quantidadeTotal: string }) => {
                                return (
                                    <>
                                        <tr>
                                            <td>{consumo.id}</td>
                                            <td>{consumo.nome}</td>
                                            <td>{consumo.produtos}</td>
                                            <td>{consumo.servicos}</td>
                                            <td>{consumo.quantidadeTotal}</td>
                                            <td><Button variant="outline-info" onClick={() => navigate(`clientes/${consumo.id}`)}>Visualizar</Button>{' '}</td>
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