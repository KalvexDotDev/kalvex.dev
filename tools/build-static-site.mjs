import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = resolve(root, 'output');
const bookingUrl = 'https://cal.com/kalvex-jaimie/30min';

const nav = {
  is: [
    ['home', 'index.html', 'Heim'],
    ['services', 'jonusta.html', 'Þjónusta'],
    ['automation', 'umbreyttu-rekstrin.html', 'Sjálfvirkni'],
    ['ai', 'vottanir-og-vidbragd.html', 'Gervigreind'],
    ['pm', 'verkefnastjorun.html', 'Verkefnastjórnun'],
    ['about', 'med-ther-i-lidi.html', 'Með þér'],
    ['insights', 'frettir-og-frasagnir.html', 'Greinar']
  ],
  en: [
    ['home', 'en.html', 'Home'],
    ['services', 'services.html', 'Services'],
    ['automation', 'software-development.html', 'Automation QA'],
    ['ai', 'certifications-and-accreditations.html', 'AI Guardrails'],
    ['pm', 'project-management.html', 'Project Management'],
    ['about', 'with-you-on-your-side.html', 'Working With Us'],
    ['insights', 'news-and-stories.html', 'Insights']
  ]
};

const labels = {
  is: {
    skip: 'Fara beint í efni',
    lang: 'Enska',
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
    services: 'View services',
    homeTag: 'Icelandic technology consultancy for QA, automation and project delivery',
    footerTag:
      'Kalvex helps Icelandic companies turn unpredictable AI acceleration and manual testing into measurable, stable delivery.',
    footerWork: 'Our work',
    footerNext: 'Next step',
    footerNextText:
      'The best first meeting is short, direct, and grounded in a real delivery flow from your team.',
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
    file: 'index.html',
    lang: 'is',
    active: 'home',
    heroCanvas: true,
    alternate: 'en.html',
    title: 'Kalvex | Hugbúnaðarprófanir og sjálfvirkni fyrir íslensk fyrirtæki',
    description:
      'Kalvex er íslensk tækniráðgjöf sem vinnur með hugbúnaðarprófanir, prófunarsjálfvirkni og verkefnastjórnun fyrir fyrirtæki sem nýta gervigreind eða þurfa sterkari sjálfvirkni.',
    eyebrow: 'Hugbúnaðarprófanir fyrir teymi sem nýta gervigreind og fyrirtæki sem þurfa meiri sjálfvirkni',
    h1: 'Byrjaðu að gefa út lausnir með öryggi með því að hafa gæðaeftirlit með frá byrjun.',
    lead:
      'Kalvex hjálpar íslenskum tækniteymum að setja skýr gæðaviðmið, sjálfvirkar prófanir og markvissa verkefnastjórn utan um þróun með gervigreind, handvirkar prófanir og flókin afhendingarverkefni.',
    primaryCta: 'Bóka ráðgjafafund',
    secondaryCta: 'Skoða þjónustu',
    secondaryHref: 'jonusta.html',
    body: `
      <section class="section section-tight">
        <div class="section-heading">
          <p class="eyebrow">Hvar Kalvex skapar mest virði</p>
          <h2>Þrjú vandamál sem þarf að leysa áður en hraðinn verður öruggur</h2>
          <p>Fyrirtæki þurfa ekki fleiri skýrslur sem enda í möppu. Þau þurfa skýr vinnubrögð, sjálfvirkar prófanir og mælingar sem nýtast í daglegri þróun, útgáfum og ákvörðunum.</p>
        </div>
        <div class="card-grid three">
          ${card('Þróun með gervigreind', 'Gervigreindartól geta hraðað kóðun, en þau sannreyna ekki eigin niðurstöður. Kalvex setur upp kröfur, próf, mælingar og útgáfuhlið sem halda vinnunni innan öruggra marka.', 'vottanir-og-vidbragd.html', 'Skoða gervigreind og gæði')}
          ${card('Lítil eða engin sjálfvirkni', 'Ef prófanir eru enn að mestu handvirkar verður hver útgáfa dýrari en hún þarf að vera. Við byggjum sjálfvirka gæðakeðju sem byrjar á mikilvægustu áhættunni.', 'umbreyttu-rekstrin.html', 'Skoða sjálfvirkni')}
          ${card('Verkefni sem missa taktinn', 'Gæði snúast ekki bara um próf. Þau snúast líka um forgangsröðun, skýrar kröfur, ábyrgð og taktfasta framkvæmd.', 'verkefnastjorun.html', 'Skoða verkefnastjórnun')}
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
    file: 'jonusta.html',
    lang: 'is',
    active: 'services',
    alternate: 'services.html',
    title: 'Þjónusta Kalvex | Hugbúnaðarprófanir, sjálfvirkni og verkefnastjórnun',
    description:
      'Þjónusta Kalvex sameinar hugbúnaðarprófanir, prófunarsjálfvirkni, gæði í þróun með gervigreind, nútíma hugbúnaðarafhendingu og verkefnastjórnun fyrir íslensk fyrirtæki.',
    eyebrow: 'Þjónusta',
    h1: 'Gæði sem eru hönnuð inn í afhendinguna, ekki skoðuð eftir á.',
    lead:
      'Við tökum flókin afhendingarvandamál og gerum þau mælanleg: hvað þarf að virka, hvernig það er sannreynt, hver ber ábyrgð og hvenær það má fara í framleiðslu.',
    primaryCta: 'Bóka ráðgjafafund',
    secondaryCta: 'Skoða næsta skref',
    secondaryHref: 'takta-naesta-skref.html',
    body: `
      <section class="section">
        <div class="section-heading">
          <p class="eyebrow">Kjarnavinna</p>
          <h2>Þjónustur sem tengja gæði, hraða og ábyrgð</h2>
        </div>
        <div class="card-grid three">
          ${service('Gæði í þróun með gervigreind', 'Prófunar- og útgáfuhlið fyrir teymi sem nota stór mállíkön, gervigreindartól eða kóða sem verður til með aðstoð gervigreindar.', 'vottanir-og-vidbragd.html')}
          ${service('Prófunarsjálfvirkni', 'Frá handvirkum reykprófum í sjálfvirka keðju sem keyrir á réttum stöðum: við kóðabreytingar, reglulega, fyrir útgáfur og í lærdómi úr framleiðslu.', 'umbreyttu-rekstrin.html')}
          ${service('Prófunararkitektúr', 'Skýr prófunarstefna fyrir forritaskil, notendaflæði, gögn, samþættingar, aðgengi, öryggi og frammistöðu.', 'umbreyttu-rekstrin.html')}
          ${service('Nútíma hugbúnaðarafhending', 'Flæði, endurgjöf og lærdómur í þróunarferlinu: sjálfvirkar keyrslur, útgáfuhlið og mælingar sem gera teymið hraðara án þess að missa áttavitann.', 'vottanir-og-vidbragd.html')}
          ${service('Verkefnastjórnun', 'Áætlanir, forgangsröðun, áhættustýring og framkvæmd sem heldur tæknilegri vinnu tengdri viðskiptamarkmiðum.', 'verkefnastjorun.html')}
          ${service('Kröfugreining og skýr vinnulýsing', 'Óljósar kröfur eru þýddar yfir í samþykktarskilyrði, prófanleg flæði og skjöl sem bæði fólk og gervigreindartól geta fylgt.', 'med-ther-i-lidi.html')}
        </div>
      </section>

      <section class="section split-section">
        <div>
          <p class="eyebrow">Fyrir fyrirtæki sem nýta gervigreind</p>
          <h2>Við leyfum teyminu að nota ný verkfæri án þess að missa stjórn á framleiðslugæðum.</h2>
          <p>Við setjum skýr mörk utan um vinnu með gervigreind: hvaða hlutar kerfisins mega breytast, hvaða kröfur þarf að sannreyna, hvaða próf keyra sjálfkrafa og hvaða mælingar sýna hvort áhættan sé raunverulega að minnka.</p>
        </div>
        <div>
          <p class="eyebrow">Fyrir fyrirtæki sem vantar sjálfvirkni</p>
          <h2>Við byrjum ekki á stóru umbreytingarverkefni. Við byrjum á flæðinu sem veldur mestum sársauka.</h2>
          <p>Fyrsta sjálfvirknin á að spara tíma fljótt. Við veljum próf sem vernda tekjuflæði, mikilvægustu notendaaðgerðir og dýrustu mistökin. Síðan byggjum við kerfið áfram í áföngum.</p>
        </div>
      </section>

      <section class="section section-contrast">
        <div class="section-heading">
          <p class="eyebrow">Afhendingar</p>
          <h2>Það sem stendur eftir þegar Kalvex klárar áfangann</h2>
        </div>
        <div class="outcome-grid">
          ${outcome('Sjálfvirk próf sem keyra í réttu samhengi')}
          ${outcome('Útgáfuhlið með skýrum samþykktarreglum')}
          ${outcome('Mælikvarðar fyrir gæði, hraða og áhættu')}
          ${outcome('Kröfur sem eru nógu skýrar fyrir fólk og gervigreindartól')}
          ${outcome('Forgangsröðuð áætlun fyrir næstu áfanga')}
          ${outcome('Teymi sem skilur og á nýja verklagið')}
        </div>
      </section>
    `
  },
  {
    file: 'umbreyttu-rekstrin.html',
    lang: 'is',
    active: 'automation',
    alternate: 'software-development.html',
    title: 'Prófunarsjálfvirkni | Kalvex',
    description:
      'Kalvex hjálpar fyrirtækjum að fara frá handvirkum prófunum yfir í sjálfvirka gæðakeðju sem styður hraðari og öruggari útgáfur.',
    eyebrow: 'Prófunarsjálfvirkni',
    h1: 'Frá handvirkum prófunum í sjálfvirka gæðakeðju.',
    lead:
      'Ef lykilfólk þarf að smella sig í gegnum sömu prófin fyrir hverja útgáfu er gæðakerfið orðið flöskuháls. Við hjálpum þér að byggja sjálfvirkni sem lækkar áhættu og losar tíma.',
    primaryCta: 'Bóka sjálfvirknifund',
    secondaryCta: 'Skoða þjónustu',
    secondaryHref: 'jonusta.html',
    body: `
      <section class="section split-section">
        <div>
          <p class="eyebrow">Vandinn</p>
          <h2>Handvirkar hugbúnaðarprófanir eru oft hetjuleg vinna. Hún er bara ekki skalanleg.</h2>
          <p>Þegar prófanir búa í minni einstaklinga verður hver útgáfa háð því hver er í vinnu, hvað hann man og hversu mikill tími er eftir. Það virkar í smáum teymum, en brotnar þegar vörur, samþættingar og viðskiptakröfur stækka.</p>
          <p>Kalvex breytir þessari þekkingu í keyranlegar varnir: próf, mælingar, samþykktarskilyrði og útgáfuhlið sem hjálpa teyminu áður en villan lendir hjá viðskiptavini.</p>
        </div>
        <div class="note-panel">
          <h3>Merki um að sjálfvirkni sé orðin tímabær</h3>
          <ul class="check-list">
            <li>Útgáfur bíða eftir handvirkum reykprófum.</li>
            <li>Sömu villurnar koma aftur eftir lagfæringar.</li>
            <li>Þróunarteymið treystir ekki prófunarumhverfum.</li>
            <li>Kröfur eru ræddar aftur og aftur í stað þess að vera prófanlegar.</li>
            <li>Gervigreind eða hraðari kóðun hefur aukið breytingamagn án sambærilegra varna.</li>
          </ul>
        </div>
      </section>

      <section class="section">
        <div class="section-heading">
          <p class="eyebrow">Áfangar</p>
          <h2>Við byggjum sjálfvirkni í réttri röð</h2>
        </div>
        <div class="timeline">
          ${step('01', 'Kortleggja áhættu', 'Við finnum flæðin þar sem bilun kostar mest: tekjur, þjónusturof, gögn, samþættingar eða orðspor.')}
          ${step('02', 'Hanna prófunargrunn', 'Við skilgreinum hvaða próf eiga heima í einingum, forritaskilum, notendaflæði, samþættingum og framleiðsluvöktun.')}
          ${step('03', 'Setja í vinnuflæðið', 'Prófin verða hluti af sjálfvirkri keyrslu, ekki auka verkefni sem einhver man eftir í lokin.')}
          ${step('04', 'Mæla og bæta', 'Við fylgjumst með óstöðugleika, keyrslutíma, villumynstrum og áhrifum á útgáfuhraða.')}
        </div>
      </section>

      <section class="section section-tight">
        <div class="section-heading">
          <p class="eyebrow">Niðurstaða</p>
          <h2>Sjálfvirkni sem þjónar teyminu</h2>
          <p>Markmiðið er ekki að skrifa sem flest próf. Markmiðið er að vita fyrr hvað má senda út, hvað þarf að laga og hvaða áhættu stjórnendur eru að samþykkja.</p>
        </div>
        <div class="card-grid three">
          ${plainCard('Minni endurvinna', 'Villur finnast nær breytingunni sjálfri og kosta minna að laga.')}
          ${plainCard('Skýrari ábyrgð', 'Samþykktarskilyrði og útgáfuhlið gera það augljóst hverju þarf að ljúka.')}
          ${plainCard('Meiri hraði með minni spennu', 'Teymið getur gefið út oftar án þess að reiða sig á heppni eða hetjuskap.')}
        </div>
      </section>
    `
  },
  {
    file: 'vottanir-og-vidbragd.html',
    lang: 'is',
    active: 'ai',
    alternate: 'certifications-and-accreditations.html',
    title: 'Gæði í þróun með gervigreind | Kalvex',
    description:
      'Kalvex setur upp skýr gæðaviðmið fyrir hugbúnaðarþróun með gervigreind, þar á meðal próf, útgáfuhlið, mælingar og lærdómsferla.',
    eyebrow: 'Gervigreind og gæði',
    h1: 'Skýr gæðaviðmið fyrir hraðari þróun með gervigreind.',
    lead:
      'Gervigreind getur hraðað þróun, en hraði án sannprófunar eykur áhættu. Kalvex hjálpar teymum að nýta gervigreind í þróun án þess að fórna öryggi, stöðugleika eða yfirsýn.',
    primaryCta: 'Bóka fund um gervigreind og gæði',
    secondaryCta: 'Lesa um aðferðina',
    secondaryHref: 'frettir-og-frasagnir.html',
    body: `
      <section class="section split-section">
        <div>
          <p class="eyebrow">Af hverju þetta skiptir máli</p>
          <h2>Þú getur ekki treyst einu gervigreindarflæði til að sannreyna annað gervigreindarflæði.</h2>
          <p>Stór mállíkön eru öflug í að búa til tillögur, en þau hafa ekki heildstæða ábyrgð á framleiðslukerfinu þínu. Þau þekkja ekki viðkvæmustu eldri samþættingarnar, óskrifuðu reglurnar eða rekstrarlegu afleiðingarnar þegar röng breyting fer út.</p>
          <p>Við setjum því upp varnir sem eru óháðar framleiðsluhraðanum: skilgreindar kröfur, keyranleg próf, útgáfuhlið, mælingar og viðbragð þegar eitthvað fer úrskeiðis.</p>
        </div>
        <div class="formula-panel">
          <span class="formula-label">Sannprófun</span>
          <strong>Auðvelt er að búa til kóða. Erfiðara er að sanna að hann virki.</strong>
          <p>Það sem lítur út eins og hraðari kóðun getur falið í sér flóknari samþættingar, fleiri möguleg kerfisástand og meiri þörf fyrir formlega sannprófun.</p>
        </div>
      </section>

      <section class="section">
        <div class="section-heading">
          <p class="eyebrow">Gæðavarnir</p>
          <h2>Hvað Kalvex setur utan um þróun með gervigreind</h2>
        </div>
        <div class="feature-list">
          ${feature('Notkunarstefna fyrir gervigreind í þróun', 'Hvað má gervigreind búa til, hvað þarf mannlegt samþykki, hvaða gögn má nota og hvaða hluta kerfisins þarf að verja sérstaklega.')}
          ${feature('Prófanlegar kröfur og skýrt samhengi', 'Kröfur, samþykktarskilyrði og tæknileg mörk eru skrifuð þannig að bæði fólk og gervigreindartól skilji hvað má breytast.')}
          ${feature('Útgáfuhlið sem stöðva ranga áhættu', 'Sjálfvirk yfirferð, kóðarýni, öryggispróf og mælingar mynda síu áður en breytingar fara í framleiðslu.')}
          ${feature('Viðbragð þegar gæði brotna', 'Við skilgreinum hvernig teymið greinir, forgangsraðar og lokar bilunum sem sleppa í gegn, svo kerfið læri af atvikum.')}
        </div>
      </section>

      <section class="section section-contrast">
        <div class="section-heading">
          <p class="eyebrow">Fyrir stjórnendur</p>
          <h2>Áhætta í vinnu með gervigreind verður sýnileg og stjórnunarhæf</h2>
          <p>Framkvæmdastjóri vill hraða. Tæknistjóri þarf stöðugleika. Kalvex býr til sameiginlegt tungumál: hvaða áhætta er til staðar, hvaða varnir eru virkar og hvað þarf að fjárfesta í næst.</p>
        </div>
        <div class="outcome-grid">
          ${outcome('Skýr mörk fyrir notkun gervigreindar')}
          ${outcome('Mælanleg staða prófunarþekju')}
          ${outcome('Áhættusýn fyrir eldri kerfi')}
          ${outcome('Útgáfureglur sem teymið skilur')}
          ${outcome('Minni líkur á óvönduðum kóða úr gervigreindartólum')}
          ${outcome('Rólegra samtal milli tækni og rekstrar')}
        </div>
      </section>
    `
  },
  {
    file: 'verkefnastjorun.html',
    lang: 'is',
    active: 'pm',
    alternate: 'project-management.html',
    title: 'Verkefnastjórnun fyrir tækniteymi | Kalvex',
    description:
      'Kalvex veitir verkefnastjórnun fyrir hugbúnaðar-, prófunar- og sjálfvirkniverkefni þar sem kröfur, áhætta, gæði og afhending þurfa að haldast í takt.',
    eyebrow: 'Verkefnastjórnun',
    h1: 'Tækniverkefni þurfa skýran takt, ekki fleiri stöðufundi.',
    lead:
      'Við tengjum saman viðskiptamarkmið, kröfur, tæknilega áhættu og daglega framkvæmd svo verkefni færist áfram með meiri ró og minni óvissu.',
    primaryCta: 'Bóka verkefnafund',
    secondaryCta: 'Skoða þjónustu',
    secondaryHref: 'jonusta.html',
    body: `
      <section class="section split-section">
        <div>
          <p class="eyebrow">Afhendingarstjórn</p>
          <h2>Góð verkefnastjórn í tækni snýst um að gera óvissu sýnilega nógu snemma.</h2>
          <p>Flest hugbúnaðarverkefni fara ekki úrskeiðis vegna þess að fólk vinnur ekki nóg. Þau fara úrskeiðis þegar kröfur eru óskýrar, áhætta er falin, gæðaviðmið vantar og ákvarðanir bíða of lengi.</p>
          <p>Kalvex kemur með rólega, mælanlega og tæknilega læsa verkefnastjórn. Við sjáum um að halda samhengi milli áætlunar, prófana, útgáfa, forgangsröðunar og ákvarðana stjórnenda.</p>
        </div>
        <div class="note-panel">
          <h3>Við hjálpum þegar</h3>
          <ul class="check-list">
            <li>verkefni er mikilvægt en eigendahlutverk eru óskýr,</li>
            <li>vara, þróun og gæði vinna í sitthvoru lagi,</li>
            <li>útgáfudagar færast án sýnilegrar ástæðu,</li>
            <li>gervigreind eða sjálfvirkni breytir vinnuhraða hraðar en ferlarnir ráða við,</li>
            <li>stjórnendur þurfa heiðarlega mynd af stöðu og áhættu.</li>
          </ul>
        </div>
      </section>

      <section class="section">
        <div class="section-heading">
          <p class="eyebrow">Rammi</p>
          <h2>Hvernig við stjórnum tæknilegri framkvæmd</h2>
        </div>
        <div class="card-grid three">
          ${plainCard('Skýr markmið', 'Við skilgreinum hvað árangur þýðir, hvernig hann er mældur og hvaða áhætta má ekki fara fram hjá teyminu.')}
          ${plainCard('Tæknileg forgangsröðun', 'Við forgangsröðum ekki bara eftir óskalistum. Við vegum saman viðskiptavirði, áhættu, tækniskuld og gæðakröfur.')}
          ${plainCard('Ábyrgð í framkvæmd', 'Stöðufundir eru ekki nóg. Við tryggjum ákvarðanir, eigendur, næstu skref og sýnilega lokun á opnum málum.')}
        </div>
      </section>

      <section class="section section-contrast">
        <div class="section-heading">
          <p class="eyebrow">Sýnilegar niðurstöður</p>
          <h2>Verkefnastjórn sem hjálpar bæði stjórnendum og tækniteymi</h2>
        </div>
        <div class="outcome-grid">
          ${outcome('Raunhæf áætlun með áhættum')}
          ${outcome('Skýrari verklisti og ákvarðanir')}
          ${outcome('Gæðaviðmið tengd útgáfum')}
          ${outcome('Betra samtal milli framkvæmdastjóra, tæknistjóra og teymis')}
          ${outcome('Minni endurvinna og færri óvænt stopp')}
          ${outcome('Regluleg stöðumynd sem má treysta')}
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
    file: 'frettir-og-frasagnir.html',
    lang: 'is',
    active: 'insights',
    alternate: 'news-and-stories.html',
    title: 'Greinar og innsýn | Kalvex',
    description:
      'Greinar Kalvex um sannprófun, gervigreind í hugbúnaðarþróun, prófunarsjálfvirkni og verkefnastjórnun fyrir íslensk tækniteymi.',
    eyebrow: 'Greinar og innsýn',
    h1: 'Hugmyndirnar á bak við betri gæðamál.',
    lead:
      'Á meðan opinberar reynslusögur eru ekki í forgrunni notum við vefinn til að sýna aðferðina: hvernig við hugsum um gervigreind, sjálfvirkni, gæði og framkvæmd.',
    primaryCta: 'Bóka ráðgjafafund',
    secondaryCta: 'Skoða þjónustu',
    secondaryHref: 'jonusta.html',
    body: `
      <section class="section">
        <div class="article-stack">
          ${article('Leiðarvísir fyrir tæknistjóra', 'Hvernig nýtir teymið gervigreind án þess að missa yfirsýn?', 'Gervigreind eykur breytingamagn og hraða, en gæði verða ekki sjálfkrafa betri. Fyrsta skrefið er að aðgreina myndun frá sannprófun: hvað má gervigreind gera, hvað þarf kerfið að sanna og hvaða útgáfuhlið vernda viðskiptin.')}
          ${article('Greining', 'Af hverju handvirkar prófanir verða dýrari með hverri útgáfu', 'Handvirkar prófanir virka á meðan kerfið er lítið og allir muna söguna. Þegar vara, viðskiptareglur og samþættingar stækka þarf þekkingin að færast yfir í keyranleg próf og sýnilega mælikvarða.')}
          ${article('Aðferð', 'Verkefnastjórn er hluti af gæðakerfinu', 'Óskýrar kröfur, seinar ákvarðanir og ósýnileg áhætta birtast oft sem gæðavandamál. Þess vegna tengir Kalvex verkefnastjórn við prófanir, útgáfur og ábyrgð frá fyrsta degi.')}
        </div>
      </section>

      <section class="section split-section">
        <div>
          <p class="eyebrow">Afstaða</p>
          <h2>Gæði eru ekki deild. Gæði eru rekstrarkerfi.</h2>
          <p>Í nútíma hugbúnaðarþróun er ekki nóg að hafa prófara í lok ferlis. Gæðin þurfa að birtast í því hvernig kröfur eru skrifaðar, hvernig kóði er samþykktur, hvernig umhverfi eru rekin, hvernig útgáfur eru stöðvaðar og hvernig stjórnendur sjá áhættu.</p>
        </div>
        <div>
          <p class="eyebrow">Næsta grein</p>
          <h2>Leiðarvísir fyrir íslenska tæknistjóra um gervigreind og gæði</h2>
          <p>Þessi leiðarvísir verður notaður sem upphafspunktur fyrir fundi með stjórnendum sem vilja nýta gervigreind án þess að missa stjórn á gæðum og afhendingu.</p>
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
    secondaryCta: 'Skoða þjónustu',
    secondaryHref: 'jonusta.html',
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
    file: 'en.html',
    lang: 'en',
    active: 'home',
    heroCanvas: true,
    alternate: 'index.html',
    title: 'Kalvex | QA and automation for Icelandic companies',
    description:
      'Kalvex is an Icelandic technology consultancy building QA, test automation and project delivery systems for AI-forward teams and companies without enough automation.',
    eyebrow: 'QA for AI-forward teams and companies that need automation',
    h1: 'Stop retrofitting quality. Start shipping with certainty.',
    lead:
      'Kalvex builds deterministic quality guardrails for Icelandic technology teams. We help companies turn AI acceleration, manual testing and complex delivery into stable, measurable engineering.',
    primaryCta: 'Book a sales meeting',
    secondaryCta: 'View services',
    secondaryHref: 'services.html',
    body: `
      <section class="section section-tight">
        <div class="section-heading">
          <p class="eyebrow">Where Kalvex creates the most value</p>
          <h2>Three problems must be solved before speed becomes safe</h2>
          <p>Companies do not need another report that disappears into a folder. They need quality systems that become part of daily development, release decisions and leadership visibility.</p>
        </div>
        <div class="card-grid three">
          ${card('AI-forward engineering', 'LLM tools can accelerate coding, but they do not verify their own output. Kalvex installs requirements, tests, metrics and release gates that keep experimentation inside safe boundaries.', 'certifications-and-accreditations.html', 'View AI guardrails')}
          ${card('Little or no automation', 'When testing is still mostly manual, every release costs more than it should. We build an automated quality pipeline that starts with the highest-value risk.', 'software-development.html', 'View automation QA')}
          ${card('Projects losing delivery rhythm', 'Quality is not only about tests. It is also prioritization, clear requirements, ownership and execution cadence.', 'project-management.html', 'View project management')}
        </div>
      </section>

      <section class="section split-section">
        <div>
          <p class="eyebrow">Verification gap</p>
          <h2>AI can generate code quickly. That is not the same as knowing it works.</h2>
          <p>Large language models are powerful at generating ideas and code, but verifying a complex system is often computationally harder than generation itself. Legacy integrations, parallel changes and unclear requirements create state explosion no agent sees end to end.</p>
          <p>Kalvex bridges that gap with test architecture, release controls, measurable acceptance criteria and clear delivery governance. The goal is not to slow the team down. The goal is to make speed usable.</p>
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

      <section class="section">
        <div class="section-heading">
          <p class="eyebrow">Method</p>
          <h2>Consulting that leaves working systems behind</h2>
        </div>
        <div class="feature-list">
          ${feature('We measure before changing', 'We map delivery flow, defect patterns, release cadence and current test coverage before recommending a solution.')}
          ${feature('We work inside the team', 'Kalvex does not arrive as combative oversight. We work with product, engineering, quality and leadership so the change sticks.')}
          ${feature('We deliver tools, not just opinions', 'The result should be running tests, clearer requirements, better workflows and dashboards that show the real state of quality.')}
        </div>
      </section>
    `
  },
  {
    file: 'services.html',
    lang: 'en',
    active: 'services',
    alternate: 'jonusta.html',
    title: 'Kalvex Services | QA, automation and project delivery',
    description:
      'Kalvex services combine software QA, test automation, AI quality guardrails, modern software delivery and project management for Icelandic companies.',
    eyebrow: 'Services',
    h1: 'Quality designed into delivery, not inspected after the fact.',
    lead:
      'We take complex delivery problems and make them measurable: what must work, how it is verified, who owns it and when it is safe to release.',
    primaryCta: 'Book a sales meeting',
    secondaryCta: 'View next steps',
    secondaryHref: 'next-steps.html',
    body: `
      <section class="section">
        <div class="section-heading">
          <p class="eyebrow">Core work</p>
          <h2>Services that connect quality, speed and ownership</h2>
        </div>
        <div class="card-grid three">
          ${service('AI quality guardrails', 'Testing and release controls for teams using LLMs, Copilot, agent workflows or AI-generated code in daily development.', 'certifications-and-accreditations.html')}
          ${service('Test automation', 'From manual smoke tests to an automated pipeline that runs in the right places: pull request, nightly, release and learning from production.', 'software-development.html')}
          ${service('QA architecture', 'A clear test strategy across APIs, user flows, data, integrations, accessibility, security and performance.', 'software-development.html')}
          ${service('Modern software delivery', 'Feedback loops, flow and learning in the development system: CI/CD, release gates and metrics that make the team faster without losing the plot.', 'certifications-and-accreditations.html')}
          ${service('Project management', 'Plans, prioritization, risk management and execution that keep technical work connected to business outcomes.', 'project-management.html')}
          ${service('Requirements codification', 'Ambiguous requirements become acceptance criteria, testable flows and documents that both people and AI tools can follow.', 'with-you-on-your-side.html')}
        </div>
      </section>

      <section class="section split-section">
        <div>
          <p class="eyebrow">For AI-forward companies</p>
          <h2>We let the team use new tools without losing control of production quality.</h2>
          <p>We set boundaries around AI acceleration: what may change, what must be verified, which tests run automatically and which metrics tell leadership whether risk is really going down.</p>
        </div>
        <div>
          <p class="eyebrow">For companies without enough automation</p>
          <h2>We do not start with a giant transformation program. We start with the flow causing the most pain.</h2>
          <p>The first automation should save time quickly. We choose tests that protect revenue flows, critical user actions and expensive mistakes. Then we expand the system in stages.</p>
        </div>
      </section>

      <section class="section section-contrast">
        <div class="section-heading">
          <p class="eyebrow">Deliverables</p>
          <h2>What remains after a Kalvex engagement</h2>
        </div>
        <div class="outcome-grid">
          ${outcome('Automated tests running in the right context')}
          ${outcome('Release gates with clear acceptance rules')}
          ${outcome('Quality, speed and risk metrics')}
          ${outcome('Requirements clear enough for people and AI')}
          ${outcome('Prioritized plan for the next stages')}
          ${outcome('A team that understands and owns the workflow')}
        </div>
      </section>
    `
  },
  {
    file: 'software-development.html',
    lang: 'en',
    active: 'automation',
    alternate: 'umbreyttu-rekstrin.html',
    title: 'Automation QA | Kalvex',
    description:
      'Kalvex helps companies move from manual testing to an automated quality pipeline that supports faster and safer releases.',
    eyebrow: 'Test automation',
    h1: 'From manual testing to an automated quality pipeline.',
    lead:
      'If key people must click through the same tests before every release, quality has become a bottleneck. We help you build automation that lowers risk and gives time back to the team.',
    primaryCta: 'Book an automation meeting',
    secondaryCta: 'View services',
    secondaryHref: 'services.html',
    body: `
      <section class="section split-section">
        <div>
          <p class="eyebrow">The problem</p>
          <h2>Manual QA is often heroic work. It is just not scalable.</h2>
          <p>When testing lives in individual memory, every release depends on who is available, what they remember and how much time is left. That works in small teams, but it breaks as products, business rules and integrations grow.</p>
          <p>Kalvex turns that knowledge into executable guardrails: tests, metrics, acceptance criteria and release gates that help the team before defects reach customers.</p>
        </div>
        <div class="note-panel">
          <h3>Signs automation is overdue</h3>
          <ul class="check-list">
            <li>Releases wait for manual smoke tests.</li>
            <li>The same defects return after fixes.</li>
            <li>Engineering does not trust test environments.</li>
            <li>Requirements are debated repeatedly instead of becoming testable.</li>
            <li>AI or faster coding has increased change volume without equivalent safeguards.</li>
          </ul>
        </div>
      </section>

      <section class="section">
        <div class="section-heading">
          <p class="eyebrow">Stages</p>
          <h2>We build automation in the right order</h2>
        </div>
        <div class="timeline">
          ${step('01', 'Map risk', 'We identify the flows where failure costs the most: revenue, downtime, data, integrations or reputation.')}
          ${step('02', 'Design the test foundation', 'We define which tests belong at unit, API, user flow, integration and production monitoring level.')}
          ${step('03', 'Move into CI/CD', 'Tests become part of the workflow, not extra work someone remembers at the end.')}
          ${step('04', 'Measure and improve', 'We track flakiness, runtime, defect patterns and the impact on release speed.')}
        </div>
      </section>

      <section class="section section-tight">
        <div class="section-heading">
          <p class="eyebrow">Result</p>
          <h2>Automation that serves the business</h2>
          <p>The goal is not to write as many tests as possible. The goal is to know earlier what can be shipped, what must be fixed and what risk leadership is accepting.</p>
        </div>
        <div class="card-grid three">
          ${plainCard('Less rework', 'Defects are found closer to the change itself and cost less to fix.')}
          ${plainCard('Clearer ownership', 'Acceptance criteria and release gates make the remaining work visible.')}
          ${plainCard('More speed with less tension', 'The team can release more often without relying on luck or heroics.')}
        </div>
      </section>
    `
  },
  {
    file: 'certifications-and-accreditations.html',
    lang: 'en',
    active: 'ai',
    alternate: 'vottanir-og-vidbragd.html',
    title: 'AI Guardrails and Release Response | Kalvex',
    description:
      'Kalvex installs deterministic quality guardrails for AI-assisted software development, including tests, release gates, metrics and learning loops.',
    eyebrow: 'AI quality guardrails',
    h1: 'Deterministic safeguards for unpredictable AI acceleration.',
    lead:
      'AI can accelerate development, but speed without verification becomes operational risk. Kalvex helps teams use AI in engineering without sacrificing security, stability or control.',
    primaryCta: 'Book an AI quality meeting',
    secondaryCta: 'Read the method',
    secondaryHref: 'news-and-stories.html',
    body: `
      <section class="section split-section">
        <div>
          <p class="eyebrow">Why it matters</p>
          <h2>You cannot rely on one AI flow to verify another AI flow.</h2>
          <p>LLM tools are excellent at generating suggestions, but they do not carry end-to-end responsibility for your production system. They do not know the most fragile legacy integrations, unwritten business rules or operational consequences of the wrong change.</p>
          <p>We install safeguards that are independent of generation speed: defined requirements, executable tests, release gates, metrics and a learning loop when something breaks.</p>
        </div>
        <div class="formula-panel">
          <span class="formula-label">Verification gap</span>
          <strong>Generation is cheap. Verification is not.</strong>
          <p>What looks like faster coding can hide more complex integrations, more state combinations and a greater need for formal verification.</p>
        </div>
      </section>

      <section class="section">
        <div class="section-heading">
          <p class="eyebrow">Guardrails</p>
          <h2>What Kalvex puts around AI-assisted development</h2>
        </div>
        <div class="feature-list">
          ${feature('AI usage policy for engineering', 'What AI may generate, what needs human approval, which data may be used and which parts of the system need special protection.')}
          ${feature('Testable requirements and prompt context', 'Requirements, acceptance criteria and technical boundaries are written so people and AI tools understand what may change.')}
          ${feature('Release gates that stop the wrong risk', 'Automated checks, code review rules, security tests and operational metrics form a filter before changes reach production.')}
          ${feature('Response when quality breaks', 'We define how the team detects, prioritizes and closes defects that slip through so the system learns from incidents.')}
        </div>
      </section>

      <section class="section section-contrast">
        <div class="section-heading">
          <p class="eyebrow">For leaders</p>
          <h2>AI risk becomes visible and manageable</h2>
          <p>The CEO wants speed. The CTO needs stability. Kalvex creates a shared language: which risks exist, which safeguards are active and what needs investment next.</p>
        </div>
        <div class="outcome-grid">
          ${outcome('Clear boundaries for AI usage')}
          ${outcome('Measurable test coverage state')}
          ${outcome('Risk view across legacy systems')}
          ${outcome('Release rules the team understands')}
          ${outcome('Less AI slop reaching production')}
          ${outcome('Calmer conversation between leadership and engineering')}
        </div>
      </section>
    `
  },
  {
    file: 'project-management.html',
    lang: 'en',
    active: 'pm',
    alternate: 'verkefnastjorun.html',
    title: 'Project Management for Technology Teams | Kalvex',
    description:
      'Kalvex provides project management for software, QA and automation initiatives where requirements, risk, quality and delivery must stay aligned.',
    eyebrow: 'Project management',
    h1: 'Technology projects need clear cadence, not more status meetings.',
    lead:
      'We connect business goals, requirements, technical risk and daily execution so work moves forward with more calm and less uncertainty.',
    primaryCta: 'Book a project meeting',
    secondaryCta: 'View services',
    secondaryHref: 'services.html',
    body: `
      <section class="section split-section">
        <div>
          <p class="eyebrow">Delivery governance</p>
          <h2>Good technology project management makes uncertainty visible early enough to act.</h2>
          <p>Most software projects do not fail because people are not working hard enough. They fail when requirements are unclear, risk is hidden, quality standards are missing and decisions wait too long.</p>
          <p>Kalvex brings calm, measurable and technically literate project management. We keep roadmap, testing, releases, prioritization and leadership decisions connected.</p>
        </div>
        <div class="note-panel">
          <h3>We help when</h3>
          <ul class="check-list">
            <li>the work matters but ownership is unclear,</li>
            <li>product, engineering and quality work in separate lanes,</li>
            <li>release dates move without a visible reason,</li>
            <li>AI or automation changes delivery speed faster than the process can handle,</li>
            <li>leadership needs an honest view of state and risk.</li>
          </ul>
        </div>
      </section>

      <section class="section">
        <div class="section-heading">
          <p class="eyebrow">Framework</p>
          <h2>How we govern technical execution</h2>
        </div>
        <div class="card-grid three">
          ${plainCard('Clear goals', 'We define what success means, how it is measured and which risks the team cannot ignore.')}
          ${plainCard('Technical prioritization', 'We do not prioritize by wish list alone. We weigh business value, risk, technical debt and quality requirements.')}
          ${plainCard('Accountability in execution', 'Status meetings are not enough. We drive decisions, owners, next actions and visible closure of open issues.')}
        </div>
      </section>

      <section class="section section-contrast">
        <div class="section-heading">
          <p class="eyebrow">Visible outcomes</p>
          <h2>Project management that helps both leadership and engineering</h2>
        </div>
        <div class="outcome-grid">
          ${outcome('Realistic plan with risks')}
          ${outcome('Clearer backlog and decisions')}
          ${outcome('Quality criteria tied to releases')}
          ${outcome('Better CEO, CTO and team conversation')}
          ${outcome('Less rework and fewer surprise stops')}
          ${outcome('Regular state view leadership can trust')}
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
      'Kalvex works inside the real context of the client. We are honest, technically precise and collaborative because quality only sticks when the team owns the change.',
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
    file: 'news-and-stories.html',
    lang: 'en',
    active: 'insights',
    alternate: 'frettir-og-frasagnir.html',
    title: 'Insights | Kalvex',
    description:
      'Kalvex insights on the verification gap, AI quality guardrails, test automation and project management for Icelandic technology teams.',
    eyebrow: 'Insights',
    h1: 'The thinking behind better quality systems.',
    lead:
      'While public case studies are not the center of the site, we use these pages to show the method: how we think about AI, automation, quality and delivery.',
    primaryCta: 'Book a sales meeting',
    secondaryCta: 'View services',
    secondaryHref: 'services.html',
    body: `
      <section class="section">
        <div class="article-stack">
          ${article('CTO guide', 'How does a team survive AI indeterminism?', 'AI increases change volume and speed, but quality does not automatically improve. The first step is separating generation from verification: what AI may do, what the system must prove and which release gates protect the business.')}
          ${article('Analysis', 'Why manual QA gets more expensive with every release', 'Manual testing works while the system is small and everyone remembers the story. As the product, business rules and integrations grow, that knowledge must move into executable tests and visible metrics.')}
          ${article('Method', 'Project management is part of the quality system', 'Unclear requirements, late decisions and invisible risk often show up as quality problems. That is why Kalvex connects project management to testing, releases and ownership from day one.')}
        </div>
      </section>

      <section class="section split-section">
        <div>
          <p class="eyebrow">Manifesto</p>
          <h2>Quality is not a department. Quality is an operating system.</h2>
          <p>Modern software delivery cannot rely on testing at the end of the process. Quality must appear in how requirements are written, how code is approved, how environments are operated, how releases are stopped and how leadership sees risk.</p>
        </div>
        <div>
          <p class="eyebrow">Upcoming guide</p>
          <h2>The Icelandic CTO's Guide to Surviving AI Indeterminism</h2>
          <p>This guide will be used as a sales asset and starting point for leadership conversations with teams that want to use AI without losing control of delivery quality.</p>
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
    secondaryCta: 'View services',
    secondaryHref: 'services.html',
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
          ${plainCard('Fundabókanir', 'Þegar þú bókar fund í gegnum Cal.com vinnast upplýsingar á borð við nafn, netfang, tíma fundar og skilaboð sem þú velur að senda.')}
          ${plainCard('Markaðs- og vefmælingar', 'HubSpot er aðeins hlaðið eftir samþykki fyrir valkvæðum vefkökum. Þá geta vefkökur og auðkenni tengst heimsókn og samskiptum við vefinn.')}
        </div>

        <h2>Lagagrundvöllur</h2>
        <p>Rekstur, öryggi og grunnmælingar sem nauðsynlegar eru fyrir vefinn byggja á lögmætum hagsmunum Kalvex af því að reka öruggan og virkan vef. Fundabókanir og samskipti byggja á því að gera ráðstafanir að beiðni þinni áður en mögulegt samningssamband hefst. Valkvæðar vefmælingar og HubSpot byggja á samþykki þínu.</p>

        <h2>Þjónustuaðilar</h2>
        <p>Við notum þjónustuaðila til að hýsa vefinn, birta efni, bóka fundi og greina samþykktar vefmælingar. Slíkir aðilar vinna upplýsingar samkvæmt eigin skilmálum eða sem vinnsluaðilar eftir því sem við á. Dæmi eru GitHub Pages, Cal.com og HubSpot.</p>

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
        <p><button type="button" class="button button-secondary inline-consent-button" data-consent-settings>Stilla vefkökur</button></p>
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
          ${plainCard('Meeting bookings', 'When you book through Cal.com, details such as name, email address, meeting time and any message you provide may be processed.')}
          ${plainCard('Marketing analytics', 'HubSpot loads only after optional cookie consent. If accepted, cookies and identifiers may be connected to website visits and interactions.')}
        </div>

        <h2>Legal basis</h2>
        <p>Website operation and security rely on Kalvex's legitimate interests in running a secure and functioning website. Meeting bookings and direct communications rely on steps taken at your request before a possible contract. Optional analytics and HubSpot rely on your consent.</p>

        <h2>Service providers</h2>
        <p>We use providers to host the site, publish content, arrange meetings and run consented analytics. These providers process data under their own terms or as processors where applicable. Examples include GitHub Pages, Cal.com and HubSpot.</p>

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
        <p><button type="button" class="button button-secondary inline-consent-button" data-consent-settings>Cookie settings</button></p>
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
  services: {
    is: {
      image: 'assets/img/code-quality.jpg',
      alt: 'Nærmynd af hugbúnaðarkóða á tölvuskjá.',
      kicker: 'Þjónusta',
      title: 'Gæði þurfa að sjást í kröfum, kóða, prófunum og ákvörðunum.',
      text:
        'Þjónusta Kalvex er hönnuð fyrir teymi sem þurfa að breyta óljósri áhættu í vinnandi kerfi: prófanir, útgáfuhlið, mælingar og skýrari verkefnastýringu.',
      caption: 'Prófunarvinna á að vera hluti af þróunarflæðinu, ekki aðskilin lokaskoðun.',
      points: [
        ['Greina', 'Finna flæðin þar sem mistök kosta mest.'],
        ['Byggja', 'Setja upp prófanir og útgáfuhlið sem teymið notar.'],
        ['Festa', 'Gera mælingar, ábyrgð og lærdóm sýnileg.']
      ]
    },
    en: {
      image: 'assets/img/code-quality.jpg',
      alt: 'Close-up of software code on a computer screen.',
      kicker: 'Services',
      title: 'Quality has to show up in requirements, code, tests and decisions.',
      text:
        'Kalvex services are designed for teams that need to turn unclear risk into a working system: tests, release gates, metrics and sharper project control.',
      caption: 'Testing belongs inside the delivery flow, not as a separate final inspection.',
      points: [
        ['Diagnose', 'Find the flows where defects cost the most.'],
        ['Build', 'Install tests and gates the team actually uses.'],
        ['Anchor', 'Make metrics, ownership and learning visible.']
      ]
    }
  },
  automation: {
    is: {
      image: 'assets/img/server-rack.jpg',
      alt: 'Netþjónaskápar í tæknirými.',
      kicker: 'Sjálfvirkni',
      title: 'Sjálfvirkni þarf að byrja þar sem áhættan er raunveruleg.',
      text:
        'Við byrjum ekki á því að skrifa próf fyrir allt. Við finnum þau flæði sem skipta mestu máli og byggjum sjálfvirka endurgjöf sem styður þróun, útgáfur og rekstur.',
      caption: 'Góð prófunarsjálfvirkni er innviður fyrir traustari afhendingu.',
      points: [
        ['Áhætta', 'Tekjur, gögn, samþættingar og mikilvæg notendaflæði.'],
        ['Endurgjöf', 'Próf sem keyra á réttum stað í þróunarferlinu.'],
        ['Útgáfur', 'Skýr merki um hvað má fara áfram og hvað þarf athygli.']
      ]
    },
    en: {
      image: 'assets/img/server-rack.jpg',
      alt: 'Server racks in a data center.',
      kicker: 'Automation',
      title: 'Automation should begin where the risk is real.',
      text:
        'We do not start by trying to test everything. We identify the flows that matter most and build automated feedback that supports development, releases and operations.',
      caption: 'Good test automation is infrastructure for calmer, more reliable delivery.',
      points: [
        ['Risk', 'Revenue, data, integrations and critical user flows.'],
        ['Feedback', 'Tests that run at the right point in the delivery path.'],
        ['Release', 'Clear signals for what can move and what needs attention.']
      ]
    }
  },
  ai: {
    is: {
      image: 'assets/img/code-quality.jpg',
      alt: 'Nærmynd af hugbúnaðarkóða á tölvuskjá.',
      kicker: 'Gervigreind og sannprófun',
      title: 'Gervigreind getur hraðað vinnunni, en gæði þurfa enn ákveðinn ramma.',
      text:
        'Við hjálpum teymum að setja mörk, mælingar og prófanir utan um þróun með gervigreind svo hraðinn skili raunverulegum árangri en ekki nýrri óvissu.',
      caption: 'Gervigreind breytir hraðanum. Hún fjarlægir ekki þörfina fyrir sannprófun.',
      points: [
        ['Mörk', 'Hvaða kóði, gögn og ákvarðanir þurfa sérstaka vernd.'],
        ['Próf', 'Keyrandi sannprófun fyrir breytingar sem verða til hratt.'],
        ['Viðbragð', 'Skýr leið þegar útgáfa, villa eða áhætta kallar á ákvörðun.']
      ]
    },
    en: {
      image: 'assets/img/code-quality.jpg',
      alt: 'Close-up of software code on a computer screen.',
      kicker: 'AI and verification',
      title: 'AI can accelerate the work, but quality still needs a firm frame.',
      text:
        'We help teams put boundaries, metrics and tests around AI-assisted development so speed becomes measurable progress instead of a new source of uncertainty.',
      caption: 'AI changes the pace. It does not remove the need for verification.',
      points: [
        ['Boundaries', 'Which code, data and decisions need special protection.'],
        ['Tests', 'Executable verification for changes produced at speed.'],
        ['Response', 'A clear path when a release, defect or risk needs a decision.']
      ]
    }
  },
  pm: {
    is: {
      image: 'assets/img/planning-board.jpg',
      alt: 'Skipulagstafla með miðum eftir stöðu verkefna.',
      kicker: 'Verkefnastjórnun',
      title: 'Betri verkefnastjórnun gerir óvissu sýnilega nógu snemma.',
      text:
        'Við tengjum viðskiptamarkmið, tæknilega áhættu, gæðakröfur og daglega framkvæmd svo verkefni hreyfist áfram án þess að missa áttina.',
      caption: 'Skipulag þarf að hjálpa teyminu að taka ákvarðanir, ekki búa til meiri stjórnsýslu.',
      points: [
        ['Markmið', 'Skýr skilgreining á árangri og mælingum.'],
        ['Áhætta', 'Tæknileg og viðskiptaleg óvissa sett fram í tíma.'],
        ['Framkvæmd', 'Eigendur, næstu skref og lokun mála eru sýnileg.']
      ]
    },
    en: {
      image: 'assets/img/planning-board.jpg',
      alt: 'A planning board with sticky notes arranged by workflow stage.',
      kicker: 'Project management',
      title: 'Better project management makes uncertainty visible early enough to act.',
      text:
        'We connect business goals, technical risk, quality standards and daily execution so the work keeps moving without losing direction.',
      caption: 'Planning should help teams make decisions, not create more administration.',
      points: [
        ['Goals', 'A clear definition of success and how it is measured.'],
        ['Risk', 'Technical and commercial uncertainty made visible in time.'],
        ['Delivery', 'Owners, next steps and closure stay visible.']
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
  insights: {
    is: {
      image: 'assets/img/code-quality.jpg',
      alt: 'Nærmynd af hugbúnaðarkóða á tölvuskjá.',
      kicker: 'Greinar',
      title: 'Hugmyndir um gæði, hraða og sannprófun þurfa að enda í framkvæmd.',
      text:
        'Við skrifum um það sem við sjáum í raunverulegum teymum: gervigreind, prófunarsjálfvirkni, verkefnastjórnun, útgáfur og leiðir til að læra hraðar án þess að missa stjórn.',
      caption: 'Innsýn er aðeins gagnleg ef hún hjálpar teyminu að gera næsta skref skýrara.',
      points: [
        ['Gervigreind', 'Hvernig nýr hraði breytir kröfum um sannprófun.'],
        ['Prófanir', 'Hvar sjálfvirkni borgar sig fyrst.'],
        ['Afhending', 'Hvernig betri flæði skapa meiri ró.']
      ]
    },
    en: {
      image: 'assets/img/code-quality.jpg',
      alt: 'Close-up of software code on a computer screen.',
      kicker: 'Insights',
      title: 'Ideas about quality, speed and verification have to end in practice.',
      text:
        'We write about what we see in real teams: AI, test automation, project management, releases and ways to learn faster without losing control.',
      caption: 'Insight only matters when it makes the next move clearer for the team.',
      points: [
        ['AI', 'How new speed changes the need for verification.'],
        ['Testing', 'Where automation pays back first.'],
        ['Delivery', 'How better flow creates more calm.']
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
  services: ['code', 'performance', 'network', 'planning', 'monitoring'],
  automation: ['network', 'servers', 'monitoring', 'checklist', 'performance'],
  ai: ['code', 'performance', 'monitoring', 'checklist', 'network'],
  pm: ['planning', 'checklist', 'performance', 'iceland', 'monitoring'],
  about: ['iceland', 'planning', 'checklist', 'monitoring', 'code'],
  insights: ['monitoring', 'code', 'performance', 'network', 'planning'],
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
  const homeHref = page.lang === 'is' ? 'index.html' : 'en.html';
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
  const homeHref = page.lang === 'is' ? 'index.html' : 'en.html';

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
            <button type="button" class="footer-consent-link" data-consent-settings>${l.cookieSettings}</button>
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
  <script defer src="assets/js/privacy-consent.js" data-lang="${page.lang}" data-hubspot-src="https://js-eu1.hs-scripts.com/148349979.js"></script>
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
