import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  OnDestroy,
  AfterViewChecked
} from '@angular/core';
import { Store } from '@ngrx/store';
import { TuiTabsModule } from '@taiga-ui/kit';
import { TuiAlertService } from '@taiga-ui/core';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {Observable, Subscription, of, combineLatest} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import * as VaccineActions from '../../states/actions/vaccine.actions';
import { selectChildren, selectUserVaccinations } from "../../states/selectors/vaccine.selectors";
import {AppStateInterface} from "../../interfaces/appStates.interface";

@Component({
  selector: 'app-user-picker-tabs',
  standalone: true,
  imports: [
    TuiTabsModule,
    NgForOf,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './user-picker-tabs.component.html',
  styleUrls: ['./user-picker-tabs.component.less']
})
export class UserPickerTabsComponent implements OnInit, OnDestroy, AfterViewChecked {
  activeItemIndex = 0;
  users$: Observable<any[]>;
  loading = true;
  private subscriptions: Subscription = new Subscription();
  @Output() userChange = new EventEmitter<any>();

  constructor(
    private alerts: TuiAlertService,
    private store: Store<AppStateInterface>,
    private cdr: ChangeDetectorRef
  ) {
    console.log('UserPickerTabsComponent: Constructor');
    this.users$ = combineLatest([
      this.store.select(selectUserVaccinations).pipe(
        tap(userVaccinations => console.log('selectUserVaccinations:', userVaccinations)),
        map(userVaccinations => userVaccinations ? { id: 'user', vaccinations: userVaccinations, isCurrentUser: true } : null),
        catchError(error => {
          console.error('Error loading user vaccinations', error);
          return of(null);
        })
      ),
      this.store.select(selectChildren).pipe(
        tap(children => console.log('selectChildren:', children)),
        map(children => children ? children.map(child => ({ ...child, isCurrentUser: false })) : []),
        catchError(error => {
          console.error('Error loading children', error);
          return of([]);
        })
      )
    ]).pipe(
      map(([user, children]) => user ? [user, ...children] : children),
      tap(users => console.log('Combined users:', users))
    );
  }

  ngOnInit(): void {
    console.log('UserPickerTabsComponent: ngOnInit');
    this.store.dispatch(VaccineActions.loadUserVaccinations());
    this.store.dispatch(VaccineActions.loadChildren());
    this.subscriptions.add(
      this.users$.subscribe(users => {
        console.log('UserPickerTabsComponent: users$', users);
        this.loading = false;
        if (users.length > 0) {
          this.userChange.emit(users[this.activeItemIndex]);
          this.cdr.detectChanges();
        }
      })
    );
  }

  ngOnDestroy(): void {
    console.log('UserPickerTabsComponent: ngOnDestroy');
    this.subscriptions.unsubscribe();
  }

  ngAfterViewChecked(): void {
    console.log('UserPickerTabsComponent: ngAfterViewChecked');
    this.cdr.detectChanges();
  }

  onClick(user: any): void {
    console.log('UserPickerTabsComponent: onClick', user);
    this.alerts.open(`Selected: ${user.isCurrentUser ? 'Вы' : user.firstname}`).subscribe();
    this.userChange.emit(user);
    this.cdr.detectChanges();
  }
}
