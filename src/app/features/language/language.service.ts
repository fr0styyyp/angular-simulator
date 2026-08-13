import { inject, Injectable } from '@angular/core';
import { InterpolatableTranslationObject, TranslateService } from '@ngx-translate/core';
import { PrimeNG } from 'primeng/config';
import { LocalStorageService } from '../../local-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Language } from './Language';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {

  private translateService: TranslateService = inject(TranslateService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private primeng: PrimeNG = inject(PrimeNG);

  private readonly languageStorageKey: string = 'appLanguage';
  private readonly defaultLanguage: Language = Language.EN;
  
  readonly availableLanguages: readonly Language[] = Object.values(Language);
  readonly languageLabels: Record<Language, string> = {
    [Language.EN]: 'English',
    [Language.RU]: 'Русский',
    [Language.KK]: 'Қазақша',
  };
  
  private languageSubject: BehaviorSubject<Language> = new BehaviorSubject<Language>(this.defaultLanguage);
  language$: Observable<Language> = this.languageSubject.asObservable();

  init(): void {
    const stored: Language | null = this.localStorageService.getItem<Language>(this.languageStorageKey);
    const resolvedLanguage: Language = this.resolveInitialLanguage(stored);
    this.languageSubject.next(resolvedLanguage);
    this.updatePrimeNgTranslation(resolvedLanguage);
  }

  private resolveInitialLanguage(stored: Language | null): Language {
    if (stored !== null && this.availableLanguages.includes(stored)) {
      return stored;
    }

    const browserLang: string = this.translateService.getBrowserLang() ?? '';
    if (this.availableLanguages.includes(browserLang as Language)) {
      return browserLang as Language;
    }

    return this.defaultLanguage;
  }

  setLanguage(lang: Language): void {
    this.localStorageService.setItem(this.languageStorageKey, lang);
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