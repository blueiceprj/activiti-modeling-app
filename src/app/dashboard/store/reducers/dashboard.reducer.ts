 /*!
 * @license
 * Copyright 2019 Alfresco, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Action } from '@ngrx/store';
import {
    DashboardState,
    INITIAL_DASHBOARD_STATE,
    ProjectSummaryEntities,
    ReleasesSummaryEntities
} from '../state/dashboard.state';
import {
    GET_PROJECTS_SUCCESS,
    GetProjectsSuccessAction,
    CreateProjectSuccessAction,
    CREATE_PROJECT_SUCCESS,
    UPDATE_PROJECT_SUCCESS,
    UpdateProjectSuccessAction,
    DELETE_PROJECT_SUCCESS,
    DeleteProjectSuccessAction,
    UploadProjectSuccessAction,
    UPLOAD_PROJECT_SUCCESS,
    RELEASE_PROJECT_SUCCESS,
    ReleaseProjectSuccessAction,
    GET_PROJECTS_ATTEMPT

} from '../actions/projects';
import { GET_PROJECT_RELEASES_SUCCESS, GetProjectReleasesSuccessAction, GET_PROJECT_RELEASES_ATTEMPT, GetProjectReleasesAttemptAction } from '../actions/releases';


export function dashboardReducer(state: DashboardState = INITIAL_DASHBOARD_STATE, action: Action): DashboardState {
    let newState: DashboardState;

    switch (action.type) {

        case GET_PROJECTS_ATTEMPT:
        return {
            ...state,
            loading: true
        };

        case GET_PROJECTS_SUCCESS:
            newState = setProjects(state, <GetProjectsSuccessAction>action);
            break;

        case CREATE_PROJECT_SUCCESS:
            newState = createProject(state, <CreateProjectSuccessAction>action);
            break;

        case UPDATE_PROJECT_SUCCESS:
            newState = updateProject(state, <UpdateProjectSuccessAction>action);
            break;

        case RELEASE_PROJECT_SUCCESS:
            newState = releaseProject(state, <ReleaseProjectSuccessAction> action);
            break;

        case DELETE_PROJECT_SUCCESS:
            newState = deleteProject(state, <DeleteProjectSuccessAction>action);
            break;

        case UPLOAD_PROJECT_SUCCESS:
            newState = uploadProject(state, <UploadProjectSuccessAction> action);
            break;
        case GET_PROJECT_RELEASES_SUCCESS:
            newState = setReleases(state, <GetProjectReleasesSuccessAction> action);
            break;

        case GET_PROJECT_RELEASES_ATTEMPT:
            newState = getProjectReleasesAttempt(state, <GetProjectReleasesAttemptAction> action);
            break;

        default:
            newState = Object.assign({}, state);
    }

    return newState;
}

function setProjects(state: DashboardState, action: GetProjectsSuccessAction): DashboardState {
    const newState = Object.assign({}, state);
    newState.projectsLoaded = true;
    newState.loading = false;
    newState.pagination = action.payload.pagination;
    newState.projects = action.payload.entries.reduce<ProjectSummaryEntities>((projects, project) => {
        return { ...projects, [project.id]: project };
    }, {});

    return newState;
}

function createProject(state: DashboardState, action: CreateProjectSuccessAction): DashboardState {
    const newState = Object.assign({}, state);
    const project = action.payload;
    newState.projects = {
        ...state.projects,
        [project.id]: project
    };
    return newState;
}

function updateProject(state: DashboardState, action: UpdateProjectSuccessAction): DashboardState {
    const newState = Object.assign({}, state);
    const project = action.payload;
    newState.projects = {
        ...state.projects,
        [project.id]: { ...newState.projects[project.id], ...project }
    };
    return newState;
}

function deleteProject(state: DashboardState, action: DeleteProjectSuccessAction): DashboardState {
    const newState = { ...state };

    newState.projects = { ...state.projects };
    delete newState.projects[action.payload];

    return newState;
}

function uploadProject(state: DashboardState, action: UploadProjectSuccessAction): DashboardState {
    const newState = Object.assign({}, state);
    const project = action.payload;
    newState.projects = {
        ...state.projects,
        [project.id]: project
    };
    return newState;
}

function releaseProject(state: DashboardState, action: ReleaseProjectSuccessAction): DashboardState {
    const newState = Object.assign({}, state);
    const release = action.release;
    newState.projects = {
        ...state.projects,
        [action.projectId]: { ...newState.projects[action.projectId], version: release.version }
    };

    return newState;
}

function setReleases(state: DashboardState, action: GetProjectReleasesSuccessAction): DashboardState {
    const newState = Object.assign({}, state);
    newState.loadingReleases = false;
    newState.releasesPagination = action.payload.pagination;
    newState.releases = action.payload.entries.reduce<ReleasesSummaryEntities>((releases, release) => {
        return { ...releases, [release.entry.id]: release.entry };
    }, {});

    return newState;
}

function getProjectReleasesAttempt(state: DashboardState, action: GetProjectReleasesAttemptAction): DashboardState {
    const newState = Object.assign({}, state);
    newState.loadingReleases = true;
    return newState;
}

