import { Component, SimpleChanges, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';

import { MatDialog } from '@angular/material/dialog';
import { AddEditUserDialogComponent } from '../add-edit-user-dialog/add-edit-user-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    NgxSpinnerModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  users: any = [];
  dataSource = new MatTableDataSource<any>();

  clickedRows = new Set<any>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  getData() {
    this.spinner.show();
    try {
      this.userService.getUser().subscribe((res) => {
        this.users = res.data;
        this.dataSource = new MatTableDataSource(this.users);
        console.log(this.dataSource, 'aa');

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  ngOnInit() {
    this.getData();
  }

  displayedColumns: string[] = [
    'first_name',
    'email',
    'contact_number',
    'birth_date',
    'FK_company_name',
    'FK_role_name',
    'active',
    'actions',
  ];

  handleRowClick(row: any) {
    this.handleUserEdit(row);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddEditUserDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getData();
      }
    });
  }

  handleUserDelete(userId: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this user?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.deleteUser(userId).subscribe(
          (res) => {
            if (res.status === 'success') {
              this.toastr.success(res.message);
            } else if (res.status === 'error') {
              this.toastr.error(res.message);
            }
            this.getData();
          },
          (error) => {
            this.toastr.error(error.error.message);
          }
        );
      }
    });
  }

  handleUserEdit(person: any) {
    const dialogRef = this.dialog.open(AddEditUserDialogComponent, {
      data: { person: person },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getData();
    });
  }

  handleChangeActiveStatus(user: any) {
    let title: string;
    let message: string;

    if (!user?.is_active) {
      title = 'Confirm Activate';
      message = 'Are you sure you want to activate this user?';
    } else {
      title = 'Confirm Deactivate';
      message = 'Are you sure you want to deactivate this user?';
    }
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: title,
        message: message,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.toggleactivation(user.user_id).subscribe(
          (res) => {
            if (res.status === 'success') {
              this.toastr.success(res.message);
            } else if (res.status === 'error') {
              this.toastr.error(res.message);
            }
            this.getData();
          },
          (error) => {
            this.toastr.error(error.error.message);
          }
        );
      }
    });
  }
}
