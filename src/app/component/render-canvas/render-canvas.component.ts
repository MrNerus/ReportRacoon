import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { report, sampleInvoiceData } from '../../data/data';
import { ReportTemplate, TemplateSection } from '../../model/page.model';
import { BaseCell, FieldCell, ReportTable, TextCell } from '../../model/cell.model';

@Component({
  selector: 'app-render-canvas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './render-canvas.component.html',
  styleUrl: './render-canvas.component.css'
})
export class RenderCanvasComponent {
  readonly template: ReportTemplate = report;
  readonly data = sampleInvoiceData;

  isTable(element: BaseCell): element is ReportTable {
    return element.type === 'Table';
  }

  isTextOrField(element: BaseCell): element is TextCell | FieldCell {
    return element.type === 'Text' || element.type === 'Field';
  }

  resolveValue(cell: BaseCell, itemContext?: any): string {
    const field = cell as FieldCell;
    if (field.bindingKey) {
      const bound = this.getBoundValue(field.bindingKey, itemContext);
      if (bound !== undefined && bound !== null) {
        return this.formatValue(bound, field.formatter);
      }
    }
    const textCell = cell as TextCell;
    return textCell.value ?? textCell.staticText ?? '';
  }

  private getBoundValue(bindingKey: string, itemContext?: any): any {
    if (bindingKey.startsWith('item.') && itemContext) {
      const prop = bindingKey.substring(5);
      return itemContext[prop];
    }
    const parts = bindingKey.split('.');
    let current: any = this.data;
    for (const part of parts) {
      if (current === undefined || current === null) return undefined;
      current = current[part];
    }
    return current;
  }

  private formatValue(val: any, formatter?: any): string {
    if (!formatter) return String(val);

    if (formatter.type === 'currency') {
      const num = Number(val);
      const symbol = formatter.currencySymbol ?? '$';
      const decimals = formatter.decimals ?? 2;
      const formatted = isNaN(num)
        ? val
        : num.toLocaleString('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
            useGrouping: formatter.useGrouping !== false
          });
      return `${symbol}${formatted}`;
    }

    if (formatter.type === 'number') {
      const num = Number(val);
      const decimals = formatter.decimals ?? 0;
      return isNaN(num)
        ? val
        : num.toLocaleString('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
            useGrouping: formatter.useGrouping !== false
          });
    }

    return String(val);
  }

  getTableData(datasetKey: string): any[] {
    const resolved = this.getBoundValue(datasetKey);
    return Array.isArray(resolved) ? resolved : [];
  }

  getTableColumnTemplate(table: ReportTable): string {
    return table.columns
      .map(col => {
        if (col.width.type === 'fixed' && col.width.value) {
          return `${col.width.value}mm`;
        }
        if (col.width.type === 'percentage' && col.width.value) {
          return `${col.width.value}%`;
        }
        return '1fr';
      })
      .join(' ');
  }

  getCellStyles(cell: BaseCell): Record<string, string> {
    const styles: Record<string, string> = {};
    const textCell = cell as TextCell;

    if (textCell.fontSize) styles['font-size'] = `${textCell.fontSize}pt`;
    if (textCell.fontWeight) styles['font-weight'] = String(textCell.fontWeight);
    if (textCell.fontStyle) styles['font-style'] = textCell.fontStyle;
    if (textCell.textDecoration) styles['text-decoration'] = textCell.textDecoration;
    if (textCell.color) styles['color'] = textCell.color;
    if (textCell.fontFamily) styles['font-family'] = textCell.fontFamily;
    if (textCell.lineHeight) styles['line-height'] = String(textCell.lineHeight);
    if (textCell.background) styles['background-color'] = textCell.background;

    // Alignments
    if (textCell.inlineAlignment) {
      styles['text-align'] = textCell.inlineAlignment;
    }
    if (textCell.blockAlignment) {
      styles['display'] = 'flex';
      styles['align-items'] =
        textCell.blockAlignment === 'middle'
          ? 'center'
          : textCell.blockAlignment === 'bottom'
          ? 'flex-end'
          : 'flex-start';
      styles['justify-content'] =
        textCell.inlineAlignment === 'right'
          ? 'flex-end'
          : textCell.inlineAlignment === 'center'
          ? 'center'
          : 'flex-start';
    }

    // CSS Grid placement
    if (cell.colIndex !== undefined) {
      styles['grid-column'] = `${cell.colIndex + 1} / span ${cell.colSpan ?? 1}`;
    }
    if (cell.rowIndex !== undefined) {
      styles['grid-row'] = `${cell.rowIndex + 1} / span ${cell.rowSpan ?? 1}`;
    }

    // Borders
    if (cell.border) {
      if (cell.border.top) {
        styles['border-top'] = `${cell.border.top.width}pt ${cell.border.top.style} ${cell.border.top.color}`;
      }
      if (cell.border.bottom) {
        styles['border-bottom'] = `${cell.border.bottom.width}pt ${cell.border.bottom.style} ${cell.border.bottom.color}`;
      }
      if (cell.border.left) {
        styles['border-left'] = `${cell.border.left.width}pt ${cell.border.left.style} ${cell.border.left.color}`;
      }
      if (cell.border.right) {
        styles['border-right'] = `${cell.border.right.width}pt ${cell.border.right.style} ${cell.border.right.color}`;
      }
    }

    // Padding (in mm)
    if (cell.padding) {
      styles['padding'] = `${cell.padding.top}mm ${cell.padding.right}mm ${cell.padding.bottom}mm ${cell.padding.left}mm`;
    }

    // Overflow rules
    if (textCell.overflow === 'word-wrap') {
      styles['word-break'] = 'break-word';
      styles['white-space'] = 'pre-wrap';
    } else if (textCell.overflow === 'ellipsis' || textCell.overflow === 'clip') {
      styles['white-space'] = 'nowrap';
      styles['overflow'] = 'hidden';
      if (textCell.overflow === 'ellipsis') styles['text-overflow'] = 'ellipsis';
    }

    return styles;
  }
}
