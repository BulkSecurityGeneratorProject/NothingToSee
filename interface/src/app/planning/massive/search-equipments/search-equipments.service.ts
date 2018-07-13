import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { ExecutionDiary } from '../../../shared/models/execution-diary';

 
@Injectable({ providedIn: 'root' })
export class SearchEquipmentsService {
    constructor(private http: HttpClient) {}
    getAllExecutionDiaries() {
        return this.http.get<ExecutionDiary[]>('/api/executionDiaries');
    }
}