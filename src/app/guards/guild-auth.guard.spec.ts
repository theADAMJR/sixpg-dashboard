import { TestBed } from '@angular/core/testing';

import { BotAuthGuard } from './bot-auth.guard';
import { HttpClientModule } from '@angular/common/http';

describe('BotAuthGuard', () => {
  let guard: BotAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    guard = TestBed.inject(BotAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('bot does not exist, returns false', () => {
    const result = guard.canActivate(null, null);

    expect(result).toBeFalse();
  });

  it('user not in bot, returns false', () => {
    const result = guard.canActivate(null, null);

    expect(result).toBeFalse();
  });

  it('user in bot and is not manager, returns false', () => {
    const result = guard.canActivate(null, null);

    expect(result).toBeFalse();
  });

  it('user in bot and is manager, returns true', () => {
    const result = guard.canActivate(null, null);

    expect(result).toBeTrue();
  });
});
