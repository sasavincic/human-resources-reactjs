import React, { ChangeEvent, FormEvent } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert'

interface DismissableAlertProps {
    absence: boolean;
    onSubmit: (duration: number, absenceReason: string, show: boolean) => any;
    show: boolean;
}

function DismissableAlert(props: DismissableAlertProps) {

    const [show, setShow] = React.useState<boolean>(props.show);

    const [duration, setDuration] = React.useState<number>(0);
    const [absenceReason, setReason] = React.useState<string>("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        props.onSubmit(duration, absenceReason, show)
        setShow(false);
    }

    if(show) {
        return(
            <span>
                <Alert className="mt-3" variant={props.absence ? "primary" : "danger"} onClose={() => setShow(false)} dismissible>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Row className="mb-3">
                                <Col className="col-4">
                                    <Form.Label htmlFor="duration">{props.absence ? "How many days will the absence last?" : "How many months will the contract last?"}</Form.Label>
                                </Col>
                                <Col className="col-4">
                                    <Form.Control type="number" id="duration" value={duration} onChange={(e: ChangeEvent<HTMLInputElement>) => setDuration(e.target.valueAsNumber)}></Form.Control>
                                </Col>
                            </Row>
                            <Row className={props.absence ? "mb-3" : "d-none"}>
                                <Col className="col-4">
                                    <Form.Label htmlFor="absenceReason">What is the reason for the absence?</Form.Label>
                                </Col>
                                <Col className="col-4">
                                    <Form.Control type="string" id="absenceReason" value={absenceReason} onChange={(e: ChangeEvent<HTMLInputElement>) => setReason(e.target.value)}></Form.Control>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button variant={props.absence ? "primary" : "danger"} type="submit">{props.absence ? "Begin Absence" : "Sign Employee"}</Button>
                                </Col>
                            </Row>
                        </Form.Group>
                    </Form>
                </Alert>
            </span>
        );
    } return (<span></span>);
}

export default DismissableAlert;
  
