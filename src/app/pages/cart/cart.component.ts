import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {

  ngOnInit(): void {
    this.dataSource = this.cart.items;
  }

  cart: Cart = {items: [{
    product: 'https://via.placeholder.com/150',
    name: 'Product 1',
    price: 100,
    quantity: 1,
    id: 1
  }], total: 0};

  dataSource: Array<CartItem> = [];

  displayedColumns: string[] = [
    'product', 
    'name', 
    'price', 
    'quantity', 
    'total',
    'action'
  ];

  getTotal(items: Array<CartItem>): number {
    return items.reduce((prev, current) => prev + current.price * current.quantity, 0);
  }
}
