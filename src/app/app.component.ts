import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderPrimaryComponent } from "./shared/components/header-primary/header-primary.component";
@Component({
  selector: 'app-root',
  imports: [RouterModule, RouterOutlet, HeaderPrimaryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
}
