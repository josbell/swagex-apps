import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DanceClassStoreApi } from '@swagex/shared-models';

@Component({
  selector: 'swagex-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public classStoreService: DanceClassStoreApi
  ) {
    this.classStoreService.loadClasses();
  }

  ngOnInit(): void {}

  handleClassClick({ id }): void {
    this.router.navigate([id, 'bookings'], { relativeTo: this.route });
  }
}
