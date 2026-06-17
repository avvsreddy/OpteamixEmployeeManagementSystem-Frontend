import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { EmployeeService } from '../../../Module 2/Services/employee.service';
import { Employee } from '../../../Module 2/Models/employee';
import { CreateProjectDto } from '../../models/project.model';

@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './project-create.html',
  styleUrl: './project-create.css'
})
export class ProjectCreate implements OnInit {

  project: CreateProjectDto = {
    projectName: '',
    clientName: '',
    startDate: '',
    endDate: '',
    budget: 0,
    status: '',
    managerId: null
  };

  employees: Employee[] = [];
  errorMessage: string = '';

  constructor(
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('EMPLOYEE LOAD ERROR:', err);
        this.errorMessage = 'Failed to load managers list.';
        this.cdr.detectChanges();
      }
    });
  }

  createProject(): void {
    this.projectService.createProject(this.project)
      .subscribe({
        next: () => {
          alert('Project Created Successfully');
          this.router.navigate(['/projects/dashboard']);
        },
        error: (err) => {
          console.error('CREATE ERROR:', err);
          this.errorMessage = 'Failed to create project.';
        }
      });
  }
}