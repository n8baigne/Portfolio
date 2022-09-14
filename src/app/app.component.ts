import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";
import { Subscription } from 'rxjs';
import { ParallaxSection } from './common/components/parallax-section/models/parallax-section.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title: string = 'Portfolio';
  isSideMenuOpen: boolean = false;
  routingParametersSubscription!: Subscription;
  translationSubscription!: Subscription;
  language: string = 'fr';
  sections: Array<ParallaxSection>;
  cvLink!: string;

  @ViewChild('about') aboutElem!: ElementRef;
  @ViewChild('container') container!: ElementRef;
  @ViewChild('profilePicture') profilePictureElem!: ElementRef;

  constructor(private translate: TranslateService, private renderer: Renderer2, private route: ActivatedRoute, private router: Router) {
    this.sections = [];
    this.translationSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.createSections();
      this.cvLink = '../assets/cv/' + (this.language === 'en' ? 'resume' : 'cv') + '_baigne_nathan.pdf';
    });
  } 

  ngOnInit() {
    this.routingParametersSubscription = this.route.queryParams.subscribe(params => {
      let lang = params['lang'];
      if (!lang) {
        this.router.navigate(['/home'], { queryParams: { lang: 'fr' } });
      }
      this.language = lang;
      this.translate.use(this.language);
    });
  }

  ngAfterViewInit() {
    this.renderer.listen(this.container.nativeElement, 'scroll', (event) => {
      this.aboutElem.nativeElement.style.transform = `translateX(-${event.target.scrollTop}px)`;
      this.profilePictureElem.nativeElement.style.transform = `translateX(${event.target.scrollTop}px)`;
    }
    )
  }

  ngOnDestroy() {
    this.translationSubscription.unsubscribe();
    this.routingParametersSubscription.unsubscribe();
  }

  useLanguage(language: string): void {
    this.router.navigate(['/home'], { queryParams: { lang: language } });
  }

  createSections(): void {
    this.sections = [{
      name: 'studies',
      backgroundImage: '../assets/images/studies.jpg',
      title: this.translate.instant('studies.title'),
    }, {
      name: 'experiences',
      backgroundImage: '../assets/images/experience.jpg',
      title: this.translate.instant('experience.title'),
    }, {
      name: 'projects',
      backgroundImage: '../assets/images/project.png',
      title: this.translate.instant('projects.title'),
    }
    ];
  }

  downloadCV(): void {

  }

}
