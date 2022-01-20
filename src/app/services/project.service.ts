import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, Observable, Subject } from "rxjs";
import { PaginationModel } from "src/app/shared/models/pagination.model";
import { DeleteProjectsBody, Project, ProjectFilter } from "../pages/project-management/models/project.model";
import { ApiLoadState, LoadingState } from "../shared/models/api-load-state.model";
import { Object } from "../shared/models/object.model";


@Injectable({ providedIn: 'root' })
export class ProjectService {
    
    private projectFilter: ProjectFilter = {
        pageIndex: 1,
        pageSize: 1,
    }
    private projectsData: PaginationModel<Project> = {
        pageIndex: 1,
        pageSize: 0,
        totalCount: 0,
        items: []
    }
    private editingProject: Project | null = null;
    private loadState = new Subject<ApiLoadState>();

    constructor(private httpClient: HttpClient) {}

    fetchProjects() {
        this.notifyLoadingState('loading');

        let params = new HttpParams();
        const filter = this.projectFilter;
        Object.keys(filter).forEach((prop) => {
            const value = (<Object>filter)[prop];
            if (value) {
                params = params.set(prop, value);
            }
        });
        this.httpClient.get<PaginationModel<Project>>('/api/projects', { params }).pipe(delay(400)).subscribe({
            next: (data) => {
                this.projectsData = data;
                this.notifyLoadingState('success');
            },
            error: (error: any) => this.handleError(error),
        });
    }

    deleteProject(listId: number[]) {
        const items = this.projectsData.items;
        const body: DeleteProjectsBody = {
            listIdAndRowVersion: { }
        };

        listId.forEach(id => {
            body.listIdAndRowVersion[id] = items.find(x => x.id === id)?.rowVersion || '';
        });
        this.httpClient.put('/api/projects/delete-all', body).subscribe(() => {
            this.fetchProjects();
        });
    }

    setProjectFilter(filter: ProjectFilter) {
        this.projectFilter = filter;
    }

    getProjectsStorage(): PaginationModel<Project> {
        return {
            ...this.projectsData,
            items: this.projectsData.items.slice()
        }
    }

    getProjectForUpdation(projectId: number) {
        this.httpClient.get<Project>(`/api/projects/${projectId}/get-for-update`);
    }

    subcribeLoadingStateChange(handler: (value: ApiLoadState) => void) {
        this.loadState.subscribe(handler);
    }

    private notifyLoadingState(status: LoadingState,
        action: string | undefined = undefined, error: string | undefined = undefined)
    {
        this.loadState.next({ status, action, error });
    }

    private handleError(error: any) {
        let message = 'Unknown error has occurred';
        this.loadState.next({ 
            status: 'error',
            error: message,
        });
    }

   
}