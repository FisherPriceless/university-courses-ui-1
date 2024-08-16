/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from "@angular/core";
import { KeyCode } from "../../enums/key-code.enum";
import { ActiveView } from "../../enums/active-view.enum";
import { UtilService } from "../../services/angular-mydatepicker.util.service";
import { OPTS, MONTHS } from "../../constants/constants";
export class MonthViewComponent {
    /**
     * @param {?} utilService
     */
    constructor(utilService) {
        this.utilService = utilService;
        this.monthCellClicked = new EventEmitter();
        this.monthCellKeyDown = new EventEmitter();
        this.viewActivated = new EventEmitter();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.hasOwnProperty(OPTS)) {
            this.opts = changes[OPTS].currentValue;
        }
        if (changes.hasOwnProperty(MONTHS)) {
            this.months = changes[MONTHS].currentValue;
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.viewActivated.emit(ActiveView.Month);
    }
    /**
     * @param {?} event
     * @param {?} cell
     * @return {?}
     */
    onMonthCellClicked(event, cell) {
        event.stopPropagation();
        if (cell.disabled) {
            return;
        }
        this.monthCellClicked.emit(cell);
    }
    /**
     * @param {?} event
     * @param {?} cell
     * @return {?}
     */
    onMonthCellKeyDown(event, cell) {
        /** @type {?} */
        const keyCode = this.utilService.getKeyCodeFromEvent(event);
        if (keyCode !== KeyCode.tab) {
            event.preventDefault();
            if (keyCode === KeyCode.enter || keyCode === KeyCode.space) {
                this.onMonthCellClicked(event, cell);
            }
            else if (this.opts.moveFocusByArrowKeys) {
                this.monthCellKeyDown.emit(event);
            }
        }
    }
}
MonthViewComponent.decorators = [
    { type: Component, args: [{
                selector: "lib-month-view",
                template: "<table class=\"myDpMonthTable\" [ngClass]=\"{'ng-myrtl': opts.rtl, 'myDpFooter': opts.showFooterToday, 'myDpNoFooter': !opts.showFooterToday, 'myDpViewChangeAnimation': opts.viewChangeAnimation && viewChanged}\">\n  <tbody>\n    <tr *ngFor=\"let mr of months\">\n      <td id=\"m_{{m.row}}_{{m.col}}\" class=\"m_{{m.row}}_{{m.col}} myDpMonthcell\"\n          [ngClass]=\"{'myDpSelectedMonth': m.selected, 'myDpDisabled': m.disabled, 'myDpTableSingleMonth': !m.disabled}\"\n          *ngFor=\"let m of mr\" (click)=\"onMonthCellClicked($event, m)\" (keydown)=\"onMonthCellKeyDown($event, m)\" [attr.tabindex]=\"!m.disabled ? 0 : -1\">\n        <span class=\"myDpMonthNbr\" *ngIf=\"opts.showMonthNumber\">{{m.nbr}}</span>\n        <span class=\"myDpMonthValue\" \n          [attr.aria-label]=\"[(m.nbr + '/' + 1 + '/' + m.year | date:'MMMM yyyy')]\"\n          [ngClass]=\"{'myDpMarkCurrMonth': m.currMonth && opts.markCurrentMonth}\">{{m.name}}</span>\n      </td>\n    </tr>\n  </tbody>\n</table>\n",
                providers: [UtilService],
                encapsulation: ViewEncapsulation.None
            }] }
];
/** @nocollapse */
MonthViewComponent.ctorParameters = () => [
    { type: UtilService }
];
MonthViewComponent.propDecorators = {
    opts: [{ type: Input }],
    months: [{ type: Input }],
    viewChanged: [{ type: Input }],
    monthCellClicked: [{ type: Output }],
    monthCellKeyDown: [{ type: Output }],
    viewActivated: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    MonthViewComponent.prototype.opts;
    /** @type {?} */
    MonthViewComponent.prototype.months;
    /** @type {?} */
    MonthViewComponent.prototype.viewChanged;
    /** @type {?} */
    MonthViewComponent.prototype.monthCellClicked;
    /** @type {?} */
    MonthViewComponent.prototype.monthCellKeyDown;
    /** @type {?} */
    MonthViewComponent.prototype.viewActivated;
    /**
     * @type {?}
     * @private
     */
    MonthViewComponent.prototype.utilService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGgtdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW15ZGF0ZXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL21vbnRoLXZpZXcvbW9udGgtdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBNEIsTUFBTSxFQUFpQixpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUdqSSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDbEQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxrREFBa0QsQ0FBQztBQUM3RSxPQUFPLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBUXZELE1BQU0sT0FBTyxrQkFBa0I7Ozs7SUFTN0IsWUFBb0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFKbEMscUJBQWdCLEdBQW1DLElBQUksWUFBWSxFQUFvQixDQUFDO1FBQ3hGLHFCQUFnQixHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzlELGtCQUFhLEdBQTZCLElBQUksWUFBWSxFQUFjLENBQUM7SUFFbkMsQ0FBQzs7Ozs7SUFFakQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNoQyxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUM7U0FDeEM7UUFDRCxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDbEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDO1NBQzVDO0lBQ0gsQ0FBQzs7OztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7Ozs7O0lBRUQsa0JBQWtCLENBQUMsS0FBVSxFQUFFLElBQXNCO1FBQ25ELEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUV4QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDOzs7Ozs7SUFFRCxrQkFBa0IsQ0FBQyxLQUFVLEVBQUUsSUFBc0I7O2NBQzdDLE9BQU8sR0FBVyxJQUFJLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQztRQUNuRSxJQUFJLE9BQU8sS0FBSyxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQzNCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUV2QixJQUFJLE9BQU8sS0FBSyxPQUFPLENBQUMsS0FBSyxJQUFJLE9BQU8sS0FBSyxPQUFPLENBQUMsS0FBSyxFQUFFO2dCQUMxRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3RDO2lCQUNJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtnQkFDdkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTthQUNsQztTQUNGO0lBQ0gsQ0FBQzs7O1lBcERGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixrL0JBQTBDO2dCQUMxQyxTQUFTLEVBQUUsQ0FBQyxXQUFXLENBQUM7Z0JBQ3hCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2FBQ3RDOzs7O1lBUk8sV0FBVzs7O21CQVVoQixLQUFLO3FCQUNMLEtBQUs7MEJBQ0wsS0FBSzsrQkFFTCxNQUFNOytCQUNOLE1BQU07NEJBQ04sTUFBTTs7OztJQU5QLGtDQUEwQjs7SUFDMUIsb0NBQWdEOztJQUNoRCx5Q0FBOEI7O0lBRTlCLDhDQUFrRzs7SUFDbEcsOENBQXdFOztJQUN4RSwyQ0FBbUY7Ozs7O0lBRXZFLHlDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcywgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0lNeUNhbGVuZGFyTW9udGh9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL215LWNhbGVuZGFyLW1vbnRoLmludGVyZmFjZVwiO1xuaW1wb3J0IHtJTXlPcHRpb25zfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9teS1vcHRpb25zLmludGVyZmFjZVwiO1xuaW1wb3J0IHtLZXlDb2RlfSBmcm9tIFwiLi4vLi4vZW51bXMva2V5LWNvZGUuZW51bVwiO1xuaW1wb3J0IHtBY3RpdmVWaWV3fSBmcm9tIFwiLi4vLi4vZW51bXMvYWN0aXZlLXZpZXcuZW51bVwiO1xuaW1wb3J0IHtVdGlsU2VydmljZX0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2FuZ3VsYXItbXlkYXRlcGlja2VyLnV0aWwuc2VydmljZVwiO1xuaW1wb3J0IHtPUFRTLCBNT05USFN9IGZyb20gXCIuLi8uLi9jb25zdGFudHMvY29uc3RhbnRzXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJsaWItbW9udGgtdmlld1wiLFxuICB0ZW1wbGF0ZVVybDogXCIuL21vbnRoLXZpZXcuY29tcG9uZW50Lmh0bWxcIixcbiAgcHJvdmlkZXJzOiBbVXRpbFNlcnZpY2VdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE1vbnRoVmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBJbnB1dCgpIG9wdHM6IElNeU9wdGlvbnM7XG4gIEBJbnB1dCgpIG1vbnRoczogQXJyYXk8QXJyYXk8SU15Q2FsZW5kYXJNb250aD4+O1xuICBASW5wdXQoKSB2aWV3Q2hhbmdlZDogYm9vbGVhbjtcblxuICBAT3V0cHV0KCkgbW9udGhDZWxsQ2xpY2tlZDogRXZlbnRFbWl0dGVyPElNeUNhbGVuZGFyTW9udGg+ID0gbmV3IEV2ZW50RW1pdHRlcjxJTXlDYWxlbmRhck1vbnRoPigpO1xuICBAT3V0cHV0KCkgbW9udGhDZWxsS2V5RG93bjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHZpZXdBY3RpdmF0ZWQ6IEV2ZW50RW1pdHRlcjxBY3RpdmVWaWV3PiA9IG5ldyBFdmVudEVtaXR0ZXI8QWN0aXZlVmlldz4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHV0aWxTZXJ2aWNlOiBVdGlsU2VydmljZSkgeyB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KE9QVFMpKSB7XG4gICAgICB0aGlzLm9wdHMgPSBjaGFuZ2VzW09QVFNdLmN1cnJlbnRWYWx1ZTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoTU9OVEhTKSkge1xuICAgICAgdGhpcy5tb250aHMgPSBjaGFuZ2VzW01PTlRIU10uY3VycmVudFZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXdBY3RpdmF0ZWQuZW1pdChBY3RpdmVWaWV3Lk1vbnRoKTtcbiAgfVxuXG4gIG9uTW9udGhDZWxsQ2xpY2tlZChldmVudDogYW55LCBjZWxsOiBJTXlDYWxlbmRhck1vbnRoKTogdm9pZCB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICBpZiAoY2VsbC5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubW9udGhDZWxsQ2xpY2tlZC5lbWl0KGNlbGwpO1xuICB9XG5cbiAgb25Nb250aENlbGxLZXlEb3duKGV2ZW50OiBhbnksIGNlbGw6IElNeUNhbGVuZGFyTW9udGgpIHtcbiAgICBjb25zdCBrZXlDb2RlOiBudW1iZXIgPSB0aGlzLnV0aWxTZXJ2aWNlLmdldEtleUNvZGVGcm9tRXZlbnQoZXZlbnQpO1xuICAgIGlmIChrZXlDb2RlICE9PSBLZXlDb2RlLnRhYikge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgaWYgKGtleUNvZGUgPT09IEtleUNvZGUuZW50ZXIgfHwga2V5Q29kZSA9PT0gS2V5Q29kZS5zcGFjZSkge1xuICAgICAgICB0aGlzLm9uTW9udGhDZWxsQ2xpY2tlZChldmVudCwgY2VsbCk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0aGlzLm9wdHMubW92ZUZvY3VzQnlBcnJvd0tleXMpIHtcbiAgICAgICAgdGhpcy5tb250aENlbGxLZXlEb3duLmVtaXQoZXZlbnQpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=