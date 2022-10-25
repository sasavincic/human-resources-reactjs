import React, { FormEvent, ChangeEvent } from 'react';

import { Link } from 'react-router-dom';

import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import '../styles/EmployeeListItem.css';
import EmployeeInterface from '../interfaces/EmployeeInterface';
import DismissableAlert from './DismissableAlert';

interface EmployeeListItemProps {
    employee: EmployeeInterface;
    absence: (employee: EmployeeInterface, absenceDuration: number, reason: string) => any;
    retire: (employee: EmployeeInterface, contractDuration: number) => any;
    delete: (employee: EmployeeInterface) => any;
}

function EmployeeListItem(props: EmployeeListItemProps) {

    const [absence, setAbsence] = React.useState<boolean>(props.employee.absence);
    const [retired, setRetired] = React.useState<boolean>(props.employee.retired);

    const [showAbsenceAlert, setShowAbsenceAlert] = React.useState<boolean>(false);
    const [showReSignAlert, setShowReSignAlert] = React.useState<boolean>(false);

    const [key1, setKey1] = React.useState<number>(Math.random());
    const [key2, setKey2] = React.useState<number>(Math.random() + key1);

    const handleAbsence = (duration: number, reason: string) => {
        let absenceDurationParam: number = absence ? 0 : duration;
        let reasonParam: string = absence ? "" : reason;
        props.absence(props.employee, absenceDurationParam, reasonParam);
        setAbsence(!absence);
    }
    const handleRetirement = (duration: number) => {
        let contractDurationParam: number = retired ? duration : 0;
        props.retire(props.employee, contractDurationParam);
        setRetired(!retired);
    }


    const handleAbsenceClick = () => {
        if (absence) {
            handleAbsence(0, "");
        } else {
            setShowAbsenceAlert(true);
            setKey1(Math.random());
        }
    }

    const handleRetireClick = () => {
        if(!retired) {
            handleRetirement(0);
        } else {
            setShowReSignAlert(true);
            setKey2(Math.random() + key1);
        }
    }

    const handleDelete = () => props.delete(props.employee);

    return(
        <span>
            <DismissableAlert key={key1} absence={true} onSubmit={handleAbsence} show={showAbsenceAlert} />
            <DismissableAlert key={key2} absence={false} onSubmit={handleRetirement} show={showReSignAlert} />
                <ListGroupItem className="employeeListItem my-2">
                    <Row>
                        <Col className="col-9">
                            <Link to={`update/${props.employee.id}`} className="text-decoration-none text-black">                            
                                <Row>
                                    <Col><span className="employeeAttributeTitle">First Name</span></Col>
                                    <Col><span className="employeeAttributeTitle">Last Name</span></Col>
                                    <Col><span className="employeeAttributeTitle">Department</span></Col>
                                    <Col><span className="employeeAttributeTitle">{props.employee.retired ? "Old Salary" : "Salary"}</span></Col>
                                    <Col className={absence ? "" : "d-none"}><span className="employeeAttributeTitle">Absence Duration</span></Col>
                                    <Col className={absence ? "" : "d-none"}><span className="employeeAttributeTitle">Absence Reason</span></Col>
                                </Row>
                                <Row>
                                    <Col><span className="employeeAttributeValue">{props.employee.firstName}</span></Col>
                                    <Col><span className="employeeAttributeValue">{props.employee.lastName}</span></Col>
                                    <Col><span className="employeeAttributeValue">{props.employee.department}</span></Col>
                                    <Col><span className="employeeAttributeValue">{props.employee.salary} €</span></Col>
                                    <Col className={absence ? "" : "d-none"}><span className="employeeAttributeValue">{props.employee.absenceDuration} Days</span></Col>
                                    <Col className={absence ? "" : "d-none"}><span className="employeeAttributeValue">{props.employee.absenceReason}</span></Col>
                                </Row>
                            </Link>
                        </Col>
                        <Col className={retired ? "d-none" : "col-1 my-auto"}>
                            <Button variant={absence ? "danger" : "primary"} id="absenceButton" onClick={handleAbsenceClick}>{absence ? "End" : "Absence"}</Button>
                        </Col>
                        <Col className={absence ? "d-none" : "col-1 my-auto"}>
                            <Button variant={retired ? "danger" : "primary"} id="retireButton" onClick={handleRetireClick}>{retired ? "Re-sign" : "Retire"}</Button>
                        </Col>
                        <Col className="my-auto d-flex flex-row-reverse">
                            <Button variant="danger" id="deleteButton" onClick={handleDelete}>Delete</Button>
                        </Col>
                    </Row>
                </ListGroupItem>
        </span>
    ); 
}

export default EmployeeListItem;