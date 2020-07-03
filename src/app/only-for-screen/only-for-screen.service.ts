import { Injectable } from '@angular/core';

import { OnlyForScreenConfig } from './only-for-screen';

@Injectable()
export class OnlyForScreenService {

  config: OnlyForScreenConfig;

  constructor(config: OnlyForScreenConfig) {
    this.config = config;
  }

}
