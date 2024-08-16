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
var NGX_DP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return AngularMyDatePickerDirective; })),
    multi: true
};
/** @type {?} */
var NGX_DP_VALIDATORS = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return AngularMyDatePickerDirective; })),
    multi: true
};
var AngularMyDatePickerDirective = /** @class */ (function () {
    function AngularMyDatePickerDirective(localeService, utilService, vcRef, cfr, renderer, cdr, elem, config) {
        var _this = this;
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
        function () { });
        this.onTouchedCb = (/**
         * @return {?}
         */
        function () { });
        this.onClickWrapper = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.onClick(event); });
        this.onAnimateWrapper = (/**
         * @param {?} reason
         * @return {?}
         */
        function (reason) { return _this.animationEnd(reason); });
        this.opts = this.config.getDefaultConfig();
        this.parseOptions(this.opts);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.onKeyUp = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var keyCode = this.utilService.getKeyCodeFromEvent(event);
        if (this.ignoreKeyPress(keyCode)) {
            return;
        }
        if (keyCode === KeyCode.esc) {
            this.closeSelector(CalToggle.CloseByEsc);
        }
        else {
            var _a = this.opts, dateRange = _a.dateRange, dateFormat = _a.dateFormat, monthLabels = _a.monthLabels, dateRangeDatesDelimiter = _a.dateRangeDatesDelimiter;
            /** @type {?} */
            var value = this.getHostValue();
            /** @type {?} */
            var dateModel = null;
            /** @type {?} */
            var valid = false;
            /** @type {?} */
            var validateOpts = null;
            if (!dateRange) {
                validateOpts = { validateDisabledDates: true, selectedValue: this.utilService.getSelectedValue(this.selectedValue, false) };
                /** @type {?} */
                var date = this.utilService.isDateValid(value, this.opts, validateOpts);
                valid = this.utilService.isInitializedDate(date);
                if (valid) {
                    dateModel = this.utilService.getDateModel(date, null, dateFormat, monthLabels, dateRangeDatesDelimiter);
                }
            }
            else {
                validateOpts = { validateDisabledDates: true, selectedValue: this.utilService.getSelectedValue(this.selectedValue, true) };
                /** @type {?} */
                var range = this.utilService.isDateValidDateRange(value, this.opts, validateOpts);
                var begin = range.begin, end = range.end;
                valid = this.utilService.isInitializedDate(begin) && this.utilService.isInitializedDate(end);
                if (valid) {
                    dateModel = this.utilService.getDateModel(null, range, dateFormat, monthLabels, dateRangeDatesDelimiter);
                }
            }
            this.onChangeCb(dateModel);
            this.emitInputFieldChanged(value, valid);
        }
    };
    /**
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        var _a = this.opts, inputFieldValidation = _a.inputFieldValidation, dateRange = _a.dateRange, dateFormat = _a.dateFormat, monthLabels = _a.monthLabels, dateRangeDatesDelimiter = _a.dateRangeDatesDelimiter, closeSelectorOnDateSelect = _a.closeSelectorOnDateSelect;
        if (inputFieldValidation) {
            /** @type {?} */
            var value = this.getHostValue();
            /** @type {?} */
            var valid = false;
            /** @type {?} */
            var validateOpts = null;
            if (!dateRange) {
                validateOpts = { validateDisabledDates: true, selectedValue: this.utilService.getSelectedValue(this.selectedValue, false) };
                /** @type {?} */
                var date = this.utilService.isDateValid(value, this.opts, validateOpts);
                valid = this.utilService.isInitializedDate(date);
                if (valid && this.hostText !== value) {
                    // Valid date
                    /** @type {?} */
                    var dateModel = this.utilService.getDateModel(date, null, dateFormat, monthLabels, dateRangeDatesDelimiter);
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
                var dateRange_1 = this.utilService.isDateValidDateRange(value, this.opts, validateOpts);
                var begin = dateRange_1.begin, end = dateRange_1.end;
                valid = this.utilService.isInitializedDate(begin) && this.utilService.isInitializedDate(end);
                if (valid && this.hostText !== value) {
                    // Valid date range
                    /** @type {?} */
                    var dateModel = this.utilService.getDateModel(null, dateRange_1, dateFormat, monthLabels, dateRangeDatesDelimiter);
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
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.onClick = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.opts.closeSelectorOnDocumentClick && !this.preventClose && event.target && this.cRef
            && this.elem.nativeElement !== event.target && !this.cRef.location.nativeElement.contains(event.target)
            && !this.disabled) {
            this.closeSelector(CalToggle.CloseByOutClick);
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.hasOwnProperty(LOCALE)) {
            this.setLocaleOptions();
        }
        if (changes.hasOwnProperty(DEFAULT_MONTH)) {
            /** @type {?} */
            var dm = changes[DEFAULT_MONTH].currentValue;
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
    };
    /**
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.closeCalendar();
    };
    /**
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.setLocaleOptions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var opts = this.localeService.getLocaleOptions(this.locale);
        Object.keys(opts).forEach((/**
         * @param {?} k
         * @return {?}
         */
        function (k) {
            ((/** @type {?} */ (_this.opts)))[k] = opts[k];
        }));
    };
    /**
     * @param {?} opts
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.parseOptions = /**
     * @param {?} opts
     * @return {?}
     */
    function (opts) {
        var _this = this;
        if (opts) {
            Object.keys(opts).forEach((/**
             * @param {?} k
             * @return {?}
             */
            function (k) {
                ((/** @type {?} */ (_this.opts)))[k] = opts[k];
            }));
        }
        var _a = this.opts, minYear = _a.minYear, maxYear = _a.maxYear, openSelectorTopOfInput = _a.openSelectorTopOfInput, inline = _a.inline;
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
    };
    /**
     * @param {?} value
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.disabled) {
            return;
        }
        /** @type {?} */
        var validateOpts = null;
        var _a = this.opts, dateFormat = _a.dateFormat, monthLabels = _a.monthLabels, dateRangeDatesDelimiter = _a.dateRangeDatesDelimiter, inline = _a.inline;
        if (!value) {
            this.setHostValue(EMPTY_STR);
            this.emitInputFieldChanged(EMPTY_STR, false);
            if (this.cRef) {
                this.cRef.instance.resetDateValue();
            }
        }
        else if (!value.isRange && value.singleDate) {
            // single date
            var _b = value.singleDate, date = _b.date, jsDate = _b.jsDate;
            if (!date) {
                date = this.utilService.jsDateToMyDate(jsDate);
            }
            /** @type {?} */
            var formatted = this.utilService.formatDate(date, dateFormat, monthLabels);
            validateOpts = { validateDisabledDates: false, selectedValue: this.utilService.getSelectedValue(this.selectedValue, false) };
            /** @type {?} */
            var valid = this.utilService.isInitializedDate(this.utilService.isDateValid(formatted, this.opts, validateOpts));
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
            var _c = value.dateRange, beginDate = _c.beginDate, beginJsDate = _c.beginJsDate, endDate = _c.endDate, endJsDate = _c.endJsDate;
            if (!beginDate || !endDate) {
                beginDate = this.utilService.jsDateToMyDate(beginJsDate);
                endDate = this.utilService.jsDateToMyDate(endJsDate);
            }
            /** @type {?} */
            var formatted = this.utilService.formatDate(beginDate, dateFormat, monthLabels) + dateRangeDatesDelimiter +
                this.utilService.formatDate(endDate, dateFormat, monthLabels);
            validateOpts = { validateDisabledDates: false, selectedValue: this.utilService.getSelectedValue(this.selectedValue, true) };
            var _d = this.utilService.isDateValidDateRange(formatted, this.opts, validateOpts), begin = _d.begin, end = _d.end;
            /** @type {?} */
            var valid = this.utilService.isInitializedDate(begin) && this.utilService.isInitializedDate(end);
            if (valid) {
                this.setHostValue(formatted);
                this.emitInputFieldChanged(formatted, valid);
                /** @type {?} */
                var dateRange = { begin: beginDate, end: endDate };
                this.setSelectedValue(this.utilService.getDateModel(null, dateRange, dateFormat, monthLabels, dateRangeDatesDelimiter));
                if (this.cRef) {
                    this.cRef.instance.refreshComponent(this.opts, this.defaultMonth, this.selectedValue, this.getHostValue());
                }
            }
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCb = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCb = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
        this.renderer.setProperty(this.elem.nativeElement, DISABLED, isDisabled);
        if (isDisabled) {
            this.closeCalendar();
        }
    };
    /**
     * @param {?} c
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.validate = /**
     * @param {?} c
     * @return {?}
     */
    function (c) {
        /** @type {?} */
        var value = this.getHostValue();
        if (value === null || value === EMPTY_STR) {
            return null;
        }
        /** @type {?} */
        var validateOpts = null;
        if (!this.opts.dateRange) {
            validateOpts = { validateDisabledDates: true, selectedValue: this.utilService.getSelectedValue(this.selectedValue, false) };
            /** @type {?} */
            var date = this.utilService.isDateValid(value, this.opts, validateOpts);
            if (!this.utilService.isInitializedDate(date)) {
                return { invalidDateFormat: true };
            }
        }
        else {
            validateOpts = { validateDisabledDates: true, selectedValue: this.utilService.getSelectedValue(this.selectedValue, true) };
            var _a = this.utilService.isDateValidDateRange(value, this.opts, validateOpts), begin = _a.begin, end = _a.end;
            if (!this.utilService.isInitializedDate(begin) || !this.utilService.isInitializedDate(end)) {
                return { invalidDateFormat: true };
            }
        }
        return null;
    };
    /**
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.openCalendar = /**
     * @return {?}
     */
    function () {
        var _this = this;
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
            function (dm, close) {
                _this.focusToInput();
                _this.emitDateChanged(dm);
                _this.emitInputFieldChanged(_this.utilService.getFormattedDate(dm), true);
                _this.updateModel(dm);
                if (close) {
                    _this.closeSelector(CalToggle.CloseByDateSel);
                }
            }), (/**
             * @param {?} cvc
             * @return {?}
             */
            function (cvc) {
                _this.emitCalendarChanged(cvc);
            }), (/**
             * @param {?} rds
             * @return {?}
             */
            function (rds) {
                _this.emitRangeDateSelection(rds);
            }), (/**
             * @param {?} va
             * @return {?}
             */
            function (va) {
                _this.emitViewActivated(va);
            }), (/**
             * @return {?}
             */
            function () {
                _this.closeSelector(CalToggle.CloseByEsc);
            }));
            this.emitCalendarToggle(CalToggle.Open);
            if (!this.opts.inline) {
                document.addEventListener(CLICK, this.onClickWrapper);
            }
        }
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.preventClose = false;
        }), PREVENT_CLOSE_TIMEOUT);
    };
    /**
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.closeCalendar = /**
     * @return {?}
     */
    function () {
        this.closeSelector(CalToggle.CloseByCalBtn);
    };
    /**
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.toggleCalendar = /**
     * @return {?}
     */
    function () {
        if (this.disabled) {
            return;
        }
        /** @type {?} */
        var isOpen = this.cRef === null;
        if (isOpen) {
            this.openCalendar();
        }
        else {
            this.closeSelector(CalToggle.CloseByCalBtn);
        }
        return isOpen;
    };
    /**
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.clearDate = /**
     * @return {?}
     */
    function () {
        if (this.disabled) {
            return;
        }
        var inline = this.opts.inline;
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
    };
    /**
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.isDateValid = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var value = this.getHostValue();
        if (value === null || value === EMPTY_STR) {
            return false;
        }
        /** @type {?} */
        var validateOpts = null;
        if (!this.opts.dateRange) {
            validateOpts = { validateDisabledDates: true, selectedValue: this.utilService.getSelectedValue(this.selectedValue, false) };
            /** @type {?} */
            var date = this.utilService.isDateValid(value, this.opts, validateOpts);
            if (this.utilService.isInitializedDate(date)) {
                this.emitInputFieldChanged(value, true);
                return true;
            }
        }
        else {
            validateOpts = { validateDisabledDates: true, selectedValue: this.utilService.getSelectedValue(this.selectedValue, true) };
            var _a = this.utilService.isDateValidDateRange(value, this.opts, validateOpts), begin = _a.begin, end = _a.end;
            if (this.utilService.isInitializedDate(begin) && this.utilService.isInitializedDate(end)) {
                this.emitInputFieldChanged(value, true);
                return true;
            }
        }
        this.emitInputFieldChanged(value, false);
        return false;
    };
    /**
     * @param {?} headerAction
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.headerAction = /**
     * @param {?} headerAction
     * @return {?}
     */
    function (headerAction) {
        if (this.cRef) {
            this.cRef.instance.headerAction(headerAction);
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.setHostValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var divHostElement = this.opts.divHostElement;
        this.hostText = value;
        /** @type {?} */
        var valueType = !divHostElement.enabled ? VALUE : INNER_HTML;
        value = valueType === INNER_HTML && value === EMPTY_STR ? divHostElement.placeholder : value;
        this.renderer.setProperty(this.elem.nativeElement, valueType, value);
    };
    /**
     * @private
     * @param {?} keyCode
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.ignoreKeyPress = /**
     * @private
     * @param {?} keyCode
     * @return {?}
     */
    function (keyCode) {
        return keyCode === KeyCode.leftArrow || keyCode === KeyCode.rightArrow || keyCode === KeyCode.upArrow || keyCode === KeyCode.downArrow || keyCode === KeyCode.tab || keyCode === KeyCode.shift;
    };
    /**
     * @private
     * @param {?} reason
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.animationEnd = /**
     * @private
     * @param {?} reason
     * @return {?}
     */
    function (reason) {
        if (this.cRef) {
            this.cRef.instance.selectorEl.nativeElement.removeEventListener(ANIMATION_END, this.onAnimateWrapper);
            this.removeComponent();
            this.emitCalendarToggle(reason);
        }
    };
    /**
     * @private
     * @param {?} reason
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.closeSelector = /**
     * @private
     * @param {?} reason
     * @return {?}
     */
    function (reason) {
        var _a = this.opts, inline = _a.inline, calendarAnimation = _a.calendarAnimation;
        if (this.cRef && !inline) {
            if (calendarAnimation.out !== CalAnimation.None) {
                var instance = this.cRef.instance;
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
    };
    /**
     * @private
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.removeComponent = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.vcRef !== null) {
            this.vcRef.remove(this.vcRef.indexOf(this.cRef.hostView));
            this.cRef = null;
        }
    };
    /**
     * @private
     * @param {?} model
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.updateModel = /**
     * @private
     * @param {?} model
     * @return {?}
     */
    function (model) {
        this.setHostValue(this.utilService.getFormattedDate(model));
        this.onChangeCb(model);
        this.onTouchedCb();
    };
    /**
     * @private
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.getHostValue = /**
     * @private
     * @return {?}
     */
    function () {
        var _a = this.elem.nativeElement, value = _a.value, innerHTML = _a.innerHTML;
        return !this.opts.divHostElement.enabled ? value : innerHTML;
    };
    /**
     * @private
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.focusToInput = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        var _a = this.opts, focusInputOnDateSelect = _a.focusInputOnDateSelect, divHostElement = _a.divHostElement;
        if (focusInputOnDateSelect && !divHostElement.enabled) {
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.elem.nativeElement.focus();
            }));
        }
    };
    /**
     * @private
     * @param {?} dateModel
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.emitDateChanged = /**
     * @private
     * @param {?} dateModel
     * @return {?}
     */
    function (dateModel) {
        this.dateChanged.emit(dateModel);
        this.setSelectedValue(dateModel);
    };
    /**
     * @private
     * @param {?} dateModel
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.setSelectedValue = /**
     * @private
     * @param {?} dateModel
     * @return {?}
     */
    function (dateModel) {
        var isRange = dateModel.isRange, dateRange = dateModel.dateRange, singleDate = dateModel.singleDate;
        this.selectedValue = isRange ? dateRange : singleDate;
    };
    /**
     * @private
     * @param {?} value
     * @param {?} valid
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.emitInputFieldChanged = /**
     * @private
     * @param {?} value
     * @param {?} valid
     * @return {?}
     */
    function (value, valid) {
        this.inputFieldChanged.emit({ value: value, dateFormat: this.opts.dateFormat, valid: valid });
    };
    /**
     * @private
     * @param {?} cvc
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.emitCalendarChanged = /**
     * @private
     * @param {?} cvc
     * @return {?}
     */
    function (cvc) {
        this.calendarViewChanged.emit(cvc);
    };
    /**
     * @private
     * @param {?} rds
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.emitRangeDateSelection = /**
     * @private
     * @param {?} rds
     * @return {?}
     */
    function (rds) {
        this.rangeDateSelection.emit(rds);
    };
    /**
     * @private
     * @param {?} va
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.emitViewActivated = /**
     * @private
     * @param {?} va
     * @return {?}
     */
    function (va) {
        this.viewActivated.emit(va);
    };
    /**
     * @private
     * @param {?} reason
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.emitCalendarToggle = /**
     * @private
     * @param {?} reason
     * @return {?}
     */
    function (reason) {
        this.calendarToggle.emit(reason);
    };
    /**
     * @private
     * @param {?} elem
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.appendSelector = /**
     * @private
     * @param {?} elem
     * @return {?}
     */
    function (elem) {
        if (this.opts.appendSelectorToBody) {
            document.querySelector(BODY).appendChild(elem);
        }
    };
    /**
     * @private
     * @param {?} elem
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.getSelectorPosition = /**
     * @private
     * @param {?} elem
     * @return {?}
     */
    function (elem) {
        /** @type {?} */
        var top = 0;
        /** @type {?} */
        var left = 0;
        var _a = this.opts, appendSelectorToBody = _a.appendSelectorToBody, openSelectorTopOfInput = _a.openSelectorTopOfInput, selectorHeight = _a.selectorHeight, selectorWidth = _a.selectorWidth, showSelectorArrow = _a.showSelectorArrow, alignSelectorRight = _a.alignSelectorRight;
        if (appendSelectorToBody) {
            /** @type {?} */
            var b = document.body.getBoundingClientRect();
            /** @type {?} */
            var e = elem.getBoundingClientRect();
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
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    AngularMyDatePickerDirective.prototype.getSelectorDimension = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return Number(value.replace(PX, EMPTY_STR));
    };
    AngularMyDatePickerDirective.decorators = [
        { type: Directive, args: [{
                    selector: "[angular-mydatepicker]",
                    exportAs: "angular-mydatepicker",
                    providers: [UtilService, LocaleService, DefaultConfigService, NGX_DP_VALUE_ACCESSOR, NGX_DP_VALIDATORS]
                },] }
    ];
    /** @nocollapse */
    AngularMyDatePickerDirective.ctorParameters = function () { return [
        { type: LocaleService },
        { type: UtilService },
        { type: ViewContainerRef },
        { type: ComponentFactoryResolver },
        { type: Renderer2 },
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: DefaultConfigService }
    ]; };
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
    return AngularMyDatePickerDirective;
}());
export { AngularMyDatePickerDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1teWRhdGVwaWNrZXIuaW5wdXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW15ZGF0ZXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9hbmd1bGFyLW15ZGF0ZXBpY2tlci5pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQWdCLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQ2hHLHdCQUF3QixFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUE0QixZQUFZLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDdEksT0FBTyxFQUF3QyxhQUFhLEVBQUUsaUJBQWlCLEVBQVksTUFBTSxnQkFBZ0IsQ0FBQztBQUNsSCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQVczRSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sZ0RBQWdELENBQUM7QUFDN0UsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDhDQUE4QyxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGdEQUFnRCxDQUFDO0FBQ3BGLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUNsRCxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDdkMsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzlDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUd4RCxPQUFPLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLHFCQUFxQixFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQ3pHLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsaUJBQWlCLEVB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QUUsYUFBYSxFQUFFLG9CQUFvQixFQUFFLHFCQUFxQixFQUFFLGlCQUFpQixDQUFDO2lCQUN4Rzs7OztnQkE1Qk8sYUFBYTtnQkFDYixXQUFXO2dCQWZpQyxnQkFBZ0I7Z0JBQ2xFLHdCQUF3QjtnQkFENEMsU0FBUztnQkFBRSxpQkFBaUI7Z0JBQTFELFVBQVU7Z0JBZ0IxQyxvQkFBb0I7OzswQkE0QnpCLEtBQUs7eUJBQ0wsS0FBSzsrQkFDTCxLQUFLOzhCQUVMLE1BQU07b0NBQ04sTUFBTTtzQ0FDTixNQUFNO2lDQUNOLE1BQU07cUNBQ04sTUFBTTtnQ0FDTixNQUFNOzBCQXlCTixZQUFZLFNBQUMsS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDO3lCQXVDOUIsWUFBWSxTQUFDLElBQUk7O0lBK2ZwQixtQ0FBQztDQUFBLEFBOWtCRCxJQThrQkM7U0F6a0JZLDRCQUE0Qjs7O0lBQ3ZDLCtDQUE2Qjs7SUFDN0IsOENBQXdCOztJQUN4QixvREFBeUY7O0lBRXpGLG1EQUFxRjs7SUFDckYseURBQTJHOztJQUMzRywyREFBaUg7O0lBQ2pILHNEQUE0RTs7SUFDNUUsMERBQThHOztJQUM5RyxxREFBbUY7Ozs7O0lBRW5GLDRDQUFxRDs7Ozs7SUFDckQsZ0RBQXFDOzs7OztJQUNyQyxvREFBc0M7Ozs7O0lBQ3RDLGdEQUF5Qjs7Ozs7SUFDekIscURBQWtDOzs7OztJQUVsQyw0Q0FBeUI7O0lBRXpCLGtEQUF5Qzs7SUFDekMsbURBQW9DOzs7OztJQTBHcEMsc0RBQTZEOzs7OztJQStVN0Qsd0RBQXlFOzs7OztJQXZiN0QscURBQW9DOzs7OztJQUNwQyxtREFBZ0M7Ozs7O0lBQ2hDLDZDQUErQjs7Ozs7SUFDL0IsMkNBQXFDOzs7OztJQUNyQyxnREFBMkI7Ozs7O0lBQzNCLDJDQUE4Qjs7Ozs7SUFDOUIsNENBQXdCOzs7OztJQUN4Qiw4Q0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgSW5wdXQsIENvbXBvbmVudFJlZiwgRWxlbWVudFJlZiwgVmlld0NvbnRhaW5lclJlZiwgUmVuZGVyZXIyLCBDaGFuZ2VEZXRlY3RvclJlZiwgXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgZm9yd2FyZFJlZiwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMsIE9uQ2hhbmdlcywgSG9zdExpc3RlbmVyLCBPbkRlc3Ryb3l9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTElEQVRPUlMsIE5HX1ZBTFVFX0FDQ0VTU09SLCBWYWxpZGF0b3J9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtDYWxlbmRhckNvbXBvbmVudH0gZnJvbSBcIi4vY29tcG9uZW50cy9jYWxlbmRhci9jYWxlbmRhci5jb21wb25lbnRcIjtcbmltcG9ydCB7SU15RGF0ZX0gZnJvbSBcIi4vaW50ZXJmYWNlcy9teS1kYXRlLmludGVyZmFjZVwiO1xuaW1wb3J0IHtJTXlPcHRpb25zfSBmcm9tIFwiLi9pbnRlcmZhY2VzL215LW9wdGlvbnMuaW50ZXJmYWNlXCI7XG5pbXBvcnQge0lNeURhdGVNb2RlbH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9teS1kYXRlLW1vZGVsLmludGVyZmFjZVwiO1xuaW1wb3J0IHtJTXlEYXRlUmFuZ2V9IGZyb20gXCIuL2ludGVyZmFjZXMvbXktZGF0ZS1yYW5nZS5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SU15UmFuZ2VEYXRlU2VsZWN0aW9ufSBmcm9tIFwiLi9pbnRlcmZhY2VzL215LXJhbmdlLWRhdGUtc2VsZWN0aW9uLmludGVyZmFjZVwiO1xuaW1wb3J0IHtJTXlDYWxlbmRhclZpZXdDaGFuZ2VkfSBmcm9tIFwiLi9pbnRlcmZhY2VzL215LWNhbGVuZGFyLXZpZXctY2hhbmdlZC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SU15SW5wdXRGaWVsZENoYW5nZWR9IGZyb20gXCIuL2ludGVyZmFjZXMvbXktaW5wdXQtZmllbGQtY2hhbmdlZC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SU15U2VsZWN0b3JQb3NpdGlvbn0gZnJvbSBcIi4vaW50ZXJmYWNlcy9teS1zZWxlY3Rvci1wb3MuaW50ZXJmYWNlXCI7XG5pbXBvcnQge0lNeVZhbGlkYXRlT3B0aW9uc30gZnJvbSBcIi4vaW50ZXJmYWNlcy9teS12YWxpZGF0ZS1vcHRpb25zLmludGVyZmFjZVwiO1xuaW1wb3J0IHtJTXlEZWZhdWx0TW9udGh9IGZyb20gXCIuL2ludGVyZmFjZXMvbXktZGVmYXVsdC1tb250aC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7TG9jYWxlU2VydmljZX0gZnJvbSBcIi4vc2VydmljZXMvYW5ndWxhci1teWRhdGVwaWNrZXIubG9jYWxlLnNlcnZpY2VcIjtcbmltcG9ydCB7VXRpbFNlcnZpY2V9IGZyb20gXCIuL3NlcnZpY2VzL2FuZ3VsYXItbXlkYXRlcGlja2VyLnV0aWwuc2VydmljZVwiO1xuaW1wb3J0IHtEZWZhdWx0Q29uZmlnU2VydmljZX0gZnJvbSBcIi4vc2VydmljZXMvYW5ndWxhci1teWRhdGVwaWNrZXIuY29uZmlnLnNlcnZpY2VcIjtcbmltcG9ydCB7Q2FsVG9nZ2xlfSBmcm9tIFwiLi9lbnVtcy9jYWwtdG9nZ2xlLmVudW1cIjtcbmltcG9ydCB7WWVhcn0gZnJvbSBcIi4vZW51bXMveWVhci5lbnVtXCI7XG5pbXBvcnQge0tleUNvZGV9IGZyb20gXCIuL2VudW1zL2tleS1jb2RlLmVudW1cIjtcbmltcG9ydCB7Q2FsQW5pbWF0aW9ufSBmcm9tIFwiLi9lbnVtcy9jYWwtYW5pbWF0aW9uLmVudW1cIjtcbmltcG9ydCB7SGVhZGVyQWN0aW9ufSBmcm9tIFwiLi9lbnVtcy9oZWFkZXItYWN0aW9uLmVudW1cIjtcbmltcG9ydCB7QWN0aXZlVmlld30gZnJvbSBcIi4vZW51bXMvYWN0aXZlLXZpZXcuZW51bVwiO1xuaW1wb3J0IHtLRVlVUCwgQkxVUiwgRU1QVFlfU1RSLCBESVNBQkxFRCwgQ0xJQ0ssIEJPRFksIFZBTFVFLCBQUkVWRU5UX0NMT1NFX1RJTUVPVVQsIE9QVElPTlMsIERFRkFVTFRfTU9OVEgsIFxuICBMT0NBTEUsIE9CSkVDVCwgUFgsIElOTkVSX0hUTUwsIEFOSU1BVElPTl9FTkQsIEFOSU1BVElPTl9USU1FT1VUfSBmcm9tIFwiLi9jb25zdGFudHMvY29uc3RhbnRzXCI7XG5cbmNvbnN0IE5HWF9EUF9WQUxVRV9BQ0NFU1NPUiA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEFuZ3VsYXJNeURhdGVQaWNrZXJEaXJlY3RpdmUpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuY29uc3QgTkdYX0RQX1ZBTElEQVRPUlMgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEFuZ3VsYXJNeURhdGVQaWNrZXJEaXJlY3RpdmUpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiBcIlthbmd1bGFyLW15ZGF0ZXBpY2tlcl1cIixcbiAgZXhwb3J0QXM6IFwiYW5ndWxhci1teWRhdGVwaWNrZXJcIixcbiAgcHJvdmlkZXJzOiBbVXRpbFNlcnZpY2UsIExvY2FsZVNlcnZpY2UsIERlZmF1bHRDb25maWdTZXJ2aWNlLCBOR1hfRFBfVkFMVUVfQUNDRVNTT1IsIE5HWF9EUF9WQUxJREFUT1JTXVxufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFyTXlEYXRlUGlja2VyRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBWYWxpZGF0b3Ige1xuICBASW5wdXQoKSBvcHRpb25zOiBJTXlPcHRpb25zO1xuICBASW5wdXQoKSBsb2NhbGU6IHN0cmluZztcbiAgQElucHV0KCkgZGVmYXVsdE1vbnRoOiBJTXlEZWZhdWx0TW9udGggPSB7ZGVmTW9udGg6IEVNUFRZX1NUUiwgb3ZlcnJpZGVTZWxlY3Rpb246IGZhbHNlfTtcblxuICBAT3V0cHV0KCkgZGF0ZUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxJTXlEYXRlTW9kZWw+ID0gbmV3IEV2ZW50RW1pdHRlcjxJTXlEYXRlTW9kZWw+KCk7XG4gIEBPdXRwdXQoKSBpbnB1dEZpZWxkQ2hhbmdlZDogRXZlbnRFbWl0dGVyPElNeUlucHV0RmllbGRDaGFuZ2VkPiA9IG5ldyBFdmVudEVtaXR0ZXI8SU15SW5wdXRGaWVsZENoYW5nZWQ+KCk7XG4gIEBPdXRwdXQoKSBjYWxlbmRhclZpZXdDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8SU15Q2FsZW5kYXJWaWV3Q2hhbmdlZD4gPSBuZXcgRXZlbnRFbWl0dGVyPElNeUNhbGVuZGFyVmlld0NoYW5nZWQ+KCk7XG4gIEBPdXRwdXQoKSBjYWxlbmRhclRvZ2dsZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgQE91dHB1dCgpIHJhbmdlRGF0ZVNlbGVjdGlvbjogRXZlbnRFbWl0dGVyPElNeVJhbmdlRGF0ZVNlbGVjdGlvbj4gPSBuZXcgRXZlbnRFbWl0dGVyPElNeVJhbmdlRGF0ZVNlbGVjdGlvbj4oKTtcbiAgQE91dHB1dCgpIHZpZXdBY3RpdmF0ZWQ6IEV2ZW50RW1pdHRlcjxBY3RpdmVWaWV3PiA9IG5ldyBFdmVudEVtaXR0ZXI8QWN0aXZlVmlldz4oKTtcblxuICBwcml2YXRlIGNSZWY6IENvbXBvbmVudFJlZjxDYWxlbmRhckNvbXBvbmVudD4gPSBudWxsO1xuICBwcml2YXRlIGhvc3RUZXh0OiBzdHJpbmcgPSBFTVBUWV9TVFI7XG4gIHByaXZhdGUgcHJldmVudENsb3NlOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgZGlzYWJsZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBzZWxlY3RlZFZhbHVlOiBhbnkgPSBudWxsO1xuXG4gIHByaXZhdGUgb3B0czogSU15T3B0aW9ucztcblxuICBvbkNoYW5nZUNiOiAoXzogYW55KSA9PiB2b2lkID0gKCkgPT4geyB9O1xuICBvblRvdWNoZWRDYjogKCkgPT4gdm9pZCA9ICgpID0+IHsgfTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxvY2FsZVNlcnZpY2U6IExvY2FsZVNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgdXRpbFNlcnZpY2U6IFV0aWxTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIGNmcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgICAgICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBlbGVtOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIGNvbmZpZzogRGVmYXVsdENvbmZpZ1NlcnZpY2UpIHtcbiAgICB0aGlzLm9wdHMgPSB0aGlzLmNvbmZpZy5nZXREZWZhdWx0Q29uZmlnKCk7XG4gICAgdGhpcy5wYXJzZU9wdGlvbnModGhpcy5vcHRzKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoS0VZVVAsIFtcIiRldmVudFwiXSkgb25LZXlVcChldmVudDogYW55KSB7XG4gICAgY29uc3Qga2V5Q29kZTogbnVtYmVyID0gdGhpcy51dGlsU2VydmljZS5nZXRLZXlDb2RlRnJvbUV2ZW50KGV2ZW50KTtcbiAgICBpZiAodGhpcy5pZ25vcmVLZXlQcmVzcyhrZXlDb2RlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBcbiAgICBpZiAoa2V5Q29kZSA9PT0gS2V5Q29kZS5lc2MpIHtcbiAgICAgIHRoaXMuY2xvc2VTZWxlY3RvcihDYWxUb2dnbGUuQ2xvc2VCeUVzYyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY29uc3Qge2RhdGVSYW5nZSwgZGF0ZUZvcm1hdCwgbW9udGhMYWJlbHMsIGRhdGVSYW5nZURhdGVzRGVsaW1pdGVyfSA9IHRoaXMub3B0cztcbiAgICAgIGNvbnN0IHZhbHVlOiBzdHJpbmcgPSB0aGlzLmdldEhvc3RWYWx1ZSgpO1xuXG4gICAgICBsZXQgZGF0ZU1vZGVsOiBJTXlEYXRlTW9kZWwgPSBudWxsO1xuICAgICAgbGV0IHZhbGlkOiBib29sZWFuID0gZmFsc2U7XG4gICAgICBsZXQgdmFsaWRhdGVPcHRzOiBJTXlWYWxpZGF0ZU9wdGlvbnMgPSBudWxsO1xuICAgICAgaWYgKCFkYXRlUmFuZ2UpIHtcbiAgICAgICAgdmFsaWRhdGVPcHRzID0ge3ZhbGlkYXRlRGlzYWJsZWREYXRlczogdHJ1ZSwgc2VsZWN0ZWRWYWx1ZTogdGhpcy51dGlsU2VydmljZS5nZXRTZWxlY3RlZFZhbHVlKHRoaXMuc2VsZWN0ZWRWYWx1ZSwgZmFsc2UpfTtcbiAgICAgICAgY29uc3QgZGF0ZTogSU15RGF0ZSA9IHRoaXMudXRpbFNlcnZpY2UuaXNEYXRlVmFsaWQodmFsdWUsIHRoaXMub3B0cywgdmFsaWRhdGVPcHRzKTtcbiAgICAgICAgdmFsaWQgPSB0aGlzLnV0aWxTZXJ2aWNlLmlzSW5pdGlhbGl6ZWREYXRlKGRhdGUpO1xuICAgICAgICBpZiAodmFsaWQpIHtcbiAgICAgICAgICBkYXRlTW9kZWwgPSB0aGlzLnV0aWxTZXJ2aWNlLmdldERhdGVNb2RlbChkYXRlLCBudWxsLCBkYXRlRm9ybWF0LCBtb250aExhYmVscywgZGF0ZVJhbmdlRGF0ZXNEZWxpbWl0ZXIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFsaWRhdGVPcHRzID0ge3ZhbGlkYXRlRGlzYWJsZWREYXRlczogdHJ1ZSwgc2VsZWN0ZWRWYWx1ZTogdGhpcy51dGlsU2VydmljZS5nZXRTZWxlY3RlZFZhbHVlKHRoaXMuc2VsZWN0ZWRWYWx1ZSwgdHJ1ZSl9O1xuICAgICAgICBjb25zdCByYW5nZSA9IHRoaXMudXRpbFNlcnZpY2UuaXNEYXRlVmFsaWREYXRlUmFuZ2UodmFsdWUsIHRoaXMub3B0cywgdmFsaWRhdGVPcHRzKTtcbiAgICAgICAgY29uc3Qge2JlZ2luLCBlbmR9ID0gcmFuZ2U7XG4gICAgICAgIHZhbGlkID0gdGhpcy51dGlsU2VydmljZS5pc0luaXRpYWxpemVkRGF0ZShiZWdpbikgJiYgdGhpcy51dGlsU2VydmljZS5pc0luaXRpYWxpemVkRGF0ZShlbmQpO1xuICAgICAgICBpZiAodmFsaWQpIHtcbiAgICAgICAgICBkYXRlTW9kZWwgPSB0aGlzLnV0aWxTZXJ2aWNlLmdldERhdGVNb2RlbChudWxsLCByYW5nZSwgZGF0ZUZvcm1hdCwgbW9udGhMYWJlbHMsIGRhdGVSYW5nZURhdGVzRGVsaW1pdGVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLm9uQ2hhbmdlQ2IoZGF0ZU1vZGVsKTtcbiAgICAgIHRoaXMuZW1pdElucHV0RmllbGRDaGFuZ2VkKHZhbHVlLCB2YWxpZCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcihCTFVSKSBvbkJsdXIoKSB7XG4gICAgY29uc3Qge2lucHV0RmllbGRWYWxpZGF0aW9uLCBkYXRlUmFuZ2UsIGRhdGVGb3JtYXQsIG1vbnRoTGFiZWxzLCBkYXRlUmFuZ2VEYXRlc0RlbGltaXRlciwgY2xvc2VTZWxlY3Rvck9uRGF0ZVNlbGVjdH0gPSB0aGlzLm9wdHM7XG5cbiAgICBpZiAoaW5wdXRGaWVsZFZhbGlkYXRpb24pIHtcbiAgICAgIGNvbnN0IHZhbHVlOiBzdHJpbmcgPSB0aGlzLmdldEhvc3RWYWx1ZSgpO1xuXG4gICAgICBsZXQgdmFsaWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgIGxldCB2YWxpZGF0ZU9wdHM6IElNeVZhbGlkYXRlT3B0aW9ucyA9IG51bGw7XG4gICAgICBpZiAoIWRhdGVSYW5nZSkge1xuICAgICAgICB2YWxpZGF0ZU9wdHMgPSB7dmFsaWRhdGVEaXNhYmxlZERhdGVzOiB0cnVlLCBzZWxlY3RlZFZhbHVlOiB0aGlzLnV0aWxTZXJ2aWNlLmdldFNlbGVjdGVkVmFsdWUodGhpcy5zZWxlY3RlZFZhbHVlLCBmYWxzZSl9O1xuICAgICAgICBjb25zdCBkYXRlOiBJTXlEYXRlID0gdGhpcy51dGlsU2VydmljZS5pc0RhdGVWYWxpZCh2YWx1ZSwgdGhpcy5vcHRzLCB2YWxpZGF0ZU9wdHMpO1xuICAgICAgICB2YWxpZCA9IHRoaXMudXRpbFNlcnZpY2UuaXNJbml0aWFsaXplZERhdGUoZGF0ZSk7XG4gICAgICAgIGlmICh2YWxpZCAmJiB0aGlzLmhvc3RUZXh0ICE9PSB2YWx1ZSkge1xuICAgICAgICAgIC8vIFZhbGlkIGRhdGVcbiAgICAgICAgICBjb25zdCBkYXRlTW9kZWw6IElNeURhdGVNb2RlbCA9IHRoaXMudXRpbFNlcnZpY2UuZ2V0RGF0ZU1vZGVsKGRhdGUsIG51bGwsIGRhdGVGb3JtYXQsIG1vbnRoTGFiZWxzLCBkYXRlUmFuZ2VEYXRlc0RlbGltaXRlcik7XG4gICAgICAgICAgdGhpcy5lbWl0RGF0ZUNoYW5nZWQoZGF0ZU1vZGVsKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKGRhdGVNb2RlbCk7XG4gICAgICAgICAgaWYgKGNsb3NlU2VsZWN0b3JPbkRhdGVTZWxlY3QpIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VTZWxlY3RvcihDYWxUb2dnbGUuQ2xvc2VCeURhdGVTZWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHZhbGlkYXRlT3B0cyA9IHt2YWxpZGF0ZURpc2FibGVkRGF0ZXM6IHRydWUsIHNlbGVjdGVkVmFsdWU6IHRoaXMudXRpbFNlcnZpY2UuZ2V0U2VsZWN0ZWRWYWx1ZSh0aGlzLnNlbGVjdGVkVmFsdWUsIHRydWUpfTtcbiAgICAgICAgY29uc3QgZGF0ZVJhbmdlOiBJTXlEYXRlUmFuZ2UgPSB0aGlzLnV0aWxTZXJ2aWNlLmlzRGF0ZVZhbGlkRGF0ZVJhbmdlKHZhbHVlLCB0aGlzLm9wdHMsIHZhbGlkYXRlT3B0cyk7XG4gICAgICAgIGNvbnN0IHtiZWdpbiwgZW5kfSA9IGRhdGVSYW5nZTtcbiAgICAgICAgdmFsaWQgPSB0aGlzLnV0aWxTZXJ2aWNlLmlzSW5pdGlhbGl6ZWREYXRlKGJlZ2luKSAmJiB0aGlzLnV0aWxTZXJ2aWNlLmlzSW5pdGlhbGl6ZWREYXRlKGVuZCk7XG4gICAgICAgIGlmICh2YWxpZCAmJiB0aGlzLmhvc3RUZXh0ICE9PSB2YWx1ZSkge1xuICAgICAgICAgIC8vIFZhbGlkIGRhdGUgcmFuZ2VcbiAgICAgICAgICBjb25zdCBkYXRlTW9kZWw6IElNeURhdGVNb2RlbCA9IHRoaXMudXRpbFNlcnZpY2UuZ2V0RGF0ZU1vZGVsKG51bGwsIGRhdGVSYW5nZSwgZGF0ZUZvcm1hdCwgbW9udGhMYWJlbHMsIGRhdGVSYW5nZURhdGVzRGVsaW1pdGVyKTtcbiAgICAgICAgICB0aGlzLmVtaXREYXRlQ2hhbmdlZChkYXRlTW9kZWwpO1xuICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwoZGF0ZU1vZGVsKTtcbiAgICAgICAgICBpZiAoY2xvc2VTZWxlY3Rvck9uRGF0ZVNlbGVjdCkge1xuICAgICAgICAgICAgdGhpcy5jbG9zZVNlbGVjdG9yKENhbFRvZ2dsZS5DbG9zZUJ5RGF0ZVNlbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghdmFsaWQgJiYgdGhpcy5ob3N0VGV4dCAhPT0gdmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSBFTVBUWV9TVFIpIHtcbiAgICAgICAgICB0aGlzLmNsZWFyRGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRoaXMub25DaGFuZ2VDYihudWxsKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmhvc3RUZXh0ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgdGhpcy5vblRvdWNoZWRDYigpO1xuICB9XG5cbiAgcHJpdmF0ZSBvbkNsaWNrV3JhcHBlciA9IChldmVudDogYW55KSA9PiB0aGlzLm9uQ2xpY2soZXZlbnQpO1xuXG4gIHByaXZhdGUgb25DbGljayhldmVudDogYW55KSB7XG4gICAgaWYgKHRoaXMub3B0cy5jbG9zZVNlbGVjdG9yT25Eb2N1bWVudENsaWNrICYmICF0aGlzLnByZXZlbnRDbG9zZSAmJiBldmVudC50YXJnZXQgJiYgdGhpcy5jUmVmIFxuICAgICAgICAmJiB0aGlzLmVsZW0ubmF0aXZlRWxlbWVudCAhPT0gZXZlbnQudGFyZ2V0ICYmICF0aGlzLmNSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpIFxuICAgICAgICAmJiAhdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5jbG9zZVNlbGVjdG9yKENhbFRvZ2dsZS5DbG9zZUJ5T3V0Q2xpY2spO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoTE9DQUxFKSkge1xuICAgICAgdGhpcy5zZXRMb2NhbGVPcHRpb25zKCk7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoREVGQVVMVF9NT05USCkpIHtcbiAgICAgIGxldCBkbTogYW55ID0gY2hhbmdlc1tERUZBVUxUX01PTlRIXS5jdXJyZW50VmFsdWU7XG4gICAgICBpZiAodHlwZW9mIGRtID09PSBPQkpFQ1QpIHtcbiAgICAgICAgaWYgKCFkbS5vdmVycmlkZVNlbGVjdGlvbikge1xuICAgICAgICAgIGRtLm92ZXJyaWRlU2VsZWN0aW9uID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBkbSA9IHtkZWZNb250aDogZG0sIG92ZXJyaWRlU2VsZWN0aW9uOiBmYWxzZX07XG4gICAgICB9XG4gICAgICBcbiAgICAgIHRoaXMuZGVmYXVsdE1vbnRoID0gZG07XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoT1BUSU9OUykpIHtcbiAgICAgIHRoaXMucGFyc2VPcHRpb25zKGNoYW5nZXNbT1BUSU9OU10uY3VycmVudFZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jUmVmKSB7XG4gICAgICB0aGlzLmNSZWYuaW5zdGFuY2UucmVmcmVzaENvbXBvbmVudCh0aGlzLm9wdHMsIHRoaXMuZGVmYXVsdE1vbnRoLCB0aGlzLnNlbGVjdGVkVmFsdWUsIHRoaXMuZ2V0SG9zdFZhbHVlKCkpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmNsb3NlQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRMb2NhbGVPcHRpb25zKCk6IHZvaWQge1xuICAgIGNvbnN0IG9wdHM6IElNeU9wdGlvbnMgPSB0aGlzLmxvY2FsZVNlcnZpY2UuZ2V0TG9jYWxlT3B0aW9ucyh0aGlzLmxvY2FsZSk7XG4gICAgT2JqZWN0LmtleXMob3B0cykuZm9yRWFjaCgoaykgPT4ge1xuICAgICAgKDxJTXlPcHRpb25zPiB0aGlzLm9wdHMpW2tdID0gb3B0c1trXTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBwYXJzZU9wdGlvbnMob3B0czogSU15T3B0aW9ucyk6IHZvaWQge1xuICAgIGlmIChvcHRzKSB7XG4gICAgICBPYmplY3Qua2V5cyhvcHRzKS5mb3JFYWNoKChrKSA9PiB7XG4gICAgICAgICg8SU15T3B0aW9ucz4gdGhpcy5vcHRzKVtrXSA9IG9wdHNba107XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCB7bWluWWVhciwgbWF4WWVhciwgb3BlblNlbGVjdG9yVG9wT2ZJbnB1dCwgaW5saW5lfSA9IHRoaXMub3B0cztcblxuICAgIGlmIChtaW5ZZWFyIDwgWWVhci5taW4pIHtcbiAgICAgIHRoaXMub3B0cy5taW5ZZWFyID0gWWVhci5taW47XG4gICAgfVxuXG4gICAgaWYgKG1heFllYXIgPiBZZWFyLm1heCkge1xuICAgICAgdGhpcy5vcHRzLm1heFllYXIgPSBZZWFyLm1heDtcbiAgICB9XG5cbiAgICBpZiAob3BlblNlbGVjdG9yVG9wT2ZJbnB1dCB8fCBpbmxpbmUpIHtcbiAgICAgIHRoaXMub3B0cy5zaG93U2VsZWN0b3JBcnJvdyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChpbmxpbmUpIHtcbiAgICAgIHRoaXMub3BlbkNhbGVuZGFyKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHZhbGlkYXRlT3B0czogSU15VmFsaWRhdGVPcHRpb25zID0gbnVsbDtcbiAgICBjb25zdCB7ZGF0ZUZvcm1hdCwgbW9udGhMYWJlbHMsIGRhdGVSYW5nZURhdGVzRGVsaW1pdGVyLCBpbmxpbmV9ID0gdGhpcy5vcHRzO1xuXG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgdGhpcy5zZXRIb3N0VmFsdWUoRU1QVFlfU1RSKTtcbiAgICAgIHRoaXMuZW1pdElucHV0RmllbGRDaGFuZ2VkKEVNUFRZX1NUUiwgZmFsc2UpO1xuXG4gICAgICBpZiAodGhpcy5jUmVmKSB7XG4gICAgICAgIHRoaXMuY1JlZi5pbnN0YW5jZS5yZXNldERhdGVWYWx1ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICghdmFsdWUuaXNSYW5nZSAmJiB2YWx1ZS5zaW5nbGVEYXRlKSB7XG4gICAgICAvLyBzaW5nbGUgZGF0ZVxuICAgICAgbGV0IHtkYXRlLCBqc0RhdGV9ID0gdmFsdWUuc2luZ2xlRGF0ZTtcbiAgICAgIGlmICghZGF0ZSkge1xuICAgICAgICBkYXRlID0gdGhpcy51dGlsU2VydmljZS5qc0RhdGVUb015RGF0ZShqc0RhdGUpO1xuICAgICAgfVxuICAgICAgXG4gICAgICBjb25zdCBmb3JtYXR0ZWQ6IHN0cmluZyA9IHRoaXMudXRpbFNlcnZpY2UuZm9ybWF0RGF0ZShkYXRlLCBkYXRlRm9ybWF0LCBtb250aExhYmVscyk7XG5cbiAgICAgIHZhbGlkYXRlT3B0cyA9IHt2YWxpZGF0ZURpc2FibGVkRGF0ZXM6IGZhbHNlLCBzZWxlY3RlZFZhbHVlOiB0aGlzLnV0aWxTZXJ2aWNlLmdldFNlbGVjdGVkVmFsdWUodGhpcy5zZWxlY3RlZFZhbHVlLCBmYWxzZSl9O1xuICAgICAgY29uc3QgdmFsaWQ6IGJvb2xlYW4gPSB0aGlzLnV0aWxTZXJ2aWNlLmlzSW5pdGlhbGl6ZWREYXRlKHRoaXMudXRpbFNlcnZpY2UuaXNEYXRlVmFsaWQoZm9ybWF0dGVkLCB0aGlzLm9wdHMsIHZhbGlkYXRlT3B0cykpO1xuICAgICAgaWYgKHZhbGlkKSB7XG4gICAgICAgIHRoaXMuc2V0SG9zdFZhbHVlKGZvcm1hdHRlZCk7XG4gICAgICAgIHRoaXMuZW1pdElucHV0RmllbGRDaGFuZ2VkKGZvcm1hdHRlZCwgdmFsaWQpO1xuICAgICAgICB0aGlzLnNldFNlbGVjdGVkVmFsdWUodGhpcy51dGlsU2VydmljZS5nZXREYXRlTW9kZWwoZGF0ZSwgbnVsbCwgZGF0ZUZvcm1hdCwgbW9udGhMYWJlbHMsIGRhdGVSYW5nZURhdGVzRGVsaW1pdGVyKSk7XG5cbiAgICAgICAgaWYgKHRoaXMuY1JlZikge1xuICAgICAgICAgIHRoaXMuY1JlZi5pbnN0YW5jZS5yZWZyZXNoQ29tcG9uZW50KHRoaXMub3B0cywgdGhpcy5kZWZhdWx0TW9udGgsIHRoaXMuc2VsZWN0ZWRWYWx1ZSwgdGhpcy5nZXRIb3N0VmFsdWUoKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodmFsdWUuaXNSYW5nZSAmJiB2YWx1ZS5kYXRlUmFuZ2UpIHtcbiAgICAgIC8vIGRhdGUgcmFuZ2VcbiAgICAgIGxldCB7YmVnaW5EYXRlLCBiZWdpbkpzRGF0ZSwgZW5kRGF0ZSwgZW5kSnNEYXRlfSA9IHZhbHVlLmRhdGVSYW5nZTtcbiAgICAgIGlmICghYmVnaW5EYXRlIHx8ICFlbmREYXRlKSB7XG4gICAgICAgIGJlZ2luRGF0ZSA9IHRoaXMudXRpbFNlcnZpY2UuanNEYXRlVG9NeURhdGUoYmVnaW5Kc0RhdGUpO1xuICAgICAgICBlbmREYXRlID0gdGhpcy51dGlsU2VydmljZS5qc0RhdGVUb015RGF0ZShlbmRKc0RhdGUpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBmb3JtYXR0ZWQ6IHN0cmluZyA9IHRoaXMudXRpbFNlcnZpY2UuZm9ybWF0RGF0ZShiZWdpbkRhdGUsIGRhdGVGb3JtYXQsIG1vbnRoTGFiZWxzKSArIGRhdGVSYW5nZURhdGVzRGVsaW1pdGVyICtcbiAgICAgICAgdGhpcy51dGlsU2VydmljZS5mb3JtYXREYXRlKGVuZERhdGUsIGRhdGVGb3JtYXQsIG1vbnRoTGFiZWxzKTtcbiAgICAgIHZhbGlkYXRlT3B0cyA9IHt2YWxpZGF0ZURpc2FibGVkRGF0ZXM6IGZhbHNlLCBzZWxlY3RlZFZhbHVlOiB0aGlzLnV0aWxTZXJ2aWNlLmdldFNlbGVjdGVkVmFsdWUodGhpcy5zZWxlY3RlZFZhbHVlLCB0cnVlKX07XG4gICAgICBjb25zdCB7YmVnaW4sIGVuZH0gPSB0aGlzLnV0aWxTZXJ2aWNlLmlzRGF0ZVZhbGlkRGF0ZVJhbmdlKGZvcm1hdHRlZCwgdGhpcy5vcHRzLCB2YWxpZGF0ZU9wdHMpO1xuICAgICAgY29uc3QgdmFsaWQ6IGJvb2xlYW4gPSB0aGlzLnV0aWxTZXJ2aWNlLmlzSW5pdGlhbGl6ZWREYXRlKGJlZ2luKSAmJiB0aGlzLnV0aWxTZXJ2aWNlLmlzSW5pdGlhbGl6ZWREYXRlKGVuZCk7XG4gICAgICBpZiAodmFsaWQpIHtcbiAgICAgICAgdGhpcy5zZXRIb3N0VmFsdWUoZm9ybWF0dGVkKTtcbiAgICAgICAgdGhpcy5lbWl0SW5wdXRGaWVsZENoYW5nZWQoZm9ybWF0dGVkLCB2YWxpZCk7XG5cbiAgICAgICAgY29uc3QgZGF0ZVJhbmdlOiBJTXlEYXRlUmFuZ2UgPSB7YmVnaW46IGJlZ2luRGF0ZSwgZW5kOiBlbmREYXRlfTtcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RlZFZhbHVlKHRoaXMudXRpbFNlcnZpY2UuZ2V0RGF0ZU1vZGVsKG51bGwsIGRhdGVSYW5nZSwgZGF0ZUZvcm1hdCwgbW9udGhMYWJlbHMsIGRhdGVSYW5nZURhdGVzRGVsaW1pdGVyKSk7XG5cbiAgICAgICAgaWYgKHRoaXMuY1JlZikge1xuICAgICAgICAgIHRoaXMuY1JlZi5pbnN0YW5jZS5yZWZyZXNoQ29tcG9uZW50KHRoaXMub3B0cywgdGhpcy5kZWZhdWx0TW9udGgsIHRoaXMuc2VsZWN0ZWRWYWx1ZSwgdGhpcy5nZXRIb3N0VmFsdWUoKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZUNiID0gZm47XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkQ2IgPSBmbjtcbiAgfVxuXG4gIHB1YmxpYyBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50LCBESVNBQkxFRCwgaXNEaXNhYmxlZCk7XG5cbiAgICBpZiAoaXNEaXNhYmxlZCkge1xuICAgICAgdGhpcy5jbG9zZUNhbGVuZGFyKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCk6IHsgW3A6IHN0cmluZ106IGFueSB9IHtcbiAgICBjb25zdCB2YWx1ZTogc3RyaW5nID0gdGhpcy5nZXRIb3N0VmFsdWUoKTtcblxuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gRU1QVFlfU1RSKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBsZXQgdmFsaWRhdGVPcHRzOiBJTXlWYWxpZGF0ZU9wdGlvbnMgPSBudWxsO1xuICAgIGlmICghdGhpcy5vcHRzLmRhdGVSYW5nZSkge1xuICAgICAgdmFsaWRhdGVPcHRzID0ge3ZhbGlkYXRlRGlzYWJsZWREYXRlczogdHJ1ZSwgc2VsZWN0ZWRWYWx1ZTogdGhpcy51dGlsU2VydmljZS5nZXRTZWxlY3RlZFZhbHVlKHRoaXMuc2VsZWN0ZWRWYWx1ZSwgZmFsc2UpfTtcbiAgICAgIGNvbnN0IGRhdGU6IElNeURhdGUgPSB0aGlzLnV0aWxTZXJ2aWNlLmlzRGF0ZVZhbGlkKHZhbHVlLCB0aGlzLm9wdHMsIHZhbGlkYXRlT3B0cyk7XG4gICAgICBpZiAoIXRoaXMudXRpbFNlcnZpY2UuaXNJbml0aWFsaXplZERhdGUoZGF0ZSkpIHtcbiAgICAgICAgcmV0dXJuIHtpbnZhbGlkRGF0ZUZvcm1hdDogdHJ1ZX07XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFsaWRhdGVPcHRzID0ge3ZhbGlkYXRlRGlzYWJsZWREYXRlczogdHJ1ZSwgc2VsZWN0ZWRWYWx1ZTogdGhpcy51dGlsU2VydmljZS5nZXRTZWxlY3RlZFZhbHVlKHRoaXMuc2VsZWN0ZWRWYWx1ZSwgdHJ1ZSl9O1xuICAgICAgY29uc3Qge2JlZ2luLCBlbmR9ID0gdGhpcy51dGlsU2VydmljZS5pc0RhdGVWYWxpZERhdGVSYW5nZSh2YWx1ZSwgdGhpcy5vcHRzLCB2YWxpZGF0ZU9wdHMpO1xuICAgICAgaWYgKCF0aGlzLnV0aWxTZXJ2aWNlLmlzSW5pdGlhbGl6ZWREYXRlKGJlZ2luKSB8fCAhdGhpcy51dGlsU2VydmljZS5pc0luaXRpYWxpemVkRGF0ZShlbmQpKSB7XG4gICAgICAgIHJldHVybiB7aW52YWxpZERhdGVGb3JtYXQ6IHRydWV9O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBvcGVuQ2FsZW5kYXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5wcmV2ZW50Q2xvc2UgPSB0cnVlO1xuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICBpZiAodGhpcy5jUmVmID09PSBudWxsKSB7XG4gICAgICB0aGlzLmNSZWYgPSB0aGlzLnZjUmVmLmNyZWF0ZUNvbXBvbmVudCh0aGlzLmNmci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShDYWxlbmRhckNvbXBvbmVudCkpO1xuICAgICAgdGhpcy5hcHBlbmRTZWxlY3Rvcih0aGlzLmNSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XG4gICAgICB0aGlzLmNSZWYuaW5zdGFuY2UuaW5pdGlhbGl6ZUNvbXBvbmVudChcbiAgICAgICAgdGhpcy5vcHRzLFxuICAgICAgICB0aGlzLmRlZmF1bHRNb250aCxcbiAgICAgICAgdGhpcy5zZWxlY3RlZFZhbHVlLFxuICAgICAgICB0aGlzLmdldEhvc3RWYWx1ZSgpLFxuICAgICAgICB0aGlzLmdldFNlbGVjdG9yUG9zaXRpb24odGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQpLFxuICAgICAgICAoZG06IElNeURhdGVNb2RlbCwgY2xvc2U6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICB0aGlzLmZvY3VzVG9JbnB1dCgpO1xuICAgICAgICAgIHRoaXMuZW1pdERhdGVDaGFuZ2VkKGRtKTtcbiAgICAgICAgICB0aGlzLmVtaXRJbnB1dEZpZWxkQ2hhbmdlZCh0aGlzLnV0aWxTZXJ2aWNlLmdldEZvcm1hdHRlZERhdGUoZG0pLCB0cnVlKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKGRtKTtcbiAgICAgICAgICBpZiAoY2xvc2UpIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VTZWxlY3RvcihDYWxUb2dnbGUuQ2xvc2VCeURhdGVTZWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgKGN2YzogSU15Q2FsZW5kYXJWaWV3Q2hhbmdlZCkgPT4ge1xuICAgICAgICAgIHRoaXMuZW1pdENhbGVuZGFyQ2hhbmdlZChjdmMpO1xuICAgICAgICB9LFxuICAgICAgICAocmRzOiBJTXlSYW5nZURhdGVTZWxlY3Rpb24pID0+IHtcbiAgICAgICAgICB0aGlzLmVtaXRSYW5nZURhdGVTZWxlY3Rpb24ocmRzKTtcbiAgICAgICAgfSxcbiAgICAgICAgKHZhOiBBY3RpdmVWaWV3KSA9PiB7XG4gICAgICAgICAgdGhpcy5lbWl0Vmlld0FjdGl2YXRlZCh2YSk7XG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICB0aGlzLmNsb3NlU2VsZWN0b3IoQ2FsVG9nZ2xlLkNsb3NlQnlFc2MpO1xuICAgICAgICB9XG4gICAgICApO1xuICAgICAgdGhpcy5lbWl0Q2FsZW5kYXJUb2dnbGUoQ2FsVG9nZ2xlLk9wZW4pO1xuXG4gICAgICBpZiAoIXRoaXMub3B0cy5pbmxpbmUpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihDTElDSywgdGhpcy5vbkNsaWNrV3JhcHBlcik7XG4gICAgICB9XG4gICAgfVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5wcmV2ZW50Q2xvc2UgPSBmYWxzZTtcbiAgICB9LCBQUkVWRU5UX0NMT1NFX1RJTUVPVVQpO1xuICB9XG5cbiAgcHVibGljIGNsb3NlQ2FsZW5kYXIoKTogdm9pZCB7XG4gICAgdGhpcy5jbG9zZVNlbGVjdG9yKENhbFRvZ2dsZS5DbG9zZUJ5Q2FsQnRuKTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVDYWxlbmRhcigpOiBib29sZWFuIHwgbnVsbCB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBpc09wZW46IGJvb2xlYW4gPSB0aGlzLmNSZWYgPT09IG51bGw7XG5cbiAgICBpZiAoaXNPcGVuKSB7XG4gICAgICB0aGlzLm9wZW5DYWxlbmRhcigpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuY2xvc2VTZWxlY3RvcihDYWxUb2dnbGUuQ2xvc2VCeUNhbEJ0bik7XG4gICAgfVxuICAgIHJldHVybiBpc09wZW47XG4gIH1cblxuICBwdWJsaWMgY2xlYXJEYXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qge2lubGluZX0gPSB0aGlzLm9wdHM7XG5cbiAgICB0aGlzLnNldEhvc3RWYWx1ZShFTVBUWV9TVFIpO1xuICAgIHRoaXMuZW1pdERhdGVDaGFuZ2VkKHtcbiAgICAgIGlzUmFuZ2U6IHRoaXMub3B0cy5kYXRlUmFuZ2UsXG4gICAgICBzaW5nbGVEYXRlOiB7XG4gICAgICAgIGRhdGU6IHRoaXMudXRpbFNlcnZpY2UucmVzZXREYXRlKCksXG4gICAgICAgIGpzRGF0ZTogbnVsbCxcbiAgICAgICAgZm9ybWF0dGVkOiBFTVBUWV9TVFIsXG4gICAgICAgIGVwb2M6IDBcbiAgICAgIH0sXG4gICAgICBkYXRlUmFuZ2U6IHtcbiAgICAgICAgYmVnaW5EYXRlOiB0aGlzLnV0aWxTZXJ2aWNlLnJlc2V0RGF0ZSgpLFxuICAgICAgICBiZWdpbkpzRGF0ZTogbnVsbCxcbiAgICAgICAgYmVnaW5FcG9jOiAwLFxuICAgICAgICBlbmREYXRlOiB0aGlzLnV0aWxTZXJ2aWNlLnJlc2V0RGF0ZSgpLFxuICAgICAgICBlbmRKc0RhdGU6IG51bGwsXG4gICAgICAgIGVuZEVwb2M6IDAsXG4gICAgICAgIGZvcm1hdHRlZDogRU1QVFlfU1RSXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLm9uQ2hhbmdlQ2IobnVsbCk7XG4gICAgdGhpcy5vblRvdWNoZWRDYigpO1xuXG4gICAgaWYgKHRoaXMuY1JlZikge1xuICAgICAgdGhpcy5jUmVmLmluc3RhbmNlLmNsZWFyRGF0ZSgpO1xuICAgIH1cblxuICAgIGlmICghaW5saW5lKSB7XG4gICAgICB0aGlzLmNsb3NlU2VsZWN0b3IoQ2FsVG9nZ2xlLkNsb3NlQnlDYWxCdG4pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpc0RhdGVWYWxpZCgpOiBib29sZWFuIHtcbiAgICBjb25zdCB2YWx1ZTogc3RyaW5nID0gdGhpcy5nZXRIb3N0VmFsdWUoKTtcblxuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gRU1QVFlfU1RSKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgbGV0IHZhbGlkYXRlT3B0czogSU15VmFsaWRhdGVPcHRpb25zID0gbnVsbDtcbiAgICBpZiAoIXRoaXMub3B0cy5kYXRlUmFuZ2UpIHtcbiAgICAgIHZhbGlkYXRlT3B0cyA9IHt2YWxpZGF0ZURpc2FibGVkRGF0ZXM6IHRydWUsIHNlbGVjdGVkVmFsdWU6IHRoaXMudXRpbFNlcnZpY2UuZ2V0U2VsZWN0ZWRWYWx1ZSh0aGlzLnNlbGVjdGVkVmFsdWUsIGZhbHNlKX07XG4gICAgICBjb25zdCBkYXRlOiBJTXlEYXRlID0gdGhpcy51dGlsU2VydmljZS5pc0RhdGVWYWxpZCh2YWx1ZSwgdGhpcy5vcHRzLCB2YWxpZGF0ZU9wdHMpO1xuICAgICAgaWYgKHRoaXMudXRpbFNlcnZpY2UuaXNJbml0aWFsaXplZERhdGUoZGF0ZSkpIHtcbiAgICAgICAgdGhpcy5lbWl0SW5wdXRGaWVsZENoYW5nZWQodmFsdWUsIHRydWUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YWxpZGF0ZU9wdHMgPSB7dmFsaWRhdGVEaXNhYmxlZERhdGVzOiB0cnVlLCBzZWxlY3RlZFZhbHVlOiB0aGlzLnV0aWxTZXJ2aWNlLmdldFNlbGVjdGVkVmFsdWUodGhpcy5zZWxlY3RlZFZhbHVlLCB0cnVlKX07XG4gICAgICBjb25zdCB7YmVnaW4sIGVuZH0gPSB0aGlzLnV0aWxTZXJ2aWNlLmlzRGF0ZVZhbGlkRGF0ZVJhbmdlKHZhbHVlLCB0aGlzLm9wdHMsIHZhbGlkYXRlT3B0cyk7XG4gICAgICBpZiAodGhpcy51dGlsU2VydmljZS5pc0luaXRpYWxpemVkRGF0ZShiZWdpbikgJiYgdGhpcy51dGlsU2VydmljZS5pc0luaXRpYWxpemVkRGF0ZShlbmQpKSB7XG4gICAgICAgIHRoaXMuZW1pdElucHV0RmllbGRDaGFuZ2VkKHZhbHVlLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIHRoaXMuZW1pdElucHV0RmllbGRDaGFuZ2VkKHZhbHVlLCBmYWxzZSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGhlYWRlckFjdGlvbihoZWFkZXJBY3Rpb246IEhlYWRlckFjdGlvbik6IHZvaWQge1xuICAgIGlmICh0aGlzLmNSZWYpIHtcbiAgICAgIHRoaXMuY1JlZi5pbnN0YW5jZS5oZWFkZXJBY3Rpb24oaGVhZGVyQWN0aW9uKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0SG9zdFZhbHVlKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCB7ZGl2SG9zdEVsZW1lbnR9ID0gdGhpcy5vcHRzO1xuICAgIHRoaXMuaG9zdFRleHQgPSB2YWx1ZTtcbiAgICBjb25zdCB2YWx1ZVR5cGU6IHN0cmluZyA9ICFkaXZIb3N0RWxlbWVudC5lbmFibGVkID8gVkFMVUUgOiBJTk5FUl9IVE1MO1xuICAgIHZhbHVlID0gdmFsdWVUeXBlID09PSBJTk5FUl9IVE1MICYmIHZhbHVlID09PSBFTVBUWV9TVFIgPyBkaXZIb3N0RWxlbWVudC5wbGFjZWhvbGRlciA6IHZhbHVlO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQsIHZhbHVlVHlwZSwgdmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBpZ25vcmVLZXlQcmVzcyhrZXlDb2RlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4ga2V5Q29kZSA9PT0gS2V5Q29kZS5sZWZ0QXJyb3cgfHwga2V5Q29kZSA9PT0gS2V5Q29kZS5yaWdodEFycm93IHx8IGtleUNvZGUgPT09IEtleUNvZGUudXBBcnJvdyB8fCBrZXlDb2RlID09PSBLZXlDb2RlLmRvd25BcnJvdyB8fCBrZXlDb2RlID09PSBLZXlDb2RlLnRhYiB8fCBrZXlDb2RlID09PSBLZXlDb2RlLnNoaWZ0O1xuICB9XG5cbiAgcHJpdmF0ZSBvbkFuaW1hdGVXcmFwcGVyID0gKHJlYXNvbjogbnVtYmVyKSA9PiB0aGlzLmFuaW1hdGlvbkVuZChyZWFzb24pO1xuXG4gIHByaXZhdGUgYW5pbWF0aW9uRW5kKHJlYXNvbjogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY1JlZikge1xuICAgICAgdGhpcy5jUmVmLmluc3RhbmNlLnNlbGVjdG9yRWwubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKEFOSU1BVElPTl9FTkQsIHRoaXMub25BbmltYXRlV3JhcHBlcik7XG4gICAgICB0aGlzLnJlbW92ZUNvbXBvbmVudCgpO1xuICAgICAgdGhpcy5lbWl0Q2FsZW5kYXJUb2dnbGUocmVhc29uKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNsb3NlU2VsZWN0b3IocmVhc29uOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCB7aW5saW5lLCBjYWxlbmRhckFuaW1hdGlvbn0gPSB0aGlzLm9wdHM7XG4gICAgXG4gICAgaWYgKHRoaXMuY1JlZiAmJiAhaW5saW5lKSB7XG4gICAgICBpZiAoY2FsZW5kYXJBbmltYXRpb24ub3V0ICE9PSBDYWxBbmltYXRpb24uTm9uZSkge1xuICAgICAgICBjb25zdCB7aW5zdGFuY2V9ID0gdGhpcy5jUmVmO1xuICAgICAgICBpbnN0YW5jZS5zZWxlY3RvckVsLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihBTklNQVRJT05fRU5ELCB0aGlzLm9uQW5pbWF0ZVdyYXBwZXIuYmluZCh0aGlzLCByZWFzb24pKTtcbiAgICAgICAgaW5zdGFuY2Uuc2V0Q2FsZW5kYXJBbmltYXRpb24oY2FsZW5kYXJBbmltYXRpb24sIGZhbHNlKTtcblxuICAgICAgICAvLyBJbiBjYXNlIHRoZSBhbmltYXRpb25lbmQgZXZlbnQgaXMgbm90IGZpcmVkXG4gICAgICAgIHNldFRpbWVvdXQodGhpcy5vbkFuaW1hdGVXcmFwcGVyLmJpbmQodGhpcywgcmVhc29uKSwgQU5JTUFUSU9OX1RJTUVPVVQpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ29tcG9uZW50KCk7XG4gICAgICAgIHRoaXMuZW1pdENhbGVuZGFyVG9nZ2xlKHJlYXNvbik7XG4gICAgICB9XG5cbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoQ0xJQ0ssIHRoaXMub25DbGlja1dyYXBwZXIpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlQ29tcG9uZW50KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnZjUmVmICE9PSBudWxsKSB7XG4gICAgICB0aGlzLnZjUmVmLnJlbW92ZSh0aGlzLnZjUmVmLmluZGV4T2YodGhpcy5jUmVmLmhvc3RWaWV3KSk7XG4gICAgICB0aGlzLmNSZWYgPSBudWxsO1xuICAgIH1cbiAgfVxuICBcbiAgcHJpdmF0ZSB1cGRhdGVNb2RlbChtb2RlbDogSU15RGF0ZU1vZGVsKTogdm9pZCB7XG4gICAgdGhpcy5zZXRIb3N0VmFsdWUodGhpcy51dGlsU2VydmljZS5nZXRGb3JtYXR0ZWREYXRlKG1vZGVsKSk7XG4gICAgdGhpcy5vbkNoYW5nZUNiKG1vZGVsKTtcbiAgICB0aGlzLm9uVG91Y2hlZENiKCk7XG4gIH1cblxuICBwcml2YXRlIGdldEhvc3RWYWx1ZSgpOiBzdHJpbmcge1xuICAgIGNvbnN0IHt2YWx1ZSwgaW5uZXJIVE1MfSA9IHRoaXMuZWxlbS5uYXRpdmVFbGVtZW50O1xuICAgIHJldHVybiAhdGhpcy5vcHRzLmRpdkhvc3RFbGVtZW50LmVuYWJsZWQgPyB2YWx1ZSA6IGlubmVySFRNTDtcbiAgfVxuXG4gIHByaXZhdGUgZm9jdXNUb0lucHV0KCk6IHZvaWQge1xuICAgIGNvbnN0IHtmb2N1c0lucHV0T25EYXRlU2VsZWN0LCBkaXZIb3N0RWxlbWVudH0gPSB0aGlzLm9wdHM7XG4gICAgaWYgKGZvY3VzSW5wdXRPbkRhdGVTZWxlY3QgJiYgIWRpdkhvc3RFbGVtZW50LmVuYWJsZWQpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBlbWl0RGF0ZUNoYW5nZWQoZGF0ZU1vZGVsOiBJTXlEYXRlTW9kZWwpOiB2b2lkIHtcbiAgICB0aGlzLmRhdGVDaGFuZ2VkLmVtaXQoZGF0ZU1vZGVsKTtcbiAgICB0aGlzLnNldFNlbGVjdGVkVmFsdWUoZGF0ZU1vZGVsKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0U2VsZWN0ZWRWYWx1ZShkYXRlTW9kZWw6IElNeURhdGVNb2RlbCk6IHZvaWQge1xuICAgIGNvbnN0IHtpc1JhbmdlLCBkYXRlUmFuZ2UsIHNpbmdsZURhdGV9ID0gZGF0ZU1vZGVsO1xuICAgIHRoaXMuc2VsZWN0ZWRWYWx1ZSA9IGlzUmFuZ2UgPyBkYXRlUmFuZ2UgOiBzaW5nbGVEYXRlO1xuICB9XG5cbiAgcHJpdmF0ZSBlbWl0SW5wdXRGaWVsZENoYW5nZWQodmFsdWU6IHN0cmluZywgdmFsaWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmlucHV0RmllbGRDaGFuZ2VkLmVtaXQoe3ZhbHVlLCBkYXRlRm9ybWF0OiB0aGlzLm9wdHMuZGF0ZUZvcm1hdCwgdmFsaWR9KTtcbiAgfVxuXG4gIHByaXZhdGUgZW1pdENhbGVuZGFyQ2hhbmdlZChjdmM6IElNeUNhbGVuZGFyVmlld0NoYW5nZWQpOiB2b2lkIHtcbiAgICB0aGlzLmNhbGVuZGFyVmlld0NoYW5nZWQuZW1pdChjdmMpO1xuICB9XG5cbiAgcHJpdmF0ZSBlbWl0UmFuZ2VEYXRlU2VsZWN0aW9uKHJkczogSU15UmFuZ2VEYXRlU2VsZWN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5yYW5nZURhdGVTZWxlY3Rpb24uZW1pdChyZHMpO1xuICB9XG5cbiAgcHJpdmF0ZSBlbWl0Vmlld0FjdGl2YXRlZCh2YTogQWN0aXZlVmlldyk6IHZvaWQge1xuICAgIHRoaXMudmlld0FjdGl2YXRlZC5lbWl0KHZhKTtcbiAgfVxuXG4gIHByaXZhdGUgZW1pdENhbGVuZGFyVG9nZ2xlKHJlYXNvbjogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5jYWxlbmRhclRvZ2dsZS5lbWl0KHJlYXNvbik7XG4gIH1cblxuICBwcml2YXRlIGFwcGVuZFNlbGVjdG9yKGVsZW06IGFueSk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9wdHMuYXBwZW5kU2VsZWN0b3JUb0JvZHkpIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoQk9EWSkuYXBwZW5kQ2hpbGQoZWxlbSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRTZWxlY3RvclBvc2l0aW9uKGVsZW06IGFueSk6IElNeVNlbGVjdG9yUG9zaXRpb24ge1xuICAgIGxldCB0b3A6IG51bWJlciA9IDA7XG4gICAgbGV0IGxlZnQ6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdCB7YXBwZW5kU2VsZWN0b3JUb0JvZHksIG9wZW5TZWxlY3RvclRvcE9mSW5wdXQsIHNlbGVjdG9ySGVpZ2h0LCBzZWxlY3RvcldpZHRoLCBzaG93U2VsZWN0b3JBcnJvdywgYWxpZ25TZWxlY3RvclJpZ2h0fSA9IHRoaXMub3B0cztcblxuICAgIGlmIChhcHBlbmRTZWxlY3RvclRvQm9keSkge1xuICAgICAgY29uc3QgYjogYW55ID0gZG9jdW1lbnQuYm9keS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNvbnN0IGU6IGFueSA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICB0b3AgPSBlLnRvcCAtIGIudG9wO1xuICAgICAgbGVmdCA9IGUubGVmdCAtIGIubGVmdDtcbiAgICB9XG5cbiAgICBpZiAob3BlblNlbGVjdG9yVG9wT2ZJbnB1dCkge1xuICAgICAgdG9wID0gdG9wIC0gdGhpcy5nZXRTZWxlY3RvckRpbWVuc2lvbihzZWxlY3RvckhlaWdodCkgLSAyO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRvcCA9IHRvcCArIGVsZW0ub2Zmc2V0SGVpZ2h0ICsgKHNob3dTZWxlY3RvckFycm93ID8gMTIgOiAyKTtcbiAgICB9XG5cbiAgICBpZiAoYWxpZ25TZWxlY3RvclJpZ2h0KSB7XG4gICAgICBsZWZ0ID0gbGVmdCArIGVsZW0ub2Zmc2V0V2lkdGggLSB0aGlzLmdldFNlbGVjdG9yRGltZW5zaW9uKHNlbGVjdG9yV2lkdGgpO1xuICAgIH1cbiAgICByZXR1cm4ge3RvcDogdG9wICsgUFgsIGxlZnQ6IGxlZnQgKyBQWH07XG4gIH1cblxuICBwcml2YXRlIGdldFNlbGVjdG9yRGltZW5zaW9uKHZhbHVlOiBzdHJpbmcpOiBudW1iZXIge1xuICAgIHJldHVybiBOdW1iZXIodmFsdWUucmVwbGFjZShQWCwgRU1QVFlfU1RSKSk7XG4gIH1cbn1cbiJdfQ==