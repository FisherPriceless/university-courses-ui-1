/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from "@angular/core";
import { KeyCode } from "../../enums/key-code.enum";
import { ActiveView } from "../../enums/active-view.enum";
import { UtilService } from "../../services/angular-mydatepicker.util.service";
import { YEARS, OPTS } from "../../constants/constants";
var YearViewComponent = /** @class */ (function () {
    function YearViewComponent(utilService) {
        this.utilService = utilService;
        this.yearCellClicked = new EventEmitter();
        this.yearCellKeyDown = new EventEmitter();
        this.viewActivated = new EventEmitter();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    YearViewComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.hasOwnProperty(OPTS)) {
            this.opts = changes[OPTS].currentValue;
        }
        if (changes.hasOwnProperty(YEARS)) {
            this.years = changes[YEARS].currentValue;
        }
    };
    /**
     * @return {?}
     */
    YearViewComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.viewActivated.emit(ActiveView.Year);
    };
    /**
     * @param {?} event
     * @param {?} cell
     * @return {?}
     */
    YearViewComponent.prototype.onYearCellClicked = /**
     * @param {?} event
     * @param {?} cell
     * @return {?}
     */
    function (event, cell) {
        event.stopPropagation();
        if (cell.disabled) {
            return;
        }
        this.yearCellClicked.emit(cell);
    };
    /**
     * @param {?} event
     * @param {?} cell
     * @return {?}
     */
    YearViewComponent.prototype.onYearCellKeyDown = /**
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
                this.onYearCellClicked(event, cell);
            }
            else if (this.opts.moveFocusByArrowKeys) {
                this.yearCellKeyDown.emit(event);
            }
        }
    };
    YearViewComponent.decorators = [
        { type: Component, args: [{
                    selector: "lib-year-view",
                    template: "<table class=\"myDpYearTable\" [ngClass]=\"{'ng-myrtl': opts.rtl, 'myDpFooter': opts.showFooterToday, 'myDpNoFooter': !opts.showFooterToday, 'myDpViewChangeAnimation': opts.viewChangeAnimation && viewChanged}\">\n  <tbody>\n    <tr *ngFor=\"let yr of years\">\n      <td id=\"y_{{y.row}}_{{y.col}}\" class=\"y_{{y.row}}_{{y.col}} myDpYearcell\"\n          [ngClass]=\"{'myDpSelectedYear': y.selected, 'myDpDisabled': y.disabled, 'myDpTableSingleYear': !y.disabled}\"\n          *ngFor=\"let y of yr\" (click)=\"onYearCellClicked($event, y)\" (keydown)=\"onYearCellKeyDown($event, y)\" [attr.tabindex]=\"!y.disabled ? 0 : -1\">\n        <span class=\"myDpYearValue\" \n          [attr.aria-label]=\"[(1 + '/' + 1 + '/' + y.year | date:'yyyy')]\"\n          [ngClass]=\"{'myDpMarkCurrYear': y.currYear && opts.markCurrentYear}\">{{y.year}}</span>\n      </td>\n    </tr>\n  </tbody>\n</table>\n",
                    providers: [UtilService],
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    /** @nocollapse */
    YearViewComponent.ctorParameters = function () { return [
        { type: UtilService }
    ]; };
    YearViewComponent.propDecorators = {
        opts: [{ type: Input }],
        years: [{ type: Input }],
        viewChanged: [{ type: Input }],
        yearCellClicked: [{ type: Output }],
        yearCellKeyDown: [{ type: Output }],
        viewActivated: [{ type: Output }]
    };
    return YearViewComponent;
}());
export { YearViewComponent };
if (false) {
    /** @type {?} */
    YearViewComponent.prototype.opts;
    /** @type {?} */
    YearViewComponent.prototype.years;
    /** @type {?} */
    YearViewComponent.prototype.viewChanged;
    /** @type {?} */
    YearViewComponent.prototype.yearCellClicked;
    /** @type {?} */
    YearViewComponent.prototype.yearCellKeyDown;
    /** @type {?} */
    YearViewComponent.prototype.viewActivated;
    /**
     * @type {?}
     * @private
     */
    YearViewComponent.prototype.utilService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWVhci12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbXlkYXRlcGlja2VyLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMveWVhci12aWV3L3llYXItdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBNEIsTUFBTSxFQUFpQixpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUdqSSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDbEQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxrREFBa0QsQ0FBQztBQUM3RSxPQUFPLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRXREO0lBZUUsMkJBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBSmxDLG9CQUFlLEdBQWtDLElBQUksWUFBWSxFQUFtQixDQUFDO1FBQ3JGLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFDN0Qsa0JBQWEsR0FBNkIsSUFBSSxZQUFZLEVBQWMsQ0FBQztJQUVuQyxDQUFDOzs7OztJQUVqRCx1Q0FBVzs7OztJQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQztTQUN4QztRQUNELElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUM7U0FDMUM7SUFDSCxDQUFDOzs7O0lBRUQsMkNBQWU7OztJQUFmO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNDLENBQUM7Ozs7OztJQUVELDZDQUFpQjs7Ozs7SUFBakIsVUFBa0IsS0FBVSxFQUFFLElBQXFCO1FBQ2pELEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUV4QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7Ozs7O0lBRUQsNkNBQWlCOzs7OztJQUFqQixVQUFrQixLQUFVLEVBQUUsSUFBcUI7O1lBQzNDLE9BQU8sR0FBVyxJQUFJLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQztRQUNuRSxJQUFJLE9BQU8sS0FBSyxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQzNCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUV2QixJQUFJLE9BQU8sS0FBSyxPQUFPLENBQUMsS0FBSyxJQUFJLE9BQU8sS0FBSyxPQUFPLENBQUMsS0FBSyxFQUFFO2dCQUMxRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3JDO2lCQUNJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtnQkFDdkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7YUFDakM7U0FDRjtJQUNILENBQUM7O2dCQXBERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLHc0QkFBeUM7b0JBQ3pDLFNBQVMsRUFBRSxDQUFDLFdBQVcsQ0FBQztvQkFDeEIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7aUJBQ3RDOzs7O2dCQVJPLFdBQVc7Ozt1QkFVaEIsS0FBSzt3QkFDTCxLQUFLOzhCQUNMLEtBQUs7a0NBRUwsTUFBTTtrQ0FDTixNQUFNO2dDQUNOLE1BQU07O0lBd0NULHdCQUFDO0NBQUEsQUFyREQsSUFxREM7U0EvQ1ksaUJBQWlCOzs7SUFDNUIsaUNBQTBCOztJQUMxQixrQ0FBOEM7O0lBQzlDLHdDQUE4Qjs7SUFFOUIsNENBQStGOztJQUMvRiw0Q0FBdUU7O0lBQ3ZFLDBDQUFtRjs7Ozs7SUFFdkUsd0NBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzLCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7SU15Q2FsZW5kYXJZZWFyfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9teS1jYWxlbmRhci15ZWFyLmludGVyZmFjZVwiO1xuaW1wb3J0IHtJTXlPcHRpb25zfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9teS1vcHRpb25zLmludGVyZmFjZVwiO1xuaW1wb3J0IHtLZXlDb2RlfSBmcm9tIFwiLi4vLi4vZW51bXMva2V5LWNvZGUuZW51bVwiO1xuaW1wb3J0IHtBY3RpdmVWaWV3fSBmcm9tIFwiLi4vLi4vZW51bXMvYWN0aXZlLXZpZXcuZW51bVwiO1xuaW1wb3J0IHtVdGlsU2VydmljZX0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2FuZ3VsYXItbXlkYXRlcGlja2VyLnV0aWwuc2VydmljZVwiO1xuaW1wb3J0IHtZRUFSUywgT1BUU30gZnJvbSBcIi4uLy4uL2NvbnN0YW50cy9jb25zdGFudHNcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImxpYi15ZWFyLXZpZXdcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi95ZWFyLXZpZXcuY29tcG9uZW50Lmh0bWxcIixcbiAgcHJvdmlkZXJzOiBbVXRpbFNlcnZpY2VdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIFllYXJWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KCkgb3B0czogSU15T3B0aW9ucztcbiAgQElucHV0KCkgeWVhcnM6IEFycmF5PEFycmF5PElNeUNhbGVuZGFyWWVhcj4+O1xuICBASW5wdXQoKSB2aWV3Q2hhbmdlZDogYm9vbGVhbjtcblxuICBAT3V0cHV0KCkgeWVhckNlbGxDbGlja2VkOiBFdmVudEVtaXR0ZXI8SU15Q2FsZW5kYXJZZWFyPiA9IG5ldyBFdmVudEVtaXR0ZXI8SU15Q2FsZW5kYXJZZWFyPigpO1xuICBAT3V0cHV0KCkgeWVhckNlbGxLZXlEb3duOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgdmlld0FjdGl2YXRlZDogRXZlbnRFbWl0dGVyPEFjdGl2ZVZpZXc+ID0gbmV3IEV2ZW50RW1pdHRlcjxBY3RpdmVWaWV3PigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdXRpbFNlcnZpY2U6IFV0aWxTZXJ2aWNlKSB7IH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoT1BUUykpIHtcbiAgICAgIHRoaXMub3B0cyA9IGNoYW5nZXNbT1BUU10uY3VycmVudFZhbHVlO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eShZRUFSUykpIHtcbiAgICAgIHRoaXMueWVhcnMgPSBjaGFuZ2VzW1lFQVJTXS5jdXJyZW50VmFsdWU7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMudmlld0FjdGl2YXRlZC5lbWl0KEFjdGl2ZVZpZXcuWWVhcik7XG4gIH1cblxuICBvblllYXJDZWxsQ2xpY2tlZChldmVudDogYW55LCBjZWxsOiBJTXlDYWxlbmRhclllYXIpOiB2b2lkIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIGlmIChjZWxsLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy55ZWFyQ2VsbENsaWNrZWQuZW1pdChjZWxsKTtcbiAgfVxuXG4gIG9uWWVhckNlbGxLZXlEb3duKGV2ZW50OiBhbnksIGNlbGw6IElNeUNhbGVuZGFyWWVhcikge1xuICAgIGNvbnN0IGtleUNvZGU6IG51bWJlciA9IHRoaXMudXRpbFNlcnZpY2UuZ2V0S2V5Q29kZUZyb21FdmVudChldmVudCk7XG4gICAgaWYgKGtleUNvZGUgIT09IEtleUNvZGUudGFiKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBpZiAoa2V5Q29kZSA9PT0gS2V5Q29kZS5lbnRlciB8fCBrZXlDb2RlID09PSBLZXlDb2RlLnNwYWNlKSB7XG4gICAgICAgIHRoaXMub25ZZWFyQ2VsbENsaWNrZWQoZXZlbnQsIGNlbGwpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodGhpcy5vcHRzLm1vdmVGb2N1c0J5QXJyb3dLZXlzKSB7XG4gICAgICAgIHRoaXMueWVhckNlbGxLZXlEb3duLmVtaXQoZXZlbnQpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=