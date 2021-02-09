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
  @Input() videoUrl?: string;
  constructor() {}

  ngOnInit(): void {}
}
