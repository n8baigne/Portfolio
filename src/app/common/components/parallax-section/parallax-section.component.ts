import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ParallaxSection } from './models/parallax-section.model';

@Component({
  selector: 'app-parallax-section',
  templateUrl: './parallax-section.component.html',
  styleUrls: ['./parallax-section.component.scss']
})
export class ParallaxSectionComponent implements OnInit {

  @Input() section!: ParallaxSection;
  
  constructor() { }

  ngOnInit(): void {
  }



}
