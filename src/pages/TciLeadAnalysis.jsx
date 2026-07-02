import { useState, useMemo, useRef } from "react";
import * as XLSX from "xlsx";

/* ---------------- category mappings (lowercase) ---------------- */
const CATS = {
  connected: ["follow up", "to schedule site visit", "first visit", "different requirements", "unmatched budget", "not looking", "purchased from others"],
  followUps: ["follow up", "to schedule site visit", "first visit"],
  dropped: ["different requirements", "ringing not received", "unmatched budget", "wrong/invalid no", "wrong/invalid number", "not looking", "not reachable", "purchased from others"],
  notAnswered: ["not answered"],
  notReachable: ["ringing not received", "not reachable", "wrong/invalid no", "wrong/invalid number"],
  diffReq: ["different requirements", "unmatched budget", "purchased from others"],
  unmatchedBudget: ["unmatched budget"],
  notLooking: ["not looking"],
  purchased: ["purchased from others"],
};

const ROWS = [
  { label: "Total Leads Received", cat: null, tone: "total" },
  { label: "Total Leads Connected", cat: "connected", tone: "good" },
  { label: "Follow Up's", cat: "followUps", tone: "good" },
  { label: "Total Dropped", cat: "dropped", tone: "bad" },
  { label: "Not Answered", cat: "notAnswered", tone: "plain" },
  { label: "Not Reachable", cat: "notReachable", tone: "plain" },
  { label: "Different Requirements", cat: "diffReq", tone: "plain" },
  { label: "Unmatched Budget", cat: "unmatchedBudget", tone: "plain" },
  { label: "Not Looking", cat: "notLooking", tone: "plain" },
  { label: "Purchased from others", cat: "purchased", tone: "plain" },
];

/* ---------------- date helpers (all UTC-midnight Date objects) ---------------- */
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const ord = (n) => { const s = ["th", "st", "nd", "rd"], v = n % 100; return n + (s[(v - 20) % 10] || s[v] || s[0]); };
const addDays = (d, n) => new Date(d.getTime() + n * 86400000);
const toISO = (d) => d.toISOString().slice(0, 10);
const fromISO = (s) => new Date(s + "T00:00:00Z");
const dayLabel = (d, withYear) =>
  `${ord(d.getUTCDate())} ${MONTHS[d.getUTCMonth()]}${withYear ? " " + d.getUTCFullYear() : ""}`;

function parseReceivedOn(v) {
  if (v == null || v === "") return null;
  if (typeof v === "number") {
    const dt = new Date(Math.round((v - 25569) * 86400000));
    return new Date(Date.UTC(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate()));
  }
  const m = String(v).trim().match(/^(\d{1,2})-(\d{1,2})-(\d{4})/);
  if (!m) return null;
  return new Date(Date.UTC(+m[3], +m[2] - 1, +m[1]));
}

/* Monday→Sunday buckets clamped to [start, end].
   First bucket: start → its week's Sunday. Last bucket: its week's Monday → end. */
function buildWeeks(start, end) {
  const weeks = [];
  let cur = start;
  while (cur.getTime() <= end.getTime() && weeks.length < 200) {
    const dow = cur.getUTCDay();               // 0 = Sunday, 1 = Monday …
    const sunday = addDays(cur, (7 - dow) % 7); // this week's Sunday
    const bEnd = sunday.getTime() > end.getTime() ? end : sunday;
    weeks.push({ start: cur, end: bEnd });
    cur = addDays(bEnd, 1);                    // next Monday (or past end)
  }
  const withYear = start.getUTCFullYear() !== end.getUTCFullYear();
  return weeks.map((w) => ({
    ...w,
    label: w.start.getTime() === w.end.getTime()
      ? dayLabel(w.start, withYear)
      : `${dayLabel(w.start, withYear)} to ${dayLabel(w.end, withYear)}`,
  }));
}

/* ---------------- workbook parsing ---------------- */
function parseWorkbook(wb) {
  const campaigns = {};
  let minD = null, maxD = null;
  for (const name of wb.SheetNames) {
    const rows = XLSX.utils.sheet_to_json(wb.Sheets[name], { defval: null, raw: true });
    if (!rows.length) continue;
    const cols = Object.keys(rows[0]).map((c) => c.trim());
    if (!(cols.includes("Sub Source") && cols.includes("Status Reason") && cols.includes("Received On"))) continue;
    const leads = rows
      .map((r) => ({
        sub: String(r["Sub Source"] ?? "").trim().toLowerCase(),
        reason: String(r["Status Reason"] ?? "").trim().toLowerCase(),
        date: parseReceivedOn(r["Received On"]),
      }))
      .filter((l) => l.sub);
    if (!leads.length) continue;
    for (const l of leads) {
      if (!l.date) continue;
      if (!minD || l.date < minD) minD = l.date;
      if (!maxD || l.date > maxD) maxD = l.date;
    }
    campaigns[name.trim()] = { leads, subs: [...new Set(leads.map((l) => l.sub))].sort() };
  }
  return { campaigns, minD, maxD };
}

/* ---------------- styles ---------------- */
const C = {
  ink: "#182338", paper: "#F3F5F2", card: "#FFFFFF", line: "#DDE3DC",
  teal: "#0E7C66", tealSoft: "#E1F0EB", rust: "#A9502B", rustSoft: "#F6E9E1",
  band: "#EDF1EA", mut: "#66707F",
};
const mono = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
const sans = "'Segoe UI', system-ui, -apple-system, sans-serif";

const toneStyle = (tone, isLabel) => {
  if (tone === "total") return { background: C.band, fontWeight: 700 };
  if (tone === "good") return { background: C.tealSoft, fontWeight: isLabel ? 600 : 500 };
  if (tone === "bad") return { background: C.rustSoft, fontWeight: isLabel ? 600 : 500 };
  return {};
};

function Select({ label, value, onChange, options }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 260, flex: 1 }}>
      <span style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: C.mut, fontWeight: 700 }}>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        style={{ padding: "10px 12px", border: `1px solid ${C.line}`, borderRadius: 8, background: "#fff", fontSize: 14, fontFamily: sans, color: C.ink, outline: "none", cursor: "pointer" }}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

function DateInput({ label, value, onChange, min, max }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: C.mut, fontWeight: 700 }}>{label}</span>
      <input type="date" value={value} min={min} max={max} onChange={(e) => onChange(e.target.value)}
        style={{ padding: "9px 12px", border: `1px solid ${C.line}`, borderRadius: 8, fontSize: 14, fontFamily: sans, color: C.ink, background: "#fff" }} />
    </label>
  );
}

function Table({ title, weeks, rows, kind }) {
  const labelCell = { position: "sticky", left: 0, zIndex: 1, background: C.card };
  return (
    <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 3px rgba(24,35,56,0.06)" }}>
      <div style={{ background: C.ink, color: "#fff", padding: "10px 16px", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>{title}</div>
      <div style={{ overflowX: "auto", scrollbarWidth: "thin" }}>
        <table style={{ borderCollapse: "separate", borderSpacing: 0, width: "100%", fontSize: 13.5 }}>
          <thead>
            <tr>
              <th style={{ ...labelCell, textAlign: "left", padding: "10px 14px", borderBottom: `2px solid ${C.ink}`, fontWeight: 700, minWidth: 190 }}></th>
              {weeks.map((w) => (
                <th key={w.label} style={{ padding: "10px 12px", borderBottom: `2px solid ${C.ink}`, fontWeight: 600, fontSize: 12, color: C.ink, minWidth: 118, whiteSpace: "nowrap" }}>{w.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label}>
                <td style={{ ...labelCell, padding: "9px 14px", borderBottom: `1px solid ${C.line}`, whiteSpace: "nowrap", ...toneStyle(r.tone, true), background: toneStyle(r.tone).background || C.card }}>{r.label}</td>
                {r.cells.map((cell, j) => {
                  const pctBar = kind === "pct" && cell.pct != null;
                  return (
                    <td key={j} style={{
                      padding: "9px 12px", textAlign: "right", borderBottom: `1px solid ${C.line}`,
                      fontFamily: mono, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap", ...toneStyle(r.tone, false),
                      background: pctBar
                        ? `linear-gradient(to right, ${r.tone === "bad" ? "rgba(169,80,43,0.16)" : "rgba(14,124,102,0.16)"} ${Math.min(cell.pct, 100)}%, ${toneStyle(r.tone).background || "transparent"} ${Math.min(cell.pct, 100)}%)`
                        : toneStyle(r.tone).background,
                    }}>
                      {cell.text}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function TciLeadAnalysis() {
  const [book, setBook] = useState(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [campaign, setCampaign] = useState("");
  const [sub, setSub] = useState("");
  const [startStr, setStartStr] = useState("");
  const [endStr, setEndStr] = useState("");
  const [range, setRange] = useState(null);
  const [drag, setDrag] = useState(false);
  const inputRef = useRef(null);

  const loadFile = async (file) => {
    setError(""); setRange(null);
    try {
      const buf = await file.arrayBuffer();
      const parsed = parseWorkbook(XLSX.read(buf));
      const names = Object.keys(parsed.campaigns);
      if (!names.length) {
        setError("No campaign sheets found. Each campaign sheet needs the columns Sub Source, Status Reason and Received On.");
        return;
      }
      if (!parsed.minD) {
        setError("No valid Received On dates were found in the file.");
        return;
      }
      setBook(parsed);
      setFileName(file.name);
      setCampaign(names[0]);
      setSub(parsed.campaigns[names[0]].subs[0]);
      setStartStr(toISO(parsed.minD));
      setEndStr(toISO(parsed.maxD));
    } catch {
      setError("That file couldn't be read. Upload the .xlsx report exported from LeadRat.");
    }
  };

  const rangeError = useMemo(() => {
    if (!book || !startStr || !endStr) return "";
    const s = fromISO(startStr), e = fromISO(endStr);
    if (s > e) return "Start date must be on or before the end date.";
    if (s < book.minD || e > book.maxD) return `Dates must be within the data range ${dayLabel(book.minD, true)} to ${dayLabel(book.maxD, true)}.`;
    return "";
  }, [book, startStr, endStr]);

  const applyRange = () => {
    if (rangeError || !startStr || !endStr) return;
    setRange({ start: fromISO(startStr), end: fromISO(endStr) });
  };

  const onCampaign = (c) => { setCampaign(c); setSub(book.campaigns[c].subs[0]); };

  const data = useMemo(() => {
    if (!book || !campaign || !sub || !range) return null;
    const weeks = buildWeeks(range.start, range.end);
    const leads = book.campaigns[campaign].leads.filter((l) => l.sub === sub);
    const numbers = ROWS.map((row) =>
      weeks.map((w) =>
        leads.filter((l) => l.date && l.date >= w.start && l.date <= w.end && (!row.cat || CATS[row.cat].includes(l.reason))).length
      )
    );
    return { weeks, numbers };
  }, [book, campaign, sub, range]);

  const numberRows = data && ROWS.map((r, i) => ({ ...r, cells: data.numbers[i].map((n) => ({ text: n })) }));
  const pctRows = data && ROWS.map((r, i) => ({
    ...r,
    cells: data.numbers[i].map((n, w) => {
      const total = data.numbers[0][w];
      if (i === 0) return { text: n };
      if (!total) return { text: "—" };
      const pct = (n / total) * 100;
      return { text: pct.toFixed(1) + "%", pct };
    }),
  }));
  const totalLeads = data ? data.numbers[0].reduce((a, b) => a + b, 0) : 0;

  return (
    <div style={{ minHeight: "100vh", background: C.paper, fontFamily: sans, color: C.ink }}>
      <div style={{ background: C.ink, color: "#fff", padding: "22px 28px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, letterSpacing: "0.02em" }}>Lead Funnel Analysis</h1>
          <span style={{ fontSize: 12.5, color: "#9FB0C8" }}>Weekly connect &amp; drop breakdown by campaign subsource</span>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 28px 48px", display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) loadFile(f); }}
          onClick={() => inputRef.current?.click()}
          style={{ border: `2px dashed ${drag ? C.teal : C.line}`, background: drag ? C.tealSoft : C.card, borderRadius: 12, padding: book ? "14px 18px" : "42px 18px", textAlign: "center", cursor: "pointer", transition: "all .15s" }}
        >
          <input ref={inputRef} type="file" accept=".xlsx,.xls" style={{ display: "none" }}
            onChange={(e) => { const f = e.target.files[0]; if (f) loadFile(f); e.target.value = ""; }} />
          {book ? (
            <span style={{ fontSize: 13.5 }}>
              <strong>{fileName}</strong>
              <span style={{ color: C.mut }}> · {Object.keys(book.campaigns).length} campaign{Object.keys(book.campaigns).length > 1 ? "s" : ""} loaded · click to replace the file</span>
            </span>
          ) : (
            <>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>Upload the LeadRat report (.xlsx)</div>
              <div style={{ fontSize: 13, color: C.mut }}>Drop the file here or click to browse. Each sheet named after a campaign (Arvind, Godrej…) is detected automatically.</div>
            </>
          )}
        </div>

        {error && <div style={{ background: C.rustSoft, border: `1px solid ${C.rust}`, color: C.rust, borderRadius: 10, padding: "12px 16px", fontSize: 13.5 }}>{error}</div>}

        {book && (
          <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-end" }}>
              <DateInput label="From" value={startStr} onChange={setStartStr} min={toISO(book.minD)} max={toISO(book.maxD)} />
              <DateInput label="To" value={endStr} onChange={setEndStr} min={toISO(book.minD)} max={toISO(book.maxD)} />
              <button onClick={applyRange} disabled={!!rangeError}
                style={{ padding: "10px 22px", background: rangeError ? "#B9C2BC" : C.teal, color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: rangeError ? "not-allowed" : "pointer", fontFamily: sans }}>
                {range ? "Update analysis" : "Show analysis"}
              </button>
              <span style={{ fontSize: 12.5, color: C.mut, paddingBottom: 10 }}>
                Data available: <strong>{dayLabel(book.minD, true)}</strong> to <strong>{dayLabel(book.maxD, true)}</strong>
              </span>
            </div>
            {rangeError && <div style={{ color: C.rust, fontSize: 13 }}>{rangeError}</div>}
            {!range && !rangeError && <div style={{ fontSize: 12.5, color: C.mut }}>Pick a date range to see the weekly tables. Weeks run Monday to Sunday; the first and last columns are trimmed to your chosen dates.</div>}
          </div>
        )}

        {book && range && (
          <>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: "16px 18px" }}>
              <Select label="Campaign" value={campaign} onChange={onCampaign} options={Object.keys(book.campaigns)} />
              <Select label="Campaign SubSource" value={sub} onChange={setSub} options={book.campaigns[campaign].subs} />
              <div style={{ display: "flex", flexDirection: "column", gap: 6, justifyContent: "flex-end" }}>
                <span style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: C.mut, fontWeight: 700 }}>Leads in view</span>
                <span style={{ fontFamily: mono, fontSize: 22, fontWeight: 700, color: C.teal, lineHeight: "38px" }}>{totalLeads}</span>
              </div>
            </div>

            {data && (
              <>
                <Table title={`Numbers — ${data.weeks.length} week${data.weeks.length > 1 ? "s" : ""}`} weeks={data.weeks} rows={numberRows} kind="num" />
                <Table title="Percentage — of total leads received per week" weeks={data.weeks} rows={pctRows} kind="pct" />
                <p style={{ fontSize: 12, color: C.mut, margin: "2px 4px" }}>
                  Columns are Monday-to-Sunday weeks based on the Received On date; slide the tables sideways to see all weeks. Subsources with different capitalisation are treated as one. The Total Leads Received row in the percentage table shows the count, as it is the 100% base.
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
