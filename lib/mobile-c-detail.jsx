// ─────────────────────────────────────────────────────────────
// MOBILE · VARIANT C — Detail screens / sub-views
// product / shopping-list / aisle-map / recipe-detail
// ai-chat / search / notif / barcode
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// PRODUCT detail
// ─────────────────────────────────────────────────────────────
function C_Product({ data, pop, push }) {
  const p = data || { name: '国産 鶏もも肉', sub: '300g', price: 398, was: 598, kind: 'chicken' };
  const off = p.was ? Math.round((1 - p.price / p.was) * 100) : 0;
  const [fav, setFav] = React.useState(false);
  const [claimed, setClaimed] = React.useState(false);
  return (
    <div style={{ height: '100%', background: T.bg, display: 'flex', flexDirection: 'column' }}>
      <C_TopBar leftBack onBack={pop} title={p.name} sub={`商品コード · 4901-2345-67890`}
        right={<button onClick={() => setFav(f => !f)} style={{ ...iconBtn, color: '#fff' }}>
          <Icon name={fav ? 'heartF' : 'heart'} size={20} color={fav ? T.orange : '#fff'}/>
        </button>}/>
      <div style={{ flex: 1, overflowY: 'auto' }} className="oas-noscroll">
      <div style={{ height: SAFE_TOP + 48 }}/>

      {/* Hero image */}
      <div style={{
        height: 260, background: `linear-gradient(180deg, ${T.shelf} 0%, #fff 100%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
      }}>
        <FoodMark kind={p.kind} size={200}/>
        {off > 0 && <div style={{
          position: 'absolute', top: 12, left: 12, background: T.sale, color: '#fff', borderRadius: 4,
          padding: '4px 10px', fontFamily: NUM, fontWeight: 900, fontSize: 14,
        }}>{off}% OFF</div>}
        <div style={{
          position: 'absolute', bottom: 12, right: 12,
          background: 'rgba(0,0,0,.6)', color: '#fff', borderRadius: 99,
          padding: '4px 10px',
          fontFamily: SANS, fontSize: 10, fontWeight: 600,
        }}>1 / 4</div>
      </div>

      {/* Info */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
          <Pill tone="sale" size="xs">本日限り</Pill>
          <Pill tone="fresh" size="xs">国産</Pill>
          <Pill tone="paperLine" size="xs">精肉</Pill>
        </div>
        <h1 style={{ fontFamily: SANS, fontWeight: 800, fontSize: 20, lineHeight: 1.3, margin: '0 0 4px', color: T.ink }}>
          {p.name}<span style={{ fontSize: 13, color: T.inkSoft, fontWeight: 500, marginLeft: 6 }}>{p.sub}</span>
        </h1>
        <div style={{ fontFamily: SANS, fontSize: 11, color: T.inkSoft }}>JAN: 4901234567890 · 兵庫県産</div>

        <div style={{ marginTop: 14, paddingBottom: 14, borderBottom: `1px solid ${T.outlineSoft}` }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <Yen value={p.price} size={36} tone="sale"/>
            {p.was && <Yen value={p.was} size={13} strike/>}
          </div>
          <div style={{ fontFamily: SANS, fontSize: 11, color: T.inkSoft, marginTop: 4 }}>
            税込 ¥{Math.round(p.price * 1.08)} · 100g あたり ¥{Math.round(p.price / 3)}
          </div>
        </div>

        {/* AI tip — C-distinctive */}
        <div style={{
          marginTop: 14, background: T.brand, color: '#fff',
          borderRadius: 12, padding: '12px 14px',
          display: 'flex', gap: 12,
        }}>
          <div style={{
            width: 30, height: 30, borderRadius: 999, background: T.orange,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto',
          }}>
            <Icon name="sparkleF" size={15} color="#fff"/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700, color: T.orange, letterSpacing: '.15em', marginBottom: 3 }}>AI のおすすめ調理</div>
            <div style={{ fontFamily: SANS, fontSize: 12.5, lineHeight: 1.6 }}>
              親子丼 / 唐揚げ / 照り焼きに最適。本日の卵 (¥178) と合わせると <strong style={{ color: T.orange }}>¥576</strong> で 4 人前。
            </div>
          </div>
        </div>

        {/* Coupon */}
        <div style={{
          marginTop: 14, padding: '12px 14px', background: T.orangeSoft,
          border: `1px dashed ${T.orange}`, borderRadius: 10,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <Icon name="coupon" size={20} color={T.orangeDeep}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 12.5, color: T.orangeDeep }}>追加 ¥30 OFF クーポン</div>
            <div style={{ fontFamily: SANS, fontSize: 10, color: T.orangeDeep, opacity: .8, marginTop: 1 }}>会員限定 · 本日 21:00 まで</div>
          </div>
          <button onClick={() => setClaimed(c => !c)} style={{
            background: claimed ? '#fff' : T.orangeDeep, color: claimed ? T.orangeDeep : '#fff',
            border: `1px solid ${T.orangeDeep}`, cursor: 'pointer',
            padding: '7px 12px', borderRadius: 6,
            fontFamily: SANS, fontWeight: 700, fontSize: 11,
          }}>{claimed ? '取得済' : '取得'}</button>
        </div>
      </div>

      {/* Aisle */}
      <SectionHead title="この商品の売場" en="In-store" style={{ marginTop: 22 }}/>
      <div style={{ padding: '0 16px' }}>
        <div style={{
          background: '#fff', border: `1px solid ${T.outline}`, borderRadius: 12,
          padding: 14, display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon name="pin" size={14} color={T.orange}/>
              <span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 13, color: T.ink }}>精肉 · 棚 B-3</span>
            </div>
            <p style={{ margin: '6px 0 0', fontFamily: SANS, fontSize: 11.5, color: T.inkMid, lineHeight: 1.6 }}>
              入口からまっすぐ、青果の奥<br/>店内 約 22m · 徒歩 30 秒
            </p>
            <button onClick={() => push('aisle-map')} style={{
              marginTop: 10, border: 0, background: T.brand, color: '#fff',
              padding: '8px 14px', borderRadius: 6, cursor: 'pointer',
              fontFamily: SANS, fontWeight: 700, fontSize: 11, letterSpacing: '.05em',
              display: 'inline-flex', alignItems: 'center', gap: 4,
            }}><Icon name="arrR" size={13} color="#fff"/> 売場へ案内</button>
          </div>
          <svg viewBox="0 0 100 78" width="100" height="78">
            <rect x="2" y="2" width="96" height="74" fill={T.paperAlt} stroke={T.outline}/>
            <rect x="10" y="10" width="18" height="12" fill={T.shelf} stroke={T.outline}/>
            <rect x="32" y="10" width="18" height="12" fill={T.orange}/>
            <rect x="54" y="10" width="18" height="12" fill={T.shelf} stroke={T.outline}/>
            <rect x="76" y="10" width="14" height="12" fill={T.shelf} stroke={T.outline}/>
            <rect x="10" y="42" width="80" height="8" fill={T.shelf} stroke={T.outline}/>
            <path d="M14 66 L14 50 L41 50 L41 22" stroke={T.orange} strokeWidth="1.4" strokeDasharray="2 2" fill="none"/>
            <circle cx="14" cy="66" r="2.8" fill={T.fresh}/>
            <text x="41" y="32" textAnchor="middle" fontFamily={SANS} fontSize="6" fontWeight="800" fill="#fff">B-3</text>
          </svg>
        </div>
      </div>

      {/* Related — frequently bought */}
      <SectionHead title="一緒に買われています" en="Frequently bought" style={{ marginTop: 22 }}/>
      <div style={{ display: 'flex', gap: 10, padding: '0 16px', overflowX: 'auto', paddingBottom: 24 }} className="oas-noscroll">
        {[
          { name: '兵庫 朝採卵', sub: '10個', price: 178, was: 248, kind: 'egg' },
          { name: '玉ねぎ',     sub: '3個',  price: 198,           kind: 'onion' },
          { name: '三つ葉',     sub: '1束',  price: 128,           kind: 'cabbage' },
          { name: 'ご飯 2合',   sub: '無洗米', price: 380,           kind: 'rice' },
        ].map((p) => <ProductCard key={p.name} {...p} width={132} onTap={() => push('product', p)}/>)}
      </div>

      {/* Spec */}
      <SectionHead title="商品情報" en="Details" style={{ marginTop: 6 }}/>
      <div style={{ padding: '0 16px 24px' }}>
        <div style={{ background: '#fff', border: `1px solid ${T.outline}`, borderRadius: 10, overflow: 'hidden' }}>
          {[
            ['原産地',   '兵庫県'],
            ['加工日',   '2026年11月25日'],
            ['消費期限', '2026年11月27日'],
            ['内容量',   '300g'],
            ['保存方法', '4°C 以下で冷蔵保存'],
          ].map(([k, v], i) => (
            <div key={k} style={{
              padding: '11px 14px', display: 'flex', alignItems: 'baseline', gap: 12,
              borderTop: i ? `1px solid ${T.outlineSoft}` : 'none',
            }}>
              <span style={{ flex: '0 0 80px', fontFamily: SANS, fontSize: 10.5, color: T.inkSoft, fontWeight: 600, letterSpacing: '.1em' }}>{k}</span>
              <span style={{ flex: 1, fontFamily: SANS, fontSize: 12.5, color: T.ink, fontWeight: 500 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      </div>
      {/* Bottom CTA */}
      <div style={{
        padding: '12px 16px 22px', background: '#fff',
        borderTop: `1px solid ${T.outlineSoft}`,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <button onClick={() => setFav(f => !f)} style={{
          width: 48, height: 48, background: '#fff', border: `1px solid ${T.outline}`, borderRadius: 8,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><Icon name={fav ? 'heartF' : 'heart'} size={20} color={fav ? T.orange : T.inkMid}/></button>
        <button onClick={() => push('shopping-list')} style={{
          flex: 1, background: T.orange, color: '#fff', border: 0, cursor: 'pointer',
          padding: '14px 0', borderRadius: 8,
          fontFamily: SANS, fontWeight: 800, fontSize: 14, letterSpacing: '.08em',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          boxShadow: '0 4px 12px rgba(46,133,64,.3)',
        }}>
          <Icon name="cart" size={18} color="#fff"/>
          リストに追加
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SHOPPING LIST — full view
// ─────────────────────────────────────────────────────────────
function C_ShoppingList({ pop, push }) {
  const [suggestionAdded, setSuggestionAdded] = React.useState(false);
  const [suggestionDismissed, setSuggestionDismissed] = React.useState(false);
  const [items, setItems] = React.useState([
    { aisle: '青果',  n: 1, list: [
      { id: 1, name: '玉ねぎ',     sub: '3個',  price: 198, was: 248, kind: 'onion',   done: false, tag: '特売' },
      { id: 2, name: '三つ葉',     sub: '1束',  price: 128,           kind: 'cabbage', done: false },
    ]},
    { aisle: '精肉',  n: 2, list: [
      { id: 3, name: '国産 鶏もも肉', sub: '300g', price: 398, was: 598, kind: 'chicken', done: true,  tag: '特売' },
    ]},
    { aisle: '日配',  n: 3, list: [
      { id: 4, name: '兵庫 朝採卵', sub: '10個', price: 178, was: 248, kind: 'egg',  done: true, tag: 'クーポン' },
      { id: 5, name: '木綿豆腐',     sub: '300g', price:  88,           kind: 'tofu', done: false },
    ]},
    { aisle: '鮮魚',  n: 4, list: [
      { id: 6, name: '北海道 銀鮭', sub: '2切', price: 498, was: 698, kind: 'salmon', done: false, tag: '特売' },
    ]},
  ]);
  const toggle = (id) => setItems(g => g.map(grp => ({
    ...grp, list: grp.list.map(i => i.id === id ? { ...i, done: !i.done } : i)
  })));
  const flat = items.flatMap(g => g.list);
  const done = flat.filter(i => i.done).length;
  const total = flat.reduce((s, i) => s + i.price, 0);

  return (
    <div style={{ height: '100%', background: T.bg, display: 'flex', flexDirection: 'column' }}>
    <div style={{ flex: 1, overflowY: 'auto' }} className="oas-noscroll">
      <C_TopBar leftBack onBack={pop} title="買い物リスト" sub={`${flat.length} 品 · 神戸三宮店`}
        right={<button onClick={() => push('search')} style={iconBtn}><Icon name="plus" size={22} color="#fff"/></button>}/>
      <div style={{ height: SAFE_TOP + 48 }}/>

      {/* Progress card */}
      <div style={{ padding: '14px 16px 0' }}>
        <div style={{
          background: `linear-gradient(140deg, ${T.brand} 0%, #2a2520 100%)`,
          color: '#fff', borderRadius: 14, padding: '16px 16px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -30, right: -30, width: 150, height: 150,
            background: `radial-gradient(circle, ${T.orange} 0%, transparent 65%)`,
            opacity: .35,
          }}/>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div>
              <div style={{ fontFamily: SANS, fontSize: 10, color: T.orange, fontWeight: 700, letterSpacing: '.2em' }}>SHOPPING</div>
              <div style={{ marginTop: 4 }}>
                <span className="oas-num" style={{ fontFamily: NUM, fontWeight: 900, fontSize: 32, color: '#fff', letterSpacing: '-.02em' }}>{done}</span>
                <span style={{ fontFamily: NUM, fontWeight: 700, fontSize: 16, color: 'rgba(255,255,255,.5)', margin: '0 4px' }}>/</span>
                <span style={{ fontFamily: NUM, fontWeight: 700, fontSize: 20, color: 'rgba(255,255,255,.7)' }}>{flat.length}</span>
                <span style={{ fontFamily: SANS, fontSize: 11, color: 'rgba(255,255,255,.6)', marginLeft: 6, fontWeight: 600 }}>品 取得</span>
              </div>
            </div>
            <div style={{ flex: 1 }}/>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: SANS, fontSize: 10, color: 'rgba(255,255,255,.6)' }}>合計</div>
              <Yen value={total - 50} size={22} style={{ color: '#fff' }}/>
              <div style={{ fontFamily: SANS, fontSize: 10, color: T.orange, marginTop: 1, fontWeight: 700 }}>−¥50 クーポン</div>
            </div>
          </div>
          {/* progress bar */}
          <div style={{
            position: 'relative', marginTop: 14, height: 6, background: 'rgba(255,255,255,.12)', borderRadius: 99,
          }}>
            <div style={{
              width: `${(done / flat.length) * 100}%`, height: '100%',
              background: T.orange, borderRadius: 99,
            }}/>
          </div>
        </div>
      </div>

      {/* Aisle nav CTA */}
      <div style={{ padding: '12px 16px 0' }}>
        <button onClick={() => push('aisle-map')} style={{
          width: '100%', background: '#fff', border: `1px solid ${T.outline}`, borderRadius: 12,
          padding: '12px 14px', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 8, background: T.orangeSoft, color: T.orange,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><Icon name="pin" size={22} color={T.orange}/></div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 13, color: T.ink }}>店内ナビを始める</div>
            <div style={{ fontFamily: SANS, fontSize: 11, color: T.inkMid, marginTop: 2 }}>最適順路で 約 12 分 · 店内 220m</div>
          </div>
          <Icon name="chevR" size={18} color={T.brown}/>
        </button>
      </div>

      {/* Groups */}
      <div style={{ padding: '14px 16px 0' }}>
        {items.map((g) => (
          <div key={g.aisle} style={{ marginTop: 6, marginBottom: 18 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
              <span style={{
                width: 22, height: 22, borderRadius: 999, background: T.brand, color: '#fff',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: NUM, fontSize: 11, fontWeight: 800,
              }}>{g.n}</span>
              <h3 style={{ margin: 0, fontFamily: SANS, fontWeight: 800, fontSize: 14, color: T.ink }}>{g.aisle}</h3>
              <span style={{ fontFamily: SANS, fontSize: 10, color: T.inkSoft, fontWeight: 600 }}>{g.list.length} 品</span>
              <div style={{ flex: 1, height: 1, background: T.outlineSoft, marginLeft: 6 }}/>
            </div>
            <div style={{ background: '#fff', border: `1px solid ${T.outline}`, borderRadius: 10, overflow: 'hidden' }}>
              {g.list.map((it, i) => (
                <div key={it.id} style={{
                  padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10,
                  borderTop: i ? `1px solid ${T.outlineSoft}` : 'none',
                  opacity: it.done ? .5 : 1,
                }}>
                  <button onClick={() => toggle(it.id)} style={{
                    width: 22, height: 22, borderRadius: 999,
                    border: `1.5px solid ${it.done ? T.orange : T.outline}`,
                    background: it.done ? T.orange : '#fff',
                    cursor: 'pointer', flex: '0 0 auto',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{it.done && <Icon name="check" size={12} color="#fff" sw={2.5}/>}</button>
                  <FoodMark kind={it.kind} size={32} bg={T.paperAlt}/>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontFamily: SANS, fontWeight: 700, fontSize: 12.5, color: T.ink,
                      textDecoration: it.done ? 'line-through' : 'none',
                    }}>{it.name}<span style={{ color: T.inkSoft, fontWeight: 500, fontSize: 10, marginLeft: 4 }}>{it.sub}</span></div>
                    {it.tag && <span style={{ fontFamily: SANS, fontSize: 9.5, color: T.sale, fontWeight: 700, marginTop: 1, display: 'inline-block' }}>{it.tag}</span>}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <Yen value={it.price} size={13}/>
                    {it.was && <div><Yen value={it.was} size={9} strike/></div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* AI suggestion */}
      <div style={{ padding: '0 16px 0' }}>
        <div style={{
          background: T.orangeSoft, border: `1px solid ${T.orange}`, borderRadius: 12,
          padding: '14px 16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <Icon name="sparkleF" size={14} color={T.orangeDeep}/>
            <span style={{ fontFamily: SANS, fontSize: 10, color: T.orangeDeep, fontWeight: 800, letterSpacing: '.15em' }}>AIからの提案</span>
          </div>
          <p style={{ margin: 0, fontFamily: SANS, fontSize: 12.5, lineHeight: 1.7, color: T.orangeDeep }}>
            親子丼と一緒に「味噌汁」はいかがでしょう。<strong>油揚げ (¥98)</strong> と <strong>長ねぎ (¥128)</strong> を本日 10% OFF で。
          </p>
          <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>
            <button onClick={() => {
              if (suggestionAdded) return;
              setSuggestionAdded(true);
              setItems(prev => prev.map(g => g.aisle === '日配' ? {
                ...g, list: [
                  ...g.list,
                  { id: 101, name: '油揚げ', sub: '1パック', price: 98, kind: 'tofu', done: false, tag: 'AI追加' },
                  { id: 102, name: '長ねぎ', sub: '1本',     price: 128, kind: 'cabbage', done: false, tag: 'AI追加' },
                ]
              } : g));
            }} style={{
              background: suggestionAdded ? '#fff' : T.orangeDeep, color: suggestionAdded ? T.orangeDeep : '#fff', border: `1px solid ${T.orangeDeep}`, cursor: 'pointer',
              padding: '8px 14px', borderRadius: 6,
              fontFamily: SANS, fontWeight: 800, fontSize: 11,
              display: 'inline-flex', alignItems: 'center', gap: 4,
            }}>{suggestionAdded ? <><Icon name="check" size={12} color={T.orangeDeep} sw={2.5}/> 追加済 (+2品)</> : '追加'}</button>
            <button onClick={() => setSuggestionDismissed(true)} style={{
              background: 'transparent', color: T.orangeDeep, border: 0, cursor: 'pointer',
              padding: '8px 10px', opacity: suggestionDismissed ? 0.5 : 1,
              fontFamily: SANS, fontWeight: 700, fontSize: 11,
            }}>{suggestionDismissed ? '保留中' : 'あとで'}</button>
          </div>
        </div>
      </div>

      </div>
      {/* Bottom action */}
      <div style={{
        padding: '12px 16px 22px', background: '#fff',
        borderTop: `1px solid ${T.outlineSoft}`,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <button onClick={() => push('aisle-map')} style={{
          flex: 1, background: T.brand, color: '#fff', border: 0, cursor: 'pointer',
          padding: '14px 0', borderRadius: 8,
          fontFamily: SANS, fontWeight: 800, fontSize: 13.5, letterSpacing: '.05em',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          <Icon name="pin" size={16} color="#fff"/>
          店内ナビを始める
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// AISLE MAP / Store nav
// ─────────────────────────────────────────────────────────────
function C_AisleMap({ pop, push }) {
  const [step, setStep] = React.useState(2);
  const [done, setDone] = React.useState(false);
  const [floor, setFloor] = React.useState('1F');
  const [filter, setFilter] = React.useState('all');
  const steps = [
    { aisle: '青果',  it: '玉ねぎ + 三つ葉', dist: '0m',  pos: { x: 30, y: 60 } },
    { aisle: '精肉',  it: '鶏もも肉',        dist: '32m', pos: { x: 130, y: 35 } },
    { aisle: '日配',  it: '卵 + 豆腐',       dist: '58m', pos: { x: 30, y: 110 } },
    { aisle: '鮮魚',  it: '銀鮭',            dist: '92m', pos: { x: 230, y: 35 } },
  ];

  // ── per-floor layouts ─────────────────────────────────────────
  const FLOOR_DATA = {
    '1F': {
      en: 'FOOD HALL',
      sections: [
        { id: 'produce',  x: 14,  y: 22,  w: 132, h: 80, l: '青果',       en: 'PRODUCE',  tint: '#e1ecc8', border: '#9bbd72', color: '#43652b', cats: ['food'] },
        { id: 'fish',     x: 174, y: 22,  w: 80,  h: 80, l: '鮮魚',       en: 'SEAFOOD',  tint: '#d5e6f2', border: '#7ba6c5', color: '#1f4a6b', cats: ['food'] },
        { id: 'bakery',   x: 262, y: 22,  w: 44,  h: 80, l: 'ベーカリー', en: 'BAKERY',   tint: '#f6e2c8', border: '#d4ae72', color: '#7a5320', cats: ['deli'] },
        { id: 'meat',     x: 14,  y: 130, w: 92,  h: 72, l: '精肉',       en: 'MEAT',     tint: '#fadcde', border: '#d6868c', color: '#8a2a30', cats: ['food'] },
        { id: 'chilled',  x: 114, y: 130, w: 38,  h: 72, l: '冷蔵',       en: 'CHILLED',  tint: '#e3edf5', border: '#a8b9c8', color: '#3a4f60', cats: ['food'] },
        { id: 'frozen',   x: 168, y: 130, w: 38,  h: 72, l: '冷凍',       en: 'FROZEN',   tint: '#d8e8f2', border: '#7da3bb', color: '#2a4658', cats: ['food'] },
        { id: 'deli',     x: 214, y: 130, w: 44,  h: 36, l: '惣菜',       en: 'DELI',     tint: '#fde8d2', border: '#e0a86a', color: '#7a4520', cats: ['deli'] },
        { id: 'sushi',    x: 214, y: 168, w: 44,  h: 34, l: '寿司',       en: 'SUSHI',    tint: '#fadcc8', border: '#dc9d6c', color: '#7a3a18', cats: ['deli'] },
        { id: 'bento',    x: 264, y: 130, w: 42,  h: 36, l: '弁当',       en: 'BENTO',    tint: '#fde8d2', border: '#e0a86a', color: '#7a4520', cats: ['deli'] },
        { id: 'pantry',   x: 264, y: 168, w: 42,  h: 34, l: '加工',       en: 'PANTRY',   tint: '#efe6d3', border: '#c8b990', color: '#5a4530', cats: ['food'] },
        { id: 'dairy',    x: 14,  y: 206, w: 64,  h: 22, l: '日配',       en: 'DAIRY',    tint: '#fcebd2', border: '#d9a86a', color: '#7a5320', cats: ['food'] },
        { id: 'rice',     x: 80,  y: 206, w: 30,  h: 22, l: '米',         en: 'RICE',     tint: '#f3eedd', border: '#c6a56c', color: '#5a4530', cats: ['food'] },
        { id: 'liquor',   x: 112, y: 206, w: 70,  h: 22, l: '酒類・飲料', en: 'LIQUOR',   tint: '#f3e8d6', border: '#bda57a', color: '#5a4530', cats: ['liquor'] },
        { id: 'register', x: 198, y: 206, w: 60,  h: 22, l: 'レジ',       en: 'CHECKOUT', tint: '#fff7e6', border: '#c6a56c', color: '#5a4530', cats: ['service'] },
        { id: 'exit',     x: 264, y: 206, w: 42,  h: 22, l: '出口',       en: 'EXIT',     tint: '#fff',    border: T.outlineSoft, color: T.inkMid, cats: ['service'] },
      ],
      pois: [
        { x: 60,  y: 60  }, { x: 100, y: 80  }, { x: 200, y: 50  }, { x: 220, y: 80  },
        { x: 280, y: 60  }, { x: 40,  y: 150 }, { x: 70,  y: 175 }, { x: 135, y: 155 },
        { x: 188, y: 165 }, { x: 235, y: 148 }, { x: 285, y: 148 }, { x: 235, y: 185 },
        { x: 40,  y: 218 }, { x: 65,  y: 218 }, { x: 145, y: 218 },
      ],
      chips: [
        { v: 'all',     l: 'すべて'   },
        { v: 'food',    l: '食材'     },
        { v: 'deli',    l: '惣菜・パン' },
        { v: 'liquor',  l: 'お酒・飲料' },
        { v: 'service', l: 'レジ・出口' },
      ],
      showRoute: true,
    },
    '2F': {
      en: 'LIFESTYLE',
      sections: [
        { id: 'fashion',   x: 14,  y: 22,  w: 152, h: 80, l: 'ファッション', en: 'APPAREL',    tint: '#fadcde', border: '#d6868c', color: '#8a2a30', cats: ['lifestyle'] },
        { id: 'kids',      x: 174, y: 22,  w: 132, h: 80, l: '子供服',       en: 'KIDS',       tint: '#fde8d2', border: '#e0a86a', color: '#7a4520', cats: ['lifestyle'] },
        { id: 'kitchen',   x: 14,  y: 130, w: 96,  h: 72, l: 'キッチン雑貨', en: 'KITCHEN',    tint: '#e1ecc8', border: '#9bbd72', color: '#43652b', cats: ['household'] },
        { id: 'daily',     x: 118, y: 130, w: 82,  h: 72, l: '日用品',       en: 'DAILY GOODS',tint: '#d5e6f2', border: '#7ba6c5', color: '#1f4a6b', cats: ['household'] },
        { id: 'cosmetics', x: 208, y: 130, w: 62,  h: 72, l: '化粧品',       en: 'BEAUTY',     tint: '#fadcde', border: '#d6868c', color: '#8a2a30', cats: ['beauty'] },
        { id: 'stationery',x: 278, y: 130, w: 28,  h: 72, l: '文具',         en: 'STATIONERY', tint: '#efe6d3', border: '#c8b990', color: '#5a4530', cats: ['household'] },
        { id: 'cafe',      x: 14,  y: 206, w: 130, h: 22, l: 'カフェ',       en: 'CAFE',       tint: '#f3e8d6', border: '#bda57a', color: '#5a4530', cats: ['food'] },
        { id: 'register2', x: 150, y: 206, w: 96,  h: 22, l: 'レジ',         en: 'CHECKOUT',   tint: '#fff7e6', border: '#c6a56c', color: '#5a4530', cats: ['service'] },
        { id: 'stairs2',   x: 252, y: 206, w: 54,  h: 22, l: '階段・EV',     en: 'STAIRS',     tint: '#fff',    border: T.outlineSoft, color: T.inkMid, cats: ['service'] },
      ],
      pois: [
        { x: 60, y: 50 }, { x: 100, y: 80 }, { x: 220, y: 55 }, { x: 250, y: 80 },
        { x: 40, y: 160 }, { x: 80, y: 175 }, { x: 150, y: 165 }, { x: 230, y: 160 },
      ],
      chips: [
        { v: 'all',       l: 'すべて'       },
        { v: 'lifestyle', l: 'ファッション' },
        { v: 'household', l: '日用品'       },
        { v: 'beauty',    l: '化粧品'       },
        { v: 'service',   l: 'レジ'         },
      ],
      showRoute: false,
    },
    'B1': {
      en: 'PARKING',
      sections: [
        { id: 'lotA',     x: 14,  y: 22,  w: 196, h: 100, l: '駐車場 A',  en: 'PARKING A',  tint: '#e3edf5', border: '#a8b9c8', color: '#3a4f60', cats: ['parking'] },
        { id: 'ev',       x: 218, y: 22,  w: 88,  h: 48,  l: 'EV 充電',   en: 'EV CHARGE',  tint: '#e1ecc8', border: '#9bbd72', color: '#43652b', cats: ['parking'] },
        { id: 'bike',     x: 218, y: 76,  w: 88,  h: 46,  l: '自転車置場', en: 'BIKE PARK',  tint: '#fcebd2', border: '#d9a86a', color: '#7a5320', cats: ['parking'] },
        { id: 'lotB',     x: 14,  y: 130, w: 196, h: 72,  l: '駐車場 B',  en: 'PARKING B',  tint: '#e3edf5', border: '#a8b9c8', color: '#3a4f60', cats: ['parking'] },
        { id: 'gate',     x: 218, y: 130, w: 88,  h: 72,  l: '入退場ゲート', en: 'GATE',     tint: '#fff7e6', border: '#c6a56c', color: '#5a4530', cats: ['gate'] },
        { id: 'elevatorB',x: 14,  y: 206, w: 196, h: 22,  l: 'エレベーター',  en: 'ELEVATOR', tint: '#fff',    border: T.outlineSoft, color: T.inkMid, cats: ['gate'] },
        { id: 'stairsB',  x: 218, y: 206, w: 88,  h: 22,  l: '階段',      en: 'STAIRS',    tint: '#fff',    border: T.outlineSoft, color: T.inkMid, cats: ['gate'] },
      ],
      pois: [],
      chips: [
        { v: 'all',     l: 'すべて'   },
        { v: 'parking', l: '駐車場'   },
        { v: 'gate',    l: '入退場'   },
      ],
      showRoute: false,
    },
  };
  const floorData = FLOOR_DATA[floor] || FLOOR_DATA['1F'];
  const sections = floorData.sections;
  const pois = floorData.pois;
  const chips = floorData.chips;
  const showRoute = floorData.showRoute;
  const safeStep = Math.min(Math.max(step, 0), steps.length - 1);
  const cur = steps[safeStep];
  const isLast = safeStep >= steps.length - 1;
  const advance = () => {
    if (isLast) setDone(true);
    else setStep(safeStep + 1);
  };
  return (
    <div style={{ height: '100%', background: T.bg, display: 'flex', flexDirection: 'column' }}>
      <C_TopBar leftBack onBack={pop} title="店内ナビ" sub="神戸三宮店 · 約 12 分"/>
      <div style={{ height: SAFE_TOP + 48 }}/>

      {/* Current step instruction */}
      <div style={{ padding: '14px 16px 0' }}>
        <div style={{
          background: T.brand, color: '#fff', borderRadius: 14, padding: '14px 16px',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12, background: T.orange,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto',
            color: '#fff', fontFamily: NUM, fontWeight: 900, fontSize: 22,
          }}>{step + 1}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: SANS, fontSize: 10, color: T.orange, fontWeight: 700, letterSpacing: '.15em' }}>STEP {step + 1} / {steps.length}</div>
            <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 17, marginTop: 2 }}>{cur.aisle} へ</div>
            <div style={{ fontFamily: SANS, fontSize: 11, color: 'rgba(255,255,255,.7)', marginTop: 2 }}>{cur.it} · {cur.dist}</div>
          </div>
          <Icon name="arrR" size={28} color={T.orange} sw={2}/>
        </div>
      </div>

      {/* Map */}
      <div style={{ flex: 1, padding: '14px 16px 0', minHeight: 0 }}>
        <div style={{
          background: '#fbf7ef', border: `1px solid ${T.outline}`, borderRadius: 16,
          height: '100%', padding: 0, position: 'relative', overflow: 'hidden',
          boxShadow: 'inset 0 0 0 1px rgba(40,30,10,.03)',
        }}>
          {/* Floor selector — right edge */}
          <div style={{
            position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', zIndex: 5,
            display: 'flex', flexDirection: 'column', gap: 4,
            background: '#fff', borderRadius: 10, padding: 4,
            boxShadow: '0 4px 12px rgba(40,30,10,.12)',
            border: `1px solid ${T.outlineSoft}`,
          }}>
            {['2F', '1F', 'B1'].map((f) => (
              <button key={f} onClick={() => { setFloor(f); setFilter('all'); }} style={{
                width: 32, height: 32, borderRadius: 7,
                background: floor === f ? T.orange : 'transparent',
                color: floor === f ? '#fff' : T.inkMid,
                border: 0, cursor: 'pointer',
                fontFamily: NUM, fontWeight: 900, fontSize: 12,
                boxShadow: floor === f ? '0 2px 6px rgba(46,133,64,.35)' : 'none',
              }}>{f}</button>
            ))}
          </div>

          {/* Top chrome — floor title + search + nearby pill */}
          <div style={{
            position: 'absolute', top: 10, left: 10, right: 56, zIndex: 4,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <button style={{
              background: '#fff', border: `1px solid ${T.outlineSoft}`, borderRadius: 99,
              padding: '8px 12px', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontFamily: SANS, fontWeight: 700, fontSize: 11, color: T.ink,
              boxShadow: '0 2px 6px rgba(40,30,10,.06)',
            }}>
              <Icon name="pin" size={13} color={T.fresh}/>
              現在地から探す
            </button>
            <div style={{ flex: 1 }}/>
            <button onClick={() => push('search')} style={{
              width: 36, height: 36, borderRadius: 999,
              background: '#fff', border: `1px solid ${T.outlineSoft}`, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(40,30,10,.06)',
            }}>
              <Icon name="search" size={16} color={T.inkMid}/>
            </button>
          </div>

          {/* Floor brand */}
          <div style={{
            position: 'absolute', top: 60, left: 16, zIndex: 3, pointerEvents: 'none',
          }}>
            <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 22, color: T.inkMid, letterSpacing: '.04em', lineHeight: 1 }}>
              {floorData.en}
            </div>
            <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 10, color: T.inkSoft, marginTop: 4, letterSpacing: '.2em' }}>
              神戸三宮店 · {floor}
            </div>
          </div>

          {/* Help button bottom-right */}
          <button style={{
            position: 'absolute', bottom: 56, right: 10, zIndex: 4,
            width: 30, height: 30, borderRadius: 999,
            background: '#fff', border: `1px solid ${T.outlineSoft}`, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: NUM, fontWeight: 800, fontSize: 14, color: T.inkMid,
            boxShadow: '0 2px 6px rgba(40,30,10,.06)',
          }}>?</button>

          <svg viewBox="0 0 320 240" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%', display: 'block' }}>
            <defs>
              <pattern id="floorTexture" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
                <rect width="6" height="6" fill="#fbf7ef"/>
                <circle cx="3" cy="3" r=".35" fill="#d8cdb4" opacity=".5"/>
              </pattern>
              <filter id="sectionShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="1.2" stdDeviation="1" floodOpacity=".09"/>
              </filter>
              <linearGradient id="aisleway" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f5ead5"/>
                <stop offset="100%" stopColor="#f0e2c4"/>
              </linearGradient>
            </defs>

            {/* Floor base */}
            <rect x="0" y="0" width="320" height="240" fill="url(#floorTexture)"/>

            {/* Main aisleway corridors */}
            <path d="M 0 110 L 320 110 L 320 124 L 0 124 Z" fill="url(#aisleway)" opacity=".7"/>
            <path d="M 152 18 L 168 18 L 168 210 L 152 210 Z" fill="url(#aisleway)" opacity=".55"/>

            {/* Section data — floor-aware */}
            {sections.map((a, i) => {
              const isStep = showRoute && steps.some(s => s.aisle === a.l);
              const stepIdx = showRoute ? steps.findIndex(s => s.aisle === a.l) : -1;
              const cur = stepIdx === step;
              const inFilter = filter === 'all' || a.cats.includes(filter);
              const fill = cur ? T.orange : a.tint;
              const stroke = cur ? T.orangeDeep : a.border;
              const textColor = cur ? '#fff' : a.color;
              return (
                <g key={i} filter="url(#sectionShadow)" opacity={inFilter ? 1 : 0.35}>
                  <rect x={a.x} y={a.y} width={a.w} height={a.h} rx="3" ry="3"
                        fill={fill} stroke={stroke}
                        strokeWidth={cur ? 1.8 : 1}/>
                  {a.h >= 40 ? (
                    <>
                      <text x={a.x + a.w/2} y={a.y + a.h/2 - 2} textAnchor="middle"
                            fontFamily={SANS} fontWeight="900" fontSize="12"
                            letterSpacing=".05em" fill={textColor}>{a.l}</text>
                      <text x={a.x + a.w/2} y={a.y + a.h/2 + 11} textAnchor="middle"
                            fontFamily={NUM} fontWeight="600" fontSize="6.5"
                            letterSpacing=".18em" fill={textColor} opacity=".65">{a.en}</text>
                    </>
                  ) : (
                    <text x={a.x + a.w/2} y={a.y + a.h/2 + 3.5} textAnchor="middle"
                          fontFamily={SANS} fontWeight="800" fontSize={a.l.length >= 5 ? 9 : 10.5}
                          letterSpacing=".04em" fill={textColor}>{a.l}</text>
                  )}
                  {isStep && (
                    <g transform={`translate(${a.x + 12},${a.y + 12})`}>
                      <circle r="10" fill={cur ? '#fff' : T.brand} stroke={cur ? T.brand : 'none'} strokeWidth="2"/>
                      <text textAnchor="middle" y="4"
                            fontFamily={NUM} fontWeight="900" fontSize="12"
                            fill={cur ? T.brand : '#fff'}>{stepIdx + 1}</text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Sale / POI dots — pink */}
            {pois.map((p, i) => (
              <g key={i}>
                <circle cx={p.x} cy={p.y} r="5" fill={T.point} opacity=".22"/>
                <circle cx={p.x} cy={p.y} r="2.4" fill={T.point}/>
              </g>
            ))}

            {showRoute && (
              <>
                {/* Shopper path — entrance through current step */}
                <path d="
                  M 50 234
                  L 50 218
                  L 50 165
                  L 50 60
                  L 80 60
                  L 200 60
                  L 280 60
                  L 280 110
                  L 220 117
                  L 80 117
                  L 50 130
                  L 50 165
                "
                stroke={T.orange} strokeWidth="2.6" strokeDasharray="5 4" fill="none"
                strokeLinecap="round" strokeLinejoin="round" opacity=".82"/>

                {/* Entry marker */}
                <g transform="translate(50, 234)">
                  <circle r="13" fill={T.fresh} opacity=".18"/>
                  <circle r="7" fill={T.fresh} stroke="#fff" strokeWidth="2"/>
                  <circle r="3" fill="#fff"/>
                </g>

                {/* Target pin on current step (meat) */}
                <g transform="translate(50, 165)">
                  <ellipse cx="0" cy="14" rx="7" ry="2" fill={T.ink} opacity=".18"/>
                  <path d="M0 -16c-8 0-13 6-13 11c0 7 13 17 13 17s13-10 13-17c0-5-5-11-13-11z" fill={T.sale}/>
                  <circle cy="-4" r="4" fill="#fff"/>
                </g>
              </>
            )}
          </svg>

          {/* Category filter chips — overlay at bottom */}
          <div style={{
            position: 'absolute', bottom: 10, left: 10, right: 56, zIndex: 4,
            display: 'flex', gap: 6, overflowX: 'auto',
          }} className="oas-noscroll">
            {chips.map((c) => {
              const on = filter === c.v;
              return (
                <button key={c.v} onClick={() => setFilter(c.v)} style={{
                  flex: '0 0 auto',
                  background: on ? T.brand : '#fff',
                  color: on ? '#fff' : T.inkMid,
                  border: `1px solid ${on ? T.brand : T.outlineSoft}`,
                  borderRadius: 99, padding: '6px 12px',
                  fontFamily: SANS, fontWeight: 700, fontSize: 11,
                  cursor: 'pointer', boxShadow: '0 2px 6px rgba(40,30,10,.06)',
                  whiteSpace: 'nowrap',
                }}>{c.l}</button>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI hint */}
      <div style={{ padding: '12px 16px 0' }}>
        <div style={{
          background: T.orangeSoft, border: `1px solid ${T.orange}`, borderRadius: 10,
          padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <Icon name="sparkleF" size={16} color={T.orangeDeep}/>
          <div style={{ flex: 1, fontFamily: SANS, fontSize: 11.5, color: T.orangeDeep, lineHeight: 1.5 }}>
            鶏もも肉の隣に <strong>本日限り ¥30 OFF</strong> の卵があります
          </div>
        </div>
      </div>

      {/* Bottom step nav */}
      <div style={{
        padding: '12px 16px 22px', background: '#fff',
        borderTop: `1px solid ${T.outlineSoft}`,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <button onClick={() => setStep(s => Math.max(0, s - 1))} style={{
          width: 48, height: 48, background: '#fff', border: `1px solid ${T.outline}`, borderRadius: 8,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: step > 0 ? 1 : .4,
        }}><Icon name="chevL" size={20} color={T.ink}/></button>
        <button onClick={advance} style={{
          flex: 1, background: T.orange, color: '#fff', border: 0, cursor: 'pointer',
          padding: '14px 0', borderRadius: 8,
          fontFamily: SANS, fontWeight: 800, fontSize: 13, letterSpacing: '.05em',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}><Icon name="check" size={16} color="#fff"/> {isLast ? '最後の商品を取得した' : '商品を取得した'}</button>
        <button onClick={advance} style={{
          width: 48, height: 48, background: '#fff', border: `1px solid ${T.outline}`, borderRadius: 8,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: step < steps.length - 1 ? 1 : .4,
        }}><Icon name="chevR" size={20} color={T.ink}/></button>
      </div>

      {done && (
        <>
          <div onClick={() => setDone(false)} style={{
            position: 'absolute', inset: 0, zIndex: 80,
            background: 'rgba(0,0,0,.5)', animation: 'oasFadeIn .2s',
          }}/>
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 81,
            background: '#fff', borderTopLeftRadius: 22, borderTopRightRadius: 22,
            padding: '12px 0 0', animation: 'oasSlideUp .25s ease-out',
            boxShadow: '0 -10px 30px rgba(0,0,0,.18)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
              <div style={{ width: 38, height: 4, background: T.outline, borderRadius: 99 }}/>
            </div>

            {/* Celebration */}
            <div style={{ padding: '14px 20px 6px', textAlign: 'center' }}>
              <div style={{
                width: 64, height: 64, borderRadius: 999, background: T.orangeSoft,
                margin: '0 auto 12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name="check" size={32} color={T.orange} sw={2.6}/>
              </div>
              <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 19, color: T.ink, letterSpacing: '.02em' }}>
                お買い物完了!
              </div>
              <div style={{ fontFamily: SANS, fontSize: 11.5, color: T.inkSoft, marginTop: 4 }}>
                {steps.length} 売場 すべて回り終えました
              </div>
            </div>

            {/* Receipt summary */}
            <div style={{ padding: '0 20px', marginTop: 8 }}>
              <div style={{
                background: T.paperAlt, border: `1px solid ${T.outline}`, borderRadius: 10,
                padding: '12px 14px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', fontFamily: SANS, fontSize: 11.5, color: T.inkMid }}>
                  <span style={{ flex: 1 }}>商品 6 点</span>
                  <Yen value={952} size={12}/>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: 4, fontFamily: SANS, fontSize: 11.5, color: T.orange, fontWeight: 700 }}>
                  <span style={{ flex: 1 }}>クーポン適用</span>
                  <span>− ¥50</span>
                </div>
                <div style={{
                  display: 'flex', alignItems: 'baseline', marginTop: 8,
                  paddingTop: 8, borderTop: `1px solid ${T.outlineSoft}`,
                }}>
                  <span style={{ flex: 1, fontFamily: SANS, fontSize: 12, color: T.ink, fontWeight: 800 }}>お支払合計</span>
                  <Yen value={902} size={22} tone="sale"/>
                </div>
              </div>
            </div>

            {/* AI cross-sell */}
            <div style={{ padding: '12px 20px 0' }}>
              <div style={{
                background: T.brand, color: '#fff', borderRadius: 10,
                padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 999, background: T.orange,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto',
                }}>
                  <Icon name="sparkleF" size={13} color="#fff"/>
                </div>
                <div style={{ flex: 1, fontFamily: SANS, fontSize: 11, lineHeight: 1.5 }}>
                  レジ前に <strong style={{ color: T.orange }}>本日限り ¥30 OFF の卵</strong> はいかがですか?
                </div>
                <button onClick={() => setDone(false)} style={{
                  background: T.orange, color: '#fff', border: 0, cursor: 'pointer',
                  padding: '6px 10px', borderRadius: 6,
                  fontFamily: SANS, fontWeight: 800, fontSize: 10.5,
                  flex: '0 0 auto',
                }}>追加</button>
              </div>
            </div>

            {/* Actions */}
            <div style={{ padding: '14px 20px 22px', display: 'flex', gap: 10 }}>
              <button onClick={() => { setDone(false); pop && pop(); }} style={{
                flex: '0 0 auto', padding: '12px 14px', background: '#fff',
                border: `1px solid ${T.outline}`, borderRadius: 8, cursor: 'pointer',
                fontFamily: SANS, fontWeight: 700, fontSize: 12, color: T.inkMid,
              }}>リストに戻る</button>
              <button onClick={() => { setDone(false); push && push('barcode'); }} style={{
                flex: 1, background: T.orange, color: '#fff', border: 0, cursor: 'pointer',
                padding: '13px 0', borderRadius: 8,
                fontFamily: SANS, fontWeight: 800, fontSize: 13, letterSpacing: '.06em',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                boxShadow: '0 4px 12px rgba(46,133,64,.3)',
              }}>
                <Icon name="qr" size={16} color="#fff"/>
                レジへ進む
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// RECIPE detail (C tone)
// ─────────────────────────────────────────────────────────────
function C_RecipeDetail({ data, pop, push }) {
  const [recipeFav, setRecipeFav] = React.useState(false);
  const ing = [
    { name: '鶏もも肉',   sub: '300g',  price: 398, kind: 'chicken', tag: '特売' },
    { name: '卵',         sub: '4個',   price:  72, kind: 'egg',     tag: 'クーポン' },
    { name: '玉ねぎ',     sub: '中1個', price:  68, kind: 'onion' },
    { name: '三つ葉',     sub: '1束',   price: 128, kind: 'cabbage' },
    { name: 'ご飯',       sub: '2合',   price: 380, kind: 'rice' },
    { name: '出汁・調味料', sub: '一式', price: 134, kind: 'tofu' },
  ];
  const steps = [
    '玉ねぎを薄切りに、鶏もも肉は一口大に切る。',
    'フライパンに出汁・醤油・みりん・砂糖を入れ、玉ねぎがしんなりするまで煮る。',
    '鶏肉を加え、火が通るまで4〜5分煮る。',
    '溶き卵を半分ずつ回し入れ、半熟になったらご飯にのせ、三つ葉を添える。',
  ];
  const total = ing.reduce((s, i) => s + i.price, 0);
  return (
    <div style={{ height: '100%', background: T.bg, display: 'flex', flexDirection: 'column' }}>
      <C_TopBar leftBack onBack={pop} title="親子丼"
        right={<button onClick={() => setRecipeFav(f => !f)} style={{ ...iconBtn, color: '#fff' }}><Icon name={recipeFav ? 'heartF' : 'heart'} size={20} color={recipeFav ? T.orange : '#fff'}/></button>}/>
      <div style={{ flex: 1, overflowY: 'auto' }} className="oas-noscroll">
      <div style={{ height: SAFE_TOP + 48 }}/>

      {/* Hero */}
      <div style={{
        height: 220, background: `linear-gradient(180deg, #fdf2db 0%, #fff 100%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <FoodMark kind="oyakodon" size={170}/>
      </div>

      <div style={{ padding: '14px 16px 16px' }}>
        <Pill tone="orange" size="xs">AIおすすめ · 本日の特売を使用</Pill>
        <h1 style={{ fontFamily: SANS, fontWeight: 900, fontSize: 22, lineHeight: 1.2, margin: '8px 0 4px', color: T.ink }}>ふんわり親子丼</h1>
        <p style={{ margin: 0, fontFamily: SANS, fontSize: 12, color: T.inkMid, lineHeight: 1.6 }}>
          特売の鶏もも肉と、兵庫の朝採り卵を使った定番。半熟の卵と三つ葉が決め手。
        </p>

        {/* Meta */}
        <div style={{
          marginTop: 14, padding: '12px 0', borderTop: `1px solid ${T.outlineSoft}`, borderBottom: `1px solid ${T.outlineSoft}`,
          display: 'flex',
        }}>
          {[
            { big: '15', sub: '分', label: '調理',  i: 'clock' },
            { big: '4',  sub: '人前', label: '人数', i: 'user' },
            { big: '628', sub: 'kcal', label: '1人', i: 'flame' },
          ].map((m, i, a) => (
            <div key={i} style={{
              flex: 1, textAlign: 'center',
              borderRight: i < a.length - 1 ? `1px solid ${T.outlineSoft}` : 'none',
            }}>
              <Icon name={m.i} size={13} color={T.brown}/>
              <div style={{ fontFamily: NUM, fontWeight: 800, fontSize: 22, color: T.ink, lineHeight: 1, marginTop: 4 }}>
                {m.big}<span style={{ fontSize: 11, fontFamily: SANS, color: T.inkSoft, marginLeft: 2, fontWeight: 600 }}>{m.sub}</span>
              </div>
              <div style={{ fontFamily: SANS, fontSize: 9, color: T.inkSoft, marginTop: 3, fontWeight: 600, letterSpacing: '.1em' }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* Ingredients */}
        <SectionHead title="材料" en="Ingredients" style={{ padding: 0, marginTop: 18 }}/>
        <div style={{ background: '#fff', border: `1px solid ${T.outline}`, borderRadius: 12, overflow: 'hidden', marginTop: 8 }}>
          {ing.map((i, idx) => (
            <div key={idx} style={{
              padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10,
              borderTop: idx ? `1px solid ${T.outlineSoft}` : 'none',
            }}>
              <FoodMark kind={i.kind} size={30} bg={T.paperAlt}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 12.5, color: T.ink }}>
                  {i.name}<span style={{ color: T.inkSoft, fontWeight: 500, fontSize: 10, marginLeft: 4 }}>{i.sub}</span>
                </div>
                {i.tag && <span style={{ fontFamily: SANS, fontSize: 10, color: T.sale, fontWeight: 700, marginTop: 2, display: 'inline-block' }}>{i.tag}</span>}
              </div>
              <Yen value={i.price} size={13}/>
            </div>
          ))}
          <div style={{
            padding: '10px 12px', background: T.paperAlt,
            display: 'flex', alignItems: 'baseline', gap: 6,
            borderTop: `1px solid ${T.outlineSoft}`,
          }}>
            <span style={{ fontFamily: SANS, fontSize: 10.5, color: T.inkMid, fontWeight: 700, flex: 1 }}>合計 (クーポン後)</span>
            <Yen value={total - 220} size={20} tone="sale"/>
            <Yen value={total} size={10} strike/>
          </div>
        </div>

        {/* Steps */}
        <SectionHead title="作り方" en="Method" style={{ padding: 0, marginTop: 20 }}/>
        <div style={{ marginTop: 8 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, paddingBottom: 14 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 999, background: T.orange, color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto',
                fontFamily: NUM, fontWeight: 900, fontSize: 13,
              }}>{i + 1}</div>
              <div style={{
                flex: 1, fontFamily: SANS, fontSize: 13, lineHeight: 1.7,
                color: T.ink, paddingTop: 4,
              }}>{s}</div>
            </div>
          ))}
        </div>

        {/* AI tip */}
        <div style={{
          marginTop: 4, background: T.brand, color: '#fff',
          borderRadius: 12, padding: '14px 16px',
          display: 'flex', gap: 12,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 999, background: T.orange,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto',
          }}>
            <Icon name="sparkleF" size={15} color="#fff"/>
          </div>
          <div>
            <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 11, letterSpacing: '.1em', marginBottom: 4, color: T.orange }}>AIのワンポイント</div>
            <div style={{ fontFamily: SANS, fontSize: 12.5, lineHeight: 1.7 }}>
              三つ葉が苦手な方は刻みネギで。とろみを強くしたければ卵を一つ増やしてください。
            </div>
          </div>
        </div>
      </div>

      </div>
      {/* Bottom CTA */}
      <div style={{
        padding: '12px 16px 22px', background: '#fff',
        borderTop: `1px solid ${T.outlineSoft}`,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{ flex: '0 0 auto' }}>
          <div style={{ fontFamily: SANS, fontSize: 9.5, color: T.inkSoft, fontWeight: 700 }}>4人前 計</div>
          <Yen value={1180} size={20} tone="sale"/>
        </div>
        <button onClick={() => push('shopping-list')} style={{
          flex: 1, background: T.orange, color: '#fff', border: 0, cursor: 'pointer',
          padding: '14px 0', borderRadius: 8,
          fontFamily: SANS, fontWeight: 800, fontSize: 13.5, letterSpacing: '.06em',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          boxShadow: '0 4px 12px rgba(46,133,64,.3)',
        }}>
          <Icon name="cart" size={18} color="#fff"/>
          買い物リストに追加
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { C_Product, C_ShoppingList, C_AisleMap, C_RecipeDetail });
