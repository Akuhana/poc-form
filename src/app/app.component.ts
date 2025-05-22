import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormComponent } from './components/form/form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormComponent],
  template: `
    <header class="app-header">
      <h1 class="app-title">Super Schöne Anwendung</h1>
    </header>
    
    <app-form></app-form>
    
    <router-outlet />
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'poc-form';
}
