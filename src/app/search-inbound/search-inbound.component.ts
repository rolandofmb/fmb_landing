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
  selector: 'app-search-inbound',
  templateUrl: './search-inbound.component.html',
  styleUrls: ['./search-inbound.component.scss']
})
export class SearchInboundComponent implements OnInit {
  @ViewChild('mail') mail: ElementRef;
  user: any = {};
  send = false;
  inputError: any;
  txtError: any;

  matcher = new MyErrorStateMatcher();
  maill = new FormControl('', this.validMail.bind(this));

  constructor(private gralService: GeneralService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  save() {
    console.log(this.user);
    if(this.send){
      return;
    }
    this.send = true;

    this.gralService.searchInbound(this.user).then((data) => {
      console.log(data['msg']);
      this.send = false;

      if(data['success'] == false) {
        this.inputError =  data['input'];
        this.txtError = data['msg'];

        switch (data['input']) {
          case 'mail':
            this.mail.nativeElement.focus();
            break;
          default:

        }
      }


    }, (err) => {
      console.warn(err);
      this.send = false;
    });
  }

  validMail(control: FormControl){
    if(this.inputError == 'mail'){return {'error': true};}
    return null;
  }
}
