import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Equipment } from '../../../shared/models/equipment';
import { MassivePlanning } from '../../../shared/models/massivePlanning';

 
@Injectable({ providedIn: 'root' })
export class ChangeEquipmentsService {
    constructor(private http: HttpClient) {}
    getEquipments(params) {
        return this.http.get<Equipment[]>('/api/equipments', { params: params });
    }
    simulation(massivePlanning: MassivePlanning) {
        return this.http.post<any>('/api/massivePlanning/simulation', massivePlanning);
    }
}