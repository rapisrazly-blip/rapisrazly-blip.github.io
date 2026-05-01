const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "マーケティングAIツール 開発ポートフォリオ";
pres.author = "AIデザイナー・フリーランスエンジニア";

// Color palette
const C = {
  bg:      "12172B",   // deep navy
  bgCard:  "1E2747",   // card navy
  bgCard2: "252E52",   // slightly lighter card
  gold:    "F5A623",   // gold accent
  goldDim: "C47F0E",   // darker gold
  white:   "FFFFFF",
  light:   "C8D0E7",   // light blue-gray for body text
  muted:   "8A95B5",   // muted text
  teal:    "2ECDC4",   // teal accent
  tag:     "1C3060",   // skill tag bg
};

const makeShadow = () => ({ type: "outer", blur: 8, offset: 3, angle: 135, color: "000000", opacity: 0.25 });

// ─── SLIDE 1: COVER ───────────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  // Gold top bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.08, fill: { color: C.gold }, line: { color: C.gold } });

  // Left accent bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0.55, y: 1.2, w: 0.06, h: 3.0, fill: { color: C.gold }, line: { color: C.gold } });

  // Main title
  s.addText("マーケティングAIツール", {
    x: 0.75, y: 1.2, w: 8.5, h: 0.85,
    fontSize: 38, bold: true, color: C.white, fontFace: "Meiryo",
    align: "left", valign: "middle", margin: 0,
  });
  s.addText("開発ポートフォリオ", {
    x: 0.75, y: 1.95, w: 8.5, h: 0.75,
    fontSize: 34, bold: true, color: C.gold, fontFace: "Meiryo",
    align: "left", valign: "middle", margin: 0,
  });

  // Subtitle tags
  const tags = ["LP自動生成", "セールスコンテンツ自動化", "LINE連携"];
  tags.forEach((tag, i) => {
    const xPos = 0.75 + i * 2.9;
    s.addShape(pres.shapes.RECTANGLE, {
      x: xPos, y: 3.0, w: 2.7, h: 0.42,
      fill: { color: C.tag }, line: { color: C.teal, pt: 1 },
      shadow: makeShadow(),
    });
    s.addText(tag, {
      x: xPos, y: 3.0, w: 2.7, h: 0.42,
      fontSize: 13, color: C.teal, bold: true, fontFace: "Meiryo",
      align: "center", valign: "middle", margin: 0,
    });
  });

  // Name label
  s.addText("AIデザイナー・フリーランスエンジニア", {
    x: 0.75, y: 3.65, w: 8, h: 0.4,
    fontSize: 14, color: C.light, fontFace: "Meiryo",
    align: "left", valign: "middle", margin: 0,
  });

  // Bottom bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.42, w: 10, h: 0.2, fill: { color: C.bgCard }, line: { color: C.bgCard } });

  // Decorative dot grid (right side)
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 6; c++) {
      s.addShape(pres.shapes.OVAL, {
        x: 8.0 + c * 0.28, y: 0.9 + r * 0.6,
        w: 0.06, h: 0.06,
        fill: { color: "F5A623", transparency: 65 }, line: { color: "F5A623", transparency: 65 },
      });
    }
  }
}

// ─── SLIDE 2: PROFILE ─────────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  // Header bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.0, fill: { color: C.bgCard }, line: { color: C.bgCard } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0.9, w: 10, h: 0.08, fill: { color: C.gold }, line: { color: C.gold } });
  s.addText("プロフィール", {
    x: 0.5, y: 0, w: 9, h: 1.0,
    fontSize: 28, bold: true, color: C.white, fontFace: "Meiryo",
    align: "left", valign: "middle", margin: 0,
  });

  // Profile card background
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.3, y: 1.15, w: 9.4, h: 2.8,
    fill: { color: C.bgCard }, line: { color: "2D3A6B", pt: 1 },
    shadow: makeShadow(),
  });
  // Gold left accent
  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 1.15, w: 0.07, h: 2.8, fill: { color: C.gold }, line: { color: C.gold } });

  const bullets = [
    "Claude / ChatGPT APIを活用したAIツール開発が専門",
    "「リード獲得 → LP → LINE → 販売」の一連の仕組みを設計・実装",
    "高単価講座・コンサル業界向けのマーケティング自動化に注力",
    "ノーコード〜フルコードまで幅広く対応可能",
  ];
  s.addText(
    bullets.map((b, i) => [
      { text: "▶ ", options: { color: C.gold, bold: true, fontSize: 13 } },
      { text: b, options: { color: C.light, fontSize: 13, breakLine: i < bullets.length - 1 } },
    ]).flat(),
    {
      x: 0.55, y: 1.25, w: 8.9, h: 2.55,
      fontFace: "Meiryo", align: "left", valign: "top",
      paraSpaceAfter: 6, margin: 8,
    }
  );

  // Skills row
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.3, y: 4.2, w: 9.4, h: 1.05,
    fill: { color: "0D1326" }, line: { color: C.gold, pt: 1 },
    shadow: makeShadow(),
  });
  s.addText("使用技術・スキル", {
    x: 0.5, y: 4.22, w: 2.0, h: 0.35,
    fontSize: 11, color: C.gold, bold: true, fontFace: "Meiryo",
    align: "left", valign: "middle", margin: 0,
  });
  const skills = ["Python", "Claude API", "ChatGPT API", "LINE Messaging API", "UTAGE", "Zapier", "ノーコード"];
  skills.forEach((skill, i) => {
    const xPos = 0.45 + i * 1.32;
    s.addShape(pres.shapes.RECTANGLE, {
      x: xPos, y: 4.62, w: 1.22, h: 0.38,
      fill: { color: C.tag }, line: { color: C.teal, pt: 1 },
      shadow: makeShadow(),
    });
    s.addText(skill, {
      x: xPos, y: 4.62, w: 1.22, h: 0.38,
      fontSize: 10, color: C.teal, bold: true, fontFace: "Meiryo",
      align: "center", valign: "middle", margin: 0,
    });
  });
}

// ─── SLIDE 3: TOOLS OVERVIEW ──────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  // Header
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.0, fill: { color: C.bgCard }, line: { color: C.bgCard } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0.9, w: 10, h: 0.08, fill: { color: C.gold }, line: { color: C.gold } });
  s.addText("開発済みAIツール一覧", {
    x: 0.5, y: 0, w: 9, h: 1.0,
    fontSize: 28, bold: true, color: C.white, fontFace: "Meiryo",
    align: "left", valign: "middle", margin: 0,
  });
  s.addText("12 TOOLS", {
    x: 8.0, y: 0, w: 1.7, h: 1.0,
    fontSize: 22, bold: true, color: C.gold, fontFace: "Arial Black",
    align: "right", valign: "middle", margin: 0,
  });

  const tools = [
    { id: "01", name: "x-auto-post",       desc: "X(Twitter)自動投稿" },
    { id: "02", name: "cc-slides",         desc: "AIセールススライド生成" },
    { id: "03", name: "scraping-agent",    desc: "Web情報収集エージェント" },
    { id: "04", name: "job-scout",         desc: "案件自動取得ツール" },
    { id: "05", name: "oc-responder",      desc: "LINE回答効率化" },
    { id: "06", name: "cc-video-editor",   desc: "動画字幕自動付与" },
    { id: "07", name: "cc-lp-v2",         desc: "LP制作自動化" },
    { id: "08", name: "work-lister",       desc: "業務洗い出し自動化" },
    { id: "09", name: "line-group-bot",    desc: "LINEグループBot" },
    { id: "10", name: "cc-project-builder",desc: "システム開発支援" },
    { id: "11", name: "oc-responder-v2",   desc: "FAQ自動生成＋UTAGE連携" },
    { id: "12", name: "seo-article-agent", desc: "SEO記事自動生成" },
  ];

  // Highlight IDs (case-relevant tools)
  const highlights = ["02", "05", "07", "09", "11"];

  const cols = 3, rows = 4;
  const startX = 0.25, startY = 1.1;
  const cardW = 3.1, cardH = 1.05;
  const gapX = 0.175, gapY = 0.08;

  tools.forEach((tool, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = startX + col * (cardW + gapX);
    const y = startY + row * (cardH + gapY);
    const isHL = highlights.includes(tool.id);

    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: cardW, h: cardH,
      fill: { color: isHL ? "1C2D5E" : C.bgCard },
      line: { color: isHL ? C.gold : "2D3A6B", pt: isHL ? 1.5 : 1 },
      shadow: makeShadow(),
    });
    // Left accent
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 0.05, h: cardH,
      fill: { color: isHL ? C.gold : C.teal }, line: { color: isHL ? C.gold : C.teal },
    });
    // ID number
    s.addText(tool.id, {
      x: x + 0.08, y: y + 0.04, w: 0.38, h: 0.32,
      fontSize: 9, color: isHL ? C.gold : C.muted, bold: true, fontFace: "Arial",
      align: "left", valign: "top", margin: 0,
    });
    // Tool name
    s.addText(tool.name, {
      x: x + 0.12, y: y + 0.3, w: cardW - 0.18, h: 0.35,
      fontSize: 11.5, color: C.white, bold: true, fontFace: "Consolas",
      align: "left", valign: "middle", margin: 0,
    });
    // Description
    s.addText(tool.desc, {
      x: x + 0.12, y: y + 0.63, w: cardW - 0.18, h: 0.32,
      fontSize: 10, color: isHL ? C.light : C.muted, fontFace: "Meiryo",
      align: "left", valign: "middle", margin: 0,
    });
  });

  // Legend
  s.addShape(pres.shapes.RECTANGLE, { x: 0.25, y: 5.3, w: 0.05, h: 0.18, fill: { color: C.gold }, line: { color: C.gold } });
  s.addText("= 本案件に直結するツール", {
    x: 0.38, y: 5.25, w: 4, h: 0.28,
    fontSize: 10, color: C.gold, fontFace: "Meiryo",
    align: "left", valign: "middle", margin: 0,
  });
}

// ─── SLIDE 4: cc-lp-v2 ────────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  // Header
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.0, fill: { color: C.bgCard }, line: { color: C.bgCard } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0.9, w: 10, h: 0.08, fill: { color: C.gold }, line: { color: C.gold } });
  s.addText([
    { text: "【案件直結①】", options: { color: C.gold, bold: true, fontSize: 14 } },
    { text: " LP制作自動化ツール「cc-lp-v2」", options: { color: C.white, bold: true, fontSize: 22 } },
  ], {
    x: 0.5, y: 0, w: 9.2, h: 1.0, fontFace: "Meiryo", align: "left", valign: "middle", margin: 0,
  });

  // Left column - overview
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.3, y: 1.15, w: 4.5, h: 4.1,
    fill: { color: C.bgCard }, line: { color: "2D3A6B", pt: 1 }, shadow: makeShadow(),
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 1.15, w: 0.07, h: 4.1, fill: { color: C.gold }, line: { color: C.gold } });
  s.addText("概要", {
    x: 0.5, y: 1.22, w: 3.5, h: 0.4,
    fontSize: 13, color: C.gold, bold: true, fontFace: "Meiryo",
    align: "left", valign: "middle", margin: 0,
  });
  s.addText("ターゲット・商品情報を入力するだけで、LP構成・キャッチコピー・本文まで自動生成するツール。高単価講座のLP制作コストを大幅に削減。", {
    x: 0.5, y: 1.68, w: 4.1, h: 1.0,
    fontSize: 12, color: C.light, fontFace: "Meiryo",
    align: "left", valign: "top", margin: 0,
  });
  s.addText("使用技術", {
    x: 0.5, y: 2.72, w: 3, h: 0.35,
    fontSize: 11, color: C.gold, bold: true, fontFace: "Meiryo", margin: 0,
  });
  const techTags = ["Claude API", "Python", "HTML出力"];
  techTags.forEach((t, i) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5 + i * 1.32, y: 3.1, w: 1.22, h: 0.35,
      fill: { color: C.tag }, line: { color: C.teal, pt: 1 }, shadow: makeShadow(),
    });
    s.addText(t, {
      x: 0.5 + i * 1.32, y: 3.1, w: 1.22, h: 0.35,
      fontSize: 10, color: C.teal, bold: true, fontFace: "Meiryo",
      align: "center", valign: "middle", margin: 0,
    });
  });
  // Case badge
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 4.62, w: 4.2, h: 0.5,
    fill: { color: "1A3A1A" }, line: { color: "2ECC71", pt: 1.5 }, shadow: makeShadow(),
  });
  s.addText("本案件での活用：LP自動生成業務に即日対応可能", {
    x: 0.55, y: 4.62, w: 3.9, h: 0.5,
    fontSize: 11, color: "2ECC71", bold: true, fontFace: "Meiryo",
    align: "left", valign: "middle", margin: 0,
  });

  // Right column - points
  const pts = [
    "高単価講座向けのLP構成パターンを内蔵",
    "ファーストビュー〜CTAまで一貫した流れを自動出力",
    "出力フォーマットはHTML / テキスト両対応",
  ];
  pts.forEach((pt, i) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.1, y: 1.15 + i * 1.35, w: 4.6, h: 1.2,
      fill: { color: C.bgCard }, line: { color: "2D3A6B", pt: 1 }, shadow: makeShadow(),
    });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.15 + i * 1.35, w: 0.07, h: 1.2, fill: { color: C.teal }, line: { color: C.teal } });
    s.addText(`POINT ${i + 1}`, {
      x: 5.25, y: 1.18 + i * 1.35, w: 1.2, h: 0.3,
      fontSize: 9, color: C.teal, bold: true, fontFace: "Arial",
      align: "left", valign: "middle", margin: 0,
    });
    s.addText(pt, {
      x: 5.25, y: 1.48 + i * 1.35, w: 4.3, h: 0.72,
      fontSize: 12, color: C.light, fontFace: "Meiryo",
      align: "left", valign: "top", margin: 0,
    });
  });
}

// ─── SLIDE 5: cc-slides ───────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.0, fill: { color: C.bgCard }, line: { color: C.bgCard } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0.9, w: 10, h: 0.08, fill: { color: C.gold }, line: { color: C.gold } });
  s.addText([
    { text: "【案件直結②】", options: { color: C.gold, bold: true, fontSize: 14 } },
    { text: " AIセールススライド自動生成「cc-slides」", options: { color: C.white, bold: true, fontSize: 22 } },
  ], {
    x: 0.5, y: 0, w: 9.2, h: 1.0, fontFace: "Meiryo", align: "left", valign: "middle", margin: 0,
  });

  // Left column
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.3, y: 1.15, w: 4.5, h: 4.1,
    fill: { color: C.bgCard }, line: { color: "2D3A6B", pt: 1 }, shadow: makeShadow(),
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 1.15, w: 0.07, h: 4.1, fill: { color: C.gold }, line: { color: C.gold } });
  s.addText("概要", { x: 0.5, y: 1.22, w: 3.5, h: 0.4, fontSize: 13, color: C.gold, bold: true, fontFace: "Meiryo", align: "left", valign: "middle", margin: 0 });
  s.addText("商品・サービス情報を入力するだけで、セールス用スライドを自動生成。メルマガ・LINE配信・広告コピーへの転用も可能。", {
    x: 0.5, y: 1.68, w: 4.1, h: 1.0,
    fontSize: 12, color: C.light, fontFace: "Meiryo", align: "left", valign: "top", margin: 0,
  });
  s.addText("使用技術", { x: 0.5, y: 2.72, w: 3, h: 0.35, fontSize: 11, color: C.gold, bold: true, fontFace: "Meiryo", margin: 0 });
  const techTags2 = ["Claude API", "Python", "PPTX生成"];
  techTags2.forEach((t, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5 + i * 1.32, y: 3.1, w: 1.22, h: 0.35, fill: { color: C.tag }, line: { color: C.teal, pt: 1 }, shadow: makeShadow() });
    s.addText(t, { x: 0.5 + i * 1.32, y: 3.1, w: 1.22, h: 0.35, fontSize: 10, color: C.teal, bold: true, fontFace: "Meiryo", align: "center", valign: "middle", margin: 0 });
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 4.62, w: 4.2, h: 0.5, fill: { color: "1A3A1A" }, line: { color: "2ECC71", pt: 1.5 }, shadow: makeShadow() });
  s.addText("本案件での活用：セールスコンテンツ量産に対応", { x: 0.55, y: 4.62, w: 3.9, h: 0.5, fontSize: 11, color: "2ECC71", bold: true, fontFace: "Meiryo", align: "left", valign: "middle", margin: 0 });

  const pts = [
    "AIDA / PASONAなどのマーケティングフレームワークを適用",
    "メルマガ・LINE・広告用コピーへの転用も可能",
    "修正指示をAIに伝えて即時反映",
  ];
  pts.forEach((pt, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.15 + i * 1.35, w: 4.6, h: 1.2, fill: { color: C.bgCard }, line: { color: "2D3A6B", pt: 1 }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.15 + i * 1.35, w: 0.07, h: 1.2, fill: { color: C.teal }, line: { color: C.teal } });
    s.addText(`POINT ${i + 1}`, { x: 5.25, y: 1.18 + i * 1.35, w: 1.2, h: 0.3, fontSize: 9, color: C.teal, bold: true, fontFace: "Arial", align: "left", valign: "middle", margin: 0 });
    s.addText(pt, { x: 5.25, y: 1.48 + i * 1.35, w: 4.3, h: 0.72, fontSize: 12, color: C.light, fontFace: "Meiryo", align: "left", valign: "top", margin: 0 });
  });
}

// ─── SLIDE 6: LINE連携ツール群 ────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.0, fill: { color: C.bgCard }, line: { color: C.bgCard } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0.9, w: 10, h: 0.08, fill: { color: C.gold }, line: { color: C.gold } });
  s.addText([
    { text: "【案件直結③】", options: { color: C.gold, bold: true, fontSize: 14 } },
    { text: " LINE自動化ツール群", options: { color: C.white, bold: true, fontSize: 26 } },
  ], { x: 0.5, y: 0, w: 9.2, h: 1.0, fontFace: "Meiryo", align: "left", valign: "middle", margin: 0 });

  // 3 tool cards
  const lineTools = [
    { name: "oc-responder", title: "LINE回答効率化", desc: "問い合わせ内容をAIが自動解析し、最適な回答案を即時生成。オペレーター対応工数を大幅削減。" },
    { name: "line-group-bot", title: "LINEグループBot", desc: "グループLINE内の質問・発言に自動応答。FAQベースの回答とエスカレーション機能を実装。" },
    { name: "oc-responder-v2", title: "FAQ生成＋UTAGE連携", desc: "よくある質問を自動整理してFAQページを生成。UTAGEと連携し高単価講座の販売導線を構築。" },
  ];
  lineTools.forEach((t, i) => {
    const y = 1.15 + i * 1.35;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y, w: 9.4, h: 1.2, fill: { color: C.bgCard }, line: { color: i === 2 ? C.gold : "2D3A6B", pt: i === 2 ? 1.5 : 1 }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y, w: 0.07, h: 1.2, fill: { color: C.gold }, line: { color: C.gold } });
    s.addText(`${["①", "②", "③"][i]} ${t.name}`, { x: 0.5, y: y + 0.05, w: 2.5, h: 0.35, fontSize: 12, color: C.gold, bold: true, fontFace: "Meiryo", align: "left", valign: "middle", margin: 0 });
    s.addText(t.title, { x: 3.1, y: y + 0.05, w: 3.0, h: 0.35, fontSize: 13, color: C.white, bold: true, fontFace: "Meiryo", align: "left", valign: "middle", margin: 0 });
    s.addText(t.desc, { x: 0.5, y: y + 0.42, w: 9.0, h: 0.7, fontSize: 11.5, color: C.light, fontFace: "Meiryo", align: "left", valign: "top", margin: 0 });
  });

  // Key points footer
  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 5.2, w: 9.4, h: 0.28, fill: { color: "0D1326" }, line: { color: C.gold, pt: 1 } });
  s.addText("LINE Messaging API + Claude API ｜ UTAGE連携 ｜ 配信・返信・FAQ対応まで一括自動化", {
    x: 0.5, y: 5.2, w: 9.0, h: 0.28,
    fontSize: 10, color: C.teal, bold: true, fontFace: "Meiryo", align: "center", valign: "middle", margin: 0,
  });
}

// ─── SLIDE 7: OTHER TOOLS ─────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.0, fill: { color: C.bgCard }, line: { color: C.bgCard } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0.9, w: 10, h: 0.08, fill: { color: C.teal }, line: { color: C.teal } });
  s.addText("その他の開発ツール", { x: 0.5, y: 0, w: 9, h: 1.0, fontSize: 28, bold: true, color: C.white, fontFace: "Meiryo", align: "left", valign: "middle", margin: 0 });

  const others = [
    { name: "x-auto-post",      icon: "X", title: "X(Twitter)自動投稿",  desc: "広告・SNS運用補助に活用可能。コンテンツのスケジュール投稿を自動化し、SNSマーケティングを効率化。" },
    { name: "seo-article-agent", icon: "S", title: "SEO記事自動生成",    desc: "ターゲットKWを入力するだけでSEO最適化された記事を自動生成。リード獲得コンテンツを量産。" },
    { name: "scraping-agent",   icon: "R", title: "Web情報収集エージェント", desc: "競合・市場情報を自動収集してレポート化。マーケティング戦略の立案に活用。" },
    { name: "job-scout",        icon: "J", title: "案件自動取得",        desc: "案件情報の自動収集・フィルタリング・通知。業務効率化の実績あり。" },
  ];

  others.forEach((t, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.3 + col * 4.9;
    const y = 1.12 + row * 2.1;

    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.6, h: 1.9, fill: { color: C.bgCard }, line: { color: "2D3A6B", pt: 1 }, shadow: makeShadow() });
    // Icon circle
    s.addShape(pres.shapes.OVAL, { x: x + 0.15, y: y + 0.55, w: 0.55, h: 0.55, fill: { color: C.tag }, line: { color: C.teal, pt: 1 } });
    s.addText(t.icon, { x: x + 0.15, y: y + 0.55, w: 0.55, h: 0.55, fontSize: 13, color: C.teal, bold: true, fontFace: "Arial Black", align: "center", valign: "middle", margin: 0 });
    // Tool name
    s.addText(t.name, { x: x + 0.1, y: y + 0.08, w: 4.3, h: 0.32, fontSize: 10, color: C.gold, bold: true, fontFace: "Consolas", align: "left", valign: "middle", margin: 0 });
    // Title
    s.addText(t.title, { x: x + 0.82, y: y + 0.52, w: 3.6, h: 0.38, fontSize: 13, color: C.white, bold: true, fontFace: "Meiryo", align: "left", valign: "middle", margin: 0 });
    // Desc
    s.addText(t.desc, { x: x + 0.12, y: y + 1.02, w: 4.35, h: 0.78, fontSize: 11, color: C.light, fontFace: "Meiryo", align: "left", valign: "top", margin: 0 });
  });
}

// ─── SLIDE 8: 稼働条件 ────────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.0, fill: { color: C.bgCard }, line: { color: C.bgCard } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0.9, w: 10, h: 0.08, fill: { color: C.gold }, line: { color: C.gold } });
  s.addText("対応可能な業務・稼働条件", { x: 0.5, y: 0, w: 9, h: 1.0, fontSize: 26, bold: true, color: C.white, fontFace: "Meiryo", align: "left", valign: "middle", margin: 0 });

  // Left: 対応業務
  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 1.15, w: 4.5, h: 4.1, fill: { color: C.bgCard }, line: { color: "2D3A6B", pt: 1 }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.3, y: 1.15, w: 0.07, h: 4.1, fill: { color: C.gold }, line: { color: C.gold } });
  s.addText("対応業務", { x: 0.5, y: 1.22, w: 4.0, h: 0.4, fontSize: 14, color: C.gold, bold: true, fontFace: "Meiryo", align: "left", valign: "middle", margin: 0 });

  const tasks = [
    "LP・セールスページの自動生成ツール開発",
    "セールスコンテンツ（スライド・メルマガ・LINE文）の自動化",
    "LINE Bot構築・UTAGE連携",
    "広告運用補助ツール（Meta/Google向けレポート・改善提案）",
    "SNS自動投稿・コンテンツ量産",
  ];
  s.addText(
    tasks.map((t, i) => [
      { text: "▶ ", options: { color: C.gold, bold: true, fontSize: 12 } },
      { text: t, options: { color: C.light, fontSize: 12, breakLine: i < tasks.length - 1 } },
    ]).flat(),
    { x: 0.5, y: 1.7, w: 4.15, h: 3.3, fontFace: "Meiryo", align: "left", valign: "top", paraSpaceAfter: 8, margin: 5 }
  );

  // Right: 稼働条件
  s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.15, w: 4.6, h: 4.1, fill: { color: C.bgCard }, line: { color: "2D3A6B", pt: 1 }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.15, w: 0.07, h: 4.1, fill: { color: C.teal }, line: { color: C.teal } });
  s.addText("稼働条件", { x: 5.3, y: 1.22, w: 4.0, h: 0.4, fontSize: 14, color: C.teal, bold: true, fontFace: "Meiryo", align: "left", valign: "middle", margin: 0 });

  const conditions = [
    ["稼働日数", "週2〜3日"],
    ["稼働時間", "1日3〜5時間"],
    ["勤務形態", "フルリモート"],
    ["対応言語", "日本語"],
    ["契約形態", "業務委託"],
  ];
  conditions.forEach(([label, val], i) => {
    const y = 1.8 + i * 0.62;
    s.addShape(pres.shapes.RECTANGLE, { x: 5.22, y, w: 4.35, h: 0.5, fill: { color: "0D1326" }, line: { color: "2D3A6B", pt: 1 }, shadow: makeShadow() });
    s.addText(label, { x: 5.3, y, w: 1.5, h: 0.5, fontSize: 11, color: C.muted, bold: true, fontFace: "Meiryo", align: "left", valign: "middle", margin: 0 });
    s.addText(val, { x: 6.85, y, w: 2.6, h: 0.5, fontSize: 13, color: C.white, bold: true, fontFace: "Meiryo", align: "left", valign: "middle", margin: 0 });
  });
}

// ─── SLIDE 9: CLOSING ─────────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  // Full-width gold top bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.1, fill: { color: C.gold }, line: { color: C.gold } });

  // Center card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 0.7, w: 8.4, h: 4.0,
    fill: { color: C.bgCard }, line: { color: C.gold, pt: 2 }, shadow: makeShadow(),
  });

  s.addText("「売れる仕組み」をAIで一緒に作ります", {
    x: 0.9, y: 0.85, w: 8.2, h: 0.85,
    fontSize: 26, bold: true, color: C.white, fontFace: "Meiryo",
    align: "center", valign: "middle", margin: 0,
  });

  // Flow visual
  const flow = ["リード獲得", "教育", "販売", "リピート"];
  const arrowY = 2.05;
  flow.forEach((label, i) => {
    const x = 1.3 + i * 2.05;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: arrowY, w: 1.6, h: 0.55,
      fill: { color: C.tag }, line: { color: C.gold, pt: 1.5 }, shadow: makeShadow(),
    });
    s.addText(label, { x, y: arrowY, w: 1.6, h: 0.55, fontSize: 13, color: C.gold, bold: true, fontFace: "Meiryo", align: "center", valign: "middle", margin: 0 });
    if (i < 3) {
      s.addText("→", { x: x + 1.62, y: arrowY, w: 0.38, h: 0.55, fontSize: 18, color: C.teal, bold: true, fontFace: "Arial", align: "center", valign: "middle", margin: 0 });
    }
  });

  s.addText("「全フローをAIで自動化・最適化」できるパートナーとして、\nお役に立てます。まずはお気軽にご相談ください。", {
    x: 1.0, y: 2.82, w: 8.0, h: 0.9,
    fontSize: 13, color: C.light, fontFace: "Meiryo",
    align: "center", valign: "middle", margin: 0,
  });

  // Contact
  s.addShape(pres.shapes.RECTANGLE, { x: 2.8, y: 3.85, w: 4.4, h: 0.6, fill: { color: "0D1326" }, line: { color: C.gold, pt: 1.5 }, shadow: makeShadow() });
  s.addText([
    { text: "Contact: ", options: { color: C.muted, fontSize: 12 } },
    { text: "rapisrazly@gmail.com", options: { color: C.gold, bold: true, fontSize: 13 } },
  ], { x: 2.8, y: 3.85, w: 4.4, h: 0.6, fontFace: "Meiryo", align: "center", valign: "middle", margin: 0 });

  // Bottom bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.42, w: 10, h: 0.2, fill: { color: C.gold }, line: { color: C.gold } });
}

// ─── WRITE FILE ───────────────────────────────────────────────────────────────
pres.writeFile({ fileName: "C:\\Users\\rapis\\OneDrive\\デスクトップ\\TEST\\portfolio.pptx" })
  .then(() => console.log("✅ portfolio.pptx saved!"))
  .catch(err => { console.error("❌ Error:", err); process.exit(1); });
