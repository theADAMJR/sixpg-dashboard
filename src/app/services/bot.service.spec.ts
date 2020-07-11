import { TestBed } from '@angular/core/testing';

import { BotService } from './bot.service';
import { HttpClientModule } from '@angular/common/http';

describe('BotService', () => {
  let service: BotService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(BotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
