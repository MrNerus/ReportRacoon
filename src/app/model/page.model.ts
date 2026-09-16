import { BaseCell } from "./cell.model";

export interface PageSetting {
    pageType: 'A4' | 'Letter' | 'Legal' | 'Custom';
    orientation: 'portrait' | 'landscape';
    width: number;  // in mm
    height: number; // in mm

    // Hardware printer safe margins (usually 5mm-15mm)
    margin: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
}


export interface TemplateSection {
    id: string;
    name: string;
    type: 'pageHeader' | 'reportHeader' | 'body' | 'reportFooter' | 'pageFooter';
    height: { type: 'auto' | 'fixed'; value: number }; // in mm
    repeatOnEveryPage?: boolean;
    elements: BaseCell[];
}

export interface ReportTemplate {
    id: string;
    title: string;
    settings: PageSetting;
    sections: TemplateSection[];
}