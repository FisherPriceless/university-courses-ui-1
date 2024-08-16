import { EventEmitter, OnChanges, AfterViewInit, SimpleChanges } from "@angular/core";
import { IMyCalendarYear } from "../../interfaces/my-calendar-year.interface";
import { IMyOptions } from "../../interfaces/my-options.interface";
import { ActiveView } from "../../enums/active-view.enum";
import { UtilService } from "../../services/angular-mydatepicker.util.service";
export declare class YearViewComponent implements OnChanges, AfterViewInit {
    private utilService;
    opts: IMyOptions;
    years: Array<Array<IMyCalendarYear>>;
    viewChanged: boolean;
    yearCellClicked: EventEmitter<IMyCalendarYear>;
    yearCellKeyDown: EventEmitter<any>;
    viewActivated: EventEmitter<ActiveView>;
    constructor(utilService: UtilService);
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    onYearCellClicked(event: any, cell: IMyCalendarYear): void;
    onYearCellKeyDown(event: any, cell: IMyCalendarYear): void;
}
