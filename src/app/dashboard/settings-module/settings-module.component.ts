import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ModuleConfig } from '../../module-config';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BotService } from '../../services/bot.service';

@Component({
  selector: 'app-settings-module',
  templateUrl: './settings-module.component.html',
  styleUrls: ['./settings-module.component.css']
})
export class SettingsModuleComponent extends ModuleConfig implements OnInit {
  moduleName = 'settings';

  constructor(
    guildService: BotService,
    route: ActivatedRoute,
    saveChanges: MatSnackBar) {
    super(guildService, route, saveChanges);
  }

  async ngOnInit() {
    await super.init();
  }

  buildForm({ settings }: any) {
    return new FormGroup({
      privateLeaderboard: new FormControl(settings.privateLeaderboard ?? false)
    });
  }
}
