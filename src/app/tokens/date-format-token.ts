import { InjectionToken } from '@angular/core';
import { IDateFormatProvider } from '../interfaces/IDateFormatProvider';

export const DATE_FORMAT_TOKEN: InjectionToken<IDateFormatProvider> = new InjectionToken<IDateFormatProvider>('DATE_FORMAT_TOKEN');