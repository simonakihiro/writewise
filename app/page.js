'use client';
import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRewrite = async () => {
    setLoading(true);
    // ここで先ほど作ったAPIを呼び出します
    const res = await fetch('/api/rewrite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        text, 
        context: 'You are a professional editor. Rewrite this to be natural English.',
        apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_KEY 
      })
    });
    const data = await res.json();
    setResult(data.content?.[0]?.text || 'Error occurred');
    setLoading(false);
  };

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>WriteWise</h1>
      <textarea 
        value={text} 
        onChange={(e) => setText(e.target.value)}
        style={{ width: '100%', height: '200px' }}
      />
      <button onClick={handleRewrite} disabled={loading}>
        {loading ? 'Rewriting...' : 'Rewrite with AI'}
      </button>
      <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ccc' }}>
        {result}
      </div>
    </main>
  );
}
