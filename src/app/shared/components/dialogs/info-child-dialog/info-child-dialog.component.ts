import { Component, Inject } from '@angular/core';
import { TuiButtonModule, TuiDialogContext, TuiDialogModule } from '@taiga-ui/core';
import { CommonModule } from '@angular/common';
import { TuiBadgeModule } from '@taiga-ui/kit';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { ChildService } from '../../../../core/services/child/child.service';
import {Store} from "@ngrx/store";
import {AppStateInterface} from "../../../interfaces/appStates.interface";
import * as VaccineActions from '../../../../shared/states/actions/main.actions';

@Component({
  selector: 'app-info-child-dialog',
  templateUrl: './info-child-dialog.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TuiDialogModule,
    TuiBadgeModule,
    TuiButtonModule
  ],
  styleUrls: ['./info-child-dialog.component.less']
})
export class InfoChildDialogComponent {
  child: { id: number, firstname: string, lastname: string, midname: string, dob: string, sex: string };

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<void, { child: any }>,
    private childService: ChildService,
    private store: Store<AppStateInterface>
  ) {
    this.child = this.context.data.child;
  }

  onClose(): void {
    this.context.completeWith();
  }


  deleteChild(): void {
    this.childService.deleteChild(this.child.id).subscribe(() => {
      this.store.dispatch(VaccineActions.loadChildren());
      this.context.completeWith();
    });
  }
}
