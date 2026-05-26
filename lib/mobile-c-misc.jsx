// ─────────────────────────────────────────────────────────────
// MOBILE · VARIANT C — Misc menu screens
// contact / terms / settings / account / orders / favorites
// ─────────────────────────────────────────────────────────────

// Generic form field
function C_Field({ label, value, type = 'text', onChange, hint, required }) {
  return (
    <label style={{ display: 'block', marginBottom: 14 }}>
      <div style={{ fontFamily: SANS, fontSize: 10.5, color: T.inkSoft, fontWeight: 700, letterSpacing: '.1em', marginBottom: 5 }}>
        {label}{required && <span style={{ color: T.sale, marginLeft: 4 }}>*</span>}
      </div>
      {type === 'textarea' ? (
        <textarea value={value || ''} onChange={(e) => onChange && onChange(e.target.value)} rows={4}
          style={{
            width: '100%', border: `1px solid ${T.outline}`, borderRadius: 8,
            padding: '10px 12px', fontFamily: SANS, fontSize: 13, color: T.ink, outline: 'none',
            resize: 'none', background: '#fff',
          }}/>
      ) : (
        <input type={type} value={value || ''} onChange={(e) => onChange && onChange(e.target.value)}
          style={{
            width: '100%', border: `1px solid ${T.outline}`, borderRadius: 8,
            padding: '10px 12px', fontFamily: SANS, fontSize: 13, color: T.ink, outline: 'none',
            background: '#fff',
          }}/>
      )}
      {hint && <div style={{ fontFamily: SANS, fontSize: 10.5, color: T.inkSoft, marginTop: 4 }}>{hint}</div>}
    </label>
  );
}

// ─────────────────────────────────────────────────────────────
// CONTACT / お問い合わせ
// ─────────────────────────────────────────────────────────────
function C_Contact({ pop }) {
  const [topic, setTopic] = React.useState('商品について');
  const [name, setName] = React.useState('田中 はるか');
  const [email, setEmail] = React.useState('haruka@example.com');
  const [message, setMessage] = React.useState('');
  const [sent, setSent] = React.useState(false);

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: T.bg, paddingBottom: 110 }} className="oas-noscroll">
      <C_TopBar leftBack onBack={pop} title="お問い合わせ" sub="2 営業日以内にご返信"/>
      <div style={{ height: SAFE_TOP + 48 }}/>

      <C_AiHint>
        よくある質問は <strong>AI アシスタント</strong> でもお答えできます
      </C_AiHint>

      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ fontFamily: SANS, fontSize: 10.5, color: T.inkSoft, fontWeight: 700, letterSpacing: '.1em', marginBottom: 8 }}>
          お問い合わせ種別 <span style={{ color: T.sale, marginLeft: 4 }}>*</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {['商品について', '店舗について', 'クーポン・ポイント', 'アプリの不具合', 'キッチンエール', 'その他'].map((t) => (
            <button key={t} onClick={() => setTopic(t)} style={{
              padding: '12px 10px', borderRadius: 8,
              background: topic === t ? T.brand : '#fff',
              color: topic === t ? '#fff' : T.ink,
              border: `1px solid ${topic === t ? T.brand : T.outline}`,
              cursor: 'pointer',
              fontFamily: SANS, fontWeight: 700, fontSize: 12,
              textAlign: 'left',
            }}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '20px 16px 0' }}>
        <C_Field label="お名前" value={name} onChange={setName} required/>
        <C_Field label="メールアドレス" type="email" value={email} onChange={setEmail} required/>
        <C_Field label="お問い合わせ内容" type="textarea" value={message} onChange={setMessage}
          hint="500 文字以内" required/>
      </div>

      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '12px 16px 22px', background: '#fff',
        borderTop: `1px solid ${T.outlineSoft}`,
      }}>
        <button onClick={() => setSent(true)} style={{
          width: '100%', background: sent ? T.fresh : T.brand, color: '#fff', border: 0, cursor: 'pointer',
          padding: '14px 0', borderRadius: 8,
          fontFamily: SANS, fontWeight: 800, fontSize: 13.5, letterSpacing: '.08em',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          {sent ? <><Icon name="check" size={16} color="#fff"/> 送信しました</> : '内容を確認して送信'}
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TERMS / 利用規約
// ─────────────────────────────────────────────────────────────
function C_Terms({ pop }) {
  const [tab, setTab] = React.useState('terms');
  const docs = {
    terms: {
      title: '利用規約',
      sections: [
        { h: '第1条 (適用)', p: '本規約は、株式会社関西フードマーケット (以下「当社」) が提供する阪急OASIS モバイルアプリ (以下「本サービス」) の利用条件を定めるものです。お客様 (以下「利用者」) と当社との間の本サービスの利用に関わる一切の関係に適用されます。' },
        { h: '第2条 (利用登録)', p: '本サービスの利用を希望する者は、当社の定める方法により利用登録を申請し、当社がこれを承認することによって、本サービスの利用契約が成立するものとします。' },
        { h: '第3条 (会員 ID 及びパスワードの管理)', p: '利用者は、自己の責任において、本サービスの会員 ID 及びパスワードを適切に管理するものとします。' },
        { h: '第4条 (禁止事項)', p: '利用者は、本サービスの利用にあたり、法令または公序良俗に違反する行為、犯罪行為に関連する行為、当社のサービスの運営を妨害するおそれのある行為等を行ってはなりません。' },
        { h: '第5条 (本サービスの提供の停止等)', p: '当社は、システムの保守点検等の理由により、利用者に事前に通知することなく、本サービスの全部または一部の提供を停止または中断することができるものとします。' },
      ],
    },
    privacy: {
      title: 'プライバシーポリシー',
      sections: [
        { h: '1. 個人情報の利用目的', p: '当社は、利用者の個人情報を、サービス提供・お問い合わせへの対応・キャンペーン情報の配信等の目的で利用します。' },
        { h: '2. 個人情報の第三者提供', p: '当社は、法令に基づく場合を除き、利用者の同意なく第三者に個人情報を提供することはありません。' },
        { h: '3. 個人情報の安全管理', p: '当社は、個人情報への不正アクセス・紛失・破壊・改ざん・漏洩等の防止のため、安全管理措置を講じます。' },
        { h: '4. AI による分析', p: '本サービスでは、利用者の購買履歴・検索履歴等を AI 分析し、最適な商品・レシピをご提案する場合があります。分析結果は個人を特定できない形で利用されます。' },
        { h: '5. お問い合わせ窓口', p: '個人情報の取り扱いに関するお問い合わせは、本アプリの「お問い合わせ」よりご連絡ください。' },
      ],
    },
  };
  const cur = docs[tab];

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: T.bg }} className="oas-noscroll">
      <C_TopBar leftBack onBack={pop} title="利用規約・プライバシー"/>
      <div style={{ height: SAFE_TOP + 48 }}/>

      {/* Tab switcher */}
      <div style={{ padding: '14px 16px 0', display: 'flex', gap: 6 }}>
        {[
          { k: 'terms', l: '利用規約' },
          { k: 'privacy', l: 'プライバシーポリシー' },
        ].map(t => (
          <button key={t.k} onClick={() => setTab(t.k)} style={{
            flex: 1, padding: '10px 12px', borderRadius: 8,
            background: tab === t.k ? T.brand : '#fff',
            color: tab === t.k ? '#fff' : T.ink,
            border: `1px solid ${tab === t.k ? T.brand : T.outline}`,
            cursor: 'pointer',
            fontFamily: SANS, fontWeight: 700, fontSize: 12,
          }}>{t.l}</button>
        ))}
      </div>

      <div style={{ padding: '16px 16px 32px' }}>
        <div style={{ fontFamily: SANS, fontSize: 10.5, color: T.inkSoft, fontWeight: 600, letterSpacing: '.05em' }}>
          最終更新 · 2026年4月1日
        </div>
        <h1 style={{ fontFamily: SANS, fontWeight: 900, fontSize: 20, margin: '8px 0 16px', color: T.ink }}>{cur.title}</h1>

        {cur.sections.map((s, i) => (
          <div key={i} style={{ marginBottom: 18 }}>
            <h3 style={{ fontFamily: SANS, fontWeight: 800, fontSize: 13, margin: '0 0 6px', color: T.ink }}>{s.h}</h3>
            <p style={{ fontFamily: SANS, fontSize: 12, color: T.inkMid, lineHeight: 1.85, margin: 0 }}>{s.p}</p>
          </div>
        ))}

        <div style={{
          background: T.paperAlt, border: `1px solid ${T.outline}`, borderRadius: 10,
          padding: '12px 14px', marginTop: 20,
          fontFamily: SANS, fontSize: 11, color: T.inkMid, lineHeight: 1.6,
        }}>
          以上 · 株式会社関西フードマーケット<br/>
          〒 530-0001 大阪市北区梅田 1-2-3
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SETTINGS / 通知・設定
// ─────────────────────────────────────────────────────────────
function C_Settings({ pop }) {
  const [notif, setNotif] = React.useState({
    sale: true, coupon: true, ai: true, news: false, push: true,
  });
  const [theme, setTheme] = React.useState('auto');
  const [font, setFont] = React.useState('m');
  return (
    <div style={{ height: '100%', overflowY: 'auto', background: T.paperAlt, paddingBottom: 32 }} className="oas-noscroll">
      <C_TopBar leftBack onBack={pop} title="通知・設定"/>
      <div style={{ height: SAFE_TOP + 48 }}/>

      {/* Notifications */}
      <div style={{ padding: '14px 16px 0' }}>
        <div style={{ fontFamily: SANS, fontSize: 10, color: T.inkSoft, fontWeight: 700, letterSpacing: '.15em', marginBottom: 6 }}>通知</div>
        <div style={{ background: '#fff', border: `1px solid ${T.outline}`, borderRadius: 10, overflow: 'hidden' }}>
          {[
            { k: 'sale',   l: '本日の特売', s: '毎朝 7:00 にお知らせ' },
            { k: 'coupon', l: 'クーポン情報', s: '使用期限が近いクーポンを通知' },
            { k: 'ai',     l: 'AI からの献立提案', s: '夕方 17:00 にお届け' },
            { k: 'news',   l: 'お知らせ・キャンペーン', s: '' },
            { k: 'push',   l: 'プッシュ通知を許可', s: '' },
          ].map((it, i) => (
            <div key={it.k} style={{
              padding: '14px 14px', display: 'flex', alignItems: 'center', gap: 12,
              borderTop: i ? `1px solid ${T.outlineSoft}` : 'none',
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, color: T.ink }}>{it.l}</div>
                {it.s && <div style={{ fontFamily: SANS, fontSize: 10.5, color: T.inkSoft, marginTop: 2 }}>{it.s}</div>}
              </div>
              <button onClick={() => setNotif(n => ({ ...n, [it.k]: !n[it.k] }))} style={{
                width: 44, height: 26, borderRadius: 99, border: 0, cursor: 'pointer',
                background: notif[it.k] ? T.orange : T.outline,
                position: 'relative', transition: 'background .15s',
                padding: 0,
              }}>
                <div style={{
                  position: 'absolute', top: 2, left: notif[it.k] ? 20 : 2,
                  width: 22, height: 22, borderRadius: 999, background: '#fff',
                  transition: 'left .15s', boxShadow: '0 2px 4px rgba(0,0,0,.15)',
                }}/>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Theme */}
      <div style={{ padding: '20px 16px 0' }}>
        <div style={{ fontFamily: SANS, fontSize: 10, color: T.inkSoft, fontWeight: 700, letterSpacing: '.15em', marginBottom: 6 }}>表示</div>
        <div style={{ background: '#fff', border: `1px solid ${T.outline}`, borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ padding: '14px 14px' }}>
            <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, color: T.ink, marginBottom: 8 }}>テーマ</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {[
                { k: 'light', l: 'ライト' },
                { k: 'dark',  l: 'ダーク' },
                { k: 'auto',  l: '自動' },
              ].map(t => (
                <button key={t.k} onClick={() => setTheme(t.k)} style={{
                  flex: 1, padding: '8px 10px', borderRadius: 6,
                  background: theme === t.k ? T.brand : '#fff',
                  color: theme === t.k ? '#fff' : T.ink,
                  border: `1px solid ${theme === t.k ? T.brand : T.outline}`,
                  cursor: 'pointer',
                  fontFamily: SANS, fontWeight: 700, fontSize: 11.5,
                }}>{t.l}</button>
              ))}
            </div>
          </div>
          <div style={{ padding: '14px 14px', borderTop: `1px solid ${T.outlineSoft}` }}>
            <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, color: T.ink, marginBottom: 8 }}>文字サイズ</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {[
                { k: 's', l: '小' },
                { k: 'm', l: '中' },
                { k: 'l', l: '大' },
                { k: 'xl', l: '特大' },
              ].map(t => (
                <button key={t.k} onClick={() => setFont(t.k)} style={{
                  flex: 1, padding: '8px 10px', borderRadius: 6,
                  background: font === t.k ? T.brand : '#fff',
                  color: font === t.k ? '#fff' : T.ink,
                  border: `1px solid ${font === t.k ? T.brand : T.outline}`,
                  cursor: 'pointer',
                  fontFamily: SANS, fontWeight: 700, fontSize: 11.5,
                }}>{t.l}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Account actions */}
      <div style={{ padding: '20px 16px 0' }}>
        <div style={{ fontFamily: SANS, fontSize: 10, color: T.inkSoft, fontWeight: 700, letterSpacing: '.15em', marginBottom: 6 }}>アカウント</div>
        <div style={{ background: '#fff', border: `1px solid ${T.outline}`, borderRadius: 10, overflow: 'hidden' }}>
          {[
            { l: 'パスワード変更',   c: T.ink },
            { l: 'メールアドレス変更', c: T.ink },
            { l: 'ログアウト',       c: T.inkMid },
            { l: '会員退会',         c: T.sale },
          ].map((a, i) => (
            <button key={a.l} style={{
              width: '100%', padding: '14px 14px', textAlign: 'left',
              background: '#fff', border: 0, cursor: 'pointer',
              borderTop: i ? `1px solid ${T.outlineSoft}` : 'none',
              fontFamily: SANS, fontWeight: 600, fontSize: 13, color: a.c,
            }}>{a.l}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ACCOUNT EDIT / 会員情報の変更
// ─────────────────────────────────────────────────────────────
function C_Account({ pop }) {
  const [name, setName] = React.useState('田中 はるか');
  const [kana, setKana] = React.useState('タナカ ハルカ');
  const [tel, setTel] = React.useState('090-1234-5678');
  const [zip, setZip] = React.useState('650-0021');
  const [addr, setAddr] = React.useState('兵庫県神戸市中央区三宮町 1-2-3');
  const [store, setStore] = React.useState('神戸三宮店');
  const [saved, setSaved] = React.useState(false);

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: T.bg, paddingBottom: 100 }} className="oas-noscroll">
      <C_TopBar leftBack onBack={pop} title="会員情報の変更"/>
      <div style={{ height: SAFE_TOP + 48 }}/>

      <div style={{ padding: '16px 16px 0' }}>
        <div style={{
          background: '#fff', border: `1px solid ${T.outline}`, borderRadius: 12,
          padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16,
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: 999,
            background: `linear-gradient(135deg, ${T.orange}, ${T.orangeDeep})`, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: SANS, fontWeight: 800, fontSize: 18,
          }}>田</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 13, color: T.ink }}>会員番号</div>
            <div style={{ fontFamily: NUM, fontSize: 11, color: T.inkSoft, marginTop: 2 }}>4901-2345-6789</div>
          </div>
          <Pill tone="point" size="xs">ゴールド</Pill>
        </div>

        <C_Field label="氏名" value={name} onChange={setName} required/>
        <C_Field label="フリガナ" value={kana} onChange={setKana}/>
        <C_Field label="電話番号" type="tel" value={tel} onChange={setTel} required/>
        <C_Field label="郵便番号" value={zip} onChange={setZip} hint="ハイフン無しでもOK"/>
        <C_Field label="住所" value={addr} onChange={setAddr}/>

        <div style={{ marginBottom: 14 }}>
          <div style={{ fontFamily: SANS, fontSize: 10.5, color: T.inkSoft, fontWeight: 700, letterSpacing: '.1em', marginBottom: 5 }}>
            よく行く店舗
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['神戸三宮店', '梅田店', '芦屋店', '西宮ガーデンズ店'].map(s => (
              <button key={s} onClick={() => setStore(s)} style={{
                padding: '8px 12px', borderRadius: 99,
                background: store === s ? T.brand : '#fff',
                color: store === s ? '#fff' : T.ink,
                border: `1px solid ${store === s ? T.brand : T.outline}`,
                cursor: 'pointer',
                fontFamily: SANS, fontWeight: 600, fontSize: 11.5,
              }}>{s}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '12px 16px 22px', background: '#fff',
        borderTop: `1px solid ${T.outlineSoft}`,
      }}>
        <button onClick={() => setSaved(true)} style={{
          width: '100%', background: saved ? T.fresh : T.brand, color: '#fff', border: 0, cursor: 'pointer',
          padding: '14px 0', borderRadius: 8,
          fontFamily: SANS, fontWeight: 800, fontSize: 13.5, letterSpacing: '.08em',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          {saved ? <><Icon name="check" size={16} color="#fff"/> 保存しました</> : '変更を保存'}
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ORDER HISTORY / 購入履歴
// ─────────────────────────────────────────────────────────────
function C_OrderHistory({ pop, push }) {
  const orders = [
    { d: '11/25', dow: '火', t: '神戸三宮店', total: 2840, n: 8, items: ['豚バラ薄切り', '玉ねぎ', '長ねぎ', '+5品'], pts: 28 },
    { d: '11/22', dow: '土', t: '神戸三宮店', total: 5120, n: 14, items: ['鶏もも肉', 'キャベツ', '卵', '+11品'], pts: 51 },
    { d: '11/20', dow: '木', t: 'キッチンエール', total: 6800, n: 1, items: ['週末セット 4日分'], pts: 68, delivery: true },
    { d: '11/18', dow: '火', t: '神戸三宮店', total: 1280, n: 5, items: ['食パン', '牛乳', '卵', '+2品'], pts: 12 },
    { d: '11/14', dow: '金', t: '梅田店',       total: 3420, n: 9, items: ['銀鮭', 'ご飯', '+7品'], pts: 34 },
  ];
  return (
    <div style={{ height: '100%', overflowY: 'auto', background: T.bg, paddingBottom: 24 }} className="oas-noscroll">
      <C_TopBar leftBack onBack={pop} title="購入履歴" sub={`過去 30 日 · ${orders.length} 件`}/>
      <div style={{ height: SAFE_TOP + 48 }}/>

      {/* Summary */}
      <div style={{ padding: '14px 16px 0' }}>
        <div style={{
          background: `linear-gradient(140deg, ${T.brand} 0%, #2a2520 100%)`,
          color: '#fff', borderRadius: 14, padding: '16px 16px',
        }}>
          <div style={{ fontFamily: SANS, fontSize: 10, color: T.orange, fontWeight: 700, letterSpacing: '.2em' }}>今月のお買物</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginTop: 8 }}>
            <Yen value={18420} size={28} style={{ color: '#fff' }}/>
            <div style={{ fontFamily: SANS, fontSize: 11, color: 'rgba(255,255,255,.6)' }}>· 5 回</div>
            <div style={{ flex: 1 }}/>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: NUM, fontWeight: 800, fontSize: 16, color: T.point }}>+193 pt</div>
              <div style={{ fontFamily: SANS, fontSize: 9.5, color: 'rgba(255,255,255,.5)' }}>獲得ポイント</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '14px 16px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {orders.map((o, i) => (
          <button key={i} onClick={() => push('product', { name: o.items[0], kind: 'chicken' })} style={{
            width: '100%', background: '#fff', border: `1px solid ${T.outline}`, borderRadius: 12,
            padding: '14px', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{
                textAlign: 'center', padding: '6px 10px', background: T.paperAlt, borderRadius: 6,
                flex: '0 0 auto',
              }}>
                <div style={{ fontFamily: NUM, fontWeight: 800, fontSize: 14, color: T.ink, lineHeight: 1 }}>{o.d}</div>
                <div style={{ fontFamily: SANS, fontSize: 9, color: T.inkSoft, marginTop: 2, fontWeight: 600 }}>{o.dow}</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {o.delivery && <Pill tone="point" size="xs">宅配</Pill>}
                  <span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 13, color: T.ink }}>{o.t}</span>
                </div>
                <div style={{ fontFamily: SANS, fontSize: 11, color: T.inkSoft, marginTop: 2 }}>{o.n} 品</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Yen value={o.total} size={16}/>
                <div style={{ fontFamily: NUM, fontSize: 10, color: T.point, fontWeight: 700, marginTop: 2 }}>+{o.pts} pt</div>
              </div>
            </div>
            <div style={{
              paddingTop: 8, borderTop: `1px solid ${T.outlineSoft}`,
              fontFamily: SANS, fontSize: 11, color: T.inkMid, lineHeight: 1.5,
            }}>
              {o.items.join(' · ')}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// FAVORITES / お気に入り商品
// ─────────────────────────────────────────────────────────────
function C_Favorites({ pop, push }) {
  const favs = [
    { name: '国産 鶏もも肉', sub: '300g',   price: 398, was: 598, kind: 'chicken', badge: '特売' },
    { name: '兵庫 朝採卵',   sub: '10個',   price: 178, was: 248, kind: 'egg',     badge: '特売' },
    { name: '北海道 牛乳',   sub: '1L',     price: 198, was: 258, kind: 'milk',    badge: '日配', badgeTone: 'fresh' },
    { name: '木綿豆腐',       sub: '300g',   price:  88,           kind: 'tofu',    badge: '日配', badgeTone: 'fresh' },
    { name: '神戸ベーカリー 食パン', sub: '6枚', price: 248, was: 298, kind: 'bread',  badge: '人気', badgeTone: 'orange' },
    { name: '北海道 銀鮭',   sub: '2切',    price: 498, was: 698, kind: 'salmon',  badge: '特売' },
  ];
  return (
    <div style={{ height: '100%', overflowY: 'auto', background: T.bg, paddingBottom: 24 }} className="oas-noscroll">
      <C_TopBar leftBack onBack={pop} title="お気に入り商品" sub={`${favs.length} 品`}
        right={<button onClick={() => push('search')} style={iconBtn}><Icon name="search" size={20} color="#fff"/></button>}/>
      <div style={{ height: SAFE_TOP + 48 }}/>

      <C_AiHint>
        AI が <strong>過去の購入</strong> から、お気に入りに似た新商品をご提案します
      </C_AiHint>

      <div style={{ padding: '14px 16px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {favs.map((p) => <ProductCard key={p.name} {...p} onTap={() => push('product', p)}/>)}
      </div>
    </div>
  );
}

Object.assign(window, { C_Contact, C_Terms, C_Settings, C_Account, C_OrderHistory, C_Favorites });
