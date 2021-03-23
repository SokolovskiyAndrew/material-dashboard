import { Injectable } from '@angular/core';
import { DeviceTypeModel } from '@core/models/device-type.model';
import { WorkerInterface } from '../../../features/dashboard/current-table/interfaces';

@Injectable()
export class SharedDataService {
  readonly deviceTypeItems: DeviceTypeModel[] = [
    {
      typeId: 0,
      typeDescription: 'Laptop',
      typeIcon: 'laptop'
    },
    {
      typeId: 1,
      typeDescription: 'Smartphone',
      typeIcon: 'phone_iphone'
    },
    {
      typeId: 2,
      typeDescription: 'Personal Computer',
      typeIcon: 'desktop_mac'
    },
    {
      typeId: 3,
      typeDescription: 'Monitor',
      typeIcon: 'desktop_windows'
    },
    {
      typeId: 4,
      typeDescription: 'Printer',
      typeIcon: 'local_printshop'
    },
    {
      typeId: 5,
      typeDescription: 'Other Device',
      typeIcon: 'devices_other'
    }
  ];

  readonly orderStatusItems: DeviceTypeModel[] = [
    {
      typeId: 0,
      typeDescription: 'New',
      typeIcon: 'fiber_new'
    },
    {
      typeId: 1,
      typeDescription: 'In Progress',
      typeIcon: 'play_circle_outline'
    },
    {
      typeId: 2,
      typeDescription: 'Blocked',
      typeIcon: 'pause_circle_outline'
    },
    {
      typeId: 3,
      typeDescription: 'Completed',
      typeIcon: 'check_circle_outline'
    }
  ];

  readonly workers: DeviceTypeModel[] = [
    {
      typeId: 0,
      typeDescription: 'Alex'
    },
    {
      typeId: 1,
      typeDescription: 'Chris'
    },
    {
      typeId: 2,
      typeDescription: 'Elly'
    }
  ];
  constructor() {}

  get deviceTypeItemList(): DeviceTypeModel[] {
    return this.deviceTypeItems;
  }

  get orderStatusItemList(): DeviceTypeModel[] {
    return this.orderStatusItems;
  }

  get workersList(): DeviceTypeModel[] {
    return this.workers;
  }
}
