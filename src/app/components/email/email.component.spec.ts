import { fakeAsync, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser'

import { EmailComponent } from './email.component';
import { MaterialModule } from '../../material.module';
import { EmailService } from '../../services/email.service'

describe('Component: Email', () => {
  let component: EmailComponent;
  let fixture: ComponentFixture<EmailComponent>;
  let select: HTMLElement;
  let emailService: EmailService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MaterialModule,
        HttpClientModule,
        BrowserAnimationsModule
      ],
      declarations: [ EmailComponent ],
      providers: [ EmailService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    select = fixture.debugElement.query(By.css('mat-select')).nativeElement;
    emailService = TestBed.get(EmailService);
  });

  it('should create component', () => expect(component).toBeDefined());

  it('should not display the edit form unless complete both combos', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.sms-container'))).toBeNull();
  });

  it('should be able to focus the select trigger', fakeAsync(() => {
    document.body.focus();
    select.focus();

    expect(document.activeElement).toBe(select, 'Expected select element to be focused.');
  }));

  it('should set the tabindex of the select to 0 by default', fakeAsync(() => {
    expect(select.getAttribute('tabindex')).toEqual('0');
  }));

  it('should call getTemplate method', async(() => {
    spyOn(emailService, 'getTemplate').and.returnValue(undefined);
    expect(component.searchTemplate()).toBeUndefined();
    expect(emailService.getTemplate).toBeTruthy();
  }));
});
