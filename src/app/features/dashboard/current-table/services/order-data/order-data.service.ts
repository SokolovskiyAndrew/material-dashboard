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
      laptopModel: 'HP 2000',
      laptopDefect: 'Port defect',
      servicePrice: 200
    },
    {
      id: 24,
      status: 'loop',
      receivedDate: '03/01/2020',
      deliveryDate: '',
      customer: {
        customerName: 'Michael Scott',
        phoneNumber: '0632456454',
        isViberPresent: false
      },
      assignedWorker: {
        workerName: 'Maks',
        workerPhoto: ''
      },
      laptopModel: 'Asus 1001',
      laptopDefect: 'Display Replacement',
      servicePrice: 800
    },
    {
      id: 453,
      status: 'check_circle_outline',
      receivedDate: '28/01/2020',
      deliveryDate: '30/01/2020',
      customer: {
        customerName: 'Dwight Schrute',
        phoneNumber: '0672456454',
        isViberPresent: true
      },
      assignedWorker: {
        workerName: 'Serhiy',
        workerPhoto: ''
      },
      laptopModel: 'Samsung NP300',
      laptopDefect: 'External video card doesnt work properly',
      servicePrice: 1500
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
