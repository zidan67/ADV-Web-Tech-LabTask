import {
  Injectable,
  Inject,
  forwardRef,
} from '@nestjs/common';
import type { EnrollmentService } from '../enrollment/enrollment.service.js';
import { ENROLLMENT_SERVICE } from '../enrollment/enrollment.constants.js';

@Injectable()
export class NotificationService {
  constructor(
    @Inject(forwardRef(() => ENROLLMENT_SERVICE))
    private readonly enrollmentService: EnrollmentService,
  ) {}

  sendNotification(message: string) {
    return {
      message: 'Notification sent',
      data: message,
    };
  }

  checkEnrollmentAndNotify() {
    const enrollments = this.enrollmentService.getEnrollments();

    return {
      message: 'Enrollment checked',
      data: enrollments,
    };
  }
}