import { Component } from '@angular/core';
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
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { CONTACT_REGEX, EMAIL_REGEX } from '../../common_var';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UsershowComponent } from '../usershow/usershow.component';

@Component({
  selector: 'app-reactive-form',
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
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  roles: string[] = ['Employee', 'Trainee', 'Software Engineer'];

  show: boolean = false;
  person!: FormGroup;
  values: object = {};

  userService: any;

  constructor(private router: Router, private userServicevices: UserService) {}

  ngOnInit() {
    this.person = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX),
      ]),
      contact: new FormControl('', [
        Validators.required,
        Validators.pattern(CONTACT_REGEX),
      ]),
      gender: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
    });
  }

  submit = (name: any) => {
    this.values = this.person.value;

    this.userService.behuser.next(this.values);
    this.show = true;
  };

  updateName(data: any) {
    this.person.patchValue({ name: data });
  }
}
