import React from 'react';

import ListGroup from 'react-bootstrap/ListGroup';

import EmployeeInterface from '../interfaces/EmployeeInterface';
import EmployeeListItem from './EmployeeListItem';
import Filter from '../enums/Filter';
import Department from '../enums/Department';

interface EmployeeListProps {
    currentFilter: Filter,
    department: Department,
    employees: EmployeeInterface[];
    absence: (employee: EmployeeInterface, absenceDuration: number, reason: string) => any;
    retire: (employee: EmployeeInterface, contractDuration: number) => any;
    delete: (employee: EmployeeInterface) => any;
}

function EmployeeList(props: EmployeeListProps) {

    const handleAddAbsence = (employee: EmployeeInterface, absenceDuration: number, reason: string) => props.absence(employee, absenceDuration, reason);
    const handleRetirement = (employee: EmployeeInterface, contractDuration: number) => props.retire(employee, contractDuration);
    const handleDelete = (employee: EmployeeInterface) => props.delete(employee);

    const relevantEmployees: EmployeeInterface[] = [];
    props.employees.map(employee => {
        if(employee.department === props.department || props.department === Department.ALL){
            if(props.currentFilter === Filter.ALL){
                relevantEmployees.push(employee);
            } else if(props.currentFilter === Filter.ABSENT && employee.absence){
                relevantEmployees.push(employee);
            } else if(props.currentFilter === Filter.RETIRED && employee.retired){
                relevantEmployees.push(employee);
            }
        }
    });

    return(
        <span>
            {relevantEmployees.length === 0 && props.employees.length !== 0
            ? <span>No Employees fit the selected filters!</span>
            :   <ListGroup>
                    {relevantEmployees.map((employee) => (
                        <EmployeeListItem key={employee.id} employee={employee} absence={handleAddAbsence} retire={handleRetirement} delete={handleDelete} />
                    ))}
                </ListGroup>
            }
        </span>
    );

}

export default EmployeeList;