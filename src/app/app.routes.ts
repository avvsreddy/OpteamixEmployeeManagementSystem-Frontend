import { Routes } from '@angular/router';
import { Home } from './Components/home/home';
import { Report } from './Module 5/report/report';
import { NotFound } from './Components/not-found/not-found';
import { EmployeeDashboardComponent } from './Module 2/Components/employee-dashboard/employee-dashboard';
import { AddEmployeeComponent } from './Module 2/Components/add-employee/add-employee.component';
import { EditEmployeeComponent } from './Module 2/Components/edit-employee/edit-employee.component';
import { EmployeeDetailsComponent } from './Module 2/Components/employee-details/employee-details.component';
import { EmployeeListComponent } from './Module 2/Components/employee-list/employee-list.component';
import { ProjectDashboard } from './Module 3/components/project-dashboard/project-dashboard';
import { ProjectDetail } from './Module 3/components/project-detail/project-detail';
import { ProjectCreate } from './Module 3/components/project-create/project-create';
import { ProjectUpdate } from './Module 3/components/project-update/project-update';

export const routes: Routes = [
  { path: '', component: Home, title: 'Home'},
  { path: 'home', component: Home, title: 'Home'},

  { path: 'employees', component: EmployeeDashboardComponent, title: 'Employee Dashboard'},
  { path: 'employees/add', component: AddEmployeeComponent, title: 'Add Employee'},
  { path: 'employees/edit/:id', component: EditEmployeeComponent, title: 'Edit Employee'},
  { path: 'employees/details/:id', component: EmployeeDetailsComponent, title: 'Employee Details'},

  { path: 'projects/dashboard', component: ProjectDashboard, title: 'Project Dashboard' },
  { path: 'projects/details/:id', component: ProjectDetail, title: 'Project Detail' },
  { path: 'projects/create', component: ProjectCreate, title: 'Create Project' },
  { path: 'projects/edit/:id', component: ProjectUpdate, title: 'Edit Project' },

  {path: 'report', component: Report, title: 'Report'},
  {path:'**', component: NotFound, title: 'Not Found'},  

  
];
