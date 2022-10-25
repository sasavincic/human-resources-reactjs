import React, {useState, ChangeEvent}  from 'react';

import { Link } from 'react-router-dom';

import '../styles/MainContent.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import EmployeeList from './EmployeeList';
import Filter from '../enums/Filter';
import Department from '../enums/Department';
import allDepartments from '../enums/AllDepartments';

import EmployeeInterface from '../interfaces/EmployeeInterface';

interface MainContentProps {
    employees: EmployeeInterface[],
    absence: (employee: EmployeeInterface, absenceDuration: number, reason: string) => any;
    retire: (employee: EmployeeInterface, contractDuration: number) => any;
    delete: (employee: EmployeeInterface) => any;
}

function MainContent(props: MainContentProps) {

    const [filter, setFilter] = useState<Filter>(Filter.ALL);

    const [department, setDepartment] = useState<Department>(Department.ALL);

    const handleDepartmentChange = (e: ChangeEvent<HTMLSelectElement>) => {
        let i = Object.values(Department).indexOf(Object.values(Department).filter(value => value === e.target.value)[0]);
        setDepartment(allDepartments[i]);
    }

    
    const handleAddAbsence = (employee: EmployeeInterface, absenceDuration: number, reason: string) => props.absence(employee, absenceDuration, reason);
    const handleRetirement = (employee: EmployeeInterface, contractDuration: number) => props.retire(employee, contractDuration);
    const handleDelete = (employee: EmployeeInterface) => props.delete(employee);

    return(
        <Container>
            <Row className='mb-3'>
                <Col>
                    <h1>[Company Name]</h1>
                </Col>
            </Row>
            <Row>
                <Col className="col-6">
                    <ul id="filterButtonList">
                        <li><Button id="buttonAll" onClick={() => setFilter(Filter.ALL)} variant={filter === Filter.ALL ? "success" : "primary"}>ALL</Button></li>
                        <li><Button id="buttonAbsent" onClick={() => setFilter(Filter.ABSENT)} variant={filter === Filter.ABSENT ? "success" : "primary"}>ABSENT</Button></li>
                        <li><Button id="buttonRetired" onClick={() => setFilter(Filter.RETIRED)} variant={filter === Filter.RETIRED ? "success" : "primary"}>RETIRED</Button></li>
                    </ul>
                </Col>
                <Col className="col-6 d-flex flex-row-reverse">
                    <Form.Group id='formDepartmentSelect'>
                        <Form.Select onChange={handleDepartmentChange} value={department}>
                            {allDepartments.map(item => (
                                <option value={item}>{item}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col className="my-3">
                    {props.employees.length === 0 
                    ? <span>No Employees are currently added!</span> 
                    : <EmployeeList currentFilter={filter} department={department} employees={props.employees} absence={handleAddAbsence} retire={handleRetirement} delete={handleDelete} />
                    }                
                </Col>
            </Row>
            <Row>
                <Col>
                    <Link to="/add"><Button>Add Employee</Button></Link>
                </Col>
                <Col className="d-flex flex-row-reverse">
                    <Link to="/companyInfo"><Button>Company Info</Button></Link>
                </Col>
            </Row>
        </Container>
    );
}
export default MainContent;