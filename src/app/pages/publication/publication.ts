// export interface Publication {
//   id: number;
//   full_title: string;
//   short_title: string;
//   text: string;
//   is_active: boolean;
//   image_url: string;
//   created_at: Date;
//   updated_at: Date;
// }

export interface Publication {
  id: number;
  short_title: string;
  full_title: string;
  text: string;
  edit_date: string;
  update_date: string;
  image_url?: string;
  is_active: boolean;
}
