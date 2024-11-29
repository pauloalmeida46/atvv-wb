/* eslint-disable react/jsx-pascal-case */
import ICliente from '../../../interface/';
import IProduto from '../../../interface/produto';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import NavBar_ from '../../../component/NavBar'
import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { service } from '../../../service/serve';
import './styles.css'

interface IForm {
    produtoid: number;
}

function ClienteProduto() {
    const navigate = useNavigate()
    const [cliente, setCliente] = useState<ICliente>()
    const [produto, setProduto] = useState<IProduto[]>([])
    const { id } = useParams()
    useEffect(() => {
        getOne();
        getProduto()
    })
    async function getOne() {
        const response = await service.get<ICliente>(`cliente/achar-cliente/${id}`)
        setCliente(response.data)
    }
    async function getProduto() {
        const response = await service.get<IProduto[]>(`/produto/findMany`)
        setProduto(response.data)
    }
    const deletar = useCallback(
        async (idProduto: number) => {
            await service.delete(`/produto/deleteRelation/${id}/${idProduto}`)
                .then(({ data }) => {
                    console.log(data);
                })
                .catch(error => {
                    console.log(error);
                });
        }, []
    )
    const adicionarProduto = useCallback(async (data: IForm) => {
        await service.post(`/produto/add-produto-cliente/${id}`, {
            produtosProdutoId: data.produtoid
        }).then(({ data }) => {
            console.log(data);
        })
            .catch(error => {
                console.log(error);
                alert("Cliente já tem esse produto!");
            });
    }, [])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IForm>({
        mode: 'onBlur',
    });

    return (
        <section>
            <header>
                <NavBar_ />
            </header>
            <main>
                <h1>Cliente : {cliente && cliente.cliente_nome}</h1>
                <Button variant="outline-info" onClick={() => navigate(-1)}>Voltar</Button>{' '}
                <Card
                    bg="white"
                    text="dark"
                    style={{ width: '18rem' }}
                    className="mb-2"
                >
                    <Card.Header> Produtos já consumidos</Card.Header>
                    <Card.Body>
                        {cliente && cliente.produtos.map(s => {
                            return (
                                <>

                                    <Card.Text>
                                        R${s.produto_valor}
                                    </Card.Text>
                                    <Card.Text>
                                        <Button onClick={() => deletar(s.produto_id)}>Deletar</Button>
                                    </Card.Text>
                                </>
                            )
                        })}
                    </Card.Body>
                </Card>

                <h1>Adicionar Novo Produto</h1>
                <div className="forms">
                    <form onSubmit={handleSubmit(adicionarProduto)}>
                        <select
                            placeholder={
                                'Selecione o produto'
                            }
                            {...register('produtoid')}>
                            {produto && produto.map(i => {
                                return (
                                    <option key={i.produto_id} value={i.produto_id}>
                                        {i.produto_nome}
                                    </option>
                                )
                            })}
                        </select>
                        <Button className="submit" variant="outline-dark" type='submit'>Adicionar</Button>{' '}
                    </form>
                </div>
            </main>
        </section >
    );
}
export default ClienteProduto;