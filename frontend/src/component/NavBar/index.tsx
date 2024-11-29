import * as React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Navbar_() {
    const navigate = useNavigate()
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand onClick={() => navigate("/")}>WB</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
                            <NavDropdown title="Listagem" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={() => navigate("/clientes")}>Clientes</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => navigate("/produtos")}>Produtos</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => navigate("/servicos")}>Serviços</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => navigate("/consumos")}>Consumos</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Cadastrar" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={() => navigate("/cadastrar_cliente")}>Cliente</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => navigate("/cadastrar_produto")}>Produto</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => navigate("/cadastrar_servico")}>Serviço</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Navbar_;