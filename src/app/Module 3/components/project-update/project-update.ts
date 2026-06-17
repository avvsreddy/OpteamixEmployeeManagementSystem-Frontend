import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { EmployeeService } from '../../../Module 2/Services/employee.service';
import { Employee } from '../../../Module 2/Models/employee';
import { UpdateProjectDto } from '../../models/project.model';

@Component({
  selector: 'app-project-update',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './project-update.html',
  styleUrl: './project-update.css'
})
export class ProjectUpdate implements OnInit {

  project: UpdateProjectDto = {
    projectId: 0,
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
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadEmployees();

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.projectService.getProjectById(id).subscribe({
      next: (data) => {
        this.project = {
          ...data,
          startDate: data.startDate?.substring(0, 10),
          endDate: data.endDate?.substring(0, 10)
        };
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('LOAD ERROR:', err);
        this.errorMessage = 'Failed to load project.';
        this.cdr.detectChanges();
      }
    });
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('EMPLOYEE LOAD ERROR:', err)
    });
  }

  updateProject(): void {
    this.projectService
      .updateProject(this.project.projectId, this.project)
      .subscribe({
        next: () => {
          alert('Project Updated Successfully');
          this.router.navigate(['/projects/dashboard']);
        },
        error: (err) => {
          console.error('UPDATE ERROR:', err);
          this.errorMessage = 'Failed to update project.';
        }
      });
  }
}