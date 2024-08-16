import { DialogComponent } from './dialog/dialog.component';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddCourseDialogComponent } from './dialog/add-course-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditCourseDialogComponent } from './dialog/edit-course-dialog.component';

export interface Course {
  _id: string;
  courseName: string;
  university: string;
  location: string;
  start: string;
  length: number;
  price: number;
  currency: string;
  city: string;
  country: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    HttpClientModule,
    MatTooltipModule,
    MatDialogModule,
    AddCourseDialogComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  displayedColumns: string[] = ['actions', 'courseName', 'location', 'start', 'length', 'price'];
  dataSource: MatTableDataSource<Course> = new MatTableDataSource<Course>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit() {
    this.fetchCourses();
  }

  fetchCourses() {
    this.http.get<any[]>('http://127.0.0.1:5000/courses').subscribe(
      data => {
        const courses = data.map(course => ({
          _id: course._id,
          courseName: course.CourseName,
          university: course.University,
          location: `${course.City}, ${course.Country}, ${course.University}`,
          start: new Date(course.StartDate).toLocaleDateString(),
          end: new Date(course.EndDate).toLocaleDateString(),
          length: this.calculateCourseLength(course.StartDate, course.EndDate),
          price: course.Price,
          currency: course.Currency,
          courseDescription: course.CourseDescription,
          city: course.City,
          country: course.Country,
        }));

        courses.sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime());

        this.dataSource.data = courses;
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.error('There was an error fetching the courses!', error);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  calculateCourseLength(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  removeCourse(course: Course) {
    this.http.delete(`http://127.0.0.1:5000/courses/${course._id}`).subscribe(
      () => {
        const index = this.dataSource.data.indexOf(course);
        if (index >= 0) {
          this.dataSource.data.splice(index, 1);
          this.dataSource._updateChangeSubscription();
        }
      },
      error => {
        console.error('There was an error deleting the course!', error);
      }
    );
  }

  editCourse(course: Course) {
    const dialogRef = this.dialog.open(EditCourseDialogComponent, {
      width: '850px',
      height: '800px',
      data: course
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchCourses();
      }
      console.log('The dialog was closed');
    });
  }


  addNewCourse() {
    const dialogRef = this.dialog.open(AddCourseDialogComponent, {
      width: '850px',
      height: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchCourses();
      }
      console.log('The dialog was closed');
    });
  }

}
