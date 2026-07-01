'use client';

import { signOut } from 'next-auth/react';
import { Gem, LogOut } from 'lucide-react';
import { NyawaShards, StatusBadge, DeltaTag, fmtDate, MAX_NYAWA } from '../../components/ui';

export default function MemberDashboard({ member, history }) {
  return (
    <div className="min-h-screen">
      <div className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #a855f7, #6366f1)' }}>
              <Gem className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold leading-none text-white tracking-wide">PULSE</h1>
              <p className="text-[11px] text-slate-400 leading-none mt-0.5">Dashboard Member</p>
            </div>
          </div>
          <button onClick={() => signOut({ callbackUrl: '/login' })} className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200">
            <LogOut className="w-4 h-4" /> Keluar
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 py-6">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 mb-5">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-white">{member.nama}</h2>
              <p className="text-sm text-slate-400 mt-0.5">{member.nicknameML} · {member.idML} · {member.roleSquad}</p>
              <div className="mt-4"><StatusBadge status={member.status} size="lg" /></div>
            </div>
            <div className="text-center">
              <NyawaShards n={member.nyawaCurrent} size="lg" />
              <p className="text-xs text-slate-400 mt-2">{member.nyawaCurrent} / {MAX_NYAWA} Nyawa</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-5 pt-5 border-t border-slate-800">
            <div>
              <p className="text-xs text-slate-400">Activity Point Minggu Ini</p>
              <p className="text-xl font-display font-bold text-white">{member.activityPoint.toLocaleString('id-ID')}</p>
              <p className={`text-[11px] mt-0.5 ${member.activityInputted ? 'text-emerald-400' : 'text-slate-500'}`}>
                {member.activityInputted ? 'Sudah diinput, menunggu proses admin' : 'Belum diinput admin minggu ini'}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Target Aman</p>
              <p className="text-sm text-slate-300 mt-1">≥ 1.500 pt = nyawa aman<br />&gt; 3.000 pt = nyawa bertambah</p>
            </div>
          </div>
        </div>

        <h3 className="font-display text-sm font-semibold text-slate-300 mb-2 uppercase tracking-wide">Riwayat Mingguan</h3>
        <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-800 text-xs uppercase tracking-wide">
                <th className="px-4 py-2.5 font-medium">Minggu</th>
                <th className="px-4 py-2.5 font-medium">Tanggal</th>
                <th className="px-4 py-2.5 font-medium">Activity</th>
                <th className="px-4 py-2.5 font-medium">Nyawa</th>
                <th className="px-4 py-2.5 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {history.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-6 text-center text-slate-500 text-sm">Belum ada riwayat proses mingguan.</td></tr>
              )}
              {history.map((h) => (
                <tr key={h.id} className="border-b border-slate-800/60 last:border-0">
                  <td className="px-4 py-2.5 text-slate-300">#{h.mingguKe}</td>
                  <td className="px-4 py-2.5 text-slate-400">{fmtDate(h.tanggal)}</td>
                  <td className="px-4 py-2.5 text-slate-300">{h.activityPoint.toLocaleString('id-ID')}</td>
                  <td className="px-4 py-2.5">
                    <span className="text-slate-400">{h.nyawaBefore}</span>
                    <span className="mx-1.5 text-slate-600">→</span>
                    <span className="text-slate-100 font-medium">{h.nyawaAfter}</span>
                    <span className="ml-2"><DeltaTag delta={h.delta} /></span>
                  </td>
                  <td className="px-4 py-2.5"><StatusBadge status={h.statusAkhir} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
