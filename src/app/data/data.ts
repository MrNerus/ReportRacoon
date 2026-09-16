import { ReportTemplate } from "../model/page.model";
import { ReportTable, TextCell, FieldCell } from "../model/cell.model";

/**
 * Sample Invoice Data Payload
 * This represents the dynamic dataset bound to template fields and repeater tables.
 */
export const sampleInvoiceData = {
    invoice: {
        invoiceNumber: 'INV-2026-0042',
        poNumber: 'PO-98214',
        issueDate: '2026-09-15',
        dueDate: '2026-10-15',
        status: 'PAID',
        currency: 'USD',
        company: {
            name: 'Report Raccoon Technologies Inc.',
            tagline: 'Enterprise Document & Report Automation',
            address: '100 Innovation Boulevard, Suite 500',
            cityStateZip: 'San Francisco, CA 94105, USA',
            taxId: 'US-94-3829104',
            email: 'billing@reportraccoon.io',
            phone: '+1 (415) 555-0199',
            website: 'www.reportraccoon.io'
        },
        customer: {
            name: 'Alex Morgan',
            company: 'Acme Cloud Dynamics LLC',
            department: 'Procurement & IT Infrastructure',
            address: '742 Evergreen Terrace, Suite 210',
            cityStateZip: 'Springfield, OR 97477, USA',
            taxId: 'US-88-4920194',
            email: 'accounts.payable@acmedynamics.com',
            phone: '+1 (541) 555-0143'
        },
        items: [
            {
                index: 1,
                description: 'Report Raccoon Enterprise License (Annual Subscription - 100 Seats)',
                quantity: 1,
                unitPrice: 2400.00,
                discount: 200.00,
                total: 2200.00
            },
            {
                index: 2,
                description: 'High-Throughput PDF & Print Generation Engine (Tier 2 Addon)',
                quantity: 2,
                unitPrice: 450.00,
                discount: 0.00,
                total: 900.00
            },
            {
                index: 3,
                description: 'Custom ERP Data Connectors & Onboarding Consultation',
                quantity: 8,
                unitPrice: 125.00,
                discount: 50.00,
                total: 950.00
            },
            {
                index: 4,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 5,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 6,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 7,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 8,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 9,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 10,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 11,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 12,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 13,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 14,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 15,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 16,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 17,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 18,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 19,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 20,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 21,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 22,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 23,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 24,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 25,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 26,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 27,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 28,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 29,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 30,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 31,
                description: 'Report Raccoon Enterprise License (Annual Subscription - 100 Seats)',
                quantity: 1,
                unitPrice: 2400.00,
                discount: 200.00,
                total: 2200.00
            },
            {
                index: 32,
                description: 'High-Throughput PDF & Print Generation Engine (Tier 2 Addon)',
                quantity: 2,
                unitPrice: 450.00,
                discount: 0.00,
                total: 900.00
            },
            {
                index: 33,
                description: 'Custom ERP Data Connectors & Onboarding Consultation',
                quantity: 8,
                unitPrice: 125.00,
                discount: 50.00,
                total: 950.00
            },
            {
                index: 34,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 35,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 36,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 37,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 38,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 39,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 40,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 41,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 42,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 43,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 44,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 45,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 46,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 47,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 48,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 49,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 50,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 51,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 52,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 53,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 54,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 55,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 56,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 57,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 58,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 59,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
            {
                index: 60,
                description: 'Dedicated 24/7 SLA Technical Support & Maintenance (Q3)',
                quantity: 1,
                unitPrice: 600.00,
                discount: 0.00,
                total: 600.00
            },
        ],
        subtotal: 4650.00,
        discountTotal: 250.00,
        taxPercent: 8.5,
        taxAmount: 395.25,
        shippingFee: 0.00,
        grandTotal: 5045.25,
        notes: 'Thank you for your business! Payment has been verified and settled via ACH transfer.',
        paymentTerms: 'Net 30 Days',
        paymentMethod: 'Wire Transfer / ACH',
        bankDetails: {
            bankName: 'Silicon Valley Commercial Bank',
            accountName: 'Report Raccoon Technologies Inc.',
            accountNumber: '••••••••4928',
            routingNumber: '121000358',
            swiftCode: 'SVCBUS33'
        }
    }
};

/**
 * Sample Report Template for a Standard Commercial Invoice (A4 Portrait)
 */
export const report: ReportTemplate = {
    id: 'template-invoice-001',
    title: 'Commercial Tax Invoice',
    settings: {
        pageType: 'A4',
        orientation: 'portrait',
        width: 210, // mm
        height: 297, // mm
        margin: {
            top: 12,
            bottom: 12,
            left: 12,
            right: 12
        }
    },
    sections: [
        // ==========================================
        // 1. PAGE HEADER (Repeats on top of pages)
        // ==========================================
        {
            id: 'sec-page-header',
            name: 'Page Header',
            type: 'pageHeader',
            height: { type: 'fixed', value: 28 },
            repeatOnEveryPage: true,
            elements: [
                // Company Brand / Title
                <TextCell>{
                    id: 'header-company-name',
                    type: 'Text',
                    value: 'REPORT RACCOON TECHNOLOGIES',
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: '#0f172a',
                    fontFamily: 'Inter, sans-serif',
                    inlineAlignment: 'left',
                    blockAlignment: 'top',
                    overflow: 'word-wrap',
                    rowIndex: 0,
                    colIndex: 0,
                    colSpan: 6,
                    padding: { top: 0, bottom: 2, left: 0, right: 0 }
                },
                <TextCell>{
                    id: 'header-company-sub',
                    type: 'Text',
                    value: 'Enterprise Document & Print Solutions  |  www.reportraccoon.io',
                    fontSize: 8,
                    fontWeight: 'normal',
                    color: '#64748b',
                    fontFamily: 'Inter, sans-serif',
                    inlineAlignment: 'left',
                    blockAlignment: 'top',
                    overflow: 'word-wrap',
                    rowIndex: 1,
                    colIndex: 0,
                    colSpan: 6,
                    padding: { top: 0, bottom: 0, left: 0, right: 0 }
                },
                // Document Title Right-Aligned
                <TextCell>{
                    id: 'header-doc-title',
                    type: 'Text',
                    value: 'TAX INVOICE',
                    fontSize: 20,
                    fontWeight: '700',
                    color: '#1e293b',
                    fontFamily: 'Inter, sans-serif',
                    inlineAlignment: 'right',
                    blockAlignment: 'top',
                    overflow: 'clip',
                    rowIndex: 0,
                    colIndex: 6,
                    colSpan: 6,
                    padding: { top: 0, bottom: 2, left: 0, right: 0 }
                },
                <FieldCell>{
                    id: 'header-invoice-status',
                    type: 'Field',
                    bindingKey: 'invoice.status',
                    value: 'PAID',
                    fontSize: 9,
                    fontWeight: 'bold',
                    color: '#15803d',
                    fontFamily: 'Inter, sans-serif',
                    inlineAlignment: 'right',
                    blockAlignment: 'top',
                    overflow: 'clip',
                    rowIndex: 1,
                    colIndex: 6,
                    colSpan: 6,
                    padding: { top: 1, bottom: 1, left: 4, right: 4 }
                }
            ]
        },

        // ==========================================
        // 2. REPORT HEADER (Appears once at the start)
        // ==========================================
        {
            id: 'sec-report-header',
            name: 'Report Header / Invoice Details',
            type: 'reportHeader',
            height: { type: 'auto', value: 46 },
            repeatOnEveryPage: false,
            elements: [
                // --- Bill To Column ---
                <TextCell>{
                    id: 'lbl-billed-to',
                    type: 'Text',
                    value: 'BILLED TO:',
                    fontSize: 8,
                    fontWeight: 'bold',
                    color: '#64748b',
                    inlineAlignment: 'left',
                    blockAlignment: 'middle',
                    overflow: 'clip',
                    rowIndex: 0,
                    colIndex: 0,
                    colSpan: 6,
                    padding: { top: 4, bottom: 2, left: 0, right: 0 }
                },
                <FieldCell>{
                    id: 'fld-customer-name',
                    type: 'Field',
                    bindingKey: 'invoice.customer.name',
                    value: 'Alex Morgan',
                    fontSize: 11,
                    fontWeight: 'bold',
                    color: '#0f172a',
                    inlineAlignment: 'left',
                    blockAlignment: 'middle',
                    overflow: 'word-wrap',
                    rowIndex: 1,
                    colIndex: 0,
                    colSpan: 6,
                    padding: { top: 1, bottom: 1, left: 0, right: 0 }
                },
                <FieldCell>{
                    id: 'fld-customer-company',
                    type: 'Field',
                    bindingKey: 'invoice.customer.company',
                    value: 'Acme Cloud Dynamics LLC',
                    fontSize: 9,
                    fontWeight: '500',
                    color: '#334155',
                    inlineAlignment: 'left',
                    blockAlignment: 'middle',
                    overflow: 'word-wrap',
                    rowIndex: 2,
                    colIndex: 0,
                    colSpan: 6,
                    padding: { top: 1, bottom: 1, left: 0, right: 0 }
                },
                <FieldCell>{
                    id: 'fld-customer-address',
                    type: 'Field',
                    bindingKey: 'invoice.customer.address',
                    value: '742 Evergreen Terrace, Suite 210',
                    fontSize: 8.5,
                    fontWeight: 'normal',
                    color: '#475569',
                    inlineAlignment: 'left',
                    blockAlignment: 'middle',
                    overflow: 'word-wrap',
                    rowIndex: 3,
                    colIndex: 0,
                    colSpan: 6,
                    padding: { top: 1, bottom: 1, left: 0, right: 0 }
                },
                <FieldCell>{
                    id: 'fld-customer-tax',
                    type: 'Field',
                    bindingKey: 'invoice.customer.taxId',
                    value: 'Tax ID: US-88-4920194',
                    fontSize: 8,
                    fontWeight: 'normal',
                    color: '#64748b',
                    inlineAlignment: 'left',
                    blockAlignment: 'middle',
                    overflow: 'clip',
                    rowIndex: 4,
                    colIndex: 0,
                    colSpan: 6,
                    padding: { top: 2, bottom: 6, left: 0, right: 0 }
                },

                // --- Invoice Metadata Column (Right) ---
                <TextCell>{
                    id: 'lbl-inv-num',
                    type: 'Text',
                    value: 'Invoice Number:',
                    fontSize: 8.5,
                    fontWeight: '600',
                    color: '#64748b',
                    inlineAlignment: 'right',
                    blockAlignment: 'middle',
                    overflow: 'clip',
                    rowIndex: 0,
                    colIndex: 7,
                    colSpan: 2,
                    padding: { top: 2, bottom: 2, left: 0, right: 4 }
                },
                <FieldCell>{
                    id: 'fld-inv-num',
                    type: 'Field',
                    bindingKey: 'invoice.invoiceNumber',
                    value: 'INV-2026-0042',
                    fontSize: 9,
                    fontWeight: 'bold',
                    color: '#0f172a',
                    inlineAlignment: 'right',
                    blockAlignment: 'middle',
                    overflow: 'clip',
                    rowIndex: 0,
                    colIndex: 9,
                    colSpan: 3,
                    padding: { top: 2, bottom: 2, left: 0, right: 0 }
                },

                <TextCell>{
                    id: 'lbl-inv-date',
                    type: 'Text',
                    value: 'Issue Date:',
                    fontSize: 8.5,
                    fontWeight: '600',
                    color: '#64748b',
                    inlineAlignment: 'right',
                    blockAlignment: 'middle',
                    overflow: 'clip',
                    rowIndex: 1,
                    colIndex: 7,
                    colSpan: 2,
                    padding: { top: 2, bottom: 2, left: 0, right: 4 }
                },
                <FieldCell>{
                    id: 'fld-inv-date',
                    type: 'Field',
                    bindingKey: 'invoice.issueDate',
                    value: 'Sep 15, 2026',
                    formatter: { type: 'date', pattern: 'MMM dd, yyyy' },
                    fontSize: 8.5,
                    fontWeight: 'normal',
                    color: '#1e293b',
                    inlineAlignment: 'right',
                    blockAlignment: 'middle',
                    overflow: 'clip',
                    rowIndex: 1,
                    colIndex: 9,
                    colSpan: 3,
                    padding: { top: 2, bottom: 2, left: 0, right: 0 }
                },

                <TextCell>{
                    id: 'lbl-inv-due',
                    type: 'Text',
                    value: 'Due Date:',
                    fontSize: 8.5,
                    fontWeight: '600',
                    color: '#64748b',
                    inlineAlignment: 'right',
                    blockAlignment: 'middle',
                    overflow: 'clip',
                    rowIndex: 2,
                    colIndex: 7,
                    colSpan: 2,
                    padding: { top: 2, bottom: 2, left: 0, right: 4 }
                },
                <FieldCell>{
                    id: 'fld-inv-due',
                    type: 'Field',
                    bindingKey: 'invoice.dueDate',
                    value: 'Oct 15, 2026',
                    formatter: { type: 'date', pattern: 'MMM dd, yyyy' },
                    fontSize: 8.5,
                    fontWeight: 'normal',
                    color: '#1e293b',
                    inlineAlignment: 'right',
                    blockAlignment: 'middle',
                    overflow: 'clip',
                    rowIndex: 2,
                    colIndex: 9,
                    colSpan: 3,
                    padding: { top: 2, bottom: 2, left: 0, right: 0 }
                },

                <TextCell>{
                    id: 'lbl-inv-po',
                    type: 'Text',
                    value: 'P.O. Number:',
                    fontSize: 8.5,
                    fontWeight: '600',
                    color: '#64748b',
                    inlineAlignment: 'right',
                    blockAlignment: 'middle',
                    overflow: 'clip',
                    rowIndex: 3,
                    colIndex: 7,
                    colSpan: 2,
                    padding: { top: 2, bottom: 2, left: 0, right: 4 }
                },
                <FieldCell>{
                    id: 'fld-inv-po',
                    type: 'Field',
                    bindingKey: 'invoice.poNumber',
                    value: 'PO-98214',
                    fontSize: 8.5,
                    fontWeight: 'normal',
                    color: '#1e293b',
                    inlineAlignment: 'right',
                    blockAlignment: 'middle',
                    overflow: 'clip',
                    rowIndex: 3,
                    colIndex: 9,
                    colSpan: 3,
                    padding: { top: 2, bottom: 6, left: 0, right: 0 }
                }
            ]
        },

        // ==========================================
        // 3. BODY (Dynamic Table Repeater)
        // ==========================================
        {
            id: 'sec-body-table',
            name: 'Invoice Items Table',
            type: 'body',
            height: { type: 'auto', value: 80 },
            elements: [
                <ReportTable>{
                    id: 'table-invoice-items',
                    type: 'Table',
                    datasetKey: 'invoice.items',
                    borderCollapse: true,
                    columns: [
                        { id: 'col-idx', header: '#', width: { type: 'fixed', value: 12 }, align: 'center' },
                        { id: 'col-desc', header: 'Item & Description', width: { type: 'space-available' }, align: 'left' },
                        { id: 'col-qty', header: 'Qty', width: { type: 'fixed', value: 18 }, align: 'right' },
                        { id: 'col-price', header: 'Rate ($)', width: { type: 'fixed', value: 28 }, align: 'right' },
                        { id: 'col-disc', header: 'Disc ($)', width: { type: 'fixed', value: 22 }, align: 'right' },
                        { id: 'col-total', header: 'Amount ($)', width: { type: 'fixed', value: 30 }, align: 'right' }
                    ],
                    headerRow: {
                        height: 9,
                        repeatOnEveryPage: true,
                        cells: [
                            <TextCell>{
                                id: 'th-idx',
                                type: 'Text',
                                value: '#',
                                fontSize: 8.5,
                                fontWeight: 'bold',
                                color: '#334155',
                                background: '#f8fafc',
                                inlineAlignment: 'center',
                                blockAlignment: 'middle',
                                overflow: 'clip',
                                border: {
                                    top: { width: 1, color: '#cbd5e1', style: 'solid' },
                                    bottom: { width: 1.5, color: '#94a3b8', style: 'solid' }
                                },
                                padding: { top: 3, bottom: 3, left: 2, right: 2 }
                            },
                            <TextCell>{
                                id: 'th-desc',
                                type: 'Text',
                                value: 'Item & Description',
                                fontSize: 8.5,
                                fontWeight: 'bold',
                                color: '#334155',
                                background: '#f8fafc',
                                inlineAlignment: 'left',
                                blockAlignment: 'middle',
                                overflow: 'clip',
                                border: {
                                    top: { width: 1, color: '#cbd5e1', style: 'solid' },
                                    bottom: { width: 1.5, color: '#94a3b8', style: 'solid' }
                                },
                                padding: { top: 3, bottom: 3, left: 4, right: 4 }
                            },
                            <TextCell>{
                                id: 'th-qty',
                                type: 'Text',
                                value: 'Qty',
                                fontSize: 8.5,
                                fontWeight: 'bold',
                                color: '#334155',
                                background: '#f8fafc',
                                inlineAlignment: 'right',
                                blockAlignment: 'middle',
                                overflow: 'clip',
                                border: {
                                    top: { width: 1, color: '#cbd5e1', style: 'solid' },
                                    bottom: { width: 1.5, color: '#94a3b8', style: 'solid' }
                                },
                                padding: { top: 3, bottom: 3, left: 2, right: 4 }
                            },
                            <TextCell>{
                                id: 'th-price',
                                type: 'Text',
                                value: 'Rate ($)',
                                fontSize: 8.5,
                                fontWeight: 'bold',
                                color: '#334155',
                                background: '#f8fafc',
                                inlineAlignment: 'right',
                                blockAlignment: 'middle',
                                overflow: 'clip',
                                border: {
                                    top: { width: 1, color: '#cbd5e1', style: 'solid' },
                                    bottom: { width: 1.5, color: '#94a3b8', style: 'solid' }
                                },
                                padding: { top: 3, bottom: 3, left: 2, right: 4 }
                            },
                            <TextCell>{
                                id: 'th-disc',
                                type: 'Text',
                                value: 'Disc ($)',
                                fontSize: 8.5,
                                fontWeight: 'bold',
                                color: '#334155',
                                background: '#f8fafc',
                                inlineAlignment: 'right',
                                blockAlignment: 'middle',
                                overflow: 'clip',
                                border: {
                                    top: { width: 1, color: '#cbd5e1', style: 'solid' },
                                    bottom: { width: 1.5, color: '#94a3b8', style: 'solid' }
                                },
                                padding: { top: 3, bottom: 3, left: 2, right: 4 }
                            },
                            <TextCell>{
                                id: 'th-total',
                                type: 'Text',
                                value: 'Amount ($)',
                                fontSize: 8.5,
                                fontWeight: 'bold',
                                color: '#334155',
                                background: '#f8fafc',
                                inlineAlignment: 'right',
                                blockAlignment: 'middle',
                                overflow: 'clip',
                                border: {
                                    top: { width: 1, color: '#cbd5e1', style: 'solid' },
                                    bottom: { width: 1.5, color: '#94a3b8', style: 'solid' }
                                },
                                padding: { top: 3, bottom: 3, left: 2, right: 4 }
                            }
                        ]
                    },
                    detailRow: {
                        height: 9,
                        cells: [
                            <FieldCell>{
                                id: 'td-idx',
                                type: 'Field',
                                bindingKey: 'item.index',
                                fontSize: 8.5,
                                fontWeight: 'normal',
                                color: '#64748b',
                                inlineAlignment: 'center',
                                blockAlignment: 'middle',
                                overflow: 'clip',
                                border: {
                                    bottom: { width: 0.5, color: '#e2e8f0', style: 'solid' }
                                },
                                padding: { top: 3, bottom: 3, left: 2, right: 2 }
                            },
                            <FieldCell>{
                                id: 'td-desc',
                                type: 'Field',
                                bindingKey: 'item.description',
                                fontSize: 8.5,
                                fontWeight: 'normal',
                                color: '#1e293b',
                                inlineAlignment: 'left',
                                blockAlignment: 'middle',
                                overflow: 'word-wrap',
                                border: {
                                    bottom: { width: 0.5, color: '#e2e8f0', style: 'solid' }
                                },
                                padding: { top: 3, bottom: 3, left: 4, right: 4 }
                            },
                            <FieldCell>{
                                id: 'td-qty',
                                type: 'Field',
                                bindingKey: 'item.quantity',
                                formatter: { type: 'number', decimals: 0, useGrouping: true },
                                fontSize: 8.5,
                                fontWeight: 'normal',
                                color: '#334155',
                                inlineAlignment: 'right',
                                blockAlignment: 'middle',
                                overflow: 'clip',
                                border: {
                                    bottom: { width: 0.5, color: '#e2e8f0', style: 'solid' }
                                },
                                padding: { top: 3, bottom: 3, left: 2, right: 4 }
                            },
                            <FieldCell>{
                                id: 'td-price',
                                type: 'Field',
                                bindingKey: 'item.unitPrice',
                                formatter: { type: 'currency', currencySymbol: '$', decimals: 2, useGrouping: true },
                                fontSize: 8.5,
                                fontWeight: 'normal',
                                color: '#334155',
                                inlineAlignment: 'right',
                                blockAlignment: 'middle',
                                overflow: 'clip',
                                border: {
                                    bottom: { width: 0.5, color: '#e2e8f0', style: 'solid' }
                                },
                                padding: { top: 3, bottom: 3, left: 2, right: 4 }
                            },
                            <FieldCell>{
                                id: 'td-disc',
                                type: 'Field',
                                bindingKey: 'item.discount',
                                formatter: { type: 'currency', currencySymbol: '$', decimals: 2, useGrouping: true },
                                fontSize: 8.5,
                                fontWeight: 'normal',
                                color: '#64748b',
                                inlineAlignment: 'right',
                                blockAlignment: 'middle',
                                overflow: 'clip',
                                border: {
                                    bottom: { width: 0.5, color: '#e2e8f0', style: 'solid' }
                                },
                                padding: { top: 3, bottom: 3, left: 2, right: 4 }
                            },
                            <FieldCell>{
                                id: 'td-total',
                                type: 'Field',
                                bindingKey: 'item.total',
                                formatter: { type: 'currency', currencySymbol: '$', decimals: 2, useGrouping: true },
                                fontSize: 8.5,
                                fontWeight: '500',
                                color: '#0f172a',
                                inlineAlignment: 'right',
                                blockAlignment: 'middle',
                                overflow: 'clip',
                                border: {
                                    bottom: { width: 0.5, color: '#e2e8f0', style: 'solid' }
                                },
                                padding: { top: 3, bottom: 3, left: 2, right: 4 }
                            }
                        ]
                    }
                }
            ]
        },

        // ==========================================
        // 4. REPORT FOOTER (Summary, Bank & Signature)
        // ==========================================
        {
            id: 'sec-report-footer',
            name: 'Report Summary & Payment',
            type: 'reportFooter',
            height: { type: 'auto', value: 65 },
            repeatOnEveryPage: false,
            elements: [
                // Payment Notes / Bank Info (Left Column)
                <TextCell>{
                    id: 'lbl-payment-info',
                    type: 'Text',
                    value: 'PAYMENT INSTRUCTIONS & BANK DETAILS',
                    fontSize: 8,
                    fontWeight: 'bold',
                    color: '#475569',
                    inlineAlignment: 'left',
                    blockAlignment: 'middle',
                    overflow: 'clip',
                    rowIndex: 0,
                    colIndex: 0,
                    colSpan: 7,
                    padding: { top: 8, bottom: 2, left: 0, right: 0 }
                },
                <TextCell>{
                    id: 'txt-bank-details',
                    type: 'Text',
                    value: 'Bank: Silicon Valley Commercial Bank\nAccount Name: Report Raccoon Technologies Inc.\nAccount No: ••••••••4928 | Routing: 121000358\nSWIFT: SVCBUS33 | Method: Wire Transfer / ACH',
                    fontSize: 8,
                    fontWeight: 'normal',
                    color: '#64748b',
                    lineHeight: 1.4,
                    inlineAlignment: 'left',
                    blockAlignment: 'top',
                    overflow: 'word-wrap',
                    rowIndex: 1,
                    colIndex: 0,
                    colSpan: 7,
                    padding: { top: 2, bottom: 4, left: 0, right: 0 }
                },
                <FieldCell>{
                    id: 'fld-invoice-notes',
                    type: 'Field',
                    bindingKey: 'invoice.notes',
                    value: 'Thank you for your business! Payment has been verified and settled via ACH transfer.',
                    fontSize: 8,
                    fontStyle: 'italic',
                    fontWeight: 'normal',
                    color: '#64748b',
                    inlineAlignment: 'left',
                    blockAlignment: 'top',
                    overflow: 'word-wrap',
                    rowIndex: 2,
                    colIndex: 0,
                    colSpan: 7,
                    padding: { top: 4, bottom: 4, left: 0, right: 0 }
                },

                // Summary Totals Breakdown (Right Column)
                <TextCell>{
                    id: 'lbl-subtotal',
                    type: 'Text',
                    value: 'Subtotal:',
                    fontSize: 8.5,
                    fontWeight: '500',
                    color: '#64748b',
                    inlineAlignment: 'right',
                    blockAlignment: 'middle',
                    overflow: 'clip',
                    rowIndex: 0,
                    colIndex: 8,
                    colSpan: 2,
                    padding: { top: 4, bottom: 2, left: 0, right: 4 }
                },
                <FieldCell>{
                    id: 'fld-subtotal',
                    type: 'Field',
                    bindingKey: 'invoice.subtotal',
                    value: '$4,650.00',
                    formatter: { type: 'currency', currencySymbol: '$', decimals: 2, useGrouping: true },
                    fontSize: 8.5,
                    fontWeight: '500',
                    color: '#1e293b',
                    inlineAlignment: 'right',
                    blockAlignment: 'middle',
                    overflow: 'clip',
                    rowIndex: 0,
                    colIndex: 10,
                    colSpan: 2,
                    padding: { top: 4, bottom: 2, left: 0, right: 0 }
                },

                <TextCell>{
                    id: 'lbl-discount',
                    type: 'Text',
                    value: 'Discount Total:',
                    fontSize: 8.5,
                    fontWeight: 'normal',
                    color: '#64748b',
                    inlineAlignment: 'right',
                    blockAlignment: 'middle',
                    overflow: 'clip',
                    rowIndex: 1,
                    colIndex: 8,
                    colSpan: 2,
                    padding: { top: 2, bottom: 2, left: 0, right: 4 }
                },
                <FieldCell>{
                    id: 'fld-discount',
                    type: 'Field',
                    bindingKey: 'invoice.discountTotal',
                    value: '-$250.00',
                    formatter: { type: 'currency', currencySymbol: '$', decimals: 2, useGrouping: true },
                    fontSize: 8.5,
                    fontWeight: 'normal',
                    color: '#16a34a',
                    inlineAlignment: 'right',
                    blockAlignment: 'middle',
                    overflow: 'clip',
                    rowIndex: 1,
                    colIndex: 10,
                    colSpan: 2,
                    padding: { top: 2, bottom: 2, left: 0, right: 0 }
                },

                <TextCell>{
                    id: 'lbl-tax',
                    type: 'Text',
                    value: 'Tax (8.5%):',
                    fontSize: 8.5,
                    fontWeight: 'normal',
                    color: '#64748b',
                    inlineAlignment: 'right',
                    blockAlignment: 'middle',
                    overflow: 'clip',
                    rowIndex: 2,
                    colIndex: 8,
                    colSpan: 2,
                    padding: { top: 2, bottom: 2, left: 0, right: 4 }
                },
                <FieldCell>{
                    id: 'fld-tax',
                    type: 'Field',
                    bindingKey: 'invoice.taxAmount',
                    value: '$395.25',
                    formatter: { type: 'currency', currencySymbol: '$', decimals: 2, useGrouping: true },
                    fontSize: 8.5,
                    fontWeight: 'normal',
                    color: '#1e293b',
                    inlineAlignment: 'right',
                    blockAlignment: 'middle',
                    overflow: 'clip',
                    rowIndex: 2,
                    colIndex: 10,
                    colSpan: 2,
                    padding: { top: 2, bottom: 2, left: 0, right: 0 }
                },

                <TextCell>{
                    id: 'lbl-grand-total',
                    type: 'Text',
                    value: 'Total Due:',
                    fontSize: 10,
                    fontWeight: 'bold',
                    color: '#0f172a',
                    inlineAlignment: 'right',
                    blockAlignment: 'middle',
                    overflow: 'clip',
                    border: {
                        top: { width: 1.5, color: '#0f172a', style: 'solid' }
                    },
                    rowIndex: 3,
                    colIndex: 8,
                    colSpan: 2,
                    padding: { top: 4, bottom: 4, left: 0, right: 4 }
                },
                <FieldCell>{
                    id: 'fld-grand-total',
                    type: 'Field',
                    bindingKey: 'invoice.grandTotal',
                    value: '$5,045.25',
                    formatter: { type: 'currency', currencySymbol: '$', decimals: 2, useGrouping: true },
                    fontSize: 11,
                    fontWeight: 'bold',
                    color: '#0f172a',
                    inlineAlignment: 'right',
                    blockAlignment: 'middle',
                    overflow: 'clip',
                    border: {
                        top: { width: 1.5, color: '#0f172a', style: 'solid' }
                    },
                    rowIndex: 3,
                    colIndex: 10,
                    colSpan: 2,
                    padding: { top: 4, bottom: 4, left: 0, right: 0 }
                }
            ]
        },

        // ==========================================
        // 5. PAGE FOOTER (Bottom of every page)
        // ==========================================
        {
            id: 'sec-page-footer',
            name: 'Page Footer',
            type: 'pageFooter',
            height: { type: 'fixed', value: 12 },
            repeatOnEveryPage: true,
            elements: [
                <TextCell>{
                    id: 'footer-terms',
                    type: 'Text',
                    value: 'Questions? Email us at billing@reportraccoon.io or call +1 (415) 555-0199',
                    fontSize: 7.5,
                    fontWeight: 'normal',
                    color: '#94a3b8',
                    inlineAlignment: 'left',
                    blockAlignment: 'middle',
                    overflow: 'clip',
                    border: {
                        top: { width: 0.5, color: '#e2e8f0', style: 'solid' }
                    },
                    rowIndex: 0,
                    colIndex: 0,
                    colSpan: 8,
                    padding: { top: 4, bottom: 0, left: 0, right: 0 }
                },
                <TextCell>{
                    id: 'footer-page-number',
                    type: 'Text',
                    value: 'Page 1 of 1',
                    fontSize: 7.5,
                    fontWeight: 'normal',
                    color: '#94a3b8',
                    inlineAlignment: 'right',
                    blockAlignment: 'middle',
                    overflow: 'clip',
                    border: {
                        top: { width: 0.5, color: '#e2e8f0', style: 'solid' }
                    },
                    rowIndex: 0,
                    colIndex: 8,
                    colSpan: 4,
                    padding: { top: 4, bottom: 0, left: 0, right: 0 }
                }
            ]
        }
    ]
};