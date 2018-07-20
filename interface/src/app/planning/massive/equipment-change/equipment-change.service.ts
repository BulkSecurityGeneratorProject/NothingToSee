import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Equipment } from '../../../shared/models/equipment';
import { MassivePlanning, BoardChange } from '../../../shared/models/massivePlanning';

 
@Injectable({ providedIn: 'root' })
export class EquipmentChangeService {
    constructor(private http: HttpClient) {}
    getEquipments(params) {
        return this.http.get<Equipment[]>('/api/equipments', { params: params });
    }
    simulation(massivePlanning: any) {
        return this.http.post<any>('/api/massivePlanning/simulation', massivePlanning.massivePlanning);
    }
}