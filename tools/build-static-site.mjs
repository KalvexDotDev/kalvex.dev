import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = resolve(root, 'output');
const bookingUrl = 'https://meetings-eu1.hubspot.com/jaimie-fryer';

const nav = {
  is: [
    ['home', 'is.html', 'Heim'],
    ['about', 'med-ther-i-lidi.html', 'Með þér'],
    ['book', 'takta-naesta-skref.html', 'Bóka fund']
  ],
  en: [
    ['home', 'index.html', 'Home'],
    ['about', 'with-you-on-your-side.html', 'About'],
    ['book', 'next-steps.html', 'Book']
  ]
};

const labels = {
  is: {
    skip: 'Fara beint í efni',
    lang: 'English',
    langLabel: 'Skoða síðuna á ensku',
    book: 'Bóka ráðgjafafund',
    secondaryBook: 'Ræða næsta skref',
    services: 'Skoða þjónustu',
    homeTag: 'Íslensk tækniráðgjöf fyrir hugbúnaðarprófanir, sjálfvirkni og verkefnastjórnun',
    footerTag:
      'Kalvex hjálpar íslenskum fyrirtækjum að nýta gervigreind, sjálfvirkni og hugbúnaðarprófanir til að afhenda hugbúnað með meiri vissu.',
    footerWork: 'Vinna okkar',
    footerNext: 'Næsta skref',
    footerNextText:
      'Besti fyrsti fundurinn er stuttur, beinskeyttur og bundinn við raunverulegt afhendingarflæði hjá þínu teymi.',
    footerLanguage: 'Tungumál',
    footerLegal: 'Persónuvernd',
    privacy: 'Persónuverndarstefna',
    cookies: 'Vefkökur',
    cookieSettings: 'Stilla vefkökur',
    copyright: 'Öll réttindi áskilin.'
  },
  en: {
    skip: 'Skip to content',
    lang: 'Íslenska',
    langLabel: 'View the site in Icelandic',
    book: 'Book a sales meeting',
    secondaryBook: 'Discuss next steps',
    services: 'Book a meeting',
    homeTag: 'Icelandic technology consultancy for QA, automation and project delivery',
    footerTag:
      'Kalvex is an Icelandic technology consultancy. QA automation and delivery leadership for teams that want to ship fast without breaking things.',
    footerWork: 'Our work',
    footerNext: 'Next step',
    footerNextText:
      'The best first meeting is 30 minutes, no slides, grounded in one real delivery problem from your team.',
    footerLanguage: 'Language',
    footerLegal: 'Privacy',
    privacy: 'Privacy policy',
    cookies: 'Cookies',
    cookieSettings: 'Cookie settings',
    copyright: 'All rights reserved.'
  }
};

const pages = [
  {
    file: 'is.html',
    lang: 'is',
    active: 'home',
    heroCanvas: true,
    alternate: 'index.html',
    title: 'Kalvex | Hugbúnaðarprófanir og sjálfvirkni fyrir íslensk fyrirtæki',
    description:
      'Kalvex er íslensk tækniráðgjöf sem vinnur með hugbúnaðarprófanir, prófunarsjálfvirkni og verkefnastjórnun fyrir fyrirtæki sem nýta gervigreind eða þurfa sterkari sjálfvirkni.',
    eyebrow: 'Hugbúnaðarprófanir fyrir teymi sem nýta gervigreind og fyrirtæki sem þurfa meiri sjálfvirkni',
    h1: 'Byrjaðu að gefa út lausnir með öryggi með því að hafa gæðaeftirlit með frá byrjun.',
    lead:
      'Kalvex hjálpar íslenskum tækniteymum að setja skýr gæðaviðmið, sjálfvirkar prófanir og markvissa verkefnastjórn utan um þróun með gervigreind, handvirkar prófanir og flókin afhendingarverkefni.',
    primaryCta: 'Bóka ráðgjafafund',
    secondaryCta: 'Bóka fund',
    secondaryHref: 'takta-naesta-skref.html',
    body: `
      <section class="section section-tight">
        <div class="section-heading">
          <p class="eyebrow">Hvar Kalvex skapar mest virði</p>
          <h2>Þrjú vandamál sem þarf að leysa áður en hraðinn verður öruggur</h2>
          <p>Fyrirtæki þurfa ekki fleiri skýrslur sem enda í möppu. Þau þurfa skýr vinnubrögð, sjálfvirkar prófanir og mælingar sem nýtast í daglegri þróun, útgáfum og ákvörðunum.</p>
        </div>
        <div class="card-grid three">
          ${plainCard('Þróun með gervigreind', 'Gervigreindartól geta hraðað kóðun, en þau sannreyna ekki eigin niðurstöður. Kalvex setur upp kröfur, próf, mælingar og útgáfuhlið sem halda vinnunni innan öruggra marka.')}
          ${plainCard('Lítil eða engin sjálfvirkni', 'Ef prófanir eru enn að mestu handvirkar verður hver útgáfa dýrari en hún þarf að vera. Við byggjum sjálfvirka gæðakeðju sem byrjar á mikilvægustu áhættunni.')}
          ${plainCard('Verkefni sem missa taktinn', 'Gæði snúast ekki bara um próf. Þau snúast líka um forgangsröðun, skýrar kröfur, ábyrgð og taktfasta framkvæmd.')}
        </div>
      </section>

      <section class="section split-section">
        <div>
          <p class="eyebrow">Sannprófun</p>
          <h2>Gervigreind getur búið til kóða hratt. Það er ekki það sama og að vita að hann virki.</h2>
          <p>Stór mállíkön eru öflug við að búa til hugmyndir og kóða, en sannprófun flókins kerfis er oft erfiðari en myndunin sjálf. Þegar eldri kerfi, samhliða breytingar og óljósar kröfur blandast saman eykst flækjustigið hratt og ekkert slíkt tól sér heildarmyndina eitt og sér.</p>
          <p>Kalvex brýr þetta bil með prófunararkitektúr, útgáfustýringu, mælanlegum samþykktarskilyrðum og skýrri verkefnastjórn. Markmiðið er ekki að hægja á teyminu. Markmiðið er að gera hraðann nothæfan.</p>
        </div>
        <div class="signal-panel" aria-label="Dæmi um gæðaviðmið Kalvex">
          <div class="signal-row">
            <span>01</span>
            <strong>Skilgreina áhættu</strong>
            <em>kerfi, gögn, notendur</em>
          </div>
          <div class="signal-row">
            <span>02</span>
            <strong>Kóða prófanir</strong>
            <em>forritaskil, viðmót, flæði, reglur</em>
          </div>
          <div class="signal-row">
            <span>03</span>
            <strong>Setja útgáfuhlið</strong>
            <em>próf, mælingar, samþykki</em>
          </div>
          <div class="signal-row signal-row-live">
            <span>04</span>
            <strong>Afhenda með vissu</strong>
            <em>minni áhætta, meiri ró</em>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-heading">
          <p class="eyebrow">Aðferðin</p>
          <h2>Ráðgjöf sem skilur eftir sig starfandi kerfi</h2>
        </div>
        <div class="feature-list">
          ${feature('Við mælum áður en við breytum', 'Við kortleggjum núverandi flæði, villumynstur, útgáfutíðni og prófunarstöðu áður en við leggjum til lausn.')}
          ${feature('Við vinnum inni í teyminu', 'Kalvex kemur ekki sem ytri eftirlitsaðili. Við vinnum með vöru, þróun, gæðum og stjórnendum svo breytingin festist.')}
          ${feature('Við skilum verkfærum, ekki bara áliti', 'Niðurstaðan á að vera keyrandi próf, skýrari kröfur, betri ferlar og mælingar sem sýna stöðu gæðamála.')}
        </div>
      </section>
    `
  },
  {
    file: 'med-ther-i-lidi.html',
    lang: 'is',
    active: 'about',
    alternate: 'with-you-on-your-side.html',
    title: 'Með þér í liði | Kalvex',
    description:
      'Kalvex vinnur með íslenskum stjórnendum og tækniteymum sem traustur samstarfsaðili í hugbúnaðarprófunum, sjálfvirkni og tæknilegri framkvæmd.',
    eyebrow: 'Með þér í liði',
    h1: 'Við komum ekki inn til að benda á vandamál úr fjarlægð.',
    lead:
      'Kalvex vinnur inni í raunverulegu samhengi viðskiptavinarins. Við erum heiðarleg, tæknilega nákvæm og samvinnumiðuð, því gæði festast ekki nema teymið eigi breytinguna.',
    primaryCta: 'Bóka kynningarfund',
    secondaryCta: 'Skoða næsta skref',
    secondaryHref: 'takta-naesta-skref.html',
    body: `
      <section class="section split-section">
        <div>
          <p class="eyebrow">Staðbundið forskot</p>
          <h2>Íslenskur markaður krefst trausts, nærveru og hreins samtals.</h2>
          <p>Kalvex er byggt fyrir íslensk fyrirtæki sem þurfa sérfræðiaðstoð án þess að missa stjórn á eigin menningu, kerfum eða forgangsröðun. Við skiljum að ákvörðun um gæði er bæði tæknileg og rekstrarleg.</p>
          <p>Við sitjum með teyminu, spyrjum erfiðu spurninganna og hjálpum til við að breyta svörunum í verkfæri, ferla og mælingar sem halda áfram að virka eftir að fundinum lýkur.</p>
        </div>
        <div class="quote-panel">
          <p>Ráðgjöf á ekki að skilja eftir meiri óvissu. Hún á að skilja eftir skýrari ábyrgð, betri ákvörðunargögn og teymi sem veit hvað það gerir næst.</p>
        </div>
      </section>

      <section class="section">
        <div class="section-heading">
          <p class="eyebrow">Hvernig við vinnum</p>
          <h2>Beinskeytt, samvinnumiðað og mælanlegt</h2>
        </div>
        <div class="feature-list">
          ${feature('Heiðarleg greining', 'Við segjum skýrt hvar veikleikarnir eru, hvað er brýnt og hvað má bíða. Engin fegrun, enginn hræðsluáróður.')}
          ${feature('Djúp samþætting', 'Við vinnum með núverandi verkfærum, fólki og ferlum áður en við leggjum til breytingar.')}
          ${feature('Eignarhald á niðurstöðu', 'Við ráðumst ekki bara í ráðleggingar. Við hjálpum til við framkvæmd þar til kerfið er nothæft og teymið getur haldið áfram.')}
        </div>
      </section>

      <section class="section section-tight">
        <div class="section-heading">
          <p class="eyebrow">Það sem við forðumst</p>
          <h2>Það sem Kalvex gerir ekki</h2>
        </div>
        <div class="card-grid three">
          ${plainCard('Ekki tilfinningar í stað mælinga', 'Álit er gagnlegt, en ákvarðanir þurfa gögn: prófunarstöðu, villumynstur, útgáfutíðni og áhættu.')}
          ${plainCard('Ekki átök sem aðferð', 'Gæðamál eiga ekki að verða stríð milli teymis og eftirlits. Við byggjum sameiginlegan ramma sem fólk vill nota.')}
          ${plainCard('Ekki hálfkláruð umbreyting', 'Við forðumst stór orð sem enda ekki í virkri framkvæmd. Betra er að klára fyrsta áfanga vel og stækka kerfið þaðan.')}
        </div>
      </section>
    `
  },
  {
    file: 'takta-naesta-skref.html',
    lang: 'is',
    active: 'next',
    alternate: 'next-steps.html',
    title: 'Bóka ráðgjafafund | Kalvex',
    description:
      'Bókaðu fund með Kalvex til að ræða hugbúnaðarprófanir, prófunarsjálfvirkni, gæði í þróun með gervigreind eða verkefnastjórnun fyrir þitt teymi.',
    eyebrow: 'Taktu næsta skref',
    h1: 'Bókaðu 30 mínútna fund um gæði, hraða og áhættu.',
    lead:
      'Við byrjum á stuttu samtali um raunverulegt afhendingarflæði hjá þínu fyrirtæki. Engin skuldbinding, engin sölusýning sem hentar öllum. Bara heiðarleg stöðumynd og tillaga að næsta skrefi.',
    primaryCta: 'Bóka ráðgjafafund',
    secondaryCta: 'Bóka ráðgjafafund',
    secondaryHref: 'https://meetings-eu1.hubspot.com/jaimie-fryer',
    body: `
      <section class="section">
        <div class="section-heading">
          <p class="eyebrow">Fundurinn</p>
          <h2>Hvað gerist í fyrsta samtali?</h2>
        </div>
        <div class="timeline">
          ${step('01', 'Við skiljum stöðuna', 'Hvaða kerfi, teymi, útgáfur og gæðavandamál eru mikilvægust núna?')}
          ${step('02', 'Við finnum fyrstu áhættuna', 'Er vandinn hraði í þróun með gervigreind, handvirk prófun, óskýrar kröfur, útgáfuferli eða verkefnastjórnun?')}
          ${step('03', 'Við leggjum til næsta áfanga', 'Þú færð skýra mynd af því hvar Kalvex myndi byrja og hvaða niðurstöðu fyrsti áfangi ætti að skila.')}
        </div>
      </section>

      <section class="section split-section">
        <div>
          <p class="eyebrow">Gott að hafa með</p>
          <h2>Þú þarft ekki að undirbúa fullkomna kynningu.</h2>
          <p>Það hjálpar að hafa eina raunverulega sögu: útgáfu sem fór illa, handvirkt prófunarflæði sem tefur, gervigreindartól sem teymið er byrjað að nota, eða verkefni sem þarf meiri stjórn.</p>
        </div>
        <div class="note-panel">
          <h3>Við spyrjum yfirleitt um</h3>
          <ul class="check-list">
            <li>útgáfutíðni og hvar tafir myndast,</li>
            <li>núverandi próf og hvað er handvirkt,</li>
            <li>hvernig kröfur eru samþykktar,</li>
            <li>hvar gervigreind er notuð í þróun,</li>
            <li>hvaða ákvörðun stjórnendur þurfa að taka næst.</li>
          </ul>
        </div>
      </section>
    `
  },
  {
    file: 'index.html',
    lang: 'en',
    active: 'home',
    heroCanvas: true,
    alternate: 'is.html',
    title: 'Kalvex | QA and automation for Icelandic companies',
    description:
      'Kalvex is an Icelandic technology consultancy building QA, test automation and project delivery systems for AI-forward teams and companies without enough automation.',
    eyebrow: 'QA automation and delivery leadership for Icelandic tech teams',
    h1: 'You shipped fast. We make sure it holds.',
    lead:
      'AI writes code faster than any human. It also breaks things faster. Kalvex installs automated quality guardrails so your team can move fast without the production fires. QA automation and strategic delivery — built in Iceland, for Icelandic engineering teams.',
    primaryCta: 'Book a sales meeting',
    secondaryCta: 'Book a meeting',
    secondaryHref: 'next-steps.html',
    body: `
      <section class="section section-tight">
        <div class="section-heading">
          <p class="eyebrow">Where Kalvex creates the most value</p>
          <h2>Three problems must be solved before speed becomes safe</h2>
          <p>Companies do not need another report that disappears into a folder. They need quality systems that become part of daily development, release decisions and leadership visibility.</p>
        </div>
        <div class="card-grid three">
          ${plainCard('AI wrote it. Who checks it?', 'LLMs generate code fast. They also generate bugs, hallucinations and compliance nightmares — and they never say sorry. Kalvex installs tests, release gates and metrics that catch what AI misses.')}
          ${plainCard('Still clicking through tests manually?', 'When every release waits for someone to click through the same checks, quality is your bottleneck. We build automated test pipelines that run at pull request, nightly and before deploy — starting with the risk that costs the most.')}
          ${plainCard('Project slipping every sprint?', 'Unclear requirements, invisible risk and slow decisions kill more projects than bad code. Kalvex brings technical delivery leadership that connects business goals to daily execution.')}
        </div>
      </section>

      <section class="section split-section">
        <div>
          <p class="eyebrow">Verification gap</p>
          <h2>AI does exactly what you tell it — not what you meant.</h2>
          <p>Feed an LLM a task and it generates code. But it doesn't know your legacy integrations, your unwritten business rules, or that one API that breaks if you breathe on it. The result: involuntary malicious compliance at production scale.</p>
          <p>Kalvex bridges this verification gap. We install test architecture, release gates and measurable acceptance criteria that work whether code was written by a human, an AI, or both. Speed stays. Surprises don't.</p>
        </div>
        <div class="signal-panel" aria-label="Example Kalvex quality guardrails">
          <div class="signal-row">
            <span>01</span>
            <strong>Map risk</strong>
            <em>systems, data, users</em>
          </div>
          <div class="signal-row">
            <span>02</span>
            <strong>Codify tests</strong>
            <em>API, UI, flows, rules</em>
          </div>
          <div class="signal-row">
            <span>03</span>
            <strong>Set release gates</strong>
            <em>CI, metrics, approval</em>
          </div>
          <div class="signal-row signal-row-live">
            <span>04</span>
            <strong>Ship with certainty</strong>
            <em>lower risk, more calm</em>
          </div>
        </div>
      </section>

      <section class="brag-strip">
        <p class="eyebrow">By the numbers</p>
        <div class="brag-stats">
          <div class="brag-stat">
            <span class="brag-stat-number">115</span>
            <span class="brag-stat-label">Services migrated in 90 days — from 1 per week to a running pipeline with clear ownership</span>
          </div>
          <div class="brag-stat">
            <span class="brag-stat-number">16+</span>
            <span class="brag-stat-label">Years in QA and engineering leadership across regulated tech</span>
          </div>
          <div class="brag-stat">
            <span class="brag-stat-number">100%</span>
            <span class="brag-stat-label">Icelandic market — bespoke frameworks, not off-the-shelf templates</span>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-heading">
          <p class="eyebrow">Method</p>
          <h2>Consulting that leaves working systems behind</h2>
        </div>
        <div class="feature-list">
          ${feature('We measure before changing', 'We map your delivery flow, defect patterns, release cadence and current test coverage before suggesting anything. No guessing.')}
          ${feature('We work inside your team', 'Kalvex does not parachute in for a report and disappear. We embed with product, engineering and leadership — because change sticks when the team owns it.')}
          ${feature('We scale to the problem', 'Some engagements need one person. Some need a team. Kalvex starts wherever you need us and brings the right people as the scope grows.')}
        </div>
      </section>
    `
  },
  {
    file: 'with-you-on-your-side.html',
    lang: 'en',
    active: 'about',
    alternate: 'med-ther-i-lidi.html',
    title: 'Working With Kalvex | Local Icelandic QA consultancy',
    description:
      'Kalvex works with Icelandic leaders and engineering teams as a trusted partner in QA, automation and technical delivery.',
    eyebrow: 'Working with us',
    h1: 'We do not arrive to point at problems from a distance.',
    lead:
      'Kalvex works inside the real context of your team — not from a slide deck. We are honest, technically precise and collaborative. One person or the right team for the job. Quality only sticks when your people own the change.',
    primaryCta: 'Book an intro meeting',
    secondaryCta: 'View next steps',
    secondaryHref: 'next-steps.html',
    body: `
      <section class="section split-section">
        <div>
          <p class="eyebrow">Local premium</p>
          <h2>The Icelandic market rewards trust, presence and direct conversation.</h2>
          <p>Kalvex is built for Icelandic companies that need specialist help without losing control of their culture, systems or priorities. We understand that a quality decision is both technical and operational.</p>
          <p>We sit with the team, ask the difficult questions and help turn the answers into tools, workflows and metrics that continue working after the meeting ends.</p>
        </div>
        <div class="quote-panel">
          <p>Consulting should not leave more uncertainty behind. It should leave clearer ownership, better decision data and a team that knows what to do next.</p>
        </div>
      </section>

      <section class="section">
        <div class="section-heading">
          <p class="eyebrow">How we work</p>
          <h2>Direct, collaborative and measurable</h2>
        </div>
        <div class="feature-list">
          ${feature('Honest diagnosis', 'We say clearly where the weak points are, what is urgent and what can wait. No polishing, no fear theatre.')}
          ${feature('Deep integration', 'We work with existing tools, people and workflows before proposing changes.')}
          ${feature('Ownership of outcomes', 'We do not stop at recommendations. We help execute until the system is usable and the team can continue.')}
        </div>
      </section>

      <section class="section section-tight">
        <div class="section-heading">
          <p class="eyebrow">Anti-pitch</p>
          <h2>What Kalvex does not do</h2>
        </div>
        <div class="card-grid three">
          ${plainCard('No feelings instead of metrics', 'Opinion is useful, but decisions need data: test state, defect patterns, release cadence and risk.')}
          ${plainCard('No conflict as a method', 'QA should not become a fight between the team and oversight. We build a shared framework people want to use.')}
          ${plainCard('No half-finished transformation', 'We avoid big words that never become working practice. Better to finish the first stage well and expand from there.')}
        </div>
      </section>
    `
  },
  {
    file: 'next-steps.html',
    lang: 'en',
    active: 'next',
    alternate: 'takta-naesta-skref.html',
    title: 'Book a sales meeting | Kalvex',
    description:
      'Book a sales meeting with Kalvex to discuss QA, test automation, AI quality guardrails or project management for your team.',
    eyebrow: 'Next steps',
    h1: 'Book a 30-minute conversation about quality, speed and risk.',
    lead:
      'We start with a short conversation about a real delivery flow in your company. No commitment, no generic sales show. Just an honest state view and a suggested next step.',
    primaryCta: 'Book a sales meeting',
    secondaryCta: 'Book a sales meeting',
    secondaryHref: 'https://meetings-eu1.hubspot.com/jaimie-fryer',
    body: `
      <section class="section">
        <div class="section-heading">
          <p class="eyebrow">The meeting</p>
          <h2>What happens in the first conversation?</h2>
        </div>
        <div class="timeline">
          ${step('01', 'We understand the current state', 'Which systems, teams, releases and quality problems matter most right now?')}
          ${step('02', 'We find the first risk', 'Is the problem AI acceleration, manual testing, unclear requirements, release process or project governance?')}
          ${step('03', 'We suggest the next stage', 'You get a clear view of where Kalvex would start and what the first stage should deliver.')}
        </div>
      </section>

      <section class="section split-section">
        <div>
          <p class="eyebrow">What to bring</p>
          <h2>You do not need to prepare a perfect presentation.</h2>
          <p>One real story helps: a release that went badly, a manual test flow slowing the team down, AI tools the team has started using, or a project that needs more control.</p>
        </div>
        <div class="note-panel">
          <h3>We usually ask about</h3>
          <ul class="check-list">
            <li>release cadence and where delays appear,</li>
            <li>current tests and what remains manual,</li>
            <li>how requirements are approved,</li>
            <li>where AI is used in development,</li>
            <li>which decision leadership needs to make next.</li>
          </ul>
        </div>
      </section>
    `
  },
  {
    file: 'personuverndarstefna.html',
    lang: 'is',
    active: 'legal',
    alternate: 'privacy-policy.html',
    title: 'Persónuverndarstefna | Kalvex',
    description:
      'Persónuverndarstefna Kalvex útskýrir hvaða persónuupplýsingar eru unnar á kalvex.dev, í hvaða tilgangi og hvaða réttindi einstaklingar hafa.',
    eyebrow: 'Persónuvernd',
    h1: 'Persónuverndarstefna Kalvex.',
    lead:
      'Hér er útskýrt með skýrum hætti hvaða upplýsingar Kalvex vinnur þegar fólk heimsækir vefinn, bókar fund eða hefur samband.',
    primaryCta: 'Bóka ráðgjafafund',
    secondaryCta: 'Skoða vefkökur',
    secondaryHref: 'vefkokur.html',
    body: `
      <section class="section legal-content">
        <p><strong>Síðast uppfært:</strong> 26. apríl 2026.</p>
        <h2>Ábyrgðaraðili</h2>
        <p>Kalvex er ábyrgðaraðili þeirrar vinnslu persónuupplýsinga sem fer fram á þessum vef. Fyrir fyrirspurnir um persónuvernd má hafa samband við okkur á <a href="mailto:jaimie@kalvex.dev">jaimie@kalvex.dev</a>.</p>

        <h2>Hvaða upplýsingar við vinnum</h2>
        <p>Við vinnum aðeins þær upplýsingar sem þarf til að reka vefinn, svara erindum og undirbúa mögulegt samstarf. Það getur falið í sér tæknilegar upplýsingar um heimsókn á vefinn, upplýsingar sem þú gefur upp þegar þú bókar fund, og samskipti sem þú sendir okkur.</p>
        <div class="card-grid three">
          ${plainCard('Rekstur vefs', 'Hýsingar- og öryggiskerfi geta unnið IP-tölu, tæki, vafra, tíma heimsóknar og hvaða síður eru sóttar. Tilgangurinn er rekstur, öryggi og bilanagreining.')}
          ${plainCard('Fundabókanir', 'Þegar þú bókar fund í gegnum HubSpot vinnast upplýsingar á borð við nafn, netfang, tíma fundar og skilaboð sem þú velur að senda.')}
          ${plainCard('Markaðs- og vefmælingar', 'HubSpot er aðeins hlaðið eftir samþykki fyrir valkvæðum vefkökum. Þá geta vefkökur og auðkenni tengst heimsókn og samskiptum við vefinn.')}
        </div>

        <h2>Lagagrundvöllur</h2>
        <p>Rekstur, öryggi og grunnmælingar sem nauðsynlegar eru fyrir vefinn byggja á lögmætum hagsmunum Kalvex af því að reka öruggan og virkan vef. Fundabókanir og samskipti byggja á því að gera ráðstafanir að beiðni þinni áður en mögulegt samningssamband hefst. Valkvæðar vefmælingar og HubSpot byggja á samþykki þínu.</p>

        <h2>Þjónustuaðilar</h2>
        <p>Við notum þjónustuaðila til að hýsa vefinn, birta efni, bóka fundi og greina samþykktar vefmælingar. Slíkir aðilar vinna upplýsingar samkvæmt eigin skilmálum eða sem vinnsluaðilar eftir því sem við á. Dæmi eru GitHub Pages, HubSpot og Cloudflare.</p>

        <h2>Varðveisla</h2>
        <p>Við varðveitum upplýsingar ekki lengur en nauðsynlegt er fyrir tilgang vinnslunnar, nema lög eða málefnalegir hagsmunir krefjist lengri varðveislu. Samþykki fyrir vefkökum er geymt í vafranum þínum þar til þú breytir vali eða hreinsar vafragögn.</p>

        <h2>Réttindi þín</h2>
        <p>Þú getur óskað eftir aðgangi að upplýsingum um þig, leiðréttingu, eyðingu, takmörkun vinnslu, flutningi gagna eða andmælt vinnslu eftir því sem lög leyfa. Þú getur afturkallað samþykki fyrir valkvæðum vefkökum hvenær sem er með stillingum vefkaka.</p>
        <p>Ef þú telur að vinnsla persónuupplýsinga brjóti gegn lögum getur þú sent kvörtun til Persónuverndar, íslensku persónuverndarstofnunarinnar.</p>
      </section>
    `
  },
  {
    file: 'vefkokur.html',
    lang: 'is',
    active: 'legal',
    alternate: 'cookies.html',
    title: 'Vefkökur | Kalvex',
    description:
      'Upplýsingar um vefkökur, samþykki og valkvæðar vefmælingar á kalvex.dev.',
    eyebrow: 'Vefkökur',
    h1: 'Vefkökur og samþykki.',
    lead:
      'Kalvex notar aðeins nauðsynlega vistun sjálfkrafa. HubSpot og valkvæðar vefmælingar eru ekki hlaðnar nema þú samþykkir þær.',
    primaryCta: 'Bóka ráðgjafafund',
    secondaryCta: 'Persónuverndarstefna',
    secondaryHref: 'personuverndarstefna.html',
    body: `
      <section class="section legal-content">
        <p><strong>Síðast uppfært:</strong> 26. apríl 2026.</p>
        <h2>Hvernig við notum vefkökur</h2>
        <p>Vefurinn notar staðbundna vistun í vafranum til að muna hvort þú hefur samþykkt eða hafnað valkvæðum vefmælingum. Þessi vistun er nauðsynleg til að virða valið þitt.</p>

        <div class="card-grid three">
          ${plainCard('Nauðsynlegt', 'Notað til að muna val þitt um vefkökur og halda vefnum virkum. Þetta er ekki notað til markaðssetningar.')}
          ${plainCard('Valkvætt', 'HubSpot getur aðeins hlaðist ef þú samþykkir valkvæðar vefkökur. Þá geta vefmælingar, auðkenni og samskiptasaga tengst heimsókninni.')}
          ${plainCard('Engin fyrirfram samþykkt', 'Við notum ekki fyrirfram hakaða reiti og þögn eða áframhaldandi notkun vefsins er ekki túlkuð sem samþykki.')}
        </div>

        <h2>HubSpot</h2>
        <p>Ef þú samþykkir valkvæðar vefkökur hleður vefurinn HubSpot-skriftu frá <code>js-eu1.hs-scripts.com</code>. HubSpot getur sett vefkökur á borð við <code>hubspotutk</code>, <code>__hstc</code>, <code>__hssc</code> og <code>__hssrc</code>. Heiti og endingartími geta breyst eftir stillingum HubSpot.</p>

        <h2>Breyta vali</h2>
        <p>Þú getur breytt vali þínu hvenær sem er. Ef þú afturkallar samþykki hleður vefurinn ekki HubSpot aftur. Vefkökur sem þegar hafa verið settar má einnig hreinsa í stillingum vafrans.</p>
        <p><button type="button" class="button button-secondary inline-consent-button" data-consent-settings onclick="showConsentBanner();return false">Stilla vefkökur</button></p>
      </section>
    `
  },
  {
    file: 'privacy-policy.html',
    lang: 'en',
    active: 'legal',
    alternate: 'personuverndarstefna.html',
    title: 'Privacy policy | Kalvex',
    description:
      'Kalvex privacy policy explains what personal data is processed on kalvex.dev, why it is processed and which rights individuals have.',
    eyebrow: 'Privacy',
    h1: 'Kalvex privacy policy.',
    lead:
      'This page explains, in plain language, how Kalvex processes personal data when someone visits the website, books a meeting or contacts us.',
    primaryCta: 'Book a sales meeting',
    secondaryCta: 'View cookies',
    secondaryHref: 'cookies.html',
    body: `
      <section class="section legal-content">
        <p><strong>Last updated:</strong> 26 April 2026.</p>
        <h2>Controller</h2>
        <p>Kalvex is the controller for personal data processed on this website. For privacy questions, contact us at <a href="mailto:jaimie@kalvex.dev">jaimie@kalvex.dev</a>.</p>

        <h2>What we process</h2>
        <p>We process only what is needed to run the site, respond to enquiries and prepare a potential commercial relationship. This can include technical website data, meeting-booking details and communications you choose to send us.</p>
        <div class="card-grid three">
          ${plainCard('Website operation', 'Hosting and security systems may process IP address, device, browser, request time and pages requested for operations, security and troubleshooting.')}
          ${plainCard('Meeting bookings', 'When you book through HubSpot, details such as name, email address, meeting time and any message you provide may be processed.')}
          ${plainCard('Marketing analytics', 'HubSpot loads only after optional cookie consent. If accepted, cookies and identifiers may be connected to website visits and interactions.')}
        </div>

        <h2>Legal basis</h2>
        <p>Website operation and security rely on Kalvex's legitimate interests in running a secure and functioning website. Meeting bookings and direct communications rely on steps taken at your request before a possible contract. Optional analytics and HubSpot rely on your consent.</p>

        <h2>Service providers</h2>
        <p>We use providers to host the site, publish content, arrange meetings and run consented analytics. These providers process data under their own terms or as processors where applicable. Examples include GitHub Pages, HubSpot and Cloudflare.</p>

        <h2>Retention</h2>
        <p>We do not keep personal data longer than needed for the purpose, unless legal duties or legitimate reasons require longer retention. Cookie consent is stored in your browser until you change your choice or clear browser data.</p>

        <h2>Your rights</h2>
        <p>You can request access, rectification, erasure, restriction, portability or object to processing where the law gives you that right. You can withdraw optional cookie consent at any time through cookie settings.</p>
        <p>If you believe personal data has been processed unlawfully, you can complain to Persónuvernd, the Icelandic Data Protection Authority.</p>
      </section>
    `
  },
  {
    file: 'cookies.html',
    lang: 'en',
    active: 'legal',
    alternate: 'vefkokur.html',
    title: 'Cookies | Kalvex',
    description:
      'Information about cookies, consent and optional website analytics on kalvex.dev.',
    eyebrow: 'Cookies',
    h1: 'Cookies and consent.',
    lead:
      'Kalvex only uses necessary browser storage by default. HubSpot and optional analytics do not load unless you accept them.',
    primaryCta: 'Book a sales meeting',
    secondaryCta: 'Privacy policy',
    secondaryHref: 'privacy-policy.html',
    body: `
      <section class="section legal-content">
        <p><strong>Last updated:</strong> 26 April 2026.</p>
        <h2>How we use cookies</h2>
        <p>The site uses local browser storage to remember whether you accepted or rejected optional analytics. This is necessary to respect your choice.</p>

        <div class="card-grid three">
          ${plainCard('Necessary', 'Used to remember your cookie preference and keep the site working. It is not used for marketing.')}
          ${plainCard('Optional', 'HubSpot can load only if you accept optional cookies. It may then use analytics cookies, identifiers and interaction history.')}
          ${plainCard('No implied consent', 'We do not use pre-ticked boxes, and silence or continued website use is not treated as consent.')}
        </div>

        <h2>HubSpot</h2>
        <p>If you accept optional cookies, the website loads the HubSpot script from <code>js-eu1.hs-scripts.com</code>. HubSpot may set cookies such as <code>hubspotutk</code>, <code>__hstc</code>, <code>__hssc</code> and <code>__hssrc</code>. Names and lifetimes may change depending on HubSpot configuration.</p>

        <h2>Change your choice</h2>
        <p>You can change your choice at any time. If you withdraw consent, the site will not load HubSpot again. Cookies already set can also be cleared in your browser settings.</p>
        <p><button type="button" class="button button-secondary inline-consent-button" data-consent-settings onclick="showConsentBanner();return false">Cookie settings</button></p>
      </section>
    `
  }
];

const pageVisuals = {
  home: {
    is: {
      image: 'assets/img/iceland-landscape.jpg',
      alt: 'Íslenskt landslag með fjöllum í fjarska.',
      kicker: 'Íslensk tækniráðgjöf',
      title: 'Staðbundin ráðgjöf fyrir hugbúnað sem þarf að standast raunverulegt álag.',
      text:
        'Kalvex tengir gæðavinnu við daglega þróun, útgáfur og ákvarðanir. Markmiðið er einfalt: færri óvissar útgáfur, skýrari ábyrgð og betra flæði frá hugmynd til afhendingar.',
      caption: 'Kalvex vinnur með íslenskum fyrirtækjum þar sem traust, hraði og ábyrgð þurfa að fara saman.',
      points: [
        ['Gervigreind og gæði', 'Sannprófun fyrir teymi sem nota gervigreind í þróun.'],
        ['Sjálfvirkar prófanir', 'Handvirk þekking verður að keyrandi verndarlagi.'],
        ['Verkefnastjórnun', 'Áhætta, ábyrgð og næstu skref verða sýnileg.']
      ]
    },
    en: {
      image: 'assets/img/iceland-landscape.jpg',
      alt: 'Icelandic countryside with mountains in the distance.',
      kicker: 'Icelandic technology consultancy',
      title: 'Local consulting for software that has to hold up under real pressure.',
      text:
        'Kalvex connects quality work to daily development, release decisions and leadership visibility. The outcome is fewer uncertain releases, clearer ownership and better flow from idea to delivery.',
      caption: 'Kalvex works with Icelandic companies where trust, speed and accountability need to move together.',
      points: [
        ['AI quality', 'Verification for teams using AI in daily engineering.'],
        ['Automated tests', 'Manual knowledge becomes executable guardrails.'],
        ['Project delivery', 'Risk, ownership and next steps stay visible.']
      ]
    }
  },
  about: {
    is: {
      image: 'assets/img/iceland-landscape.jpg',
      alt: 'Íslenskt landslag með fjöllum í fjarska.',
      kicker: 'Með þér í liði',
      title: 'Ráðgjöf sem vinnur inni í teyminu, ekki fyrir utan það.',
      text:
        'Kalvex kemur inn með tæknilega dýpt, skýra forgangsröðun og rólega framkvæmd. Við viljum skilja eftir kerfi sem teymið getur haldið áfram að nota.',
      caption: 'Nálægð skiptir máli þegar þarf að breyta vinnubrögðum, trausti og afhendingarhraða.',
      points: [
        ['Heiðarleiki', 'Skýr greining á því sem er brýnt og því sem má bíða.'],
        ['Samvinna', 'Vinna með vöru, þróun, gæðum og stjórnendum.'],
        ['Árangur', 'Verkfæri, mælingar og vinnulag sem lifa áfram.']
      ]
    },
    en: {
      image: 'assets/img/iceland-landscape.jpg',
      alt: 'Icelandic countryside with mountains in the distance.',
      kicker: 'Working with you',
      title: 'Consulting that works inside the team, not outside it.',
      text:
        'Kalvex brings technical depth, clear prioritization and calm execution. We want to leave behind systems the team can keep using after the engagement ends.',
      caption: 'Proximity matters when the work is changing habits, trust and release speed.',
      points: [
        ['Candor', 'Clear diagnosis of what is urgent and what can wait.'],
        ['Collaboration', 'Working with product, engineering, QA and leadership.'],
        ['Results', 'Tools, metrics and practices that continue after us.']
      ]
    }
  },
  next: {
    is: {
      image: 'assets/img/planning-board.jpg',
      alt: 'Skipulagstafla með miðum eftir stöðu verkefna.',
      kicker: 'Næsta skref',
      title: 'Fyrsti fundurinn á að finna raunhæfan fyrsta áfanga.',
      text:
        'Við byrjum á einu raunverulegu afhendingarflæði, einni skýrri áhættu eða einu verkefni sem þarf meiri festu. Það gerir fundinn beittan og næstu skref gagnleg.',
      caption: 'Gott samtal byrjar á samhengi, áhættu og því sem þarf að virka næst.',
      points: [
        ['Staða', 'Hvað er erfitt í dag og hvað hefur verið reynt.'],
        ['Áhætta', 'Hvaða bil í gæðum eða framkvæmd skiptir mestu.'],
        ['Áfangi', 'Hvað er raunhæft að bæta fyrst.']
      ]
    },
    en: {
      image: 'assets/img/planning-board.jpg',
      alt: 'A planning board with sticky notes arranged by workflow stage.',
      kicker: 'Next step',
      title: 'The first meeting should find a realistic first stage.',
      text:
        'We start with one real delivery flow, one clear risk or one project that needs more structure. That keeps the meeting sharp and makes the next steps useful.',
      caption: 'A good conversation starts with context, risk and what needs to work next.',
      points: [
        ['State', 'What is hard today and what has already been tried.'],
        ['Risk', 'Which gap in quality or delivery matters most.'],
        ['Stage', 'What is realistic to improve first.']
      ]
    }
  }
};

const mediaLibrary = {
  code: {
    image: 'assets/img/code-quality.jpg',
    alt: {
      is: 'Nærmynd af hugbúnaðarkóða á tölvuskjá.',
      en: 'Close-up of software code on a computer screen.'
    },
    is: ['Kóði sem þarf að standast', 'Gervigreind hraðar breytingum. Gæðakerfið þarf að sjá hvað breyttist og hvað má ekki brotna.'],
    en: ['Code that has to hold up', 'AI accelerates change. The quality system has to see what changed and what must not break.']
  },
  performance: {
    image: 'assets/img/performance-dashboard.jpg',
    alt: {
      is: 'Mælaborð með frammistöðugögnum á fartölvuskjá.',
      en: 'Performance analytics graphs on a laptop screen.'
    },
    is: ['Mælingar sem nýtast', 'Ákvarðanir verða rólegri þegar teymið sér hraða, stöðu og áhættu í sama samhengi.'],
    en: ['Metrics that are useful', 'Decisions get calmer when the team sees speed, state and risk in the same context.']
  },
  monitoring: {
    image: 'assets/img/monitoring-dashboard.jpg',
    alt: {
      is: 'Mælaborð með gæðamælingum og frammistöðumælingum.',
      en: 'A monitoring dashboard with quality and performance metrics.'
    },
    is: ['Sýnilegt eftirlit', 'Góð útgáfa endar ekki við innleiðingu. Hún heldur áfram í mælingum, viðbragði og lærdómi.'],
    en: ['Visible control', 'A good release does not end at deploy. It continues through metrics, response and learning.']
  },
  network: {
    image: 'assets/img/network-cables.jpg',
    alt: {
      is: 'Netkaplar og tæknibúnaður í tæknirými.',
      en: 'Network and server cables in a technical environment.'
    },
    is: ['Raunverulegir innviðir', 'Sjálfvirkni þarf að styðja kerfin sem eru til staðar, ekki bara fallega mynd af ferli.'],
    en: ['Real infrastructure', 'Automation has to support the systems that exist, not just a tidy diagram of a process.']
  },
  servers: {
    image: 'assets/img/server-rack.jpg',
    alt: {
      is: 'Netþjónaskápar í tæknirými.',
      en: 'Server racks in a data center.'
    },
    is: ['Stöðug afhending', 'Prófanir, sjálfvirkar keyrslur og útgáfuhlið þurfa að virka saman þegar breytingar fara í framleiðslu.'],
    en: ['Stable delivery', 'Tests, CI and release gates need to work together when changes move to production.']
  },
  planning: {
    image: 'assets/img/planning-board.jpg',
    alt: {
      is: 'Skipulagstafla með miðum eftir stöðu verkefna.',
      en: 'A planning board with sticky notes arranged by workflow stage.'
    },
    is: ['Taktur í vinnunni', 'Skýr vinna er sýnileg: hvað er næst, hver á það og hvað þarf að vera satt.'],
    en: ['Cadence in the work', 'Clear work is visible: what is next, who owns it and what needs to be true.']
  },
  checklist: {
    image: 'assets/img/delivery-checklist.jpg',
    alt: {
      is: 'Hönd skrifar gátlista í minnisbók.',
      en: 'A hand writing a checklist in a notebook.'
    },
    is: ['Skilyrði fyrir útgáfu', 'Áður en hraði skiptir máli þarf teymið að vita hvaða gæði eru nauðsynleg.'],
    en: ['Release conditions', 'Before speed matters, the team needs to know which quality signals are required.']
  },
  iceland: {
    image: 'assets/img/iceland-landscape.jpg',
    alt: {
      is: 'Íslenskt landslag með fjöllum í fjarska.',
      en: 'Icelandic countryside with mountains in the distance.'
    },
    is: ['Íslenskt samhengi', 'Ráðgjöfin þarf að passa við stærð teymisins, markaðinn og raunverulega ábyrgð.'],
    en: ['Icelandic context', 'The consulting has to fit the team size, the market and the real accountability around the work.']
  }
};

const pageMediaStrips = {
  home: ['performance', 'code', 'planning', 'checklist', 'iceland'],
  about: ['iceland', 'planning', 'checklist', 'monitoring', 'code'],
  next: ['checklist', 'planning', 'monitoring', 'iceland', 'performance']
};

const mediaStripText = {
  is: {
    kicker: 'Úr vinnunni',
    title: 'Minna af hvítum pappír. Meira af kerfum sem sjást og virka.',
    intro:
      'Gæðavinna verður skiljanlegri þegar hún sést sem flæði: kóði, mælingar, innviðir, skipulag og útgáfuskilyrði sem styðja hvert annað.'
  },
  en: {
    kicker: 'From the work',
    title: 'Less white paper. More systems you can see and use.',
    intro:
      'Quality work becomes easier to understand when it is visible as a flow: code, metrics, infrastructure, planning and release conditions supporting each other.'
  }
};

function visualPrelude(page) {
  const visual = pageVisuals[page.active]?.[page.lang];

  if (!visual) {
    return '';
  }

  const id = `visual-${page.file.replace(/[^a-z0-9]/gi, '-')}`;
  const points = visual.points
    .map(
      ([title, text], index) => `
        <article class="visual-point">
          <span>${String(index + 1).padStart(2, '0')}</span>
          <strong>${title}</strong>
          <p>${text}</p>
        </article>
      `
    )
    .join('');

  return `
    <section class="visual-prelude${page.active === 'home' ? ' visual-prelude-home' : ''}" aria-labelledby="${id}">
      <figure class="visual-frame">
        <img src="${visual.image}" alt="${visual.alt}" loading="${page.active === 'home' ? 'eager' : 'lazy'}" decoding="async">
        <div class="visual-canvas-layer" data-quality-canvas aria-hidden="true"></div>
        <figcaption><span>${visual.kicker}</span>${visual.caption}</figcaption>
      </figure>
      <div class="visual-copy">
        <p class="eyebrow">${visual.kicker}</p>
        <h2 id="${id}">${visual.title}</h2>
        <p>${visual.text}</p>
        <div class="visual-points">
          ${points}
        </div>
      </div>
    </section>
  `;
}

function mediaStrip(page) {
  const media = pageMediaStrips[page.active];

  if (!media) {
    return '';
  }

  const copy = mediaStripText[page.lang];
  const tiles = media
    .map((key) => {
      const item = mediaLibrary[key];
      const [title, text] = item[page.lang];

      return `
        <figure class="media-tile">
          <img src="${item.image}" alt="${item.alt[page.lang]}" loading="lazy" decoding="async">
          <figcaption>
            <strong>${title}</strong>
            <span>${text}</span>
          </figcaption>
        </figure>
      `;
    })
    .join('');

  return `
    <section class="media-strip" aria-labelledby="media-${page.file.replace(/[^a-z0-9]/gi, '-')}">
      <div class="media-strip-heading">
        <p class="eyebrow">${copy.kicker}</p>
        <h2 id="media-${page.file.replace(/[^a-z0-9]/gi, '-')}">${copy.title}</h2>
        <p>${copy.intro}</p>
      </div>
      <div class="media-strip-grid">
        ${tiles}
      </div>
    </section>
  `;
}

function card(title, text, href, label) {
  return `
    <article class="card">
      <h3>${title}</h3>
      <p>${text}</p>
      <a href="${href}" class="text-link">${label}</a>
    </article>
  `;
}

function service(title, text, href) {
  return `
    <article class="card service-card">
      <span class="card-kicker">Kalvex</span>
      <h3>${title}</h3>
      <p>${text}</p>
      <a href="${href}" class="text-link">${title}</a>
    </article>
  `;
}

function plainCard(title, text) {
  return `
    <article class="card">
      <h3>${title}</h3>
      <p>${text}</p>
    </article>
  `;
}

function feature(title, text) {
  return `
    <article class="feature">
      <div class="feature-mark" aria-hidden="true"></div>
      <div>
        <h3>${title}</h3>
        <p>${text}</p>
      </div>
    </article>
  `;
}

function outcome(text) {
  return `<div class="outcome"><span aria-hidden="true"></span>${text}</div>`;
}

function step(number, title, text) {
  return `
    <article class="step">
      <span>${number}</span>
      <div>
        <h3>${title}</h3>
        <p>${text}</p>
      </div>
    </article>
  `;
}

function article(type, title, text) {
  return `
    <article class="article-card">
      <span>${type}</span>
      <h2>${title}</h2>
      <p>${text}</p>
    </article>
  `;
}

function button(href, label, variant = 'primary', external = false) {
  const externalAttrs = external ? ' target="_blank" rel="noopener noreferrer"' : '';
  return `<a class="button button-${variant}" href="${href}"${externalAttrs}>${label}</a>`;
}

function header(page) {
  const l = labels[page.lang];
  const homeHref = page.lang === 'is' ? 'is.html' : 'index.html';
  const activeNav = nav[page.lang]
    .map(([key, href, label]) => {
      const current = key === page.active ? ' aria-current="page"' : '';
      return `<a href="${href}"${current}>${label}</a>`;
    })
    .join('\n');

  return `
    <a class="skip-link" href="#main">${l.skip}</a>
    <header class="site-header">
      <div class="shell header-inner">
        <a class="brand" href="${homeHref}" aria-label="Kalvex">
          <img src="static/kalvex-logo.svg" alt="" width="28" height="31">
          <span>Kalvex</span>
        </a>
        <nav class="primary-nav" aria-label="${page.lang === 'is' ? 'Aðalvalmynd' : 'Primary navigation'}">
          ${activeNav}
        </nav>
        <div class="header-actions">
          <a class="language-link" href="${page.alternate}" aria-label="${l.langLabel}">${l.lang}</a>
          ${button(bookingUrl, l.book, 'primary small', true)}
        </div>
      </div>
    </header>
  `;
}

function hero(page) {
  const canvasLayer = page.heroCanvas
    ? '<div class="hero-canvas-layer" data-hero-canvas aria-hidden="true"></div>'
    : '';

  return `
    <section class="hero shell${page.heroCanvas ? ' hero-with-canvas' : ''}">
      ${canvasLayer}
      <div class="hero-copy">
        <p class="eyebrow">${page.eyebrow}</p>
        <h1>${page.h1}</h1>
        <p class="hero-lead">${page.lead}</p>
        <div class="hero-actions">
          ${button(bookingUrl, page.primaryCta, 'primary', true)}
          ${button(page.secondaryHref, page.secondaryCta, 'secondary')}
        </div>
      </div>
      <div class="hero-system" aria-label="${page.lang === 'is' ? 'Afhendingarkerfi Kalvex' : 'Kalvex delivery system'}">
        <div class="system-topline">
          <span>Kalvex</span>
          <span>${page.lang === 'is' ? 'Gæðakerfi' : 'Quality system'}</span>
        </div>
        <div class="system-grid">
          <div>
            <strong>${page.lang === 'is' ? 'Gæði' : 'QA'}</strong>
            <span>${page.lang === 'is' ? 'Sjálfvirkar prófanir' : 'automated tests'}</span>
          </div>
          <div>
            <strong>${page.lang === 'is' ? 'Gervigreind' : 'AI'}</strong>
            <span>${page.lang === 'is' ? 'Gæðaeftirlit og markmiðasetning' : 'guardrails'}</span>
          </div>
          <div>
            <strong>${page.lang === 'is' ? 'Verkefna<wbr>stjórnun' : 'PM'}</strong>
            <span>${page.lang === 'is' ? 'taktur og ábyrgð' : 'cadence and ownership'}</span>
          </div>
          <div>
            <strong>${page.lang === 'is' ? 'Nútíma hugbúnaður' : 'Modern software'}</strong>
            <span>${page.lang === 'is' ? 'flæði, endurgjöf, lærdómur' : 'feedback, flow, learning'}</span>
          </div>
        </div>
        <div class="system-footer">
          <span>${page.lang === 'is' ? 'Mælt' : 'Measured'}</span>
          <span>${page.lang === 'is' ? 'Prófað' : 'Tested'}</span>
          <span>${page.lang === 'is' ? 'Afhent' : 'Shipped'}</span>
        </div>
      </div>
    </section>
  `;
}

function footer(page) {
  const l = labels[page.lang];
  const footerLinks = nav[page.lang]
    .filter(([key]) => key !== 'home')
    .map(([, href, label]) => `<a href="${href}">${label}</a>`)
    .join('\n');
  const homeHref = page.lang === 'is' ? 'is.html' : 'index.html';

  return `
    <section class="final-cta">
      <div class="shell final-cta-inner">
        <div>
          <p class="eyebrow">${l.footerNext}</p>
          <h2>${page.lang === 'is' ? 'Við skulum finna fyrsta áfangann sem lækkar áhættu strax.' : 'Let us find the first stage that lowers risk immediately.'}</h2>
          <p>${l.footerNextText}</p>
        </div>
        ${button(bookingUrl, l.book, 'light', true)}
      </div>
    </section>
    <footer class="site-footer">
      <div class="shell footer-grid">
        <div>
          <a class="brand footer-brand" href="${homeHref}" aria-label="Kalvex">
            <img src="static/kalvex-logo.svg" alt="" width="28" height="31">
            <span>Kalvex</span>
          </a>
          <p>${l.footerTag}</p>
        </div>
        <div>
          <h2>${l.footerWork}</h2>
          <nav aria-label="${l.footerWork}">
            ${footerLinks}
          </nav>
        </div>
        <div>
          <h2>${l.footerLanguage}</h2>
          <nav aria-label="${l.footerLanguage}">
            <a href="${page.alternate}">${l.lang}</a>
            <a href="takta-naesta-skref.html">${page.lang === 'is' ? 'Bóka fund á íslensku' : 'Icelandic booking page'}</a>
            <a href="next-steps.html">${page.lang === 'is' ? 'Bóka fund á ensku' : 'Book a meeting'}</a>
          </nav>
        </div>
        <div>
          <h2>${l.footerLegal}</h2>
          <nav aria-label="${l.footerLegal}">
            <a href="${page.lang === 'is' ? 'personuverndarstefna.html' : 'privacy-policy.html'}">${l.privacy}</a>
            <a href="${page.lang === 'is' ? 'vefkokur.html' : 'cookies.html'}">${l.cookies}</a>
            <button type="button" class="footer-consent-link" onclick="showConsentBanner()">${l.cookieSettings}</button>
            <a href="https://eu1.hs-data-privacy.com/request/3oJ-RfMw8uzgkxDnwqMb0Q" target="_blank" rel="noopener noreferrer">${page.lang === 'is' ? 'Gagna aðgangsbeiðni' : 'Data request'}</a>
          </nav>
        </div>
      </div>
      <div class="shell footer-bottom">
        <span>© <span id="year"></span> Kalvex.</span>
        <span>${l.copyright}</span>
      </div>
    </footer>
    <script>
      document.getElementById('year').textContent = new Date().getFullYear();
    </script>
  `;
}

function template(page) {
  const absoluteUrl = page.file === 'index.html' ? 'https://kalvex.dev/' : `https://kalvex.dev/${page.file}`;
  const alternateUrl = page.alternate === 'index.html' ? 'https://kalvex.dev/' : `https://kalvex.dev/${page.alternate}`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Kalvex',
    url: absoluteUrl,
    logo: 'https://kalvex.dev/static/kalvex-logo.svg',
    image: 'https://kalvex.dev/static/kalvex-logo.svg',
    areaServed: 'Iceland',
    description: page.description,
    sameAs: ['https://www.linkedin.com/company/kalvex/'],
    makesOffer: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Software quality assurance' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Test automation' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Project management' } }
    ]
  };

  return `<!DOCTYPE html>
<html lang="${page.lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  <meta name="theme-color" content="#ffffff">
  <link rel="icon" type="image/svg+xml" href="static/favicon.svg">
  <link rel="alternate icon" href="favicon.ico">
  <link rel="canonical" href="${absoluteUrl}">
  <link rel="alternate" hreflang="${page.lang}" href="${absoluteUrl}">
  <link rel="alternate" hreflang="${page.lang === 'is' ? 'en' : 'is'}" href="${alternateUrl}">
  <link rel="alternate" hreflang="x-default" href="https://kalvex.dev/">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${absoluteUrl}">
  <meta property="og:title" content="${page.title}">
  <meta property="og:description" content="${page.description}">
  <meta property="og:image" content="https://kalvex.dev/static/kalvex-logo.svg">
  <meta property="og:locale" content="${page.lang === 'is' ? 'is_IS' : 'en_US'}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${page.title}">
  <meta name="twitter:description" content="${page.description}">
  <meta name="twitter:image" content="https://kalvex.dev/static/kalvex-logo.svg">
  <link rel="stylesheet" href="assets/css/custom.css">
  ${page.heroCanvas || pageVisuals[page.active]?.[page.lang] ? '<script defer src="assets/js/hero-canvas.js"></script>' : ''}
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body>
  ${header(page)}
  <main id="main">
    ${hero(page)}
    <div class="shell">
      ${visualPrelude(page)}
      ${page.body}
      ${mediaStrip(page)}
    </div>
  </main>
  ${footer(page)}
  <script>!function(){
    var k='kalvex_consent', hs='https://js-eu1.hs-scripts.com/148349979.js', b=null;
    try{var c=JSON.parse(localStorage.getItem(k))}catch(e){}
    if(!c){show()} else if(c.ok) loadHS();
    window.showConsentBanner=show;
    function show(){
      if(b) return;
      b=document.createElement('section');
      b.className='cookie-consent'; b.setAttribute('role','dialog');
      b.innerHTML='<div class="cookie-consent-inner"><div class="cookie-consent-copy"><h2>${page.lang === 'is' ? 'Vefkökur og persónuvernd' : 'Cookies and privacy'}</h2><p>${page.lang === 'is' ? 'HubSpot er aðeins hlaðið ef þú samþykkir. Nauðsynleg vistun man valið þitt.' : 'HubSpot loads only if you accept. Necessary storage remembers your choice.'}</p><div class="cookie-consent-links"><a href="${page.lang === 'is' ? 'personuverndarstefna.html' : 'privacy-policy.html'}">${page.lang === 'is' ? 'Persónuvernd' : 'Privacy'}</a></div></div><div class="cookie-consent-actions"><button class="button button-secondary" id="cw-reject">${page.lang === 'is' ? 'Hafna' : 'Reject'}</button><button class="button button-primary" id="cw-accept">${page.lang === 'is' ? 'Samþykkja' : 'Accept'}</button></div></div>';
      document.body.appendChild(b);
      document.body.style.overflow='hidden';
      document.getElementById('cw-accept').onclick=function(){resolve(true)};
      document.getElementById('cw-reject').onclick=function(){resolve(false)};
    }
    function resolve(ok){
      try{localStorage.setItem(k,JSON.stringify({ok:ok,t:Date.now()}))}catch(e){}
      b.remove(); b=null; document.body.style.overflow=''; if(ok) loadHS();
    }
    function loadHS(){
      if(document.getElementById('hs-script-loader')) return;
      var s=document.createElement('script'); s.id='hs-script-loader'; s.async=true; s.defer=true; s.src=hs; document.head.appendChild(s);
    }
  }();</script>
</body>
</html>
`;
}

prepareOutputDir();

for (const page of pages) {
  writeFileSync(resolve(outputDir, page.file), template(page), 'utf8');
}

console.log(`Generated ${pages.length} static HTML pages in output/.`);

function prepareOutputDir() {
  rmSync(outputDir, { recursive: true, force: true });
  mkdirSync(outputDir, { recursive: true });

  for (const item of ['assets', 'static', 'favicon.ico', 'favicon.svg']) {
    const source = resolve(root, item);
    if (existsSync(source)) {
      cpSync(source, resolve(outputDir, item), { recursive: true });
    }
  }

  writeFileSync(resolve(outputDir, '.nojekyll'), '', 'utf8');

  const cname = resolve(root, 'CNAME');
  if (existsSync(cname)) {
    cpSync(cname, resolve(outputDir, 'CNAME'));
  }
}
