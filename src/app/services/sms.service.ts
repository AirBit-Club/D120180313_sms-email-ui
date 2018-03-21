import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Sms } from '../models/sms';

@Injectable()
export class SmsService {
    public url: string;

    constructor(public http: HttpClient) { this.url = 'http://10.232.6.1:3195/sms/'; }

    //Método para crear plantilla de mensaje utilizando el método create del api
    create(params): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(this.url + 'create', params, { headers: headers });
    }

    //Método para obtener los tipos de plantilla de mensaje utilizando el método getMessageType del api
    getMessageType(): Observable<any> {
        return this.http.get(this.url + 'getMessageType');
    }
    
    //Método para obtener plantilla de mensaje según lenguaje y tipo de mensaje utilizando el método getLastVersion del api
    getLastVersion(type: number, lang: string): Observable<any> {
        return this.http.get(this.url + 'getLastVersion?message_type=' + type + '&lang=' + lang);
    }

    login(params): Observable<any>{
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post('http://10.232.6.190/login', params, { headers: headers, observe: 'response'});
    }
}
