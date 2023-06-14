import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MessagingService {
  currentMessage = new BehaviorSubject<any>(null);

  constructor(private angularFireMessaging: AngularFireMessaging) {
    this.angularFireMessaging.messages.subscribe((payload: any) => {
      console.log('New message received.', payload);
      this.currentMessage.next(payload);
    });
  }
  sendNotification(userId: string, notification: any) {
    // Implement the code to send the notification to the specified user
    // using the messaging service or any other appropriate method.
    // You can access the user ID and notification data in this method.
  }
  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe((payload: any) => {
      console.log('New message received.', payload);
      this.currentMessage.next(payload);
    });
  }

}
