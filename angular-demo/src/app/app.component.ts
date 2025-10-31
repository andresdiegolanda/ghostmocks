/**
 * AppComponent - Main Application Component
 * 
 * This component demonstrates:
 * 1. Making HTTP GET requests to an external API
 * 2. Using RxJS Observables with async pipe
 * 3. Displaying a list of users in the template
 * 
 * The API call can be intercepted by Playwright tests to serve mock data
 * instead of hitting the real API.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Observable stream of users - will be consumed by async pipe in template
  users$!: Observable<User[]>;
  
  // API endpoint - this is the real API, but Playwright can intercept it
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch users when component initializes
    // The HttpClient.get() returns an Observable that emits once and completes
    this.users$ = this.http.get<User[]>(this.apiUrl);
    
    console.log('🔄 Fetching users from:', this.apiUrl);
    
    // Subscribe to log the response (optional - for demo purposes)
    this.users$.subscribe({
      next: (users) => {
        console.log(`✓ Loaded ${users.length} users`);
      },
      error: (error) => {
        console.error('❌ Error loading users:', error);
      }
    });
  }
}
