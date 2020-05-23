import React, { useState, useEffect } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import {Link, withRouter} from 'react-router-dom';

export default function Footer() {

    const sobeParaOTopo = () => {
        window.scrollTo(0, 0);
    };

  return (
        <Container>
            <footer>
            <Row>
                <Col md={8}>
                    <table>
                        <tr>
                            <th>
                                <Link to="/">Página inicial</Link>
                            </th>
                            <th>
                                <Link onClick={() => sobeParaOTopo()}>Início da página</Link>
                            </th>
                        </tr>
                    </table>
                </Col>
            </Row>
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.mdbootstrap.com"> MDBootstrap.com </a>
        </MDBContainer>
      
    </footer>
    </Container>
  );
}