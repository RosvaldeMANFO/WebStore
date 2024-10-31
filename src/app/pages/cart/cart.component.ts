import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {

  ngOnInit(): void {
    this._cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  cart: Cart = {
    items: [{
      product: 'https://via.placeholder.com/150',
      name: 'Product 1',
      price: 100,
      quantity: 1,
      id: 1
    }]
  };

  dataSource: Array<CartItem> = [];

  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ];

  constructor(private readonly _cartService: CartService) { }

  getTotal = (): number => {
    return this._cartService.getTotal();
  }

  onAddQuantity = (item: CartItem) => {
    this._cartService.addToCart(item);
  }

  onReduceQuantity = (item: CartItem) => {
    this._cartService.reduceQuantity(item);
  }
  
  onRemoveFromCart = (item: CartItem) => {
    this._cartService.removeFromCart(item);
  }

  onClearCart = () => {
    this._cartService.clearCart();
  }
}
