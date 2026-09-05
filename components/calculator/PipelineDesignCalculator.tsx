"use client";

import { useMemo, useState } from "react";
import {
  calculatePipelineOptions,
  recommendDiameter,
  type PeGrade,
  type PipeOption,
} from "@/lib/calculator/pipeline-design";
import { useLocale } from "@/components/i18n/LocaleProvider";

const defaultDiameters = [
  32, 40, 50, 63, 75, 90, 110, 125, 140, 160, 180, 200, 225, 250, 280, 315, 355, 400, 450,
  500, 560, 630,
];

const DEFAULT_WELL_DEPTH = 20;
const DEFAULT_VERTICAL_LIFT = 150;
const DEFAULT_FLOW = 10;
const DEFAULT_PIPE_LENGTH = 200;
const DEFAULT_SDR = 11;
const DEFAULT_PN = 16;
const DEFAULT_RESERVE = 15;
const DEFAULT_GRADE: PeGrade = "PE100";
const DEFAULT_DIAMETER_INPUT = defaultDiameters.join(",");

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));
}

export function PipelineDesignCalculator() {
  const { t } = useLocale();
  const copy = t.calculator.pipelineDesign;

  const [wellDepth] = useState(DEFAULT_WELL_DEPTH);
  const [verticalLift, setVerticalLift] = useState(DEFAULT_VERTICAL_LIFT);
  const [flow, setFlow] = useState(DEFAULT_FLOW);
  const [pipeLength, setPipeLength] = useState(DEFAULT_PIPE_LENGTH);
  const [grade, setGrade] = useState<PeGrade>(DEFAULT_GRADE);
  const [sdr, setSdr] = useState(DEFAULT_SDR);
  const [pn, setPn] = useState(DEFAULT_PN);
  const [reserve, setReserve] = useState(DEFAULT_RESERVE);
  const [diameterInput, setDiameterInput] = useState(DEFAULT_DIAMETER_INPUT);

  const diameters = useMemo(
    () =>
      diameterInput
        .split(/[,\u060C]/)
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

  const statusLabel = (status: PipeOption["status"]) => {
    switch (status) {
      case "high-velocity":
        return copy.table.status.highVelocity;
      case "low-velocity":
        return copy.table.status.lowVelocity;
      default:
        return copy.table.status.ok;
    }
  };

  const reset = () => {
    setVerticalLift(DEFAULT_VERTICAL_LIFT);
    setFlow(DEFAULT_FLOW);
    setPipeLength(DEFAULT_PIPE_LENGTH);
    setGrade(DEFAULT_GRADE);
    setSdr(DEFAULT_SDR);
    setPn(DEFAULT_PN);
    setReserve(DEFAULT_RESERVE);
    setDiameterInput(DEFAULT_DIAMETER_INPUT);
  };

  const tableHeaders = [
    copy.table.headers.de,
    copy.table.headers.sdr,
    copy.table.headers.pn,
    copy.table.headers.wall,
    copy.table.headers.di,
    copy.table.headers.velocity,
    copy.table.headers.headLoss,
    copy.table.headers.totalHead,
    copy.table.headers.power,
    copy.table.headers.status,
  ];

  return (
    <div className="ind-glass ind-glass-strong space-y-8 p-6">
      <p className="ind-lead text-sm">
        {formatTemplate(copy.intro, { wellDepth, verticalLift })}
      </p>

      <ul className="grid gap-2 text-xs text-[color:var(--ind-text-muted)] sm:grid-cols-3">
        <li>{copy.assumptions.hazenWilliams}</li>
        <li>{copy.assumptions.pumpEfficiency}</li>
        <li>{copy.assumptions.wellDepthExcluded}</li>
      </ul>

      <div className="grid gap-6 md:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium">{copy.fields.verticalLift}</span>
          <input
            type="number"
            className="mt-2 w-full rounded border border-[color:var(--ind-border)] bg-transparent px-3 py-2"
            value={verticalLift}
            onChange={(e) => setVerticalLift(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium">{copy.fields.flowRate}</span>
          <input
            type="number"
            className="mt-2 w-full rounded border border-[color:var(--ind-border)] bg-transparent px-3 py-2"
            value={flow}
            onChange={(e) => setFlow(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium">{copy.fields.pipeLength}</span>
          <input
            type="number"
            className="mt-2 w-full rounded border border-[color:var(--ind-border)] bg-transparent px-3 py-2"
            value={pipeLength}
            onChange={(e) => setPipeLength(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium">{copy.fields.sdr}</span>
          <input
            type="number"
            className="mt-2 w-full rounded border border-[color:var(--ind-border)] bg-transparent px-3 py-2"
            value={sdr}
            onChange={(e) => setSdr(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium">{copy.fields.pn}</span>
          <input
            type="number"
            className="mt-2 w-full rounded border border-[color:var(--ind-border)] bg-transparent px-3 py-2"
            value={pn}
            onChange={(e) => setPn(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium">{copy.fields.powerReserve}</span>
          <input
            type="number"
            className="mt-2 w-full rounded border border-[color:var(--ind-border)] bg-transparent px-3 py-2"
            value={reserve}
            onChange={(e) => setReserve(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm md:col-span-2">
          <span className="font-medium">{copy.fields.pipeGrade}</span>
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
          <span className="font-medium">{copy.fields.externalDiameters}</span>
          <input
            type="text"
            className="mt-2 w-full rounded border border-[color:var(--ind-border)] bg-transparent px-3 py-2"
            value={diameterInput}
            onChange={(e) => setDiameterInput(e.target.value)}
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="button" className="ind-btn ind-btn-secondary" onClick={reset}>
          {copy.actions.reset}
        </button>
      </div>

      {recommendation ? (
        <div className="rounded border border-[color:var(--ind-accent)] p-4 text-sm">
          <strong>{copy.recommendation.label}:</strong>{" "}
          {formatTemplate(copy.recommendation.summary, {
            de: recommendation.externalDiameterMm,
            velocity: recommendation.velocityMs.toFixed(2),
            head: recommendation.totalHeadM.toFixed(1),
            power: recommendation.motorPowerKw.toFixed(2),
          })}
        </div>
      ) : null}

      <div>
        <h3 className="mb-3 text-sm font-semibold text-[color:var(--ind-text)]">{copy.results}</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-start text-sm">
            <thead>
              <tr className="border-b border-[color:var(--ind-border)]">
                {tableHeaders.map((header) => (
                  <th key={header} className="px-2 py-2 font-medium">
                    {header}
                  </th>
                ))}
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
                  <td className="px-2 py-2">{statusLabel(row.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-[color:var(--ind-text-muted)]">{copy.disclaimer}</p>
    </div>
  );
}
