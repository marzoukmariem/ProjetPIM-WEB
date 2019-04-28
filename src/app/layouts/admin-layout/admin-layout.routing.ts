import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { UserProfileEditComponent } from '../../user-profile/user-profileEdit.component';
import { UserProfile2Component } from 'src/app/user-profile2/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { DashboardComponent2 } from 'src/app/dashboard2/dashboard.component';
import { UserProfile2EditComponent } from 'src/app/user-profile2/user-profile2Edit.component';
import { UserProfile3Component } from 'src/app/user-profile2/user-profile3.component';
import { UserProfile3EditComponent } from 'src/app/user-profile2/user-profile3Edit.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'dashboard1',      component: TableListComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'dashboard2',   component: UserProfile2Component },
    { path: 'dashboard3NewProduct',   component: UserProfile3Component },
    { path: 'dashboard2Edit/:id',   component: UserProfile2EditComponent },
    { path: 'dashboard3Edit/:id',   component: UserProfile3EditComponent },
    { path: 'user-profileEdit',   component: UserProfileEditComponent },


];
