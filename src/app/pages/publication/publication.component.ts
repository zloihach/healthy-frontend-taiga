import {TuiDialogService, TuiDialogContext, TuiLinkModule} from '@taiga-ui/core';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import {ChangeDetectionStrategy, Component, Inject} from "@angular/core";
import {TuiIslandModule} from "@taiga-ui/kit";
import {NgForOf, SlicePipe} from "@angular/common";
import {Publication} from "./publication";
@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.less'],
  standalone: true,
  imports: [
    TuiIslandModule,
    SlicePipe,
    NgForOf,
    TuiLinkModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicationComponent {
  publications: Publication[] = [
    {
      id: 3,
      full_title: "Understanding Vaccinations",
      short_title: "Vaccinations 101",
      text: "Vaccinations are vital to preventing disease 1...",
      is_active: true,
      image_url: "https://s3.timeweb.cloud/304acea6-healthy/blue_publication.svg",
      created_at: new Date("2024-03-06T14:51:52.634Z"),
      updated_at: new Date("2024-03-06T14:51:52.634Z")
    },
    {
      id: 4,
      full_title: "Test Vaccinations",
      short_title: "Vaccinations 101",
      text: "Vaccinations are vital to preventing disease 2...",
      is_active: true,
      image_url: "https://s3.timeweb.cloud/304acea6-healthy/orange_publication.svg",
      created_at: new Date("2024-03-06T14:51:52.634Z"),
      updated_at: new Date("2024-03-06T14:51:52.634Z")
    },
    {
      id: 5,
      full_title: "Understanding Vaccinations",
      short_title: "Vaccinations 101",
      text: "Vaccinations are vital to preventing disease 3...",
      is_active: true,
      image_url: "https://s3.timeweb.cloud/304acea6-healthy/blue_publication.svg",
      created_at: new Date("2024-03-06T14:51:52.634Z"),
      updated_at: new Date("2024-03-06T14:51:52.634Z")
    },
    {
      id: 4,
      full_title: "Test Vaccinations",
      short_title: "Vaccinations 101",
      text: "Vaccinations are vital to preventing disease 4...",
      is_active: true,
      image_url: "https://s3.timeweb.cloud/304acea6-healthy/orange_publication.svg",
      created_at: new Date("2024-03-06T14:51:52.634Z"),
      updated_at: new Date("2024-03-06T14:51:52.634Z")
    }
  ];

  constructor(@Inject(TuiDialogService) private readonly dialogs: TuiDialogService) {}

  openPublicationDialog(publication: Publication): void {
    const content: PolymorpheusContent<TuiDialogContext> = {
      template: this.getDialogTemplate(publication),
      context: {
        $implicit: 'Close',
        completeWith: (data: any) => console.log(data),
      },
    };
    this.dialogs.open(publication.text, {label: publication.full_title, size: 'm'}).subscribe();
  }

  private getDialogTemplate(publication: Publication): string {
    return ``;
  }
}
