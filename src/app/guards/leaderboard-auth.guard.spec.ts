import { TestBed } from '@angular/core/testing';

import { LeaderboardAuthGuard } from './leaderboard-auth.guard';
import { ActivatedRouteSnapshot } from '@angular/router';

describe('LeaderboardAuthGuard', () => {
  let guard: LeaderboardAuthGuard;

  let botConfig: any;
  let members: any;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    const fakeBotService = new class {
      getsavedBot() {
        return botConfig;
      }
      getMembers() {
        return members;
      }
    } as any;

    const fakeUserService = new class {
      
      get user() {
        return { id: '123' };
      }
    } as any;

    guard = new LeaderboardAuthGuard(fakeBotService, fakeUserService);
    botConfig = {};
    members = [];
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('canActivate returns true, if bot not found', async () => {
    botConfig = null;

    const result = await guard.canActivate(new ActivatedRouteSnapshot(), null);

    expect(result).toBeTrue();
  });

  it('canActivate returns false, if member not in private bot', async () => {
    botConfig.settings = { privateLeaderboard: true };

    const result = await guard.canActivate(new ActivatedRouteSnapshot(), null);

    expect(result).toBeFalse();
  });

  it('canActivate returns true, if member in private bot', async () => {
    botConfig.settings = { privateLeaderboard: true };
    members.push({ id: '123' });

    const result = await guard.canActivate(new ActivatedRouteSnapshot(), null);

    expect(result).toBeTrue();
  });
});
