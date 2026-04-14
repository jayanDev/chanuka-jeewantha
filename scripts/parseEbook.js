const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const path = require('path');

const ebookPath = path.join(__dirname, '../Paid Ebooks/කෝටිපතියෙක් වීමේ වේගවත් මඟ.html');
const outDir = path.join(__dirname, '../src/content/ebooks/kotipathiyek-vime-vegawath-maga');

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

console.log('Loading HTML file...');
const html = fs.readFileSync(ebookPath, 'utf-8');

console.log('Parsing HTML with JSDOM...');
const dom = new JSDOM(html);
const document = dom.window.document;

const elements = Array.from(document.body.children);
let currentChapterId = 0;
let currentChapterTitle = "ඉදිරිපත් කිරීම";
let currentChapterContent = [];
let chapters = [];

const finalizeChapter = () => {
    if (currentChapterContent.length > 0) {
        chapters.push({
            id: currentChapterId,
            title: currentChapterTitle,
            content: currentChapterContent.join('\n')
        });
        currentChapterContent = [];
    }
};

const subtopicsRaw = `
"MTV Cribs" වගේ රූපවාහිනී වැඩසටහන් වලින් අපිට පෙන්වන්නේ නැති ඇත්ත
"හෙමීට පොහොසත් වීම" (Get Rich Slow) කියන්නේ අපිව පරාද කරන සෙල්ලමක්
තරුණ කාලෙදිම සල්ලි හොයන එක බොරුවක්ද?
නාකි වුණාම නෙවෙයි, තරුණ කාලෙදිම විශ්රාම යන්න හිතන විදිහ
"හෙමින් පොහොසත් වෙන" හීනය කුඩු වෙලා ගිය හැටි
මගේ මුළු ජීවිතේම වෙනස් කරපු ඒ තත්පර 90 (Lamborghini කාරෙකක් දැකපු වෙලාව)
ප්රසිද්ධියක් සහ විශේෂ දක්ෂතාවයක් නැතුවත් සල්ලි හොයන්න පුළුවන් බව තේරුම් ගැනීම
සාමාන්ය ජීවිතේට එන බාධක සහ මානසික වැටීම් වලට මුහුණ දීම
අලුත් ගමනක ආරම්භය සහ නිදාගද්දිත් සල්ලි එන "සල්ලි ගහක්" (Money Tree) හැදීම
ධනය කියන්නේ නිකම්ම පාරක් නෙවේ, ඒක එකතු වීමක්
සල්ලි හොයන්න යද්දි අපි රැවටෙන මායාවන්
කෝටිපතියන් හැදෙන්නේ ක්රියාවලියකින් (Process) මිසක්, එක සිදුවීමකින් (Event) නෙවෙයි
මේ ගමන වෙන කෙනෙක්ට දීලා ඔයාට නිදහස් වෙන්න බෑ
ධනය හොයාගෙන යන මාලිමාව හරියටම තේරුම් ගැනීම
සල්ලි හොයන්න තියෙන ප්රධාන පාරවල් 3 (Sidewalk, Slowlane, Fastlane)
මේ හැම පාරකටම අදාළ වෙනස් නීති සහ ප්රතිඵල තියෙනවා
පදික වේදිකාවේ යන අය (Sidewalkers) කියන්නේ කාටද?
ඔවුන්ගේ මානසිකත්වය සහ සල්ලි ගැන හිතන විදිහ
සල්ලි වලින් සල්ලි ප්රශ්න කවදාවත් විසඳන්න බැරි ඇයි?
සල්ලි ගොඩක් හෙව්වත් තවමත් දුප්පත් අය (Income-rich Sidewalkers)
සමාජයෙන් සල්ලි ගැන දීලා තියෙන විෂ අදහස්
නියම ධනය කියන්නේ මොකක්ද? (පවුල, සෞඛ්යය සහ නිදහස)
බොරුවට පොහොසත් වගේ පේන්න හැදීමෙන් වෙන විනාශය
සල්ලි වලට සතුට ගන්න බෑ... ඒත් දුප්පත්කමට පුළුවන්ද?
ණය අරගෙන ජීවන රටාවේ හිරවීම (Lifestyle Servitude)
ඔයාට යමක් දරන්න පුළුවන්ද (Afford) කියන එක ඇත්තටම තේරුම් ගන්න
ක්ෂණික සතුට පස්සේ ගිහින් අමාරුවේ වැටීම
වාසනාව කියන දේ නිකම් එන්නේ නෑ, ඒක හැදෙන්නේ අපේ මහන්සියෙන්
එකපාර ගේම ගහන්න (Big Hit) යන එක අතාරින්න
බොරු කාරයින්ට (Scams) අහු වීමේ අවදානම
හැමදේටම අනුන්ට බැන බැන වින්දිතයෙක් (Victim) වෙන එක නවත්තන්න
ඔයාගේ වැරදි වල වගකීම ඔයාම බාරගන්න
"මට මේ දේවල් නිකම්ම ලැබෙන්න ඕනේ" කියන හිඟන මානසිකත්වයෙන් මිදෙන්න
"හෙමීට පොහොසත් වීම" (Slowlane) කියන බොරු පොරොන්දුව
සිකුරාදා එනකම් බලන් ඉඳලා ජීවිතේ නාස්ති කරන හැටි (Negative 60% Return)
සාමාන්ය විදිහට ජීවත් වීම කියන්නේ දුකට පත්වීමක්
රස්සාවක් කියන්නේ අපේ ජීවිතේ වටිනා කාලය දීලා සල්ලි ගන්න එකයි
රස්සාවක තියෙන පාලනයක් නැතිකම සහ ආදායමේ සීමාවන්
රස්සාවෙන් ලැබෙන පළපුරුද්දේ තියෙන සීමාවන්
මන්දගාමී පාරෙන් කවදාවත් පොහොසත් වෙන්න බැරි ඇයි?
ඔයාට පාලනය කරන්න බැරි ලීවර (Uncontrollable Limited Leverage)
බැංකුවේ පොලියෙන් (Compound Interest) විතරක් පොහොසත් වෙන්න බැරි ඇයි?
අධ්යාපනයෙන් විතරක් සල්ලි හොයන්න යන එකේ තේරුමක් නැතිකම
හැම අධ්යාපනයක්ම එක සමාන නෑ
උපාධි වලට ණය වෙලා අන්තිමට ඒ ණය උගුලෙම හිරවීම
උපදෙස් දෙන අයගේ කුහකකම සහ එයාලා ඔයාව රවට්ටන හැටි
ගුරුවරු කියන දේ නෙවෙයි, එයාලා ඇත්තටම සල්ලි හොයපු විදිහ බලන්න
මන්දගාමී පාරේ (Slowlane) තියෙන අවදානම් 7ක්
මේ පාරේ ජයග්රහණය කියන්නේ වයසට ගියාම ලැබෙන දෙයක්
සාමාන්ය මට්ටමේ කෝටිපතියන් සහ නියම කෝටිපතියන් අතර වෙනස
කෝටිපතියෙක් වීමේ කෙටිමඟ: වේගවත් පාර (Fastlane)
"ඉක්මනින් පොහොසත් වීම" කියන එකේ හැංගිලා තියෙන ඇත්ත
පිරමීඩ කතාව: තනියම මහන්සි වෙනවා වෙනුවට යන්ත්රයක් (System) හදන්න
කණ්ඩායම් මාරු කරන්න: පාරිභෝගිකයෙක් (Consumer) වෙනුවට නිෂ්පාදකයෙක් (Producer) වෙන්න
පොහොසත් විදිහට පාවිච්චි කරන්න කලින්, පොහොසත් විදිහට නිෂ්පාදනය කරන්න
වේගවත් පාරේ (Fastlane) තියෙන සල්ලි හොයන සමීකරණය
වත්කම් වල වටිනාකම (Asset Value) එකපාරටම වැඩි කරන හැටි
ව්යාපාරය විකුණලා එකපාර ලොකු සල්ලි ගොඩක් ගන්න හැටි (Liquidation events)
ඔයාගේ කාලයෙන් ධනය වෙන් කිරීම (Passive Income)
සල්ලි ගහක් (Money Tree) වවන්නේ කොහොමද?
නිදාගද්දිත් සල්ලි එන ව්යාපාර වර්ග 5ක් (Business Seedlings)
සල්ලි වලින් සල්ලි හොයන හොඳම ක්රමය
ඔයාගේ සල්ලි, ඔයාගේ නිදහස වෙනුවෙන් සටන් කරන හමුදාවක් කරගන්න
නියම කෝටිපතියන් එකතු පොලිය (Compound Interest) පාවිච්චි කරන්නේ කොහොමද?
නියම නීතිය: ආකර්ෂණ නීතියට (Law of Attraction) වඩා බලපෑම් කිරීමේ නීතිය (Law of Effection) වැදගත්
ලොකු පිරිසකට උදව් කරන තරමට ඔයාට සල්ලි ලැබෙනවා
ලොකු සල්ලි ගොඩක් පස්සේ යන්න නම් ලොකු ඉලක්කම් එක්ක වැඩ කරන්න ඕනේ
මුලින්ම ඔයාවම පාලනය කරගන්න සහ ඔයාටම මුලින්ම ගෙවන්න (Pay yourself first)
තමන්ගේම කියලා ව්යාපාරයක් ලියාපදිංචි කරගන්න හැටි (C corp, S corp, LLC)
දුප්පත්කමට ප්රධානම හේතුව ඔයාගේ වැරදි තීරණ
ඔයාගේ තීරණ තමයි ජීවිතේ සුක්කානම
පොඩි තීරණ වලින් අනාගතයට වෙන ලොකු බලපෑම (The Butterfly Effect)
ඔයා හිතන විදිහ සහ ඔයාගේ වචන වෙනස් කරගන්න (Wipe your windshield clean)
නරක තීරණ වලින් බේරෙන්න පාවිච්චි කරන WCCA ක්රමය
ලොකු තීරණ හරියටම ගන්න WADM ක්රමය පාවිච්චි කරන හැටි
ඔයාව පස්සට අදින මිනිස්සු සහ වටපිටාව මගහරින්න
ඔයාගේ හීන වලට හිනාවෙන අයගෙන් ඈත් වෙන්න
ඔයාට උදව් කරන හොඳ අයව වටකරගන්න
ඔයාගේ සහකරු හෝ සහකාරිය ඔයාගේ ගමනට බාධාවක්ද?
ඔයාගේ වටිනාම ඉන්ධනය: කාලය
කාලය නිකරුණේ නාස්ති කරන අය දුප්පත් වෙන හැටි
ණය නිසා ඔයාගේ නිදහස් කාලය අහිමි වෙන හැටි (Parasitic debt)
පාසලෙන් අයින් වුණාම ඉගෙනගන්න එක නවත්වන්න එපා
"මට වෙලාවක් නෑ, මම දන්නේ නෑ" කියන නිදහසට කරුණු අතාරින්න
නොමිලේම ඉගෙනගන්න තියෙන තැන් (පොත්, අන්තර්ජාලය)
ලොකු ගණන් දීලා බොරු සම්මන්ත්රණ (Seminars) වලට අහුවෙන්න එපා
උපරිම වේගෙට යන්න: නිකම්ම කැමැත්ත නෙවෙයි, උපරිම කැපවීම (Commitment) තියෙන්න ඕනේ
සාමාන්ය මිනිස්සුන්ගෙන් (Most people) ඈත් වෙන්න
අසාර්ථක වීමට බය වෙන්න එපා
මෝඩ අවදානම් නොගෙන, බුද්ධිමත් අවදානම් (Intelligent risks) ගන්න
"කවදාහරි කරනවා" (Someday) කියන එක අතෑරලා අදම පටන් ගන්න
හරියටම ධනයට යන පාර තෝරගන්න
වේගවත් පාරේ තියෙන නීති 5 (NECST - Need, Entry, Control, Scale, Time)
අවශ්යතාවයේ නීතිය: මිනිස්සුන්ගේ ප්රශ්න විසඳන්න
සල්ලි පස්සේ යන්න එපා, අවශ්යතා පස්සේ යන්න
"ඔයා ආස දේ කරන්න" කියන උපදෙසේ තියෙන අවදානම
ආසාව වෙනුවට උමතුවෙන් වගේ කැපවෙන්න (Passion)
ඇතුල් වීමේ නීතිය: ලේසියෙන් පටන්ගන්න පුළුවන් බිස්නස් වලින් ඈත් වෙන්න
"හැමෝම කරන දේ" කිරීමෙන් වළකින්න
පාලනය කිරීමේ නීතිය: රියදුරු අසුනේ ඔයාම ඉන්න
වෙන කෙනෙක්ගේ බිස්නස් එකක (උදා: MLM වගේ) හිරවෙන්න එපා
ඔයාගේම බ්රෑන්ඩ් එකක් හදන්න
පරිමාණයේ නීතිය: පුංචි මාකට් එකක් වෙනුවට මුළු ලෝකෙටම විකුණන්න
පරිමාණය (Scale) කියන්නේ ඔයාගේ ලීවරයයි
කාලයේ නීතිය: ඔයා නැතුව වැඩ කරන බිස්නස් එකක් හදන්න
වේගයෙන් ධනවත් වෙන්න පුළුවන් ප්රධාන පාරවල් 3ක්
අන්තර්ජාලය (Internet), අලුත් නිර්මාණ (Innovation), සහ නැවත නැවත කිරීම (Intentional iteration)
ඔයාට යන්න පුළුවන් අලුත් පාරවල් හොයාගන්න
ලොකු අදහස් ඕනෙ නෑ, තියෙන දේ ඊට වඩා හොඳට කරන්න
මිනිස්සුන්ගේ පැමිණිලි වලින් අලුත් අවස්ථා හොයාගන්න හැටි
ඔයාගේ ගමනාන්තය තීරණය කරන්න
හීනෙට යන වියදම සහ ඉලක්ක හදාගන්න පියවර 4ක්
මූල්ය සාක්ෂරතාවය (Financial literacy) ඇති කරගන්න
සාර්ථකත්වයේ වේගය: අදහස් වලට වඩා ක්රියාත්මක කිරීම (Execution) වැදගත්
අදහස් කියන්නේ නිකම්ම හිතළු විතරයි
බිස්නස් ප්ලෑන් අතෑරලා, වැඩ පටන් ගන්න
ආයෝජකයින්ට (Investors) ඕනේ ප්ලෑන් නෙවේ, ඔයාගේ වැඩ
පාරිභෝගිකයෝ ඔයාව පොහොසත් කරයි
පැමිණිලි 4ක් සහ ඒවායින් බිස්නස් එක හදාගන්න හැටි
සුපිරි පාරිභෝගික සේවාවක් (SUCS) දෙන හැටි
පොඩි ව්යාපාරයක් වුණත් ලොකුවට පේන්න වැඩ කරන්න (Look big, act small)
ඔයාව පාලනය කරන්න එන අයව අයින් කරන්න
හොඳ ව්යාපාරික හවුල්කරුවන් සහ සේවකයින් තෝරාගැනීම
විශ්වාස කරන්න කලින් හොයලා බලන්න
කාගේ හරි ගැලවුම්කරුවා වෙන්න
තරඟකාරයින් ගැන වද නොවී ඔයාගේ ගමන යන්න
බිස්නස් නෙවෙයි, බ්රෑන්ඩ් (Brands) හදන්න
ඔයාගේ ව්යාපාරයේ විශේෂත්වය (Unique Selling Proposition) හදාගන්න හැටි
අනිත් අයට වඩා කැපී පේන්න (Rise above the noise) මාකටින් කරන හැටි
මිල (Price) පාවිච්චි කරලා බ්රෑන්ඩ් එකක් හදන හැටි
එක බිස්නස් එකකට විතරක් අවධානය දෙන්න (Monogamy)
තැනින් තැනට පනින්නේ නැතුව එක දෙයක් සාර්ථක කරගන්න
මේ ඔක්කොම එකතු කරලා ඔයාගේ ධනවත් වීමේ ප්ලෑන් එක සුපර්චාර්ජ් (Supercharge) කරන්න!
`;

const subtopicsRawList = subtopicsRaw.trim().split('\n').map(l => l.trim()).filter(l => l.length > 0);

const cleanElement = (el) => {
    let text = el.textContent.trim();
    if (!text && !el.querySelector('img')) return null;

    // Check if this text matches any subtopic
    const stringDistance = (a, b) => {
        let matches = 0;
        let wordsA = a.split(' ');
        for (const w of wordsA) { if (b.includes(w) && w.length > 3) matches++; }
        return matches;
    };
    
    // Exact or partial strict match
    const matchesSubtopic = subtopicsRawList.some(topic => text.includes(topic) || (text.length === topic.length && text === topic));
    
    // Check if the original element is bolded (Google Docs uses strong, b, or font-weight:700)
    let isBold = matchesSubtopic || (text.length < 150 && (el.innerHTML.includes('font-weight: 700') || el.innerHTML.includes('<b>') || el.tagName === 'H2' || el.tagName === 'H3'));

    if (isBold && el.tagName === 'P') {
        const isActuallyTopic = text.length < 150 && !text.includes('? ') && !text.includes('! ');
        if (isActuallyTopic || matchesSubtopic) {
             return `<h3 class="ebook-subtopic">${text}</h3>`;
        }
    }

    if (el.tagName === 'P') {
        let innerHtml = el.innerHTML;
        innerHtml = innerHtml.replace(/<span[^>]*>/gi, '<span>');
        let style = '';
        if (el.style.textAlign === 'center' || el.className.includes('title')) {
            style = 'text-align: center;';
        }
        return `<p style="${style}">${innerHtml}</p>`;
    } else if (el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3') {
        return `<${el.tagName.toLowerCase()}>${el.innerHTML}</${el.tagName.toLowerCase()}>`;
    } else if (el.tagName === 'UL' || el.tagName === 'OL') {
        let cleanList = `<${el.tagName.toLowerCase()}>`;
        Array.from(el.children).forEach(li => {
             cleanList += `<li>${li.innerHTML.replace(/<span[^>]*>/gi, '<span>')}</li>`;
        });
        cleanList += `</${el.tagName.toLowerCase()}>`;
        return cleanList;
    }
    return el.outerHTML; // Fallback
};

for (const el of elements) {
    const text = el.textContent.trim();
    
    // Strict chapter matcher
    const chapterMatch = text.match(/^(\d+)\s*(වැනි|වෙනි)\s*පරිච්ඡේදය/);
    const isIntro = currentChapterId === 0 && (text === 'පටුන' || text === 'හැඳින්වීම' || text.includes('ඉදිරිපත් කිරීම') || text.includes('1 වෙනි කොටස'));
    
    if (chapterMatch) {
        let matchedChapId = parseInt(chapterMatch[1], 10);
        
        // ONLY split if it's the next sequential chapter
        if (matchedChapId === currentChapterId + 1) {
            finalizeChapter();
            currentChapterId = matchedChapId;
            currentChapterTitle = text;
            continue; 
        }
    } else if (isIntro) {
        // Just consume intro lines as part of chapter 0, don't restart chapter
    }

    const cleaned = cleanElement(el);
    if (cleaned) {
        currentChapterContent.push(cleaned);
    }
}
finalizeChapter();

// Enforce max 45 chapters (if any stray ones were created after 45)
chapters = chapters.filter(c => c.id <= 45);

console.log(`Found ${chapters.length} chapters/sections.`);

const indexData = chapters.map(c => ({ id: c.id, title: c.title }));
fs.writeFileSync(path.join(outDir, 'index.json'), JSON.stringify(indexData, null, 2));

chapters.forEach(c => {
    fs.writeFileSync(path.join(outDir, `chapter-${c.id}.json`), JSON.stringify(c, null, 2));
});

console.log('Finished restructuring ebook!');
