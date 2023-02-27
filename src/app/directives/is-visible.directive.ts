import { Directive, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[isVisible]'
})
export class ScrollIntoViewDirective implements OnInit {
  @Output() visible = new EventEmitter<void>();
private inView: boolean = false;
  constructor(private element: ElementRef) { }

  ngOnInit() {
    this.inView = this.isInView();
    this.checkIfScrolledIntoView();
    window.addEventListener('scroll', this.checkIfScrolledIntoView);
  }

 private isInView():boolean{
  const element = this.element.nativeElement;
    const rect = element.getBoundingClientRect();
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
      return true;
    }else{
      return false;
    }
 }

  checkIfScrolledIntoView = () => {
    const newValue = this.isInView()
    if(newValue && !this.inView) {
      this.visible.emit();
    }
    this.inView = newValue;
  }
}