import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Equipment } from '../../../shared/models/equipment';

 
@Injectable({ providedIn: 'root' })
export class ChangeEquipmentsService {
    constructor(private http: HttpClient) {}
    getEquipments( params ) {
        return this.http.get<Equipment[]>('/api/equipments', { params: params });
    }
}