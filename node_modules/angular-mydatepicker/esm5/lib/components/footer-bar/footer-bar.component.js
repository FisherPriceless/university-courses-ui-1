/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from "@angular/core";
import { UtilService } from "../../services/angular-mydatepicker.util.service";
import { OPTS, SPACE_STR, EMPTY_STR } from "../../constants/constants";
var FooterBarComponent = /** @class */ (function () {
    function FooterBarComponent(utilService) {
        this.utilService = utilService;
        this.footerBarTxtClicked = new EventEmitter();
        this.footerBarTxt = EMPTY_STR;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    FooterBarComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.hasOwnProperty(OPTS)) {
            this.opts = changes[OPTS].currentValue;
            var _a = this.opts, dateFormat = _a.dateFormat, monthLabels = _a.monthLabels, todayTxt = _a.todayTxt;
            /** @type {?} */
            var today = this.utilService.getToday();
            this.footerBarTxt = todayTxt + (todayTxt.length > 0 ? SPACE_STR : EMPTY_STR) +
                this.utilService.formatDate(today, dateFormat, monthLabels);
        }
    };
    /**
     * @return {?}
     */
    FooterBarComponent.prototype.onFooterBarTxtClicked = /**
     * @return {?}
     */
    function () {
        this.footerBarTxtClicked.emit();
    };
    FooterBarComponent.decorators = [
        { type: Component, args: [{
                    selector: "lib-footer-bar",
                    template: "<div class=\"myDpFooterBar\">\n    <button type=\"button\" class=\"myDpHeaderBtn myDpFooterBtn\" (click)=\"onFooterBarTxtClicked()\">{{footerBarTxt}}</button>\n</div>",
                    providers: [UtilService],
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    /** @nocollapse */
    FooterBarComponent.ctorParameters = function () { return [
        { type: UtilService }
    ]; };
    FooterBarComponent.propDecorators = {
        opts: [{ type: Input }],
        footerBarTxtClicked: [{ type: Output }]
    };
    return FooterBarComponent;
}());
export { FooterBarComponent };
if (false) {
    /** @type {?} */
    FooterBarComponent.prototype.opts;
    /** @type {?} */
    FooterBarComponent.prototype.footerBarTxtClicked;
    /** @type {?} */
    FooterBarComponent.prototype.footerBarTxt;
    /**
     * @type {?}
     * @private
     */
    FooterBarComponent.prototype.utilService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9vdGVyLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW15ZGF0ZXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2Zvb3Rlci1iYXIvZm9vdGVyLWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQWlCLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWxILE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxrREFBa0QsQ0FBQztBQUM3RSxPQUFPLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUVyRTtJQVlFLDRCQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUpsQyx3QkFBbUIsR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUU3RSxpQkFBWSxHQUFXLFNBQVMsQ0FBQztJQUVlLENBQUM7Ozs7O0lBRWpELHdDQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDaEMsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDO1lBRWpDLElBQUEsY0FBK0MsRUFBOUMsMEJBQVUsRUFBRSw0QkFBVyxFQUFFLHNCQUFxQjs7Z0JBRS9DLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRTtZQUN6QyxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDMUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztTQUMvRDtJQUNILENBQUM7Ozs7SUFFRCxrREFBcUI7OztJQUFyQjtRQUNFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUNqQyxDQUFDOztnQkE1QkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLGtMQUEwQztvQkFDMUMsU0FBUyxFQUFFLENBQUMsV0FBVyxDQUFDO29CQUN4QixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtpQkFDdEM7Ozs7Z0JBUk8sV0FBVzs7O3VCQVVoQixLQUFLO3NDQUNMLE1BQU07O0lBcUJULHlCQUFDO0NBQUEsQUE3QkQsSUE2QkM7U0F2Qlksa0JBQWtCOzs7SUFDN0Isa0NBQTBCOztJQUMxQixpREFBNkU7O0lBRTdFLDBDQUFpQzs7Ozs7SUFFckIseUNBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzLCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7SU15T3B0aW9uc30gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvbXktb3B0aW9ucy5pbnRlcmZhY2VcIjtcbmltcG9ydCB7VXRpbFNlcnZpY2V9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9hbmd1bGFyLW15ZGF0ZXBpY2tlci51dGlsLnNlcnZpY2VcIjtcbmltcG9ydCB7T1BUUywgU1BBQ0VfU1RSLCBFTVBUWV9TVFJ9IGZyb20gXCIuLi8uLi9jb25zdGFudHMvY29uc3RhbnRzXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJsaWItZm9vdGVyLWJhclwiLFxuICB0ZW1wbGF0ZVVybDogXCIuL2Zvb3Rlci1iYXIuY29tcG9uZW50Lmh0bWxcIixcbiAgcHJvdmlkZXJzOiBbVXRpbFNlcnZpY2VdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIEZvb3RlckJhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIG9wdHM6IElNeU9wdGlvbnM7XG4gIEBPdXRwdXQoKSBmb290ZXJCYXJUeHRDbGlja2VkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgZm9vdGVyQmFyVHh0OiBzdHJpbmcgPSBFTVBUWV9TVFI7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB1dGlsU2VydmljZTogVXRpbFNlcnZpY2UpIHsgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eShPUFRTKSkge1xuICAgICAgdGhpcy5vcHRzID0gY2hhbmdlc1tPUFRTXS5jdXJyZW50VmFsdWU7XG5cbiAgICAgIGNvbnN0IHtkYXRlRm9ybWF0LCBtb250aExhYmVscywgdG9kYXlUeHR9ID0gdGhpcy5vcHRzO1xuXG4gICAgICBjb25zdCB0b2RheSA9IHRoaXMudXRpbFNlcnZpY2UuZ2V0VG9kYXkoKTtcbiAgICAgIHRoaXMuZm9vdGVyQmFyVHh0ID0gdG9kYXlUeHQgKyAodG9kYXlUeHQubGVuZ3RoID4gMCA/IFNQQUNFX1NUUiA6IEVNUFRZX1NUUikgKyBcbiAgICAgICAgdGhpcy51dGlsU2VydmljZS5mb3JtYXREYXRlKHRvZGF5LCBkYXRlRm9ybWF0LCBtb250aExhYmVscyk7XG4gICAgfVxuICB9XG5cbiAgb25Gb290ZXJCYXJUeHRDbGlja2VkKCk6IHZvaWQge1xuICAgIHRoaXMuZm9vdGVyQmFyVHh0Q2xpY2tlZC5lbWl0KClcbiAgfVxufSJdfQ==