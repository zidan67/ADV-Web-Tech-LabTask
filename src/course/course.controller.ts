import { Controller ,Get,Post,Delete,Put,Param,Patch } from '@nestjs/common';
import {CourseService} from './course.service.js';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  

}