// Shared admin helpers used by both console variants

// Mock data shared across variants
const ADMIN_DATA = {
  storeLabel: '関西 / 神戸三宮店',
  kpis: [
    { label: 'AI 会話数 (週)',    big: '12,840',  unit: '',   delta: '+18.4%',  dir: 'up',   trend: [20,28,24,36,32,44,52] },
    { label: 'クーポン利用率',    big: '34.2',    unit: '%',  delta: '+4.1pt',  dir: 'up',   trend: [18,22,26,24,30,32,34] },
    { label: '提案→来店 転換率',  big: '8.6',     unit: '%',  delta: '+1.2pt',  dir: 'up',   trend: [5,6,5.5,7,6.8,8,8.6] },
    { label: '平均購買単価',      big: '¥2,840', unit: '',   delta: '−¥80',    dir: 'down', trend: [3000,2950,2900,2880,2870,2860,2840] },
  ],
  popularQ: [
    { q: '今日 安いもの', c: 1842, conv: 14.2, dir: 'up'   },
    { q: '夕飯 おすすめ', c: 1208, conv: 22.6, dir: 'up'   },
    { q: '〇〇 はどこ',   c:  864, conv: 38.4, dir: 'flat' },
    { q: '子供 喜ぶ',     c:  712, conv: 19.0, dir: 'up'   },
    { q: '500円 以内',    c:  582, conv: 16.8, dir: 'down' },
    { q: 'ヘルシー',      c:  430, conv: 11.2, dir: 'up'   },
  ],
  feed: [
    { t: '18:42', tag: 'CHAT',     who: '匿名 #4821', what: '「夕飯は」 → 親子丼提案 (鶏もも肉)', tone: T.maroon },
    { t: '18:42', tag: 'COUPON',   who: '会員 田中様', what: '卵 ¥50 OFF を取得',                 tone: T.gold },
    { t: '18:41', tag: 'STORE',    who: '匿名 #4820', what: '「鮭はどこ」 → 鮮魚 F-2 案内',         tone: T.matcha },
    { t: '18:41', tag: 'PURCHASE', who: '会員 木村様', what: '提案商品 4品で精算 ¥2,840',           tone: T.fresh },
    { t: '18:40', tag: 'CHAT',     who: '匿名 #4819', what: '「500円以内 ヘルシー」 → 豆腐サラダ',  tone: T.maroon },
    { t: '18:40', tag: 'COUPON',   who: '会員 佐藤様', what: 'お惣菜 20% OFF を取得',              tone: T.gold },
    { t: '18:39', tag: 'CHAT',     who: '匿名 #4818', what: '「子供 喜ぶ おやつ」 → クッキー',     tone: T.maroon },
    { t: '18:39', tag: 'STORE',    who: '匿名 #4817', what: '「鶏もも肉 何個」 → 在庫 12 残',       tone: T.matcha },
  ],
  products: [
    { kind: 'chicken', name: '国産 鶏もも肉 300g', click: 4128, buy: 1284, rate: 31.1 },
    { kind: 'egg',     name: '兵庫 朝採卵 10個',  click: 3402, buy:  944, rate: 27.7 },
    { kind: 'salmon',  name: '北海道産 銀鮭 2切', click: 2940, buy:  812, rate: 27.6 },
    { kind: 'cabbage', name: '春キャベツ 1玉',    click: 1210, buy:  282, rate: 23.3 },
    { kind: 'tofu',    name: '木綿豆腐 300g',      click:  820, buy:  198, rate: 24.1 },
  ],
  priority: [
    { name: '国産 鶏もも肉 300g',  rate: 82, on: true,  kind: 'chicken' },
    { name: '北海道 銀鮭 2切',    rate: 71, on: true,  kind: 'salmon'  },
    { name: '兵庫 朝採卵 10個',   rate: 64, on: true,  kind: 'egg'     },
    { name: '春キャベツ 1玉',     rate: 38, on: false, kind: 'cabbage' },
    { name: 'おでんセット',       rate: 26, on: false, kind: 'tofu'    },
  ],
  hourly: (() => {
    let seed = 7;
    const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
    return Array.from({ length: 24 }, (_, h) => {
      const wave = 28 + 38 * Math.sin((h - 10) / 24 * Math.PI * 1.6);
      const peak = h === 18 || h === 19 ? 32 : (h >= 11 && h <= 13 ? 22 : 0);
      const ai = Math.max(6, wave + rnd() * 14);
      const coup = peak ? peak * .9 + rnd() * 6 : ai * .28;
      return { h, ai: Math.min(94, ai), coup: Math.min(36, coup) };
    });
  })(),
};

// ── Sparkline ──────────────────────────────────────────────
function Sparkline({ trend, w = 130, h = 36, color = T.maroon, fill = true }) {
  const max = Math.max(...trend), min = Math.min(...trend);
  const range = max - min || 1;
  const pts = trend.map((v, i) => {
    const x = (i / (trend.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: h, display: 'block' }}>
      {fill && <polyline points={`0,${h} ${pts} ${w},${h}`} fill={color} opacity=".12"/>}
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Bar stack (24h) ────────────────────────────────────────
function HourlyBarStack({ height = 200, color1 = T.maroon, color2 = T.gold }) {
  const data = ADMIN_DATA.hourly;
  const W = 600, H = height;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: H, display: 'block' }}>
      {[0,1,2,3].map(i => <line key={i} x1="0" x2={W} y1={(i+1)*(H/5)} y2={(i+1)*(H/5)} stroke={T.lineSoft} strokeWidth=".5"/>)}
      {data.map((b, i) => {
        const x = i * (W / 24) + 5;
        const bw = W / 24 - 7;
        return (
          <g key={i}>
            <rect x={x} y={H - b.ai - 4} width={bw} height={b.ai} fill={color1}/>
            <rect x={x} y={H - b.ai - b.coup - 4} width={bw} height={b.coup} fill={color2}/>
          </g>
        );
      })}
      <text x="0" y={H-2} fontSize="9" fill={T.inkSoft} fontFamily={MONO}>0:00</text>
      <text x={W/4-15} y={H-2} fontSize="9" fill={T.inkSoft} fontFamily={MONO}>6:00</text>
      <text x={W/2-18} y={H-2} fontSize="9" fill={T.inkSoft} fontFamily={MONO}>12:00</text>
      <text x={3*W/4-20} y={H-2} fontSize="9" fill={T.inkSoft} fontFamily={MONO}>18:00</text>
      <text x={W-32} y={H-2} fontSize="9" fill={T.inkSoft} fontFamily={MONO}>23:59</text>
    </svg>
  );
}

Object.assign(window, { ADMIN_DATA, Sparkline, HourlyBarStack });
