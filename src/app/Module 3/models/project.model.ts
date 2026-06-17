export interface Project {
  projectId: number;
  projectName: string;
  clientName: string;
  startDate: string;
  endDate: string;
  budget: number;
  status: string;
  managerId: null;
}

export interface CreateProjectDto {
  projectName: string;
  clientName: string;
  startDate: string;
  endDate: string;
  budget: number;
  status: string;
  managerId: number | null;
}

export interface UpdateProjectDto {
  projectId: number
  projectName: string;
  clientName: string;
  startDate: string;
  endDate: string;
  budget: number;
  status: string;
  managerId: number | null;
}