import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { TuiTabsModule } from '@taiga-ui/kit';
import { TuiAlertService } from '@taiga-ui/core';
import { AsyncPipe, NgForOf } from '@angular/common';
import { Observable } from 'rxjs';
import { selectUsers } from '../../states/selectors/vaccine.selectors';
import * as VaccineActions from '../../states/actions/vaccine.actions';
import { AppState } from '../../states/reducers/vaccine.reducer';

@Component({
  selector: 'app-user-picker-tabs',
  standalone: true,
  imports: [
    TuiTabsModule,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './user-picker-tabs.component.html',
  styleUrls: ['./user-picker-tabs.component.less']
})
export class UserPickerTabsComponent implements OnInit {
  activeItemIndex = 0;
  users$: Observable<any[]>;
  @Output() userChange = new EventEmitter<any>();

  constructor(
    @Inject(TuiAlertService)
    private readonly alerts: TuiAlertService,
    private readonly store: Store<AppState>
  ) {
    this.users$ = this.store.select(selectUsers);
  }

  ngOnInit(): void {
    this.store.dispatch(VaccineActions.loadUsersAndChildren());
    this.users$.subscribe(users => {
      if (users.length > 0) {
        this.userChange.emit(users[this.activeItemIndex]);
      }
    });
  }

  onClick(user: any): void {
    this.alerts.open(`Selected: ${user.name}`).subscribe();
    this.userChange.emit(user);
  }
}
