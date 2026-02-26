import { Component, inject } from '@angular/core';
import { MessageService } from '../app/message.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ICard } from '../app/interfaces/ICard';
import { IDestination } from '../app/interfaces/IDestination';
import { IBlog } from '../app/interfaces/IBlog';
import { IImpressionImage } from '../app/interfaces/IImpression-image';

@Component({
  selector: 'app-users-page',
  imports: [FormsModule, CommonModule],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {
  
  messageService: MessageService = inject(MessageService);
  
  cards: ICard[] = [
    {
      title: 'Опытный гид',
      text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: 'experienced-guide-icon',
    },
    {
      title: 'Безопасный поход',
      text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: 'armour-icon',
    },
    {
      title: 'Лояльные цены',
      text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: 'price-icon',
    },
  ];
  
  destinations: IDestination[] = [
    {
      title: 'Озеро возле гор',
      description: 'романтическое приключение',
      price: '480 $',
      starIcon: 'star-icon',
      rating: 4.9,
      imageUrl: 'lake',
    },
    {
      title: 'Ночь в горах',
      description: 'в компании друзей',
      price: '500 $',
      starIcon: 'star-icon',
      rating: 4.5,
      imageUrl: 'winter-mountain',
    },
    {
      title: 'Йога в горах',
      description: 'для тех, кто забоится о себе',
      price: '230 $',
      starIcon: 'star-icon',
      rating: 5.0,
      imageUrl: 'mountain-yoga',
    },
  ];
  
  blogs: IBlog[] = [
    {
      title: 'Красивая Италия, какая она в реальности?',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      date: '01/04/2023',
      link: 'читать статью',
      imageUrl: 'italy-mountain',
    },
    {
      title: 'Долой сомнения! Весь мир открыт для вас!',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...',
      date: '01/04/2023',
      link: 'читать статью',
      imageUrl: 'plane-view',
    },
    {
      title: 'Как подготовиться к путешествию в одиночку? ',
      description: 'Для современного мира базовый вектор развития предполагает.',
      date: '01/04/2023',
      link: 'читать статью',
      imageUrl: 'human-between-buildings',
    },
    {
      title: 'Индия ... летим?',
      description: 'Для современного мира базовый.',
      date: '01/04/2023',
      link: 'читать статью',
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
  
}
