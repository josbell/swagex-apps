import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DanceClassStoreApi } from '@swagex/shared-models';
@Component({
  selector: 'swagex-sign-up-for-class',
  templateUrl: './sign-up-for-class.component.html',
  styleUrls: ['./sign-up-for-class.component.scss']
})
export class SignUpForClassComponent implements OnInit, OnDestroy {
  private _unsubscribe: Subject<void> = new Subject();
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    public classStoreService: DanceClassStoreApi
  ) {
    this.classStoreService.loadClasses();
  }

  ngOnInit(): void {}

  bookClicked({ id }): void {
    this.router.navigate([id, 'book'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this._unsubscribe.next();
  }
}
