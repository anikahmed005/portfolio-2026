import { color } from '../tokens/tokens';
import BudgetBuddiIA from '../components/BudgetBuddiIA/BudgetBuddiIA';

export const WORK = [
  {
    id:       1,
    title:    'BudgetBuddi',
    category: 'Mobile App & Product Design',
    year:     '2025–present',
    href:     '/work/budget-buddi',
    slug:     'budget-buddi',
    bg:       '#0d0520',
    accent:   color.accents.green,
    tags:     ['Mobile App', 'React Native', 'Fintech'],
    tools: [
      { key: 'claude', name: 'Claude' },
      { key: 'figma',  name: 'Figma' },
      { key: 'react',  name: 'React Native' },
    ],
    banner: { image: '/BudgetBuddi/screens/hero-image.png' },
    tldr:          'BudgetBuddi is a budgeting AI assisted platform that was built and shipped by me.',
    cta:           { label: 'Visit BudgetBuddi', href: 'https://budgetbuddi.app/' },
    googlePlayHref: 'https://play.google.com/store/apps/details?id=com.anikahmed005.DoughNote',
    sections: [
      {
        headerImage: '/BudgetBuddi/screens/hero-image.png',
        heading: 'Problem',
        paragraphs: [
          'Most budgeting apps ask you to subscribe to their process. They arrive with a methodology already baked in — you\'re budgeting the YNAB way or the Monarch way, and as you go deeper, the complexity stacks up. Category rules, scheduled transactions, reports you have to configure yourself.',
          'By the time you understand the system, you\'ve already paid for a year of it. That pay-upfront model creates a predictable churn cycle: people sign up in a moment of financial motivation, bounce when the learning curve hits, and move on to the next app.',
          {
            segments: [
              { text: 'The question I kept coming back to was: ' },
              { text: 'how might I reduce that complexity while still giving users the flexibility to budget the way they actually think — and remove the pressure of paying before they know if it even works for them?', highlight: true },
            ],
          },
        ],
      },
      // {
      //   type: 'expandableProcess',
      //   label: 'Read the full process',
      //   sections: [
      //     {
      //       heading: 'Discovery',
      //       paragraphs: [
      //         {
      //           segments: [
      //             { text: 'The research started where most honest feedback lives — the one and three-star reviews of YNAB, Monarch, and Copilot. The signal wasn\'t "this app is bad." It was "I couldn\'t figure out how to make this work for my situation." People weren\'t rejecting budgeting. ' },
      //             { text: 'They were rejecting being told how to budget.', highlight: true },
      //           ],
      //         },
      //         'Two other patterns kept surfacing. First, people log their finances in natural language — "I pay about $80 for electric" — not structured forms. Forcing a category picker on every entry was a consistent friction point across every app I audited. Second, the budgeting tools that survived in people\'s routines were largely passive — they showed you what you spent without demanding active maintenance. Apps that required daily input bled users.',
      //       ],
      //       imageRow: [
      //         '/BudgetBuddi/feedback/YNAB-1.png',
      //         '/BudgetBuddi/feedback/monarch-1.png',
      //         '/BudgetBuddi/feedback/YNAB-3.png',
      //         '/BudgetBuddi/feedback/YNAB-2.png',
      //       ],
      //     },
      //     {
      //       heading: 'Define',
      //       paragraphs: [
      //         'Defining the goals of the project was tough, but through viewing recent reviews for other budgeting apps, and listening to user testimonials,I was able to figure out 3 goals of the project.',
      //       ],
      //       columns: [
      //         {
      //           icon: 'speedometer',
      //           tag: 'User Goal',
      //           heading: 'Log anything in 10 seconds',
      //           body: 'Add a bill, transaction, or income source without categorising or configuring anything upfront.',
      //         },
      //         {
      //           icon: 'eye-outline',
      //           tag: 'User Goal',
      //           heading: 'Understand without building',
      //           body: 'See your financial picture clearly. The app does the interpretation — not just the storage.',
      //         },
      //         {
      //           icon: 'lock-open-outline',
      //           tag: 'Product Goal',
      //           heading: 'Value before the paywall',
      //           body: 'The core loop — logging, tracking, spending overview — is free. AI features and deeper analytics unlock after users know it works for them.',
      //         },
      //       ],
      //     },
      //     {
      //       heading: 'Key Design Decisions',
      //       decisions: [
      //         {
      //           paragraphs: [
      //             'The CommandBar grew out of the friction audit. Rather than entry points scattered across navigation, a persistent floating bar sits above the tab navigator on every screen.',
      //             { segments: [{ text: 'It combines three modes in one surface: a natural language field where Claude Haiku parses voice commands, into a structured bill and presents a one-tap confirmation card, a voice input that runs through the same pipeline, and shortcut pills for users who prefer structured forms.', highlight: true }] },
      //             'The state machine is simple — idle, focused, loading, confirming — and the fastest path to a logged item is two taps.',
      //           ],
      //           imagePlaceholder: 'CommandBar — NL entry → confirmation card',
      //         },
      //         {
      //           paragraphs: [
      //             'Foresight came from a different insight: personalised advice lands differently than generic advice. A "try the 50/30/20 rule" tip does nothing.',
      //             { segments: [{ text: 'Instead, Foresight runs a chat-style setup wizard collecting income, methodology preference, timeline, and financial priorities,', highlight: true }] },
      //             { segments: [
      //               { text: 'afterwards Foresight calls Claude.ai to ' },
      //               { text: 'generate an actual plan based on 3 different budgeting methodologies,', highlight: true },
      //               { text: ' with dollar allocations and a written rationale for why those numbers make sense for your situation.' },
      //             ]},
      //           ],
      //           imagePlaceholder: 'Foresight wizard — methodology selection screen',
      //           reverse: true,
      //         },
      //         // {
      //         //   body: 'Onboarding branches at a single question: how do you want to connect your finances? The manual path is income → first bill → done. The Plaid path connects your bank, analyzes your last 90 days of transactions, surfaces detected recurring bills for review, and exits with a mostly-populated app. Both paths reach the same place — one just requires more trust upfront.',
      //         //   imagePlaceholder: 'Onboarding flow — manual vs. Plaid connection paths',
      //         // },
      //       ],
      //     },
      //     {
      //       heading: 'Deppreciated Features',
      //       imagePlaceholder: 'BudgetChat — removed feature screenshot',
      //       imagePlaceholderTop: true,
      //       paragraphs: [
      //         'BudgetChat was a CommandBar shortcut where users could ask free-form questions about their spending and receive a structured AI response with a confidence rating and source citations. After some initial testing, it was decided that the feature was not providing enough value to the users and was removed.',
      //       ],
      //     },
      //     {
      //       heading: 'Security',
      //       paragraphs: [
      //         'Because this is a financial app, a full OWASP Top 10 audit ran before any external testing. Two critical findings were fixed: a missing ownership check on Plaid\'s transaction sync endpoint — any valid session token could trigger a sync for another user\'s bank account — and financial entity names leaking into device logs through console.log calls, visible via adb logcat on any connected Android device.',
      //         'Eight further high and medium findings were resolved, including a 30-minute inactivity sign-out, request body validation across every edge function, abort timeouts on all AI calls, and a guard preventing Plaid access tokens from being stored if the exchange request failed. All sensitive tokens — Anthropic API key, Plaid client secret, access tokens — are server-side only and never reach the client bundle.',
      //       ],
      //     },
      //   ],
      // },
      {
        heading: 'Features',
        featureCards: [
          {
            icon: 'wallet',
            title: 'Choose your Budget Plan',
            body: 'Choose a budget plan based on your needs. Most budgeting apps only have 1 kind of plan but BudgetBuddi gives users a choose of 3 different plans; Zero-Based Budgeting, Envelope/Pay Yourself, & the classic 50/30/20 Split',
            video: '/BudgetBuddi/videos/foresight-zbb-vid.mp4',
            frame: '/BudgetBuddi/pixel-frame.png',
          },
          {
            icon: 'microphone',
            title: 'Voice Commands',
            body: 'Quickly log transactions hands-free. Just say what you spent and BudgetBuddi captures it without breaking your flow.',
            video: '/BudgetBuddi/videos/bb-voice-cmd.mp4',
            frame: '/BudgetBuddi/pixel-frame.png',
          },
          {
            icon: 'folder-open',
            title: 'Smart Folders',
            body: 'Group bills and recurring expenses into folders that map to how you actually think about money — not how a spreadsheet does.',
            video: '/BudgetBuddi/videos/folders-vid.mp4',
            frame: '/BudgetBuddi/pixel-frame.png',
          },
          {
            icon: 'chart-line-variant',
            title: 'AI Insights',
            body: 'Passive pattern analysis surfaces spending trends without getting in your way. Tips appear when relevant, not on demand.',
            video: '/BudgetBuddi/videos/insights-ft-vid.mp4',
            frame: '/BudgetBuddi/pixel-frame.png',
          },
        ],
      },
      {
        heading: 'Outcome',
        paragraphs: [
          'BudgetBuddi is currently in closed testing ahead of submissions to the Google Play Store and Apple App Store. Early testing with 17 users surfaced a clear pattern when it came to testing the app. Many stated that do find the apps design to be "professional" and "polished" but sometimes logging in bills/transactions was confusing or there was a bug. ',
          { segments: [{ text: 'All in all, all 17 testers were able to complete the tasks at hand with less than 5 critical errors, no crashing and no major usability issues were found.', highlight: true }] },
        ],
        image: '/BudgetBuddi/screens/organization-ft.png',
      },
    ],
  },
  {
    id:       2,
    title:    'AutoVision: Enterprise',
    category: 'Product & interaction design',
    year:     '2023',
    href:     '/work/autovision-e',
    slug:     'autovision-e',
    bg:       '#001525',
    accent:   color.accents.green,
    tags:     ['tablet', 'product', 'automotive'],
    tools: [
      { key: 'figma',  name: 'Figma' },
      { key: 'dovetail',  name: 'Dovetail' },
    ],
    banner:   { image: '/AutoVision-e/Hero-Image.png' },
    tldr:     'An Autotmotive B2B software for used car dealerships to enable sales to assist clients',
    sections: [
      {
        heading: 'Problem',
        paragraphs: [
          'Smaller used car dealerships often have issues of keeping track of their inventory, what vehicle is being serviced, and if there are any due dates that require their attention because of a lack of budget.',
          'As Product Designer and UX Researcher, I led design and testing for AutoVision Enterprise, a startup I co-founded to support small used car dealerships in managing their operations.',
        ],
        image: '/AutoVision-e/Hero-Image.png',
      },
      {
        heading: 'Challenges',
        paragraphs: [
          'Because this was an enterprise-based platform, I had to work hand in hand with the software developer & PM early, to determine my constraints, manage expectations, in order to meet our deadline.',
        ],
        image: '/AutoVision-e/Service-Scheduler.png',
      },
      {
        heading: 'Outcome',
        paragraphs: [
          'Usability testing showed a 100% task completion rate, with 50% of users succeeding despite at least one major error and 50% completing tasks with no errors, validating both the platforms potential and areas for refinement.',
        ],
        image: '/AutoVision-e/hero-vert-image.png',
      },
    ],
  },
  {
    id:       3,
    title:    'Taino World',
    category: 'Web Experience',
    year:     '2024–2025',
    href:     '/work/taino-world',
    slug:     'taino-world',
    bg:       '#051a05',
    accent:   color.accents.amber,
    cta:      { label: 'View live site', href: 'https://www.tainoconference.org/' },
    tags:     ['Freelance', 'UX Design', 'UX Writing', 'Web'],
    tools: [
      {key: 'photoshop', name: 'Photoshop'},
      { key: 'figma',  name: 'Figma' },
      { key: 'dovetail',  name: 'Dovetail' },
    ],
    banner:   { image: '/Taino-World/Landing-Page-Hero.jpg' },
    tldr:     'A educational conference web experience built to educate scholars & academics about an indigenous population.',
    sections: [
      {
        heading: 'Background',
        paragraphs: [
          'The Taino World website, an interactive platform designed to educate academics and scholars ahead of an annual conference. The client\'s goal was to immerse attendees in Taino culture, and our solution was a rich web experience that deepened cultural understanding while enhancing engagement.',
          'As a Lead UX Writer, I guided the creation of the Taino World website, an interactive platform designed to educate academics and scholars ahead of an annual conference. ',
        ],
        image: '/Taino-World/Landing-Page-Hero.jpg',
      },
      {
        heading: 'Challenges',
        paragraphs: [
          'For various workstreams, we had to review & consolidate the existing workflows to create a more seamless experience across the website. This was to reduce future technical debt & provide clearer outcomes.',
          'There was a lot of ambiguity at the beginning of this project, but as a lead, I had to facilitate cross-collaboration to gain stakeholder alignment & define the goals for each sprint.',
        ],
        image: '/Taino-World/3D Model Section.jpg',
      },
      {
        heading: 'Outcomes',
        paragraphs: [
          'The project concluded with a full handoff to the development team for build-out, with impact metrics to be defined.',
          'Creation of the Taino World website & increased engagement throughout the conferences lifespan.',
        ],
        image: '/Taino-World/taino-rhythms.jpg',
      },
    ],
  },
  {
    id:       4,
    title:    'AutoVision: Sales',
    category: 'UX research & interface design',
    year:     '2022-2023',
    href:     '/work/autovision-s',
    slug:     'autovision-s',
    bg:       '#1a1200',
    accent:   color.accents.green,
    tags:     ['Mobile', 'UX research', 'UI Design'],
    tools: [
      { key: 'figma',  name: 'Figma' },
      { key: 'dovetail',  name: 'Dovetail' },
    ],
    banner:   { image: '/AutoVision-s/group-shot-1.png' },
    tldr:     'As Product Designer and UX Researcher, I worked on AutoVision Mobile, a startup concept aimed at helping used car salespeople manage inventory more efficiently.',
    sections: [
      {
        heading: 'Problem',
        paragraphs: [
          'Car Salespeople have a hard time answering customer questions on the go and have to go to the front to access the database, I wanted to alleviate that burden with the mobile version of Autovision.',
        ],
        image: '/AutoVision-s/group-shot-1.png'
      },
      {
        heading: 'Challenges',
        paragraphs: [
          'Because of the nature of the project, we had to learn quickly about the domain, figure out our business proposition, and determine the softwares feasibility, so learning to work in ambiguity was a big challenge.',
        ],
        image: '/AutoVision-s/comp-vehicles.png'
      },
      {
        paragraphs: [
          'The idea was to only focus on casual drivers but through talking with customers, we realized there was more potential to focus on car dealerships.',
        ],
        image: '/AutoVision-s/hero-image-car-dealership-linear-color.png'
      },
      {
        heading: 'Outcomes',
        image: '/AutoVision-s/insight.jpg',
        paragraphs: [
          'Usability testing showed a 75% task completion rate with only one major error identified. Our solution leveraged smart device cameras and computer vision to let users manually scan vehicles, storing the data in the AutoVision app\'s dashboard for streamlined access and management.',
          'The above chart details the results with 4 testers for this flow & its a been completed by 3/4 testers with only 1 user not being able to complete the task at hand as well as the error margin.'
        ],
      },
    ],
  },
  {
    id:       5,
    title:    'SCORM Portal',
    category: 'UI Design & design challenge',
    year:     '2024',
    href:     '/work/SCORM',
    slug:     'SCORM',
    bg:       '#1a0010',
    accent:   color.accents.pink,
    tags:     ['UI Design', 'Web', 'Challenge'],
    tools: [

      { key: 'figma',  name: 'Figma' },
      { key: 'dovetail',  name: 'Dovetail' },
    ],
    banner:   { image: '/SCORM/tab-switching.gif' },
    tldr:     'Building out a sales funnel as part of a design challenge',
    sections: [
      {
        heading: 'Context',
        paragraphs: [
          'The task was to redesign a dummy page and create a new user flow that met all original product requirements while also supporting the goal of onboarding new users. ',
          'The result was a streamlined, user-friendly design that balanced compliance with a smoother onboarding experience.',
        ],
        image: '/SCORM/tab-switching.gif'
      },
      {
        heading: 'Challenges',
        paragraphs: [
          'For this project, there were no specific goals aside from the general "redesign" this page, so with that in mind I came up with the following goals.',
          'How to deal with legal liability issues regarding TOS?',
          'How would I display multiple product offerings to our users easily?',
          'How could I give a more modern but usable UI refresh?',
        ],
        image: '/SCORM/feature-toggle.gif',
      },
      {
        heading: 'Outcomes',
        paragraphs: [
          'Through extensive research, I created better usability through the SCORM portal redesign, while also providing legal protection as well.',
        ],
        image: '/SCORM/TOS.gif',
      },
    ],
  },
  {
    id:       6,
    title:    'UI Explorations',
    category: 'Web design & art direction',
    year:     '2020-present',
    href:     '/work/UI-Explorations',
    slug:     'UI-Explorations',
    bg:       '#001518',
    accent:   color.accents.teal,
    tags:     ['Interaction Design', 'UI Design',],
    banner:   { image: '/UI- Explorations/dynamic-clipboard.gif' },
    tldr:     'Just some different UI explorations/past projects Ive worked on that did not have a individual page.',
    sections: [
      {
        heading: 'Dynamic Island Clipboard',
        paragraphs: [
          'When dynamic island first came out, I was really excited about the possibilties that can occur with this new feature, so I explored with different ways to use it. In this case its a clipboard island that pops up while a user begins texting.',
        ],
        image: '/UI- Explorations/dynamic-clipboard.gif'
      },
      {
        heading: 'Invisbly; Score Change',
        paragraphs: [
          'Invisbly came to me to redesign their product, below is just one of the few ways to modernize their UI while also adding some usability.',
        ],
        image: '/UI- Explorations/points-balance.gif',
      },
      {
        heading: 'Dynamic Island Uber Eats',
        paragraphs: [
          'When dynamic island first came out, I was really excited about the possibilties that can occur with this new feature, so I explored with different ways to use it. In this case its a island that pops up to help track a users most recent Uber Eats order, full on navigation at a glance.',
        ],
        image: '/UI- Explorations/DI-UE-Maps.gif'
      },
      {
        heading: 'Youtube: Floating Video Scrolls',
        paragraphs: [
          'Ive always wanted the minimize feature on android to come to the web, so I created a concept of how it would look. No more scrolling all the way up when Im viewing comments, the video just minimizes as I scroll down, without any input from the user.',
        ],
        image: '/UI- Explorations/youtube-floating-vid.gif'
      },
      {
        heading: 'Neuron Alerts',
        paragraphs: [
          'This was part of a design challenge that I had done. This UI was for constricting larger amounts of data to make it more platable for users. ',
        ],
        image: '/UI- Explorations/neuron-alerts-confirm.gif'
      },
      {
        heading: 'Threads: Press n Hold Profiles',
        paragraphs: [
          'Im a frequenter of Threads and I saw another designer talking about this concept regarding viewing a users profile by press and holding onto their tweet, so I thought Id explore that concept with this mockup.',
        ],
        image: '/UI- Explorations/threads-press-n-hold.gif'
      },
    ],
  },
  // {
  //   id:       7,
  //   title:    'Explorations',
  //   category: 'Misc. creative exercises',
  //   year:     '2020–present',
  //   href:     '/work/explorations',
  //   slug:     'explorations',
  //   bg:       '#180e00',
  //   accent:   color.accents.orange,
  //   tags:     ['personal', 'illustration', 'motion'],
  //   tldr:     'An ongoing archive of self-initiated work — type experiments, generative graphics, and short motion pieces made outside of client projects.',
  //   sections: [
  //     {
  //       heading: 'About this collection',
  //       paragraphs: [
  //         'These pieces exist outside the constraints of a brief. They\'re where new techniques get tested, aesthetic directions get stress-tested, and bad ideas get made quickly enough to be discarded.',
  //         'The collection is updated irregularly — whenever something feels finished enough to be worth keeping.',
  //       ],
  //       imagePlaceholder: 'Selection of recent explorations',
  //     },
  //   ],
  // },
];
