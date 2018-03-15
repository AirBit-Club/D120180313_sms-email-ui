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

  public langs;
  public selectedLang = 'EN';
  public email: Email;

  constructor( private emailService: EmailService ) { }

  ngOnInit() {
    this.langs = ['EN', 'ES', 'JA'];
    this.email = new Email('', '', '', '', '', 1, 1);
  }

  insertEmailTemplate() {
    let params: string = '{"data":' + JSON.stringify(this.email) + '}';
    this.emailService.createTemplate(params).subscribe(
      response => {
        swal('Ok', 'Success!', 'success');
      }, 
      error => {
        console.log(params);
        console.log(error);
      }
    );
  }

  hideEditor() {
    document.getElementById('editor-panel').setAttribute('style', 'right: -600px;');
    document.getElementById('iframe').setAttribute('style', 'width: 100%;');
    document.getElementById('show-btn').setAttribute('style', 'display: block;');
  }

  showEditor() {
    document.getElementById('editor-panel').setAttribute('style', 'right: 0;');
    document.getElementById('iframe').setAttribute('style', 'width: 70%');
    document.getElementById('show-btn').setAttribute('style', 'display: none;');
  }

}
