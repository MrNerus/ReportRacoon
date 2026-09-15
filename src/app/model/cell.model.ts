
export interface BaseCell {
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
            style?: 'solid' | 'dashed' | 'dotted' | 'double';
        }
        bottom?: {
            width?: number;
            color?: string;
            style?: 'solid' | 'dashed' | 'dotted' | 'double';
        }
        left?: {
            width?: number;
            color?: string;
            style?: 'solid' | 'dashed' | 'dotted' | 'double';
        }
        right?: {
            width?: number;
            color?: string;
            style?: 'solid' | 'dashed' | 'dotted' | 'double';
        }
    }

    rowSpan: number;
    colSpan: number;
}

export interface TextCell extends BaseCell {
    type: 'Text' | 'Field',

    fontFamily?: string;
    fontSize: number;
    fontWeight: 'normal' | 'bold';

    textDecoration: TextDecoration[];

    color?: string;
    background?: string;

    inlineAlignment: 'left' | 'center' | 'right' | 'justify';
    blockAlignment: 'top' | 'middle' | 'bottom';

    overflow: 'wrap' | 'truncate' | 'clip' | 'ignore';

}

export interface DateField extends TextCell {
    type: 'Field';
    value: string;
    format: 'dd/MM/yyyy' | 'MM/dd/yyyy' | 'yyyy-MM-dd';
}

export interface DateTimeField extends TextCell {
    type: 'Field';
    value: string;
    format: 'dd/MM/yyyy HH:mm:ss' | 'MM/dd/yyyy HH:mm:ss' | 'yyyy-MM-dd HH:mm:ss';
}

export interface ImageCell extends BaseCell {
    overflow: 'clipped-fill' | 'unclipped-fill' | 'distorted-fit' | 'aspect-fit';
    scaleX: number;
    scaleY: number;
}

export interface GridCell extends BaseCell {
    columns: number;

    columnWidth: ColumnWidth[];
    children: BaseCell[];

}

export type TextDecoration = 'normal' | 'italic' | 'strikethrough' | 'overline' | 'underline';
export type ColumnWidth = { type: 'auto' | 'fixed' | 'percentage' | 'remaining'; value?: number };