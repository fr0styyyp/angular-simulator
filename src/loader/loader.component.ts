import { Component, inject } from '@angular/core';
import { LoaderService } from '../app/loader.service';
import { AsyncPipe } from '@angular/common';
import { tap } from 'rxjs';

@Component({
  selector: 'app-loader',
  imports: [AsyncPipe],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  
  loaderService: LoaderService = inject(LoaderService);
  isLoading$ = this.loaderService.isLoading$.pipe(
    tap(loading => {
      if (loading) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    })
  );
  
}
