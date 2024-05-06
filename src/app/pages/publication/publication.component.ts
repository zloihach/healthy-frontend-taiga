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
      "id": 1,
      "full_title": "Вакцинация: ключ к общественному здоровью",
      "short_title": "Вакцинация",
      "text": "Вакцинация – это важнейший инструмент общественного здравоохранения. Она помогает предотвратить распространение инфекционных заболеваний и спасает миллионы жизней ежегодно.",
      "is_active": true,
      "image_url": "https://s3.timeweb.cloud/304acea6-healthy/blue_publication.svg",
      created_at: new Date("2024-03-06T14:51:52.634Z"),
      updated_at: new Date("2024-03-06T14:51:52.634Z")
    },
    {
      "id": 2,
      "full_title": "Иммунизация: современные рекомендации",
      "short_title": "Иммунизация",
      "text": "Иммунизация – это безопасный и эффективный способ защиты организма от инфекционных заболеваний. Ежегодное проведение вакцинации помогает сохранить здоровье и предотвратить вспышки болезней.",
      "is_active": true,
      "image_url": "https://s3.timeweb.cloud/304acea6-healthy/orange_publication.svg",
      created_at: new Date("2024-03-06T14:51:52.634Z"),
      updated_at: new Date("2024-03-06T14:51:52.634Z")
    },
    {
      "id": 3,
      "full_title": "Преимущества вакцинации в детском возрасте",
      "short_title": "Вакцинация у детей",
      "text": "Вакцинация в детском возрасте – это важный шаг для защиты здоровья ребенка. Проведение прививок согласно рекомендациям ведущих медицинских организаций помогает предотвратить серьезные заболевания.",
      "is_active": true,
      "image_url": "https://s3.timeweb.cloud/304acea6-healthy/blue_publication.svg",
      created_at: new Date("2024-03-06T14:51:52.634Z"),
      updated_at: new Date("2024-03-06T14:51:52.634Z")
    },
    {
      "id": 4,
      "full_title": "Вакцинация: мифы и реальность",
      "short_title": "Мифы о вакцинации",
      "text": "Вокруг вакцинации существует много мифов и дезинформации. Однако научные исследования и медицинские статистические данные подтверждают эффективность и безопасность вакцинации как метода предотвращения инфекционных заболеваний.",
      "is_active": true,
      "image_url": "https://s3.timeweb.cloud/304acea6-healthy/orange_publication.svg",
      created_at: new Date("2024-03-06T14:51:52.634Z"),
      updated_at: new Date("2024-03-06T14:51:52.634Z")
    },
    {
      "id": 5,
      "full_title": "Эволюция вакцинации: от открытия к внедрению",
      "short_title": "Эволюция вакцинации",
      "text": "История вакцинации насчитывает множество важных моментов и открытий. С развитием науки и технологий вакцинация становится все более точной, эффективной и доступной для всех слоев населения.",
      "is_active": true,
      "image_url": "https://s3.timeweb.cloud/304acea6-healthy/blue_publication.svg",
      created_at: new Date("2024-03-06T14:51:52.634Z"),
      updated_at: new Date("2024-03-06T14:51:52.634Z")
    },
    {
      "id": 6,
      "full_title": "Профилактика гриппа: важность вакцинации",
      "short_title": "Вакцинация от гриппа",
      "text": "Вакцинация против гриппа является ключевым моментом в профилактике заболеваний дыхательных путей. Регулярное вакцинирование помогает предотвратить осложнения и снизить риск заболевания.",
      "is_active": true,
      "image_url": "https://s3.timeweb.cloud/304acea6-healthy/orange_publication.svg",
      created_at: new Date("2024-03-06T14:51:52.634Z"),
      updated_at: new Date("2024-03-06T14:51:52.634Z")
    },
    {
      "id": 7,
      "full_title": "Принципы вакцинации: основные концепции",
      "short_title": "Принципы вакцинации",
      "text": "Вакцинация основывается на принципе искусственного создания иммунитета к инфекционным заболеваниям. Этот метод защиты здоровья позволяет организму более эффективно справляться с возможными угрозами.",
      "is_active": true,
      "image_url": "https://s3.timeweb.cloud/304acea6-healthy/blue_publication.svg",
      created_at: new Date("2024-03-06T14:51:52.634Z"),
      updated_at: new Date("2024-03-06T14:51:52.634Z")
    },
    {
      "id": 8,
      "full_title": "Вакцинация в период пандемии: актуальные вопросы",
      "short_title": "Вакцинация и пандемия",
      "text": "В условиях пандемии вакцинация становится особенно важной мерой контроля распространения инфекций. Программы вакцинации помогают предотвратить вспышки болезней и обеспечить безопасность общества.",
      "is_active": true,
      "image_url": "https://s3.timeweb.cloud/304acea6-healthy/orange_publication.svg",
      created_at: new Date("2024-03-06T14:51:52.634Z"),
      updated_at: new Date("2024-03-06T14:51:52.634Z")
    },
    {
      "id": 9,
      "full_title": "Вакцинация: роль медицинских работников",
      "short_title": "Роль врачей в вакцинации",
      "text": "Медицинские работники играют ключевую роль в проведении успешных программ вакцинации. Их знания и опыт помогают эффективно проводить прививки и обеспечивать безопасность пациентов.",
      "is_active": true,
      "image_url": "https://s3.timeweb.cloud/304acea6-healthy/blue_publication.svg",
      created_at: new Date("2024-03-06T14:51:52.634Z"),
      updated_at: new Date("2024-03-06T14:51:52.634Z")
    }
  ];

  constructor(@Inject(TuiDialogService) private readonly dialogs: TuiDialogService) {
  }


  openPublicationDialog(publication: Publication): void {
    const content: PolymorpheusContent<TuiDialogContext> = {
      template: '',
      context: {
        $implicit: 'Close',
        completeWith: (data: any) => console.log(data),
      },
    };

    this.dialogs.open(publication.text, {
      label: publication.full_title,
      size: 'm',
      data: {button: 'Закрыть'}
    }).subscribe();
  }
}
