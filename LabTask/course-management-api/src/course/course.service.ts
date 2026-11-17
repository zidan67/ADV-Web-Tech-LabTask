import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseService {
  getTitle():string{
    return "Welcome to Course Management Application";
  }
  getAllCourses() : string {
    return "Get All courses - from service";
}
 getCourseByID(id:string) : string {
    return "Get course with ID : " + id + " - from services ";
 }
 createCourse():string {
    return "Create course - from Service ";

}
updateCourse(id:string):string {
    return "Update course " + id + " - from Service";
}

patchCourse(id:string):string{
    return "Patch Course "+ id + " - from service" ;
}

deleteCourse(id:string) : string{
    return "Delete Course "+ id +" - from Services";
}

}