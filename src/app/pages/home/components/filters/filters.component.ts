import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html'
})
export class FiltersComponent {
  @Output() showCategory = new EventEmitter<string>();

  categories = ["Shoes", "Sport"]

  onShowCategory = (category: string) =>{
    this.showCategory.emit(category);
  }
}
