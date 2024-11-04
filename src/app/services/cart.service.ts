import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: []})
  publicKey = "pk_test_51QGKQ7P4gTAfokfvvscs3qBuuGNFCJXMeI1CYtt1AybTtp9XCH1aqFb2JgJULkSR8ktSCngSZrCQSE0boWDMZh1k00zSMnvYqT"

  constructor(
    private readonly _snackBar: MatSnackBar,
    private readonly httpClient: HttpClient
  ) { }

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

  checkout = () => {
    this.httpClient.post('http://localhost:4242/checkout', {
      items: this.cart.value.items
    }).subscribe( async (res: any) => {
      let stripe = await loadStripe(this.publicKey);
      stripe?.redirectToCheckout({ sessionId: res.id });
    });
  }
}
