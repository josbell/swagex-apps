import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonalDetails } from '@swagex/shared-models';

export interface StudentFormPayload extends PersonalDetails {
  hasSubscription: boolean;
}
@Component({
  selector: 'swagex-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<StudentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudentFormPayload
  ) {
    const {
      firstName = '',
      lastName = '',
      email = '',
      hasSubscription = false
    } = data || {};

    this.studentForm = this.fb.group({
      firstName: [firstName, Validators.required],
      lastName: [lastName, Validators.required],
      hasSubscription: [!!hasSubscription],
      email: [email, [Validators.required, Validators.email]]
    });
  }

  get hasSubscription(): FormControl {
    return this.studentForm.get('hasSubscription') as FormControl;
  }

  get email(): FormControl {
    return this.studentForm.get('email') as FormControl;
  }

  get firstName(): FormControl {
    return this.studentForm.get('firstName') as FormControl;
  }

  get lastName(): FormControl {
    return this.studentForm.get('lastName') as FormControl;
  }

  ngOnInit(): void {}

  getEmailErrorMessage() {
    if (this.studentForm.get('email').hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit() {
    this.dialogRef.close(this.studentForm.value);
  }
}
