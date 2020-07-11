import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class BotService {
  endpoint = environment.endpoint + '/bots';
  
  singleton = null;

  private _bots = [];
  get bots() { return this._bots; }

  private get key() { return localStorage.getItem('key'); }
  
  constructor(private http: HttpClient) {}  

  async updateBots() {
    this._bots = (this.key) ? 
      await this.http.get(`${this.endpoint}?key=${this.key}`).toPromise() as any : [];
  }

  getBot(id: string) {
    return this.bots?.find(g => g.id === id);
  }
  
  getPublicBot(id: string): Promise<any> {
    return this.http.get(`${this.endpoint}/${id}/public`).toPromise();
  }

  getMembers(botId: string, guildId: string): Promise<any> {
    return this.http.get(`${this.endpoint}/bots/${botId}/servers/${guildId}/members`).toPromise();
  }

  getSavedBot(id: string): Promise<any> {
    return this.http.get(`${this.endpoint}/${id}/config?key=${this.key}`).toPromise();
  }

  getSavedLog(id: string): Promise<any> {
    return this.http.get(`${this.endpoint}/${id}/log?key=${this.key}`).toPromise();
  }

  saveBot(id: string, module: string, value: any): Promise<any> {    
    return this.http.put(`${this.endpoint}/${id}/${module}?key=${this.key}`, value).toPromise();
  }

  createBot(value: any): Promise<any> {
    return this.http.post(`${this.endpoint}?key=${this.key}`, value).toPromise();
  }
}
