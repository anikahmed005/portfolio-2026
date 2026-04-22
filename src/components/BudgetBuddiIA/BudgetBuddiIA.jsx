import React from 'react';
import { useTheme } from '../../context/ThemeContext';

// ─── Primitive pieces ────────────────────────────────────────────────────────

const TYPE_META = {
  screen:     { label: 'Screen',     hex: '#38bdf8' },
  action:     { label: 'Action',     hex: '#4ade80' },
  decision:   { label: 'Decision',   hex: '#f59e0b' },
  ai:         { label: 'AI',         hex: '#a78bfa' },
  persistent: { label: 'Persistent', hex: '#fb923c' },
};

function Tag({ type }) {
  const meta = TYPE_META[type] ?? TYPE_META.screen;
  return (
    <span style={{
      fontFamily:    'var(--font-mono)',
      fontSize:      '9px',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color:         meta.hex,
      border:        `1px solid ${meta.hex}55`,
      borderRadius:  '3px',
      padding:       '1px 5px',
      flexShrink:    0,
      lineHeight:    1.4,
    }}>
      {meta.label}
    </span>
  );
}

function Node({ label, type = 'screen', arrow, isDark }) {
  const border = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.09)';
  const bg     = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.025)';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
      <div style={{
        display:      'flex',
        alignItems:   'center',
        gap:          '6px',
        padding:      '5px 10px',
        borderRadius: '6px',
        border:       `1px solid ${border}`,
        background:   bg,
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize:   'var(--text-xs)',
          color:      'var(--color-ink)',
          opacity:    0.85,
          whiteSpace: 'nowrap',
        }}>
          {label}
        </span>
        <Tag type={type} />
      </div>
      {arrow && (
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize:   'var(--text-xs)',
          color:      'var(--color-muted)',
          opacity:    0.5,
        }}>→</span>
      )}
    </div>
  );
}

function FlowRow({ nodes, isDark }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
      {nodes.map((n, i) => (
        <Node key={i} label={n.label} type={n.type} arrow={i < nodes.length - 1} isDark={isDark} />
      ))}
    </div>
  );
}

function Block({ title, accent, children, isDark }) {
  const border = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)';
  const bg     = isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.015)';
  return (
    <div style={{
      borderRadius: '10px',
      border:       `1px solid ${border}`,
      background:   bg,
      padding:      '14px 16px',
      display:      'flex',
      flexDirection:'column',
      gap:          '4px',
    }}>
      <span style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      '9px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color:         accent ?? 'var(--color-muted)',
        opacity:       0.7,
        marginBottom:  '4px',
      }}>
        {title}
      </span>
      {children}
    </div>
  );
}

function SectionLabel({ label, isDark }) {
  return (
    <div style={{
      fontFamily:    'var(--font-mono)',
      fontSize:      '10px',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color:         'var(--color-muted)',
      opacity:       0.45,
      paddingBottom: '8px',
      borderBottom:  `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
      marginBottom:  '12px',
    }}>
      {label}
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function BudgetBuddiIA() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const divider = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

  return (
    <div style={{
      marginTop:    'var(--space-5)',
      marginBottom: 'var(--space-5)',
      borderRadius: 'var(--radius-lg)',
      border:       `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}`,
      background:   isDark ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.01)',
      padding:      '20px',
      display:      'flex',
      flexDirection:'column',
      gap:          '20px',
    }}>

      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      'var(--text-xs)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color:         'var(--color-muted)',
          opacity:       0.6,
        }}>
          BudgetBuddi — Information Architecture
        </span>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {Object.entries(TYPE_META).map(([key, m]) => (
            <span key={key} style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '9px',
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              color:         m.hex,
              opacity:       0.7,
              display:       'flex',
              alignItems:    'center',
              gap:           '4px',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: m.hex, display: 'inline-block' }} />
              {m.label}
            </span>
          ))}
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${divider}` }} />

      {/* ── 1. Entry ── */}
      <div>
        <SectionLabel label="1 — Entry" isDark={isDark} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

          <Block title="Onboarding Gate" accent="#f59e0b" isDark={isDark}>
            <FlowRow isDark={isDark} nodes={[
              { label: 'How do you want to connect your finances?', type: 'decision' },
            ]} />
          </Block>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Block title="Manual Path" accent="#4ade80" isDark={isDark} >
              <FlowRow isDark={isDark} nodes={[
                { label: 'Income',       type: 'action' },
                { label: 'First Bill',   type: 'action' },
                { label: 'Home',         type: 'screen' },
              ]} />
            </Block>
            <Block title="Plaid Path" accent="#38bdf8" isDark={isDark}>
              <FlowRow isDark={isDark} nodes={[
                { label: 'Connect Bank',          type: 'action' },
                { label: 'Review 90-day Txns',    type: 'screen' },
                { label: 'Confirm Recurring Bills',type: 'decision' },
                { label: 'Home',                  type: 'screen' },
              ]} />
            </Block>
          </div>

        </div>
      </div>

      <div style={{ borderTop: `1px solid ${divider}` }} />

      {/* ── 2. Core Navigation ── */}
      <div>
        <SectionLabel label="2 — Core App (Tab Bar)" isDark={isDark} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

          {/* CommandBar — persistent */}
          <Block title="CommandBar — persistent across all tabs" accent="#fb923c" isDark={isDark}>
            <FlowRow isDark={isDark} nodes={[
              { label: 'Natural Language Input', type: 'persistent' },
              { label: 'AI Parse (Claude Haiku)', type: 'ai' },
              { label: 'Confirmation Card',       type: 'screen' },
              { label: 'Log Item',                type: 'action' },
            ]} />
            <FlowRow isDark={isDark} nodes={[
              { label: 'Voice Input',             type: 'persistent' },
              { label: 'AI Parse (Claude Haiku)', type: 'ai' },
              { label: 'Confirmation Card',       type: 'screen' },
              { label: 'Log Item',                type: 'action' },
            ]} />
            <FlowRow isDark={isDark} nodes={[
              { label: 'Shortcut Pills',          type: 'persistent' },
              { label: 'Structured Form',         type: 'screen' },
              { label: 'Log Item',                type: 'action' },
            ]} />
          </Block>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>

            {/* Home */}
            <Block title="Tab — Home" accent="#38bdf8" isDark={isDark}>
              <FlowRow isDark={isDark} nodes={[{ label: 'Spending Overview',    type: 'screen' }]} />
              <FlowRow isDark={isDark} nodes={[{ label: 'Budget Progress',      type: 'screen' }]} />
              <FlowRow isDark={isDark} nodes={[{ label: 'Recent Transactions',  type: 'screen' }]} />
            </Block>

            {/* Bills */}
            <Block title="Tab — Bills & Folders" accent="#38bdf8" isDark={isDark}>
              <FlowRow isDark={isDark} nodes={[{ label: 'Bills List',       type: 'screen' }]} />
              <FlowRow isDark={isDark} nodes={[{ label: 'Smart Folders',    type: 'screen' }]} />
              <FlowRow isDark={isDark} nodes={[{ label: 'Create Folder',    type: 'action' }]} />
            </Block>

            {/* Foresight */}
            <Block title="Tab — Foresight (AI)" accent="#a78bfa" isDark={isDark}>
              <FlowRow isDark={isDark} nodes={[
                { label: 'Choose Methodology',          type: 'decision' },
              ]} />
              <FlowRow isDark={isDark} nodes={[
                { label: 'Setup Wizard',                type: 'screen' },
                { label: 'Claude generates plan',       type: 'ai' },
                { label: 'Plan + Rationale',            type: 'screen' },
              ]} />
              <div style={{
                marginTop:  '6px',
                fontFamily: 'var(--font-mono)',
                fontSize:   '9px',
                color:      'var(--color-muted)',
                opacity:    0.5,
              }}>
                ZBB · 50/30/20 · Pay Yourself First
              </div>
            </Block>

            {/* Insights */}
            <Block title="Tab — Insights" accent="#38bdf8" isDark={isDark}>
              <FlowRow isDark={isDark} nodes={[{ label: 'Spending Patterns (passive)', type: 'screen' }]} />
              <FlowRow isDark={isDark} nodes={[{ label: 'AI Tips (contextual)',         type: 'ai'     }]} />
            </Block>

          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${divider}` }} />

      {/* ── 3. Settings ── */}
      <div>
        <SectionLabel label="3 — Settings & Security" isDark={isDark} />
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Block title="Account" accent="#4ade80" isDark={isDark}>
            <FlowRow isDark={isDark} nodes={[{ label: 'Profile', type: 'screen' }]} />
            <FlowRow isDark={isDark} nodes={[{ label: 'Plaid Connection', type: 'action' }]} />
          </Block>
          <Block title="Security" accent="#f59e0b" isDark={isDark}>
            <FlowRow isDark={isDark} nodes={[{ label: '30-min Inactivity Sign-out', type: 'action' }]} />
            <FlowRow isDark={isDark} nodes={[{ label: 'Server-side Token Storage',  type: 'action' }]} />
          </Block>
        </div>
      </div>

    </div>
  );
}
