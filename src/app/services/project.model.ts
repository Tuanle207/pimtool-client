import { PaginationFilter } from "src/app/shared/models/pagination.model";

export interface NewProject {
    projectNumber: number;
    name: string;
    customer: string;
    groupId: number;
    employees: string;
    status: string;
    startDate: Date;
    endDate?: Date;
}

export interface BasicGroup {
    id: number;
}


export interface ProjectFilter extends PaginationFilter {
    name?: string;
    number?: number;
    customer?: string;
    status?: string;
    startDate?: Date;
    endDate?: Date;
}

export interface Project {
    id: number;
    number: number;
    name: string;
    status: string;
    customer: string;
    startDate: Date;
    rowVersion: string;
}

export interface DeleteProjectsBody {
    listIdAndRowVersion: { [key: number]: string; };
}