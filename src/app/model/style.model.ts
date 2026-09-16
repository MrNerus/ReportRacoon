export interface CellBorders {
    top?: BorderSide;
    bottom?: BorderSide;
    left?: BorderSide;
    right?: BorderSide;
}

export interface CellPadding {
    top: number;
    bottom: number;
    left: number;
    right: number;
}

export interface BorderSide {
    width: number; // in pt
    color: string;
    style: 'solid' | 'dashed' | 'dotted' | 'double' | 'none';
}
