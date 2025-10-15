import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface Breadcrumb {
  label: string;
  url?: string;
  icon?: string;
}

export interface TitleAction {
  label: string;
  icon?: string;
  class?: string;
  action: () => void;
}

@Component({
  selector: 'app-titlepage',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './titlepage.component.html',
  styleUrls: ['./titlepage.component.css']
})
export class TitlepageComponent {
  @Input() title: string = '';
  @Input() subtitle?: string;
  @Input() icon?: string;
  @Input() breadcrumbs: Breadcrumb[] = [];
  @Input() actions: TitleAction[] = [];
}