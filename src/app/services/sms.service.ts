import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Sms } from '../modelos/sms';

@Injectable()
export class SmsService{
    public url:string;

    constructor(
        public _http: HttpClient
    ){
        this.url = "http://10.232.6.1:3195/sms/"      
    }

    send(params): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'create', params, {headers:headers});  
    }

    getMessageType():Observable<any>{
        return this._http.get(this.url + 'getMessageType');  
    }

    getLastVersion(type:number, lang:string):Observable<any>{
        return this._http.get(this.url + 'getLastVersion?message_type=' + type + '&lang=' + lang);
    }
}