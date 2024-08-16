/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { KeyCode } from "../enums/key-code.enum";
import { KeyName } from "../enums/key-name.enum";
import { D, DD, M, MM, MMM, YYYY, ORDINAL, ST, ND, RD, SU, MO, TU, WE, TH, FR, SA, ZERO_STR, EMPTY_STR, PIPE } from "../constants/constants";
var UtilService = /** @class */ (function () {
    function UtilService() {
        this.weekDays = [SU, MO, TU, WE, TH, FR, SA];
    }
    /**
     * @param {?} dateStr
     * @param {?} options
     * @param {?} validateOpts
     * @return {?}
     */
    UtilService.prototype.isDateValid = /**
     * @param {?} dateStr
     * @param {?} options
     * @param {?} validateOpts
     * @return {?}
     */
    function (dateStr, options, validateOpts) {
        var e_1, _a;
        var dateFormat = options.dateFormat, minYear = options.minYear, maxYear = options.maxYear, monthLabels = options.monthLabels;
        /** @type {?} */
        var returnDate = this.resetDate();
        /** @type {?} */
        var datesInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        /** @type {?} */
        var isMonthStr = dateFormat.indexOf(MMM) !== -1;
        /** @type {?} */
        var delimeters = dateFormat.match(/[^(d#my)]{1,}/g);
        if (!dateStr || dateStr === EMPTY_STR) {
            return returnDate;
        }
        /** @type {?} */
        var dateValues = this.getDateValue(dateStr, dateFormat, delimeters);
        /** @type {?} */
        var year = 0;
        /** @type {?} */
        var month = 0;
        /** @type {?} */
        var day = 0;
        try {
            for (var dateValues_1 = tslib_1.__values(dateValues), dateValues_1_1 = dateValues_1.next(); !dateValues_1_1.done; dateValues_1_1 = dateValues_1.next()) {
                var dv = dateValues_1_1.value;
                if (dv.format.indexOf(ORDINAL) != -1) {
                    /** @type {?} */
                    var dayNumber = parseInt(dv.value.replace(/\D/g, ''));
                    /** @type {?} */
                    var ordinalStr = dv.value.replace(/[0-9]/g, '');
                    /** @type {?} */
                    var ordinal = this.getOrdinal(dayNumber);
                    if (ordinal !== ordinalStr) {
                        return returnDate;
                    }
                    dv.value = dv.value.replace(ST, EMPTY_STR).replace(ND, EMPTY_STR).replace(RD, EMPTY_STR).replace(TH, EMPTY_STR);
                    dv.format = dv.format.replace(ORDINAL, EMPTY_STR);
                }
                var value = dv.value, format = dv.format;
                if (value && /^\d+$/.test(value) && Number(value) === 0) {
                    return returnDate;
                }
                if (format.indexOf(YYYY) !== -1) {
                    year = this.getNumberByValue(dv);
                }
                else if (format.indexOf(M) !== -1) {
                    month = isMonthStr ? this.getMonthNumberByMonthName(dv, monthLabels) : this.getNumberByValue(dv);
                }
                else if (format.indexOf(D) !== -1) {
                    day = this.getNumberByValue(dv);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (dateValues_1_1 && !dateValues_1_1.done && (_a = dateValues_1.return)) _a.call(dateValues_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var validateDisabledDates = validateOpts.validateDisabledDates, selectedValue = validateOpts.selectedValue;
        year = year === 0 && selectedValue ? selectedValue.year : year;
        month = month === 0 && selectedValue ? selectedValue.month : month;
        day = day === 0 && selectedValue ? selectedValue.day : day;
        /** @type {?} */
        var today = this.getToday();
        if (year === 0 && (month !== 0 || day !== 0)) {
            year = today.year;
        }
        if (month === 0 && (year !== 0 || day !== 0)) {
            month = today.month;
        }
        if (day === 0 && (year !== 0 || month !== 0)) {
            day = today.day;
        }
        if (month !== -1 && day !== -1 && year !== -1) {
            if (year < minYear || year > maxYear || month < 1 || month > 12) {
                return returnDate;
            }
            /** @type {?} */
            var date = { year: year, month: month, day: day };
            if (validateDisabledDates && this.isDisabledDate(date, options).disabled) {
                return returnDate;
            }
            if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
                datesInMonth[1] = 29;
            }
            if (day < 1 || day > datesInMonth[month - 1]) {
                return returnDate;
            }
            // Valid date
            return date;
        }
        return returnDate;
    };
    /**
     * @param {?} dateRangeStr
     * @param {?} options
     * @param {?} validateOpts
     * @return {?}
     */
    UtilService.prototype.isDateValidDateRange = /**
     * @param {?} dateRangeStr
     * @param {?} options
     * @param {?} validateOpts
     * @return {?}
     */
    function (dateRangeStr, options, validateOpts) {
        /** @type {?} */
        var dateRange = { begin: this.resetDate(), end: this.resetDate() };
        if (dateRangeStr && dateRangeStr.length) {
            /** @type {?} */
            var dates = dateRangeStr.split(options.dateRangeDatesDelimiter);
            if (dates && dates.length === 2) {
                var _a = tslib_1.__read(dates, 2), beginDate = _a[0], endDate = _a[1];
                var selectedValue = validateOpts.selectedValue;
                if (selectedValue) {
                    validateOpts.selectedValue = selectedValue.begin;
                }
                /** @type {?} */
                var begin = this.isDateValid(beginDate, options, validateOpts);
                if (this.isInitializedDate(begin)) {
                    if (selectedValue) {
                        validateOpts.selectedValue = selectedValue.end;
                    }
                    /** @type {?} */
                    var end = this.isDateValid(endDate, options, validateOpts);
                    if (this.isInitializedDate(end) && this.isDateSameOrEarlier(begin, end)) {
                        dateRange = { begin: begin, end: end };
                    }
                }
            }
        }
        return dateRange;
    };
    /**
     * @param {?} dateStr
     * @param {?} dateFormat
     * @param {?} delimeters
     * @return {?}
     */
    UtilService.prototype.getDateValue = /**
     * @param {?} dateStr
     * @param {?} dateFormat
     * @param {?} delimeters
     * @return {?}
     */
    function (dateStr, dateFormat, delimeters) {
        var e_2, _a;
        /** @type {?} */
        var del = EMPTY_STR;
        if (delimeters) {
            try {
                for (var delimeters_1 = tslib_1.__values(delimeters), delimeters_1_1 = delimeters_1.next(); !delimeters_1_1.done; delimeters_1_1 = delimeters_1.next()) {
                    var d = delimeters_1_1.value;
                    if (del.indexOf(d) === -1) {
                        del += d;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (delimeters_1_1 && !delimeters_1_1.done && (_a = delimeters_1.return)) _a.call(delimeters_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        /** @type {?} */
        var re = new RegExp("[" + del + "]");
        /** @type {?} */
        var ds = dateStr.split(re);
        /** @type {?} */
        var df = dateFormat.split(re);
        /** @type {?} */
        var da = [];
        for (var i = 0; i < df.length; i++) {
            if (df[i].indexOf(YYYY) !== -1) {
                da.push({ value: ds[i], format: df[i] });
            }
            if (df[i].indexOf(M) !== -1) {
                da.push({ value: ds[i], format: df[i] });
            }
            if (df[i].indexOf(D) !== -1) {
                da.push({ value: ds[i], format: df[i] });
            }
        }
        return da;
    };
    /**
     * @param {?} df
     * @param {?} monthLabels
     * @return {?}
     */
    UtilService.prototype.getMonthNumberByMonthName = /**
     * @param {?} df
     * @param {?} monthLabels
     * @return {?}
     */
    function (df, monthLabels) {
        if (df.value) {
            for (var key = 1; key <= 12; key++) {
                if (df.value.toLowerCase() === monthLabels[key].toLowerCase()) {
                    return key;
                }
            }
        }
        return -1;
    };
    /**
     * @param {?} df
     * @return {?}
     */
    UtilService.prototype.getNumberByValue = /**
     * @param {?} df
     * @return {?}
     */
    function (df) {
        if (!/^\d+$/.test(df.value)) {
            return -1;
        }
        /** @type {?} */
        var nbr = Number(df.value);
        if (df.format.length === 1 && df.value.length !== 1 && nbr < 10 || df.format.length === 1 && df.value.length !== 2 && nbr >= 10) {
            nbr = -1;
        }
        else if (df.format.length === 2 && df.value.length > 2) {
            nbr = -1;
        }
        return nbr;
    };
    /**
     * @param {?} monthString
     * @return {?}
     */
    UtilService.prototype.parseDefaultMonth = /**
     * @param {?} monthString
     * @return {?}
     */
    function (monthString) {
        /** @type {?} */
        var month = { monthTxt: EMPTY_STR, monthNbr: 0, year: 0 };
        if (monthString !== EMPTY_STR) {
            /** @type {?} */
            var split = monthString.split(monthString.match(/[^0-9]/)[0]);
            month.monthNbr = split[0].length === 2 ? Number(split[0]) : Number(split[1]);
            month.year = split[0].length === 2 ? Number(split[1]) : Number(split[0]);
        }
        return month;
    };
    /**
     * @param {?} date
     * @param {?} options
     * @return {?}
     */
    UtilService.prototype.isDisabledDate = /**
     * @param {?} date
     * @param {?} options
     * @return {?}
     */
    function (date, options) {
        var e_3, _a, e_4, _b;
        var minYear = options.minYear, maxYear = options.maxYear, disableUntil = options.disableUntil, disableSince = options.disableSince, disableWeekends = options.disableWeekends, disableDates = options.disableDates, disableDateRanges = options.disableDateRanges, disableWeekdays = options.disableWeekdays, enableDates = options.enableDates;
        if (this.dateMatchToDates(date, enableDates)) {
            return this.getDisabledValue(false, EMPTY_STR);
        }
        if (date.year < minYear && date.month === 12 || date.year > maxYear && date.month === 1) {
            return this.getDisabledValue(true, EMPTY_STR);
        }
        /** @type {?} */
        var inputDates = (/** @type {?} */ (disableDates));
        /** @type {?} */
        var result = inputDates.find((/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            return d.dates;
        }));
        if (!result) {
            if (this.dateMatchToDates(date, inputDates)) {
                return this.getDisabledValue(true, EMPTY_STR);
            }
        }
        else {
            try {
                for (var inputDates_1 = tslib_1.__values(inputDates), inputDates_1_1 = inputDates_1.next(); !inputDates_1_1.done; inputDates_1_1 = inputDates_1.next()) {
                    var dd = inputDates_1_1.value;
                    if (this.dateMatchToDates(date, dd.dates)) {
                        return this.getDisabledValue(true, dd.styleClass);
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (inputDates_1_1 && !inputDates_1_1.done && (_a = inputDates_1.return)) _a.call(inputDates_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        if (this.isDisabledByDisableUntil(date, disableUntil)) {
            return this.getDisabledValue(true, EMPTY_STR);
        }
        if (this.isDisabledByDisableSince(date, disableSince)) {
            return this.getDisabledValue(true, EMPTY_STR);
        }
        if (disableWeekends) {
            /** @type {?} */
            var dayNbr = this.getDayNumber(date);
            if (dayNbr === 0 || dayNbr === 6) {
                return this.getDisabledValue(true, EMPTY_STR);
            }
        }
        /** @type {?} */
        var dn = this.getDayNumber(date);
        if (disableWeekdays.length > 0) {
            try {
                for (var disableWeekdays_1 = tslib_1.__values(disableWeekdays), disableWeekdays_1_1 = disableWeekdays_1.next(); !disableWeekdays_1_1.done; disableWeekdays_1_1 = disableWeekdays_1.next()) {
                    var wd = disableWeekdays_1_1.value;
                    if (dn === this.getWeekdayIndex(wd)) {
                        return this.getDisabledValue(true, EMPTY_STR);
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (disableWeekdays_1_1 && !disableWeekdays_1_1.done && (_b = disableWeekdays_1.return)) _b.call(disableWeekdays_1);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        if (this.isDisabledByDisableDateRange(date, date, disableDateRanges)) {
            return this.getDisabledValue(true, EMPTY_STR);
        }
        return this.getDisabledValue(false, EMPTY_STR);
    };
    /**
     * @param {?} disabled
     * @param {?} styleClass
     * @return {?}
     */
    UtilService.prototype.getDisabledValue = /**
     * @param {?} disabled
     * @param {?} styleClass
     * @return {?}
     */
    function (disabled, styleClass) {
        return { disabled: disabled, styleClass: styleClass };
    };
    /**
     * @param {?} date
     * @param {?} dates
     * @return {?}
     */
    UtilService.prototype.dateMatchToDates = /**
     * @param {?} date
     * @param {?} dates
     * @return {?}
     */
    function (date, dates) {
        var e_5, _a;
        try {
            for (var dates_1 = tslib_1.__values(dates), dates_1_1 = dates_1.next(); !dates_1_1.done; dates_1_1 = dates_1.next()) {
                var d = dates_1_1.value;
                if ((d.year === 0 || d.year === date.year) && (d.month === 0 || d.month === date.month) && d.day === date.day) {
                    return true;
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (dates_1_1 && !dates_1_1.done && (_a = dates_1.return)) _a.call(dates_1);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return false;
    };
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} options
     * @return {?}
     */
    UtilService.prototype.isDisabledMonth = /**
     * @param {?} year
     * @param {?} month
     * @param {?} options
     * @return {?}
     */
    function (year, month, options) {
        var disableUntil = options.disableUntil, disableSince = options.disableSince, disableDateRanges = options.disableDateRanges, enableDates = options.enableDates;
        /** @type {?} */
        var dateEnd = { year: year, month: month, day: this.datesInMonth(month, year) };
        /** @type {?} */
        var dateBegin = { year: year, month: month, day: 1 };
        if (this.isDatesEnabled(dateBegin, dateEnd, enableDates)) {
            return false;
        }
        if (this.isDisabledByDisableUntil(dateEnd, disableUntil)) {
            return true;
        }
        if (this.isDisabledByDisableSince(dateBegin, disableSince)) {
            return true;
        }
        if (this.isDisabledByDisableDateRange(dateBegin, dateEnd, disableDateRanges)) {
            return true;
        }
        return false;
    };
    /**
     * @param {?} year
     * @param {?} options
     * @return {?}
     */
    UtilService.prototype.isDisabledYear = /**
     * @param {?} year
     * @param {?} options
     * @return {?}
     */
    function (year, options) {
        var disableUntil = options.disableUntil, disableSince = options.disableSince, disableDateRanges = options.disableDateRanges, enableDates = options.enableDates, minYear = options.minYear, maxYear = options.maxYear;
        /** @type {?} */
        var dateEnd = { year: year, month: 12, day: 31 };
        /** @type {?} */
        var dateBegin = { year: year, month: 1, day: 1 };
        if (this.isDatesEnabled(dateBegin, dateEnd, enableDates)) {
            return false;
        }
        if (this.isDisabledByDisableUntil(dateEnd, disableUntil)) {
            return true;
        }
        if (this.isDisabledByDisableSince(dateBegin, disableSince)) {
            return true;
        }
        if (this.isDisabledByDisableDateRange(dateBegin, dateEnd, disableDateRanges)) {
            return true;
        }
        if (year < minYear || year > maxYear) {
            return true;
        }
        return false;
    };
    /**
     * @param {?} date
     * @param {?} disableUntil
     * @return {?}
     */
    UtilService.prototype.isDisabledByDisableUntil = /**
     * @param {?} date
     * @param {?} disableUntil
     * @return {?}
     */
    function (date, disableUntil) {
        return this.isInitializedDate(disableUntil) && this.getTimeInMilliseconds(date) <= this.getTimeInMilliseconds(disableUntil);
    };
    /**
     * @param {?} date
     * @param {?} disableSince
     * @return {?}
     */
    UtilService.prototype.isDisabledByDisableSince = /**
     * @param {?} date
     * @param {?} disableSince
     * @return {?}
     */
    function (date, disableSince) {
        return this.isInitializedDate(disableSince) && this.getTimeInMilliseconds(date) >= this.getTimeInMilliseconds(disableSince);
    };
    /**
     * @param {?} date
     * @param {?} enableDates
     * @return {?}
     */
    UtilService.prototype.isPastDatesEnabled = /**
     * @param {?} date
     * @param {?} enableDates
     * @return {?}
     */
    function (date, enableDates) {
        var e_6, _a;
        try {
            for (var enableDates_1 = tslib_1.__values(enableDates), enableDates_1_1 = enableDates_1.next(); !enableDates_1_1.done; enableDates_1_1 = enableDates_1.next()) {
                var d = enableDates_1_1.value;
                if (this.getTimeInMilliseconds(d) <= this.getTimeInMilliseconds(date)) {
                    return true;
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (enableDates_1_1 && !enableDates_1_1.done && (_a = enableDates_1.return)) _a.call(enableDates_1);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return false;
    };
    /**
     * @param {?} date
     * @param {?} enableDates
     * @return {?}
     */
    UtilService.prototype.isFutureDatesEnabled = /**
     * @param {?} date
     * @param {?} enableDates
     * @return {?}
     */
    function (date, enableDates) {
        var e_7, _a;
        try {
            for (var enableDates_2 = tslib_1.__values(enableDates), enableDates_2_1 = enableDates_2.next(); !enableDates_2_1.done; enableDates_2_1 = enableDates_2.next()) {
                var d = enableDates_2_1.value;
                if (this.getTimeInMilliseconds(d) >= this.getTimeInMilliseconds(date)) {
                    return true;
                }
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (enableDates_2_1 && !enableDates_2_1.done && (_a = enableDates_2.return)) _a.call(enableDates_2);
            }
            finally { if (e_7) throw e_7.error; }
        }
        return false;
    };
    /**
     * @param {?} dateBegin
     * @param {?} dateEnd
     * @param {?} enableDates
     * @return {?}
     */
    UtilService.prototype.isDatesEnabled = /**
     * @param {?} dateBegin
     * @param {?} dateEnd
     * @param {?} enableDates
     * @return {?}
     */
    function (dateBegin, dateEnd, enableDates) {
        var e_8, _a;
        try {
            for (var enableDates_3 = tslib_1.__values(enableDates), enableDates_3_1 = enableDates_3.next(); !enableDates_3_1.done; enableDates_3_1 = enableDates_3.next()) {
                var d = enableDates_3_1.value;
                if (this.getTimeInMilliseconds(d) >= this.getTimeInMilliseconds(dateBegin)
                    && this.getTimeInMilliseconds(d) <= this.getTimeInMilliseconds(dateEnd)) {
                    return true;
                }
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (enableDates_3_1 && !enableDates_3_1.done && (_a = enableDates_3.return)) _a.call(enableDates_3);
            }
            finally { if (e_8) throw e_8.error; }
        }
        return false;
    };
    /**
     * @param {?} dateBegin
     * @param {?} dateEnd
     * @param {?} disableDateRanges
     * @return {?}
     */
    UtilService.prototype.isDisabledByDisableDateRange = /**
     * @param {?} dateBegin
     * @param {?} dateEnd
     * @param {?} disableDateRanges
     * @return {?}
     */
    function (dateBegin, dateEnd, disableDateRanges) {
        var e_9, _a;
        /** @type {?} */
        var dateMsBegin = this.getTimeInMilliseconds(dateBegin);
        /** @type {?} */
        var dateMsEnd = this.getTimeInMilliseconds(dateEnd);
        try {
            for (var disableDateRanges_1 = tslib_1.__values(disableDateRanges), disableDateRanges_1_1 = disableDateRanges_1.next(); !disableDateRanges_1_1.done; disableDateRanges_1_1 = disableDateRanges_1.next()) {
                var d = disableDateRanges_1_1.value;
                if (this.isInitializedDate(d.begin) && this.isInitializedDate(d.end)
                    && dateMsBegin >= this.getTimeInMilliseconds(d.begin) && dateMsEnd <= this.getTimeInMilliseconds(d.end)) {
                    return true;
                }
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (disableDateRanges_1_1 && !disableDateRanges_1_1.done && (_a = disableDateRanges_1.return)) _a.call(disableDateRanges_1);
            }
            finally { if (e_9) throw e_9.error; }
        }
        return false;
    };
    /**
     * @param {?} date
     * @param {?} options
     * @return {?}
     */
    UtilService.prototype.isMarkedDate = /**
     * @param {?} date
     * @param {?} options
     * @return {?}
     */
    function (date, options) {
        var e_10, _a;
        var markDates = options.markDates, markWeekends = options.markWeekends;
        try {
            for (var markDates_1 = tslib_1.__values(markDates), markDates_1_1 = markDates_1.next(); !markDates_1_1.done; markDates_1_1 = markDates_1.next()) {
                var md = markDates_1_1.value;
                if (this.dateMatchToDates(date, md.dates)) {
                    return this.getMarkedValue(true, md.color, md.styleClass);
                }
            }
        }
        catch (e_10_1) { e_10 = { error: e_10_1 }; }
        finally {
            try {
                if (markDates_1_1 && !markDates_1_1.done && (_a = markDates_1.return)) _a.call(markDates_1);
            }
            finally { if (e_10) throw e_10.error; }
        }
        if (markWeekends && markWeekends.marked) {
            /** @type {?} */
            var dayNbr = this.getDayNumber(date);
            if (dayNbr === 0 || dayNbr === 6) {
                return this.getMarkedValue(true, markWeekends.color, EMPTY_STR);
            }
        }
        return this.getMarkedValue(false, EMPTY_STR, EMPTY_STR);
    };
    /**
     * @param {?} marked
     * @param {?} color
     * @param {?} styleClass
     * @return {?}
     */
    UtilService.prototype.getMarkedValue = /**
     * @param {?} marked
     * @param {?} color
     * @param {?} styleClass
     * @return {?}
     */
    function (marked, color, styleClass) {
        return { marked: marked, color: color ? color : EMPTY_STR, styleClass: styleClass ? styleClass : EMPTY_STR };
    };
    /**
     * @param {?} date
     * @param {?} options
     * @return {?}
     */
    UtilService.prototype.isHighlightedDate = /**
     * @param {?} date
     * @param {?} options
     * @return {?}
     */
    function (date, options) {
        var sunHighlight = options.sunHighlight, satHighlight = options.satHighlight, highlightDates = options.highlightDates;
        /** @type {?} */
        var dayNbr = this.getDayNumber(date);
        if (sunHighlight && dayNbr === 0 || satHighlight && dayNbr === 6) {
            return true;
        }
        if (this.dateMatchToDates(date, highlightDates)) {
            return true;
        }
        return false;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    UtilService.prototype.getWeekNumber = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var d = new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0);
        d.setDate(d.getDate() + (d.getDay() === 0 ? -3 : 4 - d.getDay()));
        return Math.round(((d.getTime() - new Date(d.getFullYear(), 0, 4).getTime()) / 86400000) / 7) + 1;
    };
    /**
     * @param {?} date
     * @param {?} dateRange
     * @param {?} dateFormat
     * @param {?} monthLabels
     * @param {?} rangeDelimiter
     * @param {?=} dateStr
     * @return {?}
     */
    UtilService.prototype.getDateModel = /**
     * @param {?} date
     * @param {?} dateRange
     * @param {?} dateFormat
     * @param {?} monthLabels
     * @param {?} rangeDelimiter
     * @param {?=} dateStr
     * @return {?}
     */
    function (date, dateRange, dateFormat, monthLabels, rangeDelimiter, dateStr) {
        if (dateStr === void 0) { dateStr = EMPTY_STR; }
        /** @type {?} */
        var singleDateModel = null;
        /** @type {?} */
        var dateRangeModel = null;
        if (date) {
            singleDateModel = {
                date: date,
                jsDate: this.myDateToJsDate(date),
                formatted: dateStr.length ? dateStr : this.formatDate(date, dateFormat, monthLabels),
                epoc: this.getEpocTime(date)
            };
        }
        else {
            dateRangeModel = {
                beginDate: dateRange.begin,
                beginJsDate: this.myDateToJsDate(dateRange.begin),
                beginEpoc: this.getEpocTime(dateRange.begin),
                endDate: dateRange.end,
                endJsDate: this.myDateToJsDate(dateRange.end),
                endEpoc: this.getEpocTime(dateRange.end),
                formatted: this.formatDate(dateRange.begin, dateFormat, monthLabels) + rangeDelimiter + this.formatDate(dateRange.end, dateFormat, monthLabels)
            };
        }
        return {
            isRange: date === null,
            singleDate: singleDateModel,
            dateRange: dateRangeModel
        };
    };
    /**
     * @param {?} date
     * @param {?} dateFormat
     * @param {?} monthLabels
     * @return {?}
     */
    UtilService.prototype.formatDate = /**
     * @param {?} date
     * @param {?} dateFormat
     * @param {?} monthLabels
     * @return {?}
     */
    function (date, dateFormat, monthLabels) {
        /** @type {?} */
        var formatted = dateFormat.replace(YYYY, String(date.year));
        if (dateFormat.indexOf(MMM) !== -1) {
            formatted = formatted.replace(MMM, monthLabels[date.month]);
        }
        else if (dateFormat.indexOf(MM) !== -1) {
            formatted = formatted.replace(MM, this.preZero(date.month));
        }
        else {
            formatted = formatted.replace(M, String(date.month));
        }
        if (dateFormat.indexOf(DD) !== -1) {
            formatted = formatted.replace(DD, this.preZero(date.day));
        }
        else {
            formatted = formatted.replace(D, String(date.day));
        }
        if (dateFormat.indexOf(ORDINAL) !== -1) {
            formatted = formatted.replace(ORDINAL, this.getOrdinal(date.day));
        }
        return formatted;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    UtilService.prototype.getOrdinal = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (date > 3 && date < 21) {
            return TH;
        }
        switch (date % 10) {
            case 1:
                return ST;
            case 2:
                return ND;
            case 3:
                return RD;
            default:
                return TH;
        }
    };
    /**
     * @param {?} model
     * @return {?}
     */
    UtilService.prototype.getFormattedDate = /**
     * @param {?} model
     * @return {?}
     */
    function (model) {
        return !model.isRange ? model.singleDate.formatted : model.dateRange.formatted;
    };
    /**
     * @param {?} val
     * @return {?}
     */
    UtilService.prototype.preZero = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        return val < 10 ? ZERO_STR + val : String(val);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    UtilService.prototype.isInitializedDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.year !== 0 && date.month !== 0 && date.day !== 0;
    };
    /**
     * @param {?} firstDate
     * @param {?} secondDate
     * @return {?}
     */
    UtilService.prototype.isDateEarlier = /**
     * @param {?} firstDate
     * @param {?} secondDate
     * @return {?}
     */
    function (firstDate, secondDate) {
        return this.getTimeInMilliseconds(firstDate) < this.getTimeInMilliseconds(secondDate);
    };
    /**
     * @param {?} firstDate
     * @param {?} secondDate
     * @return {?}
     */
    UtilService.prototype.isDateSameOrEarlier = /**
     * @param {?} firstDate
     * @param {?} secondDate
     * @return {?}
     */
    function (firstDate, secondDate) {
        return this.getTimeInMilliseconds(firstDate) <= this.getTimeInMilliseconds(secondDate);
    };
    /**
     * @param {?} firstDate
     * @param {?} secondDate
     * @return {?}
     */
    UtilService.prototype.isDateSame = /**
     * @param {?} firstDate
     * @param {?} secondDate
     * @return {?}
     */
    function (firstDate, secondDate) {
        return this.getTimeInMilliseconds(firstDate) === this.getTimeInMilliseconds(secondDate);
    };
    /**
     * @param {?} dateRange
     * @param {?} date
     * @return {?}
     */
    UtilService.prototype.isDateRangeBeginOrEndSame = /**
     * @param {?} dateRange
     * @param {?} date
     * @return {?}
     */
    function (dateRange, date) {
        /** @type {?} */
        var dateMs = this.getTimeInMilliseconds(date);
        return this.getTimeInMilliseconds(dateRange.begin) === dateMs || this.getTimeInMilliseconds(dateRange.end) === dateMs;
    };
    /**
     * @param {?} dateRange
     * @param {?} date
     * @return {?}
     */
    UtilService.prototype.isDateRangeBegin = /**
     * @param {?} dateRange
     * @param {?} date
     * @return {?}
     */
    function (dateRange, date) {
        /** @type {?} */
        var dateMs = this.getTimeInMilliseconds(date);
        return this.getTimeInMilliseconds(dateRange.begin) === dateMs;
    };
    /**
     * @param {?} dateRange
     * @param {?} date
     * @return {?}
     */
    UtilService.prototype.isDateRangeEnd = /**
     * @param {?} dateRange
     * @param {?} date
     * @return {?}
     */
    function (dateRange, date) {
        /** @type {?} */
        var dateMs = this.getTimeInMilliseconds(date);
        return this.getTimeInMilliseconds(dateRange.end) === dateMs;
    };
    /**
     * @param {?} date
     * @param {?} dateRange
     * @return {?}
     */
    UtilService.prototype.isDateInRange = /**
     * @param {?} date
     * @param {?} dateRange
     * @return {?}
     */
    function (date, dateRange) {
        if (!this.isInitializedDate(dateRange.begin) || !this.isInitializedDate(dateRange.end)) {
            return false;
        }
        return this.isDateSameOrEarlier(dateRange.begin, date) && this.isDateSameOrEarlier(date, dateRange.end);
    };
    /**
     * @return {?}
     */
    UtilService.prototype.resetDate = /**
     * @return {?}
     */
    function () {
        return { year: 0, month: 0, day: 0 };
    };
    /**
     * @param {?} date
     * @return {?}
     */
    UtilService.prototype.getTimeInMilliseconds = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.myDateToJsDate(date).getTime();
    };
    /**
     * @return {?}
     */
    UtilService.prototype.getToday = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var date = new Date();
        return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    };
    /**
     * @param {?} date
     * @return {?}
     */
    UtilService.prototype.getDayNumber = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0).getDay();
    };
    /**
     * @param {?} wd
     * @return {?}
     */
    UtilService.prototype.getWeekdayIndex = /**
     * @param {?} wd
     * @return {?}
     */
    function (wd) {
        return this.weekDays.indexOf(wd);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    UtilService.prototype.getEpocTime = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return Math.round(this.getTimeInMilliseconds(date) / 1000.0);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    UtilService.prototype.jsDateToMyDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    };
    /**
     * @param {?} date
     * @return {?}
     */
    UtilService.prototype.myDateToJsDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        var year = date.year, month = date.month, day = date.day;
        return new Date(year, month - 1, day, 0, 0, 0, 0);
    };
    /**
     * @param {?} m
     * @param {?} y
     * @return {?}
     */
    UtilService.prototype.datesInMonth = /**
     * @param {?} m
     * @param {?} y
     * @return {?}
     */
    function (m, y) {
        return new Date(y, m, 0).getDate();
    };
    /**
     * @param {?} m
     * @param {?} y
     * @return {?}
     */
    UtilService.prototype.datesInPrevMonth = /**
     * @param {?} m
     * @param {?} y
     * @return {?}
     */
    function (m, y) {
        /** @type {?} */
        var d = this.getJsDate(y, m, 1);
        d.setMonth(d.getMonth() - 1);
        return this.datesInMonth(d.getMonth() + 1, d.getFullYear());
    };
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} day
     * @return {?}
     */
    UtilService.prototype.getJsDate = /**
     * @param {?} year
     * @param {?} month
     * @param {?} day
     * @return {?}
     */
    function (year, month, day) {
        return new Date(year, month - 1, day, 0, 0, 0, 0);
    };
    /**
     * @param {?} selectedValue
     * @param {?} dateRange
     * @return {?}
     */
    UtilService.prototype.getSelectedValue = /**
     * @param {?} selectedValue
     * @param {?} dateRange
     * @return {?}
     */
    function (selectedValue, dateRange) {
        if (!selectedValue) {
            return null;
        }
        if (!dateRange) {
            return selectedValue.date;
        }
        else {
            var beginDate = selectedValue.beginDate, endDate = selectedValue.endDate;
            return { begin: beginDate, end: endDate };
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    UtilService.prototype.getKeyCodeFromEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var key = event.key || event.keyCode || event.which;
        if (this.checkKeyName(key, KeyName.enter) || key === KeyCode.enter) {
            return KeyCode.enter;
        }
        else if (this.checkKeyName(key, KeyName.esc) || key === KeyCode.esc) {
            return KeyCode.esc;
        }
        else if (this.checkKeyName(key, KeyName.space) || key === KeyCode.space) {
            return KeyCode.space;
        }
        else if (this.checkKeyName(key, KeyName.leftArrow) || key === KeyCode.leftArrow) {
            return KeyCode.leftArrow;
        }
        else if (this.checkKeyName(key, KeyName.upArrow) || key === KeyCode.upArrow) {
            return KeyCode.upArrow;
        }
        else if (this.checkKeyName(key, KeyName.rightArrow) || key === KeyCode.rightArrow) {
            return KeyCode.rightArrow;
        }
        else if (this.checkKeyName(key, KeyName.downArrow) || key === KeyCode.downArrow) {
            return KeyCode.downArrow;
        }
        else if (this.checkKeyName(key, KeyName.tab) || key === KeyCode.tab) {
            return KeyCode.tab;
        }
        else if (this.checkKeyName(key, KeyName.shift) || key === KeyCode.shift) {
            return KeyCode.shift;
        }
        else {
            return null;
        }
    };
    /**
     * @param {?} key
     * @param {?} keyName
     * @return {?}
     */
    UtilService.prototype.checkKeyName = /**
     * @param {?} key
     * @param {?} keyName
     * @return {?}
     */
    function (key, keyName) {
        /** @type {?} */
        var arr = keyName.split(PIPE);
        return arr.indexOf(key) !== -1;
    };
    UtilService.decorators = [
        { type: Injectable }
    ];
    return UtilService;
}());
export { UtilService };
if (false) {
    /** @type {?} */
    UtilService.prototype.weekDays;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1teWRhdGVwaWNrZXIudXRpbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1teWRhdGVwaWNrZXIvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvYW5ndWxhci1teWRhdGVwaWNrZXIudXRpbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQWF6QyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDL0MsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sRUFBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFFM0k7SUFBQTtRQUVFLGFBQVEsR0FBa0IsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQXVuQnpELENBQUM7Ozs7Ozs7SUFybkJDLGlDQUFXOzs7Ozs7SUFBWCxVQUFZLE9BQWUsRUFBRSxPQUFtQixFQUFFLFlBQWdDOztRQUN6RSxJQUFBLCtCQUFVLEVBQUUseUJBQU8sRUFBRSx5QkFBTyxFQUFFLGlDQUFXOztZQUUxQyxVQUFVLEdBQVksSUFBSSxDQUFDLFNBQVMsRUFBRTs7WUFDdEMsWUFBWSxHQUFrQixDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxF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RUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDdkUsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDO1NBQ3RCO2FBQ0ksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxLQUFLLE9BQU8sQ0FBQyxTQUFTLEVBQUU7WUFDL0UsT0FBTyxPQUFPLENBQUMsU0FBUyxDQUFDO1NBQzFCO2FBQ0ksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxLQUFLLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDM0UsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDO1NBQ3hCO2FBQ0ksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxLQUFLLE9BQU8sQ0FBQyxVQUFVLEVBQUU7WUFDakYsT0FBTyxPQUFPLENBQUMsVUFBVSxDQUFDO1NBQzNCO2FBQ0ksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUcsR0FBRyxLQUFLLE9BQU8sQ0FBQyxTQUFTLEVBQUU7WUFDOUUsT0FBTyxPQUFPLENBQUMsU0FBUyxDQUFDO1NBQzFCO2FBQ0ksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxLQUFLLE9BQU8sQ0FBQyxHQUFHLEVBQUU7WUFDbkUsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDO1NBQ3BCO2FBQ0ksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDdkUsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDO1NBQ3RCO2FBQ0k7WUFDSCxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQzs7Ozs7O0lBRUQsa0NBQVk7Ozs7O0lBQVosVUFBYSxHQUFXLEVBQUUsT0FBZTs7WUFDakMsR0FBRyxHQUFrQixPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUM5QyxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDakMsQ0FBQzs7Z0JBeG5CRixVQUFVOztJQXluQlgsa0JBQUM7Q0FBQSxBQXpuQkQsSUF5bkJDO1NBeG5CWSxXQUFXOzs7SUFDdEIsK0JBQXVEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtJTXlEYXRlTW9kZWx9IGZyb20gXCIuLi9pbnRlcmZhY2VzL215LWRhdGUtbW9kZWwuaW50ZXJmYWNlXCI7XG5pbXBvcnQge0lNeVNpbmdsZURhdGVNb2RlbH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvbXktc2luZ2xlLWRhdGUtbW9kZWwuaW50ZXJmYWNlXCI7XG5pbXBvcnQge0lNeURhdGVSYW5nZU1vZGVsfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9teS1kYXRlLXJhbmdlLW1vZGVsLmludGVyZmFjZVwiO1xuaW1wb3J0IHtJTXlEYXRlfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9teS1kYXRlLmludGVyZmFjZVwiO1xuaW1wb3J0IHtJTXlEYXRlUmFuZ2V9IGZyb20gXCIuLi9pbnRlcmZhY2VzL215LWRhdGUtcmFuZ2UuaW50ZXJmYWNlXCI7XG5pbXBvcnQge0lNeU1vbnRofSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9teS1tb250aC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SU15TW9udGhMYWJlbHN9IGZyb20gXCIuLi9pbnRlcmZhY2VzL215LW1vbnRoLWxhYmVscy5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SU15TWFya2VkRGF0ZX0gZnJvbSBcIi4uL2ludGVyZmFjZXMvbXktbWFya2VkLWRhdGUuaW50ZXJmYWNlXCI7XG5pbXBvcnQge0lNeURpc2FibGVkRGF0ZX0gZnJvbSBcIi4uL2ludGVyZmFjZXMvbXktZGlzYWJsZWQtZGF0ZS5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SU15RGF0ZUZvcm1hdH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvbXktZGF0ZS1mb3JtYXQuaW50ZXJmYWNlXCI7XG5pbXBvcnQge0lNeVZhbGlkYXRlT3B0aW9uc30gZnJvbSBcIi4uL2ludGVyZmFjZXMvbXktdmFsaWRhdGUtb3B0aW9ucy5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SU15T3B0aW9uc30gZnJvbSBcIi4uL2ludGVyZmFjZXMvbXktb3B0aW9ucy5pbnRlcmZhY2VcIjtcbmltcG9ydCB7S2V5Q29kZX0gZnJvbSBcIi4uL2VudW1zL2tleS1jb2RlLmVudW1cIjtcbmltcG9ydCB7S2V5TmFtZX0gZnJvbSBcIi4uL2VudW1zL2tleS1uYW1lLmVudW1cIjtcbmltcG9ydCB7RCwgREQsIE0sIE1NLCBNTU0sIFlZWVksIE9SRElOQUwsIFNULCBORCwgUkQsIFNVLCBNTywgVFUsIFdFLCBUSCwgRlIsIFNBLCBaRVJPX1NUUiwgRU1QVFlfU1RSLCBQSVBFfSBmcm9tIFwiLi4vY29uc3RhbnRzL2NvbnN0YW50c1wiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVXRpbFNlcnZpY2Uge1xuICB3ZWVrRGF5czogQXJyYXk8c3RyaW5nPiA9IFtTVSwgTU8sIFRVLCBXRSwgVEgsIEZSLCBTQV07XG5cbiAgaXNEYXRlVmFsaWQoZGF0ZVN0cjogc3RyaW5nLCBvcHRpb25zOiBJTXlPcHRpb25zLCB2YWxpZGF0ZU9wdHM6IElNeVZhbGlkYXRlT3B0aW9ucyk6IElNeURhdGUge1xuICAgIGNvbnN0IHtkYXRlRm9ybWF0LCBtaW5ZZWFyLCBtYXhZZWFyLCBtb250aExhYmVsc30gPSBvcHRpb25zO1xuXG4gICAgY29uc3QgcmV0dXJuRGF0ZTogSU15RGF0ZSA9IHRoaXMucmVzZXREYXRlKCk7XG4gICAgY29uc3QgZGF0ZXNJbk1vbnRoOiBBcnJheTxudW1iZXI+ID0gWzMxLCAyOCwgMzEsIDMwLCAzMSwgMzAsIDMxLCAzMSwgMzAsIDMxLCAzMCwgMzFdO1xuICAgIGNvbnN0IGlzTW9udGhTdHI6IGJvb2xlYW4gPSBkYXRlRm9ybWF0LmluZGV4T2YoTU1NKSAhPT0gLTE7XG4gICAgY29uc3QgZGVsaW1ldGVyczogQXJyYXk8c3RyaW5nPiA9IGRhdGVGb3JtYXQubWF0Y2goL1teKGQjbXkpXXsxLH0vZyk7XG5cbiAgICBpZiAoIWRhdGVTdHIgfHwgZGF0ZVN0ciA9PT0gRU1QVFlfU1RSKSB7XG4gICAgICByZXR1cm4gcmV0dXJuRGF0ZTtcbiAgICB9XG5cbiAgICBjb25zdCBkYXRlVmFsdWVzOiBBcnJheTxJTXlEYXRlRm9ybWF0PiA9IHRoaXMuZ2V0RGF0ZVZhbHVlKGRhdGVTdHIsIGRhdGVGb3JtYXQsIGRlbGltZXRlcnMpO1xuXG4gICAgbGV0IHllYXI6IG51bWJlciA9IDA7XG4gICAgbGV0IG1vbnRoOiBudW1iZXIgPSAwO1xuICAgIGxldCBkYXk6IG51bWJlciA9IDA7XG5cbiAgICBmb3IobGV0IGR2IG9mIGRhdGVWYWx1ZXMpIHtcbiAgICAgIGlmIChkdi5mb3JtYXQuaW5kZXhPZihPUkRJTkFMKSAhPSAtMSkge1xuICAgICAgICBjb25zdCBkYXlOdW1iZXI6IG51bWJlciA9IHBhcnNlSW50KGR2LnZhbHVlLnJlcGxhY2UoL1xcRC9nLCAnJykpO1xuICAgICAgICBjb25zdCBvcmRpbmFsU3RyOiBzdHJpbmcgPSBkdi52YWx1ZS5yZXBsYWNlKC9bMC05XS9nLCAnJyk7XG4gICAgICAgIGNvbnN0IG9yZGluYWw6IHN0cmluZyA9IHRoaXMuZ2V0T3JkaW5hbChkYXlOdW1iZXIpO1xuXG4gICAgICAgIGlmIChvcmRpbmFsICE9PSBvcmRpbmFsU3RyKSB7XG4gICAgICAgICAgcmV0dXJuIHJldHVybkRhdGU7XG4gICAgICAgIH1cblxuICAgICAgICBkdi52YWx1ZSA9IGR2LnZhbHVlLnJlcGxhY2UoU1QsIEVNUFRZX1NUUikucmVwbGFjZShORCwgRU1QVFlfU1RSKS5yZXBsYWNlKFJELCBFTVBUWV9TVFIpLnJlcGxhY2UoVEgsIEVNUFRZX1NUUik7XG4gICAgICAgIGR2LmZvcm1hdCA9IGR2LmZvcm1hdC5yZXBsYWNlKE9SRElOQUwsIEVNUFRZX1NUUik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHt2YWx1ZSwgZm9ybWF0fSA9IGR2O1xuXG4gICAgICBpZiAodmFsdWUgJiYgL15cXGQrJC8udGVzdCh2YWx1ZSkgJiYgTnVtYmVyKHZhbHVlKSA9PT0gMCkge1xuICAgICAgICByZXR1cm4gcmV0dXJuRGF0ZTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaWYgKGZvcm1hdC5pbmRleE9mKFlZWVkpICE9PSAtMSkge1xuICAgICAgICB5ZWFyID0gdGhpcy5nZXROdW1iZXJCeVZhbHVlKGR2KTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGZvcm1hdC5pbmRleE9mKE0pICE9PSAtMSkge1xuICAgICAgICBtb250aCA9IGlzTW9udGhTdHIgPyB0aGlzLmdldE1vbnRoTnVtYmVyQnlNb250aE5hbWUoZHYsIG1vbnRoTGFiZWxzKSA6IHRoaXMuZ2V0TnVtYmVyQnlWYWx1ZShkdik7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChmb3JtYXQuaW5kZXhPZihEKSAhPT0gLTEpIHtcbiAgICAgICAgZGF5ID0gdGhpcy5nZXROdW1iZXJCeVZhbHVlKGR2KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB7dmFsaWRhdGVEaXNhYmxlZERhdGVzLCBzZWxlY3RlZFZhbHVlfSA9IHZhbGlkYXRlT3B0cztcblxuICAgIHllYXIgPSB5ZWFyID09PSAwICYmIHNlbGVjdGVkVmFsdWUgPyBzZWxlY3RlZFZhbHVlLnllYXIgOiB5ZWFyO1xuICAgIG1vbnRoID0gbW9udGggPT09IDAgJiYgc2VsZWN0ZWRWYWx1ZSA/IHNlbGVjdGVkVmFsdWUubW9udGggOiBtb250aDtcbiAgICBkYXkgPSBkYXkgPT09IDAgJiYgc2VsZWN0ZWRWYWx1ZSA/IHNlbGVjdGVkVmFsdWUuZGF5IDogZGF5O1xuXG4gICAgY29uc3QgdG9kYXk6IElNeURhdGUgPSB0aGlzLmdldFRvZGF5KCk7XG4gICAgaWYgKHllYXIgPT09IDAgJiYgKG1vbnRoICE9PSAwIHx8IGRheSAhPT0gMCkpIHtcbiAgICAgIHllYXIgPSB0b2RheS55ZWFyO1xuICAgIH1cblxuICAgIGlmIChtb250aCA9PT0gMCAmJiAoeWVhciAhPT0gMCB8fCBkYXkgIT09IDApKSB7XG4gICAgICBtb250aCA9IHRvZGF5Lm1vbnRoO1xuICAgIH1cblxuICAgIGlmIChkYXkgPT09IDAgJiYgKHllYXIgIT09IDAgfHwgbW9udGggIT09IDApKSB7XG4gICAgICBkYXkgPSB0b2RheS5kYXk7XG4gICAgfVxuXG4gICAgaWYgKG1vbnRoICE9PSAtMSAmJiBkYXkgIT09IC0xICYmIHllYXIgIT09IC0xKSB7XG4gICAgICBpZiAoeWVhciA8IG1pblllYXIgfHwgeWVhciA+IG1heFllYXIgfHwgbW9udGggPCAxIHx8IG1vbnRoID4gMTIpIHtcbiAgICAgICAgcmV0dXJuIHJldHVybkRhdGU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRhdGU6IElNeURhdGUgPSB7eWVhciwgbW9udGgsIGRheX07XG5cbiAgICAgIGlmICh2YWxpZGF0ZURpc2FibGVkRGF0ZXMgJiYgdGhpcy5pc0Rpc2FibGVkRGF0ZShkYXRlLCBvcHRpb25zKS5kaXNhYmxlZCkge1xuICAgICAgICByZXR1cm4gcmV0dXJuRGF0ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHllYXIgJSA0MDAgPT09IDAgfHwgKHllYXIgJSAxMDAgIT09IDAgJiYgeWVhciAlIDQgPT09IDApKSB7XG4gICAgICAgIGRhdGVzSW5Nb250aFsxXSA9IDI5O1xuICAgICAgfVxuXG4gICAgICBpZiAoZGF5IDwgMSB8fCBkYXkgPiBkYXRlc0luTW9udGhbbW9udGggLSAxXSkge1xuICAgICAgICByZXR1cm4gcmV0dXJuRGF0ZTtcbiAgICAgIH1cblxuICAgICAgLy8gVmFsaWQgZGF0ZVxuICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5EYXRlO1xuICB9XG5cbiAgaXNEYXRlVmFsaWREYXRlUmFuZ2UoZGF0ZVJhbmdlU3RyOiBzdHJpbmcsIG9wdGlvbnM6IElNeU9wdGlvbnMsIHZhbGlkYXRlT3B0czogSU15VmFsaWRhdGVPcHRpb25zKTogSU15RGF0ZVJhbmdlIHtcbiAgICBsZXQgZGF0ZVJhbmdlOiBJTXlEYXRlUmFuZ2UgPSB7YmVnaW46IHRoaXMucmVzZXREYXRlKCksIGVuZDogdGhpcy5yZXNldERhdGUoKX07XG4gICAgaWYgKGRhdGVSYW5nZVN0ciAmJiBkYXRlUmFuZ2VTdHIubGVuZ3RoKSB7XG4gICAgICBjb25zdCBkYXRlczogQXJyYXk8c3RyaW5nPiA9IGRhdGVSYW5nZVN0ci5zcGxpdChvcHRpb25zLmRhdGVSYW5nZURhdGVzRGVsaW1pdGVyKTtcbiAgICAgIGlmIChkYXRlcyAmJiBkYXRlcy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgY29uc3QgW2JlZ2luRGF0ZSwgZW5kRGF0ZV0gPSBkYXRlcztcbiAgICAgICAgbGV0IHtzZWxlY3RlZFZhbHVlfSA9IHZhbGlkYXRlT3B0cztcblxuICAgICAgICBpZiAoc2VsZWN0ZWRWYWx1ZSkge1xuICAgICAgICAgIHZhbGlkYXRlT3B0cy5zZWxlY3RlZFZhbHVlID0gc2VsZWN0ZWRWYWx1ZS5iZWdpbjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc3QgYmVnaW46IElNeURhdGUgPSB0aGlzLmlzRGF0ZVZhbGlkKGJlZ2luRGF0ZSwgb3B0aW9ucywgdmFsaWRhdGVPcHRzKTtcblxuICAgICAgICBpZiAodGhpcy5pc0luaXRpYWxpemVkRGF0ZShiZWdpbikpIHtcbiAgICAgICAgICBpZiAoc2VsZWN0ZWRWYWx1ZSkge1xuICAgICAgICAgICAgdmFsaWRhdGVPcHRzLnNlbGVjdGVkVmFsdWUgPSBzZWxlY3RlZFZhbHVlLmVuZDtcbiAgICAgICAgICB9XG4gICAgICAgICAgXG4gICAgICAgICAgY29uc3QgZW5kOiBJTXlEYXRlID0gdGhpcy5pc0RhdGVWYWxpZChlbmREYXRlLCBvcHRpb25zLCB2YWxpZGF0ZU9wdHMpO1xuXG4gICAgICAgICAgaWYgKHRoaXMuaXNJbml0aWFsaXplZERhdGUoZW5kKSAmJiB0aGlzLmlzRGF0ZVNhbWVPckVhcmxpZXIoYmVnaW4sIGVuZCkpIHtcbiAgICAgICAgICAgIGRhdGVSYW5nZSA9IHtiZWdpbiwgZW5kfTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGVSYW5nZTtcbiAgfVxuXG4gIGdldERhdGVWYWx1ZShkYXRlU3RyOiBzdHJpbmcsIGRhdGVGb3JtYXQ6IHN0cmluZywgZGVsaW1ldGVyczogQXJyYXk8c3RyaW5nPik6IEFycmF5PElNeURhdGVGb3JtYXQ+IHtcbiAgICBsZXQgZGVsOiBzdHJpbmcgPSBFTVBUWV9TVFI7XG4gICAgXG4gICAgaWYgKGRlbGltZXRlcnMpIHtcbiAgICAgIGZvcihjb25zdCBkIG9mIGRlbGltZXRlcnMpIHtcbiAgICAgICAgaWYgKGRlbC5pbmRleE9mKGQpID09PSAtMSkge1xuICAgICAgICAgIGRlbCArPSBkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcmU6IGFueSA9IG5ldyBSZWdFeHAoXCJbXCIgKyBkZWwgKyBcIl1cIik7XG4gICAgY29uc3QgZHM6IEFycmF5PHN0cmluZz4gPSBkYXRlU3RyLnNwbGl0KHJlKTtcbiAgICBjb25zdCBkZjogQXJyYXk8c3RyaW5nPiA9IGRhdGVGb3JtYXQuc3BsaXQocmUpO1xuICAgIGNvbnN0IGRhOiBBcnJheTxJTXlEYXRlRm9ybWF0PiA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZi5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGRmW2ldLmluZGV4T2YoWVlZWSkgIT09IC0xKSB7XG4gICAgICAgIGRhLnB1c2goe3ZhbHVlOiBkc1tpXSwgZm9ybWF0OiBkZltpXX0pO1xuICAgICAgfVxuICAgICAgaWYgKGRmW2ldLmluZGV4T2YoTSkgIT09IC0xKSB7XG4gICAgICAgIGRhLnB1c2goe3ZhbHVlOiBkc1tpXSwgZm9ybWF0OiBkZltpXX0pO1xuICAgICAgfVxuICAgICAgaWYgKGRmW2ldLmluZGV4T2YoRCkgIT09IC0xKSB7XG4gICAgICAgIGRhLnB1c2goe3ZhbHVlOiBkc1tpXSwgZm9ybWF0OiBkZltpXX0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGE7XG4gIH1cblxuICBnZXRNb250aE51bWJlckJ5TW9udGhOYW1lKGRmOiBJTXlEYXRlRm9ybWF0LCBtb250aExhYmVsczogSU15TW9udGhMYWJlbHMpOiBudW1iZXIge1xuICAgIGlmIChkZi52YWx1ZSkge1xuICAgICAgZm9yIChsZXQga2V5ID0gMTsga2V5IDw9IDEyOyBrZXkrKykge1xuICAgICAgICBpZiAoZGYudmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gbW9udGhMYWJlbHNba2V5XS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICBnZXROdW1iZXJCeVZhbHVlKGRmOiBJTXlEYXRlRm9ybWF0KTogbnVtYmVyIHtcbiAgICBpZiAoIS9eXFxkKyQvLnRlc3QoZGYudmFsdWUpKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgbGV0IG5icjogbnVtYmVyID0gTnVtYmVyKGRmLnZhbHVlKTtcbiAgICBpZiAoZGYuZm9ybWF0Lmxlbmd0aCA9PT0gMSAmJiBkZi52YWx1ZS5sZW5ndGggIT09IDEgJiYgbmJyIDwgMTAgfHwgZGYuZm9ybWF0Lmxlbmd0aCA9PT0gMSAmJiBkZi52YWx1ZS5sZW5ndGggIT09IDIgJiYgbmJyID49IDEwKSB7XG4gICAgICBuYnIgPSAtMTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZGYuZm9ybWF0Lmxlbmd0aCA9PT0gMiAmJiBkZi52YWx1ZS5sZW5ndGggPiAyKSB7XG4gICAgICBuYnIgPSAtMTtcbiAgICB9XG4gICAgcmV0dXJuIG5icjtcbiAgfVxuXG4gIHBhcnNlRGVmYXVsdE1vbnRoKG1vbnRoU3RyaW5nOiBzdHJpbmcpOiBJTXlNb250aCB7XG4gICAgY29uc3QgbW9udGg6IElNeU1vbnRoID0ge21vbnRoVHh0OiBFTVBUWV9TVFIsIG1vbnRoTmJyOiAwLCB5ZWFyOiAwfTtcbiAgICBpZiAobW9udGhTdHJpbmcgIT09IEVNUFRZX1NUUikge1xuICAgICAgY29uc3Qgc3BsaXQgPSBtb250aFN0cmluZy5zcGxpdChtb250aFN0cmluZy5tYXRjaCgvW14wLTldLylbMF0pO1xuICAgICAgbW9udGgubW9udGhOYnIgPSBzcGxpdFswXS5sZW5ndGggPT09IDIgPyBOdW1iZXIoc3BsaXRbMF0pIDogTnVtYmVyKHNwbGl0WzFdKTtcbiAgICAgIG1vbnRoLnllYXIgPSBzcGxpdFswXS5sZW5ndGggPT09IDIgPyBOdW1iZXIoc3BsaXRbMV0pIDogTnVtYmVyKHNwbGl0WzBdKTtcbiAgICB9XG4gICAgcmV0dXJuIG1vbnRoO1xuICB9XG5cbiAgaXNEaXNhYmxlZERhdGUoZGF0ZTogSU15RGF0ZSwgb3B0aW9uczogSU15T3B0aW9ucyk6IElNeURpc2FibGVkRGF0ZSB7XG4gICAgY29uc3Qge21pblllYXIsIG1heFllYXIsIGRpc2FibGVVbnRpbCwgZGlzYWJsZVNpbmNlLCBkaXNhYmxlV2Vla2VuZHMsIGRpc2FibGVEYXRlcywgZGlzYWJsZURhdGVSYW5nZXMsIGRpc2FibGVXZWVrZGF5cywgZW5hYmxlRGF0ZXN9ID0gb3B0aW9ucztcblxuICAgIGlmICh0aGlzLmRhdGVNYXRjaFRvRGF0ZXMoZGF0ZSwgZW5hYmxlRGF0ZXMpKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXREaXNhYmxlZFZhbHVlKGZhbHNlLCBFTVBUWV9TVFIpO1xuICAgIH1cblxuICAgIGlmIChkYXRlLnllYXIgPCBtaW5ZZWFyICYmIGRhdGUubW9udGggPT09IDEyIHx8IGRhdGUueWVhciA+IG1heFllYXIgJiYgZGF0ZS5tb250aCA9PT0gMSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlzYWJsZWRWYWx1ZSh0cnVlLCBFTVBUWV9TVFIpO1xuICAgIH1cblxuICAgIGNvbnN0IGlucHV0RGF0ZXM6IGFueSA9IGRpc2FibGVEYXRlcyBhcyBhbnk7XG4gICAgY29uc3QgcmVzdWx0ID0gaW5wdXREYXRlcy5maW5kKChkKSA9PiB7XG4gICAgICByZXR1cm4gZC5kYXRlcztcbiAgICB9KTtcblxuICAgIGlmICghcmVzdWx0KSB7XG4gICAgICBpZiAodGhpcy5kYXRlTWF0Y2hUb0RhdGVzKGRhdGUsIGlucHV0RGF0ZXMpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERpc2FibGVkVmFsdWUodHJ1ZSwgRU1QVFlfU1RSKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBmb3IgKGNvbnN0IGRkIG9mIGlucHV0RGF0ZXMpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0ZU1hdGNoVG9EYXRlcyhkYXRlLCBkZC5kYXRlcykpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5nZXREaXNhYmxlZFZhbHVlKHRydWUsIGRkLnN0eWxlQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNEaXNhYmxlZEJ5RGlzYWJsZVVudGlsKGRhdGUsIGRpc2FibGVVbnRpbCkpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldERpc2FibGVkVmFsdWUodHJ1ZSwgRU1QVFlfU1RSKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkQnlEaXNhYmxlU2luY2UoZGF0ZSwgZGlzYWJsZVNpbmNlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlzYWJsZWRWYWx1ZSh0cnVlLCBFTVBUWV9TVFIpO1xuICAgIH1cblxuICAgIGlmIChkaXNhYmxlV2Vla2VuZHMpIHtcbiAgICAgIGNvbnN0IGRheU5iciA9IHRoaXMuZ2V0RGF5TnVtYmVyKGRhdGUpO1xuICAgICAgaWYgKGRheU5iciA9PT0gMCB8fCBkYXlOYnIgPT09IDYpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlzYWJsZWRWYWx1ZSh0cnVlLCBFTVBUWV9TVFIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGRuID0gdGhpcy5nZXREYXlOdW1iZXIoZGF0ZSk7XG4gICAgaWYgKGRpc2FibGVXZWVrZGF5cy5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IgKGNvbnN0IHdkIG9mIGRpc2FibGVXZWVrZGF5cykge1xuICAgICAgICBpZiAoZG4gPT09IHRoaXMuZ2V0V2Vla2RheUluZGV4KHdkKSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmdldERpc2FibGVkVmFsdWUodHJ1ZSwgRU1QVFlfU1RSKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmlzRGlzYWJsZWRCeURpc2FibGVEYXRlUmFuZ2UoZGF0ZSwgZGF0ZSwgZGlzYWJsZURhdGVSYW5nZXMpKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXREaXNhYmxlZFZhbHVlKHRydWUsIEVNUFRZX1NUUik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZ2V0RGlzYWJsZWRWYWx1ZShmYWxzZSwgRU1QVFlfU1RSKTtcbiAgfVxuXG4gIGdldERpc2FibGVkVmFsdWUoZGlzYWJsZWQ6IGJvb2xlYW4sIHN0eWxlQ2xhc3M6IHN0cmluZyk6IElNeURpc2FibGVkRGF0ZSB7XG4gICAgcmV0dXJuIHtkaXNhYmxlZCwgc3R5bGVDbGFzc307XG4gIH1cblxuICBkYXRlTWF0Y2hUb0RhdGVzKGRhdGU6IElNeURhdGUsIGRhdGVzOiBBcnJheTxJTXlEYXRlPik6IGJvb2xlYW4ge1xuICAgIGZvciAoY29uc3QgZCBvZiBkYXRlcykge1xuICAgICAgaWYgKChkLnllYXIgPT09IDAgfHwgZC55ZWFyID09PSBkYXRlLnllYXIpICYmIChkLm1vbnRoID09PSAwIHx8IGQubW9udGggPT09IGRhdGUubW9udGgpICYmIGQuZGF5ID09PSBkYXRlLmRheSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNEaXNhYmxlZE1vbnRoKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgb3B0aW9uczogSU15T3B0aW9ucyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHtkaXNhYmxlVW50aWwsIGRpc2FibGVTaW5jZSwgZGlzYWJsZURhdGVSYW5nZXMsIGVuYWJsZURhdGVzfSA9IG9wdGlvbnM7XG5cbiAgICBjb25zdCBkYXRlRW5kOiBJTXlEYXRlID0ge3llYXIsIG1vbnRoLCBkYXk6IHRoaXMuZGF0ZXNJbk1vbnRoKG1vbnRoLCB5ZWFyKX07XG4gICAgY29uc3QgZGF0ZUJlZ2luOiBJTXlEYXRlID0ge3llYXIsIG1vbnRoLCBkYXk6IDF9O1xuXG4gICAgaWYgKHRoaXMuaXNEYXRlc0VuYWJsZWQoZGF0ZUJlZ2luLCBkYXRlRW5kLCBlbmFibGVEYXRlcykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkQnlEaXNhYmxlVW50aWwoZGF0ZUVuZCwgZGlzYWJsZVVudGlsKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNEaXNhYmxlZEJ5RGlzYWJsZVNpbmNlKGRhdGVCZWdpbiwgZGlzYWJsZVNpbmNlKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNEaXNhYmxlZEJ5RGlzYWJsZURhdGVSYW5nZShkYXRlQmVnaW4sIGRhdGVFbmQsIGRpc2FibGVEYXRlUmFuZ2VzKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNEaXNhYmxlZFllYXIoeWVhcjogbnVtYmVyLCBvcHRpb25zOiBJTXlPcHRpb25zKTogYm9vbGVhbiB7XG4gICAgY29uc3Qge2Rpc2FibGVVbnRpbCwgZGlzYWJsZVNpbmNlLCBkaXNhYmxlRGF0ZVJhbmdlcywgZW5hYmxlRGF0ZXMsIG1pblllYXIsIG1heFllYXJ9ID0gb3B0aW9ucztcblxuICAgIGNvbnN0IGRhdGVFbmQ6IElNeURhdGUgPSB7eWVhciwgbW9udGg6IDEyLCBkYXk6IDMxfTtcbiAgICBjb25zdCBkYXRlQmVnaW46IElNeURhdGUgPSB7eWVhciwgbW9udGg6IDEsIGRheTogMX07XG5cbiAgICBpZiAodGhpcy5pc0RhdGVzRW5hYmxlZChkYXRlQmVnaW4sIGRhdGVFbmQsIGVuYWJsZURhdGVzKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzRGlzYWJsZWRCeURpc2FibGVVbnRpbChkYXRlRW5kLCBkaXNhYmxlVW50aWwpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkQnlEaXNhYmxlU2luY2UoZGF0ZUJlZ2luLCBkaXNhYmxlU2luY2UpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkQnlEaXNhYmxlRGF0ZVJhbmdlKGRhdGVCZWdpbiwgZGF0ZUVuZCwgZGlzYWJsZURhdGVSYW5nZXMpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoeWVhciA8IG1pblllYXIgfHwgeWVhciA+IG1heFllYXIpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzRGlzYWJsZWRCeURpc2FibGVVbnRpbChkYXRlOiBJTXlEYXRlLCBkaXNhYmxlVW50aWw6IElNeURhdGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pc0luaXRpYWxpemVkRGF0ZShkaXNhYmxlVW50aWwpICYmIHRoaXMuZ2V0VGltZUluTWlsbGlzZWNvbmRzKGRhdGUpIDw9IHRoaXMuZ2V0VGltZUluTWlsbGlzZWNvbmRzKGRpc2FibGVVbnRpbCk7XG4gIH1cblxuICBpc0Rpc2FibGVkQnlEaXNhYmxlU2luY2UoZGF0ZTogSU15RGF0ZSwgZGlzYWJsZVNpbmNlOiBJTXlEYXRlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNJbml0aWFsaXplZERhdGUoZGlzYWJsZVNpbmNlKSAmJiB0aGlzLmdldFRpbWVJbk1pbGxpc2Vjb25kcyhkYXRlKSA+PSB0aGlzLmdldFRpbWVJbk1pbGxpc2Vjb25kcyhkaXNhYmxlU2luY2UpO1xuICB9XG5cbiAgaXNQYXN0RGF0ZXNFbmFibGVkKGRhdGU6IElNeURhdGUsIGVuYWJsZURhdGVzOiBBcnJheTxJTXlEYXRlPik6IGJvb2xlYW4ge1xuICAgIGZvcihjb25zdCBkIG9mIGVuYWJsZURhdGVzKSB7XG4gICAgICBpZiAodGhpcy5nZXRUaW1lSW5NaWxsaXNlY29uZHMoZCkgPD0gdGhpcy5nZXRUaW1lSW5NaWxsaXNlY29uZHMoZGF0ZSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzRnV0dXJlRGF0ZXNFbmFibGVkKGRhdGU6IElNeURhdGUsIGVuYWJsZURhdGVzOiBBcnJheTxJTXlEYXRlPik6IGJvb2xlYW4ge1xuICAgIGZvcihjb25zdCBkIG9mIGVuYWJsZURhdGVzKSB7XG4gICAgICBpZiAodGhpcy5nZXRUaW1lSW5NaWxsaXNlY29uZHMoZCkgPj0gdGhpcy5nZXRUaW1lSW5NaWxsaXNlY29uZHMoZGF0ZSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzRGF0ZXNFbmFibGVkKGRhdGVCZWdpbjogSU15RGF0ZSwgZGF0ZUVuZDogSU15RGF0ZSwgZW5hYmxlRGF0ZXM6IEFycmF5PElNeURhdGU+KTogYm9vbGVhbiB7XG4gICAgZm9yKGNvbnN0IGQgb2YgZW5hYmxlRGF0ZXMpIHtcbiAgICAgIGlmICh0aGlzLmdldFRpbWVJbk1pbGxpc2Vjb25kcyhkKSA+PSB0aGlzLmdldFRpbWVJbk1pbGxpc2Vjb25kcyhkYXRlQmVnaW4pIFxuICAgICAgICAmJiB0aGlzLmdldFRpbWVJbk1pbGxpc2Vjb25kcyhkKSA8PSB0aGlzLmdldFRpbWVJbk1pbGxpc2Vjb25kcyhkYXRlRW5kKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzRGlzYWJsZWRCeURpc2FibGVEYXRlUmFuZ2UoZGF0ZUJlZ2luOiBJTXlEYXRlLCBkYXRlRW5kOiBJTXlEYXRlLCBkaXNhYmxlRGF0ZVJhbmdlczogQXJyYXk8SU15RGF0ZVJhbmdlPik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGRhdGVNc0JlZ2luOiBudW1iZXIgPSB0aGlzLmdldFRpbWVJbk1pbGxpc2Vjb25kcyhkYXRlQmVnaW4pO1xuICAgIGNvbnN0IGRhdGVNc0VuZDogbnVtYmVyID0gdGhpcy5nZXRUaW1lSW5NaWxsaXNlY29uZHMoZGF0ZUVuZCk7XG5cbiAgICBmb3IgKGNvbnN0IGQgb2YgZGlzYWJsZURhdGVSYW5nZXMpIHtcbiAgICAgIGlmICh0aGlzLmlzSW5pdGlhbGl6ZWREYXRlKGQuYmVnaW4pICYmIHRoaXMuaXNJbml0aWFsaXplZERhdGUoZC5lbmQpIFxuICAgICAgICAmJiBkYXRlTXNCZWdpbiA+PSB0aGlzLmdldFRpbWVJbk1pbGxpc2Vjb25kcyhkLmJlZ2luKSAmJiBkYXRlTXNFbmQgPD0gdGhpcy5nZXRUaW1lSW5NaWxsaXNlY29uZHMoZC5lbmQpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc01hcmtlZERhdGUoZGF0ZTogSU15RGF0ZSwgb3B0aW9uczogSU15T3B0aW9ucyk6IElNeU1hcmtlZERhdGUge1xuICAgIGNvbnN0IHttYXJrRGF0ZXMsIG1hcmtXZWVrZW5kc30gPSBvcHRpb25zO1xuXG4gICAgZm9yIChjb25zdCBtZCBvZiBtYXJrRGF0ZXMpIHtcbiAgICAgIGlmICh0aGlzLmRhdGVNYXRjaFRvRGF0ZXMoZGF0ZSwgbWQuZGF0ZXMpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldE1hcmtlZFZhbHVlKHRydWUsIG1kLmNvbG9yLCBtZC5zdHlsZUNsYXNzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG1hcmtXZWVrZW5kcyAmJiBtYXJrV2Vla2VuZHMubWFya2VkKSB7XG4gICAgICBjb25zdCBkYXlOYnIgPSB0aGlzLmdldERheU51bWJlcihkYXRlKTtcbiAgICAgIGlmIChkYXlOYnIgPT09IDAgfHwgZGF5TmJyID09PSA2KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldE1hcmtlZFZhbHVlKHRydWUsIG1hcmtXZWVrZW5kcy5jb2xvciwgRU1QVFlfU1RSKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ2V0TWFya2VkVmFsdWUoZmFsc2UsIEVNUFRZX1NUUiwgRU1QVFlfU1RSKTtcbiAgfVxuXG4gIGdldE1hcmtlZFZhbHVlKG1hcmtlZDogYm9vbGVhbiwgY29sb3I6IHN0cmluZywgc3R5bGVDbGFzczogc3RyaW5nKTogSU15TWFya2VkRGF0ZSB7XG4gICAgcmV0dXJuIHttYXJrZWQsIGNvbG9yOiBjb2xvciA/IGNvbG9yIDogRU1QVFlfU1RSLCBzdHlsZUNsYXNzOiBzdHlsZUNsYXNzID8gc3R5bGVDbGFzcyA6IEVNUFRZX1NUUn07XG4gIH1cblxuICBpc0hpZ2hsaWdodGVkRGF0ZShkYXRlOiBJTXlEYXRlLCBvcHRpb25zOiBJTXlPcHRpb25zKTogYm9vbGVhbiB7XG4gICAgY29uc3Qge3N1bkhpZ2hsaWdodCwgc2F0SGlnaGxpZ2h0LCBoaWdobGlnaHREYXRlc30gPSBvcHRpb25zO1xuXG4gICAgY29uc3QgZGF5TmJyOiBudW1iZXIgPSB0aGlzLmdldERheU51bWJlcihkYXRlKTtcbiAgICBpZiAoc3VuSGlnaGxpZ2h0ICYmIGRheU5iciA9PT0gMCB8fCBzYXRIaWdobGlnaHQgJiYgZGF5TmJyID09PSA2KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5kYXRlTWF0Y2hUb0RhdGVzKGRhdGUsIGhpZ2hsaWdodERhdGVzKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0V2Vla051bWJlcihkYXRlOiBJTXlEYXRlKTogbnVtYmVyIHtcbiAgICBjb25zdCBkOiBEYXRlID0gbmV3IERhdGUoZGF0ZS55ZWFyLCBkYXRlLm1vbnRoIC0gMSwgZGF0ZS5kYXksIDAsIDAsIDAsIDApO1xuICAgIGQuc2V0RGF0ZShkLmdldERhdGUoKSArIChkLmdldERheSgpID09PSAwID8gLTMgOiA0IC0gZC5nZXREYXkoKSkpO1xuICAgIHJldHVybiBNYXRoLnJvdW5kKCgoZC5nZXRUaW1lKCkgLSBuZXcgRGF0ZShkLmdldEZ1bGxZZWFyKCksIDAsIDQpLmdldFRpbWUoKSkgLyA4NjQwMDAwMCkgLyA3KSArIDE7XG4gIH1cblxuICBnZXREYXRlTW9kZWwoZGF0ZTogSU15RGF0ZSwgZGF0ZVJhbmdlOiBJTXlEYXRlUmFuZ2UsIGRhdGVGb3JtYXQ6IHN0cmluZywgbW9udGhMYWJlbHM6IElNeU1vbnRoTGFiZWxzLCByYW5nZURlbGltaXRlcjogc3RyaW5nLCBkYXRlU3RyOiBzdHJpbmcgPSBFTVBUWV9TVFIpOiBJTXlEYXRlTW9kZWwge1xuICAgIGxldCBzaW5nbGVEYXRlTW9kZWw6IElNeVNpbmdsZURhdGVNb2RlbCA9IG51bGw7XG4gICAgbGV0IGRhdGVSYW5nZU1vZGVsOiBJTXlEYXRlUmFuZ2VNb2RlbCA9IG51bGw7XG5cbiAgICBpZiAoZGF0ZSkge1xuICAgICAgc2luZ2xlRGF0ZU1vZGVsID0ge1xuICAgICAgICBkYXRlLFxuICAgICAgICBqc0RhdGU6IHRoaXMubXlEYXRlVG9Kc0RhdGUoZGF0ZSksXG4gICAgICAgIGZvcm1hdHRlZDogZGF0ZVN0ci5sZW5ndGggPyBkYXRlU3RyIDogdGhpcy5mb3JtYXREYXRlKGRhdGUsIGRhdGVGb3JtYXQsIG1vbnRoTGFiZWxzKSxcbiAgICAgICAgZXBvYzogdGhpcy5nZXRFcG9jVGltZShkYXRlKVxuICAgICAgfTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBkYXRlUmFuZ2VNb2RlbCA9IHtcbiAgICAgICAgYmVnaW5EYXRlOiBkYXRlUmFuZ2UuYmVnaW4sXG4gICAgICAgIGJlZ2luSnNEYXRlOiB0aGlzLm15RGF0ZVRvSnNEYXRlKGRhdGVSYW5nZS5iZWdpbiksXG4gICAgICAgIGJlZ2luRXBvYzogdGhpcy5nZXRFcG9jVGltZShkYXRlUmFuZ2UuYmVnaW4pLFxuICAgICAgICBlbmREYXRlOiBkYXRlUmFuZ2UuZW5kLFxuICAgICAgICBlbmRKc0RhdGU6IHRoaXMubXlEYXRlVG9Kc0RhdGUoZGF0ZVJhbmdlLmVuZCksXG4gICAgICAgIGVuZEVwb2M6IHRoaXMuZ2V0RXBvY1RpbWUoZGF0ZVJhbmdlLmVuZCksXG4gICAgICAgIGZvcm1hdHRlZDogdGhpcy5mb3JtYXREYXRlKGRhdGVSYW5nZS5iZWdpbiwgZGF0ZUZvcm1hdCwgbW9udGhMYWJlbHMpICsgcmFuZ2VEZWxpbWl0ZXIgKyB0aGlzLmZvcm1hdERhdGUoZGF0ZVJhbmdlLmVuZCwgZGF0ZUZvcm1hdCwgbW9udGhMYWJlbHMpXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBpc1JhbmdlOiBkYXRlID09PSBudWxsLFxuICAgICAgc2luZ2xlRGF0ZTogc2luZ2xlRGF0ZU1vZGVsLFxuICAgICAgZGF0ZVJhbmdlOiBkYXRlUmFuZ2VNb2RlbFxuICAgIH07XG4gIH1cblxuICBmb3JtYXREYXRlKGRhdGU6IElNeURhdGUsIGRhdGVGb3JtYXQ6IHN0cmluZywgbW9udGhMYWJlbHM6IElNeU1vbnRoTGFiZWxzKTogc3RyaW5nIHtcbiAgICBsZXQgZm9ybWF0dGVkOiBzdHJpbmcgPSBkYXRlRm9ybWF0LnJlcGxhY2UoWVlZWSwgU3RyaW5nKGRhdGUueWVhcikpO1xuXG4gICAgaWYgKGRhdGVGb3JtYXQuaW5kZXhPZihNTU0pICE9PSAtMSkge1xuICAgICAgZm9ybWF0dGVkID0gZm9ybWF0dGVkLnJlcGxhY2UoTU1NLCBtb250aExhYmVsc1tkYXRlLm1vbnRoXSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGRhdGVGb3JtYXQuaW5kZXhPZihNTSkgIT09IC0xKSB7XG4gICAgICBmb3JtYXR0ZWQgPSBmb3JtYXR0ZWQucmVwbGFjZShNTSwgdGhpcy5wcmVaZXJvKGRhdGUubW9udGgpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBmb3JtYXR0ZWQgPSBmb3JtYXR0ZWQucmVwbGFjZShNLCBTdHJpbmcoZGF0ZS5tb250aCkpO1xuICAgIH1cblxuICAgIGlmIChkYXRlRm9ybWF0LmluZGV4T2YoREQpICE9PSAtMSkge1xuICAgICAgZm9ybWF0dGVkID0gZm9ybWF0dGVkLnJlcGxhY2UoREQsIHRoaXMucHJlWmVybyhkYXRlLmRheSkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGZvcm1hdHRlZCA9IGZvcm1hdHRlZC5yZXBsYWNlKEQsIFN0cmluZyhkYXRlLmRheSkpO1xuICAgIH1cblxuICAgIGlmIChkYXRlRm9ybWF0LmluZGV4T2YoT1JESU5BTCkgIT09IC0xKSB7XG4gICAgICBmb3JtYXR0ZWQgPSBmb3JtYXR0ZWQucmVwbGFjZShPUkRJTkFMLCB0aGlzLmdldE9yZGluYWwoZGF0ZS5kYXkpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZm9ybWF0dGVkO1xuICB9XG5cbiAgZ2V0T3JkaW5hbChkYXRlOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGlmIChkYXRlID4gMyAmJiBkYXRlIDwgMjEpIHtcbiAgICAgIHJldHVybiBUSDtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGRhdGUgJSAxMCkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gU1Q7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHJldHVybiBORDtcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgcmV0dXJuIFJEO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIFRIO1xuICAgIH1cbiAgfVxuXG4gIGdldEZvcm1hdHRlZERhdGUobW9kZWw6IElNeURhdGVNb2RlbCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICFtb2RlbC5pc1JhbmdlID8gbW9kZWwuc2luZ2xlRGF0ZS5mb3JtYXR0ZWQgOiBtb2RlbC5kYXRlUmFuZ2UuZm9ybWF0dGVkO1xuICB9XG5cbiAgcHJlWmVybyh2YWw6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIHZhbCA8IDEwID8gWkVST19TVFIgKyB2YWwgOiBTdHJpbmcodmFsKTtcbiAgfVxuXG4gIGlzSW5pdGlhbGl6ZWREYXRlKGRhdGU6IElNeURhdGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZGF0ZS55ZWFyICE9PSAwICYmIGRhdGUubW9udGggIT09IDAgJiYgZGF0ZS5kYXkgIT09IDA7XG4gIH1cblxuICBpc0RhdGVFYXJsaWVyKGZpcnN0RGF0ZTogSU15RGF0ZSwgc2Vjb25kRGF0ZTogSU15RGF0ZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmdldFRpbWVJbk1pbGxpc2Vjb25kcyhmaXJzdERhdGUpIDwgdGhpcy5nZXRUaW1lSW5NaWxsaXNlY29uZHMoc2Vjb25kRGF0ZSk7XG4gIH1cblxuICBpc0RhdGVTYW1lT3JFYXJsaWVyKGZpcnN0RGF0ZTogSU15RGF0ZSwgc2Vjb25kRGF0ZTogSU15RGF0ZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmdldFRpbWVJbk1pbGxpc2Vjb25kcyhmaXJzdERhdGUpIDw9IHRoaXMuZ2V0VGltZUluTWlsbGlzZWNvbmRzKHNlY29uZERhdGUpO1xuICB9XG5cbiAgaXNEYXRlU2FtZShmaXJzdERhdGU6IElNeURhdGUsIHNlY29uZERhdGU6IElNeURhdGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUaW1lSW5NaWxsaXNlY29uZHMoZmlyc3REYXRlKSA9PT0gdGhpcy5nZXRUaW1lSW5NaWxsaXNlY29uZHMoc2Vjb25kRGF0ZSk7XG4gIH1cblxuICBpc0RhdGVSYW5nZUJlZ2luT3JFbmRTYW1lKGRhdGVSYW5nZTogSU15RGF0ZVJhbmdlLCBkYXRlOiBJTXlEYXRlKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZGF0ZU1zOiBudW1iZXIgPSB0aGlzLmdldFRpbWVJbk1pbGxpc2Vjb25kcyhkYXRlKTtcbiAgICByZXR1cm4gdGhpcy5nZXRUaW1lSW5NaWxsaXNlY29uZHMoZGF0ZVJhbmdlLmJlZ2luKSA9PT0gZGF0ZU1zIHx8IHRoaXMuZ2V0VGltZUluTWlsbGlzZWNvbmRzKGRhdGVSYW5nZS5lbmQpID09PSBkYXRlTXM7XG4gIH1cblxuICBpc0RhdGVSYW5nZUJlZ2luKGRhdGVSYW5nZTogSU15RGF0ZVJhbmdlLCBkYXRlOiBJTXlEYXRlKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZGF0ZU1zOiBudW1iZXIgPSB0aGlzLmdldFRpbWVJbk1pbGxpc2Vjb25kcyhkYXRlKTtcbiAgICByZXR1cm4gdGhpcy5nZXRUaW1lSW5NaWxsaXNlY29uZHMoZGF0ZVJhbmdlLmJlZ2luKSA9PT0gZGF0ZU1zO1xuICB9XG5cbiAgaXNEYXRlUmFuZ2VFbmQoZGF0ZVJhbmdlOiBJTXlEYXRlUmFuZ2UsIGRhdGU6IElNeURhdGUpOiBib29sZWFuIHtcbiAgICBjb25zdCBkYXRlTXM6IG51bWJlciA9IHRoaXMuZ2V0VGltZUluTWlsbGlzZWNvbmRzKGRhdGUpO1xuICAgIHJldHVybiB0aGlzLmdldFRpbWVJbk1pbGxpc2Vjb25kcyhkYXRlUmFuZ2UuZW5kKSA9PT0gZGF0ZU1zO1xuICB9XG5cbiAgaXNEYXRlSW5SYW5nZShkYXRlOiBJTXlEYXRlLCBkYXRlUmFuZ2U6IElNeURhdGVSYW5nZSk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5pc0luaXRpYWxpemVkRGF0ZShkYXRlUmFuZ2UuYmVnaW4pIHx8ICF0aGlzLmlzSW5pdGlhbGl6ZWREYXRlKGRhdGVSYW5nZS5lbmQpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmlzRGF0ZVNhbWVPckVhcmxpZXIoZGF0ZVJhbmdlLmJlZ2luLCBkYXRlKSAmJiB0aGlzLmlzRGF0ZVNhbWVPckVhcmxpZXIoZGF0ZSwgZGF0ZVJhbmdlLmVuZCk7XG4gIH1cblxuICByZXNldERhdGUoKTogSU15RGF0ZSB7XG4gICAgcmV0dXJuIHt5ZWFyOiAwLCBtb250aDogMCwgZGF5OiAwfTtcbiAgfVxuXG4gIGdldFRpbWVJbk1pbGxpc2Vjb25kcyhkYXRlOiBJTXlEYXRlKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5teURhdGVUb0pzRGF0ZShkYXRlKS5nZXRUaW1lKCk7XG4gIH1cblxuICBnZXRUb2RheSgpOiBJTXlEYXRlIHtcbiAgICBjb25zdCBkYXRlOiBEYXRlID0gbmV3IERhdGUoKTtcbiAgICByZXR1cm4ge3llYXI6IGRhdGUuZ2V0RnVsbFllYXIoKSwgbW9udGg6IGRhdGUuZ2V0TW9udGgoKSArIDEsIGRheTogZGF0ZS5nZXREYXRlKCl9O1xuICB9XG5cbiAgZ2V0RGF5TnVtYmVyKGRhdGU6IElNeURhdGUpOiBudW1iZXIge1xuICAgIHJldHVybiBuZXcgRGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGggLSAxLCBkYXRlLmRheSwgMCwgMCwgMCwgMCkuZ2V0RGF5KCk7XG4gIH1cblxuICBnZXRXZWVrZGF5SW5kZXgod2Q6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLndlZWtEYXlzLmluZGV4T2Yod2QpO1xuICB9XG5cbiAgZ2V0RXBvY1RpbWUoZGF0ZTogSU15RGF0ZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQodGhpcy5nZXRUaW1lSW5NaWxsaXNlY29uZHMoZGF0ZSkgLyAxMDAwLjApO1xuICB9XG5cbiAganNEYXRlVG9NeURhdGUoZGF0ZTogRGF0ZSk6IElNeURhdGUge1xuICAgIHJldHVybiB7eWVhcjogZGF0ZS5nZXRGdWxsWWVhcigpLCBtb250aDogZGF0ZS5nZXRNb250aCgpICsgMSwgZGF5OiBkYXRlLmdldERhdGUoKX07XG4gIH1cblxuICBteURhdGVUb0pzRGF0ZShkYXRlOiBJTXlEYXRlKTogRGF0ZSB7XG4gICAgY29uc3Qge3llYXIsIG1vbnRoLCBkYXl9ID0gZGF0ZTtcbiAgICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXksIDAsIDAsIDAsIDApO1xuICB9XG5cbiAgZGF0ZXNJbk1vbnRoKG06IG51bWJlciwgeTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gbmV3IERhdGUoeSwgbSwgMCkuZ2V0RGF0ZSgpO1xuICB9XG5cbiAgZGF0ZXNJblByZXZNb250aChtOiBudW1iZXIsIHk6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgZDogRGF0ZSA9IHRoaXMuZ2V0SnNEYXRlKHksIG0sIDEpO1xuICAgIGQuc2V0TW9udGgoZC5nZXRNb250aCgpIC0gMSk7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZXNJbk1vbnRoKGQuZ2V0TW9udGgoKSArIDEsIGQuZ2V0RnVsbFllYXIoKSk7XG4gIH1cblxuICBnZXRKc0RhdGUoeWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyLCBkYXk6IG51bWJlcik6IERhdGUge1xuICAgIHJldHVybiBuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIGRheSwgMCwgMCwgMCwgMCk7XG4gIH1cblxuICBnZXRTZWxlY3RlZFZhbHVlKHNlbGVjdGVkVmFsdWU6IGFueSwgZGF0ZVJhbmdlOiBib29sZWFuKTogYW55IHtcbiAgICBpZiAoIXNlbGVjdGVkVmFsdWUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmICghZGF0ZVJhbmdlKSB7XG4gICAgICByZXR1cm4gc2VsZWN0ZWRWYWx1ZS5kYXRlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbnN0IHtiZWdpbkRhdGUsIGVuZERhdGV9ID0gc2VsZWN0ZWRWYWx1ZTtcbiAgICAgIHJldHVybiB7YmVnaW46IGJlZ2luRGF0ZSwgZW5kOiBlbmREYXRlfTtcbiAgICB9XG4gIH1cblxuICBnZXRLZXlDb2RlRnJvbUV2ZW50KGV2ZW50OiBhbnkpOiBudW1iZXIge1xuICAgIGxldCBrZXk6IGFueSA9IGV2ZW50LmtleSB8fCBldmVudC5rZXlDb2RlIHx8IGV2ZW50LndoaWNoO1xuXG4gICAgaWYgKHRoaXMuY2hlY2tLZXlOYW1lKGtleSwgS2V5TmFtZS5lbnRlcikgfHwga2V5ID09PSBLZXlDb2RlLmVudGVyKSB7XG4gICAgICByZXR1cm4gS2V5Q29kZS5lbnRlcjtcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5jaGVja0tleU5hbWUoa2V5LCBLZXlOYW1lLmVzYykgfHwga2V5ID09PSBLZXlDb2RlLmVzYykge1xuICAgICAgcmV0dXJuIEtleUNvZGUuZXNjO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLmNoZWNrS2V5TmFtZShrZXksIEtleU5hbWUuc3BhY2UpIHx8IGtleSA9PT0gS2V5Q29kZS5zcGFjZSkge1xuICAgICAgcmV0dXJuIEtleUNvZGUuc3BhY2U7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuY2hlY2tLZXlOYW1lKGtleSwgS2V5TmFtZS5sZWZ0QXJyb3cpIHx8IGtleSA9PT0gS2V5Q29kZS5sZWZ0QXJyb3cpIHtcbiAgICAgIHJldHVybiBLZXlDb2RlLmxlZnRBcnJvdztcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5jaGVja0tleU5hbWUoa2V5LCBLZXlOYW1lLnVwQXJyb3cpIHx8IGtleSA9PT0gS2V5Q29kZS51cEFycm93KSB7XG4gICAgICByZXR1cm4gS2V5Q29kZS51cEFycm93O1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLmNoZWNrS2V5TmFtZShrZXksIEtleU5hbWUucmlnaHRBcnJvdykgfHwga2V5ID09PSBLZXlDb2RlLnJpZ2h0QXJyb3cpIHtcbiAgICAgIHJldHVybiBLZXlDb2RlLnJpZ2h0QXJyb3c7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuY2hlY2tLZXlOYW1lKGtleSwgS2V5TmFtZS5kb3duQXJyb3cpfHwga2V5ID09PSBLZXlDb2RlLmRvd25BcnJvdykge1xuICAgICAgcmV0dXJuIEtleUNvZGUuZG93bkFycm93O1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLmNoZWNrS2V5TmFtZShrZXksIEtleU5hbWUudGFiKSB8fCBrZXkgPT09IEtleUNvZGUudGFiKSB7XG4gICAgICByZXR1cm4gS2V5Q29kZS50YWI7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuY2hlY2tLZXlOYW1lKGtleSwgS2V5TmFtZS5zaGlmdCkgfHwga2V5ID09PSBLZXlDb2RlLnNoaWZ0KSB7XG4gICAgICByZXR1cm4gS2V5Q29kZS5zaGlmdDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBjaGVja0tleU5hbWUoa2V5OiBzdHJpbmcsIGtleU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGFycjogQXJyYXk8c3RyaW5nPiA9IGtleU5hbWUuc3BsaXQoUElQRSk7XG4gICAgcmV0dXJuIGFyci5pbmRleE9mKGtleSkgIT09IC0xO1xuICB9XG59XG4iXX0=