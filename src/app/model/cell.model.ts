import { ColumnWidth, DateFormat, NumberFormat, TextDecoration } from "./report.type";
import { CellBorders, CellPadding } from "./style.model";

export interface BaseCell {
    id: string; // Unique ID for designer selection
    type: 'Text' | 'Field' | 'Table' | 'Image' | 'Line';

    // Placement inside Grid or Table
    rowIndex?: number;
    colIndex?: number;
    rowSpan?: number;
    colSpan?: number;

    padding?: CellPadding;
    border?: CellBorders;
    background?: string;

    // Sizing
    width?: { type: 'auto' | 'fixed' | 'percentage'; value?: number };
    height?: { type: 'auto' | 'fixed'; value?: number };
}

export interface TextCell extends BaseCell {
    type: 'Text' | 'Field';

    value?: string;
    staticText?: string;

    fontFamily?: string;
    fontSize: number; // in pt (standard for print)
    fontWeight: 'normal' | 'bold' | '500' | '600' | '700';
    fontStyle?: 'normal' | 'italic';
    textDecoration?: 'none' | 'underline' | 'line-through';
    color?: string;
    lineHeight?: number; // e.g., 1.2, 1.4
    background?: string;

    inlineAlignment: 'left' | 'center' | 'right' | 'justify';
    blockAlignment: 'top' | 'middle' | 'bottom';

    overflow: 'word-wrap' | 'character-wrap' | 'ellipsis' | 'clip' | 'ignore';

}

export interface FieldCell extends TextCell {
    type: 'Field';
    bindingKey?: string; // e.g., 'invoice.customerName' or 'item.rate'
    formatter?: NumberFormat | DateFormat;
}

export interface ImageCell extends BaseCell {
    overflow: 'clipped-fill' | 'unclipped-fill' | 'distorted-fit' | 'aspect-fit';
    scaleX: number;
    scaleY: number;
}

// --- DYNAMIC REPEATER TABLE (For Invoices & Grade Sheets) ---
export interface ReportTable extends BaseCell {
    type: 'Table';
    datasetKey: string; // e.g. "invoice.lineItems" or "student.marks"
    borderCollapse?: boolean;

    columns: {
        id: string;
        header: string;
        width: ColumnWidth;
        align: 'left' | 'center' | 'right';
    }[];

    headerRow: {
        height: number;
        cells: TextCell[];
        repeatOnEveryPage: boolean; // Repeats column header if table spans multiple pages
    };

    detailRow: {
        height?: number; // auto or fixed
        cells: TextCell[]; // Cells bind to item properties like "quantity", "unitPrice"
    };

    footerRow?: {
        height: number;
        cells: TextCell[]; // e.g. Subtotals, summary formulas
    };
}