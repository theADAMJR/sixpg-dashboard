import { Component, OnInit } from '@angular/core';
import { BotService } from 'src/app/services/bot.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'audit-log-widget',
  templateUrl: './audit-log-widget.component.html',
  styleUrls: ['./audit-log-widget.component.css']
})
export class AuditLogWidgetComponent implements OnInit {
  rows = 3;

  changeCount = 0;
  members: any[];
  changes: any[];

  constructor(
    private route: ActivatedRoute,
    private guildService: BotService,
    public userService: UserService) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(async(val) => {
      const id = val.get('id');
  
      const { changes } = await this.guildService.getSavedLog(id);
      this.changeCount = changes.length;
      this.changes = changes.splice(changes.length - this.rows, changes.length);
    });
  }
}
