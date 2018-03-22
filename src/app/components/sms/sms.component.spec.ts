import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core';

import { SmsComponent } from './sms.component';
import { MaterialModule } from '../../material.module';
import { SmsService } from '../../services/sms.service'

describe('Component: SMS', () => {
  let component: SmsComponent;
  let fixture: ComponentFixture<SmsComponent>;
  let element: HTMLElement;
  let de: DebugElement;
  let select: HTMLElement;
  let smsService: SmsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MaterialModule,
        HttpClientModule,
        BrowserAnimationsModule
      ],
      declarations: [SmsComponent],
      providers: [SmsService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
    select = fixture.debugElement.query(By.css('mat-select')).nativeElement;
    smsService = TestBed.get(SmsService);
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

  it('should call getLastVersion method', async(() => {
    spyOn(smsService, 'getLastVersion').and.returnValue(undefined);
    expect(component.search()).toBeUndefined();
    expect(smsService.getLastVersion).toBeTruthy();
  }));
});
