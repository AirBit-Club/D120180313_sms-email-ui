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
    this.langs = ['EN', 'ES', 'JA', 'HI', 'DE', 'PT', 'RU', 'zh-CN', 'IT', 'FR', 'SVN', 'TR', 'HE'];
    this.saveBtn = 'Crear Plantilla';
    this.tipos = new Array();
    this.sms = new Sms('', 2, '', '', 1);
    this.existe = true;
    //Se obtienen los tipos de mensaje.
    this.smsService.getMessageType().subscribe(
      response => {
        for (const tipo of response) {
          const type = { description: tipo.description, id: tipo.id };
          this.tipos.push(type);
        }
      },
      error => {
        console.log(error);
        swal('Información', 'Ocurrió un error al obtener los datos.', 'warning');
      }
    );
  }

  //Método para insertar una nueva plantilla de sms utilizando el método create del servicio smsService
  insertMessageTemplate() {
    const params: string = '{"data":' + JSON.stringify(this.sms) + '}'; //String con el JSON que recibe el método create
    this.smsService.create(params).subscribe(
      response => {
        swal('Ok', 'Success!', 'success');
        this.existe = true;
      },
      error => {
        swal('Oops...', 'Something went wrong!', 'error');
      }
    );
  }

  //Método para buscar la plantilla con el lenguaje y tipo de mensaje seleccionado en la vista.
  search() {
    this.smsService.getLastVersion(this.sms.message_type, this.sms.lang).subscribe(
      response => {
        //Si exite la plantilla, se colocan los datos correspondientes y el botón mostrará editar en lugar de crear plantilla
        if(response.data.message){
          this.sms.message = response.data.message;
          this.sms.title = response.data.title;
          this.saveBtn = 'Editar Plantilla';
          this.existe = true;
        }else{
          //Si no exite la plantilla, el botón mostrará crear plantilla
          this.sms.message = '';
          this.sms.title = '';
          this.saveBtn = 'Crear plantilla';
          this.existe = false;
        }
      },
      error => {
        this.sms.message = '';
        this.sms.title = '';
        swal('Oops...', 'Ocurrió un error al obtener información. Inténtalo de nuevo en unos minutos.', 'error');
        this.existe = true;
      }
    );
  }
}
