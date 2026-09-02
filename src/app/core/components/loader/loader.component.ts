import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { LoaderService } from '../../../core/services/loader.service';

@Component({
  selector: 'app-loader',
  imports: [AsyncPipe, FontAwesomeModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {

  loaderService: LoaderService = inject(LoaderService);
  isLoading$: Observable<boolean> = this.loaderService.isLoading$;
  faSpinner: IconDefinition = faSpinner;

}
