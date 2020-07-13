import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { BotService } from '../services/bot.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent {
  form = new FormGroup({
    token: new FormControl('', Validators.pattern(/^[A-Za-z\d]{24}\.[A-Za-z\d-_]{6}\.[A-Za-z\d-_]{27}$/))
  });

  constructor(
    private botService: BotService,
    private router: Router) {}

  async submit() {
    if (this.form.touched && this.form.valid) {
      const { _id } = await this.botService.createBot(this.form.value);

      await this.botService.updateBots();
      await this.router.navigate([`/bots/`, _id]);
    }
  }
}
