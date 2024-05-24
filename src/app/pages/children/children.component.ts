import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectChildren } from '../../shared/states/selectors/main.selectors';
import { AppStateInterface } from '../../shared/interfaces/appStates.interface';
import * as VaccineActions from '../../shared/states/actions/main.actions';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ChildCardComponent } from '../../shared/components/cards/child-card/child-card.component';
import { AddChildCardComponent } from '../../shared/components/cards/add-child-card/add-child-card.component';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { AddChildDialogComponent } from '../../shared/components/dialogs/add-child-dialog/add-child-dialog.component';

@Component({
  selector: 'app-children',
  standalone: true,
  imports: [
    ChildCardComponent,
    AddChildCardComponent,
    AsyncPipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.less']
})
export class ChildrenComponent implements OnInit {
  children$: Observable<any[]>;

  constructor(private store: Store<AppStateInterface>, private dialogService: TuiDialogService) {
    this.children$ = this.store.select(selectChildren).pipe(
      map(children => [
        ...children.map(child => ({
          id: child.id,
          name: `${child.firstname} ${child.lastname}`,
          birthDate: new Date(child.dob).toLocaleDateString(),
          firstname: child.firstname,
          lastname: child.lastname,
          midname: child.midname,
          sex: child.sex,
          dob: child.dob
        })),
        { isAddCard: true } // Placeholder for add-child-card
      ])
    );
  }

  ngOnInit(): void {
    console.log('Dispatching loadChildren action');
    this.store.dispatch(VaccineActions.loadChildren());
    this.children$.subscribe(children => {
      console.log('Children loaded:', children);
    });
  }

  openAddChildDialog(): void {
    const dialog = this.dialogService.open(new PolymorpheusComponent(AddChildDialogComponent), {
      label: 'Добавить ребенка'
    });

    dialog.subscribe({
      next: () => this.store.dispatch(VaccineActions.loadChildren()),  // Reload the children list when dialog is closed
      error: error => console.error('Dialog failed with error:', error)
    });
  }
}
