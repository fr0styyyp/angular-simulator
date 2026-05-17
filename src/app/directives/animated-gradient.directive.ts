import { Directive, HostBinding, HostListener, Input, OnDestroy } from '@angular/core';
import { IGradientConfiguration } from '../interfaces/IGradientConfiguration';

@Directive({
  selector: '[animatedGradient]',
})
export class AnimatedGradientDirective implements OnDestroy {
  
  @Input() gradientConfiguration: IGradientConfiguration = {
    delay: 1000,
    colors: ['#ff007f', '#7f00ff', '#00f0ff', '#ff007f'],
    thickness: '2px'
  };
  
  isActive: boolean = false;
  private timerId!: number;
  
  constructor() {
    if (!document.getElementById('animated-gradient-styles')) {
      const style: HTMLStyleElement = document.createElement('style');
      style.id = 'animated-gradient-styles';
      style.textContent = `
      @keyframes moveGradient {
        0% { background-position: 0% 0%, 0% 50%; }
        50% { background-position: 0% 0%, 100% 50%; }
        100% { background-position: 0% 0%, 0% 50%; }
      }
      `;
      document.head.appendChild(style);
    }
  }
  
  @HostBinding('style.borderStyle') borderStyle: string = 'solid';
  @HostBinding('style.borderColor') borderColor: string = 'transparent';
  @HostBinding('style.backgroundOrigin') bgOrigin: string = 'border-box';
  @HostBinding('style.backgroundClip') bgClip: string = 'padding-box, border-box';
  
  @HostBinding('style.borderWidth')
  get borderWidth(): string | undefined {
    return this.isActive ? this.gradientConfiguration.thickness : '0px';
  }
  
  @HostBinding('style.backgroundImage')
  get bgImg(): string {
    if (!this.isActive) {
      return 'none';
    } else {
      return `linear-gradient(var(--surface-card), var(--surface-card)), linear-gradient(135deg, ${ this.gradientConfiguration.colors!.join(', ') })`;
    }
  }
  
  @HostBinding('style.animation')
  get animation(): string {
    return this.isActive ? 'moveGradient 1s linear infinite' : 'none';
  }
  
  @HostBinding('style.backgroundSize')
  get bgSize(): string {
    return this.isActive ? '100% 100%, 300% 300%' : 'auto';
  }
  
  @HostListener('mouseenter')
  onMouseEnter(): void {
    const delay: number | undefined = this.gradientConfiguration?.delay;
    
    this.timerId = setTimeout((): void => {
      this.isActive = true;
    }, delay);
  }
  
  @HostListener('mouseleave')
  onMouseLeave(): void {
    clearTimeout(this.timerId);
    this.isActive = false;
  }
  
  ngOnDestroy(): void {
    clearTimeout(this.timerId);
  }
  
}