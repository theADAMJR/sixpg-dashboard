import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { BotService } from '../services/bot.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent {
  form = new FormGroup({
    token: new FormControl('', Validators.pattern(/^[A-Za-z\d]{24}\.[A-Za-z\d-]{6}\.[A-Za-z\d-_]{27}$/))
  });

  constructor(private botService: BotService) {}

  async submit() {
    if (this.form.touched && this.form.valid)
      await this.botService.createBot(this.form.value);
  }
}
