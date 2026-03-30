/* ============================================================
   THE TEA JOURNEY — Data Layer
   All geographic, historical, and production data
   ============================================================ */

const TEA_DATA = {

    /* ---- Chapter 1: Origin Point ---- */
    origin: {
        lat: 29,
        lng: 98,
        label: "Origin of Camellia sinensis",
        detail: "The confluence of Yunnan, Tibet, Myanmar, and NE India"
    },

    earlyRegions: [
        { lat: 22.8, lng: 100.98, name: "Pu'er / Xishuangbanna", detail: "Ancient tea forests, birthplace of pu-erh tea" },
        { lat: 25.04, lng: 102.68, name: "Kunming, Yunnan", detail: "Capital of Yunnan — gateway to tea country" },
        { lat: 30.57, lng: 104.07, name: "Chengdu, Sichuan", detail: "Early tea culture in the Sichuan basin" },
        { lat: 27.33, lng: 117.97, name: "Wuyi Mountains, Fujian", detail: "Birthplace of oolong and lapsang souchong" },
        { lat: 30.27, lng: 120.15, name: "Hangzhou, Zhejiang", detail: "Home of Dragon Well (Longjing) green tea" },
        { lat: 31.23, lng: 117.25, name: "Anhui Province", detail: "Home of Keemun black tea and Huangshan Maofeng" },
    ],

    /* ---- Chapter 3: Tea Horse Road ---- */
    teaHorseRoad: {
        yunnanRoute: [
            [22.02, 100.97],  // Pu'er
            [22.8, 100.98],   // Simao
            [25.59, 100.23],  // Dali
            [26.87, 100.23],  // Lijiang
            [27.83, 99.70],   // Shangri-La
            [28.47, 98.91],   // Deqin
            [29.05, 98.60],   // Markam
            [31.14, 97.17],   // Chamdo
            [29.65, 91.14],   // Lhasa
        ],
        sichuanRoute: [
            [30.01, 103.0],   // Ya'an
            [29.91, 102.23],  // Luding
            [30.05, 101.96],  // Kangding
            [30.0, 100.27],   // Litang
            [30.0, 99.11],    // Batang
            [31.14, 97.17],   // Chamdo
            [29.65, 91.14],   // Lhasa
        ],
        stops: [
            { lat: 22.02, lng: 100.97, name: "Pu'er", detail: "Starting point — major tea-producing area", year: "Ancient" },
            { lat: 25.59, lng: 100.23, name: "Dali", detail: "Major trading hub; Dali Kingdom grew wealthy from the trade", year: "6th C" },
            { lat: 26.87, lng: 100.23, name: "Lijiang", detail: "UNESCO World Heritage town; rest stop on the route", year: "7th C" },
            { lat: 27.83, lng: 99.70, name: "Shangri-La", detail: "Gateway to the Tibetan frontier (3,200m elevation)", year: "7th C" },
            { lat: 28.47, lng: 98.91, name: "Deqin", detail: "Last stop in Yunnan; near sacred Mt. Khawa Karpo (6,740m)", year: "7th C" },
            { lat: 31.14, lng: 97.17, name: "Chamdo", detail: "Convergence point of Yunnan and Sichuan routes", year: "7th C" },
            { lat: 29.65, lng: 91.14, name: "Lhasa", detail: "Final destination — the holy city of Tibet", year: "7th C" },
            { lat: 30.01, lng: 103.0, name: "Ya'an", detail: "Starting point of the Sichuan route", year: "Tang Dynasty" },
            { lat: 30.05, lng: 101.96, name: "Kangding", detail: "Key trading town on Sichuan-Tibet route", year: "Tang Dynasty" },
        ],
    },

    japanSpread: [
        { from: [30.27, 120.15], to: [33.59, 130.40], label: "Tea seeds to Kyushu (1191)" },
        { from: [30.27, 120.15], to: [35.01, 135.77], label: "Tea culture to Kyoto" },
        { from: [30.27, 120.15], to: [35.18, 129.08], label: "Tea to Korea (Tang Dynasty)" },
    ],

    japanStops: [
        { lat: 33.59, lng: 130.40, name: "Kyushu", detail: "Eisai planted first tea seeds here in 1191", year: "1191" },
        { lat: 35.01, lng: 135.77, name: "Kyoto", detail: "Kozanji Temple — early tea cultivation; later matcha culture", year: "1191" },
        { lat: 34.86, lng: 135.80, name: "Uji", detail: "Became Japan's premier tea region", year: "13th C" },
        { lat: 35.18, lng: 129.08, name: "Busan, Korea", detail: "Tea culture spread via Buddhist monks in Tang Dynasty", year: "9th C" },
    ],

    /* ---- Chapter 4: Maritime Routes ---- */
    maritimeRoutes: {
        portuguese: [
            [22.20, 113.55],  // Macau
            [14.60, 120.98],  // Manila
            [7.0, 80.0],      // Sri Lanka
            [-6.0, 39.0],     // Zanzibar/E Africa coast
            [-34.0, 18.5],    // Cape of Good Hope
            [-15.0, 12.0],    // Angola coast
            [0.0, 5.0],       // Gulf of Guinea
            [15.0, -17.5],    // Senegal
            [38.72, -9.14],   // Lisbon
        ],
        dutch: [
            [23.13, 113.26],  // Canton
            [14.60, 120.98],  // Philippines
            [-6.2, 106.85],   // Batavia (Jakarta)
            [7.0, 80.0],      // Sri Lanka
            [-34.0, 18.5],    // Cape
            [0.0, 5.0],       // Gulf of Guinea
            [52.37, 4.90],    // Amsterdam
        ],
        british: [
            [23.13, 113.26],  // Canton
            [22.20, 113.55],  // Macau
            [1.35, 103.82],   // Singapore
            [7.0, 80.0],      // Ceylon
            [12.5, 45.0],     // Aden
            [30.0, 32.5],     // Suez (after 1869)
            [35.9, -5.3],     // Gibraltar
            [51.51, -0.08],   // London
        ]
    },

    maritimePorts: [
        { lat: 23.13, lng: 113.26, name: "Canton (Guangzhou)", detail: "China's main tea export port for centuries", year: "1600s" },
        { lat: 22.20, lng: 113.55, name: "Macau", detail: "Portuguese trading post since 1557", year: "1557" },
        { lat: 52.37, lng: 4.90, name: "Amsterdam", detail: "Dutch VOC brought first commercial tea to Europe ~1610", year: "~1610" },
        { lat: 38.72, lng: -9.14, name: "Lisbon", detail: "Portuguese court was among first in Europe to drink tea", year: "1550s" },
        { lat: 51.51, lng: -0.08, name: "London", detail: "Heart of the British tea trade; East India Company HQ", year: "1660s" },
        { lat: -6.2, lng: 106.85, name: "Batavia (Jakarta)", detail: "Dutch East Indies trading hub", year: "1619" },
        { lat: 1.35, lng: 103.82, name: "Singapore", detail: "British trading post on the route to China", year: "1819" },
    ],

    /* ---- Chapter 6: Robert Fortune's Journey ---- */
    fortuneJourney: {
        secretRoute: [
            [31.23, 121.47],  // Shanghai
            [30.27, 120.15],  // Hangzhou
            [28.0, 118.0],    // Jiangxi
            [27.33, 117.97],  // Wuyi Mountains
            [30.6, 114.3],    // Wuhan
            [31.23, 121.47],  // Back to Shanghai
        ],
        toIndia: [
            [31.23, 121.47],  // Shanghai
            [22.28, 114.16],  // Hong Kong
            [1.35, 103.82],   // Singapore
            [13.08, 80.27],   // Madras
            [22.57, 88.36],   // Calcutta
            [27.05, 88.26],   // Darjeeling
        ],
        stops: [
            { lat: 31.23, lng: 121.47, name: "Shanghai", detail: "Fortune's base — disguised himself as a Chinese merchant here", year: "1848" },
            { lat: 27.33, lng: 117.97, name: "Wuyi Mountains", detail: "Forbidden interior — Fortune discovered green & black tea are the same plant", year: "1849" },
            { lat: 27.05, lng: 88.26, name: "Darjeeling", detail: "Chinese tea plants and 8 Chinese tea experts sent here", year: "1851" },
        ]
    },

    /* ---- Chapter 7: India & Ceylon ---- */
    indiaRegions: [
        { lat: 26.5, lng: 91.7, name: "Assam", detail: "Native Camellia sinensis var. assamica discovered 1823. India's largest tea region.", type: "Black (CTC & Orthodox)" },
        { lat: 27.05, lng: 88.26, name: "Darjeeling", detail: "The 'Champagne of teas' — Chinese varieties planted by British at 2,000m elevation", type: "Black (Orthodox)" },
        { lat: 11.4, lng: 76.7, name: "Nilgiri", detail: "Blue Mountains of Tamil Nadu — tea planted from 1840s", type: "Black & Green" },
        { lat: 6.97, lng: 80.78, name: "Nuwara Eliya, Ceylon", detail: "James Taylor's legacy — high-altitude Ceylon tea", type: "Black (Orthodox & CTC)" },
        { lat: 7.25, lng: 80.35, name: "Kandy, Ceylon", detail: "Loolecondera Estate — James Taylor planted first 19 acres in 1867", type: "Black" },
    ],

    /* ---- Chapter 8: Great Tea Race ---- */
    clipperRoute: [
        [26.06, 119.31],  // Foochow (Fuzhou)
        [20.0, 116.0],    // South China Sea
        [10.0, 110.0],
        [1.35, 103.82],   // Singapore Strait
        [-5.0, 80.0],     // Indian Ocean
        [-15.0, 55.0],    // Mauritius area
        [-34.0, 28.0],    // Around South Africa
        [-34.5, 18.5],    // Cape of Good Hope
        [-20.0, 5.0],     // South Atlantic
        [0.0, -10.0],     // Equator crossing
        [15.0, -20.0],    // North Atlantic
        [35.0, -10.0],    // Approaching Europe
        [48.0, -5.0],     // English Channel approach
        [50.5, -1.0],     // English Channel
        [51.51, -0.08],   // London
    ],

    raceStops: [
        { lat: 26.06, lng: 119.31, name: "Foochow (Fuzhou)", detail: "Starting port — ships loaded with first-pick tea in late May 1866", year: "May 1866" },
        { lat: -34.5, lng: 18.5, name: "Cape of Good Hope", detail: "Rounding the Cape — the most dangerous stretch of the race", year: "July 1866" },
        { lat: 51.51, lng: -0.08, name: "London Docks", detail: "Finish — Ariel & Taeping arrived 28 minutes apart after 99 days", year: "Sep 6, 1866" },
    ],

    /* ---- Chapter 9: Global Spread ---- */
    globalSpread: [
        // From China
        { from: [30.27, 120.15], to: [33.59, 130.40], label: "China → Japan", year: "1191", color: "#C8872B" },
        { from: [30.27, 120.15], to: [35.18, 129.08], label: "China → Korea", year: "9th C", color: "#C8872B" },
        { from: [22.20, 113.55], to: [-22.9, -43.17], label: "China (Macau) → Brazil", year: "~1812", color: "#C8872B" },
        { from: [30.0, 103.0], to: [21.03, 105.85], label: "China → Vietnam", year: "Ancient", color: "#C8872B" },
        { from: [30.27, 120.15], to: [-6.2, 106.85], label: "China/Japan → Indonesia", year: "1684", color: "#C8872B" },
        { from: [30.27, 120.15], to: [-27.3, -55.9], label: "China → Argentina", year: "1924", color: "#C8872B" },

        // From India/Ceylon (British)
        { from: [26.5, 91.7], to: [-0.37, 35.28], label: "India → Kenya", year: "1903", color: "#4A7C59" },
        { from: [26.5, 91.7], to: [-15.8, 35.0], label: "India → Malawi", year: "1878", color: "#4A7C59" },
        { from: [26.5, 91.7], to: [-6.8, 37.7], label: "India → Tanzania", year: "1920", color: "#4A7C59" },
        { from: [6.97, 80.78], to: [-2.0, 29.9], label: "Ceylon → Rwanda", year: "1950s", color: "#4A7C59" },
        { from: [26.5, 91.7], to: [-6.2, 106.85], label: "India (Assam) → Indonesia", year: "1820s", color: "#4A7C59" },

        // From Georgia/Russia
        { from: [41.64, 41.64], to: [41.02, 40.52], label: "Georgia → Turkey (Rize)", year: "1878", color: "#1a5276" },
    ],

    /* ---- Chapter 10: Production Data ---- */
    productionData: [
        { country: "China", code: "CN", production: 3700000, teaType: "Green (55%), Black, Oolong, White, Pu-erh", learnedFrom: "Origin country", year: "Ancient" },
        { country: "India", code: "IN", production: 1420000, teaType: "Black (CTC & Orthodox), Green", learnedFrom: "Indigenous Assam + Chinese plants (Robert Fortune, 1851)", year: "1823/1851" },
        { country: "Kenya", code: "KE", production: 569000, teaType: "Black (CTC)", learnedFrom: "British India & Ceylon", year: "1903" },
        { country: "Turkey", code: "TR", production: 280000, teaType: "Black (Rize tea)", learnedFrom: "Georgia / Russian methods", year: "1878" },
        { country: "Sri Lanka", code: "LK", production: 260000, teaType: "Black (Orthodox & CTC)", learnedFrom: "British India — James Taylor (1867)", year: "1867" },
        { country: "Vietnam", code: "VN", production: 200000, teaType: "Green (63%), Black, Lotus tea", learnedFrom: "Indigenous + French colonial", year: "Ancient/1880" },
        { country: "Indonesia", code: "ID", production: 120000, teaType: "Black, Green", learnedFrom: "Dutch brought from Japan/China/India", year: "1684" },
        { country: "Japan", code: "JP", production: 86000, teaType: "Green (Sencha, Matcha, Gyokuro)", learnedFrom: "China — Monk Eisai (1191)", year: "1191" },
        { country: "Argentina", code: "AR", production: 82000, teaType: "Black (CTC for blending)", learnedFrom: "Russia, China, Japan, India", year: "1920s" },
        { country: "Iran", code: "IR", production: 75000, teaType: "Black", learnedFrom: "China via Silk Road / India", year: "15th C" },
        { country: "Bangladesh", code: "BD", production: 70000, teaType: "Black (CTC)", learnedFrom: "British India (extension of Assam)", year: "1840s" },
        { country: "Uganda", code: "UG", production: 60000, teaType: "Black (CTC)", learnedFrom: "British from India/Kenya", year: "1909" },
        { country: "Malawi", code: "MW", production: 45000, teaType: "Black (CTC & Orthodox)", learnedFrom: "British India & Kew Gardens", year: "1878" },
        { country: "Rwanda", code: "RW", production: 33000, teaType: "Black (Orthodox)", learnedFrom: "Belgian Congo / British East Africa", year: "1950s" },
        { country: "Tanzania", code: "TZ", production: 28500, teaType: "Black (CTC)", learnedFrom: "British India", year: "1920" },
        { country: "Brazil", code: "BR", production: 25000, teaType: "Green & Black (for blending)", learnedFrom: "China (500 farmers from Macau)", year: "~1812" },
        { country: "Myanmar", code: "MM", production: 20000, teaType: "Green, Pickled tea (Lahpet)", learnedFrom: "Indigenous — native Camellia sinensis", year: "Ancient" },
        { country: "Nepal", code: "NP", production: 18000, teaType: "Black & Green (Himalayan)", learnedFrom: "Indian/Chinese methods", year: "1863" },
        { country: "Georgia", code: "GE", production: 8000, teaType: "Black", learnedFrom: "China via Silk Road / Russia", year: "1847" },
        { country: "South Korea", code: "KR", production: 4000, teaType: "Green (Jeoncha)", learnedFrom: "China (Tang Dynasty monks)", year: "9th C" },
    ],

    /* ---- Historical production for Chapter 7 chart ---- */
    historicalProduction: {
        labels: ["1840", "1860", "1880", "1900", "1920", "1940", "1960", "1980", "2000", "2024"],
        datasets: {
            china:  [400, 350, 250, 200, 180, 200, 300, 500, 900, 3700],
            india:  [0, 20, 80, 200, 300, 400, 450, 600, 850, 1420],
            ceylon: [0, 0, 5, 70, 100, 130, 200, 210, 300, 260],
            kenya:  [0, 0, 0, 0, 0, 5, 20, 100, 250, 569],
        }
    },

    /* ---- Knowledge tree for SVG diagram ---- */
    knowledgeTree: {
        nodes: [
            { id: "china", label: "China", x: 500, y: 40, color: "#C8872B", size: "large" },
            { id: "japan", label: "Japan (1191)", x: 180, y: 140, color: "#7db944" },
            { id: "korea", label: "Korea (9th C)", x: 320, y: 140, color: "#7db944" },
            { id: "india", label: "India (1823/51)", x: 650, y: 140, color: "#4A7C59", size: "large" },
            { id: "ceylon", label: "Ceylon (1867)", x: 800, y: 140, color: "#4A7C59" },
            { id: "vietnam", label: "Vietnam", x: 80, y: 140, color: "#1a5276" },
            { id: "indonesia", label: "Indonesia (1684)", x: 100, y: 260, color: "#1a5276" },
            { id: "georgia", label: "Georgia (1847)", x: 420, y: 260, color: "#C8872B" },
            { id: "turkey", label: "Turkey (1878)", x: 420, y: 370, color: "#8B2500" },
            { id: "kenya", label: "Kenya (1903)", x: 620, y: 260, color: "#4A7C59" },
            { id: "malawi", label: "Malawi (1878)", x: 750, y: 260, color: "#4A7C59" },
            { id: "tanzania", label: "Tanzania (1920)", x: 620, y: 370, color: "#4A7C59" },
            { id: "rwanda", label: "Rwanda (1950s)", x: 750, y: 370, color: "#4A7C59" },
            { id: "brazil", label: "Brazil (~1812)", x: 300, y: 260, color: "#C8872B" },
            { id: "argentina", label: "Argentina (1920s)", x: 200, y: 370, color: "#C8872B" },
            { id: "uganda", label: "Uganda (1909)", x: 880, y: 260, color: "#4A7C59" },
            { id: "bangladesh", label: "Bangladesh (1840s)", x: 900, y: 140, color: "#4A7C59" },
        ],
        edges: [
            { from: "china", to: "japan" },
            { from: "china", to: "korea" },
            { from: "china", to: "india" },
            { from: "china", to: "vietnam" },
            { from: "china", to: "indonesia" },
            { from: "china", to: "brazil" },
            { from: "china", to: "georgia" },
            { from: "china", to: "argentina" },
            { from: "india", to: "ceylon" },
            { from: "india", to: "kenya" },
            { from: "india", to: "malawi" },
            { from: "india", to: "tanzania" },
            { from: "india", to: "indonesia" },
            { from: "india", to: "bangladesh" },
            { from: "india", to: "uganda" },
            { from: "ceylon", to: "rwanda" },
            { from: "kenya", to: "tanzania" },
            { from: "georgia", to: "turkey" },
        ]
    }
};
