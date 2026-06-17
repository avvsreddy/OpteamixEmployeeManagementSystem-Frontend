import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { EmployeeService } from '../../../Module 2/Services/employee.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css'
})
export class ProjectDetail implements OnInit {

  project: Project | null = null;
  managerName: string = 'Not Assigned';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.projectService.getProjectById(id).subscribe({
      next: (data) => {
        this.project = data;
        this.cdr.detectChanges();

        if (data.managerId) {
          this.loadManagerName(data.managerId);
        }
      },
      error: (err) => {
        console.error('ERROR:', err);
        this.errorMessage = 'Failed to load project.';
        this.cdr.detectChanges();
      }
    });
  }

  loadManagerName(managerId: number): void {
    this.employeeService.getEmployeeById(managerId).subscribe({
      next: (emp) => {
        this.managerName = emp.name;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('MANAGER LOAD ERROR:', err);
        this.managerName = 'Not Found';
        this.cdr.detectChanges();
      }
    });
  }
}