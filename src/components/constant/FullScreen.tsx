// @ts-nocheck

"use client"
import React, { useState } from 'react'
import { FaExpand, FaCompress } from 'react-icons/fa';

export default function FullScreenButton() {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = () => {
        if (!isFullscreen) {
            // Enter fullscreen mode
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.webkitRequestFullscreen) { /* Safari */
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) { /* IE11 */
                document.documentElement.msRequestFullscreen();
            }
        } else {
            // Exit fullscreen mode
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { /* Safari */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE11 */
                document.msExitFullscreen();
            }
        }
        // Toggle the fullscreen state
        setIsFullscreen(prev => !prev);
    };

    return (
        <button title={!isFullscreen ? 'Fullscreen' : 'Windows'} className="p-1.5 rounded-xl hover:text-lightTextColored dark:hover:text-darkTextColored duration-300 ease-linear transition-colors" onClick={toggleFullscreen}>
            {!isFullscreen ? <FaExpand title="full screen" className="h-4 w-4" /> : <FaCompress title="compressed screen" className="h-4 w-4" />}
            <span className="sr-only">fullscreen toggle</span>
        </button>
    )
}


