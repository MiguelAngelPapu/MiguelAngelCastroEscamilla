import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderPrimaryComponent } from "./interfaces/components/header-primary/header-primary.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderPrimaryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MiguelAngelCastroEscamilla';
}
