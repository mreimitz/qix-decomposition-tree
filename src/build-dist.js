const fs = require('fs');
const path = require('path');

const libsCode = fs.readFileSync(path.join(__dirname, '../dist/libs.js'), 'utf8');

const supernovaCode = `
!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t(require("@nebula.js/stardust")))
    : "function" == typeof define && define.amd
      ? define(["@nebula.js/stardust"], t)
      : ((e = "undefined" != typeof globalThis ? globalThis : e || self)[
          "qixDecompositionTree"
        ] = t(e.stardust));
})(this, function (stardust) {
  "use strict";

  // === Inline bundled libraries ===
  ${libsCode}
  delete globalThis.__extLibs;

  /* ==========================================================
     VERSION 2.0 — Production Decomposition Tree
     ========================================================== */

  // ============================================================
  // CSS
  // ============================================================
  var CSS = [
    // ---- CSS custom properties (themed at runtime) ----
    ":root{--qdt-font:'Source Sans Pro','Segoe UI',sans-serif;--qdt-accent:#009845;--qdt-accent-light:rgba(0,152,69,0.08);--qdt-accent-med:rgba(0,152,69,0.15);--qdt-sel:#009845;--qdt-sel-bg:rgba(0,152,69,0.22);--qdt-sel-border:rgba(0,152,69,0.50);--qdt-text:#404040;--qdt-text-sub:#595959;--qdt-text-dim:#8C8C8C;--qdt-bg:#ffffff;--qdt-bg-alt:#f7f7f7;--qdt-border:#d9d9d9;--qdt-border-light:#e6e6e6;}",

    // Reset & root
    ".qdt{width:100%;height:100%;overflow:hidden;font-family:var(--qdt-font);position:relative;display:flex;flex-direction:column;user-select:none;color:var(--qdt-text);background:transparent;}",
    ".qdt *{box-sizing:border-box;}",

    // Unified header row (positioned elements in canvas)
    ".qdt-ch{position:absolute;display:flex;align-items:center;justify-content:space-between;padding:0 6px;height:26px;font-size:11px;font-weight:600;color:var(--qdt-text-sub);text-transform:uppercase;letter-spacing:0.4px;border-bottom:2px solid var(--qdt-accent);white-space:nowrap;z-index:3;background:var(--qdt-bg);}",
    ".qdt-ch-label{overflow:hidden;text-overflow:ellipsis;flex:1;min-width:0;}",
    ".qdt-ch-x{cursor:pointer;font-size:13px;color:var(--qdt-text-dim);padding:1px 3px;border-radius:2px;line-height:1;flex-shrink:0;transition:color 0.12s,background 0.12s;}",
    ".qdt-ch-x:hover{color:var(--qdt-text);background:rgba(0,0,0,0.06);}",
    ".qdt-ch-arrow{font-size:8px;color:var(--qdt-accent);margin-left:3px;}",

    // Column stripe backgrounds
    ".qdt-stripe{position:absolute;z-index:0;pointer-events:none;}",

    // Body
    ".qdt-body{flex:1;overflow:auto;position:relative;padding:4px 12px;}",

    // Canvas
    ".qdt-canvas{position:relative;min-width:100%;min-height:100%;}",

    // SVG connectors
    ".qdt-svg{position:absolute;top:0;left:0;pointer-events:none;z-index:0;overflow:visible;}",

    // Root node
    ".qdt-root{position:absolute;display:flex;flex-direction:column;align-items:stretch;gap:4px;padding:10px 12px;background:var(--qdt-bg-alt);border:1px solid var(--qdt-border-light);border-radius:4px;z-index:2;}",
    ".qdt-root-measure{font-size:10px;font-weight:600;color:var(--qdt-text-sub);display:flex;align-items:center;gap:3px;cursor:pointer;transition:color 0.15s;}",
    ".qdt-root-measure:hover{color:var(--qdt-accent);}",
    ".qdt-root-arrow{font-size:8px;color:var(--qdt-accent);}",
    ".qdt-root-val{font-size:15px;font-weight:700;color:var(--qdt-text);letter-spacing:-0.3px;}",
    ".qdt-root-bar{height:4px;border-radius:2px;width:100%;}",

    // Column of nodes
    ".qdt-col{position:absolute;display:flex;flex-direction:column;gap:3px;}",

    // Node
    ".qdt-n{display:flex;flex-direction:column;gap:3px;padding:5px 8px;cursor:pointer;position:relative;border-radius:3px;transition:background 0.15s,border-color 0.15s;border:1px solid transparent;}",
    ".qdt-n:hover{background:var(--qdt-accent-light);border-color:var(--qdt-accent-med);}",
    ".qdt-n.exp{background:var(--qdt-accent-light);border-color:var(--qdt-accent-med);}",
    ".qdt-n.sel{background:var(--qdt-sel-bg);border-color:var(--qdt-sel-border);border-left:3px solid var(--qdt-sel);}",
    ".qdt-n.dim-X{opacity:0.25;}",
    ".qdt-n.dim-A{opacity:0.5;}",
    ".qdt-n.qdt-anim-in{animation:qdtSlideIn 0.3s ease-out both;}",

    // Node bar
    ".qdt-n-bt{width:100%;height:4px;background:var(--qdt-border-light);border-radius:2px;overflow:hidden;position:relative;margin-bottom:1px;}",
    ".qdt-n-bf{height:100%;border-radius:3px;transition:width 0.4s cubic-bezier(0.25,0.8,0.25,1);min-width:2px;position:absolute;top:0;}",
    ".qdt-n-bf.pos{left:50%;}",
    ".qdt-n-bf.neg{right:50%;}",
    ".qdt-n-bt.uni .qdt-n-bf{position:relative;left:0;}",

    // Node label & value (sizes driven by --qdt-fs custom property)
    ".qdt-n-lbl{font-size:var(--qdt-fs,12px);color:var(--qdt-text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.35;}",
    ".qdt-n-val{font-size:calc(var(--qdt-fs,12px) - 1px);color:var(--qdt-text-dim);line-height:1.25;}",
    ".qdt-n-pct{font-size:calc(var(--qdt-fs,12px) - 2px);color:var(--qdt-text-dim);line-height:1.25;}",

    // Expand button — small, semi-transparent by default, grows on node hover
    ".qdt-n-exp{position:absolute;right:-10px;top:50%;transform:translateY(-50%);width:16px;height:16px;border-radius:50%;border:1.5px solid var(--qdt-accent);background:var(--qdt-bg);display:flex;align-items:center;justify-content:center;font-size:10px;line-height:1;color:var(--qdt-accent);cursor:pointer;z-index:5;opacity:0.35;transition:opacity 0.2s,width 0.15s,height 0.15s,font-size 0.15s,right 0.15s,background 0.2s,color 0.2s,box-shadow 0.2s;}",
    ".qdt-n:hover .qdt-n-exp{opacity:1;width:20px;height:20px;font-size:12px;right:-11px;}",
    ".qdt-n-exp:hover{background:var(--qdt-accent);color:#fff;box-shadow:0 1px 4px rgba(0,0,0,0.15);}",
    ".qdt-n-exp:active{transform:translateY(-50%) scale(0.92);}",

    // Page arrows
    ".qdt-pg{display:flex;align-items:center;justify-content:center;padding:3px;cursor:pointer;color:var(--qdt-accent);font-size:14px;border-radius:3px;transition:background 0.15s;}",
    ".qdt-pg:hover{background:var(--qdt-accent-light);}",
    ".qdt-pg-info{font-size:10px;color:var(--qdt-text-dim);text-align:center;padding:1px 0;}",

    // Tooltip
    ".qdt-tip{position:fixed;background:#333;color:#fff;padding:8px 12px;border-radius:6px;font-size:12px;pointer-events:none;z-index:9999;max-width:280px;line-height:1.4;box-shadow:0 4px 16px rgba(0,0,0,0.24);font-family:var(--qdt-font);animation:qdtFadeIn 0.15s ease;}",
    ".qdt-tip-lbl{font-weight:600;margin-bottom:3px;font-size:13px;}",
    ".qdt-tip-row{display:flex;justify-content:space-between;gap:12px;}",
    ".qdt-tip-dim{color:#aaa;}",
    ".qdt-tip-val{color:#7ec8e3;}",

    // Dimension picker — Qlik native popover style
    ".qdt-pk{position:fixed;background:var(--qdt-bg);border:1px solid var(--qdt-border);border-radius:4px;box-shadow:0 2px 12px rgba(0,0,0,0.12);padding:0;z-index:10000;min-width:180px;font-family:var(--qdt-font);animation:qdtFadeIn 0.15s ease;overflow:hidden;}",
    ".qdt-pk-title{padding:8px 12px;font-size:12px;font-weight:600;color:var(--qdt-text-sub);border-bottom:1px solid var(--qdt-border-light);background:var(--qdt-bg-alt);}",
    ".qdt-pk-opt{padding:8px 12px;font-size:13px;cursor:pointer;color:var(--qdt-text);transition:background 0.12s;}",
    ".qdt-pk-opt:hover{background:var(--qdt-accent-light);color:var(--qdt-accent);}",

    // Measure dropdown — Qlik native popover style
    ".qdt-mdrop{position:fixed;background:var(--qdt-bg);border:1px solid var(--qdt-border);border-radius:4px;box-shadow:0 2px 12px rgba(0,0,0,0.12);padding:0;z-index:10000;min-width:180px;font-family:var(--qdt-font);animation:qdtFadeIn 0.15s ease;overflow:hidden;}",
    ".qdt-mdrop-opt{padding:8px 12px;font-size:13px;cursor:pointer;color:var(--qdt-text);display:flex;align-items:center;gap:6px;transition:background 0.12s;}",
    ".qdt-mdrop-opt:hover{background:var(--qdt-accent-light);color:var(--qdt-accent);}",
    ".qdt-mdrop-opt.active{font-weight:600;color:var(--qdt-accent);}",
    ".qdt-mdrop-opt.active::before{content:'\\u2713';font-size:12px;}",

    // Empty state
    ".qdt-empty{display:flex;align-items:center;justify-content:center;width:100%;height:100%;color:var(--qdt-text-dim);font-size:14px;text-align:center;flex-direction:column;gap:8px;}",
    ".qdt-empty-icon{font-size:32px;opacity:0.3;}",

    // Selection green bar indicator
    ".qdt-sel-bar{display:flex;align-items:center;gap:4px;padding:3px 8px;background:var(--qdt-sel-bg);border-radius:4px;font-size:11px;color:var(--qdt-sel);flex-shrink:0;}",
    ".qdt-sel-bar-x{cursor:pointer;font-weight:bold;margin-left:4px;font-size:13px;}",
    ".qdt-sel-bar-x:hover{color:#c00;}",

    // Keyframe animations
    "@keyframes qdtSlideIn{from{opacity:0;transform:translateX(-12px);}to{opacity:1;transform:translateX(0);}}",
    "@keyframes qdtFadeIn{from{opacity:0;transform:translateY(-4px);}to{opacity:1;transform:translateY(0);}}",
    "@keyframes qdtDrawConnector{from{stroke-dashoffset:500;}to{stroke-dashoffset:0;}}",

    // SVG connector animation (only on new paths via class)
    ".qdt-svg path.qdt-path-new{stroke-dasharray:500;stroke-dashoffset:0;animation:qdtDrawConnector 0.4s ease-out;}"
  ].join("\\n");

  var cssInjected = false;
  function injectCSS() {
    if (cssInjected) return;
    var s = document.createElement("style");
    s.setAttribute("data-qdt-v2", "1");
    s.textContent = CSS;
    document.head.appendChild(s);
    cssInjected = true;
  }

  function colorLuminance(hex) {
    hex = hex.replace("#","");
    var r = parseInt(hex.slice(0,2),16)/255, g = parseInt(hex.slice(2,4),16)/255, b = parseInt(hex.slice(4,6),16)/255;
    r = r <= 0.03928 ? r/12.92 : Math.pow((r+0.055)/1.055, 2.4);
    g = g <= 0.03928 ? g/12.92 : Math.pow((g+0.055)/1.055, 2.4);
    b = b <= 0.03928 ? b/12.92 : Math.pow((b+0.055)/1.055, 2.4);
    return 0.2126*r + 0.7152*g + 0.0722*b;
  }

  function setAccentColor(s, color) {
    s.setProperty("--qdt-accent", color);
    var r = parseInt(color.slice(1,3),16), g = parseInt(color.slice(3,5),16), b = parseInt(color.slice(5,7),16);
    s.setProperty("--qdt-accent-light", "rgba(" + r + "," + g + "," + b + ",0.08)");
    s.setProperty("--qdt-accent-med", "rgba(" + r + "," + g + "," + b + ",0.18)");
  }

  function applyTheme(element, theme, layout) {
    if (!theme) return;
    var s = element.style;
    // Font from Qlik theme
    try {
      var ff = theme.getStyle("object", "", "fontFamily");
      if (ff) s.setProperty("--qdt-font", ff);
    } catch(e) {}
    // Primary accent — try data color palette, pick first dark-enough color
    try {
      var accentSet = false;
      // Try palette indices 0-12, pick first with luminance < 0.5 (visible against white)
      for (var ci = 0; ci < 13 && !accentSet; ci++) {
        try {
          var c = theme.getColorPickerColor({ index: ci });
          if (c && c.length === 7 && colorLuminance(c) < 0.45) {
            setAccentColor(s, c);
            accentSet = true;
          }
        } catch(ee) {}
      }
      // Fallback: use selection/Qlik green
      if (!accentSet) {
        setAccentColor(s, "#009845");
      }
    } catch(e) {}
    // Selection color from theme dataColors
    try {
      var sel = null;
      if (theme.properties && theme.properties.dataColors && theme.properties.dataColors.selected) {
        sel = theme.properties.dataColors.selected;
      }
      if (!sel) {
        try { sel = theme.getColorPickerColor({ index: -2 }); } catch(ee) {}
      }
      if (sel && sel !== "none" && sel.length === 7) {
        s.setProperty("--qdt-sel", sel);
        var r2 = parseInt(sel.slice(1,3),16), g2 = parseInt(sel.slice(3,5),16), b2 = parseInt(sel.slice(5,7),16);
        s.setProperty("--qdt-sel-bg", "rgba(" + r2 + "," + g2 + "," + b2 + ",0.22)");
        s.setProperty("--qdt-sel-border", "rgba(" + r2 + "," + g2 + "," + b2 + ",0.50)");
      }
    } catch(e) {}
    // Text and background from theme
    try {
      var tc = theme.getStyle("object", "", "color");
      if (tc) {
        s.setProperty("--qdt-text", tc);
        // Derive subdued text variants
        s.setProperty("--qdt-text-sub", tc);
      }
    } catch(e) {}

    // Background: prefer object-level Styling Panel (layout.components), fall back to theme
    var bgResolved = false;
    try {
      if (layout && layout.components) {
        for (var ci2 = 0; ci2 < layout.components.length; ci2++) {
          var comp = layout.components[ci2];
          if (comp.key === "general") {
            var bgDef = comp.background;
            if (bgDef) {
              var bgColor = null;
              // color object from styling panel
              if (bgDef.color && bgDef.color.color && bgDef.color.color !== "none") {
                bgColor = bgDef.color.color;
              }
              // also check colorExpression
              if (!bgColor && bgDef.colorExpression) {
                bgColor = bgDef.colorExpression;
              }
              if (bgColor && bgColor !== "transparent") {
                s.setProperty("--qdt-bg", bgColor);
                bgResolved = true;
              }
            }
            break;
          }
        }
      }
    } catch(e) {}
    // Fallback: try the theme background
    if (!bgResolved) {
      try {
        var bg = theme.getStyle("object", "", "backgroundColor");
        if (bg && bg !== "transparent") {
          s.setProperty("--qdt-bg", bg);
        }
      } catch(e) {}
    }

    // Also detect bg from the parent container element as final fallback
    if (!bgResolved) {
      try {
        var parentEl = element.closest(".qv-object-wrapper") || element.parentElement;
        if (parentEl) {
          var compBg = window.getComputedStyle(parentEl).backgroundColor;
          if (compBg && compBg !== "rgba(0, 0, 0, 0)" && compBg !== "transparent") {
            s.setProperty("--qdt-bg", compBg);
          }
        }
      } catch(e) {}
    }
  }

  // ============================================================
  // Utility helpers
  // ============================================================
  function fmtNum(num, formatter) {
    if (num == null || isNaN(num)) return "-";
    if (formatter) {
      try { return formatter(num); } catch(e) {}
    }
    var abs = Math.abs(num);
    var sign = num < 0 ? "-" : "";
    if (abs >= 1e9) return sign + (abs / 1e9).toFixed(1) + "B";
    if (abs >= 1e6) return sign + (abs / 1e6).toFixed(1) + "M";
    if (abs >= 1e4) return sign + (abs / 1e3).toFixed(1) + "K";
    if (abs >= 1e3) return sign + Number(abs).toLocaleString("en-US", { maximumFractionDigits: 0 });
    if (abs < 1 && abs > 0) return num.toFixed(2);
    return Number(num).toLocaleString("en-US", { maximumFractionDigits: 0 });
  }

  function pctStr(value, total) {
    if (!total || total === 0) return "";
    return (Math.abs(value / total) * 100).toFixed(1) + "%";
  }

  function lerpColor(a, b, t) {
    a = a.replace("#",""); b = b.replace("#","");
    if (a.length===3) a=a[0]+a[0]+a[1]+a[1]+a[2]+a[2];
    if (b.length===3) b=b[0]+b[0]+b[1]+b[1]+b[2]+b[2];
    var ra=parseInt(a.substring(0,2),16),ga=parseInt(a.substring(2,4),16),ba2=parseInt(a.substring(4,6),16);
    var rb=parseInt(b.substring(0,2),16),gb=parseInt(b.substring(2,4),16),bb2=parseInt(b.substring(4,6),16);
    var rr=Math.round(ra+(rb-ra)*t),gg=Math.round(ga+(gb-ga)*t),bbb=Math.round(ba2+(bb2-ba2)*t);
    return "#"+((1<<24)+(rr<<16)+(gg<<8)+bbb).toString(16).slice(1);
  }

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }

  // ============================================================
  // Render dedup & debounce
  // ============================================================
  var _lastFingerprint = "";
  var _debounceTimer = null;

  function computeFingerprint(layout, state) {
    try {
      var hc = layout.qHyperCube || {};
      var dp = (hc.qDataPages && hc.qDataPages[0]) ? hc.qDataPages[0].qArea : {};
      var dims = (hc.qDimensionInfo || []).map(function(d) { return d.qFallbackTitle + d.qStateCounts; }).join("|");
      return JSON.stringify(dp) + dims + JSON.stringify(state.expansions) + JSON.stringify(state.pageStates) + (state.selectedMeasureIdx || 0) + JSON.stringify(layout.props || {});
    } catch(e) { return Math.random().toString(); }
  }

  // ============================================================
  // Layout constants
  // ============================================================
  var COL_WIDTH = 170;
  var COL_GAP = 44;
  var NODE_H = 48;
  var NODE_GAP = 3;
  var ROOT_W = 125;
  var ROOT_H = 64;
  var HEADER_H = 30;
  var PAGE_SIZE = 14;

  // ============================================================
  // Build tree data from HyperCube
  // ============================================================
  function buildTreeData(layout, expansions, selectedMeasureIdx) {
    var hc = layout.qHyperCube;
    if (!hc) return null;

    var dimInfo = hc.qDimensionInfo || [];
    var measureInfo = hc.qMeasureInfo || [];
    var dataPages = hc.qDataPages || [];
    var matrix = dataPages.length > 0 ? dataPages[0].qMatrix : [];

    if (dimInfo.length === 0 || measureInfo.length === 0 || matrix.length === 0) {
      return { columns: [], totalValue: 0, dimInfo: dimInfo, measureInfo: measureInfo, empty: true };
    }

    var numDims = dimInfo.length;
    var mIdx = numDims + (selectedMeasureIdx || 0);
    if (mIdx >= matrix[0].length) mIdx = numDims;

    // Total value (exclude null dimension rows: qElemNumber < 0)
    var totalValue = 0;
    var hasNeg = false;
    for (var i = 0; i < matrix.length; i++) {
      var isNull = false;
      for (var di = 0; di < numDims; di++) {
        if (matrix[i][di].qElemNumber < 0) { isNull = true; break; }
      }
      if (isNull) continue;
      var v = matrix[i][mIdx] ? (matrix[i][mIdx].qNum || 0) : 0;
      totalValue += v;
      if (v < 0) hasNeg = true;
    }

    // Build columns from expansion state
    var exps = expansions || [];
    var activeDimIndices = [];
    if (exps.length > 0) {
      activeDimIndices.push(exps[0].dimIndex != null ? exps[0].dimIndex : 0);
      for (var e = 0; e < exps.length; e++) {
        if (exps[e].nextDimIndex != null && exps[e].nextDimIndex < numDims) {
          activeDimIndices.push(exps[e].nextDimIndex);
        }
      }
    } else if (numDims > 0) {
      activeDimIndices.push(0);
    }

    var columns = [];
    var globalMax = 0;

    for (var c = 0; c < activeDimIndices.length; c++) {
      var dimIdx = activeDimIndices[c];
      var colDimInfo = dimInfo[dimIdx];

      // Filter rows by parent expansions
      var filteredRows = matrix;
      for (var p = 0; p < c; p++) {
        var pDimIdx = activeDimIndices[p];
        var pElemNo = exps[p] ? exps[p].elemNo : null;
        if (pElemNo != null) {
          filteredRows = filteredRows.filter(function(row) {
            return row[pDimIdx].qElemNumber === pElemNo;
          });
        }
      }

      // Aggregate by dimension value
      var aggMap = {};
      var aggOrder = [];
      for (var r = 0; r < filteredRows.length; r++) {
        var cell = filteredRows[r][dimIdx];
        var mCell = filteredRows[r][mIdx];
        var key = cell.qElemNumber;
        if (aggMap[key] === undefined) {
          aggMap[key] = {
            label: cell.qText || "(empty)",
            elemNo: cell.qElemNumber,
            value: 0,
            qText: null,
            state: cell.qState || "O",
            dimIndex: dimIdx,
            attrExps: cell.qAttrExps ? cell.qAttrExps.qValues : null
          };
          aggOrder.push(key);
        }
        var mVal = mCell ? (mCell.qNum || 0) : 0;
        aggMap[key].value += mVal;
        aggMap[key]._rowCount = (aggMap[key]._rowCount || 0) + 1;
        if (mCell && mCell.qText) aggMap[key].qText = mCell.qText;
      }

      var nodes = aggOrder.map(function(k) { return aggMap[k]; });
      // Filter out null/missing dimension values (qElemNumber < 0 means null/-2 or total/-1)
      nodes = nodes.filter(function(nd) { return nd.elemNo >= 0; });
      nodes.sort(function(a, b) { return Math.abs(b.value) - Math.abs(a.value); });

      var colMax = 0;
      for (var n = 0; n < nodes.length; n++) {
        if (Math.abs(nodes[n].value) > colMax) colMax = Math.abs(nodes[n].value);
      }
      if (colMax > globalMax) globalMax = colMax;

      // Parent value for percentage calculation
      var parentValue = totalValue;
      if (c > 0 && exps[c - 1]) {
        // find parent node value
        var prevCol = columns[c - 1];
        if (prevCol) {
          for (var pn = 0; pn < prevCol.nodes.length; pn++) {
            if (prevCol.nodes[pn].elemNo === exps[c - 1].elemNo) {
              parentValue = prevCol.nodes[pn].value;
              break;
            }
          }
        }
      }

      var expandedElemNo = (exps[c] && exps[c].elemNo != null) ? exps[c].elemNo : null;
      var expandedLabel = (exps[c] && exps[c].label) ? exps[c].label : null;

      columns.push({
        dimIndex: dimIdx,
        dimLabel: colDimInfo ? colDimInfo.qFallbackTitle : ("Dim " + dimIdx),
        nodes: nodes,
        colMax: colMax,
        expandedElemNo: expandedElemNo,
        expandedLabel: expandedLabel,
        isLast: c === activeDimIndices.length - 1,
        parentValue: parentValue,
        colIdx: c
      });
    }

    return {
      columns: columns,
      totalValue: totalValue,
      dimInfo: dimInfo,
      measureInfo: measureInfo,
      numDims: numDims,
      activeDimIndices: activeDimIndices,
      hasNeg: hasNeg,
      globalMax: globalMax
    };
  }

  function getAvailableDims(dimInfo, activeDimIndices) {
    var available = [];
    for (var i = 0; i < dimInfo.length; i++) {
      if (activeDimIndices.indexOf(i) === -1) {
        available.push({ index: i, label: dimInfo[i].qFallbackTitle });
      }
    }
    return available;
  }

  // ============================================================
  // Color logic
  // ============================================================
  function getBarColor(value, colMax, settings, globalMax, node) {
    // Color by expression: if node has attribute expression color, use it
    if (settings.colorMode === "expression" && node && node.attrExps && node.attrExps.length > 0) {
      var colorExpr = node.attrExps[0];
      if (colorExpr && colorExpr.qText) return colorExpr.qText;
    }
    if (settings.colorMode === "gradient") {
      var max = settings.barScaling === "global" ? (globalMax || colMax) : colMax;
      if (max === 0) return settings.positiveColor;
      var t = clamp(Math.abs(value) / max, 0, 1);
      return lerpColor(settings.gradientLow, settings.gradientHigh, t);
    }
    return value >= 0 ? settings.positiveColor : settings.negativeColor;
  }

  // ============================================================
  // Tooltip
  // ============================================================
  var _tip = null;
  function showTooltip(e, node, col, totalValue, formatter, settings) {
    hideTooltip();
    _tip = document.createElement("div");
    _tip.className = "qdt-tip";

    var lbl = document.createElement("div");
    lbl.className = "qdt-tip-lbl";
    lbl.textContent = node.label;
    _tip.appendChild(lbl);

    var r1 = document.createElement("div");
    r1.className = "qdt-tip-row";
    var d1 = document.createElement("span");
    d1.className = "qdt-tip-dim";
    d1.textContent = "Value";
    r1.appendChild(d1);
    var v1 = document.createElement("span");
    v1.className = "qdt-tip-val";
    v1.textContent = fmtNum(node.value, formatter);
    r1.appendChild(v1);
    _tip.appendChild(r1);

    // % of parent
    if (col.parentValue && col.parentValue !== 0) {
      var r2 = document.createElement("div");
      r2.className = "qdt-tip-row";
      var d2 = document.createElement("span");
      d2.className = "qdt-tip-dim";
      d2.textContent = "% of parent";
      r2.appendChild(d2);
      var v2 = document.createElement("span");
      v2.className = "qdt-tip-val";
      v2.textContent = pctStr(node.value, col.parentValue);
      r2.appendChild(v2);
      _tip.appendChild(r2);
    }

    // % of total
    if (totalValue !== 0) {
      var r3 = document.createElement("div");
      r3.className = "qdt-tip-row";
      var d3 = document.createElement("span");
      d3.className = "qdt-tip-dim";
      d3.textContent = "% of total";
      r3.appendChild(d3);
      var v3 = document.createElement("span");
      v3.className = "qdt-tip-val";
      v3.textContent = pctStr(node.value, totalValue);
      r3.appendChild(v3);
      _tip.appendChild(r3);
    }

    document.body.appendChild(_tip);
    positionTooltip(e);
  }

  function positionTooltip(e) {
    if (!_tip) return;
    var x = e.clientX + 14;
    var y = e.clientY + 14;
    var tw = _tip.offsetWidth;
    var th = _tip.offsetHeight;
    if (x + tw > window.innerWidth - 8) x = e.clientX - tw - 8;
    if (y + th > window.innerHeight - 8) y = e.clientY - th - 8;
    _tip.style.left = x + "px";
    _tip.style.top = y + "px";
  }

  function hideTooltip() {
    if (_tip) { _tip.remove(); _tip = null; }
  }

  // ============================================================
  // Dimension picker popup
  // ============================================================
  function showDimPicker(anchor, availableDims, callback) {
    closeDimPicker();
    var picker = document.createElement("div");
    picker.className = "qdt-pk";
    picker.setAttribute("data-qdt-pk", "1");

    var title = document.createElement("div");
    title.className = "qdt-pk-title";
    title.textContent = "Drill into\\u2026";
    picker.appendChild(title);

    var rect = anchor.getBoundingClientRect();
    picker.style.top = (rect.bottom + 4) + "px";
    picker.style.left = rect.left + "px";

    for (var d = 0; d < availableDims.length; d++) {
      var opt = document.createElement("div");
      opt.className = "qdt-pk-opt";
      opt.textContent = availableDims[d].label;
      (function(dim) {
        opt.onclick = function(ev) { ev.stopPropagation(); closeDimPicker(); callback(dim.index); };
      })(availableDims[d]);
      picker.appendChild(opt);
    }
    document.body.appendChild(picker);

    // Reposition if offscreen
    requestAnimationFrame(function() {
      var pr = picker.getBoundingClientRect();
      if (pr.right > window.innerWidth - 8) picker.style.left = (window.innerWidth - pr.width - 8) + "px";
      if (pr.bottom > window.innerHeight - 8) picker.style.top = (rect.top - pr.height - 4) + "px";
    });

    setTimeout(function() { document.addEventListener("click", _pkOutside); }, 0);
  }

  function _pkOutside(e) {
    if (e.target.closest && e.target.closest("[data-qdt-pk]")) return;
    closeDimPicker();
  }

  function closeDimPicker() {
    var ex = document.querySelector("[data-qdt-pk]");
    if (ex) ex.remove();
    document.removeEventListener("click", _pkOutside);
  }

  // ============================================================
  // Measure dropdown
  // ============================================================
  function showMeasureDrop(anchor, measureInfo, activeIdx, callback) {
    closeMeasureDrop();
    var drop = document.createElement("div");
    drop.className = "qdt-mdrop";
    drop.setAttribute("data-qdt-mdrop", "1");

    var rect = anchor.getBoundingClientRect();
    drop.style.top = (rect.bottom + 4) + "px";
    drop.style.left = rect.left + "px";

    for (var i = 0; i < measureInfo.length; i++) {
      var opt = document.createElement("div");
      opt.className = "qdt-mdrop-opt" + (i === activeIdx ? " active" : "");
      opt.textContent = measureInfo[i].qFallbackTitle;
      (function(idx) {
        opt.onclick = function(ev) { ev.stopPropagation(); closeMeasureDrop(); callback(idx); };
      })(i);
      drop.appendChild(opt);
    }
    document.body.appendChild(drop);

    requestAnimationFrame(function() {
      var dr = drop.getBoundingClientRect();
      if (dr.right > window.innerWidth - 8) drop.style.left = (window.innerWidth - dr.width - 8) + "px";
      if (dr.bottom > window.innerHeight - 8) drop.style.top = (rect.top - dr.height - 4) + "px";
    });

    setTimeout(function() { document.addEventListener("click", _mdOutside); }, 0);
  }

  function _mdOutside(e) {
    if (e.target.closest && e.target.closest("[data-qdt-mdrop]")) return;
    closeMeasureDrop();
  }

  function closeMeasureDrop() {
    var ex = document.querySelector("[data-qdt-mdrop]");
    if (ex) ex.remove();
    document.removeEventListener("click", _mdOutside);
  }

  // ============================================================
  // RENDER
  // ============================================================
  function renderTree(element, treeData, state, callbacks, settings, formatter, animateFromCol) {
    element.innerHTML = "";

    var root = document.createElement("div");
    root.className = "qdt";
    root.setAttribute("role", "tree");
    root.setAttribute("aria-label", "Decomposition Tree");
    element.appendChild(root);

    if (!treeData || treeData.empty || treeData.columns.length === 0) {
      var empty = document.createElement("div");
      empty.className = "qdt-empty";
      var icon = document.createElement("div");
      icon.className = "qdt-empty-icon";
      icon.textContent = "\\u{1F333}";
      empty.appendChild(icon);
      var msg = document.createElement("div");
      msg.textContent = (!treeData || !treeData.dimInfo || treeData.dimInfo.length === 0)
        ? "Add at least one dimension and one measure"
        : "No data to display";
      empty.appendChild(msg);
      root.appendChild(empty);
      return;
    }

    var exps = state.expansions || [];
    var measureLabel = treeData.measureInfo[state.selectedMeasureIdx || 0]
      ? treeData.measureInfo[state.selectedMeasureIdx || 0].qFallbackTitle
      : "Measure";
    var hasMultipleMeasures = treeData.measureInfo.length > 1;

    // No separate measure bar — headers are all in the canvas

    // --- Body ---
    var body = document.createElement("div");
    body.className = "qdt-body";
    root.appendChild(body);

    var canvas = document.createElement("div");
    canvas.className = "qdt-canvas";
    body.appendChild(canvas);

    // SVG overlay
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "qdt-svg");
    canvas.appendChild(svg);

    // --- Layout computation ---
    var pageStates = state.pageStates || {};
    var pageSize = settings.pageSize || PAGE_SIZE;
    var colW = settings.levelWidth === "compact" ? 140 : settings.levelWidth === "wide" ? 220 : COL_WIDTH;

    // Root node position
    var rootX = 16;
    var firstCol = treeData.columns[0];
    var firstPagedCount = firstCol ? Math.min(firstCol.nodes.length, pageSize) : 0;
    var firstColH = Math.max(firstPagedCount * (NODE_H + NODE_GAP), ROOT_H);
    var rootY = HEADER_H + firstColH / 2 - ROOT_H / 2;

    // Draw root node
    var rootDiv = document.createElement("div");
    rootDiv.className = "qdt-root";
    rootDiv.style.left = rootX + "px";
    rootDiv.style.top = rootY + "px";
    rootDiv.style.width = ROOT_W + "px";

    var rootMeasure = document.createElement("div");
    rootMeasure.className = "qdt-root-measure";
    rootMeasure.textContent = measureLabel;

    if (hasMultipleMeasures) {
      var rootArrow = document.createElement("span");
      rootArrow.className = "qdt-root-arrow";
      rootArrow.textContent = "\\u25BC";
      rootMeasure.appendChild(rootArrow);
      rootMeasure.onclick = function(e) {
        e.stopPropagation();
        showMeasureDrop(rootMeasure, treeData.measureInfo, state.selectedMeasureIdx || 0, callbacks.onMeasureChange);
      };
    }
    rootDiv.appendChild(rootMeasure);

    var rootVal = document.createElement("div");
    rootVal.className = "qdt-root-val";
    rootVal.textContent = fmtNum(treeData.totalValue, formatter);
    rootDiv.appendChild(rootVal);

    var rootBar = document.createElement("div");
    rootBar.className = "qdt-root-bar";
    rootBar.style.background = settings.positiveColor;
    rootDiv.appendChild(rootBar);

    canvas.appendChild(rootDiv);

    // Root header — measure label in the same header band as column headers
    var rootCh = document.createElement("div");
    rootCh.className = "qdt-ch";
    rootCh.style.left = (rootX - 4) + "px";
    rootCh.style.top = "0";
    rootCh.style.width = (ROOT_W + 8) + "px";

    var rootChLabel = document.createElement("span");
    rootChLabel.className = "qdt-ch-label";
    rootChLabel.textContent = measureLabel;
    rootChLabel.style.cursor = hasMultipleMeasures ? "pointer" : "default";
    if (hasMultipleMeasures) {
      var rootChArrow = document.createElement("span");
      rootChArrow.className = "qdt-ch-arrow";
      rootChArrow.textContent = "\\u25BC";
      rootChLabel.appendChild(rootChArrow);
      rootChLabel.onclick = function(e) {
        e.stopPropagation();
        showMeasureDrop(rootChLabel, treeData.measureInfo, state.selectedMeasureIdx || 0, callbacks.onMeasureChange);
      };
    }
    rootCh.appendChild(rootChLabel);
    canvas.appendChild(rootCh);

    // --- Node positions for connectors ---
    var nodeRects = [];  // { colIdx, elemNo, nodeIdx, el }

    // --- Columns ---
    for (var c = 0; c < treeData.columns.length; c++) {
      var col = treeData.columns[c];
      var colX = rootX + ROOT_W + COL_GAP + c * (colW + COL_GAP);
      var colY = HEADER_H;
      var hasNeg = treeData.hasNeg;

      // Column stripe background (alternating)
      if (settings.columnStripes !== "off") {
        var stripe = document.createElement("div");
        stripe.className = "qdt-stripe";
        stripe.style.left = (colX - 8) + "px";
        stripe.style.width = (colW + 16) + "px";
        stripe.style.top = "0";
        stripe.style.bottom = "0";
        var stripeClr = "var(--qdt-accent-light)";
        if (settings.stripeColor && settings.stripeColor.length === 7) {
          var sr = parseInt(settings.stripeColor.slice(1,3),16);
          var sg = parseInt(settings.stripeColor.slice(3,5),16);
          var sb = parseInt(settings.stripeColor.slice(5,7),16);
          stripeClr = "rgba(" + sr + "," + sg + "," + sb + ",0.10)";
        }
        stripe.style.background = (c % 2 === 0) ? stripeClr : "transparent";
        canvas.appendChild(stripe);
      }

      // Column header — positioned above column content
      var chDiv = document.createElement("div");
      chDiv.className = "qdt-ch";
      chDiv.style.left = (colX - 8) + "px";
      chDiv.style.top = "0";
      chDiv.style.width = (colW + 16) + "px";

      var chLabel = document.createElement("span");
      chLabel.className = "qdt-ch-label";
      chLabel.textContent = col.dimLabel;
      chDiv.appendChild(chLabel);

      // Close × on column header (collapses this column's expansion)
      if (treeData.columns.length > 1 || c > 0) {
        var chX = document.createElement("span");
        chX.className = "qdt-ch-x";
        chX.textContent = "\\u00D7";
        (function(ci) {
          function doHeaderClose(ev) {
            ev.stopPropagation();
            ev.preventDefault();
            callbacks.onCollapse(ci - 1);
          }
          chX.addEventListener("mousedown", doHeaderClose, false);
          chX.addEventListener("click", doHeaderClose, false);
        })(c);
        chDiv.appendChild(chX);
      }
      canvas.appendChild(chDiv);

      // Pagination
      var page = pageStates[c] || 0;
      var allNodes = col.nodes;
      var pageStart = page * pageSize;
      var pagedNodes = allNodes.slice(pageStart, pageStart + pageSize);
      var hasMore = allNodes.length > pageStart + pageSize;
      var hasPrev = page > 0;
      var totalPages = Math.ceil(allNodes.length / pageSize);

      // Column div
      var colDiv = document.createElement("div");
      colDiv.className = "qdt-col";
      colDiv.style.left = colX + "px";
      colDiv.style.top = colY + "px";
      colDiv.style.width = colW + "px";

      // Prev arrow
      if (hasPrev) {
        var prevA = document.createElement("div");
        prevA.className = "qdt-pg";
        prevA.textContent = "\\u25B2";
        (function(ci) { prevA.onclick = function() { callbacks.onPageChange(ci, -1); }; })(c);
        colDiv.appendChild(prevA);
      }

      for (var ni = 0; ni < pagedNodes.length; ni++) {
        var node = pagedNodes[ni];
        var isExpanded = col.expandedElemNo === node.elemNo;
        var availDimsForExpand = getAvailableDims(treeData.dimInfo, treeData.activeDimIndices);
        // Can expand: either last column with available dims, or any column where another node could be expanded instead
        var canExpand = (col.isLast && availDimsForExpand.length > 0) || (!col.isLast && !isExpanded);

        var cls = "qdt-n";
        if (isExpanded) cls += " exp";
        if (node.state === "S") cls += " sel";
        if (node.state === "X") cls += " dim-X";
        if (node.state === "A") cls += " dim-A";

        var nodeDiv = document.createElement("div");
        nodeDiv.className = cls;
        nodeDiv.style.width = colW + "px";
        nodeDiv.style.minHeight = NODE_H + "px";
        nodeDiv.setAttribute("role", "treeitem");
        nodeDiv.setAttribute("aria-level", String(c + 1));
        nodeDiv.setAttribute("aria-label", node.label + ", " + fmtNum(node.value, formatter));
        if (canExpand || isExpanded) nodeDiv.setAttribute("aria-expanded", String(isExpanded));
        nodeDiv.setAttribute("tabindex", "0");

        // Bar
        var barTrack = document.createElement("div");
        barTrack.className = "qdt-n-bt" + (hasNeg ? "" : " uni");
        var barFill = document.createElement("div");
        barFill.className = "qdt-n-bf" + (hasNeg ? (node.value >= 0 ? " pos" : " neg") : "");

        // Bar corners
        var barRad = settings.barStyle === "square" ? "0" : "2px";
        barTrack.style.borderRadius = barRad;
        barFill.style.borderRadius = barRad;

        // Bar height — fixed or proportional to value
        var bhMap = { thin: 4, medium: 6, thick: 10, bold: 14 };
        if (settings.barHeight === "byMeasure") {
          var bMax = settings.barScaling === "level" ? col.colMax : (treeData.globalMax || col.colMax);
          var bProp = bMax > 0 ? clamp(Math.abs(node.value) / bMax, 0.08, 1) : 0.1;
          barTrack.style.height = Math.round(bProp * 18 + 2) + "px";
        } else {
          barTrack.style.height = (bhMap[settings.barHeight] || 4) + "px";
        }

        var scaleMax = col.colMax;
        if (settings.barScaling === "global") scaleMax = treeData.globalMax || col.colMax;
        else if (settings.barScaling === "tree") scaleMax = treeData.globalMax || col.colMax;

        var barPct = scaleMax > 0 ? (Math.abs(node.value) / scaleMax * (hasNeg ? 50 : 100)) : 0;
        barFill.style.width = Math.max(barPct, 0.5) + "%";
        barFill.style.background = getBarColor(node.value, col.colMax, settings, treeData.globalMax, node);
        barTrack.appendChild(barFill);
        nodeDiv.appendChild(barTrack);

        // Label
        var label = document.createElement("div");
        label.className = "qdt-n-lbl";
        label.textContent = node.label;
        nodeDiv.appendChild(label);

        // Value — prefer qText only when single row (otherwise it's the last row's text, not aggregated)
        var valDiv = document.createElement("div");
        valDiv.className = "qdt-n-val";
        var valText = fmtNum(node.value, formatter);
        if (settings.showPercentage === "parent" && col.parentValue) {
          valText += "  (" + pctStr(node.value, col.parentValue) + ")";
        } else if (settings.showPercentage === "root" && treeData.totalValue) {
          valText += "  (" + pctStr(node.value, treeData.totalValue) + ")";
        }
        valDiv.textContent = valText;
        nodeDiv.appendChild(valDiv);

        // Expand button
        if (canExpand || isExpanded) {
          var expBtn = document.createElement("div");
          expBtn.className = "qdt-n-exp";
          expBtn.textContent = isExpanded ? "\\u2212" : "+";
          (function(nd, ci, isExp, btn) {
            expBtn.onclick = function(ev) {
              ev.stopPropagation();
              if (isExp) callbacks.onCollapse(ci);
              else callbacks.onExpandClick(nd, ci, btn);
            };
          })(node, c, isExpanded, expBtn);
          nodeDiv.appendChild(expBtn);
        }

        // Tooltip
        (function(nd, co) {
          nodeDiv.onmouseenter = function(ev) { showTooltip(ev, nd, co, treeData.totalValue, formatter, settings); };
          nodeDiv.onmousemove = function(ev) { positionTooltip(ev); };
          nodeDiv.onmouseleave = function() { hideTooltip(); };
        })(node, col);

        // Click for selection
        (function(nd, ci, canExp, isExp, btn) {
          nodeDiv.onclick = function(ev) {
            if (ev.target.closest && ev.target.closest(".qdt-n-exp")) return;
            // Immediate visual feedback: toggle sel class
            this.classList.toggle("sel");
            callbacks.onNodeClick(nd, ci);
          };
          // Keyboard: Enter = select, Right = expand, Left = collapse
          nodeDiv.onkeydown = function(ev) {
            if (ev.key === "Enter" || ev.key === " ") {
              ev.preventDefault();
              this.classList.toggle("sel");
              callbacks.onNodeClick(nd, ci);
            } else if (ev.key === "ArrowRight" && canExp && !isExp && btn) {
              ev.preventDefault();
              callbacks.onExpandClick(nd, ci, btn);
            } else if (ev.key === "ArrowLeft" && isExp) {
              ev.preventDefault();
              callbacks.onCollapse(ci);
            } else if (ev.key === "ArrowDown") {
              ev.preventDefault();
              var next = nodeDiv.nextElementSibling;
              if (next && next.getAttribute("role") === "treeitem") next.focus();
              else if (next && next.nextElementSibling) next.nextElementSibling.focus(); // skip page arrow
            } else if (ev.key === "ArrowUp") {
              ev.preventDefault();
              var prev = nodeDiv.previousElementSibling;
              if (prev && prev.getAttribute("role") === "treeitem") prev.focus();
              else if (prev && prev.previousElementSibling) prev.previousElementSibling.focus();
            }
          };
        })(node, c, canExpand, isExpanded, nodeDiv.querySelector(".qdt-n-exp"));

        // Slide-in animation only for newly expanded columns
        if (animateFromCol >= 0 && c >= animateFromCol) {
          nodeDiv.classList.add("qdt-anim-in");
          nodeDiv.style.animationDelay = (ni * 30) + "ms";
        }

        colDiv.appendChild(nodeDiv);

        nodeRects.push({ colIdx: c, elemNo: node.elemNo, nodeIdx: ni, el: nodeDiv, isExpanded: isExpanded, value: node.value });
      }

      // Next arrow + page info
      if (hasMore) {
        var nextA = document.createElement("div");
        nextA.className = "qdt-pg";
        nextA.textContent = "\\u25BC";
        (function(ci) { nextA.onclick = function() { callbacks.onPageChange(ci, 1); }; })(c);
        colDiv.appendChild(nextA);
      }

      if (totalPages > 1) {
        var pgInfo = document.createElement("div");
        pgInfo.className = "qdt-pg-info";
        pgInfo.textContent = (page + 1) + "/" + totalPages;
        colDiv.appendChild(pgInfo);
      }

      canvas.appendChild(colDiv);
    }

    // --- Canvas size ---
    var totalCols = treeData.columns.length;
    var canvasW = rootX + ROOT_W + COL_GAP + totalCols * (colW + COL_GAP) + 40;
    var maxNodes = 0;
    for (var cc = 0; cc < treeData.columns.length; cc++) {
      var cnt = Math.min(treeData.columns[cc].nodes.length, pageSize);
      if (cnt > maxNodes) maxNodes = cnt;
    }
    var canvasH = HEADER_H + Math.max(maxNodes * (NODE_H + NODE_GAP), ROOT_H) + 50;
    canvas.style.width = canvasW + "px";
    canvas.style.height = canvasH + "px";
    svg.setAttribute("width", canvasW);
    svg.setAttribute("height", canvasH);

    // --- Draw connectors after layout ---
    requestAnimationFrame(function() {
      drawConnectors(canvas, svg, treeData, nodeRects, rootX, rootY, ROOT_W, ROOT_H, settings);
    });
  }

  // ============================================================
  // SVG Bezier connectors
  // ============================================================
  function drawConnectors(canvas, svg, treeData, nodeRects, rootX, rootY, rootW, rootH, settings) {
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    var connActive = settings.connectorColor || "#2E8AB8";
    var connInactive = settings.connectorInactive || "#ccc";
    var cr = canvas.getBoundingClientRect();

    // Base stroke widths from setting
    var cwMap = { thin: [1.5, 0.8], fixed: [2.5, 1.5], thick: [3.5, 2.5] };
    var cwBase = cwMap[settings.connectorWidth] || cwMap["fixed"];
    var isProportional = settings.connectorWidth === "proportional";

    function nodeCenter(colIdx, elemNo) {
      for (var i = 0; i < nodeRects.length; i++) {
        if (nodeRects[i].colIdx === colIdx && nodeRects[i].elemNo === elemNo) {
          var r = nodeRects[i].el.getBoundingClientRect();
          return {
            left: r.left - cr.left,
            right: r.right - cr.left,
            cy: (r.top + r.bottom) / 2 - cr.top
          };
        }
      }
      return null;
    }

    function nodeValue(colIdx, elemNo) {
      for (var i = 0; i < nodeRects.length; i++) {
        if (nodeRects[i].colIdx === colIdx && nodeRects[i].elemNo === elemNo) return Math.abs(nodeRects[i].value || 0);
      }
      return 0;
    }

    function drawPath(sx, sy, ex, ey, active, strokeW) {
      var mx = (sx + ex) / 2;
      var d = "M" + sx + "," + sy + " C" + mx + "," + sy + " " + mx + "," + ey + " " + ex + "," + ey;
      var p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      p.setAttribute("d", d);
      p.setAttribute("fill", "none");
      p.setAttribute("stroke", active ? connActive : connInactive);
      p.setAttribute("stroke-width", strokeW != null ? strokeW : (active ? cwBase[0] : cwBase[1]));
      p.setAttribute("stroke-opacity", active ? 0.8 : 0.35);
      svg.appendChild(p);
    }

    // Root → first column
    if (treeData.columns.length > 0) {
      var rootCx = rootX + rootW;
      var rootCy = rootY + rootH / 2;
      var firstCol = treeData.columns[0];
      var firstColMax = firstCol.colMax || 1;

      for (var n = 0; n < nodeRects.length; n++) {
        if (nodeRects[n].colIdx !== 0) continue;
        var nr = nodeCenter(0, nodeRects[n].elemNo);
        if (!nr) continue;
        var isAct = firstCol.expandedElemNo === nodeRects[n].elemNo;
        var sw = null;
        if (isProportional) {
          var proportion = firstColMax > 0 ? nodeValue(0, nodeRects[n].elemNo) / firstColMax : 0;
          sw = clamp(proportion * 8 + 0.5, 0.5, 8);
        }
        drawPath(rootCx, rootCy, nr.left, nr.cy, isAct, sw);
      }
    }

    // Column N → Column N+1
    for (var c = 0; c < treeData.columns.length - 1; c++) {
      var col = treeData.columns[c];
      if (col.expandedElemNo == null) continue;
      var parentRect = nodeCenter(c, col.expandedElemNo);
      if (!parentRect) continue;
      var nextCol = treeData.columns[c + 1];
      var nextColMax = nextCol ? nextCol.colMax : 1;

      for (var nn = 0; nn < nodeRects.length; nn++) {
        if (nodeRects[nn].colIdx !== c + 1) continue;
        var childRect = nodeCenter(c + 1, nodeRects[nn].elemNo);
        if (!childRect) continue;
        var isActive = nextCol && nextCol.expandedElemNo === nodeRects[nn].elemNo;
        var sw2 = null;
        if (isProportional) {
          var prop2 = nextColMax > 0 ? nodeValue(c + 1, nodeRects[nn].elemNo) / nextColMax : 0;
          sw2 = clamp(prop2 * 8 + 0.5, 0.5, 8);
        }
        drawPath(parentRect.right + 12, parentRect.cy, childRect.left, childRect.cy, isActive, sw2);
      }
    }
  }

  // ============================================================
  // Property Panel
  // ============================================================
  function propertyPanel() {
    return {
      definition: {
        type: "items",
        component: "accordion",
        items: {
          data: {
            uses: "data",
            items: {
              dimensions: {
                uses: "dimensions",
                min: 1,
                max: 20,
                description: function(d) {
                  return d.qDef && d.qDef.qFieldDefs && d.qDef.qFieldDefs[0] ? d.qDef.qFieldDefs[0] : (d.qLibraryId ? "Master dimension" : "");
                }
              },
              measures: {
                uses: "measures",
                min: 1,
                max: 4
              }
            }
          },
          sorting: { uses: "sorting" },
          appearance: {
            uses: "settings",
            items: {
              presentation: {
                type: "items",
                translation: "properties.presentation",
                grouped: true,
                items: {
                  styleEditor: {
                    component: "styling-panel",
                    chartTitle: "Object.QixDecompositionTree",
                    translation: "LayerStyleEditor.component.styling",
                    subtitle: "LayerStyleEditor.component.styling",
                    ref: "components",
                    useGeneral: true,
                    useBackground: true,
                    items: {}
                  }
                }
              },
              layout: {
                type: "items",
                label: "Layout",
                items: {
                  fontSize: {
                    ref: "props.fontSize",
                    label: "Font size",
                    type: "string",
                    component: "dropdown",
                    defaultValue: "medium",
                    options: [
                      { value: "small", label: "Small (11px)" },
                      { value: "medium", label: "Medium (12px)" },
                      { value: "large", label: "Large (13px)" },
                      { value: "xlarge", label: "Extra large (14px)" }
                    ]
                  },
                  levelWidth: {
                    ref: "props.levelWidth",
                    label: "Column width",
                    type: "string",
                    component: "dropdown",
                    defaultValue: "normal",
                    options: [
                      { value: "compact", label: "Compact (140px)" },
                      { value: "normal", label: "Normal (170px)" },
                      { value: "wide", label: "Wide (220px)" }
                    ]
                  },
                  barStyle: {
                    ref: "props.barStyle",
                    label: "Bar corners",
                    type: "string",
                    component: "dropdown",
                    defaultValue: "rounded",
                    options: [
                      { value: "rounded", label: "Rounded" },
                      { value: "square", label: "Square" }
                    ]
                  },
                  barHeight: {
                    ref: "props.barHeight",
                    label: "Bar height",
                    type: "string",
                    component: "dropdown",
                    defaultValue: "thin",
                    options: [
                      { value: "thin", label: "Thin (4px)" },
                      { value: "medium", label: "Medium (6px)" },
                      { value: "thick", label: "Thick (10px)" },
                      { value: "bold", label: "Bold (14px)" },
                      { value: "byMeasure", label: "Proportional to measure" }
                    ]
                  },
                  barScaling: {
                    ref: "props.barScaling",
                    label: "Bar scaling",
                    type: "string",
                    component: "dropdown",
                    defaultValue: "level",
                    options: [
                      { value: "level", label: "Per level (column max)" },
                      { value: "tree", label: "Per tree (global max)" },
                      { value: "global", label: "Relative to root" }
                    ]
                  },
                  connectorWidth: {
                    ref: "props.connectorWidth",
                    label: "Connector thickness",
                    type: "string",
                    component: "dropdown",
                    defaultValue: "fixed",
                    options: [
                      { value: "thin", label: "Thin (1px)" },
                      { value: "fixed", label: "Normal (2px)" },
                      { value: "thick", label: "Thick (3.5px)" },
                      { value: "proportional", label: "Proportional to value" }
                    ]
                  },
                  pageSize: {
                    ref: "props.pageSize",
                    label: "Nodes per page",
                    type: "number",
                    defaultValue: 14,
                    min: 5,
                    max: 50
                  },
                  showPercentage: {
                    ref: "props.showPercentage",
                    label: "Show percentage",
                    type: "string",
                    component: "dropdown",
                    defaultValue: "off",
                    options: [
                      { value: "off", label: "Off" },
                      { value: "parent", label: "% of parent" },
                      { value: "root", label: "% of total" }
                    ]
                  },
                  columnStripes: {
                    ref: "props.columnStripes",
                    label: "Column stripes",
                    type: "string",
                    component: "dropdown",
                    defaultValue: "on",
                    options: [
                      { value: "on", label: "On" },
                      { value: "off", label: "Off" }
                    ]
                  }
                }
              },
              colors: {
                type: "items",
                label: "Colors",
                items: {
                  accentColor: {
                    ref: "props.accentColor",
                    label: "Accent color (buttons, headers)",
                    type: "object",
                    component: "color-picker",
                    defaultValue: { color: "#009845", index: -1 }
                  },
                  stripeColor: {
                    ref: "props.stripeColor",
                    label: "Column stripe color",
                    type: "object",
                    component: "color-picker",
                    defaultValue: { color: "", index: -1 },
                    show: function(d) { return d.props && d.props.columnStripes !== "off"; }
                  },
                  colorMode: {
                    ref: "props.colorMode",
                    label: "Color mode",
                    type: "string",
                    component: "dropdown",
                    defaultValue: "single",
                    options: [
                      { value: "single", label: "Single color" },
                      { value: "gradient", label: "Gradient by value" },
                      { value: "expression", label: "By expression" }
                    ]
                  },
                  positiveColor: {
                    ref: "props.positiveColor",
                    label: "Positive / primary color",
                    type: "object",
                    component: "color-picker",
                    defaultValue: { color: "#2E8AB8", index: -1 }
                  },
                  negativeColor: {
                    ref: "props.negativeColor",
                    label: "Negative color",
                    type: "object",
                    component: "color-picker",
                    defaultValue: { color: "#C94D68", index: -1 },
                    show: function(d) { return !d.props || d.props.colorMode !== "gradient"; }
                  },
                  gradientLow: {
                    ref: "props.gradientLow",
                    label: "Gradient low",
                    type: "object",
                    component: "color-picker",
                    defaultValue: { color: "#E8F4FD", index: -1 },
                    show: function(d) { return d.props && d.props.colorMode === "gradient"; }
                  },
                  gradientHigh: {
                    ref: "props.gradientHigh",
                    label: "Gradient high",
                    type: "object",
                    component: "color-picker",
                    defaultValue: { color: "#1A6FA0", index: -1 },
                    show: function(d) { return d.props && d.props.colorMode === "gradient"; }
                  },
                  connectorColor: {
                    ref: "props.connectorColor",
                    label: "Active connector",
                    type: "object",
                    component: "color-picker",
                    defaultValue: { color: "#2E8AB8", index: -1 }
                  },
                  connectorInactive: {
                    ref: "props.connectorInactive",
                    label: "Inactive connector",
                    type: "object",
                    component: "color-picker",
                    defaultValue: { color: "#cccccc", index: -1 }
                  }
                }
              }
            }
          }
        }
      },
      support: { snapshot: true, export: true, exportData: true, sharing: true, selection: true }
    };
  }

  // ============================================================
  // Expansion state helpers
  // ============================================================
  function persistExpansionState(model, expansions) {
    if (!model || !model.applyPatches) return;
    try {
      model.applyPatches([{
        qPath: "/expansionState",
        qOp: "replace",
        qValue: JSON.stringify(expansions)
      }], true);
    } catch(e) {}
  }

  function doExpand(node, colIdx, nextDimIndex, currentExpansions, model, setState) {
    var newExp = currentExpansions.slice(0, colIdx);
    newExp.push({
      dimIndex: currentExpansions[colIdx] ? currentExpansions[colIdx].dimIndex : (colIdx === 0 ? 0 : currentExpansions[colIdx-1].nextDimIndex),
      elemNo: node.elemNo,
      label: node.label,
      nextDimIndex: nextDimIndex
    });
    persistExpansionState(model, newExp);
    setState(function(prev) { return Object.assign({}, prev, { expansions: newExp, _seeded: true }); });
  }

  // ============================================================
  // Supernova Factory
  // ============================================================
  return function (env) {
    return {
      qae: {
        properties: {
          qHyperCubeDef: {
            qDimensions: [],
            qMeasures: [],
            qInitialDataFetch: [{ qWidth: 10, qHeight: 1000 }],
            qSuppressZero: false,
            qSuppressMissing: true
          },
          props: {
            colorMode: "single",
            positiveColor: { color: "#2E8AB8", index: -1 },
            negativeColor: { color: "#C94D68", index: -1 },
            gradientLow: { color: "#E8F4FD", index: -1 },
            gradientHigh: { color: "#1A6FA0", index: -1 },
            connectorColor: { color: "#2E8AB8", index: -1 },
            connectorInactive: { color: "#cccccc", index: -1 },
            accentColor: { color: "#009845", index: -1 },
            stripeColor: { color: "", index: -1 },
            fontSize: "medium",
            barStyle: "rounded",
            barHeight: "thin",
            connectorWidth: "fixed",
            barScaling: "level",
            levelWidth: "normal",
            pageSize: 14,
            showPercentage: "off",
            columnStripes: "on"
          },
          expansionState: [],
          selectedMeasureIdx: 0
        },
        data: {
          targets: [{
            path: "/qHyperCubeDef",
            dimensions: { min: 1, max: 20 },
            measures: { min: 1, max: 4 }
          }]
        }
      },
      ext: propertyPanel(),
      component: function () {
        var element = stardust.useElement();
        var layout = stardust.useLayout();
        var model = stardust.useModel();
        var constraints = stardust.useConstraints();
        var selectionAPI = stardust.useSelections();
        var theme = stardust.useTheme();

        var _state = stardust.useState({ expansions: [], pageStates: {}, selectedMeasureIdx: 0, _seeded: false });
        var state = _state[0];
        var setState = _state[1];

        // ---- Render directly in component body (stardust 6.8+ calls component on every update) ----
        try {
          injectCSS();
          applyTheme(element, theme, layout);

          // Auto-fix oversized qInitialDataFetch (one-time)
          if (!element.__qdtAutoFixed && model && model.getProperties) {
            element.__qdtAutoFixed = true;
            model.getProperties().then(function(props) {
              var hcDef = props.qHyperCubeDef;
              if (hcDef && hcDef.qInitialDataFetch && hcDef.qInitialDataFetch.length > 0) {
                var f = hcDef.qInitialDataFetch[0];
                if ((f.qWidth || 0) * (f.qHeight || 0) > 10000) {
                  hcDef.qInitialDataFetch = [{ qWidth: 10, qHeight: 1000 }];
                  model.setProperties(props);
                }
              }
            }).catch(function(){});
          }

          var props = layout.props || {};
          var settings = {
            colorMode: props.colorMode || "single",
            positiveColor: (props.positiveColor && props.positiveColor.color) || "#2E8AB8",
            negativeColor: (props.negativeColor && props.negativeColor.color) || "#C94D68",
            gradientLow: (props.gradientLow && props.gradientLow.color) || "#E8F4FD",
            gradientHigh: (props.gradientHigh && props.gradientHigh.color) || "#1A6FA0",
            connectorColor: (props.connectorColor && props.connectorColor.color) || "#2E8AB8",
            connectorInactive: (props.connectorInactive && props.connectorInactive.color) || "#ccc",
            accentColor: (props.accentColor && props.accentColor.color) || "",
            stripeColor: (props.stripeColor && props.stripeColor.color) || "",
            fontSize: props.fontSize || "medium",
            barStyle: props.barStyle || "rounded",
            barHeight: props.barHeight || "thin",
            connectorWidth: props.connectorWidth || "fixed",
            barScaling: props.barScaling || "level",
            levelWidth: props.levelWidth || "normal",
            pageSize: props.pageSize || 14,
            showPercentage: props.showPercentage || "off",
            columnStripes: props.columnStripes || "on"
          };

          // Apply accent color override from property panel (overrides theme)
          if (settings.accentColor && settings.accentColor.length === 7) {
            setAccentColor(element.style, settings.accentColor);
          }

          // Apply font size
          var fsPx = { small: "11px", medium: "12px", large: "13px", xlarge: "14px" };
          element.style.setProperty("--qdt-fs", fsPx[settings.fontSize] || "12px");

          var expansions = state.expansions;
          if (!state._seeded && state.expansions.length === 0 && layout.expansionState && layout.expansionState.length > 0) {
            expansions = layout.expansionState;
            setState(function(prev) { return Object.assign({}, prev, { expansions: layout.expansionState, _seeded: true }); });
          }

          var mIdx = layout.selectedMeasureIdx || state.selectedMeasureIdx || 0;
          var treeData = buildTreeData(layout, expansions, mIdx);

          var formatter = null;

          var callbacks = {
            onNodeClick: function(node, colIdx) {
              if (constraints && constraints.active) return;
              if (selectionAPI && !selectionAPI.isActive()) {
                selectionAPI.begin("/qHyperCubeDef");
              }
              if (selectionAPI) {
                selectionAPI.select({
                  method: "selectHyperCubeValues",
                  params: ["/qHyperCubeDef", node.dimIndex, [node.elemNo], true]
                });
              }
            },
            onExpandClick: function(node, colIdx, anchor) {
              if (colIdx < expansions.length && expansions[colIdx]) {
                var nextDim = expansions[colIdx].nextDimIndex;
                doExpand(node, colIdx, nextDim, expansions, model, setState);
                return;
              }
              var availDims = getAvailableDims(treeData.dimInfo, treeData.activeDimIndices);
              if (availDims.length === 0) return;
              if (availDims.length === 1) {
                doExpand(node, colIdx, availDims[0].index, expansions, model, setState);
              } else {
                showDimPicker(anchor, availDims, function(dimIndex) {
                  doExpand(node, colIdx, dimIndex, expansions, model, setState);
                });
              }
            },
            onCollapse: function(colIdx) {
              var newExp = colIdx <= 0 ? [] : expansions.slice(0, colIdx);
              persistExpansionState(model, newExp);
              setState(function(prev) { return Object.assign({}, prev, { expansions: newExp, pageStates: {}, _seeded: true }); });
            },
            onPageChange: function(colIdx, direction) {
              setState(function(prev) {
                var ps = Object.assign({}, prev.pageStates);
                ps[colIdx] = Math.max(0, (ps[colIdx] || 0) + direction);
                return Object.assign({}, prev, { pageStates: ps });
              });
            },
            onMeasureChange: function(idx) {
              setState(function(prev) { return Object.assign({}, prev, { selectedMeasureIdx: idx }); });
              if (model && model.applyPatches) {
                try {
                  model.applyPatches([{
                    qPath: "/selectedMeasureIdx",
                    qOp: "replace",
                    qValue: JSON.stringify(idx)
                  }], true);
                } catch(e3) {}
              }
            }
          };

          // Fingerprint dedup — skip render if nothing changed
          var fp = computeFingerprint(layout, state);
          if (fp === _lastFingerprint && element.querySelector(".qdt")) {
            return; // DOM already up-to-date
          }
          _lastFingerprint = fp;

          // Compute which columns should animate (only newly added ones)
          var prevExpCount = element.__qdtLastExpCount || 0;
          var curExpCount = treeData ? treeData.columns.length : 0;
          var animateFromCol = curExpCount > prevExpCount ? prevExpCount : -1;

          renderTree(element, treeData, {
            expansions: expansions,
            pageStates: state.pageStates,
            selectedMeasureIdx: mIdx
          }, callbacks, settings, formatter, animateFromCol);

          // Update element-stored expansion count AFTER render
          element.__qdtLastExpCount = curExpCount;

        } catch(renderErr) {
          console.error('[QDT] Render error:', renderErr);
          element.innerHTML = '<div style="color:red;padding:20px;font-size:14px;">QDT Error: ' + renderErr.message + '</div>';
        }
      }
    };
  };
});
`;

fs.mkdirSync(path.join(__dirname, '../dist'), { recursive: true });
fs.writeFileSync(path.join(__dirname, '../dist/qix-decomposition-tree.js'), supernovaCode);
console.log('Built dist/qix-decomposition-tree.js — v2.0');
