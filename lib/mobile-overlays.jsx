// Shared overlays: AI assistant + Recipe detail
// Used by all mobile variants.

// ── Sheet base ───────────────────────────────────────────────────
function Sheet({ onClose, children, dark, topInset = 0 }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,.4)',
    }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, top: topInset,
        background: dark ? T.brand : T.bg,
        borderTopLeftRadius: 20, borderTopRightRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 -8px 40px rgba(0,0,0,.25)',
      }}>{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// AI ASSISTANT — chat interface
// ─────────────────────────────────────────────────────────────
function AiOverlay({ onClose, onOpenRecipe }) {
  const [input, setInput] = React.useState('');
  const suggestions = [
    '今夜の献立は？',
    '鶏もも肉を使うレシピ',
    '今日の特売を教えて',
    '冷蔵庫の余り物で',
    '子どもが喜ぶおかず',
  ];
  return (
    <Sheet onClose={onClose} topInset={30}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: T.bg }}>
        {/* header */}
        <div style={{
          padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10,
          borderBottom: `1px solid ${T.outlineSoft}`,
          background: '#fff',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 999, background: T.orange,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="sparkleF" size={18} color="#fff"/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 14, color: T.ink }}>OASIS アシスタント</div>
            <div style={{ fontFamily: SANS, fontSize: 10.5, color: T.fresh, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 5, height: 5, borderRadius: 999, background: T.fresh }}/>
              神戸三宮店の在庫を参照中
            </div>
          </div>
          <button onClick={onClose} style={iconBtn}><Icon name="close" size={20} color={T.ink}/></button>
        </div>

        {/* messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 8px' }} className="oas-noscroll">
          {/* AI greeting */}
          <ChatBubble who="ai">
            <span style={{ fontWeight: 700 }}>こんにちは、田中さん！</span><br/>
            今日の三宮店では <strong style={{ color: T.sale }}>鶏もも肉 (¥398)</strong> と <strong style={{ color: T.sale }}>兵庫の朝採卵 (¥178)</strong> がお買い得です。
            ふんわり親子丼はいかがでしょうか？
          </ChatBubble>

          {/* Recipe card embed */}
          <div style={{ marginLeft: 44, marginBottom: 14 }}>
            <button onClick={onOpenRecipe} style={{
              width: '100%', background: '#fff', border: `1px solid ${T.outline}`,
              borderRadius: 12, padding: 0, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
              display: 'flex', overflow: 'hidden',
            }}>
              <div style={{
                width: 90, height: 90, background: '#fdf2db',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto',
              }}>
                <FoodMark kind="oyakodon" size={76}/>
              </div>
              <div style={{ padding: '10px 12px', flex: 1, minWidth: 0 }}>
                <Pill tone="orangeSoft" size="xs">レシピ</Pill>
                <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 13.5, color: T.ink, marginTop: 4 }}>ふんわり親子丼</div>
                <div style={{ fontFamily: SANS, fontSize: 10, color: T.inkMid, marginTop: 3, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}><Icon name="clock" size={11}/>15分</span>
                  <span>·</span>
                  <Yen value={1180} size={11} suffix="材料費"/>
                </div>
              </div>
            </button>
          </div>

          {/* User msg */}
          <ChatBubble who="me">
            鮭はどこにあるかしら？
          </ChatBubble>

          {/* AI reply */}
          <ChatBubble who="ai">
            <strong>鮮魚コーナー F-2</strong> です。入口から右奥、約 22m。<br/>
            本日は <strong style={{ color: T.sale }}>北海道産 銀鮭 2切 ¥498 (−28%)</strong> がお買い得です。
          </ChatBubble>

          {/* Aisle card embed */}
          <div style={{ marginLeft: 44, marginBottom: 14 }}>
            <div style={{
              background: '#fff', border: `1px solid ${T.outline}`, borderRadius: 12,
              padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <Icon name="pin" size={20} color={T.orange}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 12.5, color: T.ink }}>鮮魚 · 棚 F-2</div>
                <div style={{ fontFamily: SANS, fontSize: 10.5, color: T.inkSoft, marginTop: 2 }}>銀鮭 2切 · 入口から 22m</div>
              </div>
              <button style={{
                background: T.brand, color: '#fff', border: 0, cursor: 'pointer',
                padding: '8px 12px', borderRadius: 6,
                fontFamily: SANS, fontWeight: 700, fontSize: 11,
              }}>地図</button>
            </div>
          </div>

          {/* User msg */}
          <ChatBubble who="me">
            予算 2,000 円で晩ごはん作りたい
          </ChatBubble>

          {/* AI reply */}
          <ChatBubble who="ai">
            <strong>親子丼 + お味噌汁 + サラダ</strong> はいかがでしょう。<br/>
            材料すべて揃って <strong style={{ color: T.sale }}>¥1,820</strong>。クーポン適用で <strong style={{ color: T.sale }}>¥1,750</strong> です。
          </ChatBubble>

          <div style={{ marginLeft: 44, marginBottom: 14, display: 'flex', gap: 8 }}>
            <button style={{
              padding: '8px 14px', borderRadius: 99, border: `1px solid ${T.orange}`,
              background: T.orange, color: '#fff', cursor: 'pointer',
              fontFamily: SANS, fontWeight: 700, fontSize: 11.5,
            }}>買い物リストに追加</button>
            <button style={{
              padding: '8px 14px', borderRadius: 99, border: `1px solid ${T.outline}`,
              background: '#fff', color: T.ink, cursor: 'pointer',
              fontFamily: SANS, fontWeight: 600, fontSize: 11.5,
            }}>別の提案</button>
          </div>
        </div>

        {/* Suggestion chips */}
        <div style={{ padding: '8px 16px 8px', display: 'flex', gap: 6, overflowX: 'auto', borderTop: `1px solid ${T.outlineSoft}` }} className="oas-noscroll">
          {suggestions.map((s) => (
            <button key={s} style={{
              flex: '0 0 auto', padding: '6px 12px', borderRadius: 99,
              background: T.paperAlt, border: `1px solid ${T.outline}`,
              color: T.ink, cursor: 'pointer',
              fontFamily: SANS, fontWeight: 600, fontSize: 11,
            }}>{s}</button>
          ))}
        </div>

        {/* Input */}
        <div style={{ padding: '10px 16px 26px', borderTop: `1px solid ${T.outlineSoft}`, background: '#fff' }}>
          <div style={{
            background: T.paperAlt, borderRadius: 99, padding: '8px 8px 8px 16px',
            display: 'flex', alignItems: 'center', gap: 8,
            border: `1px solid ${T.outline}`,
          }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="メッセージを入力…" style={{
              flex: 1, border: 0, background: 'transparent', outline: 'none',
              fontFamily: SANS, fontSize: 13, color: T.ink,
            }}/>
            <button style={{ ...iconBtn, width: 32, height: 32 }}><Icon name="mic" size={18} color={T.inkMid}/></button>
            <button style={{
              width: 32, height: 32, borderRadius: 999, background: T.orange, color: '#fff',
              border: 0, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="arrR" size={16} color="#fff" sw={2.2}/>
            </button>
          </div>
        </div>
      </div>
    </Sheet>
  );
}

function ChatBubble({ who, children }) {
  if (who === 'ai') {
    return (
      <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 999, background: T.orange,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto',
        }}>
          <Icon name="sparkleF" size={16} color="#fff"/>
        </div>
        <div style={{
          background: '#fff', border: `1px solid ${T.outline}`, borderRadius: 14,
          padding: '12px 14px', maxWidth: '78%',
          fontFamily: SANS, fontSize: 13, color: T.ink, lineHeight: 1.6,
          borderTopLeftRadius: 4,
        }}>{children}</div>
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', gap: 10, marginBottom: 12, justifyContent: 'flex-end' }}>
      <div style={{
        background: T.orange, color: '#fff', borderRadius: 14,
        padding: '10px 14px', maxWidth: '78%',
        fontFamily: SANS, fontSize: 13, lineHeight: 1.5, fontWeight: 500,
        borderTopRightRadius: 4,
      }}>{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// RECIPE DETAIL
// ─────────────────────────────────────────────────────────────
function RecipeOverlay({ onClose }) {
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
    <Sheet onClose={onClose} topInset={0}>
      <div style={{ height: '100%', overflowY: 'auto', background: T.bg, position: 'relative' }} className="oas-noscroll">
        {/* Hero */}
        <div style={{
          height: 280, background: `linear-gradient(180deg, #fdf2db 0%, #fff 100%)`,
          paddingTop: SAFE_TOP, position: 'relative',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          <button onClick={onClose} style={{
            position: 'absolute', top: SAFE_TOP + 8, left: 12, zIndex: 10,
            width: 36, height: 36, borderRadius: 999, background: 'rgba(255,255,255,.95)',
            border: 0, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(0,0,0,.1)',
          }}><Icon name="close" size={18} color={T.ink}/></button>
          <button style={{
            position: 'absolute', top: SAFE_TOP + 8, right: 12, zIndex: 10,
            width: 36, height: 36, borderRadius: 999, background: 'rgba(255,255,255,.95)',
            border: 0, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(0,0,0,.1)',
          }}><Icon name="heart" size={18} color={T.inkMid}/></button>
          <FoodMark kind="oyakodon" size={180}/>
        </div>

        <div style={{ padding: '18px 16px 140px', background: T.bg }}>
          {/* Title */}
          <Pill tone="orangeSoft" size="xs">AIおすすめ · 本日の特売を使用</Pill>
          <h1 style={{
            fontFamily: SANS, fontWeight: 900, fontSize: 24, lineHeight: 1.2,
            margin: '8px 0 4px', color: T.ink, letterSpacing: '.02em',
          }}>ふんわり親子丼</h1>
          <p style={{
            margin: 0, fontFamily: SANS, fontSize: 12, color: T.inkMid, lineHeight: 1.6,
          }}>特売の鶏もも肉と、兵庫の朝採り卵を使った定番。半熟の卵と三つ葉が決め手。</p>

          {/* Meta row */}
          <div style={{
            marginTop: 16, padding: '12px 0', borderTop: `1px solid ${T.outlineSoft}`, borderBottom: `1px solid ${T.outlineSoft}`,
            display: 'flex', alignItems: 'center',
          }}>
            {[
              { big: '15', sub: '分', label: '調理時間', i: 'clock' },
              { big: '4',  sub: '人前', label: '人数',    i: 'user' },
              { big: '628', sub: 'kcal', label: '1人当り', i: 'flame' },
            ].map((m, i, a) => (
              <div key={i} style={{
                flex: 1, textAlign: 'center',
                borderRight: i < a.length - 1 ? `1px solid ${T.outlineSoft}` : 'none',
              }}>
                <Icon name={m.i} size={14} color={T.brown} sw={1.6}/>
                <div style={{ fontFamily: NUM, fontWeight: 800, fontSize: 22, color: T.ink, lineHeight: 1, marginTop: 4 }}>
                  {m.big}<span style={{ fontSize: 11, fontFamily: SANS, color: T.inkSoft, marginLeft: 2, fontWeight: 600 }}>{m.sub}</span>
                </div>
                <div style={{ fontFamily: SANS, fontSize: 9, color: T.inkSoft, marginTop: 3, fontWeight: 600, letterSpacing: '.1em' }}>{m.label}</div>
              </div>
            ))}
          </div>

          {/* Ingredients */}
          <SectionHead title="材料" en="Ingredients" style={{ padding: 0, marginTop: 20 }}/>
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
              <span style={{ fontFamily: SANS, fontSize: 10.5, color: T.inkMid, fontWeight: 700, letterSpacing: '.05em', flex: 1 }}>合計 (クーポン適用後)</span>
              <Yen value={total - 220} size={20} tone="sale"/>
              <Yen value={total} size={10} strike/>
            </div>
          </div>

          {/* Steps */}
          <SectionHead title="作り方" en="Method" style={{ padding: 0, marginTop: 22 }}/>
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
            marginTop: 8, background: T.brand, color: '#fff',
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
              <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 11.5, letterSpacing: '.1em', marginBottom: 4, color: T.orange }}>AIのワンポイント</div>
              <div style={{ fontFamily: SANS, fontSize: 12.5, lineHeight: 1.7 }}>
                三つ葉が苦手な方は刻みネギで。とろみを強くしたければ卵を一つ増やしてください。
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0,
          padding: '12px 16px 22px', background: '#fff',
          borderTop: `1px solid ${T.outlineSoft}`,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{ flex: '0 0 auto' }}>
            <div style={{ fontFamily: SANS, fontSize: 9.5, color: T.inkSoft, fontWeight: 700, letterSpacing: '.1em' }}>4人前 計</div>
            <Yen value={1180} size={20} tone="sale"/>
          </div>
          <button style={{
            flex: 1, background: T.orange, color: '#fff', border: 0, cursor: 'pointer',
            padding: '14px 0', borderRadius: 8,
            fontFamily: SANS, fontWeight: 800, fontSize: 14, letterSpacing: '.08em',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            boxShadow: '0 4px 12px rgba(46,133,64,.3)',
          }}>
            <Icon name="cart" size={18} color="#fff"/>
            買い物リストに追加
          </button>
        </div>
      </div>
    </Sheet>
  );
}

Object.assign(window, { Sheet, AiOverlay, RecipeOverlay, ChatBubble });
