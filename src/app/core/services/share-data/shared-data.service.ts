import { Injectable } from '@angular/core';
import { ListItemModel } from '@core/models/device-type.model';
import { WorkerInterface } from '../../../features/dashboard/current-table/interfaces';

@Injectable()
export class SharedDataService {
  readonly deviceTypeItems: ListItemModel[] = [
    {
      listItemId: 0,
      listItemValue: 'Laptop',
      listItemIcon: 'laptop'
    },
    {
      listItemId: 1,
      listItemValue: 'Smartphone',
      listItemIcon: 'phone_iphone'
    },
    {
      listItemId: 2,
      listItemValue: 'Personal Computer',
      listItemIcon: 'desktop_mac'
    },
    {
      listItemId: 3,
      listItemValue: 'Monitor',
      listItemIcon: 'desktop_windows'
    },
    {
      listItemId: 4,
      listItemValue: 'Printer',
      listItemIcon: 'local_printshop'
    },
    {
      listItemId: 5,
      listItemValue: 'Other Device',
      listItemIcon: 'devices_other'
    }
  ];

  readonly orderStatusItems: ListItemModel[] = [
    {
      listItemId: 0,
      listItemValue: 'New',
      listItemIcon: 'fiber_new'
    },
    {
      listItemId: 1,
      listItemValue: 'In Progress',
      listItemIcon: 'play_circle_outline'
    },
    {
      listItemId: 2,
      listItemValue: 'Blocked',
      listItemIcon: 'pause_circle_outline'
    },
    {
      listItemId: 3,
      listItemValue: 'Completed',
      listItemIcon: 'check_circle_outline'
    }
  ];

  readonly workers: ListItemModel[] = [
    {
      listItemId: 0,
      listItemValue: 'Alex'
    },
    {
      listItemId: 1,
      listItemValue: 'Chris'
    },
    {
      listItemId: 2,
      listItemValue: 'Elly'
    }
  ];

  readonly brands: ListItemModel[] = [
    {
      listItemId: 0,
      listItemValue: 'Hewlett Packard(HP)'
    },
    {
      listItemId: 1,
      listItemValue: 'Acer'
    },
    {
      listItemId: 2,
      listItemValue: 'Asus'
    },
    {
      listItemId: 3,
      listItemValue: 'Samsung'
    },
    {
      listItemId: 4,
      listItemValue: 'Dell'
    },
    {
      listItemId: 5,
      listItemValue: 'Huawei'
    },
    {
      listItemId: 6,
      listItemValue: 'Xiaomi'
    },
    {
      listItemId: 7,
      listItemValue: 'Apple'
    }
  ];

  constructor() {}

  get deviceTypeItemList(): ListItemModel[] {
    return this.deviceTypeItems;
  }

  get orderStatusItemList(): ListItemModel[] {
    return this.orderStatusItems;
  }

  get workersList(): ListItemModel[] {
    return this.workers;
  }

  get brandList(): ListItemModel[] {
    return this.brands;
  }
}
