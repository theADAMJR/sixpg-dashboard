import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BotService } from '../services/bot.service';
import { UserService } from '../services/user.service';

@Injectable({ providedIn: 'root' })
export class LeaderboardAuthGuard implements CanActivate {
  constructor(
    private botService: BotService,
    private userService: UserService) {}

  async canActivate(next: ActivatedRouteSnapshot) {
    const botId = next.paramMap.get('id');
    const guildId = next.paramMap.get('guildId');

    const botConfig = await this.botService.getSavedBot(botId);
    if (botConfig?.settings.privateLeaderboard) {
      const members = await this.botService.getMembers(botId, guildId);
      return members.some(m => m.id === this.userService.user.id);
    }
    return Boolean(botConfig);
  }
}
