/* ---------- data ---------- */
    const COMMON_CC = ["fever", "breathlessness", "cough", "chest pain", "palpitations",
      "abdominal pain", "vomiting", "loose stools", "decreased urine output", "pedal edema",
      "giddiness", "headache", "altered sensorium", "seizures", "loss of consciousness",
      "weakness of limbs", "yellowish discolouration of eyes", "decreased appetite",
      "hematemesis", "melena", "burning micturition"];
    const COMMON_LABS = ["Hb", "TC", "DC", "Platelet", "PCV", "ESR", "Urea", "Creatinine", "Na", "K",
      "Cl", "HCO3", "RBS", "FBS", "PPBS", "HbA1c", "T.Bilirubin", "D.Bilirubin", "SGOT", "SGPT", "ALP",
      "T.Protein", "Albumin", "PT", "INR", "aPTT", "TSH", "Ca", "PO4", "Mg", "CRP", "Troponin"];
    const PANELS = {
      "CBC": ["Hb", "TC", "DC", "Platelet", "PCV"],
      "RFT": ["Urea", "Creatinine", "Na", "K", "Cl"],
      "LFT": ["T.Bilirubin", "D.Bilirubin", "SGOT", "SGPT", "ALP", "T.Protein", "Albumin"],
      "Coagulation": ["PT", "INR", "aPTT"],
      "Sugar": ["RBS", "HbA1c"]
    };
    const COMMON_DRUGS = ["Inj. Ceftriaxone", "Inj. Piperacillin-Tazobactam", "Inj. Meropenem",
      "Inj. Doxycycline", "Tab. Doxycycline", "Tab. Azithromycin", "Inj. Pantoprazole", "Tab. Pantoprazole",
      "Inj. Ondansetron", "Inj. Paracetamol", "Tab. Paracetamol", "Inj. Metronidazole", "Tab. Metformin",
      "Inj. Insulin (HAI)", "Inj. Furosemide", "Tab. Furosemide", "Tab. Aspirin", "Tab. Atorvastatin",
      "Tab. Clopidogrel", "Tab. Amlodipine", "Tab. Telmisartan", "Inj. Hydrocortisone", "Neb. Ipravent",
      "Neb. Budecort", "Inj. Vitamin K", "Inj. Thiamine", "Tab. Ecosprin", "Tab. Pan 40"];
    const COMMON_COND = ["Stable", "Improved", "Symptomatically better", "Hemodynamically stable",
      "Afebrile and stable", "Discharged at request", "Discharged against medical advice"];
    const COMMON_PAST = ["K/C/O T2DM on medication", "K/C/O Systemic Hypertension on medication",
      "K/C/O CAD", "K/C/O CVA", "K/C/O Epilepsy", "K/C/O Bronchial Asthma/COPD", "K/C/O CKD",
      "K/C/O Koch's disease (TB) — treated", "K/C/O Chronic Liver Disease", "K/C/O Hypothyroidism",
      "No significant past history"];

    const RX_BUNDLES = {
      "CAD": ["Tab. Aspirin 75 mg OD (continue)", "Tab. Clopidogrel 75 mg OD × 12 months", "Tab. Atorvastatin 40 mg HS (continue)", "Tab. Metoprolol 25 mg BD (continue)", "Tab. Ramipril 2.5 mg OD (continue)", "Tab. Sorbitrate 5 mg SL SOS (for chest pain)"],
      "HFrEF": ["Tab. Furosemide 40 mg BD (continue)", "Tab. Sacubitril-Valsartan 50 mg BD (continue)", "Tab. Carvedilol 3.125 mg BD (continue)", "Tab. Spironolactone 25 mg OD (continue)", "Tab. Dapagliflozin 10 mg OD (continue)"],
      "COPD": ["MDI Budesonide-Formoterol 1 puff BD (continue)", "MDI Tiotropium 1 puff OD (continue)", "Tab. Prednisolone 40 mg OD × 5 days", "Tab. Pantoprazole 40 mg OD × 5 days"],
      "CAP": ["Tab. Cefpodoxime 200 mg BD × 5 days", "Tab. Azithromycin 500 mg OD × 3 days", "Tab. Paracetamol 650 mg TDS SOS × 3 days", "Tab. Pantoprazole 40 mg OD × 5 days"],
      "T2DM": ["Tab. Metformin 500 mg BD (continue)", "Tab. Glimepiride 1 mg OD before breakfast (continue)", "GRBS monitoring + diabetic diet"],
      "SHTN": ["Tab. Amlodipine 5 mg OD (continue)", "Tab. Telmisartan 40 mg OD (continue)", "Tab. Chlorthalidone 12.5 mg OD (continue)", "Home BP monitoring"]
    };

    const TX_BUNDLES = {
      "CAD": ["Tab. Aspirin 75 mg PO OD", "Tab. Clopidogrel 75 mg PO OD", "Tab. Atorvastatin 40 mg PO HS", "Tab. Metoprolol 25 mg PO BD", "Tab. Ramipril 2.5 mg PO OD", "Inj. Enoxaparin 0.6 mL SC BD", "Tab. Nitroglycerin 0.5 mg SL SOS"],
      "HFrEF": ["Inj. Furosemide 40 mg IV BD", "Tab. Sacubitril-Valsartan 50 mg PO BD", "Tab. Carvedilol 3.125 mg PO BD", "Tab. Spironolactone 25 mg PO OD", "Tab. Dapagliflozin 10 mg PO OD"],
      "COPD": ["Neb. Ipratropium-Salbutamol Q6H", "Neb. Budesonide BD", "Inj. Hydrocortisone 100 mg IV Q8H", "Inj. Ceftriaxone 1 g IV BD", "Tab. Pantoprazole 40 mg PO OD", "Controlled O2 to target SpO2 88–92%"],
      "CAP": ["Inj. Ceftriaxone 1 g IV BD", "Tab. Azithromycin 500 mg PO OD", "Inj. Paracetamol 1 g IV SOS", "Tab. Pantoprazole 40 mg PO OD"],
      "T2DM": ["Inj. Insulin (HAI) SC TDS (pre-meal / sliding scale)", "Tab. Metformin 500 mg PO BD", "GRBS monitoring QID"],
      "SHTN": ["Tab. Amlodipine 5 mg PO OD", "Tab. Telmisartan 40 mg PO OD", "Tab. Chlorthalidone 12.5 mg PO OD", "BP monitoring"]
    };

    const COURSE_TEMPLATES = [
      { label: "Dengue", text: `Patient admitted with above complaints. On evaluation found to have thrombocytopenia with [NS1/IgM] positivity, suggestive of Dengue fever [with/without warning signs]. Managed with IV fluids as per dengue protocol, antipyretics and serial platelet monitoring. Platelet count reached a nadir of [___] on [__/__] and subsequently improved. Patient remained hemodynamically stable, became afebrile with improving counts, and is being discharged in a stable condition.` },
      { label: "LRTI / CAP", text: `Patient admitted with above complaints. Clinically and radiologically diagnosed as Community-acquired pneumonia (LRTI). Started on IV antibiotics, nebulisation, antipyretics and supportive care. Saturation monitored and maintained [on room air / with O2 support]. Symptomatically improved — afebrile, breathlessness settled, maintaining saturation on room air — and is being discharged in a stable condition with oral antibiotics to complete the course.` },
      { label: "AGE w/ dehydration", text: `Patient admitted with above complaints with features of [mild/moderate] dehydration, diagnosed as Acute gastroenteritis with dehydration. Rehydrated with IV fluids, given antiemetics, [antibiotics] and supportive care. Electrolytes monitored and corrected. Stool frequency reduced, tolerating orals well, and is being discharged in a stable condition.` },
      { label: "CKD", text: `Patient admitted with above complaints. [Known/Newly detected] Chronic kidney disease (Stage [__]). Evaluated with RFT, electrolytes, urine analysis and USG abdomen. Managed with fluid and salt restriction, [diuretics], correction of electrolyte and acid-base derangements and supportive care. [Nephrology opinion obtained.] Symptomatically improved, hemodynamically stable, and is being discharged in a stable condition with renal diet advice and follow-up.` },
      { label: "Tropical fever", text: `Patient admitted with above complaints. Evaluated for acute febrile illness — septic screen, dengue / leptospira / scrub typhus serology and peripheral smear sent. Started on empirical [doxycycline/ceftriaxone] with antipyretics and supportive care. [Scrub typhus/leptospirosis] [confirmed/considered clinically]. Became afebrile with treatment, remained hemodynamically stable, and is being discharged in a stable condition.` },
      { label: "COPD exac.", text: `Patient, a known case of COPD, admitted with acute exacerbation. Managed with nebulised bronchodilators, systemic steroids, antibiotics, controlled oxygen and [NIV / BiPAP support]. Breathlessness improved, maintaining saturation on room air, and is being discharged in a stable condition with inhaler technique advice.` },
      { label: "DKA", text: `Patient admitted with above complaints, found to have hyperglycemia with ketosis and metabolic acidosis suggestive of Diabetic ketoacidosis. Managed with IV fluids, insulin infusion and potassium monitoring as per DKA protocol. Blood sugars and anion gap normalised; transitioned to subcutaneous insulin. Tolerating orals, stable, and is being discharged with insulin / OHA and diabetic diet advice.` },
      { label: "ACS", text: `Patient admitted with above complaints. ECG and cardiac markers suggestive of [STEMI / NSTEMI / Unstable angina]. Managed as Acute coronary syndrome with antiplatelets, statin, anticoagulation and supportive care. Cardiology opinion obtained; [thrombolysed / advised coronary angiogram]. Hemodynamically stable, chest pain settled, and is being discharged in a stable condition on cardiac medications.` },
      { label: "CVA / Stroke", text: `Patient admitted with above complaints. CT / MRI brain suggestive of [ischemic / hemorrhagic] stroke. Managed with [antiplatelets / anti-edema measures], physiotherapy and supportive care. Neurology opinion obtained. Vitals stable, [neurological deficit improving], and is being discharged in a stable condition with physiotherapy and follow-up advice.` },
      { label: "UTI / Pyelo", text: `Patient admitted with above complaints. Urine analysis and culture suggestive of [urinary tract infection / pyelonephritis]. Started on IV antibiotics [as per sensitivity], antipyretics and adequate hydration. Became afebrile with treatment, symptomatically improved, and is being discharged in a stable condition with oral antibiotics to complete the course.` },
      { label: "ALD / Hepatitis", text: `Patient, [chronic alcoholic], admitted with above complaints. Evaluated with LFT, USG abdomen and coagulation profile suggestive of [alcoholic hepatitis / decompensated chronic liver disease]. Managed with [diuretics for ascites], hepatoprotective measures, vitamin supplementation, [lactulose] and supportive care. Alcohol abstinence counselling given. Symptomatically improved, stable, and is being discharged with follow-up advice.` },
      { label: "Cellulitis", text: `Patient admitted with above complaints suggestive of cellulitis of [site]. Managed with IV antibiotics, limb elevation, analgesics and wound care. [Blood sugars optimised.] Local signs of inflammation reduced, became afebrile, and is being discharged in a stable condition with oral antibiotics.` },
      { label: "Seizure / GTCS", text: `Patient admitted following [new-onset / breakthrough] generalised tonic-clonic seizures. Evaluated with CT / MRI brain, EEG and metabolic workup. [Started on / optimised] anti-epileptic drugs. Neurology opinion obtained. No further seizure episodes during the stay, conscious and oriented, and is being discharged in a stable condition on AEDs with advice.` }
    ];

    /* ---------- state ---------- */
    let complaints = [], treatment = [], rxMeds = [];
    let invDates = [], invParams = [], invSeq = 0;
    let logoData = "omandurar_footer.jpg";
    let pastHistory = [], rxHistory = [];
    let ynState = { physio: "", equip: "", dress: "" };

    /* ---------- init datalists & chips ---------- */
    function fillDatalist(id, arr) { document.getElementById(id).innerHTML = arr.map(x => `<option value="${x}">`).join(""); }
    fillDatalist("ccList", COMMON_CC);
    fillDatalist("labList", COMMON_LABS);
    fillDatalist("drugList", COMMON_DRUGS);

    document.getElementById("ccChips").innerHTML =
      COMMON_CC.slice(0, 12).map(c => `<span class="chip" onclick="document.getElementById('ccText').value='${c}';document.getElementById('ccDur').focus()">${c}</span>`).join("");
    document.getElementById("condChips").innerHTML =
      COMMON_COND.map(c => `<span class="chip" onclick="document.getElementById('condition').value='${c}';render()">${c}</span>`).join("");
    document.getElementById("pastChips").innerHTML =
      COMMON_PAST.map((c, i) => `<span class="chip" onclick="addPastPreset(${i})">${c}</span>`).join("");
    document.getElementById("invPanels").innerHTML =
      Object.keys(PANELS).map(p => `<span class="chip" onclick="addPanel('${p}')">+ ${p}</span>`).join("");
    document.getElementById("courseTpl").innerHTML =
      COURSE_TEMPLATES.map((t, i) => `<span class="chip" onclick="insertCourse(${i})">${t.label}</span>`).join("");
    document.getElementById("txBundles").innerHTML =
      Object.keys(TX_BUNDLES).map(k => `<span class="chip" onclick="addBundle('${k}')">+ ${k}</span>`).join("");
    document.getElementById("rxBundles").innerHTML =
      Object.keys(RX_BUNDLES).map(k => `<span class="chip" onclick="addRxBundle('${k}')">+ ${k}</span>`).join("");

    function addBundle(k) {
      (TX_BUNDLES[k] || []).forEach(d => { if (!treatment.includes(d)) treatment.push(d); });
      renderTx(); render();
    }
    function addPastPreset(i) {
      document.getElementById("pastText").value = COMMON_PAST[i];
      addPast();
    }
    function addRxBundle(k) {
      (RX_BUNDLES[k] || []).forEach(d => { if (!rxMeds.includes(d)) rxMeds.push(d); });
      renderRx(); render();
    }

    function insertCourse(i) {
      const el = document.getElementById("course");
      const t = COURSE_TEMPLATES[i].text;
      el.value = el.value.trim() ? el.value.trim() + "\n\n" + t : t;
      render();
    }

    /* ---------- complaints ---------- */
    function addComplaint() {
      const t = document.getElementById("ccText").value.trim();
      if (!t) return;
      const d = document.getElementById("ccDur").value.trim();
      const u = document.getElementById("ccUnit").value;
      complaints.push(d ? `H/o ${t} for ${d} ${u}` : `H/o ${t}`);
      document.getElementById("ccText").value = ""; document.getElementById("ccDur").value = "";
      renderComplaints(); render();
    }
    function renderComplaints() {
      document.getElementById("ccListOut").innerHTML = complaints.map((c, i) =>
        `<li><span>${esc(c)}</span><button onclick="complaints.splice(${i},1);renderComplaints();render()">×</button></li>`).join("");
    }

    /* ---------- past history / rx history ---------- */
    function addPast() {
      const t = document.getElementById("pastText").value.trim(); if (!t) return;
      pastHistory.push(t); document.getElementById("pastText").value = "";
      renderPast(); render();
    }
    function renderPast() {
      document.getElementById("pastListOut").innerHTML = pastHistory.map((c, i) =>
        `<li><span>${esc(c)}</span><button onclick="pastHistory.splice(${i},1);renderPast();render()">×</button></li>`).join("");
    }
    function addRxHistory() {
      const n = document.getElementById("rxhName").value.trim(); if (!n) return;
      const parts = [n, document.getElementById("rxhDose").value.trim(), document.getElementById("rxhFreq").value].filter(Boolean);
      rxHistory.push(parts.join(" "));
      ["rxhName", "rxhDose"].forEach(id => document.getElementById(id).value = "");
      document.getElementById("rxhFreq").value = "";
      renderRxHistory(); render();
    }
    function renderRxHistory() {
      document.getElementById("rxhListOut").innerHTML = rxHistory.map((t, i) =>
        `<li><span>${esc(t)}</span><button onclick="rxHistory.splice(${i},1);renderRxHistory();render()">×</button></li>`).join("");
    }

    /* ---------- examination helpers ---------- */
    function insertGeneralExam() {
      const el = document.getElementById("generalExam");
      const t = "Patient conscious, oriented, afebrile, not pale / icteric / cyanosed / clubbed, no lymphadenopathy, no pedal edema.";
      el.value = el.value.trim() ? el.value.trim() + "\n" + t : t;
      render();
    }

    /* ---------- yes/no toggles ---------- */
    function setYN(key, val_) {
      ynState[key] = val_;
      const map = { physio: "ynPhysio", equip: "ynEquip", dress: "ynDress" };
      const box = document.getElementById(map[key]);
      if (box) [...box.children].forEach(b => b.classList.toggle("sel", b.textContent === val_));
      render();
    }

    /* ---------- unit & honorific helpers ---------- */
    function getUnit() {
      return (val("unitPrefix") || "") + (document.getElementById("unitRoman").value || "");
    }
    function ensureDr(name) {
      const n = (name || "").trim();
      if (!n) return "";
      return /^dr\.?\s/i.test(n) ? n : "Dr. " + n;
    }
    function todayISO() {
      const d = new Date(); const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
      return local.toISOString().slice(0, 10);
    }
    function clearDOD() { document.getElementById("dod").value = ""; render(); }

    async function clearFormSection(event, button) {
      event.preventDefault();
      event.stopPropagation();
      const section = button.closest("details");
      const key = section.dataset.clear;
      if (!confirm(`Clear all entries in "${section.querySelector("summary").textContent.replace("Clear", "").trim()}"?`)) return;

      section.querySelectorAll("input, textarea").forEach(el => {
        el.value = "";
      });
      section.querySelectorAll("select").forEach(el => {
        el.selectedIndex = 0;
      });

      if (key === "complaints") complaints = [];
      if (key === "history") {
        pastHistory = [];
        rxHistory = [];
      }
      if (key === "examination") ynState = { physio: "", equip: "", dress: "" };
      if (key === "investigations") {
        invDates = [];
        invParams = [];
        invSeq = 0;
      }
      if (key === "treatment") treatment = [];
      if (key === "advice") rxMeds = [];
      if (key === "institution") {
        logoData = "";
        await store.remove("ds:logo");
      }
      if (key === "setup") await store.remove("ds:defaults");

      renderComplaints();
      renderTx();
      renderRx();
      renderInvEditor();
      renderPast();
      renderRxHistory();
      ["physio", "equip", "dress"].forEach(name => {
        const box = document.getElementById(`yn${name[0].toUpperCase()}${name.slice(1)}`);
        if (box) [...box.children].forEach(child => child.classList.remove("sel"));
      });
      render();
    }

    /* ---------- treatment ---------- */
    function addTx() {
      const n = document.getElementById("txName").value.trim(); if (!n) return;
      const parts = [n, document.getElementById("txDose").value.trim(),
        document.getElementById("txRoute").value, document.getElementById("txFreq").value].filter(Boolean);
      treatment.push(parts.join(" "));
      ["txName", "txDose"].forEach(id => document.getElementById(id).value = "");
      document.getElementById("txRoute").value = ""; document.getElementById("txFreq").value = "";
      renderTx(); render();
    }
    function renderTx() {
      document.getElementById("txListOut").innerHTML = treatment.map((t, i) =>
        `<li><span>${esc(t)}</span><button onclick="treatment.splice(${i},1);renderTx();render()">×</button></li>`).join("");
    }

    /* ---------- discharge meds ---------- */
    function addRx() {
      const n = document.getElementById("rxName").value.trim(); if (!n) return;
      const parts = [n, document.getElementById("rxDose").value.trim(),
        document.getElementById("rxFreq").value, document.getElementById("rxDur").value.trim()].filter(Boolean);
      rxMeds.push(parts.join(" "));
      ["rxName", "rxDose", "rxDur"].forEach(id => document.getElementById(id).value = "");
      document.getElementById("rxFreq").value = "";
      renderRx(); render();
    }
    function renderRx() {
      document.getElementById("rxListOut").innerHTML = rxMeds.map((t, i) =>
        `<li><span>${esc(t)}</span><button onclick="rxMeds.splice(${i},1);renderRx();render()">×</button></li>`).join("");
    }

    /* ---------- investigations editor ---------- */
    function addInvDate() { invDates.push({ id: ++invSeq, date: "" }); renderInvEditor(); render(); }
    function addInvParam(name) { invParams.push({ id: ++invSeq, name: name, values: {} }); renderInvEditor(); render(); }
    function addPanel(p) {
      PANELS[p].forEach(n => invParams.push({ id: ++invSeq, name: n, values: {} }));
      if (invDates.length === 0) addInvDate(); else { renderInvEditor(); render(); }
    }
    function delInvDate(id) { invDates = invDates.filter(d => d.id !== id); renderInvEditor(); render(); }
    function delInvParam(id) { invParams = invParams.filter(p => p.id !== id); renderInvEditor(); render(); }

    function renderInvEditor() {
      const box = document.getElementById("invEditor");
      if (invDates.length === 0 && invParams.length === 0) {
        box.innerHTML = `<p class="hint">Add a date column, then add lab rows (or tap a panel like CBC / RFT above).</p>`; return;
      }
      let h = '<table class="invtable"><thead><tr><th style="min-width:120px">Investigation</th>';
      invDates.forEach(d => { h += `<th><input type="date" value="${d.date}" onchange="setDate(${d.id},this.value)"><button class="xbtn" title="remove date" onclick="delInvDate(${d.id})">×</button></th>`; });
      h += '<th></th></tr></thead><tbody>';
      invParams.forEach(p => {
        h += `<tr><td class="pname"><input type="text" list="labList" value="${esc(p.name)}" placeholder="parameter" oninput="setPName(${p.id},this.value)"></td>`;
        invDates.forEach(d => { h += `<td><input type="text" value="${esc(p.values[d.id] || '')}" oninput="setVal(${p.id},${d.id},this.value)"></td>`; });
        h += `<td><button class="xbtn" onclick="delInvParam(${p.id})">×</button></td></tr>`;
      });
      h += '</tbody></table>';
      box.innerHTML = h;
    }
    function setDate(id, v) { const d = invDates.find(x => x.id === id); if (d) { d.date = v; render(); } }
    function setPName(id, v) { const p = invParams.find(x => x.id === id); if (p) { p.name = v; render(); } }
    function setVal(pid, did, v) { const p = invParams.find(x => x.id === pid); if (p) { p.values[did] = v; render(); } }

    /* ---------- helpers ---------- */
    function esc(s) { return (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
    function val(id) { return document.getElementById(id).value.trim(); }
    function fmtDate(v) { if (!v) return ""; const [y, m, d] = v.split("-"); return `${d}/${m}/${y}`; }
    function fmtDateShort(v) { if (!v) return ""; const [y, m, d] = v.split("-"); return `${d}/${m}`; }
    function lines(t) { return t.split("\n").map(s => s.trim()).filter(Boolean); }

    /* ---------- render preview ---------- */
    function render() {
      const kind = val("summaryType").toUpperCase();
      const logoHTML = logoData
        ? `<img class="logo-box" src="${logoData}" alt="logo">`
        : `<img class="logo-box" src="omandurar_footer.jpg" alt="logo">`;
      let h = "";
      h += `<div class="doc-head">
    ${logoHTML}
    <div class="head-text">
      <div class="college">${esc(val("college"))}</div>
      ${val("address") ? `<div class="addr">${esc(val("address"))}</div>` : ""}
      <div class="dept">${esc(val("dept"))}</div>
      <div class="kind">${esc(kind)}</div>
    </div>
  </div>`;

      const ageSex = [val("age"), val("sex")].filter(Boolean).join(" / ");
      h += `<div class="pt-grid">
    <div><b>Name</b> : ${esc(val("name"))}</div>
    <div><b>Age/Sex</b> : ${esc(ageSex)}</div>
    <div><b>IP No.</b> : ${esc(val("ipno"))}</div>
    <div><b>DOA</b> : ${fmtDate(val("doa"))}</div>
    <div><b>DOD</b> : ${fmtDate(val("dod"))}</div>
    <div><b>Unit</b> : ${esc(getUnit())}</div>
    <div><b>Mode of D/C</b> : ${esc(val("modeOfDischarge"))}</div>
  </div>`;

      h += section("Diagnosis", listOrText(val("diagnosis")));

      h += section("Presenting Complaints (Chief C/O)", complaints.length ? ul(complaints) : empty());
      if (val("hopi")) h += section("HOPI", `<div class="content">${esc(val("hopi"))}</div>`);
      // Past History & Rx History — side by side
      if (pastHistory.length || rxHistory.length) {
        if (pastHistory.length && rxHistory.length) {
          h += `<div class="two-col">`;
          h += `<div class="col-half">${section("Past History", ul(pastHistory))}</div>`;
          h += `<div class="col-half">${section("Rx History (Pre-admission)", ul(rxHistory))}</div>`;
          h += `</div>`;
        } else if (pastHistory.length) {
          h += section("Past History", ul(pastHistory));
        } else {
          h += section("Rx History (Pre-admission)", ul(rxHistory));
        }
      }

      const exam = examinationHTML();
      if (exam) h += section("Examination", exam);

      h += section("Investigations", investigationsHTML());
      h += section("Opinions", val("opinions") ? `<div class="content">${esc(val("opinions"))}</div>` : empty());
      h += section("Course in the Hospital", val("course") ? `<div class="content">${esc(val("course"))}</div>` : empty());
      // Treatment content uses two columns without making the second column a heading-level block.
      if (treatment.length > 0 && treatment.length <= 6) {
        h += section("Treatment Given", contentColumns(treatment));
      } else {
        h += section("Treatment Given", treatment.length ? ul(treatment) : empty());
      }
      const cond = [val("condition"), val("condExtra")].filter(Boolean).join(" — ");
      h += section("Condition at Discharge", cond ? `<div class="content">${esc(cond)}</div>` : empty());

      // discharge advice block
      let adv = "";
      const advBits = [];
      if (val("diet")) advBits.push(`<div class="adv-item"><b>Diet:</b> ${esc(val("diet"))}</div>`);
      if (val("physicalActivity")) advBits.push(`<div class="adv-item"><b>Physical Activity:</b> ${esc(val("physicalActivity"))}</div>`);
      if (ynState.physio) advBits.push(`<div class="adv-item"><b>Physiotherapy at home:</b> ${ynState.physio}</div>`);
      if (ynState.equip) advBits.push(`<div class="adv-item"><b>Home medical equipment needed:</b> ${ynState.equip}</div>`);
      if (ynState.dress) advBits.push(`<div class="adv-item"><b>Dressing needs at home:</b> ${ynState.dress}</div>`);
      if (val("otherNeeds")) advBits.push(`<div class="adv-item"><b>Other needs:</b> ${esc(val("otherNeeds"))}</div>`);
      if (advBits.length) adv += `<div class="adv-items-group">${advBits.join("")}</div>`;
      if (rxMeds.length) {
        adv += `<div class="adv-item" style="font-weight:700;margin-top:6px;margin-bottom:2px">Medications:</div>`;
        adv += contentColumns(rxMeds, "med-list");
      }
      if (val("advice")) adv += `<div class="content adv-item" style="margin-top:5px">${esc(val("advice"))}</div>`;
      if (val("emergencyContact")) adv += `<div class="content adv-item" style="margin-top:5px"><b>Emergency contact:</b> ${esc(val("emergencyContact"))}</div>`;
      if (val("review")) adv += `<div class="content adv-item" style="margin-top:5px"><b>Follow-Up:</b> ${esc(val("review"))}</div>`;
      if (val("warning")) adv += `<div class="content adv-item" style="margin-top:5px"><b>Return immediately if:</b> ${esc(val("warning"))}</div>`;
      h += section("Advice on Discharge (Rx)", adv || empty());

      const prep = ensureDr(val("preparedBy")), chf = ensureDr(val("chief"));
      if (prep || chf || val("signDateTime")) {
        h += `<div class="sign-row">
      <div>${esc(prep)}<br><small>Prepared by</small></div>
      <div>${esc(chf)}<br><small>Medical Officer (Name &amp; Seal)</small>${val("signDateTime") ? `<br><small>${esc(val("signDateTime"))}</small>` : ""}</div>
    </div>`;
      }
      document.getElementById("paper").innerHTML = h;
      scheduleSave();
      clearTimeout(pageCheckTimer);
      pageCheckTimer = setTimeout(autoOptimizeSpacing, 100);
    }
    function section(title, content) { return `<div class="sec"><h3>${title}</h3>${content}</div>`; }
    function empty() { return `<div class="empty">—</div>`; }
    function ul(arr) { return `<ul>${arr.map(x => `<li>${esc(x)}</li>`).join("")}</ul>`; }
    function contentColumns(arr, className = "") {
      return `<ul class="content-columns ${className}">${arr.map(x => `<li>${esc(x)}</li>`).join("")}</ul>`;
    }
    function listOrText(t) { const l = lines(t); if (!l.length) return empty(); return l.length > 1 ? ul(l) : `<div class="content">${esc(l[0])}</div>`; }
    function listOrTextRaw(t) { const l = lines(t); return l.join(", "); }

    function examinationHTML() {
      let parts = [];
      if (val("generalExam")) parts.push(`<div class="content">${esc(val("generalExam"))}</div>`);
      const vit = [["BP", val("vBP")], ["PR", val("vPR")], ["RR", val("vRR")], ["SpO2", val("vSpO2")], ["Temp", val("vTemp")], ["GRBS", val("vGRBS")]]
        .filter(([, v]) => v);
      if (vit.length) parts.push(`<div class="content" style="margin-top:4px"><b>Vitals:</b> ${vit.map(([k, v]) => `${k} - ${esc(v)}`).join(", ")}</div>`);
      const se = [["CVS", val("seCVS")], ["RS", val("seRS")], ["P/A", val("sePA")], ["CNS", val("seCNS")]].filter(([, v]) => v);
      if (se.length) parts.push(`<div class="content" style="margin-top:4px"><b>Systemic Examination:</b> ${se.map(([k, v]) => `${k} - ${esc(v)}`).join("; ")}</div>`);
      return parts.join("");
    }

    function investigationsHTML() {
      let out = "";
      const hasTable = invDates.length && invParams.some(p => p.name.trim());
      if (hasTable) {
        let h = `<div class="inv-table-wrap"><table class="prev-table"><thead><tr><th>Investigation</th>`;
        invDates.forEach(d => { h += `<th>${d.date ? fmtDateShort(d.date) : "—"}</th>`; });
        h += `</tr></thead><tbody>`;
        invParams.forEach(p => {
          if (!p.name.trim()) return;
          h += `<tr><td class="pn">${esc(p.name)}</td>`;
          invDates.forEach(d => { h += `<td>${esc(p.values[d.id] || "")}</td>`; });
          h += `</tr>`;
        });
        h += `</tbody></table></div>`; out += h;
      }
      if (val("invOther")) out += `<div class="content" style="margin-top:6px">${esc(val("invOther"))}</div>`;
      return out || empty();
    }

    /* ---------- tabs / copy ---------- */
    function showTab(t) {
      const form = t === "form";
      document.getElementById("formTab").style.display = form ? "block" : "none";
      document.getElementById("summaryTab").style.display = form ? "none" : "block";
      document.getElementById("tabForm").classList.toggle("active", form);
      document.getElementById("tabSummary").classList.toggle("active", !form);
      if (!form) { render(); window.scrollTo(0, 0); setTimeout(autoOptimizeSpacing, 60); }
    }
    function copyText() {
      render();
      const t = document.getElementById("paper").innerText.replace(/\n{3,}/g, "\n\n");
      navigator.clipboard.writeText(t).then(
        () => toast("Summary copied to clipboard"),
        () => toast("Copy failed — long-press to select in View summary")
      );
    }
    function toast(msg) {
      let el = document.createElement("div");
      el.textContent = msg;
      el.style.cssText = "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#14425f;color:#fff;padding:10px 18px;border-radius:8px;font-size:14px;z-index:99;box-shadow:0 3px 10px rgba(0,0,0,.25)";
      document.body.appendChild(el); setTimeout(() => el.remove(), 2200);
    }

    /* ---------- A4 page-count measurement, auto-fit & print ---------- */
    let pageCheckTimer;

    function measurePagesFor(compactClass) {
      const src = document.getElementById("paper");
      if (!src) return { height: 0, pages: 1 };
      const pageWidth = src.getBoundingClientRect().width || 793.7;
      const mm = pageWidth / 210;
      const firstPageContentHeight = (297 - 6.825 - 16) * mm;
      const laterPageContentHeight = (297 - 10.5 - 10.5) * mm;
      const clone = document.createElement("div");
      clone.className = "paper" + (compactClass ? " " + compactClass : "");
      clone.style.cssText = `position:absolute;left:-9999px;top:0;width:${pageWidth}px;min-height:0;padding:6.825mm 7mm 16mm;border:0;box-sizing:border-box;`;
      clone.innerHTML = src.innerHTML.replace(/<div class="a4-page-guide[^"]*"[^>]*><\/div>/g, "");
      document.body.appendChild(clone);
      const hgt = Math.max(0, clone.scrollHeight - (6.825 + 16) * mm);
      document.body.removeChild(clone);
      const pages = hgt <= firstPageContentHeight
        ? hgt / firstPageContentHeight
        : 1 + (hgt - firstPageContentHeight) / laterPageContentHeight;
      return { height: hgt, pages };
    }

    function autoOptimizeSpacing() {
      const paper = document.getElementById("paper");
      if (!paper) return;

      // Clear previous compaction classes
      paper.classList.remove("relaxed", "compact", "compact2");

      // Step 1: Measure standard density
      let r = measurePagesFor("");

      // Space-occupying auto-fit algorithm:
      // Case 1: Very short content (< 0.65 pages) -> relaxed spacing fills the page pleasantly
      if (r.pages < 0.65) {
        paper.classList.add("relaxed");
      }
      // Case 2: Slight overflow beyond 1 page (up to 1.25 pages) -> compact brings it to exactly 1 page
      else if (r.pages > 1.00 && r.pages <= 1.25) {
        paper.classList.add("compact");
        let r1 = measurePagesFor("compact");
        if (r1.pages > 1.01 && r.pages <= 1.30) {
          paper.classList.remove("compact");
          paper.classList.add("compact2");
          let r2 = measurePagesFor("compact2");
          if (r2.pages > 1.02) {
            // Overflows even with compact2 -> prefer comfortable natural 2-page layout
            paper.classList.remove("compact2");
          }
        }
      }
      // Case 3: Slight overflow beyond 2 pages (up to 2.30 pages) -> compact maintains 2 pages
      else if (r.pages > 2.00 && r.pages <= 2.30) {
        paper.classList.add("compact");
        let r1 = measurePagesFor("compact");
        if (r1.pages > 2.01) {
          paper.classList.remove("compact");
          paper.classList.add("compact2");
        }
      }

      // Draw authentic A4 page boundary dividers on screen in View summary
      renderA4PageGuides();
      updatePageBanner();
    }

    function renderA4PageGuides() {
      const paper = document.getElementById("paper");
      if (!paper) return;
      paper.querySelectorAll(".a4-page-guide").forEach(el => el.remove());

      const fullHeight = paper.scrollHeight;
      const pageWidth = paper.getBoundingClientRect().width || 793.7;
      const pageHeight = pageWidth * 297 / 210;
      const pageCount = Math.ceil(fullHeight / pageHeight);
      for (let page = 1; page < pageCount; page++) {
        const g1 = document.createElement("div");
        g1.className = "a4-page-guide no-print";
        g1.style.top = `${page * pageHeight}px`;
        g1.innerHTML = `<span class="a4-page-guide-badge">PAGE ${page} ENDS (A4) · PAGE ${page + 1} CONTINUES</span>`;
        paper.appendChild(g1);
      }
    }

    function updatePageBanner() {
      const banner = document.getElementById("pageBanner");
      if (!banner) return;
      const paper = document.getElementById("paper");
      const isCompact2 = paper.classList.contains("compact2");
      const isCompact = paper.classList.contains("compact");
      const isRelaxed = paper.classList.contains("relaxed");
      const cls = isCompact2 ? "compact compact2" : (isCompact ? "compact" : (isRelaxed ? "relaxed" : ""));
      const r = measurePagesFor(cls);
      const pages = Math.max(1, Math.ceil(r.pages));
      let note = "";
      if (isCompact2) note = " · Auto-optimized (Level 2 compact)";
      else if (isCompact) note = " · Auto-optimized (Compact fit)";
      else if (isRelaxed) note = " · Relaxed spacing";

      if (r.pages <= 2.05) {
        banner.style.display = "flex";
        banner.className = "pagebanner no-print ok";
        banner.innerHTML = `<span>📄 <b>A4 Format</b>: Content fits on <b>${pages} page${pages > 1 ? "s" : ""}</b>${note}. Spacing optimally filled.</span>`;
      } else {
        banner.style.display = "flex";
        banner.className = "pagebanner no-print warn";
        banner.innerHTML = `<span>⚠ <b>A4 Format</b>: Content spans ~<b>${pages} pages</b>${note}. Shorten lengthy narrative if fewer pages desired.</span>`;
      }
    }

    function checkAndPrint() {
      render();
      autoOptimizeSpacing();
      if (isMobileDevice()) {
        generatePdf(false);
        return;
      }
      const paper = document.getElementById("paper");
      const cls = paper.classList.contains("compact2") ? "compact compact2" : (paper.classList.contains("compact") ? "compact" : "");
      let r = measurePagesFor(cls);
      if (r.pages <= 2.05) { window.print(); return; }
      const pages = Math.ceil(r.pages);
      const proceed = confirm(`⚠ Content spans ~${pages} A4 pages after automatic space optimization.\n\nTap OK to proceed with Print / PDF, or Cancel to shorten any narrative.`);
      if (proceed) window.print();
    }

    function isMobileDevice() {
      return window.matchMedia("(max-width: 768px)").matches ||
        /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    }

    async function generatePdf(share) {
      render();
      autoOptimizeSpacing();
      const paper = document.getElementById("paper");
      const name = val("name") || "Patient";
      const cleanName = name.replace(/[^a-zA-Z0-9]/g, "_");
      const fileName = `Discharge_Summary_${cleanName}.pdf`;
      if (typeof html2pdf !== "function") {
        toast("PDF generator is unavailable — use the browser share or print menu.");
        return;
      }

      const exportPaper = paper.cloneNode(true);
      exportPaper.querySelectorAll(".a4-page-guide").forEach(el => el.remove());
      exportPaper.classList.add("pdf-export-paper");
      document.body.appendChild(exportPaper);
      try {
        toast("Generating PDF...");
        const opt = {
          margin: 0,
          filename: fileName,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, logging: false },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
        };
        const pdfBlob = await html2pdf().set(opt).from(exportPaper).output("blob");
        const pdfFile = new File([pdfBlob], fileName, { type: "application/pdf" });
        if (share && navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
          await navigator.share({ title: `Discharge Summary — ${name}`, files: [pdfFile] });
          toast("PDF shared successfully ✓");
        } else {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(pdfBlob);
          link.download = fileName;
          link.click();
          URL.revokeObjectURL(link.href);
          toast("PDF downloaded ✓");
        }
      } catch (e) {
        if (e.name !== "AbortError") toast("Could not generate PDF.");
      } finally {
        exportPaper.remove();
      }
    }

    /* ---------- PWA install ---------- */
    let deferredPrompt = null;
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;
      const btn = document.getElementById("installBtn");
      if (btn) btn.style.display = "flex";
    });
    async function doInstall() {
      if (!deferredPrompt) {
        toast("Use your browser menu → 'Add to Home screen' to install");
        return;
      }
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
      document.getElementById("installBtn").style.display = "none";
    }
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("sw.js")
          .then(registration => registration.update())
          .catch(error => console.error("Service worker registration failed:", error));
      });
    }

    /* ---------- Menu ---------- */
    function toggleMenu() {
      const d = document.getElementById("menuDropdown");
      d.classList.toggle("open");
    }
    function closeMenu() {
      document.getElementById("menuDropdown").classList.remove("open");
    }
    document.addEventListener("click", e => {
      if (!e.target.closest(".menu-wrap")) closeMenu();
    });

    /* ---------- Export defaults as JSON file ---------- */
    async function exportTemplate() {
      const d = safeParse(await store.get("ds:defaults")) || {};
      const blob = new Blob([JSON.stringify(d, null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "ds-defaults.json";
      a.click();
      toast("Defaults exported as ds-defaults.json");
    }

    /* ---------- Import defaults from JSON file ---------- */
    function importTemplate() {
      const inp = document.createElement("input");
      inp.type = "file"; inp.accept = ".json,application/json";
      inp.onchange = async () => {
        const f = inp.files[0]; if (!f) return;
        const text = await f.text();
        const d = safeParse(text);
        if (!d || typeof d !== "object") { toast("Invalid template file"); return; }
        await store.set("ds:defaults", JSON.stringify(d));
        applyDefaults(d);
        toast("Template imported and applied as defaults ✓");
      };
      inp.click();
    }

    /* ---------- Local template: save or load full draft ---------- */
    function doLocalTemplate() {
      const choice = confirm(
        "LOCAL TEMPLATE\n\nOK = Save current form as a template file (.json)\nCancel = Load a previously saved template file"
      );
      if (choice) {
        // Save
        const data = { draft: collectDraft(), defaults: {} };
        DEFAULT_FIELDS.forEach(id => { data.defaults[id] = document.getElementById(id).value; });
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "ds-template-" + new Date().toISOString().slice(0, 10) + ".json";
        a.click();
        toast("Template saved locally ✓");
      } else {
        // Load
        const inp = document.createElement("input");
        inp.type = "file"; inp.accept = ".json,application/json";
        inp.onchange = async () => {
          const f = inp.files[0]; if (!f) return;
          const text = await f.text();
          const data = safeParse(text);
          if (!data) { toast("Invalid template file"); return; }
          if (data.defaults) applyDefaults(data.defaults);
          if (data.draft) restoreDraft(data.draft);
          await store.set("ds:draft", JSON.stringify(collectDraft()));
          toast("Template loaded ✓");
        };
        inp.click();
      }
    }

    /* ---------- Share / Send as PDF ---------- */
    async function shareDoc() {
      if (isMobileDevice()) {
        await generatePdf(true);
        return;
      }
      render();
      const paper = document.getElementById("paper");
      const name = val("name") || "Patient";
      const cleanName = name.replace(/[^a-zA-Z0-9]/g, "_");
      const fileName = `Discharge_Summary_${cleanName}.pdf`;

      if (!navigator.share) {
        toast("Share not supported — use Print / PDF");
        checkAndPrint();
        return;
      }

      toast("Generating PDF...");

      try {
        // 1. Generate PDF Blob from the summary HTML
        const opt = {
          margin: [10, 10, 10, 10],
          filename: fileName,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, logging: false },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        const pdfBlob = await html2pdf().set(opt).from(paper).output('blob');
        const pdfFile = new File([pdfBlob], fileName, { type: 'application/pdf' });

        // 2. Share PDF file if supported by browser/device
        if (navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
          await navigator.share({
            title: `Discharge Summary — ${name}`,
            files: [pdfFile]
          });
          toast("PDF shared successfully ✓");
        } else {
          toast("File sharing not supported on this browser — downloading PDF");
          await generatePdf(false);
        }
      } catch (e) {
        if (e.name !== "AbortError") {
          toast("Could not share PDF — downloading PDF");
          await generatePdf(false);
        }
      }
    }

    /* live update on any form input */
    document.addEventListener("input", e => { if (e.target.closest("#invEditor")) return; render(); scheduleSave(); });

    /* ---------- persistence ---------- */
    const FIELDS = ["college", "address", "dept", "summaryType", "name", "age", "sex", "ipno",
      "doa", "dod", "unitPrefix", "modeOfDischarge",
      "diagnosis", "hopi",
      "generalExam", "vBP", "vPR", "vRR", "vSpO2", "vTemp", "vGRBS", "seCVS", "seRS", "sePA", "seCNS",
      "invOther", "opinions", "course", "condition", "condExtra",
      "diet", "physicalActivity", "otherNeeds", "advice", "emergencyContact", "review", "warning",
      "preparedBy", "chief", "signDateTime"];
    const SELECT_FIELDS = ["unitRoman"];
    const DEFAULT_FIELDS = ["college", "address", "dept", "summaryType", "unitPrefix", "unitRoman", "chief", "preparedBy", "advice", "review", "warning"];
    const PATIENT_FIELDS = FIELDS.filter(f => !DEFAULT_FIELDS.includes(f));
    const SEED = {
      advice: "Take medications as advised.\nAdequate rest and oral fluids.\nTake diet as advised.",
      review: "Review in Medicine OPD after 1 week with reports (or earlier if needed).",
      warning: "Fever not subsiding, breathlessness, chest pain, giddiness, reduced urine output, bleeding, or drowsiness — report to casualty immediately."
    };

    /* ---------- durable offline store with IndexedDB and localStorage fallback ---------- */
    const store = (() => {
      let dbPromise;
      function openDb() {
        if (dbPromise) return dbPromise;
        dbPromise = new Promise((resolve, reject) => {
          if (!("indexedDB" in window)) { reject(new Error("IndexedDB unavailable")); return; }
          const request = indexedDB.open("ds-builder", 1);
          request.onupgradeneeded = () => request.result.createObjectStore("values");
          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject(request.error || new Error("IndexedDB open failed"));
        });
        return dbPromise;
      }
      function fallbackGet(k) {
        try { return localStorage.getItem(k); } catch (e) { return null; }
      }
      function fallbackSet(k, v) {
        try { localStorage.setItem(k, v); } catch (e) { toast("Storage is unavailable; changes may not persist."); }
      }
      return {
        async get(k) {
          try {
            const db = await openDb();
            return await new Promise((resolve, reject) => {
              const request = db.transaction("values", "readonly").objectStore("values").get(k);
              request.onsuccess = () => resolve(request.result === undefined ? fallbackGet(k) : request.result);
              request.onerror = () => reject(request.error);
            });
          } catch (e) { return fallbackGet(k); }
        },
        async set(k, v) {
          try {
            const db = await openDb();
            await new Promise((resolve, reject) => {
              const request = db.transaction("values", "readwrite").objectStore("values").put(v, k);
              request.onsuccess = resolve;
              request.onerror = () => reject(request.error);
            });
          } catch (e) { fallbackSet(k, v); }
        },
        async remove(k) {
          try {
            const db = await openDb();
            await new Promise((resolve, reject) => {
              const request = db.transaction("values", "readwrite").objectStore("values").delete(k);
              request.onsuccess = resolve;
              request.onerror = () => reject(request.error);
            });
          } catch (e) {
            try { localStorage.removeItem(k); } catch (removeError) { toast("Could not clear stored data."); }
          }
        }
      };
    })();

    async function requestPersistentStorage() {
      if (!navigator.storage || !navigator.storage.persist) {
        toast("Persistent storage is not supported by this browser.");
        return;
      }
      try {
        if (!confirm("Allow DS Builder to request persistent browser storage so saved drafts and templates are less likely to be removed?")) return;
        if (navigator.storage.persisted && await navigator.storage.persisted()) {
          toast("Persistent storage is already enabled ✓");
          return;
        }
        const granted = await navigator.storage.persist();
        toast(granted ? "Persistent storage enabled ✓" : "Browser did not grant persistent storage");
      } catch (e) {
        toast("Could not request persistent storage.");
      }
    }

    function safeParse(s) { try { return JSON.parse(s); } catch (e) { return null; } }
    function setVal_(id, v) { const el = document.getElementById(id); if (el) el.value = (v == null ? "" : v); }
    function onLogo(e) {
      const f = e.target.files && e.target.files[0]; if (!f) return;
      const r = new FileReader();
      r.onload = () => { logoData = r.result; render(); store.set("ds:logo", logoData); };
      r.readAsDataURL(f);
    }

    let saveTimer;
    function scheduleSave() { clearTimeout(saveTimer); saveTimer = setTimeout(() => { store.set("ds:draft", JSON.stringify(collectDraft())); }, 600); }
    function collectDraft() {
      const f = {}; FIELDS.forEach(id => f[id] = document.getElementById(id).value);
      SELECT_FIELDS.forEach(id => f[id] = document.getElementById(id).value);
      return { f, complaints, treatment, rxMeds, invDates, invParams, invSeq, pastHistory, rxHistory, ynState };
    }
    function restoreDraft(o) {
      if (!o) return;
      if (o.f) { FIELDS.forEach(id => { if (id in o.f) setVal_(id, o.f[id]); }); SELECT_FIELDS.forEach(id => { if (o.f[id] != null) setVal_(id, o.f[id]); }); }
      complaints = o.complaints || []; treatment = o.treatment || []; rxMeds = o.rxMeds || [];
      invDates = o.invDates || []; invParams = o.invParams || []; invSeq = o.invSeq || 0;
      pastHistory = o.pastHistory || []; rxHistory = o.rxHistory || [];
      ynState = o.ynState || { physio: "", equip: "", dress: "" };
      renderComplaints(); renderTx(); renderRx(); renderInvEditor(); renderPast(); renderRxHistory();
      ["physio", "equip", "dress"].forEach(k => { if (ynState[k]) setYNui(k, ynState[k]); });
      if (!val("dod")) setVal_("dod", todayISO());
      render();
    }
    function setYNui(key, v) {
      const map = { physio: "ynPhysio", equip: "ynEquip", dress: "ynDress" };
      const box = document.getElementById(map[key]);
      if (box) [...box.children].forEach(b => b.classList.toggle("sel", b.textContent === v));
    }

    function applyDefaults(d) { if (!d) return; DEFAULT_FIELDS.forEach(id => { if (id in d) setVal_(id, d[id]); }); }
    async function saveDefaults() {
      const d = {}; DEFAULT_FIELDS.forEach(id => d[id] = document.getElementById(id).value);
      await store.set("ds:defaults", JSON.stringify(d)); toast("Saved as your defaults");
    }

    async function newSummary() {
      if (!confirm("Start a new patient? Patient details will be cleared. Your saved defaults are kept.")) return;
      PATIENT_FIELDS.forEach(id => setVal_(id, ""));
      complaints = []; treatment = []; rxMeds = []; invDates = []; invParams = []; invSeq = 0;
      pastHistory = []; rxHistory = []; ynState = { physio: "", equip: "", dress: "" };
      ["ynPhysio", "ynEquip", "ynDress"].forEach(id => { const b = document.getElementById(id); if (b) [...b.children].forEach(c => c.classList.remove("sel")); });
      setVal_("dod", todayISO());
      const d = safeParse(await store.get("ds:defaults"));
      ["advice", "review", "warning"].forEach(id => setVal_(id, (d && d[id] != null) ? d[id] : SEED[id]));
      renderComplaints(); renderTx(); renderRx(); renderInvEditor(); renderPast(); renderRxHistory(); render();
      await store.set("ds:draft", JSON.stringify(collectDraft()));
      showTab("form"); toast("New patient — defaults kept");
    }

    /* ---------- autofill sample data for testing on click ---------- */
    function autofillTest() {
      if (val("name") || val("diagnosis") || complaints.length > 0) {
        if (!confirm("Autofill sample test data? Existing entries will be overwritten.")) return;
      }
      // Patient details
      setVal_("name", "Ramasamy M.");
      setVal_("age", "52");
      setVal_("sex", "M");
      setVal_("ipno", "2026/04812");
      setVal_("doa", "2026-10-15");
      setVal_("dod", todayISO());
      setVal_("unitPrefix", "M-");
      setVal_("unitRoman", "IV");
      setVal_("modeOfDischarge", "Discharge");

      // Diagnosis
      setVal_("diagnosis", "Type 2 Diabetes Mellitus with DKA (Resolved)\nCommunity Acquired Pneumonia (Right Lower Lobe)\nEssential Hypertension");

      // Complaints
      complaints = [
        "H/o fever for 4 days",
        "H/o cough with expectoration for 4 days",
        "H/o breathlessness for 2 days"
      ];
      renderComplaints();

      // History
      setVal_("hopi", "Patient was apparently normal 4 days ago, then developed high-grade fever with chills and cough with expectoration. Developed progressive breathlessness (MMRC Grade III) for 2 days. No history of chest pain or palpitations. Patient had nausea, vomiting and reduced oral intake for 1 day prior to admission.");
      pastHistory = [
        "K/C/O Type 2 Diabetes Mellitus on medication",
        "K/C/O Systemic Hypertension on medication"
      ];
      renderPast();
      rxHistory = [
        "Tab. Metformin 500 mg BD",
        "Tab. Telmisartan 40 mg OD"
      ];
      renderRxHistory();

      // Examination
      setVal_("generalExam", "Patient conscious, oriented, tachypneic, afebrile, not pale, no icterus, cyanosis, clubbing, lymphadenopathy. Mild bilateral pedal edema present.");
      setVal_("vBP", "130/80");
      setVal_("vPR", "88");
      setVal_("vRR", "22");
      setVal_("vSpO2", "96% RA");
      setVal_("vTemp", "Afebrile");
      setVal_("vGRBS", "164");
      setVal_("seCVS", "S1, S2 heard, no murmurs");
      setVal_("seRS", "Bilateral air entry present, crepitations in right infrascapular area");
      setVal_("sePA", "Soft, non-tender, no organomegaly");
      setVal_("seCNS", "Conscious, oriented, NFND, GCS 15/15");

      // Investigations
      invSeq = 0;
      const d1Id = ++invSeq, d2Id = ++invSeq;
      invDates = [
        { id: d1Id, date: "2026-10-15" },
        { id: d2Id, date: "2026-10-19" }
      ];
      invParams = [
        { id: ++invSeq, name: "Hb", values: { [d1Id]: "11.8", [d2Id]: "12.2" } },
        { id: ++invSeq, name: "TC", values: { [d1Id]: "14200", [d2Id]: "8600" } },
        { id: ++invSeq, name: "Platelet", values: { [d1Id]: "2.1 L", [d2Id]: "2.4 L" } },
        { id: ++invSeq, name: "Urea", values: { [d1Id]: "42", [d2Id]: "28" } },
        { id: ++invSeq, name: "Creatinine", values: { [d1Id]: "1.4", [d2Id]: "0.9" } },
        { id: ++invSeq, name: "RBS", values: { [d1Id]: "340", [d2Id]: "138" } },
        { id: ++invSeq, name: "Na", values: { [d1Id]: "132", [d2Id]: "138" } },
        { id: ++invSeq, name: "K", values: { [d1Id]: "4.8", [d2Id]: "4.2" } }
      ];
      renderInvEditor();
      setVal_("invOther", "CXR (PA view): Right lower zone consolidation resolving.\nECG: Normal sinus rhythm, HR 86/min.\nUSG Abdomen: Grade 1 fatty liver, normal bilateral kidneys.");

      // Opinions
      setVal_("opinions", "Pulmonology opinion obtained on 16/10/2026 — advised IV antibiotics and nebulisation.\nEndocrinology opinion obtained — advised sliding scale insulin, transitioned to basal-bolus regimen.");

      // Course in hospital
      setVal_("course", "Patient admitted with diabetic ketoacidosis precipitated by community-acquired pneumonia. Evaluated with blood sugars, arterial blood gases, septic screen, and chest radiography. Initially managed in HDU with IV fluids, insulin infusion, and broad-spectrum IV antibiotics (Inj. Ceftriaxone) along with nebulisation. Acidosis resolved and blood glucose levels normalised. Transitioned to subcutaneous insulin. Cough and breathlessness settled; patient maintained adequate saturation on room air. Vitals remained stable, tolerating normal diabetic diet. Patient is being discharged in a stable condition with oral medications and glycemic control advice.");

      // Treatment given in hospital
      treatment = [
        "Inj. Ceftriaxone 1 g IV BD",
        "Inj. Insulin (Regular) IV infusion as per protocol, transitioned to SC",
        "Inj. Pantoprazole 40 mg IV OD",
        "Inj. Paracetamol 1 g IV SOS",
        "Neb. Ipratropium-Salbutamol Q8H",
        "IV Fluids 0.9% Normal Saline"
      ];
      renderTx();

      // Condition at discharge
      setVal_("condition", "Clinically stable and symptomatically improved");
      setVal_("condExtra", "Afebrile, eupneic, hemodynamically stable, tolerating diabetic diet");

      // Discharge advice
      setVal_("diet", "Diabetic and salt-restricted diet");
      setVal_("physicalActivity", "Ambulant, adequate rest");
      ynState = { physio: "No", equip: "No", dress: "No" };
      ["physio", "equip", "dress"].forEach(k => setYNui(k, ynState[k]));
      setVal_("otherNeeds", "Daily foot care and regular blood glucose monitoring");
      rxMeds = [
        "Tab. Cefpodoxime 200 mg BD × 5 days",
        "Tab. Metformin 500 mg BD",
        "Tab. Glimepiride 1 mg OD before breakfast",
        "Tab. Telmisartan 40 mg OD",
        "Tab. Pantoprazole 40 mg OD before food × 5 days",
        "Tab. Paracetamol 650 mg SOS for fever/bodyache"
      ];
      renderRx();
      setVal_("advice", "Take medications strictly as advised.\nAdequate hydration and diabetic diet.\nMonitor fasting and post-prandial blood sugar regularly.\nAvoid skipping meals.");
      setVal_("emergencyContact", "Casualty / Emergency Dept: 044-25305000");
      setVal_("review", "Review in Medicine OPD after 1 week with fasting and PP blood sugar reports (or earlier if needed).");
      setVal_("warning", "Fever, increasing breathlessness, chest pain, persistent vomiting, reduced urine output, or severe giddiness — report to Casualty immediately.");

      // Signatures
      setVal_("preparedBy", "Dr. K. Vignesh (JR)");
      setVal_("chief", "Dr. S. Sundararajan (Unit Chief)");
      setVal_("signDateTime", "20/10/2026, 11:30 AM");

      render();
      toast("All details autofilled with test data");
    }

    async function loadAll() {
      const lg = await store.get("ds:logo"); if (lg) logoData = lg;
      const def = safeParse(await store.get("ds:defaults"));
      if (def) applyDefaults(def);
      const draft = safeParse(await store.get("ds:draft"));
      if (draft) { restoreDraft(draft); }
      else { setVal_("dod", todayISO()); renderInvEditor(); render(); }
    }
    loadAll();
