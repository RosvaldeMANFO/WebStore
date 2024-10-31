import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product.modet';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false;
  product: Product | undefined = {
    id: 1,
    title: 'Sneakers',
    description: '',
    image: 'https://via.placeholder.com/150',
    price: 100,
    category: 'shoes'
  };
  @Output() addToCart = new EventEmitter<Product>();

  onAddToCart = () => {
    if (this.product) {
      this.addToCart.emit(this.product);
    }
  }
}
