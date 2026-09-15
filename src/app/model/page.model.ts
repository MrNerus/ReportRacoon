import { BaseCell } from "./cell.model";

export interface PageSetting {
    pageType: 'A4' | 'Letter' | 'Legal' | 'A3' | 'A5' | 'Custom';
    pageWidth: number; // in mm
    pageHeight: number; // in mm
    orientation: 'portrait' | 'landscape';

    padding?: {
        top: number; // in mm
        bottom: number; // in mm
        left: number; // in mm
        right: number; // in mm
    }
}


export interface PageSection {
    type: 'header' | 'body' | 'footer';
    content: BaseCell[];
    height: number; // in mm
}

export interface ReportPage {
    pageNumber?: string; // '1 / 3' || '1 of 3' || 'Page 1 / 3' || '1'
    header?: PageSection[];
    body?: PageSection[];
    footer?: PageSection[];
}

export interface Report {
    reportSettings: PageSetting;
    pages: ReportPage[];
}