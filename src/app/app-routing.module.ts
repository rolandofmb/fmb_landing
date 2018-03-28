import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewRegisterPromotionComponent } from './new-register-promotion/new-register-promotion.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { UploadBaseComponent } from './upload-base/upload-base.component';
import { UploadBaseSisComponent } from './upload-base-sis/upload-base-sis.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { NewRegisterComponent } from './new-register/new-register.component';
import {NewRegisterSoloComponent} from './new-register-solo/new-register-solo.component';
import {SearchInboundComponent} from "./search-inbound/search-inbound.component";
import {ModalConfirmComponent} from "./modal-confirm/modal-confirm.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: NewRegisterComponent
  },
  {
    path: 'registerPromotion',
    component: NewRegisterPromotionComponent
  },
  {
    path: 'registerSolo',
    component: NewRegisterSoloComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'searchInbound',
    component: SearchInboundComponent
  },
  {
    path: 'results',
    component: SearchResultsComponent
  },
  {
    path: 'upload',
    component: UploadBaseComponent
  },
  {
    path: 'upload-sis',
    component: UploadBaseSisComponent
  },
  {
    path: 'modal',
    component: ModalConfirmComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
