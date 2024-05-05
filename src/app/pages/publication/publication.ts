export interface Publication {
  id: number;
  full_title: string;
  short_title: string;
  text: string;
  is_active: boolean;
  image_url: string;
  created_at: Date;
  updated_at: Date;
}
