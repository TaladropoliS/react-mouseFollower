import {useEffect, useState} from "react";

const FollowMouse = () => {
    const [enabled, setEnabled] = useState(false);
    const [position, setPosition] = useState({x: 0, y: 0});
    useEffect(() => {
        const handleMove = (e) => {
            const {clientX, clientY} = e;
            setPosition({x: clientX, y: clientY});
        }
        if (enabled) {
            window.addEventListener('pointermove', handleMove)
        }
        return () => {
            window.removeEventListener('pointermove', handleMove);
        }
    }, [enabled]);
    const style = {
        position: 'absolute',
        backgroundColor: '#2e2e2e',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -10,
        top: -10,
        width: 20,
        height: 20,
        transform: `translate(${position.x}px, ${position.y}px)`,
    }

    useEffect(() => {
        document.body.classList.toggle('no-cursor', enabled)
        return () => {
            document.body.classList.remove('no-cursor')
        }
    }, [enabled])

    return (
        <>
            <div style={style}></div>
            <button onClick={() => setEnabled(!enabled)} className="btn btn-primary">
                {enabled ? 'Desactivar' : 'Activar'} seguir puntero
            </button>
        </>
    )
}

function App() {
    return (
        <main className={'text-center'}>
            <FollowMouse/>
        </main>
    )
}

export default App
