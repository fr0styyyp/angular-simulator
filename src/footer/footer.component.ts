import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faPinterest, faSkype, faTelegram, faVk } from '@fortawesome/free-brands-svg-icons';
import { IAppConfig } from '../app/interfaces/IAppConfig';
import { APP_CONFIG_TOKEN } from '../app/tokens/app-config.token';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule, TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  
  appConfig: IAppConfig = inject(APP_CONFIG_TOKEN);

  faTelegram: IconDefinition = faTelegram;
  faVk: IconDefinition = faVk;
  faPinterest: IconDefinition = faPinterest;
  faSkype: IconDefinition = faSkype;

}
