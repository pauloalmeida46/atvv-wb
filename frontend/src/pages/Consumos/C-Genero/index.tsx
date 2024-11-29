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
    return (
        <section>
            <header>
                <NavBar_ />
            </header>
            <main>
                <div className="tables">
                    <h1>Clientes Masculino</h1>
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                                <th>ID: </th>
                                <th>Nome: </th>
                                <th>Ação: </th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes && clientes.filter(m => m.cliente_genero === 'Masculino').map(c => {
                                return (
                                    <>
                                        <tr>
                                            <td>
                                                {c.cliente_id}
                                            </td>
                                            <td>
                                                {c.cliente_nome}
                                            </td>
                                            <td>
                                            <td><Button variant="outline-info" onClick={() => navigate(`/clientes/${c.cliente_id}`)}>Visualizar</Button>{' '}</td>
                                            </td>
                                        </tr>
                                    </>
                                )
                            }
                            )}
                        </tbody>
                    </Table>
                    <h1>Clientes Feminino</h1>
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                                <th>ID: </th>
                                <th>Nome: </th>
                                <th>Ação: </th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes && clientes.filter(m => m.cliente_genero === 'Feminino').map(c => {
                                return (
                                    <>
                                        <tr>
                                            <td>
                                                {c.cliente_id}
                                            </td>
                                            <td>
                                                {c.cliente_nome}
                                            </td>
                                            <td>
                                            <td><Button variant="outline-info" onClick={() => navigate(`/clientes/${c.cliente_id}`)}>Visualizar</Button>{' '}</td>
                                            </td>
                                        </tr>
                                    </>
                                )
                            }
                            )}
                        </tbody>
                    </Table>
                    <Button variant="outline-info" onClick={() => navigate(-1)}>Voltar</Button>
                </div>
            </main>
        </section>
    );
}

export default Consumos;