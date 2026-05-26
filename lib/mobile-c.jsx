// ─────────────────────────────────────────────────────────────
// MOBILE · VARIANT C — "AI-LED" (full app)
// Single React shell. `start` prop sets the initial screen so design
// canvas artboards can each render a different scene.
//   tabs:  home / flyer / coupon / recipe / mypage
//   sub:   product / shopping-list / aisle-map / recipe-detail
//          / ai-chat / search / notif / barcode
// ─────────────────────────────────────────────────────────────

function MobileC({ start = 'home' }) {
  const [stack, setStack] = React.useState([{ view: start }]);
  const current = stack[stack.length - 1];

  const push = (view, data) => setStack(s => [...s, { view, data }]);
  const pop  = ()             => setStack(s => s.length > 1 ? s.slice(0, -1) : s);
  const goTab = (view)        => setStack([{ view }]);

  const isTab = ['home','flyer','coupon','recipe','mypage'].includes(current.view);
  const tabId = isTab ? current.view : 'home';

  const screens = {
    home:           <C_Home          push={push}/>,
    flyer:          <C_Flyer         push={push}/>,
    coupon:         <C_Coupon        push={push}/>,
    recipe:         <C_RecipeList    push={push}/>,
    mypage:         <C_MyPage        push={push}/>,
    product:        <C_Product       data={current.data} pop={pop} push={push}/>,
   'shopping-list': <C_ShoppingList  pop={pop} push={push}/>,
   'aisle-map':     <C_AisleMap      pop={pop}/>,
   'recipe-detail': <C_RecipeDetail  data={current.data} pop={pop} push={push}/>,
   'ai-chat':       <C_AiChat        pop={pop} push={push}/>,
    search:         <C_Search        pop={pop} push={push}/>,
    notif:          <C_Notif         pop={pop}/>,
    barcode:        <C_Barcode       pop={pop} push={push}/>,
   'kitchen-yell':  <C_KitchenYell   pop={pop} push={push}/>,
    contact:        <C_Contact       pop={pop}/>,
    terms:          <C_Terms         pop={pop}/>,
    settings:       <C_Settings      pop={pop}/>,
    account:        <C_Account       pop={pop}/>,
    orders:         <C_OrderHistory  pop={pop} push={push}/>,
    favorites:      <C_Favorites     pop={pop} push={push}/>,
  };

  return (
    <PhoneBezel paper={T.bg}>
      {screens[current.view]}
      {isTab && <TabBar active={tabId} onChange={goTab}/>}
    </PhoneBezel>
  );
}

// ─────────────────────────────────────────────────────────────
// HOME — AI-led
// ─────────────────────────────────────────────────────────────
function C_Home({ push }) {
  const [listItems, setListItems] = React.useState([
    { name: '鶏もも肉', sub: '300g',  price: 398, kind: 'chicken', done: false, tag: '特売' },
    { name: '兵庫 朝採卵', sub: '10個', price: 178, kind: 'egg',    done: false, tag: '特売' },
    { name: '玉ねぎ',    sub: '3個',  price: 198, kind: 'onion',  done: false },
    { name: '三つ葉',    sub: '1束',  price: 128, kind: 'cabbage', done: false },
  ]);
  const toggle = (i) => setListItems(items => items.map((it, idx) => idx === i ? { ...it, done: !it.done } : it));
  const total = listItems.reduce((s, i) => s + i.price, 0);
  const done = listItems.filter(i => i.done).length;

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: T.bg, paddingBottom: SAFE_BOT + 30 }} className="oas-noscroll">
      <BrandHeader onSearch={() => push('search')} onNotif={() => push('notif')}/>
      <div style={{ height: SAFE_TOP + 60 }}/>

      {/* AI HERO */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{
          background: `linear-gradient(160deg, ${T.brand} 0%, #2a2520 100%)`,
          borderRadius: 16, padding: '18px 18px 18px',
          color: '#fff', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -40, right: -40, width: 180, height: 180,
            background: `radial-gradient(circle, ${T.orange} 0%, transparent 60%)`,
            opacity: .25,
          }}/>

          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 999, background: T.orange,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(46,133,64,.45)',
            }}>
              <Icon name="sparkleF" size={16} color="#fff"/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: SANS, fontSize: 9.5, fontWeight: 700, color: T.orange, letterSpacing: '.2em' }}>YOUR AI ASSISTANT</div>
              <div style={{ fontFamily: SANS, fontSize: 11, color: 'rgba(255,255,255,.6)', marginTop: 1 }}>17:24 · 神戸三宮店から</div>
            </div>
          </div>

          <div style={{
            position: 'relative',
            fontFamily: SANS, fontWeight: 800, fontSize: 18, lineHeight: 1.45, letterSpacing: '.02em',
          }}>
            こんばんは、田中さん。<br/>
            今夜は <span style={{ color: T.orange }}>親子丼</span> はいかがですか？
          </div>
          <div style={{
            position: 'relative',
            marginTop: 8, fontFamily: SANS, fontSize: 12, color: 'rgba(255,255,255,.7)', lineHeight: 1.6,
          }}>
            鶏もも肉と卵が特売中。15分で作れて、家族 4 人分で <span style={{ color: T.orange, fontWeight: 800 }}>¥1,180</span> です。
          </div>

          <div style={{ position: 'relative', marginTop: 14, display: 'flex', gap: 8 }}>
            <button onClick={() => push('recipe-detail', { id: 'oyakodon' })} style={{
              flex: 1, background: T.orange, color: '#fff', border: 0, cursor: 'pointer',
              padding: '12px 0', borderRadius: 8,
              fontFamily: SANS, fontWeight: 800, fontSize: 12.5, letterSpacing: '.05em',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 4,
            }}>レシピを見る <Icon name="chevR" size={14} color="#fff"/></button>
            <button onClick={() => push('ai-chat')} style={{
              background: 'rgba(255,255,255,.12)', color: '#fff', border: 0, cursor: 'pointer',
              padding: '12px 14px', borderRadius: 8,
              fontFamily: SANS, fontWeight: 700, fontSize: 12,
              display: 'inline-flex', alignItems: 'center', gap: 4,
            }}>別の案</button>
          </div>
        </div>
      </div>

      {/* Smart shopping list */}
      <div style={{ padding: '16px 16px 0' }}>
        <div onClick={() => push('shopping-list')} style={{
          width: '100%', background: '#fff', border: `1px solid ${T.outline}`, borderRadius: 14,
          overflow: 'hidden', cursor: 'pointer',
        }}>
          <div style={{
            padding: '12px 14px 10px', display: 'flex', alignItems: 'center', gap: 8,
            borderBottom: `1px solid ${T.outlineSoft}`,
          }}>
            <Icon name="cart" size={18} color={T.brown}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 13, color: T.ink }}>今日の買い物リスト</div>
              <div style={{ fontFamily: SANS, fontSize: 10, color: T.inkSoft, marginTop: 1 }}>
                親子丼の材料 · AIが自動で作成
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: NUM, fontWeight: 800, fontSize: 11, color: T.inkSoft }}>
                <span style={{ color: T.orange, fontWeight: 900 }}>{done}</span> / {listItems.length}
              </div>
              <div style={{ marginTop: 2 }}>
                <Yen value={total} size={14}/>
              </div>
            </div>
          </div>

          <div>
            {listItems.slice(0, 3).map((it, i) => (
              <div key={i} style={{
                padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10,
                borderTop: i ? `1px solid ${T.outlineSoft}` : 'none',
                opacity: it.done ? .5 : 1,
              }}>
                <button onClick={(e) => { e.stopPropagation(); toggle(i); }} style={{
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
                  }}>
                    {it.name}<span style={{ color: T.inkSoft, fontWeight: 500, fontSize: 10, marginLeft: 4 }}>{it.sub}</span>
                  </div>
                  {it.tag && <span style={{ fontFamily: SANS, fontSize: 9.5, color: T.sale, fontWeight: 700, marginTop: 1, display: 'inline-block' }}>{it.tag}</span>}
                </div>
                <Yen value={it.price} size={13}/>
              </div>
            ))}
          </div>

          <div style={{
            padding: '10px 14px', background: T.paperAlt,
            display: 'flex', alignItems: 'center', gap: 10,
            borderTop: `1px solid ${T.outlineSoft}`,
          }}>
            <Icon name="pin" size={14} color={T.orange}/>
            <span style={{ flex: 1, fontFamily: SANS, fontSize: 11, color: T.inkMid, fontWeight: 600 }}>店内ナビ · 約 12 分</span>
            <span style={{
              background: T.brand, color: '#fff',
              padding: '7px 12px', borderRadius: 6,
              fontFamily: SANS, fontWeight: 700, fontSize: 11,
            }}>すべて見る →</span>
          </div>
        </div>
      </div>

      {/* Quick AI prompts */}
      <div style={{ padding: '14px 16px 0' }}>
        <div style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700, color: T.inkSoft, letterSpacing: '.15em', marginBottom: 8 }}>
          AIに聞いてみる
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {[
            { l: '節約献立',          i: '💴' },
            { l: '時短レシピ',        i: '⏱' },
            { l: '子ども向け',        i: '🧒' },
            { l: '冷蔵庫の余り物',     i: '🧊' },
            { l: 'ヘルシー',          i: '🥗' },
          ].map((p, i) => (
            <button key={i} onClick={() => push('ai-chat')} style={{
              padding: '8px 14px', borderRadius: 99,
              background: '#fff', border: `1px solid ${T.outline}`,
              color: T.ink, cursor: 'pointer',
              fontFamily: SANS, fontWeight: 600, fontSize: 11.5,
              display: 'inline-flex', alignItems: 'center', gap: 4,
            }}>
              <span style={{ fontSize: 13 }}>{p.i}</span>
              {p.l}
            </button>
          ))}
        </div>
      </div>

      {/* Point + Coupon strip */}
      <div style={{ padding: '18px 16px 0', display: 'flex', gap: 10 }}>
        <button onClick={() => push('barcode')} style={{
          flex: 1, background: '#fff', border: `1px solid ${T.outline}`, borderRadius: 12,
          padding: '12px 14px', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Icon name="point" size={13} color={T.point}/>
            <span style={{ fontFamily: SANS, fontSize: 10, color: T.inkSoft, fontWeight: 700, letterSpacing: '.1em' }}>S POINT</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
            <span className="oas-num" style={{ fontFamily: NUM, fontWeight: 900, fontSize: 22, color: T.point }}>1,248</span>
            <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: 10, color: T.inkMid }}>pt</span>
          </div>
        </button>
        <button onClick={() => push('coupon')} style={{
          flex: 1, background: '#fff', border: `1px solid ${T.outline}`, borderRadius: 12,
          padding: '12px 14px', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Icon name="coupon" size={13} color={T.orange}/>
            <span style={{ fontFamily: SANS, fontSize: 10, color: T.inkSoft, fontWeight: 700, letterSpacing: '.1em' }}>クーポン</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
            <span className="oas-num" style={{ fontFamily: NUM, fontWeight: 900, fontSize: 22, color: T.orange }}>5</span>
            <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: 10, color: T.inkMid }}>枚</span>
            <span style={{ fontFamily: SANS, fontSize: 10, color: T.sale, marginLeft: 'auto', fontWeight: 700 }}>¥420 お得</span>
          </div>
        </button>
      </div>

      {/* Today's deals */}
      <div style={{ marginTop: 22 }}>
        <SectionHead title="本日の特売" en="Today's Deals" more="チラシ" onMore={() => push('flyer')}/>
        <div style={{ display: 'flex', gap: 10, padding: '0 16px', overflowX: 'auto' }} className="oas-noscroll">
          {[
            { name: '北海道 銀鮭',  sub: '2切',  price: 498, was: 698, kind: 'salmon',  badge: '特売' },
            { name: '春キャベツ',   sub: '1玉',  price:  98, was: 158, kind: 'cabbage', badge: '青果', badgeTone: 'fresh' },
            { name: '北海道 牛乳',  sub: '1L',   price: 198, was: 258, kind: 'milk',    badge: '日配', badgeTone: 'fresh' },
            { name: '木綿豆腐',     sub: '300g', price:  88, was: 128, kind: 'tofu',    badge: '日配', badgeTone: 'fresh' },
            { name: 'りんご',       sub: '3個',  price: 380, was: 480, kind: 'apple',   badge: '青果', badgeTone: 'fresh' },
          ].map((p) => <ProductCard key={p.name} {...p} width={142} onTap={() => push('product', p)}/>)}
        </div>
      </div>

      {/* Past AI conversation */}
      <div style={{ padding: '22px 16px 0' }}>
        <SectionHead title="最近の相談" en="Recent" more="履歴" onMore={() => push('ai-chat')} style={{ padding: 0, marginBottom: 10 }}/>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { q: '鮭はどこにあるかしら？',          a: '鮮魚 F-2 · 入口から 22m · ¥498',  kind: 'salmon', t: '10分前' },
            { q: '子どもが喜ぶおやつ',              a: 'メロンパン (17時焼上り) と牛乳',   kind: 'bread',  t: '昨日' },
            { q: '今週の節約献立を 3 つ',           a: '親子丼 / 肉じゃが / 鮭の塩焼き',    kind: 'nikujaga', t: '2日前' },
          ].map((c, i) => (
            <button key={i} onClick={() => push('ai-chat')} style={{
              width: '100%', background: '#fff', border: `1px solid ${T.outline}`, borderRadius: 10,
              padding: '10px 12px', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <FoodMark kind={c.kind} size={36} bg={T.paperAlt}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
                  <Icon name="sparkleF" size={9} color={T.orange}/>
                  <span style={{ fontFamily: SANS, fontSize: 9.5, color: T.inkSoft, fontWeight: 700, letterSpacing: '.1em' }}>{c.t}</span>
                </div>
                <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, color: T.ink, lineHeight: 1.4 }}>{c.q}</div>
                <div style={{ fontFamily: SANS, fontSize: 10.5, color: T.inkMid, marginTop: 2, lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>→ {c.a}</div>
              </div>
              <Icon name="chevR" size={14} color={T.inkMute}/>
            </button>
          ))}
        </div>
      </div>

      {/* Light flyer preview */}
      <div style={{ marginTop: 22 }}>
        <SectionHead title="今週のチラシ" en="Weekly Flyer" more="全店舗" onMore={() => push('flyer')}/>
        <div style={{ padding: '0 16px' }}>
          <button onClick={() => push('flyer')} style={{
            width: '100%', background: T.newsprint, borderRadius: 10, padding: 12, border: `1px solid ${T.outline}`,
            display: 'flex', alignItems: 'center', gap: 12,
            cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
          }}>
            <div style={{
              flex: '0 0 auto', textAlign: 'center',
              padding: '8px 10px', background: T.sale, color: '#fff', borderRadius: 6,
            }}>
              <div style={{ fontFamily: NUM, fontWeight: 900, fontSize: 18, lineHeight: 1 }}>11/26</div>
              <div style={{ fontFamily: SANS, fontSize: 9, fontWeight: 700, marginTop: 2 }}>水曜版</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 14, color: T.ink }}>市場の朝</div>
              <div style={{ fontFamily: SANS, fontSize: 10.5, color: T.inkMid, marginTop: 2 }}>本日 9:00 — 21:00 · 48 品目掲載</div>
            </div>
            <Icon name="chevR" size={18} color={T.brown}/>
          </button>
        </div>
      </div>
    </div>
  );
}

window.MobileC = MobileC;
