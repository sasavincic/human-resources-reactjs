import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import EmployeeData from '../components/EmployeeData';
import Department from '../enums/Department';

import { BrowserRouter as Router } from 'react-router-dom';
import EmployeeInterface from '../interfaces/EmployeeInterface';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        id: '0'
    })
}));

it('Add Employee method call test', () => {
    const handleAdd = jest.fn();
    const utils = render(<Router><EmployeeData add={true} id={0} employees={[]} onSubmit={handleAdd} /></Router>);
    const firstNameInput = utils.getByLabelText(/First Name/i);
    fireEvent.change(firstNameInput, {target: {value: "Michael"}});
    const lastNameInput = utils.getByLabelText(/Last Name/i);
    fireEvent.change(lastNameInput, {target: {value: "Jordan"}});
    const addressInput = utils.getByLabelText(/Address/i);
    fireEvent.change(addressInput, {target: {value: "Rodeo Drive"}});
    const departmentInput = utils.getByLabelText(/Department/i);
    fireEvent.change(departmentInput, {target: {value: Department.DEPARTMENT1}});
    const salaryInput = utils.getByLabelText(/Salary/i);
    fireEvent.change(salaryInput, {target: {value: 1000, valueAsNumber: 1000}});
    const bankAccNumberInput = utils.getByLabelText(/Bank Account Number/i);
    fireEvent.change(bankAccNumberInput, {target: {value: "SI56"}});
    const contractDurationInput = utils.getByLabelText(/How many months will the contract last?/i);
    fireEvent.change(contractDurationInput, {target: {value: 12, valueAsNumber: 12}});
    fireEvent.click(screen.getByText(/Add Employee/i));
    expect(handleAdd).toBeCalledWith(true, {id: 0, firstName: "Michael", lastName: "Jordan", department: Department.DEPARTMENT1, address: "Rodeo Drive", salary: 1000, bankAccountNumber: "SI56", contractDuration: 12, absence: false, absenceDuration: 0, absenceReason: "", retired: false});
});

it('Update Employee method call test', () => {
    const handleUpdate = jest.fn();

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

    const utils = render(<Router><EmployeeData add={false} id={1} employees={employees} onSubmit={handleUpdate} /></Router>);
    const firstNameInput = utils.getByLabelText(/First Name/i);
    fireEvent.change(firstNameInput, {target: {value: "Johnny"}});
    fireEvent.click(screen.getByText(/Update Employee/i));
    expect(handleUpdate).toBeCalledWith(false, {id: 0, firstName: "Johnny", lastName: "Jordan", department: Department.DEPARTMENT1, address: "Rodeo Drive", salary: 1000, bankAccountNumber: "SI56", contractDuration: 12, absence: false, absenceDuration: 0, absenceReason: "", retired: false});
});