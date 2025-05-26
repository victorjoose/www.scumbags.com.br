import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
      private route: ActivatedRoute,
      private router: Router
    ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
    if (params['scrollTo']) {
      const section = document.getElementById(params['scrollTo']);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }

      this.router.navigate([], {
        queryParams: { scrollTo: null },
        queryParamsHandling: 'merge'
      });
    }
    });
  }
}
