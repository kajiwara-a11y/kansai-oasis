// 阪急OASIS · Brand-faithful visual system
// Based directly on hankyu-oasis.kansai-foodmarket.co.jp
//   - white surfaces, black logo block, warm tan dividers
//   - bright orange as primary CTA accent (matches "TOP" nav state)
//   - red as sale accent, brown for secondary
//   - Noto Sans JP heavy
// Friendly, bright, accessible — daily-use supermarket app.

const T = {
  // surfaces
  bg:        '#ffffff',     // primary white
  paper:     '#ffffff',
  paperAlt:  '#f7f5f0',     // very faint warm gray
  shelf:     '#faf7f1',     // hero/section background
  cream:     '#fdf9ed',     // section accent
  newsprint: '#f3eedd',     // chirashi paper
  outline:   '#ebe3d3',     // tan hairline
  outlineSoft:'#f0eadd',
  divider:   '#e8e3d2',
  shadow:    'rgba(40, 30, 10, .08)',

  // ink
  ink:       '#1a1a1a',     // body
  inkMid:    '#5a5045',
  inkSoft:   '#8c8377',
  inkMute:   '#b8b0a2',

  // brand
  brand:     '#1a1a1a',     // black logo block
  orange:    '#2e8540',     // primary accent (now green)
  orangeDeep:'#1e6b2d',
  orangeSoft:'#dcebcb',
  tan:       '#c6a56c',     // gold/tan dividers under nav
  tanSoft:   '#e9dcc0',
  brown:     '#8b6f47',     // secondary brown
  brownDeep: '#5a4530',

  // utilities
  sale:      '#d8232a',     // sale red (Japanese supermarket convention)
  saleSoft:  '#fde2e4',
  saleDeep:  '#a8161c',
  fresh:     '#3e7a32',
  freshSoft: '#dceac3',
  warn:      '#e6a619',
  point:     '#e8528a',     // S point pink accent
  pointSoft: '#fde2ec',
  member:    '#6b0b14',     // hankyu maroon (used very sparingly)
};

// ── Type ──────────────────────────────────────────────────────────
// Noto Sans JP heavy, with a single bold display weight for numbers
const SANS    = `"Noto Sans JP", "Hiragino Sans", "Yu Gothic Medium", system-ui, sans-serif`;
const DISPLAY = `"Noto Sans JP", "Hiragino Sans", system-ui, sans-serif`;
const NUM     = `"Roboto", "Noto Sans JP", system-ui, sans-serif`;
const MONO    = `"JetBrains Mono", ui-monospace, "SF Mono", monospace`;

(function() {
  if (typeof document === 'undefined' || document.getElementById('oasis-fonts-v5')) return;
  const link = document.createElement('link');
  link.id = 'oasis-fonts-v5';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2'
    + '?family=Noto+Sans+JP:wght@400;500;600;700;800;900'
    + '&family=Roboto:wght@400;500;700;900'
    + '&family=JetBrains+Mono:wght@400;500'
    + '&display=swap';
  document.head.appendChild(link);

  const s = document.createElement('style');
  s.textContent = `
    *, *::before, *::after { box-sizing: border-box; }
    body { margin: 0; font-family: ${SANS}; color: ${T.ink};
           -webkit-font-smoothing: antialiased;
           font-feature-settings: "palt"; }
    button { font-family: inherit; }
    .oas-num    { font-variant-numeric: tabular-nums; font-family: ${NUM}; }
    .oas-noscroll::-webkit-scrollbar { display: none; }
    .oas-noscroll { scrollbar-width: none; }
    @keyframes oasFadeIn { from { opacity: 0 } to { opacity: 1 } }
    @keyframes oasSlideUp { from { transform: translateY(100%) } to { transform: translateY(0) } }
    @keyframes oasTypeDot { 0%,80%,100% { opacity: .25; transform: translateY(0) } 40% { opacity: 1; transform: translateY(-2px) } }
  `;
  document.head.appendChild(s);
})();

// ── Icons (line-art) ─────────────────────────────────────────────
function Icon({ name, size = 20, color = 'currentColor', sw = 1.6, fill }) {
  const p = { fill: 'none', stroke: color, strokeWidth: sw, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const dot = (cx, cy, r = .9) => <circle cx={cx} cy={cy} r={r} fill={color}/>;
  const G = {
    home:    <g {...p}><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/></g>,
    homeF:   <g><path d="M3 11l9-7 9 7v10H3z" fill={fill || color}/></g>,
    chat:    <g {...p}><path d="M4 5h16v11H8l-4 4z"/>{dot(9,10.5)}{dot(12,10.5)}{dot(15,10.5)}</g>,
    sparkle: <g {...p}><path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6z"/><path d="M19 17l.6 1.6L21 19l-1.4.4L19 21l-.6-1.6L17 19l1.4-.4z"/></g>,
    sparkleF: <g><path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6z" fill={fill || color}/><path d="M19 17l.6 1.6L21 19l-1.4.4L19 21l-.6-1.6L17 19l1.4-.4z" fill={fill || color}/></g>,
    list:    <g {...p}><path d="M9 6h11M9 12h11M9 18h11"/>{dot(5,6,1)}{dot(5,12,1)}{dot(5,18,1)}</g>,
    coupon:  <g {...p}><path d="M3 9v2a2 2 0 0 1 0 4v2h18v-2a2 2 0 0 1 0-4V9z"/><path d="M14 9v9" strokeDasharray="2 2"/></g>,
    couponF: <g><path d="M3 9v2a2 2 0 0 1 0 4v2h18v-2a2 2 0 0 1 0-4V9z" fill={fill || color}/><path d="M14 9v9" stroke={T.bg} strokeWidth="1.6" strokeDasharray="2 2"/></g>,
    flyer:   <g {...p}><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 7h8M8 11h8M8 15h5"/></g>,
    flyerF:  <g><rect x="4" y="3" width="16" height="18" rx="1" fill={fill || color}/><path d="M8 7h8M8 11h8M8 15h5" stroke={T.bg} strokeWidth="1.6"/></g>,
    store:   <g {...p}><path d="M3 8l1.5-4h15L21 8"/><path d="M3 8v12h18V8"/><path d="M3 8c0 2 2 3 3 3s3-1 3-3c0 2 2 3 3 3s3-1 3-3c0 2 2 3 3 3s3-1 3-3"/><path d="M9 20v-6h6v6"/></g>,
    storeF:  <g><path d="M3 8l1.5-4h15L21 8v12H3z" fill={fill || color}/><path d="M9 20v-6h6v6" stroke={T.bg} strokeWidth="1.6" fill={T.bg}/></g>,
    user:    <g {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></g>,
    userF:   <g><circle cx="12" cy="8" r="4" fill={fill || color}/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" fill={fill || color}/></g>,
    pin:     <g {...p}><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></g>,
    plus:    <g {...p}><path d="M12 5v14M5 12h14"/></g>,
    minus:   <g {...p}><path d="M5 12h14"/></g>,
    search:  <g {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></g>,
    mic:     <g {...p}><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></g>,
    bell:    <g {...p}><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20a2 2 0 0 0 4 0"/></g>,
    chevR:   <g {...p}><path d="m9 6 6 6-6 6"/></g>,
    chevL:   <g {...p}><path d="m15 6-6 6 6 6"/></g>,
    chevD:   <g {...p}><path d="m6 9 6 6 6-6"/></g>,
    chevU:   <g {...p}><path d="m6 15 6-6 6 6"/></g>,
    arrR:    <g {...p}><path d="M4 12h16M14 6l6 6-6 6"/></g>,
    arrL:    <g {...p}><path d="M20 12H4M10 6l-6 6 6 6"/></g>,
    close:   <g {...p}><path d="M6 6l12 12M18 6 6 18"/></g>,
    check:   <g {...p}><path d="m5 12 4.5 4.5L19 7"/></g>,
    clock:   <g {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></g>,
    heart:   <g {...p}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></g>,
    heartF:  <g><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" fill={fill || color}/></g>,
    flame:   <g {...p}><path d="M12 3c1 3 4 4 4 8a4 4 0 1 1-8 0c0-2 1-3 2-4-1 3 .5 4 2-1 0 2-1 3-1 5"/></g>,
    bag:     <g {...p}><path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></g>,
    cart:    <g {...p}><circle cx="9" cy="20" r="1.5"/><circle cx="17" cy="20" r="1.5"/><path d="M3 4h2l3 12h11l2-8H7"/></g>,
    qr:      <g {...p}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3zM20 14v3M14 20h3v1M20 20v1"/></g>,
    grid:    <g {...p}><rect x="4" y="4" width="7" height="7"/><rect x="13" y="4" width="7" height="7"/><rect x="4" y="13" width="7" height="7"/><rect x="13" y="13" width="7" height="7"/></g>,
    star:    <g {...p}><path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z"/></g>,
    starF:   <g><path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z" fill={fill || color}/></g>,
    refresh: <g {...p}><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 4v4h-4"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 20v-4h4"/></g>,
    filter:  <g {...p}><path d="M4 5h16l-6 8v6l-4-2v-4z"/></g>,
    book:    <g {...p}><path d="M4 4h7c2 0 3 1 3 3v13c0-2-1-3-3-3H4z"/><path d="M20 4h-7c-2 0-3 1-3 3v13c0-2 1-3 3-3h7z"/></g>,
    bookF:   <g><path d="M4 4h7c2 0 3 1 3 3v13c0-2-1-3-3-3H4z" fill={fill || color}/><path d="M20 4h-7c-2 0-3 1-3 3v13c0-2 1-3 3-3h7z" fill={fill || color}/></g>,
    gift:    <g {...p}><rect x="3" y="9" width="18" height="12" rx="1"/><path d="M3 14h18M12 9v12"/><path d="M12 9c-2-4-6-4-6-1s2 1 6 1zM12 9c2-4 6-4 6-1s-2 1-6 1z"/></g>,
    leaf:    <g {...p}><path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14z"/><path d="M5 19c4-4 8-6 14-6"/></g>,
    pkg:     <g {...p}><path d="M3 7l9-4 9 4-9 4z"/><path d="M3 7v10l9 4 9-4V7M12 11v10"/></g>,
    info:    <g {...p}><circle cx="12" cy="12" r="9"/><path d="M12 8v.01M12 12v5"/></g>,
    settings:<g {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></g>,
    barcode: <g {...p}><path d="M4 6v12M7 6v12M10 6v12M13 6v12M16 6v12M19 6v12" strokeWidth="1.4"/></g>,
    truck:   <g {...p}><rect x="2" y="6" width="13" height="10"/><path d="M15 9h4l2 3v4h-6z"/><circle cx="6" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/></g>,
    point:   <g {...p}><circle cx="12" cy="12" r="9"/><path d="M9 8v8M9 8h3a2 2 0 0 1 0 4H9"/></g>,
  };
  return <svg viewBox="0 0 24 24" width={size} height={size} style={{display:'inline-block', verticalAlign:'middle', flex:'0 0 auto'}} aria-hidden="true">{G[name] || null}</svg>;
}

// ── 阪急OASIS lockup ─────────────────────────────────────────────
function OasisLogo({ height = 28, dark = true }) {
  // black box with white "阪急" stacked + "OASIS" wordmark
  const bg = dark ? T.brand : T.bg;
  const fg = dark ? T.bg : T.brand;
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center',
      background: bg, color: fg, padding: `${height * 0.18}px ${height * 0.35}px`,
      borderRadius: 2,
      fontFamily: SANS, fontWeight: 900, letterSpacing: '0',
      height,
    }}>
      <span style={{ fontSize: height * 0.42, marginRight: height * 0.18, letterSpacing: '.04em' }}>阪急</span>
      <span style={{ fontSize: height * 0.55, fontFamily: NUM, fontWeight: 900, letterSpacing: '-.01em', fontStyle: 'italic' }}>OASIS</span>
    </div>
  );
}

// ── Pill / Badge ─────────────────────────────────────────────────
function Pill({ children, tone = 'ink', size = 'sm', style = {} }) {
  const tones = {
    ink:       { bg: T.ink,         fg: '#fff' },
    paper:     { bg: T.paperAlt,    fg: T.ink },
    paperLine: { bg: 'transparent', fg: T.ink, line: T.outline },
    orange:    { bg: T.orange,      fg: '#fff' },
    orangeSoft:{ bg: T.orangeSoft,  fg: T.orangeDeep },
    sale:      { bg: T.sale,        fg: '#fff' },
    saleSoft:  { bg: T.saleSoft,    fg: T.saleDeep },
    fresh:     { bg: T.freshSoft,   fg: T.fresh },
    point:     { bg: T.point,       fg: '#fff' },
    pointSoft: { bg: T.pointSoft,   fg: T.point },
    brown:     { bg: T.brown,       fg: '#fff' },
    tan:       { bg: T.tanSoft,     fg: T.brownDeep },
  };
  const c = tones[tone] || tones.ink;
  const sizes = {
    xs: { fs: 9.5, pad: '2px 7px' },
    sm: { fs: 10.5, pad: '3px 9px' },
    md: { fs: 12, pad: '5px 11px' },
    lg: { fs: 14, pad: '7px 14px' },
  };
  const sz = sizes[size] || sizes.sm;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      background: c.bg, color: c.fg,
      boxShadow: c.line ? `inset 0 0 0 1px ${c.line}` : 'none',
      fontFamily: SANS, fontWeight: 700, fontSize: sz.fs,
      padding: sz.pad, borderRadius: 999, letterSpacing: '.04em',
      whiteSpace: 'nowrap', ...style,
    }}>{children}</span>
  );
}

// ── Price (red bold, supermarket convention) ─────────────────────
function Yen({ value, size = 22, mute, strike, suffix, tone, style }) {
  const c = strike || mute ? T.inkSoft : (tone === 'sale' ? T.sale : T.ink);
  return (
    <span className="oas-num" style={{
      fontFamily: NUM, fontWeight: tone === 'sale' ? 900 : 700,
      color: c,
      fontSize: size, lineHeight: 1, letterSpacing: '-.01em',
      textDecoration: strike ? 'line-through' : 'none',
      opacity: strike ? .55 : 1,
      display: 'inline-flex', alignItems: 'baseline',
      ...style,
    }}>
      <span style={{ fontSize: size * 0.55, marginRight: 1, fontFamily: SANS, fontWeight: 700, letterSpacing: 0 }}>¥</span>
      <span>{value.toLocaleString()}</span>
      {suffix && <span style={{ fontSize: size * 0.42, fontFamily: SANS, color: T.inkSoft, marginLeft: 4, fontWeight: 500 }}>{suffix}</span>}
    </span>
  );
}

// ── Section header — bright, friendly ────────────────────────────
function SectionHead({ title, en, more, onMore, accent = T.orange, style }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'baseline', padding: '0 16px',
      marginBottom: 10, ...style,
    }}>
      <span style={{
        width: 3, height: 18, background: accent, marginRight: 9,
        alignSelf: 'center', borderRadius: 1,
      }}/>
      <h2 style={{
        margin: 0, fontFamily: SANS, fontWeight: 800, fontSize: 16,
        letterSpacing: '.02em', color: T.ink,
      }}>{title}</h2>
      {en && <span style={{
        marginLeft: 8, fontFamily: NUM, fontWeight: 500, fontSize: 10,
        color: T.inkSoft, letterSpacing: '.1em', textTransform: 'uppercase',
      }}>{en}</span>}
      <div style={{ flex: 1 }}/>
      {more && <button onClick={onMore} style={{
        border: 0, background: 'transparent', color: T.brown, cursor: 'pointer',
        fontFamily: SANS, fontWeight: 600, fontSize: 11.5, letterSpacing: '.05em',
        display: 'inline-flex', alignItems: 'center', gap: 2, padding: 0,
      }}>{more} <Icon name="chevR" size={12}/></button>}
    </div>
  );
}

// ── Real photo URLs from TheMealDB.
//    Ingredients are clean white-background PNGs (consistent style).
//    Dishes use meal photos from the Japanese-area catalog.
//    Kinds without a good photo match fall back to the SVG illustration.
const _MDB_I = 'https://www.themealdb.com/images/ingredients/';
const _MDB_M = 'https://www.themealdb.com/images/media/meals/';
const FOOD_IMG = {
  chicken:  _MDB_I + 'Chicken.png',
  egg:      _MDB_I + 'Eggs.png',
  salmon:   _MDB_I + 'Salmon.png',
  cabbage:  _MDB_I + 'Cabbage.png',
  rice:     _MDB_I + 'Rice.png',
  onion:    _MDB_I + 'Onions.png',
  tomato:   _MDB_I + 'Tomatoes.png',
  tofu:     _MDB_I + 'Tofu.png',
  milk:     _MDB_I + 'Milk.png',
  bread:    _MDB_I + 'Bread.png',
  fish:     _MDB_I + 'Fish.png',
  apple:    _MDB_I + 'Apples.png',
  banana:   _MDB_I + 'Banana.png',
  noodle:   _MDB_I + 'Noodles.png',
  pork:     _MDB_I + 'Pork.png',
  beef:     _MDB_I + 'Beef.png',
  cheese:   _MDB_I + 'Cheese.png',
  yogurt:   _MDB_I + 'Yogurt.png',
  sushi:    _MDB_M + 'g046bb1663960946.jpg',
  oyakodon: _MDB_M + 'd8f6qx1604182128.jpg',  // Katsudon — same donburi style
  nikujaga: _MDB_M + 'uyqrrv1511553350.jpg',  // Beef stew
  bento:    _MDB_M + 'kw92t41604181871.jpg',  // Japanese gohan rice bowl
  misoSoup: _MDB_M + '1529446137.jpg',         // Egg drop soup
  salad:    _MDB_M + 'zry07j1763779321.jpg',  // Noodle bowl salad
  // natto, juice → SVG fallback (no good match in catalog)
};

// ── Food mark — real photo with SVG illustration fallback ─────────
function FoodMark({ kind, size = 80, bg }) {
  const [failed, setFailed] = React.useState(false);
  const imgSrc = FOOD_IMG[kind];
  const ink = T.ink;
  const sw = (s = 1.4) => ({ fill: 'none', stroke: ink, strokeWidth: s, strokeLinecap: 'round', strokeLinejoin: 'round' });
  const M = {
    chicken: <g><path d="M22 38c0-10 8-18 18-18s14 6 14 13c0 6-5 11-11 11l-2 5c-2 5-8 7-13 7s-9-4-9-8c0-4 3-6 3-10z" fill="#f4cf9c" {...sw()}/><circle cx="46" cy="29" r="1.6" fill={ink}/></g>,
    egg:     <g><ellipse cx="40" cy="42" rx="15" ry="19" fill="#fff4c8" {...sw()}/><ellipse cx="35" cy="36" rx="3.5" ry="4.5" fill="#ffe49a" opacity=".7"/></g>,
    salmon:  <g><path d="M14 32c10-6 38-6 50 0v16c-12 6-40 6-50 0z" fill="#f08a6d" {...sw()}/><path d="M14 36c10-3 40-3 50 0M14 42c12-2 38-2 50 0" stroke="#fff" strokeWidth="1.4" opacity=".55"/></g>,
    cabbage: <g><circle cx="40" cy="42" r="20" fill="#c5dfaa" {...sw()}/><path d="M40 22c0 10-6 16-16 18M40 22c0 10 6 16 16 18M28 52c4-2 8-2 12 0s8 2 12 0M40 24v36" {...sw(1.3)}/></g>,
    rice:    <g><path d="M20 32c0-2 4-4 20-4s20 2 20 4v18c0 4-8 8-20 8s-20-4-20-8z" fill="#fffcec" {...sw()}/><ellipse cx="30" cy="38" rx="2" ry="3" fill={ink} opacity=".4"/><ellipse cx="40" cy="34" rx="2" ry="3" fill={ink} opacity=".4"/><ellipse cx="50" cy="40" rx="2" ry="3" fill={ink} opacity=".4"/></g>,
    onion:   <g><ellipse cx="40" cy="46" rx="18" ry="16" fill="#f0d8b4" {...sw()}/><path d="M40 30v32M30 34c4 8 4 16 0 24M50 34c-4 8-4 16 0 24M40 30c-2-4 2-8 6-8M40 30c2-4-2-8-6-8" {...sw(1.2)}/></g>,
    tomato:  <g><circle cx="40" cy="46" r="18" fill="#e94f4f" {...sw()}/><path d="M30 30c2 2 4 2 6 0s4-2 6 0s4 2 6 0M40 32v-6" stroke={T.fresh} strokeWidth="1.8" fill="none" strokeLinecap="round"/></g>,
    tofu:    <g><rect x="20" y="30" width="40" height="28" rx="2" fill="#fbf5da" {...sw()}/><path d="M20 38h40M20 46h40M30 30v28M40 30v28M50 30v28" stroke={ink} strokeWidth=".7" opacity=".35"/></g>,
    milk:    <g><path d="M28 22h24l2 6v32a4 4 0 0 1-4 4H30a4 4 0 0 1-4-4V28z" fill="#fbf5da" {...sw()}/><rect x="32" y="40" width="16" height="11" fill={T.ink}/></g>,
    bread:   <g><path d="M16 38c0-6 4-12 14-12s30 2 30 14c0 10-2 18-8 18H22c-4 0-6-6-6-10z" fill="#dbb377" {...sw()}/><path d="M22 42c4 0 4 8 0 8M30 40c4 0 4 10 0 10M40 40c4 0 4 10 0 10M50 40c4 0 4 10 0 10M58 42c4 0 4 8 0 8" {...sw(1.2)}/></g>,
    fish:    <g><path d="M8 42c4-8 14-14 28-14 8 0 14 4 18 6l8-6v28l-8-6c-4 2-10 6-18 6-14 0-24-6-28-14z" fill="#9bb5c4" {...sw()}/><circle cx="50" cy="38" r="2" fill={ink}/><path d="M30 36c-2 4-2 8 0 12" stroke={ink} strokeWidth="1.3" fill="none"/></g>,
    apple:   <g><circle cx="40" cy="48" r="16" fill="#e94f4f" {...sw()}/><path d="M40 32c0-6 4-10 8-10M40 32c0-3-1-6-3-8" stroke={T.fresh} strokeWidth="1.8" fill="none" strokeLinecap="round"/></g>,
    banana:  <g><path d="M20 30c0 18 14 30 32 30c6 0 10-2 12-4c-2 0-8 0-14-4c-12-6-18-14-22-24c-2-2-6-2-8 2z" fill="#ffd34d" {...sw()}/></g>,
    natto:   <g><rect x="20" y="34" width="40" height="22" fill="#fff" {...sw()}/><circle cx="30" cy="42" r="3" fill="#c9a05b"/><circle cx="38" cy="46" r="3" fill="#c9a05b"/><circle cx="46" cy="42" r="3" fill="#c9a05b"/><circle cx="52" cy="48" r="3" fill="#c9a05b"/></g>,
    noodle:  <g><ellipse cx="40" cy="56" rx="28" ry="6" fill="#fffcef"/><path d="M12 56c0 5 13 10 28 10s28-5 28-10" fill="#fffcef" {...sw()}/><path d="M16 56c4-8 24-12 28-4M20 56c4-10 28-14 32-2M24 56c4-8 30-10 30 0" stroke={ink} strokeWidth="1" fill="none"/></g>,
    sushi:   <g><ellipse cx="40" cy="50" rx="22" ry="8" fill="#fffcef" {...sw()}/><rect x="22" y="34" width="36" height="16" rx="2" fill="#f08a6d" {...sw()}/><path d="M22 40h36" stroke="#fff" strokeWidth="1.2" opacity=".7"/></g>,
    bento:   <g><rect x="14" y="30" width="52" height="30" rx="2" fill="#fbf5da" {...sw()}/><rect x="18" y="34" width="22" height="22" fill="#fff4c8"/><rect x="42" y="34" width="11" height="10" fill="#e94f4f"/><rect x="42" y="46" width="11" height="10" fill="#c5dfaa"/><rect x="55" y="34" width="9" height="22" fill="#f4cf9c"/></g>,
    juice:   <g><path d="M28 22h24v8l-2 30c0 4-4 6-10 6s-10-2-10-6l-2-30z" fill="#ffb37a" {...sw()}/><ellipse cx="40" cy="26" rx="12" ry="3" fill="#fff" opacity=".4"/></g>,
    yogurt:  <g><path d="M26 28h28l-2 32c0 3-4 5-12 5s-12-2-12-5z" fill="#fff" {...sw()}/><rect x="28" y="30" width="24" height="8" fill={T.orange}/></g>,
    pork:    <g><path d="M18 36c0-8 8-14 22-14s22 6 22 14v6c0 8-8 14-22 14s-22-6-22-14z" fill="#f2b4b4" {...sw()}/><circle cx="32" cy="36" r="2" fill="#fff"/><circle cx="48" cy="36" r="2" fill="#fff"/></g>,
    beef:    <g><circle cx="40" cy="42" r="20" fill="#c8242a" {...sw()}/><path d="M28 40c4-2 8-2 12 0M44 44c4-2 8-2 12 0M32 50c4-2 8-2 12 0" stroke="#fff" strokeWidth="1.6" fill="none" opacity=".6"/></g>,
    cheese:  <g><path d="M14 30L60 22V54L14 60z" fill="#ffd34d" {...sw()}/><circle cx="30" cy="44" r="2.5" fill="#cc9926"/><circle cx="44" cy="38" r="2" fill="#cc9926"/><circle cx="48" cy="50" r="3" fill="#cc9926"/></g>,
    misoSoup:<g><path d="M16 36h48l-4 22c-1 4-6 6-10 6H30c-4 0-9-2-10-6z" fill="#c9a05b" {...sw()}/><ellipse cx="40" cy="38" rx="22" ry="3" fill="#c9a05b"/><path d="M28 30c-2 2-2 4 0 6M38 26c-2 2-2 4 0 6M48 30c-2 2-2 4 0 6" {...sw(1.2)}/></g>,
    oyakodon:<g>
      <ellipse cx="40" cy="60" rx="32" ry="6" fill={T.ink} opacity=".15"/>
      <ellipse cx="40" cy="44" rx="30" ry="8" fill="#fff"/>
      <path d="M10 44c0 8 14 14 30 14s30-6 30-14" fill="#fff" stroke={T.ink} strokeWidth="1.2"/>
      <ellipse cx="40" cy="44" rx="25" ry="5" fill="#fffcec"/>
      <circle cx="34" cy="40" r="6" fill="#ffd34d" opacity=".9"/>
      <circle cx="34" cy="38" r="3" fill="#ffe49a"/>
      <ellipse cx="48" cy="42" rx="6" ry="2" fill="#f4cf9c" stroke={T.ink} strokeWidth=".5"/>
      <ellipse cx="32" cy="46" rx="4" ry="1.4" fill={T.fresh}/>
    </g>,
    nikujaga:<g>
      <ellipse cx="40" cy="60" rx="32" ry="6" fill={T.ink} opacity=".15"/>
      <ellipse cx="40" cy="46" rx="30" ry="8" fill="#7a4a2a"/>
      <path d="M10 46c0 8 14 14 30 14s30-6 30-14" fill="#7a4a2a" stroke={T.ink} strokeWidth="1.2"/>
      <circle cx="32" cy="42" r="6" fill="#f0d8b4"/>
      <circle cx="46" cy="44" r="5" fill="#f0d8b4"/>
      <circle cx="40" cy="40" r="4" fill="#c8242a"/>
      <ellipse cx="50" cy="40" rx="4" ry="2" fill="#c5dfaa"/>
    </g>,
    salad:   <g>
      <ellipse cx="40" cy="60" rx="32" ry="6" fill={T.ink} opacity=".15"/>
      <ellipse cx="40" cy="46" rx="30" ry="8" fill="#fff"/>
      <path d="M10 46c0 8 14 14 30 14s30-6 30-14" fill="#fff" stroke={T.ink} strokeWidth="1.2"/>
      <circle cx="30" cy="42" r="4" fill="#e94f4f"/>
      <ellipse cx="40" cy="38" rx="6" ry="4" fill="#c5dfaa"/>
      <ellipse cx="48" cy="44" rx="5" ry="3" fill="#c5dfaa"/>
      <circle cx="36" cy="44" r="2" fill="#ffd34d"/>
    </g>,
  };
  if (imgSrc && !failed) {
    return (
      <div style={{
        width: size, height: size,
        background: bg ?? T.paperAlt,
        flex: '0 0 auto',
        borderRadius: bg ? 8 : Math.max(6, size * 0.12),
        overflow: 'hidden',
      }}>
        <img src={imgSrc} alt="" onError={() => setFailed(true)}
             style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
      </div>
    );
  }
  return (
    <div style={{
      width: size, height: size,
      background: bg ?? 'transparent',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto',
      borderRadius: bg ? 8 : 0,
    }}>
      <svg viewBox="0 0 80 80" width={size * .9} height={size * .9}>{M[kind] || M.egg}</svg>
    </div>
  );
}

Object.assign(window, {
  T, SANS, DISPLAY, NUM, MONO,
  Icon, OasisLogo, Pill, Yen, SectionHead, FoodMark,
});
