import type { GreyStoreItem } from "@/lib/grey/config";

function escapePdfText(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function textLine(text: string, x: number, y: number, size = 12) {
  return `BT /F1 ${size} Tf ${x} ${y} Td (${escapePdfText(text)}) Tj ET`;
}

function wrappedLines(text: string, maxLength: number) {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxLength) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) lines.push(current);
  return lines;
}

function section(
  chunks: string[],
  title: string,
  lines: string[],
  yStart: number
) {
  let y = yStart;
  chunks.push(textLine(title, 72, y, 13));
  y -= 24;

  for (const line of lines) {
    for (const wrapped of wrappedLines(line, 82)) {
      chunks.push(textLine(wrapped, 90, y, 10.5));
      y -= 16;
    }
    y -= 10;
  }

  return y;
}

function pageContent(itemTitle: string, title: string, task: string[], solution: string[]) {
  const chunks = [
    "0.96 0.94 1 rg 0 742 612 50 re f",
    "0.43 0.18 0.86 rg 0 742 612 6 re f",
    textLine("THE GREY PROJECT", 72, 764, 11),
    textLine("Grey Store Field Asset", 400, 764, 10),
    textLine(itemTitle, 72, 720, 17),
    textLine(title, 72, 692, 14),
  ];

  const afterTask = section(chunks, "Task", task, 650);
  section(chunks, "Suggested Solution", solution, afterTask - 8);

  chunks.push(textLine("Redeemed with Grey Points", 72, 72, 10));
  chunks.push(textLine("thegreyproject.com", 410, 72, 10));
  return chunks.join("\n");
}

export function createGreyStorePdf(item: GreyStoreItem) {
  const objects: string[] = [];
  const pages = item.pages.map((page) =>
    pageContent(item.title, page.title, page.task, page.solution)
  );

  objects.push("<< /Type /Catalog /Pages 2 0 R >>");
  objects.push(
    `<< /Type /Pages /Kids [${pages
      .map((_, index) => `${3 + index * 2} 0 R`)
      .join(" ")}] /Count ${pages.length} >>`
  );

  pages.forEach((content, index) => {
    const pageObjectNumber = 3 + index * 2;
    const contentObjectNumber = pageObjectNumber + 1;
    objects.push(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >> /Contents ${contentObjectNumber} 0 R >>`
    );
    objects.push(`<< /Length ${Buffer.byteLength(content)} >>\nstream\n${content}\nendstream`);
  });

  const header = "%PDF-1.4\n";
  let body = "";
  const offsets = [0];

  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(header + body));
    body += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefOffset = Buffer.byteLength(header + body);
  const xref = [
    "xref",
    `0 ${objects.length + 1}`,
    "0000000000 65535 f ",
    ...offsets.slice(1).map((offset) => `${String(offset).padStart(10, "0")} 00000 n `),
    "trailer",
    `<< /Size ${objects.length + 1} /Root 1 0 R >>`,
    "startxref",
    String(xrefOffset),
    "%%EOF",
  ].join("\n");

  return Buffer.from(header + body + xref);
}
