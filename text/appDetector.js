window.ezfyAppDetector = window.ezfyAppDetector || {};

ezfyAppDetector = (function () {
  const apps = [
    {
      name: "Smile: Rewards & Loyalty",
      description:
        "Points & referrals. Attract & retain your most loyal customers",
      download: "https://apps.shopify.com/smile-io",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/439617d93d452f065b8cd6122493ccc3/icon/CPHVlb70lu8CEAE=.png",
      author: "Smile.io",
      selector: "head > script[src*='smile.io']",
    },
    {
      name: "ManyChat",
      author: "Manychat",
      selector: `script[src*='manychat']`,
      download: `https://manychat.com/product/chatmarketing-with-shopify`,
      description: `Seamlessly connect with Shopify to send abandoned cart reminders, order updates, and personalized coupons with two-way automation on Facebook Messenger & SMS`,
      picture: ``,
    },
    {
      name: "Email Marketing & Sales Pop Up",
      description:
        "Newsletter, Abandoned Cart Email, Popup, Bar. Support Klaviyo.",
      download: "https://apps.shopify.com/automizely-messages",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/b8bc9d365792ea16185361099864182c/icon/CM7J1N-49PUCEAE=.png",
      author: "Automizely & AfterShip",
      selector: "head > script[src*='automizely-analytics']",
    },
    {
      name: "Fera Product Reviews App",
      description: "Beautiful product reviews, photo reviews & video reviews",
      download: "https://apps.shopify.com/fera",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/4b6b591765c9b36332c4e599aea727c6/icon/COWD1Nr0lu8CEAE=.png",
      author: "Fera Commerce Inc",
      selector: "head script[src*='fera.ai']",
    },

    {
      name: "Ultimate Trust Badges",
      description: "Highlight secure checkout & payments. Add trust badges.",
      download: "https://apps.shopify.com/ultimate-trust-badges",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/c9141bfba8db18a258f290a5a639986e/icon/CO3d0pDX5O8CEAE=.png",
      author: "Conversion Bear",
      selector: "head script[src*='trust.conversionbear']",
    },
    {
      name: "Honeycomb Upsell & Cross Sell",
      description:
        "Cross sell, post purchase upsell funnels & cart upsell funnels",
      download: "https://apps.shopify.com/honeycomb-upsell-funnels",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/a27f1e8ca39288fda15f98bb00d59bdd/icon/CICBgPTW5O8CEAE=.png",
      author: "Conversion Bear",
      selector: "script[src*='upsell.conversionbear']",
    },
    {
      name: "Urgency Bear Countdown Timer",
      description:
        "Stunning stock countdown & countdown clock. Countdown to BFCM!",
      download: "https://apps.shopify.com/product-countdown-timer-1",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/16dd035c1ddef0c1336c53b74590b3a4/icon/CLHT9MPW5O8CEAE=.png",
      author: "Conversion Bear",
      selector: "script[src*='countdown.conversionbear']",
    },
    {
      name: "Bundle Bear ‑ Volume Discounts",
      description:
        "Volume discount, quantity breaks, product bundles & free gifts",
      download: "https://apps.shopify.com/bundles-bear",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/fad0559e1068774f7c17d88bb5fa4dde/icon/CPWs5ZXW5O8CEAE=.png",
      author: "Conversion Bear",
      selector: "script[src*='bundle.conversionbear']",
    },

    {
      name: "Proof Bear ‑ Sales Pop Ups",
      description:
        "Add social proof - sales pop ups & cart pop ups notifications.",
      download: "https://apps.shopify.com/video-sales-pop",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/80fc833c329cdb04e8ecbceaf3dbd62f/icon/CP2vq9LW5O8CEAE=.png",
      author: "Conversion Bear",
      selector: "head script[src*='salespop.conversionbear']",
    },
    {
      name: "Tabs by Station",
      description:
        "Easily add professional tabs or accordions to your products.",
      download: "https://apps.shopify.com/tabs-by-station",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/861da965b47ea66d2b05e5e6808006d9/icon/CIWHiL70lu8CEAE=.png",
      author: "Station",
      selector: "head > script[src*='tabs.stationmade']",
    },

    {
      name: "Laybuy Banners",
      description: "Promote buy now, pay later payment plans",
      download: "https://apps.shopify.com/laybuy",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/3d7d4cdf5851c2f0239eb614c8474827/icon/CKzGoMSNnvQCEAE=.jpeg",
      author: "Laybuy",
      selector: "head > script[src*='laybuy-advertize-element']",
    },

    {
      name: "Ultimate GDPR EU Cookie Banner",
      description:
        "Love cookies? A minimal, modern and stunning GDPR cookie bar.",
      download: "https://apps.shopify.com/ultimate-gdpr-eu-cookie-bar",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/8b50849073799433b7b739f295a20e38/icon/COfD7unW5O8CEAE=.png",
      author: "Conversion Bear",
      selector: "script[src*='cookie-bar.conversionbear']",
    },
    {
      name: "PreOrder Bear",
      description: "Sell pre-order products! Keep selling with backorders.",
      download: "https://apps.shopify.com/preorder-bear",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/4787630132e659ac04ab7d5e96a15f21/icon/CPz185Sir_cCEAE=.png",
      author: "Conversion Bear",
      selector: "script[src*='preorder.conversionbear']",
    },
    {
      name: "Smart search bar & filters",
      description: "AI search, product search filter, smart search bar",
      download: "https://apps.shopify.com/rapid-search",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/783115f7f0a0396e05f1baab9b276204/icon/CKf4u9j0lu8CEAE=.jpg",
      author: "Rapid Search",
      selector: "script[src*='rapid-search-static']",
    },
    {
      name: "Variant Image Wizard + Swatch",
      description:
        "Variant Images, Color Swatch, Image Swatch, Carousel + Zoom",
      download: "https://apps.shopify.com/variant-image-wizard",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/fb525efdc6b69fe8d2da4128c473cd99/icon/CJqziI7b8fACEAE=.png",
      author: "ProductWiz Inc.",
      selector: "script[src*='productwiz-rio.js']",
    },
    {
      name: "Route ‑ Protection & Tracking",
      description: "Fuel Growth with Order Protection, Package Tracking & More",
      download: "https://apps.shopify.com/route",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/7115601f61e3feae998d828bd6f6ecf3/icon/CJPRnbP0lu8CEAE=.png",
      author: "RouteApp LLC",
      selector: "script[src*='routeapp.io']",
    },
    {
      name: "Stamped Product Reviews & UGC",
      description:
        "Collect product reviews, photo reviews, video reviews & UGC",
      download: "https://apps.shopify.com/product-reviews-addon",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/00f756e9e94e8c3cfb14266ae483d0f0/icon/CNHI27yE0fQCEAE=.png",
      author: "Stamped.io",
      selector: "script[src*='stamped'][src*='azure']",
    },
    {
      name: "Loox Product Reviews & Photos",
      description:
        "Beautiful Product Reviews, Photo & Video Reviews and Referrals",
      download: "https://apps.shopify.com/loox",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/252ae7c55fa0e8a35df7f6ff3c8c1596/icon/CPLp1Kb0lu8CEAE=.jpg",
      author: "Loox",
      selector: "script[src*='loox.io']",
    },
    {
      name: "Instafeed ‑ Instagram Feed",
      description:
        "Elegant & Shoppable Official Instagram feeds that bring sales",
      download: "https://apps.shopify.com/instafeed",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/ff3b61a8718cbdeb80d3a8dcf0b25014/icon/CMeAjs_0lu8CEAE=.jpg",
      author: "Mintt Studio",
      selector: "script[src*='instafeed']",
    },
    {
      name: "Affiliatly Affiliate Marketing",
      description:
        "All-in-1 Affiliate/Influencer Marketing App at a great price!",
      download: "https://apps.shopify.com/affiliatly",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/ddecc21ee688e4fb63537e4c0bb07f11/icon/COi80_TSgfYCEAE=.jpeg",
      author: "Overcode",
      selector: "script[src*='affiliatly']",
    },
    {
      name: "Klaviyo: Email Marketing & SMS",
      description: "Email, SMS, and more - a unified customer platform",
      download: "https://apps.shopify.com/klaviyo-email-marketing",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/5edd9000b933a8fa88c152d1e498531f/icon/CP6B2OOv3PYCEAE=.png",
      author: "Klaviyo",
      selector: "script[src*='static.klaviyo']",
    },
    {
      name: "Translate Your Store ‑ Weglot",
      description: "Translate your store into multiple languages.",
      download: "https://apps.shopify.com/weglot",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/1100dfd67203a3b26b660c0e006b7c9c/icon/CMvr27n0lu8CEAE=.png",
      author: "Weglot",
      selector: "script[src*='weglot']",
    },
    {
      name: "Improved Contact Form",
      description: '"Contact Us" Page Generator and Popup Contact Widget',
      download: "https://apps.shopify.com/improved-contact-form",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/1f303bb45b1fa174e3f339067cb03ddc/icon/CILXzbj0lu8CEAE=.png",
      author: "Awio",
      selector: "script[src*='improvedcontactform']",
    },
    {
      name: "POWR.io",
      description: "No description available.",
      author: "POWR.io",
      download: "https://apps.shopify.com/partners/powr-io",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/82d46df63104389a2579e189676678c9/icon/CIn72oKZr_UCEAE=.png",
      selector: "script[src*='powr.io']",
    },

    {
      name: "Product Reviews",
      description: "The simplest way to share your customers' experiences.",
      download: "https://apps.shopify.com/product-reviews",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/60fca9c7f3400ddd43004e94b1355691/icon/CIvfosz0lu8CEAE=.png",
      author: "Shopify",
      selector: "script[src*='productreviews.shopify'], #powrIframeLoader",
    },
    {
      name: "tawk.to Live Chat",
      description: "Free Messaging App to Monitor & Chat with site Visitors",
      download: "https://apps.shopify.com/tawk-to",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/377387c5d34625a5a245473a06d09750/icon/CIeh3cf0lu8CEAE=.png",
      author: "tawk.to",
      selector: "head > script[src*='tawk.to']",
    },
    {
      name: "MLV Auto Currency Switcher",
      description: "Multi Currency converter and checkout based on Geolocation",
      download: "https://apps.shopify.com/auto-currency-switcher",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/9ff83e6c203eb21c15fa9ec651290378/icon/CNGAu8f0lu8CEAE=.png",
      author: "MLVeda",
      selector: "script[src*='mlveda'][src*='multi']",
    },
    {
      name: "Mailchimp: Email Marketing",
      description:
        "Drive traffic and sales with email and marketing automation",
      download: "https://apps.shopify.com/mailchimp",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/5a5385cf8a756c3fc55c4fb80706f9f6/icon/CLa98_yf6PMCEAE=.png",
      author: "Mailchimp",
      selector: "script[src*='chimpstatic.com']",
    },
    {
      name: "Privy ‑ Pop Ups, Email, & SMS",
      description: "Email Marketing, SMS, Pop Ups, Cross Sell, Banners & Bars",
      download: "https://apps.shopify.com/privy",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/f3d61c764a54b22aed51cd1cc31b5a74/icon/CLfFg-D0lu8CEAE=.png",
      author: "Privy",
      selector: "script[src*='privy']",
    },
    {
      name: "Quick Announcement Bar",
      description:
        "Promote sales & notifications on a custom banner, boost sales",
      download:
        "https://apps.shopify.com/quick-announcement-bar-always-keep-your-customers-informed",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/77da3bf776c31b1a438e4851b50758bb/icon/COPC49-Km_QCEAE=.png",
      author: "Hextom",
      selector: "script[src*='hextom'][src*='announcement']",
    },
    {
      name: "20+ Promotional Sales Tools",
      description:
        "Pop up, Banner, Contact Us Form, Countdown Timer, Sale Coupons",
      download: "https://apps.shopify.com/promo-bar",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/b8b07e1824d0aa9bef977950e3d0e04b/icon/CIP5x53dyu8CEAE=.png",
      author: "CT CP Phan mem Zotabox",
      selector: "script[src*='zotabox']",
    },
    {
      name: "Shopify Inbox",
      description: "Connect with customers and drive sales with chat– for free",
      download: "https://apps.shopify.com/inbox",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/5c413ee331721e49374ce06d0a7edc1b/icon/CPrw4d6I5fECEAE=.png",
      author: "Shopify",
      selector: "[src*='shopify_chat']",
    },
    {
      name: "Geolocation",
      description:
        "Boost global sales with country and language recommendations.",
      download: "https://apps.shopify.com/geolocation",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/eab6d2b98a02140e9655960f787ceb07/icon/CLjXkbP0lu8CEAE=.png",
      author: "Shopify",
      selector: "script[src*='geolocation-recommendations']",
    },
    {
      name: "Beacon Fraud Protection",
      description:
        "Fraud Analytics & Chargeback Prevention For High Risk Orders",
      download: "https://apps.shopify.com/beacon",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/d325b07ff08af84e4aba9fd1169399aa/icon/COrAtcz0lu8CEAE=.png",
      author: "Lizuna KK",
      selector: "script[src*='beacon.risk']",
    },
    {
      name: "Nosto",
      description:
        "Product Recommendations, Merchandising, A/B Testing & more.",
      download: "https://apps.shopify.com/nosto-personalization-for-shopify",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/7dcd5d67bc1a80f90a95094296d29d71/icon/CLPB3bL0lu8CEAE=.jpg",
      author: "Nosto Solutions Ltd",
      selector: "script[src*='connect.nosto.']",
    },
    {
      name: "Back In Stock: Customer Alerts",
      description:
        "Notify customers: products out of stock, in stock, preorders.",
      download: "https://apps.shopify.com/back-in-stock",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/08346a36a0a313120feec14003bedbc3/icon/CI35i4-zvvQCEAE=.png",
      author: "SureSwift Capital",
      selector: "script[src*='backinstock.org']",
    },
    {
      name: "Signifyd ‑ Fraud Protection",
      description:
        "Maximize Revenue by Preventing Fraud Orders & Customer Abuse",
      download: "https://apps.shopify.com/signifyd",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/adb1d4e7a8537b18730ab69339a13ad4/icon/CLX1-6b0lu8CEAE=.png",
      author: "Signifyd",
      selector: "script[src*='signifyd']",
    },
    {
      name: "Klevu ‑ Advanced Smart Search",
      description:
        "Instant Search + Search based Recommendations & Merchandising",
      download: "https://apps.shopify.com/klevu-smart-search",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/21a9df5710f533bed5c0bd66f913f8f4/icon/CIuDr7Hur_ACEAE=.jpeg",
      author: "Klevu",
      selector: "script[src*='klevu.com']",
    },
    {
      name: "GDPR/CCPA + Cookie Management",
      description:
        "GDPR - LGPD - CCPA - APPI - PIPEDA Compliance for your store",
      download: "https://apps.shopify.com/gdpr-backpack",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/63ef59b872952601351925e45905ae6e/icon/CNPQ7sf0lu8CEAE=.png",
      author: "iSenseLabs",
      selector: "script[src*='gdpr_cookie_consent']",
    },
    {
      name: "Rebuy Personalization Engine",
      description:
        "Personalized Recommendations, Upsell, Cross Sell, Buy it Again",
      download: "https://apps.shopify.com/rebuy",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/9a87fc6fa46c1e06f03627e9ef094b51/icon/CIf4uNGQtfcCEAE=.png",
      author: "Rebuy",
      selector: "script[src*='rebuyengine']",
    },
    {
      name: "PushOwl Web Push Notifications",
      description: "Recover abandoned carts and market better with web push",
      download: "https://apps.shopify.com/pushowl",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/62a4f829cd277d0296259f678226ae19/icon/CNiW-8v0lu8CEAE=.png",
      author: "PushOwl",
      selector: "script[src*='pushowl']",
    },
    {
      name: "Crazy Egg",
      description:
        "Increase sales by knowing where & why your shoppers get stuck.",
      download: "https://apps.shopify.com/crazy-egg",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/888582a859cbd17fec13eef18f30368f/icon/COfe8Mf0lu8CEAE=.png",
      author: "Crazy Egg",
      selector: "script[src*='script.crazyegg']",
    },
    {
      name: "Automatic Discounts & Gifts",
      description: "Mother's Day Gifts and Tiered Discounts (Spend & Save)",
      download: "https://apps.shopify.com/automatic-discount-rules",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/8d6c73f73151a959983ccf51e984ba3f/icon/CNzusfXNqvYCEAE=.png",
      author: "Tabarnapp",
      selector: "script[src*='tabarn'][src*='automatic-discount']",
    },
    {
      name: "Abandoned Cart Recovery",
      description:
        "Abandoned Cart Emails, Facebook Messenger Reminders & Pop-Ups!",
      download: "https://apps.shopify.com/partners/recovermycart",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/14de84ca4796004fc7c4b11721c10723/icon/CJCqscj0lu8CEAE=.png",
      author: "Marsello",
      selector: "script[src*='smartwishlist']",
    },
    {
      name: "Judge.me Product Reviews",
      description: "Product reviews with free photos & videos for social proof",
      download: "https://apps.shopify.com/judgeme",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/8cada0f5da411a64e756606bb036f1ed/icon/CJmAj_a-5fQCEAE=.png",
      author: "Judge.me",
      selector: "script[src*='judge.me']",
    },
    {
      name: "Vitals: All‑in‑One Marketing",
      description:
        "Product Reviews, Upsells, Visitor Replays, Currency Converter",
      download: "https://apps.shopify.com/vitals",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/90600ebf22ca801b5fc543ad9b7553f0/icon/CMqh6sqC5PQCEAE=.png",
      author: "Vitals",
      selector: "head > script[src*='appsolve.io']",
    },
    {
      name: "PageFly Landing Page Builder",
      description:
        "Build Landing, Product Pages for more sales with 24/7 Support",
      download: "https://apps.shopify.com/pagefly",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/f85ee597169457da8ee70b6652cae768/icon/CKmsycCOx_YCEAE=.png",
      author: "PageFly",
      selector: "script[src*='pagefly.io']",
    },

    {
      name: "Free Shipping Bar",
      description:
        "Progressive shipping goals to boost sales & average cart value",
      download: "https://apps.shopify.com/free-shipping-bar",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/635cce572624d1086ac37403cf25b5ee/icon/CMjyoI6Lm_QCEAE=.png",
      author: "Hextom",
      selector: "script[src*='hextom'][src*='freeshippingbar']",
    },
    {
      name: "Messenger, Whatsapp Chat+Carts",
      description:
        "FB+WA Business API- Chat, Abandoned Cart, Bulk Message, Popups",
      download: "https://apps.shopify.com/bitespeed-fb-messenger-chatbot",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/de3d0eec6cc35360a277ea5c165e2708/icon/CPbt3Lj0lu8CEAE=.png",
      author: "BiteSpeed",
      selector: "script[src*='bitespeed.co/']",
    },
    {
      name: "Ultimate Sales Boost",
      description:
        "Urgency & stock countdown, trust badge, get-it-by timer, BOGO",
      download: "https://apps.shopify.com/ultimate-sales-boost",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/999f9fea413c682a9ef65825272813e8/icon/CNO_w-KJm_QCEAE=.png",
      author: "Hextom",
      selector: "script[src*='hextom'][src*='salesboost']",
    },
    {
      name: "Ultimate Sticky Add to Cart",
      description: "Fast checkout with sticky add to cart.",
      download: "https://apps.shopify.com/ultimate-sticky-add-to-cart",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/dfc61b713b35d929c2a549e58e540167/icon/CP3tpILX5O8CEAE=.png",
      author: "Conversion Bear",
      selector: "script[src*='sticky.conversionbear']",
    },
    {
      name: "AVA Trust Badges, Sales Pop",
      description: "Sales pop, Trust badges, Countdown timer bar, Oberlo",
      download: "https://apps.shopify.com/partners/avada",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/7c15306931eaaec4c575ca750dea3123/icon/CK-bsJLpr_ECEAE=.png",
      author: "AVADA",
      selector: "script[src*='apps.avada.io']",
    },
    {
      name: "Booster: EU Cookie Bar GDPR",
      description: "Provide a cookie banner to EU customers. GDPR consent",
      download: "https://apps.shopify.com/eu-cookie-bar",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/56e3847f6992e05a68032562b35608e0/icon/CMWA6sf0lu8CEAE=.png",
      author: "Booster Apps",
      selector: "script[src*='booster_eu_cookie']",
    },
    {
      name: "Ryviu: Aliexpress Reviews App",
      description:
        "Collect product reviews, Amazon review importer, Etsy & Oberlo",
      download: "https://apps.shopify.com/ryviu",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/e80ca8383d6dc37c48bc5bf8092658c4/icon/COHr7prt7_YCEAE=.png",
      author: "Ryviu",
      selector: "script[src*='ryviu.com']",
    },
    {
      name: "GemPages Landing Page Builder",
      description:
        "Home Page, Product Page Editor & more w/o code, drag & drop!",
      download: "https://apps.shopify.com/gempages",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/6d72140e25d3f444e352738033321b98/icon/CJCIkdONi_UCEAE=.jpeg",
      author: "GemPages",
      selector: "script[src*='gempage']",
    },
    {
      name: "Trust Me ‑ Free Trust Badges",
      description: "Security, Checkout & Payment Trust Badges/Icons - All Free",
      download: "https://apps.shopify.com/trust-badge-by-giraffly",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/6baee2749b9ede050c5235f5ad143bb7/icon/CMqV36_0lu8CEAE=.png",
      author: "Giraffly",
      selector: "script[src*='giraffly-trust']",
    },
    {
      name: "Frequently Bought Together",
      description: "Personalized Recommendations, Upsell Bundles and Discounts",
      download: "https://apps.shopify.com/frequently-bought-together",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/c445f0f56cab256cf45aae9a6ae4566c/icon/CP3fjLj0lu8CEAE=.png",
      author: "Code Black Belt",
      selector: "script[src*='codeblackbelt'][src*='frequently']",
    },
    {
      name: "Instagram Feed, Story & TikTok",
      description: "Shoppable Instagram Feed, TikTok Feed, Instafeed, Stories",
      download: "https://apps.shopify.com/instafeed-socialwidget",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/78c7d846fe4892fb9f338d208c8e9e6e/icon/CLXlk7z0lu8CEAE=.png",
      author: "Socialhead",
      selector: "script[src*='socialhead']",
    },
    {
      name: "BEST Currency Converter",
      description:
        "Show prices in customers local currency. Make shopping easy.",
      download: "https://apps.shopify.com/doubly-currency-converter",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/0acf71ea227f225b08ce559a9b6ee9ec/icon/CM-Pn7L0lu8CEAE=.png",
      author: "Grizzly Apps SRL",
      selector: "script[src*='assets/ginit.js']",
    },
    {
      name: "Automizely Page Builder",
      description:
        "Landing Page, Product Page, Blog, About Us, Contact Us, FAQs",
      download: "https://apps.shopify.com/automizely-page-builder",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/509c23bb318c8738cb6241120501eadf/icon/CLrXi8e29PUCEAE=.png",
      author: "Automizely & AfterShip",
      selector: "head > script[src*='automizely-analytics']",
    },
    {
      name: "BON Loyalty Rewards & Referral",
      description:
        "Powerful loyalty program builder (rewards, points & referrals)",
      download: "https://apps.shopify.com/bon-loyalty-rewards",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/f367f56199c88dba9296f532dfc5b383/icon/CIy1iJXc5PECEAE=.png",
      author: "Smartify Apps",
      selector: "script[src*='bonloyalty']",
    },
    {
      name: "Language Translate + Currency",
      description: "Multi Languages & Multi Currency switcher, Translate store",
      download: "https://apps.shopify.com/localiser",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/3c87b0179bad81cd5b2a0b6f0c595df1/icon/CJDis6bun_cCEAE=.png",
      author: "UpperCommerce",
      selector: "script[src*='uppercommerce.com'][src*='localiser']",
    },
    {
      name: "T Lab ‑ AI Language Translate",
      description:
        "Multi Language Translation & Multi Currency - Sell Globally",
      download: "https://apps.shopify.com/content-translation",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/fdc796485b6462ec4b5071f81d2613bf/icon/CNP_mdP0lu8CEAE=.jpg",
      author: "Sherpas Design",
      selector: "script[src*='translation-lab']",
    },
    {
      name: "Back In Stock ‑ Restock Alerts",
      description:
        "Send Back In Stock notifications on Email,SMS,Push & Messenger",
      download:
        "https://apps.shopify.com/customer-back-in-stock-alert-user-notification-app",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/fdcc8ce1d50c8ee6b9683086b89320ea/icon/CMWIlKb0lu8CEAE=.png",
      author: "Appikon Software Pvt Ltd",
      selector: "head > script[src*='/assets/subscribe-it.js']",
    },
    {
      name: "Product Filter & Search",
      description: "#1 Collection Filter & Smart Search app for any stores",
      download: "https://apps.shopify.com/product-filter-search",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/d4172f8181a20b56ade67cc448fac594/icon/CLzL1pCM9vMCEAE=.png",
      author: "Boost Commerce",
      selector: "script[src*='boost-pfs-filter.js']",
    },
    {
      name: "Product Labels & Badges",
      description:
        "Product badges & labels hot, out of stock, BFCM, new year...",
      download: "https://apps.shopify.com/product-labels-by-bss",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/8ff87511bcdffd3dfc280f3600a78695/icon/CJDJlubPmfUCEAE=.png",
      author: "BSS Commerce",
      selector: "script[src*='bsscommerce'][src*='product-label']",
    },
    {
      name: "Smart Product Filter & Search",
      description:
        "Product filter, collection filter, product search, search bar",
      download: "https://apps.shopify.com/product-filter-and-search",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/f44b43e81ef89598c0de05c8ea6dcf80/icon/CIe83cL0lu8CEAE=.png",
      author: "Globo",
      selector: "script[src*='globo.filter']",
    },
    {
      name: "Shogun Page Builder",
      description: "Page Editor to Design Blogs, Product & Landing Pages",
      download: "https://apps.shopify.com/shogun",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/0ca2c1526ec07b9f52021bd42651b1fd/icon/CKbcw7f4xvACEAE=.jpeg",
      author: "Shogun Labs, Inc.",
      selector: "script[id*='NEXT_DATA']",
    },
    {
      name: "Terms and Conditions Checkbox",
      description:
        "I Agree Terms check box for specific products & countries/all",
      download: "https://apps.shopify.com/terms-and-conditions-checkbox",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/d569f75fcf1eeec927644330e4fb70c1/icon/CP_Y-PLexvECEAE=.png",
      author: "Effective Apps",
      selector: "script[src*='tnc-app']",
    },
    {
      name: "Opinew Product Reviews App UGC",
      description:
        "Social proof, Request product review app, review importer, UGC",
      download: "https://apps.shopify.com/photo-reviews",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/2652696f8cd7357ce591f2b6217cd918/icon/CNeUncL0lu8CEAE=.png",
      author: "Opinew",
      selector: "script[src*='opinew.com']",
    },
    {
      name: "Sticky Add to Cart Button Pro",
      description:
        "Sticky Cart, Quick Buy, Fast Checkout, Cart Slider, Buy Now",
      download:
        "https://apps.shopify.com/sticky-cart-and-sticky-add-to-cart-button",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/f82a9141398ad48da65639c1baeff141/icon/CIfXudP0lu8CEAE=.png",
      author: "Giraffly",
      selector: "script[src*='giraffly'][src*='sticky']",
    },
    {
      name: "EcomSolid Theme & Page Builder",
      description:
        "Build themes & pages for more sales. No Coding Skills needed",
      download: "https://apps.shopify.com/ecomsolid",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/9eae47bb72e82aac20e30f2378f82fe0/icon/CIvCr638tvICEAE=.jpeg",
      author: "EcomSolid",
      selector: "section[class^='gt_section-'][data-name]",
    },
    {
      name: "Sale Kit‑Sales Pop Up",
      description: "SOCIAL PROOF, SCARCITY, Sales Pop, Promotion Popup, etc.",
      download: "https://apps.shopify.com/sale-kit",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/f6bc812d12df383028eaf0bd40a71423/icon/CIzk8ez18fQCEAE=.png",
      author: "qikify",
      selector: "script[src*='qikify'][src*='salekit']",
    },
    {
      name: "All Announcement Bars & Banner",
      description:
        "Free Shipping Bar, Countdown Timer, Email Popup, Header Banner",
      download: "https://apps.shopify.com/announcement-bar-maker-by-apphero",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/8403a56247e301cd3036a72139b9c44b/icon/CJzLw4nq7_QCEAE=.png",
      author: "AppHero",
      selector: "script[src*='apphero']",
    },

    {
      name: "Free Trust Badge",
      description: "Payment trust badges for sales conversion and social proof",
      download: "https://apps.shopify.com/trust-badge",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/4d3aa955e8a0396e4a64a20ae1915462/icon/CMGr7M30lu8CEAE=.png",
      author: "ShopClimb",
      selector: "script[src*='hektor'][src*='trustbadge']",
    },

    {
      name: "Ultimate Product Icons",
      description:
        "Display your product guarantees and features to convert sales",
      download: "https://apps.shopify.com/free-trust-seals",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/bfd4dd686b9fb2a8db2d9b4de62acabe/icon/CMyUoLP0lu8CEAE=.png",
      author: "ShopClimb",
      selector: "script[src*='hektor'][src*='trustseal']",
    },

    {
      name: "Zoorix: Cross Sell & Bundles",
      description:
        "Product Bundle Upsell, Volume Discount, Cart Upsell Offer +AOV",
      download: "https://apps.shopify.com/zoorix",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/878ee40e7b3300a1eea9cbb74df480fb/icon/CNDVz4mXhvYCEAE=.png",
      author: "Zoorix",
      selector: "script[src*='public.zoorix']",
    },
    {
      name: "Instafeed Instagram Feed/Story",
      description:
        "1-Click Setup Instagram Gallery + Instagram Stories/Highlight",
      download: "https://apps.shopify.com/instagram-stories-for-website",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/66b5bf2f2fdc7e07563c1b2874d987d6/icon/CIy8hNT0lu8CEAE=.png",
      author: "Adevole",
      selector: "script[src*='instagram-story']",
    },

    {
      name: "WhatsApp Chat Notifications",
      description:
        "Order Updates, Tracking & Cart Recovery using your own number!",
      download: "https://apps.shopify.com/leads-on-whatsapp",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/2c8b8a1977180fe96cbc9cae95af613a/icon/COrG3Mf0lu8CEAE=.jpg",
      author: "Adevole",
      selector: "script[src*='whatsapp'][src*='adevole']",
    },

    {
      name: "Variant Option Product Options",
      description:
        "custom product personalize product variant,color swatch,upload",
      download: "https://apps.shopify.com/best-custom-product-options",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/87de98472933292768e9633a005e80a8/icon/CJP23av0lu8CEAE=.png",
      author: "Relentless Apps",
      selector: "script[src*='charts-relentless']",
    },
    {
      name: "Junip ‑ Product Reviews & UGC",
      description:
        "Gather & display reviews (product reviews, store reviews, UGC)",
      download: "https://apps.shopify.com/junip",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/96f1afce30a67cdc7d9ac627db24ff70/icon/CKbw46nFy_YCEAE=.png",
      author: "Junip Inc.",
      selector: "script[src*='scripts.junip']",
    },
    {
      name: "GDPR Compliance Center",
      description:
        "GDPR/CCPA/LGPD Cookie Banner, cookies consent, data protection",
      download: "https://apps.shopify.com/gdpr-cookie-consent",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/3f0b68db732b6704928d685690b753c8/icon/CJ76x7j0lu8CEAE=.png",
      author: "Pandectes",
      selector: "script[src*='pandectes-rules']",
    },
    {
      name: "Promolayer | Fast, Easy Popups",
      description:
        "Convert more with popups, banners, spin-to-wins, slide-ins...",
      download: "https://apps.shopify.com/promolayer",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/8ad9a5e2a36501b31cd307272ab64a5d/icon/COapwbbe9vUCEAE=.png",
      author: "PEAKDIGITAL",
      selector: "script[src*='promolayerio']",
    },

    {
      name: "PRODUCT SEARCH BAR & FILTERS",
      description:
        "Instant & Rapid Search Bar. Advanced Smart Search & Categories",
      download: "https://apps.shopify.com/doofinder",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/4bd2ff62bd25c82e2138b6ef6fc1b59c/icon/CKufxt70lu8CEAE=.png",
      author: "Doofinder",
      selector: "script[src*='doofinder-installed']",
    },
    {
      name: "Smart Mega Menu & Navigation",
      description: "Easy create mega menu - BEST for store navigation",
      download: "https://apps.shopify.com/smart-menu",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/04108b4f825e790fb3fddaf54c9d6a3a/icon/COng7av28fQCEAE=.png",
      author: "qikify",
      selector: "script[src*='qikify'][src*='smartbar']",
    },
    {
      name: "Spin Wheel Popup+Email Pop ups",
      description:
        "WooHoo Spin To Win Popups - Spin The Wheel Email | SMS Pop ups",
      download: "https://apps.shopify.com/woohoo",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/48960e9db0ec3b82fdcc43a9da970299/icon/CKbt6uWJyPYCEAE=.png",
      author: "WooHoo Popups",
      selector: "script[src*='app.getwoohoo']",
    },

    {
      name: "Sales Countdown Timer Bar 2.0",
      description:
        "Instantly add a Sales Countdown Timer, Bar, Clock, or Counter!",
      download: "https://apps.shopify.com/sales-countdown-timer-bar",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/8e0710930178a2c9662c8dd768249846/icon/COTUzOigwvQCEAE=.png",
      author: "Amai",
      selector: "script[src*='amai'][src*='timer-app']",
    },
    {
      name: "Mega Menu & Navigation",
      description: "FREE Mega Menu: cool design, easy dropdown navigation",
      download: "https://apps.shopify.com/buddha-mega-menu",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/1f2048e3e855cf4cfd55ccfc3eabbb3c/icon/CIeL15G2yfICEAE=.png",
      author: "Buddha Apps (Zero Carbon)",
      selector: "script[src*='mm-init']",
    },

    {
      name: "Smart Search & Filter",
      description: "Instant Search Bar, Collection Filter, Cross & Upsell",
      download: "https://apps.shopify.com/searchanise",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/543e5094f4dc166bd6de54ff98c7e80e/icon/CLT8obP0lu8CEAE=.png",
      author: "Searchanise",
      selector: "script[src*='searchanise']",
    },

    {
      name: "GDPR Legal Cookie",
      description:
        "GDPR & CCPA compliant cookie consent incl facebook and google",
      download: "https://apps.shopify.com/gdpr-legal-cookie",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/e2020b4b7a227fb0868086f233e711ef/icon/COyi8t_0lu8CEAE=.png",
      author: "beeclever",
      selector: "script[src*='gdpr-legal-cookie.beeclever']",
    },
    {
      name: "Multi Announcement Bar, Banner",
      description:
        "Free Shipping Bar, Promotion Bar, Countdown bar, Banner slider",
      download: "https://apps.shopify.com/announcement-bar-with-slider",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/b0dd7bc60bc7f254faf141d9b02d7472/icon/CO3esdn0lu8CEAE=.png",
      author: "Webrex Studio",
      selector: "script[src*='ws-announcement.js']",
    },
    {
      name: "Appointment Booking App",
      description: "Booking app for appointments, events, calendar",
      download: "https://apps.shopify.com/appointo",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/b3dccf14643e2c76121cb5c5ca9a068e/icon/CLiykKz0lu8CEAE=.png",
      author: "SidePanda",
      selector: "scirpt[src*='app.appointo.me']",
    },
    {
      name: "Laybuy Banners",
      description: "Promote buy now, pay later payment plans",
      download: "https://apps.shopify.com/laybuy",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/3d7d4cdf5851c2f0239eb614c8474827/icon/CKzGoMSNnvQCEAE=.jpeg",
      author: "Laybuy",
      selector: "script[src*='laybuy-']",
    },
    {
      name: "Postscript SMS Marketing",
      description: "Create, launch, and manage your SMS Text marketing program",
      download: "https://apps.shopify.com/postscript-sms-marketing",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/54fb9eb4e59e94fa0e3b1b173de78ca4/icon/COCr277b2vUCEAE=.png",
      author: "Postscript",
      selector: "script[src*='postscript.io']",
    },

    {
      name: "Seal Subscriptions℠ & Loyalty",
      description:
        "The most well built subscriptions & recurring payments app!",
      download: "https://apps.shopify.com/seal-subscriptions",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/2238eba39a98da1ae85cfb8a609b4cbe/icon/CIzDte-hx_QCEAE=.png",
      author: "Seal Subscriptions",
      selector: "script[src*='app.sealsubscription']",
    },
    {
      name: "Slide Cart ‑Sticky Cart Drawer",
      description:
        "Cart upsell, Cart Cross Sell, rewards, announcements & coupon",
      download: "https://apps.shopify.com/slide-cart",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/a6756a825196236acbd97e15b7ef7f36/icon/COWnj6b0lu8CEAE=.png",
      author: "App HQ Pte. Ltd.",
      selector: "script[src*='slidecart-dis']",
    },
    {
      name: "UpCart ‑ Slide Cart Drawer",
      description:
        "Build a Sliding Cart! Add Offers, Rewards, Free Shipping Bar +",
      download: "https://apps.shopify.com/upcart-cart-builder",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/8cce16328fae7303f55e346b8a81ec07/icon/CIaV8pqagvYCEAE=.png",
      author: "BEAM",
      selector: "script[src*='upcart-bundle']",
    },
    {
      name: "Fontify ‑ Use any font",
      description: "Changing the font for your store has never been easier.",
      download:
        "https://apps.shopify.com/fontify-change-customize-font-for-your-store",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/882f68aac7edf55a4ba456d5aae6e978/icon/CPDFjZKqxPUCEAE=.png",
      author: "Nitro Apps",
      selector: "script[src*='fontify.js']",
    },
    {
      name: "Discount On Cart‑ Pro Edition!",
      description:
        "Discount Code On Cart, Multiple Coupon Codes, Stack Discounts",
      download: "https://apps.shopify.com/discount-on-cart-pro",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/d625f3320b633f0c1d156d3b47d00c5b/icon/CJ7ky5vO0_ACEAE=.png",
      author: "Shop Doctors 🏆",
      selector: "script[src*='discount-on-cart-pro']",
    },

    {
      name: "Mega Menu",
      description: "Mega Menu with images, Drop Down Menu, Navigation Menu",
      download: "https://apps.shopify.com/globo-mega-menu",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/abda3a043b7a4d6c80daf1ca40a0c372/icon/CNHSmMP0lu8CEAE=.png",
      author: "Globo",
      selector: "script[src*='megamenu'][src*='globo']",
    },
    {
      name: "Vimotia ‑ Shoppable Videos",
      description: "Shoppable Video, TikTok & Instagram Feed, Youtube Import",
      download: "https://apps.shopify.com/video-marketing",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/db599f71c89e077eba1d5a71f1dff8d2/icon/CNex2tG8kPQCEAE=.jpeg",
      author: "Hextom",
      selector: "script[src*='hextom'][src*='vimotia']",
    },
    {
      name: "Yotpo Loyalty & Rewards",
      description: "Loyalty, Referrals & Rewards by Yotpo (formerly Swell)",
      download: "https://apps.shopify.com/swell",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/f693caaaf4c437600611eb42fc8da5d3/icon/CPPj8Ijup-8CEAE=.png",
      author: "Swell Rewards",
      selector: "script[src*='loyalty.yotpo']",
    },
    {
      name: "FAQ Page & Help Center Pro",
      description:
        "SEO-Friendly FAQ page, product FAQ, Accordions, 12+ templates",
      download: "https://apps.shopify.com/faq-page-smart",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/dd762be16e402a72b9dbafab68aaa867/icon/CLrl9tSHmfECEAE=.png",
      author: "DDSHOP APPS",
      selector: "script[src*='faq.ddshopapps.com']",
    },
    {
      name: "Sticky Add To Cart + Buy Now",
      description:
        "Fast Checkout+ Add to cart/Buy now button + Animated Mini Cart",
      download: "https://apps.shopify.com/cornercart",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/722ae3fa84628e08b7851d15d20bb028/icon/CNCCiaz0lu8CEAE=.png",
      author: "Corner",
      selector: "script[src*='widget.cornercart.io']",
    },
    {
      name: "Guarantees & Features Icons",
      description:
        "Highlight custom product icons in description to build trust.",
      download: "https://apps.shopify.com/product-feature-icons",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/6cc86e545e9a14e45bbabfba00f93b04/icon/CMrYka30lu8CEAE=.png",
      author: "Kaching Appz",
      selector: "script[src*='kachingappz-icons']",
    },
    {
      name: "Discount Announcement Bar",
      description: "Stunning announcement bar to promote store discounts.",
      download: "https://apps.shopify.com/announcement-bar-6",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/359516dc0a3a9b2a1dee06cc9bf4619f/icon/CMLFw6zW5O8CEAE=.png",
      author: "Conversion Bear",
      selector: "script[src*='announcement-bar.conversionbear']",
    },
    {
      name: "BoosterKit Upsell + Cross Sell",
      description:
        "Pre, Post Purchase Upsell & Cross Sell. Product Upgrade & more",
      download: "https://apps.shopify.com/booster-kit",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/449de8ea72ddee7231948431d2070e80/icon/COvZrrL18fQCEAE=.png",
      author: "qikify",
      selector: "script[src*='boosterkit'][src*='qikify']",
    },
    {
      name: "Currency Converter & Switcher",
      description: "Currency Conversion, Currency Switcher, Support Market",
      download: "https://apps.shopify.com/currency-converter-11",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/b33f6d876accac12b91af70e42dabbdb/icon/CK-cufzoue8CEAE=.png",
      author: "Webrex Studio",
      selector: "script[src*='currencyconverter.js']",
    },
    {
      name: "Bundles Upsell | PickyStory",
      description:
        "Bundle, Gift, Bundle Builder, Discounts, BOGO, Quantity Breaks",
      download: "https://apps.shopify.com/product-kits-bundles-pickystory",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/449e9b43474aa81d966420dfe62071cc/icon/CLPyt7H0lu8CEAE=.png",
      author: "PickyStory",
      selector: "script[src*='cdn.pickystory']",
    },
    {
      name: "TrustedSite ‑ Trust Badges",
      description:
        "Earn certifications. Increase sales. Formerly McAfee SECURE.",
      download: "https://apps.shopify.com/mcafee-secure",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/38fdc008d044b95511d73b59ae0cc83f/icon/CIX8yLf0lu8CEAE=.png",
      author: "TrustedSite",
      selector: "script[src*='cdn.ywxi.net']",
    },
    {
      name: "Image Gallery + Video ‑ EA",
      description: "Image Gallery  + Video Gallery + Photo Lookbook",
      download: "https://apps.shopify.com/image-gallery-by-enormapps",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/80a8f3912d0aa304593b7a28771fe95b/icon/CNndpMi3j_ACEAE=.png",
      author: "EnormApps",
      selector: "[id*='enap-gallery'][class*='enap-gallery']",
      alternative: `Gallery Section EZFY`,
    },
    {
      name: "iCart Cart Drawer Cart Upsell",
      description:
        "In Cart Upsell & Cross Sell Offer | Cart Page | Cart Drawer",
      download: "https://apps.shopify.com/icart",
      picture:
        "https://cdn.shopify.com/app-store/listing_images/9ab80f357263dfca71a6e19296300595/icon/CLmopNP0lu8CEAE=.png",
      author: "Identixweb",
      selector: "script[src*='icart.identixweb']",
    },
  ];

  function extractBetween([start, end]) {
    const matcher = new RegExp(`${start}(.*?)${end}`, "gm");
    const normalise = (str) => str.slice(start.length, end.length * -1);
    return function (str) {
      return str.match(matcher).map(normalise);
    };
  }

  function _extractTextBetween(text, start, end) {
    if (!start || !end) {
      throw new Error(`Please add a "start" and "end" parameter`);
    }

    return text.split(start)[1].split(end)[0];
  }

  /* TODO 
  Find apps by HTML selector
  */
  function getAppsInDOM() {
    let found = [];
    for (var each of apps) {
      const $el = document.querySelector(each.selector);

      if ($el) {
        found = [...found, each];
      }
    }

    return found;
  }

  function appsFoundByScriptTag() {
    let $scripts = document.querySelectorAll(
      `head > script:not([src]):not([id]):not([type]):not([class]), 
    body > script:not([src]):not([id]):not([type]):not([class]),
    head > script[src]:not([src*='trekkie']):not([data-source-attribution]):not([src*='assets/global.js']):not([data-sections])`,
    );

    let apps = [];

    for (var each of $scripts) {
      var content = each.innerHTML;

      if (/urls\[i\]/gim.test(content) && /asyncload/gim.test(content)) {
        let _apps = _extractTextBetween(content, "[", "]");
        apps = [
          ...apps,
          ..._apps
            .split(",")
            .map((e) =>
              e
                .replaceAll(`\\`, "")
                .replaceAll(`\"`, "")
                .replaceAll(`//`, "")
                .replaceAll(`:`, `://`),
            ),
        ];
      } else {
        const url = each.getAttribute("src");

        if (!url) {
          continue;
        }

        if (
          /shopify_pay\/storefront/gim.test(url) ||
          /fbevents/gim.test(url) ||
          /shop_events_listener/gim.test(url) ||
          /assets\/vendor(s)?\.js/gim.test(url) ||
          /assets\/theme\.js/gim.test(url) ||
          /jquery/gim.test(url) ||
          /google-analytics/gim.test(url) ||
          /platform\.twitter/gim.test(url) ||
          /custom\.modernizr\.js/gim.test(url)
        ) {
          continue;
        }

        apps = [...apps, url];
      }
    }

    let _apps = apps.map(
      (e) => e.replace("https://", "").replace("//", "").split("?")[0],
    );

    const result = [...new Set(_apps)];

    return result;
  }

  function getAppsInScriptTags() {
    var list = appsFoundByScriptTag();

    console.log("script tags found:", list);

    if (list.length <= 0) {
      return;
    }

    let all = [];

    for (var [i, each] of list.entries()) {
      var link = each.split("?")[0];

      all = [
        ...all,
        ...apps
          .map((e) => {
            const selectors = extractBetween([`'`, `'`])(e.selector);

            const found = selectors.filter((x) => {
              if (link.includes(x)) {
                return true;
              }

              return false;
            });

            /*
            Checks if the link contains all selectors. 

            For example, given the following URL:

            cdn.hextom.com/js/quickannouncementbar.js

            And the selector:

            script[src*='hextom'][src*='announcement']

            It's crucial that both "hextom" and "announcement" are present in the string.
            To ensure that is the case, we check if the selectors length is the same as found's.
            */

            if (found.length > 0 && found.length === selectors.length) {
              // console.log(found.length, link);
              return e;
            } else {
              return undefined;
            }
          })
          .filter((e) => e !== undefined),
      ];

      if (i >= list.length - 1) {
        return [...new Set(all)];
      }
    }
  }

  function getAllApps() {
    var scriptApps = getAppsInScriptTags();
    var DOMApps = getAppsInDOM();

    var found = [...scriptApps, ...DOMApps];

    return [...new Set(found)];
  }

  return {
    init: function () {
      console.log("test");
      const found = getAllApps();
      console.log("Apps found: ", found);

      document.addEventListener("DOMContentLoaded", function () {});

      window.addEventListener("resize", function () {});

      window.addEventListener("load", function () {});

      window.addEventListener("scroll", function () {});
    },
  };
})();

ezfyAppDetector.init();
