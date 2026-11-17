import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { NotificationService } from './notification.service.js';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
  ) {}

  @Post('send')
  sendNotification(@Body() notification: { message: string }) {
    return this.notificationService.sendNotification(
      notification.message,
    );
  }

  @Post('check')
  checkEnrollmentAndNotify() {
    return this.notificationService.checkEnrollmentAndNotify();
  }
}