import React from 'react';
import { LegacyEra } from '../../types/legacy';

export function LegacyEraSection({ era }: { era: LegacyEra }) {
  return (
    <div className="border-l-4 border-[#e6c15a] pl-6">
      <h2 className="text-3xl font-light text-white">
        {era.name}
      </h2>
      <p className="mt-2 text-neutral-400">
        {era.startYear}–{era.endYear || 'Present'}
      </p>
      <p className="mt-4 text-neutral-300 leading-relaxed">
        {era.description}
      </p>
    </div>
  );
}
