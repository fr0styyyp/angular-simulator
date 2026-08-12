import { inject, Injectable } from '@angular/core';
import { InterpolatableTranslationObject, TranslateService } from '@ngx-translate/core';
import { PrimeNG } from 'primeng/config';
import { LocalStorageService } from '../../local-storage.service';
import { LANGUAGE_STORAGE_TOKEN } from './language-storage-key.token';
import { BehaviorSubject, Observable } from 'rxjs';
import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE } from './language.constants';
import { Language } from './Language';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {

  private translateService: TranslateService = inject(TranslateService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private languageToken: string = inject(LANGUAGE_STORAGE_TOKEN);
  private primeng: PrimeNG = inject(PrimeNG);

  private languageSubject: BehaviorSubject<Language> = new BehaviorSubject<Language>(DEFAULT_LANGUAGE);
  language$: Observable<Language> = this.languageSubject.asObservable();

  init(): void {
    const stored: Language | null = this.localStorageService.getItem<Language>(this.languageToken);
    const resolvedLanguage: Language = this.resolveInitialLanguage(stored);
    this.languageSubject.next(resolvedLanguage);
    this.updatePrimeNgTranslation(resolvedLanguage);
  }

  private resolveInitialLanguage(stored: Language | null): Language {
    if (stored !== null && AVAILABLE_LANGUAGES.includes(stored)) {
      return stored;
    }

    const browserLang: string = this.translateService.getBrowserLang() ?? '';
    if (AVAILABLE_LANGUAGES.includes(browserLang as Language)) {
      return browserLang as Language;
    }

    return DEFAULT_LANGUAGE;
  }

  setLanguage(lang: Language): void {
    this.localStorageService.setItem(this.languageToken, lang);
    this.languageSubject.next(lang);
    this.updatePrimeNgTranslation(lang);
  }

  getCurrentLanguage(): Language {
    return this.languageSubject.getValue();
  }

  private updatePrimeNgTranslation(lang: Language): void {
    this.translateService.use(lang).subscribe((translations: InterpolatableTranslationObject) => {
      const primengTranslations: Record<string, unknown> | undefined = translations?.['primeng'] as
        | Record<string, unknown>
        | undefined;

      if (primengTranslations) {
        this.primeng.setTranslation(primengTranslations);
      }
    });
  }

}