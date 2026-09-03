"use client";

import { useMemo, useState } from "react";
import {
  calculatePipelineOptions,
  recommendDiameter,
  type PeGrade,
} from "@/lib/calculator/pipeline-design";

const defaultDiameters = [32, 40, 50, 63, 75, 90, 110, 125, 140, 160, 180, 200, 225, 250, 280, 315, 355, 400, 450, 500, 560, 630];

export function PipelineDesignCalculator() {
  const [wellDepth] = useState(20);
  const [verticalLift, setVerticalLift] = useState(150);
  const [flow, setFlow] = useState(10);
  const [pipeLength, setPipeLength] = useState(200);
  const [grade, setGrade] = useState<PeGrade>("PE100");
  const [sdr, setSdr] = useState(11);
  const [pn, setPn] = useState(16);
  const [reserve, setReserve] = useState(15);
  const [diameterInput, setDiameterInput] = useState(defaultDiameters.join(","));

  const diameters = useMemo(
    () =>
      diameterInput
        .split(/[,،]/)
        .map((v) => Number(v.trim()))
        .filter((n) => Number.isFinite(n) && n > 0),
    [diameterInput],
  );

  const options = useMemo(
    () =>
      calculatePipelineOptions({
        wellDepthM: wellDepth,
        verticalLiftM: verticalLift,
        flowM3h: flow,
        pipeLengthM: pipeLength,
        grade,
        sdr,
        pn,
        externalDiametersMm: diameters.length > 0 ? diameters : defaultDiameters,
        motorReservePercent: reserve,
      }),
    [wellDepth, verticalLift, flow, pipeLength, grade, sdr, pn, reserve, diameters],
  );

  const recommendation = recommendDiameter(options);

  return (
    <div className="ind-glass ind-glass-strong space-y-8 p-6">
      <p className="ind-lead text-sm">
        برآورد پیش‌طراحی خط انتقال آب — عمق چاه ({wellDepth} متر) در هد کل لحاظ نمی‌شود.
        ارتفاع عمودی {verticalLift} متر به‌علاوه افت اصطکاکی خط محاسبه می‌شود.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium">ارتفاع عمودی تا استخر (m)</span>
          <input
            type="number"
            className="mt-2 w-full rounded border border-[color:var(--ind-border)] bg-transparent px-3 py-2"
            value={verticalLift}
            onChange={(e) => setVerticalLift(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium">دبی (m³/h)</span>
          <input
            type="number"
            className="mt-2 w-full rounded border border-[color:var(--ind-border)] bg-transparent px-3 py-2"
            value={flow}
            onChange={(e) => setFlow(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium">طول خط (m)</span>
          <input
            type="number"
            className="mt-2 w-full rounded border border-[color:var(--ind-border)] bg-transparent px-3 py-2"
            value={pipeLength}
            onChange={(e) => setPipeLength(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium">SDR</span>
          <input
            type="number"
            className="mt-2 w-full rounded border border-[color:var(--ind-border)] bg-transparent px-3 py-2"
            value={sdr}
            onChange={(e) => setSdr(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium">PN</span>
          <input
            type="number"
            className="mt-2 w-full rounded border border-[color:var(--ind-border)] bg-transparent px-3 py-2"
            value={pn}
            onChange={(e) => setPn(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium">ذخیره توان (%)</span>
          <input
            type="number"
            className="mt-2 w-full rounded border border-[color:var(--ind-border)] bg-transparent px-3 py-2"
            value={reserve}
            onChange={(e) => setReserve(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm md:col-span-2">
          <span className="font-medium">جنس لوله</span>
          <select
            className="mt-2 w-full rounded border border-[color:var(--ind-border)] bg-transparent px-3 py-2"
            value={grade}
            onChange={(e) => setGrade(e.target.value as PeGrade)}
          >
            <option value="PE80">PE80</option>
            <option value="PE100">PE100</option>
          </select>
        </label>
        <label className="block text-sm md:col-span-2">
          <span className="font-medium">قطر خارجی (mm) — با کاما</span>
          <input
            type="text"
            className="mt-2 w-full rounded border border-[color:var(--ind-border)] bg-transparent px-3 py-2"
            value={diameterInput}
            onChange={(e) => setDiameterInput(e.target.value)}
          />
        </label>
      </div>

      {recommendation ? (
        <div className="rounded border border-[color:var(--ind-accent)] p-4 text-sm">
          <strong>توصیه اولیه:</strong> قطر خارجی {recommendation.externalDiameterMm} mm — سرعت{" "}
          {recommendation.velocityMs.toFixed(2)} m/s — هد کل {recommendation.totalHeadM.toFixed(1)} m —
          توان {recommendation.motorPowerKw.toFixed(2)} kW
        </div>
      ) : null}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-[color:var(--ind-border)]">
              {["De mm", "SDR", "PN", "e mm", "Di mm", "v m/s", "hf m", "H m", "kW", "وضعیت"].map(
                (h) => (
                  <th key={h} className="px-2 py-2 font-medium">
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {options.map((row) => (
              <tr key={row.externalDiameterMm} className="border-b border-[color:var(--ind-border)]">
                <td className="px-2 py-2">{row.externalDiameterMm}</td>
                <td className="px-2 py-2">{row.sdr}</td>
                <td className="px-2 py-2">{row.pn}</td>
                <td className="px-2 py-2">{row.wallThicknessMm.toFixed(2)}</td>
                <td className="px-2 py-2">{row.internalDiameterMm.toFixed(2)}</td>
                <td className="px-2 py-2">{row.velocityMs.toFixed(2)}</td>
                <td className="px-2 py-2">{row.frictionLossM.toFixed(2)}</td>
                <td className="px-2 py-2">{row.totalHeadM.toFixed(2)}</td>
                <td className="px-2 py-2">{row.motorPowerKw.toFixed(2)}</td>
                <td className="px-2 py-2">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-[color:var(--ind-text-muted)]">
        نتایج این ماشین‌حساب برای برآورد اولیه و پیش‌طراحی است و جایگزین محاسبات مهندسی تأییدشده
        نمی‌شود. انتخاب نهایی پمپ و لوله باید با منحنی پمپ، فشار کاری و پروفیل ارتفاعی واقعی
        پروژه بررسی شود.
      </p>
    </div>
  );
}
