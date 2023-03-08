// dependencies of useEffect
//    undefined -> runs every time the component is rendered
//    [] -> run once when component is mounted    
//    [enabled] -> run when 'enabled' state changes and when component is mounted.

import { useEffect, useState } from "react"

export function FollowMouse () { 

    const [enabled, setEnabled] = useState(false);
    const [position, setPosition] = useState({x: 0, y: 0});
    
    // pointer move
    useEffect(() => {
      
      const handleMove = (event) => {
        const {clientX, clientY} = event;  
        setPosition({x:clientX, y:clientY});
      }
      
      if(enabled){
        window.addEventListener('pointermove', handleMove);
      }
      
      return () => {
        // cleanup method - runs when component is unmounted or dependencies change.

        // getEventListeners(window) -> get all event listeners subscriptions.
  
        window.removeEventListener('pointermove', handleMove);
      }
      
    }, [enabled]);

    // change body classname
    useEffect(() => {
      document.body.classList.toggle('no-cursor', enabled);
      return () => {
        document.body.classList.remove('no-cursor');
      }
    }, [enabled])
    
    const handleClick = () => {
      setEnabled(!enabled);
    }
    
    const textButton = enabled ? 'Disable' : 'Enable';

    return (
        <>
            <div style={{
                position: 'absolute',
                backgroundColor: '#0000',
                border: '2px solid #f2f2f2',
                borderRadius: '50%',
                opacity: 0.9,
                pointerEvents: 'none',
                left: -20,
                top: -20,
                width: 40,
                height: 40,
                transform: `translate(${position.x}px, ${position.y}px)`
            }}
            />
            <button onClick={handleClick}>
                {textButton} mouse follower
            </button>
        </>
    );
}