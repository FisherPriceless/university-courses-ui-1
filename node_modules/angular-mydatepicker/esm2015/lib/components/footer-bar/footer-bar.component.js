/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from "@angular/core";
import { UtilService } from "../../services/angular-mydatepicker.util.service";
import { OPTS, SPACE_STR, EMPTY_STR } from "../../constants/constants";
export class FooterBarComponent {
    /**
     * @param {?} utilService
     */
    constructor(utilService) {
        this.utilService = utilService;
        this.footerBarTxtClicked = new EventEmitter();
        this.footerBarTxt = EMPTY_STR;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.hasOwnProperty(OPTS)) {
            this.opts = changes[OPTS].currentValue;
            const { dateFormat, monthLabels, todayTxt } = this.opts;
            /** @type {?} */
            const today = this.utilService.getToday();
            this.footerBarTxt = todayTxt + (todayTxt.length > 0 ? SPACE_STR : EMPTY_STR) +
                this.utilService.formatDate(today, dateFormat, monthLabels);
        }
    }
    /**
     * @return {?}
     */
    onFooterBarTxtClicked() {
        this.footerBarTxtClicked.emit();
    }
}
FooterBarComponent.decorators = [
    { type: Component, args: [{
                selector: "lib-footer-bar",
                template: "<div class=\"myDpFooterBar\">\n    <button type=\"button\" class=\"myDpHeaderBtn myDpFooterBtn\" (click)=\"onFooterBarTxtClicked()\">{{footerBarTxt}}</button>\n</div>",
                providers: [UtilService],
                encapsulation: ViewEncapsulation.None
            }] }
];
/** @nocollapse */
FooterBarComponent.ctorParameters = () => [
    { type: UtilService }
];
FooterBarComponent.propDecorators = {
    opts: [{ type: Input }],
    footerBarTxtClicked: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9vdGVyLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW15ZGF0ZXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2Zvb3Rlci1iYXIvZm9vdGVyLWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQWlCLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWxILE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxrREFBa0QsQ0FBQztBQUM3RSxPQUFPLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQVFyRSxNQUFNLE9BQU8sa0JBQWtCOzs7O0lBTTdCLFlBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBSmxDLHdCQUFtQixHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBRTdFLGlCQUFZLEdBQVcsU0FBUyxDQUFDO0lBRWUsQ0FBQzs7Ozs7SUFFakQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNoQyxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUM7a0JBRWpDLEVBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUMsR0FBRyxJQUFJLENBQUMsSUFBSTs7a0JBRS9DLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRTtZQUN6QyxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDMUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztTQUMvRDtJQUNILENBQUM7Ozs7SUFFRCxxQkFBcUI7UUFDbkIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxDQUFBO0lBQ2pDLENBQUM7OztZQTVCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsa0xBQTBDO2dCQUMxQyxTQUFTLEVBQUUsQ0FBQyxXQUFXLENBQUM7Z0JBQ3hCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2FBQ3RDOzs7O1lBUk8sV0FBVzs7O21CQVVoQixLQUFLO2tDQUNMLE1BQU07Ozs7SUFEUCxrQ0FBMEI7O0lBQzFCLGlEQUE2RTs7SUFFN0UsMENBQWlDOzs7OztJQUVyQix5Q0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtJTXlPcHRpb25zfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9teS1vcHRpb25zLmludGVyZmFjZVwiO1xuaW1wb3J0IHtVdGlsU2VydmljZX0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2FuZ3VsYXItbXlkYXRlcGlja2VyLnV0aWwuc2VydmljZVwiO1xuaW1wb3J0IHtPUFRTLCBTUEFDRV9TVFIsIEVNUFRZX1NUUn0gZnJvbSBcIi4uLy4uL2NvbnN0YW50cy9jb25zdGFudHNcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImxpYi1mb290ZXItYmFyXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vZm9vdGVyLWJhci5jb21wb25lbnQuaHRtbFwiLFxuICBwcm92aWRlcnM6IFtVdGlsU2VydmljZV0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgRm9vdGVyQmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgb3B0czogSU15T3B0aW9ucztcbiAgQE91dHB1dCgpIGZvb3RlckJhclR4dENsaWNrZWQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBmb290ZXJCYXJUeHQ6IHN0cmluZyA9IEVNUFRZX1NUUjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHV0aWxTZXJ2aWNlOiBVdGlsU2VydmljZSkgeyB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KE9QVFMpKSB7XG4gICAgICB0aGlzLm9wdHMgPSBjaGFuZ2VzW09QVFNdLmN1cnJlbnRWYWx1ZTtcblxuICAgICAgY29uc3Qge2RhdGVGb3JtYXQsIG1vbnRoTGFiZWxzLCB0b2RheVR4dH0gPSB0aGlzLm9wdHM7XG5cbiAgICAgIGNvbnN0IHRvZGF5ID0gdGhpcy51dGlsU2VydmljZS5nZXRUb2RheSgpO1xuICAgICAgdGhpcy5mb290ZXJCYXJUeHQgPSB0b2RheVR4dCArICh0b2RheVR4dC5sZW5ndGggPiAwID8gU1BBQ0VfU1RSIDogRU1QVFlfU1RSKSArIFxuICAgICAgICB0aGlzLnV0aWxTZXJ2aWNlLmZvcm1hdERhdGUodG9kYXksIGRhdGVGb3JtYXQsIG1vbnRoTGFiZWxzKTtcbiAgICB9XG4gIH1cblxuICBvbkZvb3RlckJhclR4dENsaWNrZWQoKTogdm9pZCB7XG4gICAgdGhpcy5mb290ZXJCYXJUeHRDbGlja2VkLmVtaXQoKVxuICB9XG59Il19