'use client';
const Error = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>發生錯誤</h1>
      <p>抱歉，發生了一些錯誤。請稍後再試。</p>
      <button onClick={() => window.location.reload()}>重新載入頁面</button>
    </div>
  );
};
export default Error;
