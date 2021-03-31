import { CustomerInterface } from './customer.interface';
import { DeviceInfoInterface } from './device-info.interface';

export interface OrderInterface {
  id: number;
  status: number;
  receivedDate: string;
  deliveryDate?: string;
  customerInfo: CustomerInterface;
  assignedWorker?: number;
  deviceInfo: DeviceInfoInterface;
  servicePrice: number;
  isUrgent?: boolean;
}
