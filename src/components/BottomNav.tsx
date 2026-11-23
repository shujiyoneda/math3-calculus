import { BarChart3, BookOpen, Calculator, FileSpreadsheet } from 'lucide-react'

export type NavTab = 'learn' | 'drill' | 'formulas' | 'progress'

interface BottomNavProps {
  activeTab: NavTab
  onSelect: (tab: NavTab) => void
  wrongCount: number
}

const ITEMS: { id: NavTab; label: string; icon: typeof BookOpen }[] = [
  { id: 'learn', label: '学習', icon: BookOpen },
  { id: 'drill', label: '計算ドリル', icon: Calculator },
  { id: 'formulas', label: '公式まとめ', icon: FileSpreadsheet },
  { id: 'progress', label: '進捗', icon: BarChart3 },
]

export function BottomNav({ activeTab, onSelect, wrongCount }: BottomNavProps) {
  return (
    <nav className="bottom-nav" aria-label="メインナビゲーション">
      <div className="bottom-nav-inner">
        {ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              id={`nav-tab-${item.id}`}
              type="button"
              className={`bottom-nav-item ${isActive ? 'active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => onSelect(item.id)}
            >
              <span style={{ position: 'relative', display: 'inline-flex' }}>
                <Icon size={21} strokeWidth={isActive ? 2.3 : 1.9} />
                {item.id === 'drill' && wrongCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: -4,
                      right: -9,
                      minWidth: 16,
                      height: 16,
                      padding: '0 4px',
                      borderRadius: 999,
                      background: 'var(--accent-amber)',
                      color: '#fff',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {wrongCount}
                  </span>
                )}
              </span>
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
