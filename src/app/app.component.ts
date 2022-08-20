import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { environment } from 'src/environments/environment';

type ThemeMode = 'light' | 'dark';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isDark: boolean = false;
  version: string = environment.package?.version;

  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {
    const currentTheme = this.getTheme();
    this.isDark = currentTheme == 'dark';
    this.applyThemeToBody();
  }

  getTheme(): ThemeMode {
    return localStorage.getItem('theme') as ThemeMode ?? 'light';
  }

  setTheme(theme: ThemeMode) {
    localStorage.setItem('theme', theme);
  }
  
  applyThemeToBody() {
    const hostClass = this.isDark ? 'mat-typography dark-theme' : 'mat-typography light-theme';
    this.renderer.setAttribute(this.document.body, 'class', hostClass);
  }

  switchTheme() {
    this.isDark = !this.isDark;
    this.applyThemeToBody();
    this.setTheme(this.isDark ? 'dark' : 'light');
  }
}
