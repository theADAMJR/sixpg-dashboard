import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SaveChangesComponent } from './dashboard/save-changes/save-changes.component';
import { BotService } from './services/bot.service';
import {  OnDestroy } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { Subscription } from 'rxjs';

export abstract class ModuleConfig implements OnDestroy {
    abstract moduleName: string;

    form: FormGroup;

    savedBot: any;
    bot: any;
    originalsavedBot: any;

    channels: any = [];
    textChannels: any = [];
    roles: any = [];

    get botId() { return this.route.snapshot.paramMap.get('id'); }

    private saveChanges$: Subscription;  
    private valueChanges$: Subscription;  
  
    constructor(
        protected botService: BotService,
        protected route: ActivatedRoute,
        public saveChanges: MatSnackBar) {}

    /**
     * Load all required data for the form, and hook events.
     */
    async init() {
        const data = this.route.snapshot.data;
        
        this.bot = this.botService.bots.find(g => g.id === this.botId);

        this.roles = data.roles;
        this.channels = data.channels;
        this.textChannels = data.channels.filter(c => c.type === 'text');

        this.savedBot = data.savedBot;
        this.originalsavedBot = JSON.parse(JSON.stringify(this.savedBot));
        
        await this.resetForm();

        this.valueChanges$ = this.form.valueChanges
            .subscribe(() => this.openSaveChanges());     
    }

    private async resetForm() {     
        this.savedBot = JSON.parse(JSON.stringify(this.originalsavedBot));   
        this.form = await this.buildForm(this.savedBot);
        this.form.addControl('enabled',
            new FormControl(this.savedBot[this.moduleName]?.enabled));
    }

    /**
     * Build the form to be used.
     * Called when on form init.
     */
    abstract buildForm(savedBot: any): FormGroup | Promise<FormGroup>;
    
    private openSaveChanges() {
        const snackBarRef = this.saveChanges._openedSnackBarRef;
        if (!this.form.valid || snackBarRef) return;

        this.saveChanges$ = this.saveChanges.openFromComponent(SaveChangesComponent).afterOpened()
        .subscribe(() => {
            const component = this.saveChanges._openedSnackBarRef.instance as SaveChangesComponent;
            component.onSave.subscribe(async() => await this.submit());
            component.onReset.subscribe(async() => await this.reset());
        });        
    }

    /**
     * Clean up subscriptions - to prevent memory leak.
     */    
    ngOnDestroy() {        
        this.valueChanges$?.unsubscribe();
        this.saveChanges$?.unsubscribe();
    }

    /**
     * Send the form data to the API.
     */
    async submit() {
        console.log(this.form.value);
        try {
            if (this.form.valid)
                await this.botService.saveBot(this.botId, this.moduleName, this.form.value);
        } catch { alert('An error occurred when submitting the form - check console'); }
    }

    /**
     * Reset form values, and rebuild form.
     */
    async reset() {
        await this.resetForm();
        this.savedBot = JSON.parse(JSON.stringify(this.originalsavedBot));
        
        this.form.valueChanges
            .subscribe(() => this.openSaveChanges()); 
    }

    // input events

    add(event: MatChipInputEvent, array: any[]) {        
        const { value, input } = event;
    
        if ((value || '').trim())
          array.push(value.trim());
    
        if (input) 
          input.value = '';

        this.openSaveChanges();
    }
    
    remove(item: any, array: any[]) {
        const index = array.indexOf(item);
        if (index >= 0)
            array.splice(index, 1);
        
        this.openSaveChanges();
    }

    getChannel(id: string) {
        return this.channels.find(c => c.id === id);
    }
}