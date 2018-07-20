import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExecutionDiary } from '../../../shared/models/execution-diary';

 
@Injectable({ providedIn: 'root' })
export class EquipmentSearchService {
    constructor(private http: HttpClient) {}
    getAllExecutionDiaries() {
        return this.http.get<ExecutionDiary[]>('/api/executionDiaries');
    }
}