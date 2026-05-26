// ─────────────────────────────────────────────────────────────
// ADMIN · VARIANT B — "FOLIO" (雑誌スプレッド)
// Magazine-spread layout. Numbered chapters, generous whitespace,
// 2-column body, portrait KPI cards, marginalia.
// ─────────────────────────────────────────────────────────────

const ADB_BG = T.cream;
const ADB_INK = T.ink;

// ── App ──────────────────────────────────────────────────────
function AdminB() {
  const [view, setView] = React.useState('dashboard');
  return (
    <div style={{
      width: 1360, height: 860,
      display: 'flex', background: ADB_BG, color: ADB_INK,
      fontFamily: SANS, overflow: 'hidden',
    }}>
      <AdminB_Rail view={view} onChange={setView}/>
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <AdminB_Header view={view}/>
        <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
          {view === 'dashboard' && <AdminB_Dashboard/>}
          {view === 'monitor'   && <AdminB_Monitor/>}
          {view === 'ai'        && <AdminB_AI/>}
          {view === 'campaigns' && <AdminB_Campaigns/>}
          {!['dashboard','monitor','ai','campaigns'].includes(view) && <AdminB_Dashboard/>}
        </div>
      </main>
    </div>
  );
}

// ── Sidebar — chapter index ──────────────────────────────────
function AdminB_Rail({ view, onChange }) {
  const items = [
    { id: 'dashboard', n: 'I',   ja: '本日の指数',   en: 'Today\'s Index',     g: 'OPS' },
    { id: 'monitor',   n: 'II',  ja: '会話の流れ',   en: 'The Flow',           g: 'OPS', live: true },
    { id: 'ai',        n: 'III', ja: '主筆と方針',   en: 'Voice & Policy',     g: 'EDIT' },
    { id: 'campaigns', n: 'IV',  ja: '特集の編成',   en: 'Features',           g: 'EDIT' },
    { id: 'products',  n: 'V',   ja: '商品の台帳',   en: 'Products',           g: 'CAT', sub: '24,830' },
    { id: 'stores',    n: 'VI',  ja: '店舗の台帳',   en: 'Stores',             g: 'CAT', sub: '38' },
    { id: 'coupons',   n: 'VII', ja: '引換券',       en: 'Coupons',            g: 'CAT', sub: '12' },
  ];
  const groups = {
    OPS:  '運営',
    EDIT: '編集',
    CAT:  '台帳',
  };
  let lastG = null;
  return (
    <aside style={{
      width: 268, flex: '0 0 auto', background: T.paper,
      borderRight: `1px solid ${T.rule}`, padding: '28px 22px 18px',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Lockup */}
      <div style={{
        paddingBottom: 16, borderBottom: `1px solid ${T.ink}`,
        position: 'relative',
      }}>
        <Kicker style={{ fontSize: 8.5 }}>運営者用 · For Editors</Kicker>
        <OasisMark size={24} color={ADB_INK} full/>
        <div style={{
          marginTop: 6, fontFamily: SERIF, fontStyle: 'italic',
          fontSize: 12, color: T.maroon, letterSpacing: '.04em',
        }}>The Console &nbsp;·&nbsp; vol. 48</div>
      </div>

      {/* Store selector */}
      <div style={{ padding: '16px 0 14px', borderBottom: `1px solid ${T.lineSoft}` }}>
        <div style={{
          fontFamily: SANS, fontSize: 8, letterSpacing: '.32em', color: T.inkSoft, fontWeight: 700,
        }}>STORE · 担当店舗</div>
        <div style={{
          marginTop: 6, padding: '8px 4px',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <Icon name="pin" size={14} color={T.maroon}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 13.5, letterSpacing: '.03em' }}>神戸三宮店</div>
            <div style={{ fontFamily: SERIF_NUM, fontStyle: 'italic', fontSize: 10, color: T.inkSoft }}>関西エリア · 38 店舗</div>
          </div>
          <Icon name="chevD" size={12} color={T.inkSoft}/>
        </div>
      </div>

      {/* Chapters */}
      <div style={{ marginTop: 14 }}>
        {items.map((it) => {
          const on = view === it.id;
          const showGroup = it.g !== lastG; lastG = it.g;
          return (
            <React.Fragment key={it.id}>
              {showGroup && (
                <div style={{
                  marginTop: items.indexOf(it) === 0 ? 0 : 16, marginBottom: 6,
                  fontFamily: SANS, fontSize: 8, letterSpacing: '.32em', fontWeight: 700, color: T.inkMute,
                }}>{it.g} · {groups[it.g]}</div>
              )}
              <button onClick={() => onChange(it.id)} style={{
                width: '100%', border: 0, cursor: 'pointer',
                display: 'flex', alignItems: 'baseline', gap: 10,
                padding: '8px 0', background: 'transparent',
                color: on ? ADB_INK : T.inkMid,
                textAlign: 'left', position: 'relative',
                borderBottom: `1px solid ${T.lineSoft}`,
              }}>
                <span style={{
                  fontFamily: SERIF_NUM, fontStyle: 'italic', fontWeight: 500,
                  fontSize: 14, color: on ? T.maroon : T.inkMute, width: 24, letterSpacing: '-.01em',
                }}>{it.n}.</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: SERIF, fontWeight: on ? 700 : 600, fontSize: 13.5,
                    letterSpacing: '.04em',
                  }}>{it.ja}</div>
                  <div style={{
                    fontFamily: SERIF_NUM, fontStyle: 'italic', fontSize: 10,
                    color: on ? T.maroon : T.inkSoft, marginTop: 1,
                  }}>{it.en}</div>
                </div>
                {it.sub && <span style={{ fontFamily: MONO, fontSize: 9.5, color: T.inkSoft }}>{it.sub}</span>}
                {it.live && <span style={{ width: 6, height: 6, borderRadius: 999, background: T.fresh, boxShadow: `0 0 5px ${T.fresh}` }}/>}
                {on && <span style={{
                  position: 'absolute', left: -22, top: 14, width: 12, height: 2, background: T.maroon,
                }}/>}
              </button>
            </React.Fragment>
          );
        })}
      </div>

      <div style={{ flex: 1 }}/>

      {/* User chip */}
      <div style={{
        paddingTop: 14, borderTop: `1px solid ${T.lineSoft}`,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 999, background: T.maroon, color: T.ivory,
          fontFamily: SERIF, fontWeight: 700, fontSize: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>佐</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 12 }}>佐藤 美咲</div>
          <div style={{ fontFamily: SERIF_NUM, fontStyle: 'italic', fontSize: 10, color: T.inkSoft }}>販促マネージャー · 関西</div>
        </div>
        <Icon name="settings" size={13} color={T.inkSoft}/>
      </div>
    </aside>
  );
}

// ── Header — folio masthead ──────────────────────────────────
function AdminB_Header({ view }) {
  const titles = {
    dashboard: { n: 'I',   ja: '本日の指数',  en: 'Today\'s Index',  stand: '関西エリア / 神戸三宮店 — 第 048 号' },
    monitor:   { n: 'II',  ja: '会話の流れ',  en: 'The Flow',         stand: '直近 60 分の会話を観察' },
    ai:        { n: 'III', ja: '主筆と方針',  en: 'Voice & Policy',   stand: 'AI 編集主「ハル」の応答方針' },
    campaigns: { n: 'IV',  ja: '特集の編成',  en: 'Features',         stand: '配信中 · 予約 · 終了' },
  };
  const t = titles[view] || titles.dashboard;
  return (
    <header style={{
      flex: '0 0 auto', padding: '22px 36px 18px',
      background: ADB_BG, borderBottom: `1px solid ${T.rule}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
            <span style={{
              fontFamily: SERIF_NUM, fontStyle: 'italic', fontWeight: 500,
              fontSize: 44, color: T.maroon, lineHeight: 1, letterSpacing: '-.02em',
            }}>{t.n}.</span>
            <h1 style={{
              margin: 0, fontFamily: SERIF, fontWeight: 700,
              fontSize: 36, lineHeight: 1, letterSpacing: '.04em',
            }}>{t.ja}</h1>
            <span style={{
              fontFamily: SERIF_NUM, fontStyle: 'italic', fontWeight: 500, fontSize: 20,
              color: T.inkSoft, letterSpacing: '.02em',
            }}>— {t.en}</span>
          </div>
          <div style={{
            marginTop: 10, fontFamily: SERIF, fontStyle: 'italic', fontSize: 12, color: T.inkMid,
            letterSpacing: '.04em',
          }}>{t.stand}</div>
        </div>

        {/* Right meta block */}
        <div style={{ display: 'flex', gap: 28, alignItems: 'flex-end' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: SANS, fontSize: 8.5, letterSpacing: '.3em', color: T.inkSoft, fontWeight: 700 }}>本日</div>
            <div style={{ fontFamily: SERIF_NUM, fontStyle: 'italic', fontWeight: 500, fontSize: 22, marginTop: 2 }}>11.26 <span style={{ fontFamily: SANS, fontStyle: 'normal', fontSize: 11, color: T.inkSoft, fontWeight: 500 }}>(水)</span></div>
          </div>
          <div style={{ width: 1, alignSelf: 'stretch', background: T.line }}/>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: SANS, fontSize: 8.5, letterSpacing: '.3em', color: T.inkSoft, fontWeight: 700 }}>セッション</div>
            <div style={{ fontFamily: SERIF_NUM, fontStyle: 'italic', fontWeight: 500, fontSize: 22, color: T.maroon, marginTop: 2 }}>
              124<span style={{ fontFamily: SANS, fontStyle: 'normal', fontSize: 11, color: T.inkSoft, fontWeight: 500, marginLeft: 4 }}>接続</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-actions */}
      <div style={{
        marginTop: 14, paddingTop: 10, borderTop: `1px solid ${T.lineSoft}`,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        {['週','日','月','カスタム'].map((l, i) => (
          <button key={l} style={{
            border: 0, cursor: 'pointer', padding: '5px 12px',
            background: 'transparent',
            color: i === 0 ? T.maroon : T.inkSoft,
            fontFamily: SERIF, fontWeight: i === 0 ? 700 : 600, fontSize: 11.5, letterSpacing: '.08em',
            borderBottom: i === 0 ? `2px solid ${T.maroon}` : '2px solid transparent',
          }}>{l}</button>
        ))}
        <span style={{ flex: 1 }}/>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '5px 12px 5px 10px', background: T.paper, border: `1px solid ${T.line}`,
          fontSize: 11, fontWeight: 600, color: T.inkMid,
        }}>
          <Icon name="search" size={12} color={T.inkMid}/>
          <span>商品 · 質問 を検索</span>
          <span style={{ fontFamily: MONO, fontSize: 9, padding: '1px 5px', background: ADB_BG, color: T.inkSoft, marginLeft: 10 }}>⌘ K</span>
        </div>
        <button style={{
          width: 30, height: 28, border: `1px solid ${T.line}`, background: T.paper, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
        }}>
          <Icon name="bell" size={13} color={T.inkMid}/>
          <span style={{ position: 'absolute', top: 5, right: 6, width: 6, height: 6, borderRadius: 999, background: T.sale }}/>
        </button>
        <button style={{
          padding: '6px 14px', border: 0, background: T.ink, color: T.ivory, cursor: 'pointer',
          fontFamily: SERIF, fontWeight: 700, fontSize: 11, letterSpacing: '.2em',
        }}>書き出し</button>
      </div>
    </header>
  );
}

// ── Section header used in body ──────────────────────────────
function B_Sec({ n, ja, en, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 14 }}>
      <span style={{
        fontFamily: SERIF_NUM, fontStyle: 'italic', fontWeight: 500, fontSize: 26, color: T.maroon, lineHeight: 1, width: 28,
      }}>{n}</span>
      <div style={{ flex: 1 }}>
        <h2 style={{
          margin: 0, fontFamily: SERIF, fontWeight: 700, fontSize: 20, letterSpacing: '.04em',
        }}>{ja}</h2>
        <div style={{
          fontFamily: SERIF_NUM, fontStyle: 'italic', fontSize: 11, color: T.inkSoft, marginTop: 2, letterSpacing: '.04em',
        }}>{en}</div>
      </div>
      <Rule style={{ flex: 1, opacity: .5 }}/>
      {right}
    </div>
  );
}

// ── DASHBOARD ────────────────────────────────────────────────
function AdminB_Dashboard() {
  return (
    <div style={{ padding: '24px 36px 40px', display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* Lede — pull quote + KPI grid */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 36, alignItems: 'stretch' }}>
        {/* Pull quote */}
        <div style={{ position: 'relative' }}>
          <Kicker style={{ fontSize: 9 }}>章 I · 本日の見出し</Kicker>
          <h2 style={{
            margin: '12px 0 0',
            fontFamily: SERIF, fontWeight: 700, fontSize: 30, lineHeight: 1.3, letterSpacing: '.02em',
          }}>
            会話量は <span style={{ color: T.maroon }}>+18.4%</span>、<br/>
            <span style={{ fontStyle: 'italic', fontFamily: SERIF_NUM, fontWeight: 500 }}>oyakodon</span> が今夜の主役。
          </h2>
          <p style={{
            margin: '14px 0 0', fontFamily: SERIF, fontSize: 13.5, lineHeight: 1.85,
            color: T.inkMid, letterSpacing: '.02em', textAlign: 'justify',
          }}>
            18:30 に第一のピーク。鶏もも肉と卵を組み合わせた提案が CTR 31% を記録しました。クーポン利用率は前週比 +4.1pt。
          </p>
          <div style={{
            marginTop: 18, paddingTop: 12, borderTop: `1px solid ${T.rule}`,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 999, background: T.ink, color: T.ivory,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="sparkle" size={18} color={T.maroonSoft} sw={2}/>
            </div>
            <div>
              <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 12 }}>ハル / AI 編集主</div>
              <div style={{ fontFamily: SERIF_NUM, fontStyle: 'italic', fontSize: 10, color: T.inkSoft }}>11:26 更新</div>
            </div>
          </div>
        </div>

        {/* KPI portrait grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0, border: `1px solid ${T.line}`, background: T.paper }}>
          {ADMIN_DATA.kpis.map((k, i, a) => (
            <div key={i} style={{
              padding: '20px 22px',
              borderRight: i % 2 === 0 ? `1px solid ${T.lineSoft}` : 'none',
              borderBottom: i < 2 ? `1px solid ${T.lineSoft}` : 'none',
            }}>
              <div style={{
                fontFamily: SANS, fontSize: 8.5, letterSpacing: '.25em', fontWeight: 700, color: T.inkSoft,
              }}>{k.label}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 8 }}>
                <div style={{
                  fontFamily: SERIF_NUM, fontStyle: 'italic', fontWeight: 500, fontSize: 40, lineHeight: 1,
                  letterSpacing: '-.01em',
                }}>{k.big}{k.unit && <span style={{ fontSize: 16, fontFamily: SANS, fontStyle: 'normal', marginLeft: 3, fontWeight: 700, color: T.inkSoft }}>{k.unit}</span>}</div>
                <span style={{
                  fontFamily: SANS, fontSize: 10.5, fontWeight: 700, letterSpacing: '.04em',
                  color: k.dir === 'up' ? T.fresh : T.sale,
                }}>{k.dir === 'up' ? '▲' : '▼'} {k.delta}</span>
              </div>
              <div style={{ marginTop: 12 }}>
                <Sparkline trend={k.trend} h={32} color={T.maroon}/>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Chapter II — chart */}
      <section>
        <B_Sec n="II" ja="会話の波" en="The Volume of Conversations" right={
          <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 11, color: T.inkSoft }}>15 分単位 · 7 日</span>
        }/>
        <div style={{
          background: T.paper, border: `1px solid ${T.line}`, padding: '24px 28px',
          display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 32, alignItems: 'center',
        }}>
          {/* marginalia */}
          <div>
            <div style={{ fontFamily: SANS, fontSize: 8.5, letterSpacing: '.3em', fontWeight: 700, color: T.maroon }}>◆ 本日のピーク</div>
            <div style={{
              fontFamily: SERIF_NUM, fontStyle: 'italic', fontWeight: 500, fontSize: 52, lineHeight: 1,
              marginTop: 8, color: ADB_INK, letterSpacing: '-.02em',
            }}>18:30</div>
            <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 12, color: T.inkMid, marginTop: 6 }}>
              1,240 件 / 15 分
            </div>
            <Rule style={{ margin: '14px 0' }}/>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: SERIF, fontSize: 11.5, color: ADB_INK }}>
                <span style={{ width: 12, height: 10, background: T.maroon }}/> AI 会話
                <span style={{ marginLeft: 'auto', fontFamily: MONO, color: T.inkSoft }}>72%</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: SERIF, fontSize: 11.5, color: ADB_INK }}>
                <span style={{ width: 12, height: 10, background: T.gold }}/> クーポン適用
                <span style={{ marginLeft: 'auto', fontFamily: MONO, color: T.inkSoft }}>28%</span>
              </span>
            </div>
          </div>
          {/* chart */}
          <div>
            <HourlyBarStack height={220}/>
          </div>
        </div>
      </section>

      {/* Chapter III + IV — letters + flow */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36 }}>
        <div>
          <B_Sec n="III" ja="読者の声" en="Letters from the Floor" right={
            <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 11, color: T.inkSoft }}>過去 7 日</span>
          }/>
          {ADMIN_DATA.popularQ.map((r, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'baseline', gap: 12,
              padding: '14px 0', borderBottom: `1px solid ${T.lineSoft}`,
            }}>
              <span style={{
                fontFamily: SERIF_NUM, fontStyle: 'italic', fontWeight: 500, fontSize: 18,
                color: T.maroon, width: 22,
              }}>{i+1}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: SERIF, fontStyle: 'italic', fontWeight: 700, fontSize: 16,
                  letterSpacing: '.02em',
                }}>「{r.q}」</div>
                <div style={{
                  marginTop: 4, height: 2, background: T.lineSoft,
                }}>
                  <div style={{
                    width: `${r.c/ADMIN_DATA.popularQ[0].c*100}%`, height: '100%', background: T.maroon, opacity: .8,
                  }}/>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontFamily: SERIF_NUM, fontStyle: 'italic', fontWeight: 500, fontSize: 18, color: ADB_INK,
                }}>{r.conv}<span style={{ fontSize: 11, color: T.inkSoft, marginLeft: 1 }}>%</span></div>
                <div style={{ fontFamily: MONO, fontSize: 10, color: T.inkSoft }}>{r.c.toLocaleString()} 件</div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <B_Sec n="IV" ja="ワイヤー" en="The Live Flow" right={
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: SANS, fontSize: 8.5,
              fontWeight: 700, letterSpacing: '.3em', color: T.fresh,
            }}>
              <span style={{ width: 5, height: 5, borderRadius: 999, background: T.fresh, boxShadow: `0 0 5px ${T.fresh}` }}/>LIVE
            </span>
          }/>
          <div style={{ background: T.paper, border: `1px solid ${T.line}` }}>
            {ADMIN_DATA.feed.slice(0, 7).map((e, i) => (
              <div key={i} style={{
                padding: '12px 16px', display: 'flex', alignItems: 'baseline', gap: 10,
                borderTop: i ? `1px solid ${T.lineSoft}` : 'none',
              }}>
                <span style={{ fontFamily: MONO, fontSize: 10, color: T.inkSoft, width: 34 }}>{e.t}</span>
                <span style={{
                  fontFamily: SANS, fontSize: 8, letterSpacing: '.25em', fontWeight: 700, color: e.tone,
                  background: `${e.tone}1c`, padding: '2px 6px', width: 64, textAlign: 'center', flex: '0 0 auto',
                }}>{e.tag}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 12.5, letterSpacing: '.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.what}</div>
                  <div style={{ fontFamily: SERIF_NUM, fontStyle: 'italic', fontSize: 10, color: T.inkSoft, marginTop: 1 }}>{e.who}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter V — Picks of the day */}
      <section>
        <B_Sec n="V" ja="今日の主役" en="Picks of the Day" right={
          <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 11, color: T.maroon, cursor: 'pointer' }}>すべて見る →</span>
        }/>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}>
          {ADMIN_DATA.products.map((p, i) => (
            <div key={i} style={{
              background: T.paper, border: `1px solid ${T.line}`,
              display: 'flex', flexDirection: 'column',
            }}>
              <div style={{
                height: 100, background: T.cream,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderBottom: `1px solid ${T.line}`, position: 'relative',
              }}>
                <FoodMark kind={p.kind} size={84} bg="transparent"/>
                <span style={{
                  position: 'absolute', top: 8, left: 8,
                  fontFamily: SERIF_NUM, fontStyle: 'italic', fontWeight: 500, fontSize: 18, color: T.maroon, lineHeight: 1,
                }}>{i+1}</span>
              </div>
              <div style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 12.5, letterSpacing: '.02em', flex: 1 }}>{p.name}</div>
                <div style={{
                  marginTop: 8, paddingTop: 6, borderTop: `1px solid ${T.lineSoft}`,
                  display: 'flex', alignItems: 'baseline', gap: 6,
                }}>
                  <div>
                    <div style={{ fontFamily: SANS, fontSize: 7.5, letterSpacing: '.25em', color: T.inkSoft, fontWeight: 700 }}>購入</div>
                    <div style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600 }}>{p.buy.toLocaleString()}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                    <div style={{ fontFamily: SANS, fontSize: 7.5, letterSpacing: '.25em', color: T.inkSoft, fontWeight: 700 }}>CTR</div>
                    <div style={{ fontFamily: SERIF_NUM, fontStyle: 'italic', fontWeight: 500, fontSize: 18, color: T.maroon }}>{p.rate}%</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ── MONITOR ──────────────────────────────────────────────────
function AdminB_Monitor() {
  return (
    <div style={{ padding: '24px 36px 40px' }}>
      <section>
        <B_Sec n="II" ja="会話の流れ" en="The Live Flow" right={
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: SANS, fontSize: 8.5,
            fontWeight: 700, letterSpacing: '.3em', color: T.fresh,
          }}>
            <span style={{ width: 5, height: 5, borderRadius: 999, background: T.fresh, boxShadow: `0 0 5px ${T.fresh}` }}/>LIVE · 124 接続中
          </span>
        }/>
        <p style={{
          margin: '0 0 22px', fontFamily: SERIF, fontStyle: 'italic', fontSize: 14, color: T.inkMid,
          letterSpacing: '.02em', maxWidth: 640, lineHeight: 1.8,
        }}>
          過去 60 分で 1,840 件の会話を観測しました。鶏もも肉、卵、銀鮭が頻繁に登場しています。
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
          {ADMIN_DATA.feed.concat(ADMIN_DATA.feed).map((e, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'baseline', gap: 14,
              padding: '14px 0', borderTop: `1px solid ${T.lineSoft}`,
            }}>
              <span style={{
                fontFamily: SERIF_NUM, fontStyle: 'italic', fontWeight: 500, fontSize: 16, color: T.maroon, width: 26,
              }}>{i+1}.</span>
              <span style={{ fontFamily: MONO, fontSize: 10, color: T.inkSoft, width: 38 }}>{e.t}</span>
              <span style={{
                fontFamily: SANS, fontSize: 8, letterSpacing: '.25em', fontWeight: 700, color: e.tone,
                background: `${e.tone}1c`, padding: '2px 7px', width: 70, textAlign: 'center', flex: '0 0 auto',
              }}>{e.tag}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 13, letterSpacing: '.02em' }}>{e.what}</div>
                <div style={{ fontFamily: SERIF_NUM, fontStyle: 'italic', fontSize: 10, color: T.inkSoft, marginTop: 2 }}>{e.who}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ── AI ───────────────────────────────────────────────────────
function AdminB_AI() {
  return (
    <div style={{ padding: '24px 36px 40px' }}>
      <section>
        <B_Sec n="III" ja="主筆と方針" en="Editor in Chief"/>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36 }}>
          <div>
            <p className="oas-dropcap" style={{
              margin: 0, fontFamily: SERIF, fontSize: 14, lineHeight: 1.95,
              letterSpacing: '.02em', textAlign: 'justify',
            }}>
              AI 編集主「ハル」は、神戸三宮店のお客様に対し、丁寧で控えめな口調で応答します。提案は会話3回に1回まで。クーポンは17時以降に強めて告知します。
            </p>
            <Rule style={{ margin: '20px 0' }}/>
            <Kicker style={{ fontSize: 9 }}>◆ 編集ノート</Kicker>
            <p style={{
              margin: '8px 0 0', fontFamily: SERIF, fontStyle: 'italic', fontSize: 12.5,
              lineHeight: 1.85, color: T.inkMid, letterSpacing: '.02em',
            }}>
              押し付けの提案は避け、お客様の問いに沿った形で「もしよろしければ」と添えるよう設計しています。
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {[
              { l: '応答の長さ', v: '中', sub: '60 〜 120 字' },
              { l: '言葉遣い',   v: '丁寧',  sub: '関西方言は控えめ' },
              { l: '提案頻度',   v: '1/3',   sub: '会話3回に1回' },
              { l: 'クーポン',   v: '会員のみ', sub: '17時以降強め' },
            ].map((r, i) => (
              <div key={i} style={{
                padding: '16px 16px', background: T.paper, border: `1px solid ${T.line}`,
              }}>
                <div style={{ fontFamily: SANS, fontSize: 8.5, letterSpacing: '.25em', color: T.inkSoft, fontWeight: 700 }}>{r.l}</div>
                <div style={{
                  marginTop: 8, fontFamily: SERIF_NUM, fontStyle: 'italic', fontWeight: 500, fontSize: 26,
                  color: T.maroon, letterSpacing: '-.01em', lineHeight: 1,
                }}>{r.v}</div>
                <div style={{ marginTop: 6, fontFamily: SERIF, fontStyle: 'italic', fontSize: 11, color: T.inkMid }}>{r.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Campaigns ────────────────────────────────────────────────
function AdminB_Campaigns() {
  const camps = [
    { name: '初冬の親子丼フェア', start: '11/24', end: '11/30', status: '配信中', rate: 31.1, kind: 'chicken' },
    { name: '兵庫の卵 早期割',     start: '11/20', end: '12/05', status: '配信中', rate: 27.7, kind: 'egg' },
    { name: '北海道 銀鮭 週末',    start: '11/29', end: '11/30', status: '予約',   rate:    0, kind: 'salmon' },
    { name: '春キャベツ 大特価',    start: '11/15', end: '11/22', status: '終了',   rate: 23.3, kind: 'cabbage' },
  ];
  return (
    <div style={{ padding: '24px 36px 40px' }}>
      <section>
        <B_Sec n="IV" ja="特集の編成" en="Features Desk" right={
          <button style={{
            border: 0, background: T.ink, color: T.ivory, cursor: 'pointer',
            padding: '6px 14px', fontFamily: SERIF, fontWeight: 700, fontSize: 11, letterSpacing: '.2em',
          }}>新しい特集 +</button>
        }/>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 22 }}>
          {camps.map((c, i) => (
            <article key={i} style={{
              background: T.paper, border: `1px solid ${T.line}`, padding: '20px 22px',
              display: 'flex', gap: 16, alignItems: 'flex-start',
            }}>
              <FoodMark kind={c.kind} size={68} bg={T.cream}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{
                    padding: '2px 8px',
                    fontFamily: SANS, fontSize: 8, fontWeight: 700, letterSpacing: '.25em',
                    background: c.status === '配信中' ? T.maroon : c.status === '予約' ? T.gold : T.inkMute,
                    color: T.ivory,
                  }}>{c.status}</span>
                  <span style={{ fontFamily: SERIF_NUM, fontStyle: 'italic', fontSize: 11, color: T.inkSoft }}>{c.start} — {c.end}</span>
                </div>
                <h3 style={{
                  margin: '8px 0 6px', fontFamily: SERIF, fontWeight: 700, fontSize: 18, letterSpacing: '.02em',
                }}>{c.name}</h3>
                <div style={{
                  marginTop: 10, paddingTop: 10, borderTop: `1px solid ${T.lineSoft}`,
                  display: 'flex', alignItems: 'baseline', gap: 18,
                }}>
                  <div>
                    <div style={{ fontFamily: SANS, fontSize: 8, letterSpacing: '.25em', color: T.inkSoft, fontWeight: 700 }}>CVR</div>
                    <div style={{ fontFamily: SERIF_NUM, fontStyle: 'italic', fontWeight: 500, fontSize: 22, color: c.rate ? T.maroon : T.inkMute, lineHeight: 1 }}>
                      {c.rate ? c.rate + '%' : '—'}
                    </div>
                  </div>
                  <div style={{ flex: 1 }}/>
                  <button style={{
                    border: `1px solid ${T.ink}`, background: 'transparent', color: T.ink, cursor: 'pointer',
                    padding: '5px 12px', fontFamily: SERIF, fontWeight: 700, fontSize: 10, letterSpacing: '.2em',
                  }}>編集</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { AdminB });
