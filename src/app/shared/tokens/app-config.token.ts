import { InjectionToken } from '@angular/core';
import { IAppConfig } from '../../core/interfaces/IAppConfig';


export const APP_CONFIG_TOKEN: InjectionToken<IAppConfig> = new InjectionToken<IAppConfig>('APP_CONFIG_TOKEN');