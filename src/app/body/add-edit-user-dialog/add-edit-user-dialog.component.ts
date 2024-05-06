import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { CONTACT_REGEX, PASSWORD_REGEX } from '../../common_var';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UsershowComponent } from '../usershow/usershow.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MatMomentDateModule,
  provideMomentDateAdapter,
} from '@angular/material-moment-adapter';

const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-add-edit-user-dialog',
  standalone: true,
  imports: [
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    UsershowComponent,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatDividerModule,
    MatCheckboxModule,
    MatMomentDateModule,
  ],
  providers: [
    provideMomentDateAdapter(),
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  templateUrl: './add-edit-user-dialog.component.html',
  styleUrl: './add-edit-user-dialog.component.scss',
})
export class AddEditUserDialogComponent {
  show: boolean = false;
  person!: any;

  update: boolean = false;

  companies: any = [];
  roles: any = [];
  designations: any = [];

  myFilter = (d: Date | null): boolean => {
    const today = new Date();
    const endDate = new Date();
    const startDate = new Date();

    startDate.setFullYear(today.getFullYear() - 120);
    // endDate.setFullYear(today.getFullYear() - 10);

    const selectedDate = d || today;

    return selectedDate > startDate && selectedDate < endDate;
  };

  constructor(
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<AddEditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data?.person) {
      this.person = this.data.person;
      this.update = true;
    }

    this.userService.getCompany().subscribe((res) => {
      this.companies = res.data;
    });
    this.userService.getRole().subscribe((res) => {
      this.roles = res.data;
    });
    this.userService.getDesignation().subscribe((res) => {
      this.designations = res.data;
    });

    this.person = new FormGroup({
      first_name: new FormControl(this.person?.first_name, [
        Validators.required,
      ]),
      last_name: new FormControl(this.person?.last_name, [Validators.required]),
      email: new FormControl(this.person?.email, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(this.person?.password, [
        Validators.required,
        Validators.pattern(PASSWORD_REGEX),
      ]),
      contact_number: new FormControl(this.person?.contact_number, [
        Validators.required,
        Validators.pattern(CONTACT_REGEX),
      ]),
      birth_date: new FormControl(this.person?.birth_date, [
        Validators.required,
      ]),
      FK_designation_name: new FormControl(this.person?.FK_designation_name, [
        Validators.required,
      ]),
      FK_company_name: new FormControl(this.person?.FK_company_name, [
        Validators.required,
      ]),
      FK_role_name: new FormControl(this.person?.FK_role_name, [
        Validators.required,
      ]),
      user_id: new FormControl(this.person?.user_id),
      is_active: new FormControl(this.person?.is_active || false),
    });
  }

  closeDialog(res: boolean) {
    this.dialogRef.close(res);
  }

  save() {
    this.userService.addUserOrupdateUser(this.person.value).subscribe(
      (res) => {
        if (res.status === 'success') {
          this.toastr.success(res.message);
          this.closeDialog(true);
        } else if (res.status === 'error') {
          this.toastr.error(res.message);
        }
      },
      (error) => {
        this.toastr.error(error.error.message);
      }
    );
  }
}
