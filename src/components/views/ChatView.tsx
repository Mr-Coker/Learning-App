import { PlusCircle, Send, ArrowUp, ArrowRight, Shield } from 'lucide-react';

export function ChatView() {
  return (
    <div className="flex-1 flex overflow-hidden w-full relative">
      {/* Channels Sidebar (Inner Left Column) */}
      <div className="w-56 md:w-64 bg-surface-container-low border-r border-outline-variant/20 flex flex-col hidden md:flex flex-shrink-0 h-full">
        <div className="p-6 border-b border-outline-variant/20">
          <h3 className="font-geist text-lg text-on-surface uppercase tracking-wider font-semibold">Channels</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <a href="#" className="block px-4 py-2 rounded-lg bg-surface-bright/20 text-primary glow-active font-geist text-sm border border-primary/30 shadow-[0_0_15px_rgba(76,214,255,0.1)]">
              # 📐 math-discussions
          </a>
          <a href="#" className="block px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-variant/50 transition-colors font-geist text-sm">
              # 🧪 science-experiments
          </a>
          <a href="#" className="block px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-variant/50 transition-colors font-geist text-sm">
              # 📚 lit-club
          </a>
          <a href="#" className="block px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-variant/50 transition-colors font-geist text-sm">
              # 💻 coding-help
          </a>
          <a href="#" className="block px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-variant/50 transition-colors font-geist text-sm">
              # 🎮 game-dev
          </a>
        </div>
      </div>

      {/* Chat Stream (Right Column) */}
      <div className="flex-1 flex flex-col bg-background relative h-full">
        {/* Chat Header */}
        <header className="h-16 flex items-center px-4 md:px-6 border-b border-outline-variant/20 bg-surface-container-lowest/80 backdrop-blur-md z-10 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-lg md:text-xl font-bold text-primary"># 📐 math-discussions</span>
            <span className="text-sm text-on-surface-variant font-sans ml-4 hidden sm:block">Calculus, Algebra, and general math help.</span>
          </div>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          
          {/* System Message */}
          <div className="flex justify-center">
            <span className="bg-surface-container text-on-surface-variant font-geist text-xs px-4 py-1 rounded-full border border-outline-variant/30 text-center">
              Welcome to #math-discussions. Keep it constructive!
            </span>
          </div>

          {/* Regular Message */}
          <div className="flex gap-4">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuY6xHUc5zeanGMDkPsGDNh9nDFKZfVeNPa2fhJFDHSFkyYSWF2ex0BwnZ9NJp1K0UKQCnW5-CYq5Umo2b6rCNsCzKHMEXmG7IirzmgBleb27R4r-Bt_FQ5YcmT8t1xIjEmDGZYdFrF_BQnR2PhEj_1GlvE8NosXboAw8k7q_jbYFKJVYhPVgzBXkBmw9sMkflzSgSLLn4LXslNTfedXCO0Yjzx_7FmU_d2JqGMV1ZnZCqLn1x3bYz1m4XoxBy__darY9FX2rrixI" 
              alt="User Avatar" 
              className="w-10 h-10 rounded-lg flex-shrink-0 object-cover" 
            />
            <div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-geist text-sm text-on-surface font-bold">AlexChen_99</span>
                <span className="font-geist text-xs text-on-surface-variant opacity-70">10:42 AM</span>
              </div>
              <div className="bg-surface-container-high rounded-2xl rounded-tl-sm p-4 text-on-background font-sans text-base shadow-sm border border-white/5 inline-block max-w-[90%] md:max-w-[80%]">
                Hey everyone, is anyone else struggling with problem 4 on the derivatives worksheet? I keep getting zero in the denominator.
              </div>
            </div>
          </div>

          {/* Upvoteable Question Card */}
          <div className="flex gap-4">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhk7NhOc-LsAQs_9HASdl65dUPBHGl_vh3cXRYIjJOBlBi3E-i0BHCh0fzd7YEtI-NGY0Gf-9J_dLGQ6idpo-lNWVXxl1MElIET51W39Tkg5X2Ot454bWMD8OLCmfWntvP_qWsbjA3Q2AH-gdK0yQtdOQ5DNDf3TKs9qARNa24NJ1VYrWyR1vSCa3YxL9HSsnprXFD-rerXub1ZO3qjynbZsZHj1nhZA9Ea8xiXHEbW_znpMMMFLqvhNwMPTWhPYNFxicfInyUzRQ" 
              alt="User Avatar" 
              className="w-10 h-10 rounded-lg flex-shrink-0 object-cover" 
            />
            <div className="w-full max-w-2xl">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-geist text-sm text-on-surface font-bold">SarahJ_Math</span>
                <span className="font-geist text-xs text-on-surface-variant opacity-70">10:45 AM</span>
              </div>
              <div className="bg-surface-container rounded-xl p-4 md:p-6 neon-border-blue bg-primary/5 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-tertiary"></div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                  <h4 className="font-geist text-lg text-primary-fixed font-semibold">Math Question: Chain Rule Application</h4>
                  <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-xs font-bold border border-primary/30 uppercase tracking-widest w-fit">Unresolved</span>
                </div>
                <p className="font-sans text-base text-on-surface mb-4">
                  When applying the chain rule to f(x) = sin(cos(x^2)), do I derive the x^2 first or the outer sine function? The textbook examples are a bit ambiguous on the order of operations here.
                </p>
                <div className="flex justify-between items-center mt-4">
                  <button className="flex items-center gap-2 bg-surface-container-highest hover:bg-primary/20 text-on-surface hover:text-primary px-4 py-2 rounded-lg border border-outline-variant/50 neon-border-blue-hover transition-all font-geist text-sm font-bold">
                    <ArrowUp size={16} /> 12
                  </button>
                  <button className="text-primary hover:text-primary-fixed-dim font-geist text-sm font-medium transition-colors flex items-center gap-1">
                    View Thread <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Teacher Response */}
          <div className="flex gap-4">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrYNwzijtbq6WCGmuaBVOXlfVL6ggaY497QiOyAel4meqbso7sYKmYHhPUMAS3-XAUgDeQ7QJCMfdRoCZ4Pgi50bjE9sbDtMIjEXMgEQa1T4vDnvTL8K9qOU58pAtRei4my6yy4vQqNxvOla0INA7_O51HjagCpZQz7CUdXGRXqu8VVqBql_02eQOBImIYzpI2N04_ftPTEz-tjdjXkZh6b0Ccrp0UXsD65zwqaUVAb_6F6qycuIGzd5NEjMJGJTOqk_Q5Y1kjLrM" 
              alt="Teacher Avatar" 
              className="w-10 h-10 rounded-lg flex-shrink-0 object-cover border-2 border-tertiary" 
            />
            <div>
              <div className="flex items-center flex-wrap gap-2 mb-1">
                <span className="font-geist text-sm text-on-surface font-bold">Mr. Harrison</span>
                <span className="bg-tertiary-fixed-dim/20 text-tertiary-fixed flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold border border-tertiary-fixed-dim/50 uppercase tracking-wider">
                  <Shield size={12} className="fill-tertiary-fixed" /> TEACHER
                </span>
                <span className="font-geist text-xs text-on-surface-variant opacity-70 ml-2">10:52 AM</span>
              </div>
              <div className="bg-surface-container-high rounded-2xl rounded-tl-sm p-4 text-on-background font-sans text-base shadow-sm border-l-4 border-l-tertiary inline-block max-w-[90%] md:max-w-[80%]">
                Excellent question, Sarah. Always work from the outside in. First derive sin(u), then cos(v), and finally x^2. I've pinned a quick diagram in the resources tab that visually breaks this down.
              </div>
            </div>
          </div>

          {/* Regular Message */}
          <div className="flex gap-4">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjNMMimgyrL4tfhHtocRqh8MwV9HOIuTSU5ko60Cntij1CqyFdGBTShvZR3mSQqrXXU8kmO8vja-VFSP_rHAginh4Yw9CXCqkEzI9J4Um05klRkXmRKtQb8ToN1AVwx73QDifLDA5OsIHJM43wERS0Lpihbm1MMuxiBT8VN6Cq_xdpuKm3CFydbUlv9NhdA4lUIuwAyhlyHtUpUPiRAxjw78crWPhFxwIW_V-5YDcIGAnuVr7VLP06kjsYHbAurSZcTV6j03tV6LY" 
              alt="User Avatar" 
              className="w-10 h-10 rounded-lg flex-shrink-0 object-cover" 
            />
            <div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-geist text-sm text-on-surface font-bold">CodeNinja</span>
                <span className="font-geist text-xs text-on-surface-variant opacity-70">10:55 AM</span>
              </div>
              <div className="bg-surface-container-high rounded-2xl rounded-tl-sm p-4 text-on-background font-sans text-base shadow-sm border border-white/5 inline-block max-w-[90%] md:max-w-[80%]">
                Ah, outside in makes so much more sense. Thanks Mr. Harrison!
              </div>
            </div>
          </div>

        </div>

        {/* Message Input */}
        <div className="p-4 md:p-6 bg-surface-container-lowest/90 backdrop-blur-md border-t border-outline-variant/20 flex-shrink-0">
          <div className="relative flex items-center">
            <button className="absolute left-3 md:left-4 text-on-surface-variant hover:text-primary transition-colors">
              <PlusCircle size={20} />
            </button>
            <input 
              type="text" 
              className="w-full bg-surface-container border border-outline-variant/50 rounded-xl py-3 pl-10 md:pl-12 pr-12 text-on-surface font-sans text-base focus:border-primary focus:ring-1 focus:ring-primary focus:bg-surface-container-high transition-all shadow-inner outline-none" 
              placeholder="Message # 📐 math-discussions..." 
            />
            <button className="absolute right-2 md:right-3 bg-primary text-on-primary p-2 rounded-lg hover:shadow-[0_0_10px_rgba(76,214,255,0.6)] transition-all flex items-center justify-center">
              <Send size={16} className="fill-on-primary" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
