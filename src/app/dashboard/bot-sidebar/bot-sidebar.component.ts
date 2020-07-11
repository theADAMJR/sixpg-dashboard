import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BotService } from '../../services/bot.service';

@Component({
  selector: 'bot-sidebar',
  templateUrl: './bot-sidebar.component.html',
  styleUrls: ['./guild-sidebar.component.css']
})
export class BotSidebarComponent implements OnInit {
  @Input('waitFor') loaded = true;
  
  id: string;
  guild: any;
  savedGuild: any;

  constructor(
    private guildService: BotService,
    private route: ActivatedRoute,
    private router: Router) {
      document.title = '6PG - Dashboard';
    }

  async ngOnInit() {
    this.route.paramMap.subscribe(async(paramMap) => {
      this.id = paramMap.get('id');

      this.savedGuild = await this.guildService.getSavedBot(this.id);
      this.guild = this.guildService.getBot(this.id);
      
      if (!this.guild)
        this.router.navigate(['/dashboard']);
    });
  }
}
