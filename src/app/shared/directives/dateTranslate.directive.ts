import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[translateDate]'
})
export class TranslateDateDirective implements OnInit {
  @Input('translateDate') date: string = '';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.date) {
      const date = new Date(this.date);
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      const formattedDate = date.toLocaleDateString('ru-RU', options);
      this.el.nativeElement.innerText = formattedDate;
    }
  }
}
