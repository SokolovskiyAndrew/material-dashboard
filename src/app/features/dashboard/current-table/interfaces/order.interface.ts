import { CustomerInterface } from './customer.interface';
import { WorkerInterface } from './worker.interface';

export interface OrderInterface {
  id: number;
  status?: string;
  receivedDate: string;
  deliveryDate?: string;
  customer: CustomerInterface;
  assignedWorker?: WorkerInterface;
  laptopModel: string;
  laptopDefect: string;
  servicePrice: number;
}
