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
  const [store, setStore] = React.useState('神戸三宮店');
  const [storePickerOpen, setStorePickerOpen] = React.useState(false);
  const current = stack[stack.length - 1];

  const push = (view, data) => setStack(s => [...s, { view, data }]);
  const pop  = ()             => setStack(s => s.length > 1 ? s.slice(0, -1) : s);
  const goTab = (view)        => setStack([{ view }]);
  const openStorePicker = () => setStorePickerOpen(true);

  const isTab = ['home','flyer','coupon','recipe','mypage'].includes(current.view);
  const tabId = isTab ? current.view : 'home';

  const screens = {
    home:           <C_Home          push={push} store={store} onStore={openStorePicker}/>,
    flyer:          <C_Flyer         push={push}/>,
    coupon:         <C_Coupon        push={push}/>,
    recipe:         <C_RecipeList    push={push}/>,
    mypage:         <C_MyPage        push={push}/>,
    product:        <C_Product       data={current.data} pop={pop} push={push}/>,
   'shopping-list': <C_ShoppingList  pop={pop} push={push}/>,
   'aisle-map':     <C_AisleMap      pop={pop} push={push}/>,
   'recipe-detail': <C_RecipeDetail  data={current.data} pop={pop} push={push}/>,
   'ai-chat':       <C_AiChat        pop={pop} push={push}/>,
    search:         <C_Search        data={current.data} pop={pop} push={push}/>,
    notif:          <C_Notif         pop={pop} push={push}/>,
    barcode:        <C_Barcode       pop={pop} push={push}/>,
   'kitchen-yell':  <C_KitchenYell   pop={pop} push={push}/>,
    contact:        <C_Contact       pop={pop} push={push}/>,
    terms:          <C_Terms         pop={pop}/>,
    settings:       <C_Settings      pop={pop} push={push}/>,
    account:        <C_Account       pop={pop}/>,
    orders:         <C_OrderHistory  pop={pop} push={push}/>,
    favorites:      <C_Favorites     pop={pop} push={push}/>,
  };

  return (
    <PhoneBezel paper={T.bg}>
      {screens[current.view]}
      {isTab && <TabBar active={tabId} onChange={goTab}/>}
      {isTab && (
        <AiChatFab onClick={() => push('ai-chat')} hasTabBar={true}/>
      )}
      {storePickerOpen && (
        <StorePicker current={store} onPick={(s) => { setStore(s); setStorePickerOpen(false); }} onClose={() => setStorePickerOpen(false)}/>
      )}
    </PhoneBezel>
  );
}

// ─────────────────────────────────────────────────────────────
// STORE PICKER — bottom sheet for switching stores
// ─────────────────────────────────────────────────────────────
function StorePicker({ current, onPick, onClose }) {
  const stores = [
    { name: '神戸三宮店',       area: '兵庫',   tag: 'ここから' },
    { name: '梅田店',           area: '大阪',   tag: '徒歩 3 分' },
    { name: '芦屋店',           area: '兵庫',   tag: '車で 12 分' },
    { name: '西宮ガーデンズ店', area: '兵庫',   tag: '車で 18 分' },
    { name: '千里中央店',       area: '大阪',   tag: '電車 25 分' },
    { name: '高槻松原店',       area: '大阪',   tag: '電車 38 分' },
    { name: '京都河原町店',     area: '京都',   tag: '電車 1 時間' },
    { name: '吹田SST店',        area: '大阪',   tag: 'リニューアル' },
  ];
  return (
    <>
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0, zIndex: 80,
        background: 'rgba(0,0,0,.45)', animation: 'oasFadeIn .2s',
      }}/>
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 81,
        background: '#fff', borderTopLeftRadius: 18, borderTopRightRadius: 18,
        maxHeight: '78%', display: 'flex', flexDirection: 'column',
        animation: 'oasSlideUp .25s ease-out',
        boxShadow: '0 -10px 30px rgba(0,0,0,.18)',
      }}>
        <div style={{ padding: '10px 0 6px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 38, height: 4, background: T.outline, borderRadius: 99 }}/>
        </div>
        <div style={{
          padding: '6px 18px 12px',
          borderBottom: `1px solid ${T.outlineSoft}`,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <Icon name="pin" size={18} color={T.orange}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 15, color: T.ink }}>店舗を選択</div>
            <div style={{ fontFamily: SANS, fontSize: 10.5, color: T.inkSoft, marginTop: 1 }}>クーポン・チラシ・在庫・店内ナビが切替わります</div>
          </div>
          <button onClick={onClose} style={{
            background: T.paperAlt, border: 0, padding: '6px 12px', borderRadius: 99,
            fontFamily: SANS, fontWeight: 700, fontSize: 11, color: T.inkMid, cursor: 'pointer',
          }}>閉じる</button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '4px 0 12px' }} className="oas-noscroll">
          {stores.map((s) => {
            const isCur = s.name === current;
            return (
              <button key={s.name} onClick={() => onPick(s.name)} style={{
                width: '100%', textAlign: 'left',
                background: isCur ? T.orangeSoft : '#fff', border: 0, cursor: 'pointer',
                padding: '14px 18px',
                borderTop: `1px solid ${T.outlineSoft}`,
                display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'inherit',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 999,
                  background: isCur ? T.orange : T.paperAlt,
                  color: isCur ? '#fff' : T.inkMid,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto',
                }}>
                  <Icon name="pin" size={16} color={isCur ? '#fff' : T.inkSoft}/>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 13.5, color: T.ink }}>{s.name}</span>
                    {isCur && <span style={{
                      fontFamily: SANS, fontWeight: 800, fontSize: 9, color: T.orange,
                      letterSpacing: '.15em', padding: '2px 6px',
                      background: '#fff', border: `1px solid ${T.orange}`, borderRadius: 99,
                    }}>選択中</span>}
                  </div>
                  <div style={{ fontFamily: SANS, fontSize: 10.5, color: T.inkSoft, marginTop: 2 }}>{s.area} · {s.tag}</div>
                </div>
                {isCur && <Icon name="check" size={18} color={T.orange} sw={2.5}/>}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// HOME — AI-led
// ─────────────────────────────────────────────────────────────
function C_Home({ push, store, onStore }) {
  const [listItems, setListItems] = React.useState([
    { name: '鶏もも肉', sub: '300g',  price: 398, kind: 'chicken', done: false, tag: '特売' },
    { name: '兵庫 朝採卵', sub: '10個', price: 178, kind: 'egg',    done: false, tag: '特売' },
    { name: '玉ねぎ',    sub: '3個',  price: 198, kind: 'onion',  done: false },
    { name: '三つ葉',    sub: '1束',  price: 128, kind: 'cabbage', done: false },
  ]);
  const toggle = (i) => setListItems(items => items.map((it, idx) => idx === i ? { ...it, done: !it.done } : it));
  const total = listItems.reduce((s, i) => s + i.price, 0);
  const done = listItems.filter(i => i.done).length;

  // ── Hero cards: AI proposals + campaign banners (horizontal scroll)
  const heroCards = [
    {
      kind: 'ai', kicker: 'YOUR AI ASSISTANT', meta: '17:24 · 神戸三宮店から',
      titleNode: <>こんばんは、田中さん。<br/>今夜は <span style={{ color: T.orange }}>親子丼</span> はいかがですか？</>,
      subNode: <>鶏もも肉と卵が特売中。15分で作れて、家族 4 人分で <span style={{ color: T.orange, fontWeight: 800 }}>¥1,180</span> です。</>,
      ctaLabel: 'レシピを見る', onCta: () => push('recipe-detail', { id: 'oyakodon' }),
      altLabel: '別の案', onAlt: () => push('ai-chat'),
    },
    {
      kind: 'ai', kicker: 'AI · 時短メニュー', meta: '10 分 · 4人前 ¥1,200',
      titleNode: <>北海道銀鮭の<br/><span style={{ color: T.orange }}>塩焼き定食</span></>,
      subNode: <>銀鮭 2切 <span style={{ color: T.orange, fontWeight: 800 }}>¥498</span> (−28%)。味噌汁・キャベツの千切りと一緒に。</>,
      ctaLabel: 'レシピを見る', onCta: () => push('ai-chat'),
      altLabel: '別の案', onAlt: () => push('ai-chat'),
    },
    {
      kind: 'campaign', badge: 'CAMPAIGN', icon: 'gift',
      bg: 'linear-gradient(135deg, #1e5180 0%, #2a6ba8 100%)', accent: '#a8d2f0',
      titleNode: <>北海道フェア<br/>開催中</>,
      subNode: <>銀鮭・牛乳・ベーカリー・乳製品 80 品目が <strong style={{ color: '#ffd86a' }}>最大 30% OFF</strong>。11/26 まで。</>,
      ctaLabel: 'チラシを見る', onCta: () => push('flyer'),
    },
    {
      kind: 'ai', kicker: 'AI · 子ども向け', meta: '小学生に人気',
      titleNode: <>三色丼 + メロンパン<br/><span style={{ color: T.orange }}>お子様セット</span></>,
      subNode: <>三色丼 ¥540 + メロンパン ¥158(17:00 焼上り) + 牛乳 ¥198 で <span style={{ color: T.orange, fontWeight: 800 }}>¥896</span>。</>,
      ctaLabel: 'リストに追加', onCta: () => push('shopping-list'),
      altLabel: '別の案', onAlt: () => push('ai-chat'),
    },
    {
      kind: 'campaign', badge: 'TIME SALE', icon: 'flame',
      bg: `linear-gradient(135deg, ${T.sale} 0%, #a8161c 100%)`, accent: '#ffd86a',
      titleNode: <>お惣菜タイムセール<br/>17:00 開始</>,
      subNode: <>本日 17:00 以降 お惣菜・お弁当・寿司が <strong style={{ color: '#ffd86a' }}>最大 20% OFF</strong>。</>,
      ctaLabel: 'お惣菜を見る', onCta: () => push('flyer'),
    },
    {
      kind: 'campaign', badge: 'POINT BOOST', icon: 'point',
      bg: 'linear-gradient(135deg, #6b0b14 0%, #8a1521 100%)', accent: '#fde2ec',
      titleNode: <>S ポイント<br/><span style={{ color: '#ffd86a' }}>4 倍デー</span></>,
      subNode: <>毎週 水・土・日 · クラブ・エフカード/litta お支払いで実質 4 倍ポイント。</>,
      ctaLabel: '詳細を見る', onCta: () => push('mypage'),
    },
  ];
  const [heroIdx, setHeroIdx] = React.useState(0);
  const heroRef = React.useRef(null);
  const onHeroScroll = (e) => {
    const w = e.currentTarget.clientWidth - 32 + 12; // card width + gap
    const idx = Math.round(e.currentTarget.scrollLeft / w);
    if (idx !== heroIdx) setHeroIdx(Math.max(0, Math.min(heroCards.length - 1, idx)));
  };

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: T.bg, paddingBottom: SAFE_BOT + 30 }} className="oas-noscroll">
      <BrandHeader store={store} onSearch={() => push('search')} onNotif={() => push('notif')} onStore={onStore}/>
      <div style={{ height: SAFE_TOP + 60 }}/>

      {/* AI HERO — horizontal swipeable carousel */}
      <div style={{ paddingTop: 16 }}>
        <div ref={heroRef} onScroll={onHeroScroll} style={{
          display: 'flex', overflowX: 'auto', gap: 12,
          padding: '0 16px',
          scrollSnapType: 'x mandatory',
          scrollPaddingLeft: 16,
        }} className="oas-noscroll">
          {heroCards.map((card, i) => {
            const isAi = card.kind === 'ai';
            const bg = isAi ? `linear-gradient(160deg, ${T.brand} 0%, #2a2520 100%)` : card.bg;
            const accent = isAi ? T.orange : card.accent;
            return (
              <div key={i} style={{
                flex: '0 0 calc(100% - 32px)',
                scrollSnapAlign: 'start',
                background: bg,
                borderRadius: 16, padding: 18,
                color: '#fff', position: 'relative', overflow: 'hidden',
                minHeight: 188,
                display: 'flex', flexDirection: 'column',
              }}>
                {/* Decorative glow */}
                <div style={{
                  position: 'absolute', top: -40, right: -40, width: 180, height: 180,
                  background: `radial-gradient(circle, ${accent} 0%, transparent 60%)`,
                  opacity: isAi ? .25 : .35,
                }}/>

                {/* Header */}
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  {isAi ? (
                    <div style={{
                      width: 32, height: 32, borderRadius: 999, background: T.orange,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(46,133,64,.45)',
                    }}>
                      <Icon name="sparkleF" size={16} color="#fff"/>
                    </div>
                  ) : (
                    <div style={{
                      width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,.18)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon name={card.icon} size={16} color="#fff"/>
                    </div>
                  )}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: SANS, fontSize: 9.5, fontWeight: 700, color: accent, letterSpacing: '.2em' }}>
                      {isAi ? card.kicker : card.badge}
                    </div>
                    {isAi && card.meta && (
                      <div style={{ fontFamily: SANS, fontSize: 11, color: 'rgba(255,255,255,.6)', marginTop: 1 }}>{card.meta}</div>
                    )}
                  </div>
                </div>

                {/* Title */}
                <div style={{
                  position: 'relative',
                  fontFamily: SANS, fontWeight: 800, fontSize: 18, lineHeight: 1.4, letterSpacing: '.02em',
                }}>
                  {card.titleNode}
                </div>

                {/* Sub */}
                <div style={{
                  position: 'relative', flex: 1,
                  marginTop: 8, fontFamily: SANS, fontSize: 12, color: 'rgba(255,255,255,.78)', lineHeight: 1.6,
                }}>
                  {card.subNode}
                </div>

                {/* Actions */}
                <div style={{ position: 'relative', marginTop: 14, display: 'flex', gap: 8 }}>
                  <button onClick={card.onCta} style={{
                    flex: 1, background: isAi ? T.orange : 'rgba(255,255,255,.95)',
                    color: isAi ? '#fff' : '#1a1a1a', border: 0, cursor: 'pointer',
                    padding: '12px 0', borderRadius: 8,
                    fontFamily: SANS, fontWeight: 800, fontSize: 12.5, letterSpacing: '.05em',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                  }}>{card.ctaLabel} <Icon name="chevR" size={14} color={isAi ? '#fff' : '#1a1a1a'}/></button>
                  {card.altLabel && (
                    <button onClick={card.onAlt} style={{
                      background: 'rgba(255,255,255,.14)', color: '#fff', border: 0, cursor: 'pointer',
                      padding: '12px 14px', borderRadius: 8,
                      fontFamily: SANS, fontWeight: 700, fontSize: 12,
                    }}>{card.altLabel}</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Page dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginTop: 10 }}>
          {heroCards.map((_, i) => (
            <div key={i} style={{
              width: i === heroIdx ? 18 : 6, height: 6, borderRadius: 99,
              background: i === heroIdx ? T.brand : T.outline,
              transition: 'width .25s, background .25s',
            }}/>
          ))}
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
