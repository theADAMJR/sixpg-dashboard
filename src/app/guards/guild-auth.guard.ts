import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { BotService } from '../services/bot.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class BotAuthGuard implements CanActivate {
  constructor(
    private botService: BotService,
    private userService: UserService) {}

  async canActivate(
    next: ActivatedRouteSnapshot) {
      if (!this.userService.user)
        await this.userService.updateUser();
      if (!this.userService.savedUser)
        await this.userService.updateSavedUser();
      if (this.botService.bots.length <= 0)
        await this.botService.updateBots();

      const botId = next.paramMap.get('id');                
      this.botService.singleton = next.data =
        (botId === this.botService.singleton?.botId) 
          ? this.botService.singleton : {
            botId,
            savedBot: await this.botService.getSavedBot(botId)
          };
      return this.botService.bots?.some(g => g.id === botId);
  }  
}
