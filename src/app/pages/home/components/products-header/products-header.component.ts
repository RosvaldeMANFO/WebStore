import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html'
})
export class ProductsHeaderComponent {

  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();
  @Output() countChange = new EventEmitter<number>();
  sort = "desc"
  itemsShowCount = 10;

  onSortUpdated = () => {
    this.sort = this.sort == "asc" ? "desc" : "asc";
    this.sortChange.emit(this.sort);
  }

  onItemsUpdated = (count: number) => {
    this.itemsShowCount = count;
    this.countChange.emit(count);
  }

  onColumnsCountUpdated = (count: number) => {
    this.columnsCountChange.emit(count);
  }
}
