import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import Pusher from 'pusher-js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'test-frontend';
  userName: string = 'userName';
  message: string = 'Hello';
  messages: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('89217447d85e13a93783', {
      cluster: 'ap2',
    });

    var channel = pusher.subscribe('chat');
    channel.bind('messages', (data: any) => {
      this.messages.push(data);
    });
  }

  submit() {
    this.http
      .post('http://127.0.0.1:8000/api/message', {
        userName: this.userName,
        message: this.message,
      })
      .subscribe({
        next: (res: any) => {},
        error: (e: any) => {
          console.log(e);
        },
      });
  }
}
