import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  message: string = '';
  type: string = '';
  show: boolean = false;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.getNotification().subscribe(notification => {
      console.log(notification);
      this.message = notification.message;
      this.type = notification.type;
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 5000); // Esconde após 5 segundos
    });
  }
}