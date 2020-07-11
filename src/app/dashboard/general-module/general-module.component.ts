import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModuleConfig } from '../../module-config';
import { BotService } from '../../services/bot.service';

@Component({
  selector: 'app-general-module',
  templateUrl: './general-module.component.html',
  styleUrls: ['./general-module.component.css']
})
export class GeneralModuleComponent extends ModuleConfig implements OnInit {
  moduleName = 'general';

  get general() { return this.savedGuild.general; }

  constructor(
    guildService: BotService,
    route: ActivatedRoute,
    saveChanges: MatSnackBar) {
    super(guildService, route, saveChanges);
  }

  async ngOnInit() {
    await super.init();
  }

  buildForm({ general }: any) {
    const formGroup = new FormGroup({
      prefix: new FormControl(general.prefix ?? '', [
        Validators.required, 
        Validators.maxLength(5) 
      ]),
      ignoredChannelNames: new FormControl(general.ignoredChanneNamess ?? []),
      autoRoleNames: new FormControl(general.autoRoleNames ?? [])
    });
    return formGroup;
  }
}
