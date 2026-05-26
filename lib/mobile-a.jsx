// ─────────────────────────────────────────────────────────────
// MOBILE · VARIANT A — "STANDARD"
// Friendly, bright, brand-faithful. Banner carousel on top,
// category grid, today's specials, recipe of the day, chirashi
// preview. The kind of layout AEON / Life / Seijo Ishii ship.
// ─────────────────────────────────────────────────────────────

function MobileA() {
  const [tab, setTab] = React.useState('home');
  const [overlay, setOverlay] = React.useState(null);

  return (
    <PhoneBezel paper={T.bg}>
      {tab === 'home'   && <A_Home   onAi={() => setOverlay('ai')} onRecipe={() => setOverlay('recipe')}/>}
      {tab === 'flyer'  && <A_Flyer/>}
      {tab === 'coupon' && <A_Coupon/>}
      {tab === 'recipe' && <A_Recipe onOpen={() => setOverlay('recipe')}/>}
      {tab === 'mypage' && <A_MyPage/>}

      <TabBar active={tab} onChange={setTab}/>

      {tab === 'home' && <AiFab onClick={() => setOverlay('ai')}/>}

      {overlay === 'ai'     && <AiOverlay onClose={() => setOverlay(null)} onOpenRecipe={() => setOverlay('recipe')}/>}
      {overlay === 'recipe' && <RecipeOverlay onClose={() => setOverlay(null)}/>}
    </PhoneBezel>
  );
}

// ─────────────────────────────────────────────────────────────
// HOME — Standard layout
// ─────────────────────────────────────────────────────────────
function A_Home({ onAi, onRecipe }) {
  const [banner, setBanner] = React.useState(0);
  const banners = [
    { tone: 'fresh',  kicker: '今週のおすすめ', title: '新鮮 朝採れ野菜', sub: '兵庫の契約農家から、毎朝直送。', kind: 'cabbage', badge: '本日入荷' },
    { tone: 'sale',   kicker: 'タイムセール', title: '夕方5時から\n20%OFF',  sub: 'お惣菜・お寿司・お肉が対象', kind: 'bento',   badge: '17:00〜' },
    { tone: 'orange', kicker: '阪急キッチンエール', title: '食品宅配 会員募集中', sub: 'ご自宅まで毎日お届け。', kind: 'truck', badge: '新規' },
  ];

  return (
    <div style={{ height: '100%', overflowY: 'auto', background: T.bg, paddingBottom: SAFE_BOT + 80 }} className="oas-noscroll">
      <BrandHeader/>
      <div style={{ height: SAFE_TOP + 60 }}/>

      {/* Point card strip — most-used utility, pinned visible */}
      <A_PointStrip/>

      {/* Banner carousel */}
      <div style={{ padding: '14px 16px 0' }}>
        <HeroBanner {...banners[banner]}/>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 5, marginTop: 8 }}>
          {banners.map((_, i) => (
            <button key={i} onClick={() => setBanner(i)} style={{
              width: i === banner ? 16 : 5, height: 5, borderRadius: 99,
              background: i === banner ? T.orange : T.outline, border: 0, cursor: 'pointer',
              transition: 'all .2s',
            }}/>
          ))}
        </div>
      </div>

      {/* Category quick access */}
      <div style={{ padding: '18px 16px 0' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4,
        }}>
          {[
            { l: 'チラシ', i: 'flyer', c: T.orange },
            { l: 'クーポン', i: 'coupon', c: T.point },
            { l: 'レシピ',  i: 'book', c: T.fresh },
            { l: '店舗',    i: 'store', c: T.brown },
            { l: 'ポイント', i: 'point', c: T.point },
            { l: 'キッチンエール', i: 'truck', c: T.orange },
            { l: 'お知らせ', i: 'bell', c: T.brown },
            { l: 'すべて',   i: 'grid', c: T.inkMid },
          ].map((q) => (
            <button key={q.l} style={{
              background: 'transparent', border: 0, padding: '10px 0 6px', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: '#fff', border: `1px solid ${T.outline}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name={q.i} size={22} color={q.c} sw={1.7}/>
              </div>
              <span style={{ fontFamily: SANS, fontSize: 10.5, fontWeight: 600, color: T.ink, letterSpacing: '.02em' }}>{q.l}</span>
            </button>
          ))}
        </div>
      </div>

      {/* AI recommendation strip — peer to specials, not the hero */}
      <div style={{ marginTop: 22, padding: '0 16px' }}>
        <button onClick={onAi} style={{
          width: '100%', textAlign: 'left', cursor: 'pointer', border: 0,
          background: `linear-gradient(135deg, #fff7ed 0%, #ffe6c8 100%)`,
          borderRadius: 12, padding: '14px 14px',
          display: 'flex', alignItems: 'center', gap: 12,
          boxShadow: `inset 0 0 0 1px ${T.tanSoft}`,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 999,
            background: T.orange, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flex: '0 0 auto', boxShadow: '0 4px 10px rgba(46,133,64,.3)',
          }}>
            <Icon name="sparkleF" size={22} color="#fff"/>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 13, color: T.ink, display: 'flex', alignItems: 'center', gap: 6 }}>
              AIアシスタントに相談 <Pill tone="orange" size="xs">NEW</Pill>
            </div>
            <div style={{ fontFamily: SANS, fontSize: 11, color: T.inkMid, marginTop: 3, lineHeight: 1.4 }}>
              「今夜の献立は？」「鮭はどこ？」などお気軽に
            </div>
          </div>
          <Icon name="chevR" size={18} color={T.orange}/>
        </button>
      </div>

      {/* Today's specials */}
      <div style={{ marginTop: 26 }}>
        <SectionHead title="本日の特売" en="Today's Deals" more="もっと見る"/>
        <div style={{
          display: 'flex', gap: 10, padding: '0 16px',
          overflowX: 'auto',
        }} className="oas-noscroll">
          {[
            { name: '国産 鶏もも肉',  sub: '300g',  price: 398, was: 598, kind: 'chicken', badge: '特売' },
            { name: '兵庫 朝採卵',    sub: '10個入', price: 178, was: 248, kind: 'egg',     badge: '本日限り', badgeTone: 'orange' },
            { name: '北海道 銀鮭',    sub: '2切',   price: 498, was: 698, kind: 'salmon',  badge: '特売' },
            { name: '春キャベツ',     sub: '1玉',   price:  98, was: 158, kind: 'cabbage', badge: '青果' , badgeTone: 'fresh' },
            { name: '北海道 牛乳',    sub: '1L',    price: 198, was: 258, kind: 'milk',    badge: '日配', badgeTone: 'fresh' },
          ].map((p) => <ProductCard key={p.name} {...p} width={142}/>)}
        </div>
      </div>

      {/* Recipe of the day */}
      <div style={{ marginTop: 26 }}>
        <SectionHead title="今日のおすすめレシピ" en="Recipe" more="一覧"/>
        <div style={{ padding: '0 16px' }}>
          <button onClick={onRecipe} style={{
            width: '100%', background: '#fff', border: `1px solid ${T.outline}`, borderRadius: 12,
            padding: 0, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
            display: 'flex', overflow: 'hidden',
          }}>
            <div style={{
              width: 130, height: 130, background: '#fdf2db',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto',
            }}>
              <FoodMark kind="oyakodon" size={110}/>
            </div>
            <div style={{ padding: '12px 14px', flex: 1, minWidth: 0 }}>
              <Pill tone="orangeSoft" size="xs">AI おすすめ</Pill>
              <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 16, marginTop: 6, color: T.ink, letterSpacing: '.02em' }}>
                ふんわり親子丼
              </div>
              <div style={{ fontFamily: SANS, fontSize: 10.5, color: T.inkMid, marginTop: 4, lineHeight: 1.5 }}>
                特売の鶏もも肉と兵庫の<br/>朝採り卵で 15 分。
              </div>
              <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 10, fontFamily: SANS, fontSize: 10, color: T.inkSoft }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}><Icon name="clock" size={11}/>15 分</span>
                <span>4 人前</span>
                <span style={{ color: T.sale, fontWeight: 700 }}>材料 ¥1,180</span>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Chirashi preview */}
      <div style={{ marginTop: 26 }}>
        <SectionHead title="今週のチラシ" en="Weekly Flyer" more="全店舗"/>
        <div style={{
          display: 'flex', gap: 10, padding: '0 16px',
          overflowX: 'auto',
        }} className="oas-noscroll">
          {[
            { date: '11/26 水', label: '本日の市場',   kinds: ['chicken','egg','salmon','cabbage'] },
            { date: '11/27 木', label: '木曜の市',     kinds: ['salad','tomato','rice','tofu'] },
            { date: '11/29 土', label: '週末特売',     kinds: ['beef','sushi','bread','apple'] },
          ].map((c, i) => (
            <div key={i} style={{
              flex: '0 0 156px', background: '#fff', border: `1px solid ${T.outline}`, borderRadius: 10,
              overflow: 'hidden',
            }}>
              <div style={{
                background: T.brand, color: '#fff', padding: '8px 12px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: 10, letterSpacing: '.06em' }}>{c.date}</span>
                {i === 0 && <Pill tone="orange" size="xs" style={{ padding: '2px 6px' }}>本日</Pill>}
              </div>
              <div style={{ padding: 10 }}>
                <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 13, color: T.ink, marginBottom: 6 }}>{c.label}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                  {c.kinds.map((k, j) => (
                    <div key={j} style={{
                      background: T.paperAlt, padding: 4, display: 'flex', flexDirection: 'column',
                      alignItems: 'center', borderRadius: 4,
                    }}>
                      <FoodMark kind={k} size={36}/>
                      <span style={{ fontFamily: NUM, fontWeight: 800, fontSize: 11, color: T.sale, marginTop: 2 }}>
                        ¥{[398, 498, 178, 98, 280, 198, 298, 158, 698, 1280, 220, 248][i * 4 + j] || 198}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured: Kitchen Yell (delivery) */}
      <div style={{ marginTop: 22, padding: '0 16px' }}>
        <div style={{
          background: T.pointSoft, border: `1px solid ${T.point}`, borderRadius: 12,
          padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            width: 50, height: 50, borderRadius: 999, background: T.point, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto',
          }}>
            <Icon name="truck" size={26} color="#fff"/>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 13, color: T.member }}>阪急キッチンエール</div>
            <div style={{ fontFamily: SANS, fontSize: 11, color: T.inkMid, marginTop: 2 }}>食品宅配で年間 100 万件以上のお届け実績</div>
          </div>
          <button style={{
            background: T.point, color: '#fff', border: 0, cursor: 'pointer',
            padding: '8px 12px', borderRadius: 6,
            fontFamily: SANS, fontWeight: 800, fontSize: 11, letterSpacing: '.05em',
          }}>会員登録</button>
        </div>
      </div>

      {/* Recommended */}
      <div style={{ marginTop: 26 }}>
        <SectionHead title="あなたへのおすすめ" en="For You" more="もっと見る"/>
        <div style={{
          padding: '0 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
        }}>
          {[
            { name: '木綿豆腐',     sub: '300g',   price:  88, kind: 'tofu',   badge: '日配', badgeTone: 'fresh' },
            { name: '北海道産 玉ねぎ', sub: '3個入', price: 198, kind: 'onion',  badge: '青果', badgeTone: 'fresh' },
            { name: '神戸ベーカリー 食パン', sub: '6枚', price: 248, was: 298, kind: 'bread', badge: '人気', badgeTone: 'orange' },
            { name: 'プレミアム ヨーグルト', sub: '400g', price: 268, kind: 'yogurt', badge: '日配', badgeTone: 'fresh' },
          ].map((p) => <ProductCard key={p.name} {...p}/>)}
        </div>
      </div>

      {/* News */}
      <div style={{ marginTop: 26 }}>
        <SectionHead title="お知らせ" en="News" more="一覧"/>
        <div style={{ padding: '0 16px' }}>
          {[
            { d: '11/24', t: '年末年始の営業時間について', tag: '重要', tagTone: 'sale' },
            { d: '11/22', t: '北海道フェア 開催のお知らせ', tag: 'イベント', tagTone: 'orange' },
            { d: '11/20', t: 'プライベートブランド 新商品入荷', tag: '新商品', tagTone: 'fresh' },
          ].map((n, i) => (
            <div key={i} style={{
              padding: '12px 0', display: 'flex', alignItems: 'baseline', gap: 10,
              borderTop: i ? `1px solid ${T.outlineSoft}` : `1px solid ${T.outlineSoft}`,
            }}>
              <span style={{ fontFamily: NUM, fontSize: 11, color: T.inkSoft, fontWeight: 600, flex: '0 0 38px' }}>{n.d}</span>
              <Pill tone={n.tagTone} size="xs">{n.tag}</Pill>
              <span style={{ fontFamily: SANS, fontSize: 12.5, color: T.ink, flex: 1, fontWeight: 500 }}>{n.t}</span>
              <Icon name="chevR" size={14} color={T.inkMute}/>
            </div>
          ))}
        </div>
      </div>

      {/* Group brands footer */}
      <div style={{ marginTop: 28, padding: '20px 16px', background: T.paperAlt }}>
        <div style={{ fontFamily: SANS, fontSize: 9.5, fontWeight: 700, color: T.inkSoft, letterSpacing: '.2em', marginBottom: 10 }}>関西フードマーケット グループ</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6 }}>
          {['阪急OASIS', 'イズミヤ', 'デイリーカナート', '関西スーパー'].map(b => (
            <div key={b} style={{
              background: '#fff', border: `1px solid ${T.outline}`, borderRadius: 6,
              padding: '10px 10px', fontFamily: SANS, fontSize: 11, fontWeight: 700, color: T.ink, textAlign: 'center',
            }}>{b}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function A_PointStrip() {
  return (
    <div style={{
      margin: '12px 16px 0', background: '#fff',
      border: `1px solid ${T.outline}`, borderRadius: 12,
      padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <div style={{
        width: 56, height: 36, borderRadius: 6,
        background: `linear-gradient(135deg, ${T.member} 0%, #a01a23 100%)`,
        color: '#fff',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        flex: '0 0 auto', boxShadow: '0 2px 6px rgba(107,11,20,.3)',
      }}>
        <span style={{ fontFamily: SANS, fontSize: 8, fontWeight: 700, letterSpacing: '.1em' }}>HANKYU</span>
        <span style={{ fontFamily: NUM, fontSize: 10, fontWeight: 900, fontStyle: 'italic' }}>S point</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: SANS, fontSize: 10, color: T.inkSoft, fontWeight: 600 }}>田中 はるか 様</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 1 }}>
          <span className="oas-num" style={{ fontFamily: NUM, fontWeight: 900, fontSize: 22, color: T.ink, letterSpacing: '-.01em' }}>1,248</span>
          <span style={{ fontFamily: SANS, fontSize: 10.5, color: T.inkMid, fontWeight: 600 }}>pt</span>
          <span style={{ fontFamily: SANS, fontSize: 9.5, color: T.point, fontWeight: 700, marginLeft: 6 }}>+12pt 今日</span>
        </div>
      </div>
      <button style={{
        background: T.brand, color: '#fff', border: 0, cursor: 'pointer',
        padding: '10px 14px', borderRadius: 8,
        display: 'inline-flex', alignItems: 'center', gap: 5,
        fontFamily: SANS, fontWeight: 700, fontSize: 11,
      }}>
        <Icon name="barcode" size={15} color="#fff"/>
        提示
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// FLYER tab
// ─────────────────────────────────────────────────────────────
function A_Flyer() {
  return (
    <div style={{ height: '100%', overflowY: 'auto', background: T.bg, paddingBottom: SAFE_BOT + 30 }} className="oas-noscroll">
      <TopBar title="チラシ" sub="神戸三宮店" right={<button style={iconBtn}><Icon name="filter" size={20} color={T.ink}/></button>}/>
      <div style={{ height: SAFE_TOP + 51 }}/>

      {/* Date tabs */}
      <div style={{
        display: 'flex', gap: 6, padding: '12px 16px 0', overflowX: 'auto',
      }} className="oas-noscroll">
        {[
          { d: '11/26', day: '水', on: true, label: '本日' },
          { d: '11/27', day: '木' },
          { d: '11/28', day: '金' },
          { d: '11/29', day: '土' },
          { d: '11/30', day: '日' },
        ].map((d) => (
          <button key={d.d} style={{
            flex: '0 0 auto', padding: '10px 14px', borderRadius: 10,
            background: d.on ? T.orange : '#fff',
            color: d.on ? '#fff' : T.ink,
            border: `1px solid ${d.on ? T.orange : T.outline}`,
            cursor: 'pointer', textAlign: 'center',
          }}>
            <div style={{ fontFamily: NUM, fontWeight: 800, fontSize: 14 }}>{d.d}</div>
            <div style={{ fontFamily: SANS, fontSize: 9.5, fontWeight: 600, marginTop: 1, opacity: d.on ? .9 : .6 }}>{d.day} {d.label || ''}</div>
          </button>
        ))}
      </div>

      {/* Flyer hero */}
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
              { name: '銀鮭 2切', sub: '北海道', price: 498, was: 698, kind: 'salmon' },
              { name: '兵庫 朝採卵', sub: '10個入', price: 178, was: 248, kind: 'egg' },
              { name: '春キャベツ', sub: '1玉', price: 98, was: 158, kind: 'cabbage' },
              { name: '北海道牛乳', sub: '1L', price: 198, was: 258, kind: 'milk' },
              { name: '木綿豆腐', sub: '300g', price: 88, was: 128, kind: 'tofu' },
            ].map((p, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: 8, padding: '10px 10px 10px',
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6,
                border: `1px solid ${T.outline}`,
                position: 'relative',
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
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section: 青果 */}
      <SectionA_FlyerCategory title="青果" items={[
        { name: '玉ねぎ', sub: '3個入', price: 198, was: 248, kind: 'onion' },
        { name: 'トマト', sub: '4個入', price: 298, was: 380, kind: 'tomato' },
        { name: 'りんご', sub: '3個入', price: 380, was: 480, kind: 'apple' },
        { name: 'バナナ', sub: '1房',   price: 158, was: 198, kind: 'banana' },
      ]} style={{ marginTop: 20 }}/>

      <SectionA_FlyerCategory title="精肉" items={[
        { name: '牛切落し', sub: '300g', price: 698, was: 980, kind: 'beef' },
        { name: '豚バラ薄切り', sub: '300g', price: 498, was: 680, kind: 'pork' },
      ]}/>

      <SectionA_FlyerCategory title="鮮魚" items={[
        { name: '握り寿司 12貫', sub: '本まぐろ入', price: 980, was: 1280, kind: 'sushi' },
        { name: '刺身盛合せ',     sub: '3点盛',     price: 698, was: 980, kind: 'fish' },
      ]}/>
    </div>
  );
}

function SectionA_FlyerCategory({ title, items, style }) {
  return (
    <div style={{ marginTop: 22, ...style }}>
      <SectionHead title={title} more={`すべて (${items.length * 6})`}/>
      <div style={{ padding: '0 16px', display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }}>
        {items.map((p, i) => <ProductCard key={i} {...p} badge="特売" badgeTone="sale"/>)}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// COUPON tab
// ─────────────────────────────────────────────────────────────
function A_Coupon() {
  const [used, setUsed] = React.useState({});
  const coupons = [
    { brand: '日配 ナガセ',  title: '兵庫 朝採卵 10個入',    amt: 50,  unit: '¥', tail: '本日 21:00 まで', kind: 'egg',     hot: true },
    { brand: 'デリ',         title: 'お惣菜 全品',            amt: 20,  unit: '%', tail: '17:00 以降',     kind: 'bento' },
    { brand: '日配 よつば',  title: '北海道 牛乳',             amt: 80,  unit: '¥', tail: '11/30 まで',     kind: 'milk' },
    { brand: 'ベーカリー',   title: '食パン 6枚切',            amt: 60,  unit: '¥', tail: '夕方の焼上り',   kind: 'bread' },
    { brand: '鮮魚',         title: '鮮魚 全品',               amt: 15,  unit: '%', tail: '本日限り',       kind: 'salmon' },
  ];
  return (
    <div style={{ height: '100%', overflowY: 'auto', background: T.bg, paddingBottom: SAFE_BOT + 30 }} className="oas-noscroll">
      <TopBar title="クーポン" sub={`${coupons.length} 枚 · 神戸三宮店`}/>
      <div style={{ height: SAFE_TOP + 51 }}/>

      {/* Savings summary */}
      <div style={{ padding: '14px 16px 0' }}>
        <div style={{
          background: `linear-gradient(135deg, ${T.orange} 0%, ${T.orangeDeep} 100%)`,
          color: '#fff', borderRadius: 12, padding: '14px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 6px 16px rgba(46,133,64,.3)',
        }}>
          <div>
            <div style={{ fontFamily: SANS, fontSize: 11, opacity: .9, fontWeight: 600 }}>合計お得額</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 2 }}>
              <span style={{ fontSize: 14, fontFamily: SANS, fontWeight: 700 }}>¥</span>
              <span style={{ fontFamily: NUM, fontSize: 32, fontWeight: 900, letterSpacing: '-.02em' }}>420</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: SANS, fontSize: 11, opacity: .9 }}>有効期限</div>
            <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, marginTop: 2 }}>本日 21:00 まで</div>
          </div>
        </div>
      </div>

      {/* Filter chips */}
      <div style={{ padding: '14px 16px 0', display: 'flex', gap: 6, overflowX: 'auto' }} className="oas-noscroll">
        {['すべて', '本日限り', '日配', '精肉', '鮮魚', '惣菜', 'ベーカリー'].map((c, i) => (
          <button key={c} style={{
            padding: '6px 12px', borderRadius: 99,
            background: i === 0 ? T.ink : '#fff',
            color: i === 0 ? '#fff' : T.ink,
            border: `1px solid ${i === 0 ? T.ink : T.outline}`,
            cursor: 'pointer',
            fontFamily: SANS, fontWeight: 600, fontSize: 11,
            flex: '0 0 auto',
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
            {c.hot && <div style={{
              position: 'absolute', top: 8, right: 8, zIndex: 1,
            }}><Pill tone="orange" size="xs">本日限り</Pill></div>}
            {/* left big amount */}
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
              }}>{c.unit === '¥' ? '' : ''}{c.amt}</span>
              <span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 14, color: c.hot ? T.orangeDeep : T.ink, marginTop: 2 }}>
                {c.unit === '¥' ? '円' : '％'}OFF
              </span>
              {/* serrated cut */}
              <div style={{
                position: 'absolute', right: -6, top: 8, bottom: 8, width: 12,
                backgroundImage: `radial-gradient(circle at 6px 6px, ${T.bg} 4px, transparent 4px)`,
                backgroundSize: '12px 12px',
              }}/>
            </div>
            {/* right detail */}
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
// RECIPE tab
// ─────────────────────────────────────────────────────────────
function A_Recipe({ onOpen }) {
  const cats = ['すべて', '時短', '節約', '今日の特売活用', 'お弁当', '簡単晩ごはん'];
  const recipes = [
    { t: 'ふんわり親子丼',    sub: '15分・4人前', kcal: 628, mins: 15, kind: 'oyakodon', tag: 'AIおすすめ', tagTone: 'orangeSoft' },
    { t: '肉じゃが',          sub: '30分・4人前', kcal: 480, mins: 30, kind: 'nikujaga',  tag: '定番' },
    { t: '塩鮭の塩焼き',      sub: '10分・2人前', kcal: 220, mins: 10, kind: 'salmon',    tag: '時短', tagTone: 'fresh' },
    { t: '彩り野菜サラダ',    sub: '8分・2人前',  kcal: 180, mins: 8,  kind: 'salad',     tag: 'ヘルシー', tagTone: 'fresh' },
    { t: 'お味噌汁',          sub: '5分・4人前',  kcal: 80,  mins: 5,  kind: 'misoSoup',  tag: '時短', tagTone: 'fresh' },
    { t: 'お弁当 三色丼',     sub: '20分',        kcal: 540, mins: 20, kind: 'bento',     tag: 'お弁当' },
  ];
  return (
    <div style={{ height: '100%', overflowY: 'auto', background: T.bg, paddingBottom: SAFE_BOT + 30 }} className="oas-noscroll">
      <TopBar title="レシピ" sub="今日の特売を使った提案" right={
        <button style={iconBtn}><Icon name="search" size={20} color={T.ink}/></button>
      }/>
      <div style={{ height: SAFE_TOP + 51 }}/>

      {/* AI prompt strip */}
      <div style={{ padding: '14px 16px 0' }}>
        <button onClick={onOpen} style={{
          width: '100%', textAlign: 'left', cursor: 'pointer', border: 0,
          background: T.brand, color: '#fff',
          borderRadius: 12, padding: '14px',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 999,
            background: T.orange, display: 'flex', alignItems: 'center', justifyContent: 'center',
            flex: '0 0 auto',
          }}>
            <Icon name="sparkleF" size={20} color="#fff"/>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 13 }}>AIに献立を相談</div>
            <div style={{ fontFamily: SANS, fontSize: 11, color: 'rgba(255,255,255,.7)', marginTop: 2 }}>冷蔵庫の食材から提案します</div>
          </div>
          <Icon name="chevR" size={18} color="#fff"/>
        </button>
      </div>

      {/* Category chips */}
      <div style={{ padding: '14px 16px 0', display: 'flex', gap: 6, overflowX: 'auto' }} className="oas-noscroll">
        {cats.map((c, i) => (
          <button key={c} style={{
            padding: '6px 12px', borderRadius: 99,
            background: i === 0 ? T.ink : '#fff',
            color: i === 0 ? '#fff' : T.ink,
            border: `1px solid ${i === 0 ? T.ink : T.outline}`,
            cursor: 'pointer',
            fontFamily: SANS, fontWeight: 600, fontSize: 11,
            flex: '0 0 auto',
          }}>{c}</button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ padding: '14px 16px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {recipes.map((r, i) => (
          <button key={i} onClick={onOpen} style={{
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
// MY PAGE tab
// ─────────────────────────────────────────────────────────────
function A_MyPage() {
  return (
    <div style={{ height: '100%', overflowY: 'auto', background: T.paperAlt, paddingBottom: SAFE_BOT + 30 }} className="oas-noscroll">
      <TopBar title="マイページ" dark right={<button style={{ ...iconBtn, color: '#fff' }}><Icon name="settings" size={20} color="#fff"/></button>}/>
      <div style={{ height: SAFE_TOP + 51 }}/>

      {/* Profile card */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{
          background: '#fff', borderRadius: 12, padding: '18px 16px',
          border: `1px solid ${T.outline}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 999,
              background: T.shelf, color: T.brown,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: SANS, fontWeight: 800, fontSize: 22,
            }}>田</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 15, color: T.ink }}>田中 はるか 様</div>
              <div style={{ fontFamily: SANS, fontSize: 10.5, color: T.inkSoft, marginTop: 2 }}>会員番号 4901-2345-6789</div>
              <div style={{ marginTop: 4 }}>
                <Pill tone="point" size="xs">ゴールド会員</Pill>
              </div>
            </div>
          </div>
          {/* point summary */}
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

          <button style={{
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

      {/* Menu list */}
      <div style={{ padding: '16px 16px 0' }}>
        {[
          { g: '購入', items: [
            { i: 'list', l: '購入履歴' },
            { i: 'cart', l: 'お気に入り商品' },
            { i: 'truck', l: '阪急キッチンエール' },
          ]},
          { g: '会員', items: [
            { i: 'point', l: 'Sポイント明細' },
            { i: 'gift', l: 'クラブ・エフカード' },
            { i: 'user', l: '会員情報の変更' },
          ]},
          { g: 'その他', items: [
            { i: 'info', l: 'お問い合わせ' },
            { i: 'book', l: '利用規約・プライバシー' },
            { i: 'settings', l: '通知・設定' },
          ]},
        ].map((s) => (
          <div key={s.g} style={{ marginTop: 16 }}>
            <div style={{ fontFamily: SANS, fontSize: 10, color: T.inkSoft, fontWeight: 700, letterSpacing: '.15em', marginBottom: 6 }}>{s.g}</div>
            <div style={{ background: '#fff', border: `1px solid ${T.outline}`, borderRadius: 10, overflow: 'hidden' }}>
              {s.items.map((it, i) => (
                <div key={i} style={{
                  padding: '14px 14px', display: 'flex', alignItems: 'center', gap: 12,
                  borderTop: i ? `1px solid ${T.outlineSoft}` : 'none',
                  cursor: 'pointer',
                }}>
                  <Icon name={it.i} size={20} color={T.brown} sw={1.6}/>
                  <span style={{ flex: 1, fontFamily: SANS, fontSize: 13, fontWeight: 600, color: T.ink }}>{it.l}</span>
                  <Icon name="chevR" size={14} color={T.inkMute}/>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { MobileA, A_Flyer, A_Coupon, A_Recipe, A_MyPage, A_PointStrip });
