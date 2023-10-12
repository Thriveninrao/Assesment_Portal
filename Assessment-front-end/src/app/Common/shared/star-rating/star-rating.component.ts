import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {

  @Output() ratingChanged: EventEmitter<any> = new EventEmitter<any>();

  stars: Star[] = [
    { value: 1, checked: false, display: 'Aweful' },
    { value: 2, checked: false, display: 'Poor' },
    { value: 3, checked: false, display: 'Average' },
    { value: 4, checked: false, display: 'Good' },
    { value: 5, checked: false, display: 'Excellent' },
  ]

  rate(s: Star) {

    this.stars.map(v => v.checked = false);
    let index = s.value;
    let i = 0;
    while (i < s.value) {
      this.stars[i].checked = true;
      i++;
    }
    this.ratingChanged.emit(index as number)
  }
}


export interface Star {
  value: number;
  checked: boolean;
  display: string;
}
