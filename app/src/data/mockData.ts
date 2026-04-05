export interface Event {
  id: string;
  title: string;
  type: 'study' | 'discussion' | 'online' | 'meetup' | 'reading';
  date: string;
  time: string;
  location: string;
  capacity: number;
  attendees: number;
  tags: string[];
  description: string;
  host: string;
  status: 'upcoming' | 'past';
  minutes?: EventMinutes;
}

export interface EventMinutes {
  summary: string;
  keyPoints: string[];
  resources: { title: string; url: string }[];
  nextSteps: string[];
}

export interface Topic {
  id: string;
  slug: string;
  category: 'singularity' | 'lev' | 'how-to-live' | 'society';
  title: string;
  subtitle: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  overview: string;
  content: string;
  keyFigures: { name: string; role: string }[];
  relatedTopics: string[];
  lastUpdated: string;
}

export const INVITE_CODES = ['LEV2026', 'SINGULARITY', 'LEVCLUB'];

export const events: Event[] = [
  {
    id: 'evt-001',
    title: '寿命脱出速度とは何か — LEV入門勉強会',
    type: 'study',
    date: '2026-04-20',
    time: '14:00 - 16:00',
    location: '東京・渋谷（会場詳細は参加者に共有）',
    capacity: 20,
    attendees: 14,
    tags: ['LEV', '入門', 'Aubrey de Grey', '老化研究'],
    description:
      'Aubrey de Greyが提唱した「寿命脱出速度（LEV）」の概念を基礎から学ぶ入門勉強会です。老化のメカニズム、SENS研究、現在の再生医療の進展を整理し、LEVが現実的な目標かどうかを参加者と一緒に考えます。資料は事前に共有します。',
    host: 'Taniguchi',
    status: 'upcoming',
  },
  {
    id: 'evt-002',
    title: '300年生きたとして — 人生設計の再構築ディスカッション',
    type: 'discussion',
    date: '2026-05-10',
    time: '19:00 - 21:00',
    location: 'オンライン（Zoom）',
    capacity: 30,
    attendees: 22,
    tags: ['人生設計', '哲学', 'キャリア', '長寿'],
    description:
      '寿命脱出速度に到達し、数百年生きるとしたら何をどう計画するか？キャリア・人間関係・経済・生きがいの観点からオープンに話し合うディスカッション形式のイベントです。答えを出すのではなく、問いを深めることを目的とします。',
    host: 'Yamamoto',
    status: 'upcoming',
  },
  {
    id: 'evt-003',
    title: '「老いなき世界』読書会 — Lifespan精読',
    type: 'reading',
    date: '2026-05-25',
    time: '13:00 - 15:00',
    location: '東京・代官山（会場詳細は参加者に共有）',
    capacity: 12,
    attendees: 8,
    tags: ['David Sinclair', 'Lifespan', '読書会', 'NAD+'],
    description:
      'David Sinclairの「Lifespan: Why We Age—and Why We Don\'t Have To」を精読する読書会。各章の要点を参加者で共有しながら、著者の主張・エビデンス・反論を批判的に検討します。事前に第1〜3章を読んできてください。',
    host: 'Nakamura',
    status: 'upcoming',
  },
  {
    id: 'evt-004',
    title: 'AIと老化研究の加速 — シンギュラリティ到達後の医療を考える',
    type: 'study',
    date: '2026-03-15',
    time: '15:00 - 17:30',
    location: 'オンライン（Zoom）',
    capacity: 50,
    attendees: 38,
    tags: ['AI', 'シンギュラリティ', '医療', '老化研究'],
    description:
      'AlphaFoldをはじめとするAIが老化研究をどう変えているかを整理し、技術的シンギュラリティが到達した後の医療世界を展望します。',
    host: 'Suzuki',
    status: 'past',
    minutes: {
      summary:
        'AIによるタンパク質構造予測の進化、創薬プロセスの自動化、老化マーカーの機械学習による発見という3つのテーマで議論が展開されました。参加者からは「AIが老化研究を10年以上加速させている」という強いコンセンサスが生まれました。',
      keyPoints: [
        'AlphaFold3がタンパク質間相互作用の予測精度を大幅向上させ、SENS関連の研究に直接貢献している',
        'Insilico Medicineがターゲット発見から臨床試験まで全自動化に近づいており、創薬コストが1/10になる可能性',
        '生物学的年齢時計（DNAメチル化）の精度向上により、ライフスタイル介入の効果測定が個人レベルで可能に',
        '技術的シンギュラリティ到達後、医療の進歩速度が現在の100倍以上になるという予測が複数の研究者から示された',
      ],
      resources: [
        { title: 'AlphaFold3 論文（Nature, 2024）', url: 'https://www.nature.com/articles/s41586-024-07487-w' },
        { title: 'Insilico Medicine 公式サイト', url: 'https://insilico.com' },
        { title: 'David Sinclair Lab', url: 'https://sinclair.hms.harvard.edu' },
      ],
      nextSteps: [
        '次回は「テロメアとエピゲノムリセット」をテーマに開催予定',
        '参加者有志でAI×老化研究の論文輪読グループを結成（Slackチャンネル #ai-aging-study）',
      ],
    },
  },
  {
    id: 'evt-005',
    title: '超長寿時代の人間関係 — 伴侶・友人・コミュニティをどう設計するか',
    type: 'discussion',
    date: '2026-02-28',
    time: '19:30 - 21:30',
    location: '東京・恵比寿',
    capacity: 15,
    attendees: 13,
    tags: ['人間関係', '心理', 'コミュニティ', '超長寿'],
    description: '数百年生きることを前提に、人間関係の設計を根本から問い直す小規模ディスカッション。',
    host: 'Taniguchi',
    status: 'past',
    minutes: {
      summary:
        '伴侶関係の多様化、友人ネットワークの世代更新、コミュニティへの帰属意識の変化という3テーマで議論。「100年スパンの友情」「複数の人生パートナー」など従来の前提を外した思考実験が活発に行われました。',
      keyPoints: [
        '「一人の人と生涯を共にする」という結婚観は200〜300年の寿命では根本的に再考が必要',
        '友人関係に「ライフフェーズ別の濃淡」を意識的に設計する必要性',
        '30年周期でのキャリア転換・拠点移動・コミュニティ更新というライフデザインモデルが提案された',
        '孤独感の管理こそが超長寿時代の最大の精神的課題になる可能性',
      ],
      resources: [
        { title: 'The Good Life Study (Harvard, 2023)', url: 'https://www.health.harvard.edu/good-life' },
        { title: 'Ezio Manzini "Design, When Everybody Designs"', url: 'https://mitpress.mit.edu/9780262028608' },
      ],
      nextSteps: [
        '「超長寿時代の経済・資産設計」テーマで次回開催（4月予定）',
        '有志でライフデザインワークショップを別途開催検討中',
      ],
    },
  },
];

export const topics: Topic[] = [
  {
    id: 'topic-001',
    slug: 'lev-basics',
    category: 'lev',
    title: '寿命脱出速度（LEV）とは',
    subtitle: 'Aubrey de Greyの理論から現在の研究最前線まで',
    tags: ['LEV', 'Aubrey de Grey', 'SENS', '老化研究'],
    difficulty: 'beginner',
    overview:
      '寿命脱出速度（Longevity Escape Velocity）とは、老化治療の進歩速度が人間の老化速度を上回る臨界点を指します。この概念を理解することは、我々が生きる時代の変化を把握する上で不可欠です。',
    content: `## 寿命脱出速度とは何か

寿命脱出速度（LEV）は、老化生物学者Aubrey de Greyが提唱した概念です。シンプルに言うと「医療技術が1年間で1年分以上の寿命延長を達成できるようになる状態」を指します。

この状態に達すると、理論上は老化によって死ぬことがなくなります。毎年追加される1年分の技術的改善が、毎年老いる1年分を相殺し続けるからです。

## SENS（Strategies for Engineered Negligible Senescence）

Aubrey de Greyが設立したSENS Research Foundationは、老化を以下の7つの損傷カテゴリーに分類し、それぞれへの対処法を研究しています：

1. **細胞消失**（幹細胞治療）
2. **細胞内ゴミ（リポフスチン）**（酵素工学）
3. **細胞外ゴミ（アミロイド）**（ワクチン・免疫療法）
4. **ミトコンドリアDNA変異**（ミトコンドリア補完）
5. **細胞のガン化**（腫瘍抑制）
6. **細胞外架橋（AGE）**（架橋分解酵素）
7. **老化細胞の蓄積**（セノリティクス）

## 現在の研究最前線

2020年代半ばにおいて、特にセノリティクス（老化細胞の除去）とエピゲノムリセット（ヤマナカ因子による若返り）が急速に進展しています。David Sinclairらの研究では、マウスの視力回復や筋肉の若返りがエピゲノム操作で実現されています。

## LEVはいつ到達するのか？

Ray Kurzweilは2029年までにLEVの臨界点が近づき、2045年のシンギュラリティと合わせて技術的不死が視野に入ると予測しています。Aubrey de Grey自身は「50%の確率で2036年までに達成」と述べています（2023年時点）。`,
    keyFigures: [
      { name: 'Aubrey de Grey', role: 'SENS Research Foundation 創業者' },
      { name: 'David Sinclair', role: 'ハーバード大学 老化研究者' },
      { name: 'Ray Kurzweil', role: 'Google シニアサイエンティスト・未来学者' },
    ],
    relatedTopics: ['singularity-basics', 'how-to-live-long', 'aging-biology'],
    lastUpdated: '2026-03-20',
  },
  {
    id: 'topic-002',
    slug: 'singularity-basics',
    category: 'singularity',
    title: '技術的シンギュラリティとは',
    subtitle: 'AIの指数関数的進化と人類の転換点',
    tags: ['シンギュラリティ', 'AI', 'Ray Kurzweil', '指数関数'],
    difficulty: 'beginner',
    overview:
      '技術的シンギュラリティとは、人工知能が人間の知性を超え、そこからの技術進化が人間の理解の限界を超える転換点を指します。この概念を理解することで、LEVとの深い関係も見えてきます。',
    content: `## シンギュラリティとは

「シンギュラリティ（技術的特異点）」はRay Kurzweilが著書『シンギュラリティは近い』で体系化した概念です。人工知能が人間の知性を凌駕し、技術進化の速度が急激に加速する転換点を指します。

## 指数関数的進化の理解

人間は線形的な変化に慣れています。しかしムーアの法則に代表されるように、技術は指数関数的に進化しています。

- **1999年**: 1000ドルのコンピュータが昆虫の脳程度の計算能力
- **2023年**: 同価格帯で人間の脳に近い計算量
- **2029年予測**: 1000ドルで人間100人分の計算能力

## AGI（汎用人工知能）の到来

GPT-4以降、AIは特定タスクではなく幅広い知的作業をこなせるよう進化しました。多くの研究者が2026〜2030年の間にAGI（人間レベルの汎用知性）が達成されると予測しています。

## LEVとシンギュラリティの関係

シンギュラリティ到達後、AIが自ら新たな老化治療を設計・テスト・改善するループが形成されます。この「AIによる医療研究の再帰的自己改善」こそが、LEVを現実に引き寄せる最大の要因と言われています。`,
    keyFigures: [
      { name: 'Ray Kurzweil', role: '著書「シンギュラリティは近い」著者・Google勤務' },
      { name: 'Nick Bostrom', role: 'オックスフォード大学 哲学者・AI安全研究' },
      { name: 'Sam Altman', role: 'OpenAI CEO' },
    ],
    relatedTopics: ['lev-basics', 'ai-medicine', 'how-to-live-long'],
    lastUpdated: '2026-03-25',
  },
  {
    id: 'topic-003',
    slug: 'how-to-live-long',
    category: 'how-to-live',
    title: '300年の人生設計',
    subtitle: '超長寿時代のキャリア・人間関係・意味の設計',
    tags: ['人生設計', 'キャリア', '哲学', '長寿'],
    difficulty: 'intermediate',
    overview:
      'LEVに到達した世界で、私たちはどのように生きるか。これは科学の問いではなく、哲学・心理学・社会設計の問いです。300年という時間軸で人生を思考するための視点を整理します。',
    content: `## 300年のライフデザインとは

現在の人生設計は70〜80年を前提に構築されています。「学習→就職→結婚→子育て→引退」というモデルです。300年では、このフレームは根本から変わります。

## キャリアの再設計

30〜40年を1つの「キャリアフェーズ」と考えると、300年では7〜10個の完全に異なるキャリアを生きることになります。

- **フェーズ1（0-35歳）**: 基礎教育・自己発見
- **フェーズ2（35-70歳）**: 専門性の構築・社会的貢献
- **フェーズ3（70-110歳）**: 蓄積知識の統合・次世代支援
- **フェーズ4-10**: 複数の全く異なる人生を生きる

## 人間関係の変容

「生涯の友人」「終身の伴侶」という概念も変わります。人間関係には自然なライフサイクルがあり、数百年にわたって同じ関係が同じ形を保つことは稀です。

重要なのは、**人間関係の変化を「失敗」ではなく「成長とフェーズ移行」として捉える文化的フレームの確立**です。

## 生きがい・意味の問題

最大の哲学的問いは「死がなければ、人生に意味はあるか？」です。実存主義的に見れば、死の有限性こそが意味を生む（ハイデガー）。しかし超長寿が現実になれば、意味の源泉を「死」から「関係性・創造・貢献・成長」へとシフトさせる必要があります。

## 経済の再設計

300年生きるとして、老後の概念が変わります。複利の力は圧倒的で、200年間の資産形成は現在の常識を超えます。一方で、社会保障・相続・富の集中という問題は深刻化します。`,
    keyFigures: [
      { name: 'Lynda Gratton', role: '著書「LIFE SHIFT」著者・ロンドン・ビジネス・スクール教授' },
      { name: 'Martin Heidegger', role: '実存主義哲学者（存在と時間）' },
      { name: 'Carl Jung', role: '個性化プロセス・人生後半の心理学' },
    ],
    relatedTopics: ['lev-basics', 'society-impact', 'mental-health-longevity'],
    lastUpdated: '2026-04-01',
  },
  {
    id: 'topic-004',
    slug: 'society-impact',
    category: 'society',
    title: '超長寿社会が社会に与える影響',
    subtitle: '世代間関係・政治・経済・文化の変容',
    tags: ['社会設計', '政治', '経済', '世代間', '倫理'],
    difficulty: 'advanced',
    overview:
      '寿命脱出速度に到達した社会がどのように変容するかを、政治・経済・倫理・文化の観点から考察します。技術の恩恵が平等に分配されるかという問いも含みます。',
    content: `## 超長寿社会の社会的インパクト

LEVが実現した世界は、歴史上かつてない社会変容をもたらします。

## 世代間の権力構造の変化

現在の社会は「世代交代」によって価値観・権力・知識が更新されます。超長寿社会では、既存の権力者が数百年にわたって影響力を持ち続ける可能性があります。

これは民主主義の根本的な課題です。数百年生きる政治家、数百年の実績を持つ経営者が台頭した時、社会の流動性はどう保たれるか？

## 経済的不平等の深刻化

最初にLEVの恩恵を受けるのは富裕層です。寿命の格差が経済格差と直結する世界では「ライフスパン格差（Longevity Divide）」という20世紀最大の不平等問題が生まれます。

## 文化・宗教との衝突

多くの文化・宗教は「死」を前提に構築されています。天国・来世・輪廻・解脱——これらの概念は超長寿の実現によって根本から問い直されます。

## 倫理的問い

- 不老不死を選択する権利は誰にでもあるべきか？
- 人口爆発を防ぐために出産制限は正当化されるか？
- 子どもを持つことの意味はどう変わるか？`,
    keyFigures: [
      { name: 'Yuval Noah Harari', role: '著書「ホモ・デウス」著者・歴史学者' },
      { name: 'Francis Fukuyama', role: '政治哲学者・バイオテクノロジー倫理研究' },
      { name: 'Peter Singer', role: '倫理学者・功利主義研究' },
    ],
    relatedTopics: ['lev-basics', 'how-to-live-long', 'singularity-basics'],
    lastUpdated: '2026-03-28',
  },
];

export const categoryLabels: Record<string, string> = {
  singularity: 'シンギュラリティ',
  lev: '寿命脱出速度（LEV）',
  'how-to-live': '長寿時代の生き方',
  society: '社会・倫理',
};

export const eventTypeLabels: Record<string, string> = {
  study: '勉強会',
  discussion: '討論会',
  online: 'オンライン',
  meetup: '交流会',
  reading: '読書会',
};

export const difficultyLabels: Record<string, string> = {
  beginner: '入門',
  intermediate: '中級',
  advanced: '上級',
};
