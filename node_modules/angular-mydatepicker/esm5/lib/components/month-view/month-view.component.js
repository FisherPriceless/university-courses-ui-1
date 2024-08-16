/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from "@angular/core";
import { KeyCode } from "../../enums/key-code.enum";
import { ActiveView } from "../../enums/active-view.enum";
import { UtilService } from "../../services/angular-mydatepicker.util.service";
import { OPTS, MONTHS } from "../../constants/constants";
var MonthViewComponent = /** @class */ (function () {
    function MonthViewComponent(utilService) {
        this.utilService = utilService;
        this.monthCellClicked = new EventEmitter();
        this.monthCellKeyDown = new EventEmitter();
        this.viewActivated = new EventEmitter();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    MonthViewComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.hasOwnProperty(OPTS)) {
            this.opts = changes[OPTS].currentValue;
        }
        if (changes.hasOwnProperty(MONTHS)) {
            this.months = changes[MONTHS].currentValue;
        }
    };
    /**
     * @return {?}
     */
    MonthViewComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.viewActivated.emit(ActiveView.Month);
    };
    /**
     * @param {?} event
     * @param {?} cell
     * @return {?}
     */
    MonthViewComponent.prototype.onMonthCellClicked = /**
     * @param {?} event
     * @param {?} cell
     * @return {?}
     */
    function (event, cell) {
        event.stopPropagation();
        if (cell.disabled) {
            return;
        }
        this.monthCellClicked.emit(cell);
    };
    /**
     * @param {?} event
     * @param {?} cell
     * @return {?}
     */
    MonthViewComponent.prototype.onMonthCellKeyDown = /**
     * @param {?} event
     * @param {?} cell
     * @return {?}
     */
    function (event, cell) {
        /** @type {?} */
        var keyCode = this.utilService.getKeyCodeFromEvent(event);
        if (keyCode !== KeyCode.tab) {
            event.preventDefault();
            if (keyCode === KeyCode.enter || keyCode === KeyCode.space) {
                this.onMonthCellClicked(event, cell);
            }
            else if (this.opts.moveFocusByArrowKeys) {
                this.monthCellKeyDown.emit(event);
            }
        }
    };
    MonthViewComponent.decorators = [
        { type: Component, args: [{
                    selector: "lib-month-view",
                    template: "<table class=\"myDpMonthTable\" [ngClass]=\"{'ng-myrtl': opts.rtl, 'myDpFooter': opts.showFooterToday, 'myDpNoFooter': !opts.showFooterToday, 'myDpViewChangeAnimation': opts.viewChangeAnimation && viewChanged}\">\n  <tbody>\n    <tr *ngFor=\"let mr of months\">\n      <td id=\"m_{{m.row}}_{{m.col}}\" class=\"m_{{m.row}}_{{m.col}} myDpMonthcell\"\n          [ngClass]=\"{'myDpSelectedMonth': m.selected, 'myDpDisabled': m.disabled, 'myDpTableSingleMonth': !m.disabled}\"\n          *ngFor=\"let m of mr\" (click)=\"onMonthCellClicked($event, m)\" (keydown)=\"onMonthCellKeyDown($event, m)\" [attr.tabindex]=\"!m.disabled ? 0 : -1\">\n        <span class=\"myDpMonthNbr\" *ngIf=\"opts.showMonthNumber\">{{m.nbr}}</span>\n        <span class=\"myDpMonthValue\" \n          [attr.aria-label]=\"[(m.nbr + '/' + 1 + '/' + m.year | date:'MMMM yyyy')]\"\n          [ngClass]=\"{'myDpMarkCurrMonth': m.currMonth && opts.markCurrentMonth}\">{{m.name}}</span>\n      </td>\n    </tr>\n  </tbody>\n</table>\n",
                    providers: [UtilService],
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    /** @nocollapse */
    MonthViewComponent.ctorParameters = function () { return [
        { type: UtilService }
    ]; };
    MonthViewComponent.propDecorators = {
        opts: [{ type: Input }],
        months: [{ type: Input }],
        viewChanged: [{ type: Input }],
        monthCellClicked: [{ type: Output }],
        monthCellKeyDown: [{ type: Output }],
        viewActivated: [{ type: Output }]
    };
    return MonthViewComponent;
}());
export { MonthViewComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGgtdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW15ZGF0ZXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL21vbnRoLXZpZXcvbW9udGgtdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBNEIsTUFBTSxFQUFpQixpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUdqSSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDbEQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxrREFBa0QsQ0FBQztBQUM3RSxPQUFPLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRXZEO0lBZUUsNEJBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBSmxDLHFCQUFnQixHQUFtQyxJQUFJLFlBQVksRUFBb0IsQ0FBQztRQUN4RixxQkFBZ0IsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUM5RCxrQkFBYSxHQUE2QixJQUFJLFlBQVksRUFBYyxDQUFDO0lBRW5DLENBQUM7Ozs7O0lBRWpELHdDQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDaEMsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDO1NBQ3hDO1FBQ0QsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2xDLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQztTQUM1QztJQUNILENBQUM7Ozs7SUFFRCw0Q0FBZTs7O0lBQWY7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7Ozs7O0lBRUQsK0NBQWtCOzs7OztJQUFsQixVQUFtQixLQUFVLEVBQUUsSUFBc0I7UUFDbkQsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXhCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7Ozs7OztJQUVELCtDQUFrQjs7Ozs7SUFBbEIsVUFBbUIsS0FBVSxFQUFFLElBQXNCOztZQUM3QyxPQUFPLEdBQVcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUM7UUFDbkUsSUFBSSxPQUFPLEtBQUssT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUMzQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFFdkIsSUFBSSxPQUFPLEtBQUssT0FBTyxDQUFDLEtBQUssSUFBSSxPQUFPLEtBQUssT0FBTyxDQUFDLEtBQUssRUFBRTtnQkFDMUQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQzthQUN0QztpQkFDSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUU7Z0JBQ3ZDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7YUFDbEM7U0FDRjtJQUNILENBQUM7O2dCQXBERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsay9CQUEwQztvQkFDMUMsU0FBUyxFQUFFLENBQUMsV0FBVyxDQUFDO29CQUN4QixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtpQkFDdEM7Ozs7Z0JBUk8sV0FBVzs7O3VCQVVoQixLQUFLO3lCQUNMLEtBQUs7OEJBQ0wsS0FBSzttQ0FFTCxNQUFNO21DQUNOLE1BQU07Z0NBQ04sTUFBTTs7SUF3Q1QseUJBQUM7Q0FBQSxBQXJERCxJQXFEQztTQS9DWSxrQkFBa0I7OztJQUM3QixrQ0FBMEI7O0lBQzFCLG9DQUFnRDs7SUFDaEQseUNBQThCOztJQUU5Qiw4Q0FBa0c7O0lBQ2xHLDhDQUF3RTs7SUFDeEUsMkNBQW1GOzs7OztJQUV2RSx5Q0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtJTXlDYWxlbmRhck1vbnRofSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9teS1jYWxlbmRhci1tb250aC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SU15T3B0aW9uc30gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvbXktb3B0aW9ucy5pbnRlcmZhY2VcIjtcbmltcG9ydCB7S2V5Q29kZX0gZnJvbSBcIi4uLy4uL2VudW1zL2tleS1jb2RlLmVudW1cIjtcbmltcG9ydCB7QWN0aXZlVmlld30gZnJvbSBcIi4uLy4uL2VudW1zL2FjdGl2ZS12aWV3LmVudW1cIjtcbmltcG9ydCB7VXRpbFNlcnZpY2V9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hbmd1bGFyLW15ZGF0ZXBpY2tlci51dGlsLnNlcnZpY2VcIjtcbmltcG9ydCB7T1BUUywgTU9OVEhTfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzL2NvbnN0YW50c1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwibGliLW1vbnRoLXZpZXdcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9tb250aC12aWV3LmNvbXBvbmVudC5odG1sXCIsXG4gIHByb3ZpZGVyczogW1V0aWxTZXJ2aWNlXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBNb250aFZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSBvcHRzOiBJTXlPcHRpb25zO1xuICBASW5wdXQoKSBtb250aHM6IEFycmF5PEFycmF5PElNeUNhbGVuZGFyTW9udGg+PjtcbiAgQElucHV0KCkgdmlld0NoYW5nZWQ6IGJvb2xlYW47XG5cbiAgQE91dHB1dCgpIG1vbnRoQ2VsbENsaWNrZWQ6IEV2ZW50RW1pdHRlcjxJTXlDYWxlbmRhck1vbnRoPiA9IG5ldyBFdmVudEVtaXR0ZXI8SU15Q2FsZW5kYXJNb250aD4oKTtcbiAgQE91dHB1dCgpIG1vbnRoQ2VsbEtleURvd246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSB2aWV3QWN0aXZhdGVkOiBFdmVudEVtaXR0ZXI8QWN0aXZlVmlldz4gPSBuZXcgRXZlbnRFbWl0dGVyPEFjdGl2ZVZpZXc+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB1dGlsU2VydmljZTogVXRpbFNlcnZpY2UpIHsgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eShPUFRTKSkge1xuICAgICAgdGhpcy5vcHRzID0gY2hhbmdlc1tPUFRTXS5jdXJyZW50VmFsdWU7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KE1PTlRIUykpIHtcbiAgICAgIHRoaXMubW9udGhzID0gY2hhbmdlc1tNT05USFNdLmN1cnJlbnRWYWx1ZTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3QWN0aXZhdGVkLmVtaXQoQWN0aXZlVmlldy5Nb250aCk7XG4gIH1cblxuICBvbk1vbnRoQ2VsbENsaWNrZWQoZXZlbnQ6IGFueSwgY2VsbDogSU15Q2FsZW5kYXJNb250aCk6IHZvaWQge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgaWYgKGNlbGwuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm1vbnRoQ2VsbENsaWNrZWQuZW1pdChjZWxsKTtcbiAgfVxuXG4gIG9uTW9udGhDZWxsS2V5RG93bihldmVudDogYW55LCBjZWxsOiBJTXlDYWxlbmRhck1vbnRoKSB7XG4gICAgY29uc3Qga2V5Q29kZTogbnVtYmVyID0gdGhpcy51dGlsU2VydmljZS5nZXRLZXlDb2RlRnJvbUV2ZW50KGV2ZW50KTtcbiAgICBpZiAoa2V5Q29kZSAhPT0gS2V5Q29kZS50YWIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGlmIChrZXlDb2RlID09PSBLZXlDb2RlLmVudGVyIHx8IGtleUNvZGUgPT09IEtleUNvZGUuc3BhY2UpIHtcbiAgICAgICAgdGhpcy5vbk1vbnRoQ2VsbENsaWNrZWQoZXZlbnQsIGNlbGwpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodGhpcy5vcHRzLm1vdmVGb2N1c0J5QXJyb3dLZXlzKSB7XG4gICAgICAgIHRoaXMubW9udGhDZWxsS2V5RG93bi5lbWl0KGV2ZW50KVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19