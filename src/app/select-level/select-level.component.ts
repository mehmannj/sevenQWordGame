import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-level',
  templateUrl: './select-level.component.html',
  styleUrls: ['./select-level.component.css']
})
export class SelectLevelComponent {

  levels = [
    { name: 'Beginner' },
    { name: 'Intermediate' },
    { name: 'Advanced' },
    { name: 'Expert' }
    

  ];

  constructor(private router: Router) {}

  selectLevel(level: { name: string }): void {
    this.router.navigate(['/game'], { queryParams: { levelName: level.name } });
  }
}
