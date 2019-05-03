import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { DashboardComponent2 } from 'src/app/dashboard2/dashboard.component';
import { UserProfile2Component } from 'src/app/user-profile2/user-profile.component';
import { UserProfileEditComponent } from 'src/app/user-profile/user-profileEdit.component';


import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
} from '@angular/material';
import { UserProfile2EditComponent } from 'src/app/user-profile2/user-profile2Edit.component';
import { UserProfile3Component } from 'src/app/user-profile2/user-profile3.component';
import { UserProfile3EditComponent } from 'src/app/user-profile2/user-profile3Edit.component';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    NgxPaginationModule
  ],
  declarations: [
    DashboardComponent,
    DashboardComponent2,
    UserProfileComponent,
    UserProfileEditComponent,
    UserProfile2Component,
    UserProfile3Component,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    UserProfile2EditComponent,
    UserProfile3EditComponent

  ]
})

export class AdminLayoutModule {}
