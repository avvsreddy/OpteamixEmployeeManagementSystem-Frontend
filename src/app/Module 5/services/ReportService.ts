import { Injectable } from "@angular/core";
import { DashboardReport } from "../models/Report";

@Injectable({
    providedIn: 'root'
})
export class ReportService 
{
    getReports(): DashboardReport {
        const Reports:DashboardReport = 
            {
                totalEmployees: 150,
                totalProjects: 25,
                totalTasks: 500,
                completedTasks: 350,
                pendingTasks: 150,
                activeProjects: 15,
                inactiveProjects: 5,
                completedProjects: 5
            }
        
        return Reports;

    }   
}


