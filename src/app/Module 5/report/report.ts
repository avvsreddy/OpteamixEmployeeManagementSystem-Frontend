import { Component, OnInit } from '@angular/core';
import { ReportService } from '../services/ReportService';
import { DashboardReport } from '../models/Report';

@Component({
  selector: 'app-report',
  imports: [],
  templateUrl: './report.html',
  styleUrl: './report.css',
})
export class Report implements OnInit {
  report!: DashboardReport;
  selectedSection = '';

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.report = this.reportService.getReports();
  }

  drillDown(section: string): void {
    this.selectedSection =
      this.selectedSection === section ? '' : section;
  }
}
