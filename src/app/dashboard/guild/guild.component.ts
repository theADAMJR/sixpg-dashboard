import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BotService } from '../../services/bot.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.css']
})
export class GuildComponent implements OnInit {
  commands: any[]
  botNeedsPerms = false;
  guild: any;

  constructor(
    private guildService: BotService,
    private route: ActivatedRoute) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(async(paramMap) => {
      const id = paramMap.get('id');
      this.guild = this.guildService.getBot(id);

      const { commands } = await this.guildService.getSavedLog(this.guild.id);
      this.commands = commands;
    });
  }
}
