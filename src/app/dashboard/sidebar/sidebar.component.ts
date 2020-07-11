import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BotService } from '../../services/bot.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer;

  get guilds() { return this.botService.bots || []; }
  get user() { return this.userService.user || {}; }

  constructor(
    private botService: BotService,
    private userService: UserService) {}

  async ngOnInit() {
    if (this.botService.bots.length <= 0)
      await this.botService.updateBots();
  }

  toggle(el: HTMLElement) {
    const icon = (el.tagName !== 'DIV') ? el.parentElement : el;
    icon.classList.toggle('open');
    this.drawer.toggle();
  }
}
