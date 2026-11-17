
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';

interface Course {
  id: number;
  name: string;
  code: string;
  instructor: string;
  credits: number;
  description?: string;
}

@Injectable()
export class CourseService {
  private courses: Course[] = [];
  private nextId = 1;

  getAllCourses() {
    return {
      message: 'All courses fetched successfully',
      data: this.courses,
    };
  }

  getCourseById(id: string) {
    const course = this.courses.find((c) => c.id === Number(id));

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return {
      message: 'Course fetched successfully',
      id,
      data: course,
    };
  }

  createCourse(dto: CreateCourseDto) {
    const course: Course = {
      id: this.nextId++,
      ...dto,
    };

    this.courses.push(course);

    return {
      message: 'Course created successfully',
      data: course,
    };
  }

  updateCourse(id: string, dto: UpdateCourseDto) {
    const course = this.courses.find((c) => c.id === Number(id));

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

  patchCourse(id: string, dto: UpdateCourseDto) {
    const course = this.courses.find((c) => c.id === Number(id));

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

  deleteCourse(id: string) {
    const index = this.courses.findIndex(
      (c) => c.id === Number(id),
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

  uploadCourseMaterial(
    id: string,
    file: Express.Multer.File,
  ) {
    const course = this.courses.find((c) => c.id === Number(id));

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    if (!file) {
      throw new Error('File is required');
    }

    return {
      message: 'Material uploaded successfully',
      courseId: id,
      filename: file.filename,
      path: file.path,
    };
  }
}
