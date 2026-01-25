/* eslint-disable prefer-template */
const CONFIG = 'amman';
const API_URL = process.env.API_URL || 'http://api-hsl.64.225.92.233.nip.io';
const MAP_URL = process.env.MAP_URL || '/maptiler/';
const APP_DESCRIPTION = 'GTFS-based journey planner for Amman, powered by Digitransit.';
const GEOCODING_BASE_URL =process.env.GEOCODING_BASE_URL || `${API_URL}/geocoding/v1`;

const YEAR = 1900 + new Date().getYear();

const minLat = 31.8503732259;
const maxLat = 32.051348742;
const minLon = 35.7864609985;
const maxLon = 36.0363213434;

// Default Center (Downtown/Abdali area)
const defaultLat = 31.9539;
const defaultLon = 35.9106;

export default {
  CONFIG,

  indexPath: '', //keeps routes.js stable for your /maplab route

  URL: {
    API_URL,

    // Standard OTP2 serves under /otp/routers/<router>/ when started with --serve.
    OTP: process.env.OTP_URL || `${API_URL}/otp/routers/amman/`,

    MAP_URL,
    MAP: {
      default: MAP_URL,
      ar: MAP_URL,
      en: MAP_URL,
    },

    STOP_MAP: {
      //default: `${API_URL}/map/v1/stop-map/`,
      default: null,
      ar: null,
      en: null,
    },
    REALTIME_STOP_MAP: {
      default: null,
      ar: null,
      en: null,
    },

    PELIAS: `${GEOCODING_BASE_URL}/search`,
    PELIAS_REVERSE_GEOCODER: `${GEOCODING_BASE_URL}/reverse`,
  },

  API_SUBSCRIPTION_QUERY_PARAMETER_NAME: null,
  API_SUBSCRIPTION_HEADER_NAME: null,
  API_SUBSCRIPTION_TOKEN: null,
  hasAPISubscriptionQueryParameter: false,
  hasAPISubscriptionHeader: false,

  showWeatherInformation: false,

  contactName: {
    ar: 'عمّان',
    en: 'Amman',
    default: 'Amman',
  },

  title: 'Amman',
  textLogo: false,
  logo: 'default/digitransit-logo.png',

  availableLanguages: ['ar', 'en'],
  defaultLanguage: 'en',

  timezoneData:
    'Asia/Amman|EET EEST|-20 -30|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|41e5',

  favicon: './app/configurations/images/hsl/hsl-favicon.png',

  feedIds: [],

  GTMid: '',

  searchSources: ['oa', 'osm'],

  defaultMapCenter: {
    lat: defaultLat,
    lon: defaultLon,
  },

  map: {
    useRetinaTiles: true,
    tileSize: 256,
    zoomOffset: 0,
    minZoom: 10,
    maxZoom: 18,
    areaBounds: {
      corner1: [31.83, 35.78],
      corner2: [32.10, 36.05],
    },
    attribution:
      '<a href="https://www.maptiler.com/copyright/" target="_blank" rel="noreferrer noopener">&copy; MapTiler</a> ' +
      '<a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer noopener">&copy; OpenStreetMap contributors</a>',
  },

  nearbyRoutes: {
    radius: 2000,
    bucketSize: 100,
  },

  maxWalkDistance: 2500,

  parkAndRide: {
    showParkAndRide: false,
    parkAndRideMinZoom: 14,
  },

  ticketSales: {
    showTicketSales: false,
    ticketSalesMinZoom: 16,
  },

  showDisclaimer: true,

  stopsMinZoom: 99, //disabled for now
  terminalStopsMinZoom: 99,
  terminalStopsMaxZoom: 0,
  stopsSmallMaxZoom: 0,

  colors: {
    primary: '#403DF2',
  },

  sprites: 'assets/svg-sprite.default.svg',

  appBarLink: null,
  //appBarLink: { name: 'Amman', href: 'https://crazy.amazing' },

  agency: {
    show: false,
  },

  socialMedia: {
    title: 'Amman <3 Digitransit',
    description: APP_DESCRIPTION,

    // image: {
    //   url: '/img/hsl-social-share.png',
    //   width: 400,
    //   height: 400,
    // },

    // twitter: {
    //   card: 'summary',
    //   site: '@verschwoerhaus',
    // },
  },

  dynamicParkingLots: {
    showDynamicParkingLots: false,
    dynamicParkingLotsSmallIconZoom: 14,
    dynamicParkingLotsMinZoom: 14,
  },

  meta: {
    description: APP_DESCRIPTION,
  },

  useTicketIcons: false,

  transportModes: {
    tram: {
      availableForSelection: false,
      defaultValue: false,
    },

    rail: {
      availableForSelection: false,
      defaultValue: false,
    },

    subway: {
      availableForSelection: false,
      defaultValue: false,
    },

    airplane: {
      availableForSelection: false,
      defaultValue: false,
    },

    ferry: {
      availableForSelection: false,
      defaultValue: false,
    },

    citybike: {
      availableForSelection: false,
      defaultValue: false,
    },
  },

  // streetModes: {
  //   bicycle: {
  //     availableForSelection: false,
  //     defaultValue: false,
  //     icon: 'biking',
  //   },

  //   car_park: {
  //     availableForSelection: false,
  //     defaultValue: false,
  //     icon: 'car-withoutBox',
  //   },

  //   car: {
  //     availableForSelection: false,
  //     defaultValue: false,
  //     icon: 'car_park-withoutBox',
  //   },
  // },

  search: {
    lineRegexp: new RegExp(
      '(^[0-9]+[a-z]?$|^[yuleapinkrtdz]$|(^m[12]?b?$))',
      'i',
    ),
  },

  useSearchPolygon: false,
  searchParams: {
    'boundary.rect.min_lat': minLat,
    'boundary.rect.max_lat': maxLat,
    'boundary.rect.min_lon': minLon,
    'boundary.rect.max_lon': maxLon,
  },

  areaPolygon: [
    [minLon, minLat],
    [minLon, maxLat],
    [maxLon, maxLat],
    [maxLon, minLat],
    [minLon, minLat],
  ],

  footer: {
    content: [
      { label: `amman ❤️ digitransit` },
      {},
      {
        name: 'footer-faq',
        nameEn: 'FAQ',
        href: 'https://www.hsl.fi/ohjeita-ja-tietoja/reittiopas',
      },
      {
        name: 'about-this-service',
        nameEn: 'About the service',
        route: '/tietoja-palvelusta',
        icon: 'icon-icon_info',
      },
    ],
  },

  defaultEndpoint: {
    address: 'Amman',
    lat: 31.9539,
    lon: 35.9106,
  },

  defaultOrigins: [
    { icon: 'icon-icon_star', label: 'Downtown', lat: 31.9516, lon: 35.9349 },
    { icon: 'icon-icon_rail', label: 'Abdali', lat: 31.9635, lon: 35.909 },
    { icon: 'icon-icon_tram', label: 'Sweileh', lat: 32.014, lon: 35.87 },
  ],

  queryMaxAgeDays: 14,

  aboutThisService: {
    ar: [
      {
        header: 'عن هذه الخدمة',
        paragraphs: [
          'مرحبًا بك في مخطط الرحلات باستخدام Digitransit. تساعدك هذه الخدمة على الوصول إلى وجهتك في عمّان بسهولة وسرعة باستخدام النقل العام وخيارات تنقّل أخرى. تجمع Digitransit مختلف وسائل التنقّل في منصة واحدة، دون الحاجة للتنقّل بين عشرات التطبيقات. البرمجية والإعدادات التي تقف خلف هذه المنصة مفتوحة المصدر بالكامل، ويمكن الاطلاع عليها على <a href="https://github.com/HSLdevcom/digitransit-ui">GitHub</a>. تهدف هذه النسخة إلى استكشاف وتحسين تجربة تخطيط الرحلات في مدينة عمّان.',
        ],
      },
      {
        header: 'مصادر البيانات',
        paragraphs: [
          'تعتمد حسابات المسارات وعرض بيانات النقل على توفر البيانات المفتوحة. تستخدم هذه الخدمة مصادر بيانات مفتوحة، من ضمنها:<ul><li>بيانات الخرائط الخلفية وحساب المسارات للمشي والدراجات والسيارات: &copy; <a href="https://openstreetmap.org/">مساهمو OpenStreetMap</a></li><li>بيانات النقل العام بصيغة GTFS، والمستخدمة لأغراض البحث والتجربة</li></ul>',
        ],
      },
      {
        header: 'Digitransit في مدينتك',
        paragraphs: [
          'بما أن Digitransit مشروع مفتوح المصدر، يمكن تهيئته لأي مدينة أو منطقة. لتسهيل عملية الإعداد والتخصيص بحسب السياق المحلي، تم إعداد دليل تقني يشرح خطوات الإعداد بالتفصيل: <a href="https://transportkollektiv.github.io/digitransit-setup/">دليل Digitransit</a>.',
        ],
      },
    ],

    en: [
      {
        header: 'About this service',
        paragraphs: [
          'Welcome to the Digitransit Journey Planner! ...',
        ],
      },
      {
        header: 'Data sources',
        paragraphs: [
          'Route calculations and presentation of transit data ...',
        ],
      },
      {
        header: 'Digitransit in your city',
        paragraphs: [
          'Since Digitransit is OpenSource, it can be set up for any city or region! ...',
        ],
      },
    ],
  },

  staticMessages: [
    {
      id: '2',
      content: {
        en: [
          {
            type: 'text',
            content:
              'We use cookies to improve our services. By using this site, you agree to its use of cookies. Read more: ',
          },
          {
            type: 'a',
            content: 'Privacy Statement',
            href: 'https://verschwoerhaus.de/en/datenschutzerklaerung/',
          },
        ],
        ar: [
          {
            type: 'text',
            content:
              'نستخدم ملفات تعريف الارتباط (الكوكيز) لتحسين خدماتنا. باستخدامك لهذا الموقع، فإنك توافق على استخدام الكوكيز. للمزيد من المعلومات: ',
          },
          {
            type: 'a',
            content: 'سياسة الخصوصية',
            href: 'https://your-privacy-page.example',
          },
        ],
      },
    },
  ],

  themeMap: {
    amman: 'ui-hsl',
  },

  cityBike: {
    showCityBikes: false,
    networks: {},
  },

  geoJson: {
    layers: [],
  },
};
