import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'email-editor',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  public template;
  public doc;
  public title;
  public subtitle;
  public question;
  public additional;
  public langs;
  public selectedLang = "EN";

  constructor(  ) { }

  ngOnInit() {

    this.langs = ['EN','ES','JA'];

    let iframe:any = document.getElementById('iframe');
    this.setTemplate();

    /*if(iframe.contentDocument) this.doc = iframe.contentDocument;
    else if(iframe.contentWindow) this.doc = iframe.contentWindow.document;
    else this.doc = iframe.document;
    
    this.doc.write(this.template);
    this.doc.close();*/
  }

  setTemplate(){
    this.template = '';
  }

  updatePreview(){
    this.setTemplate();
    this.doc.write(this.template);
    this.doc.close();
  } 

  hideEditor(){
    document.getElementById("editor-panel").setAttribute("style","right: -600px;");
    document.getElementById("iframe").setAttribute("style","width: 100%;");
    document.getElementById("show-btn").setAttribute("style","display: block;");
  }

  showEditor(){
    document.getElementById("editor-panel").setAttribute("style","right: 0;");
    document.getElementById("iframe").setAttribute("style","width: 70%");
    document.getElementById("show-btn").setAttribute("style","display: none;");
  }

  onSubmit(){
    console.log("Submit ... " + this.selectedLang);
  }

}
