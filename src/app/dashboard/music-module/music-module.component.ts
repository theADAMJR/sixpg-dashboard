import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModuleConfig } from 'src/app/module-config';
import { BotService } from 'src/app/services/bot.service';
import { ActivatedRoute } from '@angular/router';
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

  playerForm = new FormGroup({ 
    guildId: new FormControl('', Validators.required),
    searchQuery: new FormControl('', Validators.required)
  });

  get botId() { return this.route.snapshot.paramMap.get('id'); }
  get guildId() { return this.playerForm.value.guildId; }
  get focused() { return document.activeElement.id === 'search'; }

  guilds = [];
  
  constructor(
    public botService: BotService,
    route: ActivatedRoute,
    saveChanges: MatSnackBar,
    public service: MusicService) {
    super(botService, route, saveChanges);
  }

  async ngOnInit() {
    await super.init();

    this.guilds = await this.botService.getGuilds(this.botId);
  }
  
  buildForm({ music }) {
    return new FormGroup({
      enabled: new FormControl(music.enabled ?? true)
    });
  }

  min(a: number, b: number) { return Math.min(a, b); }
  max(a: number, b: number) { return Math.max(a, b); }
}
