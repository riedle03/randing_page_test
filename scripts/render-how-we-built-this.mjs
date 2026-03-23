import fs from "node:fs";
import path from "node:path";

const rootDir = path.resolve(process.cwd());
const sourcePath = path.join(rootDir, "HOW_WE_BUILT_THIS.md");
const outputPath = path.join(rootDir, "HOW_WE_BUILT_THIS.html");

const markdown = fs.readFileSync(sourcePath, "utf8").replace(/\r\n/g, "\n");

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function applyInlineMarkdown(text) {
  const codeSpans = [];
  let html = escapeHtml(text);

  html = html.replace(/`([^`]+)`/g, (_, code) => {
    const token = `__CODE_SPAN_${codeSpans.length}__`;
    codeSpans.push(`<code>${escapeHtml(code)}</code>`);
    return token;
  });

  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");

  codeSpans.forEach((snippet, index) => {
    html = html.replace(`__CODE_SPAN_${index}__`, snippet);
  });

  return html;
}

function isTableSeparator(line) {
  return /^\s*\|?(?:\s*:?-{3,}:?\s*\|)+\s*$/.test(line);
}

function parseTable(lines, startIndex) {
  const headerLine = lines[startIndex];
  const separatorLine = lines[startIndex + 1];

  if (!headerLine.includes("|") || !separatorLine || !isTableSeparator(separatorLine)) {
    return null;
  }

  const rows = [];
  let index = startIndex;

  while (index < lines.length && lines[index].includes("|") && lines[index].trim() !== "") {
    rows.push(lines[index]);
    index += 1;
  }

  const toCells = (line) =>
    line
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => applyInlineMarkdown(cell.trim()));

  const headerCells = toCells(rows[0]);
  const bodyRows = rows.slice(2).map((line) => toCells(line));

  let html = "<table><thead><tr>";
  headerCells.forEach((cell) => {
    html += `<th>${cell}</th>`;
  });
  html += "</tr></thead><tbody>";

  bodyRows.forEach((cells) => {
    html += "<tr>";
    cells.forEach((cell) => {
      html += `<td>${cell}</td>`;
    });
    html += "</tr>";
  });

  html += "</tbody></table>";
  return { html, nextIndex: index };
}

function parseBlocks(source) {
  const lines = source.split("\n");
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (trimmed === "") {
      index += 1;
      continue;
    }

    const table = parseTable(lines, index);
    if (table) {
      blocks.push(table.html);
      index = table.nextIndex;
      continue;
    }

    if (trimmed === "---") {
      blocks.push("<hr>");
      index += 1;
      continue;
    }

    if (trimmed.startsWith("```")) {
      const codeLines = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }
      index += 1;
      blocks.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
      continue;
    }

    const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      blocks.push(`<h${level}>${applyInlineMarkdown(headingMatch[2].trim())}</h${level}>`);
      index += 1;
      continue;
    }

    if (trimmed.startsWith(">")) {
      const quoteLines = [];
      while (index < lines.length && lines[index].trim().startsWith(">")) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }
      blocks.push(`<blockquote><p>${quoteLines.map(applyInlineMarkdown).join("<br>")}</p></blockquote>`);
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      const items = [];
      while (index < lines.length && /^[-*]\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^[-*]\s+/, ""));
        index += 1;
      }
      blocks.push(`<ul>${items.map((item) => `<li>${applyInlineMarkdown(item)}</li>`).join("")}</ul>`);
      continue;
    }

    const paragraphLines = [];
    while (index < lines.length) {
      const current = lines[index].trim();
      const next = lines[index + 1]?.trim() ?? "";
      if (
        current === "" ||
        current === "---" ||
        current.startsWith("```") ||
        current.startsWith(">") ||
        /^#{1,6}\s+/.test(current) ||
        /^[-*]\s+/.test(current) ||
        (current.includes("|") && isTableSeparator(next))
      ) {
        break;
      }
      paragraphLines.push(current);
      index += 1;
    }

    if (paragraphLines.length > 0) {
      blocks.push(`<p>${applyInlineMarkdown(paragraphLines.join("<br>"))}</p>`);
      continue;
    }

    index += 1;
  }

  return blocks.join("\n");
}

const articleHtml = parseBlocks(markdown);
const heroDescription = applyInlineMarkdown("`HOW_WE_BUILT_THIS.md`를 정적 HTML 문서로 변환한 페이지입니다. GitHub Pages 배포 시 메인 랜딩 페이지와 함께 바로 열 수 있도록 구성했습니다.");

const documentHtml = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>How We Built This</title>
  <meta name="description" content="AI와 함께 랜딩 페이지를 만든 실제 작업 과정을 정리한 문서">
  <style>
    :root {
      --bg: #f4efe7;
      --surface: rgba(255, 252, 247, 0.92);
      --surface-border: rgba(30, 25, 20, 0.08);
      --text: #201a16;
      --muted: #6d6258;
      --accent: #b65c2f;
      --accent-strong: #8d4422;
      --code-bg: #efe6da;
      --quote-bg: #f2e5d9;
      --shadow: 0 24px 80px rgba(54, 35, 15, 0.12);
    }

    * {
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      margin: 0;
      min-height: 100vh;
      color: var(--text);
      font-family: Georgia, "Times New Roman", serif;
      background:
        radial-gradient(circle at top left, rgba(255,255,255,0.65), transparent 32%),
        linear-gradient(180deg, #efe6d9 0%, var(--bg) 28%, #f7f3ed 100%);
    }

    a {
      color: var(--accent-strong);
    }

    .page-shell {
      width: min(980px, calc(100vw - 32px));
      margin: 0 auto;
      padding: 32px 0 72px;
    }

    .topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
    }

    .eyebrow {
      margin: 0;
      color: var(--muted);
      font-size: 13px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      font-family: Arial, sans-serif;
    }

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      border-radius: 999px;
      text-decoration: none;
      background: rgba(255, 255, 255, 0.7);
      border: 1px solid rgba(0, 0, 0, 0.08);
      font-family: Arial, sans-serif;
      font-size: 14px;
    }

    .hero {
      padding: 28px;
      border-radius: 28px;
      background:
        linear-gradient(135deg, rgba(255,255,255,0.72), rgba(255,248,238,0.9)),
        linear-gradient(135deg, rgba(182,92,47,0.12), rgba(141,68,34,0.08));
      border: 1px solid rgba(0, 0, 0, 0.06);
      box-shadow: var(--shadow);
      margin-bottom: 28px;
    }

    .hero h1 {
      margin: 0 0 12px;
      font-size: clamp(34px, 6vw, 64px);
      line-height: 0.98;
      letter-spacing: -0.04em;
    }

    .hero p {
      margin: 0;
      max-width: 52rem;
      color: var(--muted);
      font-size: 18px;
      line-height: 1.65;
      font-family: Arial, sans-serif;
    }

    article {
      padding: 34px;
      border-radius: 28px;
      background: var(--surface);
      border: 1px solid var(--surface-border);
      box-shadow: var(--shadow);
      backdrop-filter: blur(12px);
    }

    article h1,
    article h2,
    article h3 {
      margin: 1.7em 0 0.55em;
      letter-spacing: -0.03em;
      line-height: 1.1;
    }

    article h1:first-child,
    article h2:first-child,
    article h3:first-child {
      margin-top: 0;
    }

    article h1 { font-size: clamp(32px, 5vw, 48px); }
    article h2 { font-size: clamp(26px, 4vw, 34px); }
    article h3 { font-size: clamp(20px, 3vw, 24px); }

    article p,
    article li,
    article blockquote,
    article td,
    article th {
      font-size: 18px;
      line-height: 1.82;
    }

    article p,
    article ul,
    article blockquote,
    article pre,
    article table,
    article hr {
      margin: 0 0 22px;
    }

    article ul {
      padding-left: 24px;
    }

    article li + li {
      margin-top: 8px;
    }

    article code {
      font-family: Consolas, "Courier New", monospace;
      font-size: 0.92em;
      background: var(--code-bg);
      border-radius: 8px;
      padding: 0.16em 0.42em;
    }

    article pre {
      overflow-x: auto;
      padding: 18px;
      border-radius: 18px;
      background: #1b1612;
      color: #f4ecdf;
    }

    article pre code {
      padding: 0;
      background: transparent;
      color: inherit;
    }

    article blockquote {
      padding: 18px 20px;
      border-left: 4px solid var(--accent);
      background: var(--quote-bg);
      border-radius: 18px;
    }

    article blockquote p:last-child {
      margin-bottom: 0;
    }

    article hr {
      border: 0;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }

    article table {
      width: 100%;
      border-collapse: collapse;
      overflow: hidden;
      border-radius: 18px;
      display: block;
      overflow-x: auto;
    }

    article thead {
      background: rgba(182, 92, 47, 0.1);
    }

    article th,
    article td {
      padding: 14px 16px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      text-align: left;
      vertical-align: top;
      white-space: nowrap;
    }

    article tbody tr:nth-child(even) {
      background: rgba(255, 255, 255, 0.42);
    }

    @media (max-width: 720px) {
      .page-shell {
        width: min(100vw - 20px, 980px);
        padding-top: 20px;
      }

      .topbar {
        flex-direction: column;
        align-items: flex-start;
      }

      .hero,
      article {
        padding: 22px;
        border-radius: 22px;
      }

      .hero p,
      article p,
      article li,
      article blockquote,
      article td,
      article th {
        font-size: 16px;
      }
    }
  </style>
</head>
<body>
  <main class="page-shell">
    <div class="topbar">
      <p class="eyebrow">Project Notes</p>
      <a class="back-link" href="./index.html">Back to Landing Page</a>
    </div>

    <section class="hero">
      <h1>How We Built This</h1>
      <p>${heroDescription}</p>
    </section>

    <article>
${articleHtml
  .split("\n")
  .map((line) => `      ${line}`)
  .join("\n")}
    </article>
  </main>
</body>
</html>
`;

fs.writeFileSync(outputPath, documentHtml, "utf8");
console.log(`Rendered ${path.basename(outputPath)}`);
