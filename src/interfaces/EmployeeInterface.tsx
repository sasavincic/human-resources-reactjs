import React from 'react';
import Department from '../enums/Department';

interface EmployeeInterface {
    id: number,
    firstName: string,
    lastName: string,
    department: Department,
    address: string,
    salary: number,
    bankAccountNumber: string,
    contractDuration: number,
    absence: boolean,
    absenceDuration?: number,
    absenceReason?: string,
    retired: boolean
}

export default EmployeeInterface;