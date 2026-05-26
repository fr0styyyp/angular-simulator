import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[boldOnHover]',
})
export class BoldOnHoverDirective {

  constructor() {}
  
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
