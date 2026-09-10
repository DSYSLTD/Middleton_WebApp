export interface ReportOptions {
  title: string;
  subtitle?: string;
  columns: string[];
  rows: (string | number)[][];
  filename?: string;
  orientation?: 'landscape' | 'portrait';
}

export function printHtmlReport(options: ReportOptions) {
  const { title, subtitle, columns, rows, orientation = 'landscape' } = options;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <style>
          @page {
            size: ${orientation === 'landscape' ? 'landscape' : 'portrait'};
            margin: 15mm;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            color: #1f2937;
            background: #ffffff;
            margin: 0;
            padding: 20px;
          }
          .header {
            border-bottom: 2px solid #411548;
            padding-bottom: 12px;
            margin-bottom: 20px;
          }
          .title {
            color: #411548;
            font-size: 20px;
            font-weight: 800;
            text-transform: uppercase;
            margin: 0 0 4px 0;
            letter-spacing: 0.5px;
          }
          .subtitle {
            color: #6b7280;
            font-size: 12px;
            font-weight: 600;
            margin: 0;
          }
          .meta {
            font-size: 11px;
            color: #8b5a94;
            font-weight: 600;
            margin-top: 6px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 11px;
          }
          th {
            background-color: #411548;
            color: #ffffff;
            font-weight: 700;
            text-align: left;
            padding: 8px 10px;
            text-transform: uppercase;
            font-size: 10px;
            letter-spacing: 0.5px;
          }
          td {
            padding: 8px 10px;
            border-bottom: 1px solid #e5e7eb;
          }
          tr:nth-child(even) {
            background-color: #faf7fa;
          }
          .footer {
            margin-top: 30px;
            padding-top: 10px;
            border-top: 1px solid #e5e7eb;
            font-size: 10px;
            color: #6b7280;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 class="title">${title}</h1>
          ${subtitle ? `<p class="subtitle">${subtitle}</p>` : ''}
          <div class="meta">Generated: ${new Date().toLocaleString()} • Middleton Funeral & Cremation Services Administration</div>
        </div>
        <table>
          <thead>
            <tr>
              ${columns.map(c => `<th>${c}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${rows.map(row => `
              <tr>
                ${row.map(cell => `<td>${cell !== undefined && cell !== null ? String(cell) : ''}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="footer">
          Middleton Funeral & Cremation Services • Human Resources & Talent Administration • Minnesota Equal Opportunity Employer
        </div>
        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
    </html>
  `;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  } else {
    // If pop-up is blocked, create an iframe
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    iframe.contentDocument?.open();
    iframe.contentDocument?.write(htmlContent);
    iframe.contentDocument?.close();
    setTimeout(() => {
      iframe.contentWindow?.print();
      document.body.removeChild(iframe);
    }, 1000);
  }
}

export function exportPdfReport(options: ReportOptions) {
  // Use HTML print engine to allow save-as-PDF or print directly
  printHtmlReport(options);
}
