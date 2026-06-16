import { Routes } from '@angular/router';

import { Home } from './Components/home/home';

import { EmployeeDashboardComponent }
from './Module 2/Components/employee-dashboard/employee-dashboard';

import { AddEmployeeComponent }
from './Module 2/Components/add-employee/add-employee.component';

import { EditEmployeeComponent }
from './Module 2/Components/edit-employee/edit-employee.component';

import { EmployeeDetailsComponent }
from './Module 2/Components/employee-details/employee-details.component';
import { EmployeeListComponent } from './Module 2/Components/employee-list/employee-list.component';

export const routes: Routes = [

  {
    path: '',
    component: Home,
    title: 'Home'
  },

  {
    path: 'home',
    component: Home,
    title: 'Home'
  },

  {
  path: 'employees',
  component: EmployeeDashboardComponent,
  title: 'Employee Dashboard'
},

  {
    path: 'employees/add',
    component: AddEmployeeComponent,
    title: 'Add Employee'
  },

  {
    path: 'employees/edit/:id',
    component: EditEmployeeComponent,
    title: 'Edit Employee'
  },

  {
    path: 'employees/details/:id',
    component: EmployeeDetailsComponent,
    title: 'Employee Details'
  }

];