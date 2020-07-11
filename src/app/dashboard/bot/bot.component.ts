import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BotService } from '../../services/bot.service';

@Component({
  selector: 'app-guild',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.css']
})
export class BotComponent implements OnInit {
  commands: any[]
  botNeedsPerms = false;
  bot: any;

  constructor(
    private guildService: BotService,
    private route: ActivatedRoute) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(async(paramMap) => {
      const id = paramMap.get('id');
      this.bot = this.guildService.getBot(id);

      const { commands } = await this.guildService.getSavedLog(this.bot.id);
      this.commands = commands;
    });
  }
}
