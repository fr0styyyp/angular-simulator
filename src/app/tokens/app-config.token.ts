import { InjectionToken } from '@angular/core';
import { IAppConfig } from '../interfaces/IAppConfig';

export const APP_CONFIG_TOKEN: InjectionToken<IAppConfig> = new InjectionToken<IAppConfig>('APP_CONFIG_TOKEN');