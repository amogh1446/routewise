import React from "react";
import { Sparkles, Camera, ShieldAlert, Luggage } from "lucide-react";

interface InsiderTipsData {
  secret_hack?: string;
  best_photo_spot?: string;
  packing_or_weather?: string;
}

interface DayInsiderTipsProps {
  tips?: InsiderTipsData;
}

export const DayInsiderTips: React.FC<DayInsiderTipsProps> = ({ tips }) => {
  if (
    !tips ||
    (!tips.secret_hack && !tips.best_photo_spot && !tips.packing_or_weather)
  ) {
    return null;
  }

  return (
    <div className="insider-tips-block print-avoid-break my-6 bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900/60 border border-purple-800/30 rounded-2xl p-4 sm:p-5 shadow-lg text-white print:my-2 print:p-2.5 print:rounded-xl">
      <div className="flex items-center gap-2 mb-3 print:mb-1.5">
        <Sparkles className="w-4 h-4 text-purple-300 print:w-3 print:h-3" />
        <h4 className="text-sm font-bold uppercase tracking-wider text-purple-200 print:text-xs">
          AI Local Insider & Travel Hacks
        </h4>
      </div>

      <div className="insider-tips-grid grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm print:grid-cols-3 print:gap-2 print:text-xs">
        {tips.secret_hack && (
          <div className="bg-purple-950/30 border border-purple-800/30 p-3 rounded-xl print:p-2 print:rounded-lg">
            <span className="flex items-center gap-1.5 font-semibold text-purple-300 mb-1">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              Local Secret / Crowd Hack:
            </span>
            <p className="text-gray-300 text-xs leading-relaxed">
              {tips.secret_hack}
            </p>
          </div>
        )}

        {tips.best_photo_spot && (
          <div className="bg-purple-950/30 border border-purple-800/30 p-3 rounded-xl print:p-2 print:rounded-lg">
            <span className="flex items-center gap-1.5 font-semibold text-cyan-300 mb-1">
              <Camera className="w-3.5 h-3.5 text-cyan-400" />
              Best Photo Vantage:
            </span>
            <p className="text-gray-300 text-xs leading-relaxed">
              {tips.best_photo_spot}
            </p>
          </div>
        )}

        {tips.packing_or_weather && (
          <div className="bg-purple-950/30 border border-purple-800/30 p-3 rounded-xl print:p-2 print:rounded-lg">
            <span className="flex items-center gap-1.5 font-semibold text-emerald-300 mb-1">
              <Luggage className="w-3.5 h-3.5 text-emerald-400" />
              Packing & Comfort Tip:
            </span>
            <p className="text-gray-300 text-xs leading-relaxed">
              {tips.packing_or_weather}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DayInsiderTips;
