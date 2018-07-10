import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ExecutionDiary } from '../shared/models/execution-diary';
import { Observable } from 'rxjs/internal/Observable';
import { Equipment } from  '../shared/models/equipment';
import { Board } from '../shared/models/board';

@Injectable({
  providedIn: 'root',
})
export class PlanningService {
    API = '127.0.0.1/api'
    constructor( private http: HttpClient) {}
    getExecutionDiaries() {
        const executionDiaries = new Set();
        executionDiaries.add( new ExecutionDiary('10', 'Manobra 2') )
        executionDiaries.add( new ExecutionDiary('20', 'Manobra 3'));
        executionDiaries.add( new ExecutionDiary('30', 'Manobra 4'));

        return Observable.create(( observer ) => {
            observer.next( executionDiaries )
        })
        // let url = this.API + '/executionDiaries'
        // return this.http.get<Diary>( this.url );
    }
    searchEquipments( diaryQuery ) {
        const equipments = {};
        const equipmentsSource = new Array<Equipment>()
        const boards1 = new Array<Board>(...[
            new Board('x'),
            new Board('y'),
            new Board('z'),
        ]);
        const boards2 = new Array<Board>(...[
            new Board('x1'),
            new Board('y1'),
            new Board('z1'),
        ]);
        const boards3 = new Array<Board>(...[
            new Board('x2'),
            new Board('y2'),
            new Board('z2'),
        ]);

        equipmentsSource.push( new Equipment( 'Servidor', '13', boards1 ))
        equipmentsSource.push( new Equipment( 'POP', '134', boards2))
        equipmentsSource.push( new Equipment( 'GPON', '142', boards3))

        const equipmentsTarget = new Array<Equipment>()
        const boards12 = new Array<Board>(...[
            new Board('x'),
            new Board('y'),
            new Board('z'),
        ]);
        const boards22 = new Array<Board>(...[
            new Board('x1'),
            new Board('y1'),
            new Board('z1'),
        ]);
        const boards32 = new Array<Board>(...[
            new Board('x2'),
            new Board('y2'),
            new Board('z2'),
        ]);

        equipmentsTarget.push( new Equipment( 'Servidor', '1', boards12 ))
        equipmentsTarget.push( new Equipment( 'POP', '12', boards22))
        equipmentsTarget.push( new Equipment( 'GPON', '123', boards32))
        equipments['target'] = equipmentsTarget;
        equipments['source'] = equipmentsSource;
        //const cabinet = new Cabinet('GG EZ', equipments );
        return Observable.create(( observer ) => {
            observer.next( equipments )
        })
        // let url = this.API + '/armary'
        // return this.http.get<Armary>( this.url, { params: diaryQuery });
    }
    searchPlanning( request ) {
    }
}
