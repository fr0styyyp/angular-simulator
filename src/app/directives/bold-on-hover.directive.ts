import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appBoldOnHover]',
})
export class BoldOnHoverDirective {

  @HostBinding('style.fontWeight') fontWeight: number = 600;

  @HostListener('mouseenter')
  onEnter(): void {
    this.fontWeight = 900;
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.fontWeight = 600;
  }

}
