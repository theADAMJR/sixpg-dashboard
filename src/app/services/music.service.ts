import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  endpoint = environment.endpoint + '/bots';

  private refreshList: number;

  private _list = [];
  get list() { return this._list; }
  
  private _paused = false;
  get paused() { return this._paused; }

  private _current = 0;
  get current() { return this._current; }
  
  private _max = Infinity;
  get max() { return this._max; }
  
  private get key() {
    return localStorage.getItem('key');
  }

  constructor(private http: HttpClient) {}

  async toggle(botId: string, guildId: string) {
    try {
      (this.paused) 
        ? await this.http.get(`${this.endpoint}/${botId}/guilds/${guildId}/music/resume?key=${this.key}`).toPromise() as Promise<any>
        : await this.http.get(`${this.endpoint}/${botId}/guilds/${guildId}/music/pause?key=${this.key}`).toPromise() as Promise<any>;
      
      this._paused = !this.paused;
    } catch {}
  }

  async updateList(botId: string, guildId: string) {
    this._list = await (this.http.get(`${this.endpoint}/${botId}/guilds/${guildId}/music/list?key=${this.key}`)
      .toPromise() as Promise<any>);

    if (this.list.length === 1) {
      this._paused = false;
      this._current = 0;

      clearInterval(this.refreshList);
      this.refreshList = window.setInterval(() => this.incrementPosition(botId, guildId), 1 * 1000);
    }
  }

  private async incrementPosition(botId: string, guildId: string) {
    if (this.paused) return;

    this._current++;

    this._max = this.list[0].duration / 1000;
    if (this._current >= this._max) {
      this._current = 0;
      await this.updateList(botId, guildId);
    }
  }

  async skip(botId: string, guildId: string) {
    await this.http.get(`${this.endpoint}/${botId}/guilds/${guildId}/music/skip?key=${this.key}`).toPromise() as Promise<any>;
    this.list.splice(0, 1);
    this._current = 0;
  }

  async play(botId: string, guildId: string, query: string) {
    await this.http.get(`${this.endpoint}/${botId}/guilds/${guildId}/music/play?key=${this.key}&query=${query}`).toPromise() as Promise<any>;
    await this.updateList(botId, guildId);
  }

  async stop(botId: string, guildId: string) {
    await this.http.get(`${this.endpoint}/${botId}/guilds/${guildId}/music/stop?key=${this.key}`).toPromise() as Promise<any>;
    this._paused = true;
    this._list = [];
    this._current = 0;
  }

  async removeTrack(botId: string, guildId: string, position: number) {
    await this.http.get(`${this.endpoint}/${botId}/guilds/${guildId}/music/remove/${position}?key=${this.key}`).toPromise() as Promise<any>;    
    await this.updateList(botId, guildId);
  }

  async seek(botId: string, guildId: string, position: number) {
    await this.http.get(`${this.endpoint}/${botId}/guilds/${guildId}/music/seek/${position}?key=${this.key}`).toPromise() as Promise<any>;
    this._current = position;
  }

  setVolume(botId: string, guildId: string, value: number) {
    return this.http.get(`${this.endpoint}/${botId}/guilds/${guildId}/music/set-volume/${value}?key=${this.key}`).toPromise() as Promise<any>;
  }

  async shuffle(botId: string, guildId: string) {
    await this.http.get(`${this.endpoint}/${botId}/guilds/${guildId}/music/shuffle?key=${this.key}`).toPromise() as Promise<any>;
    await this.updateList(botId, guildId);
  }
}
