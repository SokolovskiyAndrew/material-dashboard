import { Directive, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export class Unsubscriber implements OnDestroy {
  protected destroy$: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  unsubscribeAll(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
