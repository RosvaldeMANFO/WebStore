import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  cols = 3;
  category: string | undefined;

  onColumnsCountChanged = (colsNum: number) => {
    this.cols = colsNum;
  }

  onShowCategory = (newCategory: string) => {
    this.category = newCategory;
  }
}
