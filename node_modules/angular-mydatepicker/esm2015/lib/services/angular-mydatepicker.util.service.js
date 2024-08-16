/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from "@angular/core";
import { KeyCode } from "../enums/key-code.enum";
import { KeyName } from "../enums/key-name.enum";
import { D, DD, M, MM, MMM, YYYY, ORDINAL, ST, ND, RD, SU, MO, TU, WE, TH, FR, SA, ZERO_STR, EMPTY_STR, PIPE } from "../constants/constants";
export class UtilService {
    constructor() {
        this.weekDays = [SU, MO, TU, WE, TH, FR, SA];
    }
    /**
     * @param {?} dateStr
     * @param {?} options
     * @param {?} validateOpts
     * @return {?}
     */
    isDateValid(dateStr, options, validateOpts) {
        const { dateFormat, minYear, maxYear, monthLabels } = options;
        /** @type {?} */
        const returnDate = this.resetDate();
        /** @type {?} */
        const datesInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        /** @type {?} */
        const isMonthStr = dateFormat.indexOf(MMM) !== -1;
        /** @type {?} */
        const delimeters = dateFormat.match(/[^(d#my)]{1,}/g);
        if (!dateStr || dateStr === EMPTY_STR) {
            return returnDate;
        }
        /** @type {?} */
        const dateValues = this.getDateValue(dateStr, dateFormat, delimeters);
        /** @type {?} */
        let year = 0;
        /** @type {?} */
        let month = 0;
        /** @type {?} */
        let day = 0;
        for (let dv of dateValues) {
            if (dv.format.indexOf(ORDINAL) != -1) {
                /** @type {?} */
                const dayNumber = parseInt(dv.value.replace(/\D/g, ''));
                /** @type {?} */
                const ordinalStr = dv.value.replace(/[0-9]/g, '');
                /** @type {?} */
                const ordinal = this.getOrdinal(dayNumber);
                if (ordinal !== ordinalStr) {
                    return returnDate;
                }
                dv.value = dv.value.replace(ST, EMPTY_STR).replace(ND, EMPTY_STR).replace(RD, EMPTY_STR).replace(TH, EMPTY_STR);
                dv.format = dv.format.replace(ORDINAL, EMPTY_STR);
            }
            const { value, format } = dv;
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
        const { validateDisabledDates, selectedValue } = validateOpts;
        year = year === 0 && selectedValue ? selectedValue.year : year;
        month = month === 0 && selectedValue ? selectedValue.month : month;
        day = day === 0 && selectedValue ? selectedValue.day : day;
        /** @type {?} */
        const today = this.getToday();
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
            const date = { year, month, day };
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
    }
    /**
     * @param {?} dateRangeStr
     * @param {?} options
     * @param {?} validateOpts
     * @return {?}
     */
    isDateValidDateRange(dateRangeStr, options, validateOpts) {
        /** @type {?} */
        let dateRange = { begin: this.resetDate(), end: this.resetDate() };
        if (dateRangeStr && dateRangeStr.length) {
            /** @type {?} */
            const dates = dateRangeStr.split(options.dateRangeDatesDelimiter);
            if (dates && dates.length === 2) {
                const [beginDate, endDate] = dates;
                let { selectedValue } = validateOpts;
                if (selectedValue) {
                    validateOpts.selectedValue = selectedValue.begin;
                }
                /** @type {?} */
                const begin = this.isDateValid(beginDate, options, validateOpts);
                if (this.isInitializedDate(begin)) {
                    if (selectedValue) {
                        validateOpts.selectedValue = selectedValue.end;
                    }
                    /** @type {?} */
                    const end = this.isDateValid(endDate, options, validateOpts);
                    if (this.isInitializedDate(end) && this.isDateSameOrEarlier(begin, end)) {
                        dateRange = { begin, end };
                    }
                }
            }
        }
        return dateRange;
    }
    /**
     * @param {?} dateStr
     * @param {?} dateFormat
     * @param {?} delimeters
     * @return {?}
     */
    getDateValue(dateStr, dateFormat, delimeters) {
        /** @type {?} */
        let del = EMPTY_STR;
        if (delimeters) {
            for (const d of delimeters) {
                if (del.indexOf(d) === -1) {
                    del += d;
                }
            }
        }
        /** @type {?} */
        const re = new RegExp("[" + del + "]");
        /** @type {?} */
        const ds = dateStr.split(re);
        /** @type {?} */
        const df = dateFormat.split(re);
        /** @type {?} */
        const da = [];
        for (let i = 0; i < df.length; i++) {
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
    }
    /**
     * @param {?} df
     * @param {?} monthLabels
     * @return {?}
     */
    getMonthNumberByMonthName(df, monthLabels) {
        if (df.value) {
            for (let key = 1; key <= 12; key++) {
                if (df.value.toLowerCase() === monthLabels[key].toLowerCase()) {
                    return key;
                }
            }
        }
        return -1;
    }
    /**
     * @param {?} df
     * @return {?}
     */
    getNumberByValue(df) {
        if (!/^\d+$/.test(df.value)) {
            return -1;
        }
        /** @type {?} */
        let nbr = Number(df.value);
        if (df.format.length === 1 && df.value.length !== 1 && nbr < 10 || df.format.length === 1 && df.value.length !== 2 && nbr >= 10) {
            nbr = -1;
        }
        else if (df.format.length === 2 && df.value.length > 2) {
            nbr = -1;
        }
        return nbr;
    }
    /**
     * @param {?} monthString
     * @return {?}
     */
    parseDefaultMonth(monthString) {
        /** @type {?} */
        const month = { monthTxt: EMPTY_STR, monthNbr: 0, year: 0 };
        if (monthString !== EMPTY_STR) {
            /** @type {?} */
            const split = monthString.split(monthString.match(/[^0-9]/)[0]);
            month.monthNbr = split[0].length === 2 ? Number(split[0]) : Number(split[1]);
            month.year = split[0].length === 2 ? Number(split[1]) : Number(split[0]);
        }
        return month;
    }
    /**
     * @param {?} date
     * @param {?} options
     * @return {?}
     */
    isDisabledDate(date, options) {
        const { minYear, maxYear, disableUntil, disableSince, disableWeekends, disableDates, disableDateRanges, disableWeekdays, enableDates } = options;
        if (this.dateMatchToDates(date, enableDates)) {
            return this.getDisabledValue(false, EMPTY_STR);
        }
        if (date.year < minYear && date.month === 12 || date.year > maxYear && date.month === 1) {
            return this.getDisabledValue(true, EMPTY_STR);
        }
        /** @type {?} */
        const inputDates = (/** @type {?} */ (disableDates));
        /** @type {?} */
        const result = inputDates.find((/**
         * @param {?} d
         * @return {?}
         */
        (d) => {
            return d.dates;
        }));
        if (!result) {
            if (this.dateMatchToDates(date, inputDates)) {
                return this.getDisabledValue(true, EMPTY_STR);
            }
        }
        else {
            for (const dd of inputDates) {
                if (this.dateMatchToDates(date, dd.dates)) {
                    return this.getDisabledValue(true, dd.styleClass);
                }
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
            const dayNbr = this.getDayNumber(date);
            if (dayNbr === 0 || dayNbr === 6) {
                return this.getDisabledValue(true, EMPTY_STR);
            }
        }
        /** @type {?} */
        const dn = this.getDayNumber(date);
        if (disableWeekdays.length > 0) {
            for (const wd of disableWeekdays) {
                if (dn === this.getWeekdayIndex(wd)) {
                    return this.getDisabledValue(true, EMPTY_STR);
                }
            }
        }
        if (this.isDisabledByDisableDateRange(date, date, disableDateRanges)) {
            return this.getDisabledValue(true, EMPTY_STR);
        }
        return this.getDisabledValue(false, EMPTY_STR);
    }
    /**
     * @param {?} disabled
     * @param {?} styleClass
     * @return {?}
     */
    getDisabledValue(disabled, styleClass) {
        return { disabled, styleClass };
    }
    /**
     * @param {?} date
     * @param {?} dates
     * @return {?}
     */
    dateMatchToDates(date, dates) {
        for (const d of dates) {
            if ((d.year === 0 || d.year === date.year) && (d.month === 0 || d.month === date.month) && d.day === date.day) {
                return true;
            }
        }
        return false;
    }
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} options
     * @return {?}
     */
    isDisabledMonth(year, month, options) {
        const { disableUntil, disableSince, disableDateRanges, enableDates } = options;
        /** @type {?} */
        const dateEnd = { year, month, day: this.datesInMonth(month, year) };
        /** @type {?} */
        const dateBegin = { year, month, day: 1 };
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
    }
    /**
     * @param {?} year
     * @param {?} options
     * @return {?}
     */
    isDisabledYear(year, options) {
        const { disableUntil, disableSince, disableDateRanges, enableDates, minYear, maxYear } = options;
        /** @type {?} */
        const dateEnd = { year, month: 12, day: 31 };
        /** @type {?} */
        const dateBegin = { year, month: 1, day: 1 };
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
    }
    /**
     * @param {?} date
     * @param {?} disableUntil
     * @return {?}
     */
    isDisabledByDisableUntil(date, disableUntil) {
        return this.isInitializedDate(disableUntil) && this.getTimeInMilliseconds(date) <= this.getTimeInMilliseconds(disableUntil);
    }
    /**
     * @param {?} date
     * @param {?} disableSince
     * @return {?}
     */
    isDisabledByDisableSince(date, disableSince) {
        return this.isInitializedDate(disableSince) && this.getTimeInMilliseconds(date) >= this.getTimeInMilliseconds(disableSince);
    }
    /**
     * @param {?} date
     * @param {?} enableDates
     * @return {?}
     */
    isPastDatesEnabled(date, enableDates) {
        for (const d of enableDates) {
            if (this.getTimeInMilliseconds(d) <= this.getTimeInMilliseconds(date)) {
                return true;
            }
        }
        return false;
    }
    /**
     * @param {?} date
     * @param {?} enableDates
     * @return {?}
     */
    isFutureDatesEnabled(date, enableDates) {
        for (const d of enableDates) {
            if (this.getTimeInMilliseconds(d) >= this.getTimeInMilliseconds(date)) {
                return true;
            }
        }
        return false;
    }
    /**
     * @param {?} dateBegin
     * @param {?} dateEnd
     * @param {?} enableDates
     * @return {?}
     */
    isDatesEnabled(dateBegin, dateEnd, enableDates) {
        for (const d of enableDates) {
            if (this.getTimeInMilliseconds(d) >= this.getTimeInMilliseconds(dateBegin)
                && this.getTimeInMilliseconds(d) <= this.getTimeInMilliseconds(dateEnd)) {
                return true;
            }
        }
        return false;
    }
    /**
     * @param {?} dateBegin
     * @param {?} dateEnd
     * @param {?} disableDateRanges
     * @return {?}
     */
    isDisabledByDisableDateRange(dateBegin, dateEnd, disableDateRanges) {
        /** @type {?} */
        const dateMsBegin = this.getTimeInMilliseconds(dateBegin);
        /** @type {?} */
        const dateMsEnd = this.getTimeInMilliseconds(dateEnd);
        for (const d of disableDateRanges) {
            if (this.isInitializedDate(d.begin) && this.isInitializedDate(d.end)
                && dateMsBegin >= this.getTimeInMilliseconds(d.begin) && dateMsEnd <= this.getTimeInMilliseconds(d.end)) {
                return true;
            }
        }
        return false;
    }
    /**
     * @param {?} date
     * @param {?} options
     * @return {?}
     */
    isMarkedDate(date, options) {
        const { markDates, markWeekends } = options;
        for (const md of markDates) {
            if (this.dateMatchToDates(date, md.dates)) {
                return this.getMarkedValue(true, md.color, md.styleClass);
            }
        }
        if (markWeekends && markWeekends.marked) {
            /** @type {?} */
            const dayNbr = this.getDayNumber(date);
            if (dayNbr === 0 || dayNbr === 6) {
                return this.getMarkedValue(true, markWeekends.color, EMPTY_STR);
            }
        }
        return this.getMarkedValue(false, EMPTY_STR, EMPTY_STR);
    }
    /**
     * @param {?} marked
     * @param {?} color
     * @param {?} styleClass
     * @return {?}
     */
    getMarkedValue(marked, color, styleClass) {
        return { marked, color: color ? color : EMPTY_STR, styleClass: styleClass ? styleClass : EMPTY_STR };
    }
    /**
     * @param {?} date
     * @param {?} options
     * @return {?}
     */
    isHighlightedDate(date, options) {
        const { sunHighlight, satHighlight, highlightDates } = options;
        /** @type {?} */
        const dayNbr = this.getDayNumber(date);
        if (sunHighlight && dayNbr === 0 || satHighlight && dayNbr === 6) {
            return true;
        }
        if (this.dateMatchToDates(date, highlightDates)) {
            return true;
        }
        return false;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getWeekNumber(date) {
        /** @type {?} */
        const d = new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0);
        d.setDate(d.getDate() + (d.getDay() === 0 ? -3 : 4 - d.getDay()));
        return Math.round(((d.getTime() - new Date(d.getFullYear(), 0, 4).getTime()) / 86400000) / 7) + 1;
    }
    /**
     * @param {?} date
     * @param {?} dateRange
     * @param {?} dateFormat
     * @param {?} monthLabels
     * @param {?} rangeDelimiter
     * @param {?=} dateStr
     * @return {?}
     */
    getDateModel(date, dateRange, dateFormat, monthLabels, rangeDelimiter, dateStr = EMPTY_STR) {
        /** @type {?} */
        let singleDateModel = null;
        /** @type {?} */
        let dateRangeModel = null;
        if (date) {
            singleDateModel = {
                date,
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
    }
    /**
     * @param {?} date
     * @param {?} dateFormat
     * @param {?} monthLabels
     * @return {?}
     */
    formatDate(date, dateFormat, monthLabels) {
        /** @type {?} */
        let formatted = dateFormat.replace(YYYY, String(date.year));
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
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getOrdinal(date) {
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
    }
    /**
     * @param {?} model
     * @return {?}
     */
    getFormattedDate(model) {
        return !model.isRange ? model.singleDate.formatted : model.dateRange.formatted;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    preZero(val) {
        return val < 10 ? ZERO_STR + val : String(val);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    isInitializedDate(date) {
        return date.year !== 0 && date.month !== 0 && date.day !== 0;
    }
    /**
     * @param {?} firstDate
     * @param {?} secondDate
     * @return {?}
     */
    isDateEarlier(firstDate, secondDate) {
        return this.getTimeInMilliseconds(firstDate) < this.getTimeInMilliseconds(secondDate);
    }
    /**
     * @param {?} firstDate
     * @param {?} secondDate
     * @return {?}
     */
    isDateSameOrEarlier(firstDate, secondDate) {
        return this.getTimeInMilliseconds(firstDate) <= this.getTimeInMilliseconds(secondDate);
    }
    /**
     * @param {?} firstDate
     * @param {?} secondDate
     * @return {?}
     */
    isDateSame(firstDate, secondDate) {
        return this.getTimeInMilliseconds(firstDate) === this.getTimeInMilliseconds(secondDate);
    }
    /**
     * @param {?} dateRange
     * @param {?} date
     * @return {?}
     */
    isDateRangeBeginOrEndSame(dateRange, date) {
        /** @type {?} */
        const dateMs = this.getTimeInMilliseconds(date);
        return this.getTimeInMilliseconds(dateRange.begin) === dateMs || this.getTimeInMilliseconds(dateRange.end) === dateMs;
    }
    /**
     * @param {?} dateRange
     * @param {?} date
     * @return {?}
     */
    isDateRangeBegin(dateRange, date) {
        /** @type {?} */
        const dateMs = this.getTimeInMilliseconds(date);
        return this.getTimeInMilliseconds(dateRange.begin) === dateMs;
    }
    /**
     * @param {?} dateRange
     * @param {?} date
     * @return {?}
     */
    isDateRangeEnd(dateRange, date) {
        /** @type {?} */
        const dateMs = this.getTimeInMilliseconds(date);
        return this.getTimeInMilliseconds(dateRange.end) === dateMs;
    }
    /**
     * @param {?} date
     * @param {?} dateRange
     * @return {?}
     */
    isDateInRange(date, dateRange) {
        if (!this.isInitializedDate(dateRange.begin) || !this.isInitializedDate(dateRange.end)) {
            return false;
        }
        return this.isDateSameOrEarlier(dateRange.begin, date) && this.isDateSameOrEarlier(date, dateRange.end);
    }
    /**
     * @return {?}
     */
    resetDate() {
        return { year: 0, month: 0, day: 0 };
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getTimeInMilliseconds(date) {
        return this.myDateToJsDate(date).getTime();
    }
    /**
     * @return {?}
     */
    getToday() {
        /** @type {?} */
        const date = new Date();
        return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDayNumber(date) {
        return new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0).getDay();
    }
    /**
     * @param {?} wd
     * @return {?}
     */
    getWeekdayIndex(wd) {
        return this.weekDays.indexOf(wd);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getEpocTime(date) {
        return Math.round(this.getTimeInMilliseconds(date) / 1000.0);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    jsDateToMyDate(date) {
        return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    }
    /**
     * @param {?} date
     * @return {?}
     */
    myDateToJsDate(date) {
        const { year, month, day } = date;
        return new Date(year, month - 1, day, 0, 0, 0, 0);
    }
    /**
     * @param {?} m
     * @param {?} y
     * @return {?}
     */
    datesInMonth(m, y) {
        return new Date(y, m, 0).getDate();
    }
    /**
     * @param {?} m
     * @param {?} y
     * @return {?}
     */
    datesInPrevMonth(m, y) {
        /** @type {?} */
        const d = this.getJsDate(y, m, 1);
        d.setMonth(d.getMonth() - 1);
        return this.datesInMonth(d.getMonth() + 1, d.getFullYear());
    }
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} day
     * @return {?}
     */
    getJsDate(year, month, day) {
        return new Date(year, month - 1, day, 0, 0, 0, 0);
    }
    /**
     * @param {?} selectedValue
     * @param {?} dateRange
     * @return {?}
     */
    getSelectedValue(selectedValue, dateRange) {
        if (!selectedValue) {
            return null;
        }
        if (!dateRange) {
            return selectedValue.date;
        }
        else {
            const { beginDate, endDate } = selectedValue;
            return { begin: beginDate, end: endDate };
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    getKeyCodeFromEvent(event) {
        /** @type {?} */
        let key = event.key || event.keyCode || event.which;
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
    }
    /**
     * @param {?} key
     * @param {?} keyName
     * @return {?}
     */
    checkKeyName(key, keyName) {
        /** @type {?} */
        const arr = keyName.split(PIPE);
        return arr.indexOf(key) !== -1;
    }
}
UtilService.decorators = [
    { type: Injectable }
];
if (false) {
    /** @type {?} */
    UtilService.prototype.weekDays;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1teWRhdGVwaWNrZXIudXRpbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1teWRhdGVwaWNrZXIvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvYW5ndWxhci1teWRhdGVwaWNrZXIudXRpbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBYXpDLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDL0MsT0FBTyxFQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUczSSxNQUFNLE9BQU8sV0FBVztJQUR4QjtRQUVFLGFBQVEsR0FBa0IsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQXVuQnpELENBQUM7Ozs7Ozs7SUFybkJDLFdBQVcsQ0FBQyxPQUFlLEVBQUUsT0FBbUIsRUFBRSxZQUFnQztjQUMxRSxFQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBQyxHQUFHLE9BQU87O2NBRXJELFVBQVUsR0FBWSxJQUFJLENBQUMsU0FBUyxFQUFFOztjQUN0QyxZQUFZLEdBQWtCLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVB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LENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDdkUsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDO1NBQ3RCO2FBQ0ksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxLQUFLLE9BQU8sQ0FBQyxTQUFTLEVBQUU7WUFDL0UsT0FBTyxPQUFPLENBQUMsU0FBUyxDQUFDO1NBQzFCO2FBQ0ksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxLQUFLLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDM0UsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDO1NBQ3hCO2FBQ0ksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxLQUFLLE9BQU8sQ0FBQyxVQUFVLEVBQUU7WUFDakYsT0FBTyxPQUFPLENBQUMsVUFBVSxDQUFDO1NBQzNCO2FBQ0ksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUcsR0FBRyxLQUFLLE9BQU8sQ0FBQyxTQUFTLEVBQUU7WUFDOUUsT0FBTyxPQUFPLENBQUMsU0FBUyxDQUFDO1NBQzFCO2FBQ0ksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxLQUFLLE9BQU8sQ0FBQyxHQUFHLEVBQUU7WUFDbkUsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDO1NBQ3BCO2FBQ0ksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDdkUsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDO1NBQ3RCO2FBQ0k7WUFDSCxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQzs7Ozs7O0lBRUQsWUFBWSxDQUFDLEdBQVcsRUFBRSxPQUFlOztjQUNqQyxHQUFHLEdBQWtCLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQzlDLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7WUF4bkJGLFVBQVU7Ozs7SUFFVCwrQkFBdUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0lNeURhdGVNb2RlbH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvbXktZGF0ZS1tb2RlbC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SU15U2luZ2xlRGF0ZU1vZGVsfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9teS1zaW5nbGUtZGF0ZS1tb2RlbC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SU15RGF0ZVJhbmdlTW9kZWx9IGZyb20gXCIuLi9pbnRlcmZhY2VzL215LWRhdGUtcmFuZ2UtbW9kZWwuaW50ZXJmYWNlXCI7XG5pbXBvcnQge0lNeURhdGV9IGZyb20gXCIuLi9pbnRlcmZhY2VzL215LWRhdGUuaW50ZXJmYWNlXCI7XG5pbXBvcnQge0lNeURhdGVSYW5nZX0gZnJvbSBcIi4uL2ludGVyZmFjZXMvbXktZGF0ZS1yYW5nZS5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SU15TW9udGh9IGZyb20gXCIuLi9pbnRlcmZhY2VzL215LW1vbnRoLmludGVyZmFjZVwiO1xuaW1wb3J0IHtJTXlNb250aExhYmVsc30gZnJvbSBcIi4uL2ludGVyZmFjZXMvbXktbW9udGgtbGFiZWxzLmludGVyZmFjZVwiO1xuaW1wb3J0IHtJTXlNYXJrZWREYXRlfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9teS1tYXJrZWQtZGF0ZS5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SU15RGlzYWJsZWREYXRlfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9teS1kaXNhYmxlZC1kYXRlLmludGVyZmFjZVwiO1xuaW1wb3J0IHtJTXlEYXRlRm9ybWF0fSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9teS1kYXRlLWZvcm1hdC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7SU15VmFsaWRhdGVPcHRpb25zfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9teS12YWxpZGF0ZS1vcHRpb25zLmludGVyZmFjZVwiO1xuaW1wb3J0IHtJTXlPcHRpb25zfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9teS1vcHRpb25zLmludGVyZmFjZVwiO1xuaW1wb3J0IHtLZXlDb2RlfSBmcm9tIFwiLi4vZW51bXMva2V5LWNvZGUuZW51bVwiO1xuaW1wb3J0IHtLZXlOYW1lfSBmcm9tIFwiLi4vZW51bXMva2V5LW5hbWUuZW51bVwiO1xuaW1wb3J0IHtELCBERCwgTSwgTU0sIE1NTSwgWVlZWSwgT1JESU5BTCwgU1QsIE5ELCBSRCwgU1UsIE1PLCBUVSwgV0UsIFRILCBGUiwgU0EsIFpFUk9fU1RSLCBFTVBUWV9TVFIsIFBJUEV9IGZyb20gXCIuLi9jb25zdGFudHMvY29uc3RhbnRzXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBVdGlsU2VydmljZSB7XG4gIHdlZWtEYXlzOiBBcnJheTxzdHJpbmc+ID0gW1NVLCBNTywgVFUsIFdFLCBUSCwgRlIsIFNBXTtcblxuICBpc0RhdGVWYWxpZChkYXRlU3RyOiBzdHJpbmcsIG9wdGlvbnM6IElNeU9wdGlvbnMsIHZhbGlkYXRlT3B0czogSU15VmFsaWRhdGVPcHRpb25zKTogSU15RGF0ZSB7XG4gICAgY29uc3Qge2RhdGVGb3JtYXQsIG1pblllYXIsIG1heFllYXIsIG1vbnRoTGFiZWxzfSA9IG9wdGlvbnM7XG5cbiAgICBjb25zdCByZXR1cm5EYXRlOiBJTXlEYXRlID0gdGhpcy5yZXNldERhdGUoKTtcbiAgICBjb25zdCBkYXRlc0luTW9udGg6IEFycmF5PG51bWJlcj4gPSBbMzEsIDI4LCAzMSwgMzAsIDMxLCAzMCwgMzEsIDMxLCAzMCwgMzEsIDMwLCAzMV07XG4gICAgY29uc3QgaXNNb250aFN0cjogYm9vbGVhbiA9IGRhdGVGb3JtYXQuaW5kZXhPZihNTU0pICE9PSAtMTtcbiAgICBjb25zdCBkZWxpbWV0ZXJzOiBBcnJheTxzdHJpbmc+ID0gZGF0ZUZvcm1hdC5tYXRjaCgvW14oZCNteSldezEsfS9nKTtcblxuICAgIGlmICghZGF0ZVN0ciB8fCBkYXRlU3RyID09PSBFTVBUWV9TVFIpIHtcbiAgICAgIHJldHVybiByZXR1cm5EYXRlO1xuICAgIH1cblxuICAgIGNvbnN0IGRhdGVWYWx1ZXM6IEFycmF5PElNeURhdGVGb3JtYXQ+ID0gdGhpcy5nZXREYXRlVmFsdWUoZGF0ZVN0ciwgZGF0ZUZvcm1hdCwgZGVsaW1ldGVycyk7XG5cbiAgICBsZXQgeWVhcjogbnVtYmVyID0gMDtcbiAgICBsZXQgbW9udGg6IG51bWJlciA9IDA7XG4gICAgbGV0IGRheTogbnVtYmVyID0gMDtcblxuICAgIGZvcihsZXQgZHYgb2YgZGF0ZVZhbHVlcykge1xuICAgICAgaWYgKGR2LmZvcm1hdC5pbmRleE9mKE9SRElOQUwpICE9IC0xKSB7XG4gICAgICAgIGNvbnN0IGRheU51bWJlcjogbnVtYmVyID0gcGFyc2VJbnQoZHYudmFsdWUucmVwbGFjZSgvXFxEL2csICcnKSk7XG4gICAgICAgIGNvbnN0IG9yZGluYWxTdHI6IHN0cmluZyA9IGR2LnZhbHVlLnJlcGxhY2UoL1swLTldL2csICcnKTtcbiAgICAgICAgY29uc3Qgb3JkaW5hbDogc3RyaW5nID0gdGhpcy5nZXRPcmRpbmFsKGRheU51bWJlcik7XG5cbiAgICAgICAgaWYgKG9yZGluYWwgIT09IG9yZGluYWxTdHIpIHtcbiAgICAgICAgICByZXR1cm4gcmV0dXJuRGF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGR2LnZhbHVlID0gZHYudmFsdWUucmVwbGFjZShTVCwgRU1QVFlfU1RSKS5yZXBsYWNlKE5ELCBFTVBUWV9TVFIpLnJlcGxhY2UoUkQsIEVNUFRZX1NUUikucmVwbGFjZShUSCwgRU1QVFlfU1RSKTtcbiAgICAgICAgZHYuZm9ybWF0ID0gZHYuZm9ybWF0LnJlcGxhY2UoT1JESU5BTCwgRU1QVFlfU1RSKTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qge3ZhbHVlLCBmb3JtYXR9ID0gZHY7XG5cbiAgICAgIGlmICh2YWx1ZSAmJiAvXlxcZCskLy50ZXN0KHZhbHVlKSAmJiBOdW1iZXIodmFsdWUpID09PSAwKSB7XG4gICAgICAgIHJldHVybiByZXR1cm5EYXRlO1xuICAgICAgfVxuICAgICAgXG4gICAgICBpZiAoZm9ybWF0LmluZGV4T2YoWVlZWSkgIT09IC0xKSB7XG4gICAgICAgIHllYXIgPSB0aGlzLmdldE51bWJlckJ5VmFsdWUoZHYpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoZm9ybWF0LmluZGV4T2YoTSkgIT09IC0xKSB7XG4gICAgICAgIG1vbnRoID0gaXNNb250aFN0ciA/IHRoaXMuZ2V0TW9udGhOdW1iZXJCeU1vbnRoTmFtZShkdiwgbW9udGhMYWJlbHMpIDogdGhpcy5nZXROdW1iZXJCeVZhbHVlKGR2KTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGZvcm1hdC5pbmRleE9mKEQpICE9PSAtMSkge1xuICAgICAgICBkYXkgPSB0aGlzLmdldE51bWJlckJ5VmFsdWUoZHYpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHt2YWxpZGF0ZURpc2FibGVkRGF0ZXMsIHNlbGVjdGVkVmFsdWV9ID0gdmFsaWRhdGVPcHRzO1xuXG4gICAgeWVhciA9IHllYXIgPT09IDAgJiYgc2VsZWN0ZWRWYWx1ZSA/IHNlbGVjdGVkVmFsdWUueWVhciA6IHllYXI7XG4gICAgbW9udGggPSBtb250aCA9PT0gMCAmJiBzZWxlY3RlZFZhbHVlID8gc2VsZWN0ZWRWYWx1ZS5tb250aCA6IG1vbnRoO1xuICAgIGRheSA9IGRheSA9PT0gMCAmJiBzZWxlY3RlZFZhbHVlID8gc2VsZWN0ZWRWYWx1ZS5kYXkgOiBkYXk7XG5cbiAgICBjb25zdCB0b2RheTogSU15RGF0ZSA9IHRoaXMuZ2V0VG9kYXkoKTtcbiAgICBpZiAoeWVhciA9PT0gMCAmJiAobW9udGggIT09IDAgfHwgZGF5ICE9PSAwKSkge1xuICAgICAgeWVhciA9IHRvZGF5LnllYXI7XG4gICAgfVxuXG4gICAgaWYgKG1vbnRoID09PSAwICYmICh5ZWFyICE9PSAwIHx8IGRheSAhPT0gMCkpIHtcbiAgICAgIG1vbnRoID0gdG9kYXkubW9udGg7XG4gICAgfVxuXG4gICAgaWYgKGRheSA9PT0gMCAmJiAoeWVhciAhPT0gMCB8fCBtb250aCAhPT0gMCkpIHtcbiAgICAgIGRheSA9IHRvZGF5LmRheTtcbiAgICB9XG5cbiAgICBpZiAobW9udGggIT09IC0xICYmIGRheSAhPT0gLTEgJiYgeWVhciAhPT0gLTEpIHtcbiAgICAgIGlmICh5ZWFyIDwgbWluWWVhciB8fCB5ZWFyID4gbWF4WWVhciB8fCBtb250aCA8IDEgfHwgbW9udGggPiAxMikge1xuICAgICAgICByZXR1cm4gcmV0dXJuRGF0ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGF0ZTogSU15RGF0ZSA9IHt5ZWFyLCBtb250aCwgZGF5fTtcblxuICAgICAgaWYgKHZhbGlkYXRlRGlzYWJsZWREYXRlcyAmJiB0aGlzLmlzRGlzYWJsZWREYXRlKGRhdGUsIG9wdGlvbnMpLmRpc2FibGVkKSB7XG4gICAgICAgIHJldHVybiByZXR1cm5EYXRlO1xuICAgICAgfVxuXG4gICAgICBpZiAoeWVhciAlIDQwMCA9PT0gMCB8fCAoeWVhciAlIDEwMCAhPT0gMCAmJiB5ZWFyICUgNCA9PT0gMCkpIHtcbiAgICAgICAgZGF0ZXNJbk1vbnRoWzFdID0gMjk7XG4gICAgICB9XG5cbiAgICAgIGlmIChkYXkgPCAxIHx8IGRheSA+IGRhdGVzSW5Nb250aFttb250aCAtIDFdKSB7XG4gICAgICAgIHJldHVybiByZXR1cm5EYXRlO1xuICAgICAgfVxuXG4gICAgICAvLyBWYWxpZCBkYXRlXG4gICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVybkRhdGU7XG4gIH1cblxuICBpc0RhdGVWYWxpZERhdGVSYW5nZShkYXRlUmFuZ2VTdHI6IHN0cmluZywgb3B0aW9uczogSU15T3B0aW9ucywgdmFsaWRhdGVPcHRzOiBJTXlWYWxpZGF0ZU9wdGlvbnMpOiBJTXlEYXRlUmFuZ2Uge1xuICAgIGxldCBkYXRlUmFuZ2U6IElNeURhdGVSYW5nZSA9IHtiZWdpbjogdGhpcy5yZXNldERhdGUoKSwgZW5kOiB0aGlzLnJlc2V0RGF0ZSgpfTtcbiAgICBpZiAoZGF0ZVJhbmdlU3RyICYmIGRhdGVSYW5nZVN0ci5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGRhdGVzOiBBcnJheTxzdHJpbmc+ID0gZGF0ZVJhbmdlU3RyLnNwbGl0KG9wdGlvbnMuZGF0ZVJhbmdlRGF0ZXNEZWxpbWl0ZXIpO1xuICAgICAgaWYgKGRhdGVzICYmIGRhdGVzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICBjb25zdCBbYmVnaW5EYXRlLCBlbmREYXRlXSA9IGRhdGVzO1xuICAgICAgICBsZXQge3NlbGVjdGVkVmFsdWV9ID0gdmFsaWRhdGVPcHRzO1xuXG4gICAgICAgIGlmIChzZWxlY3RlZFZhbHVlKSB7XG4gICAgICAgICAgdmFsaWRhdGVPcHRzLnNlbGVjdGVkVmFsdWUgPSBzZWxlY3RlZFZhbHVlLmJlZ2luO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCBiZWdpbjogSU15RGF0ZSA9IHRoaXMuaXNEYXRlVmFsaWQoYmVnaW5EYXRlLCBvcHRpb25zLCB2YWxpZGF0ZU9wdHMpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzSW5pdGlhbGl6ZWREYXRlKGJlZ2luKSkge1xuICAgICAgICAgIGlmIChzZWxlY3RlZFZhbHVlKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZU9wdHMuc2VsZWN0ZWRWYWx1ZSA9IHNlbGVjdGVkVmFsdWUuZW5kO1xuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgICBjb25zdCBlbmQ6IElNeURhdGUgPSB0aGlzLmlzRGF0ZVZhbGlkKGVuZERhdGUsIG9wdGlvbnMsIHZhbGlkYXRlT3B0cyk7XG5cbiAgICAgICAgICBpZiAodGhpcy5pc0luaXRpYWxpemVkRGF0ZShlbmQpICYmIHRoaXMuaXNEYXRlU2FtZU9yRWFybGllcihiZWdpbiwgZW5kKSkge1xuICAgICAgICAgICAgZGF0ZVJhbmdlID0ge2JlZ2luLCBlbmR9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGF0ZVJhbmdlO1xuICB9XG5cbiAgZ2V0RGF0ZVZhbHVlKGRhdGVTdHI6IHN0cmluZywgZGF0ZUZvcm1hdDogc3RyaW5nLCBkZWxpbWV0ZXJzOiBBcnJheTxzdHJpbmc+KTogQXJyYXk8SU15RGF0ZUZvcm1hdD4ge1xuICAgIGxldCBkZWw6IHN0cmluZyA9IEVNUFRZX1NUUjtcbiAgICBcbiAgICBpZiAoZGVsaW1ldGVycykge1xuICAgICAgZm9yKGNvbnN0IGQgb2YgZGVsaW1ldGVycykge1xuICAgICAgICBpZiAoZGVsLmluZGV4T2YoZCkgPT09IC0xKSB7XG4gICAgICAgICAgZGVsICs9IGQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCByZTogYW55ID0gbmV3IFJlZ0V4cChcIltcIiArIGRlbCArIFwiXVwiKTtcbiAgICBjb25zdCBkczogQXJyYXk8c3RyaW5nPiA9IGRhdGVTdHIuc3BsaXQocmUpO1xuICAgIGNvbnN0IGRmOiBBcnJheTxzdHJpbmc+ID0gZGF0ZUZvcm1hdC5zcGxpdChyZSk7XG4gICAgY29uc3QgZGE6IEFycmF5PElNeURhdGVGb3JtYXQ+ID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRmLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoZGZbaV0uaW5kZXhPZihZWVlZKSAhPT0gLTEpIHtcbiAgICAgICAgZGEucHVzaCh7dmFsdWU6IGRzW2ldLCBmb3JtYXQ6IGRmW2ldfSk7XG4gICAgICB9XG4gICAgICBpZiAoZGZbaV0uaW5kZXhPZihNKSAhPT0gLTEpIHtcbiAgICAgICAgZGEucHVzaCh7dmFsdWU6IGRzW2ldLCBmb3JtYXQ6IGRmW2ldfSk7XG4gICAgICB9XG4gICAgICBpZiAoZGZbaV0uaW5kZXhPZihEKSAhPT0gLTEpIHtcbiAgICAgICAgZGEucHVzaCh7dmFsdWU6IGRzW2ldLCBmb3JtYXQ6IGRmW2ldfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkYTtcbiAgfVxuXG4gIGdldE1vbnRoTnVtYmVyQnlNb250aE5hbWUoZGY6IElNeURhdGVGb3JtYXQsIG1vbnRoTGFiZWxzOiBJTXlNb250aExhYmVscyk6IG51bWJlciB7XG4gICAgaWYgKGRmLnZhbHVlKSB7XG4gICAgICBmb3IgKGxldCBrZXkgPSAxOyBrZXkgPD0gMTI7IGtleSsrKSB7XG4gICAgICAgIGlmIChkZi52YWx1ZS50b0xvd2VyQ2FzZSgpID09PSBtb250aExhYmVsc1trZXldLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIGdldE51bWJlckJ5VmFsdWUoZGY6IElNeURhdGVGb3JtYXQpOiBudW1iZXIge1xuICAgIGlmICghL15cXGQrJC8udGVzdChkZi52YWx1ZSkpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICBsZXQgbmJyOiBudW1iZXIgPSBOdW1iZXIoZGYudmFsdWUpO1xuICAgIGlmIChkZi5mb3JtYXQubGVuZ3RoID09PSAxICYmIGRmLnZhbHVlLmxlbmd0aCAhPT0gMSAmJiBuYnIgPCAxMCB8fCBkZi5mb3JtYXQubGVuZ3RoID09PSAxICYmIGRmLnZhbHVlLmxlbmd0aCAhPT0gMiAmJiBuYnIgPj0gMTApIHtcbiAgICAgIG5iciA9IC0xO1xuICAgIH1cbiAgICBlbHNlIGlmIChkZi5mb3JtYXQubGVuZ3RoID09PSAyICYmIGRmLnZhbHVlLmxlbmd0aCA+IDIpIHtcbiAgICAgIG5iciA9IC0xO1xuICAgIH1cbiAgICByZXR1cm4gbmJyO1xuICB9XG5cbiAgcGFyc2VEZWZhdWx0TW9udGgobW9udGhTdHJpbmc6IHN0cmluZyk6IElNeU1vbnRoIHtcbiAgICBjb25zdCBtb250aDogSU15TW9udGggPSB7bW9udGhUeHQ6IEVNUFRZX1NUUiwgbW9udGhOYnI6IDAsIHllYXI6IDB9O1xuICAgIGlmIChtb250aFN0cmluZyAhPT0gRU1QVFlfU1RSKSB7XG4gICAgICBjb25zdCBzcGxpdCA9IG1vbnRoU3RyaW5nLnNwbGl0KG1vbnRoU3RyaW5nLm1hdGNoKC9bXjAtOV0vKVswXSk7XG4gICAgICBtb250aC5tb250aE5iciA9IHNwbGl0WzBdLmxlbmd0aCA9PT0gMiA/IE51bWJlcihzcGxpdFswXSkgOiBOdW1iZXIoc3BsaXRbMV0pO1xuICAgICAgbW9udGgueWVhciA9IHNwbGl0WzBdLmxlbmd0aCA9PT0gMiA/IE51bWJlcihzcGxpdFsxXSkgOiBOdW1iZXIoc3BsaXRbMF0pO1xuICAgIH1cbiAgICByZXR1cm4gbW9udGg7XG4gIH1cblxuICBpc0Rpc2FibGVkRGF0ZShkYXRlOiBJTXlEYXRlLCBvcHRpb25zOiBJTXlPcHRpb25zKTogSU15RGlzYWJsZWREYXRlIHtcbiAgICBjb25zdCB7bWluWWVhciwgbWF4WWVhciwgZGlzYWJsZVVudGlsLCBkaXNhYmxlU2luY2UsIGRpc2FibGVXZWVrZW5kcywgZGlzYWJsZURhdGVzLCBkaXNhYmxlRGF0ZVJhbmdlcywgZGlzYWJsZVdlZWtkYXlzLCBlbmFibGVEYXRlc30gPSBvcHRpb25zO1xuXG4gICAgaWYgKHRoaXMuZGF0ZU1hdGNoVG9EYXRlcyhkYXRlLCBlbmFibGVEYXRlcykpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldERpc2FibGVkVmFsdWUoZmFsc2UsIEVNUFRZX1NUUik7XG4gICAgfVxuXG4gICAgaWYgKGRhdGUueWVhciA8IG1pblllYXIgJiYgZGF0ZS5tb250aCA9PT0gMTIgfHwgZGF0ZS55ZWFyID4gbWF4WWVhciAmJiBkYXRlLm1vbnRoID09PSAxKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXREaXNhYmxlZFZhbHVlKHRydWUsIEVNUFRZX1NUUik7XG4gICAgfVxuXG4gICAgY29uc3QgaW5wdXREYXRlczogYW55ID0gZGlzYWJsZURhdGVzIGFzIGFueTtcbiAgICBjb25zdCByZXN1bHQgPSBpbnB1dERhdGVzLmZpbmQoKGQpID0+IHtcbiAgICAgIHJldHVybiBkLmRhdGVzO1xuICAgIH0pO1xuXG4gICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgIGlmICh0aGlzLmRhdGVNYXRjaFRvRGF0ZXMoZGF0ZSwgaW5wdXREYXRlcykpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlzYWJsZWRWYWx1ZSh0cnVlLCBFTVBUWV9TVFIpO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGZvciAoY29uc3QgZGQgb2YgaW5wdXREYXRlcykge1xuICAgICAgICBpZiAodGhpcy5kYXRlTWF0Y2hUb0RhdGVzKGRhdGUsIGRkLmRhdGVzKSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmdldERpc2FibGVkVmFsdWUodHJ1ZSwgZGQuc3R5bGVDbGFzcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkQnlEaXNhYmxlVW50aWwoZGF0ZSwgZGlzYWJsZVVudGlsKSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlzYWJsZWRWYWx1ZSh0cnVlLCBFTVBUWV9TVFIpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzRGlzYWJsZWRCeURpc2FibGVTaW5jZShkYXRlLCBkaXNhYmxlU2luY2UpKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXREaXNhYmxlZFZhbHVlKHRydWUsIEVNUFRZX1NUUik7XG4gICAgfVxuXG4gICAgaWYgKGRpc2FibGVXZWVrZW5kcykge1xuICAgICAgY29uc3QgZGF5TmJyID0gdGhpcy5nZXREYXlOdW1iZXIoZGF0ZSk7XG4gICAgICBpZiAoZGF5TmJyID09PSAwIHx8IGRheU5iciA9PT0gNikge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREaXNhYmxlZFZhbHVlKHRydWUsIEVNUFRZX1NUUik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZG4gPSB0aGlzLmdldERheU51bWJlcihkYXRlKTtcbiAgICBpZiAoZGlzYWJsZVdlZWtkYXlzLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAoY29uc3Qgd2Qgb2YgZGlzYWJsZVdlZWtkYXlzKSB7XG4gICAgICAgIGlmIChkbiA9PT0gdGhpcy5nZXRXZWVrZGF5SW5kZXgod2QpKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGlzYWJsZWRWYWx1ZSh0cnVlLCBFTVBUWV9TVFIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNEaXNhYmxlZEJ5RGlzYWJsZURhdGVSYW5nZShkYXRlLCBkYXRlLCBkaXNhYmxlRGF0ZVJhbmdlcykpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldERpc2FibGVkVmFsdWUodHJ1ZSwgRU1QVFlfU1RSKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5nZXREaXNhYmxlZFZhbHVlKGZhbHNlLCBFTVBUWV9TVFIpO1xuICB9XG5cbiAgZ2V0RGlzYWJsZWRWYWx1ZShkaXNhYmxlZDogYm9vbGVhbiwgc3R5bGVDbGFzczogc3RyaW5nKTogSU15RGlzYWJsZWREYXRlIHtcbiAgICByZXR1cm4ge2Rpc2FibGVkLCBzdHlsZUNsYXNzfTtcbiAgfVxuXG4gIGRhdGVNYXRjaFRvRGF0ZXMoZGF0ZTogSU15RGF0ZSwgZGF0ZXM6IEFycmF5PElNeURhdGU+KTogYm9vbGVhbiB7XG4gICAgZm9yIChjb25zdCBkIG9mIGRhdGVzKSB7XG4gICAgICBpZiAoKGQueWVhciA9PT0gMCB8fCBkLnllYXIgPT09IGRhdGUueWVhcikgJiYgKGQubW9udGggPT09IDAgfHwgZC5tb250aCA9PT0gZGF0ZS5tb250aCkgJiYgZC5kYXkgPT09IGRhdGUuZGF5KSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc0Rpc2FibGVkTW9udGgoeWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyLCBvcHRpb25zOiBJTXlPcHRpb25zKTogYm9vbGVhbiB7XG4gICAgY29uc3Qge2Rpc2FibGVVbnRpbCwgZGlzYWJsZVNpbmNlLCBkaXNhYmxlRGF0ZVJhbmdlcywgZW5hYmxlRGF0ZXN9ID0gb3B0aW9ucztcblxuICAgIGNvbnN0IGRhdGVFbmQ6IElNeURhdGUgPSB7eWVhciwgbW9udGgsIGRheTogdGhpcy5kYXRlc0luTW9udGgobW9udGgsIHllYXIpfTtcbiAgICBjb25zdCBkYXRlQmVnaW46IElNeURhdGUgPSB7eWVhciwgbW9udGgsIGRheTogMX07XG5cbiAgICBpZiAodGhpcy5pc0RhdGVzRW5hYmxlZChkYXRlQmVnaW4sIGRhdGVFbmQsIGVuYWJsZURhdGVzKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzRGlzYWJsZWRCeURpc2FibGVVbnRpbChkYXRlRW5kLCBkaXNhYmxlVW50aWwpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkQnlEaXNhYmxlU2luY2UoZGF0ZUJlZ2luLCBkaXNhYmxlU2luY2UpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkQnlEaXNhYmxlRGF0ZVJhbmdlKGRhdGVCZWdpbiwgZGF0ZUVuZCwgZGlzYWJsZURhdGVSYW5nZXMpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc0Rpc2FibGVkWWVhcih5ZWFyOiBudW1iZXIsIG9wdGlvbnM6IElNeU9wdGlvbnMpOiBib29sZWFuIHtcbiAgICBjb25zdCB7ZGlzYWJsZVVudGlsLCBkaXNhYmxlU2luY2UsIGRpc2FibGVEYXRlUmFuZ2VzLCBlbmFibGVEYXRlcywgbWluWWVhciwgbWF4WWVhcn0gPSBvcHRpb25zO1xuXG4gICAgY29uc3QgZGF0ZUVuZDogSU15RGF0ZSA9IHt5ZWFyLCBtb250aDogMTIsIGRheTogMzF9O1xuICAgIGNvbnN0IGRhdGVCZWdpbjogSU15RGF0ZSA9IHt5ZWFyLCBtb250aDogMSwgZGF5OiAxfTtcblxuICAgIGlmICh0aGlzLmlzRGF0ZXNFbmFibGVkKGRhdGVCZWdpbiwgZGF0ZUVuZCwgZW5hYmxlRGF0ZXMpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNEaXNhYmxlZEJ5RGlzYWJsZVVudGlsKGRhdGVFbmQsIGRpc2FibGVVbnRpbCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzRGlzYWJsZWRCeURpc2FibGVTaW5jZShkYXRlQmVnaW4sIGRpc2FibGVTaW5jZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzRGlzYWJsZWRCeURpc2FibGVEYXRlUmFuZ2UoZGF0ZUJlZ2luLCBkYXRlRW5kLCBkaXNhYmxlRGF0ZVJhbmdlcykpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmICh5ZWFyIDwgbWluWWVhciB8fCB5ZWFyID4gbWF4WWVhcikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNEaXNhYmxlZEJ5RGlzYWJsZVVudGlsKGRhdGU6IElNeURhdGUsIGRpc2FibGVVbnRpbDogSU15RGF0ZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzSW5pdGlhbGl6ZWREYXRlKGRpc2FibGVVbnRpbCkgJiYgdGhpcy5nZXRUaW1lSW5NaWxsaXNlY29uZHMoZGF0ZSkgPD0gdGhpcy5nZXRUaW1lSW5NaWxsaXNlY29uZHMoZGlzYWJsZVVudGlsKTtcbiAgfVxuXG4gIGlzRGlzYWJsZWRCeURpc2FibGVTaW5jZShkYXRlOiBJTXlEYXRlLCBkaXNhYmxlU2luY2U6IElNeURhdGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pc0luaXRpYWxpemVkRGF0ZShkaXNhYmxlU2luY2UpICYmIHRoaXMuZ2V0VGltZUluTWlsbGlzZWNvbmRzKGRhdGUpID49IHRoaXMuZ2V0VGltZUluTWlsbGlzZWNvbmRzKGRpc2FibGVTaW5jZSk7XG4gIH1cblxuICBpc1Bhc3REYXRlc0VuYWJsZWQoZGF0ZTogSU15RGF0ZSwgZW5hYmxlRGF0ZXM6IEFycmF5PElNeURhdGU+KTogYm9vbGVhbiB7XG4gICAgZm9yKGNvbnN0IGQgb2YgZW5hYmxlRGF0ZXMpIHtcbiAgICAgIGlmICh0aGlzLmdldFRpbWVJbk1pbGxpc2Vjb25kcyhkKSA8PSB0aGlzLmdldFRpbWVJbk1pbGxpc2Vjb25kcyhkYXRlKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNGdXR1cmVEYXRlc0VuYWJsZWQoZGF0ZTogSU15RGF0ZSwgZW5hYmxlRGF0ZXM6IEFycmF5PElNeURhdGU+KTogYm9vbGVhbiB7XG4gICAgZm9yKGNvbnN0IGQgb2YgZW5hYmxlRGF0ZXMpIHtcbiAgICAgIGlmICh0aGlzLmdldFRpbWVJbk1pbGxpc2Vjb25kcyhkKSA+PSB0aGlzLmdldFRpbWVJbk1pbGxpc2Vjb25kcyhkYXRlKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNEYXRlc0VuYWJsZWQoZGF0ZUJlZ2luOiBJTXlEYXRlLCBkYXRlRW5kOiBJTXlEYXRlLCBlbmFibGVEYXRlczogQXJyYXk8SU15RGF0ZT4pOiBib29sZWFuIHtcbiAgICBmb3IoY29uc3QgZCBvZiBlbmFibGVEYXRlcykge1xuICAgICAgaWYgKHRoaXMuZ2V0VGltZUluTWlsbGlzZWNvbmRzKGQpID49IHRoaXMuZ2V0VGltZUluTWlsbGlzZWNvbmRzKGRhdGVCZWdpbikgXG4gICAgICAgICYmIHRoaXMuZ2V0VGltZUluTWlsbGlzZWNvbmRzKGQpIDw9IHRoaXMuZ2V0VGltZUluTWlsbGlzZWNvbmRzKGRhdGVFbmQpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNEaXNhYmxlZEJ5RGlzYWJsZURhdGVSYW5nZShkYXRlQmVnaW46IElNeURhdGUsIGRhdGVFbmQ6IElNeURhdGUsIGRpc2FibGVEYXRlUmFuZ2VzOiBBcnJheTxJTXlEYXRlUmFuZ2U+KTogYm9vbGVhbiB7XG4gICAgY29uc3QgZGF0ZU1zQmVnaW46IG51bWJlciA9IHRoaXMuZ2V0VGltZUluTWlsbGlzZWNvbmRzKGRhdGVCZWdpbik7XG4gICAgY29uc3QgZGF0ZU1zRW5kOiBudW1iZXIgPSB0aGlzLmdldFRpbWVJbk1pbGxpc2Vjb25kcyhkYXRlRW5kKTtcblxuICAgIGZvciAoY29uc3QgZCBvZiBkaXNhYmxlRGF0ZVJhbmdlcykge1xuICAgICAgaWYgKHRoaXMuaXNJbml0aWFsaXplZERhdGUoZC5iZWdpbikgJiYgdGhpcy5pc0luaXRpYWxpemVkRGF0ZShkLmVuZCkgXG4gICAgICAgICYmIGRhdGVNc0JlZ2luID49IHRoaXMuZ2V0VGltZUluTWlsbGlzZWNvbmRzKGQuYmVnaW4pICYmIGRhdGVNc0VuZCA8PSB0aGlzLmdldFRpbWVJbk1pbGxpc2Vjb25kcyhkLmVuZCkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzTWFya2VkRGF0ZShkYXRlOiBJTXlEYXRlLCBvcHRpb25zOiBJTXlPcHRpb25zKTogSU15TWFya2VkRGF0ZSB7XG4gICAgY29uc3Qge21hcmtEYXRlcywgbWFya1dlZWtlbmRzfSA9IG9wdGlvbnM7XG5cbiAgICBmb3IgKGNvbnN0IG1kIG9mIG1hcmtEYXRlcykge1xuICAgICAgaWYgKHRoaXMuZGF0ZU1hdGNoVG9EYXRlcyhkYXRlLCBtZC5kYXRlcykpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWFya2VkVmFsdWUodHJ1ZSwgbWQuY29sb3IsIG1kLnN0eWxlQ2xhc3MpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAobWFya1dlZWtlbmRzICYmIG1hcmtXZWVrZW5kcy5tYXJrZWQpIHtcbiAgICAgIGNvbnN0IGRheU5iciA9IHRoaXMuZ2V0RGF5TnVtYmVyKGRhdGUpO1xuICAgICAgaWYgKGRheU5iciA9PT0gMCB8fCBkYXlOYnIgPT09IDYpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWFya2VkVmFsdWUodHJ1ZSwgbWFya1dlZWtlbmRzLmNvbG9yLCBFTVBUWV9TVFIpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5nZXRNYXJrZWRWYWx1ZShmYWxzZSwgRU1QVFlfU1RSLCBFTVBUWV9TVFIpO1xuICB9XG5cbiAgZ2V0TWFya2VkVmFsdWUobWFya2VkOiBib29sZWFuLCBjb2xvcjogc3RyaW5nLCBzdHlsZUNsYXNzOiBzdHJpbmcpOiBJTXlNYXJrZWREYXRlIHtcbiAgICByZXR1cm4ge21hcmtlZCwgY29sb3I6IGNvbG9yID8gY29sb3IgOiBFTVBUWV9TVFIsIHN0eWxlQ2xhc3M6IHN0eWxlQ2xhc3MgPyBzdHlsZUNsYXNzIDogRU1QVFlfU1RSfTtcbiAgfVxuXG4gIGlzSGlnaGxpZ2h0ZWREYXRlKGRhdGU6IElNeURhdGUsIG9wdGlvbnM6IElNeU9wdGlvbnMpOiBib29sZWFuIHtcbiAgICBjb25zdCB7c3VuSGlnaGxpZ2h0LCBzYXRIaWdobGlnaHQsIGhpZ2hsaWdodERhdGVzfSA9IG9wdGlvbnM7XG5cbiAgICBjb25zdCBkYXlOYnI6IG51bWJlciA9IHRoaXMuZ2V0RGF5TnVtYmVyKGRhdGUpO1xuICAgIGlmIChzdW5IaWdobGlnaHQgJiYgZGF5TmJyID09PSAwIHx8IHNhdEhpZ2hsaWdodCAmJiBkYXlOYnIgPT09IDYpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmRhdGVNYXRjaFRvRGF0ZXMoZGF0ZSwgaGlnaGxpZ2h0RGF0ZXMpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXRXZWVrTnVtYmVyKGRhdGU6IElNeURhdGUpOiBudW1iZXIge1xuICAgIGNvbnN0IGQ6IERhdGUgPSBuZXcgRGF0ZShkYXRlLnllYXIsIGRhdGUubW9udGggLSAxLCBkYXRlLmRheSwgMCwgMCwgMCwgMCk7XG4gICAgZC5zZXREYXRlKGQuZ2V0RGF0ZSgpICsgKGQuZ2V0RGF5KCkgPT09IDAgPyAtMyA6IDQgLSBkLmdldERheSgpKSk7XG4gICAgcmV0dXJuIE1hdGgucm91bmQoKChkLmdldFRpbWUoKSAtIG5ldyBEYXRlKGQuZ2V0RnVsbFllYXIoKSwgMCwgNCkuZ2V0VGltZSgpKSAvIDg2NDAwMDAwKSAvIDcpICsgMTtcbiAgfVxuXG4gIGdldERhdGVNb2RlbChkYXRlOiBJTXlEYXRlLCBkYXRlUmFuZ2U6IElNeURhdGVSYW5nZSwgZGF0ZUZvcm1hdDogc3RyaW5nLCBtb250aExhYmVsczogSU15TW9udGhMYWJlbHMsIHJhbmdlRGVsaW1pdGVyOiBzdHJpbmcsIGRhdGVTdHI6IHN0cmluZyA9IEVNUFRZX1NUUik6IElNeURhdGVNb2RlbCB7XG4gICAgbGV0IHNpbmdsZURhdGVNb2RlbDogSU15U2luZ2xlRGF0ZU1vZGVsID0gbnVsbDtcbiAgICBsZXQgZGF0ZVJhbmdlTW9kZWw6IElNeURhdGVSYW5nZU1vZGVsID0gbnVsbDtcblxuICAgIGlmIChkYXRlKSB7XG4gICAgICBzaW5nbGVEYXRlTW9kZWwgPSB7XG4gICAgICAgIGRhdGUsXG4gICAgICAgIGpzRGF0ZTogdGhpcy5teURhdGVUb0pzRGF0ZShkYXRlKSxcbiAgICAgICAgZm9ybWF0dGVkOiBkYXRlU3RyLmxlbmd0aCA/IGRhdGVTdHIgOiB0aGlzLmZvcm1hdERhdGUoZGF0ZSwgZGF0ZUZvcm1hdCwgbW9udGhMYWJlbHMpLFxuICAgICAgICBlcG9jOiB0aGlzLmdldEVwb2NUaW1lKGRhdGUpXG4gICAgICB9O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGRhdGVSYW5nZU1vZGVsID0ge1xuICAgICAgICBiZWdpbkRhdGU6IGRhdGVSYW5nZS5iZWdpbixcbiAgICAgICAgYmVnaW5Kc0RhdGU6IHRoaXMubXlEYXRlVG9Kc0RhdGUoZGF0ZVJhbmdlLmJlZ2luKSxcbiAgICAgICAgYmVnaW5FcG9jOiB0aGlzLmdldEVwb2NUaW1lKGRhdGVSYW5nZS5iZWdpbiksXG4gICAgICAgIGVuZERhdGU6IGRhdGVSYW5nZS5lbmQsXG4gICAgICAgIGVuZEpzRGF0ZTogdGhpcy5teURhdGVUb0pzRGF0ZShkYXRlUmFuZ2UuZW5kKSxcbiAgICAgICAgZW5kRXBvYzogdGhpcy5nZXRFcG9jVGltZShkYXRlUmFuZ2UuZW5kKSxcbiAgICAgICAgZm9ybWF0dGVkOiB0aGlzLmZvcm1hdERhdGUoZGF0ZVJhbmdlLmJlZ2luLCBkYXRlRm9ybWF0LCBtb250aExhYmVscykgKyByYW5nZURlbGltaXRlciArIHRoaXMuZm9ybWF0RGF0ZShkYXRlUmFuZ2UuZW5kLCBkYXRlRm9ybWF0LCBtb250aExhYmVscylcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGlzUmFuZ2U6IGRhdGUgPT09IG51bGwsXG4gICAgICBzaW5nbGVEYXRlOiBzaW5nbGVEYXRlTW9kZWwsXG4gICAgICBkYXRlUmFuZ2U6IGRhdGVSYW5nZU1vZGVsXG4gICAgfTtcbiAgfVxuXG4gIGZvcm1hdERhdGUoZGF0ZTogSU15RGF0ZSwgZGF0ZUZvcm1hdDogc3RyaW5nLCBtb250aExhYmVsczogSU15TW9udGhMYWJlbHMpOiBzdHJpbmcge1xuICAgIGxldCBmb3JtYXR0ZWQ6IHN0cmluZyA9IGRhdGVGb3JtYXQucmVwbGFjZShZWVlZLCBTdHJpbmcoZGF0ZS55ZWFyKSk7XG5cbiAgICBpZiAoZGF0ZUZvcm1hdC5pbmRleE9mKE1NTSkgIT09IC0xKSB7XG4gICAgICBmb3JtYXR0ZWQgPSBmb3JtYXR0ZWQucmVwbGFjZShNTU0sIG1vbnRoTGFiZWxzW2RhdGUubW9udGhdKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZGF0ZUZvcm1hdC5pbmRleE9mKE1NKSAhPT0gLTEpIHtcbiAgICAgIGZvcm1hdHRlZCA9IGZvcm1hdHRlZC5yZXBsYWNlKE1NLCB0aGlzLnByZVplcm8oZGF0ZS5tb250aCkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGZvcm1hdHRlZCA9IGZvcm1hdHRlZC5yZXBsYWNlKE0sIFN0cmluZyhkYXRlLm1vbnRoKSk7XG4gICAgfVxuXG4gICAgaWYgKGRhdGVGb3JtYXQuaW5kZXhPZihERCkgIT09IC0xKSB7XG4gICAgICBmb3JtYXR0ZWQgPSBmb3JtYXR0ZWQucmVwbGFjZShERCwgdGhpcy5wcmVaZXJvKGRhdGUuZGF5KSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZm9ybWF0dGVkID0gZm9ybWF0dGVkLnJlcGxhY2UoRCwgU3RyaW5nKGRhdGUuZGF5KSk7XG4gICAgfVxuXG4gICAgaWYgKGRhdGVGb3JtYXQuaW5kZXhPZihPUkRJTkFMKSAhPT0gLTEpIHtcbiAgICAgIGZvcm1hdHRlZCA9IGZvcm1hdHRlZC5yZXBsYWNlKE9SRElOQUwsIHRoaXMuZ2V0T3JkaW5hbChkYXRlLmRheSkpO1xuICAgIH1cblxuICAgIHJldHVybiBmb3JtYXR0ZWQ7XG4gIH1cblxuICBnZXRPcmRpbmFsKGRhdGU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgaWYgKGRhdGUgPiAzICYmIGRhdGUgPCAyMSkge1xuICAgICAgcmV0dXJuIFRIO1xuICAgIH1cblxuICAgIHN3aXRjaCAoZGF0ZSAlIDEwKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiBTVDtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgcmV0dXJuIE5EO1xuICAgICAgY2FzZSAzOlxuICAgICAgICByZXR1cm4gUkQ7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gVEg7XG4gICAgfVxuICB9XG5cbiAgZ2V0Rm9ybWF0dGVkRGF0ZShtb2RlbDogSU15RGF0ZU1vZGVsKTogc3RyaW5nIHtcbiAgICByZXR1cm4gIW1vZGVsLmlzUmFuZ2UgPyBtb2RlbC5zaW5nbGVEYXRlLmZvcm1hdHRlZCA6IG1vZGVsLmRhdGVSYW5nZS5mb3JtYXR0ZWQ7XG4gIH1cblxuICBwcmVaZXJvKHZhbDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdmFsIDwgMTAgPyBaRVJPX1NUUiArIHZhbCA6IFN0cmluZyh2YWwpO1xuICB9XG5cbiAgaXNJbml0aWFsaXplZERhdGUoZGF0ZTogSU15RGF0ZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBkYXRlLnllYXIgIT09IDAgJiYgZGF0ZS5tb250aCAhPT0gMCAmJiBkYXRlLmRheSAhPT0gMDtcbiAgfVxuXG4gIGlzRGF0ZUVhcmxpZXIoZmlyc3REYXRlOiBJTXlEYXRlLCBzZWNvbmREYXRlOiBJTXlEYXRlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VGltZUluTWlsbGlzZWNvbmRzKGZpcnN0RGF0ZSkgPCB0aGlzLmdldFRpbWVJbk1pbGxpc2Vjb25kcyhzZWNvbmREYXRlKTtcbiAgfVxuXG4gIGlzRGF0ZVNhbWVPckVhcmxpZXIoZmlyc3REYXRlOiBJTXlEYXRlLCBzZWNvbmREYXRlOiBJTXlEYXRlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VGltZUluTWlsbGlzZWNvbmRzKGZpcnN0RGF0ZSkgPD0gdGhpcy5nZXRUaW1lSW5NaWxsaXNlY29uZHMoc2Vjb25kRGF0ZSk7XG4gIH1cblxuICBpc0RhdGVTYW1lKGZpcnN0RGF0ZTogSU15RGF0ZSwgc2Vjb25kRGF0ZTogSU15RGF0ZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmdldFRpbWVJbk1pbGxpc2Vjb25kcyhmaXJzdERhdGUpID09PSB0aGlzLmdldFRpbWVJbk1pbGxpc2Vjb25kcyhzZWNvbmREYXRlKTtcbiAgfVxuXG4gIGlzRGF0ZVJhbmdlQmVnaW5PckVuZFNhbWUoZGF0ZVJhbmdlOiBJTXlEYXRlUmFuZ2UsIGRhdGU6IElNeURhdGUpOiBib29sZWFuIHtcbiAgICBjb25zdCBkYXRlTXM6IG51bWJlciA9IHRoaXMuZ2V0VGltZUluTWlsbGlzZWNvbmRzKGRhdGUpO1xuICAgIHJldHVybiB0aGlzLmdldFRpbWVJbk1pbGxpc2Vjb25kcyhkYXRlUmFuZ2UuYmVnaW4pID09PSBkYXRlTXMgfHwgdGhpcy5nZXRUaW1lSW5NaWxsaXNlY29uZHMoZGF0ZVJhbmdlLmVuZCkgPT09IGRhdGVNcztcbiAgfVxuXG4gIGlzRGF0ZVJhbmdlQmVnaW4oZGF0ZVJhbmdlOiBJTXlEYXRlUmFuZ2UsIGRhdGU6IElNeURhdGUpOiBib29sZWFuIHtcbiAgICBjb25zdCBkYXRlTXM6IG51bWJlciA9IHRoaXMuZ2V0VGltZUluTWlsbGlzZWNvbmRzKGRhdGUpO1xuICAgIHJldHVybiB0aGlzLmdldFRpbWVJbk1pbGxpc2Vjb25kcyhkYXRlUmFuZ2UuYmVnaW4pID09PSBkYXRlTXM7XG4gIH1cblxuICBpc0RhdGVSYW5nZUVuZChkYXRlUmFuZ2U6IElNeURhdGVSYW5nZSwgZGF0ZTogSU15RGF0ZSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGRhdGVNczogbnVtYmVyID0gdGhpcy5nZXRUaW1lSW5NaWxsaXNlY29uZHMoZGF0ZSk7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VGltZUluTWlsbGlzZWNvbmRzKGRhdGVSYW5nZS5lbmQpID09PSBkYXRlTXM7XG4gIH1cblxuICBpc0RhdGVJblJhbmdlKGRhdGU6IElNeURhdGUsIGRhdGVSYW5nZTogSU15RGF0ZVJhbmdlKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLmlzSW5pdGlhbGl6ZWREYXRlKGRhdGVSYW5nZS5iZWdpbikgfHwgIXRoaXMuaXNJbml0aWFsaXplZERhdGUoZGF0ZVJhbmdlLmVuZCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaXNEYXRlU2FtZU9yRWFybGllcihkYXRlUmFuZ2UuYmVnaW4sIGRhdGUpICYmIHRoaXMuaXNEYXRlU2FtZU9yRWFybGllcihkYXRlLCBkYXRlUmFuZ2UuZW5kKTtcbiAgfVxuXG4gIHJlc2V0RGF0ZSgpOiBJTXlEYXRlIHtcbiAgICByZXR1cm4ge3llYXI6IDAsIG1vbnRoOiAwLCBkYXk6IDB9O1xuICB9XG5cbiAgZ2V0VGltZUluTWlsbGlzZWNvbmRzKGRhdGU6IElNeURhdGUpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLm15RGF0ZVRvSnNEYXRlKGRhdGUpLmdldFRpbWUoKTtcbiAgfVxuXG4gIGdldFRvZGF5KCk6IElNeURhdGUge1xuICAgIGNvbnN0IGRhdGU6IERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIHJldHVybiB7eWVhcjogZGF0ZS5nZXRGdWxsWWVhcigpLCBtb250aDogZGF0ZS5nZXRNb250aCgpICsgMSwgZGF5OiBkYXRlLmdldERhdGUoKX07XG4gIH1cblxuICBnZXREYXlOdW1iZXIoZGF0ZTogSU15RGF0ZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGRhdGUueWVhciwgZGF0ZS5tb250aCAtIDEsIGRhdGUuZGF5LCAwLCAwLCAwLCAwKS5nZXREYXkoKTtcbiAgfVxuXG4gIGdldFdlZWtkYXlJbmRleCh3ZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMud2Vla0RheXMuaW5kZXhPZih3ZCk7XG4gIH1cblxuICBnZXRFcG9jVGltZShkYXRlOiBJTXlEYXRlKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCh0aGlzLmdldFRpbWVJbk1pbGxpc2Vjb25kcyhkYXRlKSAvIDEwMDAuMCk7XG4gIH1cblxuICBqc0RhdGVUb015RGF0ZShkYXRlOiBEYXRlKTogSU15RGF0ZSB7XG4gICAgcmV0dXJuIHt5ZWFyOiBkYXRlLmdldEZ1bGxZZWFyKCksIG1vbnRoOiBkYXRlLmdldE1vbnRoKCkgKyAxLCBkYXk6IGRhdGUuZ2V0RGF0ZSgpfTtcbiAgfVxuXG4gIG15RGF0ZVRvSnNEYXRlKGRhdGU6IElNeURhdGUpOiBEYXRlIHtcbiAgICBjb25zdCB7eWVhciwgbW9udGgsIGRheX0gPSBkYXRlO1xuICAgIHJldHVybiBuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIGRheSwgMCwgMCwgMCwgMCk7XG4gIH1cblxuICBkYXRlc0luTW9udGgobTogbnVtYmVyLCB5OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBuZXcgRGF0ZSh5LCBtLCAwKS5nZXREYXRlKCk7XG4gIH1cblxuICBkYXRlc0luUHJldk1vbnRoKG06IG51bWJlciwgeTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBkOiBEYXRlID0gdGhpcy5nZXRKc0RhdGUoeSwgbSwgMSk7XG4gICAgZC5zZXRNb250aChkLmdldE1vbnRoKCkgLSAxKTtcbiAgICByZXR1cm4gdGhpcy5kYXRlc0luTW9udGgoZC5nZXRNb250aCgpICsgMSwgZC5nZXRGdWxsWWVhcigpKTtcbiAgfVxuXG4gIGdldEpzRGF0ZSh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRheTogbnVtYmVyKTogRGF0ZSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5LCAwLCAwLCAwLCAwKTtcbiAgfVxuXG4gIGdldFNlbGVjdGVkVmFsdWUoc2VsZWN0ZWRWYWx1ZTogYW55LCBkYXRlUmFuZ2U6IGJvb2xlYW4pOiBhbnkge1xuICAgIGlmICghc2VsZWN0ZWRWYWx1ZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKCFkYXRlUmFuZ2UpIHtcbiAgICAgIHJldHVybiBzZWxlY3RlZFZhbHVlLmRhdGU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY29uc3Qge2JlZ2luRGF0ZSwgZW5kRGF0ZX0gPSBzZWxlY3RlZFZhbHVlO1xuICAgICAgcmV0dXJuIHtiZWdpbjogYmVnaW5EYXRlLCBlbmQ6IGVuZERhdGV9O1xuICAgIH1cbiAgfVxuXG4gIGdldEtleUNvZGVGcm9tRXZlbnQoZXZlbnQ6IGFueSk6IG51bWJlciB7XG4gICAgbGV0IGtleTogYW55ID0gZXZlbnQua2V5IHx8IGV2ZW50LmtleUNvZGUgfHwgZXZlbnQud2hpY2g7XG5cbiAgICBpZiAodGhpcy5jaGVja0tleU5hbWUoa2V5LCBLZXlOYW1lLmVudGVyKSB8fCBrZXkgPT09IEtleUNvZGUuZW50ZXIpIHtcbiAgICAgIHJldHVybiBLZXlDb2RlLmVudGVyO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLmNoZWNrS2V5TmFtZShrZXksIEtleU5hbWUuZXNjKSB8fCBrZXkgPT09IEtleUNvZGUuZXNjKSB7XG4gICAgICByZXR1cm4gS2V5Q29kZS5lc2M7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuY2hlY2tLZXlOYW1lKGtleSwgS2V5TmFtZS5zcGFjZSkgfHwga2V5ID09PSBLZXlDb2RlLnNwYWNlKSB7XG4gICAgICByZXR1cm4gS2V5Q29kZS5zcGFjZTtcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5jaGVja0tleU5hbWUoa2V5LCBLZXlOYW1lLmxlZnRBcnJvdykgfHwga2V5ID09PSBLZXlDb2RlLmxlZnRBcnJvdykge1xuICAgICAgcmV0dXJuIEtleUNvZGUubGVmdEFycm93O1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLmNoZWNrS2V5TmFtZShrZXksIEtleU5hbWUudXBBcnJvdykgfHwga2V5ID09PSBLZXlDb2RlLnVwQXJyb3cpIHtcbiAgICAgIHJldHVybiBLZXlDb2RlLnVwQXJyb3c7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuY2hlY2tLZXlOYW1lKGtleSwgS2V5TmFtZS5yaWdodEFycm93KSB8fCBrZXkgPT09IEtleUNvZGUucmlnaHRBcnJvdykge1xuICAgICAgcmV0dXJuIEtleUNvZGUucmlnaHRBcnJvdztcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5jaGVja0tleU5hbWUoa2V5LCBLZXlOYW1lLmRvd25BcnJvdyl8fCBrZXkgPT09IEtleUNvZGUuZG93bkFycm93KSB7XG4gICAgICByZXR1cm4gS2V5Q29kZS5kb3duQXJyb3c7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuY2hlY2tLZXlOYW1lKGtleSwgS2V5TmFtZS50YWIpIHx8IGtleSA9PT0gS2V5Q29kZS50YWIpIHtcbiAgICAgIHJldHVybiBLZXlDb2RlLnRhYjtcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5jaGVja0tleU5hbWUoa2V5LCBLZXlOYW1lLnNoaWZ0KSB8fCBrZXkgPT09IEtleUNvZGUuc2hpZnQpIHtcbiAgICAgIHJldHVybiBLZXlDb2RlLnNoaWZ0O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrS2V5TmFtZShrZXk6IHN0cmluZywga2V5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgYXJyOiBBcnJheTxzdHJpbmc+ID0ga2V5TmFtZS5zcGxpdChQSVBFKTtcbiAgICByZXR1cm4gYXJyLmluZGV4T2Yoa2V5KSAhPT0gLTE7XG4gIH1cbn1cbiJdfQ==