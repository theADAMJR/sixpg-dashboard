import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { BotService } from '../services/bot.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class GuildAuthGuard implements CanActivate {
  constructor(
    private guildService: BotService,
    private userService: UserService) {}

  async canActivate(
    next: ActivatedRouteSnapshot) {
      if (!this.userService.user)
        await this.userService.updateUser();
      if (!this.userService.savedUser)
        await this.userService.updateSavedUser();
      if (this.guildService.bots.length <= 0)
        await this.guildService.updateBots();

      const guildId = next.paramMap.get('id');                
      this.guildService.singleton = next.data =
        (guildId === this.guildService.singleton?.guildId) 
          ? this.guildService.singleton : {
            guildId,
            savedGuild: await this.guildService.getSavedBot(guildId)
          };
      return this.guildService.bots?.some(g => g.id === guildId);
  }  
}
