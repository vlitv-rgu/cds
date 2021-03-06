import {NgModule} from '@angular/core';
import { MenuOtherPage } from './menu-other.page';
import {MapComponent} from './entities/components/map/map.component';
import {ContactsComponent} from './entities/components/contacts/contacts.component';
import {RespectComponent} from './entities/components/respect/respect.component';
import {NgCalendarModule} from 'ionic2-calendar';
import {SettingsComponent} from './entities/components/settings/settings.component';
import {CurrentRespectComponent} from './entities/components/respect/entities/components/current-respect/current-respect.component';
import {ShowImageComponent} from './entities/components/respect/entities/components/show-image/show-image.component';
import {CheckAdminRulesComponent} from './entities/components/settings/components/check-admin-rules/check-admin-rules.component';
import {SharedModule} from '../common/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ReportBugComponent} from './entities/components/settings/components/report-bug/report-bug.component';
import {MapService} from './entities/components/map/entities/services/map.service';
import {ContactsService} from './entities/components/contacts/services/contacts.service';

@NgModule({
    imports: [
        NgCalendarModule,
        SharedModule,
        ReactiveFormsModule,
    ],
  declarations: [
      MenuOtherPage,
      MapComponent,
      ContactsComponent,
      RespectComponent,
      SettingsComponent,
      CurrentRespectComponent,
      ShowImageComponent,
      CheckAdminRulesComponent,
      ReportBugComponent,
  ],
    providers: [
        MapService,
        ContactsService,
    ],
})
export class MenuOtherPageModule {}
