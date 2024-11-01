import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html'
})
export class FiltersComponent implements OnInit, OnDestroy {

  @Output() showCategory = new EventEmitter<string | undefined>();

  categoriesSubscription: Subscription | undefined;
  categories: Array<string> = []

  onShowCategory = (category: string | undefined) =>{
    this.showCategory.emit(category);
  }

  constructor(private readonly _storeService: StoreService) { }

  ngOnDestroy(): void {
    if(this.categoriesSubscription){
      this.categoriesSubscription.unsubscribe();
    } 
  }

  ngOnInit(): void {
    this.categoriesSubscription = this._storeService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
}
