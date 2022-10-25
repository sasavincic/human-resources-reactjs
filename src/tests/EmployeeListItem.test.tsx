import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import EmployeeInterface from '../interfaces/EmployeeInterface';
import Department from '../enums/Department';
import EmployeeListItem from '../components/EmployeeListItem';

import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        id: '0'
    })
}));

const employees: EmployeeInterface[] = [];
const employee: EmployeeInterface = {
    id: 0, 
    firstName: "Michael", 
    lastName: "Jordan", 
    department: Department.DEPARTMENT1, 
    address: "Rodeo Drive", 
    salary: 1000, 
    bankAccountNumber: "SI56", 
    contractDuration: 12, 
    absence: false, 
    absenceDuration: 0, 
    absenceReason: "", 
    retired: false
}
employees.push(employee);

it('Delete Employee method call test', () => {
    const handleDelete = jest.fn();
    const utils = render(<Router><EmployeeListItem employee={employee} absence={jest.fn()} retire={jest.fn()} delete={handleDelete} /></Router>);
    fireEvent.click(screen.getByText(/Delete/i));
    expect(handleDelete).toBeCalledWith({
        id: 0, 
        firstName: "Michael", 
        lastName: "Jordan", 
        department: Department.DEPARTMENT1, 
        address: "Rodeo Drive", 
        salary: 1000, 
        bankAccountNumber: "SI56", 
        contractDuration: 12, 
        absence: false, 
        absenceDuration: 0, 
        absenceReason: "", 
        retired: false
    });
});

it('Add Absence method call test', () => {
    const handleAbsence = jest.fn();
    const utils = render(<Router><EmployeeListItem employee={employee} absence={handleAbsence} retire={jest.fn()} delete={jest.fn()} /></Router>);
    fireEvent.click(screen.getByText("Absence"));
    const absenceDurationInput = utils.getByLabelText(/How many days will the absence last?/i);
    fireEvent.change(absenceDurationInput, {target: {value: 12, valueAsNumber: 12}});
    const absenceReasonInput = utils.getByLabelText(/What is the reason for the absence?/i);
    fireEvent.change(absenceReasonInput, {target: {value: "Vacation"}});
    fireEvent.click(screen.getByText("Begin Absence"));
    expect(handleAbsence).toBeCalledWith({
        id: 0, 
        firstName: "Michael", 
        lastName: "Jordan", 
        department: Department.DEPARTMENT1, 
        address: "Rodeo Drive", 
        salary: 1000, 
        bankAccountNumber: "SI56", 
        contractDuration: 12, 
        absence: false, 
        absenceDuration: 0, 
        absenceReason: "", 
        retired: false
    }, 12, "Vacation");
});

it('Retire Employee method call test', () => {
    const handleRetirement = jest.fn();
    const utils = render(<Router><EmployeeListItem employee={employee} absence={jest.fn()} retire={handleRetirement} delete={jest.fn()} /></Router>);
    fireEvent.click(screen.getByText("Retire"));
    fireEvent.click(screen.getByText("Re-sign"));
    const contractDurationInput = utils.getByLabelText(/How many months will the contract last?/i);
    fireEvent.change(contractDurationInput, {target: {value: 12, valueAsNumber: 12}});
    fireEvent.click(screen.getByText("Sign Employee"));
    expect(handleRetirement).toBeCalledWith({
        id: 0, 
        firstName: "Michael", 
        lastName: "Jordan", 
        department: Department.DEPARTMENT1, 
        address: "Rodeo Drive", 
        salary: 1000, 
        bankAccountNumber: "SI56", 
        contractDuration: 12, 
        absence: false, 
        absenceDuration: 0, 
        absenceReason: "", 
        retired: false
    }, 12);
});