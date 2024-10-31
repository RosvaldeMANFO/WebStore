import { Component, Input } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private _cart: Cart = {items: []};
  itemsQuantity = 0;

  @Input()
  get cart(): Cart {
    return this._cart
  }

  set cart(cart: Cart){
    this._cart = cart
    this.itemsQuantity = cart.items
    .map(item => item.quantity)
    .reduce((prev, next) => prev + next, 0)
  }

  constructor(private readonly _cartService: CartService) {}

  getTotal = (): number => {
    return this._cartService.getTotal();
  }

  onClearCart = () => {
    this._cartService.clearCart();
  }
}
