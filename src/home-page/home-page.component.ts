import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../app/message.service';
import { LocalStorageService } from '../app/local-storage.service';
import { ICard } from '../app/interfaces/ICard';
import { IDestination } from '../app/interfaces/IDestination';
import { IBlog } from '../app/interfaces/IBlog';
import { IImpressionImage } from '../app/interfaces/IImpressionImage';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPlay,
  IconDefinition,
  faPeopleGroup,
  faShield,
  faTags,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { AppDatePipe } from '../app/pipes/date.pipe';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule, CommonModule, FontAwesomeModule, AppDatePipe, TranslatePipe],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {

  messageService: MessageService = inject(MessageService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private translateService: TranslateService = inject(TranslateService);

  selectedDirection!: string;
  selectedDate!: string;
  participantsCount: number | null = null;
  liveTextInput: string = '';
  faPlay: IconDefinition = faPlay;
  faPeopleGroup: IconDefinition = faPeopleGroup;
  faShield: IconDefinition = faShield;
  faTags: IconDefinition = faTags;
  faStar: IconDefinition = faStar;

  cards: ICard[] = [
    { title: 'home.offers.cards.guide.title', text: 'home.offers.cards.guide.text', icon: faPeopleGroup },
    { title: 'home.offers.cards.safety.title', text: 'home.offers.cards.safety.text', icon: faShield },
    { title: 'home.offers.cards.pricing.title', text: 'home.offers.cards.pricing.text', icon: faTags },
  ];

  destinations: IDestination[] = [
    {
      title: 'home.destinations.cards.lake.title',
      description: 'home.destinations.cards.lake.description',
      price: '480 $',
      starIcon: faStar,
      rating: 4.9,
      imageUrl: 'lake',
    },
    {
      title: 'home.destinations.cards.winterMountain.title',
      description: 'home.destinations.cards.winterMountain.description',
      price: '500 $',
      starIcon: faStar,
      rating: 4.5,
      imageUrl: 'winter-mountain',
    },
    {
      title: 'home.destinations.cards.mountainYoga.title',
      description: 'home.destinations.cards.mountainYoga.description',
      price: '230 $',
      starIcon: faStar,
      rating: 5.0,
      imageUrl: 'mountain-yoga',
    },
  ];

  blogs: IBlog[] = [
    {
      title: 'home.blog.posts.italy.title',
      description: 'home.blog.posts.italy.description',
      date: '01/04/2023',
      link: 'home.blog.readArticle',
      imageUrl: 'italy-mountain',
    },
    {
      title: 'home.blog.posts.plane.title',
      description: 'home.blog.posts.plane.description',
      date: '01/04/2023',
      link: 'home.blog.readArticle',
      imageUrl: 'plane-view',
    },
    {
      title: 'home.blog.posts.solo.title',
      description: 'home.blog.posts.solo.description',
      date: '01/04/2023',
      link: 'home.blog.readArticle',
      imageUrl: 'human-between-buildings',
    },
    {
      title: 'home.blog.posts.india.title',
      description: 'home.blog.posts.india.description',
      date: '01/04/2023',
      link: 'home.blog.readArticle',
      imageUrl: 'mosque',
    },
  ];

  impressionImages: IImpressionImage[] = [
    {
      id: 1,
      imageUrl: 'view-air-ballons',
    },
    {
      id: 2,
      imageUrl: 'country-map',
    },
    {
      id: 3,
      imageUrl: 'building-on-water',
    },
    {
      id: 4,
      imageUrl: 'ocean-beach',
    },
    {
      id: 5,
      imageUrl: 'canyon',
    },
    {
      id: 6,
      imageUrl: 'detective-stuff',
    },
  ];

  isFormValid(): boolean {
    return !!(
      this.selectedDate &&
      this.selectedDirection &&
      this.participantsCount &&
      this.participantsCount >= 4
    );
  }
  
  onTourDescriptionClick(): void {
    this.messageService.showWarn(this.translateService.instant('home.tourDescription.unavailable'));
  }
  
  onPriceClick(): void {
    this.messageService.showInfo(this.translateService.instant('home.offers.priceSent'));
  }

  onDestinationsRatingClick(): void {
    this.messageService.showSuccess(this.translateService.instant('home.destinations.ratingReceived'));
  }

  onOtherMaterialsClick(): void {
    this.messageService.showError(this.translateService.instant('home.blog.materialsUnavailable'));
  }

}
