import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BotService } from '../../services/bot.service';

@Component({
  selector: 'bot-sidebar',
  templateUrl: './bot-sidebar.component.html',
  styleUrls: ['./bot-sidebar.component.css']
})
export class BotSidebarComponent implements OnInit {
  @Input('waitFor') loaded = true;
  
  id: string;
  bot: any;
  savedBot: any;

  constructor(
    private guildService: BotService,
    private route: ActivatedRoute,
    private router: Router) {
      document.title = '6PG - Dashboard';
    }

  async ngOnInit() {
    this.route.paramMap.subscribe(async(paramMap) => {
      this.id = paramMap.get('id');

      this.savedBot = await this.guildService.getSavedBot(this.id);
      this.bot = this.guildService.getBot(this.id);
      
      if (!this.bot)
        this.router.navigate(['/dashboard']);
    });
  }
}
