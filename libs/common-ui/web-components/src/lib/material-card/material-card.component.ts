import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { ActionButton } from './model';

@Component({
  selector: 'swagex-material-card',
  templateUrl: './material-card.component.html',
  styleUrls: ['./material-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialCardComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() imageUrl?: string;
  @Input() defaultImageUrl?: string;
  @Input() alt?: string;
  @Input() description?: string;
  @Input() actionButtons: ActionButton[];
  @Output() buttonClicked = new EventEmitter<string>();

  constructor() {}
}
