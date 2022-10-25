import React, {FormEvent, ChangeEvent} from 'react';
import { Link, useParams } from 'react-router-dom';

import '../styles/EmployeeData.css';

import { Container, Form, Row, Col, Button, Image } from 'react-bootstrap';

import Department from '../enums/Department';
import EmployeeInterface from '../interfaces/EmployeeInterface';

import allDepartments from '../enums/AllDepartments';

interface EmployeeDataProps {
    add: boolean;
    id?: number;
    employees: EmployeeInterface[];
    onSubmit: (add: boolean, employee: EmployeeInterface) => any;
}

function EmployeeData(props: EmployeeDataProps) {
    const { id } = useParams();
    const employee = props.employees.filter(obj => obj.id === parseInt(id!))[0];

    const [firstName, setFirstName] = React.useState<string>(props.add ? "" : employee.firstName);
    const [lastName, setLastName] = React.useState<string>(props.add ? "" : employee.lastName);
    const [department, setDepartment] = React.useState<Department>(props.add ? Department.DEPARTMENT1 : employee.department);
    const [address, setAddress] = React.useState<string>(props.add ? "" : employee.address);
    const [salary, setSalary] = React.useState<number>(props.add ? 0 : employee.salary);
    const [bankAccountNumber, setBankAccountNumber] = React.useState<string>(props.add ? "" : employee.bankAccountNumber);
    const [contractDuration, setContractDuration] = React.useState<number>(props.add ? 0 : employee.contractDuration);
    const [absenceDuration, setAbsenceDuration] = React.useState<number>(props.add ? 0 : employee.absenceDuration!);
    const [absenceReason, setAbsenceReason] = React.useState<string>(props.add ? "" : employee.absenceReason!);

    const handleDepartmentChange = (e: ChangeEvent<HTMLSelectElement>) => {
        let i = Object.values(Department).indexOf(Object.values(Department).filter(value => value === e.target.value)[0]);
        setDepartment(allDepartments[i]);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        props.onSubmit(props.add, {
            id: (props.add ? props.id : employee.id)!,
            firstName: firstName,
            lastName: lastName,
            department: department,
            address: address,
            salary: salary,
            bankAccountNumber: bankAccountNumber,
            contractDuration: contractDuration,
            absence: false,
            absenceDuration: props.add ? 0 : absenceDuration,
            absenceReason: absenceReason,
            retired: false
        });
    }

    return(
        <Container>
            <Row className='mb-3'>
                <Col>
                    <h1>{props.add ? "New Employee" : "Employee Info"}</h1>
                </Col>
            </Row>
            <Form onSubmit={handleSubmit}>
                <Row className='mb-3'>
                    <Col>
                        <Form.Group>
                            <Form.Label htmlFor="firstName">First Name</Form.Label>
                            <Form.Control id="firstName" onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)} value={firstName} type="text"></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group>
                            <Form.Label htmlFor="lastName">Last Name</Form.Label>
                            <Form.Control id="lastName" onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)} value={lastName} type="text"></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label htmlFor="address">Address</Form.Label>
                            <Form.Control id="address" onChange={(e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)} value={address} type="text"></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col>
                        <Form.Group>
                            <Form.Label htmlFor="department">Department</Form.Label>
                            <Form.Select id="department" onChange={handleDepartmentChange} value={department}>
                                {Object.values(Department).filter(item => item !== Department.ALL).map(item => (
                                    <option value={item}>{item}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group>
                            <Form.Label htmlFor="salary">Salary</Form.Label>
                            <Form.Control id="salary" onChange={(e: ChangeEvent<HTMLInputElement>) => setSalary(e.target.valueAsNumber)} value={salary} type="number"></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label htmlFor="bankAccount">Bank Account Number</Form.Label>
                            <Form.Control id="bankAccount" onChange={(e: ChangeEvent<HTMLInputElement>) => setBankAccountNumber(e.target.value)} value={bankAccountNumber} type="text"></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col className="col-3">
                        <Form.Group>
                            <Form.Label htmlFor="contractDuration">{props.add ? "How many months will the contract last?" : "Contract Duration (months)"}</Form.Label>
                            <Form.Control id="contractDuration" onChange={(e: ChangeEvent<HTMLInputElement>) => setContractDuration(e.target.valueAsNumber)} value={contractDuration} type="number"></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className={props.add ? "d-none" : "col-3"}>
                        <Form.Group>
                            <Form.Label htmlFor="absenceDuration">Absence Duration (days)</Form.Label>
                            <Form.Control id="absenceDuration" onChange={(e: ChangeEvent<HTMLInputElement>) => setAbsenceDuration(e.target.valueAsNumber)} value={absenceDuration} type="number"></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className={props.add ? "d-none" : ""}>
                        <Form.Group>
                            <Form.Label htmlFor="absenceReason">Absence Reason</Form.Label>
                            <Form.Control id="absenceReason" onChange={(e: ChangeEvent<HTMLInputElement>) => setAbsenceReason(e.target.value)} value={absenceReason} type="string"></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Link to="/"><Button>Back</Button></Link>
                    </Col>
                    <Col className="d-flex flex-row-reverse">
                        <Button type="submit" variant="success">{props.add ? "Add" : "Update"} Employee</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
    }

export default EmployeeData;