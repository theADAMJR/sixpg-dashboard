import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModuleConfig } from '../../module-config';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BotService } from '../../services/bot.service';

@Component({
  selector: 'app-settings-module',
  templateUrl: './settings-module.component.html',
  styleUrls: ['./settings-module.component.css']
})
export class SettingsModuleComponent extends ModuleConfig implements OnInit {
  moduleName = 'settings';

  dangerousForm = new FormGroup({
    token: new FormControl('', Validators.pattern(/^[A-Za-z\d]{24}\.[A-Za-z\d-_]{6}\.[A-Za-z\d-_]{27}$/))
  });

  constructor(
    private router: Router,
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

  async delete() {
    const confirmation = prompt(
      `Are you sure you want to delete ${this.bot.username}?
      \nPlease type 'DELETE' to continue.`);
    if (confirmation !== 'DELETE') return;

    await this.botService.delete(this.botId);
    await this.router.navigate(['/dashboard']);

    await this.botService.updateBots();
  }

  async changeToken() {
    this.bot = await this.botService.changeToken(this.botId, this.dangerousForm.value.token);
    await this.botService.updateBots();
  }
}
