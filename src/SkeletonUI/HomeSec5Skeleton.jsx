import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function HomeSec5Skeleton() {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 1000) {
        setCount(3);
      } else if (width > 600) {
        setCount(2);
      } else {
        setCount(1);
      }
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='brwseritems'>
      {[...Array(count)].map((_, index) => (
        <div className="sec5Item" key={index} style={{ margin: '0 auto' }}>
          <Skeleton height={200} className="sec5img" />

          <div className="s5conteent" style={{ marginTop: '10px' }}>
            <div className="s5itemclock" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Skeleton circle width={20} height={20} />
              <Skeleton width={60} height={15} />
            </div>

            <Skeleton height={20} width={`80%`} style={{ marginTop: '10px' }} />
          </div>

          <Skeleton width={`40%`} height={20} style={{ marginTop: '10px' }} />
          <Skeleton width={`80%`} height={15} style={{ marginTop: '5px' }} />

          <button className="" disabled style={{ marginTop: '10px' }}>
            <Skeleton width={120} height={35} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default HomeSec5Skeleton;
