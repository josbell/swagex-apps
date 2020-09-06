export interface ActionButton {
  id: string;
  label: string;
}

export interface CardConfig {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  alt?: string;
  description?: string;
  actionButtons?: ActionButton[];
}
