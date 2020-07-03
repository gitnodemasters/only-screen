import { Directive, Input, OnDestroy, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { OnlyForScreenConfig, ScreenType } from './only-for-screen';
import { OnlyForScreenService } from './only-for-screen.service';

@Directive({
  selector: '[onlyForScreen]'
})
export class OnlyForScreenDirective implements OnDestroy {

  @Input() set onlyForScreen(screen: ScreenType) {
    this.allowedScreen = screen;
    this.checkScreen(window.innerWidth);
  }

  private config: OnlyForScreenConfig;
  private allowedScreen: ScreenType;
  private eventListener: Subject<number> = new Subject<number>();
  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private onlyForScreenService: OnlyForScreenService,
    private render: Renderer2
  ) {
    this.config = this.onlyForScreenService as any;
    this.render.listen('window', 'resize', (event) => {
      this.eventListener.next(event.target.innerWidth);
    });
    this.eventListener.asObservable().pipe(
      debounceTime(this.config.debounce),
      takeUntil(this.unsubscribeAll)
    ).subscribe(size => {
      this.checkScreen(size);
    });
  }

  private checkScreen(screen: number) {
    this.viewContainer.clear();
    if (this.allowedScreen === ScreenType.Mobile) {
      if (screen < this.config.mobile) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    } else if (this.allowedScreen === ScreenType.Tablet) {
      if (screen >= this.config.mobile && screen < this.config.tablet) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    } else if (this.allowedScreen === ScreenType.Desktop) {
      if (screen >= this.config.tablet) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
