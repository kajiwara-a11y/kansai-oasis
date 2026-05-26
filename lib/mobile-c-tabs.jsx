// ─────────────────────────────────────────────────────────────
// MOBILE · VARIANT C — Tab screens
// Flyer / Coupon / Recipe list / MyPage. Brand-faithful but each
// adds a small AI-led element (top hint, "AIに任せる" CTA, etc.)
// to stay consistent with the C home.
// ─────────────────────────────────────────────────────────────

// Common C-tone top bar — dark with orange accent dot
function C_TopBar({ title, sub, right, leftBack, onBack }) {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50,
      paddingTop: SAFE_TOP, background: T.brand, color: '#fff',
    }}>
      <div style={{
        height: 48, padding: '0 16px', display: 'flex', alignItems: 'center', gap: 10,
      }}>
        {leftBack ? (
          <button onClick={onBack} style={{
            width: 32, height: 32, border: 0, background: 'transparent', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: -8,
            color: '#fff',
          }}><Icon name="chevL" size={22} color="#fff"/></button>
        ) : null}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 5, height: 5, borderRadius: 999, background: T.orange }}/>
          <div>
            <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 15, letterSpacing: '.03em' }}>{title}</div>
            {sub && <div style={{ fontFamily: SANS, fontWeight: 500, fontSize: 10.5, color: 'rgba(255,255,255,.6)', marginTop: 1 }}>{sub}</div>}
          </div>
        </div>
        {right}
      </div>
    </div>
  );
}

// AI hint strip — small narrow row at top of each tab
function C_AiHint({ children, onTap }) {
  return (
    <button onClick={onTap} style={{
      width: 'calc(100% - 32px)', margin: '12px 16px 0',
      background: '#fff', border: `1px solid ${T.outline}`, borderRadius: 10,
      padding: '10px 12px', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
      display: 'flex', alignItems: 'center', gap: 10,
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: 999, background: T.orange,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto',
      }}>
        <Icon name="sparkleF" size={14} color="#fff"/>
      </div>
      <div style={{ flex: 1, fontFamily: SANS, fontSize: 11.5, color: T.ink, lineHeight: 1.5 }}>
        {children}
      </div>
      <Icon name="chevR" size={14} color={T.inkMute}/>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// FLYER — chirashi, with AI annotations
// ─────────────────────────────────────────────────────────────
function C_Flyer({ push }) {
  const [day, setDay] = React.useState(0);
  return (
    <div style={{ height: '100%', overflowY: 'auto', background: T.bg, paddingBottom: SAFE_BOT + 30 }} className="oas-noscroll">
      <C_TopBar title="チラシ" sub="神戸三宮店 · 48 品目掲載"
        right={<button onClick={() => push('search')} style={iconBtn}><Icon name="filter" size={20} color="#fff"/></button>}/>
      <div style={{ height: SAFE_TOP + 48 }}/>

      <C_AiHint onTap={() => push('ai-chat')}>
        <strong>AIに任せる</strong> · 今日のチラシから 3 食分の献立を組みます
      </C_AiHint>

      {/* Date strip */}
      <div style={{ display: 'flex', gap: 6, padding: '12px 16px 0', overflowX: 'auto' }} className="oas-noscroll">
        {[
          { d: '11/26', day: '水', label: '本日' },
          { d: '11/27', day: '木' },
          { d: '11/28', day: '金' },
          { d: '11/29', day: '土' },
          { d: '11/30', day: '日' },
        ].map((d, i) => (
          <button key={d.d} onClick={() => setDay(i)} style={{
            flex: '0 0 auto', padding: '10px 14px', borderRadius: 10,
            background: i === day ? T.orange : '#fff',
            color: i === day ? '#fff' : T.ink,
            border: `1px solid ${i === day ? T.orange : T.outline}`,
            cursor: 'pointer', textAlign: 'center',
          }}>
            <div style={{ fontFamily: NUM, fontWeight: 800, fontSize: 14 }}>{d.d}</div>
            <div style={{ fontFamily: SANS, fontSize: 9.5, fontWeight: 600, marginTop: 1, opacity: i === day ? .9 : .6 }}>{d.day} {d.label || ''}</div>
          </button>
        ))}
      </div>

      {/* Hero */}
      <div style={{ padding: '14px 16px 0' }}>
        <div style={{
          background: T.newsprint, borderRadius: 12, overflow: 'hidden',
          border: `1px solid ${T.outline}`,
        }}>
          <div style={{
            background: T.sale, color: '#fff', padding: '12px 16px',
            display: 'flex', alignItems: 'baseline', gap: 8,
          }}>
            <span style={{ fontFamily: SANS, fontWeight: 900, fontSize: 18, letterSpacing: '.05em' }}>本日の市場</span>
            <span style={{ fontFamily: NUM, fontWeight: 600, fontSize: 11, opacity: .9 }}>11月26日(水) 限り</span>
          </div>
          <div style={{ padding: 12, display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8 }}>
            {[
              { name: '鶏もも肉', sub: '国産・300g', price: 398, was: 598, kind: 'chicken' },
              { name: '銀鮭 2切', sub: '北海道',     price: 498, was: 698, kind: 'salmon' },
              { name: '兵庫 朝採卵', sub: '10個入', price: 178, was: 248, kind: 'egg' },
              { name: '春キャベツ', sub: '1玉',     price:  98, was: 158, kind: 'cabbage' },
              { name: '北海道牛乳', sub: '1L',       price: 198, was: 258, kind: 'milk' },
              { name: '木綿豆腐', sub: '300g',       price:  88, was: 128, kind: 'tofu' },
            ].map((p, i) => (
              <button key={i} onClick={() => push('product', p)} style={{
                background: '#fff', borderRadius: 8, padding: '10px 10px 10px',
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6,
                border: `1px solid ${T.outline}`, position: 'relative',
                cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
              }}>
                <div style={{
                  position: 'absolute', top: 6, right: 6, background: T.sale, color: '#fff', borderRadius: 4,
                  padding: '2px 5px', fontFamily: NUM, fontWeight: 900, fontSize: 10,
                }}>{Math.round((1 - p.price / p.was) * 100)}%</div>
                <FoodMark kind={p.kind} size={64}/>
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 11.5, color: T.ink }}>{p.name}</div>
                <div style={{ fontFamily: SANS, fontSize: 9.5, color: T.inkSoft, marginTop: -3 }}>{p.sub}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginTop: 'auto' }}>
                  <Yen value={p.price} size={18} tone="sale"/>
                  <Yen value={p.was} size={10} strike/>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* AI bundle suggestion */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{
          background: T.brand, color: '#fff', borderRadius: 12, padding: '14px 16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <Icon name="sparkleF" size={16} color={T.orange}/>
            <span style={{ fontFamily: SANS, fontSize: 10, color: T.orange, fontWeight: 800, letterSpacing: '.2em' }}>AI セット提案</span>
          </div>
          <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 16, lineHeight: 1.4 }}>
            今日の特売で <span style={{ color: T.orange }}>3食分の献立</span> が ¥3,210
          </div>
          <div style={{ fontFamily: SANS, fontSize: 11, color: 'rgba(255,255,255,.7)', marginTop: 6, lineHeight: 1.6 }}>
            親子丼 (水) / 鮭の塩焼き (木) / 豚バラキャベツ炒め (金) — 全 16 品目
          </div>
          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            <button onClick={() => push('shopping-list')} style={{
              flex: 1, background: T.orange, color: '#fff', border: 0, cursor: 'pointer',
              padding: '10px 0', borderRadius: 6,
              fontFamily: SANS, fontWeight: 800, fontSize: 12, letterSpacing: '.05em',
            }}>買い物リストに追加</button>
            <button onClick={() => push('ai-chat')} style={{
              background: 'rgba(255,255,255,.12)', color: '#fff', border: 0, cursor: 'pointer',
              padding: '10px 14px', borderRadius: 6,
              fontFamily: SANS, fontWeight: 700, fontSize: 12,
            }}>変更</button>
          </div>
        </div>
      </div>

      {/* Categories */}
      {[
        { cat: '青果', items: [
          { name: '玉ねぎ', sub: '3個', price: 198, was: 248, kind: 'onion' },
          { name: 'トマト', sub: '4個', price: 298, was: 380, kind: 'tomato' },
          { name: 'りんご', sub: '3個', price: 380, was: 480, kind: 'apple' },
          { name: 'バナナ', sub: '1房', price: 158, was: 198, kind: 'banana' },
        ]},
        { cat: '精肉', items: [
          { name: '牛切落し', sub: '300g', price: 698, was: 980, kind: 'beef' },
          { name: '豚バラ薄切', sub: '300g', price: 498, was: 680, kind: 'pork' },
        ]},
        { cat: '鮮魚', items: [
          { name: '握り寿司 12貫', sub: '本まぐろ入', price: 980, was: 1280, kind: 'sushi' },
          { name: '刺身盛合せ', sub: '3点盛', price: 698, was: 980, kind: 'fish' },
        ]},
      ].map(g => (
        <div key={g.cat} style={{ marginTop: 22 }}>
          <SectionHead title={g.cat} more={`すべて`} onMore={() => push('search')}/>
          <div style={{ padding: '0 16px', display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }}>
            {g.items.map((p, i) => <ProductCard key={i} {...p} badge="特売" badgeTone="sale" onTap={() => push('product', p)}/>)}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// COUPON
// ─────────────────────────────────────────────────────────────
function C_Coupon({ push }) {
  const [used, setUsed] = React.useState({});
  const [filter, setFilter] = React.useState(0);
  const coupons = [
    { brand: '日配 ナガセ',  title: '兵庫 朝採卵 10個入',    amt: 50,  unit: '¥', tail: '本日 21:00 まで', kind: 'egg',     hot: true },
    { brand: 'デリ',         title: 'お惣菜 全品',            amt: 20,  unit: '%', tail: '17:00 以降',     kind: 'bento' },
    { brand: '日配 よつば',  title: '北海道 牛乳',             amt: 80,  unit: '¥', tail: '11/30 まで',     kind: 'milk' },
    { brand: 'ベーカリー',   title: '食パン 6枚切',            amt: 60,  unit: '¥', tail: '夕方の焼上り',   kind: 'bread' },
    { brand: '鮮魚',         title: '鮮魚 全品',               amt: 15,  unit: '%', tail: '本日限り',       kind: 'salmon' },
  ];
  return (
    <div style={{ height: '100%', overflowY: 'auto', background: T.bg, paddingBottom: SAFE_BOT + 30 }} className="oas-noscroll">
      <C_TopBar title="クーポン" sub={`${coupons.length} 枚 · 神戸三宮店`}/>
      <div style={{ height: SAFE_TOP + 48 }}/>

      {/* Savings summary — black/orange C tone */}
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
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: SANS, fontSize: 10, color: T.orange, fontWeight: 700, letterSpacing: '.2em' }}>YOUR SAVINGS</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
                <span style={{ fontSize: 16, fontWeight: 700 }}>¥</span>
                <span className="oas-num" style={{ fontFamily: NUM, fontSize: 36, fontWeight: 900, letterSpacing: '-.02em', lineHeight: 1 }}>420</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,.6)', marginLeft: 6, fontWeight: 600 }}>合計お得</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: SANS, fontSize: 10, color: 'rgba(255,255,255,.6)' }}>有効</div>
              <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, marginTop: 2 }}>本日 21:00</div>
            </div>
          </div>
        </div>
      </div>

      <C_AiHint onTap={() => push('ai-chat')}>
        AIがあなたの<strong>購買履歴</strong>に合うクーポンを優先表示しています
      </C_AiHint>

      {/* Filter chips */}
      <div style={{ padding: '12px 16px 0', display: 'flex', gap: 6, overflowX: 'auto' }} className="oas-noscroll">
        {['すべて', '本日限り', '日配', '精肉', '鮮魚', '惣菜', 'ベーカリー'].map((c, i) => (
          <button key={c} onClick={() => setFilter(i)} style={{
            padding: '6px 12px', borderRadius: 99,
            background: i === filter ? T.ink : '#fff',
            color: i === filter ? '#fff' : T.ink,
            border: `1px solid ${i === filter ? T.ink : T.outline}`,
            cursor: 'pointer', flex: '0 0 auto',
            fontFamily: SANS, fontWeight: 600, fontSize: 11,
          }}>{c}</button>
        ))}
      </div>

      {/* Coupons */}
      <div style={{ padding: '14px 16px 0' }}>
        {coupons.map((c, i) => (
          <div key={i} style={{
            marginTop: i ? 10 : 0,
            background: '#fff', border: `1px solid ${c.hot ? T.orange : T.outline}`,
            borderRadius: 12, overflow: 'hidden',
            display: 'flex', alignItems: 'stretch',
            position: 'relative',
            opacity: used[i] ? .5 : 1,
          }}>
            {c.hot && <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}><Pill tone="orange" size="xs">本日限り</Pill></div>}
            <div style={{
              flex: '0 0 100px', background: c.hot ? T.orangeSoft : T.paperAlt,
              padding: '12px 8px', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', textAlign: 'center',
              borderRight: `1px dashed ${T.outline}`,
              position: 'relative',
            }}>
              <span className="oas-num" style={{
                fontFamily: NUM, fontWeight: 900, fontSize: 36, color: c.hot ? T.orangeDeep : T.ink,
                lineHeight: 1, letterSpacing: '-.03em',
              }}>{c.amt}</span>
              <span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 14, color: c.hot ? T.orangeDeep : T.ink, marginTop: 2 }}>
                {c.unit === '¥' ? '円' : '％'}OFF
              </span>
              <div style={{
                position: 'absolute', right: -6, top: 8, bottom: 8, width: 12,
                backgroundImage: `radial-gradient(circle at 6px 6px, ${T.bg} 4px, transparent 4px)`,
                backgroundSize: '12px 12px',
              }}/>
            </div>
            <div style={{ flex: 1, padding: '12px 14px 12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <FoodMark kind={c.kind} size={44} bg={T.paperAlt}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: SANS, fontSize: 10, color: T.inkSoft, fontWeight: 600 }}>{c.brand}</div>
                <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 13, color: T.ink, marginTop: 2 }}>{c.title}</div>
                <div style={{ fontFamily: SANS, fontSize: 10.5, color: T.inkMid, marginTop: 3, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <Icon name="clock" size={11} color={T.inkSoft}/>{c.tail}
                </div>
              </div>
              <button onClick={() => setUsed(u => ({ ...u, [i]: !u[i] }))} style={{
                background: used[i] ? '#fff' : T.brand, color: used[i] ? T.inkSoft : '#fff',
                border: `1px solid ${used[i] ? T.outline : T.brand}`, cursor: 'pointer',
                padding: '8px 12px', borderRadius: 6,
                fontFamily: SANS, fontWeight: 700, fontSize: 11, letterSpacing: '.05em',
              }}>{used[i] ? '使用済' : '取得'}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// RECIPE list
// ─────────────────────────────────────────────────────────────
function C_RecipeList({ push }) {
  const [cat, setCat] = React.useState(0);
  const cats = ['すべて', '時短', '節約', '今日の特売活用', 'お弁当', '簡単晩ごはん'];
  const recipes = [
    { id: 'oyakodon',   t: 'ふんわり親子丼',    sub: '15分・4人前', kcal: 628, mins: 15, kind: 'oyakodon',  tag: 'AIおすすめ', tagTone: 'orange' },
    { id: 'nikujaga',   t: '肉じゃが',          sub: '30分・4人前', kcal: 480, mins: 30, kind: 'nikujaga',  tag: '定番' },
    { id: 'salmon',     t: '塩鮭の塩焼き',      sub: '10分・2人前', kcal: 220, mins: 10, kind: 'salmon',    tag: '時短', tagTone: 'fresh' },
    { id: 'salad',      t: '彩り野菜サラダ',    sub: '8分・2人前',  kcal: 180, mins: 8,  kind: 'salad',     tag: 'ヘルシー', tagTone: 'fresh' },
    { id: 'misoSoup',   t: 'お味噌汁',          sub: '5分・4人前',  kcal: 80,  mins: 5,  kind: 'misoSoup',  tag: '時短', tagTone: 'fresh' },
    { id: 'bento',      t: 'お弁当 三色丼',     sub: '20分',        kcal: 540, mins: 20, kind: 'bento',     tag: 'お弁当' },
  ];
  return (
    <div style={{ height: '100%', overflowY: 'auto', background: T.bg, paddingBottom: SAFE_BOT + 30 }} className="oas-noscroll">
      <C_TopBar title="レシピ" sub="今日の特売を使った提案"
        right={<button onClick={() => push('search')} style={iconBtn}><Icon name="search" size={20} color="#fff"/></button>}/>
      <div style={{ height: SAFE_TOP + 48 }}/>

      <C_AiHint onTap={() => push('ai-chat')}>
        AIに<strong>「冷蔵庫の食材」</strong>を伝えると、最適なレシピを 3 つ提案します
      </C_AiHint>

      <div style={{ padding: '14px 16px 0', display: 'flex', gap: 6, overflowX: 'auto' }} className="oas-noscroll">
        {cats.map((c, i) => (
          <button key={c} onClick={() => setCat(i)} style={{
            padding: '6px 12px', borderRadius: 99,
            background: i === cat ? T.ink : '#fff',
            color: i === cat ? '#fff' : T.ink,
            border: `1px solid ${i === cat ? T.ink : T.outline}`,
            cursor: 'pointer', flex: '0 0 auto',
            fontFamily: SANS, fontWeight: 600, fontSize: 11,
          }}>{c}</button>
        ))}
      </div>

      <div style={{ padding: '14px 16px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {recipes.map((r, i) => (
          <button key={i} onClick={() => push('recipe-detail', { id: r.id })} style={{
            background: '#fff', border: `1px solid ${T.outline}`, borderRadius: 12,
            cursor: 'pointer', padding: 0, textAlign: 'left', fontFamily: 'inherit',
            overflow: 'hidden',
          }}>
            <div style={{ height: 110, background: T.shelf, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <FoodMark kind={r.kind} size={88}/>
              <div style={{ position: 'absolute', top: 6, left: 6 }}>
                <Pill tone={r.tagTone || 'paper'} size="xs">{r.tag}</Pill>
              </div>
              <div style={{
                position: 'absolute', top: 6, right: 6,
                background: 'rgba(255,255,255,.95)', borderRadius: 999, width: 28, height: 28,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><Icon name="heart" size={15} color={T.inkSoft}/></div>
            </div>
            <div style={{ padding: '8px 10px 10px' }}>
              <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 13, color: T.ink, lineHeight: 1.3 }}>{r.t}</div>
              <div style={{ fontFamily: SANS, fontSize: 10, color: T.inkSoft, marginTop: 3 }}>{r.sub}</div>
              <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 6, fontFamily: NUM, fontSize: 10, color: T.inkMid, fontWeight: 600 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}><Icon name="clock" size={11} color={T.inkSoft}/> {r.mins}分</span>
                <span>·</span>
                <span>{r.kcal} kcal</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MY PAGE
// ─────────────────────────────────────────────────────────────
function C_MyPage({ push }) {
  return (
    <div style={{ height: '100%', overflowY: 'auto', background: T.paperAlt, paddingBottom: SAFE_BOT + 30 }} className="oas-noscroll">
      <C_TopBar title="マイページ"
        right={<button onClick={() => push('notif')} style={{ ...iconBtn, color: '#fff' }}><Icon name="bell" size={20} color="#fff"/></button>}/>
      <div style={{ height: SAFE_TOP + 48 }}/>

      {/* Profile + point card */}
      <div style={{ padding: '14px 16px 0' }}>
        <div style={{
          background: '#fff', borderRadius: 14, padding: '18px 16px',
          border: `1px solid ${T.outline}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src="https://i.pravatar.cc/120?img=49" alt="" style={{
              width: 56, height: 56, borderRadius: 999, objectFit: 'cover',
              boxShadow: '0 4px 10px rgba(46,133,64,.3)',
              background: `linear-gradient(135deg, ${T.orange}, ${T.orangeDeep})`,
            }}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 15, color: T.ink }}>田中 はるか 様</div>
              <div style={{ fontFamily: SANS, fontSize: 10.5, color: T.inkSoft, marginTop: 2 }}>会員番号 4901-2345-6789</div>
              <div style={{ marginTop: 4 }}>
                <Pill tone="point" size="xs">ゴールド会員</Pill>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 14, padding: '12px 0 0', borderTop: `1px solid ${T.outlineSoft}`, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: SANS, fontSize: 9.5, color: T.inkSoft, fontWeight: 600, letterSpacing: '.1em' }}>Sポイント</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span className="oas-num" style={{ fontFamily: NUM, fontWeight: 900, fontSize: 28, color: T.point }}>1,248</span>
                <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: 11, color: T.inkMid }}>pt</span>
              </div>
            </div>
            <div style={{ width: 1, height: 36, background: T.outline }}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: SANS, fontSize: 9.5, color: T.inkSoft, fontWeight: 600, letterSpacing: '.1em' }}>今月のお買物</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <Yen value={18420} size={22}/>
              </div>
            </div>
          </div>

          <button onClick={() => push('barcode')} style={{
            marginTop: 14, width: '100%', background: T.brand, color: '#fff', border: 0, cursor: 'pointer',
            padding: '12px 0', borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            fontFamily: SANS, fontWeight: 800, fontSize: 13, letterSpacing: '.05em',
          }}>
            <Icon name="barcode" size={18} color="#fff"/>
            会員バーコードを表示
          </button>
        </div>
      </div>

      {/* AI usage summary — unique to C */}
      <div style={{ padding: '12px 16px 0' }}>
        <div style={{
          background: T.brand, color: '#fff', borderRadius: 14, padding: '14px 16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Icon name="sparkleF" size={14} color={T.orange}/>
            <span style={{ fontFamily: SANS, fontSize: 10, color: T.orange, fontWeight: 700, letterSpacing: '.2em' }}>AI USAGE</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
            <div>
              <div style={{ fontFamily: NUM, fontWeight: 900, fontSize: 22 }}>42</div>
              <div style={{ fontFamily: SANS, fontSize: 9.5, color: 'rgba(255,255,255,.6)', fontWeight: 600, marginTop: 2 }}>今月の相談</div>
            </div>
            <div>
              <div style={{ fontFamily: NUM, fontWeight: 900, fontSize: 22, color: T.orange }}>¥3,840</div>
              <div style={{ fontFamily: SANS, fontSize: 9.5, color: 'rgba(255,255,255,.6)', fontWeight: 600, marginTop: 2 }}>AI 提案で節約</div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu list */}
      <div style={{ padding: '14px 16px 0' }}>
        {[
          { g: '購入', items: [
            { i: 'list',  l: '購入履歴',         go: 'orders' },
            { i: 'heart', l: 'お気に入り商品',    go: 'favorites' },
            { i: 'truck', l: '阪急キッチンエール', go: 'kitchen-yell' },
          ]},
          { g: '会員', items: [
            { i: 'point',    l: 'Sポイント明細',    go: 'barcode' },
            { i: 'gift',     l: 'クラブ・エフカード', go: 'barcode' },
            { i: 'user',     l: '会員情報の変更',   go: 'account' },
          ]},
          { g: 'その他', items: [
            { i: 'info',     l: 'お問い合わせ',     go: 'contact' },
            { i: 'book',     l: '利用規約・プライバシー', go: 'terms' },
            { i: 'settings', l: '通知・設定',       go: 'settings' },
          ]},
        ].map((s) => (
          <div key={s.g} style={{ marginTop: 14 }}>
            <div style={{ fontFamily: SANS, fontSize: 10, color: T.inkSoft, fontWeight: 700, letterSpacing: '.15em', marginBottom: 6 }}>{s.g}</div>
            <div style={{ background: '#fff', border: `1px solid ${T.outline}`, borderRadius: 10, overflow: 'hidden' }}>
              {s.items.map((it, i) => (
                <button key={i} onClick={() => it.go && push(it.go)} style={{
                  width: '100%', padding: '14px 14px', display: 'flex', alignItems: 'center', gap: 12,
                  borderTop: i ? `1px solid ${T.outlineSoft}` : 'none',
                  border: 'none', background: '#fff',
                  cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
                }}>
                  <Icon name={it.i} size={20} color={T.brown} sw={1.6}/>
                  <span style={{ flex: 1, fontFamily: SANS, fontSize: 13, fontWeight: 600, color: T.ink }}>{it.l}</span>
                  <Icon name="chevR" size={14} color={T.inkMute}/>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { C_TopBar, C_AiHint, C_Flyer, C_Coupon, C_RecipeList, C_MyPage });
