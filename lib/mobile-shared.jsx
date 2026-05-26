// App shell (no more phone bezel) + common tab bar + safe-area constants.

const SAFE_TOP = 0;
const SAFE_BOT = 70;

// ── App shell — fills its responsive parent (.app-shell defined in Prototype.html)
function PhoneBezel({ children, paper = '#ffffff' }) {
  return (
    <div className="app-shell" style={{ background: paper }}>
      {children}
    </div>
  );
}

// ── Top bar (per-screen header) ──────────────────────────────────
function TopBar({ title, sub, dark, right, leftBack, onBack }) {
  const bg = dark ? T.brand : T.bg;
  const fg = dark ? T.bg : T.ink;
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50,
      paddingTop: SAFE_TOP, background: bg, color: fg,
      borderBottom: dark ? 'none' : `1px solid ${T.outlineSoft}`,
    }}>
      <div style={{
        height: 48, padding: '0 16px', display: 'flex', alignItems: 'center', gap: 10,
      }}>
        {leftBack ? (
          <button onClick={onBack} style={{
            width: 32, height: 32, border: 0, background: 'transparent', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: -8,
            color: fg,
          }}><Icon name="chevL" size={22}/></button>
        ) : null}
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 15, letterSpacing: '.03em' }}>{title}</div>
          {sub && <div style={{ fontFamily: SANS, fontWeight: 500, fontSize: 10.5, color: dark ? 'rgba(255,255,255,.7)' : T.inkSoft, marginTop: 1 }}>{sub}</div>}
        </div>
        {right}
      </div>
      {/* tan divider — matches site */}
      {!dark && <div style={{ height: 3, background: T.tan }}/>}
    </div>
  );
}

// ── Brand header (logo + utilities) — used on home ───────────────
function BrandHeader({ store = '神戸三宮店', notif = 2, onSearch, onNotif, onUser, onStore }) {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50,
      paddingTop: SAFE_TOP, background: T.brand,
    }}>
      <div style={{
        padding: '8px 16px 10px', display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <OasisLogo height={26}/>
        <button onClick={onStore} style={{
          flex: 1, marginLeft: 6, background: 'transparent', border: 0, padding: 0,
          cursor: onStore ? 'pointer' : 'default', textAlign: 'left', fontFamily: 'inherit', color: 'inherit',
        }}>
          <div style={{ fontFamily: SANS, fontWeight: 500, fontSize: 9, color: 'rgba(255,255,255,.55)', letterSpacing: '.2em' }}>YOUR STORE</div>
          <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 12, color: T.bg, marginTop: 1, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Icon name="pin" size={11} color={T.orange} sw={2}/>
            {store}
            <Icon name="chevD" size={11} color="rgba(255,255,255,.6)"/>
          </div>
        </button>
        <button onClick={onSearch} style={{ ...iconBtn, color: T.bg }}><Icon name="search" size={20} color="#fff"/></button>
        <button onClick={onNotif} style={{ ...iconBtn, position: 'relative', color: T.bg }}>
          <Icon name="bell" size={20} color="#fff"/>
          {notif > 0 && <span style={{
            position: 'absolute', top: 2, right: 2, width: 14, height: 14, borderRadius: 999,
            background: T.orange, color: '#fff',
            fontFamily: NUM, fontSize: 9, fontWeight: 800,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{notif}</span>}
        </button>
      </div>
      {/* tan divider — matches site brand DNA */}
      <div style={{ height: 4, background: T.tan }}/>
    </div>
  );
}

const iconBtn = {
  width: 36, height: 36, border: 0, background: 'transparent', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  borderRadius: 999,
};

// ── Standard 5-tab bottom nav ────────────────────────────────────
function TabBar({ active, onChange, accent = T.orange }) {
  const tabs = [
    { id: 'home',   ja: 'ホーム',  ic: 'home',   icF: 'homeF' },
    { id: 'flyer',  ja: 'チラシ',  ic: 'flyer',  icF: 'flyerF' },
    { id: 'coupon', ja: 'クーポン', ic: 'coupon', icF: 'couponF' },
    { id: 'recipe', ja: 'レシピ',   ic: 'book',   icF: 'bookF' },
    { id: 'mypage', ja: 'マイページ', ic: 'user',   icF: 'userF' },
  ];
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      paddingBottom: 'max(10px, env(safe-area-inset-bottom))', paddingTop: 8,
      background: '#fff',
      borderTop: `1px solid ${T.outlineSoft}`,
      display: 'flex', zIndex: 40,
      boxShadow: '0 -2px 12px rgba(0,0,0,.04)',
    }}>
      {tabs.map((t) => {
        const on = t.id === active;
        return (
          <button key={t.id} onClick={() => onChange(t.id)} style={{
            flex: 1, border: 0, background: 'transparent', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            padding: '4px 0',
            color: on ? accent : T.inkSoft,
          }}>
            <Icon name={on ? t.icF : t.ic} size={22} color={on ? accent : T.inkMid} fill={accent} sw={1.6}/>
            <span style={{
              fontFamily: SANS, fontWeight: on ? 700 : 500, fontSize: 10,
              color: on ? accent : T.inkMid, letterSpacing: '.02em',
            }}>{t.ja}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── Floating AI button (used on home variants) ───────────────────
function AiFab({ onClick, label = 'AIに相談', tone = 'orange', style }) {
  const bg = tone === 'dark' ? T.brand : T.orange;
  return (
    <button onClick={onClick} style={{
      position: 'absolute', right: 14, bottom: SAFE_BOT + 14, zIndex: 35,
      background: bg, color: '#fff', border: 0, cursor: 'pointer',
      borderRadius: 999, padding: '12px 16px 12px 14px',
      display: 'inline-flex', alignItems: 'center', gap: 8,
      boxShadow: `0 10px 24px ${tone === 'dark' ? 'rgba(0,0,0,.32)' : 'rgba(46,133,64,.45)'}`,
      ...style,
    }}>
      <span style={{
        width: 28, height: 28, borderRadius: 999, background: 'rgba(255,255,255,.22)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name="sparkleF" size={16} color="#fff"/>
      </span>
      <span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 13, letterSpacing: '.04em' }}>{label}</span>
    </button>
  );
}

// ── Product card (medium, for grids/horizontal scrolls) ──────────
function ProductCard({ name, sub, price, was, kind, badge, badgeTone = 'sale', width, onTap }) {
  const off = was ? Math.round((1 - price / was) * 100) : 0;
  return (
    <button onClick={onTap} style={{
      flex: width ? `0 0 ${width}px` : 1,
      width: width || 'auto',
      background: '#fff', border: `1px solid ${T.outline}`,
      borderRadius: 10, padding: 0, cursor: 'pointer', textAlign: 'left',
      fontFamily: 'inherit', color: 'inherit',
      overflow: 'hidden', position: 'relative',
    }}>
      <div style={{
        height: 110, background: T.paperAlt,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
      }}>
        <FoodMark kind={kind} size={84}/>
        {badge && <div style={{ position: 'absolute', top: 6, left: 6 }}>
          <Pill tone={badgeTone} size="xs">{badge}</Pill>
        </div>}
        {off > 0 && <div style={{
          position: 'absolute', bottom: 6, right: 6,
          background: T.sale, color: '#fff', borderRadius: 4,
          padding: '2px 6px',
          fontFamily: NUM, fontWeight: 900, fontSize: 12,
        }}>{off}% OFF</div>}
      </div>
      <div style={{ padding: '8px 10px 10px' }}>
        <div style={{
          fontFamily: SANS, fontSize: 11.5, fontWeight: 600, lineHeight: 1.35,
          color: T.ink, minHeight: 30,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{name}</div>
        {sub && <div style={{ fontFamily: SANS, fontSize: 10, color: T.inkSoft, marginTop: 2 }}>{sub}</div>}
        <div style={{ marginTop: 6, display: 'flex', alignItems: 'baseline', gap: 5 }}>
          <Yen value={price} size={16} tone={was ? 'sale' : 'ink'}/>
          {was && <Yen value={was} size={10} strike/>}
        </div>
      </div>
    </button>
  );
}

// ── Big banner image (for hero carousels) ────────────────────────
function HeroBanner({ tone = 'fresh', kicker, title, sub, badge, kind = 'cabbage', style, onTap }) {
  const palettes = {
    fresh:  { bg: '#dceac3', ink: '#243a17', accent: T.fresh },
    orange: { bg: '#ffe6c8', ink: '#5a3010', accent: T.orange },
    sale:   { bg: '#ffd8da', ink: '#7a0d11', accent: T.sale },
    cream:  { bg: '#fcefce', ink: '#5a4530', accent: T.brown },
    cool:   { bg: '#cfe1ef', ink: '#143049', accent: '#1f6ba8' },
  };
  const c = palettes[tone] || palettes.fresh;
  return (
    <button onClick={onTap} style={{
      width: '100%', height: 160, background: c.bg, color: c.ink,
      border: 0, padding: 0, cursor: 'pointer',
      borderRadius: 12, overflow: 'hidden', position: 'relative',
      textAlign: 'left', fontFamily: 'inherit',
      ...style,
    }}>
      <div style={{ position: 'absolute', right: -10, bottom: -10, opacity: .9 }}>
        <FoodMark kind={kind} size={170}/>
      </div>
      <div style={{ padding: '18px 18px 16px', position: 'relative', maxWidth: '64%' }}>
        {badge && <Pill tone="ink" size="xs" style={{ marginBottom: 8 }}>{badge}</Pill>}
        {kicker && <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 10, color: c.accent, letterSpacing: '.15em', marginBottom: 4 }}>{kicker}</div>}
        <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 22, lineHeight: 1.2, letterSpacing: '.01em' }}>{title}</div>
        {sub && <div style={{ fontFamily: SANS, fontSize: 11.5, color: c.ink, opacity: .75, marginTop: 6, lineHeight: 1.5 }}>{sub}</div>}
      </div>
    </button>
  );
}

Object.assign(window, {
  SAFE_TOP, SAFE_BOT,
  PhoneBezel, TopBar, BrandHeader, TabBar, AiFab,
  ProductCard, HeroBanner, iconBtn,
});
