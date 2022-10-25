import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import MainContent from './components/MainContent';
import EmployeeData from './components/EmployeeData';

import EmployeeInterface from './interfaces/EmployeeInterface';
import CompanyInfo from './components/CompanyInfo';

function App() {
  const [employees, setEmployees] = useState<EmployeeInterface[]>([]);

  const handleEmployeeDataSubmit = (add: boolean, employee: EmployeeInterface) => {
    if(!add) {
      if(employee.absenceDuration !== 0){
        employee.absence = true;
      } else {
        employee.absence = false;
      }
      let oldEmployee = employees.filter(obj => obj.id === employee.id)[0];
      let tmp = employees;
      tmp[employees.indexOf(oldEmployee)] = employee;
      setEmployees(tmp);
    } else {
      let tmp = Array.from(employees);
      tmp.push(employee);
      setEmployees(tmp);
    }
  }

  const handleAbsence = (employee: EmployeeInterface, absenceDuration: number, reason: string) => {
    let tmp = employees;
    tmp[employees.indexOf(employee)].absenceDuration = tmp[employees.indexOf(employee)].absence ? 0 : absenceDuration;
    tmp[employees.indexOf(employee)].absenceReason = tmp[employees.indexOf(employee)].absence ? "" : reason;
    tmp[employees.indexOf(employee)].absence = tmp[employees.indexOf(employee)].absence ? false : true;
    setEmployees(tmp);
  }
  const handleRetirement = (employee: EmployeeInterface, contractDuration: number) => {
    let tmp = employees;
    console.log(contractDuration + " APP");
    tmp[employees.indexOf(employee)].contractDuration = tmp[employees.indexOf(employee)].retired ? contractDuration : 0;
    tmp[employees.indexOf(employee)].retired = tmp[employees.indexOf(employee)].retired ? false : true;
    setEmployees(tmp);
  }
  const handleDelete = (employee: EmployeeInterface) => {
    let tmp = employees.filter(obj => obj !== employee);
    setEmployees(tmp);
  }

  const nextEmployeeId = employees.length > 0 ? employees[employees.length-1].id + 1 : 0;
  
  return (
    <Container className="p-3">
      <Router>
        <Routes>
          <Route path="/" element={<MainContent absence={handleAbsence} retire={handleRetirement} delete={handleDelete} employees={employees}/>} />
          <Route path="/add" element={<EmployeeData add={true} id={nextEmployeeId} employees={employees} onSubmit={handleEmployeeDataSubmit} />} />
          <Route path="/update/:id" element={<EmployeeData add={false} employees={employees} onSubmit={handleEmployeeDataSubmit} />} />
          <Route path="/companyInfo" element={<CompanyInfo employees={employees} />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
