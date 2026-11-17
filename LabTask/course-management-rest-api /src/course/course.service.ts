import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';

@Injectable()
export class CourseService {
  private courses: {
    id: number;
    name: string;
    code: string;
    instructor: string;
    credits: number;
    description?: string;
  }[] = [];

  private nextId = 1;

  // GET ALL COURSES
  getAllCourses() {
    return {
      message: 'All courses fetched successfully',
      data: this.courses,
    };
  }

  // GET COURSE BY ID
  getCourseById(id: string) {
    const course = this.courses.find(
      (course) => course.id === Number(id),
    );

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return {
      message: 'Course fetched successfully',
      id,
    };
  }

  // CREATE COURSE
  createCourse(dto: CreateCourseDto) {
    const course = {
      id: this.nextId++,
      ...dto,
    };

    this.courses.push(course);

    return {
      message: 'Course created successfully',
      data: course,
    };
  }

  // UPDATE COURSE
  updateCourse(id: string, dto: UpdateCourseDto) {
    const course = this.courses.find(
      (course) => course.id === Number(id),
    );

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    Object.assign(course, dto);

    return {
      message: 'Course updated successfully',
      id,
      data: course,
    };
  }

  // PATCH COURSE
  patchCourse(id: string, dto: UpdateCourseDto) {
    const course = this.courses.find(
      (course) => course.id === Number(id),
    );

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    Object.assign(course, dto);

    return {
      message: 'Course patched successfully',
      id,
      updatedFields: Object.keys(dto),
    };
  }

  // DELETE COURSE
  deleteCourse(id: string) {
    const index = this.courses.findIndex(
      (course) => course.id === Number(id),
    );

    if (index === -1) {
      throw new NotFoundException('Course not found');
    }

    this.courses.splice(index, 1);

    return {
      message: 'Course deleted successfully',
      id,
    };
  }

  // UPLOAD COURSE MATERIAL
  uploadCourseMaterial(
    id: string,
    file: Express.Multer.File,
  ) {
    const course = this.courses.find(
      (course) => course.id === Number(id),
    );

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return {
      message: 'Material uploaded successfully',
      courseId: id,
      filename: file.filename,
      path: file.path,
    };
  }
}
