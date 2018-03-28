import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import {GeneralService} from '../services/general.service';
import {MatDialog, MatSelect} from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {ModalConfirmComponent} from '../modal-confirm/modal-confirm.component';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-new-register-solo',
  templateUrl: './new-register-solo.component.html',
  styleUrls: ['./new-register-solo.component.scss']
})
export class NewRegisterSoloComponent implements OnInit {
  @ViewChild('canal') canal;
  @ViewChild('interes') interes;
  @ViewChild('name') name: ElementRef;
  @ViewChild('patern') patern: ElementRef;
  @ViewChild('matern') matern: ElementRef;
  @ViewChild('mail') mail: ElementRef;
  @ViewChild('cel') cel: ElementRef;
  @ViewChild('phone') phone: ElementRef;
  @ViewChild('gender') gender;
  @ViewChild('birthday') birthday: ElementRef;
  @ViewChild('age') age: ElementRef;
  @ViewChild('interestCampus') interestCampus;
  @ViewChild('interestNivel') interestNivel;
  @ViewChild('citaCampus') citaCampus;
  @ViewChild('tipificacion') tipificacion;

  startDate = new Date(1990, 0, 1);
  user: any = {};
  send = false;
  inputError: any;
  txtError: any;

  matcher = new MyErrorStateMatcher();
  namee = new FormControl('', [Validators.required, this.validName.bind(this)]);
  paternn = new FormControl('', [Validators.required, this.validPatern.bind(this)]);
  maternn = new FormControl('', [Validators.required, this.validMatern.bind(this)]);
  maill = new FormControl('', [Validators.required, this.validMail.bind(this)]);
  cell = new FormControl('', [Validators.required, this.validCel.bind(this)]);
  phonee = new FormControl('', [Validators.required, this.validPhone.bind(this)]);
  genderr = new FormControl('', this.validGender.bind(this));
  birthdayy = new FormControl('', [Validators.required, this.validBirthday.bind(this)]);
  agee = new FormControl('', [Validators.required, this.validAge.bind(this)]);
  interestCampuss = new FormControl('', this.validInterestCampus.bind(this));
  interestNivell = new FormControl('', this.validInterestNivel.bind(this));

  nameTxtError: any = false;
  paternTxtError: any = false;
  maternTxtError: any = false;
  mailTxtError: any = false;
  celTxtError: any = false;
  phoneTxtError: any = false;
  birthdayTxtError: any = false;
  ageTxtError: any = false;

  constructor(private gralService: GeneralService, public dialog: MatDialog, private renderer: Renderer2) {
    this.user.parent = '0'; this.user.gender = '0';
    this.user.interestCampus = '0'; this.user.interestArea = '0'; this.user.interestNivel = '0'; this.user.interestModel = '0'; this.user.interestCareer = '0';
    this.user.interestCycle = '0';
  }

  ngOnInit() {
  }

  save() {
    console.log(this.user);
    if(this.send){
      return;
    }
    this.send = true;

    this.gralService.registerSolo(this.user).then((data) => {
      console.log(data['msg']);
      this.send = false;

      if(data['success'] == false) {
        this.inputError =  data['input'];
        this.txtError = data['msg'];

        switch (data['input']) {
          case 'name':
            this.name.nativeElement.focus();
            break;
          case 'patern':
            this.patern.nativeElement.focus();
            break;
          case 'matern':
            this.matern.nativeElement.focus();
            break;
          case 'mail':
            this.mail.nativeElement.focus();
            break;
          case 'cel':
            this.cel.nativeElement.focus();
            break;
          case 'phone':
            this.phone.nativeElement.focus();
            break;
          case 'gender':
            this.gender.open();
            this.gender.focus();
            break;
          case 'birthday':
            this.birthday.nativeElement.focus();
            break;
          case 'age':
            this.age.nativeElement.focus();
            break;
          case 'interestCampus':
            this.interestCampus.open();
            this.interestCampus.focus();
            break;
          case 'interestNivel':
            this.interestNivel.open();
            this.interestNivel.focus();
            break;
          default:

        }
      }


    }, (err) => {
      console.warn(err);
      this.send = false;
    });
  }


  serviceValidInput(type, input, value, control){
    return this.gralService.validInput({type: type, data: value}).then((data) => {
      if(data['success'] == false) {
        this.inputError = input;
        this.txtError = data['msg'];

        switch(input) {
          case 'name':
            this.nameTxtError = data['msg'];
            break;
          case 'patern':
            this.paternTxtError = data['msg'];
            break;
          case 'matern':
            this.maternTxtError = data['msg'];
            break;
          case 'mail':
            this.mailTxtError = data['msg'];
            break;
          case 'cel':
            this.celTxtError = data['msg'];
            break;
          case 'phone':
            this.phoneTxtError = data['msg'];
            break;
          case 'birthday':
            this.birthdayTxtError = data['msg'];
            break;
          case 'age':
            this.ageTxtError = data['msg'];
            break;
        }

        return {'error': true};
      }else{
        this.inputError =  null;
        this.txtError = null;

        switch(input) {
          case 'name':
            this.nameTxtError = false;
            break;
          case 'patern':
            this.paternTxtError = false;
            break;
          case 'matern':
            this.maternTxtError = false;
            break;
          case 'mail':
            this.mailTxtError = false;
            break;
          case 'cel':
            this.celTxtError = false;
            break;
          case 'phone':
            this.phoneTxtError = false;
            break;
          case 'birthday':
            this.birthdayTxtError = false;
            break;
          case 'age':
            this.ageTxtError = false;
            break;
        }
        control.setErrors(null);
        return null;
      }
    });
  }

  validName(control: FormControl){
    if(control.value){
      return this.serviceValidInput('name', 'name', control.value, control);
    }
    if(this.inputError == 'name'){return {'error': true};}
    return null;
  }

  validPatern(control: FormControl){
    if(control.value){
      return this.serviceValidInput('patern', 'patern', control.value, control);
    }
    if(this.inputError == 'patern'){return {'error': true};}
    return null;
  }

  validMatern(control: FormControl){
    if(control.value){
      return this.serviceValidInput('matern', 'matern', control.value, control);
    }
    if(this.inputError == 'matern'){return {'error': true};}
    return null;
  }

  validMail(control: FormControl){
    if(control.value){
      return this.serviceValidInput('mail', 'mail', control.value, control);
    }
    if(this.inputError == 'mail'){return {'error': true};}
    return null;
  }

  validCel(control: FormControl){
    if(control.value){
      return this.serviceValidInput('cel', 'cel', control.value, control);
    }
    if(this.inputError == 'cel'){return {'error': true};}
    return null;
  }

  validPhone(control: FormControl){
    if(control.value){
      return this.serviceValidInput('phone', 'phone', control.value, control);
    }
    if(this.inputError == 'phone'){return {'error': true};}
    return null;
  }

  validGender(control: FormControl){
    if(this.user.gender == '0'){return {'error': true};}
    return null;
  }

  validBirthday(control: FormControl){
    if(this.inputError == 'birthday'){return {'error': true};}
    return null;
  }

  validAge(control: FormControl){
    if(this.inputError == 'age'){return {'error': true};}
    return null;
  }

  validInterestCampus(control: FormControl){
    if(this.user.interestCampus == '0'){return {'error': true};}
    return null;
  }

  validInterestNivel(control: FormControl){
    if(this.user.interestNivel == '0'){return {'error': true};}
    return null;
  }

  _keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  _keyPressTxt(event: any) {
    const pattern = /[a-zA-Z\ñ\Ñ\ ]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
}
