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
  selector: 'app-new-register',
  templateUrl: './new-register.component.html',
  styleUrls: ['./new-register.component.scss']
})
export class NewRegisterComponent implements OnInit {
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
  canall = new FormControl('', this.validCanal.bind(this));
  interess = new FormControl('', this.validInteres.bind(this));
  namee = new FormControl('', this.validName.bind(this));
  paternn = new FormControl('', this.validPatern.bind(this));
  maternn = new FormControl('', this.validMatern.bind(this));
  maill = new FormControl('', this.validMail.bind(this));
  cell = new FormControl('', this.validCel.bind(this));
  phonee = new FormControl('', this.validPhone.bind(this));
  genderr = new FormControl('', this.validGender.bind(this));
  birthdayy = new FormControl('', this.validBirthday.bind(this));
  agee = new FormControl('', this.validAge.bind(this));
  interestCampuss = new FormControl('', this.validInterestCampus.bind(this));
  interestNivell = new FormControl('', this.validInterestNivel.bind(this));
  citaCampuss = new FormControl('', this.validCitaCampus.bind(this));
  tipificacionn = new FormControl('', this.validTipificacion.bind(this));

  constructor(private gralService: GeneralService, public dialog: MatDialog, private renderer: Renderer2) {
    this.user.canal = '0'; this.user.interes = '0'; this.user.csq = '0'; this.user.parent = '0'; this.user.gender = '0';
    this.user.interestCampus = '0'; this.user.interestArea = '0'; this.user.interestNivel = '0'; this.user.interestModel = '0'; this.user.interestCareer = '0';
    this.user.interestCycle = '0'; this.user.citaCampus = '0'; this.user.citaAsesor = '0'; this.user.tipificacion = '0';
  }

  ngOnInit() {
  }

  save() {
    console.log(this.user);
    if(this.send){
      return;
    }
    this.send = true;

    this.gralService.register(this.user).then((data) => {
      console.log(data['msg']);
      this.send = false;

      if(data['success'] == false) {
        this.inputError =  data['input'];
        this.txtError = data['msg'];

        switch (data['input']) {
          case 'canal':
            this.canal.focus();
            this.canal.open();
            break;
          case 'interes':
            this.interes.open();
            this.interes.focus();
            break;
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
          case 'citaCampus':
            this.citaCampus.open();
            this.citaCampus.focus();
            break;
          case 'tipificacion':
            this.tipificacion.open();
            this.tipificacion.focus();
            break;
          default:

        }

        /*const dialogRef = this.dialog.open(ModalConfirmComponent, {
          minWidth: '50%',
          data: { type: 'warning', content: data['msg'] }
        });

        dialogRef.afterClosed().subscribe(result => {
          if(result){
            console.log('The dialog was closed', result);
          }
        });*/
      }


    }, (err) => {
      console.warn(err);
      this.send = false;
    });
  }

  validCanal(control: FormControl){
    if(this.user.canal == '0'){return {'error': true};}
    return null;
  }

  validInteres(control: FormControl){
    if(this.user.interes == '0'){return {'error': true};}
    return null;
  }

  validName(control: FormControl){
    if(this.inputError == 'name'){return {'error': true};}
    return null;
  }

  validPatern(control: FormControl){
    if(this.inputError == 'patern'){return {'error': true};}
    return null;
  }

  validMatern(control: FormControl){
    if(this.inputError == 'matern'){return {'error': true};}
    return null;
  }

  validMail(control: FormControl){
    if(this.inputError == 'mail'){return {'error': true};}
    return null;
  }

  validCel(control: FormControl){
    if(this.inputError == 'cel'){return {'error': true};}
    return null;
  }

  validPhone(control: FormControl){
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

  validCitaCampus(control: FormControl){
    if(this.user.citaCampus == '0'){return {'error': true};}
    return null;
  }

  validTipificacion(control: FormControl){
    if(this.user.tipificacion == '0'){return {'error': true};}
    return null;
  }

  _keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }


}
