import { useState } from 'react'
import { useAuth } from './hooks/useAuth'

const FOLDERS = [
  { id: 'inbox', label: 'Inbox', count: 12 },
  { id: 'sent', label: 'Sent', count: 0 },
  { id: 'drafts', label: 'Drafts', count: 3 },
  { id: 'starred', label: 'Starred', count: 5 },
  { id: 'trash', label: 'Trash', count: 0 },
]

const MAILS = [
  { id: 1, from: 'Platform Team', subject: 'Welcome to Its Universe Mail', preview: 'Your mail service is now active and ready to use across all Its Universe platforms.', time: '10:24 AM', read: false, starred: true, folder: 'inbox' },
  { id: 2, from: 'IT-S OS', subject: 'System notification: Services updated', preview: 'Several services have been updated and redeployed across the platform.', time: '9:11 AM', read: false, starred: false, folder: 'inbox' },
  { id: 3, from: 'IT-S Pay', subject: 'Transaction complete', preview: 'Your recent transaction has been processed successfully.', time: 'Yesterday', read: true, starred: false, folder: 'inbox' },
  { id: 4, from: 'IT-S Shield', subject: 'Security alert — new sign-in', preview: 'A new sign-in was detected from a new device. If this was you, no action needed.', time: 'Yesterday', read: true, starred: true, folder: 'inbox' },
  { id: 5, from: 'IT-S Store', subject: 'Your order has been shipped', preview: 'Order #19283 is on its way. Estimated delivery: 3-5 business days.', time: 'Mon', read: true, starred: false, folder: 'inbox' },
  { id: 6, from: 'IT-S Learn', subject: 'Course reminder: Advanced TypeScript', preview: 'You have an upcoming lesson scheduled for tomorrow at 9 AM.', time: 'Mon', read: true, starred: false, folder: 'inbox' },
]

export default function App() {
  const { user, loading, signOut } = useAuth()
  const [view, setView] = useState<'signin' | 'signup'>('signin')
  const [selected, setSelected] = useState<typeof MAILS[0] | null>(MAILS[0])
  const [activeFolder, setActiveFolder] = useState('inbox')
  const [composing, setComposing] = useState(false)

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div style={{ width: 36, height: 36, border: '3px solid var(--border)', borderTopColor: '#6c63ff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )

  if (!user) {
    if (view === 'signup') return <SignUp onSwitch={() => setView('signin')} />
    return <SignIn onSwitch={() => setView('signup')} />
  }

  const visible = MAILS.filter(m => m.folder === activeFolder)

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--bg)', overflow: 'hidden' }}>
      <aside style={{
        width: 220, background: 'var(--surface)', borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column', padding: '1.5rem 1rem', gap: '0.25rem', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.5rem', padding: '0 0.5rem' }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: 'linear-gradient(135deg, #6c63ff, #a855f7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700, color: '#fff',
          }}>M</div>
          <span style={{ fontWeight: 700, fontSize: '1rem' }}>IT-S Mail</span>
        </div>

        <button onClick={() => setComposing(true)} style={{
          background: 'linear-gradient(135deg, #6c63ff, #a855f7)',
          color: '#fff', border: 'none', borderRadius: 8,
          padding: '9px 16px', fontSize: '0.85rem', fontWeight: 600,
          cursor: 'pointer', marginBottom: '1.25rem',
        }}>+ Compose</button>

        {FOLDERS.map(f => (
          <button key={f.id} onClick={() => { setActiveFolder(f.id); setSelected(null) }} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '8px 12px', borderRadius: 8, border: 'none',
            background: activeFolder === f.id ? 'rgba(108,99,255,0.15)' : 'transparent',
            color: activeFolder === f.id ? '#6c63ff' : 'var(--muted)',
            fontSize: '0.875rem', fontWeight: activeFolder === f.id ? 600 : 400,
            cursor: 'pointer', textAlign: 'left', width: '100%',
          }}>
            <span>{f.label}</span>
            {f.count > 0 && (
              <span style={{
                background: activeFolder === f.id ? '#6c63ff' : 'var(--border)',
                color: activeFolder === f.id ? '#fff' : 'var(--muted)',
                fontSize: '0.7rem', fontWeight: 700, padding: '1px 6px', borderRadius: 20,
              }}>{f.count}</span>
            )}
          </button>
        ))}

        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: 'linear-gradient(135deg, #6c63ff, #a855f7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0,
            }}>{user.email?.charAt(0).toUpperCase()}</div>
            <span style={{ fontSize: '0.75rem', color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user.email}
            </span>
          </div>
          
        </div>
      </aside>

      <div style={{ width: 320, borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>
          <input placeholder="Search mail…" style={{
            width: '100%', background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 8, padding: '8px 12px', color: 'var(--text)', fontSize: '0.85rem', outline: 'none',
          }} />
        </div>
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {visible.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--muted)', fontSize: '0.85rem' }}>No messages</div>
          ) : visible.map(mail => (
            <div key={mail.id} onClick={() => setSelected(mail)} style={{
              padding: '1rem', borderBottom: '1px solid var(--border)',
              background: selected?.id === mail.id ? 'rgba(108,99,255,0.08)' : 'transparent',
              cursor: 'pointer',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontWeight: mail.read ? 400 : 700, fontSize: '0.85rem' }}>{mail.from}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{mail.time}</span>
              </div>
              <div style={{ fontWeight: mail.read ? 400 : 600, fontSize: '0.825rem', marginBottom: 4 }}>{mail.subject}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{mail.preview}</div>
            </div>
          ))}
        </div>
      </div>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {selected ? (
          <div style={{ padding: '2rem', overflowY: 'auto', flex: 1 }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem', letterSpacing: '-0.02em' }}>{selected.subject}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '2rem' }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'linear-gradient(135deg, #6c63ff, #a855f7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 700, color: '#fff', flexShrink: 0,
              }}>{selected.from.charAt(0)}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{selected.from}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>to me · {selected.time}</div>
              </div>
            </div>
            <p style={{ color: 'var(--text)', lineHeight: 1.7, fontSize: '0.925rem' }}>{selected.preview}</p>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7, fontSize: '0.925rem', marginTop: '1rem' }}>
              This message was delivered securely through the Its Universe platform. All communications are encrypted end-to-end.
            </p>
            <div style={{ marginTop: '2rem', display: 'flex', gap: 8 }}>
              <button onClick={() => setComposing(true)} style={{
                background: 'rgba(108,99,255,0.15)', color: '#6c63ff',
                border: '1px solid rgba(108,99,255,0.3)', borderRadius: 8,
                padding: '8px 16px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
              }}>Reply</button>
              <button onClick={() => setComposing(true)} style={{
                background: 'var(--surface)', color: 'var(--muted)',
                border: '1px solid var(--border)', borderRadius: 8,
                padding: '8px 16px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
              }}>Forward</button>
            </div>
          </div>
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: '0.9rem' }}>
            Select a message to read
          </div>
        )}
      </main>

      {composing && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, width: 480,
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, boxShadow: '0 24px 64px rgba(0,0,0,0.6)', zIndex: 200,
        }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>New Message</span>
            <button onClick={() => setComposing(false)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: 18 }}>×</button>
          </div>
          <div style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <input placeholder="To" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid var(--border)', padding: '6px 0', color: 'var(--text)', fontSize: '0.875rem', outline: 'none' }} />
            <input placeholder="Subject" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid var(--border)', padding: '6px 0', color: 'var(--text)', fontSize: '0.875rem', outline: 'none' }} />
            <textarea placeholder="Write your message…" rows={6} style={{ background: 'transparent', border: 'none', color: 'var(--text)', fontSize: '0.875rem', outline: 'none', resize: 'none', marginTop: '0.5rem' }} />
          </div>
          <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={() => setComposing(false)} style={{
              background: 'linear-gradient(135deg, #6c63ff, #a855f7)',
              color: '#fff', border: 'none', borderRadius: 8,
              padding: '8px 20px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
            }}>Send</button>
            <button onClick={() => setComposing(false)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '0.85rem' }}>Discard</button>
          </div>
        </div>
      )}
    </div>
  )
}
