import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnlyForScreenDirective } from './only-for-screen.directive';
import { OnlyForScreenService } from './only-for-screen.service';
import { OnlyForScreenConfig } from './only-for-screen';

@NgModule({
  declarations: [
    OnlyForScreenDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OnlyForScreenDirective
  ],
  providers: [
    OnlyForScreenService
  ]
})
export class OnlyForScreenModule {
  static forRoot(options?: OnlyForScreenConfig): ModuleWithProviders<OnlyForScreenModule> {
    return {
      ngModule: OnlyForScreenModule,
      providers: [
        {
          provide: OnlyForScreenService,
          useFactory: () => {
            const configOptions: OnlyForScreenConfig = {mobile: 768, tablet: 1366, debounce: 40};
            if (options) {
              configOptions.mobile = options.mobile;
              configOptions.tablet = options.tablet;
              configOptions.debounce = options.debounce;
            }
            return ( configOptions );
          }
        }
      ]
    };
  }
}
