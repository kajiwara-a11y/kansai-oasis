// ─────────────────────────────────────────────────────────────
// MOBILE · VARIANT B — "CHIRASHI-FIRST"
// The weekly flyer is the hero. Big bold prices, newspaper feel,
// dense product grid right on the home screen. Same brand DNA,
// different emphasis: "what's cheap today" before "browse".
// ─────────────────────────────────────────────────────────────

function MobileB() {
  const [tab, setTab] = React.useState('home');
  const [overlay, setOverlay] = React.useState(null);

  return (
    <PhoneBezel paper={T.bg}>
      {tab === 'home'   && <B_Home   onAi={() => setOverlay('ai')} onRecipe={() => setOverlay('recipe')}/>}
      {tab === 'flyer'  && <A_Flyer/>}
      {tab === 'coupon' && <A_Coupon/>}
      {tab === 'recipe' && <A_Recipe onOpen={() => setOverlay('recipe')}/>}
      {tab === 'mypage' && <A_MyPage/>}

      <TabBar active={tab} onChange={setTab}/>

      {tab === 'home' && <AiFab onClick={() => setOverlay('ai')} tone="dark"/>}

      {overlay === 'ai'     && <AiOverlay onClose={() => setOverlay(null)} onOpenRecipe={() => setOverlay('recipe')}/>}
      {overlay === 'recipe' && <RecipeOverlay onClose={() => setOverlay(null)}/>}
    </PhoneBezel>
  );
}

// ─────────────────────────────────────────────────────────────
// HOME — chirashi-led
// ─────────────────────────────────────────────────────────────
function B_Home({ onAi, onRecipe }) {
  return (
    <div style={{ height: '100%', overflowY: 'auto', background: T.bg, paddingBottom: SAFE_BOT + 80 }} className="oas-noscroll">
      <BrandHeader/>
      <div style={{ height: SAFE_TOP + 60 }}/>

      {/* Compact point strip */}
      <B_TopStrip/>

      {/* CHIRASHI HERO — full-bleed newsprint */}
      <div style={{ margin: '12px 12px 0', borderRadius: 14, overflow: 'hidden', boxShadow: '0 4px 16px rgba(40,30,10,.1)' }}>
        {/* masthead */}
        <div style={{
          background: T.sale, color: '#fff', padding: '12px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -10, right: -10, width: 110, height: 110,
            background: T.saleDeep, borderRadius: '50%', opacity: .35,
          }}/>
          <div style={{ position: 'relative' }}>
            <div style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700, letterSpacing: '.25em', opacity: .85 }}>本日のチラシ</div>
            <div style={{ fontFamily: SANS, fontSize: 24, fontWeight: 900, letterSpacing: '.04em', lineHeight: 1, marginTop: 4 }}>
              市場の朝<span style={{ fontSize: 14, marginLeft: 6, fontWeight: 600, opacity: .85 }}>水曜版</span>
            </div>
          </div>
          <div style={{ textAlign: 'right', position: 'relative' }}>
            <div style={{ fontFamily: NUM, fontWeight: 900, fontSize: 26, lineHeight: 1, letterSpacing: '-.02em' }}>11.26</div>
            <div style={{ fontFamily: SANS, fontSize: 10, fontWeight: 600, marginTop: 2 }}>本日 9:00 — 21:00</div>
          </div>
        </div>

        {/* Headline ad — single huge product */}
        <div style={{ background: '#fffbe9', padding: '16px 16px 12px', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                display: 'inline-block', background: T.brand, color: '#fff',
                padding: '3px 10px', borderRadius: 3,
                fontFamily: SANS, fontWeight: 800, fontSize: 11, letterSpacing: '.12em',
              }}>本日の目玉</div>
              <div style={{
                fontFamily: SANS, fontWeight: 900, fontSize: 22, color: T.ink,
                marginTop: 6, letterSpacing: '.02em', lineHeight: 1.15,
              }}>国産 鶏もも肉</div>
              <div style={{ fontFamily: SANS, fontSize: 11, color: T.inkMid, marginTop: 2 }}>300g · 親子丼に / 唐揚げに</div>

              <div style={{ marginTop: 10, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span className="oas-num" style={{
                  fontFamily: NUM, fontWeight: 900, fontSize: 44, color: T.sale,
                  lineHeight: .9, letterSpacing: '-.03em',
                }}>398</span>
                <span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 13, color: T.sale }}>円</span>
                <Yen value={598} size={11} strike style={{ marginLeft: 4 }}/>
              </div>
              <div style={{ marginTop: 4, fontFamily: SANS, fontSize: 10, color: T.inkSoft }}>税込 ¥430 · 100gあたり ¥133</div>
            </div>
            <FoodMark kind="chicken" size={110}/>
          </div>
          <div style={{
            position: 'absolute', top: 12, right: 12,
            width: 56, height: 56, borderRadius: 999, background: T.sale, color: '#fff',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            transform: 'rotate(-8deg)',
            boxShadow: '0 4px 10px rgba(216,35,42,.4)',
          }}>
            <span style={{ fontFamily: NUM, fontWeight: 900, fontSize: 22, lineHeight: .9 }}>33</span>
            <span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 10 }}>％OFF</span>
          </div>
        </div>

        {/* 4-up grid */}
        <div style={{ background: T.newsprint, padding: 8, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {[
            { name: '兵庫 朝採卵', sub: '10個', price: 178, was: 248, kind: 'egg' },
            { name: '北海道 銀鮭', sub: '2切', price: 498, was: 698, kind: 'salmon' },
            { name: '春キャベツ', sub: '1玉', price: 98, was: 158, kind: 'cabbage' },
            { name: '北海道 牛乳', sub: '1L', price: 198, was: 258, kind: 'milk' },
          ].map((p, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 6, padding: 8,
              display: 'flex', gap: 8, alignItems: 'center',
              border: `1px solid ${T.outline}`,
              position: 'relative',
            }}>
              <FoodMark kind={p.kind} size={56}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 11, color: T.ink, lineHeight: 1.3 }}>{p.name}</div>
                <div style={{ fontFamily: SANS, fontSize: 9, color: T.inkSoft, marginTop: 1 }}>{p.sub}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginTop: 4 }}>
                  <span className="oas-num" style={{ fontFamily: NUM, fontWeight: 900, fontSize: 18, color: T.sale, lineHeight: 1, letterSpacing: '-.02em' }}>{p.price}</span>
                  <span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 10, color: T.sale }}>円</span>
                </div>
                <Yen value={p.was} size={9} strike/>
              </div>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <button style={{
          width: '100%', background: T.brand, color: '#fff', border: 0, cursor: 'pointer',
          padding: '12px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          fontFamily: SANS, fontWeight: 800, fontSize: 13, letterSpacing: '.08em',
        }}>
          チラシ全体を見る <Icon name="chevR" size={14} color="#fff"/>
        </button>
      </div>

      {/* Date strip — switch days */}
      <div style={{ padding: '14px 16px 0' }}>
        <div style={{
          display: 'flex', gap: 6, overflowX: 'auto',
        }} className="oas-noscroll">
          {[
            { d: '今日', sub: '11/26 水', on: true },
            { d: '明日', sub: '11/27 木' },
            { d: '金',   sub: '11/28' },
            { d: '土',   sub: '11/29' },
            { d: '日',   sub: '11/30' },
          ].map((d, i) => (
            <button key={i} style={{
              flex: '0 0 auto', padding: '8px 12px', borderRadius: 8,
              background: d.on ? T.ink : '#fff',
              color: d.on ? '#fff' : T.ink,
              border: `1px solid ${d.on ? T.ink : T.outline}`,
              cursor: 'pointer', textAlign: 'center',
              minWidth: 60,
            }}>
              <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 12 }}>{d.d}</div>
              <div style={{ fontFamily: NUM, fontSize: 10, fontWeight: 600, marginTop: 1, opacity: d.on ? .85 : .55 }}>{d.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Time-bound: timesale */}
      <div style={{ padding: '20px 16px 0' }}>
        <div style={{
          background: T.brand, color: '#fff', borderRadius: 12, padding: '14px 16px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', right: -20, top: -20, width: 100, height: 100,
            background: T.orange, borderRadius: '50%', opacity: .25,
          }}/>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700, color: T.orange, letterSpacing: '.2em' }}>TIMESALE</div>
              <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 18, marginTop: 4 }}>夕方タイムセール</div>
              <div style={{ fontFamily: SANS, fontSize: 11, color: 'rgba(255,255,255,.7)', marginTop: 4 }}>17:00 から お惣菜 · お寿司 · お肉が <span style={{ color: T.orange, fontWeight: 800 }}>最大20%OFF</span></div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: SANS, fontSize: 9, color: 'rgba(255,255,255,.6)', fontWeight: 600 }}>あと</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginTop: 1 }}>
                <span className="oas-num" style={{ fontFamily: NUM, fontWeight: 900, fontSize: 26, color: T.orange, lineHeight: 1 }}>3</span>
                <span style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700 }}>時間</span>
                <span className="oas-num" style={{ fontFamily: NUM, fontWeight: 900, fontSize: 26, color: T.orange, lineHeight: 1, marginLeft: 2 }}>22</span>
                <span style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700 }}>分</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category strip */}
      <div style={{ padding: '20px 0 0' }}>
        <SectionHead title="カテゴリーから" en="Categories"/>
        <div style={{
          display: 'flex', gap: 8, padding: '0 16px', overflowX: 'auto',
        }} className="oas-noscroll">
          {[
            { l: '青果',   k: 'cabbage', c: T.fresh,    n: 24 },
            { l: '精肉',   k: 'chicken', c: T.sale,     n: 18 },
            { l: '鮮魚',   k: 'salmon',  c: '#1f6ba8',  n: 12 },
            { l: '日配',   k: 'milk',    c: T.orange,   n: 32 },
            { l: '惣菜',   k: 'bento',   c: T.brown,    n: 16 },
            { l: 'ベーカリー', k: 'bread', c: T.point,    n: 8 },
            { l: '酒',     k: 'juice',   c: T.member,   n: 28 },
          ].map((cat) => (
            <button key={cat.l} style={{
              flex: '0 0 78px', padding: '10px 8px 8px',
              background: '#fff', border: `1px solid ${T.outline}`, borderRadius: 10,
              cursor: 'pointer', textAlign: 'center',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 8, background: T.paperAlt,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <FoodMark kind={cat.k} size={42}/>
              </div>
              <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: 11, color: T.ink, marginTop: 2 }}>{cat.l}</span>
              <span style={{ fontFamily: NUM, fontWeight: 600, fontSize: 9, color: cat.c }}>{cat.n}品</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recipe of the day */}
      <div style={{ marginTop: 22, padding: '0 16px' }}>
        <button onClick={onRecipe} style={{
          width: '100%', background: '#fdf2db', border: 0, cursor: 'pointer',
          borderRadius: 12, padding: '14px 14px', textAlign: 'left', fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', gap: 12,
          boxShadow: `inset 0 0 0 1px ${T.tanSoft}`,
        }}>
          <FoodMark kind="oyakodon" size={72}/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <Pill tone="orange" size="xs">本日の特売で作れる</Pill>
            <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 14, color: T.ink, marginTop: 6 }}>ふんわり親子丼</div>
            <div style={{ fontFamily: SANS, fontSize: 10.5, color: T.inkMid, marginTop: 2 }}>15分 · 4人前 · 材料費 ¥1,180</div>
          </div>
          <Icon name="chevR" size={18} color={T.brown}/>
        </button>
      </div>

      {/* Coupons strip */}
      <div style={{ marginTop: 22 }}>
        <SectionHead title="使えるクーポン" en="Coupons" more="すべて"/>
        <div style={{ display: 'flex', gap: 10, padding: '0 16px', overflowX: 'auto' }} className="oas-noscroll">
          {[
            { brand: '日配', title: '兵庫 朝採卵', amt: 50, unit: '¥', tail: '21:00まで', kind: 'egg' },
            { brand: 'デリ', title: 'お惣菜 全品', amt: 20, unit: '%', tail: '17:00〜', kind: 'bento' },
            { brand: '日配', title: '北海道 牛乳', amt: 80, unit: '¥', tail: '11/30まで', kind: 'milk' },
          ].map((c, i) => (
            <div key={i} style={{
              flex: '0 0 200px', background: '#fff', border: `1px dashed ${T.orange}`, borderRadius: 10,
              padding: '12px 14px',
              display: 'flex', gap: 10, alignItems: 'center',
            }}>
              <FoodMark kind={c.kind} size={40} bg={T.paperAlt}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: SANS, fontSize: 9.5, color: T.inkSoft, fontWeight: 600 }}>{c.brand}</div>
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 11.5, color: T.ink, marginTop: 1 }}>{c.title}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginTop: 2 }}>
                  <span className="oas-num" style={{ fontFamily: NUM, fontWeight: 900, fontSize: 20, color: T.orange, lineHeight: 1 }}>{c.amt}</span>
                  <span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 10, color: T.orange }}>{c.unit === '¥' ? '円' : '％'}OFF</span>
                </div>
                <div style={{ fontFamily: SANS, fontSize: 9.5, color: T.inkSoft, marginTop: 1 }}>{c.tail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All chirashi items grid */}
      <div style={{ marginTop: 22 }}>
        <SectionHead title="チラシ掲載 全品" en="All Flyer Items" more="48品"/>
        <div style={{ padding: '0 16px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {[
            { name: '玉ねぎ', sub: '3個', price: 198, was: 248, kind: 'onion' },
            { name: 'トマト', sub: '4個', price: 298, was: 380, kind: 'tomato' },
            { name: 'りんご', sub: '3個', price: 380, was: 480, kind: 'apple' },
            { name: 'バナナ', sub: '1房', price: 158, was: 198, kind: 'banana' },
            { name: '木綿豆腐', sub: '300g', price: 88, was: 128, kind: 'tofu' },
            { name: 'ヨーグルト', sub: '400g', price: 268, was: 298, kind: 'yogurt' },
            { name: '牛切落し', sub: '300g', price: 698, was: 980, kind: 'beef' },
            { name: '豚バラ', sub: '300g', price: 498, was: 680, kind: 'pork' },
            { name: '握り寿司', sub: '12貫', price: 980, was: 1280, kind: 'sushi' },
          ].map((p, i) => (
            <div key={i} style={{
              background: '#fff', border: `1px solid ${T.outline}`, borderRadius: 8,
              padding: 8, position: 'relative',
            }}>
              <div style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FoodMark kind={p.kind} size={56}/>
              </div>
              <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 10.5, color: T.ink, marginTop: 4, lineHeight: 1.3 }}>{p.name}</div>
              <div style={{ fontFamily: SANS, fontSize: 9, color: T.inkSoft }}>{p.sub}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginTop: 2 }}>
                <span className="oas-num" style={{ fontFamily: NUM, fontWeight: 900, fontSize: 15, color: T.sale, lineHeight: 1 }}>{p.price}</span>
                <span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 9, color: T.sale }}>円</span>
                <Yen value={p.was} size={8} strike style={{ marginLeft: 2 }}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Compact pill-shaped point strip
function B_TopStrip() {
  return (
    <div style={{
      margin: '10px 16px 0', display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <button style={{
        flex: 1, background: T.brand, color: '#fff', border: 0, cursor: 'pointer',
        padding: '10px 12px', borderRadius: 10,
        display: 'flex', alignItems: 'center', gap: 10,
        textAlign: 'left',
      }}>
        <div style={{
          width: 32, height: 22, borderRadius: 3,
          background: `linear-gradient(135deg, ${T.member}, #a01a23)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: NUM, fontWeight: 900, fontSize: 8, color: '#fff', fontStyle: 'italic',
        }}>S pt</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: SANS, fontSize: 9, color: 'rgba(255,255,255,.6)', fontWeight: 600, letterSpacing: '.1em' }}>S POINT</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
            <span className="oas-num" style={{ fontFamily: NUM, fontWeight: 900, fontSize: 16, color: '#fff' }}>1,248</span>
            <span style={{ fontFamily: SANS, fontSize: 10, color: 'rgba(255,255,255,.7)', fontWeight: 600 }}>pt</span>
          </div>
        </div>
        <Icon name="barcode" size={20} color={T.orange}/>
      </button>
      <button style={{
        background: '#fff', border: `1px solid ${T.outline}`, color: T.ink, cursor: 'pointer',
        width: 44, height: 44, borderRadius: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name="qr" size={20} color={T.ink}/>
      </button>
    </div>
  );
}

window.MobileB = MobileB;
