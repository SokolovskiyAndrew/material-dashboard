import { Injectable } from '@angular/core';
import { OrderInterface } from '../../interfaces/order.interface';
import { CustomerInterface } from '../../interfaces/customer.interface';
import { WorkerInterface } from '../../interfaces/worker.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// id: number;
// status?: string;
// receivedDate: string;
// deliveryDate?: string;
// client: ClientInterface;
// assignWorker?: WorkerInterface;
// laptopModel: string;
// laptopDefect: string;
// servicePrice: number;
export class OrderDataService {
  ordersData: OrderInterface[] = [
    {
      id: 156,
      status: 0,
      receivedDate: 'Thu Jun 22 2018 00:00:00 GMT+0300',
      deliveryDate: '',
      customerInfo: {
        customerName: 'John Snow',
        phoneNumber: '0952456454',
        isViberPresent: true
      },
      assignedWorker: 1,
      deviceInfo: {
        deviceType: 0,
        deviceBrandId: 2,
        deviceModel: 'Aspire One',
        deviceDefectDescription: 'Noisy fan',
        deviceStateDescription: 'Scratches on the top surface',
        isHasPassword: false,
        password: null
      },
      servicePrice: 200,
      isUrgent: false
    },
    {
      id: 32,
      status: 1,
      receivedDate: 'Thu Aug 10 2017 00:00:00 GMT+0300',
      deliveryDate: '',
      customerInfo: {
        customerName: 'Hughes Grant',
        phoneNumber: '0235234246',
        isViberPresent: false
      },
      assignedWorker: 0,
      deviceInfo: {
        deviceType: 1,
        deviceBrandId: 4,
        deviceModel: 'Note 10',
        deviceDefectDescription: 'Broken touchscreen',
        deviceStateDescription: 'Without back layer',
        isHasPassword: false,
        password: null
      },
      servicePrice: 1400,
      isUrgent: true
    },
    {
      id: 31,
      status: 3,
      receivedDate: 'Thu Feb 18 2020 00:00:00 GMT+0300',
      deliveryDate: 'Thu Feb 27 2020 00:00:00 GMT+0300',
      customerInfo: {
        customerName: 'Kira Mira',
        phoneNumber: '0443234567',
        isViberPresent: true
      },
      assignedWorker: 0,
      deviceInfo: {
        deviceType: 0,
        deviceBrandId: 5,
        deviceModel: 'T400',
        deviceDefectDescription: 'Water damage',
        deviceStateDescription: 'A few keys missing on keyboard',
        isHasPassword: true,
        password: ['stopuntil']
      },
      servicePrice: 1800,
      isUrgent: true
    },
    {
      id: 3,
      status: 2,
      receivedDate: 'Thu Mar 11 2020 00:00:00 GMT+0300',
      deliveryDate: '',
      customerInfo: {
        customerName: 'Jared Leto',
        phoneNumber: '0504329271',
        isViberPresent: true
      },
      assignedWorker: 2,
      deviceInfo: {
        deviceType: 3,
        deviceBrandId: 1,
        deviceModel: 'P238',
        deviceDefectDescription:
          'Instead of trying to "fix it in post" why don\'t you truncate the description before the table needs to try and fit it into its columns? I did it like this:',
        deviceStateDescription: 'With power block',
        isHasPassword: false,
        password: null
      },
      servicePrice: 1150,
      isUrgent: false
    }
  ];

  orderDataAction$: BehaviorSubject<OrderInterface[]> = new BehaviorSubject<OrderInterface[]>(
    this.ordersData
  );
  orderDataChanges$: Observable<OrderInterface[]> = this.orderDataAction$.asObservable();

  constructor() {}

  emitNewChanges(changes: OrderInterface[]): void {
    this.orderDataAction$.next(changes);
  }
}
