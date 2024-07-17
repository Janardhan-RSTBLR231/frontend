export interface User {
  id: any,
  fullName: string,
  department: string,
  role: string,
  email: string,
  plant: string,
  phoneNumber:string,
}

export interface UserDTO {
  id: string;
  isActive: boolean;
  loginId: string;
  email: string;
  password: string;
  phoneNumber: string;
  fullName: string;
  role: string;
  canDelete: boolean;
  departmentId: string;
  plantId: string;
  lineIds: string[];
}

