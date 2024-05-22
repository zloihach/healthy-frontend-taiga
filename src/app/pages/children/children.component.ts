import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectChildren } from '../../shared/states/selectors/vaccine.selectors';
import { AppStateInterface } from '../../shared/interfaces/appStates.interface';
import * as VaccineActions from '../../shared/states/actions/vaccine.actions';
import { AsyncPipe, NgForOf, NgIf } from "@angular/common";
import { ChildCardComponent } from "../../shared/components/cards/child-card/child-card.component";
import { AddChildCardComponent } from '../../shared/components/cards/add-child-card/add-child-card.component';

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

  constructor(private store: Store<AppStateInterface>) {
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
}
