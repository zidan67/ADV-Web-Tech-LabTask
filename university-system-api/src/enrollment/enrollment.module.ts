import { Module, forwardRef } from '@nestjs/common';
import { EnrollmentController } from './enrollment.controller.js';
import { EnrollmentService } from './enrollment.service.js';
import { CourseModule } from '../course/course.module.js';
import { NotificationModule } from '../notification/notification.module.js';
import { ENROLLMENT_SERVICE } from './enrollment.constants.js';

@Module({
  imports: [
    CourseModule,
    forwardRef(() => NotificationModule),
  ],
  controllers: [EnrollmentController],
  providers: [
    EnrollmentService,
    {
      provide: ENROLLMENT_SERVICE,
      useExisting: EnrollmentService,
    },
  ],
  exports: [EnrollmentService, ENROLLMENT_SERVICE],
})
export class EnrollmentModule {}