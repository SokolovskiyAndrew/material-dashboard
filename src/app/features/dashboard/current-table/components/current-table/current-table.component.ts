import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderDataService } from '../../services';
import { NewOrderModalComponent } from '../../modals';
import { OrderInterface } from '../../interfaces';

@Component({
  selector: 'app-current-table',
  templateUrl: './current-table.component.html',
  styleUrls: ['./current-table.component.scss']
})
export class CurrentTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'no',
    'status',
    'receivedDate',
    'deliveryDate',
    'phoneNumber',
    'workerName',
    'laptopModel',
    'laptopDefect',
    'servicePrice',
    'actionButtons'
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: MatTableDataSource<OrderInterface>;
  ordersData: OrderInterface[] = [];
  expandedElement: any;
  @ViewChild(MatTable) matTable: MatTable<OrderInterface>;
  @ViewChild(MatSort) matSort: MatSort;

  constructor(
    private dialogRef: MatDialog,
    private matSnackBar: MatSnackBar,
    private orderDataService: OrderDataService
  ) {}

  ngOnInit(): void {
    // console.log(this.data);
    this.getAllOrders();
  }

  ngAfterViewInit(): void {
    this.data.sort = this.matSort;
  }

  getAllOrders(): void {
    this.orderDataService.orderDataChanges$.subscribe((orders) => {
      this.ordersData = orders;
      this.data = new MatTableDataSource<OrderInterface>(orders);
    });
  }

  addColumn(): void {
    const randomColumn = Math.floor(Math.random() * this.displayedColumns.length);
    this.columnsToDisplay.push(this.displayedColumns[randomColumn]);
  }

  removeColumn(): void {
    if (this.columnsToDisplay.length) {
      this.columnsToDisplay.pop();
    }
  }

  shuffle(): void {
    let currentIndex = this.columnsToDisplay.length;
    while (0 !== currentIndex) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // Swap
      const temp = this.columnsToDisplay[currentIndex];
      this.columnsToDisplay[currentIndex] = this.columnsToDisplay[randomIndex];
      this.columnsToDisplay[randomIndex] = temp;
    }
  }

  applyFilter(event: Event): void {
    console.log(event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
  }

  editRowState(rowId): void {
    console.log(rowId);
  }

  deleteRow(): void {
    const newOrder: OrderInterface = {
      id: 156,
      status: 'pause_circle_outline',
      receivedDate: '01/02/2020',
      deliveryDate: '',
      customer: {
        customerName: 'John Snow',
        phoneNumber: '0952456454',
        isViberPresent: true
      },
      assignedWorker: {
        workerName: 'Ivan',
        workerPhoto: ''
      },
      laptopModel: 'Acer Aspire G1-531',
      laptopDefect: 'Broken Display',
      servicePrice: 1450
    };

    this.orderDataService.orderDataAction$.next([newOrder, ...this.orderDataService.ordersData]);
    // this.matTable.renderRows();
  }

  openDialogModal(): void {
    const dialogRef = this.dialogRef.open(NewOrderModalComponent, {
      width: '1200px',
      maxHeight: '700px',
      hasBackdrop: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.showSnackBar();
      }
    });
  }

  showSnackBar(): void {
    this.matSnackBar.open('You have new order', 'X', {
      panelClass: ['successful-snackbar'],
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}
