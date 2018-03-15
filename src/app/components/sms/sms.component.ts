import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Sms } from '../../models/sms';
import { SmsService } from '../../services/sms.service';

declare var swal;

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.css'],
  providers: [SmsService]
})
export class SmsComponent implements OnInit {

  langs;
  sms: Sms;
  tipos: Array<any>;
  saveBtn: string;
  existe: boolean;

  constructor(
    private smsService: SmsService
  ) {

  }

  ngOnInit() {
    this.langs = ['EN', 'ES', 'JA'];
    this.saveBtn = 'Crear Plantilla';
    this.tipos = new Array();
    this.sms = new Sms('', 2, '', '', 1);
    this.existe = true;
    this.smsService.getMessageType().subscribe(
      response => {
        for (const tipo of response) {
          const type = { description: tipo.fields.description, id: tipo.pk };
          this.tipos.push(type);
        }
      },
      error => {

      }
    );
  }

  insertMessageTemplate() {
    const data: Data = new Data(this.sms);
    const params = JSON.stringify(data);
    this.smsService.send(params).subscribe(
      response => {
        swal('Ok', 'Success!', 'success');
        this.existe = true;
      },
      error => {
        swal('Oops...', 'Something went wrong!', 'error');
      }
    );
  }

  search() {
    this.smsService.getLastVersion(this.sms.message_type, this.sms.lang).subscribe(
      response => {
        this.sms.message = response.fields.message;
        this.sms.title = response.fields.title;
        this.saveBtn = 'Editar Plantilla';
        this.existe = true;
      },
      error => {
        this.sms.message = '';
        this.sms.title = '';
        if (error.status !== 404) {
          swal('Oops...', 'Ocurrió un error al obtener información. Inténtalo de nuevo en unos minutos.', 'error');
          this.existe = true;
        } else {
          this.saveBtn = 'Crear plantilla';
          this.existe = false;
        }
      }
    );
  }

}

export class Data {
  constructor(public data: Sms) { }
}
