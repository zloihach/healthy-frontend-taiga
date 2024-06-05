import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  OnDestroy,
  AfterViewChecked,
  ChangeDetectionStrategy
} from '@angular/core';
import { Store } from '@ngrx/store';
import { TuiTabsModule } from '@taiga-ui/kit';
import { TuiAlertService } from '@taiga-ui/core';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { Observable, Subscription, of, combineLatest } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import * as VaccineActions from '../../../states/actions/main.actions';
import { selectChildren, selectUserVaccinations } from '../../../states/selectors/main.selectors';
import { AppStateInterface } from '../../../interfaces/appStates.interface';

@Component({
  selector: 'app-user-picker-tabs',
  standalone: true,
  imports: [
    TuiTabsModule,
    NgForOf,
    AsyncPipe,
    NgIf,
    NgClass
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-picker-tabs.component.html',
  styleUrls: ['./user-picker-tabs.component.less']
})
export class UserPickerTabsComponent implements OnInit, OnDestroy, AfterViewChecked {
  activeItemIndex = 0;
  users: any[] = [];
  loading = true;
  skeletonArray: number[] = Array.from({ length: 3 });
  private subscriptions: Subscription = new Subscription();
  @Output() userChange = new EventEmitter<any>();

  constructor(
    private alerts: TuiAlertService,
    private store: Store<AppStateInterface>,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const users$: Observable<any[]> = combineLatest([
      this.store.select(selectUserVaccinations).pipe(
        map(userVaccinations => userVaccinations ? { id: 'user', vaccinations: userVaccinations, isCurrentUser: true } : null),
        catchError(error => {
          console.error('Error loading user vaccinations', error);
          return of(null);
        })
      ),
      this.store.select(selectChildren).pipe(
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

    this.store.dispatch(VaccineActions.loadUserVaccinations());
    this.store.dispatch(VaccineActions.loadChildren());
    this.subscriptions.add(
      users$.subscribe(users => {
        this.users = users || [];
        this.loading = false;
        if (users.length > 0) {
          this.userChange.emit(users[this.activeItemIndex]);
        }
        this.cdr.detectChanges();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  onClick(user: any, index: number): void {
    this.activeItemIndex = index;
    this.userChange.emit(user);
    this.cdr.detectChanges();
  }
}
