import { useState, useRef } from "react";

// ─── color tokens ────────────────────────────────────────────────
const C = {
  bg:        "#2a2a2a",
  surface:   "#222",
  border:    "#444",
  tabInactive:"#999",
  tabActive:  "#fff",
  tabAccent:  "#FACA47",

  // node types
  root:      { fill:"#3d3d3d", stroke:"#888",    text:"#e0e0e0" },
  auth:      { fill:"#0f3d2e", stroke:"#5DCAA5",  text:"#9FE1CB" },
  main:      { fill:"#1e1a40", stroke:"#8b83e8",  text:"#c8c4f8" },
  modal:     { fill:"#3d1a0f", stroke:"#e07050",  text:"#f5c4b3" },
  detail:    { fill:"#0e2640", stroke:"#5a9fd4",  text:"#b5d4f4" },
  ai:        { fill:"#152a0e", stroke:"#7fc464",  text:"#c0dd97" },
  save:      { fill:"#0f3d2e", stroke:"#5DCAA5",  text:"#9FE1CB" },
  system:    { fill:"#152a0e", stroke:"#7fc464",  text:"#c0dd97" },
  gate:      { fill:"#3a200f", stroke:"#e07050",  text:"#f5c4b3" },
  pro:       { fill:"#2a1e00", stroke:"#EF9F27",  text:"#FAC775" },
  external:  { fill:"#2a1e00", stroke:"#EF9F27",  text:"#FAC775" },
  neutral:   { fill:"#3d3d3d", stroke:"#888",     text:"#ddd"    },
};

// ─── tiny helpers ────────────────────────────────────────────────
function Node({ x, y, w = 130, h = 36, type = "neutral", label, onClick, tooltip }) {
  const [hovered, setHovered] = useState(false);
  const c = C[type];
  return (
    <g
      style={{ cursor: onClick || tooltip ? "pointer" : "default" }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <rect
        x={x} y={y} width={w} height={h} rx={6}
        fill={c.fill}
        stroke={hovered ? c.text : c.stroke}
        strokeWidth={hovered ? 1 : 0.5}
      />
      <text
        x={x + w / 2} y={y + h / 2}
        textAnchor="middle" dominantBaseline="central"
        fill={c.text}
        style={{ font: "500 12px 'DM Sans', system-ui", pointerEvents: "none" }}
      >
        {label}
      </text>
    </g>
  );
}

function Arrow({ x1, y1, x2, y2, color = "#777", dashed = false, markerId }) {
  return (
    <line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={color} strokeWidth={1}
      strokeDasharray={dashed ? "4 3" : undefined}
      markerEnd={`url(#${markerId})`}
      fill="none"
    />
  );
}

function PathArrow({ d, color = "#777", dashed = false, markerId }) {
  return (
    <path
      d={d} stroke={color} strokeWidth={1}
      strokeDasharray={dashed ? "4 3" : undefined}
      markerEnd={`url(#${markerId})`}
      fill="none"
    />
  );
}

function LegendItem({ fill, stroke, label }) {
  return (
    <g>
      <rect width={10} height={10} rx={2} fill={fill} stroke={stroke} strokeWidth={0.5} />
      <text x={16} y={9} fill="#888" style={{ font: "400 11px system-ui" }}>{label}</text>
    </g>
  );
}

function Legend({ items, y = 440 }) {
  let x = 20;
  return (
    <g transform={`translate(0,${y})`}>
      {items.map(({ fill, stroke, label }) => {
        const el = (
          <g key={label} transform={`translate(${x},0)`}>
            <LegendItem fill={fill} stroke={stroke} label={label} />
          </g>
        );
        x += label.length * 7 + 30;
        return el;
      })}
    </g>
  );
}

// ─── marker defs reused by all SVGs ─────────────────────────────
function Defs({ id }) {
  return (
    <defs>
      <marker id={id} viewBox="0 0 10 10" refX={8} refY={5}
        markerWidth={5} markerHeight={5} orient="auto-start-reverse">
        <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke"
          strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      </marker>
    </defs>
  );
}

// ─── tooltip overlay ─────────────────────────────────────────────
function Tooltip({ text, visible, x, y }) {
  if (!visible || !text) return null;
  return (
    <g>
      <rect x={x - 4} y={y - 20} width={text.length * 7 + 8} height={22}
        rx={4} fill="#111" stroke="#555" strokeWidth={0.5} />
      <text x={x} y={y - 5} fill="#ddd" style={{ font: "400 11px system-ui" }}>{text}</text>
    </g>
  );
}

// ─── scroll wrapper ──────────────────────────────────────────────
function ScrollSVG({ width, height, viewBox, children, bgColor = "#2a2a2a" }) {
  const ref = useRef(null);
  const drag = useRef({ active: false, sx: 0, sl: 0 });

  const onDown = (e) => { drag.current = { active: true, sx: e.pageX, sl: ref.current.scrollLeft }; };
  const onMove = (e) => {
    if (!drag.current.active) return;
    ref.current.scrollLeft = drag.current.sl - (e.pageX - drag.current.sx);
  };
  const onUp = () => { drag.current.active = false; };

  return (
    <div
      ref={ref}
      onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}
      style={{ overflowX: "auto", cursor: "grab", userSelect: "none", background: bgColor }}
    >
      <svg width={width} height={height} viewBox={viewBox}
        style={{ display: "block", background: bgColor }}>
        {children}
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// TAB: IA MAP
// ════════════════════════════════════════════════════════════════
function IAMap() {
  const mid = "arr-ia";
  return (
    <ScrollSVG width={2020} height={880} viewBox="0 0 2020 880">
      <Defs id={mid} />

      {/* ROOT */}
      <Node x={20}  y={390} w={170} type="root"   label="AppNavigator" />
      <Arrow x1={190} y1={410} x2={230} y2={410} color="#777" markerId={mid} />
      <Node x={230} y={390} w={140} type="root"   label="SplashScreen" />
      <PathArrow d="M370 410 L410 410 L410 200 L450 200" color="#777" markerId={mid} />
      <PathArrow d="M370 410 L410 410 L410 620 L450 620" color="#777" markerId={mid} />

      {/* AUTH */}
      <text x={452} y={112} fill="#5DCAA5" style={{font:"500 10px system-ui",letterSpacing:".05em",textTransform:"uppercase"}}>Auth stack</text>
      <Node x={450} y={120} w={120} type="auth" label="Auth stack" />
      <PathArrow d="M570 140 L610 140 L610 160 L650 160" color="#5DCAA5" markerId={mid} />
      <PathArrow d="M570 140 L610 140 L610 260 L650 260" color="#5DCAA5" markerId={mid} />
      <Node x={650} y={140} w={136} type="auth" label="LoginScreen" />
      <PathArrow d="M786 160 L826 160 L826 120 L866 120" color="#5DCAA5" markerId={mid} />
      <PathArrow d="M786 160 L826 160 L826 200 L866 200" color="#5DCAA5" markerId={mid} />
      <Node x={866} y={100} w={136} type="auth" label="SignupScreen" />
      <Node x={866} y={180} w={156} type="auth" label="ForgotPassword" />
      <PathArrow d="M1022 200 L1062 200 L1062 240 L1102 240" color="#5DCAA5" dashed markerId={mid} />
      <Node x={1102} y={220} w={150} type="auth" label="ResetPassword" />
      <Node x={650}  y={240} w={156} type="auth" label="OnboardingScreen" />

      {/* MAIN */}
      <text x={452} y={538} fill="#8b83e8" style={{font:"500 10px system-ui",letterSpacing:".05em",textTransform:"uppercase"}}>Main app</text>
      <Node x={450} y={600} w={170} type="main" label="BiometricAuthGuard" />
      <Arrow x1={620} y1={620} x2={660} y2={620} color="#8b83e8" markerId={mid} />
      <Node x={660} y={600} w={110} type="main" label="MainTabs" />
      <PathArrow d="M770 620 L810 620 L810 480 L850 480" color="#8b83e8" markerId={mid} />
      <PathArrow d="M770 620 L810 620 L810 540 L850 540" color="#8b83e8" markerId={mid} />
      <PathArrow d="M770 620 L810 620 L810 600 L850 600" color="#8b83e8" markerId={mid} />
      <PathArrow d="M770 620 L810 620 L810 660 L850 660" color="#8b83e8" markerId={mid} />
      <PathArrow d="M770 620 L810 620 L810 720 L850 720" color="#8b83e8" markerId={mid} />

      <Node x={850} y={460} w={126} type="main" label="Dashboard" />
      <PathArrow d="M976 480 L1016 480 L1016 380 L1056 380" color="#8b83e8" markerId={mid} />
      <PathArrow d="M976 480 L1016 480 L1016 440 L1056 440" color="#8b83e8" markerId={mid} />
      <PathArrow d="M976 480 L1016 480 L1016 500 L1056 500" color="#8b83e8" markerId={mid} />
      <Node x={1056} y={360} w={100} type="modal"  label="AddBill" />
      <Node x={1056} y={420} w={114} type="modal"  label="AddIncome" />
      <Node x={1056} y={480} w={156} type="detail" label="SpendingAnalysis" />

      <Node x={850} y={520} w={110} type="main"   label="Goals panel" />
      <PathArrow d="M960 540 L1000 540 L1000 560 L1040 560" color="#8b83e8" markerId={mid} />
      <PathArrow d="M960 540 L1000 540 L1000 610 L1040 610" color="#8b83e8" markerId={mid} />
      <Node x={1040} y={542} w={120} type="modal"  label="CreateGoal" />
      <Node x={1040} y={592} w={120} type="detail" label="GoalDetails" />

      <Node x={850} y={580} w={120} type="main"   label="Folders panel" />
      <PathArrow d="M970 600 L1010 600 L1010 660 L1050 660" color="#8b83e8" markerId={mid} />
      <PathArrow d="M970 600 L1010 600 L1010 710 L1050 710" color="#8b83e8" markerId={mid} />
      <Node x={1050} y={642} w={114} type="modal"  label="AddFolder" />
      <Node x={1050} y={692} w={120} type="detail" label="FolderDetail" />

      <Node x={850} y={640} w={120} type="main"   label="Insights panel" />
      <PathArrow d="M970 660 L1010 660 L1010 760 L1050 760" color="#8b83e8" markerId={mid} />
      <Node x={1050} y={742} w={126} type="detail" label="BudgetReport" />

      <Node x={850} y={700} w={130} type="main"   label="Accounts panel" />
      <PathArrow d="M980 720 L1020 720 L1020 810 L1060 810" color="#8b83e8" markerId={mid} />
      <PathArrow d="M980 720 L1020 720 L1020 856 L1060 856" color="#8b83e8" markerId={mid} />
      <Node x={1060} y={792} w={126} type="detail" label="LinkAccount" />
      <Node x={1060} y={838} w={134} type="detail" label="AccountDetail" />

      {/* FORESIGHT */}
      <text x={1260} y={338} fill="#e07050" style={{font:"500 10px system-ui",letterSpacing:".05em",textTransform:"uppercase"}}>Foresight flow</text>
      <PathArrow d="M1212 381 L1260 381 L1260 360 L1300 360" color="#e07050" dashed markerId={mid} />
      <Node x={1300} y={342} w={136} type="modal"  label="ForesightIntro" />
      <Arrow x1={1436} y1={360} x2={1516} y2={360} color="#e07050" markerId={mid} />
      <Node x={1516} y={342} w={148} type="modal"  label="ForesightWizard" />
      <Arrow x1={1664} y1={360} x2={1744} y2={360} color="#e07050" markerId={mid} />
      <Node x={1744} y={342} w={130} type="detail" label="ForesightPlan" />
      <PathArrow d="M1590 378 L1590 420 L1630 420" color="#e07050" dashed markerId={mid} />
      <Node x={1630} y={402} w={130} type="modal"  label="PYFSetup" />

      {/* DETAIL */}
      <text x={1260} y={476} fill="#5a9fd4" style={{font:"500 10px system-ui",letterSpacing:".05em",textTransform:"uppercase"}}>Detail screens</text>
      <PathArrow d="M1212 501 L1300 501" color="#5a9fd4" dashed markerId={mid} />
      <Node x={1300} y={484} w={156} type="detail" label="CategoryActivity" />
      <PathArrow d="M1160 611 L1200 611 L1200 560 L1300 560" color="#5a9fd4" dashed markerId={mid} />
      <Node x={1300} y={542} w={106} type="detail" label="BillDetail" />
      <PathArrow d="M1160 611 L1200 611 L1200 615 L1300 615" color="#5a9fd4" dashed markerId={mid} />
      <Node x={1300} y={597} w={166} type="detail" label="TransactionDetail" />
      <PathArrow d="M1170 713 L1220 713 L1220 670 L1300 670" color="#5a9fd4" dashed markerId={mid} />
      <PathArrow d="M1170 713 L1220 713 L1220 715 L1300 715" color="#5a9fd4" dashed markerId={mid} />
      <PathArrow d="M1170 713 L1220 713 L1220 757 L1300 757" color="#5a9fd4" dashed markerId={mid} />
      <Node x={1300} y={652} w={100} type="detail" label="Profile" />
      <Node x={1300} y={697} w={106} type="detail" label="Settings" />
      <Node x={1300} y={739} w={116} type="detail" label="MFAEnroll" />

      {/* AI */}
      <text x={1520} y={476} fill="#7fc464" style={{font:"500 10px system-ui",letterSpacing:".05em",textTransform:"uppercase"}}>AI integrations</text>
      <PathArrow d="M1456 501 L1560 501" color="#7fc464" dashed markerId={mid} />
      <Node x={1560} y={484} w={110} type="ai" label="NL parser" />
      <PathArrow d="M1456 501 L1520 501 L1520 550 L1560 550" color="#7fc464" dashed markerId={mid} />
      <Node x={1560} y={532} w={174} type="ai" label="Foresight generator" />

      {/* LEGEND */}
      <g transform="translate(0,836)">
        {[
          { fill: C.root.fill,   stroke: C.root.stroke,   label: "Root",         ox: 0   },
          { fill: C.auth.fill,   stroke: C.auth.stroke,   label: "Auth",         ox: 68  },
          { fill: C.main.fill,   stroke: C.main.stroke,   label: "Main / tabs",  ox: 116 },
          { fill: C.modal.fill,  stroke: C.modal.stroke,  label: "Modals",       ox: 234 },
          { fill: C.detail.fill, stroke: C.detail.stroke, label: "Detail",       ox: 310 },
          { fill: C.ai.fill,     stroke: C.ai.stroke,     label: "AI",           ox: 376 },
        ].map(({ fill, stroke, label, ox }) => (
          <g key={label} transform={`translate(${ox},0)`}>
            <rect width={10} height={10} rx={2} fill={fill} stroke={stroke} strokeWidth={0.5} />
            <text x={16} y={9} fill="#888" style={{font:"400 11px system-ui"}}>{label}</text>
          </g>
        ))}
        <text x={448} y={9} fill="#555" style={{font:"400 11px system-ui"}}>— dashed = navigates to</text>
      </g>
    </ScrollSVG>
  );
}

// ════════════════════════════════════════════════════════════════
// TAB: CREATE A GOAL
// ════════════════════════════════════════════════════════════════
function GoalFlow() {
  const mid = "arr-goal";
  return (
    <ScrollSVG width={1800} height={480} viewBox="0 0 1800 480">
      <Defs id={mid} />
      {/* entry */}
      <Node x={20}  y={40} w={120} type="neutral" label="Goals panel" />
      <text x={154} y={62} textAnchor="middle" fill="#666" style={{font:"400 11px system-ui"}}>or</text>
      <Node x={168} y={40} w={110} type="neutral" label="Dashboard" />
      <PathArrow d="M278 58 L318 58" color="#777" markerId={mid} />
      <Node x={318} y={40} w={150} type="main"    label='Tap "Create Goal"' />
      <PathArrow d="M468 58 L508 58" color="#8b83e8" markerId={mid} />
      <Node x={508} y={40} w={140} type="modal"   label="CreateGoalScreen" />
      <PathArrow d="M648 58 L688 58" color="#e07050" markerId={mid} />
      <Node x={688} y={40} w={130} type="neutral" label="Q1: goal type?" />

      {/* branches down */}
      <PathArrow d="M753 76 L753 116 L290 116 L290 136" color="#888" markerId={mid} />
      <PathArrow d="M753 116 L753 136"                  color="#888" markerId={mid} />
      <PathArrow d="M753 76 L753 116 L1220 116 L1220 136" color="#888" markerId={mid} />
      <text x={290}  y={130} textAnchor="middle" fill="#f5c4b3" style={{font:"400 11px system-ui"}}>Spend less</text>
      <text x={753}  y={130} textAnchor="middle" fill="#f5c4b3" style={{font:"400 11px system-ui"}}>Save up</text>
      <text x={1220} y={130} textAnchor="middle" fill="#f5c4b3" style={{font:"400 11px system-ui"}}>Pay off debt</text>

      {/* SPEND LESS */}
      {[["Select category",160,136],["Enter goal name",160,188],["Monthly limit ($)",160,240],["Duration (1–12 mo)",160,292]].map(([l,x,y],i,a)=>(
        <g key={l}>
          <Node x={x} y={y} w={130} type="neutral" label={l} />
          {i<a.length-1 && <Arrow x1={225} y1={y+32} x2={225} y2={y+52} color="#888" markerId={mid} />}
        </g>
      ))}
      <Arrow x1={225} y1={324} x2={225} y2={344} color="#888" markerId={mid} />
      <Node x={160} y={344} w={130} type="save" label="Confirm → Save" />

      {/* SAVE UP */}
      {[["Enter goal name",623,136],["Target amount ($)",623,188],["Monthly contribution",623,240]].map(([l,x,y],i,a)=>(
        <g key={l}>
          <Node x={x} y={y} w={130} type="neutral" label={l} />
          {i<a.length-1 && <Arrow x1={688} y1={y+32} x2={688} y2={y+52} color="#888" markerId={mid} />}
        </g>
      ))}
      <Arrow x1={688} y1={272} x2={688} y2={292} color="#888" markerId={mid} />
      <Node x={623} y={292} w={156} type="save" label="Confirm + projection → Save" />

      {/* PAY OFF DEBT */}
      {[["Enter debt name",1090,136],["Current balance ($)",1090,188],["Monthly payment ($)",1090,240]].map(([l,x,y],i,a)=>(
        <g key={l}>
          <Node x={x} y={y} w={130} type="neutral" label={l} />
          {i<a.length-1 && <Arrow x1={1155} y1={y+32} x2={1155} y2={y+52} color="#888" markerId={mid} />}
        </g>
      ))}
      <Arrow x1={1155} y1={272} x2={1155} y2={292} color="#888" markerId={mid} />
      <Node x={1090} y={292} w={164} type="save" label="Confirm + payoff date → Save" />

      {/* converge */}
      <PathArrow d="M225 376 L225 410 L1420 410"  color="#5DCAA5" markerId={mid} />
      <PathArrow d="M701 324 L701 410"            color="#5DCAA5" markerId={mid} />
      <PathArrow d="M1172 324 L1172 410"          color="#5DCAA5" markerId={mid} />
      <Node x={1420} y={392} w={164} type="gate"   label="Free: 2 goal limit" />
      <Arrow x1={1584} y1={410} x2={1624} y2={410} color="#7fc464" markerId={mid} />
      <Node x={1624} y={392} w={152} type="system" label="saveGoal() → reload" />

      {/* legend */}
      <g transform="translate(0,448)">
        {[
          { fill:C.neutral.fill,  stroke:C.neutral.stroke,  label:"Step / input",   ox:0   },
          { fill:C.main.fill,     stroke:C.main.stroke,      label:"User action",    ox:110 },
          { fill:C.modal.fill,    stroke:C.modal.stroke,     label:"Modal screen",   ox:220 },
          { fill:C.save.fill,     stroke:C.save.stroke,      label:"Save / confirm", ox:330 },
          { fill:C.gate.fill,     stroke:C.gate.stroke,      label:"Gate/paywall",   ox:450 },
          { fill:C.system.fill,   stroke:C.system.stroke,    label:"Storage/system", ox:556 },
        ].map(({fill,stroke,label,ox})=>(
          <g key={label} transform={`translate(${ox},0)`}>
            <rect width={10} height={10} rx={2} fill={fill} stroke={stroke} strokeWidth={0.5}/>
            <text x={16} y={9} fill="#888" style={{font:"400 11px system-ui"}}>{label}</text>
          </g>
        ))}
      </g>
    </ScrollSVG>
  );
}

// ════════════════════════════════════════════════════════════════
// TAB: FORESIGHT
// ════════════════════════════════════════════════════════════════
function ForesightFlow() {
  const mid = "arr-foresight";
  return (
    <ScrollSVG width={1900} height={480} viewBox="0 0 1900 480">
      <Defs id={mid} />
      <Node x={20}  y={40} w={110} type="neutral" label="Dashboard" />
      <Arrow x1={130} y1={58} x2={170} y2={58} color="#777" markerId={mid} />
      <Node x={170} y={40} w={130} type="main"    label="ForesightPill" />
      <Arrow x1={300} y1={58} x2={340} y2={58} color="#8b83e8" markerId={mid} />
      <Node x={340} y={40} w={140} type="modal"   label="ForesightIntro" />
      <Arrow x1={480} y1={58} x2={520} y2={58} color="#e07050" markerId={mid} />
      <Node x={520} y={40} w={148} type="modal"   label="ForesightWizard" />
      <Arrow x1={668} y1={58} x2={708} y2={58} color="#e07050" markerId={mid} />
      <Node x={708} y={40} w={130} type="neutral" label="Confirm income" />
      <Arrow x1={838} y1={58} x2={878} y2={58} color="#888" markerId={mid} />
      <Node x={878} y={40} w={140} type="neutral" label="Select method" />

      {/* branches */}
      <PathArrow d="M948 76 L948 116 L360 116 L360 136"  color="#888" markerId={mid} />
      <PathArrow d="M948 116 L948 136"                    color="#888" markerId={mid} />
      <PathArrow d="M948 76 L948 116 L1540 116 L1540 136" color="#888" markerId={mid} />
      <text x={360}  y={130} textAnchor="middle" fill="#c8c4f8" style={{font:"400 11px system-ui"}}>Zero-based</text>
      <text x={948}  y={130} textAnchor="middle" fill="#c8c4f8" style={{font:"400 11px system-ui"}}>50/30/20</text>
      <text x={1540} y={130} textAnchor="middle" fill="#c8c4f8" style={{font:"400 11px system-ui"}}>Pay yourself first</text>

      {/* ZBB */}
      {[["ZbbAllocationSheet",230,136],["Allocate 7 categories",230,188]].map(([l,x,y],i,a)=>(
        <g key={l}>
          <Node x={x} y={y} w={150} type="neutral" label={l} />
          {i<a.length-1 && <Arrow x1={305} y1={y+32} x2={305} y2={y+52} color="#888" markerId={mid} />}
        </g>
      ))}
      <Arrow x1={305} y1={220} x2={305} y2={240} color="#888" markerId={mid} />
      <Node x={230} y={240} w={150} type="gate"    label="Validate: sum = income" />
      <Arrow x1={305} y1={272} x2={305} y2={292} color="#888" markerId={mid} />
      <Node x={240} y={292} w={130} type="neutral" label="Select priority" />
      <Arrow x1={305} y1={324} x2={305} y2={344} color="#888" markerId={mid} />
      <Node x={240} y={344} w={130} type="neutral" label="Select timeline" />

      {/* 50/30/20 */}
      {[["Customize splits",818,136],["Select priority",818,188],["Select timeline",818,240]].map(([l,x,y],i,a)=>(
        <g key={l}>
          <Node x={x} y={y} w={130} type="neutral" label={l} />
          {i<a.length-1 && <Arrow x1={883} y1={y+32} x2={883} y2={y+52} color="#888" markerId={mid} />}
        </g>
      ))}

      {/* PYF */}
      {[["Savings rate 5–30%",1410,136],["Savings purpose",1410,188],["Select timeline",1410,240]].map(([l,x,y],i,a)=>(
        <g key={l}>
          <Node x={x} y={y} w={130} type="neutral" label={l} />
          {i<a.length-1 && <Arrow x1={1475} y1={y+32} x2={1475} y2={y+52} color="#888" markerId={mid} />}
        </g>
      ))}

      {/* converge */}
      <PathArrow d="M305 376 L305 410 L1700 410"  color="#5DCAA5" markerId={mid} />
      <PathArrow d="M883 272 L883 410"            color="#5DCAA5" markerId={mid} />
      <PathArrow d="M1475 272 L1475 410"          color="#5DCAA5" markerId={mid} />
      <Node x={1700} y={392} w={62}  type="neutral" label="Confirm" />
      <Arrow x1={1762} y1={410} x2={1800} y2={410} color="#7fc464" markerId={mid} />
      <Node x={1800} y={392} w={80}  type="system"  label="API → save" />

      <g transform="translate(0,448)">
        {[
          {fill:C.neutral.fill, stroke:C.neutral.stroke, label:"Step / input",      ox:0  },
          {fill:C.main.fill,    stroke:C.main.stroke,    label:"User action",       ox:110},
          {fill:C.modal.fill,   stroke:C.modal.stroke,   label:"Modal screen",      ox:220},
          {fill:C.gate.fill,    stroke:C.gate.stroke,    label:"Validation gate",   ox:330},
          {fill:C.save.fill,    stroke:C.save.stroke,    label:"Converge / save",   ox:450},
          {fill:C.system.fill,  stroke:C.system.stroke,  label:"API / storage",     ox:566},
        ].map(({fill,stroke,label,ox})=>(
          <g key={label} transform={`translate(${ox},0)`}>
            <rect width={10} height={10} rx={2} fill={fill} stroke={stroke} strokeWidth={0.5}/>
            <text x={16} y={9} fill="#888" style={{font:"400 11px system-ui"}}>{label}</text>
          </g>
        ))}
      </g>
    </ScrollSVG>
  );
}

// ════════════════════════════════════════════════════════════════
// TAB: TRACK GOAL PROGRESS
// ════════════════════════════════════════════════════════════════
function TrackFlow() {
  const mid = "arr-track";
  return (
    <ScrollSVG width={1700} height={480} viewBox="0 0 1700 480">
      <Defs id={mid} />
      <Node x={20}  y={40} w={110} type="main"    label="Goals panel" />
      <Arrow x1={130} y1={58} x2={170} y2={58} color="#8b83e8" markerId={mid} />
      <Node x={170} y={40} w={130} type="main"    label="Tap goal card" />
      <Arrow x1={300} y1={58} x2={340} y2={58} color="#8b83e8" markerId={mid} />
      <Node x={340} y={40} w={148} type="detail"  label="GoalDetailScreen" />
      <Arrow x1={488} y1={58} x2={528} y2={58} color="#888" markerId={mid} />
      <Node x={528} y={40} w={130} type="neutral" label="Progress bar" />
      <Arrow x1={658} y1={58} x2={698} y2={58} color="#888" markerId={mid} />
      <Node x={698} y={40} w={150} type="neutral" label="Current vs. target" />

      {/* branches */}
      <PathArrow d="M773 76 L773 116 L300 116 L300 136" color="#888" markerId={mid} />
      <PathArrow d="M773 116 L773 136"                  color="#888" markerId={mid} />
      <text x={300} y={130} textAnchor="middle" fill="#f5c4b3" style={{font:"400 11px system-ui"}}>Spend less</text>
      <text x={773} y={130} textAnchor="middle" fill="#f5c4b3" style={{font:"400 11px system-ui"}}>Save up / pay off debt</text>

      {/* SPEND LESS */}
      <Node x={170} y={136} w={130} type="neutral" label="Bills in category" />
      <Arrow x1={235} y1={168} x2={235} y2={188} color="#888" markerId={mid} />
      <Node x={170} y={188} w={130} type="neutral" label="Avg / largest / counts" />
      <Arrow x1={235} y1={220} x2={235} y2={240} color="#888" markerId={mid} />
      <Node x={170} y={240} w={160} type="pro"     label="Streak badge — Pro only" />

      {/* SAVE UP */}
      <Node x={643} y={136} w={160} type="main"    label='Tap "Log Contribution"' />
      <Arrow x1={723} y1={168} x2={723} y2={188} color="#8b83e8" markerId={mid} />
      <Node x={643} y={188} w={130} type="neutral" label="Enter amount" />
      <Arrow x1={708} y1={220} x2={708} y2={240} color="#888" markerId={mid} />
      <Node x={623} y={240} w={170} type="system"  label="updateGoalAmount() → toast" />
      <Arrow x1={708} y1={272} x2={708} y2={292} color="#7fc464" markerId={mid} />
      <Node x={643} y={292} w={150} type="neutral" label="View milestone history" />

      {/* PRO */}
      <PathArrow d="M848 58 L940 58 L940 116 L1100 116 L1100 136" color="#EF9F27" markerId={mid} />
      <text x={1100} y={130} textAnchor="middle" fill="#FAC775" style={{font:"400 11px system-ui"}}>Pro only</text>
      <Node x={970}  y={136} w={180} type="pro" label="Methodology impact card" />
      <Arrow x1={1060} y1={168} x2={1060} y2={188} color="#EF9F27" markerId={mid} />
      <Node x={990}  y={188} w={160} type="pro" label="Forecast predictions" />

      {/* ACTIONS */}
      <PathArrow d="M848 58 L940 58 L940 116 L1380 116 L1380 136" color="#888" markerId={mid} />
      <text x={1380} y={130} textAnchor="middle" fill="#888" style={{font:"400 11px system-ui"}}>Actions</text>
      <Node x={1250} y={136} w={140} type="modal"  label="Edit → CreateGoal" />
      <Arrow x1={1320} y1={168} x2={1320} y2={188} color="#e07050" markerId={mid} />
      <Node x={1250} y={188} w={148} type="save"   label="Mark complete" />
      <Arrow x1={1324} y1={220} x2={1324} y2={240} color="#5DCAA5" markerId={mid} />
      <Node x={1250} y={240} w={148} type="neutral" label="deleteGoal() → reload" />

      <g transform="translate(0,448)">
        {[
          {fill:C.main.fill,    stroke:C.main.stroke,    label:"Navigation",    ox:0  },
          {fill:C.detail.fill,  stroke:C.detail.stroke,  label:"Detail screen", ox:100},
          {fill:C.neutral.fill, stroke:C.neutral.stroke, label:"Step/content",  ox:210},
          {fill:C.pro.fill,     stroke:C.pro.stroke,     label:"Pro only",      ox:316},
          {fill:C.system.fill,  stroke:C.system.stroke,  label:"Storage",       ox:396},
          {fill:C.modal.fill,   stroke:C.modal.stroke,   label:"Modal action",  ox:472},
          {fill:C.save.fill,    stroke:C.save.stroke,    label:"Completion",    ox:572},
        ].map(({fill,stroke,label,ox})=>(
          <g key={label} transform={`translate(${ox},0)`}>
            <rect width={10} height={10} rx={2} fill={fill} stroke={stroke} strokeWidth={0.5}/>
            <text x={16} y={9} fill="#888" style={{font:"400 11px system-ui"}}>{label}</text>
          </g>
        ))}
      </g>
    </ScrollSVG>
  );
}

// ════════════════════════════════════════════════════════════════
// TAB: BROWSE SPENDING
// ════════════════════════════════════════════════════════════════
function SpendFlow() {
  const mid = "arr-spend";
  return (
    <ScrollSVG width={1400} height={380} viewBox="0 0 1400 380">
      <Defs id={mid} />
      <text x={80}  y={28} textAnchor="middle" fill="#888" style={{font:"400 11px system-ui"}}>Entry A</text>
      <Node x={20}  y={36} w={120} type="neutral" label="Dashboard" />
      <Arrow x1={140} y1={54} x2={180} y2={54} color="#777" markerId={mid} />
      <Node x={180} y={36} w={148} type="main"    label="Tap donut chart slice" />

      <text x={80} y={106} textAnchor="middle" fill="#888" style={{font:"400 11px system-ui"}}>Entry B</text>
      <Node x={20}  y={114} w={148} type="detail"  label="GoalDetail (spend less)" />
      <PathArrow d="M168 132 L180 132 L180 90 L212 90" color="#5a9fd4" markerId={mid} />

      <PathArrow d="M328 54 L380 54 L380 90 L420 90" color="#888" markerId={mid} />
      <PathArrow d="M212 90 L420 90" color="#888" markerId={mid} />

      <Node x={420} y={72} w={180} type="detail" label="SpendingAnalysisScreen" />

      <Arrow x1={600} y1={90} x2={640} y2={90} color="#888" markerId={mid} />
      <Node x={640} y={36} w={160} type="neutral" label="Hero: total, count, chart" />
      <Node x={640} y={80} w={148} type="detail"  label="Goal progress bar" />
      <Node x={640} y={124} w={148} type="neutral" label="Filter: month / category" />

      <Arrow x1={788} y1={90} x2={840} y2={90} color="#888" markerId={mid} />
      <Node x={840} y={72} w={180} type="neutral" label="Activity list (bills + txns)" />
      <Arrow x1={1020} y1={90} x2={1060} y2={90} color="#888" markerId={mid} />
      <Node x={1060} y={40} w={120} type="detail" label="BillDetail" />
      <PathArrow d="M1020 90 L1040 90 L1040 120 L1060 120" color="#888" markerId={mid} />
      <Node x={1060} y={102} w={140} type="detail" label="TransactionDetail" />

      <g transform="translate(0,340)">
        {[
          {fill:C.neutral.fill, stroke:C.neutral.stroke, label:"Step / content",   ox:0  },
          {fill:C.main.fill,    stroke:C.main.stroke,    label:"User action",      ox:118},
          {fill:C.detail.fill,  stroke:C.detail.stroke,  label:"Screen / detail",  ox:228},
        ].map(({fill,stroke,label,ox})=>(
          <g key={label} transform={`translate(${ox},0)`}>
            <rect width={10} height={10} rx={2} fill={fill} stroke={stroke} strokeWidth={0.5}/>
            <text x={16} y={9} fill="#888" style={{font:"400 11px system-ui"}}>{label}</text>
          </g>
        ))}
        <text x={370} y={9} fill="#555" style={{font:"400 11px system-ui"}}>Two entry paths converge at SpendingAnalysisScreen</text>
      </g>
    </ScrollSVG>
  );
}

// ════════════════════════════════════════════════════════════════
// TAB: LINK BANK ACCOUNT
// ════════════════════════════════════════════════════════════════
function PlaidFlow() {
  const mid = "arr-plaid";
  return (
    <ScrollSVG width={1200} height={320} viewBox="0 0 1200 320">
      <Defs id={mid} />
      <Node x={20}  y={100} w={130} type="main"     label="Accounts panel" />
      <Arrow x1={150} y1={118} x2={190} y2={118} color="#8b83e8" markerId={mid} />
      <Node x={190} y={100} w={160} type="main"     label='Tap "Link Account"' />
      <Arrow x1={350} y1={118} x2={390} y2={118} color="#8b83e8" markerId={mid} />
      <Node x={390} y={100} w={150} type="modal"    label="LinkAccountScreen" />
      <Arrow x1={540} y1={118} x2={580} y2={118} color="#e07050" markerId={mid} />

      {/* Plaid bracket */}
      <rect x={570} y={68} width={190} height={172} rx={6}
        fill="none" stroke="#EF9F27" strokeWidth={0.5} strokeDasharray="4 3" />
      <text x={665} y={258} textAnchor="middle" fill="#EF9F27" style={{font:"400 11px system-ui"}}>External Plaid OAuth</text>

      <Node x={580} y={80}  w={170} type="external" label="Plaid OAuth — ext. browser" />
      <Arrow x1={665} y1={116} x2={665} y2={136} color="#EF9F27" markerId={mid} />
      <Node x={580} y={136} w={170} type="external" label="OAuth callback" />
      <Arrow x1={665} y1={172} x2={665} y2={192} color="#EF9F27" markerId={mid} />
      <Node x={580} y={192} w={170} type="system"   label="Token exchange" />
      <Arrow x1={750} y1={210} x2={790} y2={210} color="#7fc464" markerId={mid} />

      <Node x={790} y={100} w={160} type="detail"   label="AccountDetailScreen" />
      <Arrow x1={870} y1={136} x2={870} y2={156} color="#5a9fd4" markerId={mid} />
      <Node x={790} y={156} w={160} type="neutral"  label="View balance + txns" />
      <Arrow x1={870} y1={188} x2={870} y2={208} color="#888" markerId={mid} />
      <Node x={790} y={208} w={160} type="modal"    label="Disconnect account" />

      <g transform="translate(0,282)">
        {[
          {fill:C.main.fill,     stroke:C.main.stroke,     label:"Navigation",          ox:0  },
          {fill:C.modal.fill,    stroke:C.modal.stroke,     label:"Modal screen",        ox:100},
          {fill:C.external.fill, stroke:C.external.stroke,  label:"External flow (Plaid)",ox:210},
          {fill:C.system.fill,   stroke:C.system.stroke,    label:"System / token",      ox:358},
          {fill:C.detail.fill,   stroke:C.detail.stroke,    label:"Detail screen",       ox:462},
        ].map(({fill,stroke,label,ox})=>(
          <g key={label} transform={`translate(${ox},0)`}>
            <rect width={10} height={10} rx={2} fill={fill} stroke={stroke} strokeWidth={0.5}/>
            <text x={16} y={9} fill="#888" style={{font:"400 11px system-ui"}}>{label}</text>
          </g>
        ))}
      </g>
    </ScrollSVG>
  );
}

// ════════════════════════════════════════════════════════════════
// ROOT COMPONENT
// ════════════════════════════════════════════════════════════════
const TABS = [
  { id: "ia",        label: "IA map",               Component: IAMap       },
  { id: "goal",      label: "Create a goal",         Component: GoalFlow    },
  { id: "foresight", label: "Foresight setup",       Component: ForesightFlow },
  { id: "track",     label: "Track goal progress",   Component: TrackFlow   },
  { id: "spend",     label: "Browse spending",       Component: SpendFlow   },
  { id: "plaid",     label: "Link bank account",     Component: PlaidFlow   },
];

export default function BudgetBuddiIA() {
  const [active, setActive] = useState("ia");
  const { Component } = TABS.find(t => t.id === active);

  return (
    <div style={{
      background: C.bg,
      borderRadius: 10,
      overflow: "hidden",
      fontFamily: "system-ui, sans-serif",
    }}>
      {/* Tab bar */}
      <div style={{
        display: "flex",
        borderBottom: `1px solid ${C.border}`,
        background: C.surface,
        overflowX: "auto",
        padding: "0 16px",
        scrollbarWidth: "none",
      }}>
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            style={{
              flexShrink: 0,
              padding: "10px 15px",
              fontSize: 12,
              fontWeight: 500,
              color: active === id ? C.tabActive : C.tabInactive,
              background: "none",
              border: "none",
              borderBottom: `2px solid ${active === id ? C.tabAccent : "transparent"}`,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "color .15s, border-color .15s",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Panel */}
      <Component />
    </div>
  );
}
