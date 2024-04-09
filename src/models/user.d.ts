// union types
export type Role = 'admin' | 'electrician' | 'project manager' | 'technical manager' | 'supervisor';
export type Status = 'active' | 'inactive' | 'blocked' | 'invited';

// interfaces
export interface User {
    id: string;
    image: string;
    name: string;
    family: string;
    role: Role;
    email: string;
    createdOn: string;
    countryCode: string;
    phone: string;
    status: Status;
}