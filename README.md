# ClaritX forward-tested AI stock-selection record

An append-only public archive of the forward test published at
[claritx.ai/research](https://www.claritx.ai/research).

Pre-registered AI stock-selection strategies, measured **forward** — never
backfilled — against a total-return S&P 500. The rules for each arm were frozen
before its first measured day. **Losing arms are published alongside winning
ones**; a record that keeps only its good months is not a record.

## Why this repository exists

The numbers live on a website that rebuilds every night, so a figure quoted
last month is not the figure on the page today. This repository fixes that.
Twice a day a workflow copies the published files here and commits them if
anything changed. That gives every snapshot:

- **a timestamp and a hash that the publisher cannot rewrite quietly** — a
  restated number shows up as a visible diff in this history, not as a silent
  edit;
- **a stable address to cite** — link a commit, or a monthly edition
  (`edition-YYYY-MM` releases), rather than a page that will change.

## Files

| File | One row per |
|---|---|
| [`data/claritx-forward-test-daily.csv`](data/claritx-forward-test-daily.csv) | strategy arm per trading day — the arm's index and the total-return S&P 500, both rebased to 1.0 at the arm's inception |
| [`data/claritx-forward-test-arms.csv`](data/claritx-forward-test-arms.csv) | strategy arm — inception, total return, S&P 500 over the same window, alpha, information ratio, Sharpe, volatility, max drawdown |
| [`data/claritx-score-bands.csv`](data/claritx-score-bands.csv) | AI score band — every completed analysis scored 0–100 at publication, measured forward |
| [`data/claritx-cohort-history.csv`](data/claritx-cohort-history.csv) | cohort per nightly snapshot — the same measurement re-run and archived each night |
| [`data/claritx-evidence.json`](data/claritx-evidence.json) | the manifest: snapshot date, temporal coverage, row counts, citation |

Returns and alpha are decimals (`0.0916` = 9.16%). Alpha is the arm's return
minus the S&P 500 total return over the same window.

## Reading it honestly

- It is a **forward test of a few months**, not a multi-year backtest. Short
  windows are dominated by the regime they happened to cover.
- Arms are paper portfolios, not traded accounts.
- The score-band table is the one to read first if the question is "does a
  higher AI score mean a better stock?" — and its history in
  `cohort-history.csv` shows how that answer has changed night to night.

Methodology and the live charts: <https://www.claritx.ai/track-record> ·
<https://www.claritx.ai/ai-rank-report>

## How to cite

ClaritX Research Engine, "Forward-tested AI stock-selection record", snapshot
`<snapshot_date>` (commit `<sha>`). https://github.com/Orcules/claritx-forward-test

See [`CITATION.cff`](CITATION.cff). Not investment advice.

## License

Data: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — reuse freely, credit "ClaritX Research Engine" with a link to https://www.claritx.ai/research. Scripts: MIT. See [`LICENSE`](LICENSE).
