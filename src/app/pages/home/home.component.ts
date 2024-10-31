import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.modet';
import { CartService } from 'src/app/services/cart.service';

const ROW_HEIGHT: { [key: number]: number } = { 1: 400, 3: 335, 4: 350,}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  cols = 3;
  rowHeight = ROW_HEIGHT[this.cols];
  category: string | undefined;

  constructor(private readonly cartService: CartService) {}

  onColumnsCountChanged = (colsNum: number) => {
    this.cols = colsNum;
    this.rowHeight = ROW_HEIGHT[this.cols];
  }

  onShowCategory = (newCategory: string) => {
    this.category = newCategory;
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
