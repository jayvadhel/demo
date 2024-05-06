import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private userService: UserService) {}

  usremail: string = '';
  ngOnInit(): void {
    this.userService.behuser.subscribe((res) => {
      this.usremail = res?.email;
      console.log(res?.email);
    });
  }

  person = {
    email: '',
    password: '',
  };

  getValues = () => {
    console.log(this.person);
  };
}
