import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appOrderStatusIconColor]'
})
export class OrderStatusIconColorDirective implements OnInit {
  @Input() statusIconId: number;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.setColorDependOnStatusIcon(this.statusIconId);
  }

  setColorDependOnStatusIcon(statusIconlistItemId: number): void {
    let iconColor = '';

    switch (statusIconlistItemId) {
      case 0:
        iconColor = 'grey';
        break;
      case 1:
        iconColor = '#1775bb';
        break;
      case 2:
        iconColor = '#f09f4e';
        break;
      case 3:
        iconColor = '#008A5F';
        break;
    }

    this.renderer.setStyle(this.elementRef.nativeElement, 'color', iconColor);
  }
}
