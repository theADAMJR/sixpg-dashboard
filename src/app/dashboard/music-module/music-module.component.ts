import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModuleConfig } from 'src/app/module-config';
import { BotService } from 'src/app/services/bot.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MusicService } from 'src/app/services/music.service';

@Component({
  selector: 'app-music-module',
  templateUrl: './music-module.component.html',
  styleUrls: ['./music-module.component.css']
})
export class MusicModuleComponent extends ModuleConfig implements OnInit {
  minSearchLength = 2;
  moduleName = 'music';

  get focused() { return document.activeElement.id === 'search'; }
  
  constructor(
    public botService: BotService,
    route: ActivatedRoute,
    saveChanges: MatSnackBar,
    public service: MusicService) {
    super(botService, route, saveChanges);
  }

  async ngOnInit() {
    await super.init();
  }
  
  buildForm({ music }) {
    return new FormGroup({
      enabled: new FormControl(music.enabled ?? true)
    });
  }

  min(a: number, b: number) { return Math.min(a, b); }
  max(a: number, b: number) { return Math.max(a, b); }
}
