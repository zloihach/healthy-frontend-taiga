import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectChildren } from '../../shared/states/selectors/vaccine.selectors';
import { AppStateInterface } from '../../shared/interfaces/appStates.interface';
import * as VaccineActions from '../../shared/states/actions/vaccine.actions';
import { ChildCardComponent } from '../../shared/components/child-card/child-card.component';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-children',
  standalone: true,
  imports: [
    ChildCardComponent,
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
      map(children => children.map(child => ({
        name: `${child.firstname} ${child.lastname}`,
        birthDate: new Date(child.dob).toLocaleDateString() // Преобразуем дату в удобный формат
      })))
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
