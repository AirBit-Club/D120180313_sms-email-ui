import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Sms } from '../../modelos/sms'
import { SmsService } from '../../services/sms.service';

declare var swal;

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.css'],
  providers: [SmsService]
})
export class SmsComponent implements OnInit {

  public langs;
  public selectedLang = "EN";
  public sms: Sms;
  public tipos:Array<any>;
  public selectedType;

  constructor(
    private _smsService: SmsService
  ) {
    this.tipos = new Array();
    this.sms = new Sms("", 2, "", "", 1);
    this._smsService.getMessageType().subscribe(
      response=>{
        for(let tipo of response){
          let type = {description: tipo.fields.description, id: tipo.pk};
          this.tipos.push(type);
        }
      },
      error=>{

      }
    );
  }

  ngOnInit() {
    this.langs = ['EN', 'ES', 'JA'];
  }

  insertMessageTemplate() {
    let data: Data = new Data(this.sms);
    let params = JSON.stringify(data);
    this._smsService.send(params).subscribe(
      response => {
        swal('Ok', 'Success!', 'success')
      },
      error => {
        swal('Oops...', 'Something went wrong!', 'error')
      }
    );
  }

  search(){
    this._smsService.getLastVersion(this.sms.message_type, this.sms.lang).subscribe(
      response => {
        this.sms.message = response.fields.message;
        this.sms.title = response.fields.title;
      },
      error => {
        this.sms.message = "";
        this.sms.title = "";
        swal('Oops...', 'Something went wrong!', 'error');
      }
    );
  }

}

export class Data {
  constructor(public data: Sms) { }
}
