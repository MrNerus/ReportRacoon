import { BaseCell } from "./cell.model";

export type PageType = 'A4' | 'Letter' | 'Legal' | 'Custom' | 'Receipt';

export const PAGE_DIMENSIONS: Record<PageType, { width: number; height: number }> = {
    A4: { width: 210, height: 297 },
    Letter: { width: 215.9, height: 279.4 },
    Legal: { width: 215.9, height: 355.6 },
    Custom: { width: 210, height: 297 },
    Receipt: { width: 80, height: 200 }
};

export interface PageSetting {
    pageType: PageType;
    orientation: 'portrait' | 'landscape';
    width: number;  // in mm
    height: number; // in mm
    continuous?: boolean; // When true (e.g., thermal receipt rolls), page expands vertically without pagination

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