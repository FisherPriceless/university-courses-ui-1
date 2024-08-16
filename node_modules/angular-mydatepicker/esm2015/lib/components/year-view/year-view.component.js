/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from "@angular/core";
import { KeyCode } from "../../enums/key-code.enum";
import { ActiveView } from "../../enums/active-view.enum";
import { UtilService } from "../../services/angular-mydatepicker.util.service";
import { YEARS, OPTS } from "../../constants/constants";
export class YearViewComponent {
    /**
     * @param {?} utilService
     */
    constructor(utilService) {
        this.utilService = utilService;
        this.yearCellClicked = new EventEmitter();
        this.yearCellKeyDown = new EventEmitter();
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
        if (changes.hasOwnProperty(YEARS)) {
            this.years = changes[YEARS].currentValue;
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.viewActivated.emit(ActiveView.Year);
    }
    /**
     * @param {?} event
     * @param {?} cell
     * @return {?}
     */
    onYearCellClicked(event, cell) {
        event.stopPropagation();
        if (cell.disabled) {
            return;
        }
        this.yearCellClicked.emit(cell);
    }
    /**
     * @param {?} event
     * @param {?} cell
     * @return {?}
     */
    onYearCellKeyDown(event, cell) {
        /** @type {?} */
        const keyCode = this.utilService.getKeyCodeFromEvent(event);
        if (keyCode !== KeyCode.tab) {
            event.preventDefault();
            if (keyCode === KeyCode.enter || keyCode === KeyCode.space) {
                this.onYearCellClicked(event, cell);
            }
            else if (this.opts.moveFocusByArrowKeys) {
                this.yearCellKeyDown.emit(event);
            }
        }
    }
}
YearViewComponent.decorators = [
    { type: Component, args: [{
                selector: "lib-year-view",
                template: "<table class=\"myDpYearTable\" [ngClass]=\"{'ng-myrtl': opts.rtl, 'myDpFooter': opts.showFooterToday, 'myDpNoFooter': !opts.showFooterToday, 'myDpViewChangeAnimation': opts.viewChangeAnimation && viewChanged}\">\n  <tbody>\n    <tr *ngFor=\"let yr of years\">\n      <td id=\"y_{{y.row}}_{{y.col}}\" class=\"y_{{y.row}}_{{y.col}} myDpYearcell\"\n          [ngClass]=\"{'myDpSelectedYear': y.selected, 'myDpDisabled': y.disabled, 'myDpTableSingleYear': !y.disabled}\"\n          *ngFor=\"let y of yr\" (click)=\"onYearCellClicked($event, y)\" (keydown)=\"onYearCellKeyDown($event, y)\" [attr.tabindex]=\"!y.disabled ? 0 : -1\">\n        <span class=\"myDpYearValue\" \n          [attr.aria-label]=\"[(1 + '/' + 1 + '/' + y.year | date:'yyyy')]\"\n          [ngClass]=\"{'myDpMarkCurrYear': y.currYear && opts.markCurrentYear}\">{{y.year}}</span>\n      </td>\n    </tr>\n  </tbody>\n</table>\n",
                providers: [UtilService],
                encapsulation: ViewEncapsulation.None
            }] }
];
/** @nocollapse */
YearViewComponent.ctorParameters = () => [
    { type: UtilService }
];
YearViewComponent.propDecorators = {
    opts: [{ type: Input }],
    years: [{ type: Input }],
    viewChanged: [{ type: Input }],
    yearCellClicked: [{ type: Output }],
    yearCellKeyDown: [{ type: Output }],
    viewActivated: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWVhci12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbXlkYXRlcGlja2VyLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMveWVhci12aWV3L3llYXItdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBNEIsTUFBTSxFQUFpQixpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUdqSSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDbEQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxrREFBa0QsQ0FBQztBQUM3RSxPQUFPLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBUXRELE1BQU0sT0FBTyxpQkFBaUI7Ozs7SUFTNUIsWUFBb0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFKbEMsb0JBQWUsR0FBa0MsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFDckYsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUM3RCxrQkFBYSxHQUE2QixJQUFJLFlBQVksRUFBYyxDQUFDO0lBRW5DLENBQUM7Ozs7O0lBRWpELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDaEMsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDO1NBQ3hDO1FBQ0QsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FBQztTQUMxQztJQUNILENBQUM7Ozs7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNDLENBQUM7Ozs7OztJQUVELGlCQUFpQixDQUFDLEtBQVUsRUFBRSxJQUFxQjtRQUNqRCxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFeEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Ozs7OztJQUVELGlCQUFpQixDQUFDLEtBQVUsRUFBRSxJQUFxQjs7Y0FDM0MsT0FBTyxHQUFXLElBQUksQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDO1FBQ25FLElBQUksT0FBTyxLQUFLLE9BQU8sQ0FBQyxHQUFHLEVBQUU7WUFDM0IsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBRXZCLElBQUksT0FBTyxLQUFLLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxLQUFLLE9BQU8sQ0FBQyxLQUFLLEVBQUU7Z0JBQzFELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDckM7aUJBQ0ksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFO2dCQUN2QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTthQUNqQztTQUNGO0lBQ0gsQ0FBQzs7O1lBcERGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsdzRCQUF5QztnQkFDekMsU0FBUyxFQUFFLENBQUMsV0FBVyxDQUFDO2dCQUN4QixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTthQUN0Qzs7OztZQVJPLFdBQVc7OzttQkFVaEIsS0FBSztvQkFDTCxLQUFLOzBCQUNMLEtBQUs7OEJBRUwsTUFBTTs4QkFDTixNQUFNOzRCQUNOLE1BQU07Ozs7SUFOUCxpQ0FBMEI7O0lBQzFCLGtDQUE4Qzs7SUFDOUMsd0NBQThCOztJQUU5Qiw0Q0FBK0Y7O0lBQy9GLDRDQUF1RTs7SUFDdkUsMENBQW1GOzs7OztJQUV2RSx3Q0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtJTXlDYWxlbmRhclllYXJ9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL215LWNhbGVuZGFyLXllYXIuaW50ZXJmYWNlXCI7XG5pbXBvcnQge0lNeU9wdGlvbnN9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL215LW9wdGlvbnMuaW50ZXJmYWNlXCI7XG5pbXBvcnQge0tleUNvZGV9IGZyb20gXCIuLi8uLi9lbnVtcy9rZXktY29kZS5lbnVtXCI7XG5pbXBvcnQge0FjdGl2ZVZpZXd9IGZyb20gXCIuLi8uLi9lbnVtcy9hY3RpdmUtdmlldy5lbnVtXCI7XG5pbXBvcnQge1V0aWxTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvYW5ndWxhci1teWRhdGVwaWNrZXIudXRpbC5zZXJ2aWNlXCI7XG5pbXBvcnQge1lFQVJTLCBPUFRTfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzL2NvbnN0YW50c1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwibGliLXllYXItdmlld1wiLFxuICB0ZW1wbGF0ZVVybDogXCIuL3llYXItdmlldy5jb21wb25lbnQuaHRtbFwiLFxuICBwcm92aWRlcnM6IFtVdGlsU2VydmljZV0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgWWVhclZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSBvcHRzOiBJTXlPcHRpb25zO1xuICBASW5wdXQoKSB5ZWFyczogQXJyYXk8QXJyYXk8SU15Q2FsZW5kYXJZZWFyPj47XG4gIEBJbnB1dCgpIHZpZXdDaGFuZ2VkOiBib29sZWFuO1xuXG4gIEBPdXRwdXQoKSB5ZWFyQ2VsbENsaWNrZWQ6IEV2ZW50RW1pdHRlcjxJTXlDYWxlbmRhclllYXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxJTXlDYWxlbmRhclllYXI+KCk7XG4gIEBPdXRwdXQoKSB5ZWFyQ2VsbEtleURvd246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSB2aWV3QWN0aXZhdGVkOiBFdmVudEVtaXR0ZXI8QWN0aXZlVmlldz4gPSBuZXcgRXZlbnRFbWl0dGVyPEFjdGl2ZVZpZXc+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB1dGlsU2VydmljZTogVXRpbFNlcnZpY2UpIHsgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eShPUFRTKSkge1xuICAgICAgdGhpcy5vcHRzID0gY2hhbmdlc1tPUFRTXS5jdXJyZW50VmFsdWU7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KFlFQVJTKSkge1xuICAgICAgdGhpcy55ZWFycyA9IGNoYW5nZXNbWUVBUlNdLmN1cnJlbnRWYWx1ZTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3QWN0aXZhdGVkLmVtaXQoQWN0aXZlVmlldy5ZZWFyKTtcbiAgfVxuXG4gIG9uWWVhckNlbGxDbGlja2VkKGV2ZW50OiBhbnksIGNlbGw6IElNeUNhbGVuZGFyWWVhcik6IHZvaWQge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgaWYgKGNlbGwuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnllYXJDZWxsQ2xpY2tlZC5lbWl0KGNlbGwpO1xuICB9XG5cbiAgb25ZZWFyQ2VsbEtleURvd24oZXZlbnQ6IGFueSwgY2VsbDogSU15Q2FsZW5kYXJZZWFyKSB7XG4gICAgY29uc3Qga2V5Q29kZTogbnVtYmVyID0gdGhpcy51dGlsU2VydmljZS5nZXRLZXlDb2RlRnJvbUV2ZW50KGV2ZW50KTtcbiAgICBpZiAoa2V5Q29kZSAhPT0gS2V5Q29kZS50YWIpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGlmIChrZXlDb2RlID09PSBLZXlDb2RlLmVudGVyIHx8IGtleUNvZGUgPT09IEtleUNvZGUuc3BhY2UpIHtcbiAgICAgICAgdGhpcy5vblllYXJDZWxsQ2xpY2tlZChldmVudCwgY2VsbCk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0aGlzLm9wdHMubW92ZUZvY3VzQnlBcnJvd0tleXMpIHtcbiAgICAgICAgdGhpcy55ZWFyQ2VsbEtleURvd24uZW1pdChldmVudClcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==