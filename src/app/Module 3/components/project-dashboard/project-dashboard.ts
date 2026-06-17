import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-dashboard.html',
  styleUrl: './project-dashboard.css'
})
export class ProjectDashboard implements OnInit {

  projects: Project[] = [];
  errorMessage: string = '';

  totalProjects: number = 0;
  activeProjects: number = 0;
  inactiveProjects: number = 0;
  completedProjects: number = 0;
  totalBudget: number = 0;

  constructor(
    private projectService: ProjectService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.calculateSummary();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('LOAD ERROR:', err);
        this.errorMessage = 'Failed to load projects.';
        this.cdr.detectChanges();
      }
    });
  }

  calculateSummary(): void {
    this.totalProjects   = this.projects.length;
    this.activeProjects  = this.projects.filter(p => p.status === 'Active').length;
    this.inactiveProjects = this.projects.filter(p => p.status === 'Inactive').length;
    this.completedProjects = this.projects.filter(p => p.status === 'Completed').length;
    this.totalBudget     = this.projects.reduce((sum, p) => sum + p.budget, 0);
  }

  deleteProject(id: number): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(id).subscribe({
        next: () => this.loadProjects(),
        error: (err) => console.error('DELETE ERROR:', err)
      });
    }
  }
}