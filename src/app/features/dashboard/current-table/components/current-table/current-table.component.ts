import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderDataService } from '../../services';
import { NewOrderModalComponent } from '../../modals';
import { DeviceInfoInterface, OrderInterface } from '../../interfaces';
import { ListItemModel } from '@core/models/device-type.model';
import { SharedDataService } from '@core/services';
import * as moment from 'moment';
import { ShareModalsProviderService } from '@share/modals/share-modals-provider/share-modals-provider.service';

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
    'customerInfo',
    'deviceInfo',
    'defect',
    'assignedWorker',
    'servicePrice',
    'actionButtons'
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: MatTableDataSource<OrderInterface>;
  ordersData: OrderInterface[] = [];
  expandedElement: any;
  orderStatusItems: ListItemModel[] = [];
  workersList: ListItemModel[] = [];
  deviceTypes: ListItemModel[] = [];
  brandsList: ListItemModel[] = [];
  @ViewChild(MatTable) matTable: MatTable<OrderInterface>;
  @ViewChild(MatSort) matSort: MatSort;

  constructor(
    private dialogRef: MatDialog,
    private matSnackBar: MatSnackBar,
    private orderDataService: OrderDataService,
    private sharedDataService: SharedDataService,
    private shareModalProvider: ShareModalsProviderService
  ) {}

  ngOnInit(): void {
    this.orderStatusItems = this.sharedDataService.orderStatusItemList;
    this.workersList = this.sharedDataService.workersList;
    this.deviceTypes = this.sharedDataService.deviceTypeItemList;
    this.brandsList = this.sharedDataService.brandList;

    this.getAllOrders();
  }

  ngAfterViewInit(): void {
    this.data.sort = this.matSort;
  }

  getAllOrders(): void {
    this.orderDataService.orderDataChanges$.subscribe((orders) => {
      this.ordersData = orders;

      this.data = new MatTableDataSource<OrderInterface>(this.convertDtoDataToGridTemplate(orders));
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

  deleteRow(orderId: number): void {
    this.shareModalProvider
      .openConfirmModal({
        confirmTitle: 'Delete order',
        confirmDescription: 'You are about to delete order! Are you sure?'
      })
      .subscribe((isDelete) => {
        if (isDelete) {
          const newArr = this.orderDataService.ordersData.filter((item) => item.id !== orderId);
          this.orderDataService.orderDataAction$.next([...newArr]);
        }
      });
  }

  openDialogModal(): void {
    const dialogRef = this.dialogRef.open(NewOrderModalComponent, {
      width: '1200px',
      maxHeight: '700px',
      hasBackdrop: true,
      data: {
        orderStatusItems: this.orderStatusItems,
        workersList: this.workersList,
        deviceTypes: this.deviceTypes,
        brandsList: this.brandsList
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.showSnackBar();
        console.log(result);
        this.orderDataService.orderDataAction$.next([
          {
            id: 2,
            assignedWorker: result.assignedWorker,
            status: result.orderState,
            deliveryDate: result.endDate,
            receivedDate: result.startDate,
            customerInfo: {
              customerName: result.customerName,
              phoneNumber: result.customerPhoneNumber,
              isViberPresent: result.isCustomerHasViber
            },
            deviceInfo: {
              deviceType: result.deviceInfo.deviceType,
              deviceBrandId: result.deviceInfo.deviceBrand.listItemId,
              deviceModel: result.deviceInfo.deviceModel,
              deviceStateDescription: result.deviceInfo.deviceStateDescription,
              deviceDefectDescription: result.deviceInfo.deviceDefectDescription,
              isHasPassword: result.deviceInfo.isHasPassword,
              password: result.deviceInfo.password
            },
            isUrgent: result.isOrderUrgent,
            servicePrice: null
          },
          ...this.orderDataService.ordersData
        ]);
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

  private convertDtoDataToGridTemplate(dtoData: OrderInterface[]): any {
    return dtoData.map((order) => {
      return {
        ...order,
        receivedDate: this.dateFormatter(order.receivedDate),
        deliveryDate: this.dateFormatter(order.deliveryDate),
        status: this.findCurrentItemByProvidedId(order.status, this.orderStatusItems),
        assignedWorker: this.findCurrentItemByProvidedId(order.assignedWorker, this.workersList),
        deviceInfo: {
          ...order.deviceInfo,
          deviceName: this.convertDeviceName(
            this.findCurrentItemByProvidedId(order.deviceInfo.deviceBrandId, this.brandsList).listItemValue,
            order.deviceInfo.deviceModel
          )
        }
      };
    });
  }

  private dateFormatter(date: string): string {
    if (date) {
      return moment(date).format('DD/MM/YYYY');
    }
  }

  private convertDeviceName(deviceBrand: string, deviceModel): string {
    return `${deviceBrand} ${deviceModel}`;
  }

  private findCurrentItemByProvidedId(id: number, itemsList: ListItemModel[]): ListItemModel {
    if (id || id === 0) {
      return itemsList.find((worker) => worker.listItemId === id);
    } else {
      return null;
    }
  }
}
