import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-course-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  template: `
    <form [formGroup]="courseForm" (ngSubmit)="onSave()" class="dialog-form">
      <div mat-dialog-content class="dialog-content">
        <h2 mat-dialog-title>Edit Course</h2>
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>University</mat-label>
          <input matInput formControlName="university" readonly>
        </mat-form-field>
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>City</mat-label>
          <input matInput formControlName="city" readonly>
        </mat-form-field>
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Country</mat-label>
          <input matInput formControlName="country" readonly>
        </mat-form-field>
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Course Name</mat-label>
          <input matInput formControlName="courseName" readonly>
        </mat-form-field>
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Course Description</mat-label>
          <textarea matInput formControlName="courseDescription" placeholder="Enter course description" required></textarea>
        </mat-form-field>
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Start Date</mat-label>
          <input matInput formControlName="startDate" placeholder="YYYY/MM/DD" required (input)="formatDate($event)" [ngClass]="{'invalid-date': startDateInvalid}">
          <mat-error *ngIf="startDateInvalid">Invalid Start Date</mat-error>
        </mat-form-field>
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>End Date</mat-label>
          <input matInput formControlName="endDate" placeholder="YYYY/MM/DD" required (input)="formatDate($event)" [ngClass]="{'invalid-date': endDateInvalid}">
          <mat-error *ngIf="endDateInvalid">End Date must be after Start Date</mat-error>
        </mat-form-field>
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Price</mat-label>
          <input matInput formControlName="price" type="number" placeholder="Enter price" required>
        </mat-form-field>
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Currency</mat-label>
          <mat-select formControlName="currency" required>
            <mat-option *ngFor="let currency of currencies" [value]="currency">
              {{ currency }}
            </mat-option>
          </mat-select>
        </mat-form-field>
      </div>
      <div mat-dialog-actions class="dialog-actions">
        <button mat-button type="button" (click)="onCancel()">Cancel</button>
        <button mat-button color="primary" type="submit" [disabled]="courseForm.invalid || startDateInvalid || endDateInvalid">Save</button>
      </div>
    </form>
  `,
  styles: [`
    .dialog-form {
      width: 100%;
    }
    .full-width {
      width: 100%;
    }
    .dialog-content {
      padding: 0 24px;
      margin-bottom: 16px;
      margin-top: 16px;
    }
    :host ::ng-deep .mat-dialog-container {
      border-radius: 0;
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      padding: 0;
      box-sizing: border-box;
    }
    h2.mat-dialog-title {
      width: 100%;
      margin: 0;
      text-align: center;
      padding: 8px 24px;
    }
    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      padding: 8px 24px;
    }
    .invalid-date {
      border-color: red;
    }
  `]
})
export class EditCourseDialogComponent implements OnInit {
  courseForm: FormGroup;
  startDateInvalid: boolean = false;
  endDateInvalid: boolean = false;

  universities: string[] = [];
  filteredUniversities: string[] = [];
  countries: string[] = [];
  filteredCountries: string[] = [];
  cities: string[] = [];
  filteredCities: string[] = [];
  currencies: string[] = ['USD', 'EUR', 'CZK', 'GBP', 'AUD', 'CAD', 'JPY'];

  constructor(
    public dialogRef: MatDialogRef<EditCourseDialogComponent>,
    private fb: FormBuilder,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.courseForm = this.fb.group({
      courseName: [{ value: '', disabled: true }, Validators.required],
      university: [{ value: '', disabled: true }, Validators.required],
      city: [{ value: '', disabled: true }, Validators.required],
      country: [{ value: '', disabled: true }, Validators.required],
      startDate: ['', [Validators.required, this.dateValidator]],
      endDate: ['', [Validators.required, this.dateValidator, this.endDateValidator.bind(this)]],
      courseDescription: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      currency: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadData();

    if (this.data) {
      this.courseForm.patchValue({
        courseName: this.data.courseName,
        university: this.data.university,
        city: this.data.city,
        country: this.data.country,
        startDate: this.data.start,
        endDate: this.data.end,
        courseDescription: this.data.courseDescription,
        price: this.data.price,
        currency: this.data.currency
      });

      console.log('Start Date:', this.data.startDate || this.data.StartDate || this.data.start);
      console.log('End Date:', this.data.endDate || this.data.EndDate || this.data.end);
    }

    this.courseForm.get('university')!.valueChanges.subscribe(value => {
      this.filteredUniversities = this.filterOptions(value, this.universities);
    });

    this.courseForm.get('country')!.valueChanges.subscribe(value => {
      this.filteredCountries = this.filterOptions(value, this.countries);
    });

    this.courseForm.get('city')!.valueChanges.subscribe(value => {
      this.filteredCities = this.filterOptions(value, this.cities);
    });
  }

  private loadData(): void {
    this.http.get<any[]>('http://127.0.0.1:5000/courses').subscribe(data => {
      this.universities = Array.from(new Set(data.map(course => course.University).filter(Boolean)));
      this.countries = Array.from(new Set(data.map(course => course.Country).filter(Boolean)));
      this.cities = Array.from(new Set(data.map(course => course.City).filter(Boolean)));
    });
  }

  private filterOptions(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  formatDate(event: any): void {
    const input = event.target.value.replace(/[^0-9]/g, '');
    if (input.length >= 4 && input.length <= 6) {
      event.target.value = input.substring(0, 4) + '/' + input.substring(4, 6);
    } else if (input.length > 6) {
      event.target.value = input.substring(0, 4) + '/' + input.substring(4, 6) + '/' + input.substring(6, 8);
    }
    event.target.value = event.target.value.substring(0, 10);
  }

  dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (value && !/^\d{4}\/\d{2}\/\d{2}$/.test(value)) {
      return { 'invalidDate': true };
    }
    return null;
  }

  endDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const startDate = this.courseForm?.get('startDate')?.value;
    const endDate = control.value;
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      this.endDateInvalid = true;
      return { 'endBeforeStart': true };
    }
    this.endDateInvalid = false;
    return null;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.courseForm.valid && !this.startDateInvalid && !this.endDateInvalid) {
      const updatedCourseData = {
        CourseName: this.courseForm.getRawValue().courseName,
        University: this.courseForm.getRawValue().university,
        City: this.courseForm.getRawValue().city,
        Country: this.courseForm.getRawValue().country,
        StartDate: new Date(this.courseForm.value.startDate).toISOString(),
        EndDate: new Date(this.courseForm.value.endDate).toISOString(),
        CourseDescription: this.courseForm.value.courseDescription,
        Price: this.courseForm.value.price,
        Currency: this.courseForm.value.currency
      };

      this.http.put(`http://127.0.0.1:5000/courses/${this.data._id}`, updatedCourseData).subscribe(
        response => {
          console.log('Course updated successfully', response);
          this.dialogRef.close(updatedCourseData);
        },
        error => {
          console.error('Error updating course', error);
        }
      );
    }
  }
}
