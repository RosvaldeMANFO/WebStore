import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html'
})
export class ProductsHeaderComponent {

  @Output() columnsCountChange = new EventEmitter<number>();
  sort = "desc";
  itemsShowCount = 12;

  onSortUpdated = () => {
    this.sort = this.sort == "asc" ? "desc" : "asc";
  }

  onItemsUpdated = (count: number) => {
    this.itemsShowCount = count;
  }

  onColumnsCountUpdated = (count: number) => {
    this.columnsCountChange.emit(count);
  }
}
