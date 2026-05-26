// ─────────────────────────────────────────────────────────────
// MOBILE · VARIANT C — More sub-screens
// ai-chat (full) / search / notif / barcode
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// AI CHAT — full screen
// ─────────────────────────────────────────────────────────────
function C_AiChat({ pop, push }) {
  const [input, setInput] = React.useState('');
  const [chatResetKey, setChatResetKey] = React.useState(0);
  const [altCount, setAltCount] = React.useState(0);
  const suggestions = ['今夜の献立は？', '鶏もも肉を使うレシピ', '冷蔵庫の余り物で', '子どもが喜ぶおかず'];
  return (
    <div style={{ height: '100%', background: T.bg, display: 'flex', flexDirection: 'column' }}>
      {/* Custom dark header */}
      <div style={{
        background: T.brand, color: '#fff', paddingTop: SAFE_TOP,
      }}>
        <div style={{
          height: 56, padding: '0 16px', display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <button onClick={pop} style={{
            width: 32, height: 32, border: 0, background: 'transparent', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: -8,
          }}><Icon name="chevL" size={22} color="#fff"/></button>
          <div style={{
            width: 36, height: 36, borderRadius: 999, background: T.orange,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto',
            boxShadow: '0 4px 10px rgba(46,133,64,.35)',
          }}>
            <Icon name="sparkleF" size={18} color="#fff"/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 14 }}>OASIS アシスタント</div>
            <div style={{ fontFamily: SANS, fontSize: 10.5, color: T.orange, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 5, height: 5, borderRadius: 999, background: T.orange }}/>
              神戸三宮店の在庫を参照中
            </div>
          </div>
          <button onClick={() => setChatResetKey(k => k + 1)} style={{
            width: 36, height: 36, border: 0, background: 'rgba(255,255,255,.12)', cursor: 'pointer',
            borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><Icon name="refresh" size={16} color="#fff"/></button>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 16px 8px' }} className="oas-noscroll">
        <ChatBubble who="ai">
          <span style={{ fontWeight: 700 }}>こんにちは、田中さん！</span><br/>
          今日の三宮店では <strong style={{ color: T.sale }}>鶏もも肉 (¥398)</strong> と <strong style={{ color: T.sale }}>兵庫の朝採卵 (¥178)</strong> がお買い得です。
          ふんわり親子丼はいかがでしょうか？
        </ChatBubble>

        <div style={{ marginLeft: 44, marginBottom: 14 }}>
          <button onClick={() => push('recipe-detail', { id: 'oyakodon' })} style={{
            width: '100%', background: '#fff', border: `1px solid ${T.outline}`,
            borderRadius: 12, padding: 0, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
            display: 'flex', overflow: 'hidden',
          }}>
            <div style={{ width: 90, height: 90, background: '#fdf2db', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
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

        <ChatBubble who="me">鮭はどこにあるかしら？</ChatBubble>

        <ChatBubble who="ai">
          <strong>鮮魚コーナー F-2</strong> です。入口から右奥、約 22m。<br/>
          本日は <strong style={{ color: T.sale }}>北海道産 銀鮭 2切 ¥498 (−28%)</strong> がお買い得です。
        </ChatBubble>

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
            <button onClick={() => push('aisle-map')} style={{
              background: T.brand, color: '#fff', border: 0, cursor: 'pointer',
              padding: '8px 12px', borderRadius: 6,
              fontFamily: SANS, fontWeight: 700, fontSize: 11,
            }}>地図</button>
          </div>
        </div>

        <ChatBubble who="me">予算 2,000 円で晩ごはん作りたい</ChatBubble>

        <ChatBubble who="ai">
          <strong>親子丼 + お味噌汁 + サラダ</strong> はいかがでしょう。<br/>
          材料すべて揃って <strong style={{ color: T.sale }}>¥1,820</strong>。クーポン適用で <strong style={{ color: T.sale }}>¥1,750</strong> です。
        </ChatBubble>

        <div style={{ marginLeft: 44, marginBottom: 14, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <button onClick={() => push('shopping-list')} style={{
            padding: '8px 14px', borderRadius: 99, border: `1px solid ${T.orange}`,
            background: T.orange, color: '#fff', cursor: 'pointer',
            fontFamily: SANS, fontWeight: 700, fontSize: 11.5,
          }}>買い物リストに追加</button>
          <button onClick={() => setAltCount(n => n + 1)} style={{
            padding: '8px 14px', borderRadius: 99, border: `1px solid ${T.outline}`,
            background: '#fff', color: T.ink, cursor: 'pointer',
            fontFamily: SANS, fontWeight: 600, fontSize: 11.5,
          }}>別の提案 {altCount > 0 ? '· ' + altCount : ''}</button>
        </div>
      </div>

      {/* Suggestion chips */}
      <div style={{ padding: '8px 16px', display: 'flex', gap: 6, overflowX: 'auto', borderTop: `1px solid ${T.outlineSoft}`, background: '#fff' }} className="oas-noscroll">
        {suggestions.map((s) => (
          <button key={s} onClick={() => setInput(s)} style={{
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
          <button onClick={() => setInput('鶏もも肉を使う節約レシピを教えて')} style={{
            width: 32, height: 32, borderRadius: 999, background: 'transparent', border: 0, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><Icon name="mic" size={18} color={T.inkMid}/></button>
          <button onClick={() => setInput('')} style={{
            width: 32, height: 32, borderRadius: 999, background: input ? T.orange : T.outline, color: '#fff',
            border: 0, cursor: input ? 'pointer' : 'default',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background .15s',
          }}>
            <Icon name="arrR" size={16} color="#fff" sw={2.2}/>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SEARCH
// ─────────────────────────────────────────────────────────────
function C_Search({ pop, push }) {
  const [q, setQ] = React.useState('');
  const [recent, setRecent] = React.useState(['鶏もも肉', '銀鮭', '親子丼', '北海道牛乳']);
  const trending = [
    { l: '本日の特売', n: 14 },
    { l: '時短レシピ', n: 32 },
    { l: 'クーポン対象', n: 8 },
    { l: '北海道フェア', n: 22 },
    { l: 'お弁当',     n: 18 },
  ];

  return (
    <div style={{ height: '100%', background: T.bg, display: 'flex', flexDirection: 'column' }}>
      {/* Search header */}
      <div style={{
        background: T.brand, color: '#fff', paddingTop: SAFE_TOP, paddingBottom: 12,
      }}>
        <div style={{ padding: '0 12px', display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
          <button onClick={pop} style={{
            width: 32, height: 32, border: 0, background: 'transparent', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
          }}><Icon name="chevL" size={22} color="#fff"/></button>
          <div style={{
            flex: 1, background: 'rgba(255,255,255,.14)', borderRadius: 10,
            padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <Icon name="search" size={16} color="rgba(255,255,255,.7)"/>
            <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="商品 · レシピ · 売場 を検索"
              style={{
                flex: 1, border: 0, background: 'transparent', outline: 'none',
                fontFamily: SANS, fontSize: 13, color: '#fff',
              }}/>
            <button onClick={() => setQ('今夜何作ろう')} style={{
              border: 0, background: 'transparent', cursor: 'pointer', padding: 0,
            }}><Icon name="mic" size={18} color={T.orange}/></button>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 24 }} className="oas-noscroll">
        {/* AI suggestion banner */}
        <div style={{ padding: '12px 16px 0' }}>
          <div style={{
            background: T.brand, color: '#fff', borderRadius: 12, padding: '12px 14px',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <Icon name="sparkleF" size={16} color={T.orange}/>
            <div style={{ flex: 1, fontFamily: SANS, fontSize: 11.5, lineHeight: 1.5 }}>
              「<strong style={{ color: T.orange }}>今夜何作ろう</strong>」のような<strong>質問形式</strong>で AI に聞くこともできます
            </div>
          </div>
        </div>

        {/* Recent */}
        <div style={{ padding: '14px 16px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 800, color: T.inkSoft, letterSpacing: '.15em' }}>最近の検索</span>
            <div style={{ flex: 1 }}/>
            <button onClick={() => setRecent([])} style={{
              border: 0, background: 'transparent', cursor: 'pointer', padding: 0,
              fontFamily: SANS, fontSize: 11, color: T.brown, fontWeight: 600,
            }}>クリア</button>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {recent.map((r) => (
              <button key={r} onClick={() => setQ(r)} style={{
                padding: '8px 14px', borderRadius: 99,
                background: '#fff', border: `1px solid ${T.outline}`,
                cursor: 'pointer',
                fontFamily: SANS, fontWeight: 600, fontSize: 12, color: T.ink,
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}>
                <Icon name="clock" size={12} color={T.inkSoft}/>
                {r}
              </button>
            ))}
            {recent.length === 0 && <span style={{ fontFamily: SANS, fontSize: 11, color: T.inkSoft, padding: '8px 4px' }}>履歴はありません</span>}
          </div>
        </div>

        {/* Trending */}
        <div style={{ padding: '20px 16px 0' }}>
          <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 800, color: T.inkSoft, letterSpacing: '.15em' }}>急上昇</span>
          <div style={{ background: '#fff', border: `1px solid ${T.outline}`, borderRadius: 12, marginTop: 8, overflow: 'hidden' }}>
            {trending.map((t, i) => (
              <button key={t.l} onClick={() => setQ(t.l)} style={{
                width: '100%', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12,
                borderTop: i ? `1px solid ${T.outlineSoft}` : 'none',
                cursor: 'pointer', border: 'none', background: '#fff', textAlign: 'left', fontFamily: 'inherit',
              }}>
                <span className="oas-num" style={{
                  fontFamily: NUM, fontWeight: 900, fontSize: 16, color: i < 3 ? T.orange : T.inkSoft,
                  width: 22, textAlign: 'center',
                }}>{i + 1}</span>
                <span style={{ flex: 1, fontFamily: SANS, fontSize: 13.5, color: T.ink, fontWeight: 600 }}>{t.l}</span>
                <span style={{ fontFamily: NUM, fontSize: 10.5, color: T.inkSoft, fontWeight: 600 }}>{t.n} 件</span>
                <Icon name="chevR" size={14} color={T.inkMute}/>
              </button>
            ))}
          </div>
        </div>

        {/* Categories shortcut */}
        <div style={{ padding: '20px 16px 0' }}>
          <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 800, color: T.inkSoft, letterSpacing: '.15em' }}>カテゴリーで探す</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 8 }}>
            {[
              { l: '青果',  k: 'cabbage' },
              { l: '精肉',  k: 'chicken' },
              { l: '鮮魚',  k: 'salmon' },
              { l: '日配',  k: 'milk' },
              { l: '惣菜',  k: 'bento' },
              { l: 'パン',  k: 'bread' },
              { l: '酒類',  k: 'juice' },
              { l: '冷凍',  k: 'natto' },
            ].map((c) => (
              <button key={c.l} onClick={() => push('product', { name: c.l + ' 一覧', kind: c.k })} style={{
                background: '#fff', border: `1px solid ${T.outline}`, borderRadius: 10,
                padding: '10px 4px 8px', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              }}>
                <FoodMark kind={c.k} size={42}/>
                <span style={{ fontFamily: SANS, fontSize: 10.5, fontWeight: 700, color: T.ink }}>{c.l}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// NOTIF / お知らせ
// ─────────────────────────────────────────────────────────────
function C_Notif({ pop, push }) {
  const [allRead, setAllRead] = React.useState(false);
  const groups = [
    { d: '今日', list: [
      { t: 17, m: 'タイムセール開始 · お惣菜が最大 20% OFF', tag: '特売', tagTone: 'sale', i: 'flame', ai: true, go: 'flyer' },
      { t: 9,  m: '田中さんへ · 鶏もも肉が本日のおすすめです', tag: 'AI',  tagTone: 'orange',  i: 'sparkleF', ai: true, go: 'ai-chat' },
    ]},
    { d: '昨日', list: [
      { t: '15:30', m: 'クーポン「兵庫朝採卵 ¥50OFF」を獲得しました', tag: 'クーポン', tagTone: 'pointSoft', i: 'coupon', go: 'coupon' },
      { t: '11:00', m: '北海道フェア 開催のお知らせ',                  tag: 'イベント', tagTone: 'orangeSoft', i: 'gift', go: 'flyer' },
    ]},
    { d: '11/24', list: [
      { t: '18:00', m: '年末年始の営業時間について',                   tag: '重要', tagTone: 'sale', i: 'info', go: 'contact' },
    ]},
  ];
  return (
    <div style={{ height: '100%', overflowY: 'auto', background: T.bg }} className="oas-noscroll">
      <C_TopBar leftBack onBack={pop} title="お知らせ" sub="未読 2 件"
        right={<button onClick={() => setAllRead(true)} style={{ ...iconBtn, color: '#fff', fontFamily: SANS, fontSize: 11, fontWeight: 700, width: 'auto', padding: '0 12px', opacity: allRead ? 0.5 : 1 }}>{allRead ? '既読' : 'すべて既読'}</button>}/>
      <div style={{ height: SAFE_TOP + 48 }}/>

      <div style={{ padding: '12px 16px 24px' }}>
        {groups.map((g) => (
          <div key={g.d} style={{ marginTop: 8 }}>
            <div style={{ fontFamily: SANS, fontSize: 10, fontWeight: 800, color: T.inkSoft, letterSpacing: '.2em', margin: '8px 4px' }}>{g.d}</div>
            <div style={{ background: '#fff', border: `1px solid ${T.outline}`, borderRadius: 12, overflow: 'hidden' }}>
              {g.list.map((n, i) => (
                <button key={i} onClick={() => n.go && push && push(n.go)} style={{
                  width: '100%', padding: '12px 14px', display: 'flex', gap: 10,
                  borderTop: i ? `1px solid ${T.outlineSoft}` : 'none',
                  border: 'none', background: '#fff', cursor: 'pointer',
                  textAlign: 'left', fontFamily: 'inherit',
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 999,
                    background: n.ai ? T.orange : T.paperAlt,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto',
                  }}>
                    <Icon name={n.i} size={15} color={n.ai ? '#fff' : T.brown}/>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                      <Pill tone={n.tagTone} size="xs">{n.tag}</Pill>
                      <span style={{ fontFamily: NUM, fontSize: 10, color: T.inkSoft, fontWeight: 600 }}>
                        {typeof n.t === 'number' ? `${n.t}:00` : n.t}
                      </span>
                    </div>
                    <div style={{ fontFamily: SANS, fontSize: 12.5, color: T.ink, fontWeight: 600, lineHeight: 1.5 }}>{n.m}</div>
                  </div>
                  {i === 0 && g.d === '今日' && <div style={{
                    width: 8, height: 8, borderRadius: 999, background: T.orange, alignSelf: 'flex-start', marginTop: 4,
                  }}/>}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// BARCODE / Point card
// ─────────────────────────────────────────────────────────────
function C_Barcode({ pop, push }) {
  const [barcodeMode, setBarcodeMode] = React.useState('card');
  return (
    <div style={{ height: '100%', background: T.brand, color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <div style={{ paddingTop: SAFE_TOP, padding: `${SAFE_TOP}px 0 0`, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ padding: '12px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={pop} style={{
            width: 32, height: 32, border: 0, background: 'transparent', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
          }}><Icon name="chevL" size={22} color="#fff"/></button>
          <div style={{ flex: 1, fontFamily: SANS, fontWeight: 800, fontSize: 15 }}>会員バーコード</div>
          <button onClick={() => setBarcodeMode(m => m === 'card' ? 'card' : 'card')} style={{
            width: 32, height: 32, border: 0, background: 'rgba(255,255,255,.12)', cursor: 'pointer',
            borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><Icon name="refresh" size={16} color="#fff"/></button>
        </div>

        {/* Glow */}
        <div style={{
          position: 'absolute', top: 100, left: '50%', transform: 'translateX(-50%)',
          width: 380, height: 380, borderRadius: '50%',
          background: `radial-gradient(circle, ${T.orange} 0%, transparent 60%)`,
          opacity: .2, pointerEvents: 'none',
        }}/>

        <div style={{ flex: 1, padding: '20px 24px 0', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          {/* Profile */}
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Pill tone="orange" size="sm">ゴールド会員 · 阪急 S point</Pill>
            <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 20, marginTop: 10 }}>田中 はるか</div>
            <div style={{ fontFamily: NUM, fontSize: 12, color: 'rgba(255,255,255,.5)', marginTop: 4, letterSpacing: '.1em' }}>
              4901 · 2345 · 6789
            </div>
          </div>

          {/* Big point */}
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ fontFamily: SANS, fontSize: 10, color: 'rgba(255,255,255,.6)', fontWeight: 700, letterSpacing: '.25em' }}>CURRENT POINTS</div>
            <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: 4, marginTop: 6 }}>
              <span className="oas-num" style={{ fontFamily: NUM, fontWeight: 900, fontSize: 56, color: T.orange, letterSpacing: '-.03em', lineHeight: 1 }}>1,248</span>
              <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: 14, color: 'rgba(255,255,255,.7)' }}>pt</span>
            </div>
            <div style={{ fontFamily: SANS, fontSize: 10.5, color: T.fresh, marginTop: 6, fontWeight: 700 }}>+12pt 本日のお買物</div>
          </div>

          {/* Code area — switches by mode */}
          <div style={{
            background: '#fff', borderRadius: 12, padding: '20px 16px 14px',
            margin: '0 auto', width: '100%', maxWidth: 320,
          }}>
            {barcodeMode === 'card' && (
              <>
                <div style={{ display: 'flex', gap: 1, height: 80, alignItems: 'flex-end', justifyContent: 'center' }}>
                  {Array.from({ length: 60 }, (_, i) => {
                    const widths = [2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 4, 2, 1, 2, 1, 3, 1, 2, 1];
                    const w = widths[i % widths.length];
                    return <div key={i} style={{ width: w, height: 80, background: T.ink }}/>;
                  })}
                </div>
                <div style={{
                  marginTop: 8, fontFamily: 'monospace', fontSize: 11, letterSpacing: '.3em',
                  textAlign: 'center', color: T.ink, fontWeight: 700,
                }}>4 9 0 1 2 3 4 5 6 7 8 9 0</div>
              </>
            )}

            {barcodeMode === 'qr' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <svg viewBox="0 0 21 21" width="180" height="180" style={{ shapeRendering: 'crispEdges' }}>
                  {(() => {
                    // Pseudo QR — finder squares + random data modules
                    const cells = [];
                    // 3 finder patterns (corners)
                    const finder = (ox, oy) => (
                      <g key={`f${ox}${oy}`}>
                        <rect x={ox} y={oy} width="7" height="7" fill={T.ink}/>
                        <rect x={ox+1} y={oy+1} width="5" height="5" fill="#fff"/>
                        <rect x={ox+2} y={oy+2} width="3" height="3" fill={T.ink}/>
                      </g>
                    );
                    cells.push(finder(0, 0));
                    cells.push(finder(14, 0));
                    cells.push(finder(0, 14));
                    // Pseudo-random data modules
                    const pattern = '110100110101101001011010110011010110100110100101011010101101100100110101011010110110010010110101';
                    let p = 0;
                    for (let y = 0; y < 21; y++) {
                      for (let x = 0; x < 21; x++) {
                        // skip finder areas
                        if ((x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12)) continue;
                        if (pattern[p % pattern.length] === '1') {
                          cells.push(<rect key={`d${x}${y}`} x={x} y={y} width="1" height="1" fill={T.ink}/>);
                        }
                        p++;
                      }
                    }
                    return cells;
                  })()}
                </svg>
                <div style={{
                  marginTop: 4, fontFamily: 'monospace', fontSize: 10, letterSpacing: '.2em',
                  textAlign: 'center', color: T.ink, fontWeight: 700,
                }}>HKQ-4901-2345-6789</div>
              </div>
            )}

            {barcodeMode === 'coupon' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '4px 0' }}>
                {[
                  { brand: '日配', title: '兵庫 朝採卵', amt: '¥50', tail: '21:00 まで', tone: 'sale' },
                  { brand: 'デリ', title: 'お惣菜 全品', amt: '20%', tail: '17:00〜',    tone: 'fresh' },
                  { brand: '日配', title: '北海道 牛乳', amt: '¥80', tail: '11/30 まで', tone: 'orange' },
                ].map((c, i) => (
                  <button key={i} onClick={() => push('coupon')} style={{
                    background: T.paperAlt, borderRadius: 8, padding: '10px 12px',
                    display: 'flex', alignItems: 'center', gap: 10,
                    border: 0, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                    width: '100%',
                  }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: SANS, fontSize: 9.5, color: T.inkSoft, fontWeight: 600 }}>{c.brand}</div>
                      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 12, color: T.ink, marginTop: 1 }}>{c.title}</div>
                      <div style={{ fontFamily: SANS, fontSize: 9.5, color: T.inkSoft, marginTop: 2 }}>{c.tail}</div>
                    </div>
                    <div style={{
                      fontFamily: NUM, fontWeight: 900, fontSize: 18, color: T.orange,
                      flex: '0 0 auto',
                    }}>{c.amt}<span style={{ fontSize: 11, marginLeft: 1 }}>OFF</span></div>
                    <Icon name="chevR" size={14} color={T.inkMute}/>
                  </button>
                ))}
                <button onClick={() => push('coupon')} style={{
                  marginTop: 4, fontFamily: 'monospace', fontSize: 10, letterSpacing: '.2em',
                  textAlign: 'center', color: T.inkSoft, fontWeight: 700,
                  background: 'transparent', border: 0, cursor: 'pointer', padding: 8,
                }}>3 枚 一括適用 — すべて見る →</button>
              </div>
            )}
          </div>

          {/* Bottom info */}
          <div style={{ marginTop: 16, fontFamily: SANS, fontSize: 11, color: 'rgba(255,255,255,.6)', textAlign: 'center', lineHeight: 1.6 }}>
            {barcodeMode === 'qr' && 'レジの QR スキャナーにかざしてください'}
            {barcodeMode === 'card' && (<>レジでこの画面を提示してください<br/>画面の明るさが自動で最大になります</>)}
            {barcodeMode === 'coupon' && 'お会計時に一括で割引が適用されます'}
          </div>

          {/* Tabs at bottom of barcode screen */}
          <div style={{ marginTop: 'auto', marginBottom: 24, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {[
              { k: 'qr', i: 'qr', l: 'QRコード' },
              { k: 'card', i: 'barcode', l: '会員カード' },
              { k: 'coupon', i: 'coupon', l: 'クーポン' },
            ].map(t => {
              const on = barcodeMode === t.k;
              return (
                <button key={t.k} onClick={() => setBarcodeMode(t.k)} style={{
                  background: on ? T.orange : 'rgba(255,255,255,.1)', border: 0, color: '#fff', cursor: 'pointer',
                  padding: '12px 4px', borderRadius: 8,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                }}>
                  <Icon name={t.i} size={20} color="#fff"/>
                  <span style={{ fontFamily: SANS, fontSize: 10, fontWeight: on ? 800 : 700 }}>{t.l}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// KITCHEN YELL — delivery service
// ─────────────────────────────────────────────────────────────
function C_KitchenYell({ pop, push }) {
  return (
    <div style={{ height: '100%', overflowY: 'auto', background: T.bg }} className="oas-noscroll">
      <C_TopBar leftBack onBack={pop} title="阪急キッチンエール" sub="食品宅配サービス"/>
      <div style={{ height: SAFE_TOP + 48 }}/>

      {/* Hero */}
      <div style={{
        margin: '14px 16px 0', background: `linear-gradient(140deg, ${T.point} 0%, #b03a72 100%)`,
        color: '#fff', borderRadius: 16, padding: '18px 18px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', right: -20, bottom: -20, width: 160, height: 160,
          background: 'rgba(255,255,255,.15)', borderRadius: '50%',
        }}/>
        <div style={{ position: 'absolute', right: 10, top: 10 }}>
          <FoodMark kind="bento" size={70}/>
        </div>
        <div style={{ position: 'relative', maxWidth: '60%' }}>
          <Pill tone="paper" size="xs">阪急阪神食品グループ</Pill>
          <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 22, marginTop: 8, lineHeight: 1.2 }}>
            ご自宅まで<br/>毎日お届け。
          </div>
          <div style={{ fontFamily: SANS, fontSize: 11, opacity: .9, marginTop: 6, lineHeight: 1.6 }}>
            年間 100 万件以上の配達実績
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ padding: '14px 16px 0', display: 'flex', gap: 10 }}>
        {[
          { big: '100', sub: '万件', l: '年間配達数' },
          { big: '5,200', sub: '品目', l: '取扱商品' },
          { big: '¥0',  sub: '',     l: '入会金' },
        ].map((s, i) => (
          <div key={i} style={{
            flex: 1, background: '#fff', border: `1px solid ${T.outline}`, borderRadius: 10,
            padding: '12px 10px', textAlign: 'center',
          }}>
            <div style={{ fontFamily: NUM, fontWeight: 900, fontSize: 20, color: T.point, lineHeight: 1 }}>
              {s.big}<span style={{ fontSize: 11, fontFamily: SANS, color: T.inkSoft, marginLeft: 2, fontWeight: 600 }}>{s.sub}</span>
            </div>
            <div style={{ fontFamily: SANS, fontSize: 9.5, color: T.inkSoft, marginTop: 4, fontWeight: 600, letterSpacing: '.1em' }}>{s.l}</div>
          </div>
        ))}
      </div>

      <SectionHead title="ご利用方法" en="How it works" style={{ marginTop: 24 }}/>
      <div style={{ padding: '0 16px' }}>
        {[
          { step: 1, t: 'アプリで注文', s: '前日 17:00 までにアプリでご注文。当日朝も追加可能。' },
          { step: 2, t: '指定日時にお届け', s: '冷蔵車でご自宅まで。再配達も無料です。' },
          { step: 3, t: 'お支払い', s: 'Sポイントが貯まる・使える。カード決済対応。' },
        ].map((s) => (
          <div key={s.step} style={{
            background: '#fff', border: `1px solid ${T.outline}`, borderRadius: 10,
            padding: '14px', marginTop: 8,
            display: 'flex', gap: 12,
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: 999, background: T.point, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto',
              fontFamily: NUM, fontWeight: 900, fontSize: 13,
            }}>{s.step}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 13, color: T.ink }}>{s.t}</div>
              <div style={{ fontFamily: SANS, fontSize: 11.5, color: T.inkMid, marginTop: 3, lineHeight: 1.6 }}>{s.s}</div>
            </div>
          </div>
        ))}
      </div>

      <SectionHead title="今週のお届けセット" en="Weekly Set" more="一覧" onMore={() => push('flyer')} style={{ marginTop: 22 }}/>
      <div style={{ display: 'flex', gap: 10, padding: '0 16px 24px', overflowX: 'auto' }} className="oas-noscroll">
        {[
          { name: '献立おまかせ 4日分', sub: '4人前 × 4日', price: 6800, kind: 'oyakodon' },
          { name: '朝ごはん ベーシック', sub: '5日分',     price: 2980, kind: 'bread' },
          { name: 'お肉と魚のセット',   sub: '4人前',      price: 4200, kind: 'salmon' },
        ].map(p => <ProductCard key={p.name} {...p} width={148} onTap={() => push('product', p)}/>)}
      </div>

      {/* Bottom CTA */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '12px 16px 22px', background: '#fff',
        borderTop: `1px solid ${T.outlineSoft}`,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <button onClick={pop} style={{
          padding: '14px 16px', background: '#fff', color: T.ink,
          border: `1px solid ${T.outline}`, borderRadius: 8, cursor: 'pointer',
          fontFamily: SANS, fontWeight: 700, fontSize: 13,
        }}>あとで</button>
        <button onClick={() => push('barcode')} style={{
          flex: 1, background: T.point, color: '#fff', border: 0, cursor: 'pointer',
          padding: '14px 0', borderRadius: 8,
          fontFamily: SANS, fontWeight: 800, fontSize: 13.5, letterSpacing: '.06em',
          boxShadow: '0 4px 12px rgba(232,82,138,.3)',
        }}>無料で会員登録する</button>
      </div>
    </div>
  );
}

Object.assign(window, { C_AiChat, C_Search, C_Notif, C_Barcode, C_KitchenYell });
