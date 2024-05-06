import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomPipePipe } from '../../custom-pipe.pipe';

@Component({
  selector: 'app-usershow',
  standalone: true,
  templateUrl: './usershow.component.html',
  styleUrl: './usershow.component.scss',
  providers: [CustomPipePipe],
  imports: [
    MatInputModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
    CustomPipePipe,
  ],
})
export class UsershowComponent {
  @Input() person: any;
  @Output() sendDataToParent: EventEmitter<any> = new EventEmitter<any>();
  newName: any;

  updateName() {
    this.sendDataToParent.emit(this.newName);
  }
}
