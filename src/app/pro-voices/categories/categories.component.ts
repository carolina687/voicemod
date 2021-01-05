import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @Input() categories: string[];
  @Output() selectedCat = new EventEmitter<string>();

  uniqueCategories = [];

  ngOnInit() {
    this.categories.map((element) => {
      if (!this.uniqueCategories.includes(element)) {
        this.uniqueCategories.push(element);
      }
    });
  }

  categoryChange(value: string) {
    this.selectedCat.emit(value);
  }
}
