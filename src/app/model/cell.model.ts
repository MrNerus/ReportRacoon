export interface Cell {
    type: 'Text' | 'Field' | 'Image' | 'Barcode' | 'Grid';
    value?: string;

    padding?: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    }

    border?: {
        top?: {
            width?: number;
            color?: string;
            style?: 'solid' | 'dashed' | 'dotted';
        }
        bottom?: {
            width?: number;
            color?: string;
            style?: 'solid' | 'dashed' | 'dotted';
        }
        left?: {
            width?: number;
            color?: string;
            style?: 'solid' | 'dashed' | 'dotted';
        }
        right?: {
            width?: number;
            color?: string;
            style?: 'solid' | 'dashed' | 'dotted';
        }
    }

    rowSpan: number;
    colSpan: number;
}

export interface TextCell extends Cell {
    type: 'Text' | 'Field',

    fontFamily?: string;
    fontSize: number;
    fontWeight: 'normal' | 'bold';

    textDecoration: TextDecoration[];

    color?: string;
    background?: string;

    inlineAlignment: 'left' | 'center' | 'right' | 'justify';
    blockAlignment: 'top' | 'middle' | 'bottom' | 'stretch';

    overflow: 'wrap' | 'truncate' | 'clip' | 'ignore';

}

export interface ImageCell extends Cell {
    overflow: 'fill-and-clip' | 'fill-and-ignore' | 'shrink-to-fit' | 'maintain-aspect-ratio';
}

export interface GridCell extends Cell {
    columns: number;

    columnWidth: ColumnWidth[];

}

export type TextDecoration = 'normal' | 'italic' | 'strikethrough' | 'overline' | 'underline';
export type ColumnWidth = { type: 'auto' | 'fixed' | 'percentage' | 'remaining'; value?: number };