import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-more-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './more-data.component.html',
})
export class MoreDataComponent {
  @Input() moredata: any; //propiedad de entrada que le pasamos al componente
  @Output() close = new EventEmitter<void>(); // EventEmitter para emitir el evento de cierre.


  closeComponent() {
    this.close.emit();
  }

}
