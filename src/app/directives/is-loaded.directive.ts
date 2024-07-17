import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  Input,
  ComponentRef,
} from '@angular/core';
import { ComponentLoaderComponent } from '../common-components/component-loader/component-loader.component';

@Directive({
  selector: '[ngxIsLoaded]',
})
export class IsLoadedDirective {
  loadingComponent: ComponentRef<ComponentLoaderComponent>;
  loadedView;
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    public vcRef: ViewContainerRef
  ) {}

  @Input() set ngxIsLoaded(condition: any) {
    if (!condition) {
      if (!this.loadingComponent) {
        this.loadingComponent = this.vcRef.createComponent(
          ComponentLoaderComponent
        );
      }
      if (this.loadedView) {
        this.loadedView.destroy();
        this.loadedView = undefined;
      }
    } else {
      if (this.loadingComponent) {
        this.loadingComponent.destroy();
        this.loadingComponent = undefined;
      }
      if (!this.loadedView) {
        this.loadedView = this.viewContainer.createEmbeddedView(
          this.templateRef
        );
      }
    }
  }
}
