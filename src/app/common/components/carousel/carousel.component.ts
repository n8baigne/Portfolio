import { Component, ContentChildren, ElementRef, OnInit, QueryList, ViewChild } from '@angular/core';
import { CarouselItemComponent } from './components/carousel-item/carousel-item.component';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @ContentChildren(CarouselItemComponent) carousels!: QueryList<CarouselItemComponent>;
  @ViewChild('content') content!: ElementRef;
  selectedCarouselItem: number;

  constructor() {
    this.selectedCarouselItem = 0;
  }

  ngOnInit(): void {
  }

  slideLeft(): void {
    this.selectedCarouselItem - 1 < 0 ? this.selectedCarouselItem = this.carousels.length - 1 : this.selectedCarouselItem -= 1;
    this.slide();
  }

  slideRight(): void {
    this.selectedCarouselItem + 1 >= this.carousels.length ? this.selectedCarouselItem = 0 : this.selectedCarouselItem += 1;
    this.slide();
  }

  slide(): void {
    this.content.nativeElement.style.transform = `translateX(${-100 * this.selectedCarouselItem}vw)`;
  }

}
