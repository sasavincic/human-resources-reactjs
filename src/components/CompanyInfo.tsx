import React from 'react';

import { Link } from 'react-router-dom';

import '../styles/CompanyInfo.css';

import EmployeeInterface from '../interfaces/EmployeeInterface';
import { Container, Row, Col, Button, ListGroupItem, ListGroup } from 'react-bootstrap';

interface CompanyInfoProps {
    employees: EmployeeInterface[]
}

function CompanyInfo(props: CompanyInfoProps) {
    return(
        <Container>
            <Row className="mb-5">
                <Col className="mx-auto">
                    <h1>Tesla Inc.</h1>
                </Col>
            </Row>
            <Row>
                <Col className="mx-auto">
                    <h2>About Us</h2>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col className="mx-auto">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, cum non reiciendis amet quis deserunt beatae excepturi corrupti ipsam ea veritatis voluptatibus. 
                        Vitae ipsam rem dolor sed porro repellendus sint. Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, mollitia. Aliquid, reprehenderit omnis. Quo facilis, 
                        velit atque a ducimus maiores non sequi deserunt. Nulla esse assumenda commodi est accusantium quam? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum 
                        sint fuga rem obcaecati possimus? Est, eaque fugit aut ipsam officia tempore odio consequatur natus exercitationem voluptatum ipsum, esse, itaque magnam.
                    </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Company Statistics</h2>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <ListGroup>
                        <ListGroupItem className="mb-3 border">
                            <span id="total" className='companyStats'>Total number of employees: {props.employees.length}</span>
                        </ListGroupItem>
                        <ListGroupItem className="mb-3 border">
                            <span className='companyStats'>Number of Employees currently working: {props.employees.filter(employee => !employee.absence && !employee.retired).length}</span>
                        </ListGroupItem>
                        <ListGroupItem className="mb-3 border">
                            <span className='companyStats'>Number of Employees absent: {props.employees.filter(employee => employee.absence).length}</span>
                        </ListGroupItem>
                        <ListGroupItem className="mb-3 border">
                            <span className='companyStats'>Number of Employees retired: {props.employees.filter(employee => employee.retired).length}</span>
                        </ListGroupItem>
                    </ListGroup>
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col>
                    <Link to="/"><Button>Back</Button></Link>
                </Col>
            </Row>
        </Container>
    );
}

export default CompanyInfo;