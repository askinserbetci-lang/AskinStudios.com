# Copies public/go.html into one page per language (public/go-xx.html) with that language's title,
# so a shared /go?lang=xx link shows its own song name. Run after editing go.html.
import html, re
T = {'en': ('Be Mine Tonight', 'The English duet, live with ney, kanun and oud.'),
     'tr': ('Anla Beni', 'Türkçe düet: ney, kanun ve ud ile canlı.'),
     'ar': ('كوني لي الليلة', 'دويتو بالعربية مع الناي والقانون والعود، عزف حي.'),
     'ru': ('Будь моей сегодня ночью', 'Русский дуэт: ней, канун и уд вживую.'),
     'es': ('Sé mía esta noche', 'Dúo en español, en vivo con ney, kanun y oud.'),
     'it': ('Sarai mia stanotte', 'Duetto in italiano, dal vivo con ney, kanun e oud.'),
     'el': ('Να είσαι δική μου απόψε', 'Ελληνικό ντουέτο, ζωντανά με νέι, κανονάκι και ούτι.'),
     'az': ('Bu gecə mənim ol', 'Azərbaycanca duet, ney, qanun və ud ilə canlı.'),
     'fr': ('Sois à moi ce soir', 'Duo en français, en live avec ney, kanun et oud.')}
src = open('public/go.html', encoding='utf-8').read()
for k, (t, line) in T.items():
    s = re.sub(r'<title>.*?</title>', f'<title>{html.escape(t)} · Aşkın Şerbetçi</title>', src)
    s = re.sub(r'<meta property="og:title" content="[^"]*" />', f'<meta property="og:title" content="{html.escape(t)} · Aşkın Şerbetçi" />', s)
    s = re.sub(r'<meta property="og:description" content="[^"]*" />', f'<meta property="og:description" content="{html.escape(line)}" />', s)
    open(f'public/go-{k}.html', 'w', encoding='utf-8').write(s)
