// ─────────────────────────────────────────────────────────────
// ADMIN · VARIANT A — "MASTHEAD" (社会面)
// Newspaper masthead, left rail mincho nav, KPI as front-page
// hero, 24h chart as main story, live ticker as sidebar column.
// ─────────────────────────────────────────────────────────────

const ADA_BG = T.bg;     // primary paper
const ADA_INK = T.ink;

// ── App ──────────────────────────────────────────────────────
function AdminA() {
  const [view, setView] = React.useState('dashboard');
  return (
    <div style={{
      width: 1360, height: 860,
      display: 'flex', background: ADA_BG, color: ADA_INK,
      fontFamily: SANS, overflow: 'hidden',
    }}>
      <AdminA_Rail view={view} onChange={setView}/>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <AdminA_Masthead view={view}/>
        <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
          {view === 'dashboard' && <AdminA_Dashboard/>}
          {view === 'monitor'   && <AdminA_Monitor/>}
          {view === 'ai'        && <AdminA_AI/>}
          {view === 'campaigns' && <AdminA_Campaigns/>}
          {!['dashboard','monitor','ai','campaigns'].includes(view) && <AdminA_Dashboard/>}
        </div>
      </div>
    </div>
  );
}

// ── Left rail — minimal, mincho labels ───────────────────────
function AdminA_Rail({ view, onChange }) {
  const groups = [
    { label: '運営',  en: 'OPERATIONS', items: [
      { id: 'dashboard', icon: 'grid',     ja: 'ダッシュボード', en: 'Front Page' },
      { id: 'monitor',   icon: 'activity', ja: '会話モニター',   en: 'The Wire', live: true },
    ]},
    { label: '知能',  en: 'INTELLIGENCE', items: [
      { id: 'ai',        icon: 'sparkle',  ja: 'AI 制御',         en: 'Editor'   },
      { id: 'campaigns', icon: 'flame',    ja: 'キャンペーン',     en: 'Features' },
    ]},
    { label: '台帳',  en: 'CATALOG', items: [
      { id: 'products',  icon: 'bag',      ja: '商品マスタ', en: 'Products', sub: '24,830' },
      { id: 'stores',    icon: 'store',    ja: '店舗マスタ', en: 'Stores',   sub: '38'      },
      { id: 'coupons',   icon: 'coupon',   ja: 'クーポン',   en: 'Coupons',  sub: '12'      },
    ]},
  ];
  return (
    <aside style={{
      width: 248, flex: '0 0 auto',
      background: T.paper, color: ADA_INK,
      borderRight: `1px solid ${T.rule}`,
      padding: '22px 16px 16px',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Lockup */}
      <div style={{ padding: '0 6px 16px', borderBottom: `1px solid ${T.rule}` }}>
        <OasisMark size={22} color={ADA_INK} full/>
        <div style={{
          marginTop: 10,
          fontFamily: SANS, fontSize: 8.5, letterSpacing: '.3em', fontWeight: 700,
          color: T.maroon,
        }}>EDITORIAL CONSOLE · 第 048 号</div>
      </div>

      {/* Store selector */}
      <div style={{ padding: '14px 4px 12px', borderBottom: `1px solid ${T.lineSoft}` }}>
        <div style={{ fontFamily: SANS, fontSize: 8, letterSpacing: '.3em', color: T.inkSoft, fontWeight: 700 }}>STORE</div>
        <div style={{
          marginTop: 8, padding: '8px 10px', background: ADA_BG,
          border: `1px solid ${T.line}`,
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <Icon name="pin" size={13} color={T.maroon}/>
          <span style={{ flex: 1, fontFamily: SERIF, fontSize: 12, fontWeight: 600, letterSpacing: '.04em' }}>{ADMIN_DATA.storeLabel}</span>
          <Icon name="chevD" size={12} color={T.inkSoft}/>
        </div>
      </div>

      {groups.map((g) => (
        <div key={g.label} style={{ marginTop: 18 }}>
          <div style={{
            fontFamily: SANS, fontSize: 8, letterSpacing: '.32em',
            color: T.inkMute, fontWeight: 700, padding: '0 6px 8px',
          }}>{g.en} · {g.label}</div>
          {g.items.map((it) => {
            const on = view === it.id;
            return (
              <button key={it.id} onClick={() => onChange(it.id)} style={{
                width: '100%', border: 0, cursor: 'pointer',
                display: 'flex', alignItems: 'baseline', gap: 8,
                padding: '8px 8px', marginBottom: 1,
                background: on ? T.ink : 'transparent',
                color: on ? T.ivory : ADA_INK,
                textAlign: 'left',
                position: 'relative',
              }}>
                <Icon name={it.icon} size={13} sw={on ? 2 : 1.4}
                      color={on ? T.maroonSoft : T.inkMid}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: SERIF, fontWeight: on ? 700 : 600, fontSize: 12.5,
                    letterSpacing: '.04em',
                  }}>{it.ja}</div>
                  <div style={{
                    fontFamily: SERIF_NUM, fontStyle: 'italic', fontSize: 10,
                    color: on ? T.maroonSoft : T.inkSoft,
                  }}>— {it.en}</div>
                </div>
                {it.sub && <span style={{
                  fontFamily: MONO, fontSize: 9.5, color: on ? T.maroonSoft : T.inkSoft,
                }}>{it.sub}</span>}
                {it.live && <span style={{
                  width: 6, height: 6, borderRadius: 999, background: T.fresh, boxShadow: `0 0 5px ${T.fresh}`,
                }}/>}
              </button>
            );
          })}
        </div>
      ))}

      <div style={{ flex: 1 }}/>

      {/* User chip */}
      <div style={{
        marginTop: 10, padding: '10px 10px', background: ADA_BG,
        border: `1px solid ${T.line}`,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{
          width: 30, height: 30, borderRadius: 999, background: T.maroon, color: T.ivory,
          fontFamily: SERIF, fontWeight: 700, fontSize: 13,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>佐</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 11.5 }}>佐藤 美咲</div>
          <div style={{ fontFamily: SERIF_NUM, fontStyle: 'italic', fontSize: 10, color: T.inkSoft }}>販促マネージャー</div>
        </div>
        <Icon name="settings" size={13} color={T.inkSoft}/>
      </div>
    </aside>
  );
}

// ── Masthead — newspaper top ─────────────────────────────────
function AdminA_Masthead({ view }) {
  const titles = {
    dashboard: { ja: '本日の前線',         en: 'Today\'s Front Page', stub: 'DASHBOARD' },
    monitor:   { ja: 'ワイヤー',            en: 'The Live Wire',       stub: 'MONITOR'   },
    ai:        { ja: '主筆 · AI 制御',     en: 'Editor in Chief',     stub: 'AI'        },
    campaigns: { ja: 'キャンペーン編成',    en: 'Features Desk',       stub: 'CAMPAIGN'  },
  };
  const t = titles[view] || titles.dashboard;
  return (
    <header style={{
      flex: '0 0 auto', padding: '14px 28px 0',
      background: ADA_BG, borderBottom: `2px solid ${T.ink}`,
      boxShadow: `0 4px 0 -2px ${T.ink}`,    // double rule
    }}>
      {/* top folio */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        fontFamily: SANS, fontSize: 9, letterSpacing: '.3em', fontWeight: 700, color: T.inkSoft,
        paddingBottom: 8, borderBottom: `1px solid ${T.lineSoft}`,
        whiteSpace: 'nowrap',
      }}>
        <span>2026 · 11月26日 (水)</span>
        <span style={{ width: 4, height: 4, background: T.maroon }}/>
        <span style={{ color: T.maroon }}>第 048 号</span>
        <span style={{ width: 4, height: 4, background: T.maroon }}/>
        <span>営業 9:00 — 21:00 · 残 4 時間</span>
        <span style={{ flex: 1 }}/>
        <span style={{ fontFamily: SERIF, fontWeight: 700, color: ADA_INK, letterSpacing: '.05em' }}>· {t.stub} ·</span>
      </div>
      {/* title */}
      <div style={{
        padding: '14px 0 12px', display: 'flex', alignItems: 'baseline', gap: 12, whiteSpace: 'nowrap',
      }}>
        <h1 style={{
          margin: 0, fontFamily: SERIF, fontWeight: 700, fontSize: 32,
          letterSpacing: '.04em', lineHeight: 1, color: ADA_INK,
        }}>{t.ja}</h1>
        <span style={{
          fontFamily: SERIF_NUM, fontStyle: 'italic', fontWeight: 500, fontSize: 18,
          color: T.maroon, letterSpacing: '.02em',
        }}>— {t.en}</span>
        <span style={{ flex: 1 }}/>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '5px 12px 5px 10px', background: T.paper, border: `1px solid ${T.line}`,
          fontSize: 11, fontWeight: 600, color: T.inkMid,
        }}>
          <Icon name="search" size={12} color={T.inkMid}/>
          <span>商品 · 質問 を検索</span>
          <span style={{ fontFamily: MONO, fontSize: 9, padding: '1px 5px', background: ADA_BG, color: T.inkSoft, marginLeft: 10 }}>⌘ K</span>
        </div>
        <button style={{
          width: 30, height: 28, border: `1px solid ${T.line}`, background: T.paper, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
        }}>
          <Icon name="bell" size={13} color={T.inkMid}/>
          <span style={{ position: 'absolute', top: 5, right: 6, width: 6, height: 6, borderRadius: 999, background: T.sale }}/>
        </button>
        <div style={{ width: 1, height: 26, background: T.line, margin: '0 4px' }}/>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: SANS, fontSize: 8, letterSpacing: '.3em', color: T.inkSoft, fontWeight: 700 }}>セッション</div>
          <div style={{
            fontFamily: SERIF_NUM, fontStyle: 'italic', fontWeight: 500, fontSize: 18, color: ADA_INK, lineHeight: 1,
            marginTop: 2,
          }}>124<span style={{ fontFamily: SANS, fontStyle: 'normal', fontSize: 10, color: T.inkSoft, fontWeight: 500, marginLeft: 3 }}>接続</span></div>
        </div>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 5, marginLeft: 4,
          padding: '4px 10px', background: T.maroon, color: T.ivory,
          fontFamily: SANS, fontSize: 8.5, fontWeight: 700, letterSpacing: '.25em',
        }}>
          <span style={{ width: 5, height: 5, borderRadius: 999, background: T.maroonSoft, boxShadow: `0 0 4px ${T.maroonSoft}` }}/>LIVE
        </span>
      </div>
    </header>
  );
}

// ── DASHBOARD ────────────────────────────────────────────────
function AdminA_Dashboard() {
  return (
    <div style={{ padding: '20px 28px 36px', display: 'flex', flexDirection: 'column', gap: 18 }}>

      {/* HERO KPI row — front page story */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: `1px solid ${T.ink}`, background: T.paper }}>
        {ADMIN_DATA.kpis.map((k, i, a) => (
          <div key={i} style={{
            padding: '18px 18px 16px',
            borderRight: i < a.length - 1 ? `1px solid ${T.lineSoft}` : 'none',
            background: i === 0 ? T.ink : T.paper,
            color: i === 0 ? T.ivory : ADA_INK,
            position: 'relative',
          }}>
            {i === 0 && <Kicker color={T.maroonSoft} style={{ fontSize: 8.5 }}>◆ 第1面 リード</Kicker>}
            <div style={{
              fontFamily: SANS, fontSize: 9, letterSpacing: '.2em', fontWeight: 700,
              color: i === 0 ? T.maroonSoft : T.inkSoft, marginTop: i === 0 ? 4 : 0,
            }}>{k.label}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
              <div style={{
                fontFamily: SERIF_NUM, fontStyle: 'italic', fontWeight: 500, fontSize: 36,
                lineHeight: 1, letterSpacing: '-.01em',
                color: i === 0 ? T.ivory : ADA_INK,
              }}>
                {k.big}{k.unit && <span style={{ fontSize: 14, fontFamily: SANS, fontStyle: 'normal', marginLeft: 3, fontWeight: 700, color: i === 0 ? T.maroonSoft : T.inkSoft }}>{k.unit}</span>}
              </div>
              <span style={{
                fontFamily: SANS, fontSize: 10.5, fontWeight: 700, letterSpacing: '.04em',
                color: k.dir === 'up' ? T.fresh : T.sale,
              }}>{k.dir === 'up' ? '▲' : '▼'} {k.delta}</span>
            </div>
            <div style={{ marginTop: 10 }}>
              <Sparkline trend={k.trend} h={28} color={i === 0 ? T.maroonSoft : T.maroon}/>
            </div>
          </div>
        ))}
      </div>

      {/* Main story + sidebar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 18 }}>
        {/* Main story — chart */}
        <article style={{
          background: T.paper, border: `1px solid ${T.line}`,
          padding: '18px 20px 20px',
        }}>
          <header style={{
            display: 'flex', alignItems: 'baseline', gap: 8,
            paddingBottom: 10, borderBottom: `2px solid ${T.ink}`,
          }}>
            <Kicker style={{ fontSize: 9 }}>第 1 面 · 本日の指数</Kicker>
            <span style={{ flex: 1 }}/>
            <div style={{ display: 'flex', gap: 4 }}>
              {['週','日','月'].map((l, i) => (
                <button key={l} style={{
                  border: `1px solid ${i === 0 ? T.ink : T.line}`,
                  background: i === 0 ? T.ink : T.paper,
                  color: i === 0 ? T.ivory : T.inkMid,
                  padding: '4px 10px', cursor: 'pointer',
                  fontFamily: SERIF, fontWeight: 700, fontSize: 10.5, letterSpacing: '.15em',
                }}>{l}</button>
              ))}
              <button style={{
                width: 28, height: 24, border: `1px solid ${T.line}`, background: T.paper, color: T.inkMid, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 4,
              }}><Icon name="export" size={12}/></button>
            </div>
          </header>
          <h2 style={{
            margin: '10px 0 4px', fontFamily: SERIF, fontWeight: 700, fontSize: 22,
            letterSpacing: '.02em',
          }}>日別 会話ボリューム</h2>
          <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 11, color: T.inkMid, marginBottom: 14 }}>
            AI コンシェルジュ利用数 (15分単位) · 過去 7 日
          </div>
          <HourlyBarStack height={210}/>
          <div style={{
            marginTop: 8, paddingTop: 10, borderTop: `1px solid ${T.lineSoft}`,
            display: 'flex', alignItems: 'center', gap: 16,
            fontFamily: SANS, fontSize: 10, color: T.inkMid, fontWeight: 600, letterSpacing: '.04em',
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 12, height: 10, background: T.maroon }}/>AI 会話</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 12, height: 10, background: T.gold }}/>クーポン適用</span>
            <span style={{ flex: 1 }}/>
            <span style={{ fontFamily: SERIF, fontStyle: 'italic', color: T.inkSoft }}>
              ピーク &nbsp;<b style={{ fontFamily: SERIF_NUM, fontSize: 14, fontStyle: 'normal', color: ADA_INK, fontWeight: 600 }}>18:30</b> · 1,240 件 / 15 分
            </span>
          </div>
        </article>

        {/* Side column — live wire */}
        <article style={{
          background: T.ink, color: T.ivory, padding: '16px 18px 12px',
          border: `1px solid ${T.ink}`,
        }}>
          <header style={{
            display: 'flex', alignItems: 'baseline', gap: 8,
            paddingBottom: 10, borderBottom: `1px solid ${T.maroonSoft}`,
          }}>
            <Kicker color={T.maroonSoft} style={{ fontSize: 8.5 }}>◆ 第 2 面 · ワイヤー</Kicker>
            <span style={{ flex: 1 }}/>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              fontFamily: SANS, fontSize: 8.5, letterSpacing: '.25em', fontWeight: 700, color: T.fresh,
            }}>
              <span style={{ width: 5, height: 5, borderRadius: 999, background: T.fresh, boxShadow: `0 0 5px ${T.fresh}` }}/>LIVE
            </span>
          </header>
          <h3 style={{
            margin: '8px 0 2px', fontFamily: SERIF, fontWeight: 700, fontSize: 16, letterSpacing: '.04em',
          }}>リアルタイム活動</h3>
          <div style={{
            fontFamily: SERIF, fontStyle: 'italic', fontSize: 10.5, color: T.maroonSoft,
            paddingBottom: 8, borderBottom: `1px solid rgba(236,212,214,.18)`,
          }}>124 セッション接続中</div>
          <div style={{ marginTop: 4 }}>
            {ADMIN_DATA.feed.slice(0, 7).map((e, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'baseline', gap: 8,
                padding: '7px 0', borderTop: i ? `1px solid rgba(236,212,214,.12)` : 'none',
              }}>
                <span style={{ fontFamily: MONO, fontSize: 9.5, color: T.maroonSoft, width: 32 }}>{e.t}</span>
                <span style={{
                  fontFamily: SANS, fontSize: 8, letterSpacing: '.25em', fontWeight: 700, color: e.tone,
                  background: `${e.tone}28`, padding: '2px 6px', width: 60, textAlign: 'center', flex: '0 0 auto',
                }}>{e.tag}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 11.5, color: T.ivory, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', letterSpacing: '.02em' }}>{e.what}</div>
                  <div style={{ fontFamily: SERIF_NUM, fontStyle: 'italic', fontSize: 9.5, color: T.maroonSoft, marginTop: 1 }}>{e.who}</div>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>

      {/* Bottom 3 columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 18 }}>
        {/* Letters column — popular questions */}
        <article style={{
          background: T.paper, border: `1px solid ${T.line}`,
          padding: '18px 18px',
        }}>
          <header style={{
            display: 'flex', alignItems: 'baseline', gap: 8,
            paddingBottom: 10, borderBottom: `2px solid ${T.ink}`,
          }}>
            <Kicker style={{ fontSize: 9 }}>第 3 面 · 読者の声</Kicker>
            <span style={{ flex: 1 }}/>
            <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 10, color: T.inkSoft }}>7 日</span>
          </header>
          <h3 style={{
            margin: '10px 0 14px', fontFamily: SERIF, fontWeight: 700, fontSize: 18, letterSpacing: '.04em',
          }}>人気の質問 <span style={{ fontStyle: 'italic', fontFamily: SERIF_NUM, fontWeight: 500, fontSize: 14, color: T.maroon }}>— Letters</span></h3>
          {ADMIN_DATA.popularQ.map((r, i) => {
            const max = ADMIN_DATA.popularQ[0].c;
            return (
              <div key={i} style={{ padding: '8px 0', borderTop: i ? `1px solid ${T.lineSoft}` : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{
                    fontFamily: SERIF_NUM, fontStyle: 'italic', fontWeight: 500, fontSize: 14, color: T.maroon, width: 18,
                  }}>{i+1}.</span>
                  <span style={{ flex: 1, fontFamily: SERIF, fontWeight: 700, fontSize: 13, fontStyle: 'italic', color: ADA_INK }}>「{r.q}」</span>
                  <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 600, color: T.inkMid }}>{r.c.toLocaleString()}</span>
                  <span style={{ fontFamily: SERIF_NUM, fontStyle: 'italic', fontWeight: 500, fontSize: 13, color: T.maroon, width: 44, textAlign: 'right' }}>{r.conv}%</span>
                  <span style={{ color: r.dir === 'up' ? T.fresh : r.dir === 'down' ? T.sale : T.inkMute, fontSize: 9, fontWeight: 700, width: 10, textAlign: 'right' }}>
                    {r.dir === 'up' ? '▲' : r.dir === 'down' ? '▼' : '—'}
                  </span>
                </div>
                <div style={{ height: 2, marginTop: 5, marginLeft: 26, background: T.lineSoft }}>
                  <div style={{ width: `${r.c/max*100}%`, height: '100%', background: T.maroon, opacity: .75 }}/>
                </div>
              </div>
            );
          })}
        </article>

        {/* Classifieds — product leaderboard */}
        <article style={{
          background: T.paper, border: `1px solid ${T.line}`,
          padding: '18px 18px',
        }}>
          <header style={{
            display: 'flex', alignItems: 'baseline', gap: 8,
            paddingBottom: 10, borderBottom: `2px solid ${T.ink}`,
          }}>
            <Kicker style={{ fontSize: 9 }}>第 3 面 · 商況</Kicker>
            <span style={{ flex: 1 }}/>
            <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 10, color: T.maroon }}>すべて →</span>
          </header>
          <h3 style={{
            margin: '10px 0 14px', fontFamily: SERIF, fontWeight: 700, fontSize: 18, letterSpacing: '.04em',
          }}>AI 経由の人気商品 <span style={{ fontStyle: 'italic', fontFamily: SERIF_NUM, fontWeight: 500, fontSize: 14, color: T.maroon }}>— Picks</span></h3>
          <div style={{
            display: 'flex', alignItems: 'baseline', gap: 8, paddingBottom: 6,
            fontFamily: SANS, fontSize: 8, letterSpacing: '.25em', fontWeight: 700, color: T.inkSoft,
            borderBottom: `1px solid ${T.line}`,
          }}>
            <span style={{ width: 16 }}>#</span>
            <span style={{ flex: 1 }}>商品</span>
            <span style={{ width: 40, textAlign: 'right' }}>購入</span>
            <span style={{ width: 50, textAlign: 'right' }}>CTR</span>
          </div>
          {ADMIN_DATA.products.map((r, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '9px 0', borderTop: i ? `1px solid ${T.lineSoft}` : 'none',
            }}>
              <span style={{
                fontFamily: SERIF_NUM, fontStyle: 'italic', fontWeight: 500, fontSize: 14, color: T.maroon, width: 16,
              }}>{i+1}</span>
              <FoodMark kind={r.kind} size={28} bg={T.cream}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 11.5, letterSpacing: '.02em' }}>{r.name}</div>
                <div style={{ fontFamily: SERIF_NUM, fontStyle: 'italic', fontSize: 9.5, color: T.inkSoft, marginTop: 1 }}>提案 {r.click.toLocaleString()}</div>
              </div>
              <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 600, width: 40, textAlign: 'right' }}>{r.buy.toLocaleString()}</div>
              <div style={{ fontFamily: SERIF_NUM, fontStyle: 'italic', fontWeight: 500, fontSize: 14, color: T.maroon, width: 50, textAlign: 'right' }}>{r.rate}%</div>
            </div>
          ))}
        </article>

        {/* Editor's priority */}
        <article style={{
          background: T.paper, border: `1px solid ${T.line}`,
          padding: '18px 18px',
        }}>
          <header style={{
            display: 'flex', alignItems: 'baseline', gap: 8,
            paddingBottom: 10, borderBottom: `2px solid ${T.ink}`,
          }}>
            <Kicker style={{ fontSize: 9 }}>第 3 面 · 編集</Kicker>
            <span style={{ flex: 1 }}/>
            <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 10, color: T.maroon, cursor: 'pointer' }}>編集 →</span>
          </header>
          <h3 style={{
            margin: '10px 0 14px', fontFamily: SERIF, fontWeight: 700, fontSize: 18, letterSpacing: '.04em',
          }}>優先販促商品 <span style={{ fontStyle: 'italic', fontFamily: SERIF_NUM, fontWeight: 500, fontSize: 14, color: T.maroon }}>— Picks of the Day</span></h3>
          {ADMIN_DATA.priority.map((it, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 0', borderTop: i ? `1px solid ${T.lineSoft}` : 'none',
            }}>
              <FoodMark kind={it.kind} size={30} bg={T.cream}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 11.5, letterSpacing: '.02em' }}>{it.name}</div>
                <div style={{
                  marginTop: 4, height: 2, background: T.lineSoft,
                }}>
                  <div style={{
                    width: `${it.rate}%`, height: '100%',
                    background: it.on ? T.maroon : T.inkMute,
                  }}/>
                </div>
                <div style={{
                  marginTop: 3, fontFamily: SERIF_NUM, fontStyle: 'italic', fontSize: 9.5,
                  color: T.inkSoft,
                }}>CTR <b style={{ fontStyle: 'normal', color: ADA_INK, fontWeight: 600 }}>{it.rate}%</b></div>
              </div>
              <button style={{
                border: 0, cursor: 'pointer',
                width: 32, height: 18, borderRadius: 999,
                background: it.on ? T.maroon : T.lineSoft, position: 'relative',
              }}>
                <span style={{
                  position: 'absolute', top: 2, left: it.on ? 16 : 2,
                  width: 14, height: 14, borderRadius: 999, background: T.paper,
                  transition: 'left .15s', boxShadow: '0 1px 2px rgba(0,0,0,.2)',
                }}/>
              </button>
            </div>
          ))}
        </article>
      </div>
    </div>
  );
}

// ── MONITOR — live conversation wire ─────────────────────────
function AdminA_Monitor() {
  return (
    <div style={{ padding: '20px 28px', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <article style={{
        background: T.paper, border: `1px solid ${T.line}`,
        padding: '18px 22px',
      }}>
        <Kicker style={{ fontSize: 9 }}>◆ 第 2 面 · ワイヤー (60 分)</Kicker>
        <h2 style={{
          margin: '10px 0 8px', fontFamily: SERIF, fontWeight: 700, fontSize: 22, letterSpacing: '.02em',
        }}>会話モニター <span style={{ fontFamily: SERIF_NUM, fontStyle: 'italic', fontWeight: 500, fontSize: 14, color: T.maroon }}>— The Wire</span></h2>
        <div style={{
          fontFamily: SERIF, fontStyle: 'italic', fontSize: 11, color: T.inkMid,
          paddingBottom: 14, borderBottom: `1px solid ${T.line}`,
        }}>過去 60 分で 1,840 件の会話を観測。鶏もも肉 / 卵 / 鮭が頻出。</div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 16,
        }}>
          {ADMIN_DATA.feed.map((e, i) => (
            <div key={i} style={{
              padding: '12px 14px', background: ADA_BG, border: `1px solid ${T.lineSoft}`,
              display: 'flex', alignItems: 'baseline', gap: 10,
            }}>
              <span style={{ fontFamily: MONO, fontSize: 10, color: T.inkSoft, width: 38, flex: '0 0 auto' }}>{e.t}</span>
              <span style={{
                fontFamily: SANS, fontSize: 8, letterSpacing: '.25em', fontWeight: 700, color: e.tone,
                background: `${e.tone}22`, padding: '2px 7px', flex: '0 0 auto',
              }}>{e.tag}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 12.5, letterSpacing: '.02em' }}>{e.what}</div>
                <div style={{ fontFamily: SERIF_NUM, fontStyle: 'italic', fontSize: 9.5, color: T.inkSoft, marginTop: 2 }}>{e.who}</div>
              </div>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}

// ── AI control + campaigns — quick stub views ────────────────
function AdminA_AI() {
  return (
    <div style={{ padding: '20px 28px' }}>
      <article style={{
        background: T.paper, border: `1px solid ${T.line}`, padding: '20px 22px',
      }}>
        <Kicker style={{ fontSize: 9 }}>◆ 第 4 面 · 主筆</Kicker>
        <h2 style={{ margin: '10px 0 6px', fontFamily: SERIF, fontWeight: 700, fontSize: 22, letterSpacing: '.02em' }}>
          AI 制御 <span style={{ fontFamily: SERIF_NUM, fontStyle: 'italic', fontWeight: 500, fontSize: 14, color: T.maroon }}>— Editor in Chief</span>
        </h2>
        <div style={{
          fontFamily: SERIF, fontStyle: 'italic', fontSize: 11, color: T.inkMid,
          paddingBottom: 16, borderBottom: `1px solid ${T.line}`,
        }}>AI 編集主「ハル」の応答方針 · 優先販促 · 禁止語句</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 16 }}>
          {[
            { l: '応答の長さ', v: '中 (60 〜 120 字)', sub: '土日は短め' },
            { l: '言葉遣い',   v: '丁寧 / 上品',         sub: '関西方言は控えめ' },
            { l: '提案頻度',   v: '会話3回に1回',        sub: '押し付けは禁止' },
            { l: 'クーポン推奨', v: 'あり (会員限定)',     sub: '17 時以降は強める' },
          ].map((r, i) => (
            <div key={i} style={{
              padding: '14px 14px', background: ADA_BG, border: `1px solid ${T.lineSoft}`,
            }}>
              <div style={{ fontFamily: SANS, fontSize: 8.5, letterSpacing: '.25em', color: T.inkSoft, fontWeight: 700 }}>{r.l}</div>
              <div style={{ marginTop: 6, fontFamily: SERIF, fontWeight: 700, fontSize: 16, letterSpacing: '.04em' }}>{r.v}</div>
              <div style={{ marginTop: 4, fontFamily: SERIF, fontStyle: 'italic', fontSize: 11, color: T.inkMid }}>{r.sub}</div>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}

function AdminA_Campaigns() {
  const camps = [
    { name: '初冬の親子丼フェア', start: '11/24', end: '11/30', status: '配信中', rate: 31.1, kind: 'chicken' },
    { name: '兵庫の卵 早期割',     start: '11/20', end: '12/05', status: '配信中', rate: 27.7, kind: 'egg' },
    { name: '北海道 銀鮭 週末',    start: '11/29', end: '11/30', status: '予約',   rate:    0, kind: 'salmon' },
    { name: '春キャベツ 大特価',    start: '11/15', end: '11/22', status: '終了',   rate: 23.3, kind: 'cabbage' },
  ];
  return (
    <div style={{ padding: '20px 28px' }}>
      <article style={{
        background: T.paper, border: `1px solid ${T.line}`, padding: '20px 22px',
      }}>
        <Kicker style={{ fontSize: 9 }}>◆ 第 5 面 · 特集編成</Kicker>
        <h2 style={{ margin: '10px 0 6px', fontFamily: SERIF, fontWeight: 700, fontSize: 22, letterSpacing: '.02em' }}>
          キャンペーン <span style={{ fontFamily: SERIF_NUM, fontStyle: 'italic', fontWeight: 500, fontSize: 14, color: T.maroon }}>— Features</span>
        </h2>
        <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 11, color: T.inkMid, paddingBottom: 14, borderBottom: `1px solid ${T.line}` }}>
          現在配信中 2 件 · 予約 1 件 · 終了 1 件
        </div>

        <div style={{
          marginTop: 16, padding: '8px 0',
          display: 'flex', alignItems: 'baseline', gap: 12,
          fontFamily: SANS, fontSize: 8.5, letterSpacing: '.25em', fontWeight: 700, color: T.inkSoft,
          borderBottom: `1px solid ${T.line}`,
        }}>
          <span style={{ width: 36 }}>#</span>
          <span style={{ flex: 1 }}>キャンペーン名</span>
          <span style={{ width: 100 }}>期間</span>
          <span style={{ width: 80 }}>状態</span>
          <span style={{ width: 50, textAlign: 'right' }}>CVR</span>
        </div>
        {camps.map((c, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px 0', borderBottom: `1px solid ${T.lineSoft}`,
          }}>
            <span style={{ fontFamily: SERIF_NUM, fontStyle: 'italic', fontWeight: 500, fontSize: 16, color: T.maroon, width: 36 }}>{i+1}.</span>
            <FoodMark kind={c.kind} size={34} bg={T.cream}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 14, letterSpacing: '.02em' }}>{c.name}</div>
            </div>
            <div style={{ width: 100, fontFamily: SERIF_NUM, fontStyle: 'italic', fontSize: 11, color: T.inkMid }}>{c.start} — {c.end}</div>
            <div style={{ width: 80 }}>
              <span style={{
                padding: '3px 9px',
                fontFamily: SANS, fontSize: 8.5, fontWeight: 700, letterSpacing: '.2em',
                background: c.status === '配信中' ? T.maroon : c.status === '予約' ? T.gold : T.inkMute,
                color: T.ivory,
              }}>{c.status}</span>
            </div>
            <div style={{
              width: 50, textAlign: 'right',
              fontFamily: SERIF_NUM, fontStyle: 'italic', fontWeight: 500, fontSize: 16, color: c.rate ? T.maroon : T.inkMute,
            }}>{c.rate ? c.rate + '%' : '—'}</div>
          </div>
        ))}
      </article>
    </div>
  );
}

Object.assign(window, { AdminA });
