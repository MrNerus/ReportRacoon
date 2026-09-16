Viewed cell.model.ts:1-86
Viewed page.model.ts:1-34
Listed directory ReportRaccoon
Listed directory app

Designing a **Print Template Designer** for structured business documents (invoices, bills, grade sheets, vouchers) requires a clear distinction between **Template Design** and **Rendered Document**.

Here is an in-depth breakdown of how templates should work, what is missing in your current models, and how your UI/UX and data structures should be designed.

---

### 1. Fundamental Concept: Template Schema vs. Rendered Report

In your [page.model.ts](file:///c:/Users/HP/Documents/Projects/ReportRaccoon/src/app/model/page.model.ts#L24-L34), `Report` currently contains `pages: ReportPage[]`. 
* **The Problem:** Invoices and grade sheets have **variable data**. An invoice might have 2 line items (fits on 1 page) or 45 line items (requires 3 pages).
* **The Solution:** The template should define **Bands / Sections** and **Data Repeaters**, not fixed pages:
  1. **Page Header:** Repeats at the top of every page (logo, document title, page numbers).
  2. **Report / Document Header:** Appears only once at the start (customer details, invoice metadata).
  3. **Detail / Repeater Section (Table):** Repeats once for every row in `data.items` (description, qty, rate, amount). If it exceeds the page height, the engine pushes rows to the next page and re-prints table headers.
  4. **Report Summary / Footer:** Appears immediately after the data ends (subtotal, tax, grand total, signature).
  5. **Page Footer:** Anchored to the bottom of every page (terms, footer text, page 1 of N).

---

### 2. Analysis of Your Current Interfaces: Missing & Incomplete Features

#### In [cell.model.ts](file:///c:/Users/HP/Documents/Projects/ReportRaccoon/src/app/model/cell.model.ts):

1. **Grid Layout & Cell Positioning:**
   - In `GridCell`: you have `columns: number` and `children: BaseCell[]`.
   - In `BaseCell`: you have `rowSpan` and `colSpan`.
   - **Gap:** How does the renderer know *which* row and column a cell belongs to? If a cell spans 2 rows, a flat array without coordinates (`rowIndex`, `colIndex`) or nested rows (`rows: GridRow[]`) makes CSS grid/table rendering error-prone.
2. **Missing Row Height & Table Border Collapse:**
   - In invoices, borders between adjacent table cells need to merge (equivalent to `border-collapse: collapse`). Otherwise, adjacent 1px borders will appear as 2px borders.
   - Rows need sizing rules: `'auto'` (grows with wrapped text) vs `'fixed'` (strict height).
3. **Data Binding & Formatters (Critical for Invoices/Grades):**
   - You have `DateField` and `DateTimeField`, but reports require **Number & Currency formatting**:
     - Decimal places (e.g., `2` decimals for `$1,250.00`), thousands separators (`,` vs `.`), currency symbols (`$`, `€`, `Rs.`), percentage (`%`), or GPA roundings.
   - `BaseCell` only has `value?: string`. You need a `fieldKey` or `bindingPath` (e.g., `"customer.billingAddress.city"` or `"items[].totalAmount"`).
4. **Typography & Styling Gaps:**
   - `lineHeight`: Crucial for printing. Default browser line-heights cause unexpected page overflow.
   - `fontStyle`: In `TextDecoration`, you included `'italic'`. In CSS, `italic` is `font-style`, whereas `underline` / `line-through` is `text-decoration`. Separating them makes styling cleaner.
   - `letterSpacing` & `textTransform`: `'uppercase' | 'lowercase' | 'capitalize'` (common in invoice headers).
5. **Border Customization:**
   - Your border structure is good, but consider adding a shorthand / collapse flag and optional border radius for boxed summaries (like total amount boxes).

---

### 3. Recommended Interface Improvements

Here is an enhanced schema for [cell.model.ts](file:///c:/Users/HP/Documents/Projects/ReportRaccoon/src/app/model/cell.model.ts) and [page.model.ts](file:///c:/Users/HP/Documents/Projects/ReportRaccoon/src/app/model/page.model.ts):

```typescript
// --- FORMATTERS ---
export type NumberFormat = {
  type: 'number' | 'currency' | 'percent';
  decimals?: number;
  currencySymbol?: string;
  useGrouping?: boolean; // 1,000 vs 1000
};

export type DateFormat = {
  type: 'date' | 'datetime' | 'time';
  pattern: string; // e.g. 'yyyy-MM-dd', 'dd/MM/yyyy HH:mm'
};

// --- BORDERS & BOX MODEL ---
export interface BorderSide {
  width: number; // in pt or px
  color: string;
  style: 'solid' | 'dashed' | 'dotted' | 'double' | 'none';
}

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

// --- BASE CELL ---
export interface BaseCell {
  id: string; // Unique ID for designer selection
  type: 'Text' | 'Field' | 'Table' | 'Grid' | 'Image' | 'Line';
  
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

// --- TEXT & FIELD CELLS ---
export interface TextCell extends BaseCell {
  type: 'Text' | 'Field';
  
  // Static content or data-binding path
  staticText?: string;
  bindingKey?: string; // e.g., 'invoice.customerName' or 'item.rate'
  formatter?: NumberFormat | DateFormat;

  // Typography
  fontFamily?: string;
  fontSize: number; // in pt (standard for print)
  fontWeight: 'normal' | 'bold' | '500' | '600' | '700';
  fontStyle?: 'normal' | 'italic';
  textDecoration?: 'none' | 'underline' | 'line-through';
  color?: string;
  lineHeight?: number; // e.g., 1.2, 1.4

  // Alignment & Overflow
  textAlign: 'left' | 'center' | 'right' | 'justify';
  verticalAlign: 'top' | 'middle' | 'bottom';
  overflow: 'wrap' | 'truncate' | 'clip'; // 'wrap' = word-wrap, 'truncate' = ellipsis
}

// --- DYNAMIC REPEATER TABLE (For Invoices & Grade Sheets) ---
export interface ReportTable extends BaseCell {
  type: 'Table';
  datasetKey: string; // e.g. "invoice.lineItems" or "student.marks"
  borderCollapse?: boolean;
  
  columns: {
    id: string;
    header: string;
    width: { type: 'auto' | 'fixed' | 'percentage'; value?: number };
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
```

#### Updated Template & Page Models:

```typescript
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
```

---

### 4. How the Designer Interface Should Look & Function

A high-productivity print template designer typically uses a **3-Panel Layout**:

```
+-------------------+--------------------------------------------+----------------------+
| 1. DATA & TOOLS   | 2. DESIGN CANVAS (with mm Rulers)          | 3. PROPERTY PANEL    |
|                   | [Zoom: 100%] [Grid: 5mm] [Preview / Code]  |                      |
| [+] Components    | ------------------------------------------ | Selected: Cell (1,2) |
|  - Label / Text   | | [PAGE HEADER]                          | | Typography:          |
|  - Bound Field    | |   [Logo]              INVOICE #{{num}} | |  Font: Inter, 10pt  |
|  - Dynamic Table  | |----------------------------------------| |  [B] [I] [U]         |
|  - Line / Divider | | [REPORT HEADER]                        | |  Align: [L][C][R][J] |
|                   | |   Billed To: {{customer.name}}         | |  V-Align: [T][M][B]  |
| Data Fields:      | |----------------------------------------| |  Wrap: [Wrap][Ellip] |
|  v invoice        | | [TABLE: invoice.items]                 | | Borders (4-Sides):   |
|    - invoiceNo    | |   | Item | Qty | Rate | Total |        | |  Top: [---] 1pt Solid|
|    - date         | |   | {{desc}} | {{qty}} | {{total}} |   | |  Bot: [---] 1pt Dott |
|  v items []       | |----------------------------------------| | Format:              |
|    - description  | | [PAGE FOOTER]                          | |  Type: Currency ($)  |
|    - amount       | |   Page {{pageNo}} of {{totalPages}}    | |  Decimals: 2         |
+-------------------+--------------------------------------------+----------------------+
```

#### Key UI Components to Implement:

1. **Canvas View (Center):**
   - **Physical Page Boundary:** Render the exact sheet (e.g., A4 is `210mm x 297mm`) with drop shadow.
   - **Margin Guidelines:** Dashed boundaries indicating unprintable margins.
   - **Grid & Snapping:** Snap to 1mm / 5mm or column guides.
   - **Table Editor Interactions:**
     - Click and drag column dividers to resize widths.
     - Right-click cell context menu: *Merge Cells (ColSpan/RowSpan)*, *Split Cell*, *Insert Row Above/Below*.
2. **Properties Inspector (Right Panel):**
   - **Alignment Control:** Visual segmented buttons for horizontal (`L`, `C`, `R`, `Justify`) and vertical (`Top`, `Middle`, `Bottom`).
   - **Overflow Mode:** Toggle switch between `Wrap text` and `Truncate with ...`.
   - **Border Box Widget:** An interactive square where clicking top/bottom/left/right activates that border, followed by style (`solid`, `dotted`, `dashed`), width, and color pickers.
   - **Data Binding Autocomplete:** When editing a `Field` cell, display a dropdown of available JSON properties from your sample data schema.
3. **Live "Preview with Data" Mode:**
   - A toggle switch at the top to flip between **Designer View** and **Evaluated Print View**.
   - Accepts a sample JSON payload and runs through the pagination engine so users can see how a 30-item table paginates into 2 pages before printing.

### Recommended Next Steps
Would you like to focus next on:
1. Refining the TypeScript interfaces in your workspace?
2. Building the **Table/Grid rendering engine** (CSS Grid / Table calculation with colSpan/rowSpan)?
3. Designing the **Property Inspector panel** component in Angular?