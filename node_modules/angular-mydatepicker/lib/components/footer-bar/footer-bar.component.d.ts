import { EventEmitter, OnChanges, SimpleChanges } from "@angular/core";
import { IMyOptions } from "../../interfaces/my-options.interface";
import { UtilService } from "../../services/angular-mydatepicker.util.service";
export declare class FooterBarComponent implements OnChanges {
    private utilService;
    opts: IMyOptions;
    footerBarTxtClicked: EventEmitter<void>;
    footerBarTxt: string;
    constructor(utilService: UtilService);
    ngOnChanges(changes: SimpleChanges): void;
    onFooterBarTxtClicked(): void;
}
