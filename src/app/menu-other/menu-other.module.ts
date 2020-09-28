import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuOtherPage } from './menu-other.page';
import { MenuOtherPageRoutingModule } from './menu-other-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MenuOtherPageRoutingModule
  ],
  declarations: [MenuOtherPage]
})
export class MenuOtherPageModule {}
