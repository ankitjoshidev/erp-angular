import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomLayoutComponent } from './custom-layout/custom-layout.component';
import { VexRoutes } from '../@vex/interfaces/vex-route.interface';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';
import { AuthGuardPrivateUser } from './guards/privateUser';

const routes: VexRoutes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/pages/auth/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/pages/auth/register/register.module').then(m => m.RegisterModule),
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/pages/auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
  },
  {
    path: '',
    component: CustomLayoutComponent,
    children: [
      {
        path: 'dashboards/analytics',
        redirectTo: '/',
        pathMatch: 'full'
      },
      {
        path: '',
        canActivate: [AuthGuardPrivateUser],
        loadChildren: () => import('./pages/dashboards/dashboard-analytics/dashboard-analytics.module').then(m => m.DashboardAnalyticsModule),
      },
      {
        path: 'apps',
        canActivate: [AuthGuardPrivateUser],
        children: [
          {
            path: 'chat',
            canActivate: [AuthGuardPrivateUser],
            loadChildren: () => import('./pages/apps/chat/chat.module').then(m => m.ChatModule),
            data: {
              toolbarShadowEnabled: true
            }
          },
          {
            path: 'social',
            canActivate: [AuthGuardPrivateUser],
            loadChildren: () => import('./pages/apps/social/social.module').then(m => m.SocialModule)
          },
          {
            path: 'contacts',
            canActivate: [AuthGuardPrivateUser],
            loadChildren: () => import('./pages/apps/contacts/contacts.module').then(m => m.ContactsModule)
          },
          {
            path: 'users',
            canActivate: [AuthGuardPrivateUser],
            loadChildren: () => import('./pages/apps/user-table/user-table.module').then(m => m.UserTableModule),
          },
          {
            path: 'editor',
            canActivate: [AuthGuardPrivateUser],
            loadChildren: () => import('./pages/apps/editor/editor.module').then(m => m.EditorModule),
          },
          {
            path: 'mail',
            canActivate: [AuthGuardPrivateUser],
            loadChildren: () => import('./pages/apps/mail/mail.module').then(m => m.MailModule),
            data: {
              toolbarShadowEnabled: true,
              scrollDisabled: true
            }
          },
          {
            path: 'social',
            canActivate: [AuthGuardPrivateUser],
            loadChildren: () => import('./pages/apps/social/social.module').then(m => m.SocialModule)
          },
          {
            path: 'calendar',
            canActivate: [AuthGuardPrivateUser],
            loadChildren: () => import('./pages/apps/calendar/calendar.module').then(m => m.CalendarModule),
            data: {
              toolbarShadowEnabled: true
            }
          },
          {
            path: 'scrumboard',
            canActivate: [AuthGuardPrivateUser],
            loadChildren: () => import('./pages/apps/scrumboard/scrumboard.module').then(m => m.ScrumboardModule),
          }
        ]
      },
      {
        path: 'pages',
        children: [
          {
            path: 'error-404',
            loadChildren: () => import('./pages/pages/errors/error-404/error-404.module').then(m => m.Error404Module)
          },
          {
            path: 'error-500',
            loadChildren: () => import('./pages/pages/errors/error-500/error-500.module').then(m => m.Error500Module)
          }
        ]
      },
      {
        path: '**',
        loadChildren: () => import('./pages/pages/errors/error-404/error-404.module').then(m => m.Error404Module)
      }
    ]
  }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        preloadingStrategy: QuicklinkStrategy,
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled'
    })],
    exports: [RouterModule, QuicklinkModule]
})
export class AppRoutingModule {
}
