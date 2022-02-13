import { writable } from 'svelte/store';

// SOCIALS
export interface ISocialMediaEntry {
    name: string;
username: string;
   link?: string;
};
export const SocialMediaCollection : ISocialMediaEntry[] = [
{
    name: "github",
    username: "trubiso",
    link: "https://www.github.com/trubiso"
},
{
    name: "twitch",
    username: "trubiso",
    link: "https://www.twitch.tv/trubiso"
},
{
    name: "discord",
    username: "@Trubiso#5265"
}
]

// SMILIES
export const EmotiguyEmoteLinks = [
    'https://cdn.discordapp.com/emojis/717683480787550228.png', 'https://cdn.discordapp.com/emojis/717683548487811111.png', 'https://cdn.discordapp.com/emojis/717684437508161546.png', 'https://cdn.discordapp.com/emojis/717684438506405969.png', 'https://cdn.discordapp.com/emojis/717690391499112508.png', 'https://cdn.discordapp.com/emojis/718886770963382303.png', 'https://cdn.discordapp.com/emojis/720998912139460679.png', 'https://cdn.discordapp.com/emojis/723288149530509342.png', 'https://cdn.discordapp.com/emojis/725041947160477780.png', 'https://cdn.discordapp.com/emojis/725447448385945671.png', 'https://cdn.discordapp.com/emojis/729126433779220510.png', 'https://cdn.discordapp.com/emojis/729362524184510575.png', 'https://cdn.discordapp.com/emojis/729363169151287307.png', 'https://cdn.discordapp.com/emojis/729364446157471865.png', 'https://cdn.discordapp.com/emojis/729364877134790696.png', 'https://cdn.discordapp.com/emojis/729366167449501727.png', 'https://cdn.discordapp.com/emojis/729370646051684365.png', 'https://cdn.discordapp.com/emojis/729373986491859007.png', 'https://cdn.discordapp.com/emojis/729374854104612934.png', 'https://cdn.discordapp.com/emojis/729378455728422924.png', 'https://cdn.discordapp.com/emojis/729378600503214111.png', 'https://cdn.discordapp.com/emojis/729384114628591726.png', 'https://cdn.discordapp.com/emojis/729386039474520159.png', 'https://cdn.discordapp.com/emojis/729404457124757576.png', 'https://cdn.discordapp.com/emojis/729404506730659930.png', 'https://cdn.discordapp.com/emojis/729406247870267412.png', 'https://cdn.discordapp.com/emojis/729408546667495464.png', 'https://cdn.discordapp.com/emojis/729408547833511967.png', 'https://cdn.discordapp.com/emojis/729408548118855762.png', 'https://cdn.discordapp.com/emojis/729410549892251667.png', 'https://cdn.discordapp.com/emojis/729411456491323412.png', 'https://cdn.discordapp.com/emojis/729447550846763040.png', 'https://cdn.discordapp.com/emojis/736962738886279178.png', 'https://cdn.discordapp.com/emojis/739213424311009302.png', 'https://cdn.discordapp.com/emojis/744987859592806551.gif', 'https://cdn.discordapp.com/emojis/744988153793871893.gif', 'https://cdn.discordapp.com/emojis/744989557065515091.gif', 'https://cdn.discordapp.com/emojis/750019258842480663.png', 'https://cdn.discordapp.com/emojis/750033819637383189.png', 'https://cdn.discordapp.com/emojis/750034917743919256.png', 'https://cdn.discordapp.com/emojis/750044215664312401.png', 'https://cdn.discordapp.com/emojis/750047454405066773.png', 'https://cdn.discordapp.com/emojis/750313444758257734.png', 'https://cdn.discordapp.com/emojis/750325881796296755.png', 'https://cdn.discordapp.com/emojis/751067773786128435.gif', 'https://cdn.discordapp.com/emojis/753969363685605487.png', 'https://cdn.discordapp.com/emojis/753969363882606610.png', 'https://cdn.discordapp.com/emojis/753969363916292186.png', 'https://cdn.discordapp.com/emojis/753969564408086600.png', 'https://cdn.discordapp.com/emojis/755450193616568371.png', 'https://cdn.discordapp.com/emojis/755561754796228750.png', 'https://cdn.discordapp.com/emojis/755563588650795121.png', 'https://cdn.discordapp.com/emojis/757892107376525350.gif', 'https://cdn.discordapp.com/emojis/757892107850481665.gif', 'https://cdn.discordapp.com/emojis/761335187245236276.gif', 'https://cdn.discordapp.com/emojis/783796596247625770.gif', 'https://cdn.discordapp.com/emojis/784130705747345488.gif', 'https://cdn.discordapp.com/emojis/785085650038030336.png', 'https://cdn.discordapp.com/emojis/785091277560479764.png', 'https://cdn.discordapp.com/emojis/785092855533535252.png', 'https://cdn.discordapp.com/emojis/785093685569388544.png', 'https://cdn.discordapp.com/emojis/785094462191829002.png', 'https://cdn.discordapp.com/emojis/785198631757283388.png', 'https://cdn.discordapp.com/emojis/787643241985212427.gif', 'https://cdn.discordapp.com/emojis/787651730607177778.png', 'https://cdn.discordapp.com/emojis/787989251346137098.gif', 'https://cdn.discordapp.com/emojis/790006753366114325.png', 'https://cdn.discordapp.com/emojis/791104892302262292.png', 'https://cdn.discordapp.com/emojis/791830392503271445.png', 'https://cdn.discordapp.com/emojis/791831100515155998.png', 'https://cdn.discordapp.com/emojis/791833356416843776.png', 'https://cdn.discordapp.com/emojis/791997103794290708.png', 'https://cdn.discordapp.com/emojis/791997930352934922.png', 'https://cdn.discordapp.com/emojis/791998537624977419.png', 'https://cdn.discordapp.com/emojis/791999970957852712.png', 'https://cdn.discordapp.com/emojis/792000418850406420.png', 'https://cdn.discordapp.com/emojis/792000884371488788.png', 'https://cdn.discordapp.com/emojis/792001151573688341.png', 'https://cdn.discordapp.com/emojis/792001790837129257.png', 'https://cdn.discordapp.com/emojis/793509333777514506.png', 'https://cdn.discordapp.com/emojis/795664529459249192.png', 'https://cdn.discordapp.com/emojis/796019207611088916.gif', 'https://cdn.discordapp.com/emojis/796417990497140787.png', 'https://cdn.discordapp.com/emojis/796714560262373407.gif', 'https://cdn.discordapp.com/emojis/796714824364720138.png', 'https://cdn.discordapp.com/emojis/798127314235424788.png', 'https://cdn.discordapp.com/emojis/798319913303146516.gif', 'https://cdn.discordapp.com/emojis/798481327107211264.png', 'https://cdn.discordapp.com/emojis/800038626578661397.gif', 'https://cdn.discordapp.com/emojis/800058521282019348.gif', 'https://cdn.discordapp.com/emojis/812711125639888916.gif', 'https://cdn.discordapp.com/emojis/830926210678652961.png', 'https://cdn.discordapp.com/emojis/830955589877104660.png', 'https://cdn.discordapp.com/emojis/838502784822673469.png', 'https://cdn.discordapp.com/emojis/839643005321609218.png', 'https://cdn.discordapp.com/emojis/852700969220309012.png', 'https://cdn.discordapp.com/emojis/852700969963094057.png', 'https://cdn.discordapp.com/emojis/854509009418453024.png', 'https://cdn.discordapp.com/emojis/870244771241799720.png', 'https://cdn.discordapp.com/emojis/888843018050871376.png', 'https://cdn.discordapp.com/emojis/888843044193976390.png', 'https://cdn.discordapp.com/emojis/888843063974326284.png', 'https://cdn.discordapp.com/emojis/888843084627066930.png', 'https://cdn.discordapp.com/emojis/888843092050968586.png'
]
export const EmotiguyEmoteNames = [
    'happy', 'sad', 'coolwoah', 'really', 'funny', 'agony', 'bruh', 'angel_emotiguy', 'sad2', 'lik', 'pain', 'business', 'youradhere', 'tongue_left', 'tongue_right', 'tipmyhat', 'swim', 'satana1', 'sad3', 'please', 'predicting', 'peaceout', 'oops', 'nerd_emotiguy', 'neutral', 'drunk', 'angry_emotiguy', 'eyy', 'angry_messed_up_hands', 'salute', 'silly', 'excited', 'whistling', 'shrug_emotiguy', 'ooo_yes', 'laugh', 'allifeelispain', 'think', 'cri', 'good_meal', 'tribaldance', 'satana2', 'glad', 'telephone_emotiguy', 'LOL', 'angry_red', 'shock_handless', 'shock', 'angry_pink', 'picardia', 'clenched_teeth_angry', 'cri2', 'mhmmm', 'yeees', 'pet', 'hmm', 'awesomefuntimes', 'smiling_emotiguy', 'telekinesis', 'wait', 'shrug_emotiguy2', 'emotiguy_feet', 'wishing2', 'computer_emotiguy', 'h_', 'goodjob', 'despair', 'swag', 'posing_emotiguy', 'gift_emotiguy', 'wink_emotiguy', 'balancing_emotiguy', 'massage_emotiguy', 'shrug_emotiguy3', 'christmas_emotiguy', 'stop_there', 'dancing_emotiguy2', 'regionaldance', 'dancing_emotiguy', 'fly', 'tHello2', 'please_no', 'bye_sad', 'angrying', 'middle_finger_emotiguy', 'vooleq', 'absolutebanger', 'stocks_emotiguy', 'cryinge', 'bye_sad2', 'funyinge', 'excited_jumping', 'charlessad', 'weird', 'thinky', 'flush_emotiguy', 'flush_happy', 'sad4', 'bye_sad3', 'hold_on', 'charles', 'tired', 'satana3', 'emotiguy_foot'
]
export interface IEmote {
    name: string;
    url: string;
}

// SIDEBAR
export type SidebarTheme = {
    bg1: string,
    bg2: string,
    tc: string,
    mb: string,
    mc: string
};
export const SidebarItems = [
    "/", "/smilys", "/bad", "/kity", "/socials"
];
export const SidebarThemes: SidebarTheme[] = [
    {
        bg1: "#ffc600",
        bg2: "#dda400",
        tc: "#181818",
        mb: "#f1d7b2",
        mc: "#101020"
    },
    {
        bg1: "#9292c1",
        bg2: "#7070a0",
        tc: "#181818",
        mb: "#ffffff",
        mc: "#101020"
    },
    {
        bg1: "#32324f",
        bg2: "#10102d",
        tc: "#e6bb1c",
        mb: "#ffffff",
        mc: "#101020"
    },
    {
        bg1: "#32324f",
        bg2: "#10102d",
        tc: "#e6bb1c",
        mb: "#00001c",
        mc: "#ddddef"
    },
    {
        bg1: "#990099",
        bg2: "#660066",
        tc: "#ff00ff",
        mb: "#ffaaff",
        mc: "#220022"
    }
]
export const SidebarSTI = 5;

// GLOBAL LANG STUFF
const texts = <const>{
    langs: [ "English (UK/US)", "English (Smilieland)", "Oogie Boogie (Kqüntniétt)", "Español (España)" ],
    themes: [
        [
            "smilie",
            "purple marble",
            "dark marble",
            "owl",
            "hot pink"
        ],
        [
            "smili",
            "pruple marbel",
            "darke marbel",
            "owle",
            "htot pinq"
        ],
        [
            "qurgeh",
            "grabno giqurgano",
            "grabno gibrug",
            "gogroog",
            "ragbo grino"
        ],
        [
            "smilie",
            "mármol violeta",
            "mármol oscuro",
            "buho",
            "rosa cálido"
        ]
    ],
    index: {
        reasons: [
            [
                "its great",
                "it uses svelte",
                "it is pretty",
                "it has a great point of view on industrail machinery",
                "it has typos (see item above)",
                "h"
            ],
            [
                "its greate !!!",
                "it usese svelteing",
                "it is prety",
                "it has a greate pointe of viewe on indsustrileale machienery",
                "it hase typoese (see ietem abov)",
                "h"
            ],
            [
                "grongo garqo !!",
                "brugo gango svelte grogona",
                "goqo gahoq gruno",
                "girino grabo grobo grnokwo fragow wogowno gragohoqoqo grobogo",
                "gingo gaga goobo gaga boog (grogo gano gobo)",
                "h"
            ],
            [
                "es excelente",
                "usa svelte",
                "es bonita",
                "tiene un muy buen punto de vista sobre las máquinas indsutriales",
                "tiene erratas (mira el punto anterior)",
                "h"
            ]
        ],
        texts: [
            [
                "welcome to my website",
                "why you should use it:",
                "languages:"
            ],
            [
                "welcom to my websiet !!!1",
                "why yu shulde use it:",
                "languegese:"
            ],
            [
                "grono gago websiet bogo grano !",
                "guro gaobo qagofo grukwago:",
                "groqo grabo:"
            ],
            [
                "bienvenido a mi página web",
                "por qué deberías usarla:",
                "idiomas:"
            ]
        ]
    },
    sidebar: {
        item_names: [
            [
                "home",
                "smilies",
                "don't click",
                "kitty",
                "socials",
                "switch theme"
            ],
            [
                "hoem",
                "smilis",
                "dont cliq",
                "kity!!",
                "socialese",
                "swich theem"
            ],
            [
                "gagroog",
                "qurgehoq",
                "baga click goog",
                "grugogoh !!",
                "grinqi broogo",
                "kefwano gragoqe"
            ],
            [
                "inicio",
                "smilies",
                "no me pulses",
                "gatito",
                "redes sociales",
                "cambiar tema"
            ]
        ]
    },
    smilies: {
        top_text: [
            [
                "here are my friend smilies! (source: ",
                "emotiguy appreciation",
                "sort by: "
            ],
            [
                
                "heer ar my fren smilis !! (sourc: ",
                "emtotiguy aprenecietion",
                "sorte by: "
            ],
            [
                
                "ga gboorqe grano giqurgehoqe boog !! (gagro gru: ",
                "qaqurgeho gribugbano",
                "gri grabo groo: "
            ],
            [
                "aquí están mis amigos smilies (fuente: ",
                "emotiguy appreciation",
                "orden: "
            ]
        ],
        sorts: [
            [
                "alphabetical (a-z)",
                "alphabetical (z-a)",
                "creation date (old-new)",
                "creation date (new-old)",
                "random"
            ],
            [
                "alfabeticale (a-z)",
                "alfabeticale (z-a)",
                "creatione daet (olde-newe)",
                "creatione daet (newe-olde)",
                "rAndOm !! :P"
            ],
            [
                "grana abragoq (a-z)",
                "grana abragoq (z-a)",
                "groq gihargooqeg (brano-qigu)",
                "groq gihargooqeg (qigu-brano)",
                "girguno"
            ],
            [
                "alfabético (a-z)",
                "alfabético (z-a)",
                "fecha de creación (viejo-nuevo)",
                "fecha de creación (nuevo-viejo)",
                "aleatorio"
            ]
        ],
        lucky_2883: [
            "Lucky you! You found a 2883 :)",
            "LUKI YUO !!! yu fuonde a 2883 :)",
            "GRUNO GABROOGE !!! grigano ga boog 2883 grano :)",
            "¡Qué suertudo! Encontraste un 2883 :)"
        ]
    }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getTextCollection(identifier: string) {
    const path = identifier.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let current: any = texts;
    for (const step of path) {
        current = current[step];
    }
    if (!current) throw `Text collection ${identifier} does not exist.`;
    return current;
}

export const lang = writable(0);
export const theme = writable(0);