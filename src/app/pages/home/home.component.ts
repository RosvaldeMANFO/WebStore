import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

const ROW_HEIGHT: { [key: number]: number } = { 1: 400, 3: 335, 4: 350, }

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  rowHeight = ROW_HEIGHT[this.cols];
  category: string | undefined;
  products: Array<Product> | undefined;
  sort = 'desc';
  count = '10';
  productSubscription: Subscription | undefined;

  constructor(
    private readonly cartService: CartService,
    private readonly storeService: StoreService
  ) { }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts = () => {
    this.productSubscription = this.storeService
    .getAllProducts(this.count, this.sort, this.category)
    .subscribe((products) => {
      this.products = products;
    });
  }

  onColumnsCountChanged = (colsNum: number) => {
    this.cols = colsNum;
    this.rowHeight = ROW_HEIGHT[this.cols];
  }

  onSortChanged = (newSort: string) => {
    this.sort = newSort;
    this.getProducts();
  }

  onCountChanged = (newCount: number) => {
    this.count = newCount.toString();
    this.getProducts();
  }

  onShowCategory = (newCategory: string | undefined) => {
    this.category = newCategory;
    this.getProducts();
  }

  onAddToCart = (product: Product) => {
    this.cartService.addToCart({
      id: product.id,
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
    });
  }
}
