import { useState } from 'react';
import { 
  MessageSquare, 
  Repeat2, 
  Heart, 
  Bookmark, 
  Share2
} from 'lucide-react';

const EMOJI_REACTIONS = [
  { emoji: '👍', name: 'THUMBS_UP', label: 'Setuju' },
  { emoji: '👎', name: 'THUMBS_DOWN', label: 'Kurang Setuju' },
  { emoji: '😄', name: 'LAUGH', label: 'Lucu' },
  { emoji: '🎉', name: 'HOORAY', label: 'Selamat' },
  { emoji: '😕', name: 'CONFUSED', label: 'Bingung' },
  { emoji: '❤️', name: 'HEART', label: 'Suka' },
  { emoji: '🚀', name: 'ROCKET', label: 'Keren' },
  { emoji: '👀', name: 'EYES', label: 'Menyimak' },
];

export function App() {
  const [activeTab, setActiveTab] = useState<'for_you' | 'following'>('for_you');
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#F0F6FC]">
      {/* Sticky Header ala Threads */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0D1117]/80 border-b border-[#30363D]">
        <div className="max-w-[620px] mx-auto flex items-center justify-between px-4 h-14">
          <div className="font-bold text-xl tracking-tight text-white flex items-center gap-2">
            <span className="text-2xl">@</span>
            <span>threads.atm</span>
          </div>
          
          <div className="flex gap-1 bg-[#161B22] p-1 rounded-lg border border-[#30363D]">
            <button
              onClick={() => setActiveTab('for_you')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'for_you'
                  ? 'bg-[#21262D] text-white shadow-xs'
                  : 'text-[#8B949E] hover:text-[#C9D1D9]'
              }`}
            >
              Untuk Anda
            </button>
            <button
              onClick={() => setActiveTab('following')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'following'
                  ? 'bg-[#21262D] text-white shadow-xs'
                  : 'text-[#8B949E] hover:text-[#C9D1D9]'
              }`}
            >
              Mengikuti
            </button>
          </div>
        </div>
      </header>

      {/* Main Centered Stream (620px Width ala Threads) */}
      <main className="max-w-[620px] mx-auto px-4 py-4 pb-20">
        {/* Quick Compose Box */}
        <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-4 mb-4 shadow-sm">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center font-bold text-white text-sm shrink-0">
              G
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Ada cerita atau pemikiran apa hari ini?..."
                className="w-full bg-transparent text-sm text-[#F0F6FC] placeholder-[#8B949E] outline-none"
              />
              <div className="flex justify-between items-center mt-3 pt-2 border-t border-[#30363D]/60">
                <span className="text-xs text-[#8B949E]">500 karakter tersisa</span>
                <button className="bg-white text-black text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-neutral-200 transition-colors">
                  Posting
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Example Thread Post dengan Threads Connector Line + 8 GitHub Reactions */}
        <article className="bg-[#161B22] border border-[#30363D] rounded-xl p-4 shadow-sm mb-4">
          <div className="flex gap-3">
            {/* Avatar & Vertical Connector Line */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center font-bold text-white text-sm shrink-0">
                A
              </div>
              <div className="w-0.5 grow bg-[#30363D] my-2 min-h-12 rounded-full" />
            </div>

            {/* Post Content */}
            <div className="flex-1 pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-sm text-white">Ananda Putri</span>
                  <span className="text-[#8B949E] text-xs ml-2">@ananda · 15m</span>
                </div>
              </div>

              <p className="mt-2 text-[15px] leading-relaxed text-[#E6EDF3]">
                Senang banget akhirnya nemu media sosial teks yang bersih, bebas iklan berisik, dan ada 8 reaksi emoji! Jadi kalau ada berita lucu atau membingungkan bisa langsung kasih emoji tanpa harus ngetik komen panjang 🎉👀
              </p>

              {/* Standard Interaction Bar */}
              <div className="flex items-center gap-6 mt-3 text-[#8B949E] text-xs">
                <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <MessageSquare size={16} />
                  <span>8</span>
                </button>
                <button className="flex items-center gap-1.5 hover:text-green-400 transition-colors">
                  <Repeat2 size={16} />
                  <span>3</span>
                </button>
                <button className="flex items-center gap-1.5 hover:text-rose-500 transition-colors">
                  <Heart size={16} />
                  <span>42</span>
                </button>
                <button className="flex items-center gap-1.5 hover:text-yellow-400 transition-colors">
                  <Bookmark size={16} />
                </button>
                <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <Share2 size={16} />
                </button>
              </div>

              {/* GitHub 8 Emoji Reaction Bar (ATM Feature) */}
              <div className="mt-3 pt-2.5 border-t border-[#30363D]/60 flex flex-wrap gap-1.5 items-center">
                {EMOJI_REACTIONS.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setSelectedEmoji(item.name === selectedEmoji ? null : item.name)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition-all border ${
                      selectedEmoji === item.name
                        ? 'bg-blue-900/40 border-blue-500 text-blue-200'
                        : 'bg-[#21262D]/60 hover:bg-[#21262D] border-[#30363D] text-[#C9D1D9]'
                    }`}
                    title={item.label}
                  >
                    <span>{item.emoji}</span>
                    <span className="text-[11px] font-medium text-[#8B949E]">
                      {item.name === 'HEART' ? '28' : item.name === 'ROCKET' ? '14' : item.name === 'EYES' ? '9' : '2'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Nested Reply Post (Threads Connector Line Destination) */}
          <div className="flex gap-3 pl-3 pt-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-xs shrink-0">
              R
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-xs text-white">Rian Pratama</span>
                <span className="text-[#8B949E] text-xs">@rian · 5m</span>
              </div>
              <p className="mt-1 text-sm text-[#C9D1D9]">
                Setuju! Reaksi roket 🚀 dan mata 👀 paling pas buat thread berita menarik.
              </p>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}

export default App;
