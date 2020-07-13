import { NgModule } from '@angular/core';
import { RouterModule, Routes, ActivatedRouteSnapshot, RouterStateSnapshot, RouteReuseStrategy } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CommandsComponent } from './commands/commands.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { InviteComponent as AddBotComponent } from './invite/invite.component';
import { LogoutComponent } from './logout/logout.component';
import { DashboardComponent } from './dashboard/dashboard-overview/dashboard-overview.component';
import { BotComponent } from './dashboard/bot/bot.component';
import { DashboardAuthGuard } from './guards/dashboard-auth.guard';
import { GeneralModuleComponent } from './dashboard/general-module/general-module.component';
import { LevelingModuleComponent } from './dashboard/leveling-module/leveling-module.component';
import { MusicModuleComponent } from './dashboard/music-module/music-module.component';
import { AutoModModuleComponent } from './dashboard/auto-mod-module/auto-mod-module.component';
import { AnnounceModuleComponent } from './dashboard/announce-module/announce-module.component';
import { LogModuleComponent } from './dashboard/log-module/log-module.component';
import { SettingsModuleComponent } from './dashboard/settings-module/settings-module.component';
import { CommandsModuleComponent } from './dashboard/commands-module/commands-module.component';
import { LeaderboardModuleComponent } from './dashboard/leaderboard-module/leaderboard-module.component';
import { LeaderboardAuthGuard } from './guards/leaderboard-auth.guard';
import { XPCardComponent } from './xp-card/xp-card.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { DocsComponent } from './docs/docs.component';
import { CanDeactivateDashboard } from './guards/can-deactivate-dashboard.guard';
import { BotAuthGuard } from './guards/bot-auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'commands', component: CommandsComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'docs', component: DocsComponent },
  { path: 'docs/:page', component: DocsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'add-bot', component: AddBotComponent },

  { path: 'dashboard', component: DashboardComponent, canActivate: [DashboardAuthGuard] },
  { path: 'dashboard/xp-card', component: XPCardComponent, canActivate: [DashboardAuthGuard] },

  { path: 'bots/:id', component: BotComponent, canActivate: [BotAuthGuard] },
  { path: 'bots/:id/announce', component: AnnounceModuleComponent, canActivate: [BotAuthGuard], canDeactivate: [CanDeactivateDashboard] },
  { path: 'bots/:id/auto-mod', component: AutoModModuleComponent, canActivate: [BotAuthGuard], canDeactivate: [CanDeactivateDashboard] },
  { path: 'bots/:id/commands', component: CommandsModuleComponent, canActivate: [BotAuthGuard], canDeactivate: [CanDeactivateDashboard] },
  { path: 'bots/:id/general', component: GeneralModuleComponent, canActivate: [BotAuthGuard], canDeactivate: [CanDeactivateDashboard] },
  { path: 'bots/:id/music', component: MusicModuleComponent, canActivate: [BotAuthGuard], canDeactivate: [CanDeactivateDashboard] },
  { path: 'bots/:id/leveling', component: LevelingModuleComponent, canActivate: [BotAuthGuard], canDeactivate: [CanDeactivateDashboard] },
  { path: 'bots/:id/log', component: LogModuleComponent, canActivate: [BotAuthGuard] },
  { path: 'bots/:id/settings', component: SettingsModuleComponent, canActivate: [BotAuthGuard], canDeactivate: [CanDeactivateDashboard] },

  { path: 'bots/:id/leaderboard/:guildId', component: LeaderboardModuleComponent, canActivate: [LeaderboardAuthGuard] },

  { path: 'payment-success', component: PaymentSuccessComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
