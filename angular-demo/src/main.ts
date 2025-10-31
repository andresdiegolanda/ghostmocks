/**
 * Angular Bootstrap
 * 
 * This is the entry point for the Angular application.
 * It bootstraps the root AppComponent in standalone mode (no NgModule needed).
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';

// Bootstrap the application with HttpClient provider
bootstrapApplication(AppComponent, {
  providers: [
    // Provide HttpClient for making API calls
    provideHttpClient()
  ]
}).catch(err => console.error(err));
