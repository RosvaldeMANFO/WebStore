import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: []})

  constructor(private _snackBar: MatSnackBar) { }

  addToCart = (item: CartItem) =>{
    const items = [...this.cart.value.items];

    const itemInCart = items.find(i => i.id === item.id);

    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart.next({ items });
    this._snackBar.open('Product added to cart', 'Ok', {
      duration: 3000,
    });
  }

  getTotal = (): number => {
    return this.cart.value.items
    .map(item => item.price * item.quantity)
    .reduce((prev, next) => prev + next, 0)
  }

  reduceQuantity = (item: CartItem) => {
    const items = [...this.cart.value.items];
    const itemInCart = items.find(i => i.id === item.id);

    if (itemInCart) {
      itemInCart.quantity -= 1;
      if (itemInCart.quantity === 0) {
        this.removeFromCart(item);
      } else {
        this.cart.next({ items });
        this._snackBar.open('Product quantity reduced', 'Ok', {
          duration: 3000,
        });
      }
    }
  }

  removeFromCart = (item: CartItem) => {
    const items = this.cart.value.items.filter(i => i.id !== item.id);
    this.cart.next({ items });
    this._snackBar.open('Product removed from cart', 'Ok', {
      duration: 3000,
    });
  }

  clearCart = () => {
    this.cart.next({ items: [] });
    this._snackBar.open('Cart cleared', 'Ok', {
      duration: 3000,
    });
  }
}
