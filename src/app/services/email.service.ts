import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class EmailService {
    public url: string;

    constructor(private http: HttpClient) { this.url = 'http://10.232.6.1:3195/email/'; }
    
    getTemplates(){

    }

    getTemplate(lang: string, type: number){

    }

    createTemplate(params: any){
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(this.url + 'create', params, { headers: headers });
    }
}