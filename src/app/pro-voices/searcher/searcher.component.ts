import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent {
  @Output() searchedValue = new EventEmitter<string>();

  onSearch(value: string) {
    this.searchedValue.emit(value);
  }

}
