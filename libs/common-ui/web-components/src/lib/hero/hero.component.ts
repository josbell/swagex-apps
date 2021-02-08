import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  HostListener
} from '@angular/core';

@Component({
  selector: 'swagex-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent implements OnInit {
  isInMobileLowPowerMode = false;
  @Input() videoUrl?: string;
  @HostListener('suspend') onIosLowPowerMode() {
    this.isInMobileLowPowerMode = true;
  }
  constructor() {}

  ngOnInit(): void {}
}
