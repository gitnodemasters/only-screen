import { Component } from '@angular/core';
import { ScreenType } from './only-for-screen/only-for-screen';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  ScreenType = ScreenType;

}
