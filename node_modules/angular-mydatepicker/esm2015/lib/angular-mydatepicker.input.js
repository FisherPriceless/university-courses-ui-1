/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, ElementRef, ViewContainerRef, Renderer2, ChangeDetectorRef, ComponentFactoryResolver, forwardRef, EventEmitter, Output, HostListener } from "@angular/core";
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from "@angular/forms";
import { CalendarComponent } from "./components/calendar/calendar.component";
import { LocaleService } from "./services/angular-mydatepicker.locale.service";
import { UtilService } from "./services/angular-mydatepicker.util.service";
import { DefaultConfigService } from "./services/angular-mydatepicker.config.service";
import { CalToggle } from "./enums/cal-toggle.enum";
import { Year } from "./enums/year.enum";
import { KeyCode } from "./enums/key-code.enum";
import { CalAnimation } from "./enums/cal-animation.enum";
import { KEYUP, BLUR, EMPTY_STR, DISABLED, CLICK, BODY, VALUE, PREVENT_CLOSE_TIMEOUT, OPTIONS, DEFAULT_MONTH, LOCALE, OBJECT, PX, INNER_HTML, ANIMATION_END, ANIMATION_TIMEOUT } from "./constants/constants";
/** @type {?} */
const NGX_DP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => AngularMyDatePickerDirective)),
    multi: true
};
/** @type {?} */
const NGX_DP_VALIDATORS = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => AngularMyDatePickerDirective)),
    multi: true
};
export class AngularMyDatePickerDirective {
    /**
     * @param {?} localeService
     * @param {?} utilService
     * @param {?} vcRef
     * @param {?} cfr
     * @param {?} renderer
     * @param {?} cdr
     * @param {?} elem
     * @param {?} config
     */
    constructor(localeService, utilService, vcRef, cfr, renderer, cdr, elem, config) {
        this.localeService = localeService;
        this.utilService = utilService;
        this.vcRef = vcRef;
        this.cfr = cfr;
        this.renderer = renderer;
        this.cdr = cdr;
        this.elem = elem;
        this.config = config;
        this.defaultMonth = { defMonth: EMPTY_STR, overrideSelection: false };
        this.dateChanged = new EventEmitter();
        this.inputFieldChanged = new EventEmitter();
        this.calendarViewChanged = new EventEmitter();
        this.calendarToggle = new EventEmitter();
        this.rangeDateSelection = new EventEmitter();
        this.viewActivated = new EventEmitter();
        this.cRef = null;
        this.hostText = EMPTY_STR;
        this.preventClose = false;
        this.disabled = false;
        this.selectedValue = null;
        this.onChangeCb = (/**
         * @return {?}
         */
        () => { });
        this.onTouchedCb = (/**
         * @return {?}
         */
        () => { });
        this.onClickWrapper = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => this.onClick(event));
        this.onAnimateWrapper = (/**
         * @param {?} reason
         * @return {?}
         */
        (reason) => this.animationEnd(reason));
        this.opts = this.config.getDefaultConfig();
        this.parseOptions(this.opts);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeyUp(event) {
        /** @type {?} */
        const keyCode = this.utilService.getKeyCodeFromEvent(event);
        if (this.ignoreKeyPress(keyCode)) {
            return;
        }
        if (keyCode === KeyCode.esc) {
            this.closeSelector(CalToggle.CloseByEsc);
        }
        else {
            const { dateRange, dateFormat, monthLabels, dateRangeDatesDelimiter } = this.opts;
            /** @type {?} */
            const value = this.getHostValue();
            /** @type {?} */
            let dateModel = null;
            /** @type {?} */
            let valid = false;
            /** @type {?} */
            let validateOpts = null;
            if (!dateRange) {
                validateOpts = { validateDisabledDates: true, selectedValue: this.utilService.getSelectedValue(this.selectedValue, false) };
                /** @type {?} */
                const date = this.utilService.isDateValid(value, this.opts, validateOpts);
                valid = this.utilService.isInitializedDate(date);
                if (valid) {
                    dateModel = this.utilService.getDateModel(date, null, dateFormat, monthLabels, dateRangeDatesDelimiter);
                }
            }
            else {
                validateOpts = { validateDisabledDates: true, selectedValue: this.utilService.getSelectedValue(this.selectedValue, true) };
                /** @type {?} */
                const range = this.utilService.isDateValidDateRange(value, this.opts, validateOpts);
                const { begin, end } = range;
                valid = this.utilService.isInitializedDate(begin) && this.utilService.isInitializedDate(end);
                if (valid) {
                    dateModel = this.utilService.getDateModel(null, range, dateFormat, monthLabels, dateRangeDatesDelimiter);
                }
            }
            this.onChangeCb(dateModel);
            this.emitInputFieldChanged(value, valid);
        }
    }
    /**
     * @return {?}
     */
    onBlur() {
        const { inputFieldValidation, dateRange, dateFormat, monthLabels, dateRangeDatesDelimiter, closeSelectorOnDateSelect } = this.opts;
        if (inputFieldValidation) {
            /** @type {?} */
            const value = this.getHostValue();
            /** @type {?} */
            let valid = false;
            /** @type {?} */
            let validateOpts = null;
            if (!dateRange) {
                validateOpts = { validateDisabledDates: true, selectedValue: this.utilService.getSelectedValue(this.selectedValue, false) };
                /** @type {?} */
                const date = this.utilService.isDateValid(value, this.opts, validateOpts);
                valid = this.utilService.isInitializedDate(date);
                if (valid && this.hostText !== value) {
                    // Valid date
                    /** @type {?} */
                    const dateModel = this.utilService.getDateModel(date, null, dateFormat, monthLabels, dateRangeDatesDelimiter);
                    this.emitDateChanged(dateModel);
                    this.updateModel(dateModel);
                    if (closeSelectorOnDateSelect) {
                        this.closeSelector(CalToggle.CloseByDateSel);
                    }
                }
            }
            else {
                validateOpts = { validateDisabledDates: true, selectedValue: this.utilService.getSelectedValue(this.selectedValue, true) };
                /** @type {?} */
                const dateRange = this.utilService.isDateValidDateRange(value, this.opts, validateOpts);
                const { begin, end } = dateRange;
                valid = this.utilService.isInitializedDate(begin) && this.utilService.isInitializedDate(end);
                if (valid && this.hostText !== value) {
                    // Valid date range
                    /** @type {?} */
                    const dateModel = this.utilService.getDateModel(null, dateRange, dateFormat, monthLabels, dateRangeDatesDelimiter);
                    this.emitDateChanged(dateModel);
                    this.updateModel(dateModel);
                    if (closeSelectorOnDateSelect) {
                        this.closeSelector(CalToggle.CloseByDateSel);
                    }
                }
            }
            if (!valid && this.hostText !== value) {
                if (value === EMPTY_STR) {
                    this.clearDate();
                }
                else {
                    this.onChangeCb(null);
                }
            }
            this.hostText = value;
        }
        this.onTouchedCb();
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    onClick(event) {
        if (this.opts.closeSelectorOnDocumentClick && !this.preventClose && event.target && this.cRef
            && this.elem.nativeElement !== event.target && !this.cRef.location.nativeElement.contains(event.target)
            && !this.disabled) {
            this.closeSelector(CalToggle.CloseByOutClick);
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.hasOwnProperty(LOCALE)) {
            this.setLocaleOptions();
        }
        if (changes.hasOwnProperty(DEFAULT_MONTH)) {
            /** @type {?} */
            let dm = changes[DEFAULT_MONTH].currentValue;
            if (typeof dm === OBJECT) {
                if (!dm.overrideSelection) {
                    dm.overrideSelection = false;
                }
            }
            else {
                dm = { defMonth: dm, overrideSelection: false };
            }
            this.defaultMonth = dm;
        }
        if (changes.hasOwnProperty(OPTIONS)) {
            this.parseOptions(changes[OPTIONS].currentValue);
        }
        if (this.cRef) {
            this.cRef.instance.refreshComponent(this.opts, this.defaultMonth, this.selectedValue, this.getHostValue());
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.closeCalendar();
    }
    /**
     * @return {?}
     */
    setLocaleOptions() {
        /** @type {?} */
        const opts = this.localeService.getLocaleOptions(this.locale);
        Object.keys(opts).forEach((/**
         * @param {?} k
         * @return {?}
         */
        (k) => {
            ((/** @type {?} */ (this.opts)))[k] = opts[k];
        }));
    }
    /**
     * @param {?} opts
     * @return {?}
     */
    parseOptions(opts) {
        if (opts) {
            Object.keys(opts).forEach((/**
             * @param {?} k
             * @return {?}
             */
            (k) => {
                ((/** @type {?} */ (this.opts)))[k] = opts[k];
            }));
        }
        const { minYear, maxYear, openSelectorTopOfInput, inline } = this.opts;
        if (minYear < Year.min) {
            this.opts.minYear = Year.min;
        }
        if (maxYear > Year.max) {
            this.opts.maxYear = Year.max;
        }
        if (openSelectorTopOfInput || inline) {
            this.opts.showSelectorArrow = false;
        }
        if (inline) {
            this.openCalendar();
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (this.disabled) {
            return;
        }
        /** @type {?} */
        let validateOpts = null;
        const { dateFormat, monthLabels, dateRangeDatesDelimiter, inline } = this.opts;
        if (!value) {
            this.setHostValue(EMPTY_STR);
            this.emitInputFieldChanged(EMPTY_STR, false);
            if (this.cRef) {
                this.cRef.instance.resetDateValue();
            }
        }
        else if (!value.isRange && value.singleDate) {
            // single date
            let { date, jsDate } = value.singleDate;
            if (!date) {
                date = this.utilService.jsDateToMyDate(jsDate);
            }
            /** @type {?} */
            const formatted = this.utilService.formatDate(date, dateFormat, monthLabels);
            validateOpts = { validateDisabledDates: false, selectedValue: this.utilService.getSelectedValue(this.selectedValue, false) };
            /** @type {?} */
            const valid = this.utilService.isInitializedDate(this.utilService.isDateValid(formatted, this.opts, validateOpts));
            if (valid) {
                this.setHostValue(formatted);
                this.emitInputFieldChanged(formatted, valid);
                this.setSelectedValue(this.utilService.getDateModel(date, null, dateFormat, monthLabels, dateRangeDatesDelimiter));
                if (this.cRef) {
                    this.cRef.instance.refreshComponent(this.opts, this.defaultMonth, this.selectedValue, this.getHostValue());
                }
            }
        }
        else if (value.isRange && value.dateRange) {
            // date range
            let { beginDate, beginJsDate, endDate, endJsDate } = value.dateRange;
            if (!beginDate || !endDate) {
                beginDate = this.utilService.jsDateToMyDate(beginJsDate);
                endDate = this.utilService.jsDateToMyDate(endJsDate);
            }
            /** @type {?} */
            const formatted = this.utilService.formatDate(beginDate, dateFormat, monthLabels) + dateRangeDatesDelimiter +
                this.utilService.formatDate(endDate, dateFormat, monthLabels);
            validateOpts = { validateDisabledDates: false, selectedValue: this.utilService.getSelectedValue(this.selectedValue, true) };
            const { begin, end } = this.utilService.isDateValidDateRange(formatted, this.opts, validateOpts);
            /** @type {?} */
            const valid = this.utilService.isInitializedDate(begin) && this.utilService.isInitializedDate(end);
            if (valid) {
                this.setHostValue(formatted);
                this.emitInputFieldChanged(formatted, valid);
                /** @type {?} */
                const dateRange = { begin: beginDate, end: endDate };
                this.setSelectedValue(this.utilService.getDateModel(null, dateRange, dateFormat, monthLabels, dateRangeDatesDelimiter));
                if (this.cRef) {
                    this.cRef.instance.refreshComponent(this.opts, this.defaultMonth, this.selectedValue, this.getHostValue());
                }
            }
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCb = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCb = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.renderer.setProperty(this.elem.nativeElement, DISABLED, isDisabled);
        if (isDisabled) {
            this.closeCalendar();
        }
    }
    /**
     * @param {?} c
     * @return {?}
     */
    validate(c) {
        /** @type {?} */
        const value = this.getHostValue();
        if (value === null || value === EMPTY_STR) {
            return null;
        }
        /** @type {?} */
        let validateOpts = null;
        if (!this.opts.dateRange) {
            validateOpts = { validateDisabledDates: true, selectedValue: this.utilService.getSelectedValue(this.selectedValue, false) };
            /** @type {?} */
            const date = this.utilService.isDateValid(value, this.opts, validateOpts);
            if (!this.utilService.isInitializedDate(date)) {
                return { invalidDateFormat: true };
            }
        }
        else {
            validateOpts = { validateDisabledDates: true, selectedValue: this.utilService.getSelectedValue(this.selectedValue, true) };
            const { begin, end } = this.utilService.isDateValidDateRange(value, this.opts, validateOpts);
            if (!this.utilService.isInitializedDate(begin) || !this.utilService.isInitializedDate(end)) {
                return { invalidDateFormat: true };
            }
        }
        return null;
    }
    /**
     * @return {?}
     */
    openCalendar() {
        if (this.disabled) {
            return;
        }
        this.preventClose = true;
        this.cdr.detectChanges();
        if (this.cRef === null) {
            this.cRef = this.vcRef.createComponent(this.cfr.resolveComponentFactory(CalendarComponent));
            this.appendSelector(this.cRef.location.nativeElement);
            this.cRef.instance.initializeComponent(this.opts, this.defaultMonth, this.selectedValue, this.getHostValue(), this.getSelectorPosition(this.elem.nativeElement), (/**
             * @param {?} dm
             * @param {?} close
             * @return {?}
             */
            (dm, close) => {
                this.focusToInput();
                this.emitDateChanged(dm);
                this.emitInputFieldChanged(this.utilService.getFormattedDate(dm), true);
                this.updateModel(dm);
                if (close) {
                    this.closeSelector(CalToggle.CloseByDateSel);
                }
            }), (/**
             * @param {?} cvc
             * @return {?}
             */
            (cvc) => {
                this.emitCalendarChanged(cvc);
            }), (/**
             * @param {?} rds
             * @return {?}
             */
            (rds) => {
                this.emitRangeDateSelection(rds);
            }), (/**
             * @param {?} va
             * @return {?}
             */
            (va) => {
                this.emitViewActivated(va);
            }), (/**
             * @return {?}
             */
            () => {
                this.closeSelector(CalToggle.CloseByEsc);
            }));
            this.emitCalendarToggle(CalToggle.Open);
            if (!this.opts.inline) {
                document.addEventListener(CLICK, this.onClickWrapper);
            }
        }
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.preventClose = false;
        }), PREVENT_CLOSE_TIMEOUT);
    }
    /**
     * @return {?}
     */
    closeCalendar() {
        this.closeSelector(CalToggle.CloseByCalBtn);
    }
    /**
     * @return {?}
     */
    toggleCalendar() {
        if (this.disabled) {
            return;
        }
        /** @type {?} */
        const isOpen = this.cRef === null;
        if (isOpen) {
            this.openCalendar();
        }
        else {
            this.closeSelector(CalToggle.CloseByCalBtn);
        }
        return isOpen;
    }
    /**
     * @return {?}
     */
    clearDate() {
        if (this.disabled) {
            return;
        }
        const { inline } = this.opts;
        this.setHostValue(EMPTY_STR);
        this.emitDateChanged({
            isRange: this.opts.dateRange,
            singleDate: {
                date: this.utilService.resetDate(),
                jsDate: null,
                formatted: EMPTY_STR,
                epoc: 0
            },
            dateRange: {
                beginDate: this.utilService.resetDate(),
                beginJsDate: null,
                beginEpoc: 0,
                endDate: this.utilService.resetDate(),
                endJsDate: null,
                endEpoc: 0,
                formatted: EMPTY_STR
            }
        });
        this.onChangeCb(null);
        this.onTouchedCb();
        if (this.cRef) {
            this.cRef.instance.clearDate();
        }
        if (!inline) {
            this.closeSelector(CalToggle.CloseByCalBtn);
        }
    }
    /**
     * @return {?}
     */
    isDateValid() {
        /** @type {?} */
        const value = this.getHostValue();
        if (value === null || value === EMPTY_STR) {
            return false;
        }
        /** @type {?} */
        let validateOpts = null;
        if (!this.opts.dateRange) {
            validateOpts = { validateDisabledDates: true, selectedValue: this.utilService.getSelectedValue(this.selectedValue, false) };
            /** @type {?} */
            const date = this.utilService.isDateValid(value, this.opts, validateOpts);
            if (this.utilService.isInitializedDate(date)) {
                this.emitInputFieldChanged(value, true);
                return true;
            }
        }
        else {
            validateOpts = { validateDisabledDates: true, selectedValue: this.utilService.getSelectedValue(this.selectedValue, true) };
            const { begin, end } = this.utilService.isDateValidDateRange(value, this.opts, validateOpts);
            if (this.utilService.isInitializedDate(begin) && this.utilService.isInitializedDate(end)) {
                this.emitInputFieldChanged(value, true);
                return true;
            }
        }
        this.emitInputFieldChanged(value, false);
        return false;
    }
    /**
     * @param {?} headerAction
     * @return {?}
     */
    headerAction(headerAction) {
        if (this.cRef) {
            this.cRef.instance.headerAction(headerAction);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setHostValue(value) {
        const { divHostElement } = this.opts;
        this.hostText = value;
        /** @type {?} */
        const valueType = !divHostElement.enabled ? VALUE : INNER_HTML;
        value = valueType === INNER_HTML && value === EMPTY_STR ? divHostElement.placeholder : value;
        this.renderer.setProperty(this.elem.nativeElement, valueType, value);
    }
    /**
     * @private
     * @param {?} keyCode
     * @return {?}
     */
    ignoreKeyPress(keyCode) {
        return keyCode === KeyCode.leftArrow || keyCode === KeyCode.rightArrow || keyCode === KeyCode.upArrow || keyCode === KeyCode.downArrow || keyCode === KeyCode.tab || keyCode === KeyCode.shift;
    }
    /**
     * @private
     * @param {?} reason
     * @return {?}
     */
    animationEnd(reason) {
        if (this.cRef) {
            this.cRef.instance.selectorEl.nativeElement.removeEventListener(ANIMATION_END, this.onAnimateWrapper);
            this.removeComponent();
            this.emitCalendarToggle(reason);
        }
    }
    /**
     * @private
     * @param {?} reason
     * @return {?}
     */
    closeSelector(reason) {
        const { inline, calendarAnimation } = this.opts;
        if (this.cRef && !inline) {
            if (calendarAnimation.out !== CalAnimation.None) {
                const { instance } = this.cRef;
                instance.selectorEl.nativeElement.addEventListener(ANIMATION_END, this.onAnimateWrapper.bind(this, reason));
                instance.setCalendarAnimation(calendarAnimation, false);
                // In case the animationend event is not fired
                setTimeout(this.onAnimateWrapper.bind(this, reason), ANIMATION_TIMEOUT);
            }
            else {
                this.removeComponent();
                this.emitCalendarToggle(reason);
            }
            document.removeEventListener(CLICK, this.onClickWrapper);
        }
    }
    /**
     * @private
     * @return {?}
     */
    removeComponent() {
        if (this.vcRef !== null) {
            this.vcRef.remove(this.vcRef.indexOf(this.cRef.hostView));
            this.cRef = null;
        }
    }
    /**
     * @private
     * @param {?} model
     * @return {?}
     */
    updateModel(model) {
        this.setHostValue(this.utilService.getFormattedDate(model));
        this.onChangeCb(model);
        this.onTouchedCb();
    }
    /**
     * @private
     * @return {?}
     */
    getHostValue() {
        const { value, innerHTML } = this.elem.nativeElement;
        return !this.opts.divHostElement.enabled ? value : innerHTML;
    }
    /**
     * @private
     * @return {?}
     */
    focusToInput() {
        const { focusInputOnDateSelect, divHostElement } = this.opts;
        if (focusInputOnDateSelect && !divHostElement.enabled) {
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.elem.nativeElement.focus();
            }));
        }
    }
    /**
     * @private
     * @param {?} dateModel
     * @return {?}
     */
    emitDateChanged(dateModel) {
        this.dateChanged.emit(dateModel);
        this.setSelectedValue(dateModel);
    }
    /**
     * @private
     * @param {?} dateModel
     * @return {?}
     */
    setSelectedValue(dateModel) {
        const { isRange, dateRange, singleDate } = dateModel;
        this.selectedValue = isRange ? dateRange : singleDate;
    }
    /**
     * @private
     * @param {?} value
     * @param {?} valid
     * @return {?}
     */
    emitInputFieldChanged(value, valid) {
        this.inputFieldChanged.emit({ value, dateFormat: this.opts.dateFormat, valid });
    }
    /**
     * @private
     * @param {?} cvc
     * @return {?}
     */
    emitCalendarChanged(cvc) {
        this.calendarViewChanged.emit(cvc);
    }
    /**
     * @private
     * @param {?} rds
     * @return {?}
     */
    emitRangeDateSelection(rds) {
        this.rangeDateSelection.emit(rds);
    }
    /**
     * @private
     * @param {?} va
     * @return {?}
     */
    emitViewActivated(va) {
        this.viewActivated.emit(va);
    }
    /**
     * @private
     * @param {?} reason
     * @return {?}
     */
    emitCalendarToggle(reason) {
        this.calendarToggle.emit(reason);
    }
    /**
     * @private
     * @param {?} elem
     * @return {?}
     */
    appendSelector(elem) {
        if (this.opts.appendSelectorToBody) {
            document.querySelector(BODY).appendChild(elem);
        }
    }
    /**
     * @private
     * @param {?} elem
     * @return {?}
     */
    getSelectorPosition(elem) {
        /** @type {?} */
        let top = 0;
        /** @type {?} */
        let left = 0;
        const { appendSelectorToBody, openSelectorTopOfInput, selectorHeight, selectorWidth, showSelectorArrow, alignSelectorRight } = this.opts;
        if (appendSelectorToBody) {
            /** @type {?} */
            const b = document.body.getBoundingClientRect();
            /** @type {?} */
            const e = elem.getBoundingClientRect();
            top = e.top - b.top;
            left = e.left - b.left;
        }
        if (openSelectorTopOfInput) {
            top = top - this.getSelectorDimension(selectorHeight) - 2;
        }
        else {
            top = top + elem.offsetHeight + (showSelectorArrow ? 12 : 2);
        }
        if (alignSelectorRight) {
            left = left + elem.offsetWidth - this.getSelectorDimension(selectorWidth);
        }
        return { top: top + PX, left: left + PX };
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    getSelectorDimension(value) {
        return Number(value.replace(PX, EMPTY_STR));
    }
}
AngularMyDatePickerDirective.decorators = [
    { type: Directive, args: [{
                selector: "[angular-mydatepicker]",
                exportAs: "angular-mydatepicker",
                providers: [UtilService, LocaleService, DefaultConfigService, NGX_DP_VALUE_ACCESSOR, NGX_DP_VALIDATORS]
            },] }
];
/** @nocollapse */
AngularMyDatePickerDirective.ctorParameters = () => [
    { type: LocaleService },
    { type: UtilService },
    { type: ViewContainerRef },
    { type: ComponentFactoryResolver },
    { type: Renderer2 },
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: DefaultConfigService }
];
AngularMyDatePickerDirective.propDecorators = {
    options: [{ type: Input }],
    locale: [{ type: Input }],
    defaultMonth: [{ type: Input }],
    dateChanged: [{ type: Output }],
    inputFieldChanged: [{ type: Output }],
    calendarViewChanged: [{ type: Output }],
    calendarToggle: [{ type: Output }],
    rangeDateSelection: [{ type: Output }],
    viewActivated: [{ type: Output }],
    onKeyUp: [{ type: HostListener, args: [KEYUP, ["$event"],] }],
    onBlur: [{ type: HostListener, args: [BLUR,] }]
};
if (false) {
    /** @type {?} */
    AngularMyDatePickerDirective.prototype.options;
    /** @type {?} */
    AngularMyDatePickerDirective.prototype.locale;
    /** @type {?} */
    AngularMyDatePickerDirective.prototype.defaultMonth;
    /** @type {?} */
    AngularMyDatePickerDirective.prototype.dateChanged;
    /** @type {?} */
    AngularMyDatePickerDirective.prototype.inputFieldChanged;
    /** @type {?} */
    AngularMyDatePickerDirective.prototype.calendarViewChanged;
    /** @type {?} */
    AngularMyDatePickerDirective.prototype.calendarToggle;
    /** @type {?} */
    AngularMyDatePickerDirective.prototype.rangeDateSelection;
    /** @type {?} */
    AngularMyDatePickerDirective.prototype.viewActivated;
    /**
     * @type {?}
     * @private
     */
    AngularMyDatePickerDirective.prototype.cRef;
    /**
     * @type {?}
     * @private
     */
    AngularMyDatePickerDirective.prototype.hostText;
    /**
     * @type {?}
     * @private
     */
    AngularMyDatePickerDirective.prototype.preventClose;
    /**
     * @type {?}
     * @private
     */
    AngularMyDatePickerDirective.prototype.disabled;
    /**
     * @type {?}
     * @private
     */
    AngularMyDatePickerDirective.prototype.selectedValue;
    /**
     * @type {?}
     * @private
     */
    AngularMyDatePickerDirective.prototype.opts;
    /** @type {?} */
    AngularMyDatePickerDirective.prototype.onChangeCb;
    /** @type {?} */
    AngularMyDatePickerDirective.prototype.onTouchedCb;
    /**
     * @type {?}
     * @private
     */
    AngularMyDatePickerDirective.prototype.onClickWrapper;
    /**
     * @type {?}
     * @private
     */
    AngularMyDatePickerDirective.prototype.onAnimateWrapper;
    /**
     * @type {?}
     * @private
     */
    AngularMyDatePickerDirective.prototype.localeService;
    /**
     * @type {?}
     * @private
     */
    AngularMyDatePickerDirective.prototype.utilService;
    /**
     * @type {?}
     * @private
     */
    AngularMyDatePickerDirective.prototype.vcRef;
    /**
     * @type {?}
     * @private
     */
    AngularMyDatePickerDirective.prototype.cfr;
    /**
     * @type {?}
     * @private
     */
    AngularMyDatePickerDirective.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    AngularMyDatePickerDirective.prototype.cdr;
    /**
     * @type {?}
     * @private
     */
    AngularMyDatePickerDirective.prototype.elem;
    /**
     * @type {?}
     * @private
     */
    AngularMyDatePickerDirective.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1teWRhdGVwaWNrZXIuaW5wdXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW15ZGF0ZXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9hbmd1bGFyLW15ZGF0ZXBpY2tlci5pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQWdCLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQ2hHLHdCQUF3QixFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUE0QixZQUFZLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDdEksT0FBTyxFQUF3QyxhQUFhLEVBQUUsaUJBQWlCLEVBQVksTUFBTSxnQkFBZ0IsQ0FBQztBQUNsSCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQVczRSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sZ0RBQWdELENBQUM7QUFDN0UsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDhDQUE4QyxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGdEQUFnRCxDQUFDO0FBQ3BGLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUNsRCxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDdkMsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzlDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUd4RCxPQUFPLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLHFCQUFxQixFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQ3pHLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsaUJBQWlCLEVB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ZW50UmVmLCBFbGVtZW50UmVmLCBWaWV3Q29udGFpbmVyUmVmLCBSZW5kZXJlcjIsIENoYW5nZURldGVjdG9yUmVmLCBcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBmb3J3YXJkUmVmLCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcywgT25DaGFuZ2VzLCBIb3N0TGlzdGVuZXIsIE9uRGVzdHJveX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sLCBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMSURBVE9SUywgTkdfVkFMVUVfQUNDRVNTT1IsIFZhbGlkYXRvcn0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge0NhbGVuZGFyQ29tcG9uZW50fSBmcm9tIFwiLi9jb21wb25lbnRzL2NhbGVuZGFyL2NhbGVuZGFyLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtJTXlEYXRlfSBmcm9tIFwiLi9pbnRlcmZhY2VzL215LWRhdGUuaW50ZXJmYWNlXCI7XG5pbXBvcnQge0lNeU9wdGlvbnN9IGZyb20gXCIuL2ludGVyZmFjZXMvbXktb3B0aW9ucy5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SU15RGF0ZU1vZGVsfSBmcm9tIFwiLi9pbnRlcmZhY2VzL215LWRhdGUtbW9kZWwuaW50ZXJmYWNlXCI7XG5pbXBvcnQge0lNeURhdGVSYW5nZX0gZnJvbSBcIi4vaW50ZXJmYWNlcy9teS1kYXRlLXJhbmdlLmludGVyZmFjZVwiO1xuaW1wb3J0IHtJTXlSYW5nZURhdGVTZWxlY3Rpb259IGZyb20gXCIuL2ludGVyZmFjZXMvbXktcmFuZ2UtZGF0ZS1zZWxlY3Rpb24uaW50ZXJmYWNlXCI7XG5pbXBvcnQge0lNeUNhbGVuZGFyVmlld0NoYW5nZWR9IGZyb20gXCIuL2ludGVyZmFjZXMvbXktY2FsZW5kYXItdmlldy1jaGFuZ2VkLmludGVyZmFjZVwiO1xuaW1wb3J0IHtJTXlJbnB1dEZpZWxkQ2hhbmdlZH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9teS1pbnB1dC1maWVsZC1jaGFuZ2VkLmludGVyZmFjZVwiO1xuaW1wb3J0IHtJTXlTZWxlY3RvclBvc2l0aW9ufSBmcm9tIFwiLi9pbnRlcmZhY2VzL215LXNlbGVjdG9yLXBvcy5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SU15VmFsaWRhdGVPcHRpb25zfSBmcm9tIFwiLi9pbnRlcmZhY2VzL215LXZhbGlkYXRlLW9wdGlvbnMuaW50ZXJmYWNlXCI7XG5pbXBvcnQge0lNeURlZmF1bHRNb250aH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9teS1kZWZhdWx0LW1vbnRoLmludGVyZmFjZVwiO1xuaW1wb3J0IHtMb2NhbGVTZXJ2aWNlfSBmcm9tIFwiLi9zZXJ2aWNlcy9hbmd1bGFyLW15ZGF0ZXBpY2tlci5sb2NhbGUuc2VydmljZVwiO1xuaW1wb3J0IHtVdGlsU2VydmljZX0gZnJvbSBcIi4vc2VydmljZXMvYW5ndWxhci1teWRhdGVwaWNrZXIudXRpbC5zZXJ2aWNlXCI7XG5pbXBvcnQge0RlZmF1bHRDb25maWdTZXJ2aWNlfSBmcm9tIFwiLi9zZXJ2aWNlcy9hbmd1bGFyLW15ZGF0ZXBpY2tlci5jb25maWcuc2VydmljZVwiO1xuaW1wb3J0IHtDYWxUb2dnbGV9IGZyb20gXCIuL2VudW1zL2NhbC10b2dnbGUuZW51bVwiO1xuaW1wb3J0IHtZZWFyfSBmcm9tIFwiLi9lbnVtcy95ZWFyLmVudW1cIjtcbmltcG9ydCB7S2V5Q29kZX0gZnJvbSBcIi4vZW51bXMva2V5LWNvZGUuZW51bVwiO1xuaW1wb3J0IHtDYWxBbmltYXRpb259IGZyb20gXCIuL2VudW1zL2NhbC1hbmltYXRpb24uZW51bVwiO1xuaW1wb3J0IHtIZWFkZXJBY3Rpb259IGZyb20gXCIuL2VudW1zL2hlYWRlci1hY3Rpb24uZW51bVwiO1xuaW1wb3J0IHtBY3RpdmVWaWV3fSBmcm9tIFwiLi9lbnVtcy9hY3RpdmUtdmlldy5lbnVtXCI7XG5pbXBvcnQge0tFWVVQLCBCTFVSLCBFTVBUWV9TVFIsIERJU0FCTEVELCBDTElDSywgQk9EWSwgVkFMVUUsIFBSRVZFTlRfQ0xPU0VfVElNRU9VVCwgT1BUSU9OUywgREVGQVVMVF9NT05USCwgXG4gIExPQ0FMRSwgT0JKRUNULCBQWCwgSU5ORVJfSFRNTCwgQU5JTUFUSU9OX0VORCwgQU5JTUFUSU9OX1RJTUVPVVR9IGZyb20gXCIuL2NvbnN0YW50cy9jb25zdGFudHNcIjtcblxuY29uc3QgTkdYX0RQX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQW5ndWxhck15RGF0ZVBpY2tlckRpcmVjdGl2ZSksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5jb25zdCBOR1hfRFBfVkFMSURBVE9SUyA9IHtcbiAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQW5ndWxhck15RGF0ZVBpY2tlckRpcmVjdGl2ZSksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6IFwiW2FuZ3VsYXItbXlkYXRlcGlja2VyXVwiLFxuICBleHBvcnRBczogXCJhbmd1bGFyLW15ZGF0ZXBpY2tlclwiLFxuICBwcm92aWRlcnM6IFtVdGlsU2VydmljZSwgTG9jYWxlU2VydmljZSwgRGVmYXVsdENvbmZpZ1NlcnZpY2UsIE5HWF9EUF9WQUxVRV9BQ0NFU1NPUiwgTkdYX0RQX1ZBTElEQVRPUlNdXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJNeURhdGVQaWNrZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIFZhbGlkYXRvciB7XG4gIEBJbnB1dCgpIG9wdGlvbnM6IElNeU9wdGlvbnM7XG4gIEBJbnB1dCgpIGxvY2FsZTogc3RyaW5nO1xuICBASW5wdXQoKSBkZWZhdWx0TW9udGg6IElNeURlZmF1bHRNb250aCA9IHtkZWZNb250aDogRU1QVFlfU1RSLCBvdmVycmlkZVNlbGVjdGlvbjogZmFsc2V9O1xuXG4gIEBPdXRwdXQoKSBkYXRlQ2hhbmdlZDogRXZlbnRFbWl0dGVyPElNeURhdGVNb2RlbD4gPSBuZXcgRXZlbnRFbWl0dGVyPElNeURhdGVNb2RlbD4oKTtcbiAgQE91dHB1dCgpIGlucHV0RmllbGRDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8SU15SW5wdXRGaWVsZENoYW5nZWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxJTXlJbnB1dEZpZWxkQ2hhbmdlZD4oKTtcbiAgQE91dHB1dCgpIGNhbGVuZGFyVmlld0NoYW5nZWQ6IEV2ZW50RW1pdHRlcjxJTXlDYWxlbmRhclZpZXdDaGFuZ2VkPiA9IG5ldyBFdmVudEVtaXR0ZXI8SU15Q2FsZW5kYXJWaWV3Q2hhbmdlZD4oKTtcbiAgQE91dHB1dCgpIGNhbGVuZGFyVG9nZ2xlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBAT3V0cHV0KCkgcmFuZ2VEYXRlU2VsZWN0aW9uOiBFdmVudEVtaXR0ZXI8SU15UmFuZ2VEYXRlU2VsZWN0aW9uPiA9IG5ldyBFdmVudEVtaXR0ZXI8SU15UmFuZ2VEYXRlU2VsZWN0aW9uPigpO1xuICBAT3V0cHV0KCkgdmlld0FjdGl2YXRlZDogRXZlbnRFbWl0dGVyPEFjdGl2ZVZpZXc+ID0gbmV3IEV2ZW50RW1pdHRlcjxBY3RpdmVWaWV3PigpO1xuXG4gIHByaXZhdGUgY1JlZjogQ29tcG9uZW50UmVmPENhbGVuZGFyQ29tcG9uZW50PiA9IG51bGw7XG4gIHByaXZhdGUgaG9zdFRleHQ6IHN0cmluZyA9IEVNUFRZX1NUUjtcbiAgcHJpdmF0ZSBwcmV2ZW50Q2xvc2U6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBkaXNhYmxlZCA9IGZhbHNlO1xuICBwcml2YXRlIHNlbGVjdGVkVmFsdWU6IGFueSA9IG51bGw7XG5cbiAgcHJpdmF0ZSBvcHRzOiBJTXlPcHRpb25zO1xuXG4gIG9uQ2hhbmdlQ2I6IChfOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7IH07XG4gIG9uVG91Y2hlZENiOiAoKSA9PiB2b2lkID0gKCkgPT4geyB9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbG9jYWxlU2VydmljZTogTG9jYWxlU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSB1dGlsU2VydmljZTogVXRpbFNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgICAgICAgIHByaXZhdGUgY2ZyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIGVsZW06IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgIHByaXZhdGUgY29uZmlnOiBEZWZhdWx0Q29uZmlnU2VydmljZSkge1xuICAgIHRoaXMub3B0cyA9IHRoaXMuY29uZmlnLmdldERlZmF1bHRDb25maWcoKTtcbiAgICB0aGlzLnBhcnNlT3B0aW9ucyh0aGlzLm9wdHMpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcihLRVlVUCwgW1wiJGV2ZW50XCJdKSBvbktleVVwKGV2ZW50OiBhbnkpIHtcbiAgICBjb25zdCBrZXlDb2RlOiBudW1iZXIgPSB0aGlzLnV0aWxTZXJ2aWNlLmdldEtleUNvZGVGcm9tRXZlbnQoZXZlbnQpO1xuICAgIGlmICh0aGlzLmlnbm9yZUtleVByZXNzKGtleUNvZGUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIFxuICAgIGlmIChrZXlDb2RlID09PSBLZXlDb2RlLmVzYykge1xuICAgICAgdGhpcy5jbG9zZVNlbGVjdG9yKENhbFRvZ2dsZS5DbG9zZUJ5RXNjKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb25zdCB7ZGF0ZVJhbmdlLCBkYXRlRm9ybWF0LCBtb250aExhYmVscywgZGF0ZVJhbmdlRGF0ZXNEZWxpbWl0ZXJ9ID0gdGhpcy5vcHRzO1xuICAgICAgY29uc3QgdmFsdWU6IHN0cmluZyA9IHRoaXMuZ2V0SG9zdFZhbHVlKCk7XG5cbiAgICAgIGxldCBkYXRlTW9kZWw6IElNeURhdGVNb2RlbCA9IG51bGw7XG4gICAgICBsZXQgdmFsaWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgIGxldCB2YWxpZGF0ZU9wdHM6IElNeVZhbGlkYXRlT3B0aW9ucyA9IG51bGw7XG4gICAgICBpZiAoIWRhdGVSYW5nZSkge1xuICAgICAgICB2YWxpZGF0ZU9wdHMgPSB7dmFsaWRhdGVEaXNhYmxlZERhdGVzOiB0cnVlLCBzZWxlY3RlZFZhbHVlOiB0aGlzLnV0aWxTZXJ2aWNlLmdldFNlbGVjdGVkVmFsdWUodGhpcy5zZWxlY3RlZFZhbHVlLCBmYWxzZSl9O1xuICAgICAgICBjb25zdCBkYXRlOiBJTXlEYXRlID0gdGhpcy51dGlsU2VydmljZS5pc0RhdGVWYWxpZCh2YWx1ZSwgdGhpcy5vcHRzLCB2YWxpZGF0ZU9wdHMpO1xuICAgICAgICB2YWxpZCA9IHRoaXMudXRpbFNlcnZpY2UuaXNJbml0aWFsaXplZERhdGUoZGF0ZSk7XG4gICAgICAgIGlmICh2YWxpZCkge1xuICAgICAgICAgIGRhdGVNb2RlbCA9IHRoaXMudXRpbFNlcnZpY2UuZ2V0RGF0ZU1vZGVsKGRhdGUsIG51bGwsIGRhdGVGb3JtYXQsIG1vbnRoTGFiZWxzLCBkYXRlUmFuZ2VEYXRlc0RlbGltaXRlcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB2YWxpZGF0ZU9wdHMgPSB7dmFsaWRhdGVEaXNhYmxlZERhdGVzOiB0cnVlLCBzZWxlY3RlZFZhbHVlOiB0aGlzLnV0aWxTZXJ2aWNlLmdldFNlbGVjdGVkVmFsdWUodGhpcy5zZWxlY3RlZFZhbHVlLCB0cnVlKX07XG4gICAgICAgIGNvbnN0IHJhbmdlID0gdGhpcy51dGlsU2VydmljZS5pc0RhdGVWYWxpZERhdGVSYW5nZSh2YWx1ZSwgdGhpcy5vcHRzLCB2YWxpZGF0ZU9wdHMpO1xuICAgICAgICBjb25zdCB7YmVnaW4sIGVuZH0gPSByYW5nZTtcbiAgICAgICAgdmFsaWQgPSB0aGlzLnV0aWxTZXJ2aWNlLmlzSW5pdGlhbGl6ZWREYXRlKGJlZ2luKSAmJiB0aGlzLnV0aWxTZXJ2aWNlLmlzSW5pdGlhbGl6ZWREYXRlKGVuZCk7XG4gICAgICAgIGlmICh2YWxpZCkge1xuICAgICAgICAgIGRhdGVNb2RlbCA9IHRoaXMudXRpbFNlcnZpY2UuZ2V0RGF0ZU1vZGVsKG51bGwsIHJhbmdlLCBkYXRlRm9ybWF0LCBtb250aExhYmVscywgZGF0ZVJhbmdlRGF0ZXNEZWxpbWl0ZXIpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMub25DaGFuZ2VDYihkYXRlTW9kZWwpO1xuICAgICAgdGhpcy5lbWl0SW5wdXRGaWVsZENoYW5nZWQodmFsdWUsIHZhbGlkKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKEJMVVIpIG9uQmx1cigpIHtcbiAgICBjb25zdCB7aW5wdXRGaWVsZFZhbGlkYXRpb24sIGRhdGVSYW5nZSwgZGF0ZUZvcm1hdCwgbW9udGhMYWJlbHMsIGRhdGVSYW5nZURhdGVzRGVsaW1pdGVyLCBjbG9zZVNlbGVjdG9yT25EYXRlU2VsZWN0fSA9IHRoaXMub3B0cztcblxuICAgIGlmIChpbnB1dEZpZWxkVmFsaWRhdGlvbikge1xuICAgICAgY29uc3QgdmFsdWU6IHN0cmluZyA9IHRoaXMuZ2V0SG9zdFZhbHVlKCk7XG5cbiAgICAgIGxldCB2YWxpZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgbGV0IHZhbGlkYXRlT3B0czogSU15VmFsaWRhdGVPcHRpb25zID0gbnVsbDtcbiAgICAgIGlmICghZGF0ZVJhbmdlKSB7XG4gICAgICAgIHZhbGlkYXRlT3B0cyA9IHt2YWxpZGF0ZURpc2FibGVkRGF0ZXM6IHRydWUsIHNlbGVjdGVkVmFsdWU6IHRoaXMudXRpbFNlcnZpY2UuZ2V0U2VsZWN0ZWRWYWx1ZSh0aGlzLnNlbGVjdGVkVmFsdWUsIGZhbHNlKX07XG4gICAgICAgIGNvbnN0IGRhdGU6IElNeURhdGUgPSB0aGlzLnV0aWxTZXJ2aWNlLmlzRGF0ZVZhbGlkKHZhbHVlLCB0aGlzLm9wdHMsIHZhbGlkYXRlT3B0cyk7XG4gICAgICAgIHZhbGlkID0gdGhpcy51dGlsU2VydmljZS5pc0luaXRpYWxpemVkRGF0ZShkYXRlKTtcbiAgICAgICAgaWYgKHZhbGlkICYmIHRoaXMuaG9zdFRleHQgIT09IHZhbHVlKSB7XG4gICAgICAgICAgLy8gVmFsaWQgZGF0ZVxuICAgICAgICAgIGNvbnN0IGRhdGVNb2RlbDogSU15RGF0ZU1vZGVsID0gdGhpcy51dGlsU2VydmljZS5nZXREYXRlTW9kZWwoZGF0ZSwgbnVsbCwgZGF0ZUZvcm1hdCwgbW9udGhMYWJlbHMsIGRhdGVSYW5nZURhdGVzRGVsaW1pdGVyKTtcbiAgICAgICAgICB0aGlzLmVtaXREYXRlQ2hhbmdlZChkYXRlTW9kZWwpO1xuICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwoZGF0ZU1vZGVsKTtcbiAgICAgICAgICBpZiAoY2xvc2VTZWxlY3Rvck9uRGF0ZVNlbGVjdCkge1xuICAgICAgICAgICAgdGhpcy5jbG9zZVNlbGVjdG9yKENhbFRvZ2dsZS5DbG9zZUJ5RGF0ZVNlbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFsaWRhdGVPcHRzID0ge3ZhbGlkYXRlRGlzYWJsZWREYXRlczogdHJ1ZSwgc2VsZWN0ZWRWYWx1ZTogdGhpcy51dGlsU2VydmljZS5nZXRTZWxlY3RlZFZhbHVlKHRoaXMuc2VsZWN0ZWRWYWx1ZSwgdHJ1ZSl9O1xuICAgICAgICBjb25zdCBkYXRlUmFuZ2U6IElNeURhdGVSYW5nZSA9IHRoaXMudXRpbFNlcnZpY2UuaXNEYXRlVmFsaWREYXRlUmFuZ2UodmFsdWUsIHRoaXMub3B0cywgdmFsaWRhdGVPcHRzKTtcbiAgICAgICAgY29uc3Qge2JlZ2luLCBlbmR9ID0gZGF0ZVJhbmdlO1xuICAgICAgICB2YWxpZCA9IHRoaXMudXRpbFNlcnZpY2UuaXNJbml0aWFsaXplZERhdGUoYmVnaW4pICYmIHRoaXMudXRpbFNlcnZpY2UuaXNJbml0aWFsaXplZERhdGUoZW5kKTtcbiAgICAgICAgaWYgKHZhbGlkICYmIHRoaXMuaG9zdFRleHQgIT09IHZhbHVlKSB7XG4gICAgICAgICAgLy8gVmFsaWQgZGF0ZSByYW5nZVxuICAgICAgICAgIGNvbnN0IGRhdGVNb2RlbDogSU15RGF0ZU1vZGVsID0gdGhpcy51dGlsU2VydmljZS5nZXREYXRlTW9kZWwobnVsbCwgZGF0ZVJhbmdlLCBkYXRlRm9ybWF0LCBtb250aExhYmVscywgZGF0ZVJhbmdlRGF0ZXNEZWxpbWl0ZXIpO1xuICAgICAgICAgIHRoaXMuZW1pdERhdGVDaGFuZ2VkKGRhdGVNb2RlbCk7XG4gICAgICAgICAgdGhpcy51cGRhdGVNb2RlbChkYXRlTW9kZWwpO1xuICAgICAgICAgIGlmIChjbG9zZVNlbGVjdG9yT25EYXRlU2VsZWN0KSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlU2VsZWN0b3IoQ2FsVG9nZ2xlLkNsb3NlQnlEYXRlU2VsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCF2YWxpZCAmJiB0aGlzLmhvc3RUZXh0ICE9PSB2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgPT09IEVNUFRZX1NUUikge1xuICAgICAgICAgIHRoaXMuY2xlYXJEYXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5vbkNoYW5nZUNiKG51bGwpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaG9zdFRleHQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICB0aGlzLm9uVG91Y2hlZENiKCk7XG4gIH1cblxuICBwcml2YXRlIG9uQ2xpY2tXcmFwcGVyID0gKGV2ZW50OiBhbnkpID0+IHRoaXMub25DbGljayhldmVudCk7XG5cbiAgcHJpdmF0ZSBvbkNsaWNrKGV2ZW50OiBhbnkpIHtcbiAgICBpZiAodGhpcy5vcHRzLmNsb3NlU2VsZWN0b3JPbkRvY3VtZW50Q2xpY2sgJiYgIXRoaXMucHJldmVudENsb3NlICYmIGV2ZW50LnRhcmdldCAmJiB0aGlzLmNSZWYgXG4gICAgICAgICYmIHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50ICE9PSBldmVudC50YXJnZXQgJiYgIXRoaXMuY1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkgXG4gICAgICAgICYmICF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLmNsb3NlU2VsZWN0b3IoQ2FsVG9nZ2xlLkNsb3NlQnlPdXRDbGljayk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eShMT0NBTEUpKSB7XG4gICAgICB0aGlzLnNldExvY2FsZU9wdGlvbnMoKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eShERUZBVUxUX01PTlRIKSkge1xuICAgICAgbGV0IGRtOiBhbnkgPSBjaGFuZ2VzW0RFRkFVTFRfTU9OVEhdLmN1cnJlbnRWYWx1ZTtcbiAgICAgIGlmICh0eXBlb2YgZG0gPT09IE9CSkVDVCkge1xuICAgICAgICBpZiAoIWRtLm92ZXJyaWRlU2VsZWN0aW9uKSB7XG4gICAgICAgICAgZG0ub3ZlcnJpZGVTZWxlY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGRtID0ge2RlZk1vbnRoOiBkbSwgb3ZlcnJpZGVTZWxlY3Rpb246IGZhbHNlfTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgdGhpcy5kZWZhdWx0TW9udGggPSBkbTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eShPUFRJT05TKSkge1xuICAgICAgdGhpcy5wYXJzZU9wdGlvbnMoY2hhbmdlc1tPUFRJT05TXS5jdXJyZW50VmFsdWUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNSZWYpIHtcbiAgICAgIHRoaXMuY1JlZi5pbnN0YW5jZS5yZWZyZXNoQ29tcG9uZW50KHRoaXMub3B0cywgdGhpcy5kZWZhdWx0TW9udGgsIHRoaXMuc2VsZWN0ZWRWYWx1ZSwgdGhpcy5nZXRIb3N0VmFsdWUoKSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuY2xvc2VDYWxlbmRhcigpO1xuICB9XG5cbiAgcHVibGljIHNldExvY2FsZU9wdGlvbnMoKTogdm9pZCB7XG4gICAgY29uc3Qgb3B0czogSU15T3B0aW9ucyA9IHRoaXMubG9jYWxlU2VydmljZS5nZXRMb2NhbGVPcHRpb25zKHRoaXMubG9jYWxlKTtcbiAgICBPYmplY3Qua2V5cyhvcHRzKS5mb3JFYWNoKChrKSA9PiB7XG4gICAgICAoPElNeU9wdGlvbnM+IHRoaXMub3B0cylba10gPSBvcHRzW2tdO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHBhcnNlT3B0aW9ucyhvcHRzOiBJTXlPcHRpb25zKTogdm9pZCB7XG4gICAgaWYgKG9wdHMpIHtcbiAgICAgIE9iamVjdC5rZXlzKG9wdHMpLmZvckVhY2goKGspID0+IHtcbiAgICAgICAgKDxJTXlPcHRpb25zPiB0aGlzLm9wdHMpW2tdID0gb3B0c1trXTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHttaW5ZZWFyLCBtYXhZZWFyLCBvcGVuU2VsZWN0b3JUb3BPZklucHV0LCBpbmxpbmV9ID0gdGhpcy5vcHRzO1xuXG4gICAgaWYgKG1pblllYXIgPCBZZWFyLm1pbikge1xuICAgICAgdGhpcy5vcHRzLm1pblllYXIgPSBZZWFyLm1pbjtcbiAgICB9XG5cbiAgICBpZiAobWF4WWVhciA+IFllYXIubWF4KSB7XG4gICAgICB0aGlzLm9wdHMubWF4WWVhciA9IFllYXIubWF4O1xuICAgIH1cblxuICAgIGlmIChvcGVuU2VsZWN0b3JUb3BPZklucHV0IHx8IGlubGluZSkge1xuICAgICAgdGhpcy5vcHRzLnNob3dTZWxlY3RvckFycm93ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGlubGluZSkge1xuICAgICAgdGhpcy5vcGVuQ2FsZW5kYXIoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgdmFsaWRhdGVPcHRzOiBJTXlWYWxpZGF0ZU9wdGlvbnMgPSBudWxsO1xuICAgIGNvbnN0IHtkYXRlRm9ybWF0LCBtb250aExhYmVscywgZGF0ZVJhbmdlRGF0ZXNEZWxpbWl0ZXIsIGlubGluZX0gPSB0aGlzLm9wdHM7XG5cbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICB0aGlzLnNldEhvc3RWYWx1ZShFTVBUWV9TVFIpO1xuICAgICAgdGhpcy5lbWl0SW5wdXRGaWVsZENoYW5nZWQoRU1QVFlfU1RSLCBmYWxzZSk7XG5cbiAgICAgIGlmICh0aGlzLmNSZWYpIHtcbiAgICAgICAgdGhpcy5jUmVmLmluc3RhbmNlLnJlc2V0RGF0ZVZhbHVlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKCF2YWx1ZS5pc1JhbmdlICYmIHZhbHVlLnNpbmdsZURhdGUpIHtcbiAgICAgIC8vIHNpbmdsZSBkYXRlXG4gICAgICBsZXQge2RhdGUsIGpzRGF0ZX0gPSB2YWx1ZS5zaW5nbGVEYXRlO1xuICAgICAgaWYgKCFkYXRlKSB7XG4gICAgICAgIGRhdGUgPSB0aGlzLnV0aWxTZXJ2aWNlLmpzRGF0ZVRvTXlEYXRlKGpzRGF0ZSk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGNvbnN0IGZvcm1hdHRlZDogc3RyaW5nID0gdGhpcy51dGlsU2VydmljZS5mb3JtYXREYXRlKGRhdGUsIGRhdGVGb3JtYXQsIG1vbnRoTGFiZWxzKTtcblxuICAgICAgdmFsaWRhdGVPcHRzID0ge3ZhbGlkYXRlRGlzYWJsZWREYXRlczogZmFsc2UsIHNlbGVjdGVkVmFsdWU6IHRoaXMudXRpbFNlcnZpY2UuZ2V0U2VsZWN0ZWRWYWx1ZSh0aGlzLnNlbGVjdGVkVmFsdWUsIGZhbHNlKX07XG4gICAgICBjb25zdCB2YWxpZDogYm9vbGVhbiA9IHRoaXMudXRpbFNlcnZpY2UuaXNJbml0aWFsaXplZERhdGUodGhpcy51dGlsU2VydmljZS5pc0RhdGVWYWxpZChmb3JtYXR0ZWQsIHRoaXMub3B0cywgdmFsaWRhdGVPcHRzKSk7XG4gICAgICBpZiAodmFsaWQpIHtcbiAgICAgICAgdGhpcy5zZXRIb3N0VmFsdWUoZm9ybWF0dGVkKTtcbiAgICAgICAgdGhpcy5lbWl0SW5wdXRGaWVsZENoYW5nZWQoZm9ybWF0dGVkLCB2YWxpZCk7XG4gICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRWYWx1ZSh0aGlzLnV0aWxTZXJ2aWNlLmdldERhdGVNb2RlbChkYXRlLCBudWxsLCBkYXRlRm9ybWF0LCBtb250aExhYmVscywgZGF0ZVJhbmdlRGF0ZXNEZWxpbWl0ZXIpKTtcblxuICAgICAgICBpZiAodGhpcy5jUmVmKSB7XG4gICAgICAgICAgdGhpcy5jUmVmLmluc3RhbmNlLnJlZnJlc2hDb21wb25lbnQodGhpcy5vcHRzLCB0aGlzLmRlZmF1bHRNb250aCwgdGhpcy5zZWxlY3RlZFZhbHVlLCB0aGlzLmdldEhvc3RWYWx1ZSgpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh2YWx1ZS5pc1JhbmdlICYmIHZhbHVlLmRhdGVSYW5nZSkge1xuICAgICAgLy8gZGF0ZSByYW5nZVxuICAgICAgbGV0IHtiZWdpbkRhdGUsIGJlZ2luSnNEYXRlLCBlbmREYXRlLCBlbmRKc0RhdGV9ID0gdmFsdWUuZGF0ZVJhbmdlO1xuICAgICAgaWYgKCFiZWdpbkRhdGUgfHwgIWVuZERhdGUpIHtcbiAgICAgICAgYmVnaW5EYXRlID0gdGhpcy51dGlsU2VydmljZS5qc0RhdGVUb015RGF0ZShiZWdpbkpzRGF0ZSk7XG4gICAgICAgIGVuZERhdGUgPSB0aGlzLnV0aWxTZXJ2aWNlLmpzRGF0ZVRvTXlEYXRlKGVuZEpzRGF0ZSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZvcm1hdHRlZDogc3RyaW5nID0gdGhpcy51dGlsU2VydmljZS5mb3JtYXREYXRlKGJlZ2luRGF0ZSwgZGF0ZUZvcm1hdCwgbW9udGhMYWJlbHMpICsgZGF0ZVJhbmdlRGF0ZXNEZWxpbWl0ZXIgK1xuICAgICAgICB0aGlzLnV0aWxTZXJ2aWNlLmZvcm1hdERhdGUoZW5kRGF0ZSwgZGF0ZUZvcm1hdCwgbW9udGhMYWJlbHMpO1xuICAgICAgdmFsaWRhdGVPcHRzID0ge3ZhbGlkYXRlRGlzYWJsZWREYXRlczogZmFsc2UsIHNlbGVjdGVkVmFsdWU6IHRoaXMudXRpbFNlcnZpY2UuZ2V0U2VsZWN0ZWRWYWx1ZSh0aGlzLnNlbGVjdGVkVmFsdWUsIHRydWUpfTtcbiAgICAgIGNvbnN0IHtiZWdpbiwgZW5kfSA9IHRoaXMudXRpbFNlcnZpY2UuaXNEYXRlVmFsaWREYXRlUmFuZ2UoZm9ybWF0dGVkLCB0aGlzLm9wdHMsIHZhbGlkYXRlT3B0cyk7XG4gICAgICBjb25zdCB2YWxpZDogYm9vbGVhbiA9IHRoaXMudXRpbFNlcnZpY2UuaXNJbml0aWFsaXplZERhdGUoYmVnaW4pICYmIHRoaXMudXRpbFNlcnZpY2UuaXNJbml0aWFsaXplZERhdGUoZW5kKTtcbiAgICAgIGlmICh2YWxpZCkge1xuICAgICAgICB0aGlzLnNldEhvc3RWYWx1ZShmb3JtYXR0ZWQpO1xuICAgICAgICB0aGlzLmVtaXRJbnB1dEZpZWxkQ2hhbmdlZChmb3JtYXR0ZWQsIHZhbGlkKTtcblxuICAgICAgICBjb25zdCBkYXRlUmFuZ2U6IElNeURhdGVSYW5nZSA9IHtiZWdpbjogYmVnaW5EYXRlLCBlbmQ6IGVuZERhdGV9O1xuICAgICAgICB0aGlzLnNldFNlbGVjdGVkVmFsdWUodGhpcy51dGlsU2VydmljZS5nZXREYXRlTW9kZWwobnVsbCwgZGF0ZVJhbmdlLCBkYXRlRm9ybWF0LCBtb250aExhYmVscywgZGF0ZVJhbmdlRGF0ZXNEZWxpbWl0ZXIpKTtcblxuICAgICAgICBpZiAodGhpcy5jUmVmKSB7XG4gICAgICAgICAgdGhpcy5jUmVmLmluc3RhbmNlLnJlZnJlc2hDb21wb25lbnQodGhpcy5vcHRzLCB0aGlzLmRlZmF1bHRNb250aCwgdGhpcy5zZWxlY3RlZFZhbHVlLCB0aGlzLmdldEhvc3RWYWx1ZSgpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2IgPSBmbjtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWRDYiA9IGZuO1xuICB9XG5cbiAgcHVibGljIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQsIERJU0FCTEVELCBpc0Rpc2FibGVkKTtcblxuICAgIGlmIChpc0Rpc2FibGVkKSB7XG4gICAgICB0aGlzLmNsb3NlQ2FsZW5kYXIoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdmFsaWRhdGUoYzogQWJzdHJhY3RDb250cm9sKTogeyBbcDogc3RyaW5nXTogYW55IH0ge1xuICAgIGNvbnN0IHZhbHVlOiBzdHJpbmcgPSB0aGlzLmdldEhvc3RWYWx1ZSgpO1xuXG4gICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSBFTVBUWV9TVFIpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGxldCB2YWxpZGF0ZU9wdHM6IElNeVZhbGlkYXRlT3B0aW9ucyA9IG51bGw7XG4gICAgaWYgKCF0aGlzLm9wdHMuZGF0ZVJhbmdlKSB7XG4gICAgICB2YWxpZGF0ZU9wdHMgPSB7dmFsaWRhdGVEaXNhYmxlZERhdGVzOiB0cnVlLCBzZWxlY3RlZFZhbHVlOiB0aGlzLnV0aWxTZXJ2aWNlLmdldFNlbGVjdGVkVmFsdWUodGhpcy5zZWxlY3RlZFZhbHVlLCBmYWxzZSl9O1xuICAgICAgY29uc3QgZGF0ZTogSU15RGF0ZSA9IHRoaXMudXRpbFNlcnZpY2UuaXNEYXRlVmFsaWQodmFsdWUsIHRoaXMub3B0cywgdmFsaWRhdGVPcHRzKTtcbiAgICAgIGlmICghdGhpcy51dGlsU2VydmljZS5pc0luaXRpYWxpemVkRGF0ZShkYXRlKSkge1xuICAgICAgICByZXR1cm4ge2ludmFsaWREYXRlRm9ybWF0OiB0cnVlfTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YWxpZGF0ZU9wdHMgPSB7dmFsaWRhdGVEaXNhYmxlZERhdGVzOiB0cnVlLCBzZWxlY3RlZFZhbHVlOiB0aGlzLnV0aWxTZXJ2aWNlLmdldFNlbGVjdGVkVmFsdWUodGhpcy5zZWxlY3RlZFZhbHVlLCB0cnVlKX07XG4gICAgICBjb25zdCB7YmVnaW4sIGVuZH0gPSB0aGlzLnV0aWxTZXJ2aWNlLmlzRGF0ZVZhbGlkRGF0ZVJhbmdlKHZhbHVlLCB0aGlzLm9wdHMsIHZhbGlkYXRlT3B0cyk7XG4gICAgICBpZiAoIXRoaXMudXRpbFNlcnZpY2UuaXNJbml0aWFsaXplZERhdGUoYmVnaW4pIHx8ICF0aGlzLnV0aWxTZXJ2aWNlLmlzSW5pdGlhbGl6ZWREYXRlKGVuZCkpIHtcbiAgICAgICAgcmV0dXJuIHtpbnZhbGlkRGF0ZUZvcm1hdDogdHJ1ZX07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIG9wZW5DYWxlbmRhcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnByZXZlbnRDbG9zZSA9IHRydWU7XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIGlmICh0aGlzLmNSZWYgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuY1JlZiA9IHRoaXMudmNSZWYuY3JlYXRlQ29tcG9uZW50KHRoaXMuY2ZyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KENhbGVuZGFyQ29tcG9uZW50KSk7XG4gICAgICB0aGlzLmFwcGVuZFNlbGVjdG9yKHRoaXMuY1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcbiAgICAgIHRoaXMuY1JlZi5pbnN0YW5jZS5pbml0aWFsaXplQ29tcG9uZW50KFxuICAgICAgICB0aGlzLm9wdHMsXG4gICAgICAgIHRoaXMuZGVmYXVsdE1vbnRoLFxuICAgICAgICB0aGlzLnNlbGVjdGVkVmFsdWUsXG4gICAgICAgIHRoaXMuZ2V0SG9zdFZhbHVlKCksXG4gICAgICAgIHRoaXMuZ2V0U2VsZWN0b3JQb3NpdGlvbih0aGlzLmVsZW0ubmF0aXZlRWxlbWVudCksXG4gICAgICAgIChkbTogSU15RGF0ZU1vZGVsLCBjbG9zZTogYm9vbGVhbikgPT4ge1xuICAgICAgICAgIHRoaXMuZm9jdXNUb0lucHV0KCk7XG4gICAgICAgICAgdGhpcy5lbWl0RGF0ZUNoYW5nZWQoZG0pO1xuICAgICAgICAgIHRoaXMuZW1pdElucHV0RmllbGRDaGFuZ2VkKHRoaXMudXRpbFNlcnZpY2UuZ2V0Rm9ybWF0dGVkRGF0ZShkbSksIHRydWUpO1xuICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwoZG0pO1xuICAgICAgICAgIGlmIChjbG9zZSkge1xuICAgICAgICAgICAgdGhpcy5jbG9zZVNlbGVjdG9yKENhbFRvZ2dsZS5DbG9zZUJ5RGF0ZVNlbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAoY3ZjOiBJTXlDYWxlbmRhclZpZXdDaGFuZ2VkKSA9PiB7XG4gICAgICAgICAgdGhpcy5lbWl0Q2FsZW5kYXJDaGFuZ2VkKGN2Yyk7XG4gICAgICAgIH0sXG4gICAgICAgIChyZHM6IElNeVJhbmdlRGF0ZVNlbGVjdGlvbikgPT4ge1xuICAgICAgICAgIHRoaXMuZW1pdFJhbmdlRGF0ZVNlbGVjdGlvbihyZHMpO1xuICAgICAgICB9LFxuICAgICAgICAodmE6IEFjdGl2ZVZpZXcpID0+IHtcbiAgICAgICAgICB0aGlzLmVtaXRWaWV3QWN0aXZhdGVkKHZhKTtcbiAgICAgICAgfSxcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuY2xvc2VTZWxlY3RvcihDYWxUb2dnbGUuQ2xvc2VCeUVzYyk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICB0aGlzLmVtaXRDYWxlbmRhclRvZ2dsZShDYWxUb2dnbGUuT3Blbik7XG5cbiAgICAgIGlmICghdGhpcy5vcHRzLmlubGluZSkge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKENMSUNLLCB0aGlzLm9uQ2xpY2tXcmFwcGVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnByZXZlbnRDbG9zZSA9IGZhbHNlO1xuICAgIH0sIFBSRVZFTlRfQ0xPU0VfVElNRU9VVCk7XG4gIH1cblxuICBwdWJsaWMgY2xvc2VDYWxlbmRhcigpOiB2b2lkIHtcbiAgICB0aGlzLmNsb3NlU2VsZWN0b3IoQ2FsVG9nZ2xlLkNsb3NlQnlDYWxCdG4pO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZUNhbGVuZGFyKCk6IGJvb2xlYW4gfCBudWxsIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGlzT3BlbjogYm9vbGVhbiA9IHRoaXMuY1JlZiA9PT0gbnVsbDtcblxuICAgIGlmIChpc09wZW4pIHtcbiAgICAgIHRoaXMub3BlbkNhbGVuZGFyKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5jbG9zZVNlbGVjdG9yKENhbFRvZ2dsZS5DbG9zZUJ5Q2FsQnRuKTtcbiAgICB9XG4gICAgcmV0dXJuIGlzT3BlbjtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhckRhdGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB7aW5saW5lfSA9IHRoaXMub3B0cztcblxuICAgIHRoaXMuc2V0SG9zdFZhbHVlKEVNUFRZX1NUUik7XG4gICAgdGhpcy5lbWl0RGF0ZUNoYW5nZWQoe1xuICAgICAgaXNSYW5nZTogdGhpcy5vcHRzLmRhdGVSYW5nZSxcbiAgICAgIHNpbmdsZURhdGU6IHtcbiAgICAgICAgZGF0ZTogdGhpcy51dGlsU2VydmljZS5yZXNldERhdGUoKSxcbiAgICAgICAganNEYXRlOiBudWxsLFxuICAgICAgICBmb3JtYXR0ZWQ6IEVNUFRZX1NUUixcbiAgICAgICAgZXBvYzogMFxuICAgICAgfSxcbiAgICAgIGRhdGVSYW5nZToge1xuICAgICAgICBiZWdpbkRhdGU6IHRoaXMudXRpbFNlcnZpY2UucmVzZXREYXRlKCksXG4gICAgICAgIGJlZ2luSnNEYXRlOiBudWxsLFxuICAgICAgICBiZWdpbkVwb2M6IDAsXG4gICAgICAgIGVuZERhdGU6IHRoaXMudXRpbFNlcnZpY2UucmVzZXREYXRlKCksXG4gICAgICAgIGVuZEpzRGF0ZTogbnVsbCxcbiAgICAgICAgZW5kRXBvYzogMCxcbiAgICAgICAgZm9ybWF0dGVkOiBFTVBUWV9TVFJcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMub25DaGFuZ2VDYihudWxsKTtcbiAgICB0aGlzLm9uVG91Y2hlZENiKCk7XG5cbiAgICBpZiAodGhpcy5jUmVmKSB7XG4gICAgICB0aGlzLmNSZWYuaW5zdGFuY2UuY2xlYXJEYXRlKCk7XG4gICAgfVxuXG4gICAgaWYgKCFpbmxpbmUpIHtcbiAgICAgIHRoaXMuY2xvc2VTZWxlY3RvcihDYWxUb2dnbGUuQ2xvc2VCeUNhbEJ0bik7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGlzRGF0ZVZhbGlkKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHZhbHVlOiBzdHJpbmcgPSB0aGlzLmdldEhvc3RWYWx1ZSgpO1xuXG4gICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSBFTVBUWV9TVFIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBsZXQgdmFsaWRhdGVPcHRzOiBJTXlWYWxpZGF0ZU9wdGlvbnMgPSBudWxsO1xuICAgIGlmICghdGhpcy5vcHRzLmRhdGVSYW5nZSkge1xuICAgICAgdmFsaWRhdGVPcHRzID0ge3ZhbGlkYXRlRGlzYWJsZWREYXRlczogdHJ1ZSwgc2VsZWN0ZWRWYWx1ZTogdGhpcy51dGlsU2VydmljZS5nZXRTZWxlY3RlZFZhbHVlKHRoaXMuc2VsZWN0ZWRWYWx1ZSwgZmFsc2UpfTtcbiAgICAgIGNvbnN0IGRhdGU6IElNeURhdGUgPSB0aGlzLnV0aWxTZXJ2aWNlLmlzRGF0ZVZhbGlkKHZhbHVlLCB0aGlzLm9wdHMsIHZhbGlkYXRlT3B0cyk7XG4gICAgICBpZiAodGhpcy51dGlsU2VydmljZS5pc0luaXRpYWxpemVkRGF0ZShkYXRlKSkge1xuICAgICAgICB0aGlzLmVtaXRJbnB1dEZpZWxkQ2hhbmdlZCh2YWx1ZSwgdHJ1ZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhbGlkYXRlT3B0cyA9IHt2YWxpZGF0ZURpc2FibGVkRGF0ZXM6IHRydWUsIHNlbGVjdGVkVmFsdWU6IHRoaXMudXRpbFNlcnZpY2UuZ2V0U2VsZWN0ZWRWYWx1ZSh0aGlzLnNlbGVjdGVkVmFsdWUsIHRydWUpfTtcbiAgICAgIGNvbnN0IHtiZWdpbiwgZW5kfSA9IHRoaXMudXRpbFNlcnZpY2UuaXNEYXRlVmFsaWREYXRlUmFuZ2UodmFsdWUsIHRoaXMub3B0cywgdmFsaWRhdGVPcHRzKTtcbiAgICAgIGlmICh0aGlzLnV0aWxTZXJ2aWNlLmlzSW5pdGlhbGl6ZWREYXRlKGJlZ2luKSAmJiB0aGlzLnV0aWxTZXJ2aWNlLmlzSW5pdGlhbGl6ZWREYXRlKGVuZCkpIHtcbiAgICAgICAgdGhpcy5lbWl0SW5wdXRGaWVsZENoYW5nZWQodmFsdWUsIHRydWUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgdGhpcy5lbWl0SW5wdXRGaWVsZENoYW5nZWQodmFsdWUsIGZhbHNlKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgaGVhZGVyQWN0aW9uKGhlYWRlckFjdGlvbjogSGVhZGVyQWN0aW9uKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY1JlZikge1xuICAgICAgdGhpcy5jUmVmLmluc3RhbmNlLmhlYWRlckFjdGlvbihoZWFkZXJBY3Rpb24pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXRIb3N0VmFsdWUodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHtkaXZIb3N0RWxlbWVudH0gPSB0aGlzLm9wdHM7XG4gICAgdGhpcy5ob3N0VGV4dCA9IHZhbHVlO1xuICAgIGNvbnN0IHZhbHVlVHlwZTogc3RyaW5nID0gIWRpdkhvc3RFbGVtZW50LmVuYWJsZWQgPyBWQUxVRSA6IElOTkVSX0hUTUw7XG4gICAgdmFsdWUgPSB2YWx1ZVR5cGUgPT09IElOTkVSX0hUTUwgJiYgdmFsdWUgPT09IEVNUFRZX1NUUiA/IGRpdkhvc3RFbGVtZW50LnBsYWNlaG9sZGVyIDogdmFsdWU7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsZW0ubmF0aXZlRWxlbWVudCwgdmFsdWVUeXBlLCB2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIGlnbm9yZUtleVByZXNzKGtleUNvZGU6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBrZXlDb2RlID09PSBLZXlDb2RlLmxlZnRBcnJvdyB8fCBrZXlDb2RlID09PSBLZXlDb2RlLnJpZ2h0QXJyb3cgfHwga2V5Q29kZSA9PT0gS2V5Q29kZS51cEFycm93IHx8IGtleUNvZGUgPT09IEtleUNvZGUuZG93bkFycm93IHx8IGtleUNvZGUgPT09IEtleUNvZGUudGFiIHx8IGtleUNvZGUgPT09IEtleUNvZGUuc2hpZnQ7XG4gIH1cblxuICBwcml2YXRlIG9uQW5pbWF0ZVdyYXBwZXIgPSAocmVhc29uOiBudW1iZXIpID0+IHRoaXMuYW5pbWF0aW9uRW5kKHJlYXNvbik7XG5cbiAgcHJpdmF0ZSBhbmltYXRpb25FbmQocmVhc29uOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jUmVmKSB7XG4gICAgICB0aGlzLmNSZWYuaW5zdGFuY2Uuc2VsZWN0b3JFbC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoQU5JTUFUSU9OX0VORCwgdGhpcy5vbkFuaW1hdGVXcmFwcGVyKTtcbiAgICAgIHRoaXMucmVtb3ZlQ29tcG9uZW50KCk7XG4gICAgICB0aGlzLmVtaXRDYWxlbmRhclRvZ2dsZShyZWFzb24pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2xvc2VTZWxlY3RvcihyZWFzb246IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IHtpbmxpbmUsIGNhbGVuZGFyQW5pbWF0aW9ufSA9IHRoaXMub3B0cztcbiAgICBcbiAgICBpZiAodGhpcy5jUmVmICYmICFpbmxpbmUpIHtcbiAgICAgIGlmIChjYWxlbmRhckFuaW1hdGlvbi5vdXQgIT09IENhbEFuaW1hdGlvbi5Ob25lKSB7XG4gICAgICAgIGNvbnN0IHtpbnN0YW5jZX0gPSB0aGlzLmNSZWY7XG4gICAgICAgIGluc3RhbmNlLnNlbGVjdG9yRWwubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKEFOSU1BVElPTl9FTkQsIHRoaXMub25BbmltYXRlV3JhcHBlci5iaW5kKHRoaXMsIHJlYXNvbikpO1xuICAgICAgICBpbnN0YW5jZS5zZXRDYWxlbmRhckFuaW1hdGlvbihjYWxlbmRhckFuaW1hdGlvbiwgZmFsc2UpO1xuXG4gICAgICAgIC8vIEluIGNhc2UgdGhlIGFuaW1hdGlvbmVuZCBldmVudCBpcyBub3QgZmlyZWRcbiAgICAgICAgc2V0VGltZW91dCh0aGlzLm9uQW5pbWF0ZVdyYXBwZXIuYmluZCh0aGlzLCByZWFzb24pLCBBTklNQVRJT05fVElNRU9VVCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW1vdmVDb21wb25lbnQoKTtcbiAgICAgICAgdGhpcy5lbWl0Q2FsZW5kYXJUb2dnbGUocmVhc29uKTtcbiAgICAgIH1cblxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihDTElDSywgdGhpcy5vbkNsaWNrV3JhcHBlcik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVDb21wb25lbnQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudmNSZWYgIT09IG51bGwpIHtcbiAgICAgIHRoaXMudmNSZWYucmVtb3ZlKHRoaXMudmNSZWYuaW5kZXhPZih0aGlzLmNSZWYuaG9zdFZpZXcpKTtcbiAgICAgIHRoaXMuY1JlZiA9IG51bGw7XG4gICAgfVxuICB9XG4gIFxuICBwcml2YXRlIHVwZGF0ZU1vZGVsKG1vZGVsOiBJTXlEYXRlTW9kZWwpOiB2b2lkIHtcbiAgICB0aGlzLnNldEhvc3RWYWx1ZSh0aGlzLnV0aWxTZXJ2aWNlLmdldEZvcm1hdHRlZERhdGUobW9kZWwpKTtcbiAgICB0aGlzLm9uQ2hhbmdlQ2IobW9kZWwpO1xuICAgIHRoaXMub25Ub3VjaGVkQ2IoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0SG9zdFZhbHVlKCk6IHN0cmluZyB7XG4gICAgY29uc3Qge3ZhbHVlLCBpbm5lckhUTUx9ID0gdGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQ7XG4gICAgcmV0dXJuICF0aGlzLm9wdHMuZGl2SG9zdEVsZW1lbnQuZW5hYmxlZCA/IHZhbHVlIDogaW5uZXJIVE1MO1xuICB9XG5cbiAgcHJpdmF0ZSBmb2N1c1RvSW5wdXQoKTogdm9pZCB7XG4gICAgY29uc3Qge2ZvY3VzSW5wdXRPbkRhdGVTZWxlY3QsIGRpdkhvc3RFbGVtZW50fSA9IHRoaXMub3B0cztcbiAgICBpZiAoZm9jdXNJbnB1dE9uRGF0ZVNlbGVjdCAmJiAhZGl2SG9zdEVsZW1lbnQuZW5hYmxlZCkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGVtaXREYXRlQ2hhbmdlZChkYXRlTW9kZWw6IElNeURhdGVNb2RlbCk6IHZvaWQge1xuICAgIHRoaXMuZGF0ZUNoYW5nZWQuZW1pdChkYXRlTW9kZWwpO1xuICAgIHRoaXMuc2V0U2VsZWN0ZWRWYWx1ZShkYXRlTW9kZWwpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRTZWxlY3RlZFZhbHVlKGRhdGVNb2RlbDogSU15RGF0ZU1vZGVsKTogdm9pZCB7XG4gICAgY29uc3Qge2lzUmFuZ2UsIGRhdGVSYW5nZSwgc2luZ2xlRGF0ZX0gPSBkYXRlTW9kZWw7XG4gICAgdGhpcy5zZWxlY3RlZFZhbHVlID0gaXNSYW5nZSA/IGRhdGVSYW5nZSA6IHNpbmdsZURhdGU7XG4gIH1cblxuICBwcml2YXRlIGVtaXRJbnB1dEZpZWxkQ2hhbmdlZCh2YWx1ZTogc3RyaW5nLCB2YWxpZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuaW5wdXRGaWVsZENoYW5nZWQuZW1pdCh7dmFsdWUsIGRhdGVGb3JtYXQ6IHRoaXMub3B0cy5kYXRlRm9ybWF0LCB2YWxpZH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBlbWl0Q2FsZW5kYXJDaGFuZ2VkKGN2YzogSU15Q2FsZW5kYXJWaWV3Q2hhbmdlZCk6IHZvaWQge1xuICAgIHRoaXMuY2FsZW5kYXJWaWV3Q2hhbmdlZC5lbWl0KGN2Yyk7XG4gIH1cblxuICBwcml2YXRlIGVtaXRSYW5nZURhdGVTZWxlY3Rpb24ocmRzOiBJTXlSYW5nZURhdGVTZWxlY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLnJhbmdlRGF0ZVNlbGVjdGlvbi5lbWl0KHJkcyk7XG4gIH1cblxuICBwcml2YXRlIGVtaXRWaWV3QWN0aXZhdGVkKHZhOiBBY3RpdmVWaWV3KTogdm9pZCB7XG4gICAgdGhpcy52aWV3QWN0aXZhdGVkLmVtaXQodmEpO1xuICB9XG5cbiAgcHJpdmF0ZSBlbWl0Q2FsZW5kYXJUb2dnbGUocmVhc29uOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmNhbGVuZGFyVG9nZ2xlLmVtaXQocmVhc29uKTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwZW5kU2VsZWN0b3IoZWxlbTogYW55KTogdm9pZCB7XG4gICAgaWYgKHRoaXMub3B0cy5hcHBlbmRTZWxlY3RvclRvQm9keSkge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihCT0RZKS5hcHBlbmRDaGlsZChlbGVtKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldFNlbGVjdG9yUG9zaXRpb24oZWxlbTogYW55KTogSU15U2VsZWN0b3JQb3NpdGlvbiB7XG4gICAgbGV0IHRvcDogbnVtYmVyID0gMDtcbiAgICBsZXQgbGVmdDogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0IHthcHBlbmRTZWxlY3RvclRvQm9keSwgb3BlblNlbGVjdG9yVG9wT2ZJbnB1dCwgc2VsZWN0b3JIZWlnaHQsIHNlbGVjdG9yV2lkdGgsIHNob3dTZWxlY3RvckFycm93LCBhbGlnblNlbGVjdG9yUmlnaHR9ID0gdGhpcy5vcHRzO1xuXG4gICAgaWYgKGFwcGVuZFNlbGVjdG9yVG9Cb2R5KSB7XG4gICAgICBjb25zdCBiOiBhbnkgPSBkb2N1bWVudC5ib2R5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgY29uc3QgZTogYW55ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHRvcCA9IGUudG9wIC0gYi50b3A7XG4gICAgICBsZWZ0ID0gZS5sZWZ0IC0gYi5sZWZ0O1xuICAgIH1cblxuICAgIGlmIChvcGVuU2VsZWN0b3JUb3BPZklucHV0KSB7XG4gICAgICB0b3AgPSB0b3AgLSB0aGlzLmdldFNlbGVjdG9yRGltZW5zaW9uKHNlbGVjdG9ySGVpZ2h0KSAtIDI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdG9wID0gdG9wICsgZWxlbS5vZmZzZXRIZWlnaHQgKyAoc2hvd1NlbGVjdG9yQXJyb3cgPyAxMiA6IDIpO1xuICAgIH1cblxuICAgIGlmIChhbGlnblNlbGVjdG9yUmlnaHQpIHtcbiAgICAgIGxlZnQgPSBsZWZ0ICsgZWxlbS5vZmZzZXRXaWR0aCAtIHRoaXMuZ2V0U2VsZWN0b3JEaW1lbnNpb24oc2VsZWN0b3JXaWR0aCk7XG4gICAgfVxuICAgIHJldHVybiB7dG9wOiB0b3AgKyBQWCwgbGVmdDogbGVmdCArIFBYfTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0U2VsZWN0b3JEaW1lbnNpb24odmFsdWU6IHN0cmluZyk6IG51bWJlciB7XG4gICAgcmV0dXJuIE51bWJlcih2YWx1ZS5yZXBsYWNlKFBYLCBFTVBUWV9TVFIpKTtcbiAgfVxufVxuIl19