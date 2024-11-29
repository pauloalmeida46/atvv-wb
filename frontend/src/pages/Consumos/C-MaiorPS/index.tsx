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
    let armazenarProdutos: any = []
    let armazenarServico: any = []
    clientes.map(i => {
        return (
            i.produtos.forEach(p => {
                let id = p.produto_id
                let nomes = p.produto_nome
                let quantidade = armazenarProdutos[p.produto_nome] = (armazenarProdutos[p.produto_nome] || 0) + 1
                armazenarProdutos.push({
                    id: id,
                    quantidade: quantidade,
                    nome: nomes
                })
            })
        )
    })
    clientes.map(i => {
        return (
            i.servicos.forEach(s => {
                let id = s.servico_id
                let nomes = s.servico_nome
                let quantidade = armazenarServico[s.servico_nome] = (armazenarServico[s.servico_nome] || 0) + 1
                armazenarServico.push({
                    id: id,
                    quantidade: quantidade,
                    nome: nomes
                })
            })
        )
    })

    const ordenacaoProd = armazenarProdutos?.sort((
        a: { quantidade: number; },
        b: { quantidade: number; }) => {
        return (b.quantidade - a.quantidade)
    })
    const ordenacaoServi = armazenarServico?.sort((
        a: { quantidade: number; },
        b: { quantidade: number; }) => {
        return (b.quantidade - a.quantidade)
    })
    let restricaoProduto = ordenacaoProd.slice(0, 1)
    let restricaoServi = ordenacaoServi.slice(0, 1)
    return (
        <section>
            <header>
                <NavBar_ />
            </header>
            <main>
                <div className="tables">
                    <h1>Produto mais consumido</h1>
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Quantidade</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {restricaoProduto && restricaoProduto.map((consumido: { id: number, nome: string, quantidade: any }) => {
                                return (
                                    <tr>
                                        <td>{consumido.id}</td>
                                        <td>{consumido.nome}</td>
                                        <td>{consumido.quantidade}</td>
                                        <td><Button variant="outline-info" onClick={() => navigate(`/produtos/${consumido.id}`)}>Visualizar</Button>{' '}</td>

                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <h1>Serviço mais consumido</h1>
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Nome</th>
                                <th>Quantidade</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {restricaoServi && restricaoServi.map((consumido: { id: number, nome: string, quantidade: any }) => {
                                return (
                                    <tr>
                                        <td>{consumido.id}</td>
                                        <td>{consumido.nome}</td>
                                        <td>{consumido.quantidade}</td>
                                        <td><Button variant="outline-info" onClick={() => navigate(`/servicos/${consumido.id}`)}>Visualizar</Button>{' '}</td>
                                    </tr>
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