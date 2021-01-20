import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DanceClassStoreApi } from '@swagex/shared-models';

@Component({
  selector: 'swagex-list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.scss']
})
export class ListContainerComponent implements OnDestroy {
  private _unsubscribe: Subject<void> = new Subject();
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public classStoreService: DanceClassStoreApi
  ) {}

  bookClicked({ id }): void {
    this.router.navigate([id, 'book'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this._unsubscribe.next();
  }
}
