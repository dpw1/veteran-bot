async function getTheme(page) {
  return new Promise(async (resolve, reject) => {
    const returned = await page.evaluate(() => {
      return new Promise((resolve, reject) => {
        const themes = {
          superstore: {
            name: "Superstore",
            url: "https://outofthesandbox.com/collections/superstore-theme",
            download:
              "https://outofthesandbox.com/collections/superstore-theme?source=ezfycode.com",
            type: "Paid",
          },

          turbo: {
            name: "Turbo",
            url: "https://turbo-theme.myshopify.com/",
            download:
              "https://outofthesandbox.com/products/turbo-theme-portland?source=ezfycode.com",
            type: "Paid",
          },

          fashionopolism: {
            name: "Fashionopolism",
            url: "https://fashionopolism-responsive.myshopify.com/",
            download:
              "https://themes.shopify.com/themes/fashionopolism/styles/empire",
            type: "Paid",
          },
          debut: {
            name: "Debut",
            url: "https://debut-theme-default.myshopify.com/",
            download: "https://themes.shopify.com/themes/debut/styles/default",
            type: "Free",
          },

          narrative: {
            name: "Narrative",
            url: "https://narrative-theme-earthy.myshopify.com/",
            download:
              "https://themes.shopify.com/themes/narrative/styles/earthy",
            type: "Free",
          },

          express: {
            name: "Express",
            url: "https://express-theme-bistro.myshopify.com/",
            download: "https://themes.shopify.com/themes/express/styles/bistro",
            type: "Free",
          },

          venture: {
            name: "Venture",
            url: "https://venture-theme-snowboards.myshopify.com/",
            download:
              "https://themes.shopify.com/themes/venture/styles/outdoors",

            type: "Free",
          },

          boundless: {
            name: "Boundless",
            url: "https://boundless-theme-apparel.myshopify.com/",
            download:
              "https://themes.shopify.com/themes/boundless/styles/black-white",
            type: "Free",
          },

          simple: {
            name: "Simple",
            url: "https://simpletheme-light.myshopify.com/",
            download: "https://themes.shopify.com/themes/simple/styles/light",
            type: "Free",
          },
          brooklyn: {
            name: "Brooklyn",
            url: "https://brooklyn-theme-classic.myshopify.com/",
            download:
              "https://themes.shopify.com/themes/brooklyn/styles/classic",
            type: "Free",
          },

          supply: {
            name: "Supply",
            url: "https://supply-electronics.myshopify.com/",
            download: "https://themes.shopify.com/themes/supply/styles/blue",
            type: "Free",
          },

          minimal: {
            name: "Minimal",
            url: "https://minimal-vintage-theme.myshopify.com/",
            download:
              "https://themes.shopify.com/themes/minimal/styles/fashion",
            type: "Free",
          },

          highlight: {
            name: "Highlight",
            url: "https://highlight-theme.myshopify.com/",
            download:
              "https://themes.shopify.com/themes/highlight/styles/modern",
            type: "Paid",
          },
          expanse: {
            name: "Expanse",
            url: "https://expanse-theme-furniture.myshopify.com/",
            download:
              "https://themes.shopify.com/themes/expanse/styles/classic",
            type: "Paid",
          },

          streamline: {
            name: "Streamline",
            url: "https://streamline-theme-core.myshopify.com",
            download:
              "https://themes.shopify.com/themes/streamline/styles/core",
            type: "Paid",
          },

          warehouse: {
            name: "Warehouse",
            url: "https://warehouse-theme-metal.myshopify.com/",
            download:
              "https://themes.shopify.com/themes/warehouse/styles/metal",
            type: "Paid",
          },

          context: {
            name: "Context",
            url: "https://context-theme-chic.myshopify.com/",
            download: "https://themes.shopify.com/themes/context/styles/modern",
            type: "Paid",
          },

          broadcast: {
            name: "Broadcast",
            url: "https://broadcast-clean.myshopify.com/",
            download:
              "https://themes.shopify.com/themes/broadcast/styles/clean",
            type: "Paid",
          },

          avenue: {
            name: "Avenue",
            url: "https://clothing-filter-theme.myshopify.com",
            type: "Paid",
            download: "https://themes.shopify.com/themes/avenue/styles/casual",
          },

          story: {
            name: "Story",
            url: "https://story-theme.myshopify.com/",
            type: "Paid",
            download:
              "https://themes.shopify.com/themes/story/styles/chronicle",
          },

          boost: {
            name: "Boost",
            url: "https://spark-theme.myshopify.com",
            type: "Paid",
            download: "https://themes.shopify.com/themes/boost/styles/spark",
          },

          cascade: {
            name: "Cascade",
            url: "https://cascade-theme-classic.myshopify.com/",
            type: "Paid",
            download:
              "https://themes.shopify.com/themes/cascade/styles/classic",
          },

          impulse: {
            name: "Impulse",
            download: "https://themes.shopify.com/themes/impulse/styles/modern",
            type: "Paid",
            url: "https://impulse-theme-fashion.myshopify.com/",
          },

          artisan: {
            name: "Artisan",
            download:
              "https://themes.shopify.com/themes/artisan/styles/victoria?",
            type: "Paid",
            url: "https://artisan-theme-victoria.myshopify.com",
          },

          prestige: {
            name: "Prestige",
            download:
              "https://themes.shopify.com/themes/prestige/styles/allure",
            type: "Paid",
            url: "https://prestige-theme-allure.myshopify.com/",
          },

          reach: {
            name: "Reach",
            download: "https://themes.shopify.com/themes/reach/styles/natural",
            type: "Paid",
            url: "https://reach-theme-natural.myshopify.com/",
          },

          galleria: {
            name: "Galleria",
            download:
              "https://themes.shopify.com/themes/galleria/styles/empire",
            type: "Paid",
            url: "https://mht-dev.myshopify.com/",
          },

          modular: {
            name: "Modular",
            download:
              "https://themes.shopify.com/themes/modular/styles/chelsea",
            type: "Paid",
            url: "https://chelsea-theme.myshopify.com/",
          },

          motion: {
            name: "Motion",
            download: "https://themes.shopify.com/themes/motion/styles/classic",
            type: "Paid",
            url: "https://motion-theme-adventure.myshopify.com/",
          },

          loft: {
            name: "Loft",
            download: "https://themes.shopify.com/themes/loft/styles/nashville",
            type: "Paid",
            url: "https://loft-theme-demo-nashville.myshopify.com/",
          },

          split: {
            name: "Split",
            download: "https://themes.shopify.com/themes/split/styles/cuber",
            type: "Paid",
            url: "https://cuber-theme.myshopify.com/",
          },

          empire: {
            name: "Empire",
            download: "https://themes.shopify.com/themes/empire/styles/supply",
            type: "Paid",
            url: "https://empire-theme-supply.myshopify.com/",
          },

          venue: {
            name: "Venue",
            download: "https://themes.shopify.com/themes/venue/styles/morning",
            type: "Paid",
            url: "https://venue-theme-morning.myshopify.com/",
          },

          emerge: {
            name: "Emerge",
            download: "https://themes.shopify.com/themes/emerge/styles/bright",
            type: "Paid",
            url: "https://local-theme-bright.myshopify.com/",
          },

          editorial: {
            name: "Editorial",
            download:
              "https://themes.shopify.com/themes/editorial/styles/agency",
            type: "Paid",
            url: "https://editorial-theme-agency.myshopify.com/",
          },

          handy: {
            name: "Handy",
            download: "https://themes.shopify.com/themes/handy/styles/light",
            type: "Paid",
            url: "https://handy-theme-light.myshopify.com/",
          },

          trademark: {
            name: "Trademark",
            download: "https://themes.shopify.com/themes/trademark/styles/gold",
            type: "Paid",
            url: "https://trademark-gold.myshopify.com/",
          },

          capital: {
            name: "Capital",
            download: "https://themes.shopify.com/themes/capital/styles/berlin",
            type: "Paid",
            url: "https://capital-theme-berlin.myshopify.com/",
          },

          vogue: {
            name: "Vogue",
            download:
              "https://themes.shopify.com/themes/vogue/styles/elegant?price%5B%5D=Paid&surface_inter_position",
            type: "Paid",
            url: "https://vogue-theme-elegant.myshopify.com/",
          },

          flow: {
            name: "Flow",
            download:
              "https://themes.shopify.com/themes/flow/styles/queenstown",
            type: "Paid",
            url: "https://flow-queenstown.myshopify.com/",
          },

          lorenza: {
            name: "Lorenza",
            download: "https://themes.shopify.com/themes/lorenza/styles/chic",
            type: "Paid",
            url: "https://lorenza-theme-chic.myshopify.com/",
          },

          launch: {
            name: "Launch",
            download: "https://themes.shopify.com/themes/launch/styles/cool",
            type: "Paid",
            url: "https://launch-theme-cool.myshopify.com/",
          },

          ira: {
            name: "Ira",
            download: "https://themes.shopify.com/themes/ira/styles/active",
            type: "Paid",
            url: "https://ira-theme-active.myshopify.com/",
          },

          palo_alto: {
            name: "Palo Alto",
            download:
              "https://themes.shopify.com/themes/palo-alto/styles/palo-alto",
            type: "Paid",
            url: "https://palo-alto-theme.myshopify.com/",
          },

          maker: {
            name: "Maker",
            download: "https://themes.shopify.com/themes/maker/styles/bloom",
            type: "Paid",
            url: "https://maker-theme-bloom.myshopify.com/",
          },

          label: {
            name: "Label",
            download: "https://themes.shopify.com/themes/label/styles/record",
            type: "Paid",
            url: "https://label-theme-record.myshopify.com/",
          },

          pipeline: {
            name: "Pipeline",
            download: "https://themes.shopify.com/themes/pipeline/styles/light",
            type: "Paid",
            url: "https://pipeline-light.myshopify.com/",
          },

          colors: {
            name: "Colors",
            download: "https://themes.shopify.com/themes/colors/styles/generic",
            type: "Paid",
            url: "https://colors-theme-generic.myshopify.com/",
          },

          kagami: {
            name: "Kagami",
            download: "https://themes.shopify.com/themes/kagami/styles/kyoto",
            type: "Paid",
            url: "https://kagami-tokyo.myshopify.com/",
          },

          district: {
            name: "District",
            download:
              "https://themes.shopify.com/themes/district/styles/district",
            type: "Paid",
            url: "https://district-theme-demo.myshopify.com/",
          },

          canopy: {
            name: "Canopy",
            download: "https://themes.shopify.com/themes/canopy/styles/kiln",
            type: "Paid",
            url: "https://kiln-theme.myshopify.com/",
          },

          kingdom: {
            name: "Kingdom",
            download: "https://themes.shopify.com/themes/kingdom/styles/king",
            type: "Paid",
            url: "https://king-theme-v2.myshopify.com/",
          },

          grid: {
            name: "Grid",
            download: "https://themes.shopify.com/themes/grid/styles/bright",
            type: "Paid",
            url: "https://grid-theme-bright.myshopify.com/",
          },

          showtime: {
            name: "ShowTime",
            download:
              "https://themes.shopify.com/themes/showtime/styles/cooktime",
            type: "Paid",
            url: "https://cooktime.myshopify.com/",
          },

          focal: {
            name: "Focal",
            download: "https://themes.shopify.com/themes/focal/styles/standard",
            type: "Paid",
            url: "https://focal-standard.myshopify.com/",
          },

          pacific: {
            name: "Pacific",
            download: "https://themes.shopify.com/themes/pacific/styles/bold",
            type: "Paid",
            url: "https://pacific-theme-bold.myshopify.com/",
          },

          california: {
            name: "California",
            download:
              "https://themes.shopify.com/themes/california/styles/california",
            type: "Paid",
            url: "https://california-theme-generic.myshopify.com/",
          },

          icon: {
            name: "Icon",
            download: "https://themes.shopify.com/themes/icon/styles/dolce",
            type: "Paid",
            url: "https://icon-shopify-theme.myshopify.com/",
          },

          parallax: {
            name: "Parallax",
            download: "https://themes.shopify.com/themes/parallax/styles/aspen",
            type: "Paid",
            url: "https://parallax-theme-aspen.myshopify.com/",
          },

          showcase: {
            name: "Showcase",
            download: "https://themes.shopify.com/themes/showcase/styles/betty",
            type: "Paid",
            url: "https://betty-theme.myshopify.com/",
          },

          alchemy: {
            name: "Alchemy",
            download:
              "https://themes.shopify.com/themes/alchemy/styles/swimclub",
            type: "Paid",
            url: "https://swimclub-theme.myshopify.com/",
          },

          startup: {
            name: "Startup",
            download: "https://themes.shopify.com/themes/startup/styles/home",
            type: "Paid",
            url: "https://startup-theme-home.myshopify.com/",
          },

          testament: {
            name: "Testament",
            download:
              "https://themes.shopify.com/themes/testament/styles/genesis",
            type: "Paid",
            url: "https://testament.myshopify.com/",
          },

          blockshop: {
            name: "Blockshop",
            download:
              "https://themes.shopify.com/themes/blockshop/styles/beauty",
            type: "Paid",
            url: "https://blockshop-theme-beauty.myshopify.com/",
          },

          retina: {
            name: "Retina",
            download: "https://themes.shopify.com/themes/retina/styles/austin",
            type: "Paid",
            url: "https://retina-theme.myshopify.com/",
          },

          mrparker: {
            name: "Mr Parker",
            download:
              "https://themes.shopify.com/themes/mr-parker/styles/wardrobe",
            type: "Paid",
            url: "https://mr-parker.myshopify.com/",
          },

          providence: {
            name: "Providence",
            download:
              "https://themes.shopify.com/themes/providence/styles/thunderbolt",
            type: "Paid",
            url: "https://thunderbolt-providence.myshopify.com/",
          },

          symmetry: {
            name: "Symmetry",
            download:
              "https://themes.shopify.com/themes/symmetry/styles/salt-yard",
            type: "Paid",
            url: "https://salt-yard.myshopify.com/",
          },

          atlantic: {
            name: "Atlantic",
            download:
              "https://themes.shopify.com/themes/atlantic/styles/organic",
            type: "Paid",
            url: "https://atlantic-theme-organic.myshopify.com/",
          },

          vantage: {
            name: "Vantage",
            download: "https://themes.shopify.com/themes/vantage/styles/clean",
            type: "Paid",
            url: "https://wisozk-stroman-and-homenick8737.myshopify.com/",
          },

          mobilia: {
            name: "Mobilia",
            download: "https://themes.shopify.com/themes/mobilia/styles/milan",
            type: "Paid",
            url: "https://mobilia-theme-milan.myshopify.com/",
          },

          dawn: {
            name: "Dawn",
            download: "https://themes.shopify.com/themes/dawn/styles/default",
            type: "Free",
            url: "https://dawn-theme-default.myshopify.com/",
          },
        };

        function detectTheme() {
          let theme = { name: "unknown" };

          const getThemeName = () =>
            window.BOOMR && window.BOOMR.themeName.trim().toLowerCase();

          const isDebut = (() => {
            let $navbar = document.querySelector(
              `.site-header [class='site-header__icons-wrapper'] [class*='site-header__cart'] > svg`,
            );

            if ($navbar) {
              return (theme = themes.debut);
            }
          })();

          const isNarrative = (() => {
            let $navbar = document.querySelector(
              `nav.site-header__section > [class*='navigation'] + .navigation,
              .site-header[data-section-id] .site-header__section > [class*='navigation'] > span[class*='burger'] + span[class*='burger'] + span[class*='burger']`,
            );

            if ($navbar) {
              return (theme = themes.narrative);
            }
          })();

          const isExpress = (() => {
            let $navbar = document.querySelector(
              `button > .header__cart-indicator > svg > path[d]`,
            );

            if ($navbar) {
              return (theme = themes.express);
            }
          })();

          const isVenture = (() => {
            let $navbar = document.querySelector(
              `header[class] div + div > #SiteNavSearchCart`,
            );
            if ($navbar) {
              return (theme = themes.venture);
            }
          })();

          const isBoundless = (() => {
            let $navbar = document.querySelector(
              `.site-header-container > [id*='header'] > style + header > .grid > .grid__item + .grid__item [aria-controls="CartDrawer"] > .icon-cart`,
            );

            if ($navbar) {
              return (theme = themes.boundless);
            }
          })();

          const isSimple = (() => {
            let $navbar = document.querySelector(
              `[id*='section-header'] .top-bar > div + .grid__item svg[viewBox*='20 20']`,
            );

            if ($navbar) {
              return (theme = themes.simple);
            }
          })();

          const isBrooklyn = (() => {
            let $navbar = document.querySelector(
              `.site-header .medium-down--hide .site-nav .site-nav__item [class*='fallback'] span`,
            );

            if ($navbar) {
              return (theme = themes.brooklyn);
            }
          })();

          const isSupply = (() => {
            let $navbar = document.querySelector(
              `header.site-header  + .header-cart-btn [class*='icon-cart'],
              html[class] body[class] header.site-header[role] form[action*='search'] ~ ul,
              body[id] header.site-header  + #mobileNavBar + .nav-bar[role] .site-nav,
              body[id] header.site-header form > input:nth-child(2) + button >span:nth-child(2)`,
            );

            if ($navbar) {
              return (theme = themes.supply);
            }
          })();

          const isMinimal = (() => {
            let $navbar = document.querySelector(
              `#shopify-section-header style + div .header-bar + .site-header [class*='display-table'],
              #shopify-section-header style + div .header-bar > * > * >  [class^='header-bar__'],
              .header-bar .header-bar__right > .header-bar__module span + a[class*='cart-page'] > span`,
            );

            if ($navbar) {
              return (theme = themes.minimal);
            }
          })();

          const isHighlight = (() => {
            let $navbar = document.querySelector(
              `header.header-holder .menu-meta [class*='menu-meta'] svg`,
            );

            if ($navbar) {
              return (theme = themes.isHighlight);
            }
          })();

          const isExpanse = (() => {
            let $navbar = document.querySelector(
              `#SiteHeader[data-overlay] .header-layout [id*='Header']`,
            );

            if ($navbar) {
              return (theme = themes.expanse);
            }
          })();

          const isStreamline = (() => {
            let $body = document.querySelector(
              `body[data-type_header_capitalize][data-animate_images][data-transitions] [class*='thumb-menu']`,
            );

            if ($body) {
              return (theme = themes.streamline);
            }
          })();

          const isWarehouse = (() => {
            let $element = document.querySelector(
              `body[class^='warehouse'] header[class*='--']`,
            );

            if ($element) {
              return (theme = themes.warehouse);
            }
          })();

          const isContext = (() => {
            let $navbar = document.querySelector(
              `section[data-navigation] svg + [class*='indicator']`,
            );

            if ($navbar) {
              return (theme = themes.context);
            }
          })();

          const isBroadcast = (() => {
            let $header = document.querySelector(
              `.header__mobile .header__mobile__button:nth-child(2) svg[viewBox*='8']`,
            );

            if ($header) {
              return (theme = themes.broadcast);
            }
          })();

          const isAvenue = (() => {
            let $element = document.querySelector(
              `#header-navigation .table .main-menu nav [role*='menubar'][aria-label]`,
            );

            if ($element) {
              return (theme = themes.avenue);
            }
          })();

          const isStory = (() => {
            let $element = document.querySelector(
              `[data-aos-easing] .header--touch > .header svg.icon[viewBox*='20 ']`,
            );

            if ($element) {
              return (theme = themes.story);
            }
          })();

          const isBoost = (() => {
            let $element = document.querySelector(
              `.docking-header[role] .docked-navigation-container > [class*='docked-navigation-container'] [class*='header'], 
                  .page-header .store-logo + [class*='utils'] [class*='utils']`,
            );

            if ($element) {
              return (theme = themes.boost);
            }
          })();

          const isCascade = (() => {
            let $element = document.querySelector(
              `#shopify-section-header header > .header__main .max-site-width.px2`,
            );

            if ($element) {
              return (theme = themes.cascade);
            }
          })();

          const isImpulse = (() => {
            let $element = document.querySelector(
              `body[data-aos-duration] .transition-body style + [data-section-id="header"]`,
            );

            if ($element) {
              return (theme = themes.impulse);
            }
          })();

          const isArtisan = (() => {
            let $element = document.querySelector(
              `.shopify-section.header-section .topBar > .topBar__container [class*='--mobile']`,
            );

            if ($element) {
              return (theme = themes.artisan);
            }
          })();

          const isPrestige = (() => {
            let $element = document.querySelector(
              `body[class^='prestige--'] [class*='PageSkip'],
                  body.template-index .PageSkipLink + .LoadingBar + .PageOverlay + .PageTransition`,
            );

            if ($element) {
              return (theme = themes.prestige);
            }
          })();

          const isReach = (() => {
            let $element = document.querySelector(
              `[class*='site-navigation-layout-'] .navmenu[class*='depth']`,
            );

            if ($element) {
              return (theme = themes.reach);
            }
          })();

          const isGalleria = (() => {
            let $element = document.querySelector(
              `.nav-container-inner > .nav-container-logo + .nav-container-controls[id*='nav']`,
            );

            if ($element) {
              return (theme = themes.galleria);
            }
          })();

          const isModular = (() => {
            let $element = document.querySelector(
              `body[class] .pageWrap [data-section-type="header"][class*='--'] [class*='nav-item']`,
            );

            if ($element) {
              return (theme = themes.modular);
            }
          })();

          const isMotion = (() => {
            let $element = document.querySelector(
              `body[data-transitions] #PageContainer [class*='header'][class*='--'] .header-item`,
            );

            if ($element) {
              return (theme = themes.motion);
            }
          })();

          const isSplit = (() => {
            let $element = document.querySelector(
              `#shopify-section-header [class*='desktop-view'] .count-holder > *`,
            );

            if ($element) {
              return (theme = themes.split);
            }
          })();

          const isEmpire = (() => {
            let $element = document.querySelector(
              `.site-header .site-header-cart--button [data-header-cart-count] + svg[focusable]`,
            );

            if ($element) {
              return (theme = themes.empire);
            }
          })();

          const isVenue = (() => {
            let $element = document.querySelector(
              `body[class*='theme-loaded'] style + .mobile-draw [class*='wrapper']`,
            );

            if ($element) {
              return (theme = themes.venue);
            }
          })();

          const isEmerge = (() => {
            let $element = document.querySelector(
              `body[data-theme-version] > [class*='off-canvas'] > [class*='off-canvas'] +  [class*='off-canvas']`,
            );

            if ($element) {
              return (theme = themes.emerge);
            }
          })();

          const isEditorial = (() => {
            let $element = document.querySelector(
              `body > svg[style] + #PageContainer [class*='header_'] #CartCount`,
            );

            if ($element) {
              return (theme = themes.editorial);
            }
          })();

          const isHandy = (() => {
            let $element = document.querySelector(
              `script + [class*='site-header'] [class^='site-actions'] svg + span[data-cart-item-count]`,
            );

            if ($element) {
              return (theme = themes.handy);
            }
          })();

          const isTrademark = (() => {
            let $element = document.querySelector(
              `body[class^='trademark--'] [class*='header__'] [class*='hidden-pocket']`,
            );

            if ($element) {
              return (theme = themes.trademark);
            }
          })();

          const isCapital = (() => {
            let $element = document.querySelector(
              `body[data-aos-duration][class*='focus'] .main-header script + .header-wrapper`,
            );

            if ($element) {
              return (theme = themes.capital);
            }
          })();

          const isVogue = (() => {
            let $element = document.querySelector(
              `body[class*='sidebar-always'] #shopify-section-header + .content-wrapper + script`,
            );

            if ($element) {
              return (theme = themes.vogue);
            }
          })();

          const isFlow = (() => {
            let $element = document.querySelector(
              `body[id][class] #DrawerOverlay + #PageContainer > #shopify-section-header #NavDrawer[class] + header`,
            );

            if ($element) {
              return (theme = themes.flow);
            }
          })();

          const isLorenza = (() => {
            let $element = document.querySelector(
              `html[style*='--header'] body[class] [class*='quick-cart__'] [class*='quick-cart__'],
              
              body > header > #shopify-section-header > script + [data-navigation*='{'],
              html[class][style] > body[id] > #shopify-section-header + #mainWrap
              `,
            );

            if ($element) {
              return (theme = themes.lorenza);
            }
          })();

          const isLaunch = (() => {
            let $element = document.querySelector(
              `body[class][style] .header-actions-list a[tabindex="0"] > .header-cart-count,
                  body[class][style] #PageContainer[class] header[class] .wrapper a[href*='cart'][tabindex]`,
            );

            if ($element) {
              return (theme = themes.launch);
            }
          })();

          const isIra = (() => {
            let $element = document.querySelector(
              `html[style*='height-header'] .page header[style]  [class*='ff'] [class*='header__']`,
            );

            if ($element) {
              return (theme = themes.ira);
            }
          })();

          const isPaloAlto = (() => {
            let $element = document.querySelector(
              `body[class][id] [class*='site-header--'][data-nav-position] .space-maker`,
            );

            if ($element) {
              return (theme = themes.palo_alto);
            }
          })();

          const isMaker = (() => {
            let $element = document.querySelector(
              `body[data-theme-version][data-theme-name] a[class*='header--cart'] > [class*='cart--']`,
            );

            if ($element) {
              return (theme = themes.maker);
            }
          })();

          const isLabel = (() => {
            let $element = document.querySelector(
              `html[class][style] > body[id][class] .headerInnerWrap .cart-user-box #CartCount + svg`,
            );

            if ($element) {
              return (theme = themes.label);
            }
          })();

          const isPipeline = (() => {
            let $element = document.querySelector(
              `body[id][class] .header__wrapper[data-header-sticky] .mobile-wrapper .header-logo a,
                  body[id][class] #shopify-section-header > div + script[type="application/ld+json"] + script[type="application/ld+json"],
                  body[id][class] [id*='footer'] + script#JsQty + script#JsQty--cart`,
            );

            if ($element) {
              return (theme = themes.pipeline);
            }
          })();

          const isColors = (() => {
            let $element = document.querySelector(
              `body[id][class]  .header > .bar > .left + .right + .center`,
            );

            if ($element) {
              return (theme = themes.colors);
            }
          })();

          const isKagami = (() => {
            let $element = document.querySelector(
              `body[class^='kagami--'] > svg[style]`,
            );

            if ($element) {
              return (theme = themes.kagami);
            }
          })();

          const isDistrict = (() => {
            let $element = document.querySelector(
              `#page #shopify-section-header .site-header-wrapper .site-header[data-scroll-lock] > .wrapper .logo-contain + .nav-bar `,
            );

            if ($element) {
              return (theme = themes.district);
            }
          })();

          const isCanopy = (() => {
            let $element = document.querySelector(
              `#page-wrap-inner[style] #page-wrap-content .container .page-header [id*='toolbar'] > [class*='toolbar']`,
            );

            if ($element) {
              return (theme = themes.canopy);
            }
          })();

          const isKingdom = (() => {
            let $element = document.querySelector(
              `#shopify-section-sidebar > .sidebar[style] .sidebar__container [class*='sidebar'][style] .logo`,
            );

            if ($element) {
              return (theme = themes.kingdom);
            }
          })();

          const isGrid = (() => {
            let $element = document.querySelector(
              `#shopify-section-header > script[data-section-type='static-header'] + .header [class*='branding'] > [class*='logo']`,
            );

            if ($element) {
              return (theme = themes.grid);
            }
          })();

          const isShowtime = (() => {
            let $element = document.querySelector(
              `.overlapblackbg + #shopify-section-header [class*='header_'] [class*='navbar-'] a[data-href]`,
            );

            if ($element) {
              return (theme = themes.showtime);
            }
          })();

          const isFocal = (() => {
            let $element = document.querySelector(
              `body[class*='focal--'] > svg[style]`,
            );

            if ($element) {
              return (theme = themes.focal);
            }
          })();

          const isPacific = (() => {
            let $element = document.querySelector(
              `.main-header-wrapper > .main-header[role] .branding + .header-tools span[class*='bag'],
                  .main-header-wrapper > .main-header[role] .branding[data-header-branding]  .site-title-logo`,
            );

            if ($element) {
              return (theme = themes.pacific);
            }
          })();

          const isCalifornia = (() => {
            let $element = document.querySelector(
              `.hero[class*='height'][data-section-id] [class*='header'] > .icon[data-action]`,
            );

            if ($element) {
              return (theme = themes.california);
            }
          })();

          const isIcon = (() => {
            let $element = document.querySelector(
              `#shopify-section-header > header[class][data-sticky] > .topbar + div .nav-container[class*='desktop'],
                  .gridlock[class*='shifter'] aside + .site-wrap #navigation [class*='auto'],
                  .gridlock[class*='shifter'] [class*='shifter'] [class*='gridlock-'] [class*='desktop']`,
            );

            if ($element) {
              return (theme = themes.icon);
            }
          })();

          const isParallax = (() => {
            let $element = document.querySelector(
              `body[data-money-format] [class^='mm'] [id^='mm'] [class^='mm'] [class^='mm'] [class*='mm-listitem']`,
            );

            if ($element) {
              return (theme = themes.parallax);
            }
          })();

          const isShowcase = (() => {
            let $element = document.querySelector(
              `body[style*='padding'] [class*='site-control'] + [class*='nav-'] [data-cc-animate-click]`,
            );

            if ($element) {
              return (theme = themes.showcase);
            }
          })();

          const isAlchemy = (() => {
            let $element = document.querySelector(
              `body[id][class] #pageheader.pageheader [class*='pageheader__'] .logo[class*='logo--']`,
            );

            if ($element) {
              return (theme = themes.alchemy);
            }
          })();

          const isStartup = (() => {
            let $element = document.querySelector(
              `.main-header-wrapper > header.main-header .branding noscript[data-rimg-noscript],
                  .main-header-wrapper > header.main-header .branding a > img[class*='logo-']`,
            );

            if ($element) {
              return (theme = themes.startup);
            }
          })();

          const isTestament = (() => {
            let $element = document.querySelector(
              `html[class*='supports-'] body.gridlock #panel header + .header-wrapper + style,
                  body.gridlock .site-wrap header + .header-wrapper[class*='js-'] + style`,
            );

            if ($element) {
              return (theme = themes.testament);
            }
          })();

          const isBlockshop = (() => {
            let $element = document.querySelector(
              `body[data-theme-name="Blockshop"][data-theme-version],
                  body[data-theme-name="blockshop"][data-theme-version],
                  html.js.localstorage[style] [class*='header--'] [class*='header--'] [role] [class*='logo']`,
            );

            if ($element) {
              return (theme = themes.blockshop);
            }
          })();

          const isRetina = (() => {
            let $element = document.querySelector(
              `body.index.feature_image #content_wrapper #header > [href="#nav"] + [href="#cart"],
                body.index.feature_image #header[class*='mm'] > [href="#nav"] + [href="#cart"],
                body[style*='--utility'] .site-header .site-header__wrapper nav + .header-controls`,
            );

            if ($element) {
              return (theme = themes.retina);
            }
          })();

          const isMrparker = (() => {
            let $element = document.querySelector(
              `body[data-aos-duration] [class*='header__mobile__cart'] .cart-links__wrapper .cart-links__item,
                  body[data-aos-duration] #mobile-logo + #cart[class*='tablet-'] .cart-name,
                  body[class] #CartDrawer + [class*='shifter'] > * .header-section [class^='header'] `,
            );

            if ($element) {
              return (theme = themes.mrparker);
            }
          })();

          const isProvidence = (() => {
            let $element = document.querySelector(
              `html.svgclippaths [class*='small-'] .table #branding-wrap #brand-primary-image,
                  html.svgclippaths.indexeddb.webworkers .shop-identity-tagline .tagline,
                  html.svgclippaths.indexeddb.webworkers #app-header .table .cell .brand [class*='hidden']`,
            );

            if ($element) {
              return (theme = themes.providence);
            }
          })();

          const isSymmetry = (() => {
            let $element = document.querySelector(
              `#pageheader.pageheader[class*='--'] [class*='logo-area'] + [class*='logo-area'] .logo [itemprop="logo"],
                  #pageheader .logo-area .header-disclosures + .cart-summary .cart-count__text`,
            );

            if ($element) {
              return (theme = themes.symmetry);
            }
          })();

          const isAtlantic = (() => {
            let $element = document.querySelector(
              `[class*='header-'] > section .action-links.clearfix [class*='main-header--'] + [class*='store-'],
                  body[class] .main-header > [class*='header-'] nav[class*='main-header--'] .first`,
            );

            if ($element) {
              return (theme = themes.atlantic);
            }
          })();

          const isVantage = (() => {
            let $element = document.querySelector(
              `  html.supports-fontface #cart[class*='header__'] svg[width][height],
                  html.supports-fontface #cart .mini-cart-trigger + #mini-cart #ajaxifyMini > *`,
            );

            if ($element) {
              return (theme = themes.vantage);
            }
          })();

          const isDawn = (() => {
            let $element = document.querySelector(
              `header-drawer details summary[class*='header'] svg`,
            );

            if ($element) {
              return (theme = themes.dawn);
            }
          })();

          const isFashionopolism = (() => {
            let $element = document.querySelector(
              `body > aside[id] + div[class]>div[class]>.content-wrapper`,
            );

            if ($element) {
              return (theme = themes.fashionopolism);
            }
          })();

          const isTurbo = (() => {
            let $element = document.querySelector(
              `body[data-money-format][data-shop-url] #header details[data-mobile-menu] > summary,
              body[data-money-format][data-shop-url] #header .top_bar ul,
              body[data-money-format][data-shop-url] #header .top-bar ul,
              body div[class] + #header + * .header .top_bar ul,
              body[data-money-format] #header .top_bar a[id] ~ * ul,
              body[data-money-format] #header .top_bar span + span + span,
              [class] > [class] > .top_bar > .social_icons ~ div + ul`,
            );

            if ($element) {
              return (theme = themes.turbo);
            }
          })();

          const isSuperstore = (() => {
            let $element = document.querySelector(
              `body[data-instant-allow-query-string] .skip-to-main ~ [data-modal-container]`,
            );

            if ($element) {
              return (theme = themes.superstore);
            }
          })();

          return theme;
        }

        resolve(detectTheme());
      });
    });

    resolve(returned);
  });
}

module.exports = {
  getTheme: getTheme,
};
