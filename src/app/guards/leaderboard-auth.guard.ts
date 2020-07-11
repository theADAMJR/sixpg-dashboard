import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BotService } from '../services/bot.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardAuthGuard implements CanActivate {
  constructor(
    private guildService: BotService,
    private userService: UserService) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const botId = next.paramMap.get('id');
    const guildId = next.paramMap.get('id');

    const guildConfig = await this.guildService.getSavedBot(botId);
    if (guildConfig?.settings.privateLeaderboard) {
      const members = await this.guildService.getMembers(botId, guildId);
      return members.some(m => m.id === this.userService.user.id);
    }
    return !(guildConfig || guildConfig.settings.privateLeaderboard);
  }
}
