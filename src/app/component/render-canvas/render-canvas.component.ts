import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ViewChildren,
  ElementRef,
  QueryList,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { report, sampleInvoiceData } from '../../data/data';
import { PAGE_DIMENSIONS, PageSetting, PageType, ReportTemplate, TemplateSection } from '../../model/page.model';
import { BaseCell, FieldCell, ReportTable, TextCell } from '../../model/cell.model';

export interface RenderedTableChunk {
  table: ReportTable;
  showHeader: boolean;
  showFooter: boolean;
  items: any[];
  startIndex: number;
}

export interface RenderedPage {
  pageNumber: number;
  totalPages: number;
  pageHeader?: TemplateSection;
  reportHeader?: TemplateSection;
  bodyTableChunks: RenderedTableChunk[];
  otherBodyElements: BaseCell[];
  reportFooter?: TemplateSection;
  pageFooter?: TemplateSection;
}

@Component({
  selector: 'app-render-canvas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './render-canvas.component.html',
  styleUrl: './render-canvas.component.css'
})
export class RenderCanvasComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly template: ReportTemplate = report;
  readonly data = sampleInvoiceData;

  // Active Display Configuration
  selectedPageType: PageType = this.template.settings.pageType ?? 'A4';
  selectedOrientation: 'portrait' | 'landscape' = this.template.settings.orientation ?? 'portrait';
  isContinuous: boolean = !!this.template.settings.continuous;

  // Viewport Pan & Zoom State
  zoomLevel: number = 1.0;
  panX: number = 0;
  panY: number = 0;
  isDragging: boolean = false;
  private dragStartX: number = 0;
  private dragStartY: number = 0;
  private startPanX: number = 0;
  private startPanY: number = 0;

  private boundWheelHandler = (event: WheelEvent) => this.onWheel(event);
  private boundResizeHandler = () => this.onResize();

  currentSettings: PageSetting = { ...this.template.settings };
  pages: RenderedPage[] = [];

  readonly availablePageTypes: PageType[] = ['A4', 'Letter', 'Legal', 'Receipt', 'Custom'];

  // Viewport and Stage DOM references
  @ViewChild('canvasViewport') canvasViewport?: ElementRef<HTMLElement>;
  @ViewChild('canvasStage') canvasStage?: ElementRef<HTMLElement>;
  @ViewChild('pagesContainer') pagesContainer?: ElementRef<HTMLElement>;

  // Template Sections Reference
  get templatePageHeader(): TemplateSection | undefined {
    return this.template.sections.find(s => s.type === 'pageHeader');
  }

  get templateReportHeader(): TemplateSection | undefined {
    return this.template.sections.find(s => s.type === 'reportHeader');
  }

  get templateBodySection(): TemplateSection | undefined {
    return this.template.sections.find(s => s.type === 'body');
  }

  get templateTable(): ReportTable | undefined {
    return this.templateBodySection?.elements.find(e => e.type === 'Table') as ReportTable | undefined;
  }

  get otherBodyElements(): BaseCell[] {
    return this.templateBodySection?.elements.filter(e => e.type !== 'Table') ?? [];
  }

  get templateReportFooter(): TemplateSection | undefined {
    return this.template.sections.find(s => s.type === 'reportFooter');
  }

  get templatePageFooter(): TemplateSection | undefined {
    return this.template.sections.find(s => s.type === 'pageFooter');
  }

  get allTableItems(): any[] {
    return this.templateTable ? this.getTableData(this.templateTable.datasetKey) : [];
  }

  get printableWidthMm(): number {
    return Math.max(10, this.currentSettings.width - this.currentSettings.margin.left - this.currentSettings.margin.right);
  }

  get printableHeightMm(): number {
    return Math.max(10, this.currentSettings.height - this.currentSettings.margin.top - this.currentSettings.margin.bottom);
  }

  // DOM elements for offscreen exact measurement
  @ViewChild('measureContainer') measureContainer?: ElementRef<HTMLElement>;
  @ViewChild('measurePageHeader') measurePageHeader?: ElementRef<HTMLElement>;
  @ViewChild('measureReportHeader') measureReportHeader?: ElementRef<HTMLElement>;
  @ViewChild('measureBodySection') measureBodySection?: ElementRef<HTMLElement>;
  @ViewChild('measureTableHeader') measureTableHeader?: ElementRef<HTMLElement>;
  @ViewChildren('measureDetailRow') measureDetailRows?: QueryList<ElementRef<HTMLElement>>;
  @ViewChild('measureReportFooter') measureReportFooter?: ElementRef<HTMLElement>;
  @ViewChild('measurePageFooter') measurePageFooter?: ElementRef<HTMLElement>;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.updateCurrentSettings();
    // Generate initial pages
    this.generateEstimatedPages();
  }

  get stageTransform(): string {
    return `translate3d(${this.panX}px, ${this.panY}px, 0) scale(${this.zoomLevel})`;
  }

  get zoomPercentage(): number {
    return Math.round(this.zoomLevel * 100);
  }

  ngAfterViewInit(): void {
    if (this.canvasViewport?.nativeElement) {
      this.canvasViewport.nativeElement.addEventListener('wheel', this.boundWheelHandler, { passive: false });
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.boundResizeHandler);
    }

    if (!this.isContinuous) {
      if (typeof document !== 'undefined' && (document as any).fonts?.ready) {
        (document as any).fonts.ready.then(() => {
          this.measureAndPaginate();
          setTimeout(() => this.resetToFit(), 30);
        });
      }
      setTimeout(() => {
        this.measureAndPaginate();
        this.resetToFit();
      }, 80);
    } else {
      setTimeout(() => this.resetToFit(), 80);
    }
  }

  ngOnDestroy(): void {
    if (this.canvasViewport?.nativeElement) {
      this.canvasViewport.nativeElement.removeEventListener('wheel', this.boundWheelHandler);
    }
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.boundResizeHandler);
    }
  }

  onResize(): void {
    this.cdr.detectChanges();
  }

  setPageType(pageType: PageType): void {
    this.selectedPageType = pageType;
    if (pageType === 'Receipt') {
      this.isContinuous = true;
    }
    this.applyPageSettings();
  }

  setOrientation(orientation: 'portrait' | 'landscape'): void {
    this.selectedOrientation = orientation;
    this.applyPageSettings();
  }

  toggleContinuous(): void {
    this.isContinuous = !this.isContinuous;
    this.applyPageSettings();
  }

  printReport(): void {
    window.print();
  }

  applyPageSettings(): void {
    this.updateCurrentSettings();

    if (this.isContinuous) {
      this.pages = [{
        pageNumber: 1,
        totalPages: 1,
        pageHeader: this.templatePageHeader,
        reportHeader: this.templateReportHeader,
        bodyTableChunks: this.templateTable ? [{
          table: this.templateTable,
          showHeader: true,
          showFooter: true,
          items: this.allTableItems,
          startIndex: 0
        }] : [],
        otherBodyElements: this.otherBodyElements,
        reportFooter: this.templateReportFooter,
        pageFooter: this.templatePageFooter
      }];
      this.cdr.detectChanges();
      setTimeout(() => this.resetToFit(), 20);
    } else {
      // Re-measure after DOM updates to new dimensions
      this.cdr.detectChanges();
      setTimeout(() => {
        this.measureAndPaginate();
        this.resetToFit();
      }, 20);
    }
  }

  // Panning (Drag) Handlers
  onPointerDown(event: PointerEvent): void {
    if (event.button !== 0) return; // Left click / single touch only

    this.isDragging = true;
    this.dragStartX = event.clientX;
    this.dragStartY = event.clientY;
    this.startPanX = this.panX;
    this.startPanY = this.panY;

    const target = event.currentTarget as HTMLElement;
    if (target && target.setPointerCapture) {
      try {
        target.setPointerCapture(event.pointerId);
      } catch {
        // Ignore if pointer capture fails
      }
    }
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.isDragging) return;

    const dx = event.clientX - this.dragStartX;
    const dy = event.clientY - this.dragStartY;
    this.panX = this.startPanX + dx;
    this.panY = this.startPanY + dy;
    this.cdr.detectChanges();
  }

  onPointerUp(event: PointerEvent): void {
    if (this.isDragging) {
      this.isDragging = false;
      const target = event.currentTarget as HTMLElement;
      if (target && target.hasPointerCapture && target.hasPointerCapture(event.pointerId)) {
        try {
          target.releasePointerCapture(event.pointerId);
        } catch {
          // Ignore
        }
      }
      this.cdr.detectChanges();
    }
  }

  // Zoom Handlers (Scroll / Touchpad Pinch / Gesture)
  onWheel(event: WheelEvent): void {
    event.preventDefault();

    let delta = event.deltaY;
    if (Math.abs(delta) < 0.01 && Math.abs(event.deltaX) > 0.01) {
      delta = event.deltaX;
    }

    if (event.deltaMode === 1) {
      delta *= 28;
    } else if (event.deltaMode === 2) {
      delta *= 280;
    }

    let zoomFactor: number;
    if (event.ctrlKey) {
      // Pinch to zoom on touchpad
      zoomFactor = Math.exp(-delta * 0.01);
    } else {
      // Regular scroll action (mouse wheel or touchpad 2-finger scroll)
      zoomFactor = Math.pow(0.9985, delta);
    }

    const targetZoom = Math.max(0.2, Math.min(3.0, this.zoomLevel * zoomFactor));
    this.zoomTo(targetZoom, event.clientX, event.clientY);
  }

  zoomTo(newZoom: number, clientX?: number, clientY?: number): void {
    newZoom = Math.max(0.2, Math.min(3.0, newZoom));
    if (Math.abs(newZoom - this.zoomLevel) < 0.001) return;

    const vp = this.canvasViewport?.nativeElement;
    if (!vp) {
      this.zoomLevel = newZoom;
      return;
    }

    const rect = vp.getBoundingClientRect();
    const mouseX = clientX !== undefined ? (clientX - rect.left) : (rect.width / 2);
    const mouseY = clientY !== undefined ? (clientY - rect.top) : (rect.height / 2);

    const contentX = (mouseX - this.panX) / this.zoomLevel;
    const contentY = (mouseY - this.panY) / this.zoomLevel;

    this.zoomLevel = newZoom;
    this.panX = Math.round(mouseX - contentX * newZoom);
    this.panY = Math.round(mouseY - contentY * newZoom);
    this.cdr.detectChanges();
  }

  setZoom(zoom: number): void {
    const clamped = Math.max(0.2, Math.min(3.0, Math.round(zoom * 100) / 100));
    this.zoomTo(clamped);
  }

  zoomIn(): void {
    const step = this.zoomLevel < 1.0 ? 0.1 : 0.15;
    const next = Math.min(3.0, Math.round((this.zoomLevel + step) * 100) / 100);
    this.zoomTo(next);
  }

  zoomOut(): void {
    const step = this.zoomLevel <= 1.0 ? 0.1 : 0.15;
    const next = Math.max(0.2, Math.round((this.zoomLevel - step) * 100) / 100);
    this.zoomTo(next);
  }

  // Reset to 100% and center panning
  resetTo100(): void {
    this.zoomLevel = 1.0;
    const vp = this.canvasViewport?.nativeElement;
    const pagesEl = this.pagesContainer?.nativeElement;
    if (!vp || !pagesEl) {
      this.panX = 0;
      this.panY = 32;
      this.cdr.detectChanges();
      return;
    }

    const vpRect = vp.getBoundingClientRect();
    const contentW = pagesEl.offsetWidth || 800;
    const firstPage = pagesEl.querySelector('.page-wrapper') as HTMLElement | null;
    const contentH = firstPage ? firstPage.offsetHeight : (pagesEl.offsetHeight || 1100);

    this.panX = Math.round((vpRect.width - contentW) / 2);
    if (contentH < vpRect.height) {
      this.panY = Math.max(24, Math.round((vpRect.height - contentH) / 2));
    } else {
      this.panY = 24;
    }
    this.cdr.detectChanges();
  }

  // Reset to Fit and center panning
  resetToFit(): void {
    const vp = this.canvasViewport?.nativeElement;
    const pagesEl = this.pagesContainer?.nativeElement;
    if (!vp || !pagesEl) return;

    const vpRect = vp.getBoundingClientRect();
    if (vpRect.width <= 0 || vpRect.height <= 0) return;

    const paddingX = 40;
    const paddingY = 40;
    const availW = Math.max(100, vpRect.width - paddingX * 2);
    const availH = Math.max(100, vpRect.height - paddingY * 2);

    const contentW = pagesEl.offsetWidth || 800;
    const firstPage = pagesEl.querySelector('.page-wrapper') as HTMLElement | null;
    const contentH = firstPage ? firstPage.offsetHeight : (pagesEl.offsetHeight || 1100);

    const scaleX = availW / contentW;
    const scaleY = availH / contentH;
    const fitZoom = Math.max(0.2, Math.min(2.0, Math.min(scaleX, scaleY)));

    this.zoomLevel = Math.round(fitZoom * 100) / 100;
    this.panX = Math.round((vpRect.width - contentW * this.zoomLevel) / 2);
    this.panY = Math.max(20, Math.round((vpRect.height - contentH * this.zoomLevel) / 2));
    this.cdr.detectChanges();
  }

  private updateCurrentSettings(): void {
    const baseDim = PAGE_DIMENSIONS[this.selectedPageType] || PAGE_DIMENSIONS.A4;
    let width = baseDim.width;
    let height = baseDim.height;

    if (this.selectedOrientation === 'landscape' && this.selectedPageType !== 'Receipt') {
      const temp = width;
      width = height;
      height = temp;
    }

    this.currentSettings = {
      ...this.template.settings,
      pageType: this.selectedPageType,
      orientation: this.selectedOrientation,
      width,
      height,
      continuous: this.isContinuous,
      margin: { ...this.template.settings.margin }
    };
  }

  /**
   * Fast initial page generation using safe estimated heights before DOM measurement
   */
  private generateEstimatedPages(): void {
    if (this.isContinuous) {
      this.pages = [{
        pageNumber: 1,
        totalPages: 1,
        pageHeader: this.templatePageHeader,
        reportHeader: this.templateReportHeader,
        bodyTableChunks: this.templateTable ? [{
          table: this.templateTable,
          showHeader: true,
          showFooter: true,
          items: this.allTableItems,
          startIndex: 0
        }] : [],
        otherBodyElements: this.otherBodyElements,
        reportFooter: this.templateReportFooter,
        pageFooter: this.templatePageFooter
      }];
      return;
    }

    // Conservative initial estimate: 12 items on page 1, 16 on subsequent pages
    const allItems = this.allTableItems;
    const table = this.templateTable;
    if (!table || allItems.length === 0) {
      this.pages = [{
        pageNumber: 1,
        totalPages: 1,
        pageHeader: this.templatePageHeader,
        reportHeader: this.templateReportHeader,
        bodyTableChunks: [],
        otherBodyElements: this.otherBodyElements,
        reportFooter: this.templateReportFooter,
        pageFooter: this.templatePageFooter
      }];
      return;
    }

    const initialPages: RenderedPage[] = [];
    let idx = 0;
    let pNum = 1;

    while (idx < allItems.length) {
      const isFirst = (pNum === 1);
      const rowsCount = isFirst ? 12 : 16;
      const chunk = allItems.slice(idx, idx + rowsCount);
      const isLast = (idx + chunk.length >= allItems.length);

      initialPages.push({
        pageNumber: pNum,
        totalPages: 0,
        pageHeader: this.templatePageHeader,
        reportHeader: isFirst ? this.templateReportHeader : undefined,
        bodyTableChunks: [{
          table,
          showHeader: isFirst || table.headerRow.repeatOnEveryPage !== false,
          showFooter: isLast,
          items: chunk,
          startIndex: idx
        }],
        otherBodyElements: isFirst ? this.otherBodyElements : [],
        reportFooter: isLast ? this.templateReportFooter : undefined,
        pageFooter: this.templatePageFooter
      });

      idx += chunk.length;
      pNum++;
    }

    for (const p of initialPages) {
      p.totalPages = initialPages.length;
    }
    this.pages = initialPages;
  }

  /**
   * Exact DOM pixel measurement and pagination:
   * Accurately accounts for dynamic row heights, section margins, and subpixel rendering
   * so no rows are ever skipped or clipped at page boundaries.
   */
  measureAndPaginate(): void {
    if (this.isContinuous) return;

    const containerEl = this.measureContainer?.nativeElement;
    if (!containerEl) {
      return;
    }

    // Measure exact printable width from offscreen container in pixels
    const containerWidthPx = containerEl.getBoundingClientRect().width;
    if (!containerWidthPx || containerWidthPx <= 0) return;

    const printableWidth = this.printableWidthMm;
    const pxPerMm = containerWidthPx / printableWidth;
    const printableHeightPx = this.printableHeightMm * pxPerMm;

    // Helper: Measure exact outer height of any section including its vertical margins
    const getOuterHeight = (el?: HTMLElement | null): number => {
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      const marginTop = parseFloat(style.marginTop) || 0;
      const marginBottom = parseFloat(style.marginBottom) || 0;
      return rect.height + marginTop + marginBottom;
    };

    const pageHeaderH = getOuterHeight(this.measurePageHeader?.nativeElement);
    const reportHeaderH = getOuterHeight(this.measureReportHeader?.nativeElement);
    const tableHeaderH = getOuterHeight(this.measureTableHeader?.nativeElement);
    const pageFooterH = getOuterHeight(this.measurePageFooter?.nativeElement);
    const reportFooterH = getOuterHeight(this.measureReportFooter?.nativeElement);

    // Bottom margin of section-body (4mm in CSS)
    const bodyStyle = this.measureBodySection?.nativeElement ? window.getComputedStyle(this.measureBodySection.nativeElement) : null;
    const bodyMarginBottomPx = bodyStyle ? (parseFloat(bodyStyle.marginBottom) || (4 * pxPerMm)) : (4 * pxPerMm);

    // Measure each individual row height using subpixel accuracy from actual rendered DOM
    const detailRowEls = this.measureDetailRows?.toArray() ?? [];
    const rowHeights: number[] = detailRowEls.map(el => el.nativeElement.getBoundingClientRect().height);

    const allItems = this.allTableItems;
    const table = this.templateTable;

    if (!table || allItems.length === 0) {
      this.pages = [{
        pageNumber: 1,
        totalPages: 1,
        pageHeader: this.templatePageHeader,
        reportHeader: this.templateReportHeader,
        bodyTableChunks: [],
        otherBodyElements: this.otherBodyElements,
        reportFooter: this.templateReportFooter,
        pageFooter: this.templatePageFooter
      }];
      this.cdr.detectChanges();
      return;
    }

    const computedPages: RenderedPage[] = [];
    let currentItemIdx = 0;
    let pageNumber = 1;

    // Safety buffer (6px ~ 1.5mm) to protect against subpixel font antialiasing and print engine rounding
    const safetyBufferPx = 6;

    while (currentItemIdx < allItems.length) {
      const isFirstPage = (pageNumber === 1);

      // Available vertical space for content between top and bottom margins:
      // Subtract page footer and body margin-bottom and safety buffer
      let availableHeight = printableHeightPx - pageFooterH - bodyMarginBottomPx - safetyBufferPx;

      if (this.templatePageHeader && (isFirstPage || this.templatePageHeader.repeatOnEveryPage !== false)) {
        availableHeight -= pageHeaderH;
      }

      if (isFirstPage && this.templateReportHeader) {
        availableHeight -= reportHeaderH;
      }

      const showTableHeader = isFirstPage || (table.headerRow.repeatOnEveryPage !== false);
      if (showTableHeader) {
        availableHeight -= tableHeaderH;
      }

      // Pack rows onto this page one by one without exceeding available height
      let usedHeight = 0;
      let rowsCount = 0;

      while (currentItemIdx + rowsCount < allItems.length) {
        const nextRowH = rowHeights[currentItemIdx + rowsCount] || (8 * pxPerMm);
        if (rowsCount > 0 && (usedHeight + nextRowH > availableHeight)) {
          // This row does not fit, break to next page
          break;
        }
        usedHeight += nextRowH;
        rowsCount++;
      }

      if (rowsCount === 0) {
        rowsCount = 1; // Always place at least one row
      }

      const chunkItems = allItems.slice(currentItemIdx, currentItemIdx + rowsCount);
      const remainingHeight = availableHeight - usedHeight;
      const isLastChunk = (currentItemIdx + rowsCount >= allItems.length);
      const canFitReportFooter = isLastChunk && this.templateReportFooter && (remainingHeight >= reportFooterH);

      computedPages.push({
        pageNumber,
        totalPages: 0,
        pageHeader: this.templatePageHeader,
        reportHeader: isFirstPage ? this.templateReportHeader : undefined,
        bodyTableChunks: [{
          table,
          showHeader: showTableHeader,
          showFooter: isLastChunk && !canFitReportFooter,
          items: chunkItems,
          startIndex: currentItemIdx
        }],
        otherBodyElements: isFirstPage ? this.otherBodyElements : [],
        reportFooter: canFitReportFooter ? this.templateReportFooter : undefined,
        pageFooter: this.templatePageFooter
      });

      // Next page starts EXACTLY where this page left off
      currentItemIdx += rowsCount;

      // If all items are rendered but report footer didn't fit, add a dedicated final page for report footer
      if (isLastChunk && this.templateReportFooter && !canFitReportFooter) {
        pageNumber++;
        computedPages.push({
          pageNumber,
          totalPages: 0,
          pageHeader: this.templatePageHeader,
          reportHeader: undefined,
          bodyTableChunks: [],
          otherBodyElements: [],
          reportFooter: this.templateReportFooter,
          pageFooter: this.templatePageFooter
        });
        break;
      }

      pageNumber++;
    }

    // Set totalPages on all pages
    const total = computedPages.length;
    for (const p of computedPages) {
      p.totalPages = total;
    }

    this.pages = computedPages;
    this.cdr.detectChanges();
  }

  isTable(element: BaseCell): element is ReportTable {
    return element.type === 'Table';
  }

  isTextOrField(element: BaseCell): element is TextCell | FieldCell {
    return element.type === 'Text' || element.type === 'Field';
  }

  resolveValue(cell: BaseCell, itemContext?: any, pageNumber = 1, totalPages = 1): string {
    if (cell.id === 'footer-page-number') {
      if (this.isContinuous) {
        return 'Continuous Roll (Receipt)';
      }
      return `Page ${pageNumber} of ${totalPages}`;
    }

    const field = cell as FieldCell;
    if (field.bindingKey) {
      const bound = this.getBoundValue(field.bindingKey, itemContext);
      if (bound !== undefined && bound !== null) {
        return this.formatValue(bound, field.formatter);
      }
    }
    const textCell = cell as TextCell;
    let val = textCell.value ?? textCell.staticText ?? '';
    if (typeof val === 'string') {
      val = val.replace(/\{\{pageNumber\}\}/g, String(pageNumber))
               .replace(/\{\{totalPages\}\}/g, String(totalPages));
    }
    return val;
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
