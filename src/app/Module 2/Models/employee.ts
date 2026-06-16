export interface Employee {
  employeeId: number;
  employeeCode: string;
  name: string;
  email: string;
  phoneNumber: string;
  departmentId: number;
  departmentName: string;
  designation: string;
  joiningDate: string;
  salary: number;
}

export interface EmployeeCreateDto {
  employeeCode: string;
  name: string;
  email: string;
  phoneNumber: string;
  departmentId: number;
  designation: string;
  joiningDate: string;
  salary: number;
}