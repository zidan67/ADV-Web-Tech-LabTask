import { Module, forwardRef } from '@nestjs/common';
import { NotificationController } from './notification.controller.js';
import { NotificationService } from './notification.service.js';
import { EnrollmentModule } from '../enrollment/enrollment.module.js';
import { NOTIFICATION_SERVICE } from './notification.constants.js';

@Module({
  imports: [
    forwardRef(() => EnrollmentModule),
  ],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    {
      provide: NOTIFICATION_SERVICE,
      useExisting: NotificationService,
    },
  ],
  exports: [NotificationService, NOTIFICATION_SERVICE],
})
export class NotificationModule {}