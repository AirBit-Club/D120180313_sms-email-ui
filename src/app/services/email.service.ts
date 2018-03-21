import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EmailService {
    public url: string;

    constructor(private http: HttpClient) { this.url = 'http://10.232.6.1:3195/email/'; }
    
    //Método para obtener los tipos de plantilla utilizando método getTemplate del api
    getTemplates(): Observable<any>{
        return this.http.get(this.url + 'getTemplates');
    }

    //Método para crear obtener la plantilla de un lenguaje y tipo de plantilla utilizando método getTemplate del api
    getTemplate(lang: string, template: number): Observable<any>{
        return this.http.get(this.url + 'getTemplate?lang='+lang+'&template='+template);   
    }

    //Método para crear plantilla utilizando método create del api
    createTemplate(params: any): Observable<any>{
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(this.url + 'create', params, { headers: headers });
    }
}