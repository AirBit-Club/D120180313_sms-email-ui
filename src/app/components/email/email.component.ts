import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { EmailService } from '../../services/email.service';
import { Email } from '../../models/email';

declare var swal;

@Component({
  selector: 'app-email-editor',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
  providers: [EmailService]
})
export class EmailComponent implements OnInit {

  langs;
  selectedLang = 'EN';
  email: Email;
  templates: Array<any>;
  saveBtn: string;
  existe: boolean;

  constructor( private emailService: EmailService ) { }

  ngOnInit() {
    this.templates = new Array();
    this.langs = ['EN', 'ES', 'JA', 'HI', 'DE', 'PT', 'RU', 'zh-CN', 'IT', 'FR', 'SVN', 'TR', 'HE'];
    this.email = new Email('', '', '', '', '', 1, 1);
    this.saveBtn = 'Crear plantilla';

    //Obteniendo los tipos de template para llenar el select "template-select".
    this.emailService.getTemplates().subscribe(
      response => {
        for (const template of response) {
          //Se crea un objeto para almacenar el template y su ID
          const type = { description: template.action, id: template.id };
          this.templates.push(type);
        }
      },
      error=>{
        swal('Información', 'Ocurrió un error al obtener datos', 'warning');  
      }
    );
  }

  //Función para insertar un nuevo registro utilizando el método createTemplate del servicio emailService
  insertEmailTemplate() {
    let params: string = '{"data":' + JSON.stringify(this.email) + '}'; //String con el JSON que recibe el método createTemplate
    this.emailService.createTemplate(params).subscribe(
      response => {
        this.email.title;
        swal('Ok', 'Success!', 'success'); 
      }, 
      error => {
        swal('Información', 'Ocurrió un error almacenando la plantilla.', 'warning');
      }
    );
  }

  //Función para obtener el template asignado para cada lenguaje y tipo de template.
  searchTemplate() {
    this.emailService.getTemplate(this.email.lang, this.email.template).subscribe(
      response => {
        if(response.title){
          this.email.title = response.title;
          this.email.sub_title = response.sub_title;
          this.email.additional_information = response.additional_information;
          this.email.question = response.question;
          this.existe = true;
          this.saveBtn = 'Editar plantilla';
        }else{
          this.email.title = '';
          this.email.sub_title = '';
          this.email.additional_information = '';
          this.email.question = '';
          this.existe = false;
          this.saveBtn = 'Crear Plantilla';
        }
      },
      error => {
        swal('Información', 'Ocurrió un error al obtener la plantilla.', 'warning');
      }
    );
  }

  //Función para ocultar el editor y obtener mejor vista del preview.
  hideEditor() {
    document.getElementById('editor-panel').setAttribute('style', 'right: -600px;');
    document.getElementById('iframe').setAttribute('style', 'width: 100%;');
    document.getElementById('show-btn').setAttribute('style', 'display: block;');
  }

  //Función para mostrar el editor.
  showEditor() {
    document.getElementById('editor-panel').setAttribute('style', 'right: 0;');
    document.getElementById('iframe').setAttribute('style', 'width: 70%');
    document.getElementById('show-btn').setAttribute('style', 'display: none;');
  }

}
