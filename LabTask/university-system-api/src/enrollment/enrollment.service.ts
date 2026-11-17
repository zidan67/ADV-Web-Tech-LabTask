import {
  Injectable,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CourseService } from '../course/course.service.js';
import type { NotificationService } from '../notification/notification.service.js';
import { NOTIFICATION_SERVICE } from '../notification/notification.constants.js';

@Injectable()
export class EnrollmentService {
  constructor(
    private readonly courseService: CourseService,

    @Inject(forwardRef(() => NOTIFICATION_SERVICE))
    private readonly notificationService: NotificationService,
  ) {}

  getEnrollments() {
    return {
      message: 'All enrollments fetched',
      data: [],
    };
  }

  enrollStudent(courseId: string) {
    const course = this.courseService.getCourseById(courseId);

    this.notificationService.sendNotification(
      'Student enrolled in course',
    );

    return {
      message: 'Student enrolled',
      course: course,
    };
  }
}