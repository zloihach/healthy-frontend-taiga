import { Component, ChangeDetectionStrategy } from '@angular/core';
import {TuiAccordionModule} from "@taiga-ui/kit";
import {NgForOf} from "@angular/common";

interface AccordionItem {
  title: string;
  content: string;
  open: boolean;
}

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TuiAccordionModule,
    NgForOf
  ],
  standalone: true
})
export class InfoComponent {
  private getNumberEmoji(index: number): string {
    const numberEmojis = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
    return index.toString().split('').map(digit => numberEmojis[parseInt(digit, 10)]).join(' ');
  }


  items: AccordionItem[] = [
    {
      title: 'Для чего необходима вакцинация?',
      content: 'Вакцинация помогает предотвратить множество серьезных инфекционных заболеваний. Она стимулирует иммунную систему, чтобы организм мог узнать и бороться с вирусами или бактериями.',
      open: false
    },
    {
      title: 'Можно ли прививать детей, которые часто болеют острыми респираторными заболеваниями?',
      content: 'Да, можно, но только после того как они полностью выздоровеют. Лучше всего проконсультироваться с врачом, чтобы определить оптимальное время для вакцинации.',
      open: false
    },
    {
      title: 'Можно ли прививать недоношенных детей?',
      content: 'Да, недоношенных детей можно и нужно вакцинировать согласно календарю прививок, но с учетом их физиологического состояния. Важно проконсультироваться с педиатром.',
      open: false
    },
    {
      title: 'Можно ли прививать детей с аллергическими заболеваниями?',
      content: 'Да, детей с аллергическими заболеваниями можно прививать, но важно проконсультироваться с аллергологом для выбора подходящей вакцины и времени вакцинации.',
      open: false
    },
    {
      title: 'Каков минимальный интервал между введением двух разных вакцин?',
      content: 'Минимальный интервал между введением разных видов вакцин обычно составляет 4 недели, за исключением случаев, когда иные интервалы рекомендованы производителем или врачом.',
      open: false
    },
    {
      title: 'Как вакцинировать ребенка, если он пропустил строки введения следующей вакцины?',
      content: 'Если ребенок пропустил рекомендованное время введения вакцины, следует продолжить вакцинацию без начала нового курса, соблюдая оставшиеся интервалы.',
      open: false
    },
    {
      title: 'Каковы правила вакцинации детей с ОРВИ?',
      content: 'Детей с острыми респираторными вирусными инфекциями можно прививать после полного выздоровления, чтобы избежать осложнений и получить эффективный иммунный ответ.',
      open: false
    },
    {
      title: 'Я сделал прививку от COVID-19, как получить QR-код?',
      content: 'QR-код, подтверждающий вакцинацию от COVID-19, можно получить через государственные сервисы здравоохранения, например, через портал госуслуг или мобильное приложение здравоохранения вашей страны.',
      open: false
    },

    {
      title: 'Что такое иммунитет и как он формируется?',
      content: 'Иммунитет - это защитная система организма, способная распознавать и уничтожать вредные микроорганизмы. Он формируется благодаря работе различных клеток и молекул в организме, а также через приобретенную иммунность после контакта с возбудителями болезней или в результате вакцинации.',
      open: false
    },
    {
      title: 'Какие бывают виды вакцинации?',
      content: 'Существует несколько видов вакцинации, включая живые ослабленные вакцины, инактивированные вакцины, субъединичные вакцины, а также векторные и РНК-вакцины. Каждый вид вакцины имеет свои особенности и методы действия.',
      open: false
    },
    {
      title: 'Чем отличается пассивный иммунитет от активного?',
      content: 'Активный иммунитет формируется после контакта с возбудителями болезней или после вакцинации, когда организм самостоятельно создает защиту. Пассивный иммунитет достигается за счет передачи антител или лимфоцитов от одного организма к другому, обычно через материнское молоко или введение сыворотки с антителами.',
      open: false
    },
    {
      title: 'Как часто необходимо обновлять прививки?',
      content: 'Частота обновления прививок зависит от конкретной вакцины и рекомендаций врача или здравоохранительных организаций. Некоторые вакцины требуют единоразового введения, другие - периодического обновления для поддержания иммунитета.',
      open: false
    },
    {
      title: 'Какие возможные побочные эффекты у вакцинации?',
      content: 'Побочные эффекты вакцинации могут включать красноту и отечность на месте укола, легкую лихорадку, общее недомогание. В редких случаях могут возникнуть более серьезные реакции, поэтому важно следить за состоянием после прививки и обращаться за медицинской помощью при необходимости.',
      open: false
    },
    {
      title: 'Могут ли вакцины вызвать аллергические реакции?',
      content: 'Да, некоторые люди могут испытывать аллергические реакции на составляющие вакцин, такие как антибиотики или присадки. Эти случаи редки, но важно обсудить любые предыдущие аллергические реакции с врачом перед вакцинацией.',
      open: false
    },
    {
      title: 'Можно ли делать прививки во время беременности?',
      content: 'Вопрос о прививках во время беременности требует внимательного обсуждения с врачом. Некоторые вакцины могут быть рекомендованы для беременных женщин, чтобы защитить как матерь, так и ребенка от инфекций. Однако не все вакцины безопасны для беременных, поэтому важно следовать рекомендациям специалиста.',
      open: false
    },
    {
      title: 'Что такое коллективный иммунитет и почему он важен?',
      content: 'Коллективный иммунитет (или стадийный иммунитет) - это уровень иммунитета в популяции, достаточный для предотвращения распространения инфекции. Он важен для защиты уязвимых групп населения, таких как младенцы, пожилые люди или те, у кого есть медицинские противопоказания к вакцинации.',
      open: false
    },
    {
      title: 'Можно ли делать прививки в период заболевания другими болезнями?',
      content: 'Обычно не рекомендуется делать прививки в период острой болезни, так как иммунная система может быть ослаблена, и вакцинация может быть менее эффективной. Лучше подождать, пока организм полностью выздоровеет, прежде чем делать прививку.',
      open: false
    },
    {
      title: 'Могут ли вакцины вызывать автозаговорение или болезнь, от которой они защищают?',
      content: 'Нет, вакцины не могут вызывать болезнь, от которой они предназначены защищать. Они разработаны таким образом, чтобы стимулировать иммунную систему бороться с возбудителями болезней без вызова самой болезни. В редких случаях возможны побочные эффекты, но серьезные осложнения от вакцинации крайне редки.',
      open: false
    },
    {
      title: 'Могут ли дети получить прививку от COVID-19?',
      content: 'В настоящее время многие страны разрешают прививку от COVID-19 для детей определенных возрастных групп, особенно если у них есть определенные медицинские показания или они находятся в контакте с риском заражения. Решение о вакцинации детей должно быть принято после консультации с врачом и основываться на рекомендациях здравоохранительных организаций.',
      open: false
    }
  ];
  constructor() {
    this.items = this.items.map((item, index) => ({
      ...item,
      title: `${this.getNumberEmoji(index + 1)} ${item.title}`
    }));
  }
}
